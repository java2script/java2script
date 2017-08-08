Clazz.declarePackage ("org.physicslab.mechanics.vernier");
c$ = Clazz.declareType (org.physicslab.mechanics.vernier, "CommonUtils");
c$.outString = Clazz.defineMethod (c$, "outString", 
function (g, x, y, s, x_align, y_align) {
switch (y_align) {
case 0:
y += g.getFontMetrics (g.getFont ()).getAscent ();
break;
case 1:
y += Clazz.doubleToInt (g.getFontMetrics (g.getFont ()).getAscent () / 2);
break;
case 2:
break;
}
switch (x_align) {
case 0:
g.drawString (s, x + 3, y);
break;
case 2:
g.drawString (s, x - g.getFontMetrics (g.getFont ()).stringWidth (s) - 3, y);
break;
case 1:
g.drawString (s, x - Clazz.doubleToInt (g.getFontMetrics (g.getFont ()).stringWidth (s) / 2), y);
break;
}
}, "java.awt.Graphics,~N,~N,~S,~N,~N");
Clazz.defineStatics (c$,
"TOP", 0,
"CENTER", 1,
"BOTTOM", 2);
