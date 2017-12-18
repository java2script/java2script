(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "TextElm", null, 'com.falstad.circuit.GraphicElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.text = null;
this.lines = null;
this.size = 0;
this.FLAG_CENTER = 0;
this.FLAG_BAR = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_CENTER = 1;
this.FLAG_BAR = 2;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.text = "hello";
this.lines = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.util.Vector'))));
this.lines.add$TE(this.text);
this.size = 24;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.size =  new Integer(st.nextToken()).intValue();
this.text = st.nextToken();
while (st.hasMoreTokens())this.text += ' ' + st.nextToken();

this.split();
}, 1);

Clazz.newMeth(C$, 'split', function () {
var i;
this.lines = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.util.Vector'))));
var sb = Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.lang.StringBuffer'))).c$$S,[this.text]);
for (i = 0; i < sb.length$(); i++) {
var c = sb.charAt$I(i);
if (c == '\\') {
sb.deleteCharAt$I(i);
c = sb.charAt$I(i);
if (c == 'n') {
this.lines.add$TE(sb.substring$I$I(0, i));
sb.$delete$I$I(0, i + 1);
i = -1;
continue;
}}}
this.lines.add$TE(sb.toString());
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + this.size + " " + this.text ;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'x'.$c();
});

Clazz.newMeth(C$, 'drag$I$I', function (xx, yy) {
this.x = xx;
this.y = yy;
this.x2 = xx + 16;
this.y2 = yy;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
var f = Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.awt.Font'))).c$$S$I$I,["SansSerif", 0, this.size]);
g.setFont$java_awt_Font(f);
var fm = g.getFontMetrics();
var i;
var maxw = -1;
for (i = 0; i != this.lines.size(); i++) {
var w = fm.stringWidth$S((this.lines.elementAt$I(i)));
if (w > maxw) maxw = w;
}
var cury = this.y;
this.setBbox$I$I$I$I(this.x, this.y, this.x, this.y);
for (i = 0; i != this.lines.size(); i++) {
var s = (this.lines.elementAt$I(i));
if ((this.flags & 1) != 0) this.x = (((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.winSize.width - fm.stringWidth$S(s))/2|0);
g.drawString$S$I$I(s, this.x, cury);
if ((this.flags & 2) != 0) {
var by = cury - fm.getAscent();
g.drawLine$I$I$I$I(this.x, by, this.x + fm.stringWidth$S(s) - 1, by);
}this.adjustBbox$I$I$I$I(this.x, cury - fm.getAscent(), this.x + fm.stringWidth$S(s), cury + fm.getDescent());
cury = cury+(fm.getHeight());
}
this.x2 = this.boundingBox.x + this.boundingBox.width;
this.y2 = this.boundingBox.y + this.boundingBox.height;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) {
var ei = Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Text", 0, -1, -1]);
ei.text = this.text;
return ei;
}if (n == 1) return Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Size", this.size, 5, 100]);
if (n == 2) {
var ei = Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Center", (this.flags & 1) != 0]);
return ei;
}if (n == 3) {
var ei = Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Draw Bar On Top", (this.flags & 2) != 0]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) {
this.text = ei.textf.getText();
this.split();
}if (n == 1) this.size = (ei.value|0);
if (n == 3) {
if (ei.checkbox.getState()) this.flags = this.flags|(2);
 else this.flags = this.flags&(-3);
}if (n == 2) {
if (ei.checkbox.getState()) this.flags = this.flags|(1);
 else this.flags = this.flags&(-2);
}});

Clazz.newMeth(C$, 'isCenteredText', function () {
return (this.flags & 1) != 0;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = this.text;
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 't'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:22
