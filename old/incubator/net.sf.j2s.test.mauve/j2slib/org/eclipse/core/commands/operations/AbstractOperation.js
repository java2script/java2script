Clazz.declarePackage ("org.eclipse.core.commands.operations");
Clazz.load (["org.eclipse.core.commands.operations.IUndoableOperation", "java.util.ArrayList"], "org.eclipse.core.commands.operations.AbstractOperation", ["java.lang.StringBuffer", "org.eclipse.core.internal.commands.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contexts = null;
this.label = "";
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.operations, "AbstractOperation", null, org.eclipse.core.commands.operations.IUndoableOperation);
Clazz.prepareFields (c$, function () {
this.contexts =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function (label) {
this.label = label;
}, "~S");
Clazz.overrideMethod (c$, "addContext", 
function (context) {
if (!this.contexts.contains (context)) {
this.contexts.add (context);
}}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.overrideMethod (c$, "canExecute", 
function () {
return true;
});
Clazz.overrideMethod (c$, "canRedo", 
function () {
return true;
});
Clazz.overrideMethod (c$, "canUndo", 
function () {
return true;
});
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.overrideMethod (c$, "getContexts", 
function () {
return this.contexts.toArray ( new Array (this.contexts.size ()));
});
Clazz.overrideMethod (c$, "getLabel", 
function () {
return this.label;
});
Clazz.defineMethod (c$, "setLabel", 
function (name) {
this.label = name;
}, "~S");
Clazz.overrideMethod (c$, "hasContext", 
function (context) {
org.eclipse.core.internal.commands.util.Assert.isNotNull (context);
for (var i = 0; i < this.contexts.size (); i++) {
var otherContext = this.contexts.get (i);
if (context.matches (otherContext) || otherContext.matches (context)) return true;
}
return false;
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.overrideMethod (c$, "removeContext", 
function (context) {
this.contexts.remove (context);
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.defineMethod (c$, "toString", 
function () {
var stringBuffer =  new StringBuffer ();
stringBuffer.append (this.getLabel ());
stringBuffer.append ("(");
var contexts = this.getContexts ();
for (var i = 0; i < contexts.length; i++) {
stringBuffer.append (contexts[i].toString ());
stringBuffer.append (',');
}
stringBuffer.append (')');
return stringBuffer.toString ();
});
});
