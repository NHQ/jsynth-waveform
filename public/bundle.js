(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/johnny/projects/jsynth-waveform/index.js":[function(require,module,exports){
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

  var x = .00000000001;
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
	    result += Math.abs(channels[y][x])
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

},{}]},{},["/home/johnny/projects/jsynth-waveform/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qb2hubnkvcHJvamVjdHMvanN5bnRoLXdhdmVmb3JtL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3B0cyl7XG5cbiAgdmFyIGN0eCA9IG9wdHMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIHZhciBoID0gb3B0cy5oZWlnaHQgfHwgY3R4LmNhbnZhcy5vZmZzZXRIZWlnaHQ7XG4gIHZhciB3ID0gb3B0cy53aWR0aCB8fCBjdHguY2FudmFzLm9mZnNldFdpZHRoO1xuICB2YXIgYnggPSBvcHRzLnggfHwgMFxuICB2YXIgYnkgPSBvcHRzLnkgfHwgMFxuICB2YXIgcmVzdWx0cyA9ICBhdmcob3B0cyk7XG4gIHZhciBoaWdoID0gcmVzdWx0cy5yZWR1Y2UoZnVuY3Rpb24oeCx5KXtyZXR1cm4gTWF0aC5tYXgoeCx5KX0pO1xuICB2YXIgbG93ID0gcmVzdWx0cy5yZWR1Y2UoZnVuY3Rpb24oeCx5KXtyZXR1cm4gTWF0aC5taW4oeCx5KX0pO1xuICB2YXIgYXZnMiA9IHJlc3VsdHMucmVkdWNlKGZ1bmN0aW9uKHgseSl7cmV0dXJuIHggKyB5fSkvcmVzdWx0cy5sZW5ndGhcbiAgdmFyIHMgPSBzaGlmdChhdmcyKTtcbiAgdmFyIHBvcyA9IG9wdHMucG9zaXRpdmUgfHwgJ3JnYmEoMjAsMjAsMjAsMSknO1xuICB2YXIgbmVnID0gb3B0cy5uZWdhdGl2ZSB8fCAncmdiYSgyNTUsMjU1LDI1NSwuMSknO1xuICB2YXIgZGF0YSA9IHJlc3VsdHMubWFwKGZ1bmN0aW9uKHgpe1xuICAgIHJldHVybiB4ICogc1xuICB9KVxuXG4gIGN0eC5jbGVhclJlY3QoYngsYnksdyxoKVxuICB2YXIgZyA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudChieCwgYnksIGJ4LCBieSArIGgpXG4gIGcuYWRkQ29sb3JTdG9wKDAsIG9wdHMuYmcgfHwgJ3JnYmEoMjAsMjAsMjAsMSknKTtcbiAgZy5hZGRDb2xvclN0b3AoLjUsICdyZ2JhKDI1NSwyNTUsMjU1LDEpJyk7XG4gIGcuYWRkQ29sb3JTdG9wKDEsIG9wdHMuYmcgfHwgJ3JnYmEoMjAsMjAsMjAsMSknKTtcbiAgY3R4LmZpbGxTdHlsZSA9IGc7XG4gIGN0eC5maWxsUmVjdChieCwgYnksIHcsIGgpO1xuICBmb3IodmFyIHggaW4gZGF0YSl7XG4gICAgdmFyIG5vcm0gPSBNYXRoLm1pbigxLCBNYXRoLmFicyhkYXRhW3hdKSk7XG4gICAgdmFyIGdyYWQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoYnggKyAoKHcvZGF0YS5sZW5ndGgpKngpLCBieSwgYnggKyAoKHcvZGF0YS5sZW5ndGgpKngpLCBieSArIGgpO1xuICAgIGdyYWQuYWRkQ29sb3JTdG9wKDAsICdyZ2JhKDAsMCwwLDApJyk7XG4gICAgZ3JhZC5hZGRDb2xvclN0b3AoLjUgLSAobm9ybS84KSwgJ3JnYmEoMjU1LDI1NSwyNTUsLjA1KScpO1xuICAgIGdyYWQuYWRkQ29sb3JTdG9wKC41IC0gKG5vcm0vNCksIHBvcyk7XG4gICAgZ3JhZC5hZGRDb2xvclN0b3AoLjUgKyAobm9ybS80KSwgcG9zKTtcbiAgICBncmFkLmFkZENvbG9yU3RvcCguNSArIChub3JtLzgpLCAncmdiYSgyNTUsMjU1LDI1NSwuMDUpJyk7XG4gICAgZ3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMCwwLDAsMCknKTtcbiAgICBjdHguZmlsbFN0eWxlID0gY3R4LnN0cm9rZVN0eWxlID0gZ3JhZC8vJ3JnYmEoMjMwLDEwLDEwLDEpJ1xuICAgIGN0eC5maWxsUmVjdChieCArICgody9kYXRhLmxlbmd0aCkqeCksIGJ5LCB3L2RhdGEubGVuZ3RoLCBoKVxuICAgIGN0eC5zdHJva2VSZWN0KGJ4ICsgKCh3L2RhdGEubGVuZ3RoKSp4KSwgYnksIHcvZGF0YS5sZW5ndGgsIGgpXG4gIH1cbiAgZm9yKHZhciB4IGluIGRhdGEpe1xuICAgIHZhciBub3JtID0gTWF0aC5taW4oMSwgTWF0aC5hYnMoZGF0YVt4XSkpO1xuICAgIHZhciBncmFkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KGJ4ICsgKCh3L2RhdGEubGVuZ3RoKSp4KSwgYnksIGJ4ICsgKCh3L2RhdGEubGVuZ3RoKSp4KSwgYnkgKyBoKTtcbiAgICBncmFkLmFkZENvbG9yU3RvcCgwLCAncmdiYSgwLDAsMCwwKScpO1xuICAgIGdyYWQuYWRkQ29sb3JTdG9wKC41IC0gKG5vcm0vOCksIHBvcyk7XG4gICAgZ3JhZC5hZGRDb2xvclN0b3AoLjUgLSAobm9ybS80KSwgIG5lZyk7XG4gICAgZ3JhZC5hZGRDb2xvclN0b3AoLjUgKyAobm9ybS80KSwgIG5lZyk7XG4gICAgZ3JhZC5hZGRDb2xvclN0b3AoLjUgKyAobm9ybS84KSwgIHBvcyk7XG4gICAgZ3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMCwwLDAsMCknKTtcbiAgICBjdHguZmlsbFN0eWxlID0gY3R4LnN0cm9rZVN0eWxlID0gZ3JhZC8vJ3JnYmEoMjMwLDEwLDEwLDEpJ1xuICAgIGN0eC5maWxsUmVjdChieCArICgody9kYXRhLmxlbmd0aCkqeCksIGJ5LCB3L2RhdGEubGVuZ3RoLCBoKVxuICAgIGN0eC5zdHJva2VSZWN0KGJ4ICsgKCh3L2RhdGEubGVuZ3RoKSp4KSwgYnksIHcvZGF0YS5sZW5ndGgsIGgpXG4gIH1cblxuICByZXR1cm4gIGRhdGFcblxufVxuXG5mdW5jdGlvbiBub3JtYWxpemUoeCxBLEIpe1xuICAgIHJldHVybiAoKHgtQSkqKDEtMCkpLyhCLUEpXG59XG5cbmZ1bmN0aW9uIHNoaWZ0KHZhbCl7XG5cbiAgdmFyIHggPSAuMDAwMDAwMDAwMDE7XG4gIHZhciB5ID0gMDtcbiAgZnVuY3Rpb24gcyh2KXtcbiAgICB4Kj0xMDtcbiAgICB5ID0gdiAqIHhcbiAgICByZXR1cm4gKHkgPj0gLjEgJiYgeSA8PSAxLjA5KSA/IHggOiBzKHYpXG4gIH1cblxuICByZXR1cm4gcyh2YWwpXG5cbn1cblxuZnVuY3Rpb24gYXZnKG9wdHMpe1xuXG4gICAgdmFyIGNodW5rU2l6ZSA9IG9wdHMuY2h1bmtTaXplIHx8IDEwMjRcbiAgICB2YXIgYnVmZmVyLCBjaGFucztcbiAgICB2YXIgY2hhbm5lbHMgPSBbXTtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHZhciBidWNrZXQgPSAwO1xuICAgIHZhciByZXN1bHQgPSAwO1xuXG4gICAgaWYob3B0cy5zb3VyY2UpIHtcblx0YnVmZmVyID0gb3B0cy5zb3VyY2UuYnVmZmVyO1xuXHRjaGFucyA9IG9wdHMuc291cmNlLmJ1ZmZlci5udW1iZXJPZkNoYW5uZWxzO1xuXHRmb3IodmFyIHggPSAwOyB4IDwgY2hhbnM7IHgrKyl7XG5cdCAgICBjaGFubmVscy5wdXNoKGJ1ZmZlci5nZXRDaGFubmVsRGF0YSh4KSk7XG5cdH1cbiAgICB9XG4gICAgZWxzZSB7XG5cdGJ1ZmZlciA9IG9wdHMuYnVmZmVyO1xuXHRjaGFucyA9IDE7XG5cdGNoYW5uZWxzLnB1c2goYnVmZmVyKTtcbiAgICB9XG5cbiAgICB2YXIgSU4gPSBvcHRzLmluIHx8IDA7XG4gICAgdmFyIE9VVCA9IG9wdHMub3V0IHx8IGJ1ZmZlci5sZW5ndGggO1xuXG4gICAgZm9yKHZhciB4ID0gSU47IHggPCBPVVQ7IHgrKyl7XG5cdGZvcih2YXIgeSA9IDA7IHkgPCBjaGFuczsgeSsrKXtcblx0ICAgIHJlc3VsdCArPSBNYXRoLmFicyhjaGFubmVsc1t5XVt4XSlcblx0fVxuXHRidWNrZXQrKztcblx0aWYoYnVja2V0ID09PSBjaHVua1NpemUpe1xuXHQgICAgcmVzdWx0cy5wdXNoKHJlc3VsdC8oY2h1bmtTaXplKmNoYW5zKSk7XG5cdCAgICByZXN1bHQgPSAwO1xuXHQgICAgYnVja2V0ID0gMDtcblx0fVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzIFxufVxuIl19
