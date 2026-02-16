const express = require('express');

const cors = require('cors');

const { jws } = require('jsrsasign');

require('dotenv').config();



const app = express();

app.use(cors());

app.use(express.json());



app.post('/auth', (req, res) => {

  const iat = Math.round(new Date().getTime() / 1000) - 30;

  const exp = iat + 60 * 60 * 2;

  const oHeader = { alg: 'HS256', typ: 'JWT' };



  const oPayload = {

    sdkKey: process.env.ZOOM_SDK_KEY,

    mn: req.body.meetingNumber,

    role: req.body.role, // Admin ke liye 1 pass karenge

    iat: iat,

    exp: exp,

    appKey: process.env.ZOOM_SDK_KEY,

    tokenExp: exp

  };



  const signature = jws.JWS.sign('HS256', JSON.stringify(oHeader), JSON.stringify(oPayload), process.env.ZOOM_SDK_SECRET);

  res.json({ signature });

});



app.listen(5000, () => console.log('Backend on port 5000'));