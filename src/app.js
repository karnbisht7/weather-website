const express = require('express')
const app = express()
const hbs = require("hbs")
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000


app.use(express.static('../public'))
app.set('view engine' , 'hbs')
app.set('views' , './templates/views')
hbs.registerPartials('./templates/partials')

app.get( '/' , (req , res) => {
    res.render( 'index' , {
        title: 'INDEX PAGE H JI' ,
        name : 'Karn Bisht'
    } )
})

app.get( '/about' , (req , res) => {
    res.render( 'about' , {
        title: 'ABOUT PAGE H JI' ,
        name : 'Karn Bisht'
    } )
})

app.get( '/help' , (req , res) => {
    res.render( 'help' , {
        title: 'HELP PAGE H JI' ,
        name : 'Karn Bisht'
    } )
})

app.get( '/weather' , (req , response) => {

    if(!req.query.address) {
       return response.send({error:'please enter the address as a query string!'})
    }

    geocode( req.query.address , (err , res = {}) => {

        const { latitude , longitude , location} = res
   
        if (err) {
            return response.send({err})
        }
    
        forecast( latitude , longitude , (error, data) => {
            
            if(error) {
                return response.send( {error} )
            }

            response.send({
                location:location ,
                forecast : data ,
                address: req.query.address
            })
    
          })
    } )

})


app.get( '/help/*' , (req , res) => {
     res.render( '404' , {
        title: 'HELP PAGE H JI' ,
        errorMessage : 'help page not available' ,
        name : 'Karn Bisht'
    } ) 
})

app.get( '*' , (req , res) => {
    res.render( '404' , {
        title: '404 PAGE H JI' ,
        errorMessage : '404 page not available' ,
        name : 'Karn Bisht'
    } )
})



app.listen(port , ()=> {
    console.log(`server is up and running at ${port}!`)
})