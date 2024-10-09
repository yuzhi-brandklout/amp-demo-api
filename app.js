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
  res.json({ now: new Date().toString() });
};
app.use('/json', json);

app.listen(process.env.PORT || 3000);
