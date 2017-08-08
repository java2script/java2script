Clazz.declarePackage ("java.awt.print");
Clazz.load (null, "java.awt.print.PrinterJob", ["java.awt.AWTError", "java.lang.NullPointerException", "java.security.AccessController", "$.PrivilegedAction", "java.awt.print.PageFormat"], function () {
c$ = Clazz.declareType (java.awt.print, "PrinterJob");
c$.getPrinterJob = Clazz.defineMethod (c$, "getPrinterJob", 
function () {
var security = System.getSecurityManager ();
if (security != null) {
security.checkPrintJobAccess ();
}return java.security.AccessController.doPrivileged (((Clazz.isClassDefined ("java.awt.print.PrinterJob$1") ? 0 : java.awt.print.PrinterJob.$PrinterJob$1$ ()), Clazz.innerTypeInstance (java.awt.print.PrinterJob$1, this, null)));
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "printDialog", 
function (attributes) {
if (attributes == null) {
throw  new NullPointerException ("attributes");
}return this.printDialog ();
}, "javax.print.attribute.PrintRequestAttributeSet");
Clazz.defineMethod (c$, "pageDialog", 
function (attributes) {
if (attributes == null) {
throw  new NullPointerException ("attributes");
}return this.pageDialog (this.defaultPage ());
}, "javax.print.attribute.PrintRequestAttributeSet");
Clazz.defineMethod (c$, "defaultPage", 
function () {
return this.defaultPage ( new java.awt.print.PageFormat ());
});
Clazz.defineMethod (c$, "getPageFormat", 
function (attributes) {
var pf = this.defaultPage ();
return pf;
}, "javax.print.attribute.PrintRequestAttributeSet");
Clazz.defineMethod (c$, "print", 
function (attributes) {
this.print ();
}, "javax.print.attribute.PrintRequestAttributeSet");
c$.$PrinterJob$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (java.awt.print, "PrinterJob$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
var nm = System.getProperty ("java.awt.printerjob", "swingjs.JSPrinterJob");
try {
return Clazz._4Name (nm).newInstance ();
} catch (e$$) {
if (Clazz.exceptionOf (e$$, ClassNotFoundException)) {
var e = e$$;
{
throw  new java.awt.AWTError ("PrinterJob not found: " + nm);
}
} else if (Clazz.exceptionOf (e$$, InstantiationException)) {
var e = e$$;
{
throw  new java.awt.AWTError ("Could not instantiate PrinterJob: " + nm);
}
} else if (Clazz.exceptionOf (e$$, IllegalAccessException)) {
var e = e$$;
{
throw  new java.awt.AWTError ("Could not access PrinterJob: " + nm);
}
} else {
throw e$$;
}
}
});
c$ = Clazz.p0p ();
};
});
