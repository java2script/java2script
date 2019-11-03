Clazz.declarePackage ("org.eclipse.core.commands.contexts");
Clazz.load (["org.eclipse.core.commands.common.NamedHandleObject"], "org.eclipse.core.commands.contexts.Context", ["java.lang.NullPointerException", "$.StringBuffer", "java.util.HashSet", "org.eclipse.core.commands.common.NotDefinedException", "org.eclipse.core.commands.contexts.ContextEvent", "org.eclipse.core.internal.commands.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listeners = null;
this.parentId = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.contexts, "Context", org.eclipse.core.commands.common.NamedHandleObject, Comparable);
Clazz.defineMethod (c$, "addContextListener", 
function (listener) {
if (listener == null) {
throw  new NullPointerException ();
}if (this.listeners == null) {
this.listeners =  new java.util.HashSet ();
}this.listeners.add (listener);
}, "org.eclipse.core.commands.contexts.IContextListener");
Clazz.overrideMethod (c$, "compareTo", 
function (object) {
var scheme = object;
var compareTo = org.eclipse.core.internal.commands.util.Util.compare (this.id, scheme.id);
if (compareTo == 0) {
compareTo = org.eclipse.core.internal.commands.util.Util.compare (this.name, scheme.name);
if (compareTo == 0) {
compareTo = org.eclipse.core.internal.commands.util.Util.compare (this.parentId, scheme.parentId);
if (compareTo == 0) {
compareTo = org.eclipse.core.internal.commands.util.Util.compare (this.description, scheme.description);
if (compareTo == 0) {
compareTo = org.eclipse.core.internal.commands.util.Util.compare (this.defined, scheme.defined);
}}}}return compareTo;
}, "~O");
Clazz.defineMethod (c$, "define", 
function (name, description, parentId) {
if (name == null) {
throw  new NullPointerException ("The name of a scheme cannot be null");
}var definedChanged = !this.defined;
this.defined = true;
var nameChanged = !org.eclipse.core.internal.commands.util.Util.equals (this.name, name);
this.name = name;
var descriptionChanged = !org.eclipse.core.internal.commands.util.Util.equals (this.description, description);
this.description = description;
var parentIdChanged = !org.eclipse.core.internal.commands.util.Util.equals (this.parentId, parentId);
this.parentId = parentId;
this.fireContextChanged ( new org.eclipse.core.commands.contexts.ContextEvent (this, definedChanged, nameChanged, descriptionChanged, parentIdChanged));
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (!(Clazz.instanceOf (object, org.eclipse.core.commands.contexts.Context))) return false;
var castedObject = object;
if (!org.eclipse.core.internal.commands.util.Util.equals (this.defined, castedObject.defined)) return false;
if (!org.eclipse.core.internal.commands.util.Util.equals (this.description, castedObject.description)) return false;
if (!org.eclipse.core.internal.commands.util.Util.equals (this.id, castedObject.id)) return false;
if (!org.eclipse.core.internal.commands.util.Util.equals (this.name, castedObject.name)) return false;
return org.eclipse.core.internal.commands.util.Util.equals (this.parentId, castedObject.parentId);
}, "~O");
Clazz.defineMethod (c$, "fireContextChanged", 
($fz = function (event) {
if (event == null) {
throw  new NullPointerException ("Cannot send a null event to listeners.");
}if (this.listeners == null) {
return ;
}var listenerItr = this.listeners.iterator ();
while (listenerItr.hasNext ()) {
var listener = listenerItr.next ();
listener.contextChanged (event);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.contexts.ContextEvent");
Clazz.defineMethod (c$, "getParentId", 
function () {
if (!this.defined) {
throw  new org.eclipse.core.commands.common.NotDefinedException ("Cannot get the parent identifier from an undefined context.");
}return this.parentId;
});
Clazz.defineMethod (c$, "removeContextListener", 
function (contextListener) {
if (contextListener == null) {
throw  new NullPointerException ("Cannot remove a null listener.");
}if (this.listeners == null) {
return ;
}this.listeners.remove (contextListener);
if (this.listeners.isEmpty ()) {
this.listeners = null;
}}, "org.eclipse.core.commands.contexts.IContextListener");
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.string == null) {
var stringBuffer =  new StringBuffer ();
stringBuffer.append ("Context(");
stringBuffer.append (this.id);
stringBuffer.append (',');
stringBuffer.append (this.name);
stringBuffer.append (',');
stringBuffer.append (this.description);
stringBuffer.append (',');
stringBuffer.append (this.parentId);
stringBuffer.append (',');
stringBuffer.append (this.defined);
stringBuffer.append (')');
this.string = stringBuffer.toString ();
}return this.string;
});
Clazz.overrideMethod (c$, "undefine", 
function () {
this.string = null;
var definedChanged = this.defined;
this.defined = false;
var nameChanged = this.name != null;
this.name = null;
var descriptionChanged = this.description != null;
this.description = null;
var parentIdChanged = this.parentId != null;
this.parentId = null;
this.fireContextChanged ( new org.eclipse.core.commands.contexts.ContextEvent (this, definedChanged, nameChanged, descriptionChanged, parentIdChanged));
});
});
