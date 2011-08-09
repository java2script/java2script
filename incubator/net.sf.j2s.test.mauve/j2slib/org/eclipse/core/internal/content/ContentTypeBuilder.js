Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (null, "org.eclipse.core.internal.content.ContentTypeBuilder", ["java.util.Collections", "$.HashMap", "org.eclipse.core.internal.content.ContentType", "$.ContentTypeManager", "$.Util", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.CoreException", "$.QualifiedName", "$.Status", "org.eclipse.core.runtime.content.IContentDescription", "org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.catalog = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "ContentTypeBuilder");
c$.getUniqueId = Clazz.defineMethod (c$, "getUniqueId", 
($fz = function (namespace, baseTypeId) {
if (baseTypeId == null) return null;
var separatorPosition = baseTypeId.lastIndexOf ('.');
if (separatorPosition == -1) baseTypeId = namespace + '.' + baseTypeId;
return baseTypeId;
}, $fz.isPrivate = true, $fz), "~S,~S");
c$.parseQualifiedName = Clazz.defineMethod (c$, "parseQualifiedName", 
($fz = function (namespace, value) {
if (value == null) return null;
var separatorPosition = value.lastIndexOf ('.');
if (separatorPosition == -1) return  new org.eclipse.core.runtime.QualifiedName (namespace, value);
if (separatorPosition == 0 || separatorPosition == value.length - 1) return null;
namespace = value.substring (0, separatorPosition);
var simpleValue = value.substring (separatorPosition + 1);
return  new org.eclipse.core.runtime.QualifiedName (namespace, simpleValue);
}, $fz.isPrivate = true, $fz), "~S,~S");
c$.parsePriority = Clazz.defineMethod (c$, "parsePriority", 
($fz = function (priority) {
if (priority == null) return 0;
if (priority.equals ("high")) return 1;
if (priority.equals ("low")) return -1;
if (!priority.equals ("normal")) return 0;
return 0;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.makeConstructor (c$, 
function (catalog) {
this.catalog = catalog;
}, "org.eclipse.core.internal.content.ContentTypeCatalog");
Clazz.defineMethod (c$, "addFileAssociation", 
($fz = function (fileAssociationElement, target) {
var fileNames = org.eclipse.core.internal.content.Util.parseItems (fileAssociationElement.getAttributeAsIs ("file-names"));
for (var i = 0; i < fileNames.length; i++) target.internalAddFileSpec (fileNames[i], 5);

var fileExtensions = org.eclipse.core.internal.content.Util.parseItems (fileAssociationElement.getAttributeAsIs ("file-extensions"));
for (var i = 0; i < fileExtensions.length; i++) target.internalAddFileSpec (fileExtensions[i], 9);

}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IConfigurationElement,org.eclipse.core.internal.content.ContentType");
Clazz.defineMethod (c$, "buildCatalog", 
function () {
var allContentTypeCEs = this.getConfigurationElements ();
for (var i = 0; i < allContentTypeCEs.length; i++) if (allContentTypeCEs[i].getName ().equals ("content-type")) this.registerContentType (allContentTypeCEs[i]);

for (var i = 0; i < allContentTypeCEs.length; i++) if (allContentTypeCEs[i].getName ().equals ("file-association")) this.registerFileAssociation (allContentTypeCEs[i]);

this.applyPreferences ();
});
Clazz.defineMethod (c$, "applyPreferences", 
($fz = function () {
try {
var localCatalog = this.catalog;
var root = localCatalog.getManager ().getPreferences ();
root.accept ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.ContentTypeBuilder$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.content, "ContentTypeBuilder$1", null, org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor);
Clazz.overrideMethod (c$, "visit", 
function (node) {
if (node === this.f$.root) return true;
var contentType = this.f$.localCatalog.internalGetContentType (node.name ());
if (contentType != null) contentType.processPreferences (node);
return false;
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.content.ContentTypeBuilder$1, i$, v$);
}) (this, Clazz.cloneFinals ("root", root, "localCatalog", localCatalog)));
} catch (bse) {
if (Clazz.instanceOf (bse, org.osgi.service.prefs.BackingStoreException)) {
org.eclipse.core.internal.content.ContentType.log (org.eclipse.core.internal.runtime.Messages.content_errorLoadingSettings, bse);
} else {
throw bse;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createContentType", 
($fz = function (contentTypeCE) {
var namespace = contentTypeCE.getNamespace ();
var simpleId = contentTypeCE.getAttributeAsIs ("id");
var name = contentTypeCE.getAttribute ("name");
var uniqueId = namespace + '.' + simpleId;
if (simpleId == null) this.missingMandatoryAttribute (org.eclipse.core.internal.runtime.Messages.content_missingIdentifier, uniqueId);
if (name == null) this.missingMandatoryAttribute (org.eclipse.core.internal.runtime.Messages.content_missingName, uniqueId);
var priority = org.eclipse.core.internal.content.ContentTypeBuilder.parsePriority (contentTypeCE.getAttributeAsIs ("priority"));
var fileNames = org.eclipse.core.internal.content.Util.parseItems (contentTypeCE.getAttributeAsIs ("file-names"));
var fileExtensions = org.eclipse.core.internal.content.Util.parseItems (contentTypeCE.getAttributeAsIs ("file-extensions"));
var baseTypeId = org.eclipse.core.internal.content.ContentTypeBuilder.getUniqueId (namespace, contentTypeCE.getAttributeAsIs ("base-type"));
var aliasTargetTypeId = org.eclipse.core.internal.content.ContentTypeBuilder.getUniqueId (namespace, contentTypeCE.getAttributeAsIs ("alias-for"));
var propertyCEs = null;
var defaultProperties = null;
if ((propertyCEs = contentTypeCE.getChildren ("property")).length > 0) {
defaultProperties =  new java.util.HashMap ();
for (var i = 0; i < propertyCEs.length; i++) {
var defaultValue = propertyCEs[i].getAttributeAsIs ("default");
if (defaultValue == null) defaultValue = "";
var propertyKey = propertyCEs[i].getAttributeAsIs ("name");
var qualifiedKey = org.eclipse.core.internal.content.ContentTypeBuilder.parseQualifiedName (namespace, propertyKey);
if (qualifiedKey == null) {
if (org.eclipse.core.internal.content.ContentTypeManager.DEBUGGING) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.content_invalidProperty, propertyKey, org.eclipse.core.internal.content.ContentTypeBuilder.getUniqueId (namespace, simpleId));
org.eclipse.core.internal.content.ContentType.log (message, null);
}continue ;}defaultProperties.put (qualifiedKey, defaultValue);
}
}var defaultCharset = contentTypeCE.getAttributeAsIs ("default-charset");
if (defaultCharset != null) if (defaultProperties == null) defaultProperties = java.util.Collections.singletonMap (org.eclipse.core.runtime.content.IContentDescription.CHARSET, defaultCharset);
 else if (!defaultProperties.containsKey (org.eclipse.core.runtime.content.IContentDescription.CHARSET)) defaultProperties.put (org.eclipse.core.runtime.content.IContentDescription.CHARSET, defaultCharset);
return org.eclipse.core.internal.content.ContentType.createContentType (this.catalog, uniqueId, name, priority, fileExtensions, fileNames, baseTypeId, aliasTargetTypeId, defaultProperties, contentTypeCE);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IConfigurationElement");
Clazz.defineMethod (c$, "getConfigurationElements", 
function () {
var registry = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getRegistry ();
var contentTypesXP = registry.getExtensionPoint ("org.eclipse.core.runtime", "contentTypes");
var allContentTypeCEs = contentTypesXP.getConfigurationElements ();
return allContentTypeCEs;
});
Clazz.defineMethod (c$, "missingMandatoryAttribute", 
($fz = function (messageKey, argument) {
var message = org.eclipse.osgi.util.NLS.bind (messageKey, argument);
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, null));
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "registerContentType", 
($fz = function (contentTypeCE) {
try {
var contentType = this.createContentType (contentTypeCE);
this.catalog.addContentType (contentType);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (e.getStatus ());
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IConfigurationElement");
Clazz.defineMethod (c$, "registerFileAssociation", 
($fz = function (fileAssociationElement) {
var contentTypeId = org.eclipse.core.internal.content.ContentTypeBuilder.getUniqueId (fileAssociationElement.getNamespace (), fileAssociationElement.getAttribute ("content-type"));
var target = this.catalog.internalGetContentType (contentTypeId);
if (target == null) return ;
this.addFileAssociation (fileAssociationElement, target);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IConfigurationElement");
Clazz.defineStatics (c$,
"PT_CONTENTTYPES", "contentTypes");
});
