Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.AttributeValue"], "java.awt.PageAttributes", ["java.lang.IllegalArgumentException", "$.InternalError", "java.util.Locale"], function () {
c$ = Clazz.decorateAsClass (function () {
this.color = null;
this.media = null;
this.orientationRequested = null;
this.origin = null;
this.printQuality = null;
this.printerResolution = null;
Clazz.instantialize (this, arguments);
}, java.awt, "PageAttributes", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
this.setColor (java.awt.PageAttributes.ColorType.MONOCHROME);
this.setMediaToDefault ();
this.setOrientationRequestedToDefault ();
this.setOrigin (java.awt.PageAttributes.OriginType.PHYSICAL);
this.setPrintQualityToDefault ();
this.setPrinterResolutionToDefault ();
});
Clazz.makeConstructor (c$, 
function (obj) {
this.set (obj);
}, "java.awt.PageAttributes");
Clazz.makeConstructor (c$, 
function (color, media, orientationRequested, origin, printQuality, printerResolution) {
this.setColor (color);
this.setMedia (media);
this.setOrientationRequested (orientationRequested);
this.setOrigin (origin);
this.setPrintQuality (printQuality);
this.setPrinterResolution (printerResolution);
}, "java.awt.PageAttributes.ColorType,java.awt.PageAttributes.MediaType,java.awt.PageAttributes.OrientationRequestedType,java.awt.PageAttributes.OriginType,java.awt.PageAttributes.PrintQualityType,~A");
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, java.awt.PageAttributes, "clone", []);
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
this.color = obj.color;
this.media = obj.media;
this.orientationRequested = obj.orientationRequested;
this.origin = obj.origin;
this.printQuality = obj.printQuality;
this.printerResolution = obj.printerResolution;
}, "java.awt.PageAttributes");
Clazz.defineMethod (c$, "getColor", 
function () {
return this.color;
});
Clazz.defineMethod (c$, "setColor", 
function (color) {
if (color == null) {
throw  new IllegalArgumentException ("Invalid value for attribute color");
}this.color = color;
}, "java.awt.PageAttributes.ColorType");
Clazz.defineMethod (c$, "getMedia", 
function () {
return this.media;
});
Clazz.defineMethod (c$, "setMedia", 
function (media) {
if (media == null) {
throw  new IllegalArgumentException ("Invalid value for attribute media");
}this.media = media;
}, "java.awt.PageAttributes.MediaType");
Clazz.defineMethod (c$, "setMediaToDefault", 
function () {
var defaultCountry = java.util.Locale.getDefault ().getCountry ();
if (defaultCountry != null && (defaultCountry.equals (java.util.Locale.US.getCountry ()) || defaultCountry.equals (java.util.Locale.CANADA.getCountry ()))) {
this.setMedia (java.awt.PageAttributes.MediaType.NA_LETTER);
} else {
this.setMedia (java.awt.PageAttributes.MediaType.ISO_A4);
}});
Clazz.defineMethod (c$, "getOrientationRequested", 
function () {
return this.orientationRequested;
});
Clazz.defineMethod (c$, "setOrientationRequested", 
function (orientationRequested) {
if (orientationRequested == null) {
throw  new IllegalArgumentException ("Invalid value for attribute orientationRequested");
}this.orientationRequested = orientationRequested;
}, "java.awt.PageAttributes.OrientationRequestedType");
Clazz.defineMethod (c$, "setOrientationRequested", 
function (orientationRequested) {
switch (orientationRequested) {
case 3:
this.setOrientationRequested (java.awt.PageAttributes.OrientationRequestedType.PORTRAIT);
break;
case 4:
this.setOrientationRequested (java.awt.PageAttributes.OrientationRequestedType.LANDSCAPE);
break;
default:
this.setOrientationRequested (null);
break;
}
}, "~N");
Clazz.defineMethod (c$, "setOrientationRequestedToDefault", 
function () {
this.setOrientationRequested (java.awt.PageAttributes.OrientationRequestedType.PORTRAIT);
});
Clazz.defineMethod (c$, "getOrigin", 
function () {
return this.origin;
});
Clazz.defineMethod (c$, "setOrigin", 
function (origin) {
if (origin == null) {
throw  new IllegalArgumentException ("Invalid value for attribute origin");
}this.origin = origin;
}, "java.awt.PageAttributes.OriginType");
Clazz.defineMethod (c$, "getPrintQuality", 
function () {
return this.printQuality;
});
Clazz.defineMethod (c$, "setPrintQuality", 
function (printQuality) {
if (printQuality == null) {
throw  new IllegalArgumentException ("Invalid value for attribute printQuality");
}this.printQuality = printQuality;
}, "java.awt.PageAttributes.PrintQualityType");
Clazz.defineMethod (c$, "setPrintQuality", 
function (printQuality) {
switch (printQuality) {
case 3:
this.setPrintQuality (java.awt.PageAttributes.PrintQualityType.DRAFT);
break;
case 4:
this.setPrintQuality (java.awt.PageAttributes.PrintQualityType.NORMAL);
break;
case 5:
this.setPrintQuality (java.awt.PageAttributes.PrintQualityType.HIGH);
break;
default:
this.setPrintQuality (null);
break;
}
}, "~N");
Clazz.defineMethod (c$, "setPrintQualityToDefault", 
function () {
this.setPrintQuality (java.awt.PageAttributes.PrintQualityType.NORMAL);
});
Clazz.defineMethod (c$, "getPrinterResolution", 
function () {
var copy =  Clazz.newIntArray (3, 0);
copy[0] = this.printerResolution[0];
copy[1] = this.printerResolution[1];
copy[2] = this.printerResolution[2];
return copy;
});
Clazz.defineMethod (c$, "setPrinterResolution", 
function (printerResolution) {
if (printerResolution == null || printerResolution.length != 3 || printerResolution[0] <= 0 || printerResolution[1] <= 0 || (printerResolution[2] != 3 && printerResolution[2] != 4)) {
throw  new IllegalArgumentException ("Invalid value for attribute printerResolution");
}var copy =  Clazz.newIntArray (3, 0);
copy[0] = printerResolution[0];
copy[1] = printerResolution[1];
copy[2] = printerResolution[2];
this.printerResolution = copy;
}, "~A");
Clazz.defineMethod (c$, "setPrinterResolution", 
function (printerResolution) {
this.setPrinterResolution ( Clazz.newIntArray (-1, [printerResolution, printerResolution, 3]));
}, "~N");
Clazz.defineMethod (c$, "setPrinterResolutionToDefault", 
function () {
this.setPrinterResolution (72);
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, java.awt.PageAttributes))) {
return false;
}var rhs = obj;
return (this.color === rhs.color && this.media === rhs.media && this.orientationRequested === rhs.orientationRequested && this.origin === rhs.origin && this.printQuality === rhs.printQuality && this.printerResolution[0] == rhs.printerResolution[0] && this.printerResolution[1] == rhs.printerResolution[1] && this.printerResolution[2] == rhs.printerResolution[2]);
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return (this.color.hashCode () << 31 ^ this.media.hashCode () << 24 ^ this.orientationRequested.hashCode () << 23 ^ this.origin.hashCode () << 22 ^ this.printQuality.hashCode () << 20 ^ this.printerResolution[2] >> 2 << 19 ^ this.printerResolution[1] << 10 ^ this.printerResolution[0]);
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "color=" + this.getColor () + ",media=" + this.getMedia () + ",orientation-requested=" + this.getOrientationRequested () + ",origin=" + this.getOrigin () + ",print-quality=" + this.getPrintQuality () + ",printer-resolution=[" + this.printerResolution[0] + "," + this.printerResolution[1] + "," + this.printerResolution[2] + "]";
});
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.PageAttributes, "ColorType", java.awt.AttributeValue);
Clazz.makeConstructor (c$, 
 function (a) {
Clazz.superConstructor (this, java.awt.PageAttributes.ColorType, [a, java.awt.PageAttributes.ColorType.NAMES]);
}, "~N");
Clazz.defineStatics (c$,
"I_COLOR", 0,
"I_MONOCHROME", 1,
"NAMES",  Clazz.newArray (-1, ["color", "monochrome"]));
c$.COLOR = c$.prototype.COLOR =  new java.awt.PageAttributes.ColorType (0);
c$.MONOCHROME = c$.prototype.MONOCHROME =  new java.awt.PageAttributes.ColorType (1);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.PageAttributes, "MediaType", java.awt.AttributeValue);
Clazz.makeConstructor (c$, 
 function (a) {
Clazz.superConstructor (this, java.awt.PageAttributes.MediaType, [a, java.awt.PageAttributes.MediaType.NAMES]);
}, "~N");
Clazz.defineStatics (c$,
"I_ISO_4A0", 0,
"I_ISO_2A0", 1,
"I_ISO_A0", 2,
"I_ISO_A1", 3,
"I_ISO_A2", 4,
"I_ISO_A3", 5,
"I_ISO_A4", 6,
"I_ISO_A5", 7,
"I_ISO_A6", 8,
"I_ISO_A7", 9,
"I_ISO_A8", 10,
"I_ISO_A9", 11,
"I_ISO_A10", 12,
"I_ISO_B0", 13,
"I_ISO_B1", 14,
"I_ISO_B2", 15,
"I_ISO_B3", 16,
"I_ISO_B4", 17,
"I_ISO_B5", 18,
"I_ISO_B6", 19,
"I_ISO_B7", 20,
"I_ISO_B8", 21,
"I_ISO_B9", 22,
"I_ISO_B10", 23,
"I_JIS_B0", 24,
"I_JIS_B1", 25,
"I_JIS_B2", 26,
"I_JIS_B3", 27,
"I_JIS_B4", 28,
"I_JIS_B5", 29,
"I_JIS_B6", 30,
"I_JIS_B7", 31,
"I_JIS_B8", 32,
"I_JIS_B9", 33,
"I_JIS_B10", 34,
"I_ISO_C0", 35,
"I_ISO_C1", 36,
"I_ISO_C2", 37,
"I_ISO_C3", 38,
"I_ISO_C4", 39,
"I_ISO_C5", 40,
"I_ISO_C6", 41,
"I_ISO_C7", 42,
"I_ISO_C8", 43,
"I_ISO_C9", 44,
"I_ISO_C10", 45,
"I_ISO_DESIGNATED_LONG", 46,
"I_EXECUTIVE", 47,
"I_FOLIO", 48,
"I_INVOICE", 49,
"I_LEDGER", 50,
"I_NA_LETTER", 51,
"I_NA_LEGAL", 52,
"I_QUARTO", 53,
"I_A", 54,
"I_B", 55,
"I_C", 56,
"I_D", 57,
"I_E", 58,
"I_NA_10X15_ENVELOPE", 59,
"I_NA_10X14_ENVELOPE", 60,
"I_NA_10X13_ENVELOPE", 61,
"I_NA_9X12_ENVELOPE", 62,
"I_NA_9X11_ENVELOPE", 63,
"I_NA_7X9_ENVELOPE", 64,
"I_NA_6X9_ENVELOPE", 65,
"I_NA_NUMBER_9_ENVELOPE", 66,
"I_NA_NUMBER_10_ENVELOPE", 67,
"I_NA_NUMBER_11_ENVELOPE", 68,
"I_NA_NUMBER_12_ENVELOPE", 69,
"I_NA_NUMBER_14_ENVELOPE", 70,
"I_INVITE_ENVELOPE", 71,
"I_ITALY_ENVELOPE", 72,
"I_MONARCH_ENVELOPE", 73,
"I_PERSONAL_ENVELOPE", 74,
"NAMES",  Clazz.newArray (-1, ["iso-4a0", "iso-2a0", "iso-a0", "iso-a1", "iso-a2", "iso-a3", "iso-a4", "iso-a5", "iso-a6", "iso-a7", "iso-a8", "iso-a9", "iso-a10", "iso-b0", "iso-b1", "iso-b2", "iso-b3", "iso-b4", "iso-b5", "iso-b6", "iso-b7", "iso-b8", "iso-b9", "iso-b10", "jis-b0", "jis-b1", "jis-b2", "jis-b3", "jis-b4", "jis-b5", "jis-b6", "jis-b7", "jis-b8", "jis-b9", "jis-b10", "iso-c0", "iso-c1", "iso-c2", "iso-c3", "iso-c4", "iso-c5", "iso-c6", "iso-c7", "iso-c8", "iso-c9", "iso-c10", "iso-designated-long", "executive", "folio", "invoice", "ledger", "na-letter", "na-legal", "quarto", "a", "b", "c", "d", "e", "na-10x15-envelope", "na-10x14-envelope", "na-10x13-envelope", "na-9x12-envelope", "na-9x11-envelope", "na-7x9-envelope", "na-6x9-envelope", "na-number-9-envelope", "na-number-10-envelope", "na-number-11-envelope", "na-number-12-envelope", "na-number-14-envelope", "invite-envelope", "italy-envelope", "monarch-envelope", "personal-envelope"]));
c$.ISO_4A0 = c$.prototype.ISO_4A0 =  new java.awt.PageAttributes.MediaType (0);
c$.ISO_2A0 = c$.prototype.ISO_2A0 =  new java.awt.PageAttributes.MediaType (1);
c$.ISO_A0 = c$.prototype.ISO_A0 =  new java.awt.PageAttributes.MediaType (2);
c$.ISO_A1 = c$.prototype.ISO_A1 =  new java.awt.PageAttributes.MediaType (3);
c$.ISO_A2 = c$.prototype.ISO_A2 =  new java.awt.PageAttributes.MediaType (4);
c$.ISO_A3 = c$.prototype.ISO_A3 =  new java.awt.PageAttributes.MediaType (5);
c$.ISO_A4 = c$.prototype.ISO_A4 =  new java.awt.PageAttributes.MediaType (6);
c$.ISO_A5 = c$.prototype.ISO_A5 =  new java.awt.PageAttributes.MediaType (7);
c$.ISO_A6 = c$.prototype.ISO_A6 =  new java.awt.PageAttributes.MediaType (8);
c$.ISO_A7 = c$.prototype.ISO_A7 =  new java.awt.PageAttributes.MediaType (9);
c$.ISO_A8 = c$.prototype.ISO_A8 =  new java.awt.PageAttributes.MediaType (10);
c$.ISO_A9 = c$.prototype.ISO_A9 =  new java.awt.PageAttributes.MediaType (11);
c$.ISO_A10 = c$.prototype.ISO_A10 =  new java.awt.PageAttributes.MediaType (12);
c$.ISO_B0 = c$.prototype.ISO_B0 =  new java.awt.PageAttributes.MediaType (13);
c$.ISO_B1 = c$.prototype.ISO_B1 =  new java.awt.PageAttributes.MediaType (14);
c$.ISO_B2 = c$.prototype.ISO_B2 =  new java.awt.PageAttributes.MediaType (15);
c$.ISO_B3 = c$.prototype.ISO_B3 =  new java.awt.PageAttributes.MediaType (16);
c$.ISO_B4 = c$.prototype.ISO_B4 =  new java.awt.PageAttributes.MediaType (17);
c$.ISO_B5 = c$.prototype.ISO_B5 =  new java.awt.PageAttributes.MediaType (18);
c$.ISO_B6 = c$.prototype.ISO_B6 =  new java.awt.PageAttributes.MediaType (19);
c$.ISO_B7 = c$.prototype.ISO_B7 =  new java.awt.PageAttributes.MediaType (20);
c$.ISO_B8 = c$.prototype.ISO_B8 =  new java.awt.PageAttributes.MediaType (21);
c$.ISO_B9 = c$.prototype.ISO_B9 =  new java.awt.PageAttributes.MediaType (22);
c$.ISO_B10 = c$.prototype.ISO_B10 =  new java.awt.PageAttributes.MediaType (23);
c$.JIS_B0 = c$.prototype.JIS_B0 =  new java.awt.PageAttributes.MediaType (24);
c$.JIS_B1 = c$.prototype.JIS_B1 =  new java.awt.PageAttributes.MediaType (25);
c$.JIS_B2 = c$.prototype.JIS_B2 =  new java.awt.PageAttributes.MediaType (26);
c$.JIS_B3 = c$.prototype.JIS_B3 =  new java.awt.PageAttributes.MediaType (27);
c$.JIS_B4 = c$.prototype.JIS_B4 =  new java.awt.PageAttributes.MediaType (28);
c$.JIS_B5 = c$.prototype.JIS_B5 =  new java.awt.PageAttributes.MediaType (29);
c$.JIS_B6 = c$.prototype.JIS_B6 =  new java.awt.PageAttributes.MediaType (30);
c$.JIS_B7 = c$.prototype.JIS_B7 =  new java.awt.PageAttributes.MediaType (31);
c$.JIS_B8 = c$.prototype.JIS_B8 =  new java.awt.PageAttributes.MediaType (32);
c$.JIS_B9 = c$.prototype.JIS_B9 =  new java.awt.PageAttributes.MediaType (33);
c$.JIS_B10 = c$.prototype.JIS_B10 =  new java.awt.PageAttributes.MediaType (34);
c$.ISO_C0 = c$.prototype.ISO_C0 =  new java.awt.PageAttributes.MediaType (35);
c$.ISO_C1 = c$.prototype.ISO_C1 =  new java.awt.PageAttributes.MediaType (36);
c$.ISO_C2 = c$.prototype.ISO_C2 =  new java.awt.PageAttributes.MediaType (37);
c$.ISO_C3 = c$.prototype.ISO_C3 =  new java.awt.PageAttributes.MediaType (38);
c$.ISO_C4 = c$.prototype.ISO_C4 =  new java.awt.PageAttributes.MediaType (39);
c$.ISO_C5 = c$.prototype.ISO_C5 =  new java.awt.PageAttributes.MediaType (40);
c$.ISO_C6 = c$.prototype.ISO_C6 =  new java.awt.PageAttributes.MediaType (41);
c$.ISO_C7 = c$.prototype.ISO_C7 =  new java.awt.PageAttributes.MediaType (42);
c$.ISO_C8 = c$.prototype.ISO_C8 =  new java.awt.PageAttributes.MediaType (43);
c$.ISO_C9 = c$.prototype.ISO_C9 =  new java.awt.PageAttributes.MediaType (44);
c$.ISO_C10 = c$.prototype.ISO_C10 =  new java.awt.PageAttributes.MediaType (45);
c$.ISO_DESIGNATED_LONG = c$.prototype.ISO_DESIGNATED_LONG =  new java.awt.PageAttributes.MediaType (46);
c$.EXECUTIVE = c$.prototype.EXECUTIVE =  new java.awt.PageAttributes.MediaType (47);
c$.FOLIO = c$.prototype.FOLIO =  new java.awt.PageAttributes.MediaType (48);
c$.INVOICE = c$.prototype.INVOICE =  new java.awt.PageAttributes.MediaType (49);
c$.LEDGER = c$.prototype.LEDGER =  new java.awt.PageAttributes.MediaType (50);
c$.NA_LETTER = c$.prototype.NA_LETTER =  new java.awt.PageAttributes.MediaType (51);
c$.NA_LEGAL = c$.prototype.NA_LEGAL =  new java.awt.PageAttributes.MediaType (52);
c$.QUARTO = c$.prototype.QUARTO =  new java.awt.PageAttributes.MediaType (53);
c$.A = c$.prototype.A =  new java.awt.PageAttributes.MediaType (54);
c$.B = c$.prototype.B =  new java.awt.PageAttributes.MediaType (55);
c$.C = c$.prototype.C =  new java.awt.PageAttributes.MediaType (56);
c$.D = c$.prototype.D =  new java.awt.PageAttributes.MediaType (57);
c$.E = c$.prototype.E =  new java.awt.PageAttributes.MediaType (58);
c$.NA_10X15_ENVELOPE = c$.prototype.NA_10X15_ENVELOPE =  new java.awt.PageAttributes.MediaType (59);
c$.NA_10X14_ENVELOPE = c$.prototype.NA_10X14_ENVELOPE =  new java.awt.PageAttributes.MediaType (60);
c$.NA_10X13_ENVELOPE = c$.prototype.NA_10X13_ENVELOPE =  new java.awt.PageAttributes.MediaType (61);
c$.NA_9X12_ENVELOPE = c$.prototype.NA_9X12_ENVELOPE =  new java.awt.PageAttributes.MediaType (62);
c$.NA_9X11_ENVELOPE = c$.prototype.NA_9X11_ENVELOPE =  new java.awt.PageAttributes.MediaType (63);
c$.NA_7X9_ENVELOPE = c$.prototype.NA_7X9_ENVELOPE =  new java.awt.PageAttributes.MediaType (64);
c$.NA_6X9_ENVELOPE = c$.prototype.NA_6X9_ENVELOPE =  new java.awt.PageAttributes.MediaType (65);
c$.NA_NUMBER_9_ENVELOPE = c$.prototype.NA_NUMBER_9_ENVELOPE =  new java.awt.PageAttributes.MediaType (66);
c$.NA_NUMBER_10_ENVELOPE = c$.prototype.NA_NUMBER_10_ENVELOPE =  new java.awt.PageAttributes.MediaType (67);
c$.NA_NUMBER_11_ENVELOPE = c$.prototype.NA_NUMBER_11_ENVELOPE =  new java.awt.PageAttributes.MediaType (68);
c$.NA_NUMBER_12_ENVELOPE = c$.prototype.NA_NUMBER_12_ENVELOPE =  new java.awt.PageAttributes.MediaType (69);
c$.NA_NUMBER_14_ENVELOPE = c$.prototype.NA_NUMBER_14_ENVELOPE =  new java.awt.PageAttributes.MediaType (70);
c$.INVITE_ENVELOPE = c$.prototype.INVITE_ENVELOPE =  new java.awt.PageAttributes.MediaType (71);
c$.ITALY_ENVELOPE = c$.prototype.ITALY_ENVELOPE =  new java.awt.PageAttributes.MediaType (72);
c$.MONARCH_ENVELOPE = c$.prototype.MONARCH_ENVELOPE =  new java.awt.PageAttributes.MediaType (73);
c$.PERSONAL_ENVELOPE = c$.prototype.PERSONAL_ENVELOPE =  new java.awt.PageAttributes.MediaType (74);
c$.A0 = c$.prototype.A0 = java.awt.PageAttributes.MediaType.ISO_A0;
c$.A1 = c$.prototype.A1 = java.awt.PageAttributes.MediaType.ISO_A1;
c$.A2 = c$.prototype.A2 = java.awt.PageAttributes.MediaType.ISO_A2;
c$.A3 = c$.prototype.A3 = java.awt.PageAttributes.MediaType.ISO_A3;
c$.A4 = c$.prototype.A4 = java.awt.PageAttributes.MediaType.ISO_A4;
c$.A5 = c$.prototype.A5 = java.awt.PageAttributes.MediaType.ISO_A5;
c$.A6 = c$.prototype.A6 = java.awt.PageAttributes.MediaType.ISO_A6;
c$.A7 = c$.prototype.A7 = java.awt.PageAttributes.MediaType.ISO_A7;
c$.A8 = c$.prototype.A8 = java.awt.PageAttributes.MediaType.ISO_A8;
c$.A9 = c$.prototype.A9 = java.awt.PageAttributes.MediaType.ISO_A9;
c$.A10 = c$.prototype.A10 = java.awt.PageAttributes.MediaType.ISO_A10;
c$.B0 = c$.prototype.B0 = java.awt.PageAttributes.MediaType.ISO_B0;
c$.B1 = c$.prototype.B1 = java.awt.PageAttributes.MediaType.ISO_B1;
c$.B2 = c$.prototype.B2 = java.awt.PageAttributes.MediaType.ISO_B2;
c$.B3 = c$.prototype.B3 = java.awt.PageAttributes.MediaType.ISO_B3;
c$.B4 = c$.prototype.B4 = java.awt.PageAttributes.MediaType.ISO_B4;
c$.ISO_B4_ENVELOPE = c$.prototype.ISO_B4_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_B4;
c$.B5 = c$.prototype.B5 = java.awt.PageAttributes.MediaType.ISO_B5;
c$.ISO_B5_ENVELOPE = c$.prototype.ISO_B5_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_B5;
c$.B6 = c$.prototype.B6 = java.awt.PageAttributes.MediaType.ISO_B6;
c$.B7 = c$.prototype.B7 = java.awt.PageAttributes.MediaType.ISO_B7;
c$.B8 = c$.prototype.B8 = java.awt.PageAttributes.MediaType.ISO_B8;
c$.B9 = c$.prototype.B9 = java.awt.PageAttributes.MediaType.ISO_B9;
c$.B10 = c$.prototype.B10 = java.awt.PageAttributes.MediaType.ISO_B10;
c$.C0 = c$.prototype.C0 = java.awt.PageAttributes.MediaType.ISO_C0;
c$.ISO_C0_ENVELOPE = c$.prototype.ISO_C0_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_C0;
c$.C1 = c$.prototype.C1 = java.awt.PageAttributes.MediaType.ISO_C1;
c$.ISO_C1_ENVELOPE = c$.prototype.ISO_C1_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_C1;
c$.C2 = c$.prototype.C2 = java.awt.PageAttributes.MediaType.ISO_C2;
c$.ISO_C2_ENVELOPE = c$.prototype.ISO_C2_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_C2;
c$.C3 = c$.prototype.C3 = java.awt.PageAttributes.MediaType.ISO_C3;
c$.ISO_C3_ENVELOPE = c$.prototype.ISO_C3_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_C3;
c$.C4 = c$.prototype.C4 = java.awt.PageAttributes.MediaType.ISO_C4;
c$.ISO_C4_ENVELOPE = c$.prototype.ISO_C4_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_C4;
c$.C5 = c$.prototype.C5 = java.awt.PageAttributes.MediaType.ISO_C5;
c$.ISO_C5_ENVELOPE = c$.prototype.ISO_C5_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_C5;
c$.C6 = c$.prototype.C6 = java.awt.PageAttributes.MediaType.ISO_C6;
c$.ISO_C6_ENVELOPE = c$.prototype.ISO_C6_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_C6;
c$.C7 = c$.prototype.C7 = java.awt.PageAttributes.MediaType.ISO_C7;
c$.ISO_C7_ENVELOPE = c$.prototype.ISO_C7_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_C7;
c$.C8 = c$.prototype.C8 = java.awt.PageAttributes.MediaType.ISO_C8;
c$.ISO_C8_ENVELOPE = c$.prototype.ISO_C8_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_C8;
c$.C9 = c$.prototype.C9 = java.awt.PageAttributes.MediaType.ISO_C9;
c$.ISO_C9_ENVELOPE = c$.prototype.ISO_C9_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_C9;
c$.C10 = c$.prototype.C10 = java.awt.PageAttributes.MediaType.ISO_C10;
c$.ISO_C10_ENVELOPE = c$.prototype.ISO_C10_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_C10;
c$.ISO_DESIGNATED_LONG_ENVELOPE = c$.prototype.ISO_DESIGNATED_LONG_ENVELOPE = java.awt.PageAttributes.MediaType.ISO_DESIGNATED_LONG;
c$.STATEMENT = c$.prototype.STATEMENT = java.awt.PageAttributes.MediaType.INVOICE;
c$.TABLOID = c$.prototype.TABLOID = java.awt.PageAttributes.MediaType.LEDGER;
c$.LETTER = c$.prototype.LETTER = java.awt.PageAttributes.MediaType.NA_LETTER;
c$.NOTE = c$.prototype.NOTE = java.awt.PageAttributes.MediaType.NA_LETTER;
c$.LEGAL = c$.prototype.LEGAL = java.awt.PageAttributes.MediaType.NA_LEGAL;
c$.ENV_10X15 = c$.prototype.ENV_10X15 = java.awt.PageAttributes.MediaType.NA_10X15_ENVELOPE;
c$.ENV_10X14 = c$.prototype.ENV_10X14 = java.awt.PageAttributes.MediaType.NA_10X14_ENVELOPE;
c$.ENV_10X13 = c$.prototype.ENV_10X13 = java.awt.PageAttributes.MediaType.NA_10X13_ENVELOPE;
c$.ENV_9X12 = c$.prototype.ENV_9X12 = java.awt.PageAttributes.MediaType.NA_9X12_ENVELOPE;
c$.ENV_9X11 = c$.prototype.ENV_9X11 = java.awt.PageAttributes.MediaType.NA_9X11_ENVELOPE;
c$.ENV_7X9 = c$.prototype.ENV_7X9 = java.awt.PageAttributes.MediaType.NA_7X9_ENVELOPE;
c$.ENV_6X9 = c$.prototype.ENV_6X9 = java.awt.PageAttributes.MediaType.NA_6X9_ENVELOPE;
c$.ENV_9 = c$.prototype.ENV_9 = java.awt.PageAttributes.MediaType.NA_NUMBER_9_ENVELOPE;
c$.ENV_10 = c$.prototype.ENV_10 = java.awt.PageAttributes.MediaType.NA_NUMBER_10_ENVELOPE;
c$.ENV_11 = c$.prototype.ENV_11 = java.awt.PageAttributes.MediaType.NA_NUMBER_11_ENVELOPE;
c$.ENV_12 = c$.prototype.ENV_12 = java.awt.PageAttributes.MediaType.NA_NUMBER_12_ENVELOPE;
c$.ENV_14 = c$.prototype.ENV_14 = java.awt.PageAttributes.MediaType.NA_NUMBER_14_ENVELOPE;
c$.ENV_INVITE = c$.prototype.ENV_INVITE = java.awt.PageAttributes.MediaType.INVITE_ENVELOPE;
c$.ENV_ITALY = c$.prototype.ENV_ITALY = java.awt.PageAttributes.MediaType.ITALY_ENVELOPE;
c$.ENV_MONARCH = c$.prototype.ENV_MONARCH = java.awt.PageAttributes.MediaType.MONARCH_ENVELOPE;
c$.ENV_PERSONAL = c$.prototype.ENV_PERSONAL = java.awt.PageAttributes.MediaType.PERSONAL_ENVELOPE;
c$.INVITE = c$.prototype.INVITE = java.awt.PageAttributes.MediaType.INVITE_ENVELOPE;
c$.ITALY = c$.prototype.ITALY = java.awt.PageAttributes.MediaType.ITALY_ENVELOPE;
c$.MONARCH = c$.prototype.MONARCH = java.awt.PageAttributes.MediaType.MONARCH_ENVELOPE;
c$.PERSONAL = c$.prototype.PERSONAL = java.awt.PageAttributes.MediaType.PERSONAL_ENVELOPE;
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.PageAttributes, "OrientationRequestedType", java.awt.AttributeValue);
Clazz.makeConstructor (c$, 
 function (a) {
Clazz.superConstructor (this, java.awt.PageAttributes.OrientationRequestedType, [a, java.awt.PageAttributes.OrientationRequestedType.NAMES]);
}, "~N");
Clazz.defineStatics (c$,
"I_PORTRAIT", 0,
"I_LANDSCAPE", 1,
"NAMES",  Clazz.newArray (-1, ["portrait", "landscape"]));
c$.PORTRAIT = c$.prototype.PORTRAIT =  new java.awt.PageAttributes.OrientationRequestedType (0);
c$.LANDSCAPE = c$.prototype.LANDSCAPE =  new java.awt.PageAttributes.OrientationRequestedType (1);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.PageAttributes, "OriginType", java.awt.AttributeValue);
Clazz.makeConstructor (c$, 
 function (a) {
Clazz.superConstructor (this, java.awt.PageAttributes.OriginType, [a, java.awt.PageAttributes.OriginType.NAMES]);
}, "~N");
Clazz.defineStatics (c$,
"I_PHYSICAL", 0,
"I_PRINTABLE", 1,
"NAMES",  Clazz.newArray (-1, ["physical", "printable"]));
c$.PHYSICAL = c$.prototype.PHYSICAL =  new java.awt.PageAttributes.OriginType (0);
c$.PRINTABLE = c$.prototype.PRINTABLE =  new java.awt.PageAttributes.OriginType (1);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.PageAttributes, "PrintQualityType", java.awt.AttributeValue);
Clazz.makeConstructor (c$, 
 function (a) {
Clazz.superConstructor (this, java.awt.PageAttributes.PrintQualityType, [a, java.awt.PageAttributes.PrintQualityType.NAMES]);
}, "~N");
Clazz.defineStatics (c$,
"I_HIGH", 0,
"I_NORMAL", 1,
"I_DRAFT", 2,
"NAMES",  Clazz.newArray (-1, ["high", "normal", "draft"]));
c$.HIGH = c$.prototype.HIGH =  new java.awt.PageAttributes.PrintQualityType (0);
c$.NORMAL = c$.prototype.NORMAL =  new java.awt.PageAttributes.PrintQualityType (1);
c$.DRAFT = c$.prototype.DRAFT =  new java.awt.PageAttributes.PrintQualityType (2);
c$ = Clazz.p0p ();
});
