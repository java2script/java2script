Clazz.declarePackage ("org.eclipse.osgi.internal.profile");
Clazz.load (["org.eclipse.osgi.internal.profile.ProfileLogger", "java.lang.StringBuffer"], "org.eclipse.osgi.internal.profile.DefaultProfileLogger", ["java.io.File", "$.FileWriter", "java.lang.Boolean", "$.Long", "org.eclipse.osgi.framework.debug.FrameworkDebugOptions"], function () {
c$ = Clazz.decorateAsClass (function () {
this.logSynchronously = false;
this.startTime = 0;
this.timeLogEntries = null;
this.timeEntriesIndex = 0;
this.timelog = null;
this.launchTime = -1;
this.bufferSize = 256;
this.logFileName = null;
this.logFile = null;
this.$entryReport = null;
this.padsb = null;
this.indent = 0;
this.timePaddingLength = 0;
if (!Clazz.isClassDefined ("org.eclipse.osgi.internal.profile.DefaultProfileLogger.TimeEntry")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.time = 0;
this.id = null;
this.msg = null;
this.description = null;
this.flag = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.profile.DefaultProfileLogger, "TimeEntry");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.profile, "DefaultProfileLogger", null, org.eclipse.osgi.internal.profile.ProfileLogger);
Clazz.prepareFields (c$, function () {
this.$entryReport =  new StringBuffer (120);
this.padsb =  new StringBuffer (16);
});
Clazz.makeConstructor (c$, 
function () {
this.initProps ();
var size = this.getBufferSize ();
this.timeLogEntries =  new Array (size);
this.timelog =  new StringBuffer (4096);
for (var i = 0; i < size; i++) {
this.timeLogEntries[i] = this.timeEntryFactory ();
}
this.timeEntriesIndex = 0;
this.launchTime = this.getLaunchTime ();
if (this.launchTime == -1) {
this.startTime = this.getMainStartTime ();
} else {
this.startTime = this.launchTime;
}var freq = this.getTimerFrequency ();
for (this.timePaddingLength = 3; freq > 9; this.timePaddingLength++) {
freq /= 10;
}
this.logInitMessages ();
});
Clazz.defineMethod (c$, "logInitMessages", 
function () {
var index = 0;
if (this.launchTime != -1) {
this.logTime (0, "DefaultProfileLogger.init()", "launch time initialized", null);
this.timeLogEntries[index++].time = this.launchTime;
}this.logTime (0, "DefaultProfileLogger.init()", "start time initialized", null);
this.timeLogEntries[index++].time = this.getMainStartTime ();
});
Clazz.defineMethod (c$, "getLaunchTime", 
function () {
var launchTimeString = System.getProperty ("launch.startMillis");
if (launchTimeString != null) {
return Long.parseLong (launchTimeString);
}return -1;
});
Clazz.defineMethod (c$, "getMainStartTime", 
function () {
var timeString = System.getProperty ("eclipse.startTime");
if (timeString != null) return Long.parseLong (timeString);
return System.currentTimeMillis ();
});
Clazz.overrideMethod (c$, "initProps", 
function () {
var prop;
var dbgOptions = null;
if (System.getProperty ("osgi.debug") != null) {
dbgOptions = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.getDefault ();
if (dbgOptions != null) {
this.logFileName = dbgOptions.getOption ("org.eclipse.osgi/defaultprofile/logfilename");
this.logSynchronously = dbgOptions.getBooleanOption ("org.eclipse.osgi/defaultprofile/logsynchronously", false);
var size = dbgOptions.getIntegerOption ("org.eclipse.osgi/defaultprofile/buffersize", 0);
if (size > 0) this.bufferSize = size;
}}if ((prop = System.getProperty ("osgi.defaultprofile.logfilename")) != null) {
this.logFileName = prop;
if (dbgOptions != null) dbgOptions.setOption ("org.eclipse.osgi/defaultprofile/logfilename", this.logFileName);
}if ((prop = System.getProperty ("osgi.defaultprofile.logsynchronously")) != null) {
this.logSynchronously = Boolean.$valueOf (prop).booleanValue ();
if (dbgOptions != null) dbgOptions.setOption ("org.eclipse.osgi/defaultprofile/logsynchronously",  new Boolean (this.logSynchronously).toString ());
}if ((prop = System.getProperty ("osgi.defaultprofile.buffersize")) != null) {
try {
var value = Integer.parseInt (prop);
if (value > 0) {
this.bufferSize = value;
if (dbgOptions != null) dbgOptions.setOption ("org.eclipse.osgi/defaultprofile/buffersize", Integer.toString (this.bufferSize));
}} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
}});
Clazz.overrideMethod (c$, "logTime", 
function (flag, id, msg, description) {
if (this.timeEntriesIndex == this.timeLogEntries.length) {
this.makeLog ();
this.logTime (0, "Profile.logTime()", "log entries rolled", null);
}var entry = this.timeLogEntries[this.timeEntriesIndex++];
entry.time = this.getTime ();
entry.id = id;
entry.msg = msg;
entry.flag = flag;
entry.description = description;
if (this.logSynchronously) {
System.out.print (this.getProfileLog ().substring (2));
}}, "~N,~S,~S,~S");
Clazz.overrideMethod (c$, "getProfileLog", 
function () {
var log;
log = this.getProfileLogReport ();
this.writeToProfileLogFile (log);
return log;
});
Clazz.defineMethod (c$, "getTime", 
function () {
return System.currentTimeMillis ();
});
Clazz.defineMethod (c$, "getTimerFrequency", 
function () {
return 1000;
});
Clazz.defineMethod (c$, "findCompareEntry", 
function (index, id, flag) {
if (index > 0) index--;
var prev = index;
if (flag != 1) {
while (index >= 0) {
var entry = this.timeLogEntries[index];
if (entry.id.equals (id)) {
switch (flag) {
case 0:
return entry;
case 2:
if (entry.flag == 1) return entry;
break;
}
}index--;
}
}return this.timeLogEntries[prev];
}, "~N,~S,~N");
Clazz.defineMethod (c$, "entryReport", 
function (entry, compareWith) {
this.$entryReport.setLength (0);
if (entry.flag == 1) this.indent++;
var zeroTime = this.getRelativeTime (this.getStartTime ());
this.$entryReport.append ('-');
var entryTime = this.getRelativeTime (entry.time);
var diff = entryTime - zeroTime;
this.$entryReport.append (this.pad (Long.toString (diff), this.timePaddingLength));
this.$entryReport.append (" :");
diff = entry.time - compareWith.time;
this.$entryReport.append (this.pad (Long.toString (diff), this.timePaddingLength));
this.$entryReport.append (this.pad ("", this.indent * 2));
this.$entryReport.append (" - ");
this.$entryReport.append (entry.id);
this.$entryReport.append (" > ");
this.$entryReport.append (entry.msg);
if (entry.description != null) {
this.$entryReport.append (" :: ");
this.$entryReport.append (entry.description);
}this.$entryReport.append ("\r\n");
if (entry.flag == 2) this.indent -= 1;
return this.$entryReport.toString ();
}, "org.eclipse.osgi.internal.profile.DefaultProfileLogger.TimeEntry,org.eclipse.osgi.internal.profile.DefaultProfileLogger.TimeEntry");
Clazz.defineMethod (c$, "makeLog", 
function () {
this.indent = 0;
this.timelog.append ("\r\n");
for (var i = 0; i < this.timeEntriesIndex; i++) {
var entry = this.timeLogEntries[i];
var cmpEntry = this.findCompareEntry (i, entry.id, entry.flag);
this.timelog.append (this.entryReport (entry, cmpEntry));
}
this.timeEntriesIndex = 0;
});
Clazz.defineMethod (c$, "pad", 
function (str, size) {
this.padsb.setLength (0);
var len = str.length;
var count = size - len;
for (var i = 0; i < count; i++) this.padsb.append (' ');

this.padsb.append (str);
return this.padsb.toString ();
}, "~S,~N");
Clazz.defineMethod (c$, "getProfileLogReport", 
function () {
if (this.timelog == null) return "";
this.makeLog ();
var log = this.timelog.toString ();
this.timelog.setLength (0);
return log;
});
Clazz.defineMethod (c$, "writeToProfileLogFile", 
function (log) {
var profileLog = this.getProfileLogFile ();
if (profileLog == null) return ;
var fw = null;
try {
fw =  new java.io.FileWriter (profileLog.getAbsolutePath (), true);
fw.write (log);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
} finally {
if (fw != null) try {
fw.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
}, "~S");
Clazz.defineMethod (c$, "getProfileLogFile", 
function () {
if (this.logFile == null) if ((this.logFileName != null) && (this.logFileName.length > 0)) this.logFile =  new java.io.File (this.logFileName);
return this.logFile;
});
Clazz.defineMethod (c$, "getStartTime", 
function () {
return this.startTime;
});
Clazz.defineMethod (c$, "getRelativeTime", 
function (absoluteTime) {
return absoluteTime;
}, "~N");
Clazz.defineMethod (c$, "getBufferSize", 
function () {
if (this.bufferSize < 2) return 256;
return this.bufferSize;
});
Clazz.defineMethod (c$, "timeEntryFactory", 
function () {
return Clazz.innerTypeInstance (org.eclipse.osgi.internal.profile.DefaultProfileLogger.TimeEntry, this, null);
});
Clazz.defineStatics (c$,
"DEFAULTPROFILE_PROP", "osgi.defaultprofile.");
c$.PROP_FILENAME = c$.prototype.PROP_FILENAME = "osgi.defaultprofile.logfilename";
c$.PROP_LOGSYNCHRONOUSLY = c$.prototype.PROP_LOGSYNCHRONOUSLY = "osgi.defaultprofile.logsynchronously";
c$.PROP_BUFFERSIZE = c$.prototype.PROP_BUFFERSIZE = "osgi.defaultprofile.buffersize";
Clazz.defineStatics (c$,
"DEFAULTPROFILE_OPTION", "org.eclipse.osgi/defaultprofile/");
c$.OPTION_FILENAME = c$.prototype.OPTION_FILENAME = "org.eclipse.osgi/defaultprofile/logfilename";
c$.OPTION_LOGSYNCHRONOUSLY = c$.prototype.OPTION_LOGSYNCHRONOUSLY = "org.eclipse.osgi/defaultprofile/logsynchronously";
c$.OPTION_BUFFERSIZE = c$.prototype.OPTION_BUFFERSIZE = "org.eclipse.osgi/defaultprofile/buffersize";
Clazz.defineStatics (c$,
"DEFAULT_BUFFER_SIZE", 256);
});
