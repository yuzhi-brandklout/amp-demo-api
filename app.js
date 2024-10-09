const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require('cors')({
  origin: (origin, callback) => callback(null, origin),
  credentials: true,
});
app.use(cors);

const json = (req, res) => {
  res.setHeader('AMP-Email-Allow-Sender', '*');
  res.setHeader('AMP-Access-Control-Allow-Source-Origin', req.query['__amp_source_origin']);
  res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');

  res.json({ now: new Date().toString() });
};
app.use('/json', json);

app.listen(process.env.PORT || 3000);
