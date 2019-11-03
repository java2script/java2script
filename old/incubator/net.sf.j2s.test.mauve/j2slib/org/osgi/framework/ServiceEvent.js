Clazz.declarePackage ("org.osgi.framework");
Clazz.load (["java.util.EventObject"], "org.osgi.framework.ServiceEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.reference = null;
this.type = 0;
Clazz.instantialize (this, arguments);
}, org.osgi.framework, "ServiceEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (type, reference) {
Clazz.superConstructor (this, org.osgi.framework.ServiceEvent, [reference]);
this.reference = reference;
this.type = type;
}, "~N,org.osgi.framework.ServiceReference");
Clazz.defineMethod (c$, "getServiceReference", 
function () {
return this.reference;
});
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineStatics (c$,
"REGISTERED", 0x00000001,
"MODIFIED", 0x00000002,
"UNREGISTERING", 0x00000004);
});
