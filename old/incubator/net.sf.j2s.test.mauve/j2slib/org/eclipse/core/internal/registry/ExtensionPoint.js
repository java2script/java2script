Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.internal.registry.RegistryObject"], "org.eclipse.core.internal.registry.ExtensionPoint", ["java.io.File", "java.lang.Long", "java.lang.ref.SoftReference", "org.eclipse.core.internal.registry.TableReader", "org.eclipse.core.internal.runtime.CompatibilityHelper"], function () {
c$ = Clazz.decorateAsClass (function () {
this.extraInformation = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "ExtensionPoint", org.eclipse.core.internal.registry.RegistryObject);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.core.internal.registry.ExtensionPoint, []);
});
Clazz.makeConstructor (c$, 
function (self, children, dataOffset) {
Clazz.superConstructor (this, org.eclipse.core.internal.registry.ExtensionPoint, []);
this.setObjectId (self);
this.setRawChildren (children);
this.extraDataOffset = dataOffset;
}, "~N,~A,~N");
Clazz.defineMethod (c$, "getSimpleIdentifier", 
function () {
return this.getUniqueIdentifier ().substring (this.getUniqueIdentifier ().lastIndexOf ('.') + 1);
});
Clazz.defineMethod (c$, "getExtraData", 
($fz = function () {
if (this.extraDataOffset == -1) {
if (this.extraInformation != null) return this.extraInformation;
return  new Array (5);
}var result = null;
if (this.extraInformation == null || (result = ((Clazz.instanceOf (this.extraInformation, java.lang.ref.SoftReference)) ? (this.extraInformation).get () : this.extraInformation)) == null) {
result =  new org.eclipse.core.internal.registry.TableReader ().loadExtensionPointExtraData (this.extraDataOffset);
this.extraInformation =  new java.lang.ref.SoftReference (result);
}return result;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "ensureExtraInformationType", 
($fz = function () {
if (Clazz.instanceOf (this.extraInformation, java.lang.ref.SoftReference)) {
this.extraInformation = (this.extraInformation).get ();
}if (this.extraInformation == null) {
this.extraInformation =  new Array (5);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getSchemaReference", 
function () {
var result = this.getExtraData ();
return result[1] == null ? "" : result[1].$replace (java.io.File.separatorChar, '/');
});
Clazz.defineMethod (c$, "getLabel", 
function () {
var result = this.getExtraData ();
return result[0] == null ? "" : result[0];
});
Clazz.defineMethod (c$, "getUniqueIdentifier", 
function () {
return this.getExtraData ()[2];
});
Clazz.defineMethod (c$, "getNamespace", 
function () {
return this.getExtraData ()[3];
});
Clazz.defineMethod (c$, "getBundleId", 
function () {
return Long.parseLong (this.getExtraData ()[4]);
});
Clazz.defineMethod (c$, "setSchema", 
function (value) {
this.ensureExtraInformationType ();
(this.extraInformation)[1] = value;
}, "~S");
Clazz.defineMethod (c$, "setLabel", 
function (value) {
this.ensureExtraInformationType ();
(this.extraInformation)[0] = value;
}, "~S");
Clazz.defineMethod (c$, "setUniqueIdentifier", 
function (value) {
this.ensureExtraInformationType ();
(this.extraInformation)[2] = value;
}, "~S");
Clazz.defineMethod (c$, "setNamespace", 
function (value) {
this.ensureExtraInformationType ();
(this.extraInformation)[3] = value;
}, "~S");
Clazz.defineMethod (c$, "setBundleId", 
function (id) {
this.ensureExtraInformationType ();
(this.extraInformation)[4] = Long.toString (id);
}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getUniqueIdentifier ();
});
Clazz.defineMethod (c$, "getDeclaringPluginDescriptor", 
function () {
return org.eclipse.core.internal.runtime.CompatibilityHelper.getPluginDescriptor (this.getNamespace ());
});
c$.EMPTY_ARRAY = c$.prototype.EMPTY_ARRAY =  new Array (0);
Clazz.defineStatics (c$,
"LABEL", 0,
"SCHEMA", 1,
"QUALIFIED_NAME", 2,
"NAMESPACE", 3,
"BUNDLEID", 4,
"EXTRA_SIZE", 5);
});
