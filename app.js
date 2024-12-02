const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require('cors')({
  origin: (origin, callback) => callback(null, origin),
  credentials: true,
});

app.use(cors);

const ampCors = (req, res, next) => {
  res.setHeader('AMP-Email-Allow-Sender', '*');
  res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');

  if (req.query['__amp_source_origin']) {
    res.setHeader('AMP-Access-Control-Allow-Source-Origin', req.query['__amp_source_origin']);
  }

  next();
};

app.use(ampCors);

app.all('/200', (req, res) => {
  res.status(200).json({ now: new Date().toLocaleString(), });
});

app.all('/201', (req, res) => {
  res.status(201).json({ now: new Date().toLocaleString(), });
});

app.all('/202', (req, res) => {
  res.status(202).json({ now: new Date().toLocaleString(), });
});

app.all('/403', (req, res) => {
  res.status(403).json({ now: new Date().toLocaleString(), });
});

app.all('/404', (req, res) => {
  res.status(404).json({ now: new Date().toLocaleString(), });
});

app.all('/500', (req, res) => {
  res.status(500).json({ now: new Date().toLocaleString(), });
});

app.all('/503', (req, res) => {
  res.status(503).json({ now: new Date().toLocaleString(), });
});

app.post('/ai', (req, res) => {
  const text = req.body['text'];
  if (text === '400') {
    res.sendStatus(400);
    return;
  }
  
  const keywords = req.body['keywords'];
  const joined = `${ keywords.join(', ') } + ${ text }`;
  
  res.status(200).json({
    content: [
      // `Hello World 1 Hello World 1 ${ joined }`,
      `Hello World 2 Hello World 2 Hello World 2 ${ joined }`,
      `Hello World 3 Hello World 3 Hello World 3 Hello World 3 ${ joined }`,
      `Hello World 4 Hello World 4 Hello World 4 Hello World 4 Hello World 4 ${ joined }`,
    ],
  });
});

app.listen(process.env.PORT || 3000);
