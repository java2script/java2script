(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "EulerFrame", null, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.ItemListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.modeChooser = null;
this.centerChooser = null;
this.animateCheck = null;
this.zoomBar = null;
this.termsBar = null;
this.zoom = 0;
this.xpoints = null;
this.ypoints = null;
this.pause = 0;
this.applet = null;
this.zr = 0;
this.zi = 0;
this.orgx = 0;
this.orgy = 0;
this.$mouseDown = false;
this.useFrame = false;
this.cv = null;
this.shown = false;
this.lastTime = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.zr = 0;
this.zi = 2.356194490192345;
this.orgx = 0;
this.orgy = 0;
this.shown = false;
this.lastTime = 0;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "Euler by Paul Falstad";
});

Clazz.newMeth(C$, 'c$$com_falstad_Euler', function (a) {
C$.superclazz.c$$S.apply(this, ["Euler\'s Formula Applet v1.1"]);
C$.$init$.apply(this);
this.applet = a;
}, 1);

Clazz.newMeth(C$, 'init', function () {
var main;
try {
if (this.applet != null ) {
var param = this.applet.getParameter$S("useFrame");
if (param != null  && param.equalsIgnoreCase$S("false") ) this.useFrame = false;
}} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
if (this.useFrame) main = this;
 else main = this.applet;
main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.EulerLayout')))));
this.cv = Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.EulerCanvas'))).c$$com_falstad_EulerFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
main.add$java_awt_Component(this.cv);
this.animateCheck = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Checkbox'))).c$$S,["Animate"]);
this.animateCheck.addItemListener$java_awt_event_ItemListener(this);
this.animateCheck.setState$Z(true);
main.add$java_awt_Component(this.animateCheck);
this.modeChooser = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Choice'))));
this.modeChooser.add$S("Mouse = Select exp(z)");
this.modeChooser.add$S("Mouse = Select z");
this.modeChooser.addItemListener$java_awt_event_ItemListener(this);
main.add$java_awt_Component(this.modeChooser);
this.centerChooser = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Choice'))));
this.centerChooser.add$S("Center = Origin");
this.centerChooser.add$S("Center = exp(z)");
this.centerChooser.addItemListener$java_awt_event_ItemListener(this);
main.add$java_awt_Component(this.centerChooser);
main.add$java_awt_Component(Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Label'))).c$$S$I,["Zoom", 0]));
main.add$java_awt_Component(this.zoomBar = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 96, 1, 60, 200]));
this.zoomBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
main.add$java_awt_Component(Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Label'))).c$$S$I,["# of Terms", 0]));
main.add$java_awt_Component(this.termsBar = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 1, 51]));
this.termsBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
main.add$java_awt_Component(Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Label'))).c$$S$I,["http://www.falstad.com", 0]));
try {
var param = this.applet.getParameter$S("PAUSE");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.xpoints = Clazz.array(Integer.TYPE, [4]);
this.ypoints = Clazz.array(Integer.TYPE, [4]);
this.reinit();
this.cv.setBackground$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).white);
if (this.useFrame) {
this.setSize$I$I(550, 550);
this.handleResize();
var x = this.getSize();
var screen = this.getToolkit().getScreenSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.setVisible$Z(true);
} else {
this.setVisible$Z(false);
this.handleResize();
this.applet.validate();
this.cv.repaint();
}main.requestFocus();
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
this.reinit();
});

Clazz.newMeth(C$, 'reinit', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.dbimage = this.cv.createImage$I$I(d.width, d.height);
});

Clazz.newMeth(C$, 'updateEuler$java_awt_Graphics', function (realg) {
this.zoom = java.lang.Math.exp(-(this.zoomBar.getValue() - 100) * 0.3);
var g = null;
if (this.winSize == null  || this.winSize.width == 0 ) return;
g = this.dbimage.getGraphics();
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var expv = java.lang.Math.exp(this.zr);
var resultr = java.lang.Math.cos(this.zi) * expv;
var resulti = java.lang.Math.sin(this.zi) * expv;
if (this.centerChooser.getSelectedIndex() != 0) {
this.orgx = resultr;
this.orgy = resulti;
} else {
this.orgx = this.orgy = 0;
}g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).darkGray);
var gridSpace = 1;
while (gridSpace * 10 < this.zoom )gridSpace = gridSpace*(10);

do {
var i;
for (i = -10; i <= 10; i++) {
this.map2d$D$D$I(i * gridSpace, -10 * gridSpace, 0);
this.map2d$D$D$I(i * gridSpace, 10 * gridSpace, 1);
this.drawLine$java_awt_Graphics(g);
this.map2d$D$D$I(-10 * gridSpace, i * gridSpace, 0);
this.map2d$D$D$I(10 * gridSpace, i * gridSpace, 1);
this.drawLine$java_awt_Graphics(g);
}
gridSpace = (gridSpace/10|0);
} while (gridSpace > 0);
var terms = this.termsBar.getValue();
if (terms < 20) {
var i;
for (i = -100; i <= 100; i++) {
var xr = 1;
var xi = 0;
var ix = 0;
var iy = 0;
var zi2 = 3.141592653589793 * i / 50.0;
var n = 0;
for (; n < terms; n++) {
ix += xr;
iy += xi;
var nxr = xr * this.zr - xi * zi2;
var nxi = xi * this.zr + xr * zi2;
xr = nxr / (n + 1);
xi = nxi / (n + 1);
}
this.map2d$D$D$I(ix, iy, 1);
if (i > -100) this.drawLine$java_awt_Graphics(g);
this.xpoints[0] = this.xpoints[1];
this.ypoints[0] = this.ypoints[1];
}
}this.map2d$D$D$I(-expv, expv, 0);
this.map2d$D$D$I(expv, -expv, 1);
this.drawOval$java_awt_Graphics$I$I$I$I(g, this.xpoints[0], this.ypoints[0], this.xpoints[1] - this.xpoints[0], this.ypoints[1] - this.ypoints[0]);
this.map2d$D$D$I(this.zr, this.zi, 0);
this.map2d$D$D$I(this.zr + 1, this.zi, 1);
this.drawLine$java_awt_Graphics(g);
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).gray);
this.map2d$D$D$I(0, 0, 0);
this.drawLinePts$java_awt_Graphics$I$I$I$I(g, 0, this.ypoints[0], this.winSize.width - 1, this.ypoints[0]);
this.drawLinePts$java_awt_Graphics$I$I$I$I(g, this.xpoints[0], 0, this.xpoints[0], this.winSize.height - 1);
this.map2d$D$D$I(-1, 1, 0);
this.map2d$D$D$I(1, -1, 1);
this.drawOval$java_awt_Graphics$I$I$I$I(g, this.xpoints[0], this.ypoints[0], this.xpoints[1] - this.xpoints[0], this.ypoints[1] - this.ypoints[0]);
var xr = 1;
var xi = 0;
var ix = 0;
var iy = 0;
var n = 0;
this.map2d$D$D$I(0, 0, 0);
this.map2d$D$D$I(resultr, resulti, 1);
this.drawLine$java_awt_Graphics(g);
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).white);
for (; n < terms; n++) {
g.setColor$java_awt_Color((n % 2) == 0 ? (I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).blue : (I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).cyan);
this.map2d$D$D$I(ix, iy, 0);
ix += xr;
iy += xi;
this.map2d$D$D$I(ix, iy, 1);
this.drawLine$java_awt_Graphics(g);
var nxr = xr * this.zr - xi * this.zi;
var nxi = xi * this.zr + xr * this.zi;
xr = nxr / (n + 1);
xi = nxi / (n + 1);
}
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).red);
this.drawDot$java_awt_Graphics$D$D(g, resultr, resulti);
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).green);
this.drawDot$java_awt_Graphics$D$D(g, this.zr, this.zi);
var textspace = 20;
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, this.winSize.height - textspace, this.winSize.width - 1, textspace);
var nf = (I$[9]||(I$[9]=Clazz.load('java.text.NumberFormat'))).getInstance();
nf.setMaximumFractionDigits$I(3);
var fm = g.getFontMetrics();
var st = "z = " + this.formatNumber$D$D$java_text_NumberFormat(this.zr, this.zi, nf);
var st2 = "  exp(z) = " + this.formatNumber$D$D$java_text_NumberFormat(resultr, resulti, nf);
var ty = this.winSize.height - (textspace/4|0);
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).green);
g.drawString$S$I$I(st, 10, ty);
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).red);
g.drawString$S$I$I(st2, 10 + fm.stringWidth$S(st), ty);
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (this.animateCheck.getState() && !this.$mouseDown ) {
var tm = System.currentTimeMillis();
if (this.lastTime == 0) this.lastTime = tm;
this.zi += 0.031415926535897934 * (tm - this.lastTime) / 17.0;
if (this.zi > 3.141592653589793 ) this.zi = -3.141592653589793;
this.lastTime = tm;
this.cv.repaint$J(this.pause);
} else this.lastTime = 0;
});

Clazz.newMeth(C$, 'formatNumber$D$D$java_text_NumberFormat', function (r, i, nf) {
if (r == 0 ) {
if (i == 0 ) return "0";
return nf.format$D(i) + "i";
}if (i == 0 ) return nf.format$D(r);
return nf.format$D(r) + (i < 0  ? "" : "+") + nf.format$D(i) + "i" ;
});

Clazz.newMeth(C$, 'drawOval$java_awt_Graphics$I$I$I$I', function (g, x, y, rx, ry) {
if (this.onScreen$I$I(x, y) && this.onScreen$I$I(x + rx, y + ry) ) g.drawOval$I$I$I$I(x, y, rx, ry);
});

Clazz.newMeth(C$, 'onScreen$I$I', function (x, y) {
return (x >= 0 && x < this.winSize.width  && y >= 0  && y < this.winSize.height );
});

Clazz.newMeth(C$, 'maxInt$I', function (x) {
return (x == -214748368 || x == 2147483647 );
});

Clazz.newMeth(C$, 'drawLine$java_awt_Graphics', function (g) {
this.drawLinePts$java_awt_Graphics$I$I$I$I(g, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
});

Clazz.newMeth(C$, 'drawLinePts$java_awt_Graphics$I$I$I$I', function (g, x1, y1, x2, y2) {
if (this.onScreen$I$I(x1, y1) && this.onScreen$I$I(x2, y2) ) {
g.drawLine$I$I$I$I(x1, y1, x2, y2);
return;
}if (this.maxInt$I(x1) || this.maxInt$I(y1) || this.maxInt$I(x2) || this.maxInt$I(y2)  ) return;
if ((x1 < 0 && x2 < 0 ) || (y1 < 0 && y2 < 0 ) || (x1 >= this.winSize.width && x2 >= this.winSize.width ) || (y1 >= this.winSize.height && y2 >= this.winSize.height )  ) return;
if (x1 == x2) {
if (y1 < 0) y1 = 0;
if (y2 < 0) y2 = 0;
if (y1 >= this.winSize.height) y1 = this.winSize.height - 1;
if (y2 >= this.winSize.height) y2 = this.winSize.height - 1;
g.drawLine$I$I$I$I(x1, y1, x1, y2);
return;
}var m = (y2 - y1) / (x2 - x1);
if (x1 < 0) {
y1 = (y1-(x1 * m)|0);
x1 = 0;
}if (y1 < 0) {
x1 = (x1-(y1 / m)|0);
y1 = 0;
}if (x2 < 0) {
y2 = (y2-(x2 * m)|0);
x2 = 0;
}if (y2 < 0) {
x2 = (x2-(y2 / m)|0);
y2 = 0;
}if (x1 >= this.winSize.width) {
var a = this.winSize.width - 1 - x1 ;
y1 = (y1+(a * m)|0);
x1 = x1+(a);
}if (x2 >= this.winSize.width) {
var a = this.winSize.width - 1 - x2 ;
y2 = (y2+(a * m)|0);
x2 = x2+(a);
}if (y1 >= this.winSize.height) {
var a = this.winSize.height - 1 - y1 ;
y1 = y1+(a);
x1 = (x1+(a / m)|0);
}if (y2 >= this.winSize.height) {
var a = this.winSize.height - 1 - y2 ;
y2 = y2+(a);
x2 = (x2+(a / m)|0);
}if (this.onScreen$I$I(x1, y1) && this.onScreen$I$I(x2, y2) ) g.drawLine$I$I$I$I(x1, y1, x2, y2);
});

Clazz.newMeth(C$, 'drawDot$java_awt_Graphics$D$D', function (g, x, y) {
this.map2d$D$D$I(x, y, 0);
if (this.onScreen$I$I(this.xpoints[0], this.ypoints[0])) g.fillOval$I$I$I$I(this.xpoints[0] - 2, this.ypoints[0] - 2, 5, 5);
});

Clazz.newMeth(C$, 'map2d$D$D$I', function (x, y, n) {
this.xpoints[n] = ((this.winSize.width * (this.zoom + x - this.orgx) / (this.zoom * 2))|0);
this.ypoints[n] = ((this.winSize.height * (this.zoom - y + this.orgy) / (this.zoom * 2))|0);
});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
this.cv.repaint();
});

Clazz.newMeth(C$, 'componentResized$java_awt_event_ComponentEvent', function (e) {
this.handleResize();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.doMouse$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
this.doMouse$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'doMouse$java_awt_event_MouseEvent', function (e) {
this.$mouseDown = true;
var ex = e.getX();
var ey = e.getY();
var x = ex * this.zoom * 2.0  / this.winSize.width - this.zoom + this.orgx;
var y = -(ey * this.zoom * 2.0  / this.winSize.height - this.zoom - this.orgy);
if (this.modeChooser.getSelectedIndex() == 0) {
if (x == 0  && y == 0  ) x = 1.0E-5;
this.zr = 0.5 * java.lang.Math.log(x * x + y * y);
this.zi = java.lang.Math.atan2(y, x);
} else {
this.zr = x;
this.zi = y;
}this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
this.$mouseDown = false;
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:05
