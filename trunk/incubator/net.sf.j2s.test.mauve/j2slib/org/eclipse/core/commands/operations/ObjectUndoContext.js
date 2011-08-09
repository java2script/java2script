Clazz.declarePackage ("org.eclipse.core.commands.operations");
Clazz.load (["org.eclipse.core.commands.operations.UndoContext", "java.util.ArrayList"], "org.eclipse.core.commands.operations.ObjectUndoContext", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.object = null;
this.label = null;
this.children = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.operations, "ObjectUndoContext", org.eclipse.core.commands.operations.UndoContext);
Clazz.prepareFields (c$, function () {
this.children =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function (object) {
this.construct (object, null);
}, "~O");
Clazz.makeConstructor (c$, 
function (object, label) {
Clazz.superConstructor (this, org.eclipse.core.commands.operations.ObjectUndoContext);
this.object = object;
this.label = label;
}, "~O,~S");
Clazz.overrideMethod (c$, "getLabel", 
function () {
if (this.label == null) return this.object.toString ();
return this.label;
});
Clazz.defineMethod (c$, "getObject", 
function () {
return this.object;
});
Clazz.defineMethod (c$, "addMatch", 
function (context) {
this.children.add (context);
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.defineMethod (c$, "removeMatch", 
function (context) {
this.children.remove (context);
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.defineMethod (c$, "matches", 
function (context) {
if (this.children.contains (context)) return true;
return Clazz.superCall (this, org.eclipse.core.commands.operations.ObjectUndoContext, "matches", [context]);
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.defineMethod (c$, "toString", 
function () {
return this.getLabel ();
});
});
