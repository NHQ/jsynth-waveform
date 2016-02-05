module.exports = function(opts){

  var ctx = opts.canvas.getContext('2d');
  var h = opts.height || ctx.canvas.offsetHeight;
  var w = opts.width || ctx.canvas.offsetWidth;
  var bx = opts.x || 0
  var by = opts.y || 0
  var results =  avg(opts);
  var high = results.reduce(function(x,y){return Math.max(x,y)});
  var low = results.reduce(function(x,y){return Math.min(x,y)});
  var avg2 = results.reduce(function(x,y){return x + y})/results.length
  console.log(avg2)
  var s = shift(avg2);
  var pos = opts.positive || 'rgba(20,20,20,1)';
  var neg = opts.negative || 'rgba(255,255,255,.1)';
  var data = results.map(function(x){
    return x * s
  })

  ctx.clearRect(bx,by,w,h)
  var g = ctx.createLinearGradient(bx, by, bx, by + h)
  g.addColorStop(0, opts.bg || 'rgba(20,20,20,1)');
  g.addColorStop(.5, 'rgba(255,255,255,1)');
  g.addColorStop(1, opts.bg || 'rgba(20,20,20,1)');
  ctx.fillStyle = g;
  ctx.fillRect(bx, by, w, h);
  for(var x in data){
    var norm = Math.min(1, Math.abs(data[x]));
    var grad = ctx.createLinearGradient(bx + ((w/data.length)*x), by, bx + ((w/data.length)*x), by + h);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(.5 - (norm/8), 'rgba(255,255,255,.05)');
    grad.addColorStop(.5 - (norm/4), pos);
    grad.addColorStop(.5 + (norm/4), pos);
    grad.addColorStop(.5 + (norm/8), 'rgba(255,255,255,.05)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ctx.strokeStyle = grad//'rgba(230,10,10,1)'
    ctx.fillRect(bx + ((w/data.length)*x), by, w/data.length, h)
    ctx.strokeRect(bx + ((w/data.length)*x), by, w/data.length, h)
  }
  for(var x in data){
    var norm = Math.min(1, Math.abs(data[x]));
    var grad = ctx.createLinearGradient(bx + ((w/data.length)*x), by, bx + ((w/data.length)*x), by + h);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(.5 - (norm/8), pos);
    grad.addColorStop(.5 - (norm/4),  neg);
    grad.addColorStop(.5 + (norm/4),  neg);
    grad.addColorStop(.5 + (norm/8),  pos);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ctx.strokeStyle = grad//'rgba(230,10,10,1)'
    ctx.fillRect(bx + ((w/data.length)*x), by, w/data.length, h)
    ctx.strokeRect(bx + ((w/data.length)*x), by, w/data.length, h)
  }

  return  data

}

function normalize(x,A,B){
    return ((x-A)*(1-0))/(B-A)
}

function shift(val){

  var x = .0000000001;
  var y = 0;

  function s(v){
    x*=10;
    y = v * x
    return (y >= .1 && y <= 1.09) ? x : s(v)
  }

  return s(val)

}

function avg(opts){

    var chunkSize = opts.chunkSize || 1024
    var buffer, chans;
    var channels = [];
    var results = [];
    var bucket = 0;
    var result = 0;

    if(opts.source) {
      buffer = opts.source.buffer;
      chans = opts.source.buffer.numberOfChannels;
      for(var x = 0; x < chans; x++){
          channels.push(buffer.getChannelData(x));
      }
    }
    else {
      buffer = opts.buffer;
      chans = 1;
      channels.push(buffer);
    }

    var IN = opts.in || 0;
    var OUT = opts.out || buffer.length ;

    for(var x = IN; x < OUT; x++){
      for(var y = 0; y < chans; y++){
          var l = (Math.log(Math.abs(channels[y][x])) / Math.log(10))
          if(Math.abs(l) === Infinity) l = 0
          result += 20 * -l
      }
      bucket++;
      if(bucket === chunkSize){
        results.push(result/(chunkSize*chans));
        result = 0;
        bucket = 0;
      }
  }

    return results 
}
