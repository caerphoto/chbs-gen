var express = require('express'),
  app = express(),

  site = require('./controllers/site');

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.set( 'trust proxy', true );
app.use( express.static(__dirname + '/public') );
app.use( express.bodyParser() );

app.get( '/chbs-gen', site.index );

if ( app.get('env') === 'production' ) {
  app.listen( 3006, 'localhost' );
  console.log('Listening to localhost on 3006');
} else {
  app.listen(3006);
  console.log('Listening on 3006');
}
