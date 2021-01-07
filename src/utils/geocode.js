const request = require('request')

const geocode = (location , callback) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoia2FybmJpc2h0NyIsImEiOiJja2ppdWg4bGs5bGx3MnJsYm9xYzh5aTFuIn0.NJVaUL2mR_pzeXjDJxC8XA&limit=1`

    request( { url:url , json:true } , (err , res)=> {

        if (err) {
            callback('Unable to connect to weather services!' , undefined)
        } else if (res.body.features.length==0){
            callback('Please enter a valid Location name !' , undefined)
        } else {
            callback(undefined, { latitude : res.body.features[0].center[0] ,
                longitude : res.body.features[0].center[1] ,
                location : res.body.features[0].place_name 
    }  )
        }
        
    } )
}

module.exports = geocode