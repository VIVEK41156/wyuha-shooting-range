const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');
const { z } = require('zod');
const rateLimit = require('express-rate-limit');
const path = require('path');
const nodemailer = require('nodemailer');

// Load env vars from the root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Trust the proxy (needed for Render/Vercel)
app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting to prevent spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' },
});
app.use('/api/', limiter);

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test connection and create tables if they don't exist
pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL database');
    return client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(100) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          message TEXT NOT NULL,
          terms_accepted BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bookings (
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(100) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          message TEXT NOT NULL,
          terms_accepted BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `).then(() => {
      client.release();
    });
  })
  .catch(err => {
    console.error('Error connecting to the database', err.stack);
  });

// Resend Email Notification function
const sendNotificationEmail = async (type, data) => {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

  if (!RESEND_API_KEY || !RECEIVER_EMAIL) {
    console.error('Missing Resend API Key or Receiver Email');
    return;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Wyuha <onboarding@resend.dev>',
        to: RECEIVER_EMAIL,
        subject: `New ${type} Submission from ${data.fullName}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #7a0f18; border-bottom: 2px solid #7a0f18; padding-bottom: 10px;">New ${type}</h2>
            <p style="font-size: 16px;"><strong>Name:</strong> ${data.fullName}</p>
            <p style="font-size: 16px;"><strong>Email:</strong> ${data.email}</p>
            <p style="font-size: 16px;"><strong>Phone:</strong> ${data.phone}</p>
            <p style="font-size: 16px; background: #f9f9f9; padding: 15px; border-radius: 5px;"><strong>Message:</strong><br/>${data.message}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">Submitted via Wyuha Shooting Range at ${new Date().toLocaleString()}</p>
          </div>
        `,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Notification email sent via Resend:', result.id);
    } else {
      console.error('Resend API Error:', result);
    }
  } catch (err) {
    console.error('CRITICAL RESEND ERROR:', err.message);
  }
};

// Validation Schema using Zod
const formSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  message: z.string().min(5, 'Message is required'),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
});

// Endpoints

app.post('/api/contact', async (req, res) => {
  try {
    // 1. Validate incoming data
    const validatedData = formSchema.parse(req.body);
    
    // 2. Insert into Database
    const { fullName, email, phone, message, termsAccepted } = validatedData;
    const query = `
      INSERT INTO contacts (full_name, email, phone, message, terms_accepted)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const values = [fullName, email, phone, message, termsAccepted];
    
    await pool.query(query, values);
    
    // 3. Send Email Notification
    // 3. Send Email Notification (in background, don't await)
    sendNotificationEmail('Contact', validatedData);

    // 4. Respond with success
    res.status(201).json({ message: 'Contact message received successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/booking', async (req, res) => {
  try {
    // 1. Validate incoming data
    const validatedData = formSchema.parse(req.body);
    
    // 2. Insert into Database
    const { fullName, email, phone, message, termsAccepted } = validatedData;
    const query = `
      INSERT INTO bookings (full_name, email, phone, message, terms_accepted)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const values = [fullName, email, phone, message, termsAccepted];
    
    await pool.query(query, values);
    
    // 3. Send Email Notification
    // 3. Send Email Notification (in background, don't await)
    sendNotificationEmail('Booking Inquiry', validatedData);

    // 4. Respond with success
    res.status(201).json({ message: 'Booking inquiry received successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
