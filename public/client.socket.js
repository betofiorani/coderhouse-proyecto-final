const socket = io()
console.log("DESDE SOCKET", socket)

socket.on('server:products', products => {
  renderProducts(products)
})

const renderProducts = async products => {
    
    const response = await fetch('template/products')
    const plantilla = await response.text()

    const html = ejs.render(plantilla, {productos: products})
    document.getElementById('productos').innerHTML = html
}


socket.on('server:messages', messages => {
  console.log("desde socket on", messages)
  renderMessages(messages)
})

const renderMessages = async messages => {
  const response = await fetch('template/messages')
  const plantilla = await response.text()

  const html = ejs.render(plantilla, {messages: messages})
  document.getElementById('messages').innerHTML = html
}
