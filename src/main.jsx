import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'

// Register GSAP plugins ONCE globally — components do NOT re-register
gsap.registerPlugin(ScrollTrigger)

createRoot(document.getElementById('root')).render(<App />)
