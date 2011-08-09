Clazz.declarePackage ("org.eclipse.core.runtime.content");
Clazz.load (["org.eclipse.core.runtime.QualifiedName"], "org.eclipse.core.runtime.content.IContentDescription", null, function () {
c$ = Clazz.declareInterface (org.eclipse.core.runtime.content, "IContentDescription");
c$.CHARSET = c$.prototype.CHARSET =  new org.eclipse.core.runtime.QualifiedName ("org.eclipse.core.runtime", "charset");
c$.BYTE_ORDER_MARK = c$.prototype.BYTE_ORDER_MARK =  new org.eclipse.core.runtime.QualifiedName ("org.eclipse.core.runtime", "bom");
Clazz.defineStatics (c$,
"ALL", null,
"BOM_UTF_8", [0xEF, 0xBB, 0xBF],
"BOM_UTF_16BE", [0xFE, 0xFF],
"BOM_UTF_16LE", [0xFF, 0xFE]);
});
