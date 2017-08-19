Clazz.declarePackage ("java.util.regex");
Clazz.load (["java.util.regex.MatchResult"], "java.util.regex.Matcher_0", ["java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.NullPointerException", "$.StringBuffer"], function () {

(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util.regex, "Matcher_0", null, java.util.regex.MatchResult);

Clazz.newMethod$(C$, '$init$', function () {
this.pat = null;
this.string = null;
this.leftBound = -1;
this.rightBound = -1;
this.appendPos = 0;
this.replacement = null;
this.processedRepl = null;
this.replacementParts = null;
this.results = null;
}, 1);

Clazz.newMethod$(C$, 'appendReplacement$StringBuffer$S', function (sb, replacement) {
this.processedRepl = C$.prototype.processReplacement$S.apply(this, [replacement]);
sb.append$CharSequence (this.string.subSequence$I$I (this.appendPos, this.start ()));
sb.append$S (this.processedRepl);
this.appendPos = this.end ();
return this;
});

Clazz.newMethod$(C$, 'processReplacement$S', function (replacement) {
if (this.replacement != null && this.replacement.equals$O (replacement)) {
if (this.replacementParts == null) {
return this.processedRepl;
} else {
var sb = Clazz.$new(StringBuffer.construct,[]);
for (var i = 0; i < this.replacementParts.length; i++) {
sb.append$O (this.replacementParts[i]);
}
return sb.toString ();
}} else {
this.replacement = replacement;
var repl = replacement.toCharArray ();
var res = Clazz.$new(StringBuffer.construct,[]);
this.replacementParts = null;
var index = 0;
var replacementPos = 0;
var nextBackSlashed = false;
while (index < repl.length) {
if (repl[index] == '\\' && !nextBackSlashed) {
nextBackSlashed = true;
index++;
}if (nextBackSlashed) {
res.append$C (repl[index]);
nextBackSlashed = false;
} else {
if (repl[index] == '$') {
if (this.replacementParts == null) {
this.replacementParts =  Clazz.newArray$(java.lang.Object, [0]);
}try {
var gr = Integer.parseInt ( String.instantialize(repl, ++index, 1));
if (replacementPos != res.length ()) {
this.replacementParts[this.replacementParts.length] = res.subSequence$I$I (replacementPos, res.length ());
replacementPos = res.length ();
}this.replacementParts[this.replacementParts.length] = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.regex, "Matcher_0$1");

Clazz.newMethod$(C$, '$init$', function () {
this.grN = this.$finals.gr;
}, 1);

Clazz.newMethod$(C$, 'toString', function () {
return this.b$["java.util.regex.Matcher_0"].group$I (this.grN);
});
})()
), Clazz.$new(java.util.regex.Matcher_0$1.$init$, [this, {gr: gr}]));
var group = this.group$I (gr);
replacementPos += group.length;
res.append$S (group);
} catch (e$$) {
if (Clazz.exceptionOf(e$$, IndexOutOfBoundsException)){
var iob = e$$;
{
throw iob;
}
} else if (Clazz.exceptionOf(e$$, Exception)){
var e = e$$;
{
throw Clazz.$new(IllegalArgumentException.construct$S,["Illegal regular expression format"]);
}
} else {
throw e$$;
}
}
} else {
res.append$C (repl[index]);
}}index++;
}
if (this.replacementParts != null && replacementPos != res.length ()) {
this.replacementParts[this.replacementParts.length] = res.subSequence$I$I (replacementPos, res.length ());
}return res.toString ();
}});

Clazz.newMethod$(C$, 'reset$CharSequence', function (newSequence) {
if (newSequence == null) {
throw Clazz.$new(NullPointerException.construct$S,["Empty new sequence!"]);
}this.string = newSequence;
return this.reset ();
});

Clazz.newMethod$(C$, 'reset', function () {
this.leftBound = 0;
this.rightBound = this.string.length;
this.appendPos = 0;
this.replacement = null;
{
var flags = "" + (this.pat.regexp.ignoreCase ? "i" : "")
+ (this.pat.regexp.global ? "g" : "")
+ (this.pat.regexp.multiline ? "m" : "");
this.pat.regexp = new RegExp (this.pat.regexp.source, flags);
}return this;
});

Clazz.newMethod$(C$, 'region$I$I', function (leftBound, rightBound) {
if (leftBound > rightBound || leftBound < 0 || rightBound < 0 || leftBound > this.string.length || rightBound > this.string.length) {
throw Clazz.$new(IndexOutOfBoundsException.construct$S,[leftBound + " is out of bound of " + rightBound]);
}this.leftBound = leftBound;
this.rightBound = rightBound;
this.results = null;
this.appendPos = 0;
this.replacement = null;
return this;
});

Clazz.newMethod$(C$, 'appendTail$StringBuffer', function (sb) {
return sb.append$CharSequence (this.string.subSequence$I$I (this.appendPos, this.string.length));
});

Clazz.newMethod$(C$, 'replaceFirst$S', function (replacement) {
this.reset ();
if (this.find ()) {
var sb = Clazz.$new(StringBuffer.construct,[]);
this.appendReplacement$StringBuffer$S (sb, replacement);
return this.appendTail$StringBuffer (sb).toString ();
}return this.string.toString ();
});

Clazz.newMethod$(C$, 'replaceAll$S', function (replacement) {
var sb = Clazz.$new(StringBuffer.construct,[]);
this.reset ();
while (this.find ()) {
this.appendReplacement$StringBuffer$S (sb, replacement);
}
return this.appendTail$StringBuffer (sb).toString ();
});

Clazz.newMethod$(C$, 'pattern', function () {
return this.pat;
});

Clazz.newMethod$(C$, 'group$I', function (groupIndex) {
if (this.results == null || groupIndex < 0 || groupIndex > this.results.length) {
return null;
}return this.results[groupIndex];
});

Clazz.newMethod$(C$, 'group', function () {
return this.group$I (0);
});

Clazz.newMethod$(C$, 'find$I', function (startIndex) {
var stringLength = this.string.length;
if (startIndex < 0 || startIndex > stringLength) throw Clazz.$new(IndexOutOfBoundsException.construct$S,["Out of bound " + startIndex]);
startIndex = C$.prototype.findAt$I.apply(this, [startIndex]);
return false;
});

Clazz.newMethod$(C$, 'findAt$I', function (startIndex) {
return -1;
});

Clazz.newMethod$(C$, 'find', function () {
{
this.results = this.pat.regexp.exec (this.string.subSequence(this.leftBound, this.rightBound));
}return (this.results != null);
});

Clazz.newMethod$(C$, 'start$I', function (groupIndex) {
var beginningIndex = 0;
{
beginningIndex = this.pat.regexp.lastIndex;
}beginningIndex -= this.results[0].length;
return beginningIndex;
});

Clazz.newMethod$(C$, 'end$I', function (groupIndex) {
{
return this.pat.regexp.lastIndex;
}return -1;
});

Clazz.newMethod$(C$, 'matches', function () {
{
Object regexp = this.pat.regexp;
int oldLastIndex = regexp.lastIndex;
try {
this.find();
String[] r = this.results;
return r != null && r.length > 0 && r[0].length() == r.input.length();
} finally {
// Restore the old state of the RE object
regexp.lastIndex = oldLastIndex;
}
}return this.find ();
});

Clazz.newMethod$(C$, 'quoteReplacement$S', function (string) {
if (string.indexOf$I ('\\') < 0 && string.indexOf$I ('$') < 0) return string;
var res = Clazz.$new(StringBuffer.construct$I,[string.length * 2]);
var ch;
var len = string.length;
for (var i = 0; i < len; i++) {
switch (ch = string.charAt$I (i)) {
case '$':
res.append$C ('\\');
res.append$C ('$');
break;
case '\\':
res.append$C ('\\');
res.append$C ('\\');
break;
default:
res.append$C (ch);
}
}
return res.toString ();
}, 1);

Clazz.newMethod$(C$, 'lookingAt', function () {
return false;
});

Clazz.newMethod$(C$, 'start', function () {
return this.start$I (0);
});

Clazz.newMethod$(C$, 'groupCount', function () {
return this.results == null ? 0 : this.results.length;
});

Clazz.newMethod$(C$, 'end', function () {
return this.end$I (0);
});

Clazz.newMethod$(C$, 'toMatchResult', function () {
return this;
});

Clazz.newMethod$(C$, 'useAnchoringBounds$Z', function (value) {
return this;
});

Clazz.newMethod$(C$, 'hasAnchoringBounds', function () {
return false;
});

Clazz.newMethod$(C$, 'useTransparentBounds$Z', function (value) {
return this;
});

Clazz.newMethod$(C$, 'hasTransparentBounds', function () {
return false;
});

Clazz.newMethod$(C$, 'regionStart', function () {
return this.leftBound;
});

Clazz.newMethod$(C$, 'regionEnd', function () {
return this.rightBound;
});

Clazz.newMethod$(C$, 'requireEnd', function () {
return false;
});

Clazz.newMethod$(C$, 'hitEnd', function () {
return false;
});

Clazz.newMethod$(C$, 'usePattern$java_util_regex_Pattern_0', function (pat) {
if (pat == null) {
throw Clazz.$new(IllegalArgumentException.construct$S,["Empty pattern!"]);
}this.pat = pat;
this.results = null;
return this;
});

Clazz.newMethod$(C$, 'construct$java_util_regex_Pattern_0$CharSequence', function (pat, cs) {
C$.$init$.apply(this);
this.pat = pat;
this.string = cs;
this.leftBound = 0;
this.rightBound = this.string.toString ().length;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
Clazz.defineStatics$ (C$, ["MODE_FIND", 1,
"MODE_MATCH", 2
]);
})()
});

//Created 2017-08-18 22:18:05
