var express = require( 'express' ),
    app = express(),
    http = require( 'http' ).Server( app ),
    io = require( 'socket.io' )( http );

// Create the HTTP Server using static directory
app.use( express.static( __dirname + '/public' ) );
app.get( '/', function( req, res ) {
    res.sendFile( 'index.html' );
} );
http.listen( process.env.PORT || 8000, function() {
    console.log( 'listening on', process.env.PORT || 8000 )
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
