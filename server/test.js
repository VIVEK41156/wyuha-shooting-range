const http = require('http');

const data = JSON.stringify({
  fullName: "Test User",
  email: "test@example.com",
  phone: "9876543210",
  message: "Test booking from server test script",
  termsAccepted: true
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
    if (res.statusCode === 201) {
      console.log('\n✅ SUCCESS! Form submission works. Check ruthiq269@gmail.com for the email.');
    } else {
      console.log('\n❌ Error. Check the response above.');
    }
  });
});

req.on('error', (e) => console.error('Connection error:', e.message));
req.write(data);
req.end();
