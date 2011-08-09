Clazz.declarePackage ("org.eclipse.core.commands");
Clazz.load (null, "org.eclipse.core.commands.ParameterizedCommand", ["java.lang.Error", "$.NullPointerException", "$.StringBuffer", "java.util.ArrayList", "$.Collections", "$.HashMap", "org.eclipse.core.commands.ExecutionEvent", "$.Parameterization", "org.eclipse.core.internal.commands.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.command = null;
this.$hashCode = -1;
this.parameterizations = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands, "ParameterizedCommand", null, Comparable);
c$.expandParameters = Clazz.defineMethod (c$, "expandParameters", 
($fz = function (startIndex, parameters) {
var noMoreParameters = (startIndex + 1 >= parameters.length);
var parameter = parameters[startIndex];
var values = null;
try {
values = parameter.getValues ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.commands.ParameterValuesException)) {
if (noMoreParameters) {
return java.util.Collections.EMPTY_LIST;
}return org.eclipse.core.commands.ParameterizedCommand.expandParameters (startIndex, parameters);
} else {
throw e;
}
}
var parameterValues = values.getParameterValues ();
var parameterizations =  new java.util.ArrayList (parameterValues.size ());
var parameterValueItr = parameterValues.entrySet ().iterator ();
while (parameterValueItr.hasNext ()) {
var entry = parameterValueItr.next ();
var parameterization =  new org.eclipse.core.commands.Parameterization (parameter, entry.getValue ());
parameterizations.add (parameterization);
}
if (parameter.isOptional ()) {
parameterizations.add (null);
}var parameterizationCount = parameterizations.size ();
if (noMoreParameters) {
for (var i = 0; i < parameterizationCount; i++) {
var parameterization = parameterizations.get (i);
var combination =  new java.util.ArrayList (1);
combination.add (parameterization);
parameterizations.set (i, combination);
}
return parameterizations;
}var suffixes = org.eclipse.core.commands.ParameterizedCommand.expandParameters (startIndex + 1, parameters);
if (suffixes.isEmpty ()) {
for (var i = 0; i < parameterizationCount; i++) {
var parameterization = parameterizations.get (i);
var combination =  new java.util.ArrayList (1);
combination.add (parameterization);
parameterizations.set (i, combination);
}
return parameterizations;
}var returnValue =  new java.util.ArrayList ();
var suffixItr = suffixes.iterator ();
while (suffixItr.hasNext ()) {
var combination = suffixItr.next ();
var combinationSize = combination.size ();
for (var i = 0; i < parameterizationCount; i++) {
var parameterization = parameterizations.get (i);
var newCombination =  new java.util.ArrayList (combinationSize + 1);
newCombination.add (parameterization);
newCombination.addAll (combination);
returnValue.add (newCombination);
}
}
return returnValue;
}, $fz.isPrivate = true, $fz), "~N,~A");
c$.generateCombinations = Clazz.defineMethod (c$, "generateCombinations", 
function (command) {
var parameters = command.getParameters ();
if (parameters == null) {
return java.util.Collections.singleton ( new org.eclipse.core.commands.ParameterizedCommand (command, null));
}var expansion = org.eclipse.core.commands.ParameterizedCommand.expandParameters (0, parameters);
var combinations =  new java.util.ArrayList (expansion.size ());
var expansionItr = expansion.iterator ();
while (expansionItr.hasNext ()) {
var combination = expansionItr.next ();
while (combination.remove (null)) {
}
if (combination.isEmpty ()) {
combinations.add ( new org.eclipse.core.commands.ParameterizedCommand (command, null));
} else {
var parameterizations = combination.toArray ( new Array (combination.size ()));
combinations.add ( new org.eclipse.core.commands.ParameterizedCommand (command, parameterizations));
}}
return combinations;
}, "org.eclipse.core.commands.Command");
Clazz.makeConstructor (c$, 
function (command, parameterizations) {
if (command == null) {
throw  new NullPointerException ("A parameterized command cannot have a null command");
}this.command = command;
this.parameterizations = parameterizations;
}, "org.eclipse.core.commands.Command,~A");
Clazz.overrideMethod (c$, "compareTo", 
function (object) {
var command = object;
var thisDefined = this.command.isDefined ();
var otherDefined = command.command.isDefined ();
if (!thisDefined || !otherDefined) {
return org.eclipse.core.internal.commands.util.Util.compare (thisDefined, otherDefined);
}try {
return this.getName ().compareTo (command.getName ());
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.commands.common.NotDefinedException)) {
throw  new Error ("Concurrent modification of a command's defined state");
} else {
throw e;
}
}
}, "~O");
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (this === object) {
return true;
}if (!(Clazz.instanceOf (object, org.eclipse.core.commands.ParameterizedCommand))) {
return false;
}var command = object;
if (!org.eclipse.core.internal.commands.util.Util.equals (this.command, command.command)) {
return false;
}return org.eclipse.core.internal.commands.util.Util.equals (this.parameterizations, command.parameterizations);
}, "~O");
Clazz.defineMethod (c$, "getCommand", 
function () {
return this.command;
});
Clazz.defineMethod (c$, "getId", 
function () {
return this.command.getId ();
});
Clazz.defineMethod (c$, "getName", 
function () {
var nameBuffer =  new StringBuffer ();
nameBuffer.append (this.command.getName ());
if (this.parameterizations != null) {
nameBuffer.append (" (");
var parameterizationCount = this.parameterizations.length;
for (var i = 0; i < parameterizationCount; i++) {
var parameterization = this.parameterizations[i];
nameBuffer.append (parameterization.getParameter ().getName ());
nameBuffer.append (": ");
try {
nameBuffer.append (parameterization.getValueName ());
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.commands.ParameterValuesException)) {
} else {
throw e;
}
}
if (i + 1 < parameterizationCount) {
nameBuffer.append (", ");
}}
nameBuffer.append (')');
}return nameBuffer.toString ();
});
Clazz.defineMethod (c$, "getParameterMap", 
function () {
if ((this.parameterizations == null) || (this.parameterizations.length == 0)) {
return java.util.Collections.EMPTY_MAP;
}var parameterMap =  new java.util.HashMap ();
for (var i = 0; i < this.parameterizations.length; i++) {
var parameterization = this.parameterizations[i];
parameterMap.put (parameterization.getParameter ().getId (), parameterization.getValue ());
}
return parameterMap;
});
Clazz.defineMethod (c$, "execute", 
function (trigger, applicationContext) {
return this.command.execute ( new org.eclipse.core.commands.ExecutionEvent (this.getParameterMap (), trigger, applicationContext));
}, "~O,~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.$hashCode == -1) {
this.$hashCode = org.eclipse.core.commands.ParameterizedCommand.HASH_INITIAL * 89 + org.eclipse.core.internal.commands.util.Util.hashCode (this.command);
this.$hashCode = this.$hashCode * 89 + org.eclipse.core.internal.commands.util.Util.hashCode (this.parameterizations);
if (this.$hashCode == -1) {
this.$hashCode++;
}}return this.$hashCode;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var buffer =  new StringBuffer ();
buffer.append ("ParameterizedCommand(");
buffer.append (this.command);
buffer.append (',');
buffer.append (this.parameterizations);
buffer.append (')');
return buffer.toString ();
});
Clazz.defineStatics (c$,
"HASH_CODE_NOT_COMPUTED", -1,
"HASH_FACTOR", 89);
c$.HASH_INITIAL = c$.prototype.HASH_INITIAL = org.eclipse.core.commands.ParameterizedCommand.getName ().hashCode ();
Clazz.defineStatics (c$,
"INDEX_PARAMETER_ID", 0,
"INDEX_PARAMETER_NAME", 1,
"INDEX_PARAMETER_VALUE_NAME", 2,
"INDEX_PARAMETER_VALUE_VALUE", 3);
});
