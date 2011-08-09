Clazz.declarePackage ("org.eclipse.core.runtime.adaptor");
Clazz.load (["java.lang.Boolean"], "org.eclipse.core.runtime.adaptor.StreamManager", ["java.io.File", "$.FileInputStream", "$.FileOutputStream", "org.eclipse.core.runtime.adaptor.StreamManagerOutputStream", "org.eclipse.osgi.framework.internal.reliablefile.ReliableFile", "$.ReliableFileInputStream", "$.ReliableFileOutputStream"], function () {
c$ = Clazz.decorateAsClass (function () {
this.manager = null;
this.useReliableFiles = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.adaptor, "StreamManager");
Clazz.makeConstructor (c$, 
function (manager) {
this.manager = manager;
this.useReliableFiles = org.eclipse.core.runtime.adaptor.StreamManager.useReliableFilesDefault;
}, "org.eclipse.core.runtime.adaptor.FileManager");
Clazz.defineMethod (c$, "setUseReliableFiles", 
function (state) {
this.useReliableFiles = state;
}, "~B");
Clazz.defineMethod (c$, "getInputStream", 
function (target) {
return this.getInputStream (target, 0);
}, "~S");
Clazz.defineMethod (c$, "getInputStream", 
function (target, openMask) {
if (this.useReliableFiles) {
var id = this.manager.getId (target);
return  new org.eclipse.osgi.framework.internal.reliablefile.ReliableFileInputStream ( new java.io.File (this.manager.getBase (), target), id, openMask);
}var lookup = this.manager.lookup (target, false);
if (lookup == null) return null;
return  new java.io.FileInputStream (lookup);
}, "~S,~N");
Clazz.defineMethod (c$, "getOutputStream", 
function (target) {
if (this.useReliableFiles) {
var out =  new org.eclipse.osgi.framework.internal.reliablefile.ReliableFileOutputStream ( new java.io.File (this.manager.getBase (), target));
return  new org.eclipse.core.runtime.adaptor.StreamManagerOutputStream (out, this, target, null, 0);
}var tmpFile = this.manager.createTempFile (target);
return  new org.eclipse.core.runtime.adaptor.StreamManagerOutputStream ( new java.io.FileOutputStream (tmpFile), this, target, tmpFile, 0);
}, "~S");
Clazz.defineMethod (c$, "getOutputStreamSet", 
function (targets) {
var count = targets.length;
var streams =  new Array (count);
var idx = 0;
try {
for (; idx < count; idx++) {
var newStream = this.getOutputStream (targets[idx]);
newStream.setStreamSet (streams);
streams[idx] = newStream;
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
for (var jdx = 0; jdx < idx; jdx++) streams[jdx].abort ();

throw e;
} else {
throw e;
}
}
return streams;
}, "~A");
Clazz.defineMethod (c$, "abortOutputStream", 
function (out) {
var set = out.getStreamSet ();
if (set == null) {
set = [out];
}{
for (var idx = 0; idx < set.length; idx++) {
out = set[idx];
if (out.getOutputFile () == null) {
var rfos = out.getOutputStream ();
rfos.abort ();
} else {
if (out.getState () == 0) {
try {
out.getOutputStream ().close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}out.getOutputFile ().$delete ();
}out.setState (1);
}
}}, "org.eclipse.core.runtime.adaptor.StreamManagerOutputStream");
Clazz.defineMethod (c$, "closeOutputStream", 
function (smos) {
if (smos.getState () != 0) return ;
var streamSet = smos.getStreamSet ();
if (smos.getOutputFile () == null) {
var rfos = smos.getOutputStream ();
var file = rfos.closeIntermediateFile ();
smos.setState (1);
var target = smos.getTarget ();
if (streamSet == null) {
this.manager.add (target, 1);
this.manager.update ([smos.getTarget ()], [file.getName ()]);
org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.fileUpdated ( new java.io.File (this.manager.getBase (), smos.getTarget ()));
}} else {
var out = smos.getOutputStream ();
out.flush ();
try {
(out).getFD ().sync ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.SyncFailedException)) {
} else {
throw e;
}
}
out.close ();
smos.setState (1);
var target = smos.getTarget ();
if (streamSet == null) {
this.manager.add (target, 0);
this.manager.update ([target], [smos.getOutputFile ().getName ()]);
}}if (streamSet != null) {
{
for (var idx = 0; idx < streamSet.length; idx++) {
if (streamSet[idx].getState () == 0) return ;
}
var targets =  new Array (streamSet.length);
var sources =  new Array (streamSet.length);
for (var idx = 0; idx < streamSet.length; idx++) {
smos = streamSet[idx];
targets[idx] = smos.getTarget ();
var outputFile = smos.getOutputFile ();
if (outputFile == null) {
this.manager.add (smos.getTarget (), 1);
var rfos = smos.getOutputStream ();
var file = rfos.closeIntermediateFile ();
sources[idx] = file.getName ();
org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.fileUpdated ( new java.io.File (this.manager.getBase (), smos.getTarget ()));
} else {
this.manager.add (smos.getTarget (), 0);
sources[idx] = outputFile.getName ();
}}
this.manager.update (targets, sources);
}}}, "org.eclipse.core.runtime.adaptor.StreamManagerOutputStream");
Clazz.defineMethod (c$, "getFileManager", 
function () {
return this.manager;
});
Clazz.defineStatics (c$,
"OPEN_BEST_AVAILABLE", 0,
"OPEN_FAIL_ON_PRIMARY", 1);
c$.useReliableFilesDefault = c$.prototype.useReliableFilesDefault = Boolean.$valueOf (System.getProperty ("osgi.useReliableFiles")).booleanValue ();
Clazz.defineStatics (c$,
"ST_OPEN", 0,
"ST_CLOSED", 1);
});
