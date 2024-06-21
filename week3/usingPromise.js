//we will use do the same thing in callBackHell file but using promise to eliminate callback hell

function firstFunction(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            try {
                console.log('First function called');
                resolve();
            } catch (error) {
                reject(new Error('Encountered an error in first function'));
            }
        }, 1000);
        
    })
}

function secondFunction(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            try {
                console.log('Second FUnction called')
                resolve();
            } catch (error) {
                reject(new Error('Encuntered an error in second function'))
            }
        },4000)
    })
}

function thirdFunction(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            try {
                console.log('Third function called')
                resolve();
            } catch (error) {
                reject(new Error('Encuntered an error in third function'))
            }
        },300)
    })
}

function allFunction(){
    console.log('All functions called')
}


 function main (){
    try {
        firstFunction().then(secondFunction).then(thirdFunction).then(allFunction)
    } catch (error) {
        console.error('Error:', error);
    }
}
main()