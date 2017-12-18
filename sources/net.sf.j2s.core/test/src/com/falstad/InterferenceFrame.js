(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "InterferenceFrame", null, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.ItemListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', ['javajs.util.JSAudioThread','javajs.util.JSAudioThread.Owner']]);
var p$=C$.prototype;

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.winSize = null;
this.dbimage = null;
this.applet = null;
this.soundCheck = null;
this.stereoCheck = null;
this.metricCheck = null;
this.freqBar = null;
this.phaseBar = null;
this.brightnessBar = null;
this.speakerSepBar = null;
this.scaleBar = null;
this.balanceBar = null;
this.dragX = 0;
this.dragY = 0;
this.measureX = 0;
this.measureY = 0;
this.dragging = false;
this.java2present = false;
this.cv = null;
this.nf = null;
this.main = null;
this.showControls = false;
this.useFrame = false;
this.shown = false;
this.lineBuffer = null;
this.blockAdder = 0;
this.gridSize = 0;
this.audioThread = null;
this.line = null;
this.playSampleCount = 0;
this.rate = 0;
this.audioBufferByteLength = 0;
this.bitsPerSample = 0;
this.nChannels = 0;
this.audioByteBuffer = null;
this.changed = false;
this.offset = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.shown = false;
this.gridSize = 100;
this.playSampleCount = 8192;
this.rate = 44100;
this.audioBufferByteLength = 8192;
this.bitsPerSample = 8;
this.nChannels = 2;
this.changed = true;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "Interference by Paul Falstad";
});

Clazz.newMeth(C$, 'c$$com_falstad_Interference', function (a) {
C$.superclazz.c$$S.apply(this, ["Interference Applet"]);
C$.$init$.apply(this);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, 1);

Clazz.newMeth(C$, 'init', function () {
try {
if (this.applet != null ) {
var param = this.applet.getParameter$S("useFrame");
if (param != null  && param.equalsIgnoreCase$S("false") ) this.useFrame = false;
param = this.applet.getParameter$S("showControls");
if (param != null  && param.equalsIgnoreCase$S("false") ) this.showControls = false;
}} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
if (this.useFrame) this.main = this;
 else this.main = this.applet;
this.nf = (I$[2]||(I$[2]=Clazz.load('java.text.NumberFormat'))).getInstance();
this.nf.setMaximumFractionDigits$I(1);
this.java2present = true;
if (System.getProperty("java.version").indexOf("1.1") == 0) this.java2present = false;
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.InterferenceLayout')))));
this.cv = Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.InterferenceCanvas'))).c$$com_falstad_InterferenceFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.main.add$java_awt_Component(this.soundCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S,["Sound"]));
this.soundCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.stereoCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S,["Stereo"]));
this.stereoCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(this.metricCheck = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Metric Units", true]));
this.metricCheck.addItemListener$java_awt_event_ItemListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Label'))).c$$S$I,["Speaker Separation", 0]));
this.main.add$java_awt_Component(this.speakerSepBar = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 68, 1, 1, 600]));
this.speakerSepBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Label'))).c$$S$I,["Playing Frequency", 0]));
this.main.add$java_awt_Component(this.freqBar = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 750, 1, 0, 1100]));
this.freqBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Label'))).c$$S$I,["Phase Difference", 0]));
this.main.add$java_awt_Component(this.phaseBar = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 0, 100]));
this.phaseBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Label'))).c$$S$I,["Balance", 0]));
this.main.add$java_awt_Component(this.balanceBar = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 0, 100]));
this.balanceBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Label'))).c$$S$I,["Brightness", 0]));
this.main.add$java_awt_Component(this.brightnessBar = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 280, 1, 1, 1000]));
this.brightnessBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.main.add$java_awt_Component(Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Label'))).c$$S$I,["View Scale", 0]));
this.main.add$java_awt_Component(this.scaleBar = Clazz.new_((I$[7]||(I$[7]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 200, 1, 100, 1000]));
this.scaleBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
this.balanceBar.disable();
this.phaseBar.disable();
this.main.add$java_awt_Component(Clazz.new_((I$[6]||(I$[6]=Clazz.load('a2s.Label'))).c$$S$I,["http://www.falstad.com", 0]));
this.reinit();
this.cv.setBackground$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).lightGray);
if (this.useFrame) {
this.setSize$I$I(800, 640);
this.handleResize();
var x = this.getSize();
var screen = this.getToolkit().getScreenSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.setVisible$Z(true);
} else {
this.setVisible$Z(false);
this.handleResize();
this.applet.validate();
}});

Clazz.newMeth(C$, 'reinit', function () {
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.setVisible$Z(true);
this.shown = true;
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0) return;
this.dbimage = this.createImage$I$I(d.width, d.height);
});

Clazz.newMeth(C$, 'getFreq', function () {
return ((27.5 * java.lang.Math.exp(this.freqBar.getValue() * 0.004158883084))|0);
});

Clazz.newMeth(C$, 'doPlay', function () {
if (!this.soundCheck.getState()) return;
p$.resetAudio.apply(this, []);
var i;
var precalcSize = 16384;
var b = Clazz.array(Byte.TYPE, [precalcSize]);
var mult = 126;
var k = this.getFreq() * 2 * 3.141592653589793  / 44100;
var phase = this.phaseBar.getValue() * 2 * 3.141592653589793  / 100.0;
var multR = this.balanceBar.getValue() / 100.0;
var cycles = (((precalcSize/2|0) * k / 6.283185307179586)|0);
this.blockAdder = 2 * ((cycles * 2 * 3.141592653589793  / k)|0);
if (!this.stereoCheck.getState()) {
phase = 0;
multR = 0.5;
}var multL = 1 - multR;
var multMax = (multL < multR ) ? multR : multL;
multL /= multMax;
multR /= multMax;
for (i = 0; i != 8192; i++) {
var q1 = multL * java.lang.Math.sin(i * k);
var q2 = multR * java.lang.Math.sin(i * k - phase);
b[i * 2] = (((q1 * mult)|0)|0);
b[i * 2 + 1] = (((q2 * mult)|0)|0);
}
this.lineBuffer = b;
this.start();
this.cv.repaint();
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).black);
var w = fm.stringWidth$S(s);
g.fillRect$I$I$I$I(((this.winSize.width - 8 - w )/2|0), y - fm.getAscent(), w + 8, fm.getAscent() + fm.getDescent());
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).white);
g.drawString$S$I$I(s, ((this.winSize.width - w)/2|0), y);
});

Clazz.newMeth(C$, 'updateInterference$java_awt_Graphics', function (realg) {
if (!this.java2present) {
this.centerString$java_awt_Graphics$S$I(realg, "Need java2 for this applet.", 100);
return;
}if (this.dbimage == null ) return;
var g = this.dbimage.getGraphics();
if (this.winSize == null  || this.winSize.width == 0  || this.winSize.height == 0 ) return;
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var x;
var y;
var k = this.getFreq() * 2 * 3.141592653589793  / 34500.0;
var mult = this.brightnessBar.getValue() / 100.0;
var phase = this.phaseBar.getValue() * 2 * 3.141592653589793  / 100.0;
var speakerSep = this.speakerSepBar.getValue();
var scale = this.scaleBar.getValue();
var scaler = scale / 100.0;
var multR = this.balanceBar.getValue() / 100.0;
if (!this.stereoCheck.getState()) {
multR = 0.5;
phase = 0;
}var multL = 1 - multR;
for (x = 0; x != 100; x++) for (y = 0; y != 100; y++) {
var x1 = (x * this.winSize.width/100|0);
var y1 = (y * this.winSize.height/100|0);
var x2 = ((x + 1) * this.winSize.width/100|0);
var y2 = ((y + 1) * this.winSize.height/100|0);
var xx = (x - 50) * scaler;
var yy = y * scaler;
var xx1 = xx + speakerSep / 2.0;
var r1 = java.lang.Math.sqrt(xx1 * xx1 + yy * yy);
var xx2 = xx - speakerSep / 2.0;
var r2 = java.lang.Math.sqrt(xx2 * xx2 + yy * yy);
var r1s = multL / r1;
var r2s = multR / r2;
r1 *= k;
r2 *= k;
var q1 = r1s * java.lang.Math.sin(r1) + r2s * java.lang.Math.sin(r2 + phase);
var q2 = r1s * java.lang.Math.cos(r1) + r2s * java.lang.Math.cos(r2 + phase);
var q = (q1 * q1 + q2 * q2);
q = java.lang.Math.log(q) / mult + 5;
if (q > 2 ) q = 2;
if (q < 0 ) q = 0;
var col = 0;
if (r1s > 0.1  || r2s > 0.1  ) col = -16776961;
 else if (q < 1 ) {
var val = ((q * 255)|0);
col = -16777216 | (val << 8);
} else {
var val = (((q - 1) * 255)|0);
col = -16777216 | 65280 | (val * 65537) ;
}g.setColor$java_awt_Color(Clazz.new_((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).c$$I,[col]));
g.fillRect$I$I$I$I(x1, y1, x2 - x1, y2 - y1);
}

var f = this.getFreq();
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).white);
this.centerString$java_awt_Graphics$S$I(g, "Frequency = " + f + " Hz" , this.winSize.height - 100);
this.centerString$java_awt_Graphics$S$I(g, "Wavelength = " + this.convertUnits$I((34500/f|0)), this.winSize.height - 80);
this.centerString$java_awt_Graphics$S$I(g, "Speaker separation = " + this.convertUnits$I(speakerSep), this.winSize.height - 60);
this.centerString$java_awt_Graphics$S$I(g, "Phase difference = " + ((phase * 180 / 3.141592653589793)|0) + "\u00b0" , this.winSize.height - 40);
if (this.dragging) {
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).blue);
g.drawLine$I$I$I$I(this.dragX, this.dragY, this.measureX, this.measureY);
var xdist = this.measureX - this.dragX;
var ydist = this.measureY - this.dragY;
var xx = xdist * scaler * 100  / this.winSize.width;
var yy = ydist * scaler * 100  / this.winSize.height;
var cm = (java.lang.Math.sqrt(xx * xx + yy * yy)|0);
g.setColor$java_awt_Color((I$[8]||(I$[8]=Clazz.load('java.awt.Color'))).white);
this.centerString$java_awt_Graphics$S$I(g, "Path length = " + this.convertUnits$I(cm), this.winSize.height - 20);
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
});

Clazz.newMeth(C$, 'convertUnits$I', function (x) {
if (this.metricCheck.getState()) return x + " cm";
return this.nf.format$D(x / 2.54) + "\"";
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
this.cv.repaint$J(100);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
if (e.getSource() === this.freqBar  || e.getSource() === this.phaseBar   || e.getSource() === this.balanceBar  ) this.doPlay();
this.cv.repaint();
});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.measureX = e.getX();
this.measureY = e.getY();
this.cv.repaint();
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) != 0) return;
this.cv.repaint();
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = true;
this.measureX = this.dragX = e.getX();
this.measureY = this.dragY = e.getY();
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = false;
this.cv.repaint();
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
if (e.getItemSelectable() === this.soundCheck  || e.getItemSelectable() === this.stereoCheck  ) {
this.doPlay();
if (!this.stereoCheck.getState()) {
this.balanceBar.disable();
this.phaseBar.disable();
} else {
this.balanceBar.enable();
this.phaseBar.enable();
}}this.cv.repaint();
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame();
this.soundCheck.setState$Z(false);
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'start', function () {
if (this.audioThread == null ) {
p$.createAudioThread.apply(this, []);
this.audioThread.start();
}});

Clazz.newMeth(C$, 'stop', function () {
if (this.audioThread != null  && this.audioThread.isAlive() ) {
this.audioThread.stop();
}this.audioThread = null;
});

Clazz.newMeth(C$, 'soundChanged', function () {
this.changed = true;
});

Clazz.newMeth(C$, 'resetAudio', function () {
if (this.audioThread != null ) this.audioThread.resetAudio();
});

Clazz.newMeth(C$, 'createAudioThread', function () {
this.audioByteBuffer = Clazz.array(Byte.TYPE, [8192]);
this.audioThread = Clazz.new_((I$[9]||(I$[9]=Clazz.load('javajs.util.JSAudioThread'))).c$$javajs_util_JSAudioThread_Owner$javax_sound_sampled_AudioFormat$BA,[this, Clazz.new_((I$[10]||(I$[10]=Clazz.load('javax.sound.sampled.AudioFormat'))).c$$F$I$I$Z$Z,[44100, 8, 2, true, true]), this.audioByteBuffer]);
});

Clazz.newMeth(C$, 'fillAudioBuffer', function () {
if (this.changed) this.offset = 0;
this.changed = false;
var len = Math.min(8192, this.blockAdder - this.offset);
for (var i = 0; i != len; i++) this.audioByteBuffer[i] = (this.lineBuffer[i + this.offset]|0);

this.offset = this.offset+(len);
if (this.offset >= this.blockAdder) this.offset = 0;
return len;
});

Clazz.newMeth(C$, 'checkSoundStatus', function () {
return this.soundCheck.getState();
});

Clazz.newMeth(C$, 'audioThreadExiting', function () {
this.audioThread = null;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:06
