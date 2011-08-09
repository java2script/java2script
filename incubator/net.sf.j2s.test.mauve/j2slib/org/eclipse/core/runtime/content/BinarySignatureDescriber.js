Clazz.declarePackage ("org.eclipse.core.runtime.content");
Clazz.load (["org.eclipse.core.runtime.IExecutableExtension", "org.eclipse.core.runtime.content.IContentDescriber"], "org.eclipse.core.runtime.content.BinarySignatureDescriber", ["java.lang.Boolean", "$.Byte", "java.util.ArrayList", "$.StringTokenizer", "org.eclipse.core.internal.runtime.Messages", "org.eclipse.core.runtime.CoreException", "$.Status", "org.eclipse.core.runtime.content.XMLRootElementContentDescriber", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.signature = null;
this.offset = 0;
this.required = true;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.content, "BinarySignatureDescriber", null, [org.eclipse.core.runtime.content.IContentDescriber, org.eclipse.core.runtime.IExecutableExtension]);
Clazz.overrideMethod (c$, "describe", 
function (contents, description) {
var buffer =  Clazz.newArray (this.signature.length, 0);
var notValid = this.required ? 0 : 1;
if (contents.skip (this.offset) < this.offset) return notValid;
if (contents.read (buffer) != buffer.length) return notValid;
for (var i = 0; i < this.signature.length; i++) if (this.signature[i] != buffer[i]) return notValid;

return 2;
}, "java.io.InputStream,org.eclipse.core.runtime.content.IContentDescription");
Clazz.overrideMethod (c$, "getSupportedOptions", 
function () {
return  new Array (0);
});
Clazz.overrideMethod (c$, "setInitializationData", 
function (config, propertyName, data) {
try {
if (Clazz.instanceOf (data, String)) this.signature = org.eclipse.core.runtime.content.BinarySignatureDescriber.parseSignature (data);
 else if (Clazz.instanceOf (data, java.util.Hashtable)) {
var parameters = data;
if (!parameters.containsKey ("signature")) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.content_badInitializationData, org.eclipse.core.runtime.content.XMLRootElementContentDescriber.getName ());
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, null));
}this.signature = org.eclipse.core.runtime.content.BinarySignatureDescriber.parseSignature (parameters.get ("signature"));
if (parameters.containsKey ("offset")) this.offset = Integer.parseInt (parameters.get ("offset"));
if (parameters.containsKey (org.eclipse.core.runtime.content.BinarySignatureDescriber.REQUIRED)) this.required = Boolean.$valueOf (parameters.get (org.eclipse.core.runtime.content.BinarySignatureDescriber.REQUIRED)).booleanValue ();
}} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.content_badInitializationData, org.eclipse.core.runtime.content.BinarySignatureDescriber.getName ());
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, nfe));
} else {
throw nfe;
}
}
}, "org.eclipse.core.runtime.IConfigurationElement,~S,~O");
c$.parseSignature = Clazz.defineMethod (c$, "parseSignature", 
($fz = function (data) {
var bytes =  new java.util.ArrayList ();
var tokenizer =  new java.util.StringTokenizer (data, " \t\n\r\f,");
while (tokenizer.hasMoreTokens ()) bytes.add ( new Byte (Integer.parseInt (tokenizer.nextToken ().trim (), 16)));

var signature =  Clazz.newArray (bytes.size (), 0);
for (var i = 0; i < signature.length; i++) signature[i] = (bytes.get (i)).byteValue ();

return signature;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineStatics (c$,
"SIGNATURE", "signature",
"OFFSET", "offset",
"REQUIRED", "required");
});
