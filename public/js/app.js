console.log('client side script loaded ')

// fetch('http://puzzle.mead.io/puzzle')
//     .then(res=> res.json())
//     .then(data=> {
//         console.log(data)
//     })

    


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener( 'submit' , (e)=> {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(res=> res.json())
        .then(data=> {
            if(data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
            } else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
            }
            })
})