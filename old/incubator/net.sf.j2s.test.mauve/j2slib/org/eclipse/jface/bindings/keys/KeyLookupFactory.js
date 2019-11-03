Clazz.declarePackage ("org.eclipse.jface.bindings.keys");
Clazz.load (["org.eclipse.jface.bindings.keys.SWTKeyLookup"], "org.eclipse.jface.bindings.keys.KeyLookupFactory", ["java.lang.NullPointerException"], function () {
c$ = Clazz.declareType (org.eclipse.jface.bindings.keys, "KeyLookupFactory");
c$.getSWTKeyLookup = Clazz.defineMethod (c$, "getSWTKeyLookup", 
function () {
return org.eclipse.jface.bindings.keys.KeyLookupFactory.SWT_KEY_LOOKUP;
});
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
return org.eclipse.jface.bindings.keys.KeyLookupFactory.defaultLookup;
});
c$.setDefault = Clazz.defineMethod (c$, "setDefault", 
function (defaultLookup) {
if (defaultLookup == null) throw  new NullPointerException ("The look-up must not be null");
($t$ = org.eclipse.jface.bindings.keys.KeyLookupFactory.defaultLookup = defaultLookup, org.eclipse.jface.bindings.keys.KeyLookupFactory.prototype.defaultLookup = org.eclipse.jface.bindings.keys.KeyLookupFactory.defaultLookup, $t$);
}, "org.eclipse.jface.bindings.keys.IKeyLookup");
c$.SWT_KEY_LOOKUP = c$.prototype.SWT_KEY_LOOKUP =  new org.eclipse.jface.bindings.keys.SWTKeyLookup ();
c$.defaultLookup = c$.prototype.defaultLookup = org.eclipse.jface.bindings.keys.KeyLookupFactory.SWT_KEY_LOOKUP;
});
