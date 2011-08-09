Clazz.declarePackage ("org.eclipse.core.runtime.content");
Clazz.load (["org.eclipse.core.internal.content.XMLContentDescriber", "org.eclipse.core.runtime.IExecutableExtension"], "org.eclipse.core.runtime.content.XMLRootElementContentDescriber", ["java.lang.RuntimeException", "org.eclipse.core.internal.content.XMLRootHandler", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.CoreException", "$.Status", "org.eclipse.osgi.util.NLS", "org.xml.sax.InputSource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dtdToFind = null;
this.elementToFind = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.content, "XMLRootElementContentDescriber", org.eclipse.core.internal.content.XMLContentDescriber, org.eclipse.core.runtime.IExecutableExtension);
Clazz.defineMethod (c$, "checkCriteria", 
($fz = function (contents) {
var xmlHandler =  new org.eclipse.core.internal.content.XMLRootHandler (this.elementToFind != null);
try {
if (!xmlHandler.parseContents (contents)) return 1;
} catch (e$$) {
if (Clazz.instanceOf (e$$, org.xml.sax.SAXException)) {
var e = e$$;
{
return 1;
}
} else if (Clazz.instanceOf (e$$, javax.xml.parsers.ParserConfigurationException)) {
var e = e$$;
{
var message = org.eclipse.core.internal.runtime.Messages.content_parserConfiguration;
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, e));
throw  new RuntimeException (message);
}
} else {
throw e$$;
}
}
if ((this.elementToFind != null) && (!this.elementToFind.equals (xmlHandler.getRootName ()))) return 1;
if ((this.dtdToFind != null) && (!this.dtdToFind.equals (xmlHandler.getDTD ()))) return 1;
return 2;
}, $fz.isPrivate = true, $fz), "org.xml.sax.InputSource");
Clazz.defineMethod (c$, "describe", 
function (contents, description) {
if (Clazz.superCall (this, org.eclipse.core.runtime.content.XMLRootElementContentDescriber, "describe", [contents, description]) == 0) return 0;
contents.reset ();
return this.checkCriteria ( new org.xml.sax.InputSource (contents));
}, "java.io.InputStream,org.eclipse.core.runtime.content.IContentDescription");
Clazz.defineMethod (c$, "describe", 
function (contents, description) {
if (Clazz.superCall (this, org.eclipse.core.runtime.content.XMLRootElementContentDescriber, "describe", [contents, description]) == 0) return 0;
contents.reset ();
return this.checkCriteria ( new org.xml.sax.InputSource (contents));
}, "java.io.Reader,org.eclipse.core.runtime.content.IContentDescription");
Clazz.overrideMethod (c$, "setInitializationData", 
function (config, propertyName, data) {
if (Clazz.instanceOf (data, String)) this.elementToFind = data;
 else if (Clazz.instanceOf (data, java.util.Hashtable)) {
var parameters = data;
this.dtdToFind = parameters.get ("dtd");
this.elementToFind = parameters.get ("element");
}if (this.dtdToFind == null && this.elementToFind == null) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.content_badInitializationData, org.eclipse.core.runtime.content.XMLRootElementContentDescriber.getName ());
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, null));
}}, "org.eclipse.core.runtime.IConfigurationElement,~S,~O");
Clazz.defineStatics (c$,
"DTD_TO_FIND", "dtd",
"ELEMENT_TO_FIND", "element");
});
