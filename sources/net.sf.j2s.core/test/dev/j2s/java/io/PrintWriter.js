Clazz.declarePackage ("java.io");
Clazz.load (["java.io.Writer"], "java.io.PrintWriter", ["java.io.File", "$.IOException", "java.lang.Appendable", "$.Thread", "java.io.BufferedWriter", "$.File", "$.OutputStreamWriter", "$.PrintStream", "java.util.Formatter", "$.Locale", "swingjs.api.Interface"], function () {
c$ = Clazz.decorateAsClass (function () {
this.out = null;
this.autoFlush = false;
this.trouble = false;
this.formatter = null;
this.psOut = null;
this.lineSeparator = null;
Clazz.instantialize (this, arguments);
}, java.io, "PrintWriter", java.io.Writer);
Clazz.makeConstructor (c$, 
function (out) {
this.construct (out, false);
}, "java.io.Writer");
Clazz.makeConstructor (c$, 
function (out, autoFlush) {
Clazz.superConstructor (this, java.io.PrintWriter, [out]);
this.out = out;
this.autoFlush = autoFlush;
this.lineSeparator = System.lineSeparator ();
}, "java.io.Writer,~B");
Clazz.makeConstructor (c$, 
function (out) {
this.construct (out, false);
}, "java.io.OutputStream");
Clazz.makeConstructor (c$, 
function (out, autoFlush) {
this.construct ( new java.io.BufferedWriter ( new java.io.OutputStreamWriter (out)), autoFlush);
if (Clazz.instanceOf (out, java.io.PrintStream)) {
this.psOut = out;
}}, "java.io.OutputStream,~B");
Clazz.makeConstructor (c$, 
function (fileName) {
this.construct ( new java.io.BufferedWriter ( new java.io.OutputStreamWriter (java.io.PrintWriter.newFileOutputStream ( new java.io.File (fileName)))), false);
}, "~S");
Clazz.makeConstructor (c$, 
function (fileName, csn) {
this.construct ( new java.io.BufferedWriter ( new java.io.OutputStreamWriter (java.io.PrintWriter.newFileOutputStream ( new java.io.File (fileName)), csn)), false);
}, "~S,~S");
c$.newFileOutputStream = Clazz.defineMethod (c$, "newFileOutputStream", 
 function (file) {
return swingjs.api.Interface.getInstanceWithParams ("java.io.FileOutputStream",  Clazz.newArray (-1, [java.io.File]),  Clazz.newArray (-1, [file]));
}, "java.io.File");
Clazz.makeConstructor (c$, 
function (file) {
this.construct ( new java.io.BufferedWriter ( new java.io.OutputStreamWriter (java.io.PrintWriter.newFileOutputStream (file))), false);
}, "java.io.File");
Clazz.makeConstructor (c$, 
function (file, csn) {
this.construct ( new java.io.BufferedWriter ( new java.io.OutputStreamWriter (java.io.PrintWriter.newFileOutputStream (file), csn)), false);
}, "java.io.File,~S");
Clazz.defineMethod (c$, "ensureOpen", 
 function () {
if (this.out == null) throw  new java.io.IOException ("Stream closed");
});
Clazz.defineMethod (c$, "flush", 
function () {
try {
{
this.ensureOpen ();
this.out.flush ();
}} catch (x) {
if (Clazz.exceptionOf (x, java.io.IOException)) {
this.trouble = true;
} else {
throw x;
}
}
});
Clazz.defineMethod (c$, "close", 
function () {
try {
{
if (this.out == null) return;
this.out.close ();
this.out = null;
}} catch (x) {
if (Clazz.exceptionOf (x, java.io.IOException)) {
this.trouble = true;
} else {
throw x;
}
}
});
Clazz.defineMethod (c$, "checkError", 
function () {
if (this.out != null) {
this.flush ();
}if (Clazz.instanceOf (this.out, java.io.PrintWriter)) {
var pw = this.out;
return pw.checkError ();
} else if (this.psOut != null) {
return this.psOut.checkError ();
}return this.trouble;
});
Clazz.defineMethod (c$, "setError", 
function () {
this.trouble = true;
});
Clazz.defineMethod (c$, "clearError", 
function () {
this.trouble = false;
});
Clazz.defineMethod (c$, "write", 
function (c) {
try {
{
this.ensureOpen ();
this.out.write (c);
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.io.InterruptedIOException)) {
var x = e$$;
{
Thread.currentThread ().interrupt ();
}
} else if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var x = e$$;
{
this.trouble = true;
}
} else {
throw e$$;
}
}
}, "~N");
Clazz.defineMethod (c$, "write", 
function (buf, off, len) {
try {
{
this.ensureOpen ();
this.out.write (buf, off, len);
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.io.InterruptedIOException)) {
var x = e$$;
{
Thread.currentThread ().interrupt ();
}
} else if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var x = e$$;
{
this.trouble = true;
}
} else {
throw e$$;
}
}
}, "~A,~N,~N");
Clazz.defineMethod (c$, "write", 
function (buf) {
this.write (buf, 0, buf.length);
}, "~A");
Clazz.defineMethod (c$, "write", 
function (s, off, len) {
try {
{
this.ensureOpen ();
this.out.write (s, off, len);
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.io.InterruptedIOException)) {
var x = e$$;
{
Thread.currentThread ().interrupt ();
}
} else if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var x = e$$;
{
this.trouble = true;
}
} else {
throw e$$;
}
}
}, "~S,~N,~N");
Clazz.defineMethod (c$, "write", 
function (s) {
this.write (s, 0, s.length);
}, "~S");
Clazz.defineMethod (c$, "newLine", 
 function () {
try {
{
this.ensureOpen ();
this.out.write (this.lineSeparator);
if (this.autoFlush) this.out.flush ();
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.io.InterruptedIOException)) {
var x = e$$;
{
Thread.currentThread ().interrupt ();
}
} else if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var x = e$$;
{
this.trouble = true;
}
} else {
throw e$$;
}
}
});
Clazz.defineMethod (c$, "print", 
function (b) {
this.write (b ? "true" : "false");
}, "~B");
Clazz.defineMethod (c$, "print", 
function (c) {
this.write (c.charCodeAt (0));
}, "~S");
Clazz.defineMethod (c$, "print", 
function (i) {
this.write (String.valueOf (i));
}, "~N");
Clazz.defineMethod (c$, "print", 
function (l) {
this.write (String.valueOf (l));
}, "~N");
Clazz.defineMethod (c$, "print", 
function (f) {
this.write (String.valueOf (f));
}, "~N");
Clazz.defineMethod (c$, "print", 
function (d) {
this.write (String.valueOf (d));
}, "~N");
Clazz.defineMethod (c$, "print", 
function (s) {
this.write (s);
}, "~A");
Clazz.defineMethod (c$, "print", 
function (s) {
if (s == null) {
s = "null";
}this.write (s);
}, "~S");
Clazz.defineMethod (c$, "print", 
function (obj) {
this.write (String.valueOf (obj));
}, "~O");
Clazz.defineMethod (c$, "println", 
function () {
this.newLine ();
});
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.println ();
}}, "~B");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.println ();
}}, "~S");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.println ();
}}, "~N");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.println ();
}}, "~N");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.println ();
}}, "~N");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.println ();
}}, "~N");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.println ();
}}, "~A");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.println ();
}}, "~S");
Clazz.defineMethod (c$, "println", 
function (x) {
var s = String.valueOf (x);
{
this.print (s);
this.println ();
}}, "~O");
Clazz.defineMethod (c$, "printf", 
function (format, args) {
return this.format (format, args);
}, "~S,~A");
Clazz.defineMethod (c$, "printf", 
function (l, format, args) {
return this.format (l, format, args);
}, "java.util.Locale,~S,~A");
Clazz.defineMethod (c$, "format", 
function (format, args) {
try {
{
this.ensureOpen ();
if ((this.formatter == null) || (this.formatter.locale () !== java.util.Locale.getDefault ())) this.formatter = this.newFormatter ();
this.formatter.format (java.util.Locale.getDefault (), format, args);
if (this.autoFlush) this.out.flush ();
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.io.InterruptedIOException)) {
var x = e$$;
{
Thread.currentThread ().interrupt ();
}
} else if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var x = e$$;
{
this.trouble = true;
}
} else {
throw e$$;
}
}
return this;
}, "~S,~A");
Clazz.defineMethod (c$, "newFormatter", 
 function () {
return swingjs.api.Interface.getInstanceWithParams ("java.util.Formatter",  Clazz.newArray (-1, [Appendable]),  Clazz.newArray (-1, [this]));
});
Clazz.defineMethod (c$, "format", 
function (l, format, args) {
try {
{
this.ensureOpen ();
if ((this.formatter == null) || (this.formatter.locale () !== l)) this.formatter =  new java.util.Formatter (this, l);
this.formatter.format (l, format, args);
if (this.autoFlush) this.out.flush ();
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.io.InterruptedIOException)) {
var x = e$$;
{
Thread.currentThread ().interrupt ();
}
} else if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var x = e$$;
{
this.trouble = true;
}
} else {
throw e$$;
}
}
return this;
}, "java.util.Locale,~S,~A");
Clazz.defineMethod (c$, "append", 
function (csq) {
if (csq == null) this.write ("null");
 else this.write (csq.toString ());
return this;
}, "CharSequence");
Clazz.defineMethod (c$, "append", 
function (s) {
if (s == null) this.write ("null");
 else this.write (s);
return this;
}, "~S");
Clazz.defineMethod (c$, "append", 
function (csq, start, end) {
this.write (csq == null ? "null" : csq.subSequence (start, end).toString ());
return this;
}, "CharSequence,~N,~N");
Clazz.defineMethod (c$, "append", 
function (s, start, end) {
this.write (s == null ? "null" : s.substring (start, end));
return this;
}, "~S,~N,~N");
});
