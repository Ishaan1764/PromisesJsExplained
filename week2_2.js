const fs=require("fs");
const { constrainedMemory } = require("process");
//classes
// class Rect{
//     constructor(width,height){
//         this.width=width;
//         this.height=height;
//     }
//     area(){
//         const area=this.width*this.height;
//         return area;
//     }
// }
// const r=new Rect(6,2);//instance of rectangle class or object of the class.
// console.log(r.area());

// //promises.

// //promisified version of set time out.
// function setTimeoutPromisified(ms){
//     return new Promise(resolve=> setTimeout
//     // returns an object of promise class
//     (resolve,ms));

// }
// function callback(){
//     console.log("3 sec have passed");
// }
// setTimeoutPromisified(3000).then(callback)


// //more easier to understand way:

// function waitFor3s(resolve){
//     setTimeout(resolve,3000)
// }

// function setTimeOutPromisified(){
//     return new Promise(waitFor3s);
// }

// function main(){
//     console.log("main Called 3sec after");
// }
// setTimeOutPromisified().then(main);


// //promisified version of readfile\
// //fs .write file, 
// // trims extra space space

// function readFile(resolve){
//     fs.readFile("a.txt","utf-8",(err,data)=>{
//         resolve(data);
//     })
// }
// function promisifiedRead(){
//     return new Promise(readFile);
// }


// function callback(content){
//     console.log("file:"+ content)
// }


// const rea=promisifiedRead()
// rea.then(callback)
// when ever u are creating a promice class give me a function(which does the actual async task) and when the async operation is done then just call the first function taht i gave u as an argument.

//uper uper ste promise class.
class Promise2{
    constructor(fn){
        this.fn=fn;
        this.fn(()=>{
            this.resolve();
        })
    }
    then(callback){
        this.resolve=callback;
    }
}

console.log("--file start--")//1
function readTheFile(resolve){
    setTimeout(()=>{
        console.log("callback based tiime out");//4
        resolve()
    },3000); 
}
function setTimeOutPromisified(){
    console.log("ma setTimeOutpromisified mein hoo!!");//2
    return new Promise2(readTheFile)
}

let p=setTimeOutPromisified();
function callback(){
    console.log("call back have been called.")//5
}
p.then(callback);
console.log("--file ends--")//3
//

// aggar .then na call kre tooo??
// promise lost ho jaega. beacuse humne use use hi nhi keya

//Call back Hell:
// step1: print hi after 1 sec
//Step2: Print hello afetr 3 sec should work afetr step 1 is done.
//step 3: print yo man afdter 5 sec

//simple approach:
setTimeout(()=>{
    console.log("hi")
    setTimeout(()=>{
        console.log("hello");
        setTimeout(()=>{
            console.log("yo yo man");
        },5000)
    },3000)

},1000)

//better is ke sb ke alag set function bna do or unhe call kro .

//sbse beteer hai ke make it promisified.\

function setTimPromisefied(duration){
    return new Promise((resolve)=>{
        setTimeout(resolve,duration)
    })
}
setTimPromisefied(1000).then(()=>{
    console.log("hi");
    setTimPromisefied(3000).then(()=>{
        console.log("hello");
        setTimPromisefied(5000).then(()=>{
            console.log("YOYOYOYOYO");
        });
    });
});

//promiose chaining
setTimPromisefied(1000).then(()=>{
    console.log("hi");
    return setTimPromisefied(3000)
}).then(()=>{
    console.log("hello");
    return setTimPromisefied(5000)
}).then(()=>{
    console.log("YOYOYOYOYO");
});;

//Async Await
async function solve(){
    await setTimPromisefied(1000);
    console.log("hi");
    await setTimPromisefied(3000);
    console.log("kuta");
    await setTimPromisefied(5000);
    console.log("hi therse")
}
solve();