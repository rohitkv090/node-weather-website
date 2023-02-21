const request=require('request');




const forecast=(longitude,latitude,callback)=>{

    const url=`http://api.weatherstack.com/current?access_key=1a7684eb35e96a68c554f5c3c42ff69b&query=${longitude},${latitude}`;

    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connnet to weather services',undefined);
        }
        else if(body.error)
        {
            callback({error:'Unable to locate the given co-ordinates'},undefined);
        }
        else
        {
            callback(undefined,{
                temperature:body.current.temperature,
                feelslike:body.current.feelslike,
                weather_description:body.current.weather_descriptions[0],
                img:body.current.weather_icons[0]

            })
        }
    })
}

// forecast(23.268672,69.674306,(error,data)=>
// {
//     console.log(error);
//     console.log(data);
// })
module.exports=forecast;