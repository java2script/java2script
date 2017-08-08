Clazz.declarePackage ("java.awt.image");
Clazz.load (null, "java.awt.image.Kernel", ["java.lang.IllegalArgumentException", "$.InternalError"], function () {
c$ = Clazz.decorateAsClass (function () {
this.width = 0;
this.height = 0;
this.xOrigin = 0;
this.yOrigin = 0;
this.data = null;
Clazz.instantialize (this, arguments);
}, java.awt.image, "Kernel", null, Cloneable);
Clazz.makeConstructor (c$, 
function (width, height, data) {
this.width = width;
this.height = height;
this.xOrigin = (width - 1) >> 1;
this.yOrigin = (height - 1) >> 1;
var len = width * height;
if (data.length < len) {
throw  new IllegalArgumentException ("Data array too small (is " + data.length + " and should be " + len);
}this.data =  Clazz.newFloatArray (len, 0);
System.arraycopy (data, 0, this.data, 0, len);
}, "~N,~N,~A");
Clazz.defineMethod (c$, "getXOrigin", 
function () {
return this.xOrigin;
});
Clazz.defineMethod (c$, "getYOrigin", 
function () {
return this.yOrigin;
});
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "getKernelData", 
function (data) {
if (data == null) {
data =  Clazz.newFloatArray (this.data.length, 0);
} else if (data.length < this.data.length) {
throw  new IllegalArgumentException ("Data array too small (should be " + this.data.length + " but is " + data.length + " )");
}System.arraycopy (this.data, 0, data, 0, this.data.length);
return data;
}, "~A");
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, java.awt.image.Kernel, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
});
