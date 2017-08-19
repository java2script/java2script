Clazz.load (["java.util.Enumeration"], "java.util.StringTokenizer", ["java.lang.NullPointerException", "java.util.NoSuchElementException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "StringTokenizer", null, java.util.Enumeration);

Clazz.newMethod$(C$, '$init$', function () {
this.string = null;
this.delimiters = null;
this.returnDelimiters = false;
this.position = 0;
}, 1);

Clazz.newMethod$(C$, 'construct$S', function (string) {
C$.construct$S$S$Z.apply(this, [string, " \t\n\r\f", false]);
}, 1);

Clazz.newMethod$(C$, 'construct$S$S', function (string, delimiters) {
C$.construct$S$S$Z.apply(this, [string, delimiters, false]);
}, 1);

Clazz.newMethod$(C$, 'construct$S$S$Z', function (string, delimiters, returnDelimiters) {
C$.$init$.apply(this);
if (string != null) {
this.string = string;
this.delimiters = delimiters;
this.returnDelimiters = returnDelimiters;
this.position = 0;
} else throw Clazz.$new(NullPointerException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'countTokens', function () {
var count = 0;
var inToken = false;
for (var i = this.position, length = this.string.length; i < length; i++) {
if (this.delimiters.indexOf$I$I (this.string.charAt$I (i), 0) >= 0) {
if (this.returnDelimiters) count++;
if (inToken) {
count++;
inToken = false;
}} else {
inToken = true;
}}
if (inToken) count++;
return count;
});

Clazz.newMethod$(C$, 'hasMoreElements', function () {
return this.hasMoreTokens ();
});

Clazz.newMethod$(C$, 'hasMoreTokens', function () {
var length = this.string.length;
if (this.position < length) {
if (this.returnDelimiters) return true;
for (var i = this.position; i < length; i++) if (this.delimiters.indexOf$I$I (this.string.charAt$I (i), 0) == -1) return true;

}return false;
});

Clazz.newMethod$(C$, 'nextElement', function () {
return this.nextToken ();
});

Clazz.newMethod$(C$, 'nextToken', function () {
var i = this.position;
var length = this.string.length;
if (i < length) {
if (this.returnDelimiters) {
if (this.delimiters.indexOf$I$I (this.string.charAt$I (this.position), 0) >= 0) return String.valueOf$C (this.string.charAt$I (this.position++));
for (this.position++; this.position < length; this.position++) if (this.delimiters.indexOf$I$I (this.string.charAt$I (this.position), 0) >= 0) return this.string.substring$I$I (i, this.position);

return this.string.substring$I (i);
}while (i < length && this.delimiters.indexOf$I$I (this.string.charAt$I (i), 0) >= 0) i++;

this.position = i;
if (i < length) {
for (this.position++; this.position < length; this.position++) if (this.delimiters.indexOf$I$I (this.string.charAt$I (this.position), 0) >= 0) return this.string.substring$I$I (i, this.position);

return this.string.substring$I (i);
}}throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
});

Clazz.newMethod$(C$, 'nextToken$S', function (delims) {
this.delimiters = delims;
return this.nextToken ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-18 22:18:04
