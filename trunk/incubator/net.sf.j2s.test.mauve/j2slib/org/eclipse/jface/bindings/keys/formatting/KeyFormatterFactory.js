Clazz.declarePackage ("org.eclipse.jface.bindings.keys.formatting");
Clazz.load (["org.eclipse.jface.bindings.keys.formatting.EmacsKeyFormatter", "$.FormalKeyFormatter"], "org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory", ["java.lang.NullPointerException"], function () {
c$ = Clazz.declareType (org.eclipse.jface.bindings.keys.formatting, "KeyFormatterFactory");
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
return org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory.defaultKeyFormatter;
});
c$.getEmacsKeyFormatter = Clazz.defineMethod (c$, "getEmacsKeyFormatter", 
function () {
return org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory.EMACS_KEY_FORMATTER;
});
c$.getFormalKeyFormatter = Clazz.defineMethod (c$, "getFormalKeyFormatter", 
function () {
return org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory.FORMAL_KEY_FORMATTER;
});
c$.setDefault = Clazz.defineMethod (c$, "setDefault", 
function (defaultKeyFormatter) {
if (defaultKeyFormatter == null) throw  new NullPointerException ();
($t$ = org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory.defaultKeyFormatter = defaultKeyFormatter, org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory.prototype.defaultKeyFormatter = org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory.defaultKeyFormatter, $t$);
}, "org.eclipse.jface.bindings.keys.formatting.IKeyFormatter");
c$.FORMAL_KEY_FORMATTER = c$.prototype.FORMAL_KEY_FORMATTER =  new org.eclipse.jface.bindings.keys.formatting.FormalKeyFormatter ();
c$.EMACS_KEY_FORMATTER = c$.prototype.EMACS_KEY_FORMATTER =  new org.eclipse.jface.bindings.keys.formatting.EmacsKeyFormatter ();
c$.defaultKeyFormatter = c$.prototype.defaultKeyFormatter = org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory.FORMAL_KEY_FORMATTER;
});
