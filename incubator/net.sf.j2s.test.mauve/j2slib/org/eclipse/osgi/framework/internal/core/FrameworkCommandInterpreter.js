Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.console.CommandInterpreter"], "org.eclipse.osgi.framework.internal.core.FrameworkCommandInterpreter", ["java.lang.IllegalArgumentException", "$.StringBuffer", "$.Throwable", "java.lang.reflect.Modifier", "java.util.StringTokenizer", "org.eclipse.osgi.framework.internal.core.ConsoleMsg", "$.Util", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tok = null;
this.commandProviders = null;
this.con = null;
this.out = null;
this.tab = "\t";
this.newline = "\r\n";
this.firstCommand = true;
this.currentLineCount = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "FrameworkCommandInterpreter", null, org.eclipse.osgi.framework.console.CommandInterpreter);
Clazz.makeConstructor (c$, 
function (cmdline, commandProviders, con) {
this.tok =  new java.util.StringTokenizer (cmdline);
this.commandProviders = commandProviders;
this.con = con;
this.out = con.getWriter ();
}, "~S,~A,org.eclipse.osgi.framework.internal.core.FrameworkConsole");
Clazz.defineMethod (c$, "nextArgument", 
function () {
if (this.tok == null || !this.tok.hasMoreElements ()) {
return null;
}var token = this.tok.nextToken ();
var index = token.indexOf ('"');
if (index != -1) {
if (index == token.lastIndexOf ('"')) {
token += this.tok.nextToken ("\"");
}var buf =  new StringBuffer (token);
while (index != -1) {
buf.deleteCharAt (index);
token = buf.toString ();
index = token.indexOf ('"');
}
return buf.toString ();
}return (token);
});
Clazz.defineMethod (c$, "execute", 
function (cmd) {
if (!this.firstCommand) return this.innerExecute (cmd);
this.firstCommand = false;
this.resetLineCount ();
var retval = null;
if (cmd.equalsIgnoreCase ("more")) {
try {
this._more ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.printStackTrace (e);
} else {
throw e;
}
}
return retval;
}if (cmd.equalsIgnoreCase ("disconnect") && this.con.getUseSocketStream ()) {
try {
this._disconnect ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.printStackTrace (e);
} else {
throw e;
}
}
return retval;
}var parameterTypes = [org.eclipse.osgi.framework.console.CommandInterpreter];
var parameters = [this];
var executed = false;
var size = this.commandProviders.length;
for (var i = 0; !executed && (i < size); i++) {
try {
var target = this.commandProviders[i];
var method = target.getClass ().getMethod ("_" + cmd, parameterTypes);
retval = method.invoke (target, parameters);
executed = true;
} catch (e$$) {
if (Clazz.instanceOf (e$$, NoSuchMethodException)) {
var ite = e$$;
{
}
} else if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var ite = e$$;
{
executed = true;
this.printStackTrace (ite.getTargetException ());
}
} else if (Clazz.instanceOf (e$$, Exception)) {
var ee = e$$;
{
executed = true;
this.printStackTrace (ee);
}
} else {
throw e$$;
}
}
}
if (!executed) {
for (var i = 0; i < size; i++) {
try {
var commandProvider = this.commandProviders[i];
this.out.print (commandProvider.getHelp ());
this.out.flush ();
} catch (ee) {
if (Clazz.instanceOf (ee, Exception)) {
this.printStackTrace (ee);
} else {
throw ee;
}
}
}
this.out.print (this.getHelp ());
this.out.flush ();
}return retval;
}, "~S");
Clazz.defineMethod (c$, "innerExecute", 
($fz = function (cmd) {
if (cmd != null && cmd.length > 0) {
var intcp =  new org.eclipse.osgi.framework.internal.core.FrameworkCommandInterpreter (cmd, this.commandProviders, this.con);
var command = intcp.nextArgument ();
if (command != null) return intcp.execute (command);
}return null;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getMaximumLinesToScroll", 
($fz = function () {
return org.eclipse.osgi.framework.internal.core.FrameworkCommandInterpreter.maxLineCount;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setMaximumLinesToScroll", 
($fz = function (lines) {
if (lines < 0) {
throw  new IllegalArgumentException (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_LINES_TO_SCROLL_NEGATIVE_ERROR);
}($t$ = org.eclipse.osgi.framework.internal.core.FrameworkCommandInterpreter.maxLineCount = lines, org.eclipse.osgi.framework.internal.core.FrameworkCommandInterpreter.prototype.maxLineCount = org.eclipse.osgi.framework.internal.core.FrameworkCommandInterpreter.maxLineCount, $t$);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "resetLineCount", 
($fz = function () {
this.currentLineCount = 0;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "printline", 
($fz = function (o) {
this.print (o + this.newline);
}, $fz.isPrivate = true, $fz), "~O");
Clazz.overrideMethod (c$, "print", 
function (o) {
{
this.check4More ();
this.out.print (o);
this.out.flush ();
}}, "~O");
Clazz.defineMethod (c$, "println", 
function () {
this.println ("");
});
Clazz.overrideMethod (c$, "printStackTrace", 
function (t) {
t.printStackTrace (this.out);
var methods = t.getClass ().getMethods ();
var size = methods.length;
var throwable = Throwable;
for (var i = 0; i < size; i++) {
var method = methods[i];
if (java.lang.reflect.Modifier.isPublic (method.getModifiers ()) && method.getName ().startsWith ("get") && throwable.isAssignableFrom (method.getReturnType ()) && (method.getParameterTypes ().length == 0)) {
try {
var nested = method.invoke (t, [null]);
if ((nested != null) && (nested !== t)) {
this.out.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NESTED_EXCEPTION);
this.printStackTrace (nested);
}} catch (e$$) {
if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
}
} else {
throw e$$;
}
}
}}
}, "Throwable");
Clazz.defineMethod (c$, "println", 
function (o) {
if (o == null) {
return ;
}{
this.check4More ();
this.printline (o);
this.currentLineCount++;
this.currentLineCount += Math.floor (o.toString ().length / 80);
}}, "~O");
Clazz.overrideMethod (c$, "printDictionary", 
function (dic, title) {
if (dic == null) return ;
var count = dic.size ();
var keys =  new Array (count);
var keysEnum = dic.keys ();
var i = 0;
while (keysEnum.hasMoreElements ()) {
keys[i++] = keysEnum.nextElement ();
}
org.eclipse.osgi.framework.internal.core.Util.sort (keys);
if (title != null) {
this.println (title);
}for (i = 0; i < count; i++) {
this.println (" " + keys[i] + " = " + dic.get (keys[i]));
}
this.println ();
}, "java.util.Dictionary,~S");
Clazz.overrideMethod (c$, "printBundleResource", 
function (bundle, resource) {
var entry = null;
entry = bundle.getEntry (resource);
if (entry != null) {
try {
this.println (resource);
var $in = entry.openStream ();
var buffer =  Clazz.newArray (1024, 0);
var read = 0;
try {
while ((read = $in.read (buffer)) != -1) this.print ( String.instantialize (buffer, 0, read));

} finally {
if ($in != null) {
try {
$in.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}}
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
System.err.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_ERROR_READING_RESOURCE, resource));
} else {
throw e;
}
}
} else {
this.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_RESOURCE_NOT_IN_BUNDLE, resource, bundle.toString ()));
}}, "org.osgi.framework.Bundle,~S");
Clazz.defineMethod (c$, "check4More", 
($fz = function () {
var max = this.getMaximumLinesToScroll ();
if (max > 0) {
if (this.currentLineCount >= max) {
this.out.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_MORE);
this.out.flush ();
this.con.getInput ();
this.resetLineCount ();
}}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getHelp", 
function () {
var help =  new StringBuffer (256);
help.append (this.newline);
help.append (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_CONTROLLING_CONSOLE_HEADING);
help.append (this.newline);
help.append (this.tab);
help.append ("more - ");
help.append (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_MORE);
if (this.con.getUseSocketStream ()) {
help.append (this.newline);
help.append (this.tab);
help.append ("disconnect - ");
help.append (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_DISCONNECT);
}return help.toString ();
});
Clazz.defineMethod (c$, "_more", 
function () {
if (this.confirm (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_CONFIRM_MORE, true)) {
var lines = this.prompt (this.newline + org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_MORE_ENTER_LINES, 24);
this.setMaximumLinesToScroll (lines);
} else {
this.setMaximumLinesToScroll (0);
}});
Clazz.defineMethod (c$, "_disconnect", 
($fz = function () {
if (this.confirm (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_CONFIRM_DISCONNECT, true)) {
this.con.disconnect ();
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "confirm", 
function (string, defaultAnswer) {
{
if (string.length > 0) {
this.print (string);
} else {
this.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_CONFIRM);
}this.print (" (" + org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_CONFIRM_VALUES);
if (defaultAnswer) {
this.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_Y + ") ");
} else {
this.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_N + ") ");
}}var input = this.con.getInput ();
this.resetLineCount ();
if (input.length == 0) {
return defaultAnswer;
}return (input.toLowerCase ().charAt (0)).charCodeAt (0) == (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_Y.charAt (0)).charCodeAt (0);
}, "~S,~B");
Clazz.defineMethod (c$, "prompt", 
function (string, defaultAnswer) {
if (string.length > 0) {
if (defaultAnswer.length > 0) {
var buf =  new StringBuffer (256);
buf.append (string);
buf.append (" ");
buf.append (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_PROMPT_DEFAULT);
buf.append ("=");
buf.append (defaultAnswer);
buf.append (") ");
this.print (buf.toString ());
} else {
this.print (string);
}}var input = this.con.getInput ();
this.resetLineCount ();
if (input.length > 0) {
return input;
}return defaultAnswer;
}, "~S,~S");
Clazz.defineMethod (c$, "prompt", 
function (string, defaultAnswer) {
var i =  new Integer (defaultAnswer);
var answer;
for (var j = 0; j < 3; j++) {
var s = this.prompt (string, i.toString ());
try {
answer = Integer.parseInt (s);
if (answer >= 0) {
return answer;
}} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
this.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_INVALID_INPUT);
}
this.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_TOO_MUCH_INVALID_INPUT);
return defaultAnswer;
}, "~S,~N");
Clazz.defineStatics (c$,
"maxLineCount", 0);
});
