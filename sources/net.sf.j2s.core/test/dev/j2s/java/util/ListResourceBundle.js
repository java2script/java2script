Clazz.load (["java.util.ResourceBundle"], "java.util.ListResourceBundle", ["java.util.Enumeration", "$.Hashtable"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "ListResourceBundle", java.util.ResourceBundle);

Clazz.newMethod$(C$, '$init$', function () {
this.table = null;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'getKeys', function () {
if (this.table == null) {
C$.prototype.initializeTable.apply(this, []);
}if (this.parent == null) {
return this.table.keys ();
}return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "ListResourceBundle$1", null, java.util.Enumeration);

Clazz.newMethod$(C$, '$init$', function () {
this.local = this.b$["java.util.ListResourceBundle"].table.keys ();
this.pEnum = this.b$["java.util.ListResourceBundle"].parent.getKeys ();
this.$nextElement = null;
}, 1);

Clazz.newMethod$ (C$, 'findNext', function () {
if (this.$nextElement != null) {
return true;
}while (this.pEnum.hasMoreElements ()) {
var next = this.pEnum.nextElement ();
if (!this.b$["java.util.ListResourceBundle"].table.containsKey$O (next)) {
this.$nextElement = next;
return true;
}}
return false;
});

Clazz.newMethod$ (C$, 'hasMoreElements', function () {
if (this.local.hasMoreElements ()) {
return true;
}return C$.prototype.findNext.apply(this, []);
});

Clazz.newMethod$ (C$, 'nextElement', function () {
if (this.local.hasMoreElements ()) {
return this.local.nextElement ();
}if (C$.prototype.findNext.apply(this, [])) {
var result = this.$nextElement;
this.$nextElement = null;
return result;
}return this.pEnum.nextElement ();
});
})()
), Clazz.$new(java.util.ListResourceBundle$1.$init$, [this, null]));
});

Clazz.newMethod$ (C$, 'handleGetObject$S', function (key) {
if (this.table == null) {
C$.prototype.initializeTable.apply(this, []);
}return this.table.get$O (key);
});

Clazz.newMethod$ (C$, 'initializeTable', function () {
if (this.table == null) {
var contents = this.getContents ();
this.table = Clazz.$new(java.util.Hashtable.construct$I,[Clazz.doubleToInt (contents.length / 3) * 4 + 3]);
for (var i = 0; i < contents.length; i++) {
this.table.put$S$O (contents[i][0], contents[i][1]);
}
}});
})()
});

//Created 2017-08-12 07:32:20
