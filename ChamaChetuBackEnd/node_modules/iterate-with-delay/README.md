Loop over array but with time delay 

<img alt='' src='https://api.travis-ci.org/coderofsalvation/iterate-with-delay.git'/>

## Usage

    npm install iterate-with-delay

## Features

* iterates over array or object but pauses inbetween
* uses callback for each element
* calls extra callback when done

## Example: arrays

    delay = require('iterate-with-delay')

    arr = ["one","two","three"];

    delay.each( arr, { time:1000 }, function(el,k){

      console.log( new Date()+"element received: "+k+" -> "+el );

    },function(num){

      console.log("finished processing "+num+" items");

    });

## Example: objects 

    delay = require('iterate-with-delay')

    arr = ["one","two","three"];

    delay.each( arr, { time:1000 }, function(el,k){

      console.log( new Date()+"element received: "+k+" -> "+el );

    },function(num){

      console.log("finished processing "+num+" items");

    });

## Example: wrapper 

    ms    = 500
    delay = require('iterate-with-delay')
    delayEach = function(arr,cb){
      delay arr, {time:ms}, cb
    }

    // now use delayEach in your application, and 
    // use ms to control the delay on a global level
