Clazz.declarePackage ("org.eclipse.core.runtime.adaptor");
Clazz.load (["org.eclipse.osgi.framework.adaptor.core.AdaptorElementFactory"], "org.eclipse.core.runtime.adaptor.EclipseElementFactory", ["org.eclipse.core.runtime.adaptor.EclipseBundleData", "$.EclipseClassLoader"], function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.adaptor, "EclipseElementFactory", null, org.eclipse.osgi.framework.adaptor.core.AdaptorElementFactory);
Clazz.overrideMethod (c$, "createBundleData", 
function (adaptor, id) {
return  new org.eclipse.core.runtime.adaptor.EclipseBundleData (adaptor, id);
}, "org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor,~N");
Clazz.overrideMethod (c$, "createClassLoader", 
function (delegate, domain, bundleclasspath, data) {
return  new org.eclipse.core.runtime.adaptor.EclipseClassLoader (delegate, domain, bundleclasspath, data.getAdaptor ().getBundleClassLoaderParent (), data);
}, "org.eclipse.osgi.framework.adaptor.ClassLoaderDelegate,org.eclipse.osgi.framework.adaptor.BundleProtectionDomain,~A,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData");
});
