Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.lang.SecurityManager", "java.security.PrivilegedAction", "java.lang.ThreadLocal", "java.util.ArrayList"], "org.eclipse.osgi.framework.internal.core.FrameworkSecurityManager", ["java.lang.SecurityException", "java.security.AccessController", "java.util.Hashtable", "$.Vector"], function () {
c$ = Clazz.decorateAsClass (function () {
this.localCheckContext = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "FrameworkSecurityManager", SecurityManager);
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.depthCondSets = null;
this.CondClassSet = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core.FrameworkSecurityManager, "CheckContext");
Clazz.prepareFields (c$, function () {
this.depthCondSets =  new java.util.ArrayList (2);
});
Clazz.defineMethod (c$, "getDepth", 
function () {
return this.depthCondSets.size () - 1;
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.perm = null;
this.context = null;
this.fsm = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core.FrameworkSecurityManager, "CheckPermissionAction", null, java.security.PrivilegedAction);
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.fsm = a;
this.perm = b;
this.context = c;
}, "org.eclipse.osgi.framework.internal.core.FrameworkSecurityManager,java.security.Permission,~O");
Clazz.overrideMethod (c$, "run", 
function () {
this.fsm.internalCheckPermission (this.perm, this.context);
return null;
});
c$ = Clazz.p0p ();
Clazz.prepareFields (c$, function () {
this.localCheckContext =  new ThreadLocal ();
});
Clazz.defineMethod (c$, "addConditionsForDomain", 
function (condSet) {
var cc = this.localCheckContext.get ();
if (cc == null) {
return false;
}var condSets = cc.depthCondSets.get (cc.getDepth ());
if (condSets == null) {
condSets =  new java.util.Vector (2);
cc.depthCondSets.set (cc.getDepth (), condSets);
}condSets.add (condSet);
return true;
}, "~A");
Clazz.defineMethod (c$, "checkPermission", 
function (perm, context) {
java.security.AccessController.doPrivileged ( new org.eclipse.osgi.framework.internal.core.FrameworkSecurityManager.CheckPermissionAction (this, perm, context));
}, "java.security.Permission,~O");
Clazz.defineMethod (c$, "internalCheckPermission", 
function (perm, context) {
var acc = context;
var cc = this.localCheckContext.get ();
if (cc == null) {
cc =  new org.eclipse.osgi.framework.internal.core.FrameworkSecurityManager.CheckContext ();
this.localCheckContext.set (cc);
}cc.depthCondSets.add (null);
try {
acc.checkPermission (perm);
var remainingSets = cc.depthCondSets.get (cc.getDepth ());
if (remainingSets != null) {
var condContextDict =  new java.util.Hashtable (2);
var conds = remainingSets.remove (0);
for (var i = 0; i < conds.length; i++) if (this.recursiveCheck (remainingSets, conds[i], null, condContextDict, cc)) return ;

throw  new SecurityException ("Conditions not satisfied");
}} finally {
cc.depthCondSets.remove (cc.getDepth ());
}
}, "java.security.Permission,~O");
Clazz.defineMethod (c$, "recursiveCheck", 
($fz = function (remainingSets, conditions, condDict, condContextDict, cc) {
if (condDict == null) {
condDict =  new java.util.Hashtable (2);
} else {
var copyCondDict =  new java.util.Hashtable (2);
for (var keys = condDict.keys (); keys.hasMoreElements (); ) {
var key = keys.nextElement ();
copyCondDict.put (key, (condDict.get (key)).clone ());
}
condDict = copyCondDict;
}for (var i = 0; i < conditions.length; i++) {
if (conditions[i] == null) continue ;var condList = condDict.get (conditions[i].getClass ());
if (condList == null) {
condList =  new java.util.Vector ();
condDict.put (conditions[i].getClass (), condList);
}condList.add (conditions[i]);
}
if (remainingSets.size () > 0) {
var conds = remainingSets.get (0);
var newSets = remainingSets.clone ();
newSets.remove (0);
for (var i = 0; i < conds.length; i++) if (this.recursiveCheck (newSets, conds[i], condDict, condContextDict, cc)) return true;

return false;
}var keys = condDict.keys ();
while (keys.hasMoreElements ()) {
var key = keys.nextElement ();
var conds = condDict.get (key);
if (conds.size () == 0) continue ;var condArray = conds.toArray ( new Array (0));
var context = condContextDict.get (key);
if (context == null) {
context =  new java.util.Hashtable (2);
condContextDict.put (key, context);
}if (cc.CondClassSet == null) cc.CondClassSet =  new java.util.ArrayList (2);
if (cc.CondClassSet.contains (condArray[0].getClass ())) return false;
cc.CondClassSet.add (condArray[0].getClass ());
try {
if (!condArray[0].isSatisfied (condArray, context)) return false;
} finally {
cc.CondClassSet.remove (condArray[0].getClass ());
}
}
return true;
}, $fz.isPrivate = true, $fz), "java.util.Vector,~A,java.util.Hashtable,java.util.Hashtable,org.eclipse.osgi.framework.internal.core.FrameworkSecurityManager.CheckContext");
Clazz.defineMethod (c$, "checkPermission", 
function (perm) {
this.checkPermission (perm, this.getSecurityContext ());
}, "java.security.Permission");
Clazz.overrideMethod (c$, "getSecurityContext", 
function () {
return java.security.AccessController.getContext ();
});
{
var c;
c = org.eclipse.osgi.framework.internal.core.FrameworkSecurityManager.CheckPermissionAction;
c = org.eclipse.osgi.framework.internal.core.FrameworkSecurityManager.CheckContext;
}});
