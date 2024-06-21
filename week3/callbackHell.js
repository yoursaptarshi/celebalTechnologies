
//call back hell
function firstFunction(callback){
    setTimeout(()=>{
        console.log('First function called')
    },1000)
    callback()
}
function secondFunction(callback){
    setTimeout(()=>{
        console.log('second function called')
    })
    callback()
}

function thirdFunction(callback){
    setTimeout(()=>{
        console.log('Third Function called')
    },1000)
    callback();
}

function allFUnction(){
    console.log('all fucntion called')
    
}

firstFunction(()=>{
    secondFunction(()=>{
        thirdFunction(()=>{
            allFUnction()
        })
    })
})