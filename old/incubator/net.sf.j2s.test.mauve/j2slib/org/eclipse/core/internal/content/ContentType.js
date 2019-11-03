Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["org.eclipse.core.internal.content.IContentTypeInfo", "org.eclipse.core.runtime.content.IContentDescriber", "$.IContentType", "$.ITextContentDescriber"], "org.eclipse.core.internal.content.ContentType", ["java.lang.IllegalArgumentException", "$.UnsupportedOperationException", "java.util.ArrayList", "org.eclipse.core.internal.content.ContentDescription", "$.ContentTypeManager", "$.ContentTypeSettings", "$.DefaultDescription", "$.FileSpec", "$.Util", "org.eclipse.core.internal.runtime.Assert", "$.InternalPlatform", "$.Messages", "$.Policy", "org.eclipse.core.runtime.CoreException", "$.Status", "org.eclipse.core.runtime.content.IContentDescription", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.ContentType.InvalidDescriber")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content.ContentType, "InvalidDescriber", null, [org.eclipse.core.runtime.content.IContentDescriber, org.eclipse.core.runtime.content.ITextContentDescriber]);
Clazz.defineMethod (c$, "describe", 
function (a, b) {
return 0;
}, "java.io.InputStream,org.eclipse.core.runtime.content.IContentDescription");
Clazz.defineMethod (c$, "describe", 
function (a, b) {
return 0;
}, "java.io.Reader,org.eclipse.core.runtime.content.IContentDescription");
Clazz.overrideMethod (c$, "getSupportedOptions", 
function () {
return  new Array (0);
});
c$ = Clazz.p0p ();
}
this.aliasTargetId = null;
this.baseTypeId = null;
this.builtInAssociations = false;
this.catalog = null;
this.contentTypeElement = null;
this.defaultDescription = null;
this.defaultProperties = null;
this.describer = null;
this.fileSpecs = null;
this.id = null;
this.manager = null;
this.name = null;
this.priority = 0;
this.target = null;
this.userCharset = null;
this.validation = 0;
this.baseType = null;
this.depth = -1;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "ContentType", null, [org.eclipse.core.runtime.content.IContentType, org.eclipse.core.internal.content.IContentTypeInfo]);
c$.createContentType = Clazz.defineMethod (c$, "createContentType", 
function (catalog, uniqueId, name, priority, fileExtensions, fileNames, baseTypeId, aliasTargetId, defaultProperties, contentTypeElement) {
var contentType =  new org.eclipse.core.internal.content.ContentType (catalog.getManager ());
contentType.catalog = catalog;
contentType.defaultDescription =  new org.eclipse.core.internal.content.DefaultDescription (contentType);
contentType.id = uniqueId;
contentType.name = name;
contentType.priority = priority;
if ((fileExtensions != null && fileExtensions.length > 0) || (fileNames != null && fileNames.length > 0)) {
contentType.builtInAssociations = true;
contentType.fileSpecs =  new java.util.ArrayList (fileExtensions.length + fileNames.length);
for (var i = 0; i < fileNames.length; i++) contentType.internalAddFileSpec (fileNames[i], 5);

for (var i = 0; i < fileExtensions.length; i++) contentType.internalAddFileSpec (fileExtensions[i], 9);

}contentType.defaultProperties = defaultProperties;
contentType.contentTypeElement = contentTypeElement;
contentType.baseTypeId = baseTypeId;
contentType.aliasTargetId = aliasTargetId;
return contentType;
}, "org.eclipse.core.internal.content.ContentTypeCatalog,~S,~S,~N,~A,~A,~S,~S,java.util.Map,org.eclipse.core.runtime.IConfigurationElement");
c$.createFileSpec = Clazz.defineMethod (c$, "createFileSpec", 
function (fileSpec, type) {
return  new org.eclipse.core.internal.content.FileSpec (fileSpec, type);
}, "~S,~N");
c$.getPreferenceKey = Clazz.defineMethod (c$, "getPreferenceKey", 
function (flags) {
if ((flags & 8) != 0) return "file-extensions";
if ((flags & 4) != 0) return "file-names";
throw  new IllegalArgumentException ("Unknown type: " + flags);
}, "~N");
c$.getValidationString = Clazz.defineMethod (c$, "getValidationString", 
($fz = function (validation) {
return validation == 1 ? "VALID" : (validation == 2 ? "INVALID" : "UNKNOWN");
}, $fz.isPrivate = true, $fz), "~N");
c$.log = Clazz.defineMethod (c$, "log", 
function (message, reason) {
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, Clazz.instanceOf (reason, org.eclipse.core.runtime.CoreException) ? null : reason);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (status);
}, "~S,Throwable");
Clazz.makeConstructor (c$, 
function (manager) {
this.manager = manager;
}, "org.eclipse.core.internal.content.ContentTypeManager");
Clazz.overrideMethod (c$, "addFileSpec", 
function (fileSpec, type) {
org.eclipse.core.internal.runtime.Assert.isLegal (type == 8 || type == 4, "Unknown type: " + type);
var userSet;
{
if (!this.internalAddFileSpec (fileSpec, type | 2)) return ;
userSet = this.getFileSpecs (type | 1);
}var contentTypeNode = this.manager.getPreferences ().node (this.id);
var newValue = org.eclipse.core.internal.content.Util.toListString (userSet);
org.eclipse.core.internal.runtime.Assert.isNotNull (newValue);
org.eclipse.core.internal.content.ContentType.setPreference (contentTypeNode, org.eclipse.core.internal.content.ContentType.getPreferenceKey (type), newValue);
try {
contentTypeNode.flush ();
} catch (bse) {
if (Clazz.instanceOf (bse, org.osgi.service.prefs.BackingStoreException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.content_errorSavingSettings, this.id);
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, bse);
throw  new org.eclipse.core.runtime.CoreException (status);
} else {
throw bse;
}
}
this.manager.fireContentTypeChangeEvent (this);
}, "~S,~N");
Clazz.defineMethod (c$, "describe", 
function (selectedDescriber, contents, description) {
var isText = contents.isText ();
if (isText && !(Clazz.instanceOf (selectedDescriber, org.eclipse.core.runtime.content.ITextContentDescriber))) throw  new UnsupportedOperationException ();
try {
return isText ? (selectedDescriber).describe (contents, description) : selectedDescriber.describe (contents, description);
} catch (e$$) {
if (Clazz.instanceOf (e$$, RuntimeException)) {
var re = e$$;
{
this.invalidateDescriber (re);
}
} else if (Clazz.instanceOf (e$$, Error)) {
var e = e$$;
{
this.invalidateDescriber (e);
throw e;
}
} else if (Clazz.instanceOf (e$$, org.eclipse.core.internal.content.LowLevelIOException)) {
var llioe = e$$;
{
throw llioe.getActualException ();
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var ioe = e$$;
{
if (org.eclipse.core.internal.content.ContentTypeManager.DEBUGGING) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.content_errorReadingContents, this.id);
org.eclipse.core.internal.content.ContentType.log (message, ioe);
}return 1;
}
} else {
throw e$$;
}
} finally {
contents.rewind ();
}
return 0;
}, "org.eclipse.core.runtime.content.IContentDescriber,org.eclipse.core.internal.content.ILazySource,org.eclipse.core.internal.content.ContentDescription");
Clazz.defineMethod (c$, "equals", 
function (another) {
if (Clazz.instanceOf (another, org.eclipse.core.internal.content.ContentType)) return this.id.equals ((another).id);
if (Clazz.instanceOf (another, org.eclipse.core.internal.content.ContentTypeHandler)) return this.id.equals ((another).id);
return false;
}, "~O");
Clazz.defineMethod (c$, "getAliasTargetId", 
function () {
return this.aliasTargetId;
});
Clazz.overrideMethod (c$, "getBaseType", 
function () {
return this.baseType;
});
Clazz.defineMethod (c$, "getBaseTypeId", 
function () {
return this.baseTypeId;
});
Clazz.defineMethod (c$, "getCatalog", 
function () {
return this.catalog;
});
Clazz.overrideMethod (c$, "getContentType", 
function () {
return this;
});
Clazz.overrideMethod (c$, "getDefaultCharset", 
function () {
return this.getDefaultProperty (org.eclipse.core.runtime.content.IContentDescription.CHARSET);
});
Clazz.overrideMethod (c$, "getDefaultDescription", 
function () {
return this.defaultDescription;
});
Clazz.overrideMethod (c$, "getDefaultProperty", 
function (key) {
var propertyValue = this.internalGetDefaultProperty (key);
if ("".equals (propertyValue)) return null;
return propertyValue;
}, "org.eclipse.core.runtime.QualifiedName");
Clazz.defineMethod (c$, "getDepth", 
function () {
var tmpDepth = this.depth;
if (tmpDepth >= 0) return tmpDepth;
if (this.baseType == null) return this.depth = 0;
return this.depth = (this.baseType == null ? 0 : (1 + this.baseType.getDepth ()));
});
Clazz.defineMethod (c$, "getDescriber", 
function () {
try {
var tmpDescriber = this.describer;
if (tmpDescriber != null) {
if (org.eclipse.core.internal.content.ContentType.INHERITED_DESCRIBER === tmpDescriber) return this.baseType.getDescriber ();
return (org.eclipse.core.internal.content.ContentType.NO_DESCRIBER === tmpDescriber) ? null : tmpDescriber;
}var describerValue = this.contentTypeElement.getAttributeAsIs ("describer");
if (describerValue != null || this.contentTypeElement.getChildren ("describer").length > 0) try {
if ("".equals (describerValue)) {
this.describer = org.eclipse.core.internal.content.ContentType.NO_DESCRIBER;
return null;
}this.describer = tmpDescriber = this.contentTypeElement.createExecutableExtension ("describer");
return tmpDescriber;
} catch (ce) {
if (Clazz.instanceOf (ce, org.eclipse.core.runtime.CoreException)) {
return this.invalidateDescriber (ce);
} else {
throw ce;
}
}
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.InvalidRegistryObjectException)) {
this.manager.invalidate ();
return null;
} else {
throw e;
}
}
if (this.baseType == null) {
this.describer = org.eclipse.core.internal.content.ContentType.NO_DESCRIBER;
return null;
}this.describer = org.eclipse.core.internal.content.ContentType.INHERITED_DESCRIBER;
return this.baseType.getDescriber ();
});
Clazz.defineMethod (c$, "getDescriptionFor", 
function (contents, options) {
return this.internalGetDescriptionFor (org.eclipse.core.internal.content.ContentTypeManager.readBuffer (contents), options);
}, "java.io.InputStream,~A");
Clazz.defineMethod (c$, "getDescriptionFor", 
function (contents, options) {
return this.internalGetDescriptionFor (org.eclipse.core.internal.content.ContentTypeManager.readBuffer (contents), options);
}, "java.io.Reader,~A");
Clazz.overrideMethod (c$, "getFileSpecs", 
function (typeMask) {
if (this.fileSpecs == null) return  new Array (0);
typeMask ^= (3);
var result =  new java.util.ArrayList (this.fileSpecs.size ());
for (var i = this.fileSpecs.iterator (); i.hasNext (); ) {
var spec = i.next ();
if ((spec.getType () & typeMask) == spec.getType ()) result.add (spec.getText ());
}
return result.toArray ( new Array (result.size ()));
}, "~N");
Clazz.overrideMethod (c$, "getId", 
function () {
return this.id;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getPriority", 
function () {
return this.priority;
});
Clazz.overrideMethod (c$, "getSettings", 
function (context) {
if (context == null || context.equals (this.manager.getContext ())) return this;
return  new org.eclipse.core.internal.content.ContentTypeSettings (this, context);
}, "org.eclipse.core.runtime.preferences.IScopeContext");
Clazz.defineMethod (c$, "getAliasTarget", 
function (self) {
return (self && this.target == null) ? this : this.target;
}, "~B");
Clazz.defineMethod (c$, "getValidation", 
function () {
return this.validation;
});
Clazz.defineMethod (c$, "hasBuiltInAssociations", 
function () {
return this.builtInAssociations;
});
Clazz.defineMethod (c$, "hasFileSpec", 
function (context, text, typeMask) {
if (context.equals (this.manager.getContext ()) || (typeMask & 2) != 0) return this.hasFileSpec (text, typeMask, false);
var fileSpecs = org.eclipse.core.internal.content.ContentTypeSettings.getFileSpecs (context, this.id, typeMask);
for (var i = 0; i < fileSpecs.length; i++) if (text.equalsIgnoreCase (fileSpecs[i])) return true;

return this.hasFileSpec (text, typeMask | 1, false);
}, "org.eclipse.core.runtime.preferences.IScopeContext,~S,~N");
Clazz.defineMethod (c$, "hasFileSpec", 
function (text, typeMask, strict) {
if (this.fileSpecs == null) return false;
for (var i = this.fileSpecs.iterator (); i.hasNext (); ) {
var spec = i.next ();
if (spec.equals (text, typeMask, strict)) return true;
}
return false;
}, "~S,~N,~B");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.id.hashCode ();
});
Clazz.defineMethod (c$, "internalAddFileSpec", 
function (fileSpec, typeMask) {
if (this.hasFileSpec (fileSpec, typeMask, false)) return false;
if (this.fileSpecs == null) this.fileSpecs =  new java.util.ArrayList (3);
var newFileSpec = org.eclipse.core.internal.content.ContentType.createFileSpec (fileSpec, typeMask);
this.fileSpecs.add (newFileSpec);
if ((typeMask & 2) != 0) this.catalog.associate (this, newFileSpec.getText (), newFileSpec.getType ());
return true;
}, "~S,~N");
Clazz.defineMethod (c$, "internalGetDefaultProperty", 
function (key) {
if (this.userCharset != null && key.equals (org.eclipse.core.runtime.content.IContentDescription.CHARSET)) return this.userCharset;
var defaultValue = this.basicGetDefaultProperty (key);
if (defaultValue != null) return defaultValue;
return this.baseType == null ? null : this.baseType.internalGetDefaultProperty (key);
}, "org.eclipse.core.runtime.QualifiedName");
Clazz.defineMethod (c$, "basicGetDefaultProperty", 
function (key) {
return this.defaultProperties == null ? null : this.defaultProperties.get (key);
}, "org.eclipse.core.runtime.QualifiedName");
Clazz.defineMethod (c$, "internalGetDescriptionFor", 
function (buffer, options) {
if (buffer == null) return this.defaultDescription;
var tmpDescriber = this.getDescriber ();
if (tmpDescriber == null) return this.defaultDescription;
var description =  new org.eclipse.core.internal.content.ContentDescription (options, this);
if (this.describe (tmpDescriber, buffer, description) == 0) return null;
if (!description.isSet ()) return this.defaultDescription;
description.markImmutable ();
return description;
}, "org.eclipse.core.internal.content.ILazySource,~A");
Clazz.defineMethod (c$, "internalIsAssociatedWith", 
function (fileName) {
if (this.hasFileSpec (fileName, 4, false)) return 1;
var fileExtension = org.eclipse.core.internal.content.ContentTypeManager.getFileExtension (fileName);
if (this.hasFileSpec (fileExtension, 8, false)) return 2;
if (!this.hasBuiltInAssociations () && this.baseType != null) return this.baseType.internalIsAssociatedWith (fileName);
return 0;
}, "~S");
Clazz.defineMethod (c$, "internalRemoveFileSpec", 
function (fileSpec, typeMask) {
if (this.fileSpecs == null) return false;
for (var i = this.fileSpecs.iterator (); i.hasNext (); ) {
var spec = i.next ();
if ((spec.getType () == typeMask) && fileSpec.equals (spec.getText ())) {
i.remove ();
this.catalog.dissociate (this, spec.getText (), spec.getType ());
return true;
}}
return false;
}, "~S,~N");
Clazz.defineMethod (c$, "invalidateDescriber", 
($fz = function (reason) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.content_invalidContentDescriber, this.id);
org.eclipse.core.internal.content.ContentType.log (message, reason);
return (this.describer = Clazz.innerTypeInstance (org.eclipse.core.internal.content.ContentType.InvalidDescriber, this, null));
}, $fz.isPrivate = true, $fz), "Throwable");
Clazz.defineMethod (c$, "isAlias", 
function () {
return this.target != null;
});
Clazz.defineMethod (c$, "isAssociatedWith", 
function (fileName) {
return this.internalIsAssociatedWith (fileName) != 0;
}, "~S");
Clazz.defineMethod (c$, "isAssociatedWith", 
function (fileName, context) {
return this.isAssociatedWith (fileName);
}, "~S,org.eclipse.core.runtime.preferences.IScopeContext");
Clazz.overrideMethod (c$, "isKindOf", 
function (another) {
if (another == null) return false;
if (this === another) return true;
return this.baseType != null && this.baseType.isKindOf (another);
}, "org.eclipse.core.runtime.content.IContentType");
Clazz.defineMethod (c$, "isValid", 
function () {
return this.validation == 1;
});
Clazz.defineMethod (c$, "processPreferences", 
function (contentTypeNode) {
this.userCharset = contentTypeNode.get ("charset", null);
var userSetFileNames = contentTypeNode.get ("file-names", null);
var fileNames = org.eclipse.core.internal.content.Util.parseItems (userSetFileNames);
for (var i = 0; i < fileNames.length; i++) this.internalAddFileSpec (fileNames[i], 6);

var userSetFileExtensions = contentTypeNode.get ("file-extensions", null);
var fileExtensions = org.eclipse.core.internal.content.Util.parseItems (userSetFileExtensions);
for (var i = 0; i < fileExtensions.length; i++) this.internalAddFileSpec (fileExtensions[i], 10);

}, "org.osgi.service.prefs.Preferences");
Clazz.overrideMethod (c$, "removeFileSpec", 
function (fileSpec, type) {
org.eclipse.core.internal.runtime.Assert.isLegal (type == 8 || type == 4, "Unknown type: " + type);
{
if (!this.internalRemoveFileSpec (fileSpec, type | 2)) return ;
}var contentTypeNode = this.manager.getPreferences ().node (this.id);
var userSet = this.getFileSpecs (type | 1);
var preferenceKey = org.eclipse.core.internal.content.ContentType.getPreferenceKey (type);
var newValue = org.eclipse.core.internal.content.Util.toListString (userSet);
org.eclipse.core.internal.content.ContentType.setPreference (contentTypeNode, preferenceKey, newValue);
try {
contentTypeNode.flush ();
} catch (bse) {
if (Clazz.instanceOf (bse, org.osgi.service.prefs.BackingStoreException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.content_errorSavingSettings, this.id);
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, bse);
throw  new org.eclipse.core.runtime.CoreException (status);
} else {
throw bse;
}
}
this.manager.fireContentTypeChangeEvent (this);
}, "~S,~N");
Clazz.defineMethod (c$, "setAliasTarget", 
function (newTarget) {
this.target = newTarget;
}, "org.eclipse.core.internal.content.ContentType");
Clazz.overrideMethod (c$, "setDefaultCharset", 
function (newCharset) {
{
if (this.userCharset == null) {
if (newCharset == null) return ;
} else if (this.userCharset.equals (newCharset)) return ;
this.userCharset = newCharset;
}var contentTypeNode = this.manager.getPreferences ().node (this.id);
org.eclipse.core.internal.content.ContentType.setPreference (contentTypeNode, "charset", this.userCharset);
try {
contentTypeNode.flush ();
} catch (bse) {
if (Clazz.instanceOf (bse, org.osgi.service.prefs.BackingStoreException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.content_errorSavingSettings, this.id);
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, bse);
throw  new org.eclipse.core.runtime.CoreException (status);
} else {
throw bse;
}
}
this.manager.fireContentTypeChangeEvent (this);
}, "~S");
c$.setPreference = Clazz.defineMethod (c$, "setPreference", 
function (node, key, value) {
if (value == null) node.remove (key);
 else node.put (key, value);
}, "org.osgi.service.prefs.Preferences,~S,~S");
Clazz.defineMethod (c$, "setValidation", 
function (validation) {
this.validation = validation;
if (org.eclipse.core.internal.content.ContentTypeManager.DEBUGGING) org.eclipse.core.internal.runtime.Policy.debug ("Validating " + this + ": " + org.eclipse.core.internal.content.ContentType.getValidationString (validation));
}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.id;
});
Clazz.defineMethod (c$, "setBaseType", 
function (baseType) {
this.baseType = baseType;
}, "org.eclipse.core.internal.content.ContentType");
Clazz.defineStatics (c$,
"ASSOCIATED_BY_EXTENSION", 2,
"ASSOCIATED_BY_NAME", 1,
"DESCRIBER_ELEMENT", "describer",
"INHERITED_DESCRIBER", "INHERITED DESCRIBER",
"NO_DESCRIBER", "NO DESCRIBER",
"NOT_ASSOCIATED", 0,
"PREF_DEFAULT_CHARSET", "charset",
"PREF_FILE_EXTENSIONS", "file-extensions",
"PREF_FILE_NAMES", "file-names",
"PRIORITY_HIGH", 1,
"PRIORITY_LOW", -1,
"PRIORITY_NORMAL", 0,
"SPEC_PRE_DEFINED", 1,
"SPEC_USER_DEFINED", 2,
"STATUS_INVALID", 2,
"STATUS_UNKNOWN", 0,
"STATUS_VALID", 1);
});
