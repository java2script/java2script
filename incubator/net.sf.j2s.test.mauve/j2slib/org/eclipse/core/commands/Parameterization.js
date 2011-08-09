Clazz.declarePackage ("org.eclipse.core.commands");
Clazz.load (null, "org.eclipse.core.commands.Parameterization", ["java.lang.NullPointerException", "org.eclipse.core.internal.commands.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$hashCode = -1;
this.parameter = null;
this.value = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands, "Parameterization");
Clazz.makeConstructor (c$, 
function (parameter, value) {
if (parameter == null) {
throw  new NullPointerException ("You cannot parameterize a null parameter");
}this.parameter = parameter;
this.value = value;
}, "org.eclipse.core.commands.IParameter,~S");
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (this === object) {
return true;
}if (!(Clazz.instanceOf (object, org.eclipse.core.commands.Parameterization))) {
return false;
}var parameterization = object;
if (!(org.eclipse.core.internal.commands.util.Util.equals (this.parameter.getId (), parameterization.parameter.getId ()))) {
return false;
}return org.eclipse.core.internal.commands.util.Util.equals (this.value, parameterization.value);
}, "~O");
Clazz.defineMethod (c$, "getParameter", 
function () {
return this.parameter;
});
Clazz.defineMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.defineMethod (c$, "getValueName", 
function () {
var parameterValues = this.parameter.getValues ().getParameterValues ();
var parameterValueItr = parameterValues.entrySet ().iterator ();
var returnValue = null;
while (parameterValueItr.hasNext ()) {
var entry = parameterValueItr.next ();
var currentValue = entry.getValue ();
if (org.eclipse.core.internal.commands.util.Util.equals (this.value, currentValue)) {
returnValue = entry.getKey ();
break;
}}
if (returnValue == null) {
return "";
}return returnValue;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.$hashCode == -1) {
this.$hashCode = org.eclipse.core.commands.Parameterization.HASH_INITIAL * 89 + org.eclipse.core.internal.commands.util.Util.hashCode (this.parameter);
this.$hashCode = this.$hashCode * 89 + org.eclipse.core.internal.commands.util.Util.hashCode (this.value);
if (this.$hashCode == -1) {
this.$hashCode++;
}}return this.$hashCode;
});
Clazz.defineStatics (c$,
"HASH_CODE_NOT_COMPUTED", -1,
"HASH_FACTOR", 89);
c$.HASH_INITIAL = c$.prototype.HASH_INITIAL = org.eclipse.core.commands.Parameterization.getName ().hashCode ();
});
