Clazz.declarePackage ("java.util.zip");
Clazz.load (["swingjs.jzlib.InflaterInputStream"], "java.util.zip.InflaterInputStream", ["java.util.zip.Inflater"], function () {
c$ = Clazz.decorateAsClass (function () {
this.inf = null;
this.usesDefaultInflater = false;
Clazz.instantialize (this, arguments);
}, java.util.zip, "InflaterInputStream", swingjs.jzlib.InflaterInputStream);
Clazz.makeConstructor (c$, 
function ($in) {
this.construct ($in,  new java.util.zip.Inflater ().init (0, false));
this.usesDefaultInflater = true;
}, "java.io.InputStream");
Clazz.makeConstructor (c$, 
function ($in, inf) {
this.construct ($in, inf, 512);
}, "java.io.InputStream,java.util.zip.Inflater");
Clazz.makeConstructor (c$, 
function ($in, inflater, size) {
Clazz.superConstructor (this, java.util.zip.InflaterInputStream, [$in, inflater, size, true]);
this.inf = inflater;
}, "java.io.InputStream,java.util.zip.Inflater,~N");
Clazz.defineMethod (c$, "getRemaining", 
function () {
return this.inf.getRemaining ();
});
Clazz.defineMethod (c$, "needsInput", 
function () {
return this.len <= 0;
});
});
