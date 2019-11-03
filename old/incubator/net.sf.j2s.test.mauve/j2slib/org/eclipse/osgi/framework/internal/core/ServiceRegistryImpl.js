Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.adaptor.ServiceRegistry"], "org.eclipse.osgi.framework.internal.core.ServiceRegistryImpl", ["java.util.ArrayList", "$.HashMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.publishedServicesByClass = null;
this.allPublishedServices = null;
this.publishedServicesByContext = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "ServiceRegistryImpl", null, org.eclipse.osgi.framework.adaptor.ServiceRegistry);
Clazz.defineMethod (c$, "initialize", 
function () {
this.publishedServicesByClass =  new java.util.HashMap (50);
this.publishedServicesByContext =  new java.util.HashMap (50);
this.allPublishedServices =  new java.util.ArrayList (50);
});
Clazz.overrideMethod (c$, "publishService", 
function (context, serviceReg) {
var contextServices = this.publishedServicesByContext.get (context);
if (contextServices == null) {
contextServices =  new java.util.ArrayList (10);
this.publishedServicesByContext.put (context, contextServices);
}contextServices.add (serviceReg);
var clazzes = serviceReg.getReference ().getProperty ("objectClass");
var size = clazzes.length;
for (var i = 0; i < size; i++) {
var clazz = clazzes[i];
var services = this.publishedServicesByClass.get (clazz);
if (services == null) {
services =  new java.util.ArrayList (10);
this.publishedServicesByClass.put (clazz, services);
}services.add (serviceReg);
}
this.allPublishedServices.add (serviceReg);
}, "org.osgi.framework.BundleContext,org.osgi.framework.ServiceRegistration");
Clazz.overrideMethod (c$, "unpublishService", 
function (context, serviceReg) {
var contextServices = this.publishedServicesByContext.get (context);
if (contextServices != null) {
contextServices.remove (serviceReg);
}var clazzes = serviceReg.getReference ().getProperty ("objectClass");
var size = clazzes.length;
for (var i = 0; i < size; i++) {
var clazz = clazzes[i];
var services = this.publishedServicesByClass.get (clazz);
services.remove (serviceReg);
}
this.allPublishedServices.remove (serviceReg);
}, "org.osgi.framework.BundleContext,org.osgi.framework.ServiceRegistration");
Clazz.overrideMethod (c$, "unpublishServices", 
function (context) {
var serviceRegs = this.publishedServicesByContext.get (context);
if (serviceRegs != null) {
this.publishedServicesByContext.remove (context);
var size = serviceRegs.size ();
for (var i = 0; i < size; i++) {
var serviceReg = serviceRegs.get (i);
this.allPublishedServices.remove (serviceReg);
var clazzes = serviceReg.getReference ().getProperty ("objectClass");
var numclazzes = clazzes.length;
for (var j = 0; j < numclazzes; j++) {
var clazz = clazzes[j];
var services = this.publishedServicesByClass.get (clazz);
services.remove (serviceReg);
}
}
}}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "lookupServiceReferences", 
function (clazz, filter) {
var size;
var references;
var serviceRegs;
if (clazz == null) serviceRegs = this.allPublishedServices;
 else serviceRegs = this.publishedServicesByClass.get (clazz);
if (serviceRegs == null) return (null);
size = serviceRegs.size ();
if (size == 0) return (null);
references =  new java.util.ArrayList (size);
for (var i = 0; i < size; i++) {
var registration = serviceRegs.get (i);
var reference = registration.getReference ();
if ((filter == null) || filter.match (reference)) {
references.add (reference);
}}
if (references.size () == 0) {
return null;
}return references.toArray ( new Array (references.size ()));
}, "~S,org.osgi.framework.Filter");
Clazz.defineMethod (c$, "lookupServiceReferences", 
function (context) {
var size;
var references;
var serviceRegs = this.publishedServicesByContext.get (context);
if (serviceRegs == null) {
return (null);
}size = serviceRegs.size ();
if (size == 0) {
return (null);
}references =  new java.util.ArrayList (size);
for (var i = 0; i < size; i++) {
var registration = serviceRegs.get (i);
var reference = registration.getReference ();
references.add (reference);
}
if (references.size () == 0) {
return null;
}return references.toArray ( new Array (references.size ()));
}, "org.osgi.framework.BundleContext");
});
