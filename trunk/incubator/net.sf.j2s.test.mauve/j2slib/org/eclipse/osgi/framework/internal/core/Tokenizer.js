Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
c$ = Clazz.decorateAsClass (function () {
this.value = null;
this.max = 0;
this.cursor = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "Tokenizer");
Clazz.makeConstructor (c$, 
function (value) {
this.value = value.toCharArray ();
this.max = this.value.length;
this.cursor = 0;
}, "~S");
Clazz.defineMethod (c$, "skipWhiteSpace", 
($fz = function () {
var val = this.value;
var cur = this.cursor;
for (; cur < this.max; cur++) {
var c = val[cur];
if (((c).charCodeAt (0) == (' ').charCodeAt (0)) || ((c).charCodeAt (0) == ('\t').charCodeAt (0)) || ((c).charCodeAt (0) == ('\n').charCodeAt (0)) || ((c).charCodeAt (0) == ('\r').charCodeAt (0))) {
continue ;}break;
}
this.cursor = cur;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getToken", 
function (terminals) {
this.skipWhiteSpace ();
var val = this.value;
var cur = this.cursor;
var begin = cur;
for (; cur < this.max; cur++) {
var c = val[cur];
if ((terminals.indexOf (c) != -1)) {
break;
}}
this.cursor = cur;
var count = cur - begin;
if (count > 0) {
this.skipWhiteSpace ();
while (count > 0 && ((val[begin + count - 1]).charCodeAt (0) == (' ').charCodeAt (0) || (val[begin + count - 1]).charCodeAt (0) == ('\t').charCodeAt (0))) count--;

return ( String.instantialize (val, begin, count));
}return (null);
}, "~S");
Clazz.defineMethod (c$, "getString", 
function (terminals) {
this.skipWhiteSpace ();
var val = this.value;
var cur = this.cursor;
if (cur < this.max) {
if ((val[cur]).charCodeAt (0) == ('\"').charCodeAt (0)) {
cur++;
var c = '\0';
var begin = cur;
for (; cur < this.max; cur++) {
c = val[cur];
if ((c).charCodeAt (0) == ('\"').charCodeAt (0)) {
break;
}}
var count = cur - begin;
if ((c).charCodeAt (0) == ('\"').charCodeAt (0)) {
cur++;
}this.cursor = cur;
if (count > 0) {
this.skipWhiteSpace ();
return ( String.instantialize (val, begin, count));
}} else {
var begin = cur;
for (; cur < this.max; cur++) {
var c = val[cur];
if ((c).charCodeAt (0) == ('\"').charCodeAt (0)) {
cur = cur + this.skipQuotedString (val, cur);
} else if ((terminals.indexOf (c) != -1)) {
break;
}}
this.cursor = cur;
var count = cur - begin;
if (count > 0) {
this.skipWhiteSpace ();
while (count > 0 && ((val[begin + count - 1]).charCodeAt (0) == (' ').charCodeAt (0) || (val[begin + count - 1]).charCodeAt (0) == ('\t').charCodeAt (0))) count--;

return ( String.instantialize (val, begin, count));
}}}return (null);
}, "~S");
Clazz.defineMethod (c$, "skipQuotedString", 
($fz = function (val, cur) {
cur++;
var c = '\0';
var begin = cur;
for (; cur < this.max; cur++) {
c = val[cur];
if ((c).charCodeAt (0) == ('\"').charCodeAt (0)) {
break;
}}
var count = cur - begin;
if ((c).charCodeAt (0) == ('\"').charCodeAt (0)) {
cur++;
}this.cursor = cur;
if (count > 0) {
this.skipWhiteSpace ();
}return count;
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "getChar", 
function () {
var cur = this.cursor;
if (cur < this.max) {
this.cursor = cur + 1;
return (this.value[cur]);
}return ('\0');
});
Clazz.defineMethod (c$, "hasMoreTokens", 
function () {
if (this.cursor < this.max) {
return true;
}return false;
});
