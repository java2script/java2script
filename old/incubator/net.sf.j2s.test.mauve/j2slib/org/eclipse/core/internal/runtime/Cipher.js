Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (null, "org.eclipse.core.internal.runtime.Cipher", ["java.security.MessageDigest", "java.util.Random"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mode = 0;
this.password = null;
this.byteStream = null;
this.byteStreamOffset = 0;
this.digest = null;
this.random = null;
this.toDigest = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "Cipher");
Clazz.makeConstructor (c$, 
function (mode, passwordString) {
this.mode = mode;
try {
this.password = passwordString.getBytes ("UTF8");
} catch (e) {
if (Clazz.instanceOf (e, java.io.UnsupportedEncodingException)) {
this.password = passwordString.getBytes ();
} else {
throw e;
}
}
this.toDigest =  Clazz.newArray (this.password.length + 16, 0);
}, "~N,~S");
Clazz.defineMethod (c$, "cipher", 
function (data) {
return this.transform (data, 0, data.length, this.mode);
}, "~A");
Clazz.defineMethod (c$, "cipher", 
function (data, off, len) {
return this.transform (data, off, len, this.mode);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "cipher", 
function (datum) {
var data = [datum];
return this.cipher (data)[0];
}, "~N");
Clazz.defineMethod (c$, "generateBytes", 
($fz = function () {
if (this.digest == null) {
this.digest = java.security.MessageDigest.getInstance ("SHA");
var seed = 0;
for (var i = 0; i < this.password.length; i++) seed = (seed * 37) + this.password[i];

this.random =  new java.util.Random (seed);
}this.random.nextBytes (this.toDigest);
System.arraycopy (this.password, 0, this.toDigest, 0, this.password.length);
return this.digest.digest (this.toDigest);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "nextRandom", 
($fz = function (length) {
var nextRandom =  Clazz.newArray (length, 0);
var nextRandomOffset = 0;
while (nextRandomOffset < length) {
if (this.byteStream == null || this.byteStreamOffset >= this.byteStream.length) {
this.byteStream = this.generateBytes ();
this.byteStreamOffset = 0;
}nextRandom[nextRandomOffset++] = this.byteStream[this.byteStreamOffset++];
}
return nextRandom;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "transform", 
($fz = function (data, off, len, mod) {
var result = this.nextRandom (len);
for (var i = 0; i < len; ++i) {
result[i] = (data[i + off] + mod * result[i]);
}
return result;
}, $fz.isPrivate = true, $fz), "~A,~N,~N,~N");
Clazz.defineStatics (c$,
"DECRYPT_MODE", -1,
"ENCRYPT_MODE", 1,
"RANDOM_SIZE", 16);
});
