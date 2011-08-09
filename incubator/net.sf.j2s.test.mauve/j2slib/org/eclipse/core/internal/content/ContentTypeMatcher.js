Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["org.eclipse.core.runtime.content.IContentTypeMatcher"], "org.eclipse.core.internal.content.ContentTypeMatcher", ["java.util.Collections", "$.HashSet", "org.eclipse.core.internal.content.ContentType", "$.ContentTypeHandler", "$.ContentTypeSettings", "$.DefaultDescription", "org.eclipse.core.internal.runtime.Messages", "org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor"], function () {
c$ = Clazz.decorateAsClass (function () {
this.context = null;
this.policy = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "ContentTypeMatcher", null, org.eclipse.core.runtime.content.IContentTypeMatcher);
Clazz.makeConstructor (c$, 
function (policy, context) {
this.policy = policy;
this.context = context;
}, "org.eclipse.core.runtime.content.IContentTypeManager.ISelectionPolicy,org.eclipse.core.runtime.preferences.IScopeContext");
Clazz.defineMethod (c$, "findContentTypeFor", 
function (contents, fileName) {
var currentCatalog = this.getCatalog ();
var all = currentCatalog.findContentTypesFor (this, contents, fileName);
return all.length > 0 ?  new org.eclipse.core.internal.content.ContentTypeHandler (all[0], currentCatalog.getGeneration ()) : null;
}, "java.io.InputStream,~S");
Clazz.defineMethod (c$, "findContentTypeFor", 
function (fileName) {
var currentCatalog = this.getCatalog ();
var associated = currentCatalog.findContentTypesFor (this, fileName);
return associated.length == 0 ? null :  new org.eclipse.core.internal.content.ContentTypeHandler (associated[0], currentCatalog.getGeneration ());
}, "~S");
Clazz.defineMethod (c$, "findContentTypesFor", 
function (contents, fileName) {
var currentCatalog = this.getCatalog ();
var types = currentCatalog.findContentTypesFor (this, contents, fileName);
var result =  new Array (types.length);
var generation = currentCatalog.getGeneration ();
for (var i = 0; i < result.length; i++) result[i] =  new org.eclipse.core.internal.content.ContentTypeHandler (types[i], generation);

return result;
}, "java.io.InputStream,~S");
Clazz.defineMethod (c$, "findContentTypesFor", 
function (fileName) {
var currentCatalog = this.getCatalog ();
var types = currentCatalog.findContentTypesFor (this, fileName);
var result =  new Array (types.length);
var generation = currentCatalog.getGeneration ();
for (var i = 0; i < result.length; i++) result[i] =  new org.eclipse.core.internal.content.ContentTypeHandler (types[i], generation);

return result;
}, "~S");
Clazz.defineMethod (c$, "getCatalog", 
($fz = function () {
return org.eclipse.core.internal.content.ContentTypeManager.getInstance ().getCatalog ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getDescriptionFor", 
function (contents, fileName, options) {
return this.getCatalog ().getDescriptionFor (this, contents, fileName, options);
}, "java.io.InputStream,~S,~A");
Clazz.defineMethod (c$, "getDescriptionFor", 
function (contents, fileName, options) {
return this.getCatalog ().getDescriptionFor (this, contents, fileName, options);
}, "java.io.Reader,~S,~A");
Clazz.defineMethod (c$, "getContext", 
function () {
return this.context;
});
Clazz.defineMethod (c$, "getPolicy", 
function () {
return this.policy;
});
Clazz.defineMethod (c$, "getDirectlyAssociated", 
function (catalog, fileSpec, typeMask) {
var root = this.context.getNode ("org.eclipse.core.runtime/content-types");
var result =  new java.util.HashSet (3);
try {
root.accept ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.ContentTypeMatcher$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.content, "ContentTypeMatcher$1", null, org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor);
Clazz.overrideMethod (c$, "visit", 
function (node) {
if (node === this.f$.root) return true;
var fileSpecs = org.eclipse.core.internal.content.ContentTypeSettings.getFileSpecs (node, this.f$.typeMask);
for (var i = 0; i < fileSpecs.length; i++) if (fileSpecs[i].equalsIgnoreCase (this.f$.fileSpec)) {
var associated = this.f$.catalog.getContentType (node.name ());
if (associated != null) this.f$.result.add (associated);
break;
}
return false;
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.content.ContentTypeMatcher$1, i$, v$);
}) (this, Clazz.cloneFinals ("root", root, "typeMask", typeMask, "fileSpec", fileSpec, "catalog", catalog, "result", result)));
} catch (bse) {
if (Clazz.instanceOf (bse, org.osgi.service.prefs.BackingStoreException)) {
org.eclipse.core.internal.content.ContentType.log (org.eclipse.core.internal.runtime.Messages.content_errorLoadingSettings, bse);
} else {
throw bse;
}
}
return result == null ? java.util.Collections.EMPTY_SET : result;
}, "org.eclipse.core.internal.content.ContentTypeCatalog,~S,~N");
Clazz.defineMethod (c$, "getSpecificDescription", 
function (description) {
if (description == null || org.eclipse.core.internal.content.ContentTypeManager.getInstance ().getContext ().equals (this.getContext ())) return description;
if (Clazz.instanceOf (description, org.eclipse.core.internal.content.DefaultDescription)) return  new org.eclipse.core.internal.content.DefaultDescription ( new org.eclipse.core.internal.content.ContentTypeSettings (description.getContentTypeInfo (), this.context));
(description).setContentTypeInfo ( new org.eclipse.core.internal.content.ContentTypeSettings (description.getContentTypeInfo (), this.context));
return description;
}, "org.eclipse.core.internal.content.BasicDescription");
});
