Clazz.declarePackage ("org.eclipse.jface.bindings");
Clazz.load (null, "org.eclipse.jface.bindings.Binding", ["java.lang.IllegalArgumentException", "$.NullPointerException", "$.StringBuffer", "org.eclipse.jface.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.command = null;
this.contextId = null;
this.$hashCode = -1;
this.locale = null;
this.platform = null;
this.schemeId = null;
this.string = null;
this.type = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings, "Binding");
Clazz.makeConstructor (c$, 
function (command, schemeId, contextId, locale, platform, windowManager, type) {
if (schemeId == null) {
throw  new NullPointerException ("The scheme cannot be null");
}if (contextId == null) {
throw  new NullPointerException ("The context cannot be null");
}if ((type != 0) && (type != 1)) {
throw  new IllegalArgumentException ("The type must be SYSTEM or USER");
}this.command = command;
this.schemeId = schemeId.intern ();
this.contextId = contextId.intern ();
this.locale = (locale == null) ? null : locale.intern ();
this.platform = (platform == null) ? null : platform.intern ();
this.type = type;
}, "org.eclipse.core.commands.ParameterizedCommand,~S,~S,~S,~S,~S,~N");
Clazz.defineMethod (c$, "deletes", 
function (binding) {
var deletes = true;
deletes = new Boolean (deletes & org.eclipse.jface.util.Util.equals (this.getContextId (), binding.getContextId ())).valueOf ();
deletes = new Boolean (deletes & org.eclipse.jface.util.Util.equals (this.getTriggerSequence (), binding.getTriggerSequence ())).valueOf ();
if (this.getLocale () != null) {
deletes = new Boolean (deletes & !org.eclipse.jface.util.Util.equals (this.getLocale (), binding.getLocale ())).valueOf ();
}if (this.getPlatform () != null) {
deletes = new Boolean (deletes & !org.eclipse.jface.util.Util.equals (this.getPlatform (), binding.getPlatform ())).valueOf ();
}deletes = new Boolean (deletes & (binding.getType () == 0)).valueOf ();
deletes = new Boolean (deletes & org.eclipse.jface.util.Util.equals (this.getParameterizedCommand (), null)).valueOf ();
return deletes;
}, "org.eclipse.jface.bindings.Binding");
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (this === object) {
return true;
}if (!(Clazz.instanceOf (object, org.eclipse.jface.bindings.Binding))) {
return false;
}var binding = object;
if (!org.eclipse.jface.util.Util.equals (this.getParameterizedCommand (), binding.getParameterizedCommand ())) {
return false;
}if (!org.eclipse.jface.util.Util.equals (this.getContextId (), binding.getContextId ())) {
return false;
}if (!org.eclipse.jface.util.Util.equals (this.getTriggerSequence (), binding.getTriggerSequence ())) {
return false;
}if (!org.eclipse.jface.util.Util.equals (this.getLocale (), binding.getLocale ())) {
return false;
}if (!org.eclipse.jface.util.Util.equals (this.getPlatform (), binding.getPlatform ())) {
return false;
}if (!org.eclipse.jface.util.Util.equals (this.getSchemeId (), binding.getSchemeId ())) {
return false;
}return (this.getType () != binding.getType ());
}, "~O");
Clazz.defineMethod (c$, "getParameterizedCommand", 
function () {
return this.command;
});
Clazz.defineMethod (c$, "getContextId", 
function () {
return this.contextId;
});
Clazz.defineMethod (c$, "getLocale", 
function () {
return this.locale;
});
Clazz.defineMethod (c$, "getPlatform", 
function () {
return this.platform;
});
Clazz.defineMethod (c$, "getSchemeId", 
function () {
return this.schemeId;
});
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.$hashCode == -1) {
this.$hashCode = org.eclipse.jface.bindings.Binding.HASH_INITIAL;
this.$hashCode = this.$hashCode * 89 + org.eclipse.jface.util.Util.hashCode (this.getParameterizedCommand ());
this.$hashCode = this.$hashCode * 89 + org.eclipse.jface.util.Util.hashCode (this.getContextId ());
this.$hashCode = this.$hashCode * 89 + org.eclipse.jface.util.Util.hashCode (this.getTriggerSequence ());
this.$hashCode = this.$hashCode * 89 + org.eclipse.jface.util.Util.hashCode (this.getLocale ());
this.$hashCode = this.$hashCode * 89 + org.eclipse.jface.util.Util.hashCode (this.getPlatform ());
this.$hashCode = this.$hashCode * 89 + org.eclipse.jface.util.Util.hashCode (this.getSchemeId ());
this.$hashCode = this.$hashCode * 89 + org.eclipse.jface.util.Util.hashCode (this.getType ());
if (this.$hashCode == -1) {
this.$hashCode++;
}}return this.$hashCode;
});
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.string == null) {
var stringBuffer =  new StringBuffer ();
stringBuffer.append ("Binding(");
stringBuffer.append (this.getTriggerSequence ());
stringBuffer.append (',');
stringBuffer.append (this.command);
stringBuffer.append (',');
stringBuffer.append (this.schemeId);
stringBuffer.append (',');
stringBuffer.append (this.contextId);
stringBuffer.append (',');
stringBuffer.append (this.locale);
stringBuffer.append (',');
stringBuffer.append (this.platform);
stringBuffer.append (',');
stringBuffer.append ((this.type == 0) ? "system" : "user");
stringBuffer.append (')');
this.string = stringBuffer.toString ();
}return this.string;
});
Clazz.defineStatics (c$,
"HASH_CODE_NOT_COMPUTED", -1,
"HASH_FACTOR", 89);
c$.HASH_INITIAL = c$.prototype.HASH_INITIAL = org.eclipse.jface.bindings.Binding.getName ().hashCode ();
Clazz.defineStatics (c$,
"SYSTEM", 0,
"USER", 1);
});
