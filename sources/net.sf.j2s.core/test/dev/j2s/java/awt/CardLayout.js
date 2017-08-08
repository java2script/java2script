Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.LayoutManager2", "java.io.ObjectStreamField", "java.util.Hashtable", "$.Vector", "JU.Lst"], "java.awt.CardLayout", ["java.lang.IllegalArgumentException", "java.awt.Dimension"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vector = null;
if (!Clazz.isClassDefined ("java.awt.CardLayout.Card")) {
java.awt.CardLayout.$CardLayout$Card$ ();
}
this.currentCard = 0;
this.hgap = 0;
this.vgap = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "CardLayout", null, [java.awt.LayoutManager2, java.io.Serializable]);
Clazz.prepareFields (c$, function () {
this.vector =  new JU.Lst ();
});
Clazz.makeConstructor (c$, 
function () {
this.construct (0, 0);
});
Clazz.makeConstructor (c$, 
function (hgap, vgap) {
this.hgap = hgap;
this.vgap = vgap;
}, "~N,~N");
Clazz.defineMethod (c$, "getHgap", 
function () {
return this.hgap;
});
Clazz.defineMethod (c$, "setHgap", 
function (hgap) {
this.hgap = hgap;
}, "~N");
Clazz.defineMethod (c$, "getVgap", 
function () {
return this.vgap;
});
Clazz.defineMethod (c$, "setVgap", 
function (vgap) {
this.vgap = vgap;
}, "~N");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (comp, constraints) {
{
if (constraints == null) {
constraints = "";
}if (Clazz.instanceOf (constraints, String)) {
this.addLayoutComponent (constraints, comp);
} else {
throw  new IllegalArgumentException ("cannot add to layout: constraint must be a string");
}}}, "java.awt.Component,~O");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (name, comp) {
{
if (!this.vector.isEmpty ()) {
comp.setVisible (false);
}for (var i = 0; i < this.vector.size (); i++) {
if ((this.vector.get (i)).name.equals (name)) {
(this.vector.get (i)).comp = comp;
return;
}}
this.vector.add (Clazz.innerTypeInstance (java.awt.CardLayout.Card, this, null, name, comp));
}}, "~S,java.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (comp) {
{
for (var i = 0; i < this.vector.size (); i++) {
if ((this.vector.get (i)).comp === comp) {
if (comp.isVisible () && (comp.getParent () != null)) {
this.next (comp.getParent ());
}this.vector.removeItemAt (i);
if (this.currentCard > i) {
this.currentCard--;
}break;
}}
}}, "java.awt.Component");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (parent) {
{
var insets = parent.getInsets ();
var ncomponents = parent.getComponentCount ();
var w = 0;
var h = 0;
for (var i = 0; i < ncomponents; i++) {
var comp = parent.getComponent (i);
var d = comp.getPreferredSize ();
if (d.width > w) {
w = d.width;
}if (d.height > h) {
h = d.height;
}}
return  new java.awt.Dimension (insets.left + insets.right + w + this.hgap * 2, insets.top + insets.bottom + h + this.vgap * 2);
}}, "java.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (parent) {
{
var insets = parent.getInsets ();
var ncomponents = parent.getComponentCount ();
var w = 0;
var h = 0;
for (var i = 0; i < ncomponents; i++) {
var comp = parent.getComponent (i);
var d = comp.getMinimumSize ();
if (d.width > w) {
w = d.width;
}if (d.height > h) {
h = d.height;
}}
return  new java.awt.Dimension (insets.left + insets.right + w + this.hgap * 2, insets.top + insets.bottom + h + this.vgap * 2);
}}, "java.awt.Container");
Clazz.overrideMethod (c$, "maximumLayoutSize", 
function (target) {
return  new java.awt.Dimension (2147483647, 2147483647);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentX", 
function (parent) {
return 0.5;
}, "java.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentY", 
function (parent) {
return 0.5;
}, "java.awt.Container");
Clazz.overrideMethod (c$, "invalidateLayout", 
function (target) {
}, "java.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (parent) {
{
var insets = parent.getInsets ();
var ncomponents = parent.getComponentCount ();
var comp = null;
var currentFound = false;
for (var i = 0; i < ncomponents; i++) {
comp = parent.getComponent (i);
comp.setBounds (this.hgap + insets.left, this.vgap + insets.top, parent.width - (this.hgap * 2 + insets.left + insets.right), parent.height - (this.vgap * 2 + insets.top + insets.bottom));
if (comp.isVisible ()) {
currentFound = true;
}}
if (!currentFound && ncomponents > 0) {
parent.getComponent (0).setVisible (true);
}}}, "java.awt.Container");
Clazz.defineMethod (c$, "checkLayout", 
function (parent) {
if (parent.getLayout () !== this) {
throw  new IllegalArgumentException ("wrong parent for CardLayout");
}}, "java.awt.Container");
Clazz.defineMethod (c$, "first", 
function (parent) {
{
this.checkLayout (parent);
var ncomponents = parent.getComponentCount ();
for (var i = 0; i < ncomponents; i++) {
var comp = parent.getComponent (i);
if (comp.isVisible ()) {
comp.setVisible (false);
break;
}}
if (ncomponents > 0) {
this.currentCard = 0;
parent.getComponent (0).setVisible (true);
parent.validate ();
}}}, "java.awt.Container");
Clazz.defineMethod (c$, "next", 
function (parent) {
{
this.checkLayout (parent);
var ncomponents = parent.getComponentCount ();
for (var i = 0; i < ncomponents; i++) {
var comp = parent.getComponent (i);
if (comp.isVisible ()) {
comp.setVisible (false);
this.currentCard = (i + 1) % ncomponents;
comp = parent.getComponent (this.currentCard);
comp.setVisible (true);
parent.validate ();
return;
}}
this.showDefaultComponent (parent);
}}, "java.awt.Container");
Clazz.defineMethod (c$, "previous", 
function (parent) {
{
this.checkLayout (parent);
var ncomponents = parent.getComponentCount ();
for (var i = 0; i < ncomponents; i++) {
var comp = parent.getComponent (i);
if (comp.isVisible ()) {
comp.setVisible (false);
this.currentCard = ((i > 0) ? i - 1 : ncomponents - 1);
comp = parent.getComponent (this.currentCard);
comp.setVisible (true);
parent.validate ();
return;
}}
this.showDefaultComponent (parent);
}}, "java.awt.Container");
Clazz.defineMethod (c$, "showDefaultComponent", 
function (parent) {
if (parent.getComponentCount () > 0) {
this.currentCard = 0;
parent.getComponent (0).setVisible (true);
parent.validate ();
}}, "java.awt.Container");
Clazz.defineMethod (c$, "last", 
function (parent) {
{
this.checkLayout (parent);
var ncomponents = parent.getComponentCount ();
for (var i = 0; i < ncomponents; i++) {
var comp = parent.getComponent (i);
if (comp.isVisible ()) {
comp.setVisible (false);
break;
}}
if (ncomponents > 0) {
this.currentCard = ncomponents - 1;
parent.getComponent (this.currentCard).setVisible (true);
parent.validate ();
}}}, "java.awt.Container");
Clazz.defineMethod (c$, "show", 
function (parent, name) {
{
this.checkLayout (parent);
var next = null;
var ncomponents = this.vector.size ();
for (var i = 0; i < ncomponents; i++) {
var card = this.vector.get (i);
if (card.name.equals (name)) {
next = card.comp;
this.currentCard = i;
break;
}}
if ((next != null) && !next.isVisible ()) {
ncomponents = parent.getComponentCount ();
for (var i = 0; i < ncomponents; i++) {
var comp = parent.getComponent (i);
if (comp.isVisible ()) {
comp.setVisible (false);
break;
}}
next.setVisible (true);
parent.validate ();
}}}, "java.awt.Container,~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[hgap=" + this.hgap + ",vgap=" + this.vgap + "]";
});
c$.$CardLayout$Card$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.name = null;
this.comp = null;
Clazz.instantialize (this, arguments);
}, java.awt.CardLayout, "Card", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function (a, b) {
this.name = a;
this.comp = b;
}, "~S,java.awt.Component");
c$ = Clazz.p0p ();
};
c$.serialPersistentFields = c$.prototype.serialPersistentFields =  Clazz.newArray (-1, [ new java.io.ObjectStreamField ("tab", java.util.Hashtable),  new java.io.ObjectStreamField ("hgap", Integer.TYPE),  new java.io.ObjectStreamField ("vgap", Integer.TYPE),  new java.io.ObjectStreamField ("vector", java.util.Vector),  new java.io.ObjectStreamField ("currentCard", Integer.TYPE)]);
});
