Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["org.eclipse.core.runtime.content.ITextContentDescriber", "$.IContentDescription"], "org.eclipse.core.internal.content.TextContentDescriber", null, function () {
c$ = Clazz.declareType (org.eclipse.core.internal.content, "TextContentDescriber", null, org.eclipse.core.runtime.content.ITextContentDescriber);
Clazz.defineMethod (c$, "describe", 
function (contents, description) {
return 1;
}, "java.io.Reader,org.eclipse.core.runtime.content.IContentDescription");
Clazz.defineMethod (c$, "describe", 
function (contents, description) {
if (description == null || !description.isRequested (org.eclipse.core.runtime.content.IContentDescription.BYTE_ORDER_MARK)) return 1;
var bom = this.getByteOrderMark (contents);
if (bom != null) description.setProperty (org.eclipse.core.runtime.content.IContentDescription.BYTE_ORDER_MARK, bom);
return 1;
}, "java.io.InputStream,org.eclipse.core.runtime.content.IContentDescription");
Clazz.overrideMethod (c$, "getSupportedOptions", 
function () {
return org.eclipse.core.internal.content.TextContentDescriber.SUPPORTED_OPTIONS;
});
Clazz.defineMethod (c$, "getByteOrderMark", 
function (input) {
var first = (input.read () & 0xFF);
var second = (input.read () & 0xFF);
if (first == -1 || second == -1) return null;
if (first == 0xFE && second == 0xFF) return org.eclipse.core.runtime.content.IContentDescription.BOM_UTF_16BE;
if (first == 0xFF && second == 0xFE) return org.eclipse.core.runtime.content.IContentDescription.BOM_UTF_16LE;
var third = (input.read () & 0xFF);
if (third == -1) return null;
if (first == 0xEF && second == 0xBB && third == 0xBF) return org.eclipse.core.runtime.content.IContentDescription.BOM_UTF_8;
return null;
}, "java.io.InputStream");
c$.SUPPORTED_OPTIONS = c$.prototype.SUPPORTED_OPTIONS = [org.eclipse.core.runtime.content.IContentDescription.BYTE_ORDER_MARK];
});
