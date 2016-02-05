# jsynth-waveform

This javascript module makes audio visual. It draws to an html canvas context.

``
npm install jsynth-waveform
```

## To Use

Pass waveformer a param object. You must pass at least a #canvas element and either an HTML webAudio #source node, such as returned by [jsynth-file-sample](https://github.com/NHQ/jsynth-file-sample), or a single dimension #buffer, typically a Float32Array.

Optionally you can also pass #in and #out offset times (in samples), and the #chunkSize. The #chunkSize sets the window of averages used to create the waveform. Using #chunkSize with #in and #out gives you complete control to animate any window of the buffer, down to any number of samples. The default is to draw the whole thing. There are some other options as well:

Parameter options:
#buffer //  a raw audio buffer, or
#source // an HTML webAudio sourceBufferNode
#canvas // an HTML canvas element
#chunkSize // the resolution of the frames. Integer in samples. Defaults to Math.floor(48000 / 360);
#in // the begin offset in the audio buffer to draw, defaults to 0
#out // the end offset to draw, defaults to buffer.length
#positive // the positive color space value, any CSS color string
#negative // the negative color space value, ibid.
#bg // the main bg gradient color, css color string. Blends to white.
#x // the x xoordinate on the canvas to start at, defaults to 0
#y // ibid for y-coordinate, defaults to 0, these allow the illustration to be offset in a larger convas
#width // width of the visual, defualts to width of canvas
#height // height, defaults to height of canvas

## Example

To run the example in this repo, you need to use Browserify with BRFS, or just use [opa](https://github.com/nhq/opa)

do:
```
npm install -g browserify opa
```
there are a few example files, to run them, try:
```
git clone git@github.com:NHQ/jsynth-waveform.git
cd jsynth-waveform
opa -e ex2.js -n // open localhost:11001
```
ex1.js needs jsynth-file-sample.

```
npm install jsynth-file-saple
```
