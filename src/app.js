const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const { error } = require('console')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

 
console.log(__dirname)
console.log(path.join(__dirname,'../public'))
//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join (__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set ('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



// app.get('',(req,res)=>{
//     res.send('<h1>Frist Page </h1>' )

// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Shahnawaz',
//         class:'5-B'
//     },
//        {
//          name:'Second Name',
//          class:'Unknown'
//            }
// ])

// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page<h1/>')
// })




app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Shahnawaz'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Kahloon'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Welcome',
        name:'JAZAK ALLAH'
    })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){return res.send({errorMessage:'You must provide an address!'})}
     geocode(req.query.address,(error,  {latitude,longitude,location}={})=>{
        if(error){return res.send({error})}
        forecast(latitude,longitude,(error,forecastData)=>{
             if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
  
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Haris',
        errorMessage:'Help of Articele Page not Found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Haris',
        errorMessage:'Page not Found.'
    })
})

app.listen(port,()=>{
    console.log('Server is up to '+port+' .')
})