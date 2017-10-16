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

		// const splitMsg = data.msg.split( ' ' )
		// console.log( splitMsg )
		// const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

		// /img https://media.giphy.com/media/Fjr6v88OPk7U4/giphy.gif
		// <iframe width="560" height="315" src="https://www.youtube.com/embed/pn7OMC01xkc" frameborder="0" allowfullscreen></iframe>
		// <iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/339767079&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"></iframe>
		// for( let i = 0; i < splitMsg.length; i ++ ){
		// 	if( splitMsg[ i ] === '/img' && i < splitMsg.length - 1 ){
		// 		if( urlRegex.test( splitMsg[ i + 1 ] ) ){
		// 			msg.innerHTML += `<img class="responsive-img" src="${splitMsg[ i + 1 ]}">`
		// 			i ++
		// 		}
		// 		else{
		// 			msg.innerHTML += splitMsg[ i ]
		// 		}
		// 	}
		//
		// 	else{
		// 		msg.innerHTML += splitMsg[ i ]
		// 	}
		// }
		message += data.msg;
		msg.innerHTML = message

		let row = document.createElement( 'div' )
		row.classList.add( 'row' )
		row.appendChild( msg )
		document.querySelector( '#chat' ).appendChild( row )
		window.scrollTo( 0, document.body.clientHeight )
	} )
} )
