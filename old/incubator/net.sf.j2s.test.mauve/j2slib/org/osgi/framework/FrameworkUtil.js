Clazz.declarePackage ("org.osgi.framework");
Clazz.load (null, "org.osgi.framework.FrameworkUtil", ["org.eclipse.osgi.framework.internal.core.FilterImpl"], function () {
c$ = Clazz.declareType (org.osgi.framework, "FrameworkUtil");
c$.createFilter = Clazz.defineMethod (c$, "createFilter", 
function (filter) {
return  new org.eclipse.osgi.framework.internal.core.FilterImpl (filter);
}, "~S");
});
