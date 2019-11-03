Clazz.declarePackage ("org.eclipse.osgi.framework.internal.reliablefile");
Clazz.load (["java.io.FilterInputStream"], "org.eclipse.osgi.framework.internal.reliablefile.ReliableFileInputStream", ["java.io.IOException", "org.eclipse.osgi.framework.internal.reliablefile.ReliableFile"], function () {
c$ = Clazz.decorateAsClass (function () {
this.reliable = null;
this.sigSize = 0;
this.readPos = 0;
this.length = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.reliablefile, "ReliableFileInputStream", java.io.FilterInputStream);
Clazz.makeConstructor (c$, 
function (name) {
this.construct (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getReliableFile (name), 0, 0);
}, "~S");
Clazz.makeConstructor (c$, 
function (file) {
this.construct (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getReliableFile (file), 0, 0);
}, "java.io.File");
Clazz.makeConstructor (c$, 
function (file, generation, openMask) {
this.construct (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getReliableFile (file), generation, openMask);
}, "java.io.File,~N,~N");
Clazz.makeConstructor (c$, 
($fz = function (reliable, generation, openMask) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.reliablefile.ReliableFileInputStream, [reliable.getInputStream (generation, openMask)]);
this.reliable = reliable;
this.sigSize = reliable.getSignatureSize ();
this.readPos = 0;
this.length = Clazz.superCall (this, org.eclipse.osgi.framework.internal.reliablefile.ReliableFileInputStream, "available", []);
if (this.sigSize > this.length) this.length = 0;
 else this.length -= this.sigSize;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.reliablefile.ReliableFile,~N,~N");
Clazz.defineMethod (c$, "close", 
function () {
if (this.reliable != null) {
try {
Clazz.superCall (this, org.eclipse.osgi.framework.internal.reliablefile.ReliableFileInputStream, "close", []);
} finally {
this.reliable.closeInputFile ();
this.reliable = null;
}
}});
Clazz.defineMethod (c$, "read", 
function (b, off, len) {
if (this.readPos >= this.length) {
return -1;
}var num = Clazz.superCall (this, org.eclipse.osgi.framework.internal.reliablefile.ReliableFileInputStream, "read", [b, off, len]);
if (num != -1) {
if (num + this.readPos > this.length) {
num = this.length - this.readPos;
}this.readPos += num;
}return num;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "read", 
function (b) {
return this.read (b, 0, b.length);
}, "~A");
Clazz.defineMethod (c$, "read", 
function () {
if (this.readPos >= this.length) {
return -1;
}var num = Clazz.superCall (this, org.eclipse.osgi.framework.internal.reliablefile.ReliableFileInputStream, "read", []);
if (num != -1) {
this.readPos++;
}return num;
});
Clazz.defineMethod (c$, "available", 
function () {
if (this.readPos < this.length) return (this.length - this.readPos);
return 0;
});
Clazz.defineMethod (c$, "skip", 
function (n) {
var len = Clazz.superCall (this, org.eclipse.osgi.framework.internal.reliablefile.ReliableFileInputStream, "skip", [n]);
if (this.readPos + len > this.length) len = this.length - this.readPos;
this.readPos += len;
return len;
}, "~N");
Clazz.overrideMethod (c$, "markSupported", 
function () {
return false;
});
Clazz.overrideMethod (c$, "mark", 
function (readlimit) {
}, "~N");
Clazz.overrideMethod (c$, "reset", 
function () {
throw  new java.io.IOException ("reset not supported.");
});
});
