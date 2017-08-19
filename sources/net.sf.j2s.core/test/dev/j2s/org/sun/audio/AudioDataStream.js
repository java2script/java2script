Clazz.declarePackage ("sun.audio");
Clazz.load (["java.io.ByteArrayInputStream"], "sun.audio.AudioDataStream", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.ad = null;
Clazz.instantialize (this, arguments);
}, sun.audio, "AudioDataStream", java.io.ByteArrayInputStream);
Clazz.makeConstructor (c$, 
function (data) {
Clazz.superConstructor (this, sun.audio.AudioDataStream, [data.buffer]);
this.ad = data;
}, "sun.audio.AudioData");
Clazz.defineMethod (c$, "getAudioData", 
function () {
return this.ad;
});
});
