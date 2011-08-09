Clazz.declarePackage ("org.eclipse.osgi.framework.internal.defaultadaptor");
Clazz.load (["org.eclipse.osgi.framework.adaptor.core.AdaptorElementFactory"], "org.eclipse.osgi.framework.internal.defaultadaptor.DefaultElementFactory", ["org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader", "org.eclipse.osgi.framework.internal.defaultadaptor.DefaultBundleData"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.defaultadaptor, "DefaultElementFactory", null, org.eclipse.osgi.framework.adaptor.core.AdaptorElementFactory);
Clazz.overrideMethod (c$, "createBundleData", 
function (adaptor, id) {
return  new org.eclipse.osgi.framework.internal.defaultadaptor.DefaultBundleData (adaptor, id);
}, "org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor,~N");
Clazz.overrideMethod (c$, "createClassLoader", 
function (delegate, domain, bundleclasspath, data) {
return  new org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader (delegate, domain, bundleclasspath, data.getAdaptor ().getBundleClassLoaderParent (), data);
}, "org.eclipse.osgi.framework.adaptor.ClassLoaderDelegate,org.eclipse.osgi.framework.adaptor.BundleProtectionDomain,~A,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData");
});
