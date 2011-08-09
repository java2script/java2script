Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["org.eclipse.core.internal.content.ContentTypeMatcher", "org.eclipse.core.runtime.IRegistryChangeListener", "org.eclipse.core.runtime.content.IContentTypeManager", "java.lang.Boolean", "org.eclipse.core.internal.runtime.InternalPlatform", "$.ListenerList"], "org.eclipse.core.internal.content.ContentTypeManager", ["org.eclipse.core.internal.content.ContentTypeBuilder", "$.ContentTypeCatalog", "$.ContentTypeHandler", "$.LazyInputStream", "$.LazyReader", "org.eclipse.core.internal.runtime.Assert", "$.Policy", "org.eclipse.core.runtime.ISafeRunnable", "$.Platform", "org.eclipse.core.runtime.preferences.InstanceScope"], function () {
c$ = Clazz.decorateAsClass (function () {
this.catalog = null;
this.catalogGeneration = 0;
this.contentTypeListeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "ContentTypeManager", org.eclipse.core.internal.content.ContentTypeMatcher, [org.eclipse.core.runtime.content.IContentTypeManager, org.eclipse.core.runtime.IRegistryChangeListener]);
Clazz.prepareFields (c$, function () {
this.contentTypeListeners =  new org.eclipse.core.internal.runtime.ListenerList ();
});
c$.startup = Clazz.defineMethod (c$, "startup", 
function () {
($t$ = org.eclipse.core.internal.content.ContentTypeManager.instance =  new org.eclipse.core.internal.content.ContentTypeManager (), org.eclipse.core.internal.content.ContentTypeManager.prototype.instance = org.eclipse.core.internal.content.ContentTypeManager.instance, $t$);
org.eclipse.core.runtime.Platform.getExtensionRegistry ().addRegistryChangeListener (org.eclipse.core.internal.content.ContentTypeManager.instance, "org.eclipse.core.runtime");
});
c$.shutdown = Clazz.defineMethod (c$, "shutdown", 
function () {
org.eclipse.core.runtime.Platform.getExtensionRegistry ().removeRegistryChangeListener (org.eclipse.core.internal.content.ContentTypeManager.instance);
($t$ = org.eclipse.core.internal.content.ContentTypeManager.instance = null, org.eclipse.core.internal.content.ContentTypeManager.prototype.instance = org.eclipse.core.internal.content.ContentTypeManager.instance, $t$);
});
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
org.eclipse.core.internal.runtime.Assert.isNotNull (org.eclipse.core.internal.content.ContentTypeManager.instance);
return org.eclipse.core.internal.content.ContentTypeManager.instance;
});
c$.getFileExtension = Clazz.defineMethod (c$, "getFileExtension", 
function (fileName) {
var dotPosition = fileName.lastIndexOf ('.');
return (dotPosition == -1 || dotPosition == fileName.length - 1) ? "" : fileName.substring (dotPosition + 1);
}, "~S");
c$.readBuffer = Clazz.defineMethod (c$, "readBuffer", 
function (contents) {
return  new org.eclipse.core.internal.content.LazyInputStream (contents, 1024);
}, "java.io.InputStream");
c$.readBuffer = Clazz.defineMethod (c$, "readBuffer", 
function (contents) {
return  new org.eclipse.core.internal.content.LazyReader (contents, 1024);
}, "java.io.Reader");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.core.internal.content.ContentTypeManager, [null,  new org.eclipse.core.runtime.preferences.InstanceScope ()]);
});
Clazz.defineMethod (c$, "createBuilder", 
function (newCatalog) {
return  new org.eclipse.core.internal.content.ContentTypeBuilder (newCatalog);
}, "org.eclipse.core.internal.content.ContentTypeCatalog");
Clazz.overrideMethod (c$, "getAllContentTypes", 
function () {
var currentCatalog = this.getCatalog ();
var types = currentCatalog.getAllContentTypes ();
var result =  new Array (types.length);
var generation = currentCatalog.getGeneration ();
for (var i = 0; i < result.length; i++) result[i] =  new org.eclipse.core.internal.content.ContentTypeHandler (types[i], generation);

return result;
});
Clazz.defineMethod (c$, "getCatalog", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
if (this.catalog != null) return this.catalog;
var newCatalog =  new org.eclipse.core.internal.content.ContentTypeCatalog (this, this.catalogGeneration++);
var builder = this.createBuilder (newCatalog);
try {
builder.buildCatalog ();
this.catalog = newCatalog;
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.InvalidRegistryObjectException)) {
} else {
throw e;
}
}
newCatalog.organize ();
return newCatalog;
});
Clazz.overrideMethod (c$, "getContentType", 
function (contentTypeIdentifier) {
var currentCatalog = this.getCatalog ();
var type = currentCatalog.getContentType (contentTypeIdentifier);
return type == null ? null :  new org.eclipse.core.internal.content.ContentTypeHandler (type, currentCatalog.getGeneration ());
}, "~S");
Clazz.overrideMethod (c$, "getMatcher", 
function (customPolicy, context) {
return  new org.eclipse.core.internal.content.ContentTypeMatcher (customPolicy, context == null ? this.getContext () : context);
}, "org.eclipse.core.runtime.content.IContentTypeManager.ISelectionPolicy,org.eclipse.core.runtime.preferences.IScopeContext");
Clazz.defineMethod (c$, "getPreferences", 
function () {
return this.getPreferences (this.getContext ());
});
Clazz.defineMethod (c$, "getPreferences", 
function (context) {
return context.getNode ("org.eclipse.core.runtime/content-types");
}, "org.eclipse.core.runtime.preferences.IScopeContext");
Clazz.overrideMethod (c$, "registryChanged", 
function (event) {
if (event.getExtensionDeltas ("org.eclipse.core.runtime", "contentTypes").length == 0) return ;
this.invalidate ();
}, "org.eclipse.core.runtime.IRegistryChangeEvent");
Clazz.defineMethod (c$, "invalidate", 
function () {
if (org.eclipse.core.internal.content.ContentTypeManager.DEBUGGING && this.catalog != null) org.eclipse.core.internal.runtime.Policy.debug ("Registry discarded");
this.catalog = null;
});
Clazz.overrideMethod (c$, "addContentTypeChangeListener", 
function (listener) {
this.contentTypeListeners.add (listener);
}, "org.eclipse.core.runtime.content.IContentTypeManager.IContentTypeChangeListener");
Clazz.overrideMethod (c$, "removeContentTypeChangeListener", 
function (listener) {
this.contentTypeListeners.remove (listener);
}, "org.eclipse.core.runtime.content.IContentTypeManager.IContentTypeChangeListener");
Clazz.defineMethod (c$, "fireContentTypeChangeEvent", 
function (type) {
var listeners = this.contentTypeListeners.getListeners ();
var eventObject =  new org.eclipse.core.internal.content.ContentTypeHandler (type, type.getCatalog ().getGeneration ());
for (var i = 0; i < listeners.length; i++) {
var event =  new org.eclipse.core.runtime.content.IContentTypeManager.ContentTypeChangeEvent (eventObject);
var listener = listeners[i];
var job = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.ContentTypeManager$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.content, "ContentTypeManager$1", null, org.eclipse.core.runtime.ISafeRunnable);
Clazz.overrideMethod (c$, "handleException", 
function (exception) {
}, "Throwable");
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.listener.contentTypeChanged (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.content.ContentTypeManager$1, i$, v$);
}) (this, Clazz.cloneFinals ("listener", listener, "event", event));
org.eclipse.core.runtime.Platform.run (job);
}
}, "org.eclipse.core.internal.content.ContentType");
Clazz.overrideMethod (c$, "getSpecificDescription", 
function (description) {
return description;
}, "org.eclipse.core.internal.content.BasicDescription");
Clazz.defineStatics (c$,
"instance", null,
"BLOCK_SIZE", 0x400);
c$.CONTENT_TYPE_PREF_NODE = c$.prototype.CONTENT_TYPE_PREF_NODE = "org.eclipse.core.runtime/content-types";
c$.OPTION_DEBUG_CONTENT_TYPES = c$.prototype.OPTION_DEBUG_CONTENT_TYPES = "org.eclipse.core.runtime/contenttypes/debug";
c$.DEBUGGING = c$.prototype.DEBUGGING = Boolean.TRUE.toString ().equalsIgnoreCase (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOption ("org.eclipse.core.runtime/contenttypes/debug"));
});
