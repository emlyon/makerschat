window.addEventListener( 'load', function( e ) {
	var username = prompt( 'enter your username' );

	var socket = io();

	socket.on( 'connected', function( data ) {
		console.log( socket.id );
		console.log( data );
		socket.emit( 'username', username );
	} );

    var msgBox = document.querySelector( '#msgbox' );
	msgBox.addEventListener( 'keyup', function( e ) {
		e.preventDefault();

		if( e.key == 'Enter' ){
			socket.emit( 'msg', msgBox.value );
			msgBox.value = '';
		}
    }, false );

	socket.on( 'newMsg', function( data ) {
		var msg = document.createElement( 'div' );
		msg.classList.add( 'msg' );

		var content = '';
		if( data.username == username ){
			msg.classList.add( 'from-me' );
		}
		else{
			msg.classList.add( 'from-other' );
			content += '<span class="username">' + data.username + '</span>:<br>';
		}

		content += data.msg;
		msg.innerHTML = content;

		var row = document.createElement( 'div' );
		row.classList.add( 'row' );
		row.appendChild( msg );
		document.querySelector( '#chat' ).appendChild( row );
		window.scrollTo( 0, document.body.clientHeight );
	} );
} );
