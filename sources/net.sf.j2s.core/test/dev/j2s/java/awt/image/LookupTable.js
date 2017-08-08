Clazz.declarePackage ("java.awt.image");
Clazz.load (null, "java.awt.image.LookupTable", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.numComponents = 0;
this.offset = 0;
this.numEntries = 0;
Clazz.instantialize (this, arguments);
}, java.awt.image, "LookupTable");
Clazz.makeConstructor (c$, 
function (offset, numComponents) {
if (offset < 0) {
throw  new IllegalArgumentException ("Offset must be greater than 0");
}if (numComponents < 1) {
throw  new IllegalArgumentException ("Number of components must  be at least 1");
}this.numComponents = numComponents;
this.offset = offset;
}, "~N,~N");
Clazz.defineMethod (c$, "getNumComponents", 
function () {
return this.numComponents;
});
Clazz.defineMethod (c$, "getOffset", 
function () {
return this.offset;
});
});
