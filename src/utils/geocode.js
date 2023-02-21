const request=require('request');


const geocode=(address,callback)=>{

const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoicm9oaXRrdjA5MCIsImEiOiJja3A2b255czgwM3U0MnZvZmh4aW5lbHJlIn0.yo3KeCjlF3knBwey-KxAgQ&limit=1`    
request({url,json:true},(error,{body})=>{
    if(error)
    {
        callback('Unable to connect to location services',undefined);
    }
    else if(body.features.length===0)
    {
        callback({error:'Unable to find the location'},undefined);
    }
    else{
        callback(undefined,{
            latitude:body.features[0].center[0],
            longitude:body.features[0].center[1],
            location:body.features[0].place_name
        })
    }
})
}

module.exports=geocode;