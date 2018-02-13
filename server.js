var express = require( "express" );
var app = express();

var bodyParser = require( "body-parser" );
var path = require( "path" );
var mongoose = require( 'mongoose' );

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, "./static") ) );

app.set( 'views', path.join( __dirname, './views' ) );
app.set( 'view engine', 'ejs' );

mongoose.connect( "mongodb://localhost/basic_mongoose" );

var QuoteSchema = new mongoose.Schema( {
    name: String,
    quote: String
}, {timestamps: true} )
mongoose.model( "Quote", QuoteSchema );
var Quote = mongoose.model( "Quote" );

mongoose.Promise = global.Promise;

app.get( '/', function( req, res ) {
    res.render( "index" );
});

app.post( '/quotes', function( req, res ){
    console.log( 'post data:', req.body );
    var quote = new Quote( {name: req.body.name, quote: req.body.quote} );
    quote.save( function( err ){
        if( err ){
            console.log( "something went wrong" );
        } else {
            console.log( "successfully added a quote" );
        }
    })
    res.redirect( "/quotes" );
})

app.get( '/quotes', function( req, res ){
    Quote.find( {}, function( err, quotes ){
        console.log( quotes );
        res.render( "quotes", {quotes: quotes} );
    })
})

var server = app.listen( 8000, function() {
    console.log( "listening on port 8000" );
});