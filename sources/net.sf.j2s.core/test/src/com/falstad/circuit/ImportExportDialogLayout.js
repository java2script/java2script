(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "ImportExportDialogLayout", null, null, 'java.awt.LayoutManager');

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
var i;
var pw = 300;
if (target.getComponentCount() == 0) return;
var cl = target.getComponent$I(target.getComponentCount() - 1);
var dl = cl.getPreferredSize();
target.getComponent$I(0).move$I$I(insets.left, insets.top);
var cw = target.size().width - insets.left - insets.right ;
var ch = target.size().height - insets.top - insets.bottom - dl.height ;
target.getComponent$I(0).resize$I$I(cw, ch);
var h = ch + insets.top;
var x = 0;
for (i = 1; i < target.getComponentCount(); i++) {
var m = target.getComponent$I(i);
if (m.isVisible()) {
var d = m.getPreferredSize();
m.move$I$I(insets.left + x, h);
m.resize$I$I(d.width, d.height);
x = x+(d.width);
}}
});
})();
//Created 2017-12-17 19:28:19
