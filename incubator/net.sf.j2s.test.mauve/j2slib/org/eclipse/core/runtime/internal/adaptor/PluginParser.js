Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (["org.eclipse.core.runtime.internal.adaptor.IModel", "$.IPluginInfo", "org.xml.sax.helpers.DefaultHandler", "java.util.Stack"], "org.eclipse.core.runtime.internal.adaptor.PluginParser", ["java.util.ArrayList", "$.HashMap", "$.StringTokenizer", "$.Vector", "org.eclipse.core.runtime.adaptor.EclipseAdaptor", "$.EclipseAdaptorMsg", "org.eclipse.osgi.framework.log.FrameworkLogEntry", "org.eclipse.osgi.util.NLS", "org.osgi.util.tracker.ServiceTracker"], function () {
c$ = Clazz.decorateAsClass (function () {
this.manifestInfo = null;
this.context = null;
this.target = null;
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.internal.adaptor.PluginParser.PluginInfo")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.schemaVersion = null;
this.pluginId = null;
this.version = null;
this.vendor = null;
this.libraryPaths = null;
this.libraries = null;
this.requires = null;
this.requiresExpanded = false;
this.compatibilityFound = false;
this.pluginClass = null;
this.masterPluginId = null;
this.masterVersion = null;
this.masterMatch = null;
this.filters = null;
this.pluginName = null;
this.singleton = false;
this.fragment = false;
this.$hasExtensionExtensionPoints = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor.PluginParser, "PluginInfo", null, org.eclipse.core.runtime.internal.adaptor.IPluginInfo);
Clazz.overrideMethod (c$, "isFragment", 
function () {
return this.fragment;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "plugin-id: " + this.pluginId + "  version: " + this.version + " libraries: " + this.libraries + " class:" + this.pluginClass + " master: " + this.masterPluginId + " master-version: " + this.masterVersion + " requires: " + this.requires + " singleton: " + this.singleton;
});
Clazz.overrideMethod (c$, "getLibraries", 
function () {
if (this.libraries == null) return  new java.util.HashMap (0);
return this.libraries;
});
Clazz.overrideMethod (c$, "getRequires", 
function () {
if (!"2.1".equals (this.b$["org.eclipse.core.runtime.internal.adaptor.PluginParser"].target) && this.schemaVersion == null && !this.requiresExpanded) {
this.requiresExpanded = true;
if (this.requires == null) {
this.requires =  new java.util.ArrayList (1);
this.requires.add (Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.core.runtime", "2.1", false, false, "greaterOrEqual"));
this.requires.add (Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.core.runtime.compatibility", null, false, false, null));
} else {
for (var a = 0; a < this.requires.size (); a++) {
var b = this.requires.get (a);
if ("org.eclipse.ui".equals (b.getName ())) {
this.requires.add (a + 1, Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.ui.workbench.texteditor", null, true, b.isExported (), null));
this.requires.add (a + 1, Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.jface.text", null, true, b.isExported (), null));
this.requires.add (a + 1, Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.ui.editors", null, true, b.isExported (), null));
this.requires.add (a + 1, Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.ui.views", null, true, b.isExported (), null));
this.requires.add (a + 1, Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.ui.ide", null, true, b.isExported (), null));
} else if ("org.eclipse.help".equals (b.getName ())) {
this.requires.add (a + 1, Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.help.base", null, true, b.isExported (), null));
} else if ("org.eclipse.core.runtime".equals (b.getName ()) && !this.compatibilityFound) {
this.requires.add (a + 1, Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.core.runtime.compatibility", null, false, b.isExported (), null));
}}
if (!this.requires.contains (Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.core.runtime.compatibility", null, false, false, null))) {
this.requires.add (Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.core.runtime.compatibility", null, false, false, null));
}var b = Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.core.runtime", null, false, false, null);
this.requires.remove (b);
this.requires.add (Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, "org.eclipse.core.runtime", "2.1", false, false, "greaterOrEqual"));
}}if (this.requires == null) return this.requires =  new java.util.ArrayList (0);
return this.requires;
});
Clazz.overrideMethod (c$, "getMasterId", 
function () {
return this.masterPluginId;
});
Clazz.overrideMethod (c$, "getMasterVersion", 
function () {
return this.masterVersion;
});
Clazz.overrideMethod (c$, "getMasterMatch", 
function () {
return this.masterMatch;
});
Clazz.overrideMethod (c$, "getPluginClass", 
function () {
return this.pluginClass;
});
Clazz.overrideMethod (c$, "getUniqueId", 
function () {
return this.pluginId;
});
Clazz.overrideMethod (c$, "getVersion", 
function () {
return this.version;
});
Clazz.overrideMethod (c$, "getPackageFilters", 
function () {
return this.filters;
});
Clazz.overrideMethod (c$, "getLibrariesName", 
function () {
if (this.libraryPaths == null) return  new Array (0);
return this.libraryPaths.toArray ( new Array (this.libraryPaths.size ()));
});
Clazz.overrideMethod (c$, "getPluginName", 
function () {
return this.pluginName;
});
Clazz.overrideMethod (c$, "getProviderName", 
function () {
return this.vendor;
});
Clazz.overrideMethod (c$, "isSingleton", 
function () {
return this.singleton;
});
Clazz.overrideMethod (c$, "hasExtensionExtensionPoints", 
function () {
return this.$hasExtensionExtensionPoints;
});
Clazz.defineMethod (c$, "getRoot", 
function () {
return this.isFragment () ? "fragment" : "plugin";
});
Clazz.overrideMethod (c$, "validateForm", 
function () {
if (this.pluginId == null) return org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_MISSING_ATTRIBUTE, [this.getRoot (), "id", this.getRoot ()]);
if (this.pluginName == null) return org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_MISSING_ATTRIBUTE, [this.getRoot (), "name", this.getRoot ()]);
if (this.version == null) return org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_MISSING_ATTRIBUTE, [this.getRoot (), "version", this.getRoot ()]);
if (this.isFragment () && this.masterPluginId == null) return org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_MISSING_ATTRIBUTE, [this.getRoot (), "plugin-id", this.getRoot ()]);
if (this.isFragment () && this.masterVersion == null) return org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_MISSING_ATTRIBUTE, [this.getRoot (), "plugin-version", this.getRoot ()]);
return null;
});
Clazz.defineStatics (c$,
"TARGET21", "2.1");
c$ = Clazz.p0p ();
}
this.stateStack = null;
this.objectStack = null;
this.locator = null;
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.name = null;
this.version = null;
this.optional = false;
this.$export = false;
this.match = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor.PluginParser, "Prerequisite");
Clazz.defineMethod (c$, "isExported", 
function () {
return this.$export;
});
Clazz.defineMethod (c$, "getMatch", 
function () {
return this.match;
});
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "isOptional", 
function () {
return this.optional;
});
Clazz.defineMethod (c$, "getVersion", 
function () {
return this.version;
});
Clazz.makeConstructor (c$, 
function (a, b, c, d, e) {
this.name = a;
this.version = b;
this.optional = c;
this.$export = d;
this.match = e;
}, "~S,~S,~B,~B,~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.name;
});
Clazz.overrideMethod (c$, "equals", 
function (a) {
if (!(Clazz.instanceOf (a, org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite))) return false;
return this.name.equals ((a).name);
}, "~O");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor, "PluginParser", org.xml.sax.helpers.DefaultHandler, org.eclipse.core.runtime.internal.adaptor.IModel);
Clazz.prepareFields (c$, function () {
this.manifestInfo = Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.PluginInfo, this, null);
this.stateStack =  new java.util.Stack ();
this.objectStack =  new java.util.Stack ();
});
Clazz.makeConstructor (c$, 
function (context, target) {
Clazz.superConstructor (this, org.eclipse.core.runtime.internal.adaptor.PluginParser);
this.context = context;
this.target = target;
}, "org.osgi.framework.BundleContext,~S");
Clazz.overrideMethod (c$, "setDocumentLocator", 
function (locator) {
this.locator = locator;
}, "org.xml.sax.Locator");
Clazz.overrideMethod (c$, "endDocument", 
function () {
});
Clazz.overrideMethod (c$, "endElement", 
function (uri, elementName, qName) {
switch ((this.stateStack.peek ()).intValue ()) {
case 0:
this.stateStack.pop ();
break;
case 1:
break;
case 2:
case 11:
break;
case 3:
if (elementName.equals ("runtime")) {
this.stateStack.pop ();
}break;
case 4:
if (elementName.equals ("requires")) {
this.stateStack.pop ();
this.objectStack.pop ();
}break;
case 5:
if (elementName.equals ("extension-point")) {
this.stateStack.pop ();
}break;
case 6:
if (elementName.equals ("extension")) {
this.stateStack.pop ();
}break;
case 7:
if (elementName.equals ("library")) {
var curLibrary = this.objectStack.pop ();
if (!curLibrary.trim ().equals ("")) {
var exportsVector = this.objectStack.pop ();
if (this.manifestInfo.libraries == null) {
this.manifestInfo.libraries =  new java.util.HashMap (3);
this.manifestInfo.libraryPaths =  new java.util.ArrayList (3);
}this.manifestInfo.libraries.put (curLibrary, exportsVector);
this.manifestInfo.libraryPaths.add (curLibrary.$replace ('\\', '/'));
}this.stateStack.pop ();
}break;
case 8:
if (elementName.equals ("export")) {
this.stateStack.pop ();
}break;
case 9:
if (elementName.equals ("import")) {
this.stateStack.pop ();
}break;
}
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "error", 
function (ex) {
this.logStatus (ex);
}, "org.xml.sax.SAXParseException");
Clazz.overrideMethod (c$, "fatalError", 
function (ex) {
this.logStatus (ex);
throw ex;
}, "org.xml.sax.SAXParseException");
Clazz.defineMethod (c$, "handleExtensionPointState", 
function (elementName, attributes) {
this.stateStack.push ( new Integer (0));
this.manifestInfo.$hasExtensionExtensionPoints = true;
}, "~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "handleExtensionState", 
function (elementName, attributes) {
this.stateStack.push ( new Integer (0));
this.manifestInfo.$hasExtensionExtensionPoints = true;
}, "~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "handleInitialState", 
function (elementName, attributes) {
if (elementName.equals ("plugin")) {
this.stateStack.push ( new Integer (2));
this.parsePluginAttributes (attributes);
} else if (elementName.equals ("fragment")) {
this.manifestInfo.fragment = true;
this.stateStack.push ( new Integer (11));
this.parseFragmentAttributes (attributes);
} else {
this.stateStack.push ( new Integer (0));
this.internalError (elementName);
}}, "~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "handleLibraryExportState", 
function (elementName, attributes) {
this.stateStack.push ( new Integer (0));
}, "~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "handleLibraryState", 
function (elementName, attributes) {
if (elementName.equals ("export")) {
this.stateStack.push ( new Integer (8));
var currentLib = this.objectStack.peek ();
if (attributes == null) return ;
var maskValue = attributes.getValue ("", "name");
this.objectStack.pop ();
var exportMask = this.objectStack.peek ();
this.objectStack.push (currentLib);
if (maskValue != null) {
var tok =  new java.util.StringTokenizer (maskValue, ",");
while (tok.hasMoreTokens ()) {
var value = tok.nextToken ();
if (!exportMask.contains (maskValue)) exportMask.addElement (value.trim ());
}
}return ;
}if (elementName.equals ("packages")) {
this.stateStack.push ( new Integer (0));
return ;
}this.stateStack.push ( new Integer (0));
this.internalError (elementName);
return ;
}, "~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "handlePluginState", 
function (elementName, attributes) {
if (elementName.equals ("runtime")) {
var whatIsIt = this.objectStack.peek ();
if ((Clazz.instanceOf (whatIsIt, org.eclipse.core.runtime.internal.adaptor.PluginParser.PluginInfo)) && (this.objectStack.peek ()).libraries != null) {
this.stateStack.push ( new Integer (0));
return ;
}this.stateStack.push ( new Integer (3));
return ;
}if (elementName.equals ("requires")) {
this.stateStack.push ( new Integer (4));
this.objectStack.push ( new java.util.Vector ());
this.parseRequiresAttributes (attributes);
return ;
}if (elementName.equals ("extension-point")) {
this.manifestInfo.singleton = true;
this.stateStack.push ( new Integer (5));
return ;
}if (elementName.equals ("extension")) {
this.manifestInfo.singleton = true;
this.stateStack.push ( new Integer (6));
return ;
}this.stateStack.push ( new Integer (0));
this.internalError (elementName);
}, "~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "handleRequiresImportState", 
function (elementName, attributes) {
this.stateStack.push ( new Integer (0));
}, "~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "handleRequiresState", 
function (elementName, attributes) {
if (elementName.equals ("import")) {
this.parsePluginRequiresImport (attributes);
return ;
}this.stateStack.push ( new Integer (0));
this.internalError (elementName);
}, "~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "handleRuntimeState", 
function (elementName, attributes) {
if (elementName.equals ("library")) {
this.stateStack.push ( new Integer (7));
this.parseLibraryAttributes (attributes);
return ;
}this.stateStack.push ( new Integer (0));
this.internalError (elementName);
}, "~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "logStatus", 
($fz = function (ex) {
var name = ex.getSystemId ();
if (name == null) name = "";
 else name = name.substring (1 + name.lastIndexOf ("/"));
var msg;
if (name.equals ("")) msg = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.parse_error, ex.getMessage ());
 else msg = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.parse_errorNameLineColumn, [name, Integer.toString (ex.getLineNumber ()), Integer.toString (ex.getColumnNumber ()), ex.getMessage ()]);
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", msg, 0, ex, null);
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log (entry);
}, $fz.isPrivate = true, $fz), "org.xml.sax.SAXParseException");
Clazz.defineMethod (c$, "parsePlugin", 
function ($in) {
var factory = org.eclipse.core.runtime.internal.adaptor.PluginParser.acquireXMLParsing (this.context);
if (factory == null) {
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_NO_SAX_FACTORY, 0, null, null);
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log (entry);
return null;
}factory.setNamespaceAware (true);
factory.setNamespaceAware (true);
try {
factory.setFeature ("http://xml.org/sax/features/string-interning", true);
} catch (se) {
if (Clazz.instanceOf (se, org.xml.sax.SAXException)) {
} else {
throw se;
}
}
factory.setValidating (false);
factory.newSAXParser ().parse ($in, this);
return this.manifestInfo;
}, "java.io.InputStream");
c$.acquireXMLParsing = Clazz.defineMethod (c$, "acquireXMLParsing", 
function (context) {
if (org.eclipse.core.runtime.internal.adaptor.PluginParser.xmlTracker == null) {
($t$ = org.eclipse.core.runtime.internal.adaptor.PluginParser.xmlTracker =  new org.osgi.util.tracker.ServiceTracker (context, "javax.xml.parsers.SAXParserFactory", null), org.eclipse.core.runtime.internal.adaptor.PluginParser.prototype.xmlTracker = org.eclipse.core.runtime.internal.adaptor.PluginParser.xmlTracker, $t$);
org.eclipse.core.runtime.internal.adaptor.PluginParser.xmlTracker.open ();
}return org.eclipse.core.runtime.internal.adaptor.PluginParser.xmlTracker.getService ();
}, "org.osgi.framework.BundleContext");
c$.releaseXMLParsing = Clazz.defineMethod (c$, "releaseXMLParsing", 
function () {
if (org.eclipse.core.runtime.internal.adaptor.PluginParser.xmlTracker != null) org.eclipse.core.runtime.internal.adaptor.PluginParser.xmlTracker.close ();
});
Clazz.defineMethod (c$, "parseFragmentAttributes", 
function (attributes) {
this.objectStack.push (this.manifestInfo);
var len = attributes.getLength ();
for (var i = 0; i < len; i++) {
var attrName = attributes.getLocalName (i);
var attrValue = attributes.getValue (i).trim ();
if (attrName.equals ("id")) this.manifestInfo.pluginId = attrValue;
 else if (attrName.equals ("name")) this.manifestInfo.pluginName = attrValue;
 else if (attrName.equals ("version")) this.manifestInfo.version = attrValue;
 else if (attrName.equals ("provider-name")) this.manifestInfo.vendor = attrValue;
 else if (attrName.equals ("plugin-id")) this.manifestInfo.masterPluginId = attrValue;
 else if (attrName.equals ("plugin-version")) this.manifestInfo.masterVersion = attrValue;
 else if (attrName.equals ("match")) this.manifestInfo.masterMatch = attrValue;
}
}, "org.xml.sax.Attributes");
Clazz.defineMethod (c$, "parseLibraryAttributes", 
function (attributes) {
this.objectStack.push ( new java.util.Vector ());
var current = attributes.getValue ("", "name");
this.objectStack.push (current);
}, "org.xml.sax.Attributes");
Clazz.defineMethod (c$, "parsePluginAttributes", 
function (attributes) {
this.objectStack.push (this.manifestInfo);
var len = attributes.getLength ();
for (var i = 0; i < len; i++) {
var attrName = attributes.getLocalName (i);
var attrValue = attributes.getValue (i).trim ();
if (attrName.equals ("id")) this.manifestInfo.pluginId = attrValue;
 else if (attrName.equals ("name")) this.manifestInfo.pluginName = attrValue;
 else if (attrName.equals ("version")) this.manifestInfo.version = attrValue;
 else if (attrName.equals ("vendor-name") || (attrName.equals ("provider-name"))) this.manifestInfo.vendor = attrValue;
 else if (attrName.equals ("class")) this.manifestInfo.pluginClass = attrValue;
}
}, "org.xml.sax.Attributes");
Clazz.defineMethod (c$, "parsePluginRequiresImport", 
function (attributes) {
if (this.manifestInfo.requires == null) {
this.manifestInfo.requires =  new java.util.ArrayList ();
}var plugin = attributes.getValue ("", "plugin");
if (plugin == null) return ;
if (plugin.equals ("org.eclipse.core.boot")) return ;
if (plugin.equals ("org.eclipse.core.runtime.compatibility")) this.manifestInfo.compatibilityFound = true;
var version = attributes.getValue ("", "version");
var optional = attributes.getValue ("", "optional");
var $export = attributes.getValue ("", "export");
var match = attributes.getValue ("", "match");
this.manifestInfo.requires.add (Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.PluginParser.Prerequisite, this, null, plugin, version, "true".equalsIgnoreCase (optional) ? true : false, "true".equalsIgnoreCase ($export) ? true : false, match));
}, "org.xml.sax.Attributes");
Clazz.defineMethod (c$, "parseRequiresAttributes", 
function (attributes) {
}, "org.xml.sax.Attributes");
c$.replace = Clazz.defineMethod (c$, "replace", 
function (s, from, to) {
var str = s;
var fromLen = from.length;
var toLen = to.length;
var ix = str.indexOf (from);
while (ix != -1) {
str = str.substring (0, ix) + to + str.substring (ix + fromLen);
ix = str.indexOf (from, ix + toLen);
}
return str;
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "startDocument", 
function () {
this.stateStack.push ( new Integer (1));
});
Clazz.overrideMethod (c$, "startElement", 
function (uri, elementName, qName, attributes) {
switch ((this.stateStack.peek ()).intValue ()) {
case 1:
this.handleInitialState (elementName, attributes);
break;
case 11:
case 2:
this.handlePluginState (elementName, attributes);
break;
case 3:
this.handleRuntimeState (elementName, attributes);
break;
case 4:
this.handleRequiresState (elementName, attributes);
break;
case 5:
this.handleExtensionPointState (elementName, attributes);
break;
case 6:
this.handleExtensionState (elementName, attributes);
break;
case 7:
this.handleLibraryState (elementName, attributes);
break;
case 8:
this.handleLibraryExportState (elementName, attributes);
break;
case 9:
this.handleRequiresImportState (elementName, attributes);
break;
default:
this.stateStack.push ( new Integer (0));
}
}, "~S,~S,~S,org.xml.sax.Attributes");
Clazz.overrideMethod (c$, "warning", 
function (ex) {
this.logStatus (ex);
}, "org.xml.sax.SAXParseException");
Clazz.defineMethod (c$, "internalError", 
($fz = function (elementName) {
var error;
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_PARSE_UNKNOWNTOP_ELEMENT, elementName);
error =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", (this.manifestInfo.pluginId == null ? message : "Plug-in : " + this.manifestInfo.pluginId + ", " + message), 0, null, null);
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log (error);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "processingInstruction", 
function (target, data) {
if (target.equalsIgnoreCase ("eclipse")) {
this.manifestInfo.schemaVersion = "3.0";
var tokenizer =  new java.util.StringTokenizer (data, "=\"");
while (tokenizer.hasMoreTokens ()) {
var token = tokenizer.nextToken ();
if (token.equalsIgnoreCase ("version")) {
if (!tokenizer.hasMoreTokens ()) {
break;
}this.manifestInfo.schemaVersion = tokenizer.nextToken ();
break;
}}
}}, "~S,~S");
Clazz.defineStatics (c$,
"xmlTracker", null,
"IGNORED_ELEMENT_STATE", 0,
"INITIAL_STATE", 1,
"PLUGIN_STATE", 2,
"PLUGIN_RUNTIME_STATE", 3,
"PLUGIN_REQUIRES_STATE", 4,
"PLUGIN_EXTENSION_POINT_STATE", 5,
"PLUGIN_EXTENSION_STATE", 6,
"RUNTIME_LIBRARY_STATE", 7,
"LIBRARY_EXPORT_STATE", 8,
"PLUGIN_REQUIRES_IMPORT_STATE", 9,
"FRAGMENT_STATE", 11);
});
