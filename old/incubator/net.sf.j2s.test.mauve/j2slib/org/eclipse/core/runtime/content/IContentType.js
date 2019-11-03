Clazz.declarePackage ("org.eclipse.core.runtime.content");
Clazz.load (["org.eclipse.core.runtime.content.IContentTypeSettings"], "org.eclipse.core.runtime.content.IContentType", null, function () {
c$ = Clazz.declareInterface (org.eclipse.core.runtime.content, "IContentType", org.eclipse.core.runtime.content.IContentTypeSettings);
Clazz.defineStatics (c$,
"IGNORE_PRE_DEFINED", 0x01,
"IGNORE_USER_DEFINED", 0x02,
"FILE_NAME_SPEC", 0x04,
"FILE_EXTENSION_SPEC", 0x08);
});
