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
      summary:
        "Made for HackHive 2025: AI-powered stylist analyzes your wardrobe and preferences, and curates outfits considering weather, events, and trends.",
      stack: ["React.js", "Firebase", "Python (Flask)"],
      links: {
        repo: "https://github.com/jibi21212/Clueless",
        demo: "https://devpost.com/software/clueless-pdc37b"
      }
    },
    {
      title: "TinyGS Project",
      summary:
        "Built and tested a functional ground-station antenna to receive/decode satellite signals. Wrote instructions and STEM activities for a proposed space camp.",
      stack: ["3D Printing", "Electronics"],
      links: {
        repo: "#",
        demo: "#"
      }
    },
    {
      title: "TMSA Consulting Case Competition",
      summary:
        "Team-based consulting case: market research, financial analysis, and strategic recommendations presented to industry judges.",
      stack: ["Excel", "PowerPoint", "Collaboration"],
      links: {
        demo: "https://www.linkedin.com/posts/tommydmichailidis_tmsa2025-casecompetition-consulting-ugcPost-7316110581353140225-k-mX?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZYd0sBb0-DX3aBZAt0X4Opr1_f9F3e5xI"
      }
    },
    {
      title: "OTAA Connect Conference",
      summary:
        "2-hour case sprint: analyzed financials under time pressure, built a narrative from the numbers, and presented to judges.",
      stack: ["Public Speaking", "Networking", "Analysis"],
      links: {
        demo: "https://www.linkedin.com/posts/isabela-valles_connect2025-otaa-casecompetition-activity-7317931334088241152-3Ilv?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZYd0sBb0-DX3aBZAt0X4Opr1_f9F3e5xI"
      }
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

