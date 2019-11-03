Clazz.declarePackage ("org.eclipse.osgi.framework.launcher");
Clazz.load (null, "org.eclipse.osgi.framework.launcher.Launcher", ["java.lang.Thread", "java.util.StringTokenizer", "$.Vector", "org.eclipse.osgi.framework.internal.core.Msg", "$.OSGi", "$.Tokenizer", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.consolePort = "";
this.console = false;
this.adaptorClassName = "org.eclipse.osgi.framework.internal.defaultadaptor.DefaultAdaptor";
this.osgiConsoleClazz = "org.eclipse.osgi.framework.internal.core.FrameworkConsole";
this.adaptorArgs = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.launcher, "Launcher");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
 new org.eclipse.osgi.framework.launcher.Launcher ().doIt (args);
}, "~A");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "doIt", 
function (args) {
var consoleArgs = this.parseArgs (args);
var adaptor = null;
try {
adaptor = this.doAdaptor ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
System.out.println (org.eclipse.osgi.framework.internal.core.Msg.LAUNCHER_ADAPTOR_ERROR);
e.printStackTrace ();
return ;
} else {
throw e;
}
}
var osgi = this.doOSGi (adaptor);
if (osgi != null) {
if (this.console) {
this.doConsole (osgi, consoleArgs);
} else {
osgi.launch ();
}}}, "~A");
Clazz.defineMethod (c$, "parseArgs", 
function (args) {
var consoleArgsVector =  new java.util.Vector ();
for (var i = 0; i < args.length; i++) {
var match = false;
var fullarg = args[i];
var quoteidx = fullarg.indexOf ("\"");
if (quoteidx > 0) {
if (quoteidx == fullarg.lastIndexOf ("\"")) {
var stillparsing = true;
i++;
while (i < args.length && stillparsing) {
fullarg = fullarg + " " + args[i];
i++;
if (quoteidx < fullarg.lastIndexOf ("\"")) {
stillparsing = false;
}}
}} else {
quoteidx = fullarg.indexOf ("'");
if (quoteidx > 0) {
if (quoteidx == fullarg.lastIndexOf ("'")) {
var stillparsing = true;
i++;
while (i < args.length && stillparsing) {
fullarg = fullarg + " " + args[i];
i++;
if (quoteidx < fullarg.lastIndexOf ("'")) {
stillparsing = false;
}}
}fullarg = fullarg.$replace ('\'', '\"');
}}var tok =  new org.eclipse.osgi.framework.internal.core.Tokenizer (fullarg);
if (tok.hasMoreTokens ()) {
var command = tok.getString (" ");
var subtok =  new java.util.StringTokenizer (command, ":");
var subcommand = subtok.nextToken ().toLowerCase ();
if (org.eclipse.osgi.framework.launcher.Launcher.matchCommand ("-console", subcommand, 4)) {
this._console (command);
match = true;
}if (org.eclipse.osgi.framework.launcher.Launcher.matchCommand ("-adaptor", subcommand, 2)) {
this._adaptor (command);
match = true;
}if (match == false) {
consoleArgsVector.addElement (fullarg);
}}}
var consoleArgsArray =  new Array (consoleArgsVector.size ());
var e = consoleArgsVector.elements ();
for (var i = 0; i < consoleArgsArray.length; i++) {
consoleArgsArray[i] = e.nextElement ();
}
return consoleArgsArray;
}, "~A");
c$.matchCommand = Clazz.defineMethod (c$, "matchCommand", 
function (command, input, minLength) {
if (minLength <= 0) {
minLength = command.length;
}var length = input.length;
if (minLength > length) {
length = minLength;
}return (command.regionMatches (0, input, 0, length));
}, "~S,~S,~N");
Clazz.defineMethod (c$, "_console", 
function (command) {
this.console = true;
var tok =  new java.util.StringTokenizer (command, ":");
var cmd = tok.nextToken ();
if (tok.hasMoreTokens ()) {
this.consolePort = tok.nextToken ();
}}, "~S");
Clazz.defineMethod (c$, "_adaptor", 
function (command) {
var tok =  new org.eclipse.osgi.framework.internal.core.Tokenizer (command);
var cmd = tok.getToken (":");
tok.getChar ();
var adp = tok.getToken (":");
if (adp.length > 0) {
this.adaptorClassName = adp;
}var v =  new java.util.Vector ();
parseloop : while (true) {
tok.getChar ();
var arg = tok.getString (":");
if (arg == null) {
break parseloop;
} else {
v.addElement (arg);
}}
if (v != null) {
var numArgs = v.size ();
this.adaptorArgs =  new Array (numArgs);
var e = v.elements ();
for (var i = 0; i < numArgs; i++) {
this.adaptorArgs[i] = e.nextElement ();
}
}}, "~S");
Clazz.defineMethod (c$, "doAdaptor", 
function () {
var adaptorClass = Class.forName (this.adaptorClassName);
var constructorArgs = [Array];
var constructor = adaptorClass.getConstructor (constructorArgs);
return constructor.newInstance ([this.adaptorArgs]);
});
Clazz.defineMethod (c$, "doOSGi", 
($fz = function (adaptor) {
return  new org.eclipse.osgi.framework.internal.core.OSGi (adaptor);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.adaptor.FrameworkAdaptor");
Clazz.defineMethod (c$, "doConsole", 
($fz = function (osgi, consoleArgs) {
var consoleConstructor;
var osgiconsole;
var parameterTypes;
var parameters;
try {
var osgiconsoleClass = Class.forName ("org.eclipse.osgi.framework.internal.core.FrameworkConsole");
if (this.consolePort.length == 0) {
parameterTypes = [org.eclipse.osgi.framework.internal.core.OSGi, Array];
parameters = [osgi, consoleArgs];
} else {
parameterTypes = [org.eclipse.osgi.framework.internal.core.OSGi, Number, Array];
parameters = [osgi,  new Integer (this.consolePort), consoleArgs];
}consoleConstructor = osgiconsoleClass.getConstructor (parameterTypes);
osgiconsole = consoleConstructor.newInstance (parameters);
var t =  new Thread ((osgiconsole), "OSGi Console");
t.start ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, NumberFormatException)) {
var nfe = e$$;
{
System.err.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.LAUNCHER_INVALID_PORT, this.consolePort));
}
} else if (Clazz.instanceOf (e$$, Exception)) {
var ex = e$$;
{
this.informAboutMissingComponent ("OSGi Console", "console.jar");
}
} else {
throw e$$;
}
}
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.core.OSGi,~A");
Clazz.defineMethod (c$, "informAboutMissingComponent", 
function (component, jar) {
System.out.println ();
System.out.print (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.LAUNCHER_COMPONENT_MISSING, component));
System.out.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.LAUNCHER_COMPONENT_JAR, jar));
System.out.println ();
}, "~S,~S");
Clazz.defineStatics (c$,
"OSGI_CONSOLE_COMPONENT_NAME", "OSGi Console",
"OSGI_CONSOLE_COMPONENT", "console.jar");
});
