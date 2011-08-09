Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (null, "org.eclipse.osgi.framework.internal.core.AliasMapper", ["java.io.BufferedReader", "$.InputStreamReader", "java.util.Hashtable", "$.Vector", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.Tokenizer"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.core, "AliasMapper");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "aliasProcessor", 
function (processor) {
processor = processor.toLowerCase ();
if (org.eclipse.osgi.framework.internal.core.AliasMapper.processorAliasTable == null) {
var $in = this.getClass ().getResourceAsStream ("processor.aliases");
if ($in != null) {
try {
($t$ = org.eclipse.osgi.framework.internal.core.AliasMapper.processorAliasTable = org.eclipse.osgi.framework.internal.core.AliasMapper.initAliases ($in), org.eclipse.osgi.framework.internal.core.AliasMapper.prototype.processorAliasTable = org.eclipse.osgi.framework.internal.core.AliasMapper.processorAliasTable, $t$);
} finally {
try {
$in.close ();
} catch (ee) {
if (Clazz.instanceOf (ee, java.io.IOException)) {
} else {
throw ee;
}
}
}
}}if (org.eclipse.osgi.framework.internal.core.AliasMapper.processorAliasTable != null) {
var alias = org.eclipse.osgi.framework.internal.core.AliasMapper.processorAliasTable.get (processor);
if (alias != null) {
processor = alias;
}}return (processor);
}, "~S");
Clazz.defineMethod (c$, "aliasOSName", 
function (osname) {
osname = osname.toLowerCase ();
if (org.eclipse.osgi.framework.internal.core.AliasMapper.osnameAliasTable == null) {
var $in = this.getClass ().getResourceAsStream ("osname.aliases");
if ($in != null) {
try {
($t$ = org.eclipse.osgi.framework.internal.core.AliasMapper.osnameAliasTable = org.eclipse.osgi.framework.internal.core.AliasMapper.initAliases ($in), org.eclipse.osgi.framework.internal.core.AliasMapper.prototype.osnameAliasTable = org.eclipse.osgi.framework.internal.core.AliasMapper.osnameAliasTable, $t$);
} finally {
try {
$in.close ();
} catch (ee) {
if (Clazz.instanceOf (ee, java.io.IOException)) {
} else {
throw ee;
}
}
}
}}if (org.eclipse.osgi.framework.internal.core.AliasMapper.osnameAliasTable != null) {
var aliasObject = org.eclipse.osgi.framework.internal.core.AliasMapper.osnameAliasTable.get (osname);
if (aliasObject != null) if (Clazz.instanceOf (aliasObject, String)) {
osname = aliasObject;
} else {
return aliasObject;
}}return (osname);
}, "~S");
c$.initAliases = Clazz.defineMethod (c$, "initAliases", 
function ($in) {
var aliases =  new java.util.Hashtable (37);
try {
var br;
try {
br =  new java.io.BufferedReader ( new java.io.InputStreamReader ($in, "UTF8"));
} catch (e) {
if (Clazz.instanceOf (e, java.io.UnsupportedEncodingException)) {
br =  new java.io.BufferedReader ( new java.io.InputStreamReader ($in));
} else {
throw e;
}
}
while (true) {
var line = br.readLine ();
if (line == null) {
break;
}var tokenizer =  new org.eclipse.osgi.framework.internal.core.Tokenizer (line);
var master = tokenizer.getString ("# \t");
if (master != null) {
aliases.put (master.toLowerCase (), master);
parseloop : while (true) {
var alias = tokenizer.getString ("# \t");
if (alias == null) {
break parseloop;
}var lowerCaseAlias = alias.toLowerCase ();
var storedMaster = aliases.get (lowerCaseAlias);
if (storedMaster == null) {
aliases.put (lowerCaseAlias, master);
} else if (Clazz.instanceOf (storedMaster, String)) {
var newMaster =  new java.util.Vector ();
newMaster.add (storedMaster);
newMaster.add (master);
aliases.put (lowerCaseAlias, newMaster);
} else {
(storedMaster).add (master);
aliases.put (lowerCaseAlias, storedMaster);
}}
}}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}} else {
throw e;
}
}
return (aliases);
}, "java.io.InputStream");
Clazz.defineStatics (c$,
"processorAliasTable", null,
"osnameAliasTable", null);
});
