Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.xml.sax.helpers.DefaultHandler", "java.util.Stack"], "org.eclipse.core.internal.registry.ExtensionsParser", ["java.lang.IllegalArgumentException", "$.Long", "$.NullPointerException", "java.util.ArrayList", "$.HashMap", "$.StringTokenizer", "org.eclipse.core.internal.registry.ConfigurationElement", "$.Extension", "$.ExtensionPoint", "$.RegistryObjectManager", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "$.ResourceTranslator", "org.eclipse.core.runtime.Status", "org.eclipse.osgi.util.NLS", "org.xml.sax.SAXException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.compatibilityMode = false;
this.locationName = null;
this.stateStack = null;
this.objectStack = null;
this.schemaVersion = null;
this.status = null;
this.resources = null;
this.objectManager = null;
this.namespace = null;
this.configurationElementValue = null;
this.scratchVectors = null;
this.manifestType = null;
this.locator = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "ExtensionsParser", org.xml.sax.helpers.DefaultHandler);
Clazz.prepareFields (c$, function () {
this.stateStack =  new java.util.Stack ();
this.objectStack =  new java.util.Stack ();
this.scratchVectors =  new Array (2);
});
c$.initializeExtensionPointMap = Clazz.defineMethod (c$, "initializeExtensionPointMap", 
($fz = function () {
var map =  new java.util.HashMap (13);
map.put ("org.eclipse.ui.markerImageProvider", "org.eclipse.ui.ide.markerImageProvider");
map.put ("org.eclipse.ui.markerHelp", "org.eclipse.ui.ide.markerHelp");
map.put ("org.eclipse.ui.markerImageProviders", "org.eclipse.ui.ide.markerImageProviders");
map.put ("org.eclipse.ui.markerResolution", "org.eclipse.ui.ide.markerResolution");
map.put ("org.eclipse.ui.projectNatureImages", "org.eclipse.ui.ide.projectNatureImages");
map.put ("org.eclipse.ui.resourceFilters", "org.eclipse.ui.ide.resourceFilters");
map.put ("org.eclipse.ui.markerUpdaters", "org.eclipse.ui.editors.markerUpdaters");
map.put ("org.eclipse.ui.documentProviders", "org.eclipse.ui.editors.documentProviders");
map.put ("org.eclipse.ui.workbench.texteditor.markerAnnotationSpecification", "org.eclipse.ui.editors.markerAnnotationSpecification");
map.put ("org.eclipse.help.browser", "org.eclipse.help.base.browser");
map.put ("org.eclipse.help.luceneAnalyzer", "org.eclipse.help.base.luceneAnalyzer");
map.put ("org.eclipse.help.webapp", "org.eclipse.help.base.webapp");
map.put ("org.eclipse.help.support", "org.eclipse.ui.helpSupport");
($t$ = org.eclipse.core.internal.registry.ExtensionsParser.extensionPointMap = map, org.eclipse.core.internal.registry.ExtensionsParser.prototype.extensionPointMap = org.eclipse.core.internal.registry.ExtensionsParser.extensionPointMap, $t$);
}, $fz.isPrivate = true, $fz));
Clazz.makeConstructor (c$, 
function (status) {
Clazz.superConstructor (this, org.eclipse.core.internal.registry.ExtensionsParser);
this.status = status;
}, "org.eclipse.core.runtime.MultiStatus");
Clazz.overrideMethod (c$, "setDocumentLocator", 
function (locator) {
this.locator = locator;
}, "org.xml.sax.Locator");
Clazz.overrideMethod (c$, "characters", 
function (ch, start, length) {
var state = (this.stateStack.peek ()).intValue ();
if (state != 10) return ;
if (state == 10) {
var currentConfigElement = this.objectStack.peek ();
var value =  String.instantialize (ch, start, length);
if (this.configurationElementValue == null) {
if (value.trim ().length != 0) {
this.configurationElementValue = value;
}} else {
this.configurationElementValue = this.configurationElementValue + value;
}if (this.configurationElementValue != null) currentConfigElement.setValue (this.translate (this.configurationElementValue));
}}, "~A,~N,~N");
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
this.internalError (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_internalStack, elementName));
break;
case 2:
if (elementName.equals (this.manifestType)) {
this.stateStack.pop ();
var extensionPoints = this.scratchVectors[0];
var extensions = this.scratchVectors[1];
var namespaceChildren =  Clazz.newArray (2 + extensionPoints.size () + extensions.size (), 0);
var position = 2;
if (extensionPoints.size () > 0) {
namespaceChildren[0] = extensionPoints.size ();
for (var iter = extensionPoints.iterator (); iter.hasNext (); ) {
namespaceChildren[position++] = (iter.next ()).getObjectId ();
}
extensionPoints.clear ();
}if (extensions.size () > 0) {
var renamedExtensions = this.fixRenamedExtensionPoints (extensions.toArray ( new Array (extensions.size ())));
namespaceChildren[1] = renamedExtensions.length;
for (var i = 0; i < renamedExtensions.length; i++) {
namespaceChildren[position++] = renamedExtensions[i].getObjectId ();
}
extensions.clear ();
}this.namespace.setRawChildren (namespaceChildren);
}break;
case 5:
if (elementName.equals ("extension-point")) {
this.stateStack.pop ();
}break;
case 6:
if (elementName.equals ("extension")) {
this.stateStack.pop ();
var currentExtension = this.objectStack.pop ();
currentExtension.setNamespace (this.namespace.getNamespace ());
this.scratchVectors[1].add (currentExtension);
}break;
case 10:
this.stateStack.pop ();
this.configurationElementValue = null;
var currentConfigElement = this.objectStack.pop ();
var value = currentConfigElement.getValueAsIs ();
if (value != null) {
currentConfigElement.setValue (value.trim ());
}var parent = this.objectStack.peek ();
var oldValues = parent.getRawChildren ();
var size = oldValues.length;
var newValues =  Clazz.newArray (size + 1, 0);
for (var i = 0; i < size; i++) {
newValues[i] = oldValues[i];
}
newValues[size] = currentConfigElement.getObjectId ();
parent.setRawChildren (newValues);
currentConfigElement.setParentId (parent.getObjectId ());
currentConfigElement.setParentType (Clazz.instanceOf (parent, org.eclipse.core.internal.registry.ConfigurationElement) ? 1 : 2);
break;
}
}, "~S,~S,~S");
Clazz.defineMethod (c$, "error", 
function (ex) {
this.logStatus (ex);
}, "org.xml.sax.SAXParseException");
Clazz.overrideMethod (c$, "fatalError", 
function (ex) {
this.logStatus (ex);
throw ex;
}, "org.xml.sax.SAXParseException");
Clazz.defineMethod (c$, "handleExtensionPointState", 
($fz = function (elementName) {
this.stateStack.push ( new Integer (0));
this.unknownElement ("extension-point", elementName);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "handleExtensionState", 
($fz = function (elementName, attributes) {
this.stateStack.push ( new Integer (10));
this.configurationElementValue = null;
var currentConfigurationElement =  new org.eclipse.core.internal.registry.ConfigurationElement ();
currentConfigurationElement.setContributingBundle (this.namespace.getNamespaceBundle ());
this.objectStack.push (currentConfigurationElement);
currentConfigurationElement.setName (elementName);
this.parseConfigurationElementAttributes (attributes);
this.objectManager.add (currentConfigurationElement, true);
}, $fz.isPrivate = true, $fz), "~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "handleInitialState", 
($fz = function (elementName, attributes) {
if (!elementName.equals (this.manifestType)) {
this.stateStack.push ( new Integer (0));
this.internalError (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_unknownTopElement, elementName));
return ;
}this.compatibilityMode = attributes.getLength () > 0;
this.stateStack.push ( new Integer (2));
this.objectStack.push (this.namespace);
}, $fz.isPrivate = true, $fz), "~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "handleBundleState", 
($fz = function (elementName, attributes) {
if (elementName.equals ("extension-point")) {
this.stateStack.push ( new Integer (5));
this.parseExtensionPointAttributes (attributes);
return ;
}if (elementName.equals ("extension")) {
this.stateStack.push ( new Integer (6));
this.parseExtensionAttributes (attributes);
return ;
}this.stateStack.push ( new Integer (0));
if (!this.compatibilityMode) this.unknownElement (this.manifestType, elementName);
}, $fz.isPrivate = true, $fz), "~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "logStatus", 
($fz = function (ex) {
var name = ex.getSystemId ();
if (name == null) name = this.locationName;
if (name == null) name = "";
 else name = name.substring (1 + name.lastIndexOf ("/"));
var msg;
if (name.equals ("")) msg = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_error, ex.getMessage ());
 else msg = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_errorNameLineColumn, ([name, Integer.toString (ex.getLineNumber ()), Integer.toString (ex.getColumnNumber ()), ex.getMessage ()]));
this.error ( new org.eclipse.core.runtime.Status (2, "org.eclipse.core.runtime", 1, msg, ex));
}, $fz.isPrivate = true, $fz), "org.xml.sax.SAXParseException");
Clazz.defineMethod (c$, "parseManifest", 
function (factoryTracker, $in, manifestKind, manifestName, registryObjects, currentNamespace, bundle) {
var start = 0;
this.resources = bundle;
this.objectManager = registryObjects;
this.namespace = currentNamespace;
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG) start = System.currentTimeMillis ();
var factory = factoryTracker.getService ();
if (factory == null) throw  new org.xml.sax.SAXException (org.eclipse.core.internal.runtime.Messages.parse_xmlParserNotAvailable);
try {
if (manifestKind == null) throw  new NullPointerException ();
if (!(manifestKind.equals ("plugin") || manifestKind.equals ("fragment"))) throw  new IllegalArgumentException ("Invalid manifest type: " + this.manifestType);
this.manifestType = manifestKind;
this.locationName = $in.getSystemId ();
if (this.locationName == null) this.locationName = manifestName;
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
return this.objectStack.pop ();
} finally {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG) {
($t$ = org.eclipse.core.internal.registry.ExtensionsParser.cumulativeTime = org.eclipse.core.internal.registry.ExtensionsParser.cumulativeTime + (System.currentTimeMillis () - start), org.eclipse.core.internal.registry.ExtensionsParser.prototype.cumulativeTime = org.eclipse.core.internal.registry.ExtensionsParser.cumulativeTime, $t$);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().setOption ("org.eclipse.core.runtime/registry/parsing/timing/value", Long.toString (org.eclipse.core.internal.registry.ExtensionsParser.cumulativeTime));
}}
}, "org.osgi.util.tracker.ServiceTracker,org.xml.sax.InputSource,~S,~S,org.eclipse.core.internal.registry.RegistryObjectManager,org.eclipse.core.internal.registry.Contribution,java.util.ResourceBundle");
Clazz.defineMethod (c$, "parseConfigurationElementAttributes", 
($fz = function (attributes) {
var parentConfigurationElement = this.objectStack.peek ();
var len = (attributes != null) ? attributes.getLength () : 0;
if (len == 0) {
parentConfigurationElement.setProperties (org.eclipse.core.internal.registry.RegistryObjectManager.EMPTY_STRING_ARRAY);
return ;
}var properties =  new Array (len * 2);
for (var i = 0; i < len; i++) {
properties[i * 2] = attributes.getLocalName (i);
properties[i * 2 + 1] = this.translate (attributes.getValue (i));
}
parentConfigurationElement.setProperties (properties);
properties = null;
}, $fz.isPrivate = true, $fz), "org.xml.sax.Attributes");
Clazz.defineMethod (c$, "parseExtensionAttributes", 
($fz = function (attributes) {
var currentExtension =  new org.eclipse.core.internal.registry.Extension ();
this.objectStack.push (currentExtension);
var len = (attributes != null) ? attributes.getLength () : 0;
for (var i = 0; i < len; i++) {
var attrName = attributes.getLocalName (i);
var attrValue = attributes.getValue (i).trim ();
if (attrName.equals ("name")) currentExtension.setLabel (this.translate (attrValue));
 else if (attrName.equals ("id")) currentExtension.setSimpleIdentifier (attrValue);
 else if (attrName.equals ("point")) {
var targetName;
if (attrValue.lastIndexOf ('.') == -1) {
var baseId = this.namespace.getNamespace ();
targetName = baseId + "." + attrValue;
} else targetName = attrValue;
currentExtension.setExtensionPointIdentifier (targetName);
} else this.unknownAttribute ("extension", attrName);
}
if (currentExtension.getExtensionPointIdentifier () == null) {
this.missingAttribute ("point", "extension");
this.stateStack.pop ();
this.stateStack.push ( new Integer (0));
this.objectStack.pop ();
return ;
}this.objectManager.add (currentExtension, true);
}, $fz.isPrivate = true, $fz), "org.xml.sax.Attributes");
Clazz.defineMethod (c$, "missingAttribute", 
($fz = function (attribute, element) {
if (this.locator == null) this.internalError (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_missingAttribute, attribute, element));
 else this.internalError (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_missingAttributeLine, ([attribute, element, Integer.toString (this.locator.getLineNumber ())])));
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "unknownAttribute", 
($fz = function (attribute, element) {
if (this.locator == null) this.internalError (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_unknownAttribute, attribute, element));
 else this.internalError (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_unknownAttributeLine, ([attribute, element, Integer.toString (this.locator.getLineNumber ())])));
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "unknownElement", 
($fz = function (element, parent) {
if (this.locator == null) this.internalError (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_unknownElement, parent, element));
 else this.internalError (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_unknownElementLine, ([parent, element, Integer.toString (this.locator.getLineNumber ())])));
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "parseExtensionPointAttributes", 
($fz = function (attributes) {
var currentExtPoint =  new org.eclipse.core.internal.registry.ExtensionPoint ();
var len = (attributes != null) ? attributes.getLength () : 0;
for (var i = 0; i < len; i++) {
var attrName = attributes.getLocalName (i);
var attrValue = attributes.getValue (i).trim ();
if (attrName.equals ("name")) currentExtPoint.setLabel (this.translate (attrValue));
 else if (attrName.equals ("id")) {
currentExtPoint.setUniqueIdentifier (this.namespace.getNamespace () + '.' + attrValue);
} else if (attrName.equals ("schema")) currentExtPoint.setSchema (attrValue);
 else this.unknownAttribute ("extension-point", attrName);
}
if (currentExtPoint.getSimpleIdentifier () == null || currentExtPoint.getLabel () == null) {
var attribute = currentExtPoint.getSimpleIdentifier () == null ? "id" : "name";
this.missingAttribute (attribute, "extension-point");
this.stateStack.pop ();
this.stateStack.push ( new Integer (0));
return ;
}this.objectManager.addExtensionPoint (currentExtPoint, true);
currentExtPoint.setNamespace (this.namespace.getNamespace ());
currentExtPoint.setBundleId (this.namespace.getNamespaceBundle ().getBundleId ());
this.scratchVectors[0].add (currentExtPoint);
}, $fz.isPrivate = true, $fz), "org.xml.sax.Attributes");
Clazz.overrideMethod (c$, "startDocument", 
function () {
this.stateStack.push ( new Integer (1));
for (var i = 0; i <= 1; i++) {
this.scratchVectors[i] =  new java.util.ArrayList ();
}
});
Clazz.overrideMethod (c$, "startElement", 
function (uri, elementName, qName, attributes) {
switch ((this.stateStack.peek ()).intValue ()) {
case 1:
this.handleInitialState (elementName, attributes);
break;
case 2:
this.handleBundleState (elementName, attributes);
break;
case 5:
this.handleExtensionPointState (elementName);
break;
case 6:
case 10:
this.handleExtensionState (elementName, attributes);
break;
default:
this.stateStack.push ( new Integer (0));
if (!this.compatibilityMode) this.internalError (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_unknownTopElement, elementName));
}
}, "~S,~S,~S,org.xml.sax.Attributes");
Clazz.overrideMethod (c$, "warning", 
function (ex) {
this.logStatus (ex);
}, "org.xml.sax.SAXParseException");
Clazz.defineMethod (c$, "internalError", 
($fz = function (message) {
this.error ( new org.eclipse.core.runtime.Status (2, "org.eclipse.core.runtime", 1, message, null));
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "processingInstruction", 
function (target, data) {
if (target.equalsIgnoreCase ("eclipse")) {
this.schemaVersion = "3.0";
var tokenizer =  new java.util.StringTokenizer (data, "=\"");
while (tokenizer.hasMoreTokens ()) {
var token = tokenizer.nextToken ();
if (token.equalsIgnoreCase ("version")) {
if (!tokenizer.hasMoreTokens ()) {
break;
}this.schemaVersion = tokenizer.nextToken ();
break;
}}
}}, "~S,~S");
Clazz.defineMethod (c$, "error", 
function (error) {
this.status.add (error);
}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "translate", 
($fz = function (key) {
return org.eclipse.core.internal.runtime.ResourceTranslator.getResourceString (null, key, this.resources);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "fixRenamedExtensionPoints", 
($fz = function (extensions) {
if (extensions == null || (this.schemaVersion != null && this.schemaVersion.equals ("3.0")) || System.getProperties ().get ("eclipse.noExtensionMunging") != null) return extensions;
for (var i = 0; i < extensions.length; i++) {
var extension = extensions[i];
var oldPointId = extension.getExtensionPointIdentifier ();
var newPointId = org.eclipse.core.internal.registry.ExtensionsParser.extensionPointMap.get (oldPointId);
if (newPointId != null) {
extension.setExtensionPointIdentifier (newPointId);
}}
return extensions;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineStatics (c$,
"NO_EXTENSION_MUNGING", "eclipse.noExtensionMunging",
"extensionPointMap", null);
{
org.eclipse.core.internal.registry.ExtensionsParser.initializeExtensionPointMap ();
}Clazz.defineStatics (c$,
"cumulativeTime", 0,
"PARSE_PROBLEM", 1,
"PLUGIN", "plugin",
"PLUGIN_ID", "id",
"PLUGIN_NAME", "name",
"FRAGMENT", "fragment",
"BUNDLE_UID", "id",
"EXTENSION_POINT", "extension-point",
"EXTENSION_POINT_NAME", "name",
"EXTENSION_POINT_ID", "id",
"EXTENSION_POINT_SCHEMA", "schema",
"EXTENSION", "extension",
"EXTENSION_NAME", "name",
"EXTENSION_ID", "id",
"EXTENSION_TARGET", "point",
"ELEMENT", "element",
"ELEMENT_NAME", "name",
"ELEMENT_VALUE", "value",
"PROPERTY", "property",
"PROPERTY_NAME", "name",
"PROPERTY_VALUE", "value",
"IGNORED_ELEMENT_STATE", 0,
"INITIAL_STATE", 1,
"BUNDLE_STATE", 2,
"BUNDLE_EXTENSION_POINT_STATE", 5,
"BUNDLE_EXTENSION_STATE", 6,
"CONFIGURATION_ELEMENT_STATE", 10,
"EXTENSION_POINT_INDEX", 0,
"EXTENSION_INDEX", 1,
"LAST_INDEX", 1);
});
