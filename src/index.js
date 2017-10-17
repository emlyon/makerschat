var express = require( 'express' );
var app = express();
var server = require( 'http' ).Server( app );
var io = require( 'socket.io' )( server );

server.listen( 80 );

app.use( express.static( __dirname + '/public' ) );
app.get( '/', function ( req, res ) {
    res.sendfile( 'index.html' );
} );


// Sockets.io communication
var sockets = [];

io.on( 'connection' , function( socket ) {
    console.log( socket.id );
	sockets.push( socket );

	io.emit( 'connected', { nbUsers: sockets.length } );

	socket.on( 'disconnect', function() {
		sockets = sockets.filter( function( s ) {
            return s.id !== socket.id;
        } );
	} );

    socket.on( 'username', function( username ) {
        socket.username = username;
    } );

    socket.on( 'msg', function( msg ) {
        io.emit( 'newMsg', { username: socket.username, msg } );
	} );
} );
