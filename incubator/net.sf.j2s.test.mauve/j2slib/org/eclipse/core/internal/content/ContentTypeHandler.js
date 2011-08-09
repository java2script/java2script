Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["org.eclipse.core.runtime.content.IContentDescription", "$.IContentType"], "org.eclipse.core.internal.content.ContentTypeHandler", ["java.lang.ref.SoftReference", "org.eclipse.core.internal.content.ContentTypeManager"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.ContentTypeHandler.DummyContentDescription")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content.ContentTypeHandler, "DummyContentDescription", null, org.eclipse.core.runtime.content.IContentDescription);
Clazz.overrideMethod (c$, "getCharset", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getContentType", 
function () {
return this.b$["org.eclipse.core.internal.content.ContentTypeHandler"];
});
Clazz.overrideMethod (c$, "getProperty", 
function (a) {
return null;
}, "org.eclipse.core.runtime.QualifiedName");
Clazz.overrideMethod (c$, "isRequested", 
function (a) {
return false;
}, "org.eclipse.core.runtime.QualifiedName");
Clazz.overrideMethod (c$, "setProperty", 
function (a, b) {
}, "org.eclipse.core.runtime.QualifiedName,~O");
c$ = Clazz.p0p ();
}
this.generation = 0;
this.id = null;
this.targetRef = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "ContentTypeHandler", null, org.eclipse.core.runtime.content.IContentType);
Clazz.makeConstructor (c$, 
function (target, generation) {
this.id = target.getId ();
this.targetRef =  new java.lang.ref.SoftReference (target);
this.generation = generation;
}, "org.eclipse.core.internal.content.ContentType,~N");
Clazz.defineMethod (c$, "addFileSpec", 
function (fileSpec, type) {
var target = this.getTarget ();
if (target != null) target.addFileSpec (fileSpec, type);
}, "~S,~N");
Clazz.overrideMethod (c$, "equals", 
function (another) {
if (Clazz.instanceOf (another, org.eclipse.core.internal.content.ContentType)) return this.id.equals ((another).id);
if (Clazz.instanceOf (another, org.eclipse.core.internal.content.ContentTypeHandler)) return this.id.equals ((another).id);
return false;
}, "~O");
Clazz.overrideMethod (c$, "getBaseType", 
function () {
var target = this.getTarget ();
if (target == null) return null;
var baseType = target.getBaseType ();
return (baseType != null) ?  new org.eclipse.core.internal.content.ContentTypeHandler (baseType, baseType.getCatalog ().getGeneration ()) : null;
});
Clazz.defineMethod (c$, "getDefaultCharset", 
function () {
var target = this.getTarget ();
return (target != null) ? target.getDefaultCharset () : null;
});
Clazz.defineMethod (c$, "getDefaultDescription", 
function () {
var target = this.getTarget ();
return (target != null) ? target.getDefaultDescription () : Clazz.innerTypeInstance (org.eclipse.core.internal.content.ContentTypeHandler.DummyContentDescription, this, null);
});
Clazz.defineMethod (c$, "getDescriptionFor", 
function (contents, options) {
var target = this.getTarget ();
return (target != null) ? target.getDescriptionFor (contents, options) : null;
}, "java.io.InputStream,~A");
Clazz.defineMethod (c$, "getDescriptionFor", 
function (contents, options) {
var target = this.getTarget ();
return (target != null) ? target.getDescriptionFor (contents, options) : null;
}, "java.io.Reader,~A");
Clazz.defineMethod (c$, "getFileSpecs", 
function (type) {
var target = this.getTarget ();
return (target != null) ? target.getFileSpecs (type) :  new Array (0);
}, "~N");
Clazz.overrideMethod (c$, "getId", 
function () {
return this.id;
});
Clazz.defineMethod (c$, "getName", 
function () {
var target = this.getTarget ();
return (target != null) ? target.getName () : this.id;
});
Clazz.overrideMethod (c$, "getSettings", 
function (context) {
var target = this.getTarget ();
if (target == null) return null;
var settings = target.getSettings (context);
return settings === target ? this : settings;
}, "org.eclipse.core.runtime.preferences.IScopeContext");
Clazz.defineMethod (c$, "getTarget", 
function () {
var target = this.targetRef.get ();
var catalog = org.eclipse.core.internal.content.ContentTypeManager.getInstance ().getCatalog ();
if (target == null || catalog.getGeneration () != this.generation) {
target = catalog.getContentType (this.id);
this.targetRef =  new java.lang.ref.SoftReference (target);
this.generation = catalog.getGeneration ();
}return target == null ? null : target.getAliasTarget (true);
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.id.hashCode ();
});
Clazz.defineMethod (c$, "isAssociatedWith", 
function (fileName) {
var target = this.getTarget ();
return (target != null) ? target.isAssociatedWith (fileName) : false;
}, "~S");
Clazz.defineMethod (c$, "isAssociatedWith", 
function (fileName, context) {
var target = this.getTarget ();
return (target != null) ? target.isAssociatedWith (fileName, context) : false;
}, "~S,org.eclipse.core.runtime.preferences.IScopeContext");
Clazz.defineMethod (c$, "isKindOf", 
function (another) {
if (Clazz.instanceOf (another, org.eclipse.core.internal.content.ContentTypeHandler)) another = (another).getTarget ();
var target = this.getTarget ();
return (target != null) ? target.isKindOf (another) : false;
}, "org.eclipse.core.runtime.content.IContentType");
Clazz.defineMethod (c$, "removeFileSpec", 
function (fileSpec, type) {
var target = this.getTarget ();
if (target != null) target.removeFileSpec (fileSpec, type);
}, "~S,~N");
Clazz.defineMethod (c$, "setDefaultCharset", 
function (userCharset) {
var target = this.getTarget ();
if (target != null) target.setDefaultCharset (userCharset);
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.id;
});
});
