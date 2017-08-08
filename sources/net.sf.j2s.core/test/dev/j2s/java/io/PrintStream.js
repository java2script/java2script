Clazz.declarePackage ("java.io");
Clazz.load (["java.lang.Appendable", "java.io.Closeable", "$.FilterOutputStream"], "java.io.PrintStream", ["java.io.IOException", "java.lang.NullPointerException", "$.Thread", "java.io.BufferedWriter", "$.FileOutputStream", "$.OutputStreamWriter", "java.util.Formatter", "$.Locale"], function () {
c$ = Clazz.decorateAsClass (function () {
this.autoFlush = false;
this.trouble = false;
this.formatter = null;
this.bufferedWriter = null;
this.streamWriter = null;
this.closing = false;
Clazz.instantialize (this, arguments);
}, java.io, "PrintStream", java.io.FilterOutputStream, [Appendable, java.io.Closeable]);
Clazz.makeConstructor (c$, 
function (out) {
this.construct (out, false);
}, "java.io.OutputStream");
Clazz.makeConstructor (c$, 
 function (autoFlush, out) {
Clazz.superConstructor (this, java.io.PrintStream, [out]);
if (out == null) throw  new NullPointerException ("Null output stream");
this.autoFlush = autoFlush;
}, "~B,java.io.OutputStream");
Clazz.defineMethod (c$, "init", 
 function (osw) {
this.streamWriter = osw;
this.bufferedWriter =  new java.io.BufferedWriter (osw);
}, "java.io.OutputStreamWriter");
Clazz.makeConstructor (c$, 
function (out, autoFlush) {
this.construct (autoFlush, out);
this.init ( new java.io.OutputStreamWriter (this));
}, "java.io.OutputStream,~B");
Clazz.makeConstructor (c$, 
function (out, autoFlush, encoding) {
this.construct (autoFlush, out);
this.init ( new java.io.OutputStreamWriter (this, encoding));
}, "java.io.OutputStream,~B,~S");
Clazz.makeConstructor (c$, 
function (fileName, csn) {
this.construct (false,  new java.io.FileOutputStream (fileName));
this.init ( new java.io.OutputStreamWriter (this, csn));
}, "~S,~S");
Clazz.makeConstructor (c$, 
function (file) {
this.construct (false,  new java.io.FileOutputStream (file));
this.init ( new java.io.OutputStreamWriter (this));
}, "java.io.File");
Clazz.makeConstructor (c$, 
function (file, csn) {
this.construct (false,  new java.io.FileOutputStream (file));
this.init ( new java.io.OutputStreamWriter (this, csn));
}, "java.io.File,~S");
Clazz.defineMethod (c$, "ensureOpen", 
 function () {
if (this.out == null) throw  new java.io.IOException ("Stream closed");
});
Clazz.overrideMethod (c$, "flush", 
function () {
{
try {
this.ensureOpen ();
this.out.flush ();
} catch (x) {
if (Clazz.exceptionOf (x, java.io.IOException)) {
this.trouble = true;
} else {
throw x;
}
}
}});
Clazz.overrideMethod (c$, "close", 
function () {
{
if (!this.closing) {
this.closing = true;
try {
this.bufferedWriter.close ();
this.out.close ();
} catch (x) {
if (Clazz.exceptionOf (x, java.io.IOException)) {
this.trouble = true;
} else {
throw x;
}
}
this.bufferedWriter = null;
this.streamWriter = null;
this.out = null;
}}});
Clazz.defineMethod (c$, "checkError", 
function () {
if (this.out != null) this.flush ();
if (Clazz.instanceOf (this.out, java.io.PrintStream)) {
var ps = this.out;
return ps.checkError ();
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
function (b) {
try {
{
this.ensureOpen ();
this.out.write (b);
if ((b == 10) && this.autoFlush) this.out.flush ();
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
}, "~A,~N,~N");
Clazz.defineMethod (c$, "write", 
 function (buf) {
try {
{
this.ensureOpen ();
this.bufferedWriter.write (buf);
this.bufferedWriter.flushBuffer ();
this.streamWriter.flushBuffer ();
if (this.autoFlush) {
for (var i = 0; i < buf.length; i++) if (buf[i] == '\n') {
this.out.flush ();
}
}}} catch (e$$) {
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
}, "~A");
Clazz.defineMethod (c$, "write", 
 function (s) {
try {
{
this.ensureOpen ();
this.bufferedWriter.write (s);
this.bufferedWriter.flushBuffer ();
this.streamWriter.flushBuffer ();
if (this.autoFlush && (s.indexOf ('\n') >= 0)) this.out.flush ();
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
}, "~S");
Clazz.defineMethod (c$, "newLine", 
 function () {
try {
{
this.ensureOpen ();
this.bufferedWriter.newLine ();
this.bufferedWriter.flushBuffer ();
this.streamWriter.flushBuffer ();
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
this.write (String.valueOf (c));
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
this.newLine ();
}}, "~B");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.newLine ();
}}, "~S");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.newLine ();
}}, "~N");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.newLine ();
}}, "~N");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.newLine ();
}}, "~N");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.newLine ();
}}, "~N");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.newLine ();
}}, "~A");
Clazz.defineMethod (c$, "println", 
function (x) {
{
this.print (x);
this.newLine ();
}}, "~S");
Clazz.defineMethod (c$, "println", 
function (x) {
var s = String.valueOf (x);
{
this.print (s);
this.newLine ();
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
if ((this.formatter == null) || (this.formatter.locale () !== java.util.Locale.getDefault ())) this.formatter =  new java.util.Formatter (this);
this.formatter.format (java.util.Locale.getDefault (), format, args);
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
Clazz.defineMethod (c$, "format", 
function (l, format, args) {
try {
{
this.ensureOpen ();
if ((this.formatter == null) || (this.formatter.locale () !== l)) this.formatter =  new java.util.Formatter (this, l);
this.formatter.format (l, format, args);
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
if (csq == null) this.print ("null");
 else this.print (csq.toString ());
return this;
}, "CharSequence");
Clazz.defineMethod (c$, "append", 
function (csq, start, end) {
var cs = (csq == null ? "null" : csq);
this.write (cs.subSequence (start, end).toString ());
return this;
}, "CharSequence,~N,~N");
Clazz.defineMethod (c$, "append", 
function (c) {
this.print (c);
return this;
}, "~S");
});
