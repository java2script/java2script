Clazz.declarePackage ("java.awt.font");
Clazz.load (["java.text.AttributedCharacterIterator", "java.lang.Boolean", "$.Float", "java.util.HashMap"], "java.awt.font.TextAttribute", ["java.io.InvalidObjectException"], function () {
c$ = Clazz.declareType (java.awt.font, "TextAttribute", java.text.AttributedCharacterIterator.Attribute);
Clazz.makeConstructor (c$, 
function (name) {
Clazz.superConstructor (this, java.awt.font.TextAttribute, [name]);
if (this.getClass () === java.awt.font.TextAttribute) {
java.awt.font.TextAttribute.$instanceMap.put (name, this);
}}, "~S");
Clazz.overrideMethod (c$, "readResolve", 
function () {
if (this.getClass () !== java.awt.font.TextAttribute) {
throw  new java.io.InvalidObjectException ("subclass didn't correctly implement readResolve");
}var instance = java.awt.font.TextAttribute.$instanceMap.get (this.getName ());
if (instance != null) {
return instance;
} else {
throw  new java.io.InvalidObjectException ("unknown attribute name");
}});
c$.$instanceMap = c$.prototype.$instanceMap =  new java.util.HashMap (29);
c$.FAMILY = c$.prototype.FAMILY =  new java.awt.font.TextAttribute ("family");
c$.WEIGHT = c$.prototype.WEIGHT =  new java.awt.font.TextAttribute ("weight");
c$.WEIGHT_EXTRA_LIGHT = c$.prototype.WEIGHT_EXTRA_LIGHT = Float.$valueOf (0.5);
c$.WEIGHT_LIGHT = c$.prototype.WEIGHT_LIGHT = Float.$valueOf (0.75);
c$.WEIGHT_DEMILIGHT = c$.prototype.WEIGHT_DEMILIGHT = Float.$valueOf (0.875);
c$.WEIGHT_REGULAR = c$.prototype.WEIGHT_REGULAR = Float.$valueOf (1.0);
c$.WEIGHT_SEMIBOLD = c$.prototype.WEIGHT_SEMIBOLD = Float.$valueOf (1.25);
c$.WEIGHT_MEDIUM = c$.prototype.WEIGHT_MEDIUM = Float.$valueOf (1.5);
c$.WEIGHT_DEMIBOLD = c$.prototype.WEIGHT_DEMIBOLD = Float.$valueOf (1.75);
c$.WEIGHT_BOLD = c$.prototype.WEIGHT_BOLD = Float.$valueOf (2.0);
c$.WEIGHT_HEAVY = c$.prototype.WEIGHT_HEAVY = Float.$valueOf (2.25);
c$.WEIGHT_EXTRABOLD = c$.prototype.WEIGHT_EXTRABOLD = Float.$valueOf (2.5);
c$.WEIGHT_ULTRABOLD = c$.prototype.WEIGHT_ULTRABOLD = Float.$valueOf (2.75);
c$.WIDTH = c$.prototype.WIDTH =  new java.awt.font.TextAttribute ("width");
c$.WIDTH_CONDENSED = c$.prototype.WIDTH_CONDENSED = Float.$valueOf (0.75);
c$.WIDTH_SEMI_CONDENSED = c$.prototype.WIDTH_SEMI_CONDENSED = Float.$valueOf (0.875);
c$.WIDTH_REGULAR = c$.prototype.WIDTH_REGULAR = Float.$valueOf (1.0);
c$.WIDTH_SEMI_EXTENDED = c$.prototype.WIDTH_SEMI_EXTENDED = Float.$valueOf (1.25);
c$.WIDTH_EXTENDED = c$.prototype.WIDTH_EXTENDED = Float.$valueOf (1.5);
c$.POSTURE = c$.prototype.POSTURE =  new java.awt.font.TextAttribute ("posture");
c$.POSTURE_REGULAR = c$.prototype.POSTURE_REGULAR = Float.$valueOf (0.0);
c$.POSTURE_OBLIQUE = c$.prototype.POSTURE_OBLIQUE = Float.$valueOf (0.20);
c$.SIZE = c$.prototype.SIZE =  new java.awt.font.TextAttribute ("size");
c$.TRANSFORM = c$.prototype.TRANSFORM =  new java.awt.font.TextAttribute ("transform");
c$.SUPERSCRIPT = c$.prototype.SUPERSCRIPT =  new java.awt.font.TextAttribute ("superscript");
c$.SUPERSCRIPT_SUPER = c$.prototype.SUPERSCRIPT_SUPER = Integer.$valueOf (1);
c$.SUPERSCRIPT_SUB = c$.prototype.SUPERSCRIPT_SUB = Integer.$valueOf (-1);
c$.FONT = c$.prototype.FONT =  new java.awt.font.TextAttribute ("font");
c$.CHAR_REPLACEMENT = c$.prototype.CHAR_REPLACEMENT =  new java.awt.font.TextAttribute ("char_replacement");
c$.FOREGROUND = c$.prototype.FOREGROUND =  new java.awt.font.TextAttribute ("foreground");
c$.BACKGROUND = c$.prototype.BACKGROUND =  new java.awt.font.TextAttribute ("background");
c$.UNDERLINE = c$.prototype.UNDERLINE =  new java.awt.font.TextAttribute ("underline");
c$.UNDERLINE_ON = c$.prototype.UNDERLINE_ON = Integer.$valueOf (0);
c$.STRIKETHROUGH = c$.prototype.STRIKETHROUGH =  new java.awt.font.TextAttribute ("strikethrough");
c$.STRIKETHROUGH_ON = c$.prototype.STRIKETHROUGH_ON = Boolean.TRUE;
c$.RUN_DIRECTION = c$.prototype.RUN_DIRECTION =  new java.awt.font.TextAttribute ("run_direction");
c$.RUN_DIRECTION_LTR = c$.prototype.RUN_DIRECTION_LTR = Boolean.FALSE;
c$.RUN_DIRECTION_RTL = c$.prototype.RUN_DIRECTION_RTL = Boolean.TRUE;
c$.BIDI_EMBEDDING = c$.prototype.BIDI_EMBEDDING =  new java.awt.font.TextAttribute ("bidi_embedding");
c$.JUSTIFICATION = c$.prototype.JUSTIFICATION =  new java.awt.font.TextAttribute ("justification");
c$.JUSTIFICATION_FULL = c$.prototype.JUSTIFICATION_FULL = Float.$valueOf (1.0);
c$.JUSTIFICATION_NONE = c$.prototype.JUSTIFICATION_NONE = Float.$valueOf (0.0);
c$.INPUT_METHOD_HIGHLIGHT = c$.prototype.INPUT_METHOD_HIGHLIGHT =  new java.awt.font.TextAttribute ("input method highlight");
c$.INPUT_METHOD_UNDERLINE = c$.prototype.INPUT_METHOD_UNDERLINE =  new java.awt.font.TextAttribute ("input method underline");
c$.UNDERLINE_LOW_ONE_PIXEL = c$.prototype.UNDERLINE_LOW_ONE_PIXEL = Integer.$valueOf (1);
c$.UNDERLINE_LOW_TWO_PIXEL = c$.prototype.UNDERLINE_LOW_TWO_PIXEL = Integer.$valueOf (2);
c$.UNDERLINE_LOW_DOTTED = c$.prototype.UNDERLINE_LOW_DOTTED = Integer.$valueOf (3);
c$.UNDERLINE_LOW_GRAY = c$.prototype.UNDERLINE_LOW_GRAY = Integer.$valueOf (4);
c$.UNDERLINE_LOW_DASHED = c$.prototype.UNDERLINE_LOW_DASHED = Integer.$valueOf (5);
c$.SWAP_COLORS = c$.prototype.SWAP_COLORS =  new java.awt.font.TextAttribute ("swap_colors");
c$.SWAP_COLORS_ON = c$.prototype.SWAP_COLORS_ON = Boolean.TRUE;
c$.NUMERIC_SHAPING = c$.prototype.NUMERIC_SHAPING =  new java.awt.font.TextAttribute ("numeric_shaping");
c$.KERNING = c$.prototype.KERNING =  new java.awt.font.TextAttribute ("kerning");
c$.KERNING_ON = c$.prototype.KERNING_ON = Integer.$valueOf (1);
c$.LIGATURES = c$.prototype.LIGATURES =  new java.awt.font.TextAttribute ("ligatures");
c$.LIGATURES_ON = c$.prototype.LIGATURES_ON = Integer.$valueOf (1);
c$.TRACKING = c$.prototype.TRACKING =  new java.awt.font.TextAttribute ("tracking");
c$.TRACKING_TIGHT = c$.prototype.TRACKING_TIGHT = Float.$valueOf (-0.04);
c$.TRACKING_LOOSE = c$.prototype.TRACKING_LOOSE = Float.$valueOf (.04);
});
