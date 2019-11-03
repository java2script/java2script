Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["java.io.FilterInputStream"], "org.eclipse.core.internal.runtime.CipherInputStream", ["java.io.IOException", "org.eclipse.core.internal.runtime.Cipher"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cipher = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "CipherInputStream", java.io.FilterInputStream);
Clazz.makeConstructor (c$, 
function (is, password) {
Clazz.superConstructor (this, org.eclipse.core.internal.runtime.CipherInputStream, [is]);
this.cipher =  new org.eclipse.core.internal.runtime.Cipher (-1, password);
}, "java.io.InputStream,~S");
Clazz.overrideMethod (c$, "markSupported", 
function () {
return false;
});
Clazz.defineMethod (c$, "read", 
function () {
var b = Clazz.superCall (this, org.eclipse.core.internal.runtime.CipherInputStream, "read", []);
if (b == -1) return -1;
try {
return (this.cipher.cipher (b)) & 0x00ff;
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
throw  new java.io.IOException (e.getMessage ());
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "read", 
function (b, off, len) {
var bytesRead = this.$in.read (b, off, len);
if (bytesRead == -1) return -1;
try {
var result = this.cipher.cipher (b, off, bytesRead);
for (var i = 0; i < result.length; ++i) b[i + off] = result[i];

return bytesRead;
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
throw  new java.io.IOException (e.getMessage ());
} else {
throw e;
}
}
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "skip", 
function (n) {
var buffer =  Clazz.newArray (2048, 0);
var bytesRead = 0;
var bytesRemaining = n;
while (bytesRead != -1 && bytesRemaining > 0) {
bytesRead = this.read (buffer, 0, Math.min (2048, bytesRemaining));
if (bytesRead > 0) {
bytesRemaining -= bytesRead;
}}
return n - bytesRemaining;
}, "~N");
Clazz.defineStatics (c$,
"$SKIP_BUFFER_SIZE", 2048);
});
