Clazz.declarePackage ("java.util.zip");
Clazz.load (["swingjs.jzlib.Inflater"], "java.util.zip.Inflater", null, function () {
c$ = Clazz.declareType (java.util.zip, "Inflater", swingjs.jzlib.Inflater);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.util.zip.Inflater);
this.initialize (false);
});
Clazz.makeConstructor (c$, 
function (nowrap) {
Clazz.superConstructor (this, java.util.zip.Inflater);
this.initialize (nowrap);
}, "~B");
Clazz.defineMethod (c$, "initialize", 
function (nowrap) {
return this.init (0, nowrap);
}, "~B");
});
