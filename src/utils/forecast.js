const request = require('request')

const forecast = (Latitude , Longitude , callback) => {

    const url = `http://api.weatherstack.com/current?access_key=066daa9a3680f0308f753dad4d189ba0&query=${Latitude},${Longitude}`

    request( {url:url , json:true} , (err , res)=> {

        const { body } = res

        if(err) {
            callback( `Unable to connect to weather services! ` , undefined )
        }  else if (body.error){
            callback( 'Please enter a valid Location name !' , undefined )
        } else {
            callback( undefined , `the temperature is ${body.current.temperature} but it feels like ${body.current.feelslike}`)
        }

    })

}

module.exports= forecast