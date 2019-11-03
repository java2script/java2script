Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["org.eclipse.core.internal.content.TextContentDescriber", "org.eclipse.core.runtime.content.ITextContentDescriber", "$.IContentDescription"], "org.eclipse.core.internal.content.XMLContentDescriber", ["java.io.BufferedReader"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.content, "XMLContentDescriber", org.eclipse.core.internal.content.TextContentDescriber, org.eclipse.core.runtime.content.ITextContentDescriber);
Clazz.defineMethod (c$, "describe", 
function (input, description) {
var bom = this.getByteOrderMark (input);
var xmlDeclEncoding = "UTF-8";
input.reset ();
if (bom != null) {
if (bom === org.eclipse.core.runtime.content.IContentDescription.BOM_UTF_16BE) xmlDeclEncoding = "UTF-16BE";
 else if (bom === org.eclipse.core.runtime.content.IContentDescription.BOM_UTF_16LE) xmlDeclEncoding = "UTF-16LE";
input.skip (bom.length);
if (description != null && description.isRequested (org.eclipse.core.runtime.content.IContentDescription.BYTE_ORDER_MARK)) description.setProperty (org.eclipse.core.runtime.content.IContentDescription.BYTE_ORDER_MARK, bom);
}var xmlPrefixBytes = "<?xml ".getBytes (xmlDeclEncoding);
var prefix =  Clazz.newArray (xmlPrefixBytes.length, 0);
if (input.read (prefix) < prefix.length) return 1;
for (var i = 0; i < prefix.length; i++) if (prefix[i] != xmlPrefixBytes[i]) return 1;

if (description == null) return 2;
if (description.isRequested (org.eclipse.core.runtime.content.IContentDescription.CHARSET)) {
var fullXMLDecl = this.readFullXMLDecl (input, xmlDeclEncoding);
if (fullXMLDecl != null) {
var charset = this.getCharset (fullXMLDecl);
if (charset != null && !"UTF-8".equalsIgnoreCase (charset)) description.setProperty (org.eclipse.core.runtime.content.IContentDescription.CHARSET, this.getCharset (fullXMLDecl));
}}return 2;
}, "java.io.InputStream,org.eclipse.core.runtime.content.IContentDescription");
Clazz.defineMethod (c$, "readFullXMLDecl", 
($fz = function (input, unicodeEncoding) {
var xmlDecl =  Clazz.newArray (100, 0);
var c = 0;
var read = 0;
while (read < xmlDecl.length && (c = input.read ()) != -1 && c != ('?').charCodeAt (0)) xmlDecl[read++] = c;

return c == ('?').charCodeAt (0) ?  String.instantialize (xmlDecl, 0, read, unicodeEncoding) : null;
}, $fz.isPrivate = true, $fz), "java.io.InputStream,~S");
Clazz.defineMethod (c$, "describe", 
function (input, description) {
var reader =  new java.io.BufferedReader (input);
var line = reader.readLine ();
if (line == null) return 1;
if (!line.startsWith ("<?xml ")) return 1;
if (description == null) return 2;
if ((description.isRequested (org.eclipse.core.runtime.content.IContentDescription.CHARSET))) description.setProperty (org.eclipse.core.runtime.content.IContentDescription.CHARSET, this.getCharset (line));
return 2;
}, "java.io.Reader,org.eclipse.core.runtime.content.IContentDescription");
Clazz.defineMethod (c$, "getCharset", 
($fz = function (firstLine) {
var encodingPos = firstLine.indexOf ("encoding=");
if (encodingPos == -1) return null;
var quoteChar = '"';
var firstQuote = firstLine.indexOf (quoteChar, encodingPos);
if (firstQuote == -1) {
quoteChar = '\'';
firstQuote = firstLine.indexOf (quoteChar, encodingPos);
}if (firstQuote == -1 || firstLine.length == firstQuote - 1) return null;
var secondQuote = firstLine.indexOf (quoteChar, firstQuote + 1);
if (secondQuote == -1) return null;
return firstLine.substring (firstQuote + 1, secondQuote);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "getSupportedOptions", 
function () {
return org.eclipse.core.internal.content.XMLContentDescriber.$SUPPORTED_OPTIONS;
});
c$.$SUPPORTED_OPTIONS = c$.prototype.$SUPPORTED_OPTIONS = [org.eclipse.core.runtime.content.IContentDescription.CHARSET, org.eclipse.core.runtime.content.IContentDescription.BYTE_ORDER_MARK];
Clazz.defineStatics (c$,
"ENCODING", "encoding=",
"XML_PREFIX", "<?xml ");
});
