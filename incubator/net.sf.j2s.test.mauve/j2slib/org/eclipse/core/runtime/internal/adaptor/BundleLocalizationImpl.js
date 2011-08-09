Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (["org.eclipse.osgi.service.localization.BundleLocalization", "java.util.ArrayList"], "org.eclipse.core.runtime.internal.adaptor.BundleLocalizationImpl", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.encountered = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor, "BundleLocalizationImpl", null, org.eclipse.osgi.service.localization.BundleLocalization);
Clazz.prepareFields (c$, function () {
this.encountered =  new java.util.ArrayList ();
});
Clazz.overrideMethod (c$, "getLocalization", 
function (bundle, locale) {
return ((bundle)).getResourceBundle (locale);
}, "org.osgi.framework.Bundle,~S");
});
