const request=require('request')


const geocodeURL=(address,callback)=>{
    const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2luZzc1IiwiYSI6ImNsdGJ0N3JmeDF3aHcybG1taDJ5OGJ3OHIifQ.VAVKKXx0fNLSIh8e5hebPA&limit=1'
    request({ url:geocodeURL, json:true},(error,{ body })=>{
        if(error){callback("Unable to connect to GeoCode Service"),undefined}
        else if(body.features.length<1){callback("UNable to find location"),undefined}
        
        else{
        callback(undefined,{
            latitude: body.features[0].center[0],
            longitude: body.features[0].center[1],
            location: body.features[0].place_name
        })
        }
    })
}

module.exports=geocodeURL