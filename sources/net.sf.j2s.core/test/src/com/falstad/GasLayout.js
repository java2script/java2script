(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "GasLayout", null, null, 'java.awt.LayoutManager');

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
var cw = (target.size().width * 2/3|0);
target.getComponent$I(0).move$I$I(0, 0);
target.getComponent$I(0).resize$I$I(cw, target.size().height - 100);
target.getComponent$I(1).move$I$I(0, target.size().height - 100);
target.getComponent$I(1).resize$I$I(cw, 100);
var i;
var h = 0;
for (i = 2; i < target.getComponentCount(); i++) {
var m = target.getComponent$I(i);
if (m.isVisible()) {
var d = m.getPreferredSize();
if (Clazz.instanceOf(m, "a2s.Scrollbar")) d.width = target.size().width - cw;
var c = 0;
if (Clazz.instanceOf(m, "a2s.Label")) {
h = h+((d.height/3|0));
c = ((target.size().width - cw - d.width )/2|0);
}m.move$I$I(cw + c, h);
m.resize$I$I(d.width, d.height);
h = h+(d.height);
}}
});
})();
//Created 2017-12-17 19:28:06
