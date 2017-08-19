Clazz.declarePackage ("sun.audio");
Clazz.load (["JU.JSThread"], "sun.audio.AudioPlayer", ["swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (sun.audio, "AudioPlayer", JU.JSThread);
c$.getAudioPlayer = Clazz.defineMethod (c$, "getAudioPlayer", 
 function () {
return  new sun.audio.AudioPlayer ();
});
Clazz.overrideMethod (c$, "myInit", 
function () {
return false;
});
Clazz.overrideMethod (c$, "isLooping", 
function () {
return false;
});
Clazz.overrideMethod (c$, "myLoop", 
function () {
return false;
});
Clazz.overrideMethod (c$, "whenDone", 
function () {
});
Clazz.overrideMethod (c$, "getDelayMillis", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "onException", 
function (e) {
}, "Exception");
Clazz.overrideMethod (c$, "doFinally", 
function () {
});
Clazz.defineMethod (c$, "start", 
function (ads) {
try {
swingjs.JSToolkit.playAudio (ads.getAudioData ().buffer, ads.getAudioData ().format);
} catch (e) {
if (Clazz.exceptionOf (e, javax.sound.sampled.UnsupportedAudioFileException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}, "sun.audio.AudioDataStream");
c$.player = c$.prototype.player = sun.audio.AudioPlayer.getAudioPlayer ();
});
