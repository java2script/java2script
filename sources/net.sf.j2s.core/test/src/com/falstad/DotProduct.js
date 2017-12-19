(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "DotProduct", null, 'a2s.Applet', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.swapButton = null;
this.vecs = null;
this.selection = 0;
this.cv = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.selection = -1;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "DotProduct by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'init', function () {
this.setLayout$java_awt_LayoutManager(Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.DotProductLayout')))));
this.cv = Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.DotProductCanvas'))).c$$com_falstad_DotProduct,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.add$java_awt_Component(this.swapButton = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Button'))).c$$S,["Swap"]));
this.swapButton.addActionListener$java_awt_event_ActionListener(this);
this.add$java_awt_Component(this.cv);
this.setBackground$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).black);
this.setForeground$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).lightGray);
this.random = Clazz.new_((I$[5]||(I$[5]=Clazz.load('java.util.Random'))));
this.vecs = Clazz.array(Double.TYPE, [2, 2]);
this.vecs[0][0] = 0;
this.vecs[0][1] = 1;
this.vecs[1][0] = 1;
this.vecs[1][1] = 1;
this.reinit();
this.repaint();
});

Clazz.newMeth(C$, 'reinit', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.dbimage = this.createImage$I$I(d.width, d.height);
});

Clazz.newMeth(C$, 'findVecCoords$D$D$IA', function (x, y, result) {
var cy = (this.winSize.height/4|0);
var cx = cy;
result[0] = ((cx * (x + 2))|0);
result[1] = ((cy * (2 - y))|0);
});

Clazz.newMeth(C$, 'findVecCoords$I$IA', function (num, result) {
this.findVecCoords$D$D$IA(this.vecs[num][0], this.vecs[num][1], result);
});

Clazz.newMeth(C$, 'drawArrow$java_awt_Graphics$I$I$I$I$D', function (g, x1, y1, x2, y2, len) {
g.drawLine$I$I$I$I(x1, y1, x2, y2);
if (len > 0.05 ) {
var l = java.lang.Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
var hatx = (x2 - x1) / l;
var haty = (y2 - y1) / l;
var as = 10;
g.drawLine$I$I$I$I(x2, y2, ((haty * as - hatx * as + x2)|0), ((-hatx * as - haty * as + y2)|0));
g.drawLine$I$I$I$I(x2, y2, ((-haty * as - hatx * as + x2)|0), ((hatx * as - haty * as + y2)|0));
}});

Clazz.newMeth(C$, 'drawBar$java_awt_Graphics$I$D', function (g, offset, val) {
var x = ((this.winSize.width * val / 6)|0);
var cx = (this.winSize.width/2|0);
var h = 5;
var y = this.winSize.height + h * offset;
var y2 = y + h - 1;
if (val < 0 ) g.fillRect$I$I$I$I(cx + x, y, -x, h);
 else g.fillRect$I$I$I$I(cx, y, x, h);
});

Clazz.newMeth(C$, 'updateDotProduct$java_awt_Graphics', function (realg) {
var alen = java.lang.Math.sqrt(this.vecs[0][0] * this.vecs[0][0] + this.vecs[0][1] * this.vecs[0][1]);
var blen = java.lang.Math.sqrt(this.vecs[1][0] * this.vecs[1][0] + this.vecs[1][1] * this.vecs[1][1]);
var piadj = 57.29577957855229;
var dot = this.vecs[0][0] * this.vecs[1][0] + this.vecs[0][1] * this.vecs[1][1];
var acosth = (blen > 0 ) ? dot / blen : 0;
var costh = (alen > 0 ) ? acosth / alen : 0;
var theta = java.lang.Math.acos(costh) * piadj;
var g = this.dbimage.getGraphics();
if (this.winSize == null  || this.winSize.width == 0 ) return;
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).gray);
g.setFont$java_awt_Font(Clazz.new_((I$[6]||(I$[6]=Clazz.load('java.awt.Font'))).c$$S$I$I,["Helvetica", 0, 15]));
var i;
var j;
for (i = -2; i <= 2; i++) {
var x = (this.winSize.height * (i + 2)/4|0);
g.drawLine$I$I$I$I(x, 0, x, this.winSize.height);
g.drawLine$I$I$I$I(0, x, this.winSize.height, x);
}
var cy = (this.winSize.height/2|0);
var cx = cy;
var vc = Clazz.array(Integer.TYPE, [2]);
if (blen > 0 ) {
var vc2 = Clazz.array(Integer.TYPE, [2]);
this.findVecCoords$D$D$IA(this.vecs[1][0] * acosth / blen, this.vecs[1][1] * acosth / blen, vc);
this.findVecCoords$I$IA(0, vc2);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(vc[0], vc[1], vc2[0], vc2[1]);
}if (alen > 0.1  && blen > 0.1  ) {
var c1x = (cx/10|0);
var c1y = (cy/10|0);
var a1 = ((piadj * java.lang.Math.atan2(this.vecs[0][1], this.vecs[0][0]))|0);
var a2 = ((piadj * java.lang.Math.atan2(this.vecs[1][1], this.vecs[1][0]))|0);
if (a1 > a2 && a1 < a2 + 180 ) {
var a3 = a1;
a1 = a2;
a2 = a3;
}if (a2 < a1) a2 = a2+(360);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).orange);
g.drawArc$I$I$I$I$I$I(cx - c1x, cy - c1y, c1x * 2, c1y * 2, a1, a2 - a1);
}this.findVecCoords$I$IA(0, vc);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).red);
this.drawArrow$java_awt_Graphics$I$I$I$I$D(g, cx, cy, vc[0], vc[1], alen);
this.findVecCoords$I$IA(1, vc);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).cyan);
this.drawArrow$java_awt_Graphics$I$I$I$I$D(g, cx, cy, vc[0], vc[1], blen);
var yl = g.getFontMetrics().getHeight();
var y = yl;
var nf = (I$[7]||(I$[7]=Clazz.load('java.text.NumberFormat'))).getInstance();
nf.setMaximumFractionDigits$I(3);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).red);
this.displayString$java_awt_Graphics$S$I(g, "A = (" + nf.format$D(this.vecs[0][0]) + ", " + nf.format$D(this.vecs[0][1]) + ")" , y = y+(yl));
this.displayString$java_awt_Graphics$S$I(g, "|A| = " + nf.format$D(alen), y = y+(yl));
this.drawBar$java_awt_Graphics$I$D(g, -4, alen);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).cyan);
this.displayString$java_awt_Graphics$S$I(g, "B = (" + nf.format$D(this.vecs[1][0]) + ", " + nf.format$D(this.vecs[1][1]) + ")" , y = y+(yl));
this.displayString$java_awt_Graphics$S$I(g, "|B| = " + nf.format$D(blen), y = y+(yl));
this.drawBar$java_awt_Graphics$I$D(g, -3, blen);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).yellow);
this.displayString$java_awt_Graphics$S$I(g, "|A| cos theta = " + nf.format$D(acosth), y = y+(yl));
this.drawBar$java_awt_Graphics$I$D(g, -2, acosth);
if (blen > 0 ) {
this.findVecCoords$D$D$IA(this.vecs[1][0] * acosth / blen, this.vecs[1][1] * acosth / blen, vc);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).yellow);
g.drawLine$I$I$I$I(cx, cy, vc[0], vc[1]);
}g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).white);
this.displayString$java_awt_Graphics$S$I(g, "cos theta = " + nf.format$D(costh), y = y+(yl));
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).orange);
this.displayString$java_awt_Graphics$S$I(g, "theta = " + nf.format$D(theta) + "\u00b0" , y = y+(yl));
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).green);
this.displayString$java_awt_Graphics$S$I(g, "A dot B = " + nf.format$D(dot), y = y+(yl));
this.drawBar$java_awt_Graphics$I$D(g, -1, dot);
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
});

Clazz.newMeth(C$, 'displayString$java_awt_Graphics$S$I', function (g, s, y) {
var lx = this.winSize.height;
var lw = this.winSize.width - lx;
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, lx + ((lw - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
if (this.selection == -1) return;
var x = e.getX();
var y = e.getY();
var cy = (this.winSize.height/4|0);
var cx = cy;
var xf = x / cx - 2;
var yf = 2 - y / cy;
if (xf < -2 ) xf = -2;
if (yf < -2 ) yf = -2;
if (xf > 2 ) xf = 2;
if (yf > 2 ) yf = 2;
this.vecs[this.selection][0] = xf;
this.vecs[this.selection][1] = yf;
this.repaint();
});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
this.repaint();
});

Clazz.newMeth(C$, 'componentResized$java_awt_event_ComponentEvent', function (e) {
this.reinit();
this.repaint();
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
if (e.getSource() === this.swapButton ) {
var x;
for (x = 0; x < 2; x++) {
var y = this.vecs[0][x];
this.vecs[0][x] = this.vecs[1][x];
this.vecs[1][x] = y;
}
this.repaint();
}});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) != 0) return;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
var x = e.getX();
var y = e.getY();
var vc = Clazz.array(Integer.TYPE, [2]);
var i;
this.selection = -1;
var best = 900;
for (i = 0; i != 2; i++) {
this.findVecCoords$I$IA(i, vc);
var dx = x - vc[0];
var dy = y - vc[1];
var dist = dx * dx + dy * dy;
if (dist < best ) {
best = dist;
this.selection = i;
}}
if (this.selection != -1) this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.selection = -1;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:02
