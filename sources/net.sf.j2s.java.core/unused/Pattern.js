Clazz.declarePackage ("java.util.regex");
Clazz.load (null, "java.util.regex.Pattern", ["java.lang.IllegalArgumentException"], function () {
var c$ = Clazz.declareType (java.util.regex, "Pattern");
Clazz.makeConstructor (c$, 
function () {
});
c$.compile = Clazz.defineMethod (c$, "compile", 
function (regex, flags) {
if ((flags != 0) && ((flags | 2) != 2)) {
throw  new IllegalArgumentException ("Illegal flags");
}var flagStr = "g";
if ((flags & 2) != 0) {
flagStr += "i";
}var pattern =  new java.util.regex.Pattern ();
{
pattern.regexp = new RegExp(regex, flagStr);
}return pattern;
}, "~S,~N");
Clazz.defineMethod (c$, "matcher", 
function (cs) {
return  new java.util.regex.Pattern.Matcher (this, cs.toString ());
}, "CharSequence");
/*if*/;(function(){
//Clazz.pu$h(self.c$);
var c$ = Clazz.decorateAsClass (function () {
this.pat = null;
this.strString = null;
this.leftBound = -1;
this.rightBound = -1;
this.results = null;
Clazz.instantialize (this, arguments);
}, java.util.regex.Pattern, "Matcher");
Clazz.makeConstructor (c$, 
function (pat, cs) {
this.pat = pat;
this.strString = cs;
this.leftBound = 0;
this.rightBound = this.strString.length;
}, "java.util.regex.Pattern,~S");
Clazz.defineMethod (c$, "find", 
function () {
var s = (this.rightBound == this.strString.length ? this.strString : this.strString.substring (0, this.rightBound));
var lb = this.leftBound;
{
this.pat.regexp.lastIndex = this.leftBound;
this.results = this.pat.regexp.exec(s);
this.leftBound = this.pat.regexp.lastIndex;
}return (this.results != null);
});
Clazz.defineMethod (c$, "start", 
function () {
{
return this.pat.regexp.lastIndex - this.results[0].length;
}});
Clazz.defineMethod (c$, "end", 
function () {
{
return this.pat.regexp.lastIndex;
}});
Clazz.defineMethod (c$, "group", 
function () {
if (this.results == null || this.results.length == 0) {
return null;
}return this.results[0];
});
/*eoif*/})();
//c$ = Clazz.p0p ();
});
;//5.0.1-v1 Fri Nov 17 11:36:16 CST 2023
