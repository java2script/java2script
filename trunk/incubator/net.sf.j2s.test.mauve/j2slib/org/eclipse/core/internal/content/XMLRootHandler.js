Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["org.xml.sax.SAXException", "org.xml.sax.ext.LexicalHandler", "org.xml.sax.helpers.DefaultHandler"], "org.eclipse.core.internal.content.XMLRootHandler", ["java.io.StringReader", "org.eclipse.core.internal.runtime.InternalPlatform", "org.xml.sax.InputSource"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.XMLRootHandler.StopParsingException")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content.XMLRootHandler, "StopParsingException", org.xml.sax.SAXException);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.core.internal.content.XMLRootHandler.StopParsingException, [Clazz.castNullAs ("String")]);
});
c$ = Clazz.p0p ();
}
this.checkRoot = false;
this.dtdFound = null;
this.elementFound = null;
this.factory = null;
this.factoryFailed = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "XMLRootHandler", org.xml.sax.helpers.DefaultHandler, org.xml.sax.ext.LexicalHandler);
Clazz.makeConstructor (c$, 
function (checkRoot) {
Clazz.superConstructor (this, org.eclipse.core.internal.content.XMLRootHandler, []);
this.checkRoot = checkRoot;
}, "~B");
Clazz.overrideMethod (c$, "comment", 
function (ch, start, length) {
}, "~A,~N,~N");
Clazz.defineMethod (c$, "createParser", 
($fz = function (parserFactory) {
var parser = parserFactory.newSAXParser ();
var reader = parser.getXMLReader ();
reader.setProperty ("http://xml.org/sax/properties/lexical-handler", this);
try {
reader.setFeature ("http://xml.org/sax/features/validation", false);
reader.setFeature ("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
} catch (e$$) {
if (Clazz.instanceOf (e$$, org.xml.sax.SAXNotRecognizedException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, org.xml.sax.SAXNotSupportedException)) {
var e = e$$;
{
}
} else {
throw e$$;
}
}
return parser;
}, $fz.isPrivate = true, $fz), "javax.xml.parsers.SAXParserFactory");
Clazz.overrideMethod (c$, "endCDATA", 
function () {
});
Clazz.overrideMethod (c$, "endDTD", 
function () {
});
Clazz.overrideMethod (c$, "endEntity", 
function (name) {
}, "~S");
Clazz.defineMethod (c$, "getDTD", 
function () {
return this.dtdFound;
});
Clazz.defineMethod (c$, "getFactory", 
($fz = function () {
{
if (this.factoryFailed) return null;
if (this.factory != null) return this.factory;
var parserReference = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ().getServiceReference ("javax.xml.parsers.SAXParserFactory");
if (parserReference == null) return null;
this.factory = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ().getService (parserReference);
if (this.factory == null) return null;
this.factory.setNamespaceAware (true);
}return this.factory;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getRootName", 
function () {
return this.elementFound;
});
Clazz.defineMethod (c$, "parseContents", 
function (contents) {
try {
this.factory = this.getFactory ();
if (this.factory == null) return false;
var parser = this.createParser (this.factory);
contents.setSystemId ("/");
parser.parse (contents, this);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.internal.content.XMLRootHandler.StopParsingException)) {
} else {
throw e;
}
}
return true;
}, "org.xml.sax.InputSource");
Clazz.overrideMethod (c$, "resolveEntity", 
function (publicId, systemId) {
return  new org.xml.sax.InputSource ( new java.io.StringReader (""));
}, "~S,~S");
Clazz.overrideMethod (c$, "startCDATA", 
function () {
});
Clazz.overrideMethod (c$, "startDTD", 
function (name, publicId, systemId) {
this.dtdFound = systemId;
if (!this.checkRoot) throw Clazz.innerTypeInstance (org.eclipse.core.internal.content.XMLRootHandler.StopParsingException, this, null);
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "startElement", 
function (uri, elementName, qualifiedName, attributes) {
this.elementFound = elementName;
throw Clazz.innerTypeInstance (org.eclipse.core.internal.content.XMLRootHandler.StopParsingException, this, null);
}, "~S,~S,~S,org.xml.sax.Attributes");
Clazz.overrideMethod (c$, "startEntity", 
function (name) {
}, "~S");
});
