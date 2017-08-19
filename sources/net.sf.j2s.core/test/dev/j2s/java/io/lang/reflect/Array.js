Clazz.load (null, "java.lang.reflect.Array", ["java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.NullPointerException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.reflect, "Array");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'newInstance', function (componentType, length) {
return java.lang.reflect.Array.newArray (componentType, length);
}, 1);

Clazz.newMethod$(C$, 'newInstance', function (componentType, dimensions) {
return java.lang.reflect.Array.multiNewArray (componentType, dimensions);
}, 1);

Clazz.newMethod$(C$, 'getAval', function (array, index) {
java.lang.reflect.Array.checkArray (array, index, true);
return (array)[index];
}, 1);

Clazz.newMethod$(C$, 'checkArray', function (array, index, checkIndex) {
if (array == null) throw Clazz.$new(NullPointerException.construct,[]);
if (checkIndex && (index < 0 || index >= (array).length)) throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'getLength', function (array) {
java.lang.reflect.Array.checkArray (array, 0, false);
return (array).length;
}, 1);

Clazz.newMethod$(C$, 'get', function (array, index) {
var x = java.lang.reflect.Array.getAval (array, index);
{
switch (array.__ARRAYTYPE){ case "BA": return new Byte(x);
case "CA": return new Character(x); case "HA": return new Short(x); case "IA": return new Integer(x); case "JA":
return new Long(x); case "ZA": return (x ? Boolean.TRUE :
Boolean.FALSE); case "FA": return new Float(x); case "DA":
return new Double(x); } return x;
}}, 1);

Clazz.newMethod$(C$, 'getBoolean', function (array, index) {
var x = java.lang.reflect.Array.getAval (array, index);
var type = "";
var val = false;
{
type = array.__ARRAYTYPE; val = x;
}switch (type) {
case "ZA":
return val;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'getByte', function (array, index) {
var x = java.lang.reflect.Array.getAval (array, index);
var type = "";
var val = 0;
{
type = array.__ARRAYTYPE; val = x;
}switch (type) {
case "BA":
return val;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'getChar', function (array, index) {
var x = java.lang.reflect.Array.getAval (array, index);
var type = "";
var val = '\u0000';
{
type = array.__ARRAYTYPE; val = x;
}switch (type) {
case "CA":
return val;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'getShort', function (array, index) {
var x = java.lang.reflect.Array.getAval (array, index);
var type = "";
var val = 0;
{
type = array.__ARRAYTYPE; val = x;
}switch (type) {
case "BA":
case "HA":
return val;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'getInt', function (array, index) {
var x = java.lang.reflect.Array.getAval (array, index);
var type = "";
var val = 0;
{
type = array.__ARRAYTYPE; val = x;
}switch (type) {
case "BA":
case "HA":
case "IA":
return val;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'getLong', function (array, index) {
var x = java.lang.reflect.Array.getAval (array, index);
var type = "";
var val = 0;
{
type = array.__ARRAYTYPE; val = x;
}switch (type) {
case "BA":
case "HA":
case "IA":
case "JA":
return val;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'getFloat', function (array, index) {
var x = java.lang.reflect.Array.getAval (array, index);
var type = "";
var val = 0;
{
type = array.__ARRAYTYPE; val = x;
}switch (type) {
case "BA":
case "HA":
case "IA":
case "JA":
case "FA":
return val;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'getDouble', function (array, index) {
var x = java.lang.reflect.Array.getAval (array, index);
var type = "";
var val = 0;
{
type = array.__ARRAYTYPE; val = x;
}switch (type) {
case "BA":
case "HA":
case "IA":
case "JA":
case "FA":
case "DA":
return val;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'set', function (array, index, value) {
java.lang.reflect.Array.checkArray (array, index, true);
var type = "";
{
type = array.__ARRAYTYPE;
}try {
switch (type) {
case "BA":
(array)[index] = (value).byteValue ();
return;
case "CA":
(array)[index] = (value).charValue ();
return;
case "HA":
(array)[index] = (value).shortValue ();
return;
case "IA":
(array)[index] = (value).intValue ();
return;
case "JA":
(array)[index] = (value).longValue ();
return;
case "ZA":
(array)[index] = (value).booleanValue ();
return;
case "FA":
(array)[index] = (value).floatValue ();
return;
case "DA":
(array)[index] = (value).doubleValue ();
return;
default:
{
(array)[index] = value;
}}
} catch (e) {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}
}, 1);

Clazz.newMethod$(C$, 'setBoolean', function (array, index, z) {
java.lang.reflect.Array.checkArray (array, index, true);
var type = "";
{
type = array.__ARRAYTYPE;
}switch (type) {
case "ZA":
(array)[index] = z;
return;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'setByte', function (array, index, b) {
var type = "";
{
type = array.__ARRAYTYPE;
}switch (type) {
case "BA":
case "HA":
case "IA":
case "JA":
case "FA":
case "DA":
(array)[index] = b;
return;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'setChar', function (array, index, c) {
var type = "";
{
type = array.__ARRAYTYPE;
}switch (type) {
case "CA":
(array)[index] = c;
return;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'setShort', function (array, index, s) {
var type = "";
{
type = array.__ARRAYTYPE;
}switch (type) {
case "HA":
case "IA":
case "JA":
case "FA":
case "DA":
(array)[index] = s;
return;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'setInt', function (array, index, i) {
var type = "";
{
type = array.__ARRAYTYPE;
}switch (type) {
case "IA":
case "JA":
case "FA":
case "DA":
(array)[index] = i;
return;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'setLong', function (array, index, l) {
var type = "";
{
type = array.__ARRAYTYPE;
}switch (type) {
case "JA":
case "FA":
case "DA":
(array)[index] = l;
return;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'setFloat', function (array, index, f) {
var type = "";
{
type = array.__ARRAYTYPE;
}switch (type) {
case "FA":
case "DA":
(array)[index] = f;
return;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'setDouble', function (array, index, d) {
var type = "";
{
type = array.__ARRAYTYPE;
}switch (type) {
case "DA":
(array)[index] = d;
return;
}
throw Clazz.$new(IllegalArgumentException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'newArray', function (componentType, length) {
{
return Clazz.newArray$(componentType, length);
}}, 1);

Clazz.newMethod$(C$, 'multiNewArray', function (componentType, dimensions) {
{
return Clazz.newArray$(componentType, dimensions);
}}, 1);
})()
});

//Created 2017-08-18 22:18:01
