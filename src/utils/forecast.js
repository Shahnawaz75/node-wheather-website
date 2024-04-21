    const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.weatherapi.com/v1/current.json?key=98f8fdfcfc19408eb1c102934240203&q='+longitude+','+latitude+''
request({url,json:true},(error,{ body })=>{
    //const data=JSON.parse(response.body)
    //console.log(data.current)
   // console.log(response.body.current)
   if(error){callback("Unable to connect to weather service!"),undefined}
   else if(body.error){callback("Unable to find location"),undefined}
   else{ callback(undefined,body.current.condition.text +".It is currently "+body.current.temp_c+" degree out .There is "+ body.current.is_day +"% chance of raining")}
})

}

module.exports=forecast