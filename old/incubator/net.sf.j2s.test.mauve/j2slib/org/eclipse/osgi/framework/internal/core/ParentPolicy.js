Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.IBuddyPolicy"], "org.eclipse.osgi.framework.internal.core.ParentPolicy", null, function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.core, "ParentPolicy", null, org.eclipse.osgi.framework.internal.core.IBuddyPolicy);
Clazz.overrideMethod (c$, "loadClass", 
function (name) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "loadResource", 
function (name) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "loadResources", 
function (name) {
return null;
}, "~S");
});
