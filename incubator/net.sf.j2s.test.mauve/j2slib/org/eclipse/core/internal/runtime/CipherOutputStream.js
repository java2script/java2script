Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["java.io.FilterOutputStream"], "org.eclipse.core.internal.runtime.CipherOutputStream", ["java.io.IOException", "org.eclipse.core.internal.runtime.Cipher"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cipher = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "CipherOutputStream", java.io.FilterOutputStream);
Clazz.makeConstructor (c$, 
function (os, password) {
Clazz.superConstructor (this, org.eclipse.core.internal.runtime.CipherOutputStream, [os]);
this.cipher =  new org.eclipse.core.internal.runtime.Cipher (1, password);
}, "java.io.OutputStream,~S");
Clazz.defineMethod (c$, "write", 
function (b) {
try {
this.out.write (this.cipher.cipher (b));
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
throw  new java.io.IOException (e.getMessage ());
} else {
throw e;
}
}
}, "~N");
});
