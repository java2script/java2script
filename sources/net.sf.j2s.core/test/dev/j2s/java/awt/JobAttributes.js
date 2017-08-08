Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.AttributeValue"], "java.awt.JobAttributes", ["java.lang.IllegalArgumentException", "$.InternalError"], function () {
c$ = Clazz.decorateAsClass (function () {
this.copies = 0;
this.defaultSelection = null;
this.destination = null;
this.dialog = null;
this.fileName = null;
this.fromPage = 0;
this.maxPage = 0;
this.minPage = 0;
this.multipleDocumentHandling = null;
this.pageRanges = null;
this.prFirst = 0;
this.prLast = 0;
this.printer = null;
this.sides = null;
this.toPage = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "JobAttributes", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
this.setCopiesToDefault ();
this.setDefaultSelection (java.awt.JobAttributes.DefaultSelectionType.ALL);
this.setDestination (java.awt.JobAttributes.DestinationType.PRINTER);
this.setDialog (java.awt.JobAttributes.DialogType.NATIVE);
this.setMaxPage (2147483647);
this.setMinPage (1);
this.setMultipleDocumentHandlingToDefault ();
this.setSidesToDefault ();
});
Clazz.makeConstructor (c$, 
function (obj) {
this.set (obj);
}, "java.awt.JobAttributes");
Clazz.makeConstructor (c$, 
function (copies, defaultSelection, destination, dialog, fileName, maxPage, minPage, multipleDocumentHandling, pageRanges, printer, sides) {
this.setCopies (copies);
this.setDefaultSelection (defaultSelection);
this.setDestination (destination);
this.setDialog (dialog);
this.setFileName (fileName);
this.setMaxPage (maxPage);
this.setMinPage (minPage);
this.setMultipleDocumentHandling (multipleDocumentHandling);
this.setPageRanges (pageRanges);
this.setPrinter (printer);
this.setSides (sides);
}, "~N,java.awt.JobAttributes.DefaultSelectionType,java.awt.JobAttributes.DestinationType,java.awt.JobAttributes.DialogType,~S,~N,~N,java.awt.JobAttributes.MultipleDocumentHandlingType,~A,~S,java.awt.JobAttributes.SidesType");
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, java.awt.JobAttributes, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "set", 
function (obj) {
this.copies = obj.copies;
this.defaultSelection = obj.defaultSelection;
this.destination = obj.destination;
this.dialog = obj.dialog;
this.fileName = obj.fileName;
this.fromPage = obj.fromPage;
this.maxPage = obj.maxPage;
this.minPage = obj.minPage;
this.multipleDocumentHandling = obj.multipleDocumentHandling;
this.pageRanges = obj.pageRanges;
this.prFirst = obj.prFirst;
this.prLast = obj.prLast;
this.printer = obj.printer;
this.sides = obj.sides;
this.toPage = obj.toPage;
}, "java.awt.JobAttributes");
Clazz.defineMethod (c$, "getCopies", 
function () {
return this.copies;
});
Clazz.defineMethod (c$, "setCopies", 
function (copies) {
if (copies <= 0) {
throw  new IllegalArgumentException ("Invalid value for attribute copies");
}this.copies = copies;
}, "~N");
Clazz.defineMethod (c$, "setCopiesToDefault", 
function () {
this.setCopies (1);
});
Clazz.defineMethod (c$, "getDefaultSelection", 
function () {
return this.defaultSelection;
});
Clazz.defineMethod (c$, "setDefaultSelection", 
function (defaultSelection) {
if (defaultSelection == null) {
throw  new IllegalArgumentException ("Invalid value for attribute defaultSelection");
}this.defaultSelection = defaultSelection;
}, "java.awt.JobAttributes.DefaultSelectionType");
Clazz.defineMethod (c$, "getDestination", 
function () {
return this.destination;
});
Clazz.defineMethod (c$, "setDestination", 
function (destination) {
if (destination == null) {
throw  new IllegalArgumentException ("Invalid value for attribute destination");
}this.destination = destination;
}, "java.awt.JobAttributes.DestinationType");
Clazz.defineMethod (c$, "getDialog", 
function () {
return this.dialog;
});
Clazz.defineMethod (c$, "setDialog", 
function (dialog) {
if (dialog == null) {
throw  new IllegalArgumentException ("Invalid value for attribute dialog");
}this.dialog = dialog;
}, "java.awt.JobAttributes.DialogType");
Clazz.defineMethod (c$, "getFileName", 
function () {
return this.fileName;
});
Clazz.defineMethod (c$, "setFileName", 
function (fileName) {
this.fileName = fileName;
}, "~S");
Clazz.defineMethod (c$, "getFromPage", 
function () {
if (this.fromPage != 0) {
return this.fromPage;
} else if (this.toPage != 0) {
return this.getMinPage ();
} else if (this.pageRanges != null) {
return this.prFirst;
} else {
return this.getMinPage ();
}});
Clazz.defineMethod (c$, "setFromPage", 
function (fromPage) {
if (fromPage <= 0 || (this.toPage != 0 && fromPage > this.toPage) || fromPage < this.minPage || fromPage > this.maxPage) {
throw  new IllegalArgumentException ("Invalid value for attribute fromPage");
}this.fromPage = fromPage;
}, "~N");
Clazz.defineMethod (c$, "getMaxPage", 
function () {
return this.maxPage;
});
Clazz.defineMethod (c$, "setMaxPage", 
function (maxPage) {
if (maxPage <= 0 || maxPage < this.minPage) {
throw  new IllegalArgumentException ("Invalid value for attribute maxPage");
}this.maxPage = maxPage;
}, "~N");
Clazz.defineMethod (c$, "getMinPage", 
function () {
return this.minPage;
});
Clazz.defineMethod (c$, "setMinPage", 
function (minPage) {
if (minPage <= 0 || minPage > this.maxPage) {
throw  new IllegalArgumentException ("Invalid value for attribute minPage");
}this.minPage = minPage;
}, "~N");
Clazz.defineMethod (c$, "getMultipleDocumentHandling", 
function () {
return this.multipleDocumentHandling;
});
Clazz.defineMethod (c$, "setMultipleDocumentHandling", 
function (multipleDocumentHandling) {
if (multipleDocumentHandling == null) {
throw  new IllegalArgumentException ("Invalid value for attribute multipleDocumentHandling");
}this.multipleDocumentHandling = multipleDocumentHandling;
}, "java.awt.JobAttributes.MultipleDocumentHandlingType");
Clazz.defineMethod (c$, "setMultipleDocumentHandlingToDefault", 
function () {
this.setMultipleDocumentHandling (java.awt.JobAttributes.MultipleDocumentHandlingType.SEPARATE_DOCUMENTS_UNCOLLATED_COPIES);
});
Clazz.defineMethod (c$, "getPageRanges", 
function () {
if (this.pageRanges != null) {
var copy =  Clazz.newIntArray (this.pageRanges.length, 2, 0);
for (var i = 0; i < this.pageRanges.length; i++) {
copy[i][0] = this.pageRanges[i][0];
copy[i][1] = this.pageRanges[i][1];
}
return copy;
} else if (this.fromPage != 0 || this.toPage != 0) {
var fromPage = this.getFromPage ();
var toPage = this.getToPage ();
return  Clazz.newArray (-1, [ Clazz.newIntArray (-1, [fromPage, toPage])]);
} else {
var minPage = this.getMinPage ();
return  Clazz.newArray (-1, [ Clazz.newIntArray (-1, [minPage, minPage])]);
}});
Clazz.defineMethod (c$, "setPageRanges", 
function (pageRanges) {
var xcp = "Invalid value for attribute pageRanges";
var first = 0;
var last = 0;
if (pageRanges == null) {
throw  new IllegalArgumentException (xcp);
}for (var i = 0; i < pageRanges.length; i++) {
if (pageRanges[i] == null || pageRanges[i].length != 2 || pageRanges[i][0] <= last || pageRanges[i][1] < pageRanges[i][0]) {
throw  new IllegalArgumentException (xcp);
}last = pageRanges[i][1];
if (first == 0) {
first = pageRanges[i][0];
}}
if (first < this.minPage || last > this.maxPage) {
throw  new IllegalArgumentException (xcp);
}var copy =  Clazz.newIntArray (pageRanges.length, 2, 0);
for (var i = 0; i < pageRanges.length; i++) {
copy[i][0] = pageRanges[i][0];
copy[i][1] = pageRanges[i][1];
}
this.pageRanges = copy;
this.prFirst = first;
this.prLast = last;
}, "~A");
Clazz.defineMethod (c$, "getPrinter", 
function () {
return this.printer;
});
Clazz.defineMethod (c$, "setPrinter", 
function (printer) {
this.printer = printer;
}, "~S");
Clazz.defineMethod (c$, "getSides", 
function () {
return this.sides;
});
Clazz.defineMethod (c$, "setSides", 
function (sides) {
if (sides == null) {
throw  new IllegalArgumentException ("Invalid value for attribute sides");
}this.sides = sides;
}, "java.awt.JobAttributes.SidesType");
Clazz.defineMethod (c$, "setSidesToDefault", 
function () {
this.setSides (java.awt.JobAttributes.SidesType.ONE_SIDED);
});
Clazz.defineMethod (c$, "getToPage", 
function () {
if (this.toPage != 0) {
return this.toPage;
} else if (this.fromPage != 0) {
return this.fromPage;
} else if (this.pageRanges != null) {
return this.prLast;
} else {
return this.getMinPage ();
}});
Clazz.defineMethod (c$, "setToPage", 
function (toPage) {
if (toPage <= 0 || (this.fromPage != 0 && toPage < this.fromPage) || toPage < this.minPage || toPage > this.maxPage) {
throw  new IllegalArgumentException ("Invalid value for attribute toPage");
}this.toPage = toPage;
}, "~N");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, java.awt.JobAttributes))) {
return false;
}var rhs = obj;
if (this.fileName == null) {
if (rhs.fileName != null) {
return false;
}} else {
if (!this.fileName.equals (rhs.fileName)) {
return false;
}}if (this.pageRanges == null) {
if (rhs.pageRanges != null) {
return false;
}} else {
if (rhs.pageRanges == null || this.pageRanges.length != rhs.pageRanges.length) {
return false;
}for (var i = 0; i < this.pageRanges.length; i++) {
if (this.pageRanges[i][0] != rhs.pageRanges[i][0] || this.pageRanges[i][1] != rhs.pageRanges[i][1]) {
return false;
}}
}if (this.printer == null) {
if (rhs.printer != null) {
return false;
}} else {
if (!this.printer.equals (rhs.printer)) {
return false;
}}return (this.copies == rhs.copies && this.defaultSelection === rhs.defaultSelection && this.destination === rhs.destination && this.dialog === rhs.dialog && this.fromPage == rhs.fromPage && this.maxPage == rhs.maxPage && this.minPage == rhs.minPage && this.multipleDocumentHandling === rhs.multipleDocumentHandling && this.prFirst == rhs.prFirst && this.prLast == rhs.prLast && this.sides === rhs.sides && this.toPage == rhs.toPage);
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var rest = ((this.copies + this.fromPage + this.maxPage + this.minPage + this.prFirst + this.prLast + this.toPage) * 31) << 21;
if (this.pageRanges != null) {
var sum = 0;
for (var i = 0; i < this.pageRanges.length; i++) {
sum += this.pageRanges[i][0] + this.pageRanges[i][1];
}
rest ^= (sum * 31) << 11;
}if (this.fileName != null) {
rest ^= this.fileName.hashCode ();
}if (this.printer != null) {
rest ^= this.printer.hashCode ();
}return (this.defaultSelection.hashCode () << 6 ^ this.destination.hashCode () << 5 ^ this.dialog.hashCode () << 3 ^ this.multipleDocumentHandling.hashCode () << 2 ^ this.sides.hashCode () ^ rest);
});
Clazz.overrideMethod (c$, "toString", 
function () {
var pageRanges = this.getPageRanges ();
var prStr = "[";
var first = true;
for (var i = 0; i < pageRanges.length; i++) {
if (first) {
first = false;
} else {
prStr += ",";
}prStr += pageRanges[i][0] + ":" + pageRanges[i][1];
}
prStr += "]";
return "copies=" + this.getCopies () + ",defaultSelection=" + this.getDefaultSelection () + ",destination=" + this.getDestination () + ",dialog=" + this.getDialog () + ",fileName=" + this.getFileName () + ",fromPage=" + this.getFromPage () + ",maxPage=" + this.getMaxPage () + ",minPage=" + this.getMinPage () + ",multiple-document-handling=" + this.getMultipleDocumentHandling () + ",page-ranges=" + prStr + ",printer=" + this.getPrinter () + ",sides=" + this.getSides () + ",toPage=" + this.getToPage ();
});
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.JobAttributes, "DefaultSelectionType", java.awt.AttributeValue);
Clazz.makeConstructor (c$, 
 function (a) {
Clazz.superConstructor (this, java.awt.JobAttributes.DefaultSelectionType, [a, java.awt.JobAttributes.DefaultSelectionType.NAMES]);
}, "~N");
Clazz.defineStatics (c$,
"I_ALL", 0,
"I_RANGE", 1,
"I_SELECTION", 2,
"NAMES",  Clazz.newArray (-1, ["all", "range", "selection"]));
c$.ALL = c$.prototype.ALL =  new java.awt.JobAttributes.DefaultSelectionType (0);
c$.RANGE = c$.prototype.RANGE =  new java.awt.JobAttributes.DefaultSelectionType (1);
c$.SELECTION = c$.prototype.SELECTION =  new java.awt.JobAttributes.DefaultSelectionType (2);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.JobAttributes, "DestinationType", java.awt.AttributeValue);
Clazz.makeConstructor (c$, 
 function (a) {
Clazz.superConstructor (this, java.awt.JobAttributes.DestinationType, [a, java.awt.JobAttributes.DestinationType.NAMES]);
}, "~N");
Clazz.defineStatics (c$,
"I_FILE", 0,
"I_PRINTER", 1,
"NAMES",  Clazz.newArray (-1, ["file", "printer"]));
c$.FILE = c$.prototype.FILE =  new java.awt.JobAttributes.DestinationType (0);
c$.PRINTER = c$.prototype.PRINTER =  new java.awt.JobAttributes.DestinationType (1);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.JobAttributes, "DialogType", java.awt.AttributeValue);
Clazz.makeConstructor (c$, 
 function (a) {
Clazz.superConstructor (this, java.awt.JobAttributes.DialogType, [a, java.awt.JobAttributes.DialogType.NAMES]);
}, "~N");
Clazz.defineStatics (c$,
"I_COMMON", 0,
"I_NATIVE", 1,
"I_NONE", 2,
"NAMES",  Clazz.newArray (-1, ["common", "native", "none"]));
c$.COMMON = c$.prototype.COMMON =  new java.awt.JobAttributes.DialogType (0);
c$.NATIVE = c$.prototype.NATIVE =  new java.awt.JobAttributes.DialogType (1);
c$.NONE = c$.prototype.NONE =  new java.awt.JobAttributes.DialogType (2);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.JobAttributes, "MultipleDocumentHandlingType", java.awt.AttributeValue);
Clazz.makeConstructor (c$, 
 function (a) {
Clazz.superConstructor (this, java.awt.JobAttributes.MultipleDocumentHandlingType, [a, java.awt.JobAttributes.MultipleDocumentHandlingType.NAMES]);
}, "~N");
Clazz.defineStatics (c$,
"I_SEPARATE_DOCUMENTS_COLLATED_COPIES", 0,
"I_SEPARATE_DOCUMENTS_UNCOLLATED_COPIES", 1,
"NAMES",  Clazz.newArray (-1, ["separate-documents-collated-copies", "separate-documents-uncollated-copies"]));
c$.SEPARATE_DOCUMENTS_COLLATED_COPIES = c$.prototype.SEPARATE_DOCUMENTS_COLLATED_COPIES =  new java.awt.JobAttributes.MultipleDocumentHandlingType (0);
c$.SEPARATE_DOCUMENTS_UNCOLLATED_COPIES = c$.prototype.SEPARATE_DOCUMENTS_UNCOLLATED_COPIES =  new java.awt.JobAttributes.MultipleDocumentHandlingType (1);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.JobAttributes, "SidesType", java.awt.AttributeValue);
Clazz.makeConstructor (c$, 
 function (a) {
Clazz.superConstructor (this, java.awt.JobAttributes.SidesType, [a, java.awt.JobAttributes.SidesType.NAMES]);
}, "~N");
Clazz.defineStatics (c$,
"I_ONE_SIDED", 0,
"I_TWO_SIDED_LONG_EDGE", 1,
"I_TWO_SIDED_SHORT_EDGE", 2,
"NAMES",  Clazz.newArray (-1, ["one-sided", "two-sided-long-edge", "two-sided-short-edge"]));
c$.ONE_SIDED = c$.prototype.ONE_SIDED =  new java.awt.JobAttributes.SidesType (0);
c$.TWO_SIDED_LONG_EDGE = c$.prototype.TWO_SIDED_LONG_EDGE =  new java.awt.JobAttributes.SidesType (1);
c$.TWO_SIDED_SHORT_EDGE = c$.prototype.TWO_SIDED_SHORT_EDGE =  new java.awt.JobAttributes.SidesType (2);
c$ = Clazz.p0p ();
});
