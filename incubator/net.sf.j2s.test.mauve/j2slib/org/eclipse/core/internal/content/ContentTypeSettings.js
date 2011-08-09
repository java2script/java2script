Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["org.eclipse.core.internal.content.IContentTypeInfo", "org.eclipse.core.runtime.content.IContentTypeSettings"], "org.eclipse.core.internal.content.ContentTypeSettings", ["org.eclipse.core.internal.content.ContentType", "$.ContentTypeManager", "$.Util", "org.eclipse.core.internal.runtime.Messages", "org.eclipse.core.runtime.CoreException", "$.Status", "org.eclipse.core.runtime.content.IContentDescription", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contentType = null;
this.context = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "ContentTypeSettings", null, [org.eclipse.core.runtime.content.IContentTypeSettings, org.eclipse.core.internal.content.IContentTypeInfo]);
c$.addFileSpec = Clazz.defineMethod (c$, "addFileSpec", 
function (context, contentTypeId, fileSpec, type) {
var contentTypeNode = org.eclipse.core.internal.content.ContentTypeManager.getInstance ().getPreferences (context).node (contentTypeId);
var key = org.eclipse.core.internal.content.ContentType.getPreferenceKey (type);
var existingValues = org.eclipse.core.internal.content.Util.parseItemsIntoList (contentTypeNode.get (key, null));
for (var i = 0; i < existingValues.size (); i++) if ((existingValues.get (i)).equalsIgnoreCase (fileSpec)) return ;

existingValues.add (fileSpec);
var newValue = org.eclipse.core.internal.content.Util.toListString (existingValues.toArray ());
org.eclipse.core.internal.content.ContentType.setPreference (contentTypeNode, key, newValue);
try {
contentTypeNode.flush ();
} catch (bse) {
if (Clazz.instanceOf (bse, org.osgi.service.prefs.BackingStoreException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.content_errorSavingSettings, contentTypeId);
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, bse);
throw  new org.eclipse.core.runtime.CoreException (status);
} else {
throw bse;
}
}
}, "org.eclipse.core.runtime.preferences.IScopeContext,~S,~S,~N");
c$.getFileSpecs = Clazz.defineMethod (c$, "getFileSpecs", 
function (context, contentTypeId, type) {
var contentTypeNode = org.eclipse.core.internal.content.ContentTypeManager.getInstance ().getPreferences (context).node (contentTypeId);
return org.eclipse.core.internal.content.ContentTypeSettings.getFileSpecs (contentTypeNode, type);
}, "org.eclipse.core.runtime.preferences.IScopeContext,~S,~N");
c$.getFileSpecs = Clazz.defineMethod (c$, "getFileSpecs", 
function (contentTypeNode, type) {
var key = org.eclipse.core.internal.content.ContentType.getPreferenceKey (type);
var existing = contentTypeNode.get (key, null);
return org.eclipse.core.internal.content.Util.parseItems (existing);
}, "org.osgi.service.prefs.Preferences,~N");
c$.internalGetDefaultProperty = Clazz.defineMethod (c$, "internalGetDefaultProperty", 
function (current, contentTypePrefs, key) {
var id = current.getId ();
if (contentTypePrefs.nodeExists (id)) {
var contentTypeNode = contentTypePrefs.node (id);
var propertyValue = contentTypeNode.get (key.getLocalName (), null);
if (propertyValue != null) return propertyValue;
}var propertyValue = current.basicGetDefaultProperty (key);
if (propertyValue != null) return propertyValue;
var baseType = current.getBaseType ();
return baseType == null ? null : org.eclipse.core.internal.content.ContentTypeSettings.internalGetDefaultProperty (baseType, contentTypePrefs, key);
}, "org.eclipse.core.internal.content.ContentType,org.osgi.service.prefs.Preferences,org.eclipse.core.runtime.QualifiedName");
c$.removeFileSpec = Clazz.defineMethod (c$, "removeFileSpec", 
function (context, contentTypeId, fileSpec, type) {
var contentTypeNode = org.eclipse.core.internal.content.ContentTypeManager.getInstance ().getPreferences (context).node (contentTypeId);
var key = org.eclipse.core.internal.content.ContentType.getPreferenceKey (type);
var existing = contentTypeNode.get (key, null);
if (existing == null) return ;
var existingValues = org.eclipse.core.internal.content.Util.parseItemsIntoList (contentTypeNode.get (key, null));
var index = -1;
var existingCount = existingValues.size ();
for (var i = 0; index == -1 && i < existingCount; i++) if ((existingValues.get (i)).equalsIgnoreCase (fileSpec)) index = i;

if (index == -1) return ;
existingValues.remove (index);
var newValue = org.eclipse.core.internal.content.Util.toListString (existingValues.toArray ());
org.eclipse.core.internal.content.ContentType.setPreference (contentTypeNode, key, newValue);
try {
contentTypeNode.flush ();
} catch (bse) {
if (Clazz.instanceOf (bse, org.osgi.service.prefs.BackingStoreException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.content_errorSavingSettings, contentTypeId);
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, bse);
throw  new org.eclipse.core.runtime.CoreException (status);
} else {
throw bse;
}
}
}, "org.eclipse.core.runtime.preferences.IScopeContext,~S,~S,~N");
Clazz.makeConstructor (c$, 
function (contentType, context) {
this.context = context;
this.contentType = contentType;
}, "org.eclipse.core.internal.content.ContentType,org.eclipse.core.runtime.preferences.IScopeContext");
Clazz.defineMethod (c$, "addFileSpec", 
function (fileSpec, type) {
org.eclipse.core.internal.content.ContentTypeSettings.addFileSpec (this.context, this.contentType.getId (), fileSpec, type);
}, "~S,~N");
Clazz.overrideMethod (c$, "getContentType", 
function () {
return this.contentType;
});
Clazz.overrideMethod (c$, "getDefaultCharset", 
function () {
return this.getDefaultProperty (org.eclipse.core.runtime.content.IContentDescription.CHARSET);
});
Clazz.overrideMethod (c$, "getDefaultProperty", 
function (key) {
var contentTypePrefs = org.eclipse.core.internal.content.ContentTypeManager.getInstance ().getPreferences (this.context);
try {
var propertyValue = org.eclipse.core.internal.content.ContentTypeSettings.internalGetDefaultProperty (this.contentType, contentTypePrefs, key);
return "".equals (propertyValue) ? null : propertyValue;
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
return null;
} else {
throw e;
}
}
}, "org.eclipse.core.runtime.QualifiedName");
Clazz.defineMethod (c$, "getFileSpecs", 
function (type) {
return org.eclipse.core.internal.content.ContentTypeSettings.getFileSpecs (this.context, this.contentType.getId (), type);
}, "~N");
Clazz.overrideMethod (c$, "getId", 
function () {
return this.contentType.getId ();
});
Clazz.defineMethod (c$, "removeFileSpec", 
function (fileSpec, type) {
org.eclipse.core.internal.content.ContentTypeSettings.removeFileSpec (this.context, this.contentType.getId (), fileSpec, type);
}, "~S,~N");
Clazz.overrideMethod (c$, "setDefaultCharset", 
function (userCharset) {
var contentTypeNode = org.eclipse.core.internal.content.ContentTypeManager.getInstance ().getPreferences (this.context).node (this.contentType.getId ());
org.eclipse.core.internal.content.ContentType.setPreference (contentTypeNode, "charset", userCharset);
try {
contentTypeNode.flush ();
} catch (bse) {
if (Clazz.instanceOf (bse, org.osgi.service.prefs.BackingStoreException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.content_errorSavingSettings, this.contentType.getId ());
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, bse);
throw  new org.eclipse.core.runtime.CoreException (status);
} else {
throw bse;
}
}
}, "~S");
});
