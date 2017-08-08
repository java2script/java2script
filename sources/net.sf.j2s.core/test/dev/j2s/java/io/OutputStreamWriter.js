Clazz.declarePackage ("java.io");
Clazz.load (["java.io.Writer"], "java.io.OutputStreamWriter", ["java.io.OutputStreamWriter", "$.StringWriter", "$.UnsupportedEncodingException", "swingjs.api.Interface"], function () {
c$ = Clazz.decorateAsClass (function () {
this.charsetName = null;
this.stream = null;
this.writer = null;
Clazz.instantialize (this, arguments);
}, java.io, "OutputStreamWriter", java.io.Writer);
Clazz.makeConstructor (c$, 
function (out, charsetName) {
Clazz.superConstructor (this, java.io.OutputStreamWriter, [out]);
this.stream = out;
this.setCharset (charsetName);
}, "java.io.OutputStream,~S");
Clazz.defineMethod (c$, "setCharset", 
 function (charsetName) {
if (charsetName == null) charsetName = "UTF-8";
if (!charsetName.equals ("UTF-8")) throw  new java.io.UnsupportedEncodingException ();
this.charsetName = "UTF-8";
this.writer =  new java.io.StringWriter ();
}, "~S");
Clazz.makeConstructor (c$, 
function (out) {
Clazz.superConstructor (this, java.io.OutputStreamWriter, [out]);
this.stream = out;
try {
this.setCharset (null);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.UnsupportedEncodingException)) {
} else {
throw e;
}
}
}, "java.io.OutputStream");
Clazz.defineMethod (c$, "getEncoding", 
function () {
return this.charsetName;
});
Clazz.defineMethod (c$, "flushBuffer", 
function () {
this.flush ();
});
Clazz.defineMethod (c$, "write", 
function (c) {
var ch = '\u0000';
this.writer.write (ch.charCodeAt (0));
}, "~N");
Clazz.defineMethod (c$, "write", 
function (cbuf, off, len) {
this.writer.write (cbuf, off, len);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "write", 
function (str, off, len) {
this.writer.write (str, off, len);
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "flush", 
function () {
this.writer.flush ();
var s = this.writer.getBuffer ().toString ();
if (s.length > 0) {
var buf = s.getBytes ();
this.stream.write (buf, 0, buf.length);
}this.writer =  new java.io.StringWriter ();
});
Clazz.overrideMethod (c$, "close", 
function () {
this.flush ();
this.writer.close ();
this.stream.close ();
});
Clazz.defineMethod (c$, "getBufferedWriter", 
function () {
return swingjs.api.Interface.getInstanceWithParams ("java.io.BufferedWriter",  Clazz.newArray (-1, [java.io.OutputStreamWriter]),  Clazz.newArray (-1, [this]));
});
});
