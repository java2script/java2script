Clazz.declarePackage ("org.osgi.service.condpermadmin");
Clazz.load (null, "org.osgi.service.condpermadmin.BundleSignerCondition", ["java.lang.IllegalArgumentException", "org.osgi.service.condpermadmin.Condition"], function () {
c$ = Clazz.declareType (org.osgi.service.condpermadmin, "BundleSignerCondition");
c$.getCondition = Clazz.defineMethod (c$, "getCondition", 
function (bundle, info) {
if (!"org.osgi.service.condpermadmin.BundleSignerCondition".equals (info.getType ())) throw  new IllegalArgumentException ("ConditionInfo must be of type \"org.osgi.service.condpermadmin.BundleSignerCondition\"");
var args = info.getArgs ();
if (args.length != 1) throw  new IllegalArgumentException ("Illegal number of args: " + args.length);
var ab = bundle;
return ab.getBundleData ().matchDNChain (args[0]) ? org.osgi.service.condpermadmin.Condition.TRUE : org.osgi.service.condpermadmin.Condition.FALSE;
}, "org.osgi.framework.Bundle,org.osgi.service.condpermadmin.ConditionInfo");
Clazz.defineStatics (c$,
"CONDITION_TYPE", "org.osgi.service.condpermadmin.BundleSignerCondition");
});
