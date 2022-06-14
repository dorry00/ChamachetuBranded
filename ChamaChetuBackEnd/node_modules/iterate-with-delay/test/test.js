#!/usr/bin/env node
delayarr = require('./../.')

arr = ["one","two","three"];
obj = {"one":1,"two":2, "three":3 }

before = new Date().getTime()

delayarr.each( arr, { time:1000 }, function(el,k){
  console.log( new Date()+"element received: "+k+" -> "+el );
},function(num){
  console.log("finished processing "+num+" items");
  after = new Date().getTime()
  console.dir( before )
  console.dir( after )
  if( after < (before+2000) ){
    console.log("ERROR");
    process.exit(1)
  }
});

before = new Date().getTime()

delayarr.each( obj, { time:1000 }, function(el,k){
  console.log( new Date()+"element received: "+k+" -> "+el );
},function(num){
  console.log("finished processing "+num+" items");
  after = new Date().getTime()
  console.dir( before )
  console.dir( after )
  if( after < (before+2000) ){
    console.log("ERROR");
    process.exit(1)
  }
});


