const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require("cors");
const express = require('express');
const helmet = require('helmet');
const path = require("path");
const port = normalizePort(process.env.PORT || '8000');

const csp = `default-src * data: blob:;script-src *.braintree-api.com *.braintreegateway.com *.facebook.com  *.facebook.net  *.google-analytics.com *.google.com *.linkedin.com 127.0.0.1:*  'unsafe-inline' 'unsafe-eval' blob: data: 'self';style-src data: blob: 'unsafe-inline' *;connect-src *.braintree-api.com *.braintreegateway.com localhost:* *.facebook.com facebook.com *.fbcdn.net *.facebook.net *.google.com *.googleapis.com`;

const app = express();

app.use(helmet());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://marshalltechnologygroup.com:* always');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');
  res.header('Content-Security-Policy', csp);
  res.header('Strict-Transport-Security', 'max-age=7889238; includeSubDomains; preload');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, X-XSRF-TOKEN');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } else {
    return next();
  }
});


app.use(compression()); //Compress all routes
app.use(cors());
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.set('trust proxy', true) // trust first proxy

app.set('port', port);

app.get('/', function (req, res) {
  res.render('index');
});
app.get('/policy', function (req, res) {
  res.render('policy');
});
app.get('/about', function (req, res) {
  res.render('about');
});
app.get('/contact', function (req, res) {
  res.render('contact');
});

app.listen(port, () => console.log(`listening in port ${port}...`));

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}






