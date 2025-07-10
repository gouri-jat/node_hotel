var prompt = require('prompt-sync')();
const age = prompt("Please enter your age: ");
if(age <=18){
    console.log("You get discount of 60%");
}else{
    console.log("No discount for you ...");
}