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

app.post('/json', (req, res, next) => {
  res.status(200).json({});
});

app.post('/200', (req, res, next) => {
  res.status(200).json({});
});

app.post('/201', (req, res, next) => {
  res.status(201).json({});
});

app.post('/202', (req, res, next) => {
  res.status(201).json({});
});

app.post('/403', (req, res, next) => {
  res.status(403).json({ reason: 'Here is the reason!', });
});

app.listen(process.env.PORT || 3000);
