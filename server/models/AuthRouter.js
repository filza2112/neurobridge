const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = 3000;

const sessions = {};

const USER = { username: 'admin', password: 'password123' };

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    const sessionId = crypto.randomUUID();
    sessions[sessionId] = { username };

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false
    });

    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});


function authMiddleware(req, res, next) {
  const sessionId = req.cookies.sessionId;

  if (sessionId && sessions[sessionId]) {
    req.user = sessions[sessionId]; 
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}. You are authenticated.` });
});


app.post('/logout', (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId) delete sessions[sessionId];

  res.clearCookie('sessionId');
  res.json({ message: 'Logged out successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
