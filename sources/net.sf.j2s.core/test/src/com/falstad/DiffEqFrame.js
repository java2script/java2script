(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "DiffEqFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.maxTerms = 0;
this.maxMaxTerms = 0;
this.sampleCount = 0;
this.midy = 0;
this.ymult = 0;
this.useFrame = false;
this.applet = null;
this.sinTable = null;
this.clearButton = null;
this.lhsValues = null;
this.rhsValues = null;
this.initialValues = null;
this.solutionValues = null;
this.selectedCoef = 0;
this.magnitudesY = 0;
this.funcSelected = false;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.dragging = false;
this.bowing = false;
this.bowCaught = false;
this.forceApplied = false;
this.t = 0;
this.forceMag = 0;
this.points = null;
this.forceBarValue = 0;
this.forceTimeZero = 0;
this.tensionBarValue = 0;
this.nf = null;
this.func = null;
this.forceFunc = null;
this.lhsfunc = null;
this.rhsfunc = null;
this.lhsChooser = null;
this.rhsChooser = null;
this.xRangeStart = 0;
this.xRangeEnd = 0;
this.xRangeWidth = 0;
this.lhsList = null;
this.rhsList = null;
this.lhsChanged = false;
this.rhsChanged = false;
this.cv = null;
this.main = null;
this.shown = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.maxTerms = 30;
this.maxMaxTerms = 500;
this.shown = false;
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_DiffEq', function (a) {
C$.superclazz.c$$S.apply(this, ["Differential Equation applet"]);
C$.$init$.apply(this);
this.applet = a;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "DiffEq by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'init', function () {
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
if (this.useFrame) this.main = this;
 else this.main = this.applet;
this.lhsList = Clazz.new_((I$[29]||(I$[29]=Clazz.load('java.util.Vector'))));
var lhs = Clazz.new_((I$[30]||(I$[30]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').OscillatorLhsFunc))), [this, null]);
while (lhs != null ){
this.lhsList.addElement$TE(lhs);
lhs = lhs.createNext();
}
this.rhsList = Clazz.new_((I$[29]||(I$[29]=Clazz.load('java.util.Vector'))));
var rhs = Clazz.new_((I$[31]||(I$[31]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').ZeroRhsFunc))), [this, null]);
while (rhs != null ){
this.rhsList.addElement$TE(rhs);
rhs = rhs.createNext();
}
this.selectedCoef = -1;
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[32]||(I$[32]=Clazz.load('com.falstad.DiffEqLayout')))));
this.cv = Clazz.new_((I$[33]||(I$[33]=Clazz.load('com.falstad.DiffEqCanvas'))).c$$com_falstad_DiffEqFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.lhsChooser = Clazz.new_((I$[34]||(I$[34]=Clazz.load('a2s.Choice'))));
var i;
for (i = 0; i != this.lhsList.size(); i++) this.lhsChooser.add$S("LHS = " + (this.lhsList.elementAt$I(i)).getName());

this.main.add$java_awt_Component(this.lhsChooser);
this.lhsfunc = this.lhsList.elementAt$I(0);
this.lhsChooser.addItemListener$java_awt_event_ItemListener(this);
this.rhsChooser = Clazz.new_((I$[34]||(I$[34]=Clazz.load('a2s.Choice'))));
for (i = 0; i != this.rhsList.size(); i++) this.rhsChooser.add$S("RHS = " + (this.rhsList.elementAt$I(i)).getName());

this.main.add$java_awt_Component(this.rhsChooser);
this.rhsfunc = this.rhsList.elementAt$I(0);
this.rhsChooser.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.clearButton = Clazz.new_((I$[35]||(I$[35]=Clazz.load('a2s.Button'))).c$$S,["Clear Function"]));
this.clearButton.addActionListener$java_awt_event_ActionListener(this);
this.lhsValues = Clazz.array((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').ValueEditCanvas))), [5]);
this.rhsValues = Clazz.array((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').ValueEditCanvas))), [2]);
this.initialValues = Clazz.array((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').ValueEditCanvas))), [3]);
this.solutionValues = Clazz.array((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').ValueEditCanvas))), [4]);
for (i = 0; i != 5; i++) this.main.add$java_awt_Component(this.lhsValues[i] = Clazz.new_((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').ValueEditCanvas))), [this, null]));

for (i = 0; i != 2; i++) this.main.add$java_awt_Component(this.rhsValues[i] = Clazz.new_((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').ValueEditCanvas))), [this, null]));

for (i = 0; i != 3; i++) {
this.main.add$java_awt_Component(this.initialValues[i] = Clazz.new_((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').ValueEditCanvas))), [this, null]));
this.initialValues[i].setValue$D(0);
}
for (i = 0; i != 4; i++) this.main.add$java_awt_Component(this.solutionValues[i] = Clazz.new_((I$[36]||(I$[36]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').ValueEditCanvas))), [this, null]));

this.lhsChanged = this.rhsChanged = true;
this.setLoadCount();
this.points = Clazz.array(Double.TYPE, [1, 2]);
this.points[0][0] = 1;
this.points[0][1] = 1;
this.nf = (I$[37]||(I$[37]=Clazz.load('java.text.NumberFormat'))).getInstance();
this.nf.setMaximumFractionDigits$I(5);
this.random = Clazz.new_((I$[38]||(I$[38]=Clazz.load('java.util.Random'))));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).lightGray);
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
}this.main.requestFocus();
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

Clazz.newMeth(C$, 'getPanelHeight', function () {
return this.winSize.height - 40;
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'doClear', function () {
var i;
for (i = 0; i != this.sampleCount; i++) this.forceFunc[i] = 0;

});

Clazz.newMeth(C$, 'valueChanged$com_falstad_DiffEqFrame_ValueEditCanvas', function (vec) {
var i;
for (i = 0; i != 4; i++) if (vec === this.solutionValues[i] ) {
this.lhsfunc.setSolution();
break;
}
this.cv.repaint();
});

Clazz.newMeth(C$, 'rk$D$DA$D', function (x, Y, stepsize) {
var order = this.lhsfunc.getOrder();
var yn = Clazz.array(Double.TYPE, [order]);
var k1 = Clazz.array(Double.TYPE, [order]);
var k2 = Clazz.array(Double.TYPE, [order]);
var k3 = Clazz.array(Double.TYPE, [order]);
var k4 = Clazz.array(Double.TYPE, [order]);
var i;
var rscale = this.lhsfunc.getRhsScale();
for (i = 0; i != order; i++) yn[i] = Y[i];

for (i = 0; i != order - 1; i++) k1[i] = stepsize * yn[i + 1];

k1[order - 1] = stepsize * this.lhsfunc.calculateDiffs$D$DA$D(x, yn, rscale * this.rhsfunc.calculate$D$DA(x, yn));
for (i = 0; i != order; i++) yn[i] = (Y[i] + 0.5 * k1[i]);

for (i = 0; i != order - 1; i++) k2[i] = stepsize * yn[i + 1];

var x2 = x + stepsize * 0.5;
k2[order - 1] = stepsize * this.lhsfunc.calculateDiffs$D$DA$D(x2, yn, rscale * this.rhsfunc.calculate$D$DA(x2, yn));
for (i = 0; i != order; i++) yn[i] = (Y[i] + 0.5 * k2[i]);

for (i = 0; i != order - 1; i++) k3[i] = stepsize * yn[i + 1];

k3[order - 1] = stepsize * this.lhsfunc.calculateDiffs$D$DA$D(x2, yn, rscale * this.rhsfunc.calculate$D$DA(x2, yn));
var x3 = x + stepsize;
for (i = 0; i != order; i++) yn[i] = (Y[i] + k3[i]);

for (i = 0; i != order - 1; i++) k4[i] = stepsize * yn[i + 1];

k4[order - 1] = stepsize * this.lhsfunc.calculateDiffs$D$DA$D(x3, yn, rscale * this.rhsfunc.calculate$D$DA(x3, yn));
for (i = 0; i != order; i++) Y[i] = Y[i] + (k1[i] + 2 * (k2[i] + k3[i]) + k4[i]) / 6;

});

Clazz.newMeth(C$, 'rungeKutta$D$D', function (start, dir) {
var numIter = 0;
var maxh = this.xRangeWidth / this.sampleCount;
var error = 0.0;
var E = 0.001;
var localError;
var order = this.lhsfunc.getOrder();
var Y = Clazz.array(Double.TYPE, [order]);
var Yhalf = Clazz.array(Double.TYPE, [order]);
var h = maxh;
Y[0] = Yhalf[0] = this.points[0][1];
if (order > 1) Y[1] = Yhalf[1] = this.initialValues[0].getValue();
if (order > 2) Y[2] = Yhalf[2] = this.initialValues[1].getValue();
if (order > 3) Y[3] = Yhalf[3] = this.initialValues[2].getValue();
var t = start;
var steps = 0;
var pos = (((t - this.xRangeStart) * this.sampleCount / this.xRangeWidth)|0);
this.func[pos] = Y[0];
var minh = 0.01;
while (t >= this.xRangeStart  && t <= this.xRangeEnd  ){
this.rk$D$DA$D(t, Y, h * dir);
this.rk$D$DA$D(t, Yhalf, h * 0.5 * dir );
this.rk$D$DA$D(t, Yhalf, h * 0.5 * dir );
localError = java.lang.Math.abs(Y[0] - Yhalf[0]);
if (Y[0] > 1000000.0  || Y[0] < -1000000.0  ) {
} else if (localError > E ) {
h *= 0.75;
if (h < minh ) h = minh;
} else if (localError < (E * 0.5) ) {
h *= 1.25;
if (h > maxh ) h = maxh;
}var i;
for (i = 0; i != order; i++) Yhalf[i] = Y[i];

var newpos = (((t - this.xRangeStart) * this.sampleCount / this.xRangeWidth)|0);
if (dir > 0 ) {
if (newpos > pos) {
if (newpos > this.sampleCount) newpos = this.sampleCount;
while (pos < newpos)this.func[++pos] = Y[0];

}} else {
if (newpos < pos) {
if (newpos < 0) newpos = 0;
while (pos > newpos)this.func[--pos] = Y[0];

}}t += h * dir;
steps++;
}
});

Clazz.newMeth(C$, 'updateDiffEq$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0 ) return;
var g = this.dbimage.getGraphics();
var allQuiet = true;
var gray1 = Clazz.new_((I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).c$$I$I$I,[76, 76, 76]);
var gray2 = Clazz.new_((I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
this.lhsfunc = this.lhsList.elementAt$I(this.lhsChooser.getSelectedIndex());
if (this.lhsChanged) {
var i;
for (i = 0; i != 5; i++) this.lhsValues[i].hide();

for (i = 0; i != 3; i++) {
this.initialValues[i].hide();
this.initialValues[i].setValue$D(0);
}
this.lhsfunc.newFunc();
if (this.lhsfunc.getOrder() > 1) this.initialValues[0].setLabel$S("Initial y\'");
if (this.lhsfunc.getOrder() > 2) this.initialValues[1].setLabel$S("Initial y\'\'");
if (this.lhsfunc.getOrder() > 3) this.initialValues[2].setLabel$S("Initial y\'\'\'");
this.rhsChooser.select$I(0);
this.rhsChanged = true;
this.rhsChooser.setEnabled$Z(this.lhsfunc.useRungeKutta());
}this.lhsfunc.setup();
this.rhsfunc = this.rhsList.elementAt$I(this.rhsChooser.getSelectedIndex());
if (this.rhsChanged) {
var i;
for (i = 0; i != 2; i++) this.rhsValues[i].hide();

this.rhsfunc.newFunc();
if (this.rhsfunc.isCustom()) this.clearButton.enable();
 else this.clearButton.disable();
for (i = 0; i != 4; i++) this.solutionValues[i].hide();

if (Clazz.instanceOf(this.rhsfunc, "com.falstad.DiffEqFrame.ZeroRhsFunc")) this.lhsfunc.newFuncSolution();
}this.rhsfunc.setup();
this.main.validate();
this.lhsChanged = this.rhsChanged = false;
var i;
var panelHeight = this.getPanelHeight();
this.midy = (panelHeight/2|0);
var halfPanel = (panelHeight/2|0);
var ymult0 = 0.75 * halfPanel;
this.ymult = ymult0 / 10.0;
for (i = -1; i <= 1; i++) {
g.setColor$java_awt_Color((i == 0) ? gray2 : gray1);
g.drawLine$I$I$I$I(0, this.midy + (i * (ymult0|0)), this.winSize.width, this.midy + (i * (ymult0|0)));
}
g.setColor$java_awt_Color(gray2);
if (!this.lhsfunc.positiveOnly()) {
g.drawLine$I$I$I$I((this.winSize.width/2|0), this.midy - (ymult0|0), (this.winSize.width/2|0), this.midy + (ymult0|0));
}g.setColor$java_awt_Color((I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).white);
this.xRangeWidth = this.lhsfunc.getRangeWidth();
this.xRangeStart = this.lhsfunc.getRangeStart();
this.xRangeEnd = this.lhsfunc.getRangeEnd();
var useRungeKutta = this.lhsfunc.useRungeKutta();
if (useRungeKutta) {
this.rungeKutta$D$D(this.points[0][0], 1);
this.rungeKutta$D$D(this.points[0][0], -1);
}var ox = -1;
var oy = -1;
var ox2 = -1;
var oy2 = -1;
for (i = 0; i != this.sampleCount; i++) {
var dx = (i * this.xRangeWidth / this.sampleCount) + this.xRangeStart;
var dy = this.rhsfunc.calculate$D$DA(dx, null);
this.forceFunc[i] = dy;
if (!useRungeKutta) this.func[i] = this.lhsfunc.calculate$D(dx);
}
g.setColor$java_awt_Color((I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).red);
this.drawGraph$java_awt_Graphics$DA(g, this.forceFunc);
g.setColor$java_awt_Color((I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).white);
this.drawGraph$java_awt_Graphics$DA(g, this.func);
g.setColor$java_awt_Color((I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).red);
for (i = 0; i != 1; i++) {
var x = (((this.points[i][0] - this.xRangeStart) / this.xRangeWidth * this.winSize.width)|0);
var y = this.midy - ((this.points[i][1] * this.ymult)|0);
g.drawLine$I$I$I$I(x - 3, y, x + 3, y);
g.drawLine$I$I$I$I(x, y - 3, x, y + 3);
}
g.setColor$java_awt_Color((I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).white);
this.centerString$java_awt_Graphics$S$I(g, this.lhsfunc.getDescription() + " = " + this.lhsfunc.getRhsScaleDescription() + this.rhsfunc.getDescription() , panelHeight + 10);
if (Clazz.instanceOf(this.rhsfunc, "com.falstad.DiffEqFrame.ZeroRhsFunc")) this.centerString$java_awt_Graphics$S$I(g, this.lhsfunc.getSolution(), panelHeight + 30);
realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
});

Clazz.newMeth(C$, 'drawGraph$java_awt_Graphics$DA', function (g, f) {
var i;
var ox = -1;
var oy = -1;
for (i = 0; i != this.sampleCount; i++) {
var x = (this.winSize.width * i/this.sampleCount|0);
var dx = (i * this.xRangeWidth / this.sampleCount) + this.xRangeStart;
var dy = f[i];
var y = this.midy - ((this.ymult * dy)|0);
if (Double.isNaN(dy) || Double.isInfinite(dy) ) {
ox = x;
if (y < this.midy) y = 0;
 else y = this.midy * 2;
continue;
}if (y < 0 || dy > 1000000.0  ) {
if (oy == 0) {
ox = x;
continue;
}y = 0;
}if (y > this.midy * 2 || dy < -1000000.0  ) {
if (oy == this.midy * 2) {
ox = x;
continue;
}y = this.midy * 2;
}if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
});

Clazz.newMeth(C$, 'setPoint$D$D', function (x, y) {
this.points[0][0] = x;
this.points[0][1] = y;
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
if (this.funcSelected) {
if (x == this.dragX) {
this.editFuncPoint$I$I(x, y);
this.dragY = y;
} else {
var x1 = (x < this.dragX) ? x : this.dragX;
var y1 = (x < this.dragX) ? y : this.dragY;
var x2 = (x > this.dragX) ? x : this.dragX;
var y2 = (x > this.dragX) ? y : this.dragY;
this.dragX = x;
this.dragY = y;
for (x = x1; x <= x2; x++) {
y = y1 + ((y2 - y1) * (x - x1)/(x2 - x1)|0);
this.editFuncPoint$I$I(x, y);
}
}this.cv.repaint$J(0);
return;
}var dx = x * this.xRangeWidth / this.winSize.width + this.xRangeStart;
var dy = (this.midy - y) / this.ymult;
if (dx < this.xRangeStart ) dx = this.xRangeStart;
if (dx >= this.xRangeEnd ) dx = this.xRangeEnd;
this.points[0][0] = dx;
this.points[0][1] = dy;
this.cv.repaint$J(0);
});

Clazz.newMeth(C$, 'editFuncPoint$I$I', function (x, y) {
var dy = (this.midy - y) / this.ymult;
var lox = (x * this.sampleCount/this.winSize.width|0);
var hix = ((x + 1) * this.sampleCount/this.winSize.width|0);
if (hix > this.sampleCount) hix = this.sampleCount;
if (lox < 0) lox = 0;
for (; lox < hix; lox++) this.forceFunc[lox] = dy;

});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
this.cv.repaint$J(0);
});

Clazz.newMeth(C$, 'componentResized$java_awt_event_ComponentEvent', function (e) {
this.handleResize();
this.cv.repaint$J(0);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
if (e.getSource() === this.clearButton ) {
this.doClear();
this.cv.repaint();
}});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
this.cv.repaint$J(0);
});

Clazz.newMeth(C$, 'setLoadCount', function () {
this.sampleCount = this.maxTerms = this.maxMaxTerms;
this.func = Clazz.array(Double.TYPE, [this.sampleCount + 1]);
this.forceFunc = Clazz.array(Double.TYPE, [this.sampleCount + 1]);
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
this.dragX = e.getX();
this.dragY = e.getY();
if ((e.getModifiers() & 16) != 0) return;
if (this.rhsfunc.isCustom()) {
var px = (((this.points[0][0] - this.xRangeStart) / this.xRangeWidth * this.winSize.width)|0);
var py = this.midy - ((this.points[0][1] * this.ymult)|0);
var dx = px - e.getX();
var dy = py - e.getY();
this.funcSelected = (dx * dx + dy * dy > 10);
} else {
this.funcSelected = false;
}});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
if (!this.dragging && this.selectedCoef != -1 ) {
this.selectedCoef = -1;
this.cv.repaint$J(0);
}});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = false;
this.cv.repaint$J(0);
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (e.getItemSelectable() === this.lhsChooser ) this.lhsChanged = true;
if (e.getItemSelectable() === this.rhsChooser ) this.rhsChanged = true;
this.cv.repaint$J(0);
});

Clazz.newMeth(C$, 'solveForConstants$D$D$D$D', function (m1, m2, m3, m4) {
var det = m1 * m4 - m2 * m3;
if (det == 0 ) {
System.out.print$S("solveForConstants: det = 0\u000a");
return;
}var c1 = (m4 * this.points[0][1] - m2 * this.initialValues[0].getValue()) / det;
var c2 = (-m3 * this.points[0][1] + m1 * this.initialValues[0].getValue()) / det;
this.solutionValues[0].setValue$D(c1);
this.solutionValues[1].setValue$D(c2);
});

Clazz.newMeth(C$, 'bessjy$D$D$DA', function (x, xnu, values) {
var EPS = 1.0E-16;
var FPMIN = 1.0E-30;
var MAXIT = 10000;
var XMIN = 2.0;
var PI = 3.141592653589793;
if (x == 0 ) x = 1.0E-20;
var i;
var isign;
var l;
var nl;
var a;
var b;
var br;
var bi;
var c;
var cr;
var ci;
var d;
var del;
var del1;
var den;
var di;
var dlr;
var dli;
var dr;
var e;
var f;
var fact;
var fact2;
var fact3;
var ff;
var gam;
var gam1;
var gam2;
var gammi;
var gampl;
var h;
var p;
var pimu;
var pimu2;
var q;
var r;
var rjl;
var rjl1;
var rjmu;
var rjp1;
var rjpl;
var rjtemp;
var ry1;
var rymu;
var rymup;
var rytemp;
var sum;
var sum1;
var temp;
var w;
var x2;
var xi;
var xi2;
var xmu;
var xmu2;
if (x <= 0.0  || xnu < 0.0  ) {
System.out.print$S("bad arguments in bessjy\u000a");
return;
}nl = (x < 2.0  ? ((xnu + 0.5)|0) : ((xnu - x + 1.5)|0));
if (nl < 0) nl = 0;
xmu = xnu - nl;
xmu2 = xmu * xmu;
xi = 1.0 / x;
xi2 = 2.0 * xi;
w = xi2 / 3.141592653589793;
isign = 1;
h = xnu * xi;
if (h < 1.0E-30 ) h = 1.0E-30;
b = xi2 * xnu;
d = 0.0;
c = h;
for (i = 1; i <= 10000.0 ; i++) {
b += xi2;
d = b - d;
if (java.lang.Math.abs(d) < 1.0E-30 ) d = 1.0E-30;
c = b - 1.0 / c;
if (java.lang.Math.abs(c) < 1.0E-30 ) c = 1.0E-30;
d = 1.0 / d;
del = c * d;
h = del * h;
if (d < 0.0 ) isign = -isign;
if (java.lang.Math.abs(del - 1.0) < 1.0E-16 ) break;
}
if (i > 10000.0 ) {
System.out.print$S("x too large in bessjy; try asymptotic expansion\u000a");
return;
}rjl = isign * 1.0E-30;
rjpl = h * rjl;
rjl1 = rjl;
rjp1 = rjpl;
fact = xnu * xi;
for (l = nl; l >= 1; l--) {
rjtemp = fact * rjl + rjpl;
fact -= xi;
rjpl = fact * rjtemp - rjl;
rjl = rjtemp;
}
if (rjl == 0.0 ) rjl = 1.0E-16;
f = rjpl / rjl;
if (x < 2.0 ) {
x2 = 0.5 * x;
pimu = 3.141592653589793 * xmu;
fact = (java.lang.Math.abs(pimu) < 1.0E-16  ? 1.0 : pimu / java.lang.Math.sin(pimu));
d = -java.lang.Math.log(x2);
e = xmu * d;
fact2 = (java.lang.Math.abs(e) < 1.0E-16  ? 1.0 : (java.lang.Math.exp(e) - java.lang.Math.exp(-e)) / (2 * e));
var gvalues = Clazz.array(Double.TYPE, [4]);
this.beschb$D$DA(xmu, gvalues);
ff = 0.6366197723675814 * fact * (gvalues[0] * (java.lang.Math.exp(e) + java.lang.Math.exp(-e)) / 2 + gvalues[1] * fact2 * d );
e = java.lang.Math.exp(e);
p = e / (gvalues[2] * 3.141592653589793);
q = 1.0 / (e * 3.141592653589793 * gvalues[3] );
pimu2 = 0.5 * pimu;
fact3 = (java.lang.Math.abs(pimu2) < 1.0E-16  ? 1.0 : java.lang.Math.sin(pimu2) / pimu2);
r = 3.141592653589793 * pimu2 * fact3 * fact3 ;
c = 1.0;
d = -x2 * x2;
sum = ff + r * q;
sum1 = p;
for (i = 1; i <= 10000.0 ; i++) {
ff = (i * ff + p + q) / (i * i - xmu2);
c *= (d / i);
p /= (i - xmu);
q /= (i + xmu);
del = c * (ff + r * q);
sum += del;
del1 = c * p - i * del;
sum1 += del1;
if (java.lang.Math.abs(del) < (1.0 + java.lang.Math.abs(sum)) * 1.0E-16 ) break;
}
if (i > 10000.0 ) {
System.out.print$S("bessy series failed to converge\u000a");
return;
}rymu = -sum;
ry1 = -sum1 * xi2;
rymup = xmu * xi * rymu  - ry1;
rjmu = w / (rymup - f * rymu);
} else {
a = 0.25 - xmu2;
p = -0.5 * xi;
q = 1.0;
br = 2.0 * x;
bi = 2.0;
fact = a * xi / (p * p + q * q);
cr = br + q * fact;
ci = bi + p * fact;
den = br * br + bi * bi;
dr = br / den;
di = -bi / den;
dlr = cr * dr - ci * di;
dli = cr * di + ci * dr;
temp = p * dlr - q * dli;
q = p * dli + q * dlr;
p = temp;
for (i = 2; i <= 10000.0 ; i++) {
a += 2 * (i - 1);
bi += 2.0;
dr = a * dr + br;
di = a * di + bi;
if (java.lang.Math.abs(dr) + java.lang.Math.abs(di) < 1.0E-30 ) dr = 1.0E-30;
fact = a / (cr * cr + ci * ci);
cr = br + cr * fact;
ci = bi - ci * fact;
if (java.lang.Math.abs(cr) + java.lang.Math.abs(ci) < 1.0E-30 ) cr = 1.0E-30;
den = dr * dr + di * di;
dr /= den;
di /= -den;
dlr = cr * dr - ci * di;
dli = cr * di + ci * dr;
temp = p * dlr - q * dli;
q = p * dli + q * dlr;
p = temp;
if (java.lang.Math.abs(dlr - 1.0) + java.lang.Math.abs(dli) < 1.0E-16 ) break;
}
if (i > 10000.0 ) {
System.out.print$S("cf2 failed in bessjy\u000a");
return;
}gam = (p - f) / q;
rjmu = java.lang.Math.sqrt(w / ((p - f) * gam + q));
rjmu = (rjl > 0 ) ? rjmu : -rjmu;
rymu = rjmu * gam;
rymup = rymu * (p + q / gam);
ry1 = xmu * xi * rymu  - rymup;
}fact = rjmu / rjl;
values[0] = rjl1 * fact;
values[1] = rjp1 * fact;
for (i = 1; i <= nl; i++) {
rytemp = (xmu + i) * xi2 * ry1  - rymu;
rymu = ry1;
ry1 = rytemp;
}
values[2] = rymu;
values[3] = xnu * xi * rymu  - ry1;
});

Clazz.newMeth(C$, 'beschb$D$DA', function (x, values) {
var xx;
var c1 = Clazz.array(Double.TYPE, -1, [-1.142022680371172, 0.006516511267076, 3.08709017308E-4, -3.470626964E-6, 6.943764E-9, 3.678E-11, -1.36E-13]);
var c2 = Clazz.array(Double.TYPE, -1, [1.843740587300906, -0.076852840844786, 0.001271927136655, -4.971736704E-6, -3.312612E-8, 2.4231E-10, -1.7E-13, -1.0E-15]);
xx = 8.0 * x * x  - 1.0;
values[0] = this.chebev$D$D$DA$I$D(-1.0, 1.0, c1, 7, xx);
values[1] = this.chebev$D$D$DA$I$D(-1.0, 1.0, c2, 8, xx);
values[2] = values[1] - x * values[0];
values[3] = values[1] + x * values[0];
});

Clazz.newMeth(C$, 'chebev$D$D$DA$I$D', function (a, b, c, m, x) {
var d = 0.0;
var dd = 0.0;
var sv;
var y;
var y2;
var j;
if ((x - a) * (x - b) > 0.0 ) {
System.out.print$S("x not in range in routine CHEBEV\u000a");
return 0;
}y2 = 2.0 * (y = (2.0 * x - a - b) / (b - a));
for (j = m - 1; j >= 1; j--) {
sv = d;
d = y2 * d - dd + c[j];
dd = sv;
}
return y * d - dd + 0.5 * c[0];
});

Clazz.newMeth(C$, 'legendreP$I$D$DA$DA', function (n, x, pn, pd) {
var p0 = 1;
var p1 = x;
var k;
pn[0] = 1;
pn[1] = x;
pd[0] = 0;
pd[1] = 1;
for (k = 2; k <= n; k++) {
var pf = (2 * k - 1.0) / k * x * p1 - (k - 1.0) / k * p0;
pn[k] = pf;
if (x == 1  || x == -1  ) pd[k] = 0.5 * java.lang.Math.pow(x, k + 1) * k * (k + 1) ;
 else pd[k] = k * (p1 - x * pf) / (1 - x * x);
p0 = p1;
p1 = pf;
}
});

Clazz.newMeth(C$, 'legendreQ$I$D$DA$DA', function (n, x, qn, qd) {
var q0;
var q1;
var k;
if (x == 1 ) x = 0.999999999999999;
if (x == -1 ) x = -0.99999999999999;
q0 = 0.5 * java.lang.Math.log((1 + x) / (1 - x));
q1 = x * q0 - 1;
qn[0] = q0;
qn[1] = q1;
qd[0] = 1 / (1 - x * x);
qd[1] = qn[0] + x * qd[0];
for (k = 2; k <= n; k++) {
var qf = ((2 * k - 1.0) * x * q1  - (k - 1) * q0) / k;
qn[k] = qf;
qd[k] = (qn[k - 1] - x * qf) * k / (1 - x * x);
q0 = q1;
q1 = qf;
}
});
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "LhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'setup', function () {
});

Clazz.newMeth(C$, 'newFunc', function () {
});

Clazz.newMeth(C$, 'newFuncSolution', function () {
});

Clazz.newMeth(C$, 'positiveOnly', function () {
return false;
});

Clazz.newMeth(C$, 'useRungeKutta', function () {
return true;
});

Clazz.newMeth(C$, 'getRangeWidth', function () {
return 100;
});

Clazz.newMeth(C$, 'calculate$D', function (x) {
return 0;
});

Clazz.newMeth(C$, 'calculateDiffs$D$DA$D', function (x, y, rs) {
return 0;
});

Clazz.newMeth(C$, 'getRhsScale', function () {
return 1;
});

Clazz.newMeth(C$, 'getRhsScaleDescription', function () {
return "";
});

Clazz.newMeth(C$, 'getRangeStart', function () {
return (this.b$['com.falstad.DiffEqFrame'].lhsfunc.positiveOnly()) ? 0 : -this.getRangeWidth() / 2;
});

Clazz.newMeth(C$, 'getRangeEnd', function () {
return this.getRangeStart() + this.getRangeWidth();
});

Clazz.newMeth(C$, 'getSolution', function () {
return "";
});

Clazz.newMeth(C$, 'setSolution', function () {
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "Order2LhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.va = 0;
this.vb = 0;
this.vc = 0;
this.complexDisc = false;
this.linear = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "ay\'\'+by\'+cy";
});

Clazz.newMeth(C$, 'getOrder', function () {
return 2;
});

Clazz.newMeth(C$, 'setup', function () {
this.va = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
this.vb = this.b$['com.falstad.DiffEqFrame'].lhsValues[1].getValue();
this.vc = this.b$['com.falstad.DiffEqFrame'].lhsValues[2].getValue();
});

Clazz.newMeth(C$, 'calculateDiffs$D$DA$D', function (x, y, rs) {
return -(this.vb * y[1] + this.vc * y[0] - rs) / this.va;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "ay\'\' + by\' + cy";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("a", 1, 4);
this.b$['com.falstad.DiffEqFrame'].lhsValues[1].setup$S$D$I("b", 0.07, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[2].setup$S$D$I("c", 1, 0);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(this.getRangeStart(), 10.0);
});

Clazz.newMeth(C$, 'newFuncSolution', function () {
this.b$['com.falstad.DiffEqFrame'].solutionValues[0].setLabel$S("c1");
this.b$['com.falstad.DiffEqFrame'].solutionValues[1].setLabel$S("c2");
this.b$['com.falstad.DiffEqFrame'].solutionValues[2].setLabel$S("c3");
this.b$['com.falstad.DiffEqFrame'].solutionValues[2].setFlags$I(8);
this.b$['com.falstad.DiffEqFrame'].solutionValues[3].setLabel$S("c4");
this.b$['com.falstad.DiffEqFrame'].solutionValues[3].setFlags$I(8);
});

Clazz.newMeth(C$, 'getSolution', function () {
var disc = this.vb * this.vb - 4 * this.va * this.vc ;
this.complexDisc = false;
this.linear = false;
if (disc < 0 ) {
disc = -disc;
this.complexDisc = true;
}disc = java.lang.Math.sqrt(disc);
var a1 = 0;
var a2 = 0;
var c1;
var c2;
var sarg = 0;
var pointcount = 2;
var m1;
var m2;
var m3;
var m4;
var x = this.b$['com.falstad.DiffEqFrame'].points[0][0];
if (this.complexDisc) {
a1 = a2 = -this.vb / (2 * this.va);
sarg = disc / (2 * this.va);
m1 = java.lang.Math.exp(a1 * x) * java.lang.Math.sin(sarg * x);
m2 = java.lang.Math.exp(a1 * x) * java.lang.Math.cos(sarg * x);
m3 = java.lang.Math.exp(a1 * x) * (a1 * java.lang.Math.sin(sarg * x) + sarg * java.lang.Math.cos(sarg * x));
m4 = java.lang.Math.exp(a1 * x) * (a1 * java.lang.Math.cos(sarg * x) - sarg * java.lang.Math.sin(sarg * x));
} else if (this.vb == 0  && this.vc == 0  ) {
this.linear = true;
m1 = this.b$['com.falstad.DiffEqFrame'].points[0][0];
m2 = m3 = 1;
m4 = 0;
} else {
a1 = (-this.vb + disc) / (2 * this.va);
a2 = (-this.vb - disc) / (2 * this.va);
m1 = java.lang.Math.exp(a1 * x);
m2 = java.lang.Math.exp(a2 * x);
m3 = a1 * java.lang.Math.exp(a1 * x);
m4 = a2 * java.lang.Math.exp(a2 * x);
}this.b$['com.falstad.DiffEqFrame'].solveForConstants$D$D$D$D(m1, m2, m3, m4);
if (this.complexDisc) {
this.b$['com.falstad.DiffEqFrame'].solutionValues[2].setValue$D(a1);
this.b$['com.falstad.DiffEqFrame'].solutionValues[3].setValue$D(sarg);
return "y = exp(c3 x) (c1 sin(c4 x)+c2 cos(c4 x))";
} else if (this.linear) {
return "y = c1 x + c2";
} else {
this.b$['com.falstad.DiffEqFrame'].solutionValues[2].setValue$D(a1);
this.b$['com.falstad.DiffEqFrame'].solutionValues[3].setValue$D(a2);
if (a1 == 0 ) return "y = c1 + c2 exp(c4 x)";
return "y = c1 exp(c3 x) + c2 exp(c4 x)";
}});

Clazz.newMeth(C$, 'setSolution', function () {
var x = this.b$['com.falstad.DiffEqFrame'].points[0][0];
if (this.complexDisc) {
var c1 = this.b$['com.falstad.DiffEqFrame'].solutionValues[0].getValue();
var c2 = this.b$['com.falstad.DiffEqFrame'].solutionValues[1].getValue();
var a1 = this.b$['com.falstad.DiffEqFrame'].solutionValues[2].getValue();
var sarg = this.b$['com.falstad.DiffEqFrame'].solutionValues[3].getValue();
this.b$['com.falstad.DiffEqFrame'].points[0][1] = java.lang.Math.exp(a1 * x) * (c1 * java.lang.Math.sin(sarg * x) + c2 * java.lang.Math.cos(sarg * x));
var q;
this.b$['com.falstad.DiffEqFrame'].initialValues[0].setValue$D(q = java.lang.Math.exp(a1 * x) * ((c1 * a1 - c2 * sarg) * java.lang.Math.sin(sarg * x) + (c2 * a1 + c1 * sarg) * java.lang.Math.cos(sarg * x)));
} else if (this.linear) {
var m = this.b$['com.falstad.DiffEqFrame'].solutionValues[0].getValue();
var b = this.b$['com.falstad.DiffEqFrame'].solutionValues[1].getValue();
this.b$['com.falstad.DiffEqFrame'].points[0][1] = m * x + b;
this.b$['com.falstad.DiffEqFrame'].initialValues[0].setValue$D(m);
} else {
var c1 = this.b$['com.falstad.DiffEqFrame'].solutionValues[0].getValue();
var c2 = this.b$['com.falstad.DiffEqFrame'].solutionValues[1].getValue();
var a1 = this.b$['com.falstad.DiffEqFrame'].solutionValues[2].getValue();
var a2 = this.b$['com.falstad.DiffEqFrame'].solutionValues[3].getValue();
this.b$['com.falstad.DiffEqFrame'].points[0][1] = c1 * java.lang.Math.exp(a1 * x) + c2 * java.lang.Math.exp(a2 * x);
this.b$['com.falstad.DiffEqFrame'].initialValues[0].setValue$D(c1 * a1 * java.lang.Math.exp(a1 * x)  + c2 * a2 * java.lang.Math.exp(a2 * x) );
}});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').Order1LhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "OscillatorLhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.Order2LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "harmonic oscillator";
});

Clazz.newMeth(C$, 'getRhsScale', function () {
return this.vc;
});

Clazz.newMeth(C$, 'getRhsScaleDescription', function () {
return "w\u00b2 ";
});

Clazz.newMeth(C$, 'setup', function () {
var beta = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
var omega = this.b$['com.falstad.DiffEqFrame'].lhsValues[1].getValue();
this.va = 1;
this.vb = 2 * beta;
this.vc = omega * omega;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "y\'\' + 2by\' + w\u00b2 y";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("b", 0.035, 1);
this.b$['com.falstad.DiffEqFrame'].lhsValues[1].setup$S$D$I("w", 1, 5);
this.b$['com.falstad.DiffEqFrame'].lhsValues[1].setMax$D(7);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(this.getRangeStart(), 10.0);
});

Clazz.newMeth(C$, 'newFuncSolution', function () {
this.b$['com.falstad.DiffEqFrame'].solutionValues[0].setLabel$S("c1");
this.b$['com.falstad.DiffEqFrame'].solutionValues[1].setLabel$S("c2");
this.b$['com.falstad.DiffEqFrame'].solutionValues[2].setLabel$S("c3");
this.b$['com.falstad.DiffEqFrame'].solutionValues[3].setLabel$S("c4");
this.b$['com.falstad.DiffEqFrame'].solutionValues[2].setFlags$I(8);
this.b$['com.falstad.DiffEqFrame'].solutionValues[3].setFlags$I(8);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[3]||(I$[3]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').Order2LhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "Order1LhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.va = 0;
this.vb = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "ay\'+by";
});

Clazz.newMeth(C$, 'getOrder', function () {
return 1;
});

Clazz.newMeth(C$, 'setup', function () {
this.va = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
this.vb = this.b$['com.falstad.DiffEqFrame'].lhsValues[1].getValue();
});

Clazz.newMeth(C$, 'getRhsScale', function () {
return this.vb;
});

Clazz.newMeth(C$, 'getRhsScaleDescription', function () {
return "b ";
});

Clazz.newMeth(C$, 'calculateDiffs$D$DA$D', function (x, y, rs) {
return (-this.vb * y[0] + rs) / this.va;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "ay\' + by";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("a", 23, 4);
this.b$['com.falstad.DiffEqFrame'].lhsValues[1].setup$S$D$I("b", 1, 0);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(0, 1);
});

Clazz.newMeth(C$, 'newFuncSolution', function () {
this.b$['com.falstad.DiffEqFrame'].solutionValues[0].setLabel$S("c");
this.b$['com.falstad.DiffEqFrame'].solutionValues[1].setLabel$S("d");
this.b$['com.falstad.DiffEqFrame'].solutionValues[1].setFlags$I(8);
});

Clazz.newMeth(C$, 'getSolution', function () {
var d = -this.vb / this.va;
var x = this.b$['com.falstad.DiffEqFrame'].points[0][0];
var y1 = java.lang.Math.exp(d * x);
var c = this.b$['com.falstad.DiffEqFrame'].points[0][1] / y1;
this.b$['com.falstad.DiffEqFrame'].solutionValues[0].setValue$D(c);
this.b$['com.falstad.DiffEqFrame'].solutionValues[1].setValue$D(d);
return "y = c exp(d x)";
});

Clazz.newMeth(C$, 'setSolution', function () {
var x = this.b$['com.falstad.DiffEqFrame'].points[0][0];
var c = this.b$['com.falstad.DiffEqFrame'].solutionValues[0].getValue();
var d = this.b$['com.falstad.DiffEqFrame'].solutionValues[1].getValue();
this.b$['com.falstad.DiffEqFrame'].points[0][1] = c * java.lang.Math.exp(d * x);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[4]||(I$[4]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').FreeFallLhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "FreeFallLhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.va = 0;
this.vb = 0;
this.vc = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "falling object";
});

Clazz.newMeth(C$, 'getOrder', function () {
return 2;
});

Clazz.newMeth(C$, 'setup', function () {
this.va = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
this.vb = this.b$['com.falstad.DiffEqFrame'].lhsValues[1].getValue();
this.vc = this.b$['com.falstad.DiffEqFrame'].lhsValues[2].getValue() * this.va;
});

Clazz.newMeth(C$, 'calculateDiffs$D$DA$D', function (x, y, rs) {
return -(this.vb * y[1] + this.vc - rs) / this.va;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "my\'\' + by\' + mg";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("m", 1, 5);
this.b$['com.falstad.DiffEqFrame'].lhsValues[1].setup$S$D$I("b", 0.07, 1);
this.b$['com.falstad.DiffEqFrame'].lhsValues[2].setup$S$D$I("g", 0.098, 0);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(this.getRangeStart(), 10.0);
});

Clazz.newMeth(C$, 'newFuncSolution', function () {
this.b$['com.falstad.DiffEqFrame'].solutionValues[0].setLabel$S("c1");
this.b$['com.falstad.DiffEqFrame'].solutionValues[1].setLabel$S("c2");
this.b$['com.falstad.DiffEqFrame'].solutionValues[1].setFlags$I(8);
this.b$['com.falstad.DiffEqFrame'].solutionValues[2].setLabel$S("c3");
this.b$['com.falstad.DiffEqFrame'].solutionValues[2].setFlags$I(8);
this.b$['com.falstad.DiffEqFrame'].solutionValues[3].setLabel$S("c4");
});

Clazz.newMeth(C$, 'getSolution', function () {
var x = this.b$['com.falstad.DiffEqFrame'].points[0][0];
var c2 = -this.vb / this.va;
var c3 = -this.vc / this.vb;
var c1 = 0;
var c4 = 0;
if (this.vb == 0 ) {
c1 = 0;
c2 = -this.vc / 2;
c3 = this.b$['com.falstad.DiffEqFrame'].initialValues[0].getValue() - 2 * c2 * x ;
c4 = this.b$['com.falstad.DiffEqFrame'].points[0][1] - c3 * x - c2 * x * x ;
} else {
c1 = (this.b$['com.falstad.DiffEqFrame'].initialValues[0].getValue() - c3) / (c2 * java.lang.Math.exp(c2 * x));
c4 = this.b$['com.falstad.DiffEqFrame'].points[0][1] - c3 * x - c1 * java.lang.Math.exp(c2 * x);
}this.b$['com.falstad.DiffEqFrame'].solutionValues[0].setValue$D(c1);
this.b$['com.falstad.DiffEqFrame'].solutionValues[1].setValue$D(c2);
this.b$['com.falstad.DiffEqFrame'].solutionValues[2].setValue$D(c3);
this.b$['com.falstad.DiffEqFrame'].solutionValues[3].setValue$D(c4);
if (this.vb == 0 ) return "y = c2 x\u00b2 + c3 x + c4";
return "y = c1 exp(c2 x) + c3 x + c4";
});

Clazz.newMeth(C$, 'setSolution', function () {
var x = this.b$['com.falstad.DiffEqFrame'].points[0][0];
var c1 = this.b$['com.falstad.DiffEqFrame'].solutionValues[0].getValue();
var c2 = this.b$['com.falstad.DiffEqFrame'].solutionValues[1].getValue();
var c3 = this.b$['com.falstad.DiffEqFrame'].solutionValues[2].getValue();
var c4 = this.b$['com.falstad.DiffEqFrame'].solutionValues[3].getValue();
if (this.vb == 0 ) {
this.b$['com.falstad.DiffEqFrame'].points[0][1] = c2 * x * x  + c3 * x + c4;
this.b$['com.falstad.DiffEqFrame'].initialValues[0].setValue$D(2 * c2 * x  + c3);
} else {
this.b$['com.falstad.DiffEqFrame'].points[0][1] = c1 * java.lang.Math.exp(c2 * x) + c3 * x + c4;
this.b$['com.falstad.DiffEqFrame'].initialValues[0].setValue$D(c1 * c2 * java.lang.Math.exp(c2 * x)  + c3);
}});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[5]||(I$[5]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').BesselLhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "BesselLhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.va = 0;
this.c1 = 0;
this.c2 = 0;
this.vals = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Bessel";
});

Clazz.newMeth(C$, 'getOrder', function () {
return 2;
});

Clazz.newMeth(C$, 'positiveOnly', function () {
return true;
});

Clazz.newMeth(C$, 'useRungeKutta', function () {
return false;
});

Clazz.newMeth(C$, 'setup', function () {
this.va = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
this.va *= this.va;
this.vals = Clazz.array(Double.TYPE, [4]);
this.getSolution();
this.c1 = this.b$['com.falstad.DiffEqFrame'].solutionValues[0].getValue();
this.c2 = this.b$['com.falstad.DiffEqFrame'].solutionValues[1].getValue();
});

Clazz.newMeth(C$, 'calculate$D', function (x) {
var p = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
this.b$['com.falstad.DiffEqFrame'].bessjy$D$D$DA(x, p, this.vals);
return this.vals[0] * this.c1 + this.vals[2] * this.c2;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "x\u00b2 y\'\' + xy\' + (x\u00b2-p\u00b2)y";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("p", 0, 1);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(0, 10.0);
});

Clazz.newMeth(C$, 'newFuncSolution', function () {
this.b$['com.falstad.DiffEqFrame'].solutionValues[0].setLabel$S("c1");
this.b$['com.falstad.DiffEqFrame'].solutionValues[1].setLabel$S("c2");
});

Clazz.newMeth(C$, 'getSolution', function () {
var x = this.b$['com.falstad.DiffEqFrame'].points[0][0];
var p = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
var vals = Clazz.array(Double.TYPE, [4]);
this.b$['com.falstad.DiffEqFrame'].bessjy$D$D$DA(x, p, vals);
this.b$['com.falstad.DiffEqFrame'].solveForConstants$D$D$D$D(vals[0], vals[2], vals[1], vals[3]);
return "y = c1 Jp(x) + c2 Yp(x)";
});

Clazz.newMeth(C$, 'setSolution', function () {
var x = this.b$['com.falstad.DiffEqFrame'].points[0][0];
var p = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
var vals = Clazz.array(Double.TYPE, [4]);
this.b$['com.falstad.DiffEqFrame'].bessjy$D$D$DA(x, p, vals);
var c1 = this.b$['com.falstad.DiffEqFrame'].solutionValues[0].getValue();
var c2 = this.b$['com.falstad.DiffEqFrame'].solutionValues[1].getValue();
this.b$['com.falstad.DiffEqFrame'].points[0][1] = vals[0] * c1 + vals[2] * c2;
this.b$['com.falstad.DiffEqFrame'].initialValues[0].setValue$D(vals[1] * c1 + vals[3] * c2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[6]||(I$[6]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').BesselIntegerLhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "BesselIntegerLhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.BesselLhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Bessel (integer p)";
});

Clazz.newMeth(C$, 'newFunc', function () {
C$.superclazz.prototype.newFunc.apply(this, []);
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setFlags$I(3);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[7]||(I$[7]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').BesselHalfIntegerLhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "BesselHalfIntegerLhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.BesselLhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Bessel (half-integer p)";
});

Clazz.newMeth(C$, 'newFunc', function () {
C$.superclazz.prototype.newFunc.apply(this, []);
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setValue$D(0.5);
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setFlags$I(17);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(this.getRangeWidth() / 2, 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[8]||(I$[8]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').LegendreLhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "LegendreLhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.va = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Legendre";
});

Clazz.newMeth(C$, 'getOrder', function () {
return 2;
});

Clazz.newMeth(C$, 'getRangeWidth', function () {
return 2;
});

Clazz.newMeth(C$, 'setup', function () {
this.va = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
this.va = this.va * (this.va + 1);
});

Clazz.newMeth(C$, 'calculateDiffs$D$DA$D', function (x, y, rs) {
return -(-2 * x * y[1]  + this.va * y[0] - rs) / (1 - x * x);
});

Clazz.newMeth(C$, 'getDescription', function () {
return "(1-x\u00b2)y\'\' -2xy\' + p(p+1)y";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("p", 7, 1);
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setMax$D(40);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(0, -5.0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[9]||(I$[9]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').LegendreIntegerLhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "LegendreIntegerLhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LegendreLhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Legendre (integer order)";
});

Clazz.newMeth(C$, 'newFunc', function () {
C$.superclazz.prototype.newFunc.apply(this, []);
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("n", 7, 3);
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setMax$D(40);
});

Clazz.newMeth(C$, 'newFuncSolution', function () {
this.b$['com.falstad.DiffEqFrame'].solutionValues[0].setLabel$S("c1");
this.b$['com.falstad.DiffEqFrame'].solutionValues[1].setLabel$S("c2");
});

Clazz.newMeth(C$, 'getSolution', function () {
var x = this.b$['com.falstad.DiffEqFrame'].points[0][0];
var p = (this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue()|0);
var vn = Clazz.array(Double.TYPE, [p + 2]);
var vd = Clazz.array(Double.TYPE, [p + 2]);
this.b$['com.falstad.DiffEqFrame'].legendreP$I$D$DA$DA(p, x, vn, vd);
var pn = vn[p];
var pd = vd[p];
this.b$['com.falstad.DiffEqFrame'].legendreQ$I$D$DA$DA(p, x, vn, vd);
var qn = vn[p];
var qd = vd[p];
this.b$['com.falstad.DiffEqFrame'].solveForConstants$D$D$D$D(pn, qn, pd, qd);
return "y = c1 Pn(x) + c2 Qn(x)";
});

Clazz.newMeth(C$, 'setSolution', function () {
var x = this.b$['com.falstad.DiffEqFrame'].points[0][0];
var p = (this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue()|0);
var vn = Clazz.array(Double.TYPE, [p + 2]);
var vd = Clazz.array(Double.TYPE, [p + 2]);
this.b$['com.falstad.DiffEqFrame'].legendreP$I$D$DA$DA(p, x, vn, vd);
var pn = vn[p];
var pd = vd[p];
this.b$['com.falstad.DiffEqFrame'].legendreQ$I$D$DA$DA(p, x, vn, vd);
var qn = vn[p];
var qd = vd[p];
var c1 = this.b$['com.falstad.DiffEqFrame'].solutionValues[0].getValue();
var c2 = this.b$['com.falstad.DiffEqFrame'].solutionValues[1].getValue();
this.b$['com.falstad.DiffEqFrame'].points[0][1] = pn * c1 + qn * c2;
this.b$['com.falstad.DiffEqFrame'].initialValues[0].setValue$D(pd * c1 + qd * c2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[10]||(I$[10]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').HermiteLhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "HermiteLhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.va = 0;
this.vb = 0;
this.vc = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Hermite";
});

Clazz.newMeth(C$, 'getOrder', function () {
return 2;
});

Clazz.newMeth(C$, 'getRangeWidth', function () {
return 4;
});

Clazz.newMeth(C$, 'setup', function () {
this.va = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
});

Clazz.newMeth(C$, 'calculateDiffs$D$DA$D', function (x, y, rs) {
return 2 * x * y[1]  - 2 * this.va * y[0]  + rs;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "y\'\'-2xy\'+2ny";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("n", 12, 1);
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setMax$D(2000);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(0, -5.0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').JacobiLhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "JacobiLhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.va = 0;
this.vb = 0;
this.vn = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Jacobi";
});

Clazz.newMeth(C$, 'getOrder', function () {
return 2;
});

Clazz.newMeth(C$, 'getRangeWidth', function () {
return 2;
});

Clazz.newMeth(C$, 'setup', function () {
this.vn = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
this.va = this.b$['com.falstad.DiffEqFrame'].lhsValues[1].getValue();
this.vb = this.b$['com.falstad.DiffEqFrame'].lhsValues[2].getValue();
});

Clazz.newMeth(C$, 'calculateDiffs$D$DA$D', function (x, y, rs) {
return -((this.vb - this.va - (this.va + this.vb + 2 ) * x ) * y[1] + this.vn * (this.vn + this.va + this.vb + 1 ) * y[0]  + rs) / (1 - x * x);
});

Clazz.newMeth(C$, 'getDescription', function () {
return "(1-x\u00b2)y\'\'+(b-a-(a+b+2)x)y\'+n(n+a+b+1)y";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("n", 10, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[1].setup$S$D$I("a", 1, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[2].setup$S$D$I("b", 1, 0);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(0, 2);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[12]||(I$[12]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').Order4LhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "Order4LhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.va = 0;
this.vb = 0;
this.vc = 0;
this.vd = 0;
this.ve = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "ay\'\'\'\'+by\'\'\'+cy\'\'+dy\'+ey";
});

Clazz.newMeth(C$, 'getOrder', function () {
return 4;
});

Clazz.newMeth(C$, 'setup', function () {
this.va = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
this.vb = this.b$['com.falstad.DiffEqFrame'].lhsValues[1].getValue();
this.vc = this.b$['com.falstad.DiffEqFrame'].lhsValues[2].getValue();
this.vd = this.b$['com.falstad.DiffEqFrame'].lhsValues[3].getValue();
this.ve = this.b$['com.falstad.DiffEqFrame'].lhsValues[4].getValue();
});

Clazz.newMeth(C$, 'calculateDiffs$D$DA$D', function (x, y, rs) {
return -(this.vb * y[3] + this.vc * y[2] + this.vd * y[1] + this.ve * y[0] - rs) / this.va;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "ay\'\'\'\' + by\'\'\' + cy\'\' + dy\' + ey";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("a", 6, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[1].setup$S$D$I("b", 0, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[2].setup$S$D$I("c", 1, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[3].setup$S$D$I("d", 0, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[4].setup$S$D$I("e", 0, 0);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(0, 0);
this.b$['com.falstad.DiffEqFrame'].initialValues[0].setValue$D(0.1);
this.b$['com.falstad.DiffEqFrame'].initialValues[1].setValue$D(0.5);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[13]||(I$[13]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').EquidimensionalOrder2LhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "EquidimensionalOrder2LhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.va = 0;
this.vb = 0;
this.vc = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "equidimensional";
});

Clazz.newMeth(C$, 'getOrder', function () {
return 2;
});

Clazz.newMeth(C$, 'positiveOnly', function () {
return true;
});

Clazz.newMeth(C$, 'setup', function () {
this.va = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
this.vb = this.b$['com.falstad.DiffEqFrame'].lhsValues[1].getValue();
this.vc = this.b$['com.falstad.DiffEqFrame'].lhsValues[2].getValue();
});

Clazz.newMeth(C$, 'calculateDiffs$D$DA$D', function (x, y, rs) {
return -(this.vb * y[1] * x  + this.vc * y[0] - rs) / (this.va * x * x );
});

Clazz.newMeth(C$, 'getDescription', function () {
return "ax\u00b2 y\'\' + bx y\' + c y";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("a", 0.5, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[1].setup$S$D$I("b", 0, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[2].setup$S$D$I("c", 20, 0);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(this.getRangeWidth() / 2, 5.0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').PendulumLhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "PendulumLhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.beta = 0;
this.omega = 0;
this.omega2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "pendulum";
});

Clazz.newMeth(C$, 'getOrder', function () {
return 2;
});

Clazz.newMeth(C$, 'setup', function () {
this.beta = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
this.omega = this.b$['com.falstad.DiffEqFrame'].lhsValues[1].getValue();
this.omega2 = this.omega * this.omega;
});

Clazz.newMeth(C$, 'getRhsScale', function () {
return this.omega2;
});

Clazz.newMeth(C$, 'getRhsScaleDescription', function () {
return "w\u00b2 ";
});

Clazz.newMeth(C$, 'calculateDiffs$D$DA$D', function (x, y, rs) {
return -2 * this.beta * y[1]  - this.omega2 * java.lang.Math.sin(y[0]) + rs;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "y\'\' + 2by\' + w\u00b2 sin(y)";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("b", 0.035, 1);
this.b$['com.falstad.DiffEqFrame'].lhsValues[1].setup$S$D$I("w", 1, 5);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(this.getRangeStart(), 3.1);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[15]||(I$[15]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').DuffingLhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "DuffingLhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.va = 0;
this.vb = 0;
this.vc = 0;
this.vd = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Duffing";
});

Clazz.newMeth(C$, 'getOrder', function () {
return 2;
});

Clazz.newMeth(C$, 'setup', function () {
this.va = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
this.vb = this.b$['com.falstad.DiffEqFrame'].lhsValues[1].getValue();
this.vc = this.b$['com.falstad.DiffEqFrame'].lhsValues[2].getValue();
this.vd = this.b$['com.falstad.DiffEqFrame'].lhsValues[3].getValue();
});

Clazz.newMeth(C$, 'calculateDiffs$D$DA$D', function (x, y, rs) {
return -(this.vb * y[1] + this.vc * y[0] + this.vd * y[0] * y[0] * y[0]  - rs) / this.va;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "ay\'\' + by\' + cy + dy\u00b3";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("a", 6, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[1].setup$S$D$I("b", 0.6, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[2].setup$S$D$I("c", 1, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[3].setup$S$D$I("d", 0.77, 0);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(this.getRangeStart(), 10.0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[16]||(I$[16]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').VanDerPolFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "VanDerPolFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.LhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.va = 0;
this.vb = 0;
this.vc = 0;
this.vd = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "Van der Pol";
});

Clazz.newMeth(C$, 'getOrder', function () {
return 2;
});

Clazz.newMeth(C$, 'setup', function () {
this.va = this.b$['com.falstad.DiffEqFrame'].lhsValues[0].getValue();
this.vb = this.b$['com.falstad.DiffEqFrame'].lhsValues[1].getValue();
this.vc = this.b$['com.falstad.DiffEqFrame'].lhsValues[2].getValue();
this.vd = this.b$['com.falstad.DiffEqFrame'].lhsValues[3].getValue();
});

Clazz.newMeth(C$, 'calculateDiffs$D$DA$D', function (x, y, rs) {
return (this.vb * (this.vc * this.vc - y[0] * y[0]) * y[1]  - this.vd * y[0] + rs) / this.va;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "ay\'\'+b(c\u00b2-y\u00b2)y\'+dy";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].lhsValues[0].setup$S$D$I("a", 6, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[1].setup$S$D$I("b", 0.04, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[2].setup$S$D$I("c", 3, 0);
this.b$['com.falstad.DiffEqFrame'].lhsValues[3].setup$S$D$I("d", 21, 0);
this.b$['com.falstad.DiffEqFrame'].setPoint$D$D(this.getRangeStart(), 1);
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "RhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
});

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'setup', function () {
});

Clazz.newMeth(C$, 'isCustom', function () {
return false;
});

Clazz.newMeth(C$, 'newFunc', function () {
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "ZeroRhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.RhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "zero";
});

Clazz.newMeth(C$, 'calculate$D$DA', function (x, y) {
return 0;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[17]||(I$[17]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').ImpulseRhsFunc))), [this, null]);
});

Clazz.newMeth(C$, 'getDescription', function () {
return "0";
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "ImpulseRhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.RhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.vd = 0;
this.ve = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "impulse";
});

Clazz.newMeth(C$, 'setup', function () {
this.vd = this.b$['com.falstad.DiffEqFrame'].rhsValues[0].getValue();
this.ve = this.b$['com.falstad.DiffEqFrame'].rhsValues[1].getValue();
});

Clazz.newMeth(C$, 'calculate$D$DA', function (x, y) {
return x < 0  ? 0 : (x < this.vd ) ? this.ve : 0;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[18]||(I$[18]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').StepRhsFunc))), [this, null]);
});

Clazz.newMeth(C$, 'getDescription', function () {
return "h(H(x-g)-H(x))";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].rhsValues[0].setup$S$D$I("g", 20, 0);
this.b$['com.falstad.DiffEqFrame'].rhsValues[1].setup$S$D$I("h", 3, 0);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "StepRhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.RhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.ve = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'setup', function () {
this.ve = this.b$['com.falstad.DiffEqFrame'].rhsValues[0].getValue();
});

Clazz.newMeth(C$, 'getName', function () {
return "step";
});

Clazz.newMeth(C$, 'calculate$D$DA', function (x, y) {
return x > 0  ? this.ve : 0;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "h H(x)";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[19]||(I$[19]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').SquareWaveRhsFunc))), [this, null]);
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].rhsValues[0].setup$S$D$I("h", 3, 0);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "SquareWaveRhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.RhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.vd = 0;
this.ve = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "square wave";
});

Clazz.newMeth(C$, 'setup', function () {
this.vd = 6.2831853 / this.b$['com.falstad.DiffEqFrame'].rhsValues[0].getValue();
this.ve = this.b$['com.falstad.DiffEqFrame'].rhsValues[1].getValue();
});

Clazz.newMeth(C$, 'calculate$D$DA', function (x, y) {
return (((x|0) + 100) % this.vd > (this.vd / 2) ) ? -this.ve : this.ve;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "h Square(gx)";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[20]||(I$[20]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').SineWaveRhsFunc))), [this, null]);
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].rhsValues[0].setup$S$D$I("g", 0.25, 0);
this.b$['com.falstad.DiffEqFrame'].rhsValues[1].setup$S$D$I("h", 3, 0);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "SineWaveRhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.RhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.vd = 0;
this.ve = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "sine wave";
});

Clazz.newMeth(C$, 'setup', function () {
this.vd = this.b$['com.falstad.DiffEqFrame'].rhsValues[0].getValue();
this.ve = this.b$['com.falstad.DiffEqFrame'].rhsValues[1].getValue();
});

Clazz.newMeth(C$, 'calculate$D$DA', function (x, y) {
return java.lang.Math.sin(x * this.vd) * this.ve;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "h sin(gx)";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[21]||(I$[21]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').SawtoothRhsFunc))), [this, null]);
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].rhsValues[0].setup$S$D$I("g", 0.25, 0);
this.b$['com.falstad.DiffEqFrame'].rhsValues[1].setup$S$D$I("h", 3, 0);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "SawtoothRhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.RhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.vd = 0;
this.ve = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "sawtooth";
});

Clazz.newMeth(C$, 'setup', function () {
this.vd = 6.2831853 / this.b$['com.falstad.DiffEqFrame'].rhsValues[0].getValue();
this.ve = this.b$['com.falstad.DiffEqFrame'].rhsValues[1].getValue();
});

Clazz.newMeth(C$, 'calculate$D$DA', function (x, y) {
x = (x + 100) % this.vd;
return (2 * x / this.vd - 1) * this.ve;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "h Saw(gx)";
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[22]||(I$[22]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').TriangleRhsFunc))), [this, null]);
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].rhsValues[0].setup$S$D$I("g", 0.25, 0);
this.b$['com.falstad.DiffEqFrame'].rhsValues[1].setup$S$D$I("h", 3, 0);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "TriangleRhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.RhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.vd = 0;
this.ve = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "triangle";
});

Clazz.newMeth(C$, 'setup', function () {
this.vd = 3.14159265 / this.b$['com.falstad.DiffEqFrame'].rhsValues[0].getValue();
this.ve = this.b$['com.falstad.DiffEqFrame'].rhsValues[1].getValue();
});

Clazz.newMeth(C$, 'calculate$D$DA', function (x, y) {
x = (x + 100) % (this.vd * 2);
if (x >= this.vd ) return -(2 * (x - this.vd) / this.vd - 1) * this.ve;
return (2 * x / this.vd - 1) * this.ve;
});

Clazz.newMeth(C$, 'getDescription', function () {
return "h Tri(gx)";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].rhsValues[0].setup$S$D$I("g", 0.25, 0);
this.b$['com.falstad.DiffEqFrame'].rhsValues[1].setup$S$D$I("h", 3, 0);
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[23]||(I$[23]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').LinearRhsFunc))), [this, null]);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "LinearRhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.RhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.vd = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "linear";
});

Clazz.newMeth(C$, 'setup', function () {
this.vd = this.b$['com.falstad.DiffEqFrame'].rhsValues[0].getValue();
});

Clazz.newMeth(C$, 'calculate$D$DA', function (x, y) {
return this.vd * x;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[24]||(I$[24]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').ExponentialRhsFunc))), [this, null]);
});

Clazz.newMeth(C$, 'getDescription', function () {
return "hx";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].rhsValues[0].setup$S$D$I("h", 0.1, 0);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "ExponentialRhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.RhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.vg = 0;
this.vh = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "exponential";
});

Clazz.newMeth(C$, 'setup', function () {
this.vg = this.b$['com.falstad.DiffEqFrame'].rhsValues[0].getValue();
this.vh = this.b$['com.falstad.DiffEqFrame'].rhsValues[1].getValue();
});

Clazz.newMeth(C$, 'calculate$D$DA', function (x, y) {
return java.lang.Math.exp(x * this.vg) * this.vh;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[25]||(I$[25]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').CustomRhsFunc))), [this, null]);
});

Clazz.newMeth(C$, 'getDescription', function () {
return "h exp(gx)";
});

Clazz.newMeth(C$, 'newFunc', function () {
this.b$['com.falstad.DiffEqFrame'].rhsValues[0].setup$S$D$I("g", 0.035, 0);
this.b$['com.falstad.DiffEqFrame'].rhsValues[1].setup$S$D$I("h", 0.33, 0);
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "CustomRhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.RhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "custom function";
});

Clazz.newMeth(C$, 'isCustom', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[26]||(I$[26]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').CustomYRhsFunc))), [this, null]);
});

Clazz.newMeth(C$, 'calculate$D$DA', function (x, y) {
var xx = (((x - this.b$['com.falstad.DiffEqFrame'].xRangeStart) / this.b$['com.falstad.DiffEqFrame'].xRangeWidth * this.b$['com.falstad.DiffEqFrame'].sampleCount)|0);
if (xx < 0) xx = 0;
if (xx >= this.b$['com.falstad.DiffEqFrame'].sampleCount) xx = this.b$['com.falstad.DiffEqFrame'].sampleCount - 1;
return this.b$['com.falstad.DiffEqFrame'].forceFunc[xx];
});

Clazz.newMeth(C$, 'getDescription', function () {
return "f(x)";
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "CustomYRhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.RhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "custom function * y";
});

Clazz.newMeth(C$, 'isCustom', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return Clazz.new_((I$[27]||(I$[27]=Clazz.load(Clazz.load('com.falstad.DiffEqFrame').CustomYPRhsFunc))), [this, null]);
});

Clazz.newMeth(C$, 'calculate$D$DA', function (x, y) {
var xx = (((x - this.b$['com.falstad.DiffEqFrame'].xRangeStart) / this.b$['com.falstad.DiffEqFrame'].xRangeWidth * this.b$['com.falstad.DiffEqFrame'].sampleCount)|0);
if (xx < 0) xx = 0;
if (xx >= this.b$['com.falstad.DiffEqFrame'].sampleCount) xx = this.b$['com.falstad.DiffEqFrame'].sampleCount - 1;
return y == null  ? this.b$['com.falstad.DiffEqFrame'].forceFunc[xx] : this.b$['com.falstad.DiffEqFrame'].forceFunc[xx] * y[0];
});

Clazz.newMeth(C$, 'getDescription', function () {
return "f(x)y";
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "CustomYPRhsFunc", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, ['com.falstad.DiffEqFrame','com.falstad.DiffEqFrame.RhsFunc']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'getName', function () {
return "custom function * y\'";
});

Clazz.newMeth(C$, 'isCustom', function () {
return true;
});

Clazz.newMeth(C$, 'createNext', function () {
return null;
});

Clazz.newMeth(C$, 'calculate$D$DA', function (x, y) {
var xx = (((x - this.b$['com.falstad.DiffEqFrame'].xRangeStart) / this.b$['com.falstad.DiffEqFrame'].xRangeWidth * this.b$['com.falstad.DiffEqFrame'].sampleCount)|0);
if (xx < 0) xx = 0;
if (xx >= this.b$['com.falstad.DiffEqFrame'].sampleCount) xx = this.b$['com.falstad.DiffEqFrame'].sampleCount - 1;
return y == null  ? this.b$['com.falstad.DiffEqFrame'].forceFunc[xx] : this.b$['com.falstad.DiffEqFrame'].forceFunc[xx] * y[1];
});

Clazz.newMeth(C$, 'getDescription', function () {
return "f(x)y\'";
});

Clazz.newMeth(C$);
})()
;
(function(){var C$=Clazz.newClass(P$.DiffEqFrame, "ValueEditCanvas", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'a2s.Canvas', ['java.awt.event.MouseListener', 'java.awt.event.MouseMotionListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.selectedNumber = false;
this.selectedSign = false;
this.dragging = false;
this.dragX = 0;
this.dragY = 0;
this.$flags = 0;
this.labelWidth = 0;
this.signWidth = 0;
this.storedChange = 0;
this.value = 0;
this.oldValue = 0;
this.max = 0;
this.label = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.addMouseListener$java_awt_event_MouseListener(this);
this.value = 1;
this.label = "";
}, 1);

Clazz.newMeth(C$, 'setLabel$S', function (s) {
this.label = s + " = ";
this.$flags = 0;
this.max = 1.0E80;
this.show();
this.repaint();
});

Clazz.newMeth(C$, 'setMax$D', function (d) {
this.max = d;
});

Clazz.newMeth(C$, 'setup$S$D$I', function (s, x, f) {
this.setLabel$S(s);
this.setFlags$I(f);
this.setValue$D(x);
});

Clazz.newMeth(C$, 'getValue', function () {
return this.value;
});

Clazz.newMeth(C$, 'setValue$D', function (x) {
if (this.dragging) return;
this.value = x;
this.round();
this.repaint();
});

Clazz.newMeth(C$, 'round', function () {
if (this.isInteger() || this.isHalfInteger() ) {
this.value = (this.value|0);
if (this.isHalfInteger()) {
if (this.value < 0 ) this.value -= 0.5;
 else this.value += 0.5;
}}});

Clazz.newMeth(C$, 'isNonNegative', function () {
return (this.$flags & 1) != 0;
});

Clazz.newMeth(C$, 'isInteger', function () {
return (this.$flags & 2) != 0;
});

Clazz.newMeth(C$, 'isHalfInteger', function () {
return (this.$flags & 16) != 0;
});

Clazz.newMeth(C$, 'isNonZero', function () {
return (this.$flags & 4) != 0;
});

Clazz.newMeth(C$, 'isConst', function () {
return (this.$flags & 8) != 0;
});

Clazz.newMeth(C$, 'setFlags$I', function (f) {
this.$flags = f;
if (this.isNonNegative() && this.value < 0  ) this.value = -this.value;
if (this.isNonZero() && this.value == 0  ) this.value = 1;
this.repaint();
});

Clazz.newMeth(C$, 'getPreferredSize', function () {
return Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Dimension'))).c$$I$I,[200, 20]);
});

Clazz.newMeth(C$, 'paintComponent$java_awt_Graphics', function (g) {
C$.superclazz.prototype.paintComponent$java_awt_Graphics.apply(this, [g]);
var fm = g.getFontMetrics();
this.labelWidth = fm.stringWidth$S(this.label);
this.signWidth = fm.stringWidth$S("+ ");
g.drawString$S$I$I(this.label, 0, 15);
g.setColor$java_awt_Color(this.selectedSign ? (I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).red : (I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).blue);
g.drawString$S$I$I(this.value > 0  ? "+" : this.value == 0  ? "0" : "-", this.labelWidth, 15);
if (this.value != 0 ) {
g.setColor$java_awt_Color(this.selectedNumber || this.dragging  ? (I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).red : (I$[28]||(I$[28]=Clazz.load('java.awt.Color'))).blue);
var v = java.lang.Math.abs(this.value);
var s = this.b$['com.falstad.DiffEqFrame'].nf.format$D(v);
if (s.equals$O("0")) {
s = Double.toString(v);
var n = s.indexOf('E');
s = s.substring(0, 5) + s.substring(n);
}g.drawString$S$I$I(s, this.labelWidth + this.signWidth, 15);
}});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
if (this.isConst()) return;
var change = e.getX() - this.dragX;
if (this.value == 0 ) {
this.value = (change > 0) ? 0.01 : -0.01;
if (this.isNonNegative() && change < 0 ) this.value = 0;
}if (this.isInteger() || this.isHalfInteger() ) {
change = change+(this.storedChange);
this.storedChange = (change % 4);
this.value += (change/4|0);
if (this.isNonNegative() && this.value < 0  ) this.value = 0;
if (this.isNonZero() && this.value == 0  ) this.value = 1;
} else {
if (this.value < 0 ) change = -change;
this.value *= java.lang.Math.exp(change * 0.05);
}if (this.value > this.max ) this.value = this.max;
if (java.lang.Math.abs(this.value) < 1.0E-5  && !this.isNonZero() ) this.value = 0;
this.round();
if (this.value != 0 ) this.oldValue = this.value;
this.b$['com.falstad.DiffEqFrame'].valueChanged$com_falstad_DiffEqFrame_ValueEditCanvas(this);
this.dragX = e.getX();
this.dragY = e.getY();
this.dragging = true;
this.repaint();
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if (this.isConst()) return;
if (e.getX() < this.labelWidth + this.signWidth) {
if (!this.selectedSign) {
this.selectedSign = true;
this.selectedNumber = false;
this.repaint();
}} else {
if (!this.selectedNumber) {
this.selectedNumber = true;
this.selectedSign = false;
this.repaint();
}}});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
if (this.selectedSign) {
if (e.getClickCount() == 2 && !this.isNonZero() ) {
this.oldValue = this.value;
this.value = 0;
} else if (this.value == 0 ) this.value = this.oldValue;
 else if (!this.isNonNegative()) this.value = -this.value;
this.b$['com.falstad.DiffEqFrame'].valueChanged$com_falstad_DiffEqFrame_ValueEditCanvas(this);
this.repaint();
}});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
if (this.isConst()) return;
if (e.getX() < this.labelWidth + this.signWidth) this.selectedSign = true;
 else this.selectedNumber = true;
this.repaint();
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
if (this.isConst()) return;
this.selectedNumber = this.selectedSign = false;
this.repaint();
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
this.dragX = e.getX();
this.dragY = e.getY();
this.storedChange = 0;
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if (this.isConst()) return;
this.dragging = false;
this.repaint();
});
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:01
