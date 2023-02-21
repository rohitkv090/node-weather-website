const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode = require('./utils/geocode');
const forecast=require('./utils/forecast');

const app=express();
const port=process.env.PORT || 3000;

const publicDirectoryPath=path.join(__dirname,'../public');
const viewDirectroyPath=path.join(__dirname,'../templates/views');
const partialsDirectoryPath=path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
app.set('views',viewDirectroyPath);

app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsDirectoryPath);



app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Rohit Kumar'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        return res.send({
            error:'No place is given'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send(error);
        }
        forecast(longitude,latitude,(error,forecastdata)=>{
            if(error)
            {
                return res.send(error);
            }
            res.send({
                latitude,longitude,location,forecast:forecastdata,
            })
        
        })
        
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Rohit kumar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Rohit kumar',
        number:8824433482,
        helpText:'We are here to help you 24x7'
    })
})





app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:"Rohit Kumar",
        errorMessage:'Help Page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        name:'rohit Kumar',
        errorMessage:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port);

});





