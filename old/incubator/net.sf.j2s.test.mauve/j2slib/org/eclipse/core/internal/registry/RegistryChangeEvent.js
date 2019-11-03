Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.runtime.IRegistryChangeEvent"], "org.eclipse.core.internal.registry.RegistryChangeEvent", ["java.util.Arrays"], function () {
c$ = Clazz.decorateAsClass (function () {
this.filter = null;
this.deltas = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "RegistryChangeEvent", null, org.eclipse.core.runtime.IRegistryChangeEvent);
Clazz.makeConstructor (c$, 
function (deltas, filter) {
this.deltas = deltas;
this.filter = filter;
}, "java.util.Map,~S");
Clazz.defineMethod (c$, "getHostDeltas", 
($fz = function () {
if (this.filter != null) {
var singleDelta = this.getHostDelta (this.filter);
return singleDelta == null ?  new Array (0) : [singleDelta];
}return this.deltas.values ().toArray ( new Array (this.deltas.size ()));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getHostDelta", 
($fz = function (pluginId) {
if (this.filter != null && !pluginId.equals (this.filter)) return null;
return this.deltas.get (pluginId);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getExtensionDeltas", 
function () {
var hostDeltas = this.getHostDeltas ();
if (hostDeltas.length == 0) return  new Array (0);
var extensionDeltasSize = 0;
for (var i = 0; i < hostDeltas.length; i++) extensionDeltasSize += hostDeltas[i].getExtensionDeltasCount ();

var extensionDeltas =  new Array (extensionDeltasSize);
for (var i = 0, offset = 0; i < hostDeltas.length; i++) {
var hostExtDeltas = hostDeltas[i].getExtensionDeltas ();
System.arraycopy (hostExtDeltas, 0, extensionDeltas, offset, hostExtDeltas.length);
offset += hostExtDeltas.length;
}
return extensionDeltas;
});
Clazz.defineMethod (c$, "getExtensionDeltas", 
function (hostName) {
var hostDelta = this.getHostDelta (hostName);
if (hostDelta == null) return  new Array (0);
return hostDelta.getExtensionDeltas ();
}, "~S");
Clazz.defineMethod (c$, "getExtensionDeltas", 
function (hostName, extensionPoint) {
var hostDelta = this.getHostDelta (hostName);
if (hostDelta == null) return  new Array (0);
return hostDelta.getExtensionDeltas (hostName + '.' + extensionPoint);
}, "~S,~S");
Clazz.overrideMethod (c$, "getExtensionDelta", 
function (hostName, extensionPoint, extension) {
var hostDelta = this.getHostDelta (hostName);
if (hostDelta == null) return null;
return hostDelta.getExtensionDelta (hostName + '.' + extensionPoint, extension);
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return "RegistryChangeEvent:  " + java.util.Arrays.asList (this.getHostDeltas ());
});
});
