Clazz.declarePackage ("java.util.zip");
Clazz.load (["swingjs.jzlib.Deflater"], "java.util.zip.Deflater", null, function () {
c$ = Clazz.declareType (java.util.zip, "Deflater", swingjs.jzlib.Deflater);
Clazz.makeConstructor (c$, 
function (compressionLevel) {
Clazz.superConstructor (this, java.util.zip.Deflater, [compressionLevel, false]);
}, "~N");
Clazz.makeConstructor (c$, 
function (compressionLevel, noWrap) {
this.construct (compressionLevel, 0, noWrap);
}, "~N,~B");
Clazz.defineStatics (c$,
"DEFAULT_COMPRESSION", -1,
"DEFLATED", 8,
"DEFAULT_STRATEGY", 0);
});
