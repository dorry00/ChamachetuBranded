module.exports = ( function(){
  
  this.each = function(arr, opts, callback, done_callback){
    var keys = Object.keys(arr);
    var i=0;
    var infinite = opts.infinite || false
    var time = opts.time || 1000 
    var total=keys.length-1;
    var looper=function(){
            callback( arr[ keys[i] ], keys[i] );
            if (i < total ) {
                i++;
            } else { // LOOP END
                if(!infinite) 
                  if( done_callback ) done_callback(i+1);
                  return;
                i=0 //restart
            }
            setTimeout( looper, time);
    }
    looper()
  }

  return this;

}).apply({})
