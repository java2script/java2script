(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "DiffEqLayout", null, null, 'java.awt.LayoutManager');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'addLayoutComponent$S$java_awt_Component', function (name, c) {
});

Clazz.newMeth(C$, 'removeLayoutComponent$java_awt_Component', function (c) {
});

Clazz.newMeth(C$, 'preferredLayoutSize$java_awt_Container', function (target) {
return Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Dimension'))).c$$I$I,[500, 500]);
});

Clazz.newMeth(C$, 'minimumLayoutSize$java_awt_Container', function (target) {
return Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Dimension'))).c$$I$I,[100, 100]);
});

Clazz.newMeth(C$, 'layoutContainer$java_awt_Container', function (target) {
var insets = target.insets();
var targetw = target.size().width - insets.left - insets.right ;
var targeth = target.size().height - (insets.top + insets.bottom);
var ch = (targeth * 2/3|0);
var m = target.getComponent$I(0);
m.move$I$I(insets.left, insets.top);
m.resize$I$I(targetw, ch);
var x = insets.left;
var i;
var mh = 0;
ch = ch+(insets.top);
for (i = 1; i != 4; i++) {
m = target.getComponent$I(i);
var d = m.getPreferredSize();
m.move$I$I(x, ch);
m.resize$I$I(d.width, d.height);
x = x+(d.width);
if (d.height > mh) mh = d.height;
}
ch = ch+(mh);
var h = ch;
var cw = (target.size().width/3|0);
x = insets.left;
var cn = 0;
for (; i < target.getComponentCount(); i++) {
m = target.getComponent$I(i);
if (m.isVisible()) {
var d = m.getPreferredSize();
d.width = cw;
m.move$I$I(x, h);
m.resize$I$I(d.width, d.height);
h = h+(d.height);
}cn++;
if (cn == 5) {
cn = 0;
x = x+(cw);
h = ch;
}}
});
})();
//Created 2017-12-17 19:28:01
