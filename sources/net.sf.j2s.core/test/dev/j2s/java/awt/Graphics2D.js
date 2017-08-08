Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.Graphics"], "java.awt.Graphics2D", null, function () {
c$ = Clazz.declareType (java.awt, "Graphics2D", java.awt.Graphics);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.Graphics2D, []);
});
Clazz.overrideMethod (c$, "draw3DRect", 
function (x, y, width, height, raised) {
var p = this.getPaint ();
var c = this.getColor ();
var brighter = c.brighter ();
var darker = c.darker ();
this.setColor (raised ? brighter : darker);
this.fillRect (x, y, 1, height + 1);
this.fillRect (x + 1, y, width - 1, 1);
this.setColor (raised ? darker : brighter);
this.fillRect (x + 1, y + height, width, 1);
this.fillRect (x + width, y, 1, height);
this.setPaint (p);
}, "~N,~N,~N,~N,~B");
Clazz.overrideMethod (c$, "fill3DRect", 
function (x, y, width, height, raised) {
var p = this.getPaint ();
var c = this.getColor ();
var brighter = c.brighter ();
var darker = c.darker ();
if (!raised) {
this.setColor (darker);
} else if (p !== c) {
this.setColor (c);
}this.fillRect (x + 1, y + 1, width - 2, height - 2);
this.setColor (raised ? brighter : darker);
this.fillRect (x, y, 1, height);
this.fillRect (x + 1, y, width - 2, 1);
this.setColor (raised ? darker : brighter);
this.fillRect (x + 1, y + height - 1, width - 1, 1);
this.fillRect (x + width - 1, y, 1, height - 1);
this.setPaint (p);
}, "~N,~N,~N,~N,~B");
});
