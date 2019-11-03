Clazz.declarePackage ("org.eclipse.core.runtime.jobs");
Clazz.load (["org.eclipse.core.runtime.jobs.ISchedulingRule"], "org.eclipse.core.runtime.jobs.MultiRule", ["java.lang.StringBuffer", "java.util.ArrayList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.rules = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.jobs, "MultiRule", null, org.eclipse.core.runtime.jobs.ISchedulingRule);
c$.combine = Clazz.defineMethod (c$, "combine", 
function (ruleArray) {
var result = null;
for (var i = 0; i < ruleArray.length; i++) {
if (ruleArray[i] == null) continue ;if (result == null) {
result = ruleArray[i];
continue ;}result = org.eclipse.core.runtime.jobs.MultiRule.combine (result, ruleArray[i]);
}
return result;
}, "~A");
c$.combine = Clazz.defineMethod (c$, "combine", 
function (rule1, rule2) {
if (rule1 === rule2) return rule1;
if (rule1 == null) return rule2;
if (rule2 == null) return rule1;
if (rule1.contains (rule2)) return rule1;
if (rule2.contains (rule1)) return rule2;
var result =  new org.eclipse.core.runtime.jobs.MultiRule ();
result.rules = [rule1, rule2];
if (Clazz.instanceOf (rule1, org.eclipse.core.runtime.jobs.MultiRule) || Clazz.instanceOf (rule2, org.eclipse.core.runtime.jobs.MultiRule)) result.rules = org.eclipse.core.runtime.jobs.MultiRule.flatten (result.rules);
return result;
}, "org.eclipse.core.runtime.jobs.ISchedulingRule,org.eclipse.core.runtime.jobs.ISchedulingRule");
c$.flatten = Clazz.defineMethod (c$, "flatten", 
($fz = function (nestedRules) {
var myRules =  new java.util.ArrayList (nestedRules.length);
for (var i = 0; i < nestedRules.length; i++) {
if (Clazz.instanceOf (nestedRules[i], org.eclipse.core.runtime.jobs.MultiRule)) {
var children = (nestedRules[i]).getChildren ();
for (var j = 0; j < children.length; j++) myRules.add (children[j]);

} else {
myRules.add (nestedRules[i]);
}}
return myRules.toArray ( new Array (myRules.size ()));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.makeConstructor (c$, 
function (nestedRules) {
this.rules = org.eclipse.core.runtime.jobs.MultiRule.flatten (nestedRules);
}, "~A");
Clazz.makeConstructor (c$, 
($fz = function () {
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getChildren", 
function () {
return this.rules.clone ();
});
Clazz.defineMethod (c$, "contains", 
function (rule) {
if (this === rule) return true;
if (Clazz.instanceOf (rule, org.eclipse.core.runtime.jobs.MultiRule)) {
var otherRules = (rule).getChildren ();
for (var other = 0; other < otherRules.length; other++) {
var found = false;
for (var mine = 0; !found && mine < this.rules.length; mine++) found = this.rules[mine].contains (otherRules[other]);

if (!found) return false;
}
return true;
}for (var i = 0; i < this.rules.length; i++) if (this.rules[i].contains (rule)) return true;

return false;
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "isConflicting", 
function (rule) {
if (this === rule) return true;
if (Clazz.instanceOf (rule, org.eclipse.core.runtime.jobs.MultiRule)) {
var otherRules = (rule).getChildren ();
for (var j = 0; j < otherRules.length; j++) for (var i = 0; i < this.rules.length; i++) if (this.rules[i].isConflicting (otherRules[j])) return true;


} else {
for (var i = 0; i < this.rules.length; i++) if (this.rules[i].isConflicting (rule)) return true;

}return false;
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.overrideMethod (c$, "toString", 
function () {
var buffer =  new StringBuffer ();
buffer.append ("MultiRule[");
var last = this.rules.length - 1;
for (var i = 0; i < this.rules.length; i++) {
buffer.append (this.rules[i]);
if (i != last) buffer.append (',');
}
buffer.append (']');
return buffer.toString ();
});
});
