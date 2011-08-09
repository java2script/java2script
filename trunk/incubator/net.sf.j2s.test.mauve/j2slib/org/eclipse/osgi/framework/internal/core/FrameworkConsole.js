Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.osgi.util.tracker.ServiceTracker"], "org.eclipse.osgi.framework.internal.core.FrameworkConsole", ["java.io.BufferedReader", "$.BufferedWriter", "$.InputStreamReader", "$.OutputStreamWriter", "$.PrintWriter", "java.lang.Thread", "java.net.ServerSocket", "org.eclipse.osgi.framework.console.CommandProvider", "org.eclipse.osgi.framework.internal.core.ConsoleMsg", "$.FrameworkCommandInterpreter", "$.FrameworkCommandProvider", "$.Util", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$in = null;
this.out = null;
this.context = null;
this.osgi = null;
this.args = null;
this.osgicp = null;
this.cptracker = null;
this.useSocketStream = false;
this.$disconnect = false;
this.port = 0;
this.ss = null;
this.scsg = null;
this.s = null;
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.FrameworkConsole.ConsoleSocketGetter")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.server = null;
this.socket = null;
this.acceptConnections = true;
this.lock = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core.FrameworkConsole, "ConsoleSocketGetter", null, Runnable);
Clazz.prepareFields (c$, function () {
this.lock =  new Object ();
});
Clazz.makeConstructor (c$, 
function (a) {
this.server = a;
var b =  new Thread (this, "ConsoleSocketGetter");
b.start ();
}, "java.net.ServerSocket");
Clazz.overrideMethod (c$, "run", 
function () {
while (true) {
try {
this.socket = this.b$["org.eclipse.osgi.framework.internal.core.FrameworkConsole"].ss.accept ();
if (!this.acceptConnections) {
var a = this.b$["org.eclipse.osgi.framework.internal.core.FrameworkConsole"].createPrintWriter (this.socket.getOutputStream ());
a.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_TELNET_CONNECTION_REFUSED);
a.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_TELNET_CURRENTLY_USED);
a.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_TELNET_ONE_CLIENT_ONLY);
a.close ();
this.socket.close ();
} else {
{
this.lock.notify ();
}}} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
}
});
Clazz.defineMethod (c$, "getSocket", 
function () {
{
this.lock.wait ();
}this.setAcceptConnections (false);
return this.socket;
});
Clazz.defineMethod (c$, "setAcceptConnections", 
function (a) {
this.acceptConnections = a;
}, "~B");
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.FrameworkConsole.CommandProviderTracker")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.con = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core.FrameworkConsole, "CommandProviderTracker", org.osgi.util.tracker.ServiceTracker);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.FrameworkConsole.CommandProviderTracker, [a, b, null]);
this.con = c;
}, "org.osgi.framework.BundleContext,~S,org.eclipse.osgi.framework.internal.core.FrameworkConsole");
Clazz.defineMethod (c$, "addingService", 
function (a) {
var b = Clazz.superCall (this, org.eclipse.osgi.framework.internal.core.FrameworkConsole.CommandProviderTracker, "addingService", [a]);
return b;
}, "org.osgi.framework.ServiceReference");
Clazz.overrideMethod (c$, "getServices", 
function () {
var a = Clazz.superCall (this, org.eclipse.osgi.framework.internal.core.FrameworkConsole.CommandProviderTracker, "getServiceReferences", []);
org.eclipse.osgi.framework.internal.core.Util.dsort (a, 0, a.length);
var b =  new Array (a.length);
for (var c = 0; c < a.length; c++) {
b[c] = this.b$["org.eclipse.osgi.framework.internal.core.FrameworkConsole"].context.getService (a[c]);
}
return b;
});
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "FrameworkConsole", null, Runnable);
Clazz.makeConstructor (c$, 
function (osgi, args) {
this.getDefaultStreams ();
this.args = args;
this.osgi = osgi;
this.initialize ();
}, "org.eclipse.osgi.framework.internal.core.OSGi,~A");
Clazz.makeConstructor (c$, 
function (osgi, port, args) {
this.getSocketStream (port);
this.useSocketStream = true;
this.port = port;
this.args = args;
this.osgi = osgi;
this.initialize ();
}, "org.eclipse.osgi.framework.internal.core.OSGi,~N,~A");
Clazz.defineMethod (c$, "getDefaultStreams", 
($fz = function () {
this.$in = this.createBufferedReader (System.$in);
this.out = this.createPrintWriter (System.out);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getSocketStream", 
($fz = function (port) {
try {
System.out.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_LISTENING_ON_PORT, String.valueOf (port)));
if (this.ss == null) {
this.ss =  new java.net.ServerSocket (port);
this.scsg = Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.FrameworkConsole.ConsoleSocketGetter, this, null, this.ss);
}this.scsg.setAcceptConnections (true);
this.s = this.scsg.getSocket ();
this.$in = this.createBufferedReader (this.s.getInputStream ());
this.out = this.createPrintWriter (this.s.getOutputStream ());
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.net.UnknownHostException)) {
var uhe = e$$;
{
uhe.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
e.printStackTrace ();
}
} else {
throw e$$;
}
}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "createBufferedReader", 
($fz = function (_in) {
var reader;
try {
reader =  new java.io.BufferedReader ( new java.io.InputStreamReader (_in, org.eclipse.osgi.framework.internal.core.FrameworkConsole.encoding));
} catch (uee) {
if (Clazz.instanceOf (uee, java.io.UnsupportedEncodingException)) {
reader =  new java.io.BufferedReader ( new java.io.InputStreamReader (_in));
} else {
throw uee;
}
}
return reader;
}, $fz.isPrivate = true, $fz), "java.io.InputStream");
Clazz.defineMethod (c$, "createPrintWriter", 
($fz = function (_out) {
var writer;
try {
writer =  new java.io.PrintWriter ( new java.io.BufferedWriter ( new java.io.OutputStreamWriter (_out, org.eclipse.osgi.framework.internal.core.FrameworkConsole.encoding)), true);
} catch (uee) {
if (Clazz.instanceOf (uee, java.io.UnsupportedEncodingException)) {
writer =  new java.io.PrintWriter ( new java.io.BufferedWriter ( new java.io.OutputStreamWriter (_out)), true);
} else {
throw uee;
}
}
return writer;
}, $fz.isPrivate = true, $fz), "java.io.OutputStream");
Clazz.defineMethod (c$, "getWriter", 
function () {
return this.out;
});
Clazz.defineMethod (c$, "getReader", 
function () {
return this.$in;
});
Clazz.defineMethod (c$, "getUseSocketStream", 
function () {
return this.useSocketStream;
});
Clazz.defineMethod (c$, "initialize", 
($fz = function () {
this.context = this.osgi.getBundleContext ();
this.cptracker = Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.FrameworkConsole.CommandProviderTracker, this, null, this.context, org.eclipse.osgi.framework.console.CommandProvider.getName (), this);
this.cptracker.open ();
this.osgicp =  new org.eclipse.osgi.framework.internal.core.FrameworkCommandProvider (this.osgi);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "run", 
function () {
try {
this.console (this.args);
if (this.useSocketStream) {
while (true) {
this.getSocketStream (this.port);
this.console ();
}
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace (this.out);
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "console", 
function (args) {
if (args != null) {
for (var i = 0; i < args.length; i++) {
this.docommand (args[i]);
}
}this.console ();
}, "~A");
Clazz.defineMethod (c$, "console", 
function () {
var lock =  new Object ();
this.$disconnect = false;
var br = this.$in;
var consolePrompt = "\r\n" + org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_PROMPT;
var block = System.getProperty ("osgi.dev") != null;
while (!this.$disconnect) {
this.out.print (consolePrompt);
this.out.flush ();
var cmdline = null;
if (block) {
try {
{
while (!br.ready ()) lock.wait (300);

}cmdline = br.readLine ();
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
} else cmdline = br.readLine ();
if (cmdline == null) {
break;
}this.docommand (cmdline);
}
});
Clazz.defineMethod (c$, "docommand", 
function (cmdline) {
if (cmdline != null && cmdline.length > 0) {
var intcp =  new org.eclipse.osgi.framework.internal.core.FrameworkCommandInterpreter (cmdline, this.cptracker.getServices (), this);
var command = intcp.nextArgument ();
if (command != null) {
intcp.execute (command);
}}}, "~S");
Clazz.defineMethod (c$, "disconnect", 
function () {
this.$disconnect = true;
this.out.close ();
this.$in.close ();
this.s.close ();
});
Clazz.defineMethod (c$, "getInput", 
function () {
var input;
try {
input = (this.$in).readLine ();
System.out.println ("<" + input + ">");
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
input = "";
} else {
throw e;
}
}
return input;
});
Clazz.defineStatics (c$,
"defaultEncoding", "iso8859-1");
c$.encoding = c$.prototype.encoding = System.getProperty ("file.encoding", org.eclipse.osgi.framework.internal.core.FrameworkConsole.defaultEncoding);
});
