
module.exports = function(app) {
  app.all('*', function(req, res, next) {
    console.log('Processing request...');
    return next();
  });

  app.post('/voice/callback', function(req, res) {
    var incoming = req.body;

    console.log('Incoming...');
    console.log(JSON.stringify(incoming, 0, 4));

    var response = '';

    if (incoming.isActive === '1') {
      try {
        response = `<Response><Say>Valentines is coming! Where is your girlfriend ... you are still alone.</Say></Response>`
      } catch(e) {
        console.log('[ERROR] Generating Response');
        console.log(e);
        response = '';
      }
    }

    if (incoming.isActive === '0') {
      console.log('Inactive...');
    }

    console.log(response);

    return res.set('Content-Type', 'text/plain')
      .status(200)
      .send(response);
  });

  app.get('/', function(req, res) {
    res.send('We are alive /\o/');
  });

  app.post('/dlrs', function(req, res) {
    console.log(JSON.stringify(req.body, 0, 4));
    res.sendStatus(200);
  });

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
      res.set({'Content-Type': 'application/json'});
      res.status(err.status || 500).json({
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res) {
    res.set({'Content-Type': 'application/json'});
    res.status(err.status || 500).json({
      message: err.message,
      error: {}
    });
  });
};
