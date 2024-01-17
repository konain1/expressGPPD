const express = require('express')

// creating the hospital

const hospital = express();

// patient details
const users = [
    {
        name : 'john',
        kidney:[{healthy:false},{healthy:true},{healthy:false}]
    }
]

// main gate of the hospital
hospital.get('/',(req,res)=>{

    // asking for patient name
    // const name = req.query.name;


    const kidneyCondition = users[0].kidney
    const numberofKidneys = users[0].kidney.length
    let healthyKidneys = 0;

    kidneyCondition.filter((isHealthy)=>{
        if(isHealthy.healthy == true){
            healthyKidneys++
        }

    })

  
    // res.send(`kidney status ${kidneyCondition}`)
    // res.send(`number of healthy kidneys ${healthyKidneys} 

    //     number of total kidneys : ${numberofKidneys}
    
    // `)
    let unHealthyKidneys = numberofKidneys - healthyKidneys


    res.json({
        numberofKidneys,
        healthyKidneys,
    unHealthyKidneys})



    res.end()
})



hospital.use(express.json())
// post 

hospital.post('/',(req,res)=>{
    const isHealthy = req.body.isHealthy
    console.log(isHealthy)

    users[0].kidney.push({
        healthy:isHealthy
    })
    res.json({"msg":'Done!'})
})

// put

hospital.put('/',(req,res)=>{
    users[0].kidney.filter((ele)=>{
        ele.healthy = true
    })

    res.json({"msg":'updated'})
})



// delete

hospital.delete('/',(req,res)=>{

    let newKidneys = []
    users[0].kidney.filter((i)=>{
        if(i.healthy){
            newKidneys.push({healthy:true})
        }
    })

    users[0].kidney =newKidneys
    res.json({"msg":`${newKidneys.length}`})
})

// hospital address
hospital.listen(3004)