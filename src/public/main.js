window.addEventListener( 'load', e => {
	let username = prompt( 'enter your username' )

	const socket = io()

	socket.on( 'connected', data => {
		console.log( socket.id )
		console.log( data )
		socket.emit( 'username', username )
	} )

    const msgBox = document.querySelector( '#msgbox' )
	let msg
	msgBox.addEventListener( 'keyup', e => {
		e.preventDefault()

		if( e.key == 'Enter' ){
			socket.emit( 'msg', msg )
			msgBox.value = ''
		}
		else{
			msg = msgBox.value
		}
    }, false )

	socket.on( 'newMsg', data => {
		const msg = document.createElement( 'div' )
		msg.classList.add( 'msg' )

		let message = ''
		if( data.username == username ){
			msg.classList.add( 'from-me' )
		}
		else{
			msg.classList.add( 'from-other' )
			message += `<span class="username">${data.username}</span>:<br>`
		}

		message += data.msg;
		msg.innerHTML = message

		let row = document.createElement( 'div' )
		row.classList.add( 'row' )
		row.appendChild( msg )
		document.querySelector( '#chat' ).appendChild( row )
		window.scrollTo( 0, document.body.clientHeight )
	} )
} )
