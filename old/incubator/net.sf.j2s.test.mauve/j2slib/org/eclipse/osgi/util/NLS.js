Clazz.declarePackage ("org.eclipse.osgi.util");
Clazz.load (null, "org.eclipse.osgi.util.NLS", ["java.lang.IllegalArgumentException", "$.StringBuffer", "org.eclipse.osgi.framework.internal.core.MessageResourceBundle"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.util, "NLS");
c$.bind = Clazz.defineMethod (c$, "bind", 
function (message, binding) {
return org.eclipse.osgi.util.NLS.internalBind (message, null, String.valueOf (binding), null);
}, "~S,~O");
c$.bind = Clazz.defineMethod (c$, "bind", 
function (message, binding1, binding2) {
return org.eclipse.osgi.util.NLS.internalBind (message, null, String.valueOf (binding1), String.valueOf (binding2));
}, "~S,~O,~O");
c$.bind = Clazz.defineMethod (c$, "bind", 
function (message, bindings) {
return org.eclipse.osgi.util.NLS.internalBind (message, bindings, null, null);
}, "~S,~A");
c$.initializeMessages = Clazz.defineMethod (c$, "initializeMessages", 
function (bundleName, clazz) {
org.eclipse.osgi.framework.internal.core.MessageResourceBundle.load (bundleName, clazz);
}, "~S,Class");
c$.internalBind = Clazz.defineMethod (c$, "internalBind", 
($fz = function (message, args, argZero, argOne) {
if (message == null) return "No message available.";
if (args == null || args.length == 0) args = org.eclipse.osgi.util.NLS.EMPTY_ARGS;
var length = message.length;
var bufLen = length + (args.length * 5);
if (argZero != null) bufLen += argZero.length - 3;
if (argOne != null) bufLen += argOne.length - 3;
var buffer =  new StringBuffer (bufLen);
for (var i = 0; i < length; i++) {
var c = message.charAt (i);
switch (c) {
case '{':
var index = message.indexOf ('}', i);
if (index == -1) {
buffer.append (c);
break;
}i++;
if (i >= length) {
buffer.append (c);
break;
}var number = -1;
try {
number = Integer.parseInt (message.substring (i, index));
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
throw  new IllegalArgumentException ();
} else {
throw e;
}
}
if (number == 0 && argZero != null) buffer.append (argZero);
 else if (number == 1 && argOne != null) buffer.append (argOne);
 else {
if (number >= args.length || number < 0) {
buffer.append ("<missing argument>");
i = index;
break;
}buffer.append (args[number]);
}i = index;
break;
case '\'':
var nextIndex = i + 1;
if (nextIndex >= length) {
buffer.append (c);
break;
}var next = message.charAt (nextIndex);
if ((next).charCodeAt (0) == ('\'').charCodeAt (0)) {
i++;
buffer.append (c);
break;
}index = message.indexOf ('\'', nextIndex);
if (index == -1) {
buffer.append (c);
break;
}buffer.append (message.substring (nextIndex, index));
i = index;
break;
default:
buffer.append (c);
}
}
return buffer.toString ();
}, $fz.isPrivate = true, $fz), "~S,~A,~S,~S");
Clazz.makeConstructor (c$, 
function () {
});
c$.EMPTY_ARGS = c$.prototype.EMPTY_ARGS =  new Array (0);
});
