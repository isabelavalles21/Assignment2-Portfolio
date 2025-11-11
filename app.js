// Basic Express server setup for an EJS portfolio site.
// This file starts the web server and wires up views, static files, and routes.

const express = require('express');
const path = require('path');      // helps build correct file paths on any OS
const dotenv = require('dotenv');  // loads environment variables from .env (locally)

dotenv.config(); // read .env when running on your computer

const app = express();

// 1) Tell Express where the EJS templates are and enable EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 2) Serve files from /public (CSS, images, etc. become available at /css, /images, ...)
app.use(express.static(path.join(__dirname, 'public')));

// 3) Parse HTML form submissions (contact form uses this)
app.use(express.urlencoded({ extended: true }));

// 4) Use our main router (separate file keeps things tidy)
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 5) Start the server on the port Render gives us, or 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
