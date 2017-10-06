const config = require( './config.json' ),
    express = require( 'express' ),
    app = express(),
    http = require( 'http' ).Server( app ),
    io = require( 'socket.io' )( http );

// Create the HTTP Server
app.use( express.static( __dirname + '/public' ) );
app.get( '/', ( req, res ) => {
    res.sendFile( 'index.html' );
} );
http.listen( process.env.PORT || config.serverPort, () => {
    console.log( 'listening on', process.env.PORT || config.serverPort );
} );



let sockets = [];

io.on( 'connection' , socket => {
    console.log( socket.id );
	sockets.push( socket );

	io.emit( 'connected', { nbUsers: sockets.length } );

	socket.on( 'disconnect', () => {
		sockets = sockets.filter( s => s.id !== socket.id );
	} );

    socket.on( 'msg', msg => {
        // console.log( msg );
        io.emit( 'newMsg', { id: socket.id, msg } );
	} );
} );
