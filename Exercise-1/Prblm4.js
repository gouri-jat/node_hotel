//Array day --4
var prompt = require('prompt-sync')();
const name = prompt("Enter your name : ");
var guestList = ["Ram","Mohan","Krishna","Kanha","Shyam","Radhe"];
if(guestList.includes(name)){
    console.log("Welcome to the party" + [name] + "!");
}
else{
    console.log("Sorry, You're not on the guestList!");
}