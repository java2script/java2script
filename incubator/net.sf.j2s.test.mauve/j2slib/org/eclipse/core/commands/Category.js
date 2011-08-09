Clazz.declarePackage ("org.eclipse.core.commands");
Clazz.load (["org.eclipse.core.commands.common.NamedHandleObject"], "org.eclipse.core.commands.Category", ["java.lang.NullPointerException", "$.StringBuffer", "java.util.ArrayList", "org.eclipse.core.commands.CategoryEvent", "org.eclipse.core.internal.commands.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.categoryListeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands, "Category", org.eclipse.core.commands.common.NamedHandleObject);
Clazz.defineMethod (c$, "addCategoryListener", 
function (categoryListener) {
if (categoryListener == null) throw  new NullPointerException ();
if (this.categoryListeners == null) this.categoryListeners =  new java.util.ArrayList ();
if (!this.categoryListeners.contains (categoryListener)) this.categoryListeners.add (categoryListener);
}, "org.eclipse.core.commands.ICategoryListener");
Clazz.defineMethod (c$, "define", 
function (name, description) {
if (name == null) {
throw  new NullPointerException ("The name of a command cannot be null");
}var definedChanged = !this.defined;
this.defined = true;
var nameChanged = !org.eclipse.core.internal.commands.util.Util.equals (this.name, name);
this.name = name;
var descriptionChanged = !org.eclipse.core.internal.commands.util.Util.equals (this.description, description);
this.description = description;
this.fireCategoryChanged ( new org.eclipse.core.commands.CategoryEvent (this, definedChanged, descriptionChanged, nameChanged));
}, "~S,~S");
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (!(Clazz.instanceOf (object, org.eclipse.core.commands.Command))) return false;
var castedObject = object;
if (!org.eclipse.core.internal.commands.util.Util.equals (this.defined, castedObject.defined)) return false;
if (!org.eclipse.core.internal.commands.util.Util.equals (this.description, castedObject.description)) return false;
if (!org.eclipse.core.internal.commands.util.Util.equals (this.id, castedObject.id)) return false;
return org.eclipse.core.internal.commands.util.Util.equals (this.name, castedObject.name);
}, "~O");
Clazz.defineMethod (c$, "fireCategoryChanged", 
($fz = function (categoryEvent) {
if (categoryEvent == null) throw  new NullPointerException ();
if (this.categoryListeners != null) {
var listenerItr = this.categoryListeners.iterator ();
while (listenerItr.hasNext ()) {
var listener = listenerItr.next ();
listener.categoryChanged (categoryEvent);
}
}}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.CategoryEvent");
Clazz.defineMethod (c$, "removeCategoryListener", 
function (categoryListener) {
if (categoryListener == null) throw  new NullPointerException ();
if (this.categoryListeners != null) {
this.categoryListeners.remove (categoryListener);
}}, "org.eclipse.core.commands.ICategoryListener");
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.string == null) {
var stringBuffer =  new StringBuffer ();
stringBuffer.append ("Category(");
stringBuffer.append (this.id);
stringBuffer.append (',');
stringBuffer.append (this.name);
stringBuffer.append (',');
stringBuffer.append (this.description);
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
this.fireCategoryChanged ( new org.eclipse.core.commands.CategoryEvent (this, definedChanged, descriptionChanged, nameChanged));
});
});
