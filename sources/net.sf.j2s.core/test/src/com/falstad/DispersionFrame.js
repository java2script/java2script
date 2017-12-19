(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "DispersionFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.ItemListener', 'com.falstad.DecentScrollbarListener']);

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.stateCount = 0;
this.elevelCount = 0;
this.maxStateCount = 0;
this.sampleCount = 0;
this.pSampleCount = 0;
this.modes = null;
this.modesLeft = null;
this.main = null;
this.stoppedCheck = null;
this.restartButton = null;
this.speedBar = null;
this.resBar = null;
this.freq1Bar = null;
this.freq2Bar = null;
this.speed1Bar = null;
this.speed2Bar = null;
this.view1 = null;
this.view2 = null;
this.viewSum = null;
this.viewList = null;
this.viewCount = 0;
this.step = 0;
this.func = null;
this.funci = null;
this.dragging = false;
this.startup = false;
this.selectGround = false;
this.setupModified = false;
this.useFrame = false;
this.t1 = 0;
this.t2 = 0;
this.pause = 0;
this.cv = null;
this.applet = null;
this.showFormat = null;
this.shown = false;
this.lastTime = 0;
this.stateColSize = 0;
this.stateSize = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.engine = null;
this.maxStateCount = 500;
this.sampleCount = 80;
this.t1 = 1000;
this.t2 = 1000;
this.shown = false;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "Dispersion by Paul Falstad";
});

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'c$$com_falstad_Dispersion', function (a) {
C$.superclazz.c$$S.apply(this, ["Dispersion v1.0"]);
C$.$init$.apply(this);
this.applet = a;
this.useFrame = false;
}, 1);

Clazz.newMeth(C$, 'init', function () {
try {
var param = this.applet.getParameter$S("useFrame");
if (param != null  && param.equalsIgnoreCase$S("true") ) this.useFrame = true;
param = this.applet.getParameter$S("pause");
if (param != null ) this.pause = Integer.parseInt(param);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
if (this.useFrame) this.main = this;
 else this.main = this.applet;
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.DispersionLayout')))));
this.cv = Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.DispersionCanvas'))).c$$com_falstad_DispersionFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.main.add$java_awt_Component(this.cv);
this.stoppedCheck = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Checkbox'))).c$$S,["Stopped"]);
this.stoppedCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stoppedCheck);
this.main.add$java_awt_Component(Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Label'))).c$$S$I,["Simulation Speed", 0]));
this.main.add$java_awt_Component(this.speedBar = Clazz.new_((I$[6]||(I$[6]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 80, 1, 300]));
Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Label'))).c$$S$I,["Resolution", 0]);
this.resBar = Clazz.new_((I$[6]||(I$[6]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 260, 180, this.maxStateCount]);
this.main.add$java_awt_Component(Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Label'))).c$$S$I,["Frequency 1", 0]));
this.main.add$java_awt_Component(this.freq1Bar = Clazz.new_((I$[6]||(I$[6]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 30, 20, 400]));
this.main.add$java_awt_Component(Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Label'))).c$$S$I,["Frequency 2", 0]));
this.main.add$java_awt_Component(this.freq2Bar = Clazz.new_((I$[6]||(I$[6]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 200, 20, 400]));
this.main.add$java_awt_Component(Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Label'))).c$$S$I,["Speed 1", 0]));
this.main.add$java_awt_Component(this.speed1Bar = Clazz.new_((I$[6]||(I$[6]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 30, 10, 100]));
this.main.add$java_awt_Component(Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Label'))).c$$S$I,["Speed 2", 0]));
this.main.add$java_awt_Component(this.speed2Bar = Clazz.new_((I$[6]||(I$[6]=Clazz.load('com.falstad.DecentScrollbar'))).c$$com_falstad_DecentScrollbarListener$I$I$I,[this, 30, 10, 100]));
this.main.add$java_awt_Component(this.restartButton = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Button'))).c$$S,["Restart"]));
this.restartButton.addActionListener$java_awt_event_ActionListener(this);
try {
var param;
param = this.applet.getParameter$S("freq1");
if (param != null ) this.freq1Bar.setValue$I(Integer.parseInt(param));
param = this.applet.getParameter$S("freq2");
if (param != null ) this.freq2Bar.setValue$I(Integer.parseInt(param));
param = this.applet.getParameter$S("speed1");
if (param != null ) this.speed1Bar.setValue$I(Integer.parseInt(param));
param = this.applet.getParameter$S("speed2");
if (param != null ) this.speed2Bar.setValue$I(Integer.parseInt(param));
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
this.setResolution();
this.random = Clazz.new_((I$[8]||(I$[8]=Clazz.load('java.util.Random'))));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[9]||(I$[9]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[9]||(I$[9]=Clazz.load('java.awt.Color'))).lightGray);
this.showFormat = (I$[10]||(I$[10]=Clazz.load('java.text.NumberFormat'))).getInstance();
this.showFormat.setMaximumFractionDigits$I(2);
if (this.useFrame) {
this.resize$I$I(750, 600);
this.handleResize();
var x = this.getSize();
var screen = this.getToolkit().getScreenSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.show();
} else {
this.hide();
this.handleResize();
this.applet.validate();
}this.main.requestFocus();
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.show();
this.shown = true;
});

Clazz.newMeth(C$, 'reinit', function () {
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.viewList = Clazz.array((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.DispersionFrame').View))), [3]);
var i = 0;
this.viewList[i++] = this.view1 = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.DispersionFrame').View))), [this, null]);
this.viewList[i++] = this.view2 = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.DispersionFrame').View))), [this, null]);
this.viewList[i++] = this.viewSum = Clazz.new_((I$[11]||(I$[11]=Clazz.load(Clazz.load('com.falstad.DispersionFrame').View))), [this, null]);
this.viewCount = i;
var sizenum = this.viewCount;
var toth = this.winSize.height;
var cury = 0;
for (i = 0; i != this.viewCount; i++) {
var v = this.viewList[i];
var h = (toth/sizenum|0);
v.x = 0;
v.width = this.winSize.width;
v.y = cury;
v.height = h;
cury = cury+(h);
}
this.setGraphLines();
this.dbimage = this.main.createImage$I$I(d.width, d.height);
});

Clazz.newMeth(C$, 'setGraphLines', function () {
var i;
for (i = 0; i != this.viewCount; i++) {
var v = this.viewList[i];
v.mid_y = v.y + (v.height/2|0);
v.ymult = 0.9 * v.height / 2;
v.lower_y = ((v.mid_y + v.ymult)|0);
v.ymult2 = v.ymult * 2;
}
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'paint$java_awt_Graphics', function (g) {
this.cv.repaint();
});

Clazz.newMeth(C$, 'updateDispersion$java_awt_Graphics', function (realg) {
if (this.dbimage == null ) return;
var g = this.dbimage.getGraphics();
if (this.winSize == null  || this.winSize.width == 0 ) return;
var allQuiet = true;
var tadd = 0;
var f1 = this.freq1Bar.getValue() * 0.1;
var f2 = this.freq2Bar.getValue() * 0.1;
var s1 = this.speed1Bar.getValue() * f1 / 30.0;
var s2 = this.speed2Bar.getValue() * f2 / 30.0;
if (!this.stoppedCheck.getState()) {
var val = this.speedBar.getValue();
tadd = Math.exp(val / 20.0) * 0.02;
var sysTime = System.currentTimeMillis();
if (this.lastTime == 0) this.lastTime = sysTime;
tadd *= (sysTime - this.lastTime) * 5.88235294117647E-4;
this.t1 += tadd * s1;
this.t2 += tadd * s2;
this.lastTime = sysTime;
allQuiet = false;
} else this.lastTime = 0;
var gray1 = Clazz.new_((I$[9]||(I$[9]=Clazz.load('java.awt.Color'))).c$$I$I$I,[76, 76, 76]);
var gray2 = Clazz.new_((I$[9]||(I$[9]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var i;
var ox = -1;
var oy = -1;
for (i = 1; i != this.viewCount; i++) {
g.setColor$java_awt_Color((I$[9]||(I$[9]=Clazz.load('java.awt.Color'))).gray);
g.drawLine$I$I$I$I(0, this.viewList[i].y, this.winSize.width, this.viewList[i].y);
}
ox = -1;
var j;
var norm = 0;
var normmult2 = 1 / norm;
var normmult = Math.sqrt(normmult2);
if (norm == 0 ) normmult = normmult2 = 0;
ox = -1;
g.setColor$java_awt_Color((I$[9]||(I$[9]=Clazz.load('java.awt.Color'))).white);
var maxf = 0;
var expectx = 0;
if (this.view1 != null ) {
var mult = 2 * 3.141592653589793 * f1  / this.sampleCount;
for (i = 0; i != this.sampleCount; i++) this.func[i] = (this.t1 < mult * i ) ? 0 : 0.5 * Math.sin(this.t1 - mult * i);

this.drawFunction$java_awt_Graphics$com_falstad_DispersionFrame_View$DA$DA$I$I(g, this.view1, this.func, null, this.sampleCount, 0);
}if (this.view2 != null ) {
var mult = 2 * 3.141592653589793 * f2  / this.sampleCount;
for (i = 0; i != this.sampleCount; i++) this.func[i] = (this.t2 < mult * i ) ? 0 : 0.5 * Math.sin(this.t2 - mult * i);

this.drawFunction$java_awt_Graphics$com_falstad_DispersionFrame_View$DA$DA$I$I(g, this.view2, this.func, null, this.sampleCount, 0);
}if (this.viewSum != null ) {
var mult1 = 2 * 3.141592653589793 * f1  / this.sampleCount;
var mult2 = 2 * 3.141592653589793 * f2  / this.sampleCount;
for (i = 0; i != this.sampleCount; i++) this.func[i] = 0.5 * (((this.t1 < mult1 * i ) ? 0 : Math.sin(this.t1 - mult1 * i)) + ((this.t2 < mult2 * i ) ? 0 : Math.sin(this.t2 - mult2 * i)));

this.drawFunction$java_awt_Graphics$com_falstad_DispersionFrame_View$DA$DA$I$I(g, this.viewSum, this.func, null, this.sampleCount, 0);
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState() && !allQuiet ) this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'drawFunction$java_awt_Graphics$com_falstad_DispersionFrame_View$DA$DA$I$I', function (g, view, fr, fi, count, offset) {
var i;
var expectx = 0;
var expectx2 = 0;
var maxsq = 0;
var tot = 0;
var zero = (this.winSize.width/2|0);
var ox = -1;
var oy = 0;
g.setColor$java_awt_Color((I$[9]||(I$[9]=Clazz.load('java.awt.Color'))).gray);
var mid_y = view.mid_y;
var mult = view.ymult * view.scale;
g.setColor$java_awt_Color((I$[9]||(I$[9]=Clazz.load('java.awt.Color'))).white);
ox = -1;
for (i = 0; i != count; i++) {
var x = (this.winSize.width * i/(count - 1)|0);
var ii = i + offset;
var y = mid_y - ((mult * fr[ii])|0);
if (ox != -1) g.drawLine$I$I$I$I(ox, oy, x, y);
ox = x;
oy = y;
}
});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'componentResized$java_awt_event_ComponentEvent', function (e) {
this.handleResize();
this.cv.repaint$J(this.pause);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
if (e.getSource() === this.restartButton ) {
this.t1 = this.t2 = 0;
}this.cv.repaint();
});

Clazz.newMeth(C$, 'scrollbarValueChanged$com_falstad_DecentScrollbar', function (ds) {
System.out.print$S(ds.getValue() + "\n");
});

Clazz.newMeth(C$, 'scrollbarFinished$com_falstad_DecentScrollbar', function (ds) {
if (ds === this.resBar ) {
this.setResolution();
this.reinit();
this.cv.repaint$J(this.pause);
}});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'setResolution', function () {
this.sampleCount = 1;
while (this.sampleCount < this.resBar.getValue())this.sampleCount = this.sampleCount*(2);

this.func = Clazz.array(Double.TYPE, [this.sampleCount]);
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (e.getItemSelectable() === this.stoppedCheck ) {
this.cv.repaint$J(this.pause);
return;
}});
;
(function(){var C$=Clazz.newClass(P$.DispersionFrame, "View", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'java.awt.Rectangle');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.mid_y = 0;
this.lower_y = 0;
this.ymult = 0;
this.ymult2 = 0;
this.scale = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
Clazz.super_(C$, this,1);
this.scale = 1;
}, 1);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:02
