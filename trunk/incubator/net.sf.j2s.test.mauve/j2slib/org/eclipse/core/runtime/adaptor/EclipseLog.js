Clazz.declarePackage ("org.eclipse.core.runtime.adaptor");
Clazz.load (["org.eclipse.osgi.framework.log.FrameworkLog", "org.eclipse.osgi.framework.util.SecureAction"], "org.eclipse.core.runtime.adaptor.EclipseLog", ["java.io.BufferedWriter", "$.File", "$.InputStreamReader", "$.OutputStreamWriter", "$.PrintWriter", "$.StringWriter", "java.lang.Long", "java.text.SimpleDateFormat", "java.util.Date", "org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo", "org.eclipse.osgi.framework.log.FrameworkLogEntry"], function () {
c$ = Clazz.decorateAsClass (function () {
this.consoleLog = false;
this.newSession = true;
this.outFile = null;
this.writer = null;
this.maxLogSize = 1000;
this.maxLogFiles = 10;
this.backupIdx = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.adaptor, "EclipseLog", null, org.eclipse.osgi.framework.log.FrameworkLog);
Clazz.makeConstructor (c$, 
function (outFile) {
this.outFile = outFile;
this.writer = null;
this.readLogProperties ();
}, "java.io.File");
Clazz.makeConstructor (c$, 
function (writer) {
if (writer == null) this.writer = this.logForStream (System.err);
 else this.writer = writer;
}, "java.io.Writer");
Clazz.makeConstructor (c$, 
function () {
this.construct (Clazz.castNullAs ("java.io.Writer"));
});
Clazz.defineMethod (c$, "getRoot", 
($fz = function (t) {
var root = null;
if (Clazz.instanceOf (t, org.osgi.framework.BundleException)) root = (t).getNestedException ();
if (Clazz.instanceOf (t, java.lang.reflect.InvocationTargetException)) root = (t).getTargetException ();
if (Clazz.instanceOf (root, java.lang.reflect.InvocationTargetException) || Clazz.instanceOf (root, org.osgi.framework.BundleException)) {
var deeplyNested = this.getRoot (root);
if (deeplyNested != null) root = deeplyNested;
}return root;
}, $fz.isPrivate = true, $fz), "Throwable");
Clazz.defineMethod (c$, "writeArgs", 
function (header, args) {
if (args == null || args.length == 0) return ;
this.write (header);
for (var i = 0; i < args.length; i++) {
if (i > 0 && "-password".equals (args[i - 1])) this.write (" (omitted)");
 else this.write (" " + args[i]);
}
this.writeln ();
}, "~S,~A");
Clazz.defineMethod (c$, "getSessionTimestamp", 
function () {
var ts = System.getProperty ("eclipse.startTime");
if (ts != null) {
try {
return this.getDate ( new java.util.Date (Long.parseLong (ts)));
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
}return this.getDate ( new java.util.Date ());
});
Clazz.defineMethod (c$, "writeSession", 
function () {
this.write ("!SESSION");
this.writeSpace ();
var date = this.getSessionTimestamp ();
this.write (date);
this.writeSpace ();
for (var i = "!SESSION".length + date.length; i < 78; i++) {
this.write ("-");
}
this.writeln ();
try {
var key = "eclipse.buildId";
var value = System.getProperty (key, "unknown");
this.writeln (key + "=" + value);
key = "java.fullversion";
value = System.getProperty (key);
if (value == null) {
key = "java.version";
value = System.getProperty (key);
this.writeln (key + "=" + value);
key = "java.vendor";
value = System.getProperty (key);
this.writeln (key + "=" + value);
} else {
this.writeln (key + "=" + value);
}} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
} else {
throw e;
}
}
this.write ("BootLoader constants: OS=" + org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault ().getOS ());
this.write (", ARCH=" + org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault ().getOSArch ());
this.write (", WS=" + org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault ().getWS ());
this.writeln (", NL=" + org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault ().getNL ());
this.writeArgs ("Framework arguments: ", org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault ().getNonFrameworkArgs ());
this.writeArgs ("Command-line arguments: ", org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault ().getCommandLineArgs ());
});
Clazz.overrideMethod (c$, "close", 
function () {
try {
if (this.writer != null) {
var tmpWriter = this.writer;
this.writer = null;
tmpWriter.close ();
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "openFile", 
function () {
if (this.writer == null) {
if (this.outFile != null) {
try {
this.writer = this.logForStream (org.eclipse.core.runtime.adaptor.EclipseLog.secureAction.getFileOutputStream (this.outFile, true));
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.writer = this.logForStream (System.err);
} else {
throw e;
}
}
} else {
this.writer = this.logForStream (System.err);
}}});
Clazz.defineMethod (c$, "closeFile", 
function () {
if (this.outFile != null) {
if (this.writer != null) {
try {
this.writer.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.writer = null;
}}});
Clazz.defineMethod (c$, "log", 
function (frameworkEvent) {
var b = frameworkEvent.getBundle ();
var t = frameworkEvent.getThrowable ();
var logEntry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry (b.getLocation () + " 0 0", "FrameworkEvent.ERROR", 0, t, null);
this.log (logEntry);
}, "org.osgi.framework.FrameworkEvent");
Clazz.defineMethod (c$, "log", 
function (logEntry) {
if (logEntry == null) return ;
try {
this.checkLogFileSize ();
this.openFile ();
if (this.newSession) {
this.writeSession ();
this.newSession = false;
}this.writeLog (0, logEntry);
this.writer.flush ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
System.err.println ("An exception occurred while writing to the platform log:");
e.printStackTrace (System.err);
System.err.println ("Logging to the console instead.");
try {
this.writer = this.logForStream (System.err);
this.writeLog (0, logEntry);
this.writer.flush ();
} catch (e2) {
if (Clazz.instanceOf (e2, Exception)) {
System.err.println ("An exception occurred while logging to the console:");
e2.printStackTrace (System.err);
} else {
throw e2;
}
}
} else {
throw e;
}
} finally {
this.closeFile ();
}
}, "org.eclipse.osgi.framework.log.FrameworkLogEntry");
Clazz.overrideMethod (c$, "setWriter", 
function (newWriter, append) {
this.setOutput (null, newWriter, append);
}, "java.io.Writer,~B");
Clazz.overrideMethod (c$, "setFile", 
function (newFile, append) {
if (newFile != null && !newFile.equals (this.outFile)) {
this.readLogProperties ();
this.backupIdx = 0;
}this.setOutput (newFile, null, append);
System.getProperties ().put ("osgi.logfile", newFile.getAbsolutePath ());
}, "java.io.File,~B");
Clazz.overrideMethod (c$, "getFile", 
function () {
return this.outFile;
});
Clazz.overrideMethod (c$, "setConsoleLog", 
function (consoleLog) {
this.consoleLog = consoleLog;
}, "~B");
Clazz.defineMethod (c$, "setOutput", 
($fz = function (newOutFile, newWriter, append) {
if (newOutFile == null || !newOutFile.equals (this.outFile)) {
if (this.writer != null) {
try {
this.writer.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.writer = null;
}var oldOutFile = this.outFile;
this.outFile = newOutFile;
this.writer = newWriter;
var copyFailed = false;
if (append && oldOutFile != null && oldOutFile.isFile ()) {
var fileIn = null;
try {
this.openFile ();
fileIn =  new java.io.InputStreamReader (org.eclipse.core.runtime.adaptor.EclipseLog.secureAction.getFileInputStream (oldOutFile), "UTF-8");
this.copyReader (fileIn, this.writer);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
copyFailed = true;
e.printStackTrace ();
} else {
throw e;
}
} finally {
if (fileIn != null) {
try {
fileIn.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
if (!copyFailed) oldOutFile.$delete ();
}this.closeFile ();
}
}}}, $fz.isPrivate = true, $fz), "java.io.File,java.io.Writer,~B");
Clazz.defineMethod (c$, "copyReader", 
($fz = function (reader, aWriter) {
var buffer =  Clazz.newArray (1024, '\0');
var count;
while ((count = reader.read (buffer, 0, buffer.length)) > 0) {
aWriter.write (buffer, 0, count);
}
}, $fz.isPrivate = true, $fz), "java.io.Reader,java.io.Writer");
Clazz.defineMethod (c$, "getDate", 
function (date) {
try {
var formatter =  new java.text.SimpleDateFormat ("yyyy-MM-dd HH:mm:ss.SS");
return formatter.format (date);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
} else {
throw e;
}
}
return Long.toString (System.currentTimeMillis ());
}, "java.util.Date");
Clazz.defineMethod (c$, "getStackTrace", 
function (t) {
if (t == null) return null;
var sw =  new java.io.StringWriter ();
var pw =  new java.io.PrintWriter (sw);
t.printStackTrace (pw);
var root = this.getRoot (t);
if (root != null) {
pw.println ("Root exception:");
root.printStackTrace (pw);
}return sw.toString ();
}, "Throwable");
Clazz.defineMethod (c$, "logForStream", 
function (output) {
try {
return  new java.io.BufferedWriter ( new java.io.OutputStreamWriter (output, "UTF-8"));
} catch (e) {
if (Clazz.instanceOf (e, java.io.UnsupportedEncodingException)) {
return  new java.io.BufferedWriter ( new java.io.OutputStreamWriter (output));
} else {
throw e;
}
}
}, "java.io.OutputStream");
Clazz.defineMethod (c$, "writeLog", 
function (depth, entry) {
this.writeEntry (depth, entry);
this.writeMessage (entry);
this.writeStack (entry);
var children = entry.getChildren ();
if (children != null) {
for (var i = 0; i < children.length; i++) {
this.writeLog (depth + 1, children[i]);
}
}}, "~N,org.eclipse.osgi.framework.log.FrameworkLogEntry");
Clazz.defineMethod (c$, "writeEntry", 
function (depth, entry) {
if (depth == 0) {
this.writeln ();
this.write ("!ENTRY");
} else {
this.write ("!SUBENTRY");
this.writeSpace ();
this.write (Integer.toString (depth));
}this.writeSpace ();
this.write (entry.getEntry ());
this.writeSpace ();
this.write (this.getDate ( new java.util.Date ()));
this.writeln ();
}, "~N,org.eclipse.osgi.framework.log.FrameworkLogEntry");
Clazz.defineMethod (c$, "writeMessage", 
function (entry) {
this.write ("!MESSAGE");
this.writeSpace ();
this.writeln (entry.getMessage ());
}, "org.eclipse.osgi.framework.log.FrameworkLogEntry");
Clazz.defineMethod (c$, "writeStack", 
function (entry) {
var t = entry.getThrowable ();
if (t != null) {
var stack = this.getStackTrace (t);
this.write ("!STACK");
this.writeSpace ();
this.write (Integer.toString (entry.getStackCode ()));
this.writeln ();
this.write (stack);
}}, "org.eclipse.osgi.framework.log.FrameworkLogEntry");
Clazz.defineMethod (c$, "write", 
function (message) {
if (message != null) {
this.writer.write (message);
if (this.consoleLog) System.out.print (message);
}}, "~S");
Clazz.defineMethod (c$, "writeln", 
function (s) {
this.write (s);
this.writeln ();
}, "~S");
Clazz.defineMethod (c$, "writeln", 
function () {
this.write (org.eclipse.core.runtime.adaptor.EclipseLog.LINE_SEPARATOR);
});
Clazz.defineMethod (c$, "writeSpace", 
function () {
this.write (" ");
});
Clazz.defineMethod (c$, "checkLogFileSize", 
function () {
if (this.maxLogSize == 0) return true;
var isBackupOK = true;
if (this.outFile != null) {
if ((this.outFile.length () >> 10) > this.maxLogSize) {
var logFilename = this.outFile.getAbsolutePath ();
var backupFilename = "";
if (logFilename.toLowerCase ().endsWith (".log")) {
backupFilename = logFilename.substring (0, logFilename.length - ".log".length) + ".bak_" + this.backupIdx + ".log";
} else {
backupFilename = logFilename + ".bak_" + this.backupIdx;
}var backupFile =  new java.io.File (backupFilename);
if (backupFile.exists ()) {
if (!backupFile.$delete ()) {
System.err.println ("Error when trying to delete old log file: " + backupFile.getName ());
if (backupFile.renameTo ( new java.io.File (backupFile.getAbsolutePath () + System.currentTimeMillis ()))) {
System.err.println ("So we rename it to filename: " + backupFile.getName ());
} else {
System.err.println ("And we also cannot rename it!");
isBackupOK = false;
}}}var isRenameOK = this.outFile.renameTo (backupFile);
if (!isRenameOK) {
System.err.println ("Error when trying to rename log file to backup one.");
isBackupOK = false;
}var newFile =  new java.io.File (logFilename);
this.setOutput (newFile, null, false);
this.openFile ();
try {
this.writeSession ();
this.writeln ();
this.writeln ("This is a continuation of log file " + backupFile.getAbsolutePath ());
this.writeln ("Created Time: " + this.getDate ( new java.util.Date (System.currentTimeMillis ())));
this.writer.flush ();
} catch (ioe) {
if (Clazz.instanceOf (ioe, java.io.IOException)) {
ioe.printStackTrace (System.err);
} else {
throw ioe;
}
}
this.closeFile ();
this.backupIdx = (++this.backupIdx) % this.maxLogFiles;
}}return isBackupOK;
});
Clazz.defineMethod (c$, "readLogProperties", 
function () {
var newMaxLogSize = org.eclipse.core.runtime.adaptor.EclipseLog.secureAction.getProperty ("eclipse.log.size.max");
if (newMaxLogSize != null) {
this.maxLogSize = Integer.parseInt (newMaxLogSize);
if (this.maxLogSize != 0 && this.maxLogSize < 10) {
this.maxLogSize = 10;
}}var newMaxLogFiles = org.eclipse.core.runtime.adaptor.EclipseLog.secureAction.getProperty ("eclipse.log.backup.max");
if (newMaxLogFiles != null) {
this.maxLogFiles = Integer.parseInt (newMaxLogFiles);
if (this.maxLogFiles < 1) {
this.maxLogFiles = 10;
}}});
Clazz.defineStatics (c$,
"PASSWORD", "-password",
"SESSION", "!SESSION",
"ENTRY", "!ENTRY",
"SUBENTRY", "!SUBENTRY",
"MESSAGE", "!MESSAGE",
"STACK", "!STACK",
"LINE_SEPARATOR", null,
"TAB_STRING", "\t",
"DEFAULT_LOG_SIZE", 1000,
"DEFAULT_LOG_FILES", 10,
"LOG_SIZE_MIN", 10,
"PROP_LOG_SIZE_MAX", "eclipse.log.size.max",
"PROP_LOG_FILE_MAX", "eclipse.log.backup.max",
"LOG_EXT", ".log",
"BACKUP_MARK", ".bak_");
{
var s = System.getProperty ("line.separator");
($t$ = org.eclipse.core.runtime.adaptor.EclipseLog.LINE_SEPARATOR = s == null ? "\n" : s, org.eclipse.core.runtime.adaptor.EclipseLog.prototype.LINE_SEPARATOR = org.eclipse.core.runtime.adaptor.EclipseLog.LINE_SEPARATOR, $t$);
}c$.secureAction = c$.prototype.secureAction =  new org.eclipse.osgi.framework.util.SecureAction ();
});
