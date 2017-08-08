Clazz.declarePackage ("java.util.regex");
Clazz.load (["java.lang.IllegalArgumentException"], "java.util.regex.PatternSyntaxException", null, function () {

(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util.regex, "PatternSyntaxException", IllegalArgumentException);

Clazz.newMethod$(C$, '$init$', function () {
this.desc = null;
this.pattern = null;
this.index = -1;
}, 1);

Clazz.newMethod$ (C$, 'construct$S$S$I', function (desc, pattern, index) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.desc = desc;
this.pattern = pattern;
this.index = index;
}, 1);

Clazz.newMethod$ (C$, 'getPattern', function () {
return this.pattern;
});

Clazz.newMethod$ (C$, 'getMessage', function () {
var s = this.desc;
if (this.index >= 0) {
s += " near index " + this.index;
}s += "\r\n" + this.pattern;
if (this.index >= 0) {
s += "\r\n";
for (var i = 0; i < this.index; i++) s += ' ';

s += '^';
}return s;
});

Clazz.newMethod$ (C$, 'getDescription', function () {
return this.desc;
});

Clazz.newMethod$ (C$, 'getIndex', function () {
return this.index;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-08 06:13:50
