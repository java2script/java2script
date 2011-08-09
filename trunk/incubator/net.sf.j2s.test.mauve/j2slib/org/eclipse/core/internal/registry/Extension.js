Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.internal.registry.RegistryObject"], "org.eclipse.core.internal.registry.Extension", ["java.lang.ref.SoftReference", "org.eclipse.core.internal.registry.TableReader", "org.eclipse.core.internal.runtime.CompatibilityHelper", "$.Policy", "org.eclipse.core.runtime.Platform"], function () {
c$ = Clazz.decorateAsClass (function () {
this.simpleId = null;
this.namespace = null;
this.extraInformation = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "Extension", org.eclipse.core.internal.registry.RegistryObject);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.core.internal.registry.Extension, []);
});
Clazz.makeConstructor (c$, 
function (self, simpleId, namespace, children, extraData) {
Clazz.superConstructor (this, org.eclipse.core.internal.registry.Extension, []);
this.setObjectId (self);
this.simpleId = simpleId;
this.setRawChildren (children);
this.extraDataOffset = extraData;
this.namespace = namespace;
}, "~N,~S,~S,~A,~N");
Clazz.defineMethod (c$, "getExtensionPointIdentifier", 
function () {
return this.getExtraData ()[1];
});
Clazz.defineMethod (c$, "getSimpleIdentifier", 
function () {
return this.simpleId;
});
Clazz.defineMethod (c$, "getUniqueIdentifier", 
function () {
return this.simpleId == null ? null : this.getNamespace () + '.' + this.simpleId;
});
Clazz.defineMethod (c$, "setExtensionPointIdentifier", 
function (value) {
this.ensureExtraInformationType ();
(this.extraInformation)[1] = value;
}, "~S");
Clazz.defineMethod (c$, "setSimpleIdentifier", 
function (value) {
this.simpleId = value;
}, "~S");
Clazz.defineMethod (c$, "getExtraData", 
($fz = function () {
if (this.extraDataOffset == -1) {
if (this.extraInformation != null) return this.extraInformation;
return null;
}var result = null;
if (this.extraInformation == null || (result = ((Clazz.instanceOf (this.extraInformation, java.lang.ref.SoftReference)) ? (this.extraInformation).get () : this.extraInformation)) == null) {
result =  new org.eclipse.core.internal.registry.TableReader ().loadExtensionExtraData (this.extraDataOffset);
this.extraInformation =  new java.lang.ref.SoftReference (result);
}return result;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getLabel", 
function () {
var s = this.getExtraData ()[0];
if (s == null) return "";
return s;
});
Clazz.defineMethod (c$, "setLabel", 
function (value) {
this.ensureExtraInformationType ();
(this.extraInformation)[0] = value;
}, "~S");
Clazz.defineMethod (c$, "getNamespace", 
function () {
return this.namespace;
});
Clazz.defineMethod (c$, "setNamespace", 
function (value) {
this.namespace = value;
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getUniqueIdentifier () + " -> " + this.getExtensionPointIdentifier ();
});
Clazz.defineMethod (c$, "getDeclaringPluginDescriptor", 
function () {
var result = org.eclipse.core.internal.runtime.CompatibilityHelper.getPluginDescriptor (this.getNamespace ());
if (result == null) {
var underlyingBundle = org.eclipse.core.runtime.Platform.getBundle (this.getNamespace ());
if (underlyingBundle != null) {
var hosts = org.eclipse.core.runtime.Platform.getHosts (underlyingBundle);
if (hosts != null) result = org.eclipse.core.internal.runtime.CompatibilityHelper.getPluginDescriptor (hosts[0].getSymbolicName ());
}}if (org.eclipse.core.internal.runtime.CompatibilityHelper.DEBUG && result == null) org.eclipse.core.internal.runtime.Policy.debug ("Could not obtain plug-in descriptor for bundle " + this.getNamespace ());
return result;
});
Clazz.defineMethod (c$, "ensureExtraInformationType", 
($fz = function () {
if (Clazz.instanceOf (this.extraInformation, java.lang.ref.SoftReference)) {
this.extraInformation = (this.extraInformation).get ();
}if (this.extraInformation == null) {
this.extraInformation =  new Array (2);
}}, $fz.isPrivate = true, $fz));
c$.EMPTY_ARRAY = c$.prototype.EMPTY_ARRAY =  new Array (0);
Clazz.defineStatics (c$,
"LABEL", 0,
"XPT_NAME", 1,
"EXTRA_SIZE", 2);
});
