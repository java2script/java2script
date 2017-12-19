(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "EditDialogLayout", null, null, 'java.awt.LayoutManager');

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
var h = insets.top;
var pw = 300;
var x = 0;
for (i = 0; i < target.getComponentCount(); i++) {
var m = target.getComponent$I(i);
var newline = true;
if (m.isVisible()) {
var d = m.getPreferredSize();
if (pw < d.width) pw = d.width;
if (Clazz.instanceOf(m, "a2s.Scrollbar")) {
h = h+(10);
d.width = targetw - x;
}if (Clazz.instanceOf(m, "a2s.Choice") && d.width > targetw ) d.width = targetw - x;
if (Clazz.instanceOf(m, "a2s.Label")) {
var d2 = target.getComponent$I(i + 1).getPreferredSize();
if (d.height < d2.height) d.height = d2.height;
h = h+((d.height/5|0));
newline = false;
}if (Clazz.instanceOf(m, "a2s.Button")) {
if (x == 0) h = h+(20);
if (i != target.getComponentCount() - 1) newline = false;
}m.move$I$I(insets.left + x, h);
m.resize$I$I(d.width, d.height);
if (newline) {
h = h+(d.height);
x = 0;
} else x = x+(d.width);
}}
if (target.size().height < h) target.resize$I$I(pw + insets.right, h + insets.bottom);
});
})();
//Created 2017-12-17 19:28:19
