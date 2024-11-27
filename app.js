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
  const arr = req.body['prompt'];

  function joined() {
    if (typeof arr === 'string') return arr;
    if (Array.isArray(arr)) return arr.join(', ');
    return '';
  }

  if (!joined()) {
    res.sendStatus(400);
    return;
  }

  res.status(200).json({
    content: `Hello World. Hello World. Hello World. Hello World. ${ joined() }`,
  });
});

app.listen(process.env.PORT || 3000);
