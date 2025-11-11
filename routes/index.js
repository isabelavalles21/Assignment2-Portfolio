const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// HOME
router.get('/', (req, res) => {
  res.render('pages/home', { page: 'Home' });
});

// ABOUT
router.get('/about', (req, res) => {
  res.render('pages/about', { page: 'About' });
});

// PROJECTS
router.get('/projects', (req, res) => {
  const projects = [
    {
      title: "Clueless",
      summary: "Made for HackHive 2025: AI-powered stylist analyzes your wardrobe, understands your personal style preferences, and curates outfits tailored just for you. It considers factors like weather, upcoming events, and current fashion trends to suggest looks that fit your lifestyle.",
      stack: ["React.js", "Firebase", "Python with Flask"],
      links: { repo: "https://github.com/jibi21212/Clueless", demo: "https://devpost.com/software/clueless-pdc37b" }
    }
  ];
  res.render('pages/projects', { page: 'Projects', projects });
});

// CONTACT (GET)
router.get('/contact', (req, res) => {
  res.render('pages/contact', { page: 'Contact', sent: null, error: null });
});

// CONTACT (POST) — uses environment variables from .env / Render
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      subject: `New message from ${name}`,
      replyTo: email,
      text: message
    });

    res.render('pages/contact', { page: 'Contact', sent: true, error: null });
  } catch (err) {
    console.error(err);
    res.render('pages/contact', { page: 'Contact', sent: false, error: "Sending failed. Please try later." });
  }
});

module.exports = router;

