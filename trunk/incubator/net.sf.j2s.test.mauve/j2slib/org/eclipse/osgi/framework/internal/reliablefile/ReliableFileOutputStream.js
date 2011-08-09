Clazz.declarePackage ("org.eclipse.osgi.framework.internal.reliablefile");
Clazz.load (["java.io.FilterOutputStream"], "org.eclipse.osgi.framework.internal.reliablefile.ReliableFileOutputStream", ["java.io.IOException", "org.eclipse.osgi.framework.internal.reliablefile.ReliableFile"], function () {
c$ = Clazz.decorateAsClass (function () {
this.reliable = null;
this.crc = null;
this.outputOpen = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.reliablefile, "ReliableFileOutputStream", java.io.FilterOutputStream);
Clazz.makeConstructor (c$, 
function (file) {
this.construct (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getReliableFile (file), false);
}, "java.io.File");
Clazz.makeConstructor (c$, 
function (file, append) {
this.construct (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getReliableFile (file), append);
}, "java.io.File,~B");
Clazz.makeConstructor (c$, 
function (name) {
this.construct (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getReliableFile (name), false);
}, "~S");
Clazz.makeConstructor (c$, 
function (name, append) {
this.construct (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getReliableFile (name), append);
}, "~S,~B");
Clazz.makeConstructor (c$, 
($fz = function (reliable, append) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.reliablefile.ReliableFileOutputStream, [reliable.getOutputStream (append, 0)]);
this.reliable = reliable;
this.outputOpen = true;
if (append) this.crc = reliable.getFileChecksum ();
 else this.crc = reliable.getChecksumCalculator ();
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.reliablefile.ReliableFile,~B");
Clazz.overrideMethod (c$, "close", 
function () {
this.closeIntermediateFile ();
this.reliable.closeOutputFile (this.crc);
this.reliable = null;
});
Clazz.defineMethod (c$, "closeIntermediateFile", 
function () {
if (this.reliable == null) throw  new java.io.IOException ("ReliableFile stream not open");
if (this.outputOpen) {
this.reliable.writeChecksumSignature (this.out, this.crc);
this.out.flush ();
try {
(this.out).getFD ().sync ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.out.close ();
this.outputOpen = false;
}return this.reliable.getOutputFile ();
});
Clazz.defineMethod (c$, "write", 
function (b) {
this.write (b, 0, b.length);
}, "~A");
Clazz.defineMethod (c$, "write", 
function (b, off, len) {
this.out.write (b, off, len);
this.crc.update (b, off, len);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "write", 
function (b) {
this.out.write (b);
this.crc.update (b);
}, "~N");
Clazz.defineMethod (c$, "abort", 
function () {
if (this.reliable == null) return ;
if (this.outputOpen) {
try {
this.out.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.outputOpen = false;
}this.reliable.abortOutputFile ();
this.reliable = null;
});
});
