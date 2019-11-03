Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.adaptor.PermissionStorage"], "org.eclipse.osgi.framework.internal.core.DefaultPermissionStorage", ["java.io.BufferedReader", "$.BufferedWriter", "$.DataInputStream", "$.DataOutputStream", "$.File", "$.FileInputStream", "$.FileOutputStream", "$.IOException", "$.InputStreamReader", "$.OutputStreamWriter", "java.util.Hashtable", "$.Vector", "org.eclipse.osgi.framework.adaptor.core.AdaptorMsg", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl", "org.eclipse.osgi.framework.internal.reliablefile.ReliableFile", "$.ReliableFileInputStream", "$.ReliableFileOutputStream", "org.eclipse.osgi.util.NLS", "org.osgi.service.condpermadmin.ConditionInfo", "org.osgi.service.permissionadmin.PermissionInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.permissionDir = null;
this.permissionFiles = null;
this.defaultData = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "DefaultPermissionStorage", null, org.eclipse.osgi.framework.adaptor.PermissionStorage);
Clazz.makeConstructor (c$, 
function (adaptor) {
this.permissionDir =  new java.io.File (adaptor.getBundleStoreRootDir (), "permdata");
this.permissionFiles =  new java.util.Hashtable ();
if (!this.permissionDir.exists () && !this.permissionDir.mkdirs ()) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to create directory: " + this.permissionDir.getPath ());
}throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_DIRECTORY_CREATE_EXCEPTION, this.permissionDir));
}this.defaultData =  new java.io.File (this.permissionDir, ".default");
this.loadLocations ();
}, "org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor");
Clazz.overrideMethod (c$, "getLocations", 
function () {
var size = this.permissionFiles.size ();
if (size == 0) {
return null;
}var locations =  new Array (size);
var keysEnum = this.permissionFiles.keys ();
for (var i = 0; i < size; i++) {
locations[i] = keysEnum.nextElement ();
}
return locations;
});
Clazz.overrideMethod (c$, "getPermissionData", 
function (location) {
var file;
if (location == null) {
file = this.defaultData;
} else {
file = this.permissionFiles.get (location);
if (file == null) {
return null;
}}try {
return this.readData (file);
} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.overrideMethod (c$, "setPermissionData", 
function (location, data) {
var file;
if (location == null) {
file = this.defaultData;
if (data == null) {
org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.$delete (this.defaultData);
} else {
this.save (this.defaultData, null, data);
}} else {
file = this.permissionFiles.get (location);
if (data == null) {
if (file == null) {
return ;
}this.permissionFiles.remove (location);
org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.$delete (file);
} else {
file = this.save (file, location, data);
this.permissionFiles.put (location, file);
}}}, "~S,~A");
Clazz.defineMethod (c$, "loadLocations", 
function () {
var list = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getBaseFiles (this.permissionDir);
if (list == null) return ;
var len = list.length;
for (var i = 0; i < len; i++) {
var name = list[i];
if (name.endsWith (".tmp")) {
continue ;}if (name.equals ("condPerms")) {
continue ;}var file =  new java.io.File (this.permissionDir, name);
try {
var location = this.readLocation (file);
if (location != null) {
this.permissionFiles.put (location, file);
}} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
} else {
throw e;
}
}
}
});
Clazz.defineMethod (c$, "readLocation", 
($fz = function (file) {
var $in =  new java.io.DataInputStream ( new org.eclipse.osgi.framework.internal.reliablefile.ReliableFileInputStream (file));
try {
var version = $in.readInt ();
switch (version) {
case 1:
{
var locationPresent = $in.readBoolean ();
if (locationPresent) {
var location = $in.readUTF ();
return location;
}break;
}default:
{
throw  new java.io.IOException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_STORAGE_EXCEPTION);
}}
} finally {
$in.close ();
}
return null;
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "readData", 
($fz = function (file) {
var $in =  new java.io.DataInputStream ( new org.eclipse.osgi.framework.internal.reliablefile.ReliableFileInputStream (file));
try {
var version = $in.readInt ();
switch (version) {
case 1:
{
var locationPresent = $in.readBoolean ();
if (locationPresent) {
var location = $in.readUTF ();
}var size = $in.readInt ();
var data =  new Array (size);
for (var i = 0; i < size; i++) {
data[i] = $in.readUTF ();
}
return data;
}default:
{
throw  new java.io.IOException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_STORAGE_EXCEPTION);
}}
} finally {
$in.close ();
}
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "save", 
function (file, location, data) {
if (file == null) {
file = java.io.File.createTempFile ("perm", "", this.permissionDir);
file.$delete ();
}var size = data.length;
var out =  new java.io.DataOutputStream ( new org.eclipse.osgi.framework.internal.reliablefile.ReliableFileOutputStream (file));
try {
out.writeInt (1);
if (location == null) {
out.writeBoolean (false);
} else {
out.writeBoolean (true);
out.writeUTF (location);
}out.writeInt (size);
for (var i = 0; i < size; i++) {
out.writeUTF (data[i]);
}
} finally {
out.close ();
}
return file;
}, "java.io.File,~S,~A");
Clazz.overrideMethod (c$, "serializeConditionalPermissionInfos", 
function (v) {
var writer = null;
try {
writer =  new java.io.BufferedWriter ( new java.io.OutputStreamWriter ( new java.io.FileOutputStream ( new java.io.File (this.permissionDir, "condPerms"))));
var en = v.elements ();
while (en.hasMoreElements ()) {
var cpi = en.nextElement ();
var cis = cpi.getConditionInfos ();
var pis = cpi.getPermissionInfos ();
writer.write ('#'.charCodeAt (0));
writer.write ((cpi).getName ());
writer.newLine ();
for (var i = 0; i < cis.length; i++) {
writer.write (cis[i].getEncoded ());
writer.newLine ();
}
for (var i = 0; i < pis.length; i++) {
writer.write (pis[i].getEncoded ());
writer.newLine ();
}
writer.newLine ();
}
} finally {
if (writer != null) writer.close ();
}
}, "java.util.Vector");
Clazz.overrideMethod (c$, "deserializeConditionalPermissionInfos", 
function () {
var reader = null;
var v =  new java.util.Vector (15);
try {
reader =  new java.io.BufferedReader ( new java.io.InputStreamReader ( new java.io.FileInputStream ( new java.io.File (this.permissionDir, "condPerms"))));
var line;
var c =  new java.util.Vector (3);
var p =  new java.util.Vector (3);
var id = null;
while ((line = reader.readLine ()) != null) {
if (line.length == 0) {
var cpi;
cpi =  new org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl (id, c.toArray ( new Array (0)), p.toArray ( new Array (0)));
v.add (cpi);
c.clear ();
p.clear ();
id = null;
} else if (line.startsWith ("(")) {
p.add ( new org.osgi.service.permissionadmin.PermissionInfo (line));
} else if (line.startsWith ("[")) {
c.add ( new org.osgi.service.condpermadmin.ConditionInfo (line));
} else if (line.startsWith ("#")) {
id = line.substring (1);
}}
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
throw e;
}
} else if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
throw  new java.io.IOException (e.getMessage ());
}
} else {
throw e$$;
}
} finally {
if (reader != null) reader.close ();
}
return v;
});
Clazz.defineStatics (c$,
"CONDPERMS", "condPerms",
"PERMISSIONDATA_VERSION_1", 1,
"PERMISSIONDATA_VERSION", 1);
});
