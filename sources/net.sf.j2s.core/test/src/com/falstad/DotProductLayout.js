(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "DotProductLayout", null, null, 'java.awt.LayoutManager');

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
return Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Dimension'))).c$$I$I,[500, 500]);
});

Clazz.newMeth(C$, 'minimumLayoutSize$java_awt_Container', function (target) {
return Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Dimension'))).c$$I$I,[100, 100]);
});

Clazz.newMeth(C$, 'layoutContainer$java_awt_Container', function (target) {
var cw = target.size().width;
var ct = target.getComponentCount();
target.getComponent$I(ct - 1).move$I$I(0, 0);
target.getComponent$I(ct - 1).resize$I$I(cw, target.size().height);
var i;
var h = 0;
for (i = 0; i < ct - 1; i++) {
var m = target.getComponent$I(i);
if (m.isVisible()) {
var d = m.getPreferredSize();
m.move$I$I(cw - d.width, h);
m.resize$I$I(d.width, d.height);
h = h+(d.height);
}}
});
})();
//Created 2017-12-17 19:28:02
