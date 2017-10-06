window.addEventListener( 'load', e => {
	document.querySelector( '#apprtc' ).style.height = window.innerHeight + 'px';
	var socket = io();

	socket.on( 'connected', function( data ){
		console.log( socket.id );
		console.log( data );
	} );

    document.body.addEventListener( 'click', function(){
        var data = 'yo';
        socket.emit( 'msg', data );
    }, false );

	socket.on( 'newMsg', function( data ){
		console.log('test2', data );
		if( data.id == socket.id ){
			console.log( 'from me' );
		}
		else{
			console.log( 'from other' );
		}
	} );
} );
