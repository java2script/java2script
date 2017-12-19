(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "DecentScrollbar", null, 'a2s.Scrollbar', 'java.awt.event.AdjustmentListener');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.value = 0;
this.lo = 0;
this.hi = 0;
this.listener = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_DecentScrollbarListener$I$I$I', function (parent, start, lo_, hi_) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [0, start, 1, lo_, hi_]);
C$.$init$.apply(this);
this.value = start;
this.lo = lo_;
this.hi = hi_;
this.listener = parent;
this.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
}, 1);

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
if (this.getValueIsAdjusting()) this.listener.scrollbarValueChanged$com_falstad_DecentScrollbar(this);
 else this.listener.scrollbarFinished$com_falstad_DecentScrollbar(this);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:01
