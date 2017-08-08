Clazz.declarePackage ("java.text");
Clazz.load (["java.text.FieldPosition", "java.text.Format.FieldDelegate"], "java.text.DontCareFieldPosition", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.noDelegate = null;
Clazz.instantialize (this, arguments);
}, java.text, "DontCareFieldPosition", java.text.FieldPosition);
Clazz.prepareFields (c$, function () {
this.noDelegate = ((Clazz.isClassDefined ("java.text.DontCareFieldPosition$1") ? 0 : java.text.DontCareFieldPosition.$DontCareFieldPosition$1$ ()), Clazz.innerTypeInstance (java.text.DontCareFieldPosition$1, this, null));
});
Clazz.makeConstructor (c$, 
 function () {
Clazz.superConstructor (this, java.text.DontCareFieldPosition, [0]);
});
Clazz.overrideMethod (c$, "getFieldDelegate", 
function () {
return this.noDelegate;
});
c$.$DontCareFieldPosition$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (java.text, "DontCareFieldPosition$1", null, java.text.Format.FieldDelegate);
Clazz.defineMethod (c$, "formatted", 
function (attr, value, start, end, buffer) {
}, "java.text.Format.Field,~O,~N,~N,StringBuffer");
Clazz.defineMethod (c$, "formatted", 
function (fieldID, attr, value, start, end, buffer) {
}, "~N,java.text.Format.Field,~O,~N,~N,StringBuffer");
c$ = Clazz.p0p ();
};
c$.INSTANCE = c$.prototype.INSTANCE =  new java.text.DontCareFieldPosition ();
});
