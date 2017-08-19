Clazz.declarePackage ("sun.audio");
Clazz.load (["javax.sound.sampled.AudioFormat"], "sun.audio.AudioData", ["java.io.ByteArrayInputStream", "javax.sound.sampled.AudioSystem"], function () {
c$ = Clazz.decorateAsClass (function () {
this.format = null;
this.buffer = null;
Clazz.instantialize (this, arguments);
}, sun.audio, "AudioData");
Clazz.makeConstructor (c$, 
function (buffer) {
this.buffer = buffer;
this.format = sun.audio.AudioData.DEFAULT_FORMAT;
try {
var ais = javax.sound.sampled.AudioSystem.getAudioInputStream ( new java.io.ByteArrayInputStream (buffer));
this.format = ais.getFormat ();
ais.close ();
} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var e = e$$;
{
}
} else if (Clazz.exceptionOf (e$$, javax.sound.sampled.UnsupportedAudioFileException)) {
var e1 = e$$;
{
}
} else {
throw e$$;
}
}
}, "~A");
Clazz.makeConstructor (c$, 
function (format, buffer) {
this.format = format;
this.buffer = buffer;
}, "javax.sound.sampled.AudioFormat,~A");
c$.DEFAULT_FORMAT = c$.prototype.DEFAULT_FORMAT =  new javax.sound.sampled.AudioFormat (javax.sound.sampled.AudioFormat.Encoding.ULAW, 8000, 8, 1, 1, 8000, true);
});
