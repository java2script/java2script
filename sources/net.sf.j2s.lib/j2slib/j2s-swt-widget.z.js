/*=j2s=
#Java2Script Configuration
#Sun Jan 22 00:50:30 CST 2006
j2s.resources.list=swt-default.css,org/eclipse/swt/graphics/GC.js,org/eclipse/swt/graphics/Resource.js,org/eclipse/swt/graphics/Color.js,org/eclipse/swt/graphics/Cursor.js,org/eclipse/swt/accessibility/Accessible.js,org/eclipse/swt/graphics/Drawable.js,org/eclipse/swt/graphics/Device.js,org/eclipse/swt/graphics/Font.js,org/eclipse/swt/graphics/FontData.js,org/eclipse/swt/graphics/FontMetrics.js,org/eclipse/swt/widgets/Widget.js,org/eclipse/swt/widgets/Control.js,org/eclipse/swt/widgets/Scrollable.js,org/eclipse/swt/widgets/Composite.js,org/eclipse/swt/widgets/Canvas.js,org/eclipse/swt/widgets/Decorations.js,org/eclipse/swt/widgets/Shell.js,org/eclipse/swt/widgets/Item.js,org/eclipse/swt/widgets/MenuItem.js,org/eclipse/swt/widgets/Menu.js,org/eclipse/swt/widgets/Monitor.js,org/eclipse/swt/widgets/ScrollBar.js,org/eclipse/swt/widgets/Display.js,org/eclipse/swt/widgets/Button.js,org/eclipse/swt/widgets/Label.js,org/eclipse/swt/widgets/Link.js,org/eclipse/swt/widgets/Text.js,org/eclipse/swt/widgets/List.js,org/eclipse/swt/browser/Browser.js,org/eclipse/swt/widgets/TableItem.js,org/eclipse/swt/widgets/TableColumn.js,org/eclipse/swt/widgets/Table.js,org/eclipse/swt/widgets/TabItem.js,org/eclipse/swt/widgets/TabFolder.js,org/eclipse/swt/widgets/Combo.js,org/eclipse/swt/widgets/Group.js,org/eclipse/swt/widgets/TreeItem.js,org/eclipse/swt/widgets/TreeColumn.js,org/eclipse/swt/widgets/Tree.js,org/eclipse/swt/widgets/ProgressBar.js,org/eclipse/swt/widgets/Sash.js,org/eclipse/swt/custom/SashForm.js,org/eclipse/swt/custom/SashFormData.js,org/eclipse/swt/custom/SashFormLayout.js,org/eclipse/swt/custom/StackLayout.js,org/eclipse/swt/widgets/Scale.js,bin/org/eclipse/swt/widgets/ToolBar.js,bin/org/eclipse/swt/widgets/ToolItem.js,bin/org/eclipse/swt/widgets/CoolBar.js,bin/org/eclipse/swt/widgets/CoolItem.js,bin/org/eclipse/swt/widgets/Caret.js,bin/org/eclipse/swt/widgets/Spinner.js,bin/org/eclipse/swt/widgets/Dialog.js,bin/org/eclipse/swt/widgets/ColorDialog.js,bin/org/eclipse/swt/widgets/DirectoryDialog.js,bin/org/eclipse/swt/widgets/FileDialog.js,bin/org/eclipse/swt/widgets/FontDialog.js,org/eclipse/swt/program/Program.js
=*/
cla$$ = $_C (function () {
this.accessibleListeners =  new java.util.Vector ();
this.accessibleControlListeners =  new java.util.Vector ();
this.textListeners =  new java.util.Vector ();
this.control = null;
$_Z (this, arguments);
}, $wt.accessibility, "Accessible");
$_M (cla$$, "addAccessibleListener", 
function (listener) {
if (listener == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.accessibleListeners.addElement (listener);
}, "$wt.accessibility.AccessibleListener");
$_M (cla$$, "addAccessibleControlListener", 
function (listener) {
if (listener == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.accessibleControlListeners.addElement (listener);
}, "$wt.accessibility.AccessibleControlListener");
$_M (cla$$, "addAccessibleTextListener", 
function (listener) {
if (listener == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.textListeners.addElement (listener);
}, "$wt.accessibility.AccessibleTextListener");
$_M (cla$$, "getControl", 
function () {
return this.control;
});
$_M (cla$$, "removeAccessibleListener", 
function (listener) {
if (listener == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.accessibleListeners.removeElement (listener);
}, "$wt.accessibility.AccessibleListener");
$_M (cla$$, "removeAccessibleControlListener", 
function (listener) {
if (listener == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.accessibleControlListeners.removeElement (listener);
}, "$wt.accessibility.AccessibleControlListener");
$_M (cla$$, "removeAccessibleTextListener", 
function (listener) {
if (listener == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.textListeners.removeElement (listener);
}, "$wt.accessibility.AccessibleTextListener");
$_M (cla$$, "selectionChanged", 
function () {
});
$_M (cla$$, "setFocus", 
function (childID) {
}, "Number");
$_M (cla$$, "textCaretMoved", 
function (index) {
}, "Number");
$_M (cla$$, "textChanged", 
function (type, startIndex, length) {
}, "Number,Number,Number");
$_M (cla$$, "textSelectionChanged", 
function () {
});
cla$$ = $_C (function () {
this.handle = null;
this.bgColor = null;
this.fgColor = null;
this.font = null;
$_Z (this, arguments);
}, $wt.graphics, "GC");
$_K (cla$$, 
function (drawable) {
this.construct (drawable, $WT.NONE);
}, "$wt.graphics.Drawable");
$_K (cla$$, 
function (drawable, style) {
if (drawable == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if ($_O (drawable, $wt.widgets.Control)) {
var ctrl = drawable;
this.handle = ctrl.handle;
} else if ($_O (drawable, $wt.graphics.Image)) {
var img = drawable;
this.handle = img.handle;
} else {
this.handle = document.createElement ("DIV");
this.handle.style.position = "absolute";
}}, "$wt.graphics.Drawable,Number");
$_M (cla$$, "getBackground", 
function () {
if (this.handle == null) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
if (this.bgColor == null) {
this.bgColor =  new $wt.graphics.Color (null, "white");
}return this.bgColor;
});
$_M (cla$$, "setBackground", 
function (color) {
this.bgColor = color;
}, "$wt.graphics.Color");
$_M (cla$$, "getForeground", 
function () {
if (this.fgColor == null) {
this.fgColor =  new $wt.graphics.Color (null, "black");
}return this.fgColor;
});
$_M (cla$$, "setForeground", 
function (color) {
this.fgColor = color;
}, "$wt.graphics.Color");
$_M (cla$$, "setFont", 
function (font) {
if (font == null) {
font = $wt.widgets.Display.getDefault ().getSystemFont ();
} else {
if (font.isDisposed ()) $WT.error ($WT.ERROR_INVALID_ARGUMENT);
this.font = font;
}}, "$wt.graphics.Font");
$_M (cla$$, "fillRectangle", 
function (rect) {
if (rect == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.fillRectangle (rect.x, rect.y, rect.width, rect.height);
}, "$wt.graphics.Rectangle");
$_M (cla$$, "fillRectangle", 
function (x, y, width, height) {
if (this.handle == null) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
var rect = document.createElement ("DIV");
rect.style.position = "absolute";
rect.style.left = x + "px";
rect.style.top = y + "px";
rect.style.width = width + "px";
rect.style.height = height + "px";
rect.style.backgroundColor = this.bgColor.getCSSHandle ();
this.handle.appendChild (rect);
}, "Number,Number,Number,Number");
$_M (cla$$, "fillRoundRectangle", 
function (x, y, width, height, arcWidth, arcHeight) {
this.fillRectangle (x, y, width, height);
}, "Number,Number,Number,Number,Number,Number");
$_M (cla$$, "fillGradientRectangle", 
function (x, y, width, height, vertical) {
if (this.handle == null) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
if (width == 0 || height == 0) return ;
this.fillRectangle (x, y, width, height);
}, "Number,Number,Number,Number,Boolean");
$_M (cla$$, "drawImage", 
function (image, x, y) {
if (this.handle == null) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
if (image == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (image.isDisposed ()) $WT.error ($WT.ERROR_INVALID_ARGUMENT);
if (image.handle != null) {
for (var i = 0; i < image.handle.childNodes.length; i++) {
this.handle.appendChild (image.handle.childNodes[i]);
}
}}, "$wt.graphics.Image,Number,Number");
$_M (cla$$, "dispose", 
function () {
});
$_M (cla$$, "getFontMetrics", 
function () {
return  new $wt.graphics.FontMetrics ();
});
$_M (cla$$, "stringExtent", 
function (string) {
if (string == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
var length = string.length;
if (length == 0) {
var height = UIStringUtil.calculatePlainStringLineHeight ("M");
return  new $wt.graphics.Point (0, height);
} else {
var height = UIStringUtil.calculatePlainStringLineHeight (string);
var width = UIStringUtil.calculatePlainStringLineWidth (string);
return  new $wt.graphics.Point (width, height);
}}, "String");
$_M (cla$$, "textExtent", 
function (string) {
return this.textExtent (string, $WT.DRAW_DELIMITER | $WT.DRAW_TAB);
}, "String");
$_M (cla$$, "textExtent", 
function (string, flags) {
if (string == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (string.length == 0) {
var height = UIStringUtil.calculatePlainStringLineHeight ("M");
return  new $wt.graphics.Point (0, height);
} else {
var height = UIStringUtil.calculatePlainStringLineHeight (string);
var width = UIStringUtil.calculatePlainStringLineWidth (string);
return  new $wt.graphics.Point (width, height);
}}, "String,Number");
$_M (cla$$, "drawRectangle", 
function (x, y, width, height) {
if (this.handle == null) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
var rect = document.createElement ("DIV");
rect.style.position = "absolute";
rect.style.fontSize = "0px";
rect.style.left = x + "px";
rect.style.top = y + "px";
rect.style.width = width + "px";
rect.style.height = height + "px";
rect.style.borderColor = this.fgColor.getCSSHandle ();
rect.style.borderStyle = "solid";
rect.style.borderWidth = "1px";
this.handle.appendChild (rect);
}, "Number,Number,Number,Number");
$_M (cla$$, "drawRectangle", 
function (rect) {
if (rect == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.drawRectangle (rect.x, rect.y, rect.width, rect.height);
}, "$wt.graphics.Rectangle");
$_M (cla$$, "drawLine", 
function (x1, y1, x2, y2) {
if (this.handle == null) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
var rect = document.createElement ("DIV");
rect.style.position = "absolute";
rect.style.fontSize = "0px";
if (x1 == x2) {
rect.style.left = x1 + "px";
rect.style.borderLeftStyle = "solid";
rect.style.top = Math.min (y1, y2) + "px";
rect.style.height = Math.abs (y1 - y2) + "px";
} else if (y1 == y2) {
rect.style.top = x1 + "px";
rect.style.borderTopStyle = "solid";
rect.style.left = Math.min (x1, x2) + "px";
rect.style.width = Math.abs (x1 - x2) + "px";
} else {
rect.style.left = Math.min (x1, x2) + "px";
rect.style.top = Math.min (y1, y2) + "px";
rect.style.width = Math.abs (x1 - x2) + "px";
rect.style.height = Math.abs (y1 - y2) + "px";
rect.style.borderStyle = "solid";
}rect.style.borderColor = this.fgColor.getCSSHandle ();
rect.style.borderWidth = "1px";
this.handle.appendChild (rect);
}, "Number,Number,Number,Number");
$_M (cla$$, "drawString", 
function (string, x, y) {
this.drawString (string, x, y, false);
}, "String,Number,Number");
$_M (cla$$, "drawString", 
function (string, x, y, isTransparent) {
if (this.handle == null) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
if (string == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
var length = string.length;
if (length == 0) return ;
var rect = document.createElement ("DIV");
rect.style.position = "absolute";
rect.style.left = x + "px";
rect.style.top = y + "px";
rect.style.whiteSpace = "nowrap";
if (!isTransparent) {
rect.style.backgroundColor = this.bgColor.getCSSHandle ();
}this.handle.appendChild (rect);
rect.appendChild (document.createTextNode (string));
}, "String,Number,Number,Boolean");
$_M (cla$$, "drawText", 
function (string, x, y) {
this.drawText (string, x, y, $WT.DRAW_DELIMITER | $WT.DRAW_TAB);
}, "String,Number,Number");
$_M (cla$$, "drawText", 
function (string, x, y, isTransparent) {
var flags = $WT.DRAW_DELIMITER | $WT.DRAW_TAB;
if (isTransparent) flags |= $WT.DRAW_TRANSPARENT;
this.drawText (string, x, y, flags);
}, "String,Number,Number,Boolean");
$_M (cla$$, "drawText", 
function (string, x, y, flags) {
System.out.println (this.fgColor.getCSSHandle ());
if (this.handle == null) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
if (string == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (string.length == 0) return ;
var rect = document.createElement ("DIV");
rect.style.position = "absolute";
rect.style.left = x + "px";
rect.style.top = y + "px";
rect.style.whiteSpace = "nowrap";
if ((flags & $WT.DRAW_TRANSPARENT) == 0) {
rect.style.backgroundColor = this.bgColor.getCSSHandle ();
}rect.style.color = this.fgColor.getCSSHandle ();
this.handle.appendChild (rect);
rect.appendChild (document.createTextNode (string));
}, "String,Number,Number,Number");
$_M (cla$$, "setLineWidth", 
function (lineWidth) {
if (this.handle == null) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
}, "Number");
$_M (cla$$, "drawImage", 
function (image, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight) {
if (this.handle == null) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
if (srcWidth == 0 || srcHeight == 0 || destWidth == 0 || destHeight == 0) return ;
if (srcX < 0 || srcY < 0 || srcWidth < 0 || srcHeight < 0 || destWidth < 0 || destHeight < 0) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}if (image == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (image.isDisposed ()) $WT.error ($WT.ERROR_INVALID_ARGUMENT);
this.drawImage (image, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight, false);
}, "$wt.graphics.Image,Number,Number,Number,Number,Number,Number,Number,Number");
$_M (cla$$, "drawImage", 
function (srcImage, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight, simple) {
if (this.handle == null) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
var rect = document.createElement ("IMG");
rect.src = srcImage.url;
rect.style.position = "absolute";
rect.style.fontSize = "0px";
rect.style.left = destX + "px";
rect.style.top = destY + "px";
rect.style.width = destWidth + "px";
rect.style.height = destHeight + "px";
this.handle.appendChild (rect);
}, "$wt.graphics.Image,Number,Number,Number,Number,Number,Number,Number,Number,Boolean");
cla$$ = $_C (function () {
this.device = null;
$_Z (this, arguments);
}, $wt.graphics, "Resource");
cla$$ = $_C (function () {
this.handle = 0;
this.cssHandle = null;
$_Z (this, arguments);
}, $wt.graphics, "Color", $wt.graphics.Resource);
$_K (cla$$, 
function (device, red, green, blue) {
$_R (this, $wt.graphics.Color, []);
if (device == null) device = $wt.graphics.Device.getDevice ();
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.init (device, red, green, blue);
}, "$wt.graphics.Device,Number,Number,Number");
$_K (cla$$, 
function (device, rgb) {
$_R (this, $wt.graphics.Color, []);
if (device == null) device = $wt.graphics.Device.getDevice ();
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (rgb == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.init (device, rgb.red, rgb.green, rgb.blue);
}, "$wt.graphics.Device,$wt.graphics.RGB");
$_V (cla$$, "dispose", 
function () {
if (this.handle == -1) return ;
if (this.device.isDisposed ()) return ;
this.handle = -1;
this.cssHandle = null;
this.device = null;
});
$_V (cla$$, "equals", 
function (object) {
if (object == this) return true;
if (!($_O (object, $wt.graphics.Color))) return false;
var color = object;
if (this.device != color.device) return false;
if (this.cssHandle != null && color.cssHandle != null) {
return this.cssHandle == color.cssHandle;
} else if (this.cssHandle != null) {
return ($wt.graphics.Color.rgbHandleFromCSS (this.cssHandle) & 0xFFFFFF) == (color.handle & 0xFFFFFF);
} else if (color.cssHandle != null) {
return ($wt.graphics.Color.rgbHandleFromCSS (color.cssHandle) & 0xFFFFFF) == (this.handle & 0xFFFFFF);
} else {
return (this.handle & 0xFFFFFF) == (color.handle & 0xFFFFFF);
}}, "Object");
$_M (cla$$, "getBlue", 
function () {
if (this.isDisposed ()) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
if (this.handle < 0) this.handle = $wt.graphics.Color.rgbHandleFromCSS (this.cssHandle);
return (this.handle & 0xFF0000) >> 16;
});
$_M (cla$$, "getGreen", 
function () {
if (this.isDisposed ()) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
if (this.handle < 0) this.handle = $wt.graphics.Color.rgbHandleFromCSS (this.cssHandle);
return (this.handle & 0xFF00) >> 8;
});
$_M (cla$$, "getRed", 
function () {
if (this.isDisposed ()) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
if (this.handle < 0) this.handle = $wt.graphics.Color.rgbHandleFromCSS (this.cssHandle);
return this.handle & 0xFF;
});
$_M (cla$$, "getRGB", 
function () {
if (this.isDisposed ()) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
if (this.handle < 0) this.handle = $wt.graphics.Color.rgbHandleFromCSS (this.cssHandle);
return  new $wt.graphics.RGB (this.handle & 0xFF, (this.handle & 0xFF00) >> 8, (this.handle & 0xFF0000) >> 16);
});
$_V (cla$$, "hashCode", 
function () {
return this.handle;
});
$_M (cla$$, "init", 
function (device, red, green, blue) {
if (red > 255 || red < 0 || green > 255 || green < 0 || blue > 255 || blue < 0) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}this.device = device;
this.handle = 0x02000000 | (red & 0xFF) | ((green & 0xFF) << 8) | ((blue & 0xFF) << 16);
this.cssHandle = null;
}, "$wt.graphics.Device,Number,Number,Number");
$_V (cla$$, "isDisposed", 
function () {
return this.handle == -1;
});
$_V (cla$$, "toString", 
function () {
if (this.isDisposed ()) return "Color {*DISPOSED*}";
if (this.cssHandle != null) return "Color {\"" + this.cssHandle + "\"}";
return "Color {" + this.getRed () + ", " + this.getGreen () + ", " + this.getBlue () + "}";
});
$_K (cla$$, 
function (device, handle) {
$_R (this, $wt.graphics.Color, []);
if (device == null) device = $wt.graphics.Device.getDevice ();
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.cssHandle = handle;
this.handle = -2;
this.device = device;
}, "$wt.graphics.Device,String");
cla$$.rgbHandleFromCSS = $_M (cla$$, "rgbHandleFromCSS", 
($fz = function (cssHandle) {
if (cssHandle == null) return 0x02000000;
var red = -1, green = -1, blue = -1;
cssHandle.replace (/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/, function ($0, $1, $2, $3) {
red = parseInt ($1);
green = parseInt ($2);
blue = parseInt ($3);
return $0;
});
if (red != -1 && green != -1 && blue != -1) {
return 0x02000000 | (red & 0xFF) | ((green & 0xFF) << 8) | ((blue & 0xFF) << 16);
} else {
var intHandle = -2;
cssHandle.replace (/#([0-9a-fA-F]{3,6})/, function ($0, $1) {
if ($1.length == 3) {
var r = $1.charAt (0);
var g = $1.charAt (1);
var b = $1.charAt (2);
intHandle = eval ("0x" + b + b + g + g + r + r);
} else if ($1.length == 6) {
intHandle = eval ("0x" + $1.substring(4, 6) + $1.substring(2, 4) + $1.substring(0, 2));
} else {
$WT.error($WT.ERROR_INVALID_ARGUMENT);
}
});
if (intHandle != -2) {
return 0x02000000 | intHandle;
} else {
return 0x0F000000; // unknown yet, may be "menu" or others
}
}
}, $fz.isPrivate = true, $fz), "String");
$_M (cla$$, "getCSSHandle", 
function () {
if (this.cssHandle != null) return this.cssHandle;
return "rgb(" + this.getRed () + ", " + this.getGreen () + ", " + this.getBlue () + ")";
});
$_M (cla$$, "isPlatformSpecific", 
function () {
if ((this.handle < 0 || this.handle == 0x0F000000) && this.cssHandle != null) {
return $wt.graphics.Color.rgbHandleFromCSS (this.cssHandle) == 0x0F000000;
}return false;
});
cla$$ = $_C (function () {
this.handle = null;
$_Z (this, arguments);
}, $wt.graphics, "Cursor", $wt.graphics.Resource);
$_K (cla$$, 
function (device, style) {
$_R (this, $wt.graphics.Cursor, []);
if (device == null) device = $wt.graphics.Device.getDevice ();
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.device = device;
switch (style) {
case $WT.CURSOR_HAND:
this.handle = "pointer";
break;
case $WT.CURSOR_ARROW:
this.handle = "default";
break;
case $WT.CURSOR_WAIT:
this.handle = "wait";
break;
case $WT.CURSOR_CROSS:
this.handle = "crosshair";
break;
case $WT.CURSOR_APPSTARTING:
this.handle = "progress";
break;
case $WT.CURSOR_HELP:
this.handle = "help";
break;
case $WT.CURSOR_SIZEALL:
this.handle = "move";
break;
case $WT.CURSOR_SIZENESW:
this.handle = "move";
break;
case $WT.CURSOR_SIZENS:
this.handle = "s-resize";
break;
case $WT.CURSOR_SIZENWSE:
this.handle = "move";
break;
case $WT.CURSOR_SIZEWE:
this.handle = "e-resize";
break;
case $WT.CURSOR_SIZEN:
this.handle = "n-resize";
break;
case $WT.CURSOR_SIZES:
this.handle = "s-resize";
break;
case $WT.CURSOR_SIZEE:
this.handle = "e-resize";
break;
case $WT.CURSOR_SIZEW:
this.handle = "w-resize";
break;
case $WT.CURSOR_SIZENE:
this.handle = "ne-resize";
break;
case $WT.CURSOR_SIZESE:
this.handle = "se-resize";
break;
case $WT.CURSOR_SIZESW:
this.handle = "sw-resize";
break;
case $WT.CURSOR_SIZENW:
this.handle = "nw-resize";
break;
case $WT.CURSOR_UPARROW:
this.handle = "default";
break;
case $WT.CURSOR_IBEAM:
this.handle = "text";
break;
case $WT.CURSOR_NO:
this.handle = "auto";
break;
default:
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}
}, "$wt.graphics.Device,Number");
$_K (cla$$, 
function (device, source, mask, hotspotX, hotspotY) {
$_R (this, $wt.graphics.Cursor, []);
if (device == null) device = $wt.graphics.Device.getDevice ();
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.device = device;
if (source == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (source.url != null) {
this.handle = "url(\'" + source.url + "\'),default";
} else {
this.handle = "default";
}}, "$wt.graphics.Device,$wt.graphics.ImageData,$wt.graphics.ImageData,Number,Number");
$_K (cla$$, 
function (device, source, hotspotX, hotspotY) {
$_R (this, $wt.graphics.Cursor, []);
if (device == null) device = $wt.graphics.Device.getDevice ();
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.device = device;
if (source == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (source.url != null) {
this.handle = "url(\'" + source.url + "\'),default";
} else {
this.handle = "default";
}}, "$wt.graphics.Device,$wt.graphics.ImageData,Number,Number");
$_V (cla$$, "dispose", 
function () {
if (this.handle == null) return ;
if (this.device.isDisposed ()) return ;
this.handle = null;
this.device = null;
});
$_V (cla$$, "equals", 
function (object) {
if (object == this) return true;
if (!($_O (object, $wt.graphics.Cursor))) return false;
var cursor = object;
return this.device == cursor.device && this.handle == cursor.handle;
}, "Object");
$_V (cla$$, "hashCode", 
function () {
return this.handle.hashCode ();
});
$_V (cla$$, "isDisposed", 
function () {
return this.handle == null;
});
$_V (cla$$, "toString", 
function () {
if (this.isDisposed ()) return "Cursor {*DISPOSED*}";
return "Cursor {" + this.handle + "}";
});
$_K (cla$$, 
function (device, handle) {
$_R (this, $wt.graphics.Cursor, []);
if (device == null) device = $wt.graphics.Device.getDevice ();
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.handle = handle;
this.device = device;
}, "$wt.graphics.Device,String");
$_M (cla$$, "getCSSHandle", 
function () {
return this.handle;
});
$_I ($wt.graphics, "Drawable");
cla$$ = $_C (function () {
this.disposed = false;
$_Z (this, arguments);
}, $wt.graphics, "Device", null, $wt.graphics.Drawable);
cla$$.getDevice = $_M (cla$$, "getDevice", 
function () {
return $wt.widgets.Display.getDefault ();
});
$_K (cla$$, 
function () {
this.construct (null);
});
$_K (cla$$, 
function (data) {
this.create (data);
this.init ();
}, "$wt.graphics.DeviceData");
$_M (cla$$, "checkDevice", 
function () {
if (this.disposed) $WT.error ($WT.ERROR_DEVICE_DISPOSED);
});
$_M (cla$$, "create", 
function (data) {
}, "$wt.graphics.DeviceData");
$_M (cla$$, "destroy", 
function () {
});
$_M (cla$$, "dispose", 
function () {
if (this.isDisposed ()) return ;
this.checkDevice ();
this.release ();
this.destroy ();
this.disposed = true;
});
$_M (cla$$, "getBounds", 
function () {
this.checkDevice ();
var width = window.screen.availWidth;
var height = window.screen.availHeight;
return  new $wt.graphics.Rectangle (0, 0, width, height);
});
$_M (cla$$, "getDeviceData", 
function () {
this.checkDevice ();
var data =  new $wt.graphics.DeviceData ();
return data;
});
$_M (cla$$, "getClientArea", 
function () {
return this.getBounds ();
});
$_M (cla$$, "getDepth", 
function () {
this.checkDevice ();
return 32;
});
$_M (cla$$, "getDPI", 
function () {
this.checkDevice ();
return  new $wt.graphics.Point (96, 96);
});
$_M (cla$$, "getFontList", 
function (faceName, scalable) {
this.checkDevice ();
return  new Array (0);
}, "String,Boolean");
$_M (cla$$, "getSystemColor", 
function (id) {
this.checkDevice ();
var pixel = 0x02000000;
switch (id) {
case $WT.COLOR_WHITE:
pixel = 0x02FFFFFF;
break;
case $WT.COLOR_BLACK:
pixel = 0x02000000;
break;
case $WT.COLOR_RED:
pixel = 0x020000FF;
break;
case $WT.COLOR_DARK_RED:
pixel = 0x02000080;
break;
case $WT.COLOR_GREEN:
pixel = 0x0200FF00;
break;
case $WT.COLOR_DARK_GREEN:
pixel = 0x02008000;
break;
case $WT.COLOR_YELLOW:
pixel = 0x0200FFFF;
break;
case $WT.COLOR_DARK_YELLOW:
pixel = 0x02008080;
break;
case $WT.COLOR_BLUE:
pixel = 0x02FF0000;
break;
case $WT.COLOR_DARK_BLUE:
pixel = 0x02800000;
break;
case $WT.COLOR_MAGENTA:
pixel = 0x02FF00FF;
break;
case $WT.COLOR_DARK_MAGENTA:
pixel = 0x02800080;
break;
case $WT.COLOR_CYAN:
pixel = 0x02FFFF00;
break;
case $WT.COLOR_DARK_CYAN:
pixel = 0x02808000;
break;
case $WT.COLOR_GRAY:
pixel = 0x02C0C0C0;
break;
case $WT.COLOR_DARK_GRAY:
pixel = 0x02808080;
break;
}
return  new $wt.graphics.Color (this, pixel & 0x000000FF, (pixel & 0x0000FF00) >> 8, (pixel & 0x00FF00) >> 16);
}, "Number");
$_M (cla$$, "getSystemFont", 
function () {
this.checkDevice ();
return  new $wt.graphics.Font (this, "Tahoma,Arial", 10, $WT.NONE);
});
$_M (cla$$, "getWarnings", 
function () {
this.checkDevice ();
return false;
});
$_M (cla$$, "init", 
function () {
});
$_M (cla$$, "isDisposed", 
function () {
return this.disposed;
});
$_M (cla$$, "release", 
function () {
});
$_M (cla$$, "setWarnings", 
function (warnings) {
this.checkDevice ();
}, "Boolean");
cla$$ = $_C (function () {
this.width = 0;
this.height = 0;
this.disposalMethod = $WT.DM_UNSPECIFIED;
this.type = 0;
this.x = 0;
this.y = 0;
this.url = null;
$_Z (this, arguments);
}, $wt.graphics, "ImageData", null, $wt.internal.CloneableCompatibility);
$_K (cla$$, 
function (stream) {
}, "java.io.InputStream");
$_K (cla$$, 
function (filename) {
this.url = filename;
}, "String");
cla$$ = $_C (function () {
this.data = null;
this.logicalScreenWidth = 0;
this.logicalScreenHeight = 0;
this.backgroundPixel = 0;
this.repeatCount = 0;
$_Z (this, arguments);
}, $wt.graphics, "ImageLoader");
$_K (cla$$, 
function () {
this.reset ();
});
$_M (cla$$, "reset", 
function () {
this.data = null;
this.logicalScreenWidth = 0;
this.logicalScreenHeight = 0;
this.backgroundPixel = -1;
this.repeatCount = 1;
});
$_M (cla$$, "load", 
function (stream) {
if (stream == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.reset ();
this.data = [ new $wt.graphics.ImageData (stream)];
return this.data;
}, "java.io.InputStream");
$_M (cla$$, "load", 
function (filename) {
if (filename == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.reset ();
this.data = [ new $wt.graphics.ImageData (filename)];
return this.data;
}, "String");
cla$$ = $_C (function () {
this.url = null;
this.width = 0;
this.height = 0;
this.handle = null;
this.type = 0;
this.imgHandle = null;
$_Z (this, arguments);
}, $wt.graphics, "Image", $wt.graphics.Resource, $wt.graphics.Drawable);
$_K (cla$$, 
function (device, width, height) {
$_R (this, $wt.graphics.Image, []);
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.init (device, width, height);
}, "$wt.graphics.Device,Number,Number");
$_K (cla$$, 
function (device, filename) {
$_R (this, $wt.graphics.Image, []);
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.url = filename;
}, "$wt.graphics.Device,String");
$_K (cla$$, 
function (device, data) {
$_R (this, $wt.graphics.Image, []);
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.url = data.url;
}, "$wt.graphics.Device,$wt.graphics.ImageData");
$_K (cla$$, 
function (device, bounds) {
$_R (this, $wt.graphics.Image, []);
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (bounds == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.init (device, bounds.width, bounds.height);
}, "$wt.graphics.Device,$wt.graphics.Rectangle");
$_K (cla$$, 
function (device, srcImage, flag) {
$_R (this, $wt.graphics.Image, []);
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (srcImage == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (srcImage.isDisposed ()) $WT.error ($WT.ERROR_INVALID_ARGUMENT);
switch (flag) {
case $WT.IMAGE_COPY:
{
}case $WT.IMAGE_DISABLE:
{
}case $WT.IMAGE_GRAY:
{
}}
this.url = srcImage.url;
}, "$wt.graphics.Device,$wt.graphics.Image,Number");
$_M (cla$$, "init", 
function (device, width, height) {
if (width <= 0 || height <= 0) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}this.type = $WT.BITMAP;
this.width = width;
this.height = height;
this.handle = document.createElement ("DIV");
this.handle.style.width = width + "px";
this.handle.style.height = height + "px";
this.imgHandle = this.handle;
}, "$wt.graphics.Device,Number,Number");
$_V (cla$$, "isDisposed", 
function () {
return false;
});
$_V (cla$$, "dispose", 
function () {
});
$_M (cla$$, "getBounds", 
function () {
if (this.isDisposed ()) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
switch (this.type) {
case $WT.BITMAP:
return  new $wt.graphics.Rectangle (0, 0, this.width, this.height);
}
return  new $wt.graphics.Rectangle (0, 0, this.width, this.height);
});
$_M (cla$$, "getImageData", 
function () {
if (this.isDisposed ()) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
return  new $wt.graphics.ImageData (this.url);
});
cla$$ = $_C (function () {
this.data = null;
$_Z (this, arguments);
}, $wt.graphics, "Font", $wt.graphics.Resource);
$_K (cla$$, 
function () {
$_R (this, $wt.graphics.Font, []);
});
$_K (cla$$, 
function (device, fd) {
$_R (this, $wt.graphics.Font, []);
this.init (device, fd);
}, "$wt.graphics.Device,$wt.graphics.FontData");
$_K (cla$$, 
function (device, fds) {
$_R (this, $wt.graphics.Font, []);
if (device == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (fds == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (fds.length == 0) $WT.error ($WT.ERROR_INVALID_ARGUMENT);
for (var i = 0; i < fds.length; i++) {
if (fds[i] == null) $WT.error ($WT.ERROR_INVALID_ARGUMENT);
}
this.init (device, fds[0]);
}, "$wt.graphics.Device,Array");
$_K (cla$$, 
function (device, name, height, style) {
$_R (this, $wt.graphics.Font, []);
if (name == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.init (device,  new $wt.graphics.FontData (name, height, style));
}, "$wt.graphics.Device,String,Number,Number");
$_V (cla$$, "dispose", 
function () {
this.data = null;
});
$_V (cla$$, "equals", 
function (object) {
if (object == this) return true;
if (!($_O (object, $wt.graphics.Font))) return false;
var font = object;
return font.data.equals (this.data);
}, "Object");
$_M (cla$$, "getFontData", 
function () {
if (this.isDisposed ()) $WT.error ($WT.ERROR_GRAPHIC_DISPOSED);
var datum =  new Array (1);
datum[0] = this.data;
return datum;
});
$_V (cla$$, "hashCode", 
function () {
return this.data.hashCode ();
});
$_M (cla$$, "init", 
function (device, fd) {
this.data = fd;
}, "$wt.graphics.Device,$wt.graphics.FontData");
$_V (cla$$, "isDisposed", 
function () {
return this.data == null;
});
$_V (cla$$, "toString", 
function () {
if (this.isDisposed ()) return "Font {*DISPOSED*}";
return "Font {" + this.data + "}";
});
cla$$ = $_C (function () {
this.height = 0;
this.style = 0;
this.name = null;
$_Z (this, arguments);
}, $wt.graphics, "FontData");
$_K (cla$$, 
function () {
this.name = "Arial";
this.style = $WT.NORMAL;
this.height = 12;
});
$_K (cla$$, 
function (string) {
this.name = string;
if (this.name == null) {
this.name = "Arial";
}this.style = $WT.NORMAL;
this.height = 12;
}, "String");
$_K (cla$$, 
function (name, height, style) {
this.setName (name);
this.setHeight (height);
this.setStyle (style);
}, "String,Number,Number");
$_V (cla$$, "equals", 
function (object) {
if (object == this) return true;
if (!($_O (object, $wt.graphics.FontData))) return false;
var fd = object;
return this.height == fd.height && this.style == fd.style && this.getName ().equals (fd.getName ());
}, "Object");
$_M (cla$$, "getHeight", 
function () {
return this.height;
});
$_M (cla$$, "getName", 
function () {
return this.name;
});
$_M (cla$$, "getStyle", 
function () {
return this.style;
});
$_V (cla$$, "hashCode", 
function () {
return this.height ^ this.style ^ this.getName ().hashCode ();
});
$_M (cla$$, "setHeight", 
function (height) {
if (height < 0) $WT.error ($WT.ERROR_INVALID_ARGUMENT);
this.height = height;
}, "Number");
$_M (cla$$, "setName", 
function (name) {
this.name = name;
}, "String");
$_M (cla$$, "setStyle", 
function (style) {
this.style = style;
}, "Number");
$_V (cla$$, "toString", 
function () {
var buffer =  new StringBuffer ();
buffer.append ("1|");
buffer.append (this.getName ());
buffer.append ("|");
buffer.append (this.getHeight ());
buffer.append ("|");
buffer.append (this.getStyle ());
buffer.append ("|");
buffer.append (this.getName ());
return buffer.toString ();
});
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.graphics, "FontMetrics");
$_M (cla$$, "getAverageCharWidth", 
function () {
return 9;
});
$_M (cla$$, "getHeight", 
function () {
return 16;
});
cla$$ = $_C (function () {
this.handle = null;
this.style = 0;
this.state = 0;
this.display = null;
this.eventTable = null;
this.data = null;
$_Z (this, arguments);
}, $wt.widgets, "Widget");
cla$$.checkBits = $_M (cla$$, "checkBits", 
function (style, int0, int1, int2, int3, int4, int5) {
var mask = int0 | int1 | int2 | int3 | int4 | int5;
if ((style & mask) == 0) style |= int0;
if ((style & int0) != 0) style = (style & ~mask) | int0;
if ((style & int1) != 0) style = (style & ~mask) | int1;
if ((style & int2) != 0) style = (style & ~mask) | int2;
if ((style & int3) != 0) style = (style & ~mask) | int3;
if ((style & int4) != 0) style = (style & ~mask) | int4;
if ((style & int5) != 0) style = (style & ~mask) | int5;
return style;
}, "Number,Number,Number,Number,Number,Number,Number");
$_K (cla$$, 
function (parent, style) {
this.style = style;
this.display = parent.display;
}, "$wt.widgets.Widget,Number");
$_M (cla$$, "addListener", 
function (eventType, listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) this.eventTable =  new $wt.widgets.EventTable ();
this.eventTable.hook (eventType, listener);
}, "Number,$wt.widgets.Listener");
$_M (cla$$, "addDisposeListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Dispose, typedListener);
}, "$wt.events.DisposeListener");
$_M (cla$$, "checkXWidget", 
function () {
});
$_M (cla$$, "getData", 
function () {
return (this.state & $wt.widgets.Widget.KEYED_DATA) != 0 ? (this.data)[0] : this.data;
});
$_M (cla$$, "getData", 
function (key) {
if (key == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if ((this.state & $wt.widgets.Widget.KEYED_DATA) != 0) {
var table = this.data;
for (var i = 1; i < table.length; i += 2) {
if (key.equals (table[i])) return table[i + 1];
}
}return null;
}, "String");
$_M (cla$$, "getDisplay", 
function () {
var display = this.display;
if (display == null) this.error ($WT.ERROR_WIDGET_DISPOSED);
return display;
});
$_M (cla$$, "getStyle", 
function () {
return this.style;
});
$_M (cla$$, "hooks", 
function (eventType) {
if (this.eventTable == null) return false;
return this.eventTable.hooks (eventType);
}, "Number");
$_M (cla$$, "isListening", 
function (eventType) {
return this.hooks (eventType);
}, "Number");
$_M (cla$$, "notifyListeners", 
function (eventType, event) {
if (event == null) event =  new $wt.widgets.Event ();
this.sendEvent (eventType, event);
}, "Number,$wt.widgets.Event");
$_M (cla$$, "removeDisposeListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Dispose, listener);
}, "$wt.events.DisposeListener");
$_M (cla$$, "removeListener", 
function (eventType, listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook (eventType, listener);
}, "Number,$wt.widgets.Listener");
$_M (cla$$, "removeListener", 
function (eventType, listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook (eventType, listener);
}, "Number,$wt.internal.SWTEventListener");
$_M (cla$$, "setData", 
function (data) {
if ((this.state & $wt.widgets.Widget.KEYED_DATA) != 0) {
(this.data)[0] = data;
} else {
this.data = data;
}}, "Object");
$_M (cla$$, "setData", 
function (key, value) {
if (key == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var index = 1;
var table = null;
if ((this.state & $wt.widgets.Widget.KEYED_DATA) != 0) {
table = this.data;
while (index < table.length) {
if (key.equals (table[index])) break;
index += 2;
}
}if (value != null) {
if ((this.state & $wt.widgets.Widget.KEYED_DATA) != 0) {
if (index == table.length) {
var newTable =  new Array (table.length + 2);
System.arraycopy (table, 0, newTable, 0, table.length);
this.data = table = newTable;
}} else {
table =  new Array (3);
table[0] = this.data;
this.data = table;
this.state |= $wt.widgets.Widget.KEYED_DATA;
}table[index] = key;
table[index + 1] = value;
} else {
if ((this.state & $wt.widgets.Widget.KEYED_DATA) != 0) {
if (index != table.length) {
var length = table.length - 2;
if (length == 1) {
this.data = table[0];
this.state &= ($t$ = ~ $wt.widgets.Widget.KEYED_DATA, $wt.widgets.Widget.prototype.KEYED_DATA = $wt.widgets.Widget.KEYED_DATA, $t$);
} else {
var newTable =  new Array (length);
System.arraycopy (table, 0, newTable, 0, index);
System.arraycopy (table, index + 2, newTable, index, length - index);
this.data = newTable;
}}}}}, "String,Object");
$_M (cla$$, "getName", 
function () {
var string = this.getClass ().getName ();
var index = string.lastIndexOf ('.');
if (index == -1) return string;
return string.substring (index + 1, string.length);
});
$_M (cla$$, "getNameText", 
function () {
return "";
});
$_V (cla$$, "toString", 
function () {
var string = "*Disposed*";
if (!this.isDisposed ()) {
string = "*Wrong Thread*";
if (this.isValidThread ()) string = this.getNameText ();
}return this.getName () + " {" + string + "}";
});
$_M (cla$$, "dispose", 
function () {
if (this.isDisposed ()) return ;
if (!this.isValidThread ()) this.error ($WT.ERROR_THREAD_INVALID_ACCESS);
this.releaseChild ();
this.releaseWidget ();
this.destroyWidget ();
});
$_M (cla$$, "isDisposed", 
function () {
return (this.state & $wt.widgets.Widget.DISPOSED) != 0;
});
$_M (cla$$, "isValidThread", 
function () {
return true;
});
$_M (cla$$, "error", 
function (code) {
$WT.error (code);
}, "Number");
$_M (cla$$, "releaseWidget", 
function () {
this.sendEvent ($WT.Dispose);
this.eventTable = null;
this.data = null;
});
$_M (cla$$, "releaseHandle", 
function () {
if (this.eventTable != null) {
this.eventTable.releaseResource ();
this.eventTable = null;
}this.handle = null;
});
$_M (cla$$, "releaseChild", 
function () {
});
$_M (cla$$, "destroyWidget", 
function () {
this.state |= $wt.widgets.Widget.DISPOSED;
});
$_M (cla$$, "sendEvent", 
function (event) {
var display = event.display;
if (display == null || !display.filterEvent (event)) {
if (this.eventTable != null) this.eventTable.sendEvent (event);
}}, "$wt.widgets.Event");
$_M (cla$$, "sendEvent", 
function (eventType) {
this.sendEvent (eventType, null, true);
}, "Number");
$_M (cla$$, "sendEvent", 
function (eventType, event) {
this.sendEvent (eventType, event, true);
}, "Number,$wt.widgets.Event");
$_M (cla$$, "sendEvent", 
function (eventType, event, send) {
if (this.eventTable == null && !this.display.filters (eventType)) {
return ;
}if (event == null) event =  new $wt.widgets.Event ();
event.type = eventType;
event.display = this.display;
event.widget = this;
if (event.time == 0) {
if (this.display != null) {
event.time = this.display.getLastEventTime ();
} else {
System.out.println ("display is null");
event.time = parseInt ( new java.util.Date ().getTime ());
}}if (send) {
this.sendEvent (event);
} else {
if (this.display != null) {
this.display.postEvent (event);
} else {
System.out.println ("display is null");
}}}, "Number,$wt.widgets.Event,Boolean");
$_M (cla$$, "filters", 
function (eventType) {
return this.display.filters (eventType);
}, "Number");
$_M (cla$$, "postEvent", 
function (eventType) {
this.sendEvent (eventType, null, false);
}, "Number");
$_M (cla$$, "postEvent", 
function (eventType, event) {
this.sendEvent (eventType, event, false);
}, "Number,$wt.widgets.Event");
$_M (cla$$, "checkSubclass", 
function () {
});
$_S (cla$$,
"DISPOSED", 1 << 0,
"CANVAS", 1 << 1,
"KEYED_DATA", 1 << 2,
"DISABLED", 1 << 3,
"HIDDEN", 1 << 4,
"LAYOUT_NEEDED", 1 << 5,
"LAYOUT_CHANGED", 1 << 6,
"DEFAULT_WIDTH", 64,
"DEFAULT_HEIGHT", 64);
cla$$ = $_C (function () {
this.menu = null;
this.parent = null;
this.layoutData = null;
this.cursor = null;
this.toolTipText = null;
$_Z (this, arguments);
}, $wt.widgets, "Control", $wt.widgets.Widget, $wt.graphics.Drawable);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Control, [parent, style]);
this.parent = parent;
this.createWidget ();
}, "$wt.widgets.Composite,Number");
$_M (cla$$, "addControlListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Resize, typedListener);
this.addListener ($WT.Move, typedListener);
}, "$wt.events.ControlListener");
$_M (cla$$, "addFocusListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.FocusIn, typedListener);
this.addListener ($WT.FocusOut, typedListener);
}, "$wt.events.FocusListener");
$_M (cla$$, "addHelpListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Help, typedListener);
}, "$wt.events.HelpListener");
$_M (cla$$, "addKeyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.KeyUp, typedListener);
this.addListener ($WT.KeyDown, typedListener);
}, "$wt.events.KeyListener");
$_M (cla$$, "addMouseListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.MouseDown, typedListener);
this.addListener ($WT.MouseUp, typedListener);
this.addListener ($WT.MouseDoubleClick, typedListener);
}, "$wt.events.MouseListener");
$_M (cla$$, "addMouseTrackListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.MouseEnter, typedListener);
this.addListener ($WT.MouseExit, typedListener);
this.addListener ($WT.MouseHover, typedListener);
}, "$wt.events.MouseTrackListener");
$_M (cla$$, "addMouseMoveListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.MouseMove, typedListener);
}, "$wt.events.MouseMoveListener");
$_M (cla$$, "addPaintListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Paint, typedListener);
}, "$wt.events.PaintListener");
$_M (cla$$, "addTraverseListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Traverse, typedListener);
}, "$wt.events.TraverseListener");
$_M (cla$$, "removeControlListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Move, listener);
this.eventTable.unhook ($WT.Resize, listener);
}, "$wt.events.ControlListener");
$_M (cla$$, "removeFocusListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.FocusIn, listener);
this.eventTable.unhook ($WT.FocusOut, listener);
}, "$wt.events.FocusListener");
$_M (cla$$, "removeHelpListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Help, listener);
}, "$wt.events.HelpListener");
$_M (cla$$, "removeKeyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.KeyUp, listener);
this.eventTable.unhook ($WT.KeyDown, listener);
}, "$wt.events.KeyListener");
$_M (cla$$, "removeMouseTrackListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.MouseEnter, listener);
this.eventTable.unhook ($WT.MouseExit, listener);
this.eventTable.unhook ($WT.MouseHover, listener);
}, "$wt.events.MouseTrackListener");
$_M (cla$$, "removeMouseListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.MouseDown, listener);
this.eventTable.unhook ($WT.MouseUp, listener);
this.eventTable.unhook ($WT.MouseDoubleClick, listener);
}, "$wt.events.MouseListener");
$_M (cla$$, "removeMouseMoveListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.MouseMove, listener);
}, "$wt.events.MouseMoveListener");
$_M (cla$$, "removePaintListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Paint, listener);
}, "$wt.events.PaintListener");
$_M (cla$$, "removeTraverseListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Traverse, listener);
}, "$wt.events.TraverseListener");
$_M (cla$$, "isActive", 
function () {
return true;
});
$_M (cla$$, "forceFocus", 
function () {
if (!this.isEnabled () || !this.isVisible () || !this.isActive ()) return false;
if (this.isFocusControl ()) return true;
if (this.isDisposed ()) return false;
return this.isFocusControl ();
});
$_M (cla$$, "isEnabled", 
function () {
return this.getEnabled () && this.parent.isEnabled ();
});
$_M (cla$$, "getEnabled", 
function () {
if (this.handle != null) {
if (this.handle.nodeName == "BUTTON" || this.handle.nodeName == "INPUT" || this.handle.nodeName == "SELECT") {
return !this.handle.disabled;
}}return true;
});
$_M (cla$$, "getAccessible", 
function () {
return null;
});
$_M (cla$$, "getBackground", 
function () {
if (this.handle != null) {
var bgColor = this.handle.style.backgroundColor;
if (bgColor != null && bgColor.length != 0) {
return  new $wt.graphics.Color (this.display, bgColor);
}}return  new $wt.graphics.Color (this.display, "transparent");
});
$_M (cla$$, "isFocusControl", 
function () {
return false;
});
$_M (cla$$, "setFocus", 
function () {
if ((this.style & $WT.NO_FOCUS) != 0) return false;
return this.forceFocus ();
});
$_M (cla$$, "getFont", 
function () {
return  new $wt.graphics.Font (this.display,  new $wt.graphics.FontData ("Arial", 10, $WT.NONE));
});
$_M (cla$$, "getForeground", 
function () {
var fgColor = this.handle.style.color;
System.out.println (fgColor);
return  new $wt.graphics.Color (null, fgColor);
});
$_M (cla$$, "computeSize", 
function (wHint, hHint) {
return this.computeSize (wHint, hHint, true);
}, "Number,Number");
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var width = $wt.widgets.Widget.DEFAULT_WIDTH;
var height = $wt.widgets.Widget.DEFAULT_HEIGHT;
if (wHint != $WT.DEFAULT) width = wHint;
if (hHint != $WT.DEFAULT) height = hHint;
var border = this.getBorderWidth ();
width += border * 2;
height += border * 2;
return  new $wt.graphics.Point (width, height);
}, "Number,Number,Boolean");
$_M (cla$$, "getBorderWidth", 
function () {
return 0;
});
$_M (cla$$, "getLayoutData", 
function () {
return this.layoutData;
});
$_M (cla$$, "setLayoutData", 
function (layoutData) {
this.layoutData = layoutData;
}, "Object");
$_M (cla$$, "getLocation", 
function () {
var x = 0;
var y = 0;
var left = this.handle.style.left;
if (left != null && left.length != 0) {
x = Integer.parseInt (left);
}var top = this.handle.style.top;
if (top != null && top.length != 0) {
y = Integer.parseInt (top);
}return  new $wt.graphics.Point (x, y);
});
$_M (cla$$, "getMenu", 
function () {
return null;
});
$_M (cla$$, "setMenu", 
function (menu) {
if (menu != null) {
if (menu.isDisposed ()) $WT.error ($WT.ERROR_INVALID_ARGUMENT);
if ((menu.style & $WT.POP_UP) == 0) {
this.error ($WT.ERROR_MENU_NOT_POP_UP);
}if (menu.parent != this.menuShell ()) {
this.error ($WT.ERROR_INVALID_PARENT);
}}this.menu = menu;
this.handle.oncontextmenu = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Control$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Control$1", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
this.callbacks["$wt.widgets.Control"].menu.handle.style.display = "";
this.toReturn (false);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Control$1, innerThis, finalVars);
}) (this, null));
}, "$wt.widgets.Menu");
$_M (cla$$, "menuShell", 
function () {
return this.parent.menuShell ();
});
$_M (cla$$, "getMonitor", 
function () {
var monitor =  new $wt.widgets.Monitor ();
monitor.handle = 220284;
monitor.clientWidth = monitor.width = document.body.clientWidth;
monitor.clientHeight = monitor.height = document.body.clientHeight;
monitor.clientX = monitor.x = 0;
monitor.clientY = monitor.y = 0;
return monitor;
});
$_M (cla$$, "getParent", 
function () {
return this.parent;
});
$_M (cla$$, "getBounds", 
function () {
var position = this.getLocation ();
var size = this.getSize ();
return  new $wt.graphics.Rectangle (position.x, position.y, size.x, size.y);
});
$_M (cla$$, "setBounds", 
function (x, y, width, height) {
this.handle.style.left = x + "px";
this.handle.style.top = y + "px";
if (width != 0) {
if ((this.style & $WT.BORDER) != 0) {
width = Math.max (0, width - 6);
}this.handle.style.width = width + "px";
}if (height != 0) {
if ((this.style & $WT.BORDER) != 0) {
height = Math.max (0, height - 6);
}this.handle.style.height = height + "px";
}}, "Number,Number,Number,Number");
$_M (cla$$, "setBounds", 
function (rect) {
if (rect == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.setBounds (rect.x, rect.y, rect.width, rect.height);
}, "$wt.graphics.Rectangle");
$_M (cla$$, "setFont", 
function (font) {
var hFont = 0;
if (font != null) {
if (font.isDisposed ()) $WT.error ($WT.ERROR_INVALID_ARGUMENT);
}var fontData = font.getFontData ()[0];
this.handle.style.fontFamily = fontData.getName ();
this.handle.style.fontSize = fontData.getHeight () + "pt";
if ((fontData.style & $WT.BOLD) != 0) {
try {
this.handle.style.fontStyle = "bold";
} catch (e) {
if ($_O (e, Error)) {
} else {
throw e;
}
}
this.handle.style.fontWeight = "bold";
} else if ((fontData.style & $WT.ITALIC) != 0) {
try {
this.handle.style.fontStyle = "italic";
} catch (e) {
if ($_O (e, Error)) {
} else {
throw e;
}
}
}}, "$wt.graphics.Font");
$_M (cla$$, "register", 
function () {
this.display.addControl (this.handle, this);
});
$_M (cla$$, "setSize", 
function (width, height) {
this.handle.style.width = width + "px";
this.handle.style.height = height + "px";
}, "Number,Number");
$_M (cla$$, "isVisible", 
function () {
return this.getVisible () && this.parent.isVisible ();
});
$_M (cla$$, "getVisible", 
function () {
if (this.handle != null && this.handle.style.display != "none") {
return true;
} else {
return false;
}});
$_M (cla$$, "setVisible", 
function (visible) {
if (visible) {
this.handle.style.display = "";
} else {
this.handle.style.display = "none";
}if (visible) {
this.sendEvent ($WT.Show);
var gc =  new $wt.graphics.GC (this);
var event =  new $wt.widgets.Event ();
event.type = $WT.Paint;
event.gc = gc;
event.x = Integer.parseInt (this.handle.style.left);
event.y = Integer.parseInt (this.handle.style.right);
event.width = Integer.parseInt (this.handle.style.width);
event.height = Integer.parseInt (this.handle.style.height);
this.display.postEvent (event);
if (this.isDisposed ()) return ;
}}, "Boolean");
$_M (cla$$, "pack", 
function () {
this.pack (true);
});
$_M (cla$$, "pack", 
function (changed) {
this.setSize (this.computeSize ($WT.DEFAULT, $WT.DEFAULT, changed));
}, "Boolean");
$_M (cla$$, "setSize", 
function (size) {
if (size == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.setSize (size.x, size.y);
}, "$wt.graphics.Point");
$_M (cla$$, "setLocation", 
function (x, y) {
this.setBounds (x, y, 0, 0);
}, "Number,Number");
$_M (cla$$, "setLocation", 
function (location) {
if (location == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.setLocation (location.x, location.y);
}, "$wt.graphics.Point");
$_M (cla$$, "markLayout", 
function (changed, all) {
}, "Boolean,Boolean");
$_M (cla$$, "updateLayout", 
function (resize, all) {
}, "Boolean,Boolean");
$_M (cla$$, "update", 
function () {
this.update (false);
});
$_M (cla$$, "update", 
function (all) {
}, "Boolean");
$_M (cla$$, "redraw", 
function () {
var event =  new $wt.widgets.Event ();
event.type = $WT.Paint;
event.display = this.display;
event.widget = this;
event.gc =  new $wt.graphics.GC (this);
this.sendEvent (event);
});
$_M (cla$$, "redraw", 
function (x, y, width, height, all) {
if (width <= 0 || height <= 0) return ;
System.out.println ("partial update");
var event =  new $wt.widgets.Event ();
event.type = $WT.Paint;
event.display = this.display;
event.widget = this;
event.gc =  new $wt.graphics.GC (this);
this.sendEvent (event);
}, "Number,Number,Number,Number,Boolean");
$_M (cla$$, "setBackground", 
function (color) {
if (color != null) {
this.handle.style.backgroundColor = color.getCSSHandle ();
}}, "$wt.graphics.Color");
$_M (cla$$, "setForeground", 
function (color) {
var pixel = -1;
if (color != null) {
this.handle.style.color = color.getCSSHandle ();
}this.redraw ();
}, "$wt.graphics.Color");
$_M (cla$$, "setToolTipText", 
function (string) {
var shell = this.getShell ();
shell.setToolTipText (this.handle, this.toolTipText = string);
}, "String");
$_M (cla$$, "getToolTipText", 
function () {
return this.toolTipText;
});
$_M (cla$$, "getShell", 
function () {
if ($_O (this, $wt.widgets.Shell)) {
return this;
}return this.parent.getShell ();
});
$_M (cla$$, "getSize", 
function () {
var w = 64;
var h = 64;
var width = this.handle.style.width;
if (width != null && width.length != 0) {
w = Integer.parseInt (width);
}var height = this.handle.style.height;
if (height != null && height.length != 0) {
h = Integer.parseInt (height);
}return  new $wt.graphics.Point (w, h);
});
$_M (cla$$, "setEnabled", 
function (enabled) {
if (this.handle != null) {
if (this.handle.nodeName == "BUTTON" || this.handle.nodeName == "INPUT" || this.handle.nodeName == "SELECT") {
this.handle.disabled = !enabled;
}}}, "Boolean");
$_M (cla$$, "setCursor", 
function (cursor) {
if (cursor != null && cursor.isDisposed ()) $WT.error ($WT.ERROR_INVALID_ARGUMENT);
this.cursor = cursor;
this.handle.style.cursor = cursor.getCSSHandle ();
}, "$wt.graphics.Cursor");
$_M (cla$$, "moveAbove", 
function (control) {
if (control != null) {
if (this.parent != control.parent) return ;
this.parent.handle.removeChild (this.handle);
this.parent.handle.insertBefore (this.handle, control.handle);
}}, "$wt.widgets.Control");
$_M (cla$$, "moveBelow", 
function (control) {
if (control != null) {
if (this.parent != control.parent) return ;
this.parent.handle.removeChild (this.handle);
if (control.handle.nextSibling != null) {
this.parent.handle.insertBefore (this.handle, control.handle.nextSibling);
} else {
this.parent.handle.appendChild (this.handle);
}}}, "$wt.widgets.Control");
$_M (cla$$, "releaseHandle", 
function () {
this.parent = null;
if (this.menu != null) {
this.menu.releaseHandle ();
this.menu = null;
}this.cursor = null;
this.layoutData = null;
$_U (this, $wt.widgets.Control, "releaseHandle", []);
});
cla$$ = $_C (function () {
this.horizontalBar = null;
this.verticalBar = null;
$_Z (this, arguments);
}, $wt.widgets, "Scrollable", $wt.widgets.Control);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Scrollable, [parent, style]);
}, "$wt.widgets.Composite,Number");
$_M (cla$$, "getClientArea", 
function () {
var w = $WT.DEFAULT;
var h = $WT.DEFAULT;
var width = this.handle.style.width;
if (width != null && width.length != 0) {
w = Integer.parseInt (width);
}var height = this.handle.style.height;
if (height != null && height.length != 0) {
h = Integer.parseInt (height);
}if (w < 0) {
w = 64;
}if (h < 0) {
h = 64;
}return  new $wt.graphics.Rectangle (0, 0, w, h);
});
$_M (cla$$, "computeTrim", 
function (x, y, width, height) {
return  new $wt.graphics.Rectangle (x, y, width, height);
}, "Number,Number,Number,Number");
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.handle = document.createElement ("DIV");
if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}if ((this.style & $WT.H_SCROLL) != 0) this.horizontalBar = this.createScrollBar ($WT.H_SCROLL);
if ((this.style & $WT.V_SCROLL) != 0) this.verticalBar = this.createScrollBar ($WT.V_SCROLL);
});
$_M (cla$$, "createScrollBar", 
function (type) {
var bar =  new $wt.widgets.ScrollBar (this, type);
if ((this.state & $wt.widgets.Widget.CANVAS) != 0) {
bar.setMaximum (100);
bar.setThumb (10);
}return bar;
}, "Number");
$_M (cla$$, "releaseHandle", 
function () {
if (this.horizontalBar != null) {
this.horizontalBar.releaseHandle ();
this.horizontalBar = null;
}if (this.verticalBar != null) {
this.verticalBar.releaseHandle ();
this.verticalBar = null;
}$_U (this, $wt.widgets.Scrollable, "releaseHandle", []);
});
cla$$ = $_C (function () {
this.$layout = null;
this.layoutCount = 0;
$_Z (this, arguments);
}, $wt.widgets, "Composite", $wt.widgets.Scrollable);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Composite, [parent, style]);
}, "$wt.widgets.Composite,Number");
$_M (cla$$, "_getChildren", 
function () {
var count = this.handle.childNodes.length;
var children =  new Array (0);
var index = 0;
for (var i = 0; i < count; i++) {
var control = this.display.getControl (this.handle.childNodes[i]);
if (control != null && control != this) {
children[index++] = control;
}}
return children;
});
$_M (cla$$, "getChildren", 
function () {
return this._getChildren ();
});
$_M (cla$$, "getChildrenCount", 
function () {
var count = 0;
return count;
});
$_M (cla$$, "setLayout", 
function (layout) {
this.$layout = layout;
}, "$wt.widgets.Layout");
$_M (cla$$, "getLayout", 
function () {
return this.$layout;
});
$_M (cla$$, "layout", 
function () {
this.layout (true);
});
$_M (cla$$, "layout", 
function (changed) {
if (this.$layout == null) return ;
this.layout (changed, true);
}, "Boolean");
$_M (cla$$, "layout", 
function (changed, all) {
if (this.$layout == null && !all) return ;
this.markLayout (changed, all);
this.updateLayout (true, all);
}, "Boolean,Boolean");
$_M (cla$$, "layout", 
function (changed) {
if (changed == null) this.error ($WT.ERROR_INVALID_ARGUMENT);
for (var i = 0; i < changed.length; i++) {
var control = changed[i];
if (control == null) this.error ($WT.ERROR_INVALID_ARGUMENT);
if (control.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
var ancestor = false;
var composite = control.parent;
while (composite != null) {
ancestor = composite == this;
if (ancestor) break;
composite = composite.parent;
}
if (!ancestor) this.error ($WT.ERROR_INVALID_PARENT);
}
var updateCount = 0;
var update =  new Array (16);
for (var i = 0; i < changed.length; i++) {
var child = changed[i];
var composite = child.parent;
while (child != this) {
if (composite.$layout != null) {
composite.state |= $wt.widgets.Widget.LAYOUT_NEEDED;
if (!composite.$layout.flushCache (child)) {
composite.state |= $wt.widgets.Widget.LAYOUT_CHANGED;
}}if (updateCount == update.length) {
var newUpdate =  new Array (update.length + 16);
System.arraycopy (update, 0, newUpdate, 0, update.length);
update = newUpdate;
}child = update[updateCount++] = composite;
composite = child.parent;
}
}
for (var i = updateCount - 1; i >= 0; i--) {
update[i].updateLayout (true, false);
}
}, "Array");
$_M (cla$$, "markLayout", 
function (changed, all) {
if (this.$layout != null) {
this.state |= $wt.widgets.Widget.LAYOUT_NEEDED;
if (changed) this.state |= $wt.widgets.Widget.LAYOUT_CHANGED;
}if (all) {
var children = this._getChildren ();
for (var i = 0; i < children.length; i++) {
children[i].markLayout (changed, all);
}
}}, "Boolean,Boolean");
$_M (cla$$, "updateLayout", 
function (resize, all) {
if (this.isLayoutDeferred ()) return ;
if ((this.state & $wt.widgets.Widget.LAYOUT_NEEDED) != 0) {
var changed = (this.state & $wt.widgets.Widget.LAYOUT_CHANGED) != 0;
this.state &= ~($wt.widgets.Widget.LAYOUT_NEEDED | $wt.widgets.Widget.LAYOUT_CHANGED);
if (resize) this.setResizeChildren (false);
this.$layout.layout (this, changed);
if (resize) this.setResizeChildren (true);
}if (all) {
var children = this._getChildren ();
for (var i = 0; i < children.length; i++) {
children[i].updateLayout (resize, all);
}
}}, "Boolean,Boolean");
$_M (cla$$, "isLayoutDeferred", 
function () {
return this.layoutCount > 0 || this.parent.isLayoutDeferred ();
});
$_M (cla$$, "setLayoutDeferred", 
function (defer) {
if (!defer) {
if (--this.layoutCount == 0) {
if (!this.isLayoutDeferred ()) this.updateLayout (true, true);
}} else {
this.layoutCount++;
}}, "Boolean");
$_M (cla$$, "getLayoutDeferred", 
function () {
return this.layoutCount > 0;
});
$_M (cla$$, "setResizeChildren", 
function (resize) {
}, "Boolean");
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.handle = document.createElement ("DIV");
this.handle.className = "composite-default";
if ((this.style & $WT.BORDER) != 0) {
this.handle.className += " composite-border";
}if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}});
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var size;
if (this.$layout != null) {
if (wHint == $WT.DEFAULT || hHint == $WT.DEFAULT) {
changed = new Boolean (changed | ((this.state & $wt.widgets.Widget.LAYOUT_CHANGED) != 0));
this.state &= ($t$ = ~ $wt.widgets.Widget.LAYOUT_CHANGED, $wt.widgets.Widget.prototype.LAYOUT_CHANGED = $wt.widgets.Widget.LAYOUT_CHANGED, $t$);
size = this.$layout.computeSize (this, wHint, hHint, changed);
} else {
size =  new $wt.graphics.Point (wHint, hHint);
}} else {
size = this.minimumSize (wHint, hHint, changed);
}if (size.x == 0) size.x = $wt.widgets.Widget.DEFAULT_WIDTH;
if (size.y == 0) size.y = $wt.widgets.Widget.DEFAULT_HEIGHT;
if (wHint != $WT.DEFAULT) size.x = wHint;
if (hHint != $WT.DEFAULT) size.y = hHint;
var trim = this.computeTrim (0, 0, size.x, size.y);
return  new $wt.graphics.Point (trim.width + 16, trim.height);
}, "Number,Number,Boolean");
$_M (cla$$, "minimumSize", 
function (wHint, hHint, changed) {
var children = this._getChildren ();
var width = 0;
var height = 0;
for (var i = 0; i < children.length; i++) {
var rect = children[i].getBounds ();
width = Math.max (width, rect.x + rect.width);
height = Math.max (height, rect.y + rect.height);
}
return  new $wt.graphics.Point (width, height);
}, "Number,Number,Boolean");
$_M (cla$$, "setSize", 
function (width, height) {
$_U (this, $wt.widgets.Composite, "setSize", [width, height]);
if (this.$layout != null) {
this.layout ();
}}, "Number,Number");
$_M (cla$$, "setBounds", 
function (x, y, width, height) {
$_U (this, $wt.widgets.Composite, "setBounds", [x, y, width, height]);
this.layout ();
}, "Number,Number,Number,Number");
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.widgets, "Canvas", $wt.widgets.Composite);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Canvas, [parent, style]);
}, "$wt.widgets.Composite,Number");
cla$$ = $_C (function () {
this.image = null;
this.smallImage = null;
this.largeImage = null;
this.images = null;
this.defaultButton = null;
this.saveDefault = null;
this.menuBar = null;
this.menus = null;
this.shellTitle = null;
this.frameHandle = null;
this.modalHandle = null;
this.oldBounds = null;
this.shellMin = null;
this.shellMax = null;
this.shellIcon = null;
$_Z (this, arguments);
}, $wt.widgets, "Decorations", $wt.widgets.Canvas);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Decorations, [parent, $wt.widgets.Decorations.checkStyle (style)]);
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
if ((style & $WT.NO_TRIM) != 0) {
style &= ~($WT.CLOSE | $WT.TITLE | $WT.MIN | $WT.MAX | $WT.RESIZE | $WT.BORDER);
}if ((style & ($WT.MENU | $WT.MIN | $WT.MAX | $WT.CLOSE)) != 0) {
style |= $WT.TITLE;
}if ((style & ($WT.MIN | $WT.MAX)) != 0) style |= $WT.CLOSE;
if ((style & $WT.CLOSE) != 0) style |= $WT.TITLE;
return style;
}, "Number");
$_M (cla$$, "createCSSDiv", 
($fz = function (css) {
var el = document.createElement ("DIV");
el.className = css;
this.frameHandle.appendChild (el);
return el;
}, $fz.isPrivate = true, $fz), "String");
$_M (cla$$, "createResizeHandles", 
($fz = function () {
var handles = ["shell-left-top", "shell-right-top", "shell-center-top", "shell-left-middle", "shell-right-middle", "shell-center-middle", "shell-left-bottom", "shell-right-bottom", "shell-center-bottom"];
for (var i = 0; i < handles.length; i++) {
this.createCSSDiv (handles[i]);
}
}, $fz.isPrivate = true, $fz));
$_V (cla$$, "createWidget", 
function () {
this.register ();
if ((this.style & $WT.APPLICATION_MODAL) != 0 || (this.style & $WT.PRIMARY_MODAL) != 0) {
this.display.timerExec (25, (function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Decorations$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Decorations$1", null, Runnable);
$_V (cla$$, "run", 
function () {
this.callbacks["$wt.widgets.Decorations"].addModalLayer ();
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Decorations$1, innerThis, finalVars);
}) (this, null));
}this.frameHandle = document.createElement ("DIV");
var fHandleStyle = this.frameHandle.style;
fHandleStyle.position = "absolute";
fHandleStyle.visibility = "hidden";
if (window.defaultWindowLeft == null) {
window.defaultWindowLeft = "32";
} else {
var num = Integer.parseInt ("" + window.defaultWindowLeft);
num += 32;
if (num > document.body.clientWidth) {
num = 32;
}window.defaultWindowLeft = "" + num;
}if (window.defaultWindowTop == null) {
window.defaultWindowTop = "32";
} else {
var num = Integer.parseInt ("" + window.defaultWindowTop);
num += 32;
if (num > document.body.clientHeight) {
num = 32;
}window.defaultWindowTop = "" + num;
}if (window.defaultWindowWidth == null) {
window.defaultWindowWidth = "640";
}if (window.defaultWindowHeight == null) {
window.defaultWindowHeight = "480";
}fHandleStyle.left = window.defaultWindowLeft + "px";
fHandleStyle.top = window.defaultWindowTop + "px";
fHandleStyle.width = 640 + "px";
fHandleStyle.height = 480 + "px";
fHandleStyle.backgroundColor = "menu";
if ((this.style & $WT.NO_TRIM) == 0) {
fHandleStyle.borderColor = "black";
fHandleStyle.borderWidth = "1px";
fHandleStyle.borderStyle = "solid";
} else {
fHandleStyle.borderStyle = "none";
}document.body.appendChild (this.frameHandle);
if ((this.style & $WT.NO_TRIM) == 0 && (this.style & $WT.RESIZE) != 0) {
this.createResizeHandles ();
}if ((this.style & $WT.NO_TRIM) == 0) {
var titleBar = document.createElement ("DIV");
titleBar.className = "shell-title-bar";
if ((this.style & $WT.BORDER) == 0 || (this.style & $WT.RESIZE) != 0) {
this.shellIcon = document.createElement ("DIV");
this.shellIcon.className = "shellicon";
titleBar.appendChild (this.shellIcon);
this.shellIcon.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Decorations$2")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Decorations$2", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
var shell =  new $wt.widgets.Shell (this.callbacks["$wt.widgets.Decorations"].display, $WT.SHELL_TRIM | $WT.APPLICATION_MODAL);
shell.setLayout ( new $wt.layout.FillLayout ());
shell.setText ("Export HTML Source");
shell.setSize (480, 280);
var composite =  new $wt.widgets.Composite (shell, $WT.NONE);
composite.setLayout ( new $wt.layout.GridLayout ());
var text =  new $wt.widgets.Text (composite, $WT.BORDER | $WT.MULTI | $WT.READ_ONLY);
text.setLayoutData ( new $wt.layout.GridData ($wt.layout.GridData.FILL_BOTH));
var size = shell.getSize ();
var html = "<div class=\"shell-content\" style=\"" + "width:" + size.x + "px;height:" + size.y + "px;\">" + this.callbacks["$wt.widgets.Decorations"].handle.innerHTML + "</div>";
text.setText (html);
 new $wt.widgets.Label (composite, $WT.HORIZONTAL | $WT.SEPARATOR).setLayoutData ( new $wt.layout.GridData ($wt.layout.GridData.FILL_HORIZONTAL));
var button =  new $wt.widgets.Button (composite, $WT.PUSH);
button.setText ("OK");
var gridData =  new $wt.layout.GridData ($wt.layout.GridData.HORIZONTAL_ALIGN_END);
gridData.widthHint = 80;
button.setLayoutData (gridData);
button.addSelectionListener ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Decorations$2$3")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Decorations$2$3", $wt.events.SelectionAdapter);
$_V (cla$$, "widgetSelected", 
function (e) {
this.$finals.shell.close ();
}, "$wt.events.SelectionEvent");
cla$$ = $_P ();
}
return $_N ($wt.widgets.Decorations$2$3, innerThis, finalVars);
}) (this, $_F ("shell", shell)));
shell.open ();
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Decorations$2, innerThis, finalVars);
}) (this, null));
}var shellButtons = document.createElement ("DIV");
shellButtons.className = "shellbuttons";
titleBar.appendChild (shellButtons);
if (this.minable ()) {
this.shellMin = document.createElement ("DIV");
this.shellMin.className = "shellmin";
if ((this.style & $WT.MAX) == 0) {
this.shellMin.className += " shell-min-zero";
}shellButtons.appendChild (this.shellMin);
this.shellMin.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Decorations$4")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Decorations$4", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
$wt.internal.ResizeSystem.unregister (this.callbacks["$wt.widgets.Decorations"]);
this.callbacks["$wt.widgets.Decorations"].setMinimized (true);
this.callbacks["$wt.widgets.Decorations"].shellMax.className = "shellnormal";
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Decorations$4, innerThis, finalVars);
}) (this, null));
}if ((this.style & $WT.MAX) != 0) {
this.shellMax = document.createElement ("DIV");
this.shellMax.className = "shellmax";
if (!this.minable ()) {
this.shellMax.className += " shell-max-zero";
}shellButtons.appendChild (this.shellMax);
this.shellMax.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Decorations$5")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Decorations$5", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
this.callbacks["$wt.widgets.Decorations"].toggleMaximize ();
this.callbacks["$wt.widgets.Decorations"].display.timerExec (25, (function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Decorations$5$6")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Decorations$5$6", null, Runnable);
$_V (cla$$, "run", 
function () {
this.callbacks["$wt.widgets.Decorations"].layout ();
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Decorations$5$6, innerThis, finalVars);
}) (this, null));
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Decorations$5, innerThis, finalVars);
}) (this, null));
}if ((this.style & $WT.CLOSE) != 0) {
var shellClose = document.createElement ("DIV");
shellClose.className = "shellclose";
if (!this.minable () && (this.style & $WT.MAX) == 0) {
shellClose.className += " shell-close-zero";
} else if (!this.minable () || (this.style & $WT.MAX) == 0) {
shellClose.className += " shell-close-one";
}shellButtons.appendChild (shellClose);
shellClose.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Decorations$7")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Decorations$7", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
if ($_O (this.callbacks["$wt.widgets.Decorations"], $wt.widgets.Shell)) {
var shell = this.callbacks["$wt.widgets.Decorations"];
shell.close ();
}});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Decorations$7, innerThis, finalVars);
}) (this, null));
}this.shellTitle = document.createElement ("DIV");
this.shellTitle.className = "shelltitle";
titleBar.appendChild (this.shellTitle);
if ((this.style & $WT.MAX) != 0) {
titleBar.ondblclick = this.shellMax.onclick;
}this.shellTitle.appendChild (document.createTextNode ("-"));
this.frameHandle.appendChild (titleBar);
titleBar.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Decorations$8")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Decorations$8", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
var fHandleStyle = this.callbacks["$wt.widgets.Decorations"].frameHandle.style;
if (fHandleStyle.zIndex != window.currentTopZIndex) {
fHandleStyle.zIndex = window.currentTopZIndex = "" + (Integer.parseInt (window.currentTopZIndex) + 2);
}});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Decorations$8, innerThis, finalVars);
}) (this, null));
if (window.currentTopZIndex == null) {
fHandleStyle.zIndex = window.currentTopZIndex = "1000";
} else {
fHandleStyle.zIndex = window.currentTopZIndex = "" + (Integer.parseInt (window.currentTopZIndex) + 2);
}}this.handle = this.createCSSDiv ("shell-content");
if ((this.style & $WT.NO_TRIM) != 0) {
this.handle.style.top = "0px";
} else {
$wt.internal.dnd.ShellFrameDND.fixShellHeight (this.frameHandle);
$wt.internal.dnd.ShellFrameDND.fixShellWidth (this.frameHandle);
var dnd =  new $wt.internal.dnd.DragAndDrop ();
dnd.addDragListener ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Decorations$9")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Decorations$9", $wt.internal.dnd.ShellFrameDND);
$_M (cla$$, "isDraggable", 
function (e) {
if ($_U (this, $wt.widgets.Decorations$9, "isDraggable", [e])) {
var cssName = e.target.className;
if (cssName.indexOf ("shelltitle") != -1 && this.callbacks["$wt.widgets.Decorations"].oldBounds != null) {
return false;
}return true;
} else {
return false;
}}, "$wt.internal.dnd.HTMLEventWrapper");
$_V (cla$$, "updateShellBounds", 
function (x, y, width, height) {
this.callbacks["$wt.widgets.Decorations"].display.timerExec (25, (function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Decorations$9$10")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Decorations$9$10", null, Runnable);
$_V (cla$$, "run", 
function () {
this.callbacks["$wt.widgets.Decorations"].layout ();
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Decorations$9$10, innerThis, finalVars);
}) (this, null));
return true;
}, "Number,Number,Number,Number");
cla$$ = $_P ();
}
return $_N ($wt.widgets.Decorations$9, innerThis, finalVars);
}) (this, null));
dnd.bind (this.frameHandle);
}});
$_M (cla$$, "addModalLayer", 
function () {
this.modalHandle = document.createElement ("DIV");
this.modalHandle.className = "shell-modal-block";
this.modalHandle.style.zIndex = "" + (Integer.parseInt ("" + this.frameHandle.style.zIndex) - 1);
document.body.insertBefore (this.modalHandle, this.frameHandle);
});
$_M (cla$$, "minable", 
($fz = function () {
return (this.style & $WT.MIN) != 0 && ((this.style & $WT.BORDER) == 0 || (this.style & $WT.RESIZE) != 0);
}, $fz.isPrivate = true, $fz));
$_M (cla$$, "setBounds", 
function (x, y, width, height) {
var fHandleStyle = this.frameHandle.style;
fHandleStyle.left = x + "px";
fHandleStyle.top = y + "px";
if (width != 0) {
fHandleStyle.width = (width + 8) + "px";
}if (height != 0) {
fHandleStyle.height = (height + 4) + "px";
}$wt.internal.dnd.ShellFrameDND.fixShellHeight (this.frameHandle);
$wt.internal.dnd.ShellFrameDND.fixShellWidth (this.frameHandle);
}, "Number,Number,Number,Number");
$_M (cla$$, "setSize", 
function (width, height) {
this.frameHandle.style.width = (width + 8) + "px";
this.frameHandle.style.height = (height + 4) + "px";
$wt.internal.dnd.ShellFrameDND.fixShellHeight (this.frameHandle);
$wt.internal.dnd.ShellFrameDND.fixShellWidth (this.frameHandle);
if (this.$layout != null) {
this.layout ();
}}, "Number,Number");
$_V (cla$$, "computeTrim", 
function (x, y, width, height) {
if ((this.style & $WT.NO_TRIM) != 0) {
return  new $wt.graphics.Rectangle (x, y, width, height + 4);
}return  new $wt.graphics.Rectangle (x, y, width, height + 26);
}, "Number,Number,Number,Number");
$_M (cla$$, "getSize", 
function () {
var size = $_U (this, $wt.widgets.Decorations, "getSize", []);
size.y += 26;
return size;
});
$_V (cla$$, "getLocation", 
function () {
var x = 0;
var y = 0;
var left = this.frameHandle.style.left;
if (left != null && left.length != 0) {
x = Integer.parseInt (left);
}var top = this.frameHandle.style.top;
if (top != null && top.length != 0) {
y = Integer.parseInt (top);
}return  new $wt.graphics.Point (x, y);
});
$_M (cla$$, "setText", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.shellTitle != null && this.shellTitle.childNodes != null) {
for (var i = this.shellTitle.childNodes.length - 1; i >= 0; i--) {
if (this.shellTitle.childNodes[i] != null) {
this.shellTitle.removeChild (this.shellTitle.childNodes[i]);
}}
this.shellTitle.appendChild (document.createTextNode (string));
}}, "String");
$_M (cla$$, "bringToTop", 
function () {
this.frameHandle.style.visibility = "visible";
if (window.currentTopZIndex == null) {
this.frameHandle.style.zIndex = window.currentTopZIndex = "1000";
} else {
this.frameHandle.style.zIndex = window.currentTopZIndex = "" + (Integer.parseInt (window.currentTopZIndex) + 2);
}});
$_M (cla$$, "setMinimized", 
function (minimized) {
if (minimized && this.handle != null) {
if (this.oldBounds == null) {
this.oldBounds = this.getBounds ();
this.oldBounds.width -= 2;
}var width = this.oldBounds.width;
if (width < 200) {
width = 200;
}this.setBounds (-1, document.body.clientHeight - 26, width, 0);
}if (minimized) {
$wt.internal.ResizeSystem.register (this, $WT.MIN);
} else {
$wt.internal.ResizeSystem.unregister (this);
}}, "Boolean");
$_M (cla$$, "setMaximized", 
function (maximized) {
if (maximized && this.handle != null) {
if (this.oldBounds == null) {
this.oldBounds = this.getBounds ();
this.oldBounds.width -= 2;
}var height = document.body.clientHeight - 0;
if (height > window.screen.availHeight - 10) {
height = window.screen.availHeight - 10;
}var width = document.body.clientWidth;
if (width > window.screen.availWidth) {
width = window.screen.availWidth;
}this.setBounds (0 - 4, 0 - 4, width - 2, height + 4);
document.body.scrollTop = 0;
}if (maximized) {
$wt.internal.ResizeSystem.register (this, $WT.MAX);
} else {
$wt.internal.ResizeSystem.unregister (this);
}}, "Boolean");
$_M (cla$$, "addMenu", 
function (menu) {
if (this.menus == null) this.menus =  new Array (4);
for (var i = 0; i < this.menus.length; i++) {
if (this.menus[i] == null) {
this.menus[i] = menu;
return ;
}}
var newMenus =  new Array (this.menus.length + 4);
newMenus[this.menus.length] = menu;
System.arraycopy (this.menus, 0, newMenus, 0, this.menus.length);
this.menus = newMenus;
}, "$wt.widgets.Menu");
$_V (cla$$, "menuShell", 
function () {
return this;
});
$_M (cla$$, "setDefaultButton", 
function (button) {
this.setDefaultButton (button, true);
}, "$wt.widgets.Button");
$_M (cla$$, "setDefaultButton", 
function (button, save) {
if (button == null) {
if (this.defaultButton == this.saveDefault) {
if (save) this.saveDefault = null;
return ;
}} else {
if (button.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
if ((button.style & $WT.PUSH) == 0) return ;
if (button == this.defaultButton) return ;
}if (this.defaultButton != null) {
if (!this.defaultButton.isDisposed ()) this.defaultButton.setDefault (false);
}if ((this.defaultButton = button) == null) this.defaultButton = this.saveDefault;
if (this.defaultButton != null) {
if (!this.defaultButton.isDisposed ()) this.defaultButton.setDefault (true);
}if (save) this.saveDefault = this.defaultButton;
if (this.saveDefault != null && this.saveDefault.isDisposed ()) this.saveDefault = null;
}, "$wt.widgets.Button,Boolean");
$_M (cla$$, "getDefaultButton", 
function () {
return this.defaultButton;
});
$_M (cla$$, "setMenuBar", 
function (mb) {
if (this.menuBar == this.menu) return ;
if (this.menu != null) {
if (this.menu.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
if ((this.menu.style & $WT.BAR) == 0) this.error ($WT.ERROR_MENU_NOT_BAR);
if (this.menu.parent != this) this.error ($WT.ERROR_INVALID_PARENT);
}if (this.menu != null) this.display.removeBar (this.menu);
this.menuBar = this.menu;
}, "$wt.widgets.Menu");
$_M (cla$$, "getMenuBar", 
function () {
return this.menuBar;
});
$_M (cla$$, "releaseHandle", 
function () {
System.out.println ("Decorations#release!");
if (this.menus != null) {
$wt.widgets.Display.releaseWidgetArray (this.menus);
this.menus = null;
}if (this.menuBar != null) {
this.menuBar.releaseHandle ();
this.menuBar = null;
}this.defaultButton = null;
this.saveDefault = null;
this.shellMax = null;
this.shellMin = null;
this.shellTitle = null;
$_U (this, $wt.widgets.Decorations, "releaseHandle", []);
});
$_M (cla$$, "getImage", 
function () {
return this.image;
});
$_M (cla$$, "setImage", 
function (image) {
if (image != null && image.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
this.image = image;
if (this.shellIcon != null && this.image.handle == null) {
var iconStyle = this.shellIcon.style;
if (image.url.toLowerCase ().endsWith (".png") && this.handle.style.filter != null) {
iconStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
} else {
iconStyle.backgroundRepeat = "no-repeat";
iconStyle.backgroundPosition = "center center";
iconStyle.backgroundImage = "url(\"" + this.image.url + "\")";
}}}, "$wt.graphics.Image");
$_M (cla$$, "setImages", 
function (images) {
if (images == null) this.error ($WT.ERROR_INVALID_ARGUMENT);
for (var i = 0; i < images.length; i++) {
if (images[i] == null || images[i].isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
}
this.images = images;
this.setImage (images[0]);
}, "Array");
$_M (cla$$, "toggleMaximize", 
function () {
if (this.oldBounds != null) {
this.setBounds (this.oldBounds);
this.shellMax.className = "shellmax";
this.oldBounds = null;
$wt.internal.ResizeSystem.unregister (this);
} else {
this.setMaximized (true);
this.shellMax.className = "shellnormal";
}if ((this.style & $WT.MIN) == 0) {
this.shellMax.className += " shell-max-zero";
}});
cla$$ = $_C (function () {
this.minWidth = $WT.DEFAULT;
this.minHeight = $WT.DEFAULT;
$_Z (this, arguments);
}, $wt.widgets, "Shell", $wt.widgets.Decorations);
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
style = $wt.widgets.Decorations.checkStyle (style);
var mask = $WT.SYSTEM_MODAL | $WT.APPLICATION_MODAL | $WT.PRIMARY_MODAL;
var bits = style & ~mask;
if ((style & $WT.SYSTEM_MODAL) != 0) return bits | $WT.SYSTEM_MODAL;
if ((style & $WT.APPLICATION_MODAL) != 0) return bits | $WT.APPLICATION_MODAL;
if ((style & $WT.PRIMARY_MODAL) != 0) return bits | $WT.PRIMARY_MODAL;
return bits;
}, "Number");
$_K (cla$$, 
function () {
this.construct (null);
});
$_K (cla$$, 
function (style) {
this.construct (null, style);
}, "Number");
$_K (cla$$, 
function (display) {
this.construct (display, $WT.SHELL_TRIM);
}, "$wt.widgets.Display");
$_K (cla$$, 
function (display, style) {
this.construct (display, null, style, 0);
}, "$wt.widgets.Display,Number");
$_K (cla$$, 
function (display, parent, style, handle) {
if (display == null) display = $wt.widgets.Display.getCurrent ();
if (display == null) display = $wt.widgets.Display.getDefault ();
if (parent != null && parent.isDisposed ()) {
this.error ($WT.ERROR_INVALID_ARGUMENT);
}this.style = $wt.widgets.Shell.checkStyle (style);
this.parent = parent;
this.display = display;
this.createWidget ();
}, "$wt.widgets.Display,$wt.widgets.Shell,Number,Number");
$_K (cla$$, 
function (parent) {
this.construct (parent, $WT.DIALOG_TRIM);
}, "$wt.widgets.Shell");
$_K (cla$$, 
function (parent, style) {
this.construct (parent != null ? parent.display : null, parent, style, 0);
}, "$wt.widgets.Shell,Number");
$_M (cla$$, "addShellListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Close, typedListener);
this.addListener ($WT.Iconify, typedListener);
this.addListener ($WT.Deiconify, typedListener);
this.addListener ($WT.Activate, typedListener);
this.addListener ($WT.Deactivate, typedListener);
}, "$wt.events.ShellListener");
$_M (cla$$, "removeShellListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Close, listener);
this.eventTable.unhook ($WT.Iconify, listener);
this.eventTable.unhook ($WT.Deiconify, listener);
this.eventTable.unhook ($WT.Activate, listener);
this.eventTable.unhook ($WT.Deactivate, listener);
}, "$wt.events.ShellListener");
$_M (cla$$, "open", 
function () {
this.bringToTop ();
if (this.isDisposed ()) return ;
this.setVisible (true);
if (this.isDisposed ()) return ;
this.layout ();
});
$_V (cla$$, "isVisible", 
function () {
return this.getVisible ();
});
$_M (cla$$, "close", 
function () {
this.closeWidget ();
});
$_M (cla$$, "closeWidget", 
function () {
var event =  new $wt.widgets.Event ();
this.sendEvent ($WT.Close, event);
if (event.doit && !this.isDisposed ()) this.dispose ();
});
$_M (cla$$, "dispose", 
function () {
this.frameHandle.removeChild (this.shellTitle.parentNode);
this.frameHandle.removeChild (this.handle);
document.body.removeChild (this.frameHandle);
if (this.modalHandle != null) {
document.body.removeChild (this.modalHandle);
this.modalHandle = null;
}$_U (this, $wt.widgets.Shell, "dispose", []);
});
$_V (cla$$, "isLayoutDeferred", 
function () {
return this.layoutCount > 0;
});
$_M (cla$$, "getSize", 
function () {
var size = $_U (this, $wt.widgets.Shell, "getSize", []);
return  new $wt.graphics.Point (size.x, size.y);
});
$_M (cla$$, "getShells", 
function () {
var count = 0;
var shells = this.display.getShells ();
for (var i = 0; i < shells.length; i++) {
var shell = shells[i];
do {
shell = shell.parent;
} while (shell != null && shell != this);
if (shell == this) count++;
}
var index = 0;
var result =  new Array (count);
for (var i = 0; i < shells.length; i++) {
var shell = shells[i];
do {
shell = shell.parent;
} while (shell != null && shell != this);
if (shell == this) {
result[index++] = shells[i];
}}
return result;
});
$_V (cla$$, "isEnabled", 
function () {
return this.getEnabled ();
});
$_M (cla$$, "getMinimumSize", 
function () {
var width = Math.max (0, this.minWidth);
var trim = $WT.TITLE | $WT.CLOSE | $WT.MIN | $WT.MAX;
if ((this.style & $WT.NO_TRIM) == 0 && (this.style & trim) != 0) {
width = Math.max (width, 80);
}var height = Math.max (0, this.minHeight);
if ((this.style & $WT.NO_TRIM) == 0 && (this.style & trim) != 0) {
if ((this.style & $WT.RESIZE) != 0) {
height = Math.max (height, 24);
} else {
height = Math.max (height, 24);
}}if ((this.style & $WT.NO_TRIM) != 0) {
return  new $wt.graphics.Point (this.minWidth, Math.max (this.minHeight - 24, 0));
}return  new $wt.graphics.Point (width, height);
});
$_M (cla$$, "setToolTipText", 
function (hwnd, text) {
}, "Object,String");
$_M (cla$$, "setSize", 
function (width, height) {
if (width < 150) {
width = 150;
}if (height < 48) {
height = 48;
}$_U (this, $wt.widgets.Shell, "setSize", [width, height]);
}, "Number,Number");
$_M (cla$$, "updateModal", 
function () {
});
cla$$ = $_C (function () {
this.text = null;
this.image = null;
$_Z (this, arguments);
}, $wt.widgets, "Item", $wt.widgets.Widget);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Item, [parent, style]);
this.text = "";
}, "$wt.widgets.Widget,Number");
$_K (cla$$, 
function (parent, style, index) {
this.construct (parent, style);
}, "$wt.widgets.Widget,Number,Number");
$_V (cla$$, "checkSubclass", 
function () {
});
$_M (cla$$, "getImage", 
function () {
return this.image;
});
$_V (cla$$, "getNameText", 
function () {
return this.getText ();
});
$_M (cla$$, "getText", 
function () {
return this.text;
});
$_M (cla$$, "releaseWidget", 
function () {
$_U (this, $wt.widgets.Item, "releaseWidget", []);
this.text = null;
this.image = null;
});
$_M (cla$$, "setImage", 
function (image) {
if (image != null && image.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
this.image = image;
}, "$wt.graphics.Image");
$_M (cla$$, "setText", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.text = string;
}, "String");
$_M (cla$$, "releaseHandle", 
function () {
if (this.image != null) {
this.image = null;
}$_U (this, $wt.widgets.Item, "releaseHandle", []);
});
cla$$ = $_C (function () {
this.parent = null;
this.menu = null;
this.id = 0;
this.accelerator = 0;
$_Z (this, arguments);
}, $wt.widgets, "MenuItem", $wt.widgets.Item);
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
return $wt.widgets.Widget.checkBits (style, $WT.PUSH, $WT.CHECK, $WT.RADIO, $WT.SEPARATOR, $WT.CASCADE, 0);
}, "Number");
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.MenuItem, [parent, $wt.widgets.MenuItem.checkStyle (style)]);
this.parent = parent;
this.createWidget ();
parent.createItem (this, parent.getItemCount ());
}, "$wt.widgets.Menu,Number");
$_K (cla$$, 
function (parent, style, index) {
$_R (this, $wt.widgets.MenuItem, [parent, $wt.widgets.MenuItem.checkStyle (style)]);
this.parent = parent;
this.createWidget ();
parent.createItem (this, index);
}, "$wt.widgets.Menu,Number,Number");
$_K (cla$$, 
function (parent, menu, style, index) {
$_R (this, $wt.widgets.MenuItem, [parent, $wt.widgets.MenuItem.checkStyle (style)]);
this.parent = parent;
this.menu = menu;
if (menu != null) menu.cascade = this;
this.createWidget ();
this.display.addMenuItem (this);
}, "$wt.widgets.Menu,$wt.widgets.Menu,Number,Number");
$_M (cla$$, "createWidget", 
function () {
this.handle = document.createElement ("DIV");
this.handle.style.width = "150px";
this.handle.style.borderStyle = "solid";
this.handle.style.borderColor = "black";
this.handle.style.borderWidth = "1px";
this.handle.appendChild (document.createTextNode (this.text));
if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
System.out.println ("parent!");
}});
$_M (cla$$, "setText", 
function (string) {
$_U (this, $wt.widgets.MenuItem, "setText", [string]);
if (this.handle != null) {
this.handle.appendChild (document.createTextNode (this.text));
}}, "String");
$_M (cla$$, "setMenu", 
function (menu) {
if ((this.style & $WT.CASCADE) == 0) {
this.error ($WT.ERROR_MENUITEM_NOT_CASCADE);
}if (menu != null) {
if (menu.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
if ((menu.style & $WT.DROP_DOWN) == 0) {
this.error ($WT.ERROR_MENU_NOT_DROP_DOWN);
}if (menu.parent != this.parent.parent) {
this.error ($WT.ERROR_INVALID_PARENT);
}}var oldMenu = this.menu;
if (oldMenu == menu) return ;
if (oldMenu != null) oldMenu.cascade = null;
this.menu = menu;
if (menu != null) {
menu.cascade = this;
}}, "$wt.widgets.Menu");
$_M (cla$$, "setAccelerator", 
function (accelerator) {
if (this.accelerator == accelerator) return ;
this.accelerator = accelerator;
}, "Number");
$_M (cla$$, "releaseHandle", 
function () {
this.menu = null;
this.parent = null;
$_U (this, $wt.widgets.MenuItem, "releaseHandle", []);
});
cla$$ = $_C (function () {
this.cascade = null;
this.parent = null;
$_Z (this, arguments);
}, $wt.widgets, "Menu", $wt.widgets.Widget);
$_K (cla$$, 
function (parent) {
this.construct ($wt.widgets.Menu.checkNull (parent).menuShell (), $WT.POP_UP);
}, "$wt.widgets.Control");
$_K (cla$$, 
function (parent, style) {
this.construct (parent, $wt.widgets.Menu.checkStyle (style), 0);
}, "$wt.widgets.Decorations,Number");
$_K (cla$$, 
function (parentMenu) {
this.construct ($wt.widgets.Menu.checkNull (parentMenu).parent, $WT.DROP_DOWN);
}, "$wt.widgets.Menu");
$_K (cla$$, 
function (parentItem) {
this.construct ($wt.widgets.Menu.checkNull (parentItem).parent);
}, "$wt.widgets.MenuItem");
$_K (cla$$, 
function (parent, style, handle) {
$_R (this, $wt.widgets.Menu, [parent, $wt.widgets.Menu.checkStyle (style)]);
this.parent = parent;
this.createWidget ();
}, "$wt.widgets.Decorations,Number,Number");
$_M (cla$$, "createWidget", 
function () {
this.handle = document.createElement ("DIV");
this.handle.style.position = "absolute";
this.handle.style.left = "0px";
this.handle.style.top = "0px";
this.handle.style.width = "150px";
this.handle.style.borderStyle = "solid";
this.handle.style.borderColor = "black";
this.handle.style.borderWidth = "1px";
this.handle.style.display = "none";
this.handle.style.backgroundColor = "menu";
this.parent.addMenu (this);
document.body.appendChild (this.handle);
});
$_M (cla$$, "getItemCount", 
function () {
if (this.handle != null) {
return this.handle.childNodes.length;
}return 0;
});
$_M (cla$$, "createItem", 
function (item, index) {
var count = this.getItemCount ();
if (!(0 <= index && index <= count)) this.error ($WT.ERROR_INVALID_RANGE);
this.display.addMenuItem (item);
var success = false;
item.createWidget ();
this.handle.appendChild (item.handle);
success = true;
if (!success) {
this.display.removeMenuItem (item);
this.error ($WT.ERROR_ITEM_NOT_ADDED);
}}, "$wt.widgets.MenuItem,Number");
cla$$.checkNull = $_M (cla$$, "checkNull", 
function (control) {
if (control == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
return control;
}, "$wt.widgets.Control");
cla$$.checkNull = $_M (cla$$, "checkNull", 
function (menu) {
if (menu == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
return menu;
}, "$wt.widgets.Menu");
cla$$.checkNull = $_M (cla$$, "checkNull", 
function (item) {
if (item == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
return item;
}, "$wt.widgets.MenuItem");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
return $wt.widgets.Widget.checkBits (style, $WT.POP_UP, $WT.BAR, $WT.DROP_DOWN, 0, 0, 0);
}, "Number");
$_M (cla$$, "getItems", 
function () {
return null;
});
$_M (cla$$, "update", 
function () {
});
$_M (cla$$, "_setVisible", 
function (visible) {
if ((this.style & ($WT.BAR | $WT.DROP_DOWN)) != 0) return ;
}, "Boolean");
cla$$ = $_C (function () {
this.handle = 0;
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
this.clientX = 0;
this.clientY = 0;
this.clientWidth = 0;
this.clientHeight = 0;
$_Z (this, arguments);
}, $wt.widgets, "Monitor");
$_K (cla$$, 
function () {
});
$_V (cla$$, "equals", 
function (object) {
if (object == this) return true;
if (!($_O (object, $wt.widgets.Monitor))) return false;
var monitor = object;
return this.handle == monitor.handle;
}, "Object");
$_M (cla$$, "getBounds", 
function () {
return  new $wt.graphics.Rectangle (this.x, this.y, this.width, this.height);
});
$_M (cla$$, "getClientArea", 
function () {
return  new $wt.graphics.Rectangle (this.clientX, this.clientY, this.clientWidth, this.clientHeight);
});
$_V (cla$$, "hashCode", 
function () {
return this.handle;
});
cla$$ = $_C (function () {
this.parent = null;
this.increment = 0;
this.pageIncrement = 0;
$_Z (this, arguments);
}, $wt.widgets, "ScrollBar", $wt.widgets.Widget);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.ScrollBar, [parent, $wt.widgets.ScrollBar.checkStyle (style)]);
this.parent = parent;
this.createWidget ();
}, "$wt.widgets.Scrollable,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
return $wt.widgets.Widget.checkBits (style, $WT.HORIZONTAL, $WT.VERTICAL, 0, 0, 0, 0);
}, "Number");
$_M (cla$$, "createWidget", 
function () {
this.increment = 1;
this.pageIncrement = 10;
});
$_M (cla$$, "setMaximum", 
function (value) {
if (value < 0) return ;
}, "Number");
$_M (cla$$, "setThumb", 
function (value) {
}, "Number");
$_M (cla$$, "releaseHandle", 
function () {
this.parent = null;
$_U (this, $wt.widgets.ScrollBar, "releaseHandle", []);
});
cla$$ = $_C (function () {
this.eventQueue = null;
this.eventTable = null;
this.filterTable = null;
this.freeSlot = 0;
this.indexTable = null;
this.controlTable = null;
this.focusEvent = 0;
this.focusControl = null;
this.bars = null;
this.popups = null;
this.items = null;
this.thread = null;
this.disposeList = null;
this.tray = null;
this.nextTrayId = 0;
this.timerIds = null;
this.timerList = null;
this.nextTimerId = 0;
this.lastKey = 0;
this.lastAscii = 0;
this.lastMouse = 0;
this.lastVirtual = false;
this.lastNull = false;
this.lastDead = false;
this.keyboard =  $_A (256, 0);
this.accelKeyHit = false;
this.mnemonicKeyHit = false;
this.lockActiveWindow = false;
this.captureChanged = false;
this.ignoreRestoreFocus = false;
this.lastHittestControl = null;
this.lastHittest = 0;
this.cursors =  new Array ($WT.CURSOR_HAND + 1);
this.imageList = null;
this.toolImageList = null;
this.toolHotImageList = null;
this.toolDisabledImageList = null;
this.lpCustColors = 0;
this.data = null;
this.keys = null;
this.values = null;
this.modalShells = null;
this.modalDialogShell = null;
this.hitCount = 0;
$_Z (this, arguments);
}, $wt.widgets, "Display", $wt.graphics.Device);
$_K (cla$$, 
function () {
this.construct (null);
});
$_K (cla$$, 
function (data) {
$_R (this, $wt.widgets.Display, [data]);
}, "$wt.graphics.DeviceData");
$_M (cla$$, "addBar", 
function (menu) {
if (this.bars == null) this.bars =  new Array (4);
var length = this.bars.length;
for (var i = 0; i < length; i++) {
if (this.bars[i] == menu) return ;
}
var index = 0;
while (index < length) {
if (this.bars[index] == null) break;
index++;
}
if (index == length) {
var newBars =  new Array (length + 4);
System.arraycopy (this.bars, 0, newBars, 0, length);
this.bars = newBars;
}this.bars[index] = menu;
}, "$wt.widgets.Menu");
$_M (cla$$, "addControl", 
function (handle, control) {
if (control == null) return ;
this.controlTable[this.controlTable.length] = control;
}, "Object,$wt.widgets.Control");
$_M (cla$$, "addFilter", 
function (eventType, listener) {
this.checkDevice ();
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.filterTable == null) this.filterTable =  new $wt.widgets.EventTable ();
this.filterTable.hook (eventType, listener);
}, "Number,$wt.widgets.Listener");
$_M (cla$$, "addListener", 
function (eventType, listener) {
this.checkDevice ();
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) this.eventTable =  new $wt.widgets.EventTable ();
this.eventTable.hook (eventType, listener);
}, "Number,$wt.widgets.Listener");
$_M (cla$$, "addMenuItem", 
function (item) {
if (this.items == null) this.items =  new Array (64);
for (var i = 0; i < this.items.length; i++) {
if (this.items[i] == null) {
item.id = i + $wt.widgets.Display.ID_START;
this.items[i] = item;
return ;
}}
item.id = this.items.length + $wt.widgets.Display.ID_START;
var newItems =  new Array (this.items.length + 64);
newItems[this.items.length] = item;
System.arraycopy (this.items, 0, newItems, 0, this.items.length);
this.items = newItems;
}, "$wt.widgets.MenuItem");
$_M (cla$$, "addPopup", 
function (menu) {
if (this.popups == null) this.popups =  new Array (4);
var length = this.popups.length;
for (var i = 0; i < length; i++) {
if (this.popups[i] == menu) return ;
}
var index = 0;
while (index < length) {
if (this.popups[index] == null) break;
index++;
}
if (index == length) {
var newPopups =  new Array (length + 4);
System.arraycopy (this.popups, 0, newPopups, 0, length);
this.popups = newPopups;
}this.popups[index] = menu;
}, "$wt.widgets.Menu");
$_M (cla$$, "asciiKey", 
function (key) {
return 0;
}, "Number");
$_M (cla$$, "asyncExec", 
function (runnable) {
if (this.isDisposed ()) this.error ($WT.ERROR_DEVICE_DISPOSED);
window.setTimeout (Clazz.makeFunction (runnable), 10);
}, "Runnable");
$_M (cla$$, "beep", 
function () {
this.checkDevice ();
});
$_M (cla$$, "checkSubclass", 
function () {
if (!$wt.widgets.Display.isValidClass (this.getClass ())) this.error ($WT.ERROR_INVALID_SUBCLASS);
});
$_V (cla$$, "checkDevice", 
function () {
if (this.thread == null) this.error ($WT.ERROR_WIDGET_DISPOSED);
if (this.thread != Thread.currentThread ()) this.error ($WT.ERROR_THREAD_INVALID_ACCESS);
if (this.isDisposed ()) this.error ($WT.ERROR_DEVICE_DISPOSED);
});
cla$$.checkDisplay = $_M (cla$$, "checkDisplay", 
function (thread, multiple) {
for (var i = 0; i < $wt.widgets.Display.Displays.length; i++) {
if ($wt.widgets.Display.Displays[i] != null) {
if (!multiple) $WT.error ($WT.ERROR_NOT_IMPLEMENTED, null, " [multiple displays]");
if ($wt.widgets.Display.Displays[i].thread == thread) $WT.error ($WT.ERROR_THREAD_INVALID_ACCESS);
}}
}, "Thread,Boolean");
$_M (cla$$, "clearModal", 
function (shell) {
if (this.modalShells == null) return ;
var index = 0;
var length = this.modalShells.length;
while (index < length) {
if (this.modalShells[index] == shell) break;
if (this.modalShells[index] == null) return ;
index++;
}
if (index == length) return ;
System.arraycopy (this.modalShells, index + 1, this.modalShells, index, --length - index);
this.modalShells[length] = null;
if (index == 0 && this.modalShells[0] == null) this.modalShells = null;
var shells = this.getShells ();
for (var i = 0; i < shells.length; i++) shells[i].updateModal ();

}, "$wt.widgets.Shell");
$_M (cla$$, "close", 
function () {
this.checkDevice ();
var event =  new $wt.widgets.Event ();
this.sendEvent ($WT.Close, event);
if (event.doit) this.dispose ();
});
$_V (cla$$, "create", 
function (data) {
this.checkSubclass ();
$wt.widgets.Display.checkDisplay (this.thread = Thread.currentThread (), true);
this.createDisplay (data);
$wt.widgets.Display.register (this);
if ($wt.widgets.Display.Default == null) ($t$ = $wt.widgets.Display.Default = this, $wt.widgets.Display.prototype.Default = $wt.widgets.Display.Default, $t$);
}, "$wt.graphics.DeviceData");
$_M (cla$$, "createDisplay", 
function (data) {
}, "$wt.graphics.DeviceData");
cla$$.deregister = $_M (cla$$, "deregister", 
function (display) {
for (var i = 0; i < $wt.widgets.Display.Displays.length; i++) {
if (display == $wt.widgets.Display.Displays[i]) $wt.widgets.Display.Displays[i] = null;
}
}, "$wt.widgets.Display");
$_V (cla$$, "destroy", 
function () {
if (this == $wt.widgets.Display.Default) ($t$ = $wt.widgets.Display.Default = null, $wt.widgets.Display.prototype.Default = $wt.widgets.Display.Default, $t$);
$wt.widgets.Display.deregister (this);
this.destroyDisplay ();
});
$_M (cla$$, "destroyDisplay", 
function () {
});
$_M (cla$$, "disposeExec", 
function (runnable) {
this.checkDevice ();
if (this.disposeList == null) this.disposeList =  new Array (4);
for (var i = 0; i < this.disposeList.length; i++) {
if (this.disposeList[i] == null) {
this.disposeList[i] = runnable;
return ;
}}
var newDisposeList =  new Array (this.disposeList.length + 4);
System.arraycopy (this.disposeList, 0, newDisposeList, 0, this.disposeList.length);
newDisposeList[this.disposeList.length] = runnable;
this.disposeList = newDisposeList;
}, "Runnable");
$_M (cla$$, "drawMenuBars", 
function () {
if (this.bars == null) return ;
for (var i = 0; i < this.bars.length; i++) {
var menu = this.bars[i];
if (menu != null && !menu.isDisposed ()) menu.update ();
}
this.bars = null;
});
$_M (cla$$, "error", 
function (code) {
$WT.error (code);
}, "Number");
$_M (cla$$, "filterEvent", 
function (event) {
if (this.filterTable != null) this.filterTable.sendEvent (event);
return false;
}, "$wt.widgets.Event");
$_M (cla$$, "filters", 
function (eventType) {
if (this.filterTable == null) return false;
return this.filterTable.hooks (eventType);
}, "Number");
$_M (cla$$, "findControl", 
function (handle) {
if (handle == 0) return null;
return null;
}, "Number");
$_M (cla$$, "findWidget", 
function (handle) {
this.checkDevice ();
return null;
}, "Number");
$_M (cla$$, "findWidget", 
function (handle, id) {
return null;
}, "Number,Number");
cla$$.findDisplay = $_M (cla$$, "findDisplay", 
function (thread) {
for (var i = 0; i < $wt.widgets.Display.Displays.length; i++) {
var display = $wt.widgets.Display.Displays[i];
if (display != null && display.thread == thread) {
return display;
}}
return null;
}, "Thread");
$_M (cla$$, "getActiveShell", 
function () {
this.checkDevice ();
return null;
});
$_M (cla$$, "getBounds", 
function () {
return $_U (this, $wt.widgets.Display, "getBounds", []);
});
cla$$.getCurrent = $_M (cla$$, "getCurrent", 
function () {
return $wt.widgets.Display.findDisplay (Thread.currentThread ());
});
$_M (cla$$, "getClientArea", 
function () {
return $_U (this, $wt.widgets.Display, "getClientArea", []);
});
$_M (cla$$, "getControl", 
function (handle) {
if (handle == null) return null;
for (var i = 0; i < this.controlTable.length; i++) {
if (this.controlTable[i] != null && handle == this.controlTable[i].handle) {
return this.controlTable[i];
}}
return null;
}, "Object");
$_M (cla$$, "getCursorControl", 
function () {
this.checkDevice ();
return null;
});
$_M (cla$$, "getCursorLocation", 
function () {
this.checkDevice ();
return  new $wt.graphics.Point (0, 0);
});
$_M (cla$$, "getCursorSizes", 
function () {
this.checkDevice ();
return [ new $wt.graphics.Point (16, 16)];
});
cla$$.getDefault = $_M (cla$$, "getDefault", 
function () {
if ($wt.widgets.Display.Default == null) ($t$ = $wt.widgets.Display.Default =  new $wt.widgets.Display (), $wt.widgets.Display.prototype.Default = $wt.widgets.Display.Default, $t$);
return $wt.widgets.Display.Default;
});
cla$$.isValidClass = $_M (cla$$, "isValidClass", 
function (clazz) {
var name = clazz.getName ();
var index = name.lastIndexOf ('.');
return name.substring (0, index + 1).equals ($wt.widgets.Display.PACKAGE_PREFIX);
}, "Class");
$_M (cla$$, "getData", 
function (key) {
this.checkDevice ();
if (key == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.keys == null) return null;
for (var i = 0; i < this.keys.length; i++) {
if (this.keys[i].equals (key)) return this.values[i];
}
return null;
}, "String");
$_M (cla$$, "getData", 
function () {
this.checkDevice ();
return this.data;
});
$_M (cla$$, "getDismissalAlignment", 
function () {
this.checkDevice ();
return $WT.LEFT;
});
$_M (cla$$, "getDoubleClickTime", 
function () {
this.checkDevice ();
return 20;
});
$_M (cla$$, "getFocusControl", 
function () {
this.checkDevice ();
if (this.focusControl != null && !this.focusControl.isDisposed ()) {
return this.focusControl;
}return null;
});
$_M (cla$$, "getHighContrast", 
function () {
this.checkDevice ();
return false;
});
$_M (cla$$, "getIconDepth", 
function () {
this.checkDevice ();
return 32;
});
$_M (cla$$, "getIconSizes", 
function () {
this.checkDevice ();
return [ new $wt.graphics.Point (16, 16),  new $wt.graphics.Point (32, 32)];
});
$_M (cla$$, "getImageList", 
function (style, width, height) {
if (this.imageList == null) this.imageList =  new Array (4);
var i = 0;
var length = this.imageList.length;
while (i < length) {
var list = this.imageList[i];
if (list == null) break;
var size = list.getImageSize ();
if (size.x == width && size.y == height) {
if (list.getStyle () == style) {
list.addRef ();
return list;
}}i++;
}
if (i == length) {
var newList =  new Array (length + 4);
System.arraycopy (this.imageList, 0, newList, 0, length);
this.imageList = newList;
}var list =  new $wt.widgets.ImageList (style);
this.imageList[i] = list;
list.addRef ();
return list;
}, "Number,Number,Number");
$_M (cla$$, "getImageListToolBar", 
function (style, width, height) {
if (this.toolImageList == null) this.toolImageList =  new Array (4);
var i = 0;
var length = this.toolImageList.length;
while (i < length) {
var list = this.toolImageList[i];
if (list == null) break;
var size = list.getImageSize ();
if (size.x == width && size.y == height) {
if (list.getStyle () == style) {
list.addRef ();
return list;
}}i++;
}
if (i == length) {
var newList =  new Array (length + 4);
System.arraycopy (this.toolImageList, 0, newList, 0, length);
this.toolImageList = newList;
}var list =  new $wt.widgets.ImageList (style);
this.toolImageList[i] = list;
list.addRef ();
return list;
}, "Number,Number,Number");
$_M (cla$$, "getImageListToolBarDisabled", 
function (style, width, height) {
if (this.toolDisabledImageList == null) this.toolDisabledImageList =  new Array (4);
var i = 0;
var length = this.toolDisabledImageList.length;
while (i < length) {
var list = this.toolDisabledImageList[i];
if (list == null) break;
var size = list.getImageSize ();
if (size.x == width && size.y == height) {
if (list.getStyle () == style) {
list.addRef ();
return list;
}}i++;
}
if (i == length) {
var newList =  new Array (length + 4);
System.arraycopy (this.toolDisabledImageList, 0, newList, 0, length);
this.toolDisabledImageList = newList;
}var list =  new $wt.widgets.ImageList (style);
this.toolDisabledImageList[i] = list;
list.addRef ();
return list;
}, "Number,Number,Number");
$_M (cla$$, "getImageListToolBarHot", 
function (style, width, height) {
if (this.toolHotImageList == null) this.toolHotImageList =  new Array (4);
var i = 0;
var length = this.toolHotImageList.length;
while (i < length) {
var list = this.toolHotImageList[i];
if (list == null) break;
var size = list.getImageSize ();
if (size.x == width && size.y == height) {
if (list.getStyle () == style) {
list.addRef ();
return list;
}}i++;
}
if (i == length) {
var newList =  new Array (length + 4);
System.arraycopy (this.toolHotImageList, 0, newList, 0, length);
this.toolHotImageList = newList;
}var list =  new $wt.widgets.ImageList (style);
this.toolHotImageList[i] = list;
list.addRef ();
return list;
}, "Number,Number,Number");
$_M (cla$$, "getLastEventTime", 
function () {
return parseInt ( new java.util.Date ().getTime ());
});
$_M (cla$$, "getMenuItem", 
function (id) {
if (this.items == null) return null;
id = id - $wt.widgets.Display.ID_START;
if (0 <= id && id < this.items.length) return this.items[id];
return null;
}, "Number");
$_M (cla$$, "getModalShell", 
function () {
if (this.modalShells == null) return null;
var index = this.modalShells.length;
while (--index >= 0) {
var shell = this.modalShells[index];
if (shell != null) return shell;
}
return null;
});
$_M (cla$$, "getModalDialogShell", 
function () {
if (this.modalDialogShell != null && this.modalDialogShell.isDisposed ()) this.modalDialogShell = null;
return this.modalDialogShell;
});
$_M (cla$$, "getMonitors", 
function () {
this.checkDevice ();
var monitor =  new $wt.widgets.Monitor ();
monitor.handle = 220284;
monitor.clientWidth = monitor.width = document.body.clientWidth;
monitor.clientHeight = monitor.height = document.body.clientHeight;
monitor.clientX = monitor.x = 0;
monitor.clientY = monitor.y = 0;
return [monitor];
});
$_M (cla$$, "getPrimaryMonitor", 
function () {
this.checkDevice ();
var monitor =  new $wt.widgets.Monitor ();
monitor.handle = 220284;
monitor.clientWidth = monitor.width = document.body.clientWidth;
monitor.clientHeight = monitor.height = document.body.clientHeight;
monitor.clientX = monitor.x = 0;
monitor.clientY = monitor.y = 0;
return monitor;
});
$_M (cla$$, "getShells", 
function () {
this.checkDevice ();
var count = 0;
for (var i = 0; i < this.controlTable.length; i++) {
var control = this.controlTable[i];
if (control != null && $_O (control, $wt.widgets.Shell)) count++;
}
var index = 0;
var result =  new Array (count);
for (var i = 0; i < this.controlTable.length; i++) {
var control = this.controlTable[i];
if (control != null && $_O (control, $wt.widgets.Shell)) {
result[index++] = control;
}}
return result;
});
$_M (cla$$, "getSyncThread", 
function () {
if (this.isDisposed ()) this.error ($WT.ERROR_DEVICE_DISPOSED);
return null;
});
$_M (cla$$, "getSystemColor", 
function (id) {
this.checkDevice ();
var pixel = "#000000";
switch (id) {
case $WT.COLOR_WIDGET_DARK_SHADOW:
pixel = "ThreeDDarkShadow";
break;
case $WT.COLOR_WIDGET_NORMAL_SHADOW:
pixel = "ThreeDShadow";
break;
case $WT.COLOR_WIDGET_LIGHT_SHADOW:
pixel = "ThreeDLightShadow";
break;
case $WT.COLOR_WIDGET_HIGHLIGHT_SHADOW:
pixel = "ThreeDHighlight";
break;
case $WT.COLOR_WIDGET_BACKGROUND:
pixel = "ThreeDFace";
break;
case $WT.COLOR_WIDGET_BORDER:
pixel = "WindowFrame";
break;
case $WT.COLOR_WIDGET_FOREGROUND:
case $WT.COLOR_LIST_FOREGROUND:
pixel = "WindowText";
break;
case $WT.COLOR_LIST_BACKGROUND:
pixel = "Window";
break;
case $WT.COLOR_LIST_SELECTION:
pixel = "Highlight";
break;
case $WT.COLOR_LIST_SELECTION_TEXT:
pixel = "HighlightText";
break;
case $WT.COLOR_INFO_FOREGROUND:
pixel = "InfoText";
break;
case $WT.COLOR_INFO_BACKGROUND:
pixel = "InfoBackground";
break;
case $WT.COLOR_TITLE_FOREGROUND:
pixel = "CaptionText";
break;
case $WT.COLOR_TITLE_BACKGROUND:
pixel = "ActiveCaption";
break;
case $WT.COLOR_TITLE_BACKGROUND_GRADIENT:
pixel = "ActiveCaption";
break;
case $WT.COLOR_TITLE_INACTIVE_FOREGROUND:
pixel = "InactiveCaptionText";
break;
case $WT.COLOR_TITLE_INACTIVE_BACKGROUND:
pixel = "InactiveCaption";
break;
case $WT.COLOR_TITLE_INACTIVE_BACKGROUND_GRADIENT:
pixel = "InactiveCaption";
break;
default:
return $_U (this, $wt.widgets.Display, "getSystemColor", [id]);
}
return  new $wt.graphics.Color (null, pixel);
}, "Number");
$_M (cla$$, "getSystemCursor", 
function (id) {
this.checkDevice ();
if (!(0 <= id && id < this.cursors.length)) return null;
if (this.cursors[id] == null) {
this.cursors[id] =  new $wt.graphics.Cursor (this, id);
}return this.cursors[id];
}, "Number");
$_V (cla$$, "getSystemFont", 
function () {
this.checkDevice ();
return  new $wt.graphics.Font (this, "Tahoma,Arial", 10, $WT.NONE);
});
$_M (cla$$, "getSystemImage", 
function (id) {
this.checkDevice ();
var iconName = null;
switch (id) {
case $WT.ICON_ERROR:
iconName = "error";
break;
case $WT.ICON_WORKING:
case $WT.ICON_INFORMATION:
iconName = "information";
break;
case $WT.ICON_QUESTION:
iconName = "question";
break;
case $WT.ICON_WARNING:
iconName = "warning";
break;
}
if (iconName == null) return null;
return  new $wt.graphics.Image (this, "j2slib/images/" + iconName + ".png");
}, "Number");
$_M (cla$$, "getSystemTray", 
function () {
this.checkDevice ();
if (this.tray != null) return this.tray;
return this.tray =  new $wt.widgets.Tray (this, $WT.NONE);
});
$_M (cla$$, "getThread", 
function () {
if (this.isDisposed ()) this.error ($WT.ERROR_DEVICE_DISPOSED);
return this.thread;
});
$_M (cla$$, "init", 
function () {
$_U (this, $wt.widgets.Display, "init", []);
this.indexTable =  $_A ($wt.widgets.Display.GROW_SIZE, 0);
this.controlTable =  new Array ($wt.widgets.Display.GROW_SIZE);
for (var i = 0; i < $wt.widgets.Display.GROW_SIZE - 1; i++) this.indexTable[i] = i + 1;

this.indexTable[$wt.widgets.Display.GROW_SIZE - 1] = -1;
});
$_M (cla$$, "isValidThread", 
function () {
return this.thread == Thread.currentThread ();
});
$_M (cla$$, "map", 
function (from, to, point) {
this.checkDevice ();
if (point == null) this.error ($WT.ERROR_NULL_ARGUMENT);
return this.map (from, to, point.x, point.y);
}, "$wt.widgets.Control,$wt.widgets.Control,$wt.graphics.Point");
$_M (cla$$, "map", 
function (from, to, x, y) {
this.checkDevice ();
if (from != null && from.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
if (to != null && to.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
var hwndFrom = from != null ? from.handle : null;
var hwndTo = to != null ? to.handle : null;
return  new $wt.graphics.Point (0, 0);
}, "$wt.widgets.Control,$wt.widgets.Control,Number,Number");
$_M (cla$$, "map", 
function (from, to, rectangle) {
this.checkDevice ();
if (rectangle == null) this.error ($WT.ERROR_NULL_ARGUMENT);
return this.map (from, to, rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}, "$wt.widgets.Control,$wt.widgets.Control,$wt.graphics.Rectangle");
$_M (cla$$, "map", 
function (from, to, x, y, width, height) {
this.checkDevice ();
if (from != null && from.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
if (to != null && to.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
var hwndFrom = from != null ? from.handle : null;
var hwndTo = to != null ? to.handle : null;
return  new $wt.graphics.Rectangle (0, 0, 0, 0);
}, "$wt.widgets.Control,$wt.widgets.Control,Number,Number,Number,Number");
$_M (cla$$, "post", 
function (event) {
if (this.isDisposed ()) this.error ($WT.ERROR_DEVICE_DISPOSED);
if (event == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var type = event.type;
switch (type) {
case $WT.KeyDown:
case $WT.KeyUp:
{
}case $WT.MouseDown:
case $WT.MouseMove:
case $WT.MouseUp:
{
}}
return false;
}, "$wt.widgets.Event");
$_M (cla$$, "postEvent", 
function (event) {
if (this.eventQueue == null) this.eventQueue =  new Array (4);
var index = 0;
var length = this.eventQueue.length;
while (index < length) {
if (this.eventQueue[index] == null) break;
index++;
}
if (index == length) {
var newQueue =  new Array (length + 4);
System.arraycopy (this.eventQueue, 0, newQueue, 0, length);
this.eventQueue = newQueue;
}this.eventQueue[index] = event;
}, "$wt.widgets.Event");
$_M (cla$$, "readAndDispatch", 
function () {
this.checkDevice ();
this.drawMenuBars ();
this.runPopups ();
return true;
});
cla$$.register = $_M (cla$$, "register", 
function (display) {
for (var i = 0; i < $wt.widgets.Display.Displays.length; i++) {
if ($wt.widgets.Display.Displays[i] == null) {
$wt.widgets.Display.Displays[i] = display;
return ;
}}
var newDisplays =  new Array ($wt.widgets.Display.Displays.length + 4);
System.arraycopy ($wt.widgets.Display.Displays, 0, newDisplays, 0, $wt.widgets.Display.Displays.length);
newDisplays[$wt.widgets.Display.Displays.length] = display;
($t$ = $wt.widgets.Display.Displays = newDisplays, $wt.widgets.Display.prototype.Displays = $wt.widgets.Display.Displays, $t$);
}, "$wt.widgets.Display");
$_M (cla$$, "release", 
function () {
this.sendEvent ($WT.Dispose,  new $wt.widgets.Event ());
var shells = this.getShells ();
for (var i = 0; i < shells.length; i++) {
var shell = shells[i];
if (!shell.isDisposed ()) shell.dispose ();
}
if (this.disposeList != null) {
for (var i = 0; i < this.disposeList.length; i++) {
if (this.disposeList[i] != null) this.disposeList[i].run ();
}
}this.disposeList = null;
this.releaseDisplay ();
$_U (this, $wt.widgets.Display, "release", []);
});
$_M (cla$$, "releaseDisplay", 
function () {
for (var i = 0; i < this.cursors.length; i++) {
if (this.cursors[i] != null) this.cursors[i].dispose ();
}
this.cursors = null;
this.keyboard = null;
this.modalDialogShell = null;
this.modalShells = null;
this.data = null;
this.keys = null;
this.values = null;
this.bars = this.popups = null;
this.indexTable = null;
this.controlTable = null;
this.lastHittestControl = null;
this.imageList = this.toolImageList = this.toolHotImageList = this.toolDisabledImageList = null;
});
$_M (cla$$, "releaseImageList", 
function (list) {
var i = 0;
var length = this.imageList.length;
while (i < length) {
if (this.imageList[i] == list) {
if (list.removeRef () > 0) return ;
list.dispose ();
System.arraycopy (this.imageList, i + 1, this.imageList, i, --length - i);
this.imageList[length] = null;
for (var j = 0; j < length; j++) {
if (this.imageList[j] != null) return ;
}
this.imageList = null;
return ;
}i++;
}
}, "$wt.widgets.ImageList");
$_M (cla$$, "releaseToolImageList", 
function (list) {
var i = 0;
var length = this.toolImageList.length;
while (i < length) {
if (this.toolImageList[i] == list) {
if (list.removeRef () > 0) return ;
list.dispose ();
System.arraycopy (this.toolImageList, i + 1, this.toolImageList, i, --length - i);
this.toolImageList[length] = null;
for (var j = 0; j < length; j++) {
if (this.toolImageList[j] != null) return ;
}
this.toolImageList = null;
return ;
}i++;
}
}, "$wt.widgets.ImageList");
$_M (cla$$, "releaseToolHotImageList", 
function (list) {
var i = 0;
var length = this.toolHotImageList.length;
while (i < length) {
if (this.toolHotImageList[i] == list) {
if (list.removeRef () > 0) return ;
list.dispose ();
System.arraycopy (this.toolHotImageList, i + 1, this.toolHotImageList, i, --length - i);
this.toolHotImageList[length] = null;
for (var j = 0; j < length; j++) {
if (this.toolHotImageList[j] != null) return ;
}
this.toolHotImageList = null;
return ;
}i++;
}
}, "$wt.widgets.ImageList");
$_M (cla$$, "releaseToolDisabledImageList", 
function (list) {
var i = 0;
var length = this.toolDisabledImageList.length;
while (i < length) {
if (this.toolDisabledImageList[i] == list) {
if (list.removeRef () > 0) return ;
list.dispose ();
System.arraycopy (this.toolDisabledImageList, i + 1, this.toolDisabledImageList, i, --length - i);
this.toolDisabledImageList[length] = null;
for (var j = 0; j < length; j++) {
if (this.toolDisabledImageList[j] != null) return ;
}
this.toolDisabledImageList = null;
return ;
}i++;
}
}, "$wt.widgets.ImageList");
$_M (cla$$, "removeFilter", 
function (eventType, listener) {
this.checkDevice ();
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.filterTable == null) return ;
this.filterTable.unhook (eventType, listener);
if (this.filterTable.size () == 0) this.filterTable = null;
}, "Number,$wt.widgets.Listener");
$_M (cla$$, "removeListener", 
function (eventType, listener) {
this.checkDevice ();
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook (eventType, listener);
}, "Number,$wt.widgets.Listener");
$_M (cla$$, "removeBar", 
function (menu) {
if (this.bars == null) return ;
for (var i = 0; i < this.bars.length; i++) {
if (this.bars[i] == menu) {
this.bars[i] = null;
return ;
}}
}, "$wt.widgets.Menu");
$_M (cla$$, "removeControl", 
function (handle) {
if (handle == null) return null;
var control = null;
var index = 0;
if (0 <= index && index < this.controlTable.length) {
control = this.controlTable[index];
this.controlTable[index] = null;
this.indexTable[index] = this.freeSlot;
this.freeSlot = index;
}return control;
}, "Object");
$_M (cla$$, "removeMenuItem", 
function (item) {
if (this.items == null) return ;
this.items[item.id - $wt.widgets.Display.ID_START] = null;
item.id = -1;
}, "$wt.widgets.MenuItem");
$_M (cla$$, "removePopup", 
function (menu) {
if (this.popups == null) return ;
for (var i = 0; i < this.popups.length; i++) {
if (this.popups[i] == menu) {
this.popups[i] = null;
return ;
}}
}, "$wt.widgets.Menu");
$_M (cla$$, "runDeferredEvents", 
function () {
while (this.eventQueue != null) {
var event = this.eventQueue[0];
if (event == null) break;
var length = this.eventQueue.length;
System.arraycopy (this.eventQueue, 1, this.eventQueue, 0, --length);
this.eventQueue[length] = null;
var widget = event.widget;
if (widget != null && !widget.isDisposed ()) {
var item = event.item;
if (item == null || !item.isDisposed ()) {
widget.sendEvent (event);
}}}
this.eventQueue = null;
return true;
});
$_M (cla$$, "runPopups", 
function () {
if (this.popups == null) return false;
var result = false;
while (this.popups != null) {
var menu = this.popups[0];
if (menu == null) break;
var length = this.popups.length;
System.arraycopy (this.popups, 1, this.popups, 0, --length);
this.popups[length] = null;
this.runDeferredEvents ();
menu._setVisible (true);
result = true;
}
this.popups = null;
return result;
});
$_M (cla$$, "runTimer", 
function (id) {
if (this.timerList != null && this.timerIds != null) {
var index = 0;
while (index < this.timerIds.length) {
if (this.timerIds[index] == id) {
window.clearInterval (this.timerIds[index]);
this.timerIds[index] = 0;
var runnable = this.timerList[index];
this.timerList[index] = null;
if (runnable != null) runnable.run ();
return true;
}index++;
}
}return false;
}, "Number");
$_M (cla$$, "sendEvent", 
function (eventType, event) {
if (this.eventTable == null && this.filterTable == null) {
return ;
}if (event == null) event =  new $wt.widgets.Event ();
event.display = this;
event.type = eventType;
if (event.time == 0) event.time = this.getLastEventTime ();
if (!this.filterEvent (event)) {
if (this.eventTable != null) this.eventTable.sendEvent (event);
}}, "Number,$wt.widgets.Event");
$_M (cla$$, "setCursorLocation", 
function (x, y) {
this.checkDevice ();
}, "Number,Number");
$_M (cla$$, "setCursorLocation", 
function (point) {
this.checkDevice ();
if (point == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.setCursorLocation (point.x, point.y);
}, "$wt.graphics.Point");
$_M (cla$$, "setData", 
function (key, value) {
this.checkDevice ();
if (key == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (value == null) {
if (this.keys == null) return ;
var index = 0;
while (index < this.keys.length && !this.keys[index].equals (key)) index++;

if (index == this.keys.length) return ;
if (this.keys.length == 1) {
this.keys = null;
this.values = null;
} else {
var newKeys =  new Array (this.keys.length - 1);
var newValues =  new Array (this.values.length - 1);
System.arraycopy (this.keys, 0, newKeys, 0, index);
System.arraycopy (this.keys, index + 1, newKeys, index, newKeys.length - index);
System.arraycopy (this.values, 0, newValues, 0, index);
System.arraycopy (this.values, index + 1, newValues, index, newValues.length - index);
this.keys = newKeys;
this.values = newValues;
}return ;
}if (this.keys == null) {
this.keys = [key];
this.values = [value];
return ;
}for (var i = 0; i < this.keys.length; i++) {
if (this.keys[i].equals (key)) {
this.values[i] = value;
return ;
}}
var newKeys =  new Array (this.keys.length + 1);
var newValues =  new Array (this.values.length + 1);
System.arraycopy (this.keys, 0, newKeys, 0, this.keys.length);
System.arraycopy (this.values, 0, newValues, 0, this.values.length);
newKeys[this.keys.length] = key;
newValues[this.values.length] = value;
this.keys = newKeys;
this.values = newValues;
}, "String,Object");
$_M (cla$$, "setData", 
function (data) {
this.checkDevice ();
this.data = data;
}, "Object");
cla$$.setAppName = $_M (cla$$, "setAppName", 
function (name) {
}, "String");
$_M (cla$$, "setModalDialogShell", 
function (modalDailog) {
if (this.modalDialogShell != null && this.modalDialogShell.isDisposed ()) this.modalDialogShell = null;
this.modalDialogShell = modalDailog;
var shells = this.getShells ();
for (var i = 0; i < shells.length; i++) shells[i].updateModal ();

}, "$wt.widgets.Shell");
$_M (cla$$, "setModalShell", 
function (shell) {
if (this.modalShells == null) this.modalShells =  new Array (4);
var index = 0;
var length = this.modalShells.length;
while (index < length) {
if (this.modalShells[index] == shell) return ;
if (this.modalShells[index] == null) break;
index++;
}
if (index == length) {
var newModalShells =  new Array (length + 4);
System.arraycopy (this.modalShells, 0, newModalShells, 0, length);
this.modalShells = newModalShells;
}this.modalShells[index] = shell;
var shells = this.getShells ();
for (var i = 0; i < shells.length; i++) shells[i].updateModal ();

}, "$wt.widgets.Shell");
$_M (cla$$, "setSynchronizer", 
function (synchronizer) {
this.checkDevice ();
if (synchronizer == null) this.error ($WT.ERROR_NULL_ARGUMENT);
}, "$wt.widgets.Synchronizer");
$_M (cla$$, "sleep", 
function () {
this.checkDevice ();
return false;
});
$_M (cla$$, "syncExec", 
function (runnable) {
if (this.isDisposed ()) this.error ($WT.ERROR_DEVICE_DISPOSED);
runnable.run ();
}, "Runnable");
$_M (cla$$, "timerExec", 
function (milliseconds, runnable) {
this.checkDevice ();
if (runnable == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.timerList == null) this.timerList =  new Array (4);
if (this.timerIds == null) this.timerIds =  $_A (4, 0);
var index = 0;
while (index < this.timerList.length) {
if (this.timerList[index] == runnable) break;
index++;
}
var timerId = 0;
if (index != this.timerList.length) {
timerId = this.timerIds[index];
if (milliseconds < 0) {
window.clearInterval (timerId);
this.timerList[index] = null;
this.timerIds[index] = 0;
return ;
}} else {
if (milliseconds < 0) return ;
index = 0;
while (index < this.timerList.length) {
if (this.timerList[index] == null) break;
index++;
}
this.nextTimerId++;
timerId = this.nextTimerId;
if (index == this.timerList.length) {
var newTimerList =  new Array (this.timerList.length + 4);
System.arraycopy (this.timerList, 0, newTimerList, 0, this.timerList.length);
this.timerList = newTimerList;
var newTimerIds =  $_A (this.timerIds.length + 4, 0);
System.arraycopy (this.timerIds, 0, newTimerIds, 0, this.timerIds.length);
this.timerIds = newTimerIds;
}}var newTimerID = window.setTimeout (Clazz.makeFunction (runnable), milliseconds);
if (newTimerID != 0) {
this.timerList[index] = runnable;
this.timerIds[index] = newTimerID;
}}, "Number,Runnable");
$_M (cla$$, "update", 
function () {
this.checkDevice ();
var shells = this.getShells ();
for (var i = 0; i < shells.length; i++) {
var shell = shells[i];
if (!shell.isDisposed ()) shell.update (true);
}
});
$_M (cla$$, "wake", 
function () {
if (this.isDisposed ()) this.error ($WT.ERROR_DEVICE_DISPOSED);
});
cla$$.withCrLf = $_M (cla$$, "withCrLf", 
function (string) {
var length = string.length;
if (length == 0) return string;
var i = string.indexOf ('\n', 0);
if (i == -1) return string;
if (i > 0 && (string.charAt (i - 1)).charCodeAt (0) == ('\r').charCodeAt (0)) {
return string;
}i++;
var count = 1;
while (i < length) {
if ((i = string.indexOf ('\n', i)) == -1) break;
count++;
i++;
}
count += length;
i = 0;
var result =  new StringBuffer (count);
while (i < length) {
var j = string.indexOf ('\n', i);
if (j == -1) j = length;
result.append (string.substring (i, j));
if ((i = j) < length) {
result.append ("\r\n");
i++;
}}
return result.toString ();
}, "String");
$_M (cla$$, "releaseResources", 
function () {
this.releaseEventQueue ();
if (this.eventTable != null) {
this.eventTable.releaseResource ();
this.eventTable = null;
}if (this.filterTable != null) {
this.filterTable.releaseResource ();
this.filterTable = null;
}if (this.cursors != null) {
for (var i = 0; i < this.cursors.length; i++) {
this.cursors[i] = null;
}
this.cursors = null;
}if (this.controlTable != null) {
$wt.widgets.Display.releaseWidgetArray (this.controlTable);
this.controlTable = null;
}if (this.items != null) {
$wt.widgets.Display.releaseWidgetArray (this.items);
this.items = null;
}if (this.popups != null) {
$wt.widgets.Display.releaseWidgetArray (this.popups);
this.popups = null;
}if (this.bars != null) {
$wt.widgets.Display.releaseWidgetArray (this.bars);
this.bars = null;
}});
cla$$.releaseWidgetArray = $_M (cla$$, "releaseWidgetArray", 
function (list) {
if (list != null) {
for (var i = 0; i < list.length; i++) {
if (list[i] != null) {
list[i].releaseHandle ();
list[i] = null;
}}
list = null;
}}, "Array");
$_M (cla$$, "releaseEventQueue", 
function () {
if (this.eventQueue != null) {
for (var i = 0; i < this.eventQueue.length; i++) {
if (this.eventQueue[i] != null) {
this.eventQueue[i].releaseResource ();
this.eventQueue[i] = null;
}}
this.eventQueue = null;
}});
cla$$.releaseAllResources = $_M (cla$$, "releaseAllResources", 
function () {
var tags = ["DIV", "SPAN", "TABLE", "IMAGE", "INPUT", "SELECT", "TEXTAREA", "BUTTON"];
for (var i = 0; i < tags.length; i++) {
$wt.widgets.Display.releaseTaggedElements (tags[i]);
}
if ($wt.widgets.Display.Default != null) {
$wt.widgets.Display.Default.releaseResources ();
($t$ = $wt.widgets.Display.Default = null, $wt.widgets.Display.prototype.Default = $wt.widgets.Display.Default, $t$);
}if ($wt.widgets.Display.Displays != null) {
for (var i = 0; i < $wt.widgets.Display.Displays.length; i++) {
if ($wt.widgets.Display.Displays[i] != null) {
$wt.widgets.Display.Displays[i].releaseResources ();
$wt.widgets.Display.Displays[i] = null;
}}
($t$ = $wt.widgets.Display.Displays = null, $wt.widgets.Display.prototype.Displays = $wt.widgets.Display.Displays, $t$);
}});
cla$$.releaseTaggedElements = $_M (cla$$, "releaseTaggedElements", 
function (tagName) {
var elements = document.getElementsByTagName (tagName);
for (var i = 0; i < elements.length; i++) {
var el = elements[i];
el.onclick = null;
el.ondblclick = null;
el.onchange = null;
el.oncontextmenu = null;
el.onkeypress = null;
el.onkeydown = null;
el.onkeyup = null;
el.onmousedown = null;
el.onmouseup = null;
el.onselectstart = null;
el = null;
}
elements = null;
}, "String");
$_S (cla$$,
"GROW_SIZE", 1024,
"ID_START", 108,
"Default", null);
cla$$.Displays = cla$$.prototype.Displays =  new Array (4);
$_S (cla$$,
"monitors", null,
"monitorCount", 0,
"TrimEnabled", false,
"PACKAGE_PREFIX", "org.eclipse.swt.widgets.");
cla$$ = $_C (function () {
this.text = "";
this.image = null;
this.image2 = null;
$_Z (this, arguments);
}, $wt.widgets, "Button", $wt.widgets.Control);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Button, [parent, $wt.widgets.Button.checkStyle (style)]);
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
style = $wt.widgets.Widget.checkBits (style, $WT.PUSH, $WT.ARROW, $WT.CHECK, $WT.RADIO, $WT.TOGGLE, 0);
if ((style & ($WT.PUSH | $WT.TOGGLE)) != 0) {
return $wt.widgets.Widget.checkBits (style, $WT.CENTER, $WT.LEFT, $WT.RIGHT, 0, 0, 0);
}if ((style & ($WT.CHECK | $WT.RADIO)) != 0) {
return $wt.widgets.Widget.checkBits (style, $WT.LEFT, $WT.RIGHT, $WT.CENTER, 0, 0, 0);
}if ((style & $WT.ARROW) != 0) {
style |= $WT.NO_FOCUS;
return $wt.widgets.Widget.checkBits (style, $WT.UP, $WT.DOWN, $WT.LEFT, $WT.RIGHT, 0, 0);
}return style;
}, "Number");
$_M (cla$$, "addSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Selection, typedListener);
this.addListener ($WT.DefaultSelection, typedListener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "removeSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Selection, listener);
this.eventTable.unhook ($WT.DefaultSelection, listener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "getText", 
function () {
if ((this.style & $WT.ARROW) != 0) return "";
return this.text;
});
$_M (cla$$, "getSelection", 
function () {
if ((this.style & ($WT.CHECK | $WT.RADIO | $WT.TOGGLE)) == 0) return false;
if ((this.style & $WT.TOGGLE) != 0) {
return (this.handle.className != null && this.handle.className.indexOf ("selected") != -1);
} else if ((this.style & ($WT.RADIO | $WT.CHECK)) != 0) {
return this.handle.childNodes[0].checked;
}return false;
});
$_M (cla$$, "setSelection", 
function (selected) {
if ((this.style & ($WT.CHECK | $WT.RADIO | $WT.TOGGLE)) == 0) return ;
if ((this.style & $WT.TOGGLE) != 0) {
this.handle.className = selected ? "button-default button-toggle-selected" : "button-default";
} else if ((this.style & ($WT.RADIO | $WT.CHECK)) != 0) {
this.handle.childNodes[0].checked = selected;
}}, "Boolean");
$_M (cla$$, "setText", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.text = string;
if (this.handle != null) {
var el = this.handle;
if ((this.style & ($WT.RADIO | $WT.CHECK)) != 0) {
el = this.handle.childNodes[1];
}var idx = string.indexOf ('&');
if (idx == -1) {
el.appendChild (document.createTextNode (string));
} else {
el.appendChild (document.createTextNode (string.substring (0, idx)));
var underline = document.createElement ("SPAN");
underline.appendChild (document.createTextNode (string.substring (idx + 1, idx + 2)));
underline.className = "button-text-mnemonics";
el.appendChild (underline);
el.appendChild (document.createTextNode (string.substring (idx + 2)));
}}}, "String");
$_V (cla$$, "createWidget", 
function () {
this.register ();
if ((this.style & ($WT.PUSH | $WT.TOGGLE)) != 0) {
this.handle = document.createElement ("BUTTON");
this.handle.className = "button-default";
} else if ((this.style & ($WT.RADIO | $WT.CHECK)) != 0) {
this.handle = document.createElement ("DIV");
this.handle.className = "button-default";
var radioBtn = document.createElement ("INPUT");
radioBtn.type = ((this.style & $WT.RADIO) != 0) ? "radio" : "checkbox";
radioBtn.className = "button-radio-default";
this.handle.appendChild (radioBtn);
}this.handle.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Button$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Button$1", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
if ((this.callbacks["$wt.widgets.Button"].style & $WT.TOGGLE) != 0) {
this.callbacks["$wt.widgets.Button"].setSelection (!this.callbacks["$wt.widgets.Button"].getSelection ());
}var e =  new $wt.widgets.Event ();
e.type = $WT.Selection;
e.item = this.callbacks["$wt.widgets.Button"];
e.text = this.callbacks["$wt.widgets.Button"].getText ();
e.widget = this.callbacks["$wt.widgets.Button"];
this.callbacks["$wt.widgets.Button"].sendEvent (e);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Button$1, innerThis, finalVars);
}) (this, null));
if ((this.style & ($WT.RADIO | $WT.CHECK)) != 0) {
var btnText = document.createElement ("SPAN");
this.handle.appendChild (btnText);
btnText.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Button$2")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Button$2", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
if ((this.callbacks["$wt.widgets.Button"].style & $WT.CHECK) != 0) {
this.callbacks["$wt.widgets.Button"].setSelection (!this.callbacks["$wt.widgets.Button"].getSelection ());
}var e =  new $wt.widgets.Event ();
e.type = $WT.Selection;
e.item = this.callbacks["$wt.widgets.Button"];
e.text = this.callbacks["$wt.widgets.Button"].getText ();
e.widget = this.callbacks["$wt.widgets.Button"];
this.callbacks["$wt.widgets.Button"].sendEvent (e);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Button$2, innerThis, finalVars);
}) (this, null));
}if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}});
$_V (cla$$, "setCursor", 
function (cursor) {
if (this.handle != null) {
this.handle.style.cursor = cursor.handle;
}}, "$wt.graphics.Cursor");
$_M (cla$$, "setImage", 
function (image) {
if (image != null && image.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
this.image = image;
if (image != null && this.handle != null) {
this.handle.style.backgroundImage = "url('" + image.url + "')";
}}, "$wt.graphics.Image");
$_M (cla$$, "setDefault", 
function (value) {
if ((this.style & $WT.PUSH) == 0) return ;
if (value) {
try {
this.handle.focus ();
} catch (e) {
if ($_O (e, Error)) {
} else {
throw e;
}
}
}}, "Boolean");
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var width = $wt.widgets.Widget.DEFAULT_WIDTH;
width = 12;
var height = 24;
if (wHint == $WT.DEFAULT) {
if (this.text != null) {
width = 6 + UIStringUtil.calculateStyledStringLineWidth (this.text, "button-default");
}var extra = 6;
if ((this.style & ($WT.CHECK | $WT.RADIO)) != 0) {
width += $wt.widgets.Button.CHECK_WIDTH + extra;
height = Math.max (height, $wt.widgets.Button.CHECK_HEIGHT + 3);
}if ((this.style & ($WT.PUSH | $WT.TOGGLE)) != 0) {
width += 6;
}}if (wHint != $WT.DEFAULT) width = wHint;
if (hHint != $WT.DEFAULT) height = hHint;
var border = this.getBorderWidth ();
width += border * 2;
height += border * 2;
return  new $wt.graphics.Point (width, height);
}, "Number,Number,Boolean");
$_S (cla$$,
"CHECK_WIDTH", 12,
"CHECK_HEIGHT", 12);
cla$$ = $_C (function () {
this.text = "";
this.image = null;
this.image2 = null;
$_Z (this, arguments);
}, $wt.widgets, "Label", $wt.widgets.Control);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Label, [parent, $wt.widgets.Label.checkStyle (style)]);
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
style |= $WT.NO_FOCUS;
if ((style & $WT.SEPARATOR) != 0) {
style = $wt.widgets.Widget.checkBits (style, $WT.VERTICAL, $WT.HORIZONTAL, 0, 0, 0, 0);
return $wt.widgets.Widget.checkBits (style, $WT.SHADOW_OUT, $WT.SHADOW_IN, $WT.SHADOW_NONE, 0, 0, 0);
}return $wt.widgets.Widget.checkBits (style, $WT.LEFT, $WT.CENTER, $WT.RIGHT, 0, 0, 0);
}, "Number");
$_M (cla$$, "getAlignment", 
function () {
if ((this.style & $WT.SEPARATOR) != 0) return 0;
if ((this.style & $WT.LEFT) != 0) return $WT.LEFT;
if ((this.style & $WT.CENTER) != 0) return $WT.CENTER;
if ((this.style & $WT.RIGHT) != 0) return $WT.RIGHT;
return $WT.LEFT;
});
$_M (cla$$, "getText", 
function () {
if ((this.style & $WT.SEPARATOR) != 0) return "";
return this.text;
});
$_M (cla$$, "setText", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if ((this.style & $WT.SEPARATOR) != 0) return ;
if (string.equals (this.text)) return ;
this.text = string;
this.handle.appendChild (document.createTextNode (this.text));
}, "String");
$_M (cla$$, "setAlignment", 
function (alignment) {
if ((this.style & $WT.SEPARATOR) != 0) return ;
if ((alignment & ($WT.LEFT | $WT.RIGHT | $WT.CENTER)) == 0) return ;
this.style &= ~($WT.LEFT | $WT.RIGHT | $WT.CENTER);
this.style |= alignment & ($WT.LEFT | $WT.RIGHT | $WT.CENTER);
if ((this.style & $WT.LEFT) != 0) {
this.handle.style.textAlign = "left";
} else if ((this.style & $WT.CENTER) != 0) {
this.handle.style.textAlign = "center";
} else if ((this.style & $WT.CENTER) != 0) {
this.handle.style.textAlign = "right";
} else {
this.handle.style.textAlign = "inherit";
}}, "Number");
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.handle = document.createElement ("DIV");
this.handle.className = "label-default";
if ((this.style & $WT.SEPARATOR) != 0) {
this.handle.style.fontSize = "0";
var seperator1 = document.createElement ("DIV");
if ((this.style & $WT.VERTICAL) != 0) {
seperator1.className = "label-seperator-vertical-left";
} else {
seperator1.className = "label-seperator-horizontal-top";
}this.handle.appendChild (seperator1);
var seperator2 = document.createElement ("DIV");
if ((this.style & $WT.VERTICAL) != 0) {
seperator2.className = "label-seperator-vertical-right";
} else {
seperator2.className = "label-seperator-horizontal-bottom";
}this.handle.appendChild (seperator2);
}if ((this.style & $WT.WRAP) != 0) {
this.handle.className += " label-wrap";
}if ((this.style & $WT.BORDER) != 0) {
this.handle.className += " label-border";
}if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}});
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var width = 0;
var height = 0;
var border = this.getBorderWidth ();
if ((this.style & $WT.SEPARATOR) != 0) {
var lineWidth = 4;
if ((this.style & $WT.HORIZONTAL) != 0) {
width = $wt.widgets.Widget.DEFAULT_WIDTH;
height = lineWidth * 2;
} else {
width = lineWidth * 2;
height = $wt.widgets.Widget.DEFAULT_HEIGHT;
}if (wHint != $WT.DEFAULT) width = wHint;
if (hHint != $WT.DEFAULT) height = hHint;
width += border * 2;
height += border * 2;
return  new $wt.graphics.Point (width, height);
}if (this.text != null) {
width += UIStringUtil.calculatePlainStringLineWidth (this.text);
height += UIStringUtil.calculatePlainStringLineHeight (this.text);
}if (wHint != $WT.DEFAULT) width = wHint;
if (hHint != $WT.DEFAULT) height = hHint;
if ((this.style & $WT.WRAP) != 0 && hHint == $WT.DEFAULT) {
height = UIStringUtil.calculateStyledStringBlockHeight (this.text, width, "label-default label-wrap");
}if (this.image != null) {
width += this.image.width;
height = Math.max (this.image.height, height);
}if ((this.style & $WT.BORDER) != 0) {
width += border * 2;
height += border * 2;
}return  new $wt.graphics.Point (width, height);
}, "Number,Number,Boolean");
$_M (cla$$, "setBounds", 
function (x, y, width, height) {
$_U (this, $wt.widgets.Label, "setBounds", [x, y, width, height]);
if ((this.style & $WT.SEPARATOR) != 0) {
var handleStyle = this.handle.childNodes[0].style;
if ((this.style & $WT.HORIZONTAL) != 0) {
handleStyle.marginTop = ((Math.floor (height / 2)) - 1) + "px";
handleStyle.width = width + "px";
this.handle.childNodes[1].style.width = width + "px";
} else {
handleStyle.marginLeft = ((Math.floor (width / 2)) - 1) + "px";
handleStyle.height = height + "px";
this.handle.childNodes[1].style.marginLeft = (Math.floor (width / 2)) + "px";
this.handle.childNodes[1].style.height = height + "px";
}}}, "Number,Number,Number,Number");
$_M (cla$$, "setImage", 
function (image) {
if (image == null) return ;
if ((this.style & $WT.SEPARATOR) != 0) return ;
if (image != null && image.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
this.image = image;
if (this.image.handle == null) {
var handleStyle = this.handle.style;
if (image.url.toLowerCase ().endsWith (".png") && handleStyle.filter != null) {
handleStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
} else {
handleStyle.backgroundRepeat = "no-repeat";
handleStyle.backgroundPosition = "center center";
handleStyle.backgroundImage = "url(\"" + this.image.url + "\")";
}} else if (this.handle.childNodes.length == 0) {
for (var i = 0; i < image.handle.childNodes.length; i++) {
this.handle.appendChild (image.handle.childNodes[i]);
}
} else {
var txt = this.handle.childNodes[0];
for (var i = 0; i < image.handle.childNodes.length; i++) {
this.handle.insertBefore (image.handle.childNodes[i], txt);
}
}}, "$wt.graphics.Image");
$_M (cla$$, "getImage", 
function () {
return this.image;
});
cla$$ = $_C (function () {
this.text = null;
this.linkColor = null;
this.linkDisabledColor = null;
this.offsets = null;
this.selection = null;
this.ids = null;
this.mnemonics = null;
this.focusIndex = 0;
this.font = 0;
$_Z (this, arguments);
}, $wt.widgets, "Link", $wt.widgets.Control);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Link, [parent, style]);
}, "$wt.widgets.Composite,Number");
$_M (cla$$, "addSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Selection, typedListener);
this.addListener ($WT.DefaultSelection, typedListener);
}, "$wt.events.SelectionListener");
$_V (cla$$, "createWidget", 
function () {
this.text = "";
this.handle = document.createElement ("DIV");
this.handle.style.color = "blue";
this.handle.style.cursor = "pointer";
this.handle.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Link$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Link$1", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
var e =  new $wt.widgets.Event ();
e.type = $WT.Selection;
e.item = this.callbacks["$wt.widgets.Link"];
e.text = this.callbacks["$wt.widgets.Link"].text;
e.widget = this.callbacks["$wt.widgets.Link"];
this.callbacks["$wt.widgets.Link"].sendEvent (e);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Link$1, innerThis, finalVars);
}) (this, null));
this.handle.appendChild (document.createTextNode (this.text));
if (this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}});
$_M (cla$$, "getText", 
function () {
return this.text;
});
$_M (cla$$, "removeSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Selection, listener);
this.eventTable.unhook ($WT.DefaultSelection, listener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "setText", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (string.equals (this.text)) return ;
this.text = string;
this.handle.innerHTML = this.text;
}, "String");
cla$$.LINK_FOREGROUND = cla$$.prototype.LINK_FOREGROUND =  new $wt.graphics.RGB (0, 51, 153);
cla$$ = $_C (function () {
this.tabs = 0;
this.oldStart = 0;
this.oldEnd = 0;
this.doubleClick = false;
this.ignoreModify = false;
this.ignoreVerify = false;
this.ignoreCharacter = false;
$_Z (this, arguments);
}, $wt.widgets, "Text", $wt.widgets.Scrollable);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Text, [parent, $wt.widgets.Text.checkStyle (style)]);
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
if ((style & $WT.SINGLE) != 0 && (style & $WT.MULTI) != 0) {
style &= ($t$ = ~ $WT.MULTI, $WT.prototype.MULTI = $WT.MULTI, $t$);
}style = $wt.widgets.Widget.checkBits (style, $WT.LEFT, $WT.CENTER, $WT.RIGHT, 0, 0, 0);
if ((style & $WT.SINGLE) != 0) style &= ~($WT.H_SCROLL | $WT.V_SCROLL | $WT.WRAP);
if ((style & $WT.WRAP) != 0) {
style |= $WT.MULTI;
style &= ($t$ = ~ $WT.H_SCROLL, $WT.prototype.H_SCROLL = $WT.H_SCROLL, $t$);
}if ((style & $WT.MULTI) != 0) style &= ($t$ = ~ $WT.PASSWORD, $WT.prototype.PASSWORD = $WT.PASSWORD, $t$);
if ((style & ($WT.SINGLE | $WT.MULTI)) != 0) return style;
if ((style & ($WT.H_SCROLL | $WT.V_SCROLL)) != 0) return style | $WT.MULTI;
return style | $WT.SINGLE;
}, "Number");
$_M (cla$$, "addModifyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Modify, typedListener);
}, "$wt.events.ModifyListener");
$_M (cla$$, "addSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Selection, typedListener);
this.addListener ($WT.DefaultSelection, typedListener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "addVerifyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Verify, typedListener);
}, "$wt.events.VerifyListener");
$_M (cla$$, "removeModifyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Modify, listener);
}, "$wt.events.ModifyListener");
$_M (cla$$, "removeSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Selection, listener);
this.eventTable.unhook ($WT.DefaultSelection, listener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "removeVerifyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Verify, listener);
}, "$wt.events.VerifyListener");
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.doubleClick = true;
if ((this.style & $WT.MULTI) != 0) {
this.handle = document.createElement ("TEXTAREA");
} else {
this.handle = document.createElement ("INPUT");
}this.handle.className = "text-default";
if ((this.style & $WT.BORDER) != 0) {
this.handle.className += " text-border";
}if ((this.style & $WT.READ_ONLY) != 0) {
this.handle.readOnly = true;
}if (this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}this.handle.onkeydown = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Text$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Text$1", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
if (this.callbacks["$wt.widgets.Text"].eventTable == null) {
this.toReturn (true);
return ;
}var modified = true;
if (!this.callbacks["$wt.widgets.Text"].eventTable.hooks ($WT.Verify)) {
this.toReturn (true);
} else {
var e =  new $wt.widgets.Event ();
e.type = $WT.Verify;
e.item = this.callbacks["$wt.widgets.Text"];
var evt = this.getEvent ();
if (!this.callbacks["$wt.widgets.Text"].isInputCharacter (evt.keyCode, evt.shiftKey, evt.altKey, evt.ctrlKey)) {
this.toReturn (true);
modified = false;
} else {
e.text = this.callbacks["$wt.widgets.Text"].getInputCharacter (evt.keyCode, evt.shiftKey, false);
e.widget = this.callbacks["$wt.widgets.Text"];
this.callbacks["$wt.widgets.Text"].sendEvent (e);
this.toReturn (e.doit);
modified = e.doit;
}}if (modified && this.callbacks["$wt.widgets.Text"].eventTable.hooks ($WT.Modify)) {
var e =  new $wt.widgets.Event ();
e.type = $WT.Modify;
e.item = this.callbacks["$wt.widgets.Text"];
e.widget = this.callbacks["$wt.widgets.Text"];
this.callbacks["$wt.widgets.Text"].sendEvent (e);
}});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Text$1, innerThis, finalVars);
}) (this, null));
this.handle.onchange = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Text$2")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Text$2", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
if (this.callbacks["$wt.widgets.Text"].eventTable == null) {
this.toReturn (true);
return ;
}if (!this.callbacks["$wt.widgets.Text"].eventTable.hooks ($WT.Verify)) {
this.toReturn (true);
} else {
var e =  new $wt.widgets.Event ();
e.type = $WT.Verify;
e.item = this.callbacks["$wt.widgets.Text"];
e.text = this.callbacks["$wt.widgets.Text"].getText ();
e.widget = this.callbacks["$wt.widgets.Text"];
this.callbacks["$wt.widgets.Text"].sendEvent (e);
this.toReturn (e.doit);
}if (this.callbacks["$wt.widgets.Text"].eventTable.hooks ($WT.Modify)) {
var e =  new $wt.widgets.Event ();
e.type = $WT.Modify;
e.item = this.callbacks["$wt.widgets.Text"];
e.widget = this.callbacks["$wt.widgets.Text"];
this.callbacks["$wt.widgets.Text"].sendEvent (e);
}});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Text$2, innerThis, finalVars);
}) (this, null));
});
$_M (cla$$, "getInputCharacter", 
($fz = function (keyCode, shiftKey, capsLockStatus) {
var ch = '\0';
if (keyCode == 10 || keyCode == 13 || keyCode == 9 || keyCode == 32) {
ch = String.fromCharCode (keyCode);
} else if (keyCode >= 48 && keyCode < 58) {
if (!shiftKey) {
ch = String.fromCharCode (keyCode);
} else {
var chs = [')', '!', '@', '#', '$', '%', '^', '&', '*', '('];
ch = chs[keyCode - 48];
}} else if (keyCode == 61) {
if (!shiftKey) {
ch = '=';
} else {
ch = '+';
}} else if (keyCode == 59) {
if (!shiftKey) {
ch = ';';
} else {
ch = ':';
}} else if (keyCode >= 65 && keyCode <= 90) {
if ((shiftKey && capsLockStatus) || (!shiftKey && !capsLockStatus)) {
ch = String.fromCharCode ((keyCode + ('a').charCodeAt (0) - ('A').charCodeAt (0)));
} else {
ch = String.fromCharCode (keyCode);
}} else if (keyCode >= 96 && keyCode <= 105) {
ch = String.fromCharCode ((keyCode - 96 + ('0').charCodeAt (0)));
} else if (keyCode >= 106 && keyCode <= 111 && keyCode != 108) {
var chs = ['*', '+', '?', '-', '.', '/'];
ch = chs[keyCode - 106];
} else if (keyCode >= 186 && keyCode <= 192) {
if (!shiftKey) {
var chs = [';', '=', ',', '-', '.', '/', '`'];
ch = chs[keyCode - 186];
} else {
var chs = [':', '+', '<', '_', '>', '?', '~'];
ch = chs[keyCode - 186];
}} else if (keyCode >= 219 && keyCode <= 222) {
if (!shiftKey) {
var chs = ['[', '\\', ']', '\''];
ch = chs[keyCode - 219];
} else {
var chs = ['{', '|', '}', '\"'];
ch = chs[keyCode - 219];
}}return "" + ch;
}, $fz.isPrivate = true, $fz), "Number,Boolean,Boolean");
$_M (cla$$, "isInputCharacter", 
($fz = function (keyCode, shiftKey, altKey, ctrlKey) {
if (altKey || ctrlKey) {
return false;
}if (keyCode == 10 || keyCode == 13 || keyCode == 9 || keyCode == 32 || (keyCode >= 48 && keyCode <= 57) || keyCode == 59 || keyCode == 61 || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111 && keyCode != 108) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 218 && keyCode <= 222)) {
return true;
}return false;
}, $fz.isPrivate = true, $fz), "Number,Boolean,Boolean,Boolean");
$_M (cla$$, "computeTrim", 
function (x, y, width, height) {
var rect = $_U (this, $wt.widgets.Text, "computeTrim", [x, y, width, height]);
var margins = 2;
rect.x -= margins & 0xFFFF;
rect.width += (margins & 0xFFFF) + ((margins >> 16) & 0xFFFF);
if ((this.style & $WT.H_SCROLL) != 0) rect.width++;
if ((this.style & $WT.BORDER) != 0) {
rect.x -= 1;
rect.y -= 1;
rect.width += 2;
rect.height += 2;
}return rect;
}, "Number,Number,Number,Number");
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var height = 0;
var width = 0;
if (wHint == $WT.DEFAULT || hHint == $WT.DEFAULT) {
var splits = this.getText ().split ("\n");
height += this.getLineHeight () * splits.length + 10;
var lineChars = 0;
for (var i = 0; i < splits.length; i++) {
lineChars = Math.max (lineChars, splits[i].length);
}
width += lineChars * 6;
}if (width == 0) width = $wt.widgets.Widget.DEFAULT_WIDTH;
if (height == 0) height = $wt.widgets.Widget.DEFAULT_HEIGHT;
if (wHint != $WT.DEFAULT) width = wHint;
if (hHint != $WT.DEFAULT) height = hHint;
var trim = this.computeTrim (0, 0, width, height);
return  new $wt.graphics.Point (trim.width - 4, trim.height - 4);
}, "Number,Number,Boolean");
$_M (cla$$, "setText", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.handle.value = string;
if ((this.style & $WT.MULTI) != 0) {
this.sendEvent ($WT.Modify);
}}, "String");
$_M (cla$$, "getLineHeight", 
function () {
return 16;
});
$_M (cla$$, "getText", 
function () {
return this.handle.value;
});
$_M (cla$$, "getText", 
function (start, end) {
var length = this.handle.value.length;
start = Math.max (0, start);
end = Math.min (end, length - 1);
return this.getText ().substring (start, end + 1);
}, "Number,Number");
$_M (cla$$, "selectAll", 
function () {
this.handle.select ();
});
$_M (cla$$, "append", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.handle.value += string;
}, "String");
$_M (cla$$, "getSelectionCount", 
function () {
var selection = this.getSelection ();
return selection.y - selection.x;
});
$_M (cla$$, "getCharCount", 
function () {
return this.getSelectionCount ();
});
$_M (cla$$, "getSelectionText", 
function () {
return BrowserNative.getSelectionText (this.handle);
});
$_M (cla$$, "getSelection", 
function () {
return BrowserNative.getTextSelection (this.handle);
});
$_M (cla$$, "getCaretLineNumber", 
function () {
return BrowserNative.getTextCaretLineNumber (this.handle);
});
$_M (cla$$, "getCaretLocation", 
function () {
return  new $wt.graphics.Point (0, 0);
});
$_M (cla$$, "getCaretPosition", 
function () {
return BrowserNative.getTextCaretPosition (this.handle);
});
$_M (cla$$, "getEditable", 
function () {
var disableClass = "text-disable";
if (this.handle.className != null) {
var idx = this.handle.className.indexOf (disableClass);
if (idx != -1) {
return false;
}}return true;
});
$_M (cla$$, "getDoubleClickEnabled", 
function () {
return this.doubleClick;
});
$_M (cla$$, "getLineDelimiter", 
function () {
return $wt.widgets.Text.DELIMITER;
});
$_M (cla$$, "getLineCount", 
function () {
return -1;
});
$_M (cla$$, "setDoubleClickEnabled", 
function (doubleClick) {
this.doubleClick = doubleClick;
}, "Boolean");
$_M (cla$$, "setEditable", 
function (editable) {
this.style &= ($t$ = ~ $WT.READ_ONLY, $WT.prototype.READ_ONLY = $WT.READ_ONLY, $t$);
if (!editable) this.style |= $WT.READ_ONLY;
this.handle.readOnly = !editable;
var disableClass = "text-disable";
if (editable) {
if (this.handle.className != null) {
var idx = this.handle.className.indexOf (disableClass);
if (idx != -1) {
var zzName = this.handle.className.substring (0, idx) + this.handle.className.substring (idx + disableClass.length);
this.handle.className = zzName;
}}} else {
if (this.handle.className != null) {
var idx = this.handle.className.indexOf (disableClass);
if (idx == -1) {
this.handle.className += " text-disable";
}}}}, "Boolean");
$_M (cla$$, "setFont", 
function (font) {
$_U (this, $wt.widgets.Text, "setFont", [font]);
}, "$wt.graphics.Font");
$_M (cla$$, "setOrientation", 
function (orientation) {
}, "Number");
$_M (cla$$, "setSelection", 
function (start) {
this.setSelection (start, this.handle.value.length);
}, "Number");
$_M (cla$$, "setSelection", 
function (start, end) {
BrowserNative.setTextSelection (this.handle, start, end);
}, "Number,Number");
$_M (cla$$, "setSelection", 
function (selection) {
if (selection == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.setSelection (selection.x, selection.y);
}, "$wt.graphics.Point");
$_M (cla$$, "setEchoChar", 
function (c) {
try {
this.handle.type = "password";
} catch (e) {
if ($_O (e, Exception)) {
} else {
throw e;
}
}
}, "Number");
$_M (cla$$, "insert", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
BrowserNative.insertTextString (this.handle, string);
if ((this.style & $WT.MULTI) != 0) {
this.sendEvent ($WT.Modify);
}}, "String");
$_M (cla$$, "paste", 
function () {
if ((this.style & $WT.READ_ONLY) != 0) return ;
});
$_M (cla$$, "cut", 
function () {
if ((this.style & $WT.READ_ONLY) != 0) return ;
});
$_M (cla$$, "copy", 
function () {
});
$_M (cla$$, "clearSelection", 
function () {
BrowserNative.clearSelection (this.handle);
});
$_M (cla$$, "setTabs", 
function (tabs) {
if (tabs < 0) return ;
this.tabs = tabs;
}, "Number");
$_M (cla$$, "setTextLimit", 
function (limit) {
if (limit == 0) this.error ($WT.ERROR_CANNOT_BE_ZERO);
if (limit > $wt.widgets.Text.LIMIT) {
}}, "Number");
$_M (cla$$, "setTopIndex", 
function (index) {
if ((this.style & $WT.SINGLE) != 0) return ;
}, "Number");
$_M (cla$$, "showSelection", 
function () {
});
$_V (cla$$, "forceFocus", 
function () {
try {
this.handle.focus ();
} catch (e) {
if ($_O (e, Error)) {
} else {
throw e;
}
}
return true;
});
$_S (cla$$,
"LIMIT", 0x7FFF,
"DELIMITER", "\r\n");
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.widgets, "List", $wt.widgets.Scrollable);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.List, [parent, $wt.widgets.List.checkStyle (style)]);
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
return $wt.widgets.Widget.checkBits (style, $WT.SINGLE, $WT.MULTI, 0, 0, 0, 0);
}, "Number");
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.handle = document.createElement ("SELECT");
this.handle.size = 2;
this.handle.className = "list-default";
if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}this.handle.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.List$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "List$1", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
var e =  new $wt.widgets.Event ();
e.type = $WT.Selection;
e.item = this.callbacks["$wt.widgets.List"];
e.widget = this.callbacks["$wt.widgets.List"];
this.callbacks["$wt.widgets.List"].sendEvent (e);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.List$1, innerThis, finalVars);
}) (this, null));
});
$_M (cla$$, "add", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.handle != null) {
this.handle.options[this.handle.options.length] =  new Option (string, string);
}}, "String");
$_M (cla$$, "addSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Selection, typedListener);
this.addListener ($WT.DefaultSelection, typedListener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "add", 
function (string, index) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (index == -1) this.error ($WT.ERROR_INVALID_RANGE);
if (this.handle != null) {
this.handle.options[index] =  new Option (string, string);
}}, "String,Number");
$_M (cla$$, "deselect", 
function (index) {
if (index == -1) return ;
if ((this.style & $WT.SINGLE) != 0) {
return ;
}}, "Number");
$_M (cla$$, "deselect", 
function (start, end) {
if (start > end) return ;
if ((this.style & $WT.SINGLE) != 0) {
return ;
}}, "Number,Number");
$_M (cla$$, "deselectAll", 
function () {
if ((this.style & $WT.SINGLE) != 0) {
} else {
}});
$_M (cla$$, "deselect", 
function (indices) {
if (indices == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (indices.length == 0) return ;
if ((this.style & $WT.SINGLE) != 0) {
return ;
}for (var i = 0; i < indices.length; i++) {
var index = indices[i];
if (index != -1) {
}}
}, "Array");
$_M (cla$$, "getFocusIndex", 
function () {
return -1;
});
$_M (cla$$, "getItem", 
function (index) {
return "";
}, "Number");
$_M (cla$$, "getItemCount", 
function () {
return 0;
});
$_M (cla$$, "getItemHeight", 
function () {
return 12;
});
$_M (cla$$, "getItems", 
function () {
var count = this.getItemCount ();
var result =  new Array (count);
for (var i = 0; i < count; i++) result[i] = this.getItem (i);

return result;
});
$_M (cla$$, "getSelection", 
function () {
var indices = this.getSelectionIndices ();
var result =  new Array (indices.length);
for (var i = 0; i < indices.length; i++) {
result[i] = this.getItem (indices[i]);
}
return result;
});
$_M (cla$$, "getSelectionCount", 
function () {
return 0;
});
$_M (cla$$, "getSelectionIndex", 
function () {
return 0;
});
$_M (cla$$, "getSelectionIndices", 
function () {
return [this.handle.selectedIndex];
});
$_M (cla$$, "getTopIndex", 
function () {
return 0;
});
$_M (cla$$, "indexOf", 
function (string) {
return this.indexOf (string, 0);
}, "String");
$_M (cla$$, "indexOf", 
function (string, start) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (string.length == 0) {
var count = this.getItemCount ();
for (var i = start; i < count; i++) {
if (string.equals (this.getItem (i))) return i;
}
return -1;
}var index = start - 1;
var last;
return index;
}, "String,Number");
$_M (cla$$, "isSelected", 
function (index) {
return false;
}, "Number");
$_M (cla$$, "remove", 
function (indices) {
}, "Array");
$_M (cla$$, "remove", 
function (index) {
}, "Number");
$_M (cla$$, "remove", 
function (start, end) {
if (start > end) return ;
}, "Number,Number");
$_M (cla$$, "remove", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var index = this.indexOf (string, 0);
if (index == -1) this.error ($WT.ERROR_INVALID_ARGUMENT);
this.remove (index);
}, "String");
$_M (cla$$, "removeAll", 
function () {
});
$_M (cla$$, "removeSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Selection, listener);
this.eventTable.unhook ($WT.DefaultSelection, listener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "select", 
function (indices) {
if (indices == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var length = indices.length;
if (length == 0 || ((this.style & $WT.SINGLE) != 0 && length > 1)) return ;
this.select (indices, false);
}, "Array");
$_M (cla$$, "select", 
function (indices, scroll) {
var i = 0;
while (i < indices.length) {
var index = indices[i];
if (index != -1) {
this.select (index, false);
}i++;
}
if (scroll) this.showSelection ();
}, "Array,Boolean");
$_M (cla$$, "select", 
function (index) {
this.select (index, false);
}, "Number");
$_M (cla$$, "select", 
function (index, scroll) {
if (index < 0) return ;
}, "Number,Boolean");
$_M (cla$$, "select", 
function (start, end) {
if (end < 0 || start > end || ((this.style & $WT.SINGLE) != 0 && start != end)) return ;
if ((this.style & $WT.SINGLE) != 0) {
this.select (start, false);
} else {
this.select (start, end, false);
}}, "Number,Number");
$_M (cla$$, "select", 
function (start, end, scroll) {
if (start == end) {
this.select (start, scroll);
return ;
}if (scroll) this.showSelection ();
}, "Number,Number,Boolean");
$_M (cla$$, "selectAll", 
function () {
if ((this.style & $WT.SINGLE) != 0) return ;
});
$_V (cla$$, "setFont", 
function (font) {
}, "$wt.graphics.Font");
$_M (cla$$, "setItem", 
function (index, string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var topIndex = this.getTopIndex ();
var isSelected = this.isSelected (index);
this.remove (index);
this.add (string, index);
if (isSelected) this.select (index, false);
this.setTopIndex (topIndex);
}, "Number,String");
$_M (cla$$, "setItems", 
function (items) {
if (items == null) this.error ($WT.ERROR_NULL_ARGUMENT);
for (var j = this.handle.childNodes.length - 1; j >= 0; j++) {
this.handle.removeChild (this.handle.childNodes[j]);
}
for (var i = 0; i < items.length; i++) {
if (items[i] == null) this.error ($WT.ERROR_INVALID_ARGUMENT);
var it = document.createElement ("OPTION");
it.appendChild (document.createTextNode (items[i]));
it.value = items[i];
this.handle.appendChild (it);
}
}, "Array");
$_M (cla$$, "setSelection", 
function (indices) {
if (indices == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.deselectAll ();
var length = indices.length;
if (length == 0 || ((this.style & $WT.SINGLE) != 0 && length > 1)) return ;
this.select (indices, true);
if ((this.style & $WT.MULTI) != 0) {
var focusIndex = indices[0];
}}, "Array");
$_M (cla$$, "setSelection", 
function (items) {
if (items == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.deselectAll ();
var length = items.length;
if (length == 0 || ((this.style & $WT.SINGLE) != 0 && length > 1)) return ;
var focusIndex = -1;
for (var i = length - 1; i >= 0; --i) {
var string = items[i];
var index = 0;
if (string != null) {
var localFocus = -1;
while ((index = this.indexOf (string, index)) != -1) {
if (localFocus == -1) localFocus = index;
this.select (index, false);
if ((this.style & $WT.SINGLE) != 0 && this.isSelected (index)) {
this.showSelection ();
return ;
}index++;
}
if (localFocus != -1) focusIndex = localFocus;
}}
if ((this.style & $WT.MULTI) != 0) {
}}, "Array");
$_M (cla$$, "setSelection", 
function (index) {
this.deselectAll ();
this.select (index, true);
if ((this.style & $WT.MULTI) != 0) {
}}, "Number");
$_M (cla$$, "setSelection", 
function (start, end) {
this.deselectAll ();
if (end < 0 || start > end || ((this.style & $WT.SINGLE) != 0 && start != end)) return ;
if ((this.style & $WT.SINGLE) != 0) {
this.select (start, true);
} else {
this.select (start, end, true);
}}, "Number,Number");
$_M (cla$$, "setTopIndex", 
function (index) {
}, "Number");
$_M (cla$$, "showSelection", 
function () {
});
cla$$ = $_C (function () {
this.$back = false;
this.$forward = false;
this.navigate = false;
this.delaySetText = false;
this.html = null;
this.url = null;
$_Z (this, arguments);
}, $wt.browser, "Browser", $wt.widgets.Composite);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.browser.Browser, [parent, style & ($t$ = ~ $WT.BORDER, $WT.prototype.BORDER = $WT.BORDER, $t$)]);
}, "$wt.widgets.Composite,Number");
$_M (cla$$, "createWidget", 
function () {
$_U (this, $wt.browser.Browser, "createWidget", []);
this.handle = document.createElement ("IFRAME");
this.handle.style.position = "absolute";
this.handle.style.backgroundColor = "white";
if (this.handle.style.filter != null) {
this.handle.style.border = "2px solid menu";
}if (this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}});
$_M (cla$$, "setText", 
function (html) {
if (html == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
var blankLoading = this.html != null;
this.html = html;
if (blankLoading) return true;
if (this.handle != null) {
BrowserNative.iframeDocumentWrite (this.handle, html);
}this.html = null;
return true;
}, "String");
$_M (cla$$, "getUrl", 
function () {
return this.url;
});
$_M (cla$$, "refresh", 
function () {
if (this.handle != null) {
if (this.handle.contentWindow != null) {
this.handle.contentWindow.reload ();
} else {
this.handle.src = this.url;
}}});
$_M (cla$$, "back", 
function () {
if (!this.$back) return false;
if (this.handle != null && this.handle.contentWindow != null) {
try {
this.handle.contentWindow.history.back ();
this.$forward = true;
return true;
} catch (e) {
if ($_O (e, Error)) {
return false;
} else {
throw e;
}
}
}return false;
});
$_M (cla$$, "forward", 
function () {
if (!this.$forward) return false;
if (this.handle != null && this.handle.contentWindow != null) {
try {
this.handle.contentWindow.history.forward ();
return true;
} catch (e) {
if ($_O (e, Error)) {
return false;
} else {
throw e;
}
}
}return false;
});
$_M (cla$$, "isBackEnabled", 
function () {
return this.$back;
});
$_M (cla$$, "isForwardEnabled", 
function () {
return this.$forward;
});
$_M (cla$$, "setUrl", 
function (url) {
if (url == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
this.html = null;
this.url = url;
if (this.handle != null) {
if (this.handle.contentWindow != null) {
this.handle.contentWindow.location = url;
} else {
this.handle.src = url;
}}this.$back = true;
return true;
}, "String");
$_M (cla$$, "stop", 
function () {
if (this.handle != null) {
if (this.handle.contentWindow != null) {
this.handle.contentWindow.stop ();
} else {
}}});
$_M (cla$$, "setBounds", 
function (x, y, width, height) {
if (this.handle.style.filter != null) {
$_U (this, $wt.browser.Browser, "setBounds", [x, y, width - 2, height - 2]);
} else {
$_U (this, $wt.browser.Browser, "setBounds", [x, y, width - 4, height - 4]);
}}, "Number,Number,Number,Number");
$_S (cla$$,
"ABOUT_BLANK", "about:blank");
cla$$ = $_C (function () {
this.parent = null;
this.strings = null;
this.images = null;
this.index = 0;
this.checked = false;
this.grayed = false;
this.cached = false;
this.selected = false;
$_Z (this, arguments);
}, $wt.widgets, "TableItem", $wt.widgets.Item);
$_K (cla$$, 
function (parent, style) {
this.construct (parent, style, $wt.widgets.TableItem.checkNull (parent).getItemCount (), true);
}, "$wt.widgets.Table,Number");
$_K (cla$$, 
function (parent, style, index) {
this.construct (parent, style, index, true);
}, "$wt.widgets.Table,Number,Number");
$_K (cla$$, 
function (parent, style, index, create) {
$_R (this, $wt.widgets.TableItem, [parent, style]);
this.parent = parent;
if (create) parent.createItem (this, index);
}, "$wt.widgets.Table,Number,Number,Boolean");
cla$$.checkNull = $_M (cla$$, "checkNull", 
function (control) {
if (control == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
return control;
}, "$wt.widgets.Table");
$_M (cla$$, "setText", 
function (string) {
this.setText (0, string);
}, "String");
$_M (cla$$, "setText", 
function (strings) {
if (strings == null) this.error ($WT.ERROR_NULL_ARGUMENT);
for (var i = 0; i < strings.length; i++) {
var string = strings[i];
if (string != null) this.setText (i, string);
}
}, "Array");
$_M (cla$$, "setText", 
function (index, string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (index == 0) {
if (string.equals (this.text)) return ;
$_U (this, $wt.widgets.TableItem, "setText", [string]);
}var count = Math.max (1, this.parent.getColumnCount ());
if (0 > index || index > count - 1) return ;
if (this.strings == null && index != 0) this.strings =  new Array (count);
if (this.strings != null) {
if (string.equals (this.strings[index])) return ;
this.strings[index] = string;
}var tbodyTD = null;
if (index < this.handle.childNodes.length) {
if (this.handle.childNodes[index] != null && "TD".equals (this.handle.childNodes[index].nodeName)) {
tbodyTD = this.handle.childNodes[index];
}}if (tbodyTD == null) {
tbodyTD = document.createElement ("TD");
this.handle.appendChild (tbodyTD);
}if (tbodyTD.childNodes != null) {
for (var i = 0; i < tbodyTD.childNodes.length; i++) {
if (tbodyTD.childNodes[i] != null) {
tbodyTD.removeChild (tbodyTD.childNodes[i]);
}}
}var el = document.createElement ("DIV");
tbodyTD.appendChild (el);
el.className = "table-item-cell-default";
if (index == 0 && (this.parent.style & $WT.CHECK) != 0) {
var check = document.createElement ("INPUT");
check.type = "checkbox";
el.appendChild (check);
check.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.TableItem$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "TableItem$1", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
var e =  new $wt.widgets.Event ();
e.type = $WT.Selection;
e.detail = $WT.CHECK;
e.item = this.callbacks["$wt.widgets.TableItem"];
e.widget = this.callbacks["$wt.widgets.TableItem"];
this.callbacks["$wt.widgets.TableItem"].parent.sendEvent (e);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.TableItem$1, innerThis, finalVars);
}) (this, null));
}var text = document.createElement ("DIV");
el.appendChild (text);
text.className = "table-item-cell-text-default";
text.appendChild (document.createTextNode (string));
if ((this.parent.style & $WT.FULL_SELECTION) != 0 || index == 0) {
text.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.TableItem$2")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "TableItem$2", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
var evt = this.getEvent ();
this.callbacks["$wt.widgets.TableItem"].parent.toggleSelection (this.callbacks["$wt.widgets.TableItem"], evt.ctrlKey, evt.shiftKey);
var e =  new $wt.widgets.Event ();
e.type = $WT.Selection;
e.detail = $WT.NONE;
e.item = this.callbacks["$wt.widgets.TableItem"];
e.widget = this.callbacks["$wt.widgets.TableItem"];
this.callbacks["$wt.widgets.TableItem"].parent.sendEvent (e);
this.toReturn (false);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.TableItem$2, innerThis, finalVars);
}) (this, null));
text.ondblclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.TableItem$3")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "TableItem$3", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
var evt = this.getEvent ();
this.callbacks["$wt.widgets.TableItem"].parent.toggleSelection (this.callbacks["$wt.widgets.TableItem"], evt.ctrlKey, evt.shiftKey);
System.out.println ("An event is runned " + evt);
var e =  new $wt.widgets.Event ();
e.type = $WT.DefaultSelection;
e.detail = $WT.NONE;
e.item = this.callbacks["$wt.widgets.TableItem"];
e.widget = this.callbacks["$wt.widgets.TableItem"];
this.callbacks["$wt.widgets.TableItem"].parent.sendEvent (e);
this.toReturn (false);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.TableItem$3, innerThis, finalVars);
}) (this, null));
}}, "Number,String");
$_M (cla$$, "showSelection", 
function (selected) {
this.selected = selected;
var index = 0;
if ((this.parent.style & $WT.CHECK) != 0) {
index++;
}var element = this.handle.childNodes[0].childNodes[0].childNodes[index];
element.className = selected ? "table-item-cell-text-selected" : "table-item-cell-text-default";
}, "Boolean");
$_M (cla$$, "getText", 
function () {
return $_U (this, $wt.widgets.TableItem, "getText", []);
});
$_M (cla$$, "getText", 
function (index) {
if (index == 0) return this.getText ();
if (this.strings != null) {
if (0 <= index && index < this.strings.length) {
var string = this.strings[index];
return string != null ? string : "";
}}return "";
}, "Number");
$_M (cla$$, "setBackground", 
function (color) {
if (color != null && color.isDisposed ()) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}var pixel = -1;
if (color != null) {
this.handle.style.backgroundColor = color.getCSSHandle ();
}}, "$wt.graphics.Color");
$_M (cla$$, "setBackground", 
function (index, color) {
if (color != null && color.isDisposed ()) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}var count = Math.max (1, this.parent.getColumnCount ());
if (0 > index || index > count - 1) return ;
if (color != null) {
this.handle.childNodes[index].style.backgroundColor = color.getCSSHandle ();
}}, "Number,$wt.graphics.Color");
$_M (cla$$, "setForeground", 
function (color) {
if (color != null && color.isDisposed ()) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}var pixel = -1;
if (color != null) {
this.handle.style.color = color.getCSSHandle ();
}}, "$wt.graphics.Color");
$_M (cla$$, "setForeground", 
function (index, color) {
if (color != null && color.isDisposed ()) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}var count = Math.max (1, this.parent.getColumnCount ());
if (0 > index || index > count - 1) return ;
var pixel = -1;
if (color != null) {
this.handle.childNodes[index].style.color = color.getCSSHandle ();
}}, "Number,$wt.graphics.Color");
$_M (cla$$, "getBackground", 
function () {
return  new $wt.graphics.Color (this.display, this.handle.style.backgroundColor);
});
$_M (cla$$, "getBackground", 
function (index) {
var count = Math.max (1, this.parent.getColumnCount ());
if (0 > index || index > count - 1) return this.getBackground ();
return  new $wt.graphics.Color (this.display, this.handle.childNodes[index].style.backgroundColor);
}, "Number");
$_M (cla$$, "getForeground", 
function () {
return  new $wt.graphics.Color (this.display, this.handle.style.color);
});
$_M (cla$$, "getForeground", 
function (index) {
return  new $wt.graphics.Color (null, this.handle.childNodes[index].style.backgroundColor);
}, "Number");
$_M (cla$$, "redraw", 
function () {
if ((this.parent.style & $WT.VIRTUAL) != 0) this.cached = true;
var index = this.parent.indexOf (this);
if (index == -1) return ;
});
$_M (cla$$, "redraw", 
function (column, drawText, drawImage) {
if ((this.parent.style & $WT.VIRTUAL) != 0) this.cached = true;
}, "Number,Boolean,Boolean");
$_M (cla$$, "releaseHandle", 
function () {
this.parent = null;
$_U (this, $wt.widgets.TableItem, "releaseHandle", []);
});
$_M (cla$$, "isSelected", 
function () {
return this.selected;
});
cla$$ = $_C (function () {
this.parent = null;
this.resizable = false;
this.moveable = false;
$_Z (this, arguments);
}, $wt.widgets, "TableColumn", $wt.widgets.Item);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.TableColumn, [parent, $wt.widgets.TableColumn.checkStyle (style)]);
this.resizable = true;
this.parent = parent;
parent.createItem (this, parent.getColumnCount ());
}, "$wt.widgets.Table,Number");
$_K (cla$$, 
function (parent, style, index) {
$_R (this, $wt.widgets.TableColumn, [parent, $wt.widgets.TableColumn.checkStyle (style)]);
this.resizable = true;
this.parent = parent;
parent.createItem (this, index);
}, "$wt.widgets.Table,Number,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
return $wt.widgets.Widget.checkBits (style, $WT.LEFT, $WT.CENTER, $WT.RIGHT, 0, 0, 0);
}, "Number");
$_M (cla$$, "pack", 
function () {
});
$_M (cla$$, "setText", 
function (string) {
$_U (this, $wt.widgets.TableColumn, "setText", [string]);
if (this.handle.childNodes != null) {
for (var i = 0; i < this.handle.childNodes.length; i++) {
if (this.handle.childNodes[i] != null) {
this.handle.removeChild (this.handle.childNodes[i]);
}}
}this.handle.appendChild (document.createTextNode (string));
}, "String");
$_M (cla$$, "setWidth", 
function (width) {
var index = this.parent.indexOf (this);
if (index == -1) return ;
this.handle.style.width = width + "px";
}, "Number");
$_M (cla$$, "getWidth", 
function () {
var index = this.parent.indexOf (this);
if (index == -1) return 0;
if (this.handle.style.width != null && this.handle.style.width.length != 0) {
return Integer.parseInt (this.handle.style.width);
}return UIStringUtil.getContainerWidth (this.handle);
});
$_M (cla$$, "releaseHandle", 
function () {
this.parent = null;
$_U (this, $wt.widgets.TableColumn, "releaseHandle", []);
});
cla$$ = $_C (function () {
this.items = null;
this.columns = null;
this.lastSelection = null;
this.selection = null;
this.lastIndexOf = 0;
this.lastWidth = 0;
$_Z (this, arguments);
}, $wt.widgets, "Table", $wt.widgets.Composite);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Table, [parent, $wt.widgets.Table.checkStyle (style)]);
this.selection =  new Array (0);
this.items =  new Array (0);
this.columns =  new Array (0);
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
style |= $WT.H_SCROLL | $WT.V_SCROLL;
return $wt.widgets.Widget.checkBits (style, $WT.SINGLE, $WT.MULTI, 0, 0, 0, 0);
}, "Number");
$_M (cla$$, "createItem", 
function (column, index) {
if (this.columns == null) {
this.columns =  new Array (0);
}if (this.handle == null) {
return ;
}var table = this.handle.childNodes[0];
var thead = null;
for (var i = 0; i < table.childNodes.length; i++) {
if ("THEAD".equals (table.childNodes[i].nodeName)) {
thead = table.childNodes[i];
break;
}}
if (thead == null) {
thead = document.createElement ("THEAD");
thead.style.backgroundColor = "menu";
table.appendChild (thead);
}var theadTR = null;
if (thead.childNodes != null && thead.childNodes.length != 0) {
for (var i = 0; i < thead.childNodes.length; i++) {
if (thead.childNodes[i] != null && "TR".equals (thead.childNodes[i].nodeName)) {
theadTR = thead.childNodes[i];
}}
}if (theadTR == null) {
theadTR = document.createElement ("TR");
thead.appendChild (theadTR);
}var theadTD = document.createElement ("TD");
theadTD.style.whiteSpace = "nowrap";
if (index < 0 || index >= theadTR.childNodes.length) {
theadTR.appendChild (theadTD);
this.columns[index] = column;
} else {
theadTR.insertBefore (theadTD, theadTR.childNodes[index]);
for (var i = this.columns.length; i > index; i--) {
this.columns[i] = this.columns[i - 1];
}
this.columns[index] = column;
for (var i = 0; i < this.items.length; i++) {
var dataTD = document.createElement ("TD");
this.items[i].handle.insertBefore (dataTD, this.items[i].handle.childNodes[index]);
for (var j = this.items[i].strings.length; j > index; j--) {
this.items[i].strings[j] = this.items[i].strings[j - 1];
}
this.items[i].strings[index] = "";
}
}if (theadTD.childNodes != null) {
for (var i = 0; i < theadTD.childNodes.length; i++) {
if (theadTD.childNodes[i] != null) {
theadTD.removeChild (theadTD.childNodes[i]);
}}
}theadTD.appendChild (document.createTextNode (column.getText ()));
theadTD.style.margin = "0";
theadTD.style.padding = "0";
column.handle = theadTD;
}, "$wt.widgets.TableColumn,Number");
$_M (cla$$, "removeItems", 
function (indices) {
if (indices == null && indices.length > this.items.length) return ;
var table = this.handle.childNodes[0];
var tbody = null;
for (var i = 0; i < table.childNodes.length; i++) {
if ("TBODY".equals (table.childNodes[i].nodeName)) {
tbody = table.childNodes[i];
break;
}}
var count = this.items.length;
if (tbody == null) return ;
var last = -1;
var newItems =  new Array (this.items.length - indices.length);
for (var i = 0; i < indices.length; i++) {
var index = i;
if (index < 0 || index >= this.items.length) return ;
var item = this.items[index];
if (item == null) return ;
if (item != null) {
System.arraycopy (this.items, index + 1, this.items, index, --count - index);
this.items[count] = null;
last = index;
}tbody.removeChild (item.handle);
}
}, "Array");
$_M (cla$$, "createItem", 
function (item, index) {
if (this.items == null) {
this.items =  new Array (0);
}item.index = index;
this.items[index] = item;
if (this.handle == null) {
return ;
}var table = this.handle.childNodes[0];
var tbody = null;
for (var i = 0; i < table.childNodes.length; i++) {
if ("TBODY".equals (table.childNodes[i].nodeName)) {
tbody = table.childNodes[i];
break;
}}
if (tbody == null) {
tbody = document.createElement ("TBODY");
table.appendChild (tbody);
}var tbodyTR = document.createElement ("TR");
tbodyTR.className = "table-item-default";
if (index < 0 || index >= tbody.childNodes.length) {
tbody.appendChild (tbodyTR);
this.items[index] = item;
} else {
System.out.println ("existed");
tbody.insertBefore (tbodyTR, tbody.childNodes[index]);
for (var i = this.items.length; i > index; i--) {
this.items[i] = this.items[i - 1];
this.items[i].index = i;
}
this.items[index] = item;
}item.handle = tbodyTR;
}, "$wt.widgets.TableItem,Number");
$_M (cla$$, "getItemCount", 
function () {
if (this.items == null) {
return 0;
}return this.items.length;
});
$_M (cla$$, "getColumnCount", 
function () {
if (this.columns == null) {
return 0;
}return this.columns.length;
});
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.handle = document.createElement ("DIV");
this.handle.className = "table-default";
var table = document.createElement ("TABLE");
this.handle.appendChild (table);
if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}});
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var width = 0;
var height = 0;
var lineWidth = 0;
for (var i = 0; i < this.columns.length; i++) {
var maxWidth = 0;
var t = this.columns[i].getNameText ();
var columnWidth = this.getTextWidth (t);
maxWidth = Math.max (maxWidth, columnWidth);
for (var j = 0; j < this.items.length; j++) {
maxWidth = Math.max (maxWidth, this.getTextWidth (this.items[j].getText (i)));
}
lineWidth += maxWidth + 10;
}
width = lineWidth;
if (this.items.length > 0) {
var t = this.items[0].getNameText ();
System.out.println (t);
height = (UIStringUtil.calculatePlainStringLineHeight (t) + 5) * (this.items.length + 0);
} else {
height = 24;
}if (width == 0) width = $wt.widgets.Widget.DEFAULT_WIDTH;
if (height == 0) height = $wt.widgets.Widget.DEFAULT_HEIGHT;
if (wHint != $WT.DEFAULT) width = wHint;
if (hHint != $WT.DEFAULT) height = hHint;
var border = this.getBorderWidth ();
width += border * 2;
height += border * 2;
return  new $wt.graphics.Point (width, height);
}, "Number,Number,Boolean");
$_M (cla$$, "getTextWidth", 
($fz = function (t) {
var columnWidth = 0;
if (t == null || t.length == 0) {
columnWidth = 0;
} else {
columnWidth = UIStringUtil.calculatePlainStringLineWidth (t);
}return columnWidth;
}, $fz.isPrivate = true, $fz), "String");
$_M (cla$$, "setHeaderVisible", 
function (b) {
}, "Boolean");
$_M (cla$$, "setLinesVisible", 
function (b) {
}, "Boolean");
$_M (cla$$, "getColumn", 
function (index) {
return this.columns[index];
}, "Number");
$_M (cla$$, "getColumns", 
function () {
var count = this.columns.length;
if (count == 1 && this.columns[0] == null) count = 0;
var result =  new Array (count);
System.arraycopy (this.columns, 0, result, 0, count);
return result;
});
$_M (cla$$, "_getItem", 
function (index) {
if (this.items[index] != null) return this.items[index];
return this.items[index] =  new $wt.widgets.TableItem (this, $WT.NONE, -1, false);
}, "Number");
$_M (cla$$, "getItems", 
function () {
var count = this.items.length;
var result =  new Array (count);
if ((this.style & $WT.VIRTUAL) != 0) {
for (var i = 0; i < count; i++) {
result[i] = this._getItem (i);
}
} else {
System.arraycopy (this.items, 0, result, 0, count);
}return result;
});
$_M (cla$$, "getItem", 
function (index) {
var count = this.items.length;
if (!(0 <= index && index < count)) this.error ($WT.ERROR_INVALID_RANGE);
return this._getItem (index);
}, "Number");
$_M (cla$$, "getItem", 
function (point) {
return null;
}, "$wt.graphics.Point");
$_M (cla$$, "setTopIndex", 
function (index) {
}, "Number");
$_M (cla$$, "indexOf", 
function (column) {
if (column == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var count = this.columns.length;
for (var i = 0; i < count; i++) {
if (this.columns[i] == column) return i;
}
return -1;
}, "$wt.widgets.TableColumn");
$_M (cla$$, "indexOf", 
function (item) {
if (item == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var count = this.items.length;
if (1 <= this.lastIndexOf && this.lastIndexOf < count - 1) {
if (this.items[this.lastIndexOf] == item) return this.lastIndexOf;
if (this.items[this.lastIndexOf + 1] == item) return ++this.lastIndexOf;
if (this.items[this.lastIndexOf - 1] == item) return --this.lastIndexOf;
}if (this.lastIndexOf < Math.floor (count / 2)) {
for (var i = 0; i < count; i++) {
if (this.items[i] == item) return this.lastIndexOf = i;
}
} else {
for (var i = count - 1; i >= 0; --i) {
if (this.items[i] == item) return this.lastIndexOf = i;
}
}return -1;
}, "$wt.widgets.TableItem");
$_M (cla$$, "select", 
function (index) {
if (index < 0) return ;
this.deselectAll ();
this.items[index].showSelection (true);
this.selection =  new Array (1);
this.selection[0] = this.items[index];
}, "Number");
$_M (cla$$, "setSelection", 
function (index) {
this.deselectAll ();
this.select (index);
this.setFocusIndex (index);
}, "Number");
$_M (cla$$, "setSelection", 
function (start, end) {
this.deselectAll ();
if (end < 0 || start > end || ((this.style & $WT.SINGLE) != 0 && start != end)) return ;
var count = this.items.length;
if (count == 0 || start >= count) return ;
start = Math.max (0, start);
end = Math.min (end, count - 1);
this.select (start, end);
this.selection =  new Array (end - start + 1);
for (var i = start; i <= end; i++) {
this.selection[i - start] = this.items[i];
}
this.setFocusIndex (start);
this.showSelection ();
}, "Number,Number");
$_M (cla$$, "setFocusIndex", 
function (index) {
if (index < 0) return ;
}, "Number");
$_M (cla$$, "setSelection", 
function (items) {
if (items == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.deselectAll ();
var length = items.length;
if (length == 0 || ((this.style & $WT.SINGLE) != 0 && length > 1)) return ;
var focusIndex = -1;
this.selection = items;
for (var i = length - 1; i >= 0; --i) {
var index = this.indexOf (items[i]);
items[i].showSelection (true);
if (index != -1) {
focusIndex = index;
}}
if (focusIndex != -1) this.setFocusIndex (focusIndex);
this.showSelection ();
}, "Array");
$_M (cla$$, "select", 
function (start, end) {
if (end < 0 || start > end || ((this.style & $WT.SINGLE) != 0 && start != end)) return ;
var count = this.items.length;
if (count == 0 || start >= count) return ;
this.deselectAll ();
start = Math.max (0, start);
end = Math.min (end, count - 1);
if (start == 0 && end == count - 1) {
this.selectAll ();
} else {
this.selection =  new Array (end - start + 1);
for (var i = start; i <= end; i++) {
this.items[i].showSelection (true);
this.selection[i - start] = this.items[i];
}
}}, "Number,Number");
$_M (cla$$, "removeAll", 
function () {
this.remove (0, this.items.length - 1);
});
$_M (cla$$, "remove", 
function (start, end) {
var itemCount = this.items.length;
if (start > end) return ;
if (!(0 <= start && start <= end && end < itemCount)) {
return ;
}var table = this.handle.childNodes[0];
var tbody = null;
for (var i = 0; i < table.childNodes.length; i++) {
if ("TBODY".equals (table.childNodes[i].nodeName)) {
tbody = table.childNodes[i];
break;
}}
if (tbody == null) return ;
this.deselect (start, end);
var index = start;
while (index <= end) {
var item = this.items[index];
if (item != null && !item.isDisposed ()) {
tbody.removeChild (item.handle);
item.releaseHandle ();
}index++;
}
var newItems =  new Array (itemCount - (index - start));
System.arraycopy (this.items, 0, newItems, 0, start);
System.arraycopy (this.items, index, newItems, start, itemCount - index);
this.items = newItems;
}, "Number,Number");
$_M (cla$$, "remove", 
function (index) {
this.remove ([index]);
}, "Number");
$_M (cla$$, "remove", 
function (indices) {
if (indices == null || indices.length == 0) return ;
var newIndices =  $_A (indices.length, 0);
System.arraycopy (indices, 0, newIndices, 0, indices.length);
var table = this.handle.childNodes[0];
var tbody = null;
for (var i = 0; i < table.childNodes.length; i++) {
if ("TBODY".equals (table.childNodes[i].nodeName)) {
tbody = table.childNodes[i];
break;
}}
if (tbody == null) return ;
var start = newIndices[newIndices.length - 1];
var end = newIndices[0];
var count = this.items.length;
if (!(0 <= start && start <= end && end < count)) {
return ;
}this.deselect (indices);
var itemsToBeRemoved =  new Array (indices.length);
var last = -1;
for (var i = 0; i < newIndices.length; i++) {
var index = newIndices[i];
if (index != last) {
var item = this.items[index];
if (item != null) {
tbody.removeChild (item.handle);
item.releaseHandle ();
System.arraycopy (this.items, index + 1, this.items, index, --count - index);
this.items[count] = null;
last = index;
}}}
var newItems =  new Array (indices.length);
System.arraycopy (this.items, 0, newItems, 0, indices.length);
this.items = newItems;
}, "Array");
$_M (cla$$, "selectAll", 
function () {
if ((this.style & $WT.SINGLE) != 0) return ;
this.selection =  new Array (this.items.length);
for (var i = 0; i < this.items.length; i++) {
this.items[i].showSelection (true);
this.selection[i] = this.items[i];
}
});
$_M (cla$$, "deselect", 
function (indices) {
if (indices == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (indices.length == 0) return ;
for (var i = 0; i < indices.length; i++) {
if (indices[i] >= 0) {
this.items[indices[i]].showSelection (false);
}}
this.removeFromSelection (indices);
}, "Array");
$_M (cla$$, "removeFromSelection", 
($fz = function (indices) {
if (this.selection.length < indices.length) {
return ;
}var newSelection =  new Array (this.selection.length - indices.length);
var j = 0;
for (var i = 0; i < indices.length; i++) {
if (this.selection[i].isSelected ()) {
newSelection[j++] = this.selection[i];
}}
this.selection = newSelection;
}, $fz.isPrivate = true, $fz), "Array");
$_M (cla$$, "deselect", 
function (index) {
if (index < 0) return ;
this.items[index].showSelection (false);
this.removeFromSelection ([index]);
}, "Number");
$_M (cla$$, "deselect", 
function (start, end) {
var count = this.items.length;
if (start == 0 && end == count - 1) {
this.deselectAll ();
} else {
start = Math.max (0, start);
var indices =  $_A (end - start + 1, 0);
for (var i = start; i <= end; i++) {
this.items[i].showSelection (false);
indices[i - start] = i;
}
this.removeFromSelection (indices);
}}, "Number,Number");
$_M (cla$$, "deselectAll", 
function () {
for (var i = 0; i < this.items.length; i++) {
this.items[i].showSelection (false);
}
this.selection =  new Array (0);
});
$_M (cla$$, "clear", 
function (index) {
var count = this.items.length;
if (!(0 <= index && index < count)) this.error ($WT.ERROR_INVALID_RANGE);
var item = this.items[index];
}, "Number");
$_M (cla$$, "clear", 
function (start, end) {
}, "Number,Number");
$_M (cla$$, "clear", 
function (indices) {
}, "Array");
$_M (cla$$, "clearAll", 
function () {
});
$_M (cla$$, "getSelectionIndices", 
function () {
var result =  $_A (this.selection.length, 0);
for (var i = 0; i < this.selection.length; i++) {
result[i] = 0;
}
return result;
});
$_M (cla$$, "toggleSelection", 
function (item, isCtrlKeyHold, isShiftKeyHold) {
if (item == null) {
return false;
}if ((this.style & $WT.MULTI) != 0 && (isCtrlKeyHold || isShiftKeyHold)) {
if (isCtrlKeyHold) {
for (var i = 0; i < this.selection.length; i++) {
if (item == this.selection[i]) {
var newSelections =  new Array (this.selection.length);
for (var j = 0; j < i; j++) {
newSelections[j] = this.selection[j];
}
for (var j = i; j < this.selection.length - 1; j++) {
newSelections[j] = this.selection[j + 1];
}
this.selection = newSelections;
item.showSelection (false);
this.lastSelection = item;
return false;
}}
this.selection[this.selection.length] = item;
this.lastSelection = item;
item.showSelection (true);
} else {
for (var i = 0; i < this.selection.length; i++) {
if (this.selection[i] != null) {
this.selection[i].showSelection (false);
}}
if (this.lastSelection != null) {
var idx1 = Math.min (this.lastSelection.index, item.index);
var idx2 = Math.max (this.lastSelection.index, item.index);
System.out.println ("here!" + idx1 + ":" + idx2);
this.selection =  new Array (0);
for (var i = idx1; i <= idx2; i++) {
var ti = this.items[i];
this.selection[this.selection.length] = ti;
ti.showSelection (true);
}
return true;
} else {
if (this.selection.length != 1) {
this.selection =  new Array (1);
}this.selection[0] = item;
}}} else {
item.showSelection (true);
for (var i = 0; i < this.selection.length; i++) {
if (this.selection[i] != null && this.selection[i] != item) {
this.selection[i].showSelection (false);
}}
if (this.selection.length != 1) {
this.selection =  new Array (1);
}this.selection[0] = item;
}this.lastSelection = item;
return true;
}, "$wt.widgets.TableItem,Boolean,Boolean");
$_M (cla$$, "getSelection", 
function () {
return this.selection;
});
$_M (cla$$, "showSelection", 
function () {
});
$_M (cla$$, "checkData", 
function (item, redraw) {
if (item.cached) return true;
if ((this.style & $WT.VIRTUAL) != 0) {
item.cached = true;
var event =  new $wt.widgets.Event ();
event.item = item;
this.lastSelection = item;
this.sendEvent ($WT.SetData, event);
this.lastSelection = null;
if (this.isDisposed () || item.isDisposed ()) return false;
if (redraw) {
}}return true;
}, "$wt.widgets.TableItem,Boolean");
$_M (cla$$, "releaseHandle", 
function () {
if (this.columns != null) {
$wt.widgets.Display.releaseWidgetArray (this.columns);
this.columns = null;
}if (this.items != null) {
$wt.widgets.Display.releaseWidgetArray (this.items);
this.items = null;
}if (this.lastSelection != null) {
this.lastSelection = null;
}$_U (this, $wt.widgets.Table, "releaseHandle", []);
});
$_M (cla$$, "addSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Selection, typedListener);
this.addListener ($WT.DefaultSelection, typedListener);
}, "$wt.events.SelectionListener");
cla$$ = $_C (function () {
this.parent = null;
this.control = null;
this.toolTipText = null;
$_Z (this, arguments);
}, $wt.widgets, "TabItem", $wt.widgets.Item);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.TabItem, [parent, style]);
this.parent = parent;
parent.createItem (this, parent.getItemCount ());
this.configure ();
}, "$wt.widgets.TabFolder,Number");
$_K (cla$$, 
function (parent, style, index) {
$_R (this, $wt.widgets.TabItem, [parent, style]);
this.parent = parent;
parent.createItem (this, index);
this.configure ();
}, "$wt.widgets.TabFolder,Number,Number");
$_M (cla$$, "configure", 
($fz = function () {
this.handle.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.TabItem$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "TabItem$1", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
var items = this.callbacks["$wt.widgets.TabItem"].parent.items;
for (var i = 0; i < items.length; i++) {
var obj = this.callbacks["$wt.widgets.TabItem"];
var ctrl = items[i].control;
var selectedCSS = "tab-item-selected";
var index = items[i].handle.className.indexOf (selectedCSS);
if (obj == items[i]) {
this.callbacks["$wt.widgets.TabItem"].fixControlBounds (ctrl);
ctrl.setVisible (true);
if (index == -1) {
items[i].handle.className += " " + selectedCSS;
}} else {
ctrl.setVisible (false);
if (index != -1) {
items[i].handle.className = items[i].handle.className.substring (0, index) + items[i].handle.className.substring (index + selectedCSS.length);
}}}
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.TabItem$1, innerThis, finalVars);
}) (this, null));
}, $fz.isPrivate = true, $fz));
$_M (cla$$, "getControl", 
function () {
return this.control;
});
$_M (cla$$, "getParent", 
function () {
return this.parent;
});
$_M (cla$$, "getToolTipText", 
function () {
return this.toolTipText;
});
$_M (cla$$, "releaseChild", 
function () {
$_U (this, $wt.widgets.TabItem, "releaseChild", []);
var index = this.parent.indexOf (this);
if (index == this.parent.getSelectionIndex ()) {
if (this.control != null) this.control.setVisible (false);
}this.parent.destroyItem (this);
});
$_M (cla$$, "releaseWidget", 
function () {
$_U (this, $wt.widgets.TabItem, "releaseWidget", []);
this.control = null;
this.parent = null;
});
$_M (cla$$, "setControl", 
function (control) {
if (control != null) {
if (control.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
if (control.parent != this.parent) this.error ($WT.ERROR_INVALID_PARENT);
}if (this.control != null && this.control.isDisposed ()) {
this.control = null;
}var oldControl = this.control;
var newControl = control;
this.control = control;
var index = this.parent.indexOf (this);
if (index != this.parent.getSelectionIndex ()) {
if (newControl != null) newControl.setVisible (false);
return ;
}if (newControl != null) {
System.err.println (this.parent.getClientArea ());
newControl.setBounds (this.parent.getClientArea ());
this.fixControlBounds (newControl);
newControl.setVisible (true);
System.out.println ("here!");
}if (oldControl != null) oldControl.setVisible (false);
}, "$wt.widgets.Control");
$_M (cla$$, "fixControlBounds", 
function () {
this.fixControlBounds (this.control);
});
$_M (cla$$, "fixControlBounds", 
($fz = function (newControl) {
var b = this.parent.getBounds ();
b.height -= 24;
b.y = 24;
System.out.println (b);
newControl.setBounds (b);
}, $fz.isPrivate = true, $fz), "$wt.widgets.Control");
$_V (cla$$, "setImage", 
function (image) {
}, "$wt.graphics.Image");
$_M (cla$$, "setText", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var index = this.parent.indexOf (this);
if (index == -1) return ;
$_U (this, $wt.widgets.TabItem, "setText", [string]);
if (this.handle != null) {
this.handle.appendChild (document.createTextNode (string));
}}, "String");
$_M (cla$$, "setToolTipText", 
function (string) {
this.toolTipText = string;
}, "String");
$_M (cla$$, "releaseHandle", 
function () {
this.control = null;
this.parent = null;
$_U (this, $wt.widgets.TabItem, "releaseHandle", []);
});
cla$$ = $_C (function () {
this.items = null;
this.titles = null;
$_Z (this, arguments);
}, $wt.widgets, "TabFolder", $wt.widgets.Composite);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.TabFolder, [parent, $wt.widgets.TabFolder.checkStyle (style)]);
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
style = $wt.widgets.Widget.checkBits (style, $WT.TOP, $WT.BOTTOM, 0, 0, 0, 0);
return style & ~($WT.H_SCROLL | $WT.V_SCROLL);
}, "Number");
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var size = $_U (this, $wt.widgets.TabFolder, "computeSize", [wHint, hHint, changed]);
var border = this.getBorderWidth ();
size.x += this.items.length * 32;
size.y += 24;
System.out.println ("in tab folder" + size);
return size;
}, "Number,Number,Boolean");
$_M (cla$$, "createItem", 
function (item, index) {
var count = this.items.length;
var tab = document.createElement ("DIV");
tab.className = "tab-item-default";
this.titles.appendChild (tab);
tab.appendChild (document.createTextNode (item.getNameText ()));
item.handle = tab;
this.items[index] = item;
if (count == 0) {
tab.className += " tab-item-selected";
var event =  new $wt.widgets.Event ();
event.item = this.items[0];
this.sendEvent ($WT.Selection, event);
}}, "$wt.widgets.TabItem,Number");
$_V (cla$$, "createWidget", 
function () {
this.register ();
System.err.println ("...." + this.handle);
this.items =  new Array (0);
this.handle = document.createElement ("DIV");
if (this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}this.handle.className = "tab-folder-default";
if ((this.style & $WT.BORDER) != 0) {
this.handle.className += " tab-folder-border";
}this.titles = document.createElement ("DIV");
this.titles.className = "tab-folder-title-default";
this.handle.appendChild (this.titles);
var outerFrame = document.createElement ("DIV");
outerFrame.className = "tab-folder-seperator";
this.handle.appendChild (outerFrame);
});
$_M (cla$$, "setBounds", 
function (x, y, width, height) {
$_U (this, $wt.widgets.TabFolder, "setBounds", [x, y, width, height]);
var idx = this.getSelectionIndex ();
this.items[idx].fixControlBounds ();
}, "Number,Number,Number,Number");
$_V (cla$$, "minimumSize", 
function (wHint, hHint, changed) {
var size =  new $wt.graphics.Point (64, 48);
for (var i = 0; i < this.items.length; i++) {
var tabItem = this.items[i];
if (tabItem != null) {
var text = tabItem.getNameText ();
if (text != null && text.length != 0) {
size.x += UIStringUtil.calculatePlainStringLineWidth (text);
}}}
if (size.x == 0) size.x = $wt.widgets.Widget.DEFAULT_WIDTH;
if (size.y == 0) size.y = $wt.widgets.Widget.DEFAULT_HEIGHT;
if (wHint != $WT.DEFAULT) size.x = wHint;
if (hHint != $WT.DEFAULT) size.y = hHint;
System.out.println ("=====" + size);
return size;
}, "Number,Number,Boolean");
$_M (cla$$, "setSize", 
function (width, height) {
$_U (this, $wt.widgets.TabFolder, "setSize", [width, height]);
var idx = this.getSelectionIndex ();
this.items[idx].fixControlBounds ();
}, "Number,Number");
$_M (cla$$, "destroyItem", 
function (item) {
}, "$wt.widgets.TabItem");
$_M (cla$$, "getItem", 
function (index) {
return this.items[index];
}, "Number");
$_M (cla$$, "getItemCount", 
function () {
return this.items.length;
});
$_M (cla$$, "getItems", 
function () {
var count = this.getItemCount ();
var result =  new Array (count);
System.arraycopy (this.items, 0, result, 0, count);
return result;
});
$_M (cla$$, "indexOf", 
function (item) {
if (item == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var count = this.getItemCount ();
for (var i = 0; i < count; i++) {
if (this.items[i] == item) return i;
}
System.out.println ("-1 returned");
return -1;
}, "$wt.widgets.TabItem");
$_M (cla$$, "getSelection", 
function () {
var index = this.getSelectionIndex ();
if (index == -1) return  new Array (0);
return [this.items[index]];
});
$_M (cla$$, "getSelectionIndex", 
function () {
for (var i = 0; i < this.items.length; i++) {
if (this.items[i] != null && this.items[i].handle != null && this.items[i].handle.className != null && this.items[i].handle.className.indexOf ("selected") != -1) {
return i;
}}
return 0;
});
$_M (cla$$, "releaseHandle", 
function () {
if (this.items != null) {
$wt.widgets.Display.releaseWidgetArray (this.items);
this.items = null;
}$_U (this, $wt.widgets.TabFolder, "releaseHandle", []);
});
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.widgets, "Combo", $wt.widgets.Composite);
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
style &= ($t$ = ~ $WT.BORDER, $WT.prototype.BORDER = $WT.BORDER, $t$);
style &= ~($WT.H_SCROLL | $WT.V_SCROLL);
style = $wt.widgets.Widget.checkBits (style, $WT.DROP_DOWN, $WT.SIMPLE, 0, 0, 0, 0);
if ((style & $WT.SIMPLE) != 0) return style & ($t$ = ~ $WT.READ_ONLY, $WT.prototype.READ_ONLY = $WT.READ_ONLY, $t$);
return style;
}, "Number");
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Combo, [parent, $wt.widgets.Combo.checkStyle (style)]);
}, "$wt.widgets.Composite,Number");
$_M (cla$$, "add", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.handle != null) {
this.handle.options[this.handle.options.length] =  new Option (string, string);
}}, "String");
$_M (cla$$, "add", 
function (string, index) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.handle != null) {
this.handle.options[index] =  new Option (string, string);
}}, "String,Number");
$_M (cla$$, "addModifyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Modify, typedListener);
}, "$wt.events.ModifyListener");
$_M (cla$$, "addSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Selection, typedListener);
this.addListener ($WT.DefaultSelection, typedListener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "addVerifyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Verify, typedListener);
}, "$wt.events.VerifyListener");
$_M (cla$$, "removeModifyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Modify, listener);
}, "$wt.events.ModifyListener");
$_M (cla$$, "removeSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Selection, listener);
this.eventTable.unhook ($WT.DefaultSelection, listener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "removeVerifyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Verify, listener);
}, "$wt.events.VerifyListener");
$_M (cla$$, "setItem", 
function (index, string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.isDisposed ()) return ;
this.add (string, index);
}, "Number,String");
$_M (cla$$, "setItems", 
function (items) {
if (items == null) this.error ($WT.ERROR_NULL_ARGUMENT);
for (var i = 0; i < items.length; i++) {
if (items[i] == null) this.error ($WT.ERROR_INVALID_ARGUMENT);
}
for (var i = 0; i < items.length; i++) {
var string = items[i];
this.add (string);
}
this.sendEvent ($WT.Modify);
}, "Array");
$_V (cla$$, "createWidget", 
function () {
this.handle = document.createElement ("SELECT");
if (this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}});
cla$$ = $_C (function () {
this.groupText = null;
this.title = null;
this.titleBody = null;
$_Z (this, arguments);
}, $wt.widgets, "Group", $wt.widgets.Composite);
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
style |= $WT.NO_FOCUS;
return style & ~($WT.H_SCROLL | $WT.V_SCROLL);
}, "Number");
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Group, [parent, $wt.widgets.Group.checkStyle (style)]);
}, "$wt.widgets.Composite,Number");
$_M (cla$$, "getText", 
function () {
return this.groupText;
});
$_M (cla$$, "setText", 
function (string) {
this.groupText = string;
this.title.appendChild (document.createTextNode (string));
this.title.nextSibling.appendChild (document.createTextNode (string));
}, "String");
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.handle = document.createElement ("DIV");
if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}this.handle.className = "group-body-default";
if ((this.style & $WT.SHADOW_ETCHED_IN) != 0) {
this.handle.className += " group-shadow-etched-in";
} else if ((this.style & $WT.SHADOW_ETCHED_OUT) != 0) {
this.handle.className += " group-shadow-etched-out";
} else if ((this.style & $WT.SHADOW_IN) != 0) {
this.handle.className += " group-shadow-in";
} else if ((this.style & $WT.SHADOW_OUT) != 0) {
this.handle.className += " group-shadow-out";
} else if ((this.style & $WT.SHADOW_NONE) != 0) {
this.handle.className += " group-shadow-none";
}this.titleBody = document.createElement ("DIV");
this.titleBody.className = "group-title-body-default";
this.handle.appendChild (this.titleBody);
var titleBlock = document.createElement ("DIV");
titleBlock.className = "group-title-block-default";
this.handle.appendChild (titleBlock);
var titleBlockBG = document.createElement ("DIV");
titleBlockBG.className = "group-title-block-ground-default";
titleBlock.appendChild (titleBlockBG);
this.title = document.createElement ("DIV");
this.title.className = "group-title-text-default";
this.title.style.position = "absolute";
titleBlock.appendChild (this.title);
var titleDuplicate = document.createElement ("DIV");
titleDuplicate.className = "group-title-text-default";
titleBlock.appendChild (titleDuplicate);
});
$_M (cla$$, "setSize", 
function (width, height) {
$_U (this, $wt.widgets.Group, "setSize", [width, height]);
this.titleBody.style.width = width + "px";
System.out.println ("setSize");
}, "Number,Number");
$_M (cla$$, "setLocation", 
function (x, y) {
$_U (this, $wt.widgets.Group, "setLocation", [x, y]);
this.handle.style.top = (y + 20) + "px";
System.out.println ("setLocation");
}, "Number,Number");
$_M (cla$$, "setBounds", 
function (x, y, width, height) {
$_U (this, $wt.widgets.Group, "setBounds", [x, y, width, height]);
this.titleBody.style.width = width + "px";
this.handle.style.top = (y + 20) + "px";
System.out.println ("setBounds");
}, "Number,Number,Number,Number");
cla$$ = $_C (function () {
this.parent = null;
this.parentItem = null;
this.index = 0;
this.expandStatus = false;
this.strings = null;
this.checkElement = null;
$_Z (this, arguments);
}, $wt.widgets, "TreeItem", $wt.widgets.Item);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.TreeItem, [parent, style]);
this.parent = parent;
parent.createItem (this, null, -1);
}, "$wt.widgets.Tree,Number");
$_K (cla$$, 
function (parent, style, index) {
$_R (this, $wt.widgets.TreeItem, [parent, style]);
if (index < 0) this.error ($WT.ERROR_INVALID_RANGE);
this.parent = parent;
parent.createItem (this, null, index);
}, "$wt.widgets.Tree,Number,Number");
$_K (cla$$, 
function (parentItem, style) {
$_R (this, $wt.widgets.TreeItem, [parentItem.parent, style]);
this.parent = parentItem.parent;
this.parentItem = parentItem;
this.parent.createItem (this, parentItem.handle, -1);
}, "$wt.widgets.TreeItem,Number");
$_K (cla$$, 
function (parentItem, style, index) {
$_R (this, $wt.widgets.TreeItem, [parentItem.parent, style]);
if (index < 0) this.error ($WT.ERROR_INVALID_RANGE);
this.parent = parentItem.parent;
this.parentItem = parentItem;
this.parent.createItem (this, parentItem.handle, index);
}, "$wt.widgets.TreeItem,Number,Number");
$_M (cla$$, "setText", 
function (index, string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (index == 0) {
if (string.equals (this.text)) return ;
$_U (this, $wt.widgets.TreeItem, "setText", [string]);
}var count = Math.max (1, this.parent.getColumnCount ());
if (0 > index || index > count - 1) return ;
if (this.strings == null && index != 0) this.strings =  new Array (count);
if (this.strings != null) {
if (string.equals (this.strings[index])) return ;
this.strings[index] = string;
}if (index == 0) {
}var tbodyTD = null;
if (index < this.handle.childNodes.length) {
if (this.handle.childNodes[index] != null && "TD".equals (this.handle.childNodes[index].nodeName)) {
tbodyTD = this.handle.childNodes[index];
}}if (tbodyTD == null) {
tbodyTD = document.createElement ("TD");
this.handle.appendChild (tbodyTD);
}if (tbodyTD.childNodes != null) {
for (var i = 0; i < tbodyTD.childNodes.length; i++) {
if (tbodyTD.childNodes[i] != null) {
tbodyTD.removeChild (tbodyTD.childNodes[i]);
}}
}var hItem = document.createElement ("DIV");
hItem.className = "tree-item-default";
var hAnchor = document.createElement ("DIV");
hAnchor.className = "tree-item-anchor-default";
hAnchor.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.TreeItem$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "TreeItem$1", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
this.callbacks["$wt.widgets.TreeItem"].toggleExpandStatus ();
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.TreeItem$1, innerThis, finalVars);
}) (this, null));
hAnchor.appendChild (document.createTextNode ("" + String.fromCharCode (160)));
hItem.appendChild (hAnchor);
if ((this.parent.style & $WT.CHECK) != 0) {
this.checkElement = document.createElement ("INPUT");
this.checkElement.type = "checkbox";
hItem.appendChild (this.checkElement);
this.checkElement.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.TreeItem$2")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "TreeItem$2", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
var e =  new $wt.widgets.Event ();
e.type = $WT.Selection;
e.detail = $WT.CHECK;
e.item = this.callbacks["$wt.widgets.TreeItem"];
e.widget = this.callbacks["$wt.widgets.TreeItem"];
this.callbacks["$wt.widgets.TreeItem"].parent.sendEvent (e);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.TreeItem$2, innerThis, finalVars);
}) (this, null));
}var s = (index == 0) ? this.getText () : this.strings[index];
var text = document.createElement ("DIV");
text.className = "tree-item-text-default";
text.appendChild (document.createTextNode (s));
text.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.TreeItem$3")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "TreeItem$3", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
var evt = this.getEvent ();
this.callbacks["$wt.widgets.TreeItem"].parent.toggleSelection (this.callbacks["$wt.widgets.TreeItem"], evt.ctrlKey, evt.shiftKey);
var e =  new $wt.widgets.Event ();
e.type = $WT.Selection;
e.detail = $WT.NONE;
e.item = this.callbacks["$wt.widgets.TreeItem"];
e.widget = this.callbacks["$wt.widgets.TreeItem"];
this.callbacks["$wt.widgets.TreeItem"].parent.sendEvent (e);
this.toReturn (false);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.TreeItem$3, innerThis, finalVars);
}) (this, null));
text.ondblclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.TreeItem$4")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "TreeItem$4", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
this.callbacks["$wt.widgets.TreeItem"].toggleExpandStatus ();
this.toReturn (false);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.TreeItem$4, innerThis, finalVars);
}) (this, null));
text.onselectstart = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.TreeItem$5")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "TreeItem$5", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
this.toReturn (false);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.TreeItem$5, innerThis, finalVars);
}) (this, null));
hItem.appendChild (text);
var pItem = this.parentItem;
var padding = 0;
while (pItem != null) {
pItem = pItem.parentItem;
padding += 20;
}
hItem.style.marginLeft = padding + "px";
tbodyTD.appendChild (hItem);
}, "Number,String");
$_M (cla$$, "showSelection", 
function (selected) {
var index = 1;
if ((this.parent.style & $WT.CHECK) != 0) {
index++;
}var element = this.handle.childNodes[0].childNodes[0].childNodes[index];
element.className = selected ? "tree-item-text-selected" : "tree-item-text-default";
}, "Boolean");
$_M (cla$$, "setText", 
function (string) {
this.setText (0, string);
}, "String");
$_M (cla$$, "setText", 
function (strings) {
if (strings == null) this.error ($WT.ERROR_NULL_ARGUMENT);
for (var i = 0; i < strings.length; i++) {
var string = strings[i];
if (string != null) this.setText (i, string);
}
}, "Array");
$_M (cla$$, "getItems", 
function () {
System.out.println ("index: " + this.index);
return this.parent.getItems (this.index);
});
$_M (cla$$, "toggleExpandStatus", 
function () {
var clazzName = this.handle.childNodes[0].childNodes[0].childNodes[0].className;
var type = 0;
if (clazzName == null) {
type = 0;
} else if (clazzName.indexOf ("expanded") != -1) {
type = -1;
} else if (clazzName.indexOf ("collapsed") != -1) {
type = 1;
}if (type == 0) {
return ;
}var toExpand = type >= 0;
this.setExpanded (toExpand);
var e =  new $wt.widgets.Event ();
e.type = toExpand ? $WT.Expand : $WT.Collapse;
e.item = this;
e.widget = this;
this.parent.sendEvent (e);
});
$_M (cla$$, "updateModifier", 
function (type) {
var element = this.handle.childNodes[0].childNodes[0].childNodes[0];
if (type == -1) {
element.className = "tree-item-anchor-collapsed";
return false;
} else if (type == 1) {
element.className = "tree-item-anchor-expanded";
return true;
} else {
element.className = "tree-item-anchor-default";
return true;
}}, "Number");
$_M (cla$$, "setExpanded", 
function (expanded) {
this.expandStatus = expanded;
var items = this.parent.getDescendantItems (this.index);
for (var i = 0; i < items.length; i++) {
if (items[i].parentItem == this) {
items[i].expandStatus = this.expandStatus;
}if (items[i].expandStatus) {
items[i].handle.style.display = expanded ? "" : "none";
} else {
items[i].handle.style.display = "none";
}}
if (items.length == 0) {
this.updateModifier (0);
} else {
this.updateModifier (expanded ? 1 : -1);
}}, "Boolean");
$_M (cla$$, "getParentItem", 
function () {
return this.parentItem;
});
$_M (cla$$, "getGrayed", 
function () {
if ((this.parent.style & $WT.CHECK) == 0) return false;
if (this.checkElement != null) {
return this.checkElement.checked;
}return true;
});
$_M (cla$$, "setGrayed", 
function (grayed) {
if ((this.parent.style & $WT.CHECK) == 0) return ;
if (this.checkElement != null) {
this.checkElement.checked = grayed;
}}, "Boolean");
$_M (cla$$, "getChecked", 
function () {
if ((this.parent.style & $WT.CHECK) == 0) return false;
if (this.checkElement != null) {
return this.checkElement.checked;
}return false;
});
$_M (cla$$, "setChecked", 
function (checked) {
if ((this.parent.style & $WT.CHECK) == 0) return ;
if (this.checkElement != null) {
this.checkElement.checked = checked;
}}, "Boolean");
$_M (cla$$, "indexOf", 
function (item) {
if (item == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (item.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
return this.parent.indexOf (this.index, item);
}, "$wt.widgets.TreeItem");
$_M (cla$$, "releaseHandle", 
function () {
this.parent = null;
this.parentItem = null;
$_U (this, $wt.widgets.TreeItem, "releaseHandle", []);
});
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.widgets, "TreeColumn", $wt.widgets.Item);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.TreeColumn, [parent, style]);
}, "$wt.widgets.Widget,Number");
$_K (cla$$, 
function (parent, style, index) {
$_R (this, $wt.widgets.TreeColumn, [parent, style, index]);
}, "$wt.widgets.Widget,Number,Number");
cla$$ = $_C (function () {
this.items = null;
this.columns = null;
this.selections = null;
this.lastSelection = null;
this.hwndParent = null;
this.hwndHeader = null;
this.hAnchor = null;
this.hInsert = null;
$_Z (this, arguments);
}, $wt.widgets, "Tree", $wt.widgets.Composite);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Tree, [parent, $wt.widgets.Tree.checkStyle (style)]);
this.selections =  new Array (0);
this.items =  new Array (0);
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
style |= $WT.H_SCROLL | $WT.V_SCROLL;
return $wt.widgets.Widget.checkBits (style, $WT.SINGLE, $WT.MULTI, 0, 0, 0, 0);
}, "Number");
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.handle = document.createElement ("DIV");
if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}this.handle.className = "tree-default";
if ((this.style & $WT.BORDER) != 0) {
this.handle.className += " tree-border";
}var table = document.createElement ("TABLE");
table.style.backgroundColor = "white";
this.handle.appendChild (table);
});
$_M (cla$$, "createItem", 
function (column, index) {
if (this.hwndHeader == null) this.createParent ();
}, "$wt.widgets.TreeColumn,Number");
$_M (cla$$, "toggleSelection", 
function (item, isCtrlKeyHold, isShiftKeyHold) {
if (item == null) {
return false;
}if ((this.style & $WT.MULTI) != 0 && (isCtrlKeyHold || isShiftKeyHold)) {
if (isCtrlKeyHold) {
for (var i = 0; i < this.selections.length; i++) {
if (item == this.selections[i]) {
var newSelections =  new Array (this.selections.length);
for (var j = 0; j < i; j++) {
newSelections[j] = this.selections[j];
}
for (var j = i; j < this.selections.length - 1; j++) {
newSelections[j] = this.selections[j + 1];
}
this.selections = newSelections;
item.showSelection (false);
this.lastSelection = item;
return false;
}}
this.selections[this.selections.length] = item;
this.lastSelection = item;
item.showSelection (true);
} else {
for (var i = 0; i < this.selections.length; i++) {
if (this.selections[i] != null) {
this.selections[i].showSelection (false);
}}
if (this.lastSelection != null) {
var idx1 = Math.min (this.lastSelection.index, item.index);
var idx2 = Math.max (this.lastSelection.index, item.index);
this.selections =  new Array (0);
for (var i = idx1; i <= idx2; i++) {
var ti = this.items[i];
if (ti.handle.style.display != "none") {
this.selections[this.selections.length] = ti;
ti.showSelection (true);
}}
return true;
} else {
if (this.selections.length != 1) {
this.selections =  new Array (1);
}this.selections[0] = item;
}}} else {
item.showSelection (true);
for (var i = 0; i < this.selections.length; i++) {
if (this.selections[i] != null && this.selections[i] != item) {
this.selections[i].showSelection (false);
}}
if (this.selections.length != 1) {
this.selections =  new Array (1);
}this.selections[0] = item;
}this.lastSelection = item;
return true;
}, "$wt.widgets.TreeItem,Boolean,Boolean");
$_M (cla$$, "skipItems", 
function (index) {
var parentItem = this.items[index];
index++;
while (this.items[index] != null) {
var item = this.items[index];
if (item.parentItem != parentItem) {
if (item.parentItem == this.items[index - 1]) {
index = this.skipItems (index - 1);
if (index == -1) {
return -1;
}var ti = this.items[index];
var outOfHierarchies = true;
while (ti != null) {
ti = ti.parentItem;
if (ti == parentItem) {
outOfHierarchies = false;
break;
}}
if (outOfHierarchies) {
return index;
}} else {
return index;
}}index++;
}
return -1;
}, "Number");
$_M (cla$$, "getDescendantItems", 
function (index) {
var nextSiblingIdx = this.findNextSiblingItem (index);
if (nextSiblingIdx == -1) {
nextSiblingIdx = this.items.length;
}var children =  new Array (nextSiblingIdx - index - 1);
for (var i = index + 1; i < nextSiblingIdx; i++) {
children[i - index - 1] = this.items[i];
}
return children;
}, "Number");
$_M (cla$$, "getItems", 
function () {
var copiedItems =  new Array (0);
for (var i = 0; i < this.items.length; i++) {
if (this.items[i] != null && this.items[i].parentItem == null) {
copiedItems[copiedItems.length] = this.items[i];
}}
return copiedItems;
});
$_M (cla$$, "indexOf", 
function (parentIndex, ti) {
var index = 0;
if (parentIndex < 0) {
if (ti.parentItem != null) {
return -1;
}for (var i = 0; i < this.items.length; i++) {
if (this.items[i] == ti) {
return index;
} else if (this.items[i].parentItem == null) {
index++;
}}
return -1;
}var parentItem = this.items[parentIndex];
parentIndex++;
while (this.items[parentIndex] != null) {
var item = this.items[parentIndex];
if (item.parentItem != parentItem) {
if (item.parentItem == this.items[parentIndex - 1]) {
parentIndex = this.skipItems (parentIndex - 1);
if (parentIndex == -1) {
return -1;
}if (this.items[parentIndex].parentItem == parentItem.parentItem) {
return -1;
} else {
if (this.items[parentIndex] == ti) {
return index;
}index++;
}} else {
return -1;
}} else {
if (item == ti) {
return index;
}index++;
}parentIndex++;
}
return -1;
}, "Number,$wt.widgets.TreeItem");
$_M (cla$$, "getItems", 
function (parentIndex) {
var children =  new Array (0);
if (parentIndex < 0) {
parentIndex = 0;
}var parentItem = this.items[parentIndex];
parentIndex++;
while (this.items[parentIndex] != null) {
var item = this.items[parentIndex];
if (item.parentItem != parentItem) {
if (item.parentItem == this.items[parentIndex - 1]) {
parentIndex = this.skipItems (parentIndex - 1);
if (parentIndex == -1) {
return children;
}if (this.items[parentIndex].parentItem == parentItem.parentItem) {
return children;
} else {
children[children.length] = this.items[parentIndex];
}} else {
return children;
}} else {
children[children.length] = item;
}parentIndex++;
}
return children;
}, "Number");
$_M (cla$$, "findItem", 
function (parentIndex, index) {
if (parentIndex < 0) {
for (var i = 0; i < this.items.length; i++) {
if (this.items[i].parentItem == null) {
if (index == 0) {
return i;
}index--;
}}
return -1;
}var parentItem = this.items[parentIndex];
parentIndex++;
while (this.items[parentIndex] != null) {
var item = this.items[parentIndex];
if (item.parentItem != parentItem) {
if (item.parentItem == this.items[parentIndex - 1]) {
parentIndex = this.skipItems (parentIndex - 1);
if (parentIndex == -1) {
return -1;
}} else {
return -1;
}} else {
if (index == 0) {
return parentIndex;
}index--;
}parentIndex++;
}
return -1;
}, "Number,Number");
$_M (cla$$, "findNextSiblingItem", 
function (parentIndex) {
if (parentIndex < 0) {
parentIndex = 0;
}var parentItem = this.items[parentIndex];
parentIndex++;
if (this.items[parentIndex] != null) {
var item = this.items[parentIndex];
if (item.parentItem != parentItem.parentItem) {
if (item.parentItem == this.items[parentIndex - 1]) {
parentIndex = this.skipItems (parentIndex - 1);
if (parentIndex == -1) {
return -1;
}var ti = this.items[parentIndex];
var outOfHierarchies = true;
while (ti != null) {
ti = ti.parentItem;
if (ti == parentItem) {
outOfHierarchies = false;
break;
}}
if (outOfHierarchies) {
return parentIndex;
}} else {
return parentIndex;
}} else {
return parentIndex;
}}return -1;
}, "Number");
$_M (cla$$, "createItem", 
function (item, hParent, index) {
if (this.items == null) {
this.items =  new Array (0);
}var table = this.handle.childNodes[0];
var tbody = null;
for (var i = 0; i < table.childNodes.length; i++) {
if ("TBODY".equals (table.childNodes[i].nodeName)) {
tbody = table.childNodes[i];
break;
}}
if (tbody == null) {
tbody = document.createElement ("TBODY");
table.appendChild (tbody);
}var idx = -1;
if (hParent != null) {
for (var i = 0; i < tbody.childNodes.length; i++) {
if (tbody.childNodes[i] == hParent) {
idx = i;
break;
}}
}var newTR = document.createElement ("TR");
item.handle = newTR;
var existedIndex = -1;
if (index >= 0) {
existedIndex = this.findItem (idx, index);
if (existedIndex != -1) {
tbody.insertBefore (newTR, tbody.childNodes[existedIndex]);
for (var i = this.items.length; i > existedIndex; i--) {
this.items[i] = this.items[i - 1];
this.items[i].index = i;
}
item.index = existedIndex;
this.items[existedIndex] = item;
}}if (existedIndex == -1) {
if (idx < 0) {
tbody.appendChild (newTR);
item.index = this.items.length;
this.items[this.items.length] = item;
} else {
var siblingIndex = this.findNextSiblingItem (idx);
if (siblingIndex == -1) {
tbody.appendChild (newTR);
item.index = this.items.length;
this.items[this.items.length] = item;
} else {
tbody.insertBefore (newTR, tbody.childNodes[siblingIndex]);
for (var i = this.items.length; i > siblingIndex; i--) {
this.items[i] = this.items[i - 1];
this.items[i].index = i;
}
item.index = siblingIndex;
this.items[siblingIndex] = item;
}}}if (item.parentItem != null) {
item.handle.style.display = "none";
item.parentItem.updateModifier (-1);
}}, "$wt.widgets.TreeItem,Object,Number");
$_M (cla$$, "createParent", 
function () {
});
$_M (cla$$, "getColumnCount", 
function () {
if (this.hwndHeader == null) return 0;
return 0;
});
$_M (cla$$, "getSelection", 
function () {
return this.selections;
});
$_M (cla$$, "setSelection", 
function (items) {
if (items == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var length = items.length;
if (length == 0 || ((this.style & $WT.SINGLE) != 0 && length > 1)) {
this.deselectAll ();
return ;
}this.selections = items;
for (var i = 0; i < items.length; i++) {
items[i].showSelection (true);
}
}, "Array");
$_M (cla$$, "deselectAll", 
function () {
for (var i = 0; i < this.selections.length; i++) {
this.selections[i].showSelection (false);
}
});
$_M (cla$$, "addSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Selection, typedListener);
this.addListener ($WT.DefaultSelection, typedListener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "addTreeListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Expand, typedListener);
this.addListener ($WT.Collapse, typedListener);
}, "$wt.events.TreeListener");
$_M (cla$$, "removeSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.eventTable.unhook ($WT.Selection, listener);
this.eventTable.unhook ($WT.DefaultSelection, listener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "removeTreeListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Expand, listener);
this.eventTable.unhook ($WT.Collapse, listener);
}, "$wt.events.TreeListener");
$_M (cla$$, "getItem", 
function (point) {
return null;
}, "$wt.graphics.Point");
$_M (cla$$, "indexOf", 
function (item) {
if (item == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (item.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
for (var i = 0; i < this.items.length; i++) {
if (this.items[i] == item) {
return i;
}}
return -1;
}, "$wt.widgets.TreeItem");
$_M (cla$$, "releaseHandle", 
function () {
if (this.items != null) {
$wt.widgets.Display.releaseWidgetArray (this.items);
this.items = null;
}if (this.columns != null) {
$wt.widgets.Display.releaseWidgetArray (this.columns);
this.columns = null;
}if (this.selections != null) {
for (var i = 0; i < this.selections.length; i++) {
if (this.selections[i] != null) {
this.selections[i] = null;
}}
this.selections = null;
}if (this.lastSelection != null) {
this.lastSelection = null;
}$_U (this, $wt.widgets.Tree, "releaseHandle", []);
});
cla$$ = $_C (function () {
this.minimum = 0;
this.maximum = 0;
this.selection = 0;
this.innerHandle = null;
$_Z (this, arguments);
}, $wt.widgets, "ProgressBar", $wt.widgets.Control);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.ProgressBar, [parent, $wt.widgets.ProgressBar.checkStyle (style)]);
this.minimum = 0;
this.maximum = 100;
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
style |= $WT.NO_FOCUS;
return $wt.widgets.Widget.checkBits (style, $WT.HORIZONTAL, $WT.VERTICAL, 0, 0, 0, 0);
}, "Number");
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var border = this.getBorderWidth ();
var width = border * 2;
var height = border * 2;
if ((this.style & $WT.HORIZONTAL) != 0) {
width += UIStringUtil.calculatePlainStringLineWidth ("W") * 10;
height += UIStringUtil.calculatePlainStringLineHeight ("W");
} else {
width += UIStringUtil.calculatePlainStringLineWidth ("W");
height += UIStringUtil.calculatePlainStringLineHeight ("W") * 10;
}if (wHint != $WT.DEFAULT) width = wHint + (border * 2);
if (hHint != $WT.DEFAULT) height = hHint + (border * 2);
return  new $wt.graphics.Point (width, height);
}, "Number,Number,Boolean");
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.handle = document.createElement ("DIV");
this.handle.className = "progress-bar-default";
if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}this.innerHandle = document.createElement ("DIV");
this.handle.appendChild (this.innerHandle);
if ((this.style & $WT.HORIZONTAL) != 0) {
this.innerHandle.className = "progress-bar-horizontal";
} else {
this.innerHandle.className = "progress-bar-vertical";
}});
$_M (cla$$, "setMaximum", 
function (value) {
if (0 <= this.minimum && this.minimum < value) {
this.maximum = value;
}}, "Number");
$_M (cla$$, "setMinimum", 
function (value) {
if (0 <= value && value < this.maximum) {
this.minimum = value;
}}, "Number");
$_M (cla$$, "setSelection", 
function (value) {
this.selection = value;
if ((this.style & $WT.HORIZONTAL) != 0) {
this.innerHandle.style.width = Math.round (Math.floor (this.getSize ().x * this.selection / this.maximum)) + "px";
} else {
this.innerHandle.style.height = Math.round (Math.floor (this.getSize ().y * this.selection / this.maximum)) + "px";
}}, "Number");
$_M (cla$$, "getSelection", 
function () {
return this.selection;
});
$_M (cla$$, "getMinimum", 
function () {
return this.minimum;
});
$_M (cla$$, "getMaximum", 
function () {
return this.maximum;
});
$_S (cla$$,
"DELAY", 100,
"TIMER_ID", 100,
"MINIMUM_WIDTH", 100);
cla$$ = $_C (function () {
this.minimum = 0;
this.maximum = 0;
this.increment = 0;
this.pageIncrement = 0;
this.lastX = 0;
this.lastY = 0;
this.selection = 0;
this.thumbHandle = null;
this.trackHandle = null;
$_Z (this, arguments);
}, $wt.widgets, "Scale", $wt.widgets.Control);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Scale, [parent, $wt.widgets.Scale.checkStyle (style)]);
this.minimum = 0;
this.maximum = 100;
this.pageIncrement = 10;
}, "$wt.widgets.Composite,Number");
$_M (cla$$, "addSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Selection, typedListener);
this.addListener ($WT.DefaultSelection, typedListener);
}, "$wt.events.SelectionListener");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
return $wt.widgets.Widget.checkBits (style, $WT.HORIZONTAL, $WT.VERTICAL, 0, 0, 0, 0);
}, "Number");
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var border = this.getBorderWidth ();
var width = border * 2;
var height = border * 2;
var thumbWidth = 16;
var thumbHeight = 24;
if ((this.style & $WT.HORIZONTAL) != 0) {
width += UIStringUtil.calculatePlainStringLineWidth ("W") * 10;
var scrollY = UIStringUtil.calculatePlainStringLineHeight ("W");
height += (thumbHeight * 2) + scrollY + (Math.floor (scrollY / 3));
} else {
var scrollX = UIStringUtil.calculatePlainStringLineWidth ("W");
width += (thumbWidth * 2) + scrollX + (Math.floor (scrollX / 3));
height += UIStringUtil.calculatePlainStringLineHeight ("W") * 10;
}if (wHint != $WT.DEFAULT) width = wHint + (border * 2);
if (hHint != $WT.DEFAULT) height = hHint + (border * 2);
return  new $wt.graphics.Point (width, height);
}, "Number,Number,Boolean");
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.handle = document.createElement ("DIV");
this.handle.className = "scale-default";
if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}if ((this.style & $WT.BORDER) != 0) {
this.handle.className += " scale-border";
}this.thumbHandle = document.createElement ("DIV");
this.handle.appendChild (this.thumbHandle);
if ((this.style & $WT.HORIZONTAL) != 0) {
this.thumbHandle.className = "scale-thumb-horizontal";
this.thumbHandle.style.left = "0px";
} else {
this.thumbHandle.className = "scale-thumb-vertical";
this.thumbHandle.style.top = "0px";
}var isHorizontal = (this.style & $WT.HORIZONTAL) != 0;
this.decorateScale ();
this.trackHandle = document.createElement ("DIV");
if (isHorizontal) {
this.trackHandle.className = "scale-center-block-horizontal";
} else {
this.trackHandle.className = "scale-center-block-vertical";
}this.handle.appendChild (this.trackHandle);
var line1 = document.createElement ("DIV");
if (isHorizontal) {
line1.className = "scale-line-polar-top";
} else {
line1.className = "scale-line-polar-left";
}this.handle.appendChild (line1);
var line2 = document.createElement ("DIV");
if (isHorizontal) {
line2.className = "scale-line-polar-bottom";
} else {
line2.className = "scale-line-polar-right";
}this.handle.appendChild (line2);
var dnd =  new $wt.internal.dnd.DragAndDrop ();
dnd.addDragListener ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Scale$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Scale$1", $wt.internal.dnd.ScaleDND);
$_M (cla$$, "dragging", 
function (e) {
$_U (this, $wt.widgets.Scale$1, "dragging", [e]);
var event =  new $wt.widgets.Event ();
event.x = this.callbacks["$wt.widgets.Scale"].lastX;
event.y = this.callbacks["$wt.widgets.Scale"].lastY;
var size = this.callbacks["$wt.widgets.Scale"].getSize ();
var delta = 0;
if ((this.callbacks["$wt.widgets.Scale"].style & $WT.BORDER) != 0) {
delta = 6;
}var width = size.x + delta;
if (width < 2) {
width = 2;
}event.width = width;
var height = size.y + delta;
if (height < 2) {
height = 2;
}event.height = height;
event.widget = this.callbacks["$wt.widgets.Scale"];
event.item = this.callbacks["$wt.widgets.Scale"];
this.callbacks["$wt.widgets.Scale"].sendEvent ($WT.Selection, event);
return true;
}, "$wt.internal.dnd.DragEvent");
$_M (cla$$, "dragEnded", 
function (e) {
$_U (this, $wt.widgets.Scale$1, "dragEnded", [e]);
var event =  new $wt.widgets.Event ();
var p = this.currentLocation (e);
if (this.isHorizontal) {
event.x = p.x;
event.y = Integer.parseInt (this.callbacks["$wt.widgets.Scale"].handle.style.top);
} else {
event.x = Integer.parseInt (this.callbacks["$wt.widgets.Scale"].handle.style.left);
event.y = p.y;
}var size = this.callbacks["$wt.widgets.Scale"].getSize ();
var delta = 0;
if ((this.callbacks["$wt.widgets.Scale"].style & $WT.BORDER) != 0) {
delta = 6;
}var width = size.x + delta;
if (width < 2) {
width = 2;
}event.width = width;
var height = size.y + delta;
if (height < 2) {
height = 2;
}event.height = height;
event.widget = this.callbacks["$wt.widgets.Scale"];
event.item = this.callbacks["$wt.widgets.Scale"];
if ((this.callbacks["$wt.widgets.Scale"].style & $WT.SMOOTH) == 0) {
event.detail = $WT.DRAG;
}this.callbacks["$wt.widgets.Scale"].sendEvent ($WT.Selection, event);
if (event.doit) {
this.callbacks["$wt.widgets.Scale"].lastX = event.x;
this.callbacks["$wt.widgets.Scale"].lastY = event.y;
}return true;
}, "$wt.internal.dnd.DragEvent");
cla$$ = $_P ();
}
return $_N ($wt.widgets.Scale$1, innerThis, finalVars);
}) (this, null));
dnd.bind (this.thumbHandle);
});
$_M (cla$$, "clearScaleDecoration", 
($fz = function () {
for (var i = 0; i < this.handle.childNodes.length; i++) {
System.out.println (i + ":" + this.handle.childNodes[i].className);
if (this.handle.childNodes[i].className.indexOf ("scale-line-decoration") != -1) {
System.out.println (i);
this.handle.removeChild (this.handle.childNodes[i]);
}}
}, $fz.isPrivate = true, $fz));
$_M (cla$$, "decorateScale", 
($fz = function () {
var outerSize;
if ((this.style & $WT.HORIZONTAL) != 0) {
outerSize = this.getSize ().x;
} else {
outerSize = this.getSize ().y;
}var pages = Math.floor ((this.maximum - this.minimum) / this.pageIncrement);
var thumbSize = 16;
for (var j = 0; j <= pages; j++) {
var line = document.createElement ("DIV");
if ((this.style & $WT.HORIZONTAL) != 0) {
line.className = "scale-line-decoration-horizontal";
line.style.left = Math.floor (Math.floor ((outerSize - thumbSize) * j / pages) + Math.floor (thumbSize / 2)) + "px";
} else {
line.className = "scale-line-decoration-vertical";
line.style.top = Math.floor (Math.floor ((outerSize - thumbSize) * j / pages) + Math.floor (thumbSize / 2)) + "px";
}this.handle.appendChild (line);
}
}, $fz.isPrivate = true, $fz));
$_M (cla$$, "getIncrement", 
function () {
return this.increment;
});
$_M (cla$$, "getMaximum", 
function () {
return this.maximum;
});
$_M (cla$$, "getMinimum", 
function () {
return this.minimum;
});
$_M (cla$$, "getPageIncrement", 
function () {
return this.pageIncrement;
});
$_M (cla$$, "getSelection", 
function () {
if ((this.style & $WT.HORIZONTAL) != 0) {
var left = Integer.parseInt (this.thumbHandle.style.left);
this.selection = Math.floor (left * this.maximum / (this.getSize ().x - 12));
} else {
var top = Integer.parseInt (this.thumbHandle.style.top);
this.selection = Math.floor (top * this.maximum / (this.getSize ().y - 12));
}return this.selection;
});
$_M (cla$$, "removeSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Selection, listener);
this.eventTable.unhook ($WT.DefaultSelection, listener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "setIncrement", 
function (increment) {
if (increment < 1) return ;
if (increment > this.maximum - this.minimum) return ;
if (this.increment == increment) return ;
this.increment = increment;
}, "Number");
$_M (cla$$, "setMaximum", 
function (value) {
if (0 <= this.minimum && this.minimum < value) {
if (this.maximum == value) return ;
this.maximum = value;
this.clearScaleDecoration ();
this.decorateScale ();
}}, "Number");
$_M (cla$$, "setMinimum", 
function (value) {
if (0 <= value && value < this.maximum) {
if (this.minimum == value) return ;
this.minimum = value;
this.clearScaleDecoration ();
this.decorateScale ();
}}, "Number");
$_M (cla$$, "setPageIncrement", 
function (pageIncrement) {
if (pageIncrement < 1) return ;
if (pageIncrement > this.maximum - this.minimum) return ;
if (this.pageIncrement == pageIncrement) return ;
this.pageIncrement = pageIncrement;
this.clearScaleDecoration ();
this.decorateScale ();
}, "Number");
$_M (cla$$, "setSelection", 
function (value) {
if (this.selection == value) return ;
if (this.minimum <= value && value < this.maximum) {
this.selection = value;
if ((this.style & $WT.HORIZONTAL) != 0) {
this.thumbHandle.style.left = Math.round (Math.floor (this.selection * (this.getSize ().x - 12) / this.maximum)) + "px";
} else {
this.thumbHandle.style.top = Math.round (Math.floor (this.selection * (this.getSize ().y - 12) / this.maximum)) + "px";
}}}, "Number");
cla$$ = $_C (function () {
this.minimum = 0;
this.maximum = 0;
this.increment = 0;
this.pageIncrement = 0;
this.thumb = 0;
this.selection = 0;
this.decBtnHandle = null;
this.incBtnHandle = null;
this.thumbHandle = null;
this.lastX = 0;
this.lastY = 0;
$_Z (this, arguments);
}, $wt.widgets, "Slider", $wt.widgets.Control);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Slider, [parent, $wt.widgets.Slider.checkStyle (style)]);
}, "$wt.widgets.Composite,Number");
$_M (cla$$, "addSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Selection, typedListener);
this.addListener ($WT.DefaultSelection, typedListener);
}, "$wt.events.SelectionListener");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
return $wt.widgets.Widget.checkBits (style, $WT.HORIZONTAL, $WT.VERTICAL, 0, 0, 0, 0);
}, "Number");
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var border = this.getBorderWidth ();
var width = border * 2;
var height = border * 2;
if ((this.style & $WT.HORIZONTAL) != 0) {
width += Math.floor (16 * (this.maximum - this.minimum) / this.pageIncrement);
height += 24;
} else {
width += 24;
height += Math.floor (16 * (this.maximum - this.minimum) / this.pageIncrement);
}if (wHint != $WT.DEFAULT) width = wHint + (border * 2);
if (hHint != $WT.DEFAULT) height = hHint + (border * 2);
return  new $wt.graphics.Point (width, height);
}, "Number,Number,Boolean");
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.handle = document.createElement ("DIV");
this.handle.className = "slider-default";
if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}if ((this.style & $WT.BORDER) != 0) {
this.handle.className += " slider-border";
}this.decBtnHandle = document.createElement ("BUTTON");
this.handle.appendChild (this.decBtnHandle);
if ((this.style & $WT.HORIZONTAL) != 0) {
this.decBtnHandle.className = "slider-left-button-default";
} else {
this.decBtnHandle.className = "slider-top-button-default";
}this.decBtnHandle.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Slider$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Slider$1", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
this.callbacks["$wt.widgets.Slider"].setSelection (this.callbacks["$wt.widgets.Slider"].getSelection () - this.callbacks["$wt.widgets.Slider"].increment);
var event =  new $wt.widgets.Event ();
event.widget = this.callbacks["$wt.widgets.Slider"];
event.item = this.callbacks["$wt.widgets.Slider"];
if ((this.callbacks["$wt.widgets.Slider"].style & $WT.HORIZONTAL) != 0) {
event.detail = $WT.ARROW_LEFT;
} else {
event.detail = $WT.ARROW_UP;
}this.callbacks["$wt.widgets.Slider"].sendEvent ($WT.Selection, event);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Slider$1, innerThis, finalVars);
}) (this, null));
this.incBtnHandle = document.createElement ("BUTTON");
this.handle.appendChild (this.incBtnHandle);
if ((this.style & $WT.HORIZONTAL) != 0) {
this.incBtnHandle.className = "slider-right-button-default";
} else {
this.incBtnHandle.className = "slider-bottom-button-default";
}this.incBtnHandle.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Slider$2")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Slider$2", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
this.callbacks["$wt.widgets.Slider"].setSelection (this.callbacks["$wt.widgets.Slider"].getSelection () + this.callbacks["$wt.widgets.Slider"].increment);
var event =  new $wt.widgets.Event ();
event.widget = this.callbacks["$wt.widgets.Slider"];
event.item = this.callbacks["$wt.widgets.Slider"];
if ((this.callbacks["$wt.widgets.Slider"].style & $WT.HORIZONTAL) != 0) {
event.detail = $WT.ARROW_RIGHT;
} else {
event.detail = $WT.ARROW_DOWN;
}this.callbacks["$wt.widgets.Slider"].sendEvent ($WT.Selection, event);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Slider$2, innerThis, finalVars);
}) (this, null));
this.thumbHandle = document.createElement ("BUTTON");
this.handle.appendChild (this.thumbHandle);
if ((this.style & $WT.HORIZONTAL) != 0) {
this.thumbHandle.className = "slider-thumb-horizontal";
this.thumbHandle.style.left = "0px";
} else {
this.thumbHandle.className = "slider-thumb-vertical";
this.thumbHandle.style.top = "0px";
}this.minimum = 0;
this.maximum = 100;
this.thumb = 10;
this.selection = 0;
this.increment = 1;
this.pageIncrement = 10;
var dnd =  new $wt.internal.dnd.DragAndDrop ();
dnd.addDragListener ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Slider$3")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Slider$3", $wt.internal.dnd.SliderDND);
$_V (cla$$, "dragEnded", 
function (e) {
this.callbacks["$wt.widgets.Slider"].caculateSelection ();
var event =  new $wt.widgets.Event ();
var p = this.currentLocation (e);
if (this.isHorizontal) {
event.x = p.x;
event.y = Integer.parseInt (this.callbacks["$wt.widgets.Slider"].handle.style.top);
} else {
event.x = Integer.parseInt (this.callbacks["$wt.widgets.Slider"].handle.style.left);
event.y = p.y;
}event.widget = this.callbacks["$wt.widgets.Slider"];
event.item = this.callbacks["$wt.widgets.Slider"];
event.detail = $WT.DRAG;
this.callbacks["$wt.widgets.Slider"].sendEvent ($WT.Selection, event);
if (event.doit) {
this.callbacks["$wt.widgets.Slider"].lastX = event.x;
this.callbacks["$wt.widgets.Slider"].lastY = event.y;
}return true;
}, "$wt.internal.dnd.DragEvent");
$_M (cla$$, "currentLocation", 
function (e) {
var xx = this.sourceX + e.deltaX ();
var yy = this.sourceY + e.deltaY ();
var gHeight = Integer.parseInt (e.sourceElement.parentNode.style.height);
var gWidth = Integer.parseInt (e.sourceElement.parentNode.style.width);
var borderWidth = 20;
if (this.isHorizontal) {
if (gWidth <= 64) {
borderWidth = Math.floor (gWidth * 20 / 64);
}var thumbWidth = Math.floor (this.callbacks["$wt.widgets.Slider"].thumb * (gWidth - borderWidth * 2) / (this.callbacks["$wt.widgets.Slider"].maximum - this.callbacks["$wt.widgets.Slider"].minimum));
if (thumbWidth > 16) {
thumbWidth -= 2;
} else if (thumbWidth > 12) {
thumbWidth--;
} else if (thumbWidth < 8) {
thumbWidth = 8;
}var maxWidth = gWidth - borderWidth - 6;
if (xx < borderWidth) {
xx = borderWidth;
} else if (xx > maxWidth - thumbWidth) {
xx = maxWidth - thumbWidth;
}} else {
if (gHeight <= 64) {
borderWidth = Math.floor (gHeight * 20 / 64);
}var thumbWidth = Math.floor (this.callbacks["$wt.widgets.Slider"].thumb * (gWidth - borderWidth * 2) / (this.callbacks["$wt.widgets.Slider"].maximum - this.callbacks["$wt.widgets.Slider"].minimum));
if (thumbWidth > 16) {
thumbWidth -= 2;
} else if (thumbWidth > 12) {
thumbWidth--;
} else if (thumbWidth < 8) {
thumbWidth = 8;
}var maxHeight = gHeight - borderWidth - 6;
if (yy < borderWidth) {
yy = borderWidth;
} else if (yy > maxHeight - thumbWidth) {
yy = maxHeight - thumbWidth;
}}return  new $wt.graphics.Point (xx, yy);
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "dragging", 
function (e) {
if (this.isHorizontal) {
e.sourceElement.style.left = this.currentLocation (e).x + "px";
} else {
e.sourceElement.style.top = this.currentLocation (e).y + "px";
}this.callbacks["$wt.widgets.Slider"].caculateSelection ();
var event =  new $wt.widgets.Event ();
event.x = this.callbacks["$wt.widgets.Slider"].lastX;
event.y = this.callbacks["$wt.widgets.Slider"].lastY;
event.widget = this.callbacks["$wt.widgets.Slider"];
event.item = this.callbacks["$wt.widgets.Slider"];
event.detail = $WT.DRAG;
this.callbacks["$wt.widgets.Slider"].sendEvent ($WT.Selection, event);
return true;
}, "$wt.internal.dnd.DragEvent");
cla$$ = $_P ();
}
return $_N ($wt.widgets.Slider$3, innerThis, finalVars);
}) (this, null));
dnd.bind (this.thumbHandle);
this.updateSlider ();
});
$_M (cla$$, "enableWidget", 
function (enabled) {
if (enabled) {
this.state &= ($t$ = ~ $wt.widgets.Widget.DISABLED, $wt.widgets.Widget.prototype.DISABLED = $wt.widgets.Widget.DISABLED, $t$);
} else {
this.state |= $wt.widgets.Widget.DISABLED;
}this.handle.disabled = enabled;
}, "Boolean");
$_V (cla$$, "getEnabled", 
function () {
return (this.state & $wt.widgets.Widget.DISABLED) == 0;
});
$_M (cla$$, "getIncrement", 
function () {
return this.increment;
});
$_M (cla$$, "getMaximum", 
function () {
return this.maximum;
});
$_M (cla$$, "getMinimum", 
function () {
return this.minimum;
});
$_M (cla$$, "getPageIncrement", 
function () {
return this.pageIncrement;
});
$_M (cla$$, "getSelection", 
function () {
return this.selection;
});
$_M (cla$$, "caculateSelection", 
function () {
var size = this.getSize ();
var borderWidth = 20;
var trackWidth = 0;
if ((this.style & $WT.HORIZONTAL) != 0) {
if (size.x <= 64) {
borderWidth = Math.floor (size.x * 20 / 64);
}trackWidth = size.x - borderWidth * 2;
var thumbWidth = Math.floor (this.thumb * trackWidth / (this.maximum - this.minimum));
if (thumbWidth > 16) {
thumbWidth -= 2;
} else if (thumbWidth > 12) {
thumbWidth--;
} else if (thumbWidth < 8) {
thumbWidth = 8;
}this.thumbHandle.style.width = thumbWidth + "px";
var thumbPosition = Integer.parseInt (this.thumbHandle.style.left);
this.selection = Math.floor ((thumbPosition - borderWidth) * (this.maximum - this.minimum) / trackWidth) + this.minimum;
} else {
if (size.y <= 64) {
borderWidth = Math.floor (size.y * 20 / 64);
}trackWidth = size.y - borderWidth * 2;
var thumbWidth = Math.floor (this.thumb * trackWidth / (this.maximum - this.minimum));
if (thumbWidth > 16) {
thumbWidth -= 2;
} else if (thumbWidth > 12) {
thumbWidth--;
} else if (thumbWidth < 8) {
thumbWidth = 8;
}this.thumbHandle.style.height = thumbWidth + "px";
var thumbPosition = Integer.parseInt (this.thumbHandle.style.top);
this.selection = Math.floor ((thumbPosition - borderWidth) * (this.maximum - this.minimum) / trackWidth) + this.minimum;
}return this.selection;
});
$_M (cla$$, "getThumb", 
function () {
return this.thumb;
});
$_M (cla$$, "removeSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Selection, listener);
this.eventTable.unhook ($WT.DefaultSelection, listener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "setIncrement", 
function (value) {
if (value < 1) return ;
this.increment = value;
}, "Number");
$_M (cla$$, "setMaximum", 
function (value) {
if (value < 0) return ;
if (value < this.minimum) return ;
this.maximum = value;
if (this.selection > this.maximum) {
this.selection = this.maximum;
}this.updateSlider ();
}, "Number");
$_M (cla$$, "setMinimum", 
function (value) {
if (value < 0) return ;
if (value > this.maximum) return ;
this.minimum = value;
if (this.selection < this.minimum) {
this.selection = this.minimum;
}this.updateSlider ();
}, "Number");
$_M (cla$$, "setPageIncrement", 
function (value) {
if (value < 1) return ;
this.pageIncrement = value;
}, "Number");
$_M (cla$$, "setSelection", 
function (value) {
if (value < 0) return ;
if (value < this.minimum) {
this.selection = this.minimum;
} else if (value > this.maximum - this.thumb) {
this.selection = this.maximum - this.thumb;
} else {
this.selection = value;
}this.updateSlider ();
}, "Number");
$_M (cla$$, "setThumb", 
function (value) {
if (value < 1) return ;
this.thumb = value;
this.updateSlider ();
}, "Number");
$_M (cla$$, "setValues", 
function (selection, minimum, maximum, thumb, increment, pageIncrement) {
if (minimum < 0) return ;
if (maximum < 0) return ;
if (minimum >= maximum) return ;
if (thumb < 1) return ;
if (increment < 1) return ;
if (pageIncrement < 1) return ;
this.increment = increment;
this.pageIncrement = pageIncrement;
this.minimum = minimum;
this.maximum = maximum;
this.thumb = thumb;
if (this.selection < this.minimum) {
this.selection = this.minimum;
} else if (this.selection > this.maximum) {
this.selection = this.maximum;
}this.updateSlider ();
}, "Number,Number,Number,Number,Number,Number");
$_M (cla$$, "getIncrementButtonWidth", 
function () {
var size = this.getSize ();
var borderWidth = 20;
if ((this.style & $WT.HORIZONTAL) != 0) {
if (size.x <= 64) {
borderWidth = Math.floor (size.x * 20 / 64);
}} else {
if (size.y <= 64) {
borderWidth = Math.floor (size.y * 20 / 64);
}}return borderWidth;
});
$_M (cla$$, "updateSlider", 
function () {
var size = this.getSize ();
var borderWidth = 20;
var trackWidth = 0;
if ((this.style & $WT.HORIZONTAL) != 0) {
if (size.x <= 64) {
borderWidth = Math.floor (size.x * 20 / 64);
}trackWidth = size.x - borderWidth * 2;
var thumbPosition = Math.floor ((this.selection - this.minimum) * trackWidth / (this.maximum - this.minimum)) + borderWidth;
this.thumbHandle.style.left = thumbPosition + "px";
var thumbWidth = Math.floor (this.thumb * trackWidth / (this.maximum - this.minimum));
if (thumbWidth > 16) {
thumbWidth -= 2;
} else if (thumbWidth > 12) {
thumbWidth--;
} else if (thumbWidth < 8) {
thumbWidth = 8;
}this.thumbHandle.style.width = thumbWidth + "px";
} else {
if (size.y <= 64) {
borderWidth = Math.floor (size.y * 20 / 64);
}trackWidth = size.y - borderWidth * 2;
var thumbPosition = Math.floor ((this.selection - this.minimum) * trackWidth / (this.maximum - this.minimum)) + borderWidth;
this.thumbHandle.style.top = thumbPosition + "px";
var thumbWidth = Math.floor (this.thumb * trackWidth / (this.maximum - this.minimum));
if (thumbWidth > 16) {
thumbWidth -= 2;
} else if (thumbWidth > 12) {
thumbWidth--;
} else if (thumbWidth < 8) {
thumbWidth = 8;
}this.thumbHandle.style.height = thumbWidth + "px";
}});
$_M (cla$$, "setSize", 
function (width, height) {
$_U (this, $wt.widgets.Slider, "setSize", [width, height]);
this.updateSlider ();
}, "Number,Number");
$_M (cla$$, "setBounds", 
function (x, y, width, height) {
$_U (this, $wt.widgets.Slider, "setBounds", [x, y, width, height]);
this.updateSlider ();
}, "Number,Number,Number,Number");
cla$$ = $_C (function () {
this.dragging = false;
this.lastX = 0;
this.lastY = 0;
$_Z (this, arguments);
}, $wt.widgets, "Sash", $wt.widgets.Control);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Sash, [parent, $wt.widgets.Sash.checkStyle (style)]);
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
return $wt.widgets.Widget.checkBits (style, $WT.HORIZONTAL, $WT.VERTICAL, 0, 0, 0, 0);
}, "Number");
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var border = this.getBorderWidth ();
var width = border * 2;
var height = border * 2;
if ((this.style & $WT.HORIZONTAL) != 0) {
width += $wt.widgets.Widget.DEFAULT_WIDTH;
height += 3;
} else {
width += 3;
height += $wt.widgets.Widget.DEFAULT_HEIGHT;
}if (wHint != $WT.DEFAULT) width = wHint + (border * 2);
if (hHint != $WT.DEFAULT) height = hHint + (border * 2);
return  new $wt.graphics.Point (width, height);
}, "Number,Number,Boolean");
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.handle = document.createElement ("DIV");
if ((this.style & $WT.HORIZONTAL) != 0) {
this.handle.className = "sash-vertical-default";
} else {
this.handle.className = "sash-horizontal-default";
}if ((this.style & $WT.BORDER) != 0) {
this.handle.className += " sash-border";
}if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}var dnd =  new $wt.internal.dnd.DragAndDrop ();
dnd.addDragListener ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Sash$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Sash$1", $wt.internal.dnd.SashDND);
$_M (cla$$, "dragEnded", 
function (e) {
$_U (this, $wt.widgets.Sash$1, "dragEnded", [e]);
var event =  new $wt.widgets.Event ();
event.x = this.callbacks["$wt.widgets.Sash"].lastX;
event.y = this.callbacks["$wt.widgets.Sash"].lastY;
var size = this.callbacks["$wt.widgets.Sash"].getSize ();
var delta = 0;
if ((this.callbacks["$wt.widgets.Sash"].style & $WT.BORDER) != 0) {
delta = 6;
}var width = size.x + delta;
if (width < 2) {
width = 2;
}event.width = width;
var height = size.y + delta;
if (height < 2) {
height = 2;
}event.height = height;
event.widget = this.callbacks["$wt.widgets.Sash"];
event.item = this.callbacks["$wt.widgets.Sash"];
this.callbacks["$wt.widgets.Sash"].sendEvent ($WT.Selection, event);
System.out.println (event);
if (event.doit) {
if ((this.callbacks["$wt.widgets.Sash"].style & $WT.SMOOTH) != 0) {
if (this.isHorizontal) {
this.callbacks["$wt.widgets.Sash"].handle.style.left = this.callbacks["$wt.widgets.Sash"].lastX + "px";
} else {
this.callbacks["$wt.widgets.Sash"].handle.style.top = this.callbacks["$wt.widgets.Sash"].lastY + "px";
}}}return true;
}, "$wt.internal.dnd.DragEvent");
$_M (cla$$, "dragging", 
function (e) {
$_U (this, $wt.widgets.Sash$1, "dragging", [e]);
var event =  new $wt.widgets.Event ();
var p = this.currentLocation (e);
if (this.isHorizontal) {
event.x = p.x;
event.y = Integer.parseInt (this.callbacks["$wt.widgets.Sash"].handle.style.top);
} else {
event.x = Integer.parseInt (this.callbacks["$wt.widgets.Sash"].handle.style.left);
event.y = p.y;
}var size = this.callbacks["$wt.widgets.Sash"].getSize ();
var delta = 0;
if ((this.callbacks["$wt.widgets.Sash"].style & $WT.BORDER) != 0) {
delta = 6;
}var width = size.x + delta;
if (width < 2) {
width = 2;
}event.width = width;
var height = size.y + delta;
if (height < 2) {
height = 2;
}event.height = height;
event.widget = this.callbacks["$wt.widgets.Sash"];
event.item = this.callbacks["$wt.widgets.Sash"];
if ((this.callbacks["$wt.widgets.Sash"].style & $WT.SMOOTH) == 0) {
event.detail = $WT.DRAG;
}this.callbacks["$wt.widgets.Sash"].sendEvent ($WT.Selection, event);
if (event.doit) {
this.callbacks["$wt.widgets.Sash"].lastX = event.x;
this.callbacks["$wt.widgets.Sash"].lastY = event.y;
}if ((this.callbacks["$wt.widgets.Sash"].style & $WT.SMOOTH) != 0) {
if (this.isHorizontal) {
this.callbacks["$wt.widgets.Sash"].handle.style.left = this.callbacks["$wt.widgets.Sash"].lastX + "px";
} else {
this.callbacks["$wt.widgets.Sash"].handle.style.top = this.callbacks["$wt.widgets.Sash"].lastY + "px";
}}return true;
}, "$wt.internal.dnd.DragEvent");
cla$$ = $_P ();
}
return $_N ($wt.widgets.Sash$1, innerThis, finalVars);
}) (this, null));
dnd.bind (this.handle);
});
$_M (cla$$, "addSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Selection, typedListener);
this.addListener ($WT.DefaultSelection, typedListener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "removeSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Selection, listener);
this.eventTable.unhook ($WT.DefaultSelection, listener);
}, "$wt.events.SelectionListener");
$_S (cla$$,
"INCREMENT", 1,
"PAGE_INCREMENT", 9);
cla$$ = $_C (function () {
this.SASH_WIDTH = 3;
this.sashStyle = 0;
this.sashes =  new Array (0);
this.background = null;
this.foreground = null;
this.controls =  new Array (0);
this.maxControl = null;
this.sashListener = null;
$_Z (this, arguments);
}, $wt.custom, "SashForm", $wt.widgets.Composite);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.custom.SashForm, [parent, $wt.custom.SashForm.checkStyle (style)]);
$_U (this, $wt.custom.SashForm, "setLayout", [ new $wt.custom.SashFormLayout ()]);
this.sashStyle = ((style & $WT.VERTICAL) != 0) ? $WT.HORIZONTAL : $WT.VERTICAL;
if ((style & $WT.BORDER) != 0) this.sashStyle |= $WT.BORDER;
if ((style & $WT.SMOOTH) != 0) this.sashStyle |= $WT.SMOOTH;
this.sashListener = (function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.custom.SashForm$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.custom, "SashForm$1", null, $wt.widgets.Listener);
$_V (cla$$, "handleEvent", 
function (e) {
this.callbacks["$wt.custom.SashForm"].onDragSash (e);
}, "$wt.widgets.Event");
cla$$ = $_P ();
}
return $_N ($wt.custom.SashForm$1, innerThis, finalVars);
}) (this, null);
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
var mask = $WT.BORDER | $WT.LEFT_TO_RIGHT | $WT.RIGHT_TO_LEFT;
return style & mask;
}, "Number");
$_M (cla$$, "getOrientation", 
function () {
return (this.sashStyle & $WT.VERTICAL) != 0 ? $WT.HORIZONTAL : $WT.VERTICAL;
});
$_M (cla$$, "getStyle", 
function () {
var style = $_U (this, $wt.custom.SashForm, "getStyle", []);
style |= this.getOrientation () == $WT.VERTICAL ? $WT.VERTICAL : $WT.HORIZONTAL;
if ((this.sashStyle & $WT.SMOOTH) != 0) style |= $WT.SMOOTH;
return style;
});
$_M (cla$$, "getMaximizedControl", 
function () {
return this.maxControl;
});
$_M (cla$$, "getWeights", 
function () {
var cArray = this.getControls (false);
var ratios =  $_A (cArray.length, 0);
for (var i = 0; i < cArray.length; i++) {
var data = cArray[i].getLayoutData ();
if (data != null && $_O (data, $wt.custom.SashFormData)) {
ratios[i] = parseInt (((data).weight * 1000 >> 16));
} else {
ratios[i] = 200;
}}
return ratios;
});
$_M (cla$$, "getControls", 
function (onlyVisible) {
var children = this.getChildren ();
var result =  new Array (0);
for (var i = 0; i < children.length; i++) {
if ($_O (children[i], $wt.widgets.Sash)) continue ;if (onlyVisible && !children[i].getVisible ()) continue ;var newResult =  new Array (result.length + 1);
System.arraycopy (result, 0, newResult, 0, result.length);
newResult[result.length] = children[i];
result = newResult;
}
return result;
}, "Boolean");
$_M (cla$$, "onDragSash", 
function (event) {
var sash = event.widget;
var sashIndex = -1;
for (var i = 0; i < this.sashes.length; i++) {
if (this.sashes[i] == sash) {
sashIndex = i;
break;
}}
if (sashIndex == -1) return ;
var c1 = this.controls[sashIndex];
var c2 = this.controls[sashIndex + 1];
var b1 = c1.getBounds ();
var b2 = c2.getBounds ();
var sashBounds = sash.getBounds ();
var area = this.getClientArea ();
var correction = false;
if (this.getOrientation () == $WT.HORIZONTAL) {
correction = b1.width < $wt.custom.SashForm.DRAG_MINIMUM || b2.width < $wt.custom.SashForm.DRAG_MINIMUM;
var totalWidth = b2.x + b2.width - b1.x;
var shift = event.x - sashBounds.x;
b1.width += shift;
b2.x += shift;
b2.width -= shift;
if (b1.width < $wt.custom.SashForm.DRAG_MINIMUM) {
b1.width = $wt.custom.SashForm.DRAG_MINIMUM;
b2.x = b1.x + b1.width + sashBounds.width;
b2.width = totalWidth - b2.x;
event.x = b1.x + b1.width;
event.doit = false;
}if (b2.width < $wt.custom.SashForm.DRAG_MINIMUM) {
b1.width = totalWidth - $wt.custom.SashForm.DRAG_MINIMUM - sashBounds.width;
b2.x = b1.x + b1.width + sashBounds.width;
b2.width = $wt.custom.SashForm.DRAG_MINIMUM;
event.x = b1.x + b1.width;
event.doit = false;
}var data1 = c1.getLayoutData ();
if (data1 == null || !($_O (data1, $wt.custom.SashFormData))) {
data1 =  new $wt.custom.SashFormData ();
c1.setLayoutData (data1);
}var data2 = c2.getLayoutData ();
if (data2 == null || !($_O (data2, $wt.custom.SashFormData))) {
data2 =  new $wt.custom.SashFormData ();
c2.setLayoutData (data2);
}(data1).weight = Math.floor (((parseInt (b1.width) << 16) + area.width - 1) / area.width);
(data2).weight = Math.floor (((parseInt (b2.width) << 16) + area.width - 1) / area.width);
} else {
correction = b1.height < $wt.custom.SashForm.DRAG_MINIMUM || b2.height < $wt.custom.SashForm.DRAG_MINIMUM;
var totalHeight = b2.y + b2.height - b1.y;
var shift = event.y - sashBounds.y;
b1.height += shift;
b2.y += shift;
b2.height -= shift;
if (b1.height < $wt.custom.SashForm.DRAG_MINIMUM) {
b1.height = $wt.custom.SashForm.DRAG_MINIMUM;
b2.y = b1.y + b1.height + sashBounds.height;
b2.height = totalHeight - b2.y;
event.y = b1.y + b1.height;
event.doit = false;
}if (b2.height < $wt.custom.SashForm.DRAG_MINIMUM) {
b1.height = totalHeight - $wt.custom.SashForm.DRAG_MINIMUM - sashBounds.height;
b2.y = b1.y + b1.height + sashBounds.height;
b2.height = $wt.custom.SashForm.DRAG_MINIMUM;
event.y = b1.y + b1.height;
event.doit = false;
}var data1 = c1.getLayoutData ();
if (data1 == null || !($_O (data1, $wt.custom.SashFormData))) {
data1 =  new $wt.custom.SashFormData ();
c1.setLayoutData (data1);
}var data2 = c2.getLayoutData ();
if (data2 == null || !($_O (data2, $wt.custom.SashFormData))) {
data2 =  new $wt.custom.SashFormData ();
c2.setLayoutData (data2);
}(data1).weight = Math.floor (((parseInt (b1.height) << 16) + area.height - 1) / area.height);
(data2).weight = Math.floor (((parseInt (b2.height) << 16) + area.height - 1) / area.height);
}if (correction || (event.doit && event.detail != $WT.DRAG)) {
c1.setBounds (b1);
sash.setBounds (event.x, event.y, event.width, event.height);
c2.setBounds (b2);
}}, "$wt.widgets.Event");
$_M (cla$$, "setOrientation", 
function (orientation) {
if (this.getOrientation () == orientation) return ;
if (orientation != $WT.HORIZONTAL && orientation != $WT.VERTICAL) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}this.sashStyle &= ~($WT.HORIZONTAL | $WT.VERTICAL);
this.sashStyle |= orientation == $WT.VERTICAL ? $WT.HORIZONTAL : $WT.VERTICAL;
for (var i = 0; i < this.sashes.length; i++) {
this.sashes[i].dispose ();
this.sashes[i] =  new $wt.widgets.Sash (this, this.sashStyle);
this.sashes[i].setBackground (this.background);
this.sashes[i].setForeground (this.foreground);
this.sashes[i].addListener ($WT.Selection, this.sashListener);
}
this.layout (false);
}, "Number");
$_M (cla$$, "setBackground", 
function (color) {
$_U (this, $wt.custom.SashForm, "setBackground", [color]);
this.background = color;
for (var i = 0; i < this.sashes.length; i++) {
this.sashes[i].setBackground (this.background);
}
}, "$wt.graphics.Color");
$_M (cla$$, "setForeground", 
function (color) {
$_U (this, $wt.custom.SashForm, "setForeground", [color]);
this.foreground = color;
for (var i = 0; i < this.sashes.length; i++) {
this.sashes[i].setForeground (this.foreground);
}
}, "$wt.graphics.Color");
$_M (cla$$, "setLayout", 
function (layout) {
return ;
}, "$wt.widgets.Layout");
$_M (cla$$, "setMaximizedControl", 
function (control) {
if (control == null) {
if (this.maxControl != null) {
this.maxControl = null;
this.layout (false);
for (var i = 0; i < this.sashes.length; i++) {
this.sashes[i].setVisible (true);
}
}return ;
}for (var i = 0; i < this.sashes.length; i++) {
this.sashes[i].setVisible (false);
}
this.maxControl = control;
this.layout (false);
}, "$wt.widgets.Control");
$_M (cla$$, "setWeights", 
function (weights) {
var cArray = this.getControls (false);
if (weights == null || weights.length != cArray.length) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}var total = 0;
for (var i = 0; i < weights.length; i++) {
if (weights[i] < 0) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}total += weights[i];
}
if (total == 0) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}for (var i = 0; i < cArray.length; i++) {
var data = cArray[i].getLayoutData ();
if (data == null || !($_O (data, $wt.custom.SashFormData))) {
data =  new $wt.custom.SashFormData ();
cArray[i].setLayoutData (data);
}(data).weight = Math.floor (((parseInt (weights[i]) << 16) + total - 1) / total);
}
this.layout (false);
}, "Array");
$_S (cla$$,
"DRAG_MINIMUM", 20);
cla$$ = $_C (function () {
this.weight = 0;
$_Z (this, arguments);
}, $wt.custom, "SashFormData");
$_M (cla$$, "getName", 
function () {
var string = this.getClass ().getName ();
var index = string.lastIndexOf ('.');
if (index == -1) return string;
return string.substring (index + 1, string.length);
});
$_V (cla$$, "toString", 
function () {
return this.getName () + " {weight=" + this.weight + "}";
});
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.custom, "SashFormLayout", $wt.widgets.Layout);
$_V (cla$$, "computeSize", 
function (composite, wHint, hHint, flushCache) {
var sashForm = composite;
var cArray = sashForm.getControls (true);
var width = 0;
var height = 0;
if (cArray.length == 0) {
if (wHint != $WT.DEFAULT) width = wHint;
if (hHint != $WT.DEFAULT) height = hHint;
return  new $wt.graphics.Point (width, height);
}var vertical = sashForm.getOrientation () == $WT.VERTICAL;
var maxIndex = 0;
var maxValue = 0;
for (var i = 0; i < cArray.length; i++) {
if (vertical) {
var size = cArray[i].computeSize (wHint, $WT.DEFAULT, flushCache);
if (size.y > maxValue) {
maxIndex = i;
maxValue = size.y;
}width = Math.max (width, size.x);
} else {
var size = cArray[i].computeSize ($WT.DEFAULT, hHint, flushCache);
if (size.x > maxValue) {
maxIndex = i;
maxValue = size.x;
}height = Math.max (height, size.y);
}}
var ratios =  $_A (cArray.length, 0);
var total = 0;
for (var i = 0; i < cArray.length; i++) {
var data = cArray[i].getLayoutData ();
if (data != null && $_O (data, $wt.custom.SashFormData)) {
ratios[i] = (data).weight;
} else {
data =  new $wt.custom.SashFormData ();
cArray[i].setLayoutData (data);
(data).weight = ratios[i] = Math.floor (((200 << 16) + 999) / 1000);
}total += ratios[i];
}
if (ratios[maxIndex] > 0) {
var sashwidth = sashForm.sashes.length > 0 ? sashForm.SASH_WIDTH + sashForm.sashes[0].getBorderWidth () * 2 : sashForm.SASH_WIDTH;
if (vertical) {
height += parseInt ((Math.floor (total * maxValue / ratios[maxIndex]))) + (cArray.length - 1) * sashwidth;
} else {
width += parseInt ((Math.floor (total * maxValue / ratios[maxIndex]))) + (cArray.length - 1) * sashwidth;
}}width += sashForm.getBorderWidth () * 2;
height += sashForm.getBorderWidth () * 2;
if (wHint != $WT.DEFAULT) width = wHint;
if (hHint != $WT.DEFAULT) height = hHint;
return  new $wt.graphics.Point (width, height);
}, "$wt.widgets.Composite,Number,Number,Boolean");
$_V (cla$$, "flushCache", 
function (control) {
return true;
}, "$wt.widgets.Control");
$_V (cla$$, "layout", 
function (composite, flushCache) {
var sashForm = composite;
var area = sashForm.getClientArea ();
if (area.width <= 1 || area.height <= 1) return ;
var newControls = sashForm.getControls (true);
if (sashForm.controls.length == 0 && newControls.length == 0) return ;
sashForm.controls = newControls;
var controls = sashForm.controls;
if (sashForm.maxControl != null && !sashForm.maxControl.isDisposed ()) {
for (var i = 0; i < controls.length; i++) {
if (controls[i] != sashForm.maxControl) {
controls[i].setBounds (-200, -200, 0, 0);
} else {
controls[i].setBounds (area);
}}
return ;
}if (sashForm.sashes.length < controls.length - 1) {
var newSashes =  new Array (controls.length - 1);
System.arraycopy (sashForm.sashes, 0, newSashes, 0, sashForm.sashes.length);
for (var i = sashForm.sashes.length; i < newSashes.length; i++) {
newSashes[i] =  new $wt.widgets.Sash (sashForm, sashForm.sashStyle);
newSashes[i].setBackground (sashForm.background);
newSashes[i].setForeground (sashForm.foreground);
newSashes[i].addListener ($WT.Selection, sashForm.sashListener);
}
sashForm.sashes = newSashes;
}if (sashForm.sashes.length > controls.length - 1) {
if (controls.length == 0) {
for (var i = 0; i < sashForm.sashes.length; i++) {
sashForm.sashes[i].dispose ();
}
sashForm.sashes =  new Array (0);
} else {
var newSashes =  new Array (controls.length - 1);
System.arraycopy (sashForm.sashes, 0, newSashes, 0, newSashes.length);
for (var i = controls.length - 1; i < sashForm.sashes.length; i++) {
sashForm.sashes[i].dispose ();
}
sashForm.sashes = newSashes;
}}if (controls.length == 0) return ;
var sashes = sashForm.sashes;
var ratios =  $_A (controls.length, 0);
var total = 0;
for (var i = 0; i < controls.length; i++) {
var data = controls[i].getLayoutData ();
if (data != null && $_O (data, $wt.custom.SashFormData)) {
ratios[i] = (data).weight;
} else {
data =  new $wt.custom.SashFormData ();
controls[i].setLayoutData (data);
(data).weight = ratios[i] = Math.floor (((200 << 16) + 999) / 1000);
}total += ratios[i];
}
var sashwidth = sashes.length > 0 ? sashForm.SASH_WIDTH + sashes[0].getBorderWidth () * 2 : sashForm.SASH_WIDTH;
if (sashForm.getOrientation () == $WT.HORIZONTAL) {
var width = parseInt ((Math.floor (ratios[0] * (area.width - sashes.length * sashwidth) / total)));
var x = area.x;
controls[0].setBounds (x, area.y, width, area.height);
x += width;
for (var i = 1; i < controls.length - 1; i++) {
sashes[i - 1].setBounds (x, area.y, sashwidth, area.height);
x += sashwidth;
width = parseInt ((Math.floor (ratios[i] * (area.width - sashes.length * sashwidth) / total)));
controls[i].setBounds (x, area.y, width, area.height);
x += width;
}
if (controls.length > 1) {
sashes[sashes.length - 1].setBounds (x, area.y, sashwidth, area.height);
x += sashwidth;
width = area.width - x;
controls[controls.length - 1].setBounds (x, area.y, width, area.height);
}} else {
var height = parseInt ((Math.floor (ratios[0] * (area.height - sashes.length * sashwidth) / total)));
var y = area.y;
controls[0].setBounds (area.x, y, area.width, height);
y += height;
for (var i = 1; i < controls.length - 1; i++) {
sashes[i - 1].setBounds (area.x, y, area.width, sashwidth);
y += sashwidth;
height = parseInt ((Math.floor (ratios[i] * (area.height - sashes.length * sashwidth) / total)));
controls[i].setBounds (area.x, y, area.width, height);
y += height;
}
if (controls.length > 1) {
sashes[sashes.length - 1].setBounds (area.x, y, area.width, sashwidth);
y += sashwidth;
height = area.height - y;
controls[controls.length - 1].setBounds (area.x, y, area.width, height);
}}}, "$wt.widgets.Composite,Boolean");
cla$$ = $_C (function () {
this.marginWidth = 0;
this.marginHeight = 0;
this.topControl = null;
$_Z (this, arguments);
}, $wt.custom, "StackLayout", $wt.widgets.Layout);
$_V (cla$$, "computeSize", 
function (composite, wHint, hHint, flushCache) {
var children = composite.getChildren ();
var maxWidth = 0;
var maxHeight = 0;
for (var i = 0; i < children.length; i++) {
var size = children[i].computeSize (wHint, hHint, flushCache);
maxWidth = Math.max (size.x, maxWidth);
maxHeight = Math.max (size.y, maxHeight);
}
var width = maxWidth + 2 * this.marginWidth;
var height = maxHeight + 2 * this.marginHeight;
if (wHint != $WT.DEFAULT) width = wHint;
if (hHint != $WT.DEFAULT) height = hHint;
return  new $wt.graphics.Point (width, height);
}, "$wt.widgets.Composite,Number,Number,Boolean");
$_V (cla$$, "flushCache", 
function (control) {
return true;
}, "$wt.widgets.Control");
$_V (cla$$, "layout", 
function (composite, flushCache) {
var children = composite.getChildren ();
var rect = composite.getClientArea ();
rect.x += this.marginWidth;
rect.y += this.marginHeight;
rect.width -= 2 * this.marginWidth;
rect.height -= 2 * this.marginHeight;
for (var i = 0; i < children.length; i++) {
children[i].setBounds (rect);
children[i].setVisible (children[i] == this.topControl);
}
}, "$wt.widgets.Composite,Boolean");
$_M (cla$$, "getName", 
function () {
var string = this.getClass ().getName ();
var index = string.lastIndexOf ('.');
if (index == -1) return string;
return string.substring (index + 1, string.length);
});
$_V (cla$$, "toString", 
function () {
var string = this.getName () + " {";
if (this.marginWidth != 0) string += "marginWidth=" + this.marginWidth + " ";
if (this.marginHeight != 0) string += "marginHeight=" + this.marginHeight + " ";
if (this.topControl != null) string += "topControl=" + this.topControl + " ";
string = string.trim ();
string += "}";
return string;
});
cla$$ = $_C (function () {
this.marginWidth = 0;
this.marginHeight = 0;
this.horizontalSpacing = 1;
this.verticalSpacing = 1;
this.topLeft = null;
this.topCenter = null;
this.topRight = null;
this.content = null;
this.separateTopCenter = false;
this.showBorder = false;
this.separator = -1;
this.borderTop = 0;
this.borderBottom = 0;
this.borderLeft = 0;
this.borderRight = 0;
this.highlight = 0;
this.oldSize = null;
this.selectionBackground = null;
$_Z (this, arguments);
}, $wt.custom, "ViewForm", $wt.widgets.Composite);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.custom.ViewForm, [parent, $wt.custom.ViewForm.checkStyle (style)]);
$_U (this, $wt.custom.ViewForm, "setLayout", [ new $wt.custom.ViewFormLayout ()]);
this.setBorderVisible ((style & $WT.BORDER) != 0);
var listener = (function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.custom.ViewForm$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.custom, "ViewForm$1", null, $wt.widgets.Listener);
$_V (cla$$, "handleEvent", 
function (e) {
switch (e.type) {
case $WT.Dispose:
this.callbacks["$wt.custom.ViewForm"].onDispose ();
break;
case $WT.Paint:
this.callbacks["$wt.custom.ViewForm"].onPaint (e.gc);
break;
case $WT.Resize:
this.callbacks["$wt.custom.ViewForm"].onResize ();
break;
}
}, "$wt.widgets.Event");
cla$$ = $_P ();
}
return $_N ($wt.custom.ViewForm$1, innerThis, finalVars);
}) (this, null);
var events = [$WT.Dispose, $WT.Paint, $WT.Resize];
for (var i = 0; i < events.length; i++) {
this.addListener (events[i], listener);
}
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
var mask = $WT.FLAT | $WT.LEFT_TO_RIGHT | $WT.RIGHT_TO_LEFT;
return style & mask | $WT.NO_REDRAW_RESIZE;
}, "Number");
$_V (cla$$, "computeTrim", 
function (x, y, width, height) {
var trimX = x - this.borderLeft - this.highlight;
var trimY = y - this.borderTop - this.highlight;
var trimWidth = width + this.borderLeft + this.borderRight + 2 * this.highlight;
var trimHeight = height + this.borderTop + this.borderBottom + 2 * this.highlight;
return  new $wt.graphics.Rectangle (trimX, trimY, trimWidth, trimHeight);
}, "Number,Number,Number,Number");
$_M (cla$$, "getClientArea", 
function () {
var clientArea = $_U (this, $wt.custom.ViewForm, "getClientArea", []);
clientArea.x += this.borderLeft;
clientArea.y += this.borderTop;
clientArea.width -= this.borderLeft + this.borderRight;
clientArea.height -= this.borderTop + this.borderBottom;
return clientArea;
});
$_M (cla$$, "getContent", 
function () {
return this.content;
});
$_M (cla$$, "getTopCenter", 
function () {
return this.topCenter;
});
$_M (cla$$, "getTopLeft", 
function () {
return this.topLeft;
});
$_M (cla$$, "getTopRight", 
function () {
return this.topRight;
});
$_M (cla$$, "onDispose", 
function () {
this.topLeft = null;
this.topCenter = null;
this.topRight = null;
this.content = null;
this.oldSize = null;
this.selectionBackground = null;
});
$_M (cla$$, "onPaint", 
function (gc) {
var gcForeground = gc.getForeground ();
var size = this.getSize ();
var border = this.getDisplay ().getSystemColor ($wt.custom.ViewForm.BORDER1_COLOR);
if (this.showBorder) {
gc.setForeground (border);
gc.drawRectangle (0, 0, size.x - 1, size.y - 1);
if (this.highlight > 0) {
var x1 = 1;
var y1 = 1;
var x2 = size.x - 1;
var y2 = size.y - 1;
var shape = [x1, y1, x2, y1, x2, y2, x1, y2, x1, y1 + this.highlight, x1 + this.highlight, y1 + this.highlight, x1 + this.highlight, y2 - this.highlight, x2 - this.highlight, y2 - this.highlight, x2 - this.highlight, y1 + this.highlight, x1, y1 + this.highlight];
var highlightColor = this.getDisplay ().getSystemColor ($WT.COLOR_LIST_SELECTION);
gc.setBackground (highlightColor);
}}if (this.separator > -1) {
gc.setForeground (border);
gc.drawLine (this.borderLeft + this.highlight, this.separator, size.x - this.borderLeft - this.borderRight - this.highlight, this.separator);
}gc.setForeground (gcForeground);
}, "$wt.graphics.GC");
$_M (cla$$, "onResize", 
function () {
var size = this.getSize ();
if (this.oldSize == null || this.oldSize.x == 0 || this.oldSize.y == 0) {
this.redraw ();
} else {
var width = 0;
if (this.oldSize.x < size.x) {
width = size.x - this.oldSize.x + this.borderRight + this.highlight;
} else if (this.oldSize.x > size.x) {
width = this.borderRight + this.highlight;
}this.redraw (size.x - width, 0, width, size.y, false);
var height = 0;
if (this.oldSize.y < size.y) {
height = size.y - this.oldSize.y + this.borderBottom + this.highlight;
}if (this.oldSize.y > size.y) {
height = this.borderBottom + this.highlight;
}this.redraw (0, size.y - height, size.x, height, false);
}this.oldSize = size;
});
$_M (cla$$, "setContent", 
function (content) {
if (content != null && content.getParent () != this) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}if (this.content != null && !this.content.isDisposed ()) {
this.content.setBounds ($wt.custom.ViewForm.OFFSCREEN, $wt.custom.ViewForm.OFFSCREEN, 0, 0);
}this.content = content;
this.layout (false);
}, "$wt.widgets.Control");
$_M (cla$$, "setLayout", 
function (layout) {
return ;
}, "$wt.widgets.Layout");
$_M (cla$$, "setSelectionBackground", 
function (color) {
if (this.selectionBackground == color) return ;
if (color == null) color = this.getDisplay ().getSystemColor ($wt.custom.ViewForm.SELECTION_BACKGROUND);
this.selectionBackground = color;
this.redraw ();
}, "$wt.graphics.Color");
$_M (cla$$, "setTopCenter", 
function (topCenter) {
if (topCenter != null && topCenter.getParent () != this) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}if (this.topCenter != null && !this.topCenter.isDisposed ()) {
var size = this.topCenter.getSize ();
this.topCenter.setLocation ($wt.custom.ViewForm.OFFSCREEN - size.x, $wt.custom.ViewForm.OFFSCREEN - size.y);
}this.topCenter = topCenter;
this.layout (false);
}, "$wt.widgets.Control");
$_M (cla$$, "setTopLeft", 
function (c) {
if (c != null && c.getParent () != this) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}if (this.topLeft != null && !this.topLeft.isDisposed ()) {
var size = this.topLeft.getSize ();
this.topLeft.setLocation ($wt.custom.ViewForm.OFFSCREEN - size.x, $wt.custom.ViewForm.OFFSCREEN - size.y);
}this.topLeft = c;
this.layout (false);
}, "$wt.widgets.Control");
$_M (cla$$, "setTopRight", 
function (c) {
if (c != null && c.getParent () != this) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}if (this.topRight != null && !this.topRight.isDisposed ()) {
var size = this.topRight.getSize ();
this.topRight.setLocation ($wt.custom.ViewForm.OFFSCREEN - size.x, $wt.custom.ViewForm.OFFSCREEN - size.y);
}this.topRight = c;
this.layout (false);
}, "$wt.widgets.Control");
$_M (cla$$, "setBorderVisible", 
function (show) {
if (this.showBorder == show) return ;
this.showBorder = show;
if (this.showBorder) {
this.borderLeft = this.borderTop = this.borderRight = this.borderBottom = 1;
if ((this.getStyle () & $WT.FLAT) == 0) this.highlight = 2;
} else {
this.borderBottom = this.borderTop = this.borderLeft = this.borderRight = 0;
this.highlight = 0;
}this.layout (false);
this.redraw ();
}, "Boolean");
$_M (cla$$, "setTopCenterSeparate", 
function (show) {
this.separateTopCenter = show;
this.layout (false);
}, "Boolean");
cla$$.borderInsideRGB = cla$$.prototype.borderInsideRGB =  new $wt.graphics.RGB (132, 130, 132);
cla$$.borderMiddleRGB = cla$$.prototype.borderMiddleRGB =  new $wt.graphics.RGB (143, 141, 138);
cla$$.borderOutsideRGB = cla$$.prototype.borderOutsideRGB =  new $wt.graphics.RGB (171, 168, 165);
$_S (cla$$,
"OFFSCREEN", -200);
cla$$.BORDER1_COLOR = cla$$.prototype.BORDER1_COLOR = $WT.COLOR_WIDGET_NORMAL_SHADOW;
cla$$.SELECTION_BACKGROUND = cla$$.prototype.SELECTION_BACKGROUND = $WT.COLOR_LIST_BACKGROUND;
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.custom, "ViewFormLayout", $wt.widgets.Layout);
$_V (cla$$, "computeSize", 
function (composite, wHint, hHint, flushCache) {
var form = composite;
var left = form.topLeft;
var center = form.topCenter;
var right = form.topRight;
var content = form.content;
var leftSize =  new $wt.graphics.Point (0, 0);
if (left != null) {
leftSize = this.computeChildSize (left, $WT.DEFAULT, $WT.DEFAULT, flushCache);
}var centerSize =  new $wt.graphics.Point (0, 0);
if (center != null) {
centerSize = this.computeChildSize (center, $WT.DEFAULT, $WT.DEFAULT, flushCache);
}var rightSize =  new $wt.graphics.Point (0, 0);
if (right != null) {
rightSize = this.computeChildSize (right, $WT.DEFAULT, $WT.DEFAULT, flushCache);
}var size =  new $wt.graphics.Point (0, 0);
if (form.separateTopCenter || (wHint != $WT.DEFAULT && leftSize.x + centerSize.x + rightSize.x > wHint)) {
size.x = leftSize.x + rightSize.x;
if (leftSize.x > 0 && rightSize.x > 0) size.x += form.horizontalSpacing;
size.x = Math.max (centerSize.x, size.x);
size.y = Math.max (leftSize.y, rightSize.y);
if (center != null) {
size.y += centerSize.y;
if (left != null || right != null) size.y += form.verticalSpacing;
}} else {
size.x = leftSize.x + centerSize.x + rightSize.x;
var count = -1;
if (leftSize.x > 0) count++;
if (centerSize.x > 0) count++;
if (rightSize.x > 0) count++;
if (count > 0) size.x += count * form.horizontalSpacing;
size.y = Math.max (leftSize.y, Math.max (centerSize.y, rightSize.y));
}if (content != null) {
if (left != null || right != null || center != null) size.y += 1;
var contentSize =  new $wt.graphics.Point (0, 0);
contentSize = this.computeChildSize (content, $WT.DEFAULT, $WT.DEFAULT, flushCache);
size.x = Math.max (size.x, contentSize.x);
size.y += contentSize.y;
if (size.y > contentSize.y) size.y += form.verticalSpacing;
}size.x += 2 * form.marginWidth;
size.y += 2 * form.marginHeight;
if (wHint != $WT.DEFAULT) size.x = wHint;
if (hHint != $WT.DEFAULT) size.y = hHint;
return size;
}, "$wt.widgets.Composite,Number,Number,Boolean");
$_M (cla$$, "computeChildSize", 
function (control, wHint, hHint, flushCache) {
var data = control.getLayoutData ();
if (data == null || !($_O (data, $wt.custom.CLayoutData))) {
data =  new $wt.custom.CLayoutData ();
control.setLayoutData (data);
}return (data).computeSize (control, wHint, hHint, flushCache);
}, "$wt.widgets.Control,Number,Number,Boolean");
$_M (cla$$, "computeTrim", 
function (c) {
if ($_O (c, $wt.widgets.Scrollable)) {
var rect = (c).computeTrim (0, 0, 0, 0);
return rect.width;
}return c.getBorderWidth () * 2;
}, "$wt.widgets.Control");
$_V (cla$$, "flushCache", 
function (control) {
var data = control.getLayoutData ();
if (data != null && $_O (data, $wt.custom.CLayoutData)) (data).flushCache ();
return true;
}, "$wt.widgets.Control");
$_V (cla$$, "layout", 
function (composite, flushCache) {
var form = composite;
var left = form.topLeft;
var center = form.topCenter;
var right = form.topRight;
var content = form.content;
var rect = composite.getClientArea ();
var leftSize =  new $wt.graphics.Point (0, 0);
if (left != null && !left.isDisposed ()) {
leftSize = this.computeChildSize (left, $WT.DEFAULT, $WT.DEFAULT, flushCache);
}var centerSize =  new $wt.graphics.Point (0, 0);
if (center != null && !center.isDisposed ()) {
centerSize = this.computeChildSize (center, $WT.DEFAULT, $WT.DEFAULT, flushCache);
}var rightSize =  new $wt.graphics.Point (0, 0);
if (right != null && !right.isDisposed ()) {
rightSize = this.computeChildSize (right, $WT.DEFAULT, $WT.DEFAULT, flushCache);
}var minTopWidth = leftSize.x + centerSize.x + rightSize.x + 2 * form.marginWidth + 2 * form.highlight;
var count = -1;
if (leftSize.x > 0) count++;
if (centerSize.x > 0) count++;
if (rightSize.x > 0) count++;
if (count > 0) minTopWidth += count * form.horizontalSpacing;
var x = rect.x + rect.width - form.marginWidth - form.highlight;
var y = rect.y + form.marginHeight + form.highlight;
var top = false;
if (form.separateTopCenter || minTopWidth > rect.width) {
var topHeight = Math.max (rightSize.y, leftSize.y);
if (right != null && !right.isDisposed ()) {
top = true;
x -= rightSize.x;
right.setBounds (x, y, rightSize.x, topHeight);
x -= form.horizontalSpacing;
}if (left != null && !left.isDisposed ()) {
top = true;
var trim = this.computeTrim (left);
var leftW = x - rect.x - form.marginWidth - form.highlight - trim;
leftSize = this.computeChildSize (left, leftW, $WT.DEFAULT, false);
left.setBounds (rect.x + form.marginWidth + form.highlight, y, leftSize.x, topHeight);
}if (top) y += topHeight + form.verticalSpacing;
if (center != null && !center.isDisposed ()) {
top = true;
var trim = this.computeTrim (center);
var w = rect.width - 2 * form.marginWidth - 2 * form.highlight - trim;
centerSize = this.computeChildSize (center, w, $WT.DEFAULT, false);
center.setBounds (rect.x + rect.width - form.marginWidth - form.highlight - centerSize.x, y, centerSize.x, centerSize.y);
y += centerSize.y + form.verticalSpacing;
}} else {
var topHeight = Math.max (rightSize.y, Math.max (centerSize.y, leftSize.y));
if (right != null && !right.isDisposed ()) {
top = true;
x -= rightSize.x;
right.setBounds (x, y, rightSize.x, topHeight);
x -= form.horizontalSpacing;
}if (center != null && !center.isDisposed ()) {
top = true;
x -= centerSize.x;
center.setBounds (x, y, centerSize.x, topHeight);
x -= form.horizontalSpacing;
}if (left != null && !left.isDisposed ()) {
top = true;
var trim = $_O (left, $wt.widgets.Composite) ? (left).computeTrim (0, 0, 0, 0) :  new $wt.graphics.Rectangle (0, 0, 0, 0);
var w = x - rect.x - form.marginWidth - form.highlight - trim.width;
var h = topHeight - trim.height;
leftSize = this.computeChildSize (left, w, h, false);
left.setBounds (rect.x + form.marginWidth + form.highlight, y, leftSize.x, topHeight);
}if (top) y += topHeight + form.verticalSpacing;
}var oldSeperator = form.separator;
form.separator = -1;
if (content != null && !content.isDisposed ()) {
if (left != null || right != null || center != null) {
form.separator = y;
y++;
}content.setBounds (rect.x + form.marginWidth + form.highlight, y, rect.width - 2 * form.marginWidth - 2 * form.highlight, rect.y + rect.height - y - form.marginHeight - form.highlight);
}if (oldSeperator != -1 && form.separator != -1) {
var t = Math.min (form.separator, oldSeperator);
var b = Math.max (form.separator, oldSeperator);
form.redraw (form.borderLeft, t, form.getSize ().x - form.borderLeft - form.borderRight, b - t, false);
}}, "$wt.widgets.Composite,Boolean");
cla$$ = $_C (function () {
this.align = $WT.LEFT;
this.hIndent = $wt.custom.CLabel.INDENT;
this.vIndent = $wt.custom.CLabel.INDENT;
this.text = null;
this.image = null;
this.appToolTipText = null;
this.backgroundImage = null;
this.gradientColors = null;
this.gradientPercents = null;
this.gradientVertical = false;
$_Z (this, arguments);
}, $wt.custom, "CLabel", $wt.widgets.Canvas);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.custom.CLabel, [parent, $wt.custom.CLabel.checkStyle (style)]);
if ((style & ($WT.CENTER | $WT.RIGHT)) == 0) style |= $WT.LEFT;
if ((style & $WT.CENTER) != 0) this.align = $WT.CENTER;
if ((style & $WT.RIGHT) != 0) this.align = $WT.RIGHT;
if ((style & $WT.LEFT) != 0) this.align = $WT.LEFT;
this.addPaintListener ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.custom.CLabel$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.custom, "CLabel$1", null, $wt.events.PaintListener);
$_V (cla$$, "paintControl", 
function (event) {
this.callbacks["$wt.custom.CLabel"].onPaint (event);
}, "$wt.events.PaintEvent");
cla$$ = $_P ();
}
return $_N ($wt.custom.CLabel$1, innerThis, finalVars);
}) (this, null));
this.addDisposeListener ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.custom.CLabel$2")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.custom, "CLabel$2", null, $wt.events.DisposeListener);
$_V (cla$$, "widgetDisposed", 
function (event) {
this.callbacks["$wt.custom.CLabel"].onDispose (event);
}, "$wt.events.DisposeEvent");
cla$$ = $_P ();
}
return $_N ($wt.custom.CLabel$2, innerThis, finalVars);
}) (this, null));
this.addTraverseListener ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.custom.CLabel$3")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.custom, "CLabel$3", null, $wt.events.TraverseListener);
$_V (cla$$, "keyTraversed", 
function (event) {
if (event.detail == $WT.TRAVERSE_MNEMONIC) {
this.callbacks["$wt.custom.CLabel"].onMnemonic (event);
}}, "$wt.events.TraverseEvent");
cla$$ = $_P ();
}
return $_N ($wt.custom.CLabel$3, innerThis, finalVars);
}) (this, null));
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
($fz = function (style) {
if ((style & $WT.BORDER) != 0) style |= $WT.SHADOW_IN;
var mask = $WT.SHADOW_IN | $WT.SHADOW_OUT | $WT.SHADOW_NONE | $WT.LEFT_TO_RIGHT | $WT.RIGHT_TO_LEFT;
style = style & mask;
style |= $WT.NO_FOCUS;
var platform = $WT.getPlatform ();
if ("carbon".equals (platform) || "gtk".equals (platform)) return style;
return style | $WT.NO_BACKGROUND;
}, $fz.isPrivate = true, $fz), "Number");
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var e = this.getTotalSize (this.image, this.text);
if (wHint == $WT.DEFAULT) {
e.x += 2 * this.hIndent;
} else {
e.x = wHint;
}if (hHint == $WT.DEFAULT) {
e.y += 2 * this.vIndent;
} else {
e.y = hHint;
}return e;
}, "Number,Number,Boolean");
$_M (cla$$, "drawBevelRect", 
($fz = function (gc, x, y, w, h, topleft, bottomright) {
gc.setForeground (bottomright);
gc.drawLine (x + w, y, x + w, y + h);
gc.drawLine (x, y + h, x + w, y + h);
gc.setForeground (topleft);
gc.drawLine (x, y, x + w - 1, y);
gc.drawLine (x, y, x, y + h - 1);
}, $fz.isPrivate = true, $fz), "$wt.graphics.GC,Number,Number,Number,Number,$wt.graphics.Color,$wt.graphics.Color");
$_M (cla$$, "_findMnemonic", 
function (string) {
if (string == null) return '\0';
var index = 0;
var length = string.length;
do {
while (index < length && (string.charAt (index)).charCodeAt (0) != ('&').charCodeAt (0)) index++;

if (++index >= length) return '\0';
if ((string.charAt (index)).charCodeAt (0) != ('&').charCodeAt (0)) return string.charAt (index);
index++;
} while (index < length);
return '\0';
}, "String");
$_M (cla$$, "getAlignment", 
function () {
return this.align;
});
$_M (cla$$, "getImage", 
function () {
return this.image;
});
$_M (cla$$, "getTotalSize", 
($fz = function (image, text) {
var size =  new $wt.graphics.Point (0, 0);
if (image != null) {
var r = image.getBounds ();
size.x += r.width;
size.y += r.height;
}var gc =  new $wt.graphics.GC (this);
if (text != null && text.length > 0) {
var e = gc.textExtent (text, $wt.custom.CLabel.DRAW_FLAGS);
size.x += e.x;
size.y = Math.max (size.y, e.y);
if (image != null) size.x += $wt.custom.CLabel.GAP;
} else {
size.y = Math.max (size.y, gc.getFontMetrics ().getHeight ());
}gc.dispose ();
return size;
}, $fz.isPrivate = true, $fz), "$wt.graphics.Image,String");
$_M (cla$$, "getStyle", 
function () {
var style = $_U (this, $wt.custom.CLabel, "getStyle", []);
switch (this.align) {
case $WT.RIGHT:
style |= $WT.RIGHT;
break;
case $WT.CENTER:
style |= $WT.CENTER;
break;
case $WT.LEFT:
style |= $WT.LEFT;
break;
}
return style;
});
$_M (cla$$, "getText", 
function () {
return this.text;
});
$_M (cla$$, "getToolTipText", 
function () {
return this.appToolTipText;
});
$_M (cla$$, "onDispose", 
function (event) {
this.gradientColors = null;
this.gradientPercents = null;
this.backgroundImage = null;
this.text = null;
this.image = null;
this.appToolTipText = null;
}, "$wt.events.DisposeEvent");
$_M (cla$$, "onMnemonic", 
function (event) {
var mnemonic = this._findMnemonic (this.text);
if ((mnemonic).charCodeAt (0) == ('\0').charCodeAt (0)) return ;
if ((Character.toUpperCase (event.character)).charCodeAt (0) != (Character.toUpperCase (mnemonic)).charCodeAt (0)) return ;
var control = this.getParent ();
while (control != null) {
var children = control.getChildren ();
var index = 0;
while (index < children.length) {
if (children[index] == this) break;
index++;
}
index++;
if (index < children.length) {
if (children[index].setFocus ()) {
event.doit = true;
event.detail = $WT.TRAVERSE_NONE;
}}control = control.getParent ();
}
}, "$wt.events.TraverseEvent");
$_M (cla$$, "onPaint", 
function (event) {
var rect = this.getClientArea ();
for (var i = this.handle.childNodes.length - 1; i >= 0; i--) {
this.handle.removeChild (this.handle.childNodes[i]);
}
if (rect.width == 0 || rect.height == 0) return ;
var shortenText = false;
var t = this.text;
var img = this.image;
var availableWidth = Math.max (0, rect.width - 2 * this.hIndent);
var extent = this.getTotalSize (img, t);
if (extent.x > availableWidth) {
img = null;
extent = this.getTotalSize (img, t);
if (extent.x > availableWidth) {
shortenText = true;
}}var gc = event.gc;
var lines = this.text == null ? null : this.splitString (this.text);
if (shortenText) {
extent.x = 0;
for (var i = 0; i < lines.length; i++) {
var e = gc.textExtent (lines[i], $wt.custom.CLabel.DRAW_FLAGS);
if (e.x > availableWidth) {
lines[i] = this.shortenText (gc, lines[i], availableWidth);
extent.x = Math.max (extent.x, this.getTotalSize (null, lines[i]).x);
} else {
extent.x = Math.max (extent.x, e.x);
}}
if (this.appToolTipText == null) {
$_U (this, $wt.custom.CLabel, "setToolTipText", [this.text]);
}} else {
$_U (this, $wt.custom.CLabel, "setToolTipText", [this.appToolTipText]);
}var x = rect.x + this.hIndent;
if (this.align == $WT.CENTER) {
x = Math.floor ((rect.width - extent.x) / 2);
}if (this.align == $WT.RIGHT) {
x = rect.width - this.hIndent - extent.x;
}try {
if (this.backgroundImage != null) {
var imageRect = this.backgroundImage.getBounds ();
gc.setBackground (this.getBackground ());
gc.fillRectangle (rect);
var xPos = 0;
while (xPos < rect.width) {
var yPos = 0;
while (yPos < rect.height) {
gc.drawImage (this.backgroundImage, xPos, yPos);
yPos += imageRect.height;
}
xPos += imageRect.width;
}
} else if (this.gradientColors != null) {
var oldBackground = gc.getBackground ();
if (this.gradientColors.length == 1) {
if (this.gradientColors[0] != null) gc.setBackground (this.gradientColors[0]);
gc.fillRectangle (0, 0, rect.width, rect.height);
} else {
var oldForeground = gc.getForeground ();
var lastColor = this.gradientColors[0];
if (lastColor == null) lastColor = oldBackground;
var pos = 0;
for (var i = 0; i < this.gradientPercents.length; ++i) {
gc.setForeground (lastColor);
lastColor = this.gradientColors[i + 1];
if (lastColor == null) lastColor = oldBackground;
gc.setBackground (lastColor);
if (this.gradientVertical) {
var gradientHeight = (Math.floor (this.gradientPercents[i] * rect.height / 100)) - pos;
gc.fillGradientRectangle (0, pos, rect.width, gradientHeight, true);
pos += gradientHeight;
} else {
var gradientWidth = (Math.floor (this.gradientPercents[i] * rect.width / 100)) - pos;
gc.fillGradientRectangle (pos, 0, gradientWidth, rect.height, false);
pos += gradientWidth;
}}
if (this.gradientVertical && pos < rect.height) {
gc.setBackground (this.getBackground ());
System.out.println ("$$$$$$$$$$$$$");
gc.fillRectangle (0, pos, rect.width, rect.height - pos);
}if (!this.gradientVertical && pos < rect.width) {
gc.setBackground (this.getBackground ());
System.out.println ("***********");
gc.fillRectangle (pos, 0, rect.width - pos, rect.height);
}gc.setForeground (oldForeground);
}gc.setBackground (oldBackground);
} else {
if ((this.getStyle () & $WT.NO_BACKGROUND) != 0) {
gc.setBackground (this.getBackground ());
System.out.println ("============" + rect);
gc.fillRectangle (rect);
}}} catch (e) {
if ($_O (e, $wt.SWTException)) {
if ((this.getStyle () & $WT.NO_BACKGROUND) != 0) {
gc.setBackground (this.getBackground ());
System.out.println ("--------");
gc.fillRectangle (rect);
}} else {
throw e;
}
}
var style = this.getStyle ();
if ((style & $WT.SHADOW_IN) != 0 || (style & $WT.SHADOW_OUT) != 0) {
this.paintBorder (gc, rect);
}if (img != null) {
var imageRect = img.getBounds ();
gc.drawImage (img, 0, 0, imageRect.width, imageRect.height, x, Math.floor ((rect.height - imageRect.height) / 2), imageRect.width, imageRect.height);
x += imageRect.width + $wt.custom.CLabel.GAP;
extent.x -= imageRect.width + $wt.custom.CLabel.GAP;
}if (lines != null) {
var lineHeight = gc.getFontMetrics ().getHeight ();
var textHeight = lines.length * lineHeight;
var lineY = Math.max (this.vIndent, rect.y + Math.floor ((rect.height - textHeight) / 2));
gc.setForeground (this.getForeground ());
for (var i = 0; i < lines.length; i++) {
var lineX = x;
if (lines.length > 1) {
if (this.align == $WT.CENTER) {
var lineWidth = gc.textExtent (lines[i], $wt.custom.CLabel.DRAW_FLAGS).x;
lineX = x + Math.max (0, Math.floor ((extent.x - lineWidth) / 2));
}if (this.align == $WT.RIGHT) {
var lineWidth = gc.textExtent (lines[i], $wt.custom.CLabel.DRAW_FLAGS).x;
lineX = Math.max (x, rect.x + rect.width - this.hIndent - lineWidth);
}}gc.drawText (lines[i], lineX, lineY, $wt.custom.CLabel.DRAW_FLAGS);
lineY += lineHeight;
}
}System.out.println ("end on paint");
System.out.println (this.getSize ());
}, "$wt.events.PaintEvent");
$_M (cla$$, "paintBorder", 
($fz = function (gc, r) {
var disp = this.getDisplay ();
var c1 = null;
var c2 = null;
var style = this.getStyle ();
if ((style & $WT.SHADOW_IN) != 0) {
c1 = disp.getSystemColor ($WT.COLOR_WIDGET_NORMAL_SHADOW);
c2 = disp.getSystemColor ($WT.COLOR_WIDGET_HIGHLIGHT_SHADOW);
}if ((style & $WT.SHADOW_OUT) != 0) {
c1 = disp.getSystemColor ($WT.COLOR_WIDGET_LIGHT_SHADOW);
c2 = disp.getSystemColor ($WT.COLOR_WIDGET_NORMAL_SHADOW);
}if (c1 != null && c2 != null) {
gc.setLineWidth (1);
this.drawBevelRect (gc, r.x, r.y, r.width - 1, r.height - 1, c1, c2);
}}, $fz.isPrivate = true, $fz), "$wt.graphics.GC,$wt.graphics.Rectangle");
$_M (cla$$, "setAlignment", 
function (align) {
if (align != $WT.LEFT && align != $WT.RIGHT && align != $WT.CENTER) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}if (this.align != align) {
this.align = align;
this.redraw ();
}}, "Number");
$_M (cla$$, "setBackground", 
function (color) {
$_U (this, $wt.custom.CLabel, "setBackground", [color]);
if (color != null && this.backgroundImage == null && this.gradientColors == null && this.gradientPercents == null) {
var background = this.getBackground ();
if (color.equals (background)) {
return ;
}}this.backgroundImage = null;
this.gradientColors = null;
this.gradientPercents = null;
this.redraw ();
}, "$wt.graphics.Color");
$_M (cla$$, "setBackground", 
function (colors, percents) {
this.setBackground (colors, percents, false);
}, "Array,Array");
$_M (cla$$, "setBackground", 
function (colors, percents, vertical) {
if (colors != null) {
if (percents == null || percents.length != colors.length - 1) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}if (this.getDisplay ().getDepth () < 15) {
colors = [colors[colors.length - 1]];
percents = [];
}for (var i = 0; i < percents.length; i++) {
if (percents[i] < 0 || percents[i] > 100) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}if (i > 0 && percents[i] < percents[i - 1]) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}}
}var background = this.getBackground ();
if (this.backgroundImage == null) {
if ((this.gradientColors != null) && (colors != null) && (this.gradientColors.length == colors.length)) {
var same = false;
for (var i = 0; i < this.gradientColors.length; i++) {
same = (this.gradientColors[i] == colors[i]) || ((this.gradientColors[i] == null) && (colors[i] == background)) || ((this.gradientColors[i] == background) && (colors[i] == null));
if (!same) break;
}
if (same) {
for (var i = 0; i < this.gradientPercents.length; i++) {
same = this.gradientPercents[i] == percents[i];
if (!same) break;
}
}if (same && this.gradientVertical == vertical) return ;
}} else {
this.backgroundImage = null;
}if (colors == null) {
this.gradientColors = null;
this.gradientPercents = null;
this.gradientVertical = false;
} else {
this.gradientColors =  new Array (colors.length);
for (var i = 0; i < colors.length; ++i) this.gradientColors[i] = (colors[i] != null) ? colors[i] : background;

this.gradientPercents =  $_A (percents.length, 0);
for (var i = 0; i < percents.length; ++i) this.gradientPercents[i] = percents[i];

this.gradientVertical = vertical;
}this.redraw ();
}, "Array,Array,Boolean");
$_M (cla$$, "setBackground", 
function (image) {
if (image == this.backgroundImage) return ;
if (image != null) {
this.gradientColors = null;
this.gradientPercents = null;
}this.backgroundImage = image;
this.redraw ();
}, "$wt.graphics.Image");
$_M (cla$$, "setFont", 
function (font) {
$_U (this, $wt.custom.CLabel, "setFont", [font]);
this.redraw ();
}, "$wt.graphics.Font");
$_M (cla$$, "setImage", 
function (image) {
if (image != this.image) {
this.image = image;
this.redraw ();
}}, "$wt.graphics.Image");
$_M (cla$$, "setText", 
function (text) {
if (text == null) text = "";
if (!text.equals (this.text)) {
this.text = text;
this.redraw ();
}}, "String");
$_M (cla$$, "setToolTipText", 
function (string) {
$_U (this, $wt.custom.CLabel, "setToolTipText", [string]);
this.appToolTipText = $_U (this, $wt.custom.CLabel, "getToolTipText", []);
}, "String");
$_M (cla$$, "shortenText", 
function (gc, t, width) {
if (t == null) return null;
var w = gc.textExtent ($wt.custom.CLabel.ELLIPSIS, $wt.custom.CLabel.DRAW_FLAGS).x;
var l = t.length;
var pivot = Math.floor (l / 2);
var s = pivot;
var e = pivot + 1;
while (s >= 0 && e < l) {
var s1 = t.substring (0, s);
var s2 = t.substring (e, l);
var l1 = gc.textExtent (s1, $wt.custom.CLabel.DRAW_FLAGS).x;
var l2 = gc.textExtent (s2, $wt.custom.CLabel.DRAW_FLAGS).x;
if (l1 + w + l2 < width) {
t = s1 + $wt.custom.CLabel.ELLIPSIS + s2;
break;
}s--;
e++;
}
return t;
}, "$wt.graphics.GC,String,Number");
$_M (cla$$, "splitString", 
($fz = function (text) {
var lines =  new Array (1);
var start = 0;
var pos;
do {
pos = text.indexOf ('\n', start);
if (pos == -1) {
lines[lines.length - 1] = text.substring (start);
} else {
var crlf = (pos > 0) && ((text.charAt (pos - 1)).charCodeAt (0) == ('\r').charCodeAt (0));
lines[lines.length - 1] = text.substring (start, pos - (crlf ? 1 : 0));
start = pos + 1;
var newLines =  new Array (lines.length + 1);
System.arraycopy (lines, 0, newLines, 0, lines.length);
lines = newLines;
}} while (pos != -1);
return lines;
}, $fz.isPrivate = true, $fz), "String");
$_S (cla$$,
"GAP", 5,
"INDENT", 3,
"ELLIPSIS", "...");
cla$$.DRAW_FLAGS = cla$$.prototype.DRAW_FLAGS = $WT.DRAW_MNEMONIC | $WT.DRAW_TAB | $WT.DRAW_TRANSPARENT | $WT.DRAW_DELIMITER;
cla$$ = $_C (function () {
this.defaultWidth = -1;
this.defaultHeight = -1;
this.currentWhint = 0;
this.currentHhint = 0;
this.currentWidth = -1;
this.currentHeight = -1;
$_Z (this, arguments);
}, $wt.custom, "CLayoutData");
$_M (cla$$, "computeSize", 
function (control, wHint, hHint, flushCache) {
if (flushCache) this.flushCache ();
if (wHint == $WT.DEFAULT && hHint == $WT.DEFAULT) {
if (this.defaultWidth == -1 || this.defaultHeight == -1) {
var size = control.computeSize (wHint, hHint, flushCache);
this.defaultWidth = size.x;
this.defaultHeight = size.y;
}return  new $wt.graphics.Point (this.defaultWidth, this.defaultHeight);
}if (this.currentWidth == -1 || this.currentHeight == -1 || wHint != this.currentWhint || hHint != this.currentHhint) {
var size = control.computeSize (wHint, hHint, flushCache);
this.currentWhint = wHint;
this.currentHhint = hHint;
this.currentWidth = size.x;
this.currentHeight = size.y;
}return  new $wt.graphics.Point (this.currentWidth, this.currentHeight);
}, "$wt.widgets.Control,Number,Number,Boolean");
$_M (cla$$, "flushCache", 
function () {
this.defaultWidth = this.defaultHeight = -1;
this.currentWidth = this.currentHeight = -1;
});
cla$$ = $_C (function () {
this.left = null;
this.right = null;
this.bottom = null;
this.simple = true;
this.curve = null;
this.curveStart = 0;
this.curveRect =  new $wt.graphics.Rectangle (0, 0, 0, 0);
this.curve_width = 5;
this.curve_indent = -2;
this.rightWidth = $WT.DEFAULT;
this.rightMinWidth = $WT.DEFAULT;
this.rightMinHeight = $WT.DEFAULT;
this.resizeCursor = null;
this.dragging = false;
this.rightDragDisplacement = 0;
$_Z (this, arguments);
}, $wt.custom, "CBanner", $wt.widgets.Composite);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.custom.CBanner, [parent, $wt.custom.CBanner.checkStyle (style)]);
$_U (this, $wt.custom.CBanner, "setLayout", [ new $wt.custom.CBannerLayout ()]);
this.updateCurve (25);
this.resizeCursor =  new $wt.graphics.Cursor (this.getDisplay (), $WT.CURSOR_SIZEWE);
var listener = (function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.custom.CBanner$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.custom, "CBanner$1", null, $wt.widgets.Listener);
$_V (cla$$, "handleEvent", 
function (e) {
switch (e.type) {
case $WT.Dispose:
this.callbacks["$wt.custom.CBanner"].onDispose ();
break;
case $WT.MouseDown:
this.callbacks["$wt.custom.CBanner"].onMouseDown (e.x, e.y);
break;
case $WT.MouseExit:
this.callbacks["$wt.custom.CBanner"].onMouseExit ();
break;
case $WT.MouseMove:
this.callbacks["$wt.custom.CBanner"].onMouseMove (e.x, e.y);
break;
case $WT.MouseUp:
this.callbacks["$wt.custom.CBanner"].onMouseUp ();
break;
case $WT.Paint:
this.callbacks["$wt.custom.CBanner"].onPaint (e.gc);
break;
case $WT.Resize:
this.callbacks["$wt.custom.CBanner"].onResize ();
break;
}
}, "$wt.widgets.Event");
cla$$ = $_P ();
}
return $_N ($wt.custom.CBanner$1, innerThis, finalVars);
}) (this, null);
var events = [$WT.Dispose, $WT.MouseDown, $WT.MouseExit, $WT.MouseMove, $WT.MouseUp, $WT.Paint, $WT.Resize];
for (var i = 0; i < events.length; i++) {
this.addListener (events[i], listener);
}
}, "$wt.widgets.Composite,Number");
cla$$.bezier = $_M (cla$$, "bezier", 
function (x0, y0, x1, y1, x2, y2, x3, y3, count) {
var a0 = x0;
var a1 = 3 * (x1 - x0);
var a2 = 3 * (x0 + x2 - 2 * x1);
var a3 = x3 - x0 + 3 * x1 - 3 * x2;
var b0 = y0;
var b1 = 3 * (y1 - y0);
var b2 = 3 * (y0 + y2 - 2 * y1);
var b3 = y3 - y0 + 3 * y1 - 3 * y2;
var polygon =  $_A (2 * count + 2, 0);
for (var i = 0; i <= count; i++) {
var t = i / count;
polygon[2 * i] = parseInt ((a0 + a1 * t + a2 * t * t + a3 * t * t * t));
polygon[2 * i + 1] = parseInt ((b0 + b1 * t + b2 * t * t + b3 * t * t * t));
}
return polygon;
}, "Number,Number,Number,Number,Number,Number,Number,Number,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
return $WT.NONE;
}, "Number");
$_M (cla$$, "getBottom", 
function () {
return this.bottom;
});
$_V (cla$$, "getClientArea", 
function () {
return  new $wt.graphics.Rectangle (0, 0, 0, 0);
});
$_M (cla$$, "getLeft", 
function () {
return this.left;
});
$_M (cla$$, "getRight", 
function () {
return this.right;
});
$_M (cla$$, "getRightMinimumSize", 
function () {
return  new $wt.graphics.Point (this.rightMinWidth, this.rightMinHeight);
});
$_M (cla$$, "getRightWidth", 
function () {
if (this.right == null) return 0;
if (this.rightWidth == $WT.DEFAULT) {
var size = this.right.computeSize ($WT.DEFAULT, this.getSize ().y, false);
return size.x;
}return this.rightWidth;
});
$_M (cla$$, "getSimple", 
function () {
return this.simple;
});
$_M (cla$$, "onDispose", 
function () {
if (this.resizeCursor != null) this.resizeCursor.dispose ();
this.resizeCursor = null;
this.left = null;
this.right = null;
});
$_M (cla$$, "onMouseDown", 
function (x, y) {
if (this.curveRect.contains (x, y)) {
this.dragging = true;
this.rightDragDisplacement = this.curveStart - x + this.curve_width - this.curve_indent;
}}, "Number,Number");
$_M (cla$$, "onMouseExit", 
function () {
if (!this.dragging) this.setCursor (null);
});
$_M (cla$$, "onMouseMove", 
function (x, y) {
if (this.dragging) {
var size = this.getSize ();
if (!(0 < x && x < size.x)) return ;
this.rightWidth = Math.max (0, size.x - x - this.rightDragDisplacement);
if (this.rightMinWidth != $WT.DEFAULT) {
this.rightWidth = Math.max (this.rightMinWidth, this.rightWidth);
}this.layout (false);
return ;
}if (this.curveRect.contains (x, y)) {
this.setCursor (this.resizeCursor);
} else {
this.setCursor (null);
}}, "Number,Number");
$_M (cla$$, "onMouseUp", 
function () {
this.dragging = false;
});
$_M (cla$$, "onPaint", 
function (gc) {
var size = this.getSize ();
var border1 = this.getDisplay ().getSystemColor ($wt.custom.CBanner.BORDER1);
if (this.bottom != null && (this.left != null || this.right != null)) {
gc.setForeground (border1);
var y = this.bottom.getBounds ().y - $wt.custom.CBanner.BORDER_STRIPE - 1;
gc.drawLine (0, y, size.x, y);
}if (this.left == null || this.right == null) return ;
var line1 =  $_A (this.curve.length + 6, 0);
var index = 0;
var x = this.curveStart;
var y = 0;
line1[index++] = x + 1;
line1[index++] = size.y - $wt.custom.CBanner.BORDER_STRIPE;
for (var i = 0; i < Math.floor (this.curve.length / 2); i++) {
line1[index++] = x + this.curve[2 * i];
line1[index++] = y + this.curve[2 * i + 1];
}
line1[index++] = x + this.curve_width;
line1[index++] = 0;
line1[index++] = size.x;
line1[index++] = 0;
var background = this.getBackground ();
if (this.getDisplay ().getDepth () >= 15) {
var line2 =  $_A (line1.length, 0);
index = 0;
for (var i = 0; i < Math.floor (line1.length / 2); i++) {
line2[index] = line1[index++] - 1;
line2[index] = line1[index++];
}
var line3 =  $_A (line1.length, 0);
index = 0;
for (var i = 0; i < Math.floor (line1.length / 2); i++) {
line3[index] = line1[index++] + 1;
line3[index] = line1[index++];
}
var from = border1.getRGB ();
var to = background.getRGB ();
var red = from.red + Math.floor (3 * (to.red - from.red) / 4);
var green = from.green + Math.floor (3 * (to.green - from.green) / 4);
var blue = from.blue + Math.floor (3 * (to.blue - from.blue) / 4);
var color =  new $wt.graphics.Color (this.getDisplay (), red, green, blue);
gc.setForeground (color);
color.dispose ();
var x1 = Math.max (0, this.curveStart - $wt.custom.CBanner.CURVE_TAIL);
gc.setForeground (background);
gc.setBackground (border1);
gc.fillGradientRectangle (x1, size.y - $wt.custom.CBanner.BORDER_STRIPE, this.curveStart - x1 + 1, 1, false);
} else {
var x1 = Math.max (0, this.curveStart - $wt.custom.CBanner.CURVE_TAIL);
gc.setForeground (border1);
gc.drawLine (x1, size.y - $wt.custom.CBanner.BORDER_STRIPE, this.curveStart + 1, size.y - $wt.custom.CBanner.BORDER_STRIPE);
}gc.setForeground (border1);
}, "$wt.graphics.GC");
$_M (cla$$, "onResize", 
function () {
this.updateCurve (this.getSize ().y);
});
$_M (cla$$, "setBottom", 
function (control) {
if (control != null && control.getParent () != this) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}if (this.bottom != null && !this.bottom.isDisposed ()) {
var size = this.bottom.getSize ();
this.bottom.setLocation ($wt.custom.CBanner.OFFSCREEN - size.x, $wt.custom.CBanner.OFFSCREEN - size.y);
}this.bottom = control;
this.layout (false);
}, "$wt.widgets.Control");
$_M (cla$$, "setLayout", 
function (layout) {
return ;
}, "$wt.widgets.Layout");
$_M (cla$$, "setLeft", 
function (control) {
if (control != null && control.getParent () != this) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}if (this.left != null && !this.left.isDisposed ()) {
var size = this.left.getSize ();
this.left.setLocation ($wt.custom.CBanner.OFFSCREEN - size.x, $wt.custom.CBanner.OFFSCREEN - size.y);
}this.left = control;
this.layout (false);
}, "$wt.widgets.Control");
$_M (cla$$, "setRight", 
function (control) {
if (control != null && control.getParent () != this) {
$WT.error ($WT.ERROR_INVALID_ARGUMENT);
}if (this.right != null && !this.right.isDisposed ()) {
var size = this.right.getSize ();
this.right.setLocation ($wt.custom.CBanner.OFFSCREEN - size.x, $wt.custom.CBanner.OFFSCREEN - size.y);
}this.right = control;
this.layout (false);
}, "$wt.widgets.Control");
$_M (cla$$, "setRightMinimumSize", 
function (size) {
if (size == null || size.x < $WT.DEFAULT || size.y < $WT.DEFAULT) $WT.error ($WT.ERROR_INVALID_ARGUMENT);
this.rightMinWidth = size.x;
this.rightMinHeight = size.y;
}, "$wt.graphics.Point");
$_M (cla$$, "setRightWidth", 
function (width) {
if (width < $WT.DEFAULT) $WT.error ($WT.ERROR_INVALID_ARGUMENT);
this.rightWidth = width;
this.layout (false);
}, "Number");
$_M (cla$$, "setSimple", 
function (simple) {
if (this.simple != simple) {
this.simple = simple;
if (simple) {
this.curve_width = 5;
this.curve_indent = -2;
} else {
this.curve_width = 50;
this.curve_indent = 5;
}this.updateCurve (this.getSize ().y);
this.layout (false);
this.redraw ();
}}, "Boolean");
$_M (cla$$, "updateCurve", 
function (height) {
var h = height - $wt.custom.CBanner.BORDER_STRIPE;
if (this.simple) {
this.curve = [0, h, 1, h, 2, h - 1, 3, h - 2, 3, 2, 4, 1, 5, 0];
} else {
this.curve = $wt.custom.CBanner.bezier (0, h + 1, $wt.custom.CBanner.BEZIER_LEFT, h + 1, this.curve_width - $wt.custom.CBanner.BEZIER_RIGHT, 0, this.curve_width, 0, this.curve_width);
}}, "Number");
$_S (cla$$,
"OFFSCREEN", -200,
"BORDER_BOTTOM", 2,
"BORDER_TOP", 3,
"BORDER_STRIPE", 1,
"CURVE_TAIL", 200,
"BEZIER_RIGHT", 30,
"BEZIER_LEFT", 30,
"MIN_LEFT", 10);
cla$$.BORDER1 = cla$$.prototype.BORDER1 = $WT.COLOR_WIDGET_HIGHLIGHT_SHADOW;
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.custom, "CBannerLayout", $wt.widgets.Layout);
$_V (cla$$, "computeSize", 
function (composite, wHint, hHint, flushCache) {
var banner = composite;
var left = banner.left;
var right = banner.right;
var bottom = banner.bottom;
var showCurve = left != null && right != null;
var height = hHint;
var width = wHint;
var bottomSize =  new $wt.graphics.Point (0, 0);
if (bottom != null) {
var trim = this.computeTrim (bottom);
var w = wHint == $WT.DEFAULT ? $WT.DEFAULT : width - trim;
bottomSize = this.computeChildSize (bottom, w, $WT.DEFAULT, flushCache);
if (hHint != $WT.DEFAULT) {
bottomSize.y = Math.min (bottomSize.y, height);
height -= bottomSize.y + $wt.custom.CBanner.BORDER_TOP + $wt.custom.CBanner.BORDER_STRIPE + $wt.custom.CBanner.BORDER_BOTTOM;
}}if (showCurve && hHint != $WT.DEFAULT) {
height -= $wt.custom.CBanner.BORDER_TOP + $wt.custom.CBanner.BORDER_BOTTOM + 2 * $wt.custom.CBanner.BORDER_STRIPE;
}var rightSize =  new $wt.graphics.Point (0, 0);
if (right != null) {
var trim = this.computeTrim (right);
var w = banner.rightWidth == $WT.DEFAULT ? $WT.DEFAULT : banner.rightWidth - trim;
var h = banner.rightWidth == $WT.DEFAULT ? $WT.DEFAULT : height;
rightSize = this.computeChildSize (right, w, h, flushCache);
if (wHint != $WT.DEFAULT) {
rightSize.x = Math.min (rightSize.x, width);
width -= rightSize.x + banner.curve_width - 2 * banner.curve_indent;
width = Math.max (width, $wt.custom.CBanner.MIN_LEFT);
}}var leftSize =  new $wt.graphics.Point (0, 0);
if (left != null) {
var trim = this.computeTrim (left);
var w = wHint == $WT.DEFAULT ? $WT.DEFAULT : width - trim;
leftSize = this.computeChildSize (left, w, $WT.DEFAULT, flushCache);
}width = leftSize.x + rightSize.x;
height = bottomSize.y;
if (bottom != null) {
height += $wt.custom.CBanner.BORDER_STRIPE + 2;
}if (left != null) {
height += right == null ? leftSize.y : Math.max (leftSize.y, banner.rightMinHeight);
} else {
height += rightSize.y;
}if (showCurve) {
width += banner.curve_width - 2 * banner.curve_indent;
height += $wt.custom.CBanner.BORDER_TOP + $wt.custom.CBanner.BORDER_BOTTOM + 2 * $wt.custom.CBanner.BORDER_STRIPE;
}if (wHint != $WT.DEFAULT) width = wHint;
if (hHint != $WT.DEFAULT) height = hHint;
return  new $wt.graphics.Point (width, height);
}, "$wt.widgets.Composite,Number,Number,Boolean");
$_M (cla$$, "computeChildSize", 
function (control, wHint, hHint, flushCache) {
var data = control.getLayoutData ();
if (data == null || !($_O (data, $wt.custom.CLayoutData))) {
data =  new $wt.custom.CLayoutData ();
control.setLayoutData (data);
}return (data).computeSize (control, wHint, hHint, flushCache);
}, "$wt.widgets.Control,Number,Number,Boolean");
$_M (cla$$, "computeTrim", 
function (c) {
if ($_O (c, $wt.widgets.Scrollable)) {
var rect = (c).computeTrim (0, 0, 0, 0);
return rect.width;
}return c.getBorderWidth () * 2;
}, "$wt.widgets.Control");
$_V (cla$$, "flushCache", 
function (control) {
var data = control.getLayoutData ();
if (data != null && $_O (data, $wt.custom.CLayoutData)) (data).flushCache ();
return true;
}, "$wt.widgets.Control");
$_V (cla$$, "layout", 
function (composite, flushCache) {
var banner = composite;
var left = banner.left;
var right = banner.right;
var bottom = banner.bottom;
var size = banner.getSize ();
var showCurve = left != null && right != null;
var width = size.x;
var height = size.y;
var bottomSize =  new $wt.graphics.Point (0, 0);
if (bottom != null) {
var trim = this.computeTrim (bottom);
var w = width - trim;
bottomSize = this.computeChildSize (bottom, w, $WT.DEFAULT, flushCache);
bottomSize.y = Math.min (bottomSize.y, height);
height -= bottomSize.y + $wt.custom.CBanner.BORDER_TOP + $wt.custom.CBanner.BORDER_BOTTOM + $wt.custom.CBanner.BORDER_STRIPE;
}if (showCurve) height -= $wt.custom.CBanner.BORDER_TOP + $wt.custom.CBanner.BORDER_BOTTOM + 2 * $wt.custom.CBanner.BORDER_STRIPE;
height = Math.max (0, height);
var rightSize =  new $wt.graphics.Point (0, 0);
if (right != null) {
var trimX = 0;
var trimY = 0;
if ($_O (right, $wt.widgets.Scrollable)) {
var rect = (right).computeTrim (0, 0, 0, 0);
trimX = rect.width;
trimY = rect.height;
} else {
trimX = trimY = right.getBorderWidth () * 2;
}var rightW = banner.rightWidth == $WT.DEFAULT ? $WT.DEFAULT : banner.rightWidth - trimX;
var rightH = banner.rightWidth == $WT.DEFAULT ? $WT.DEFAULT : height - trimY;
rightSize = this.computeChildSize (right, rightW, rightH, flushCache);
rightSize.x = Math.min (rightSize.x, width);
width -= rightSize.x + banner.curve_width - 2 * banner.curve_indent;
width = Math.max (width, $wt.custom.CBanner.MIN_LEFT);
}var leftSize =  new $wt.graphics.Point (0, 0);
if (left != null) {
var trim = this.computeTrim (left);
leftSize = this.computeChildSize (left, width - trim, $WT.DEFAULT, flushCache);
}var x = 0;
var y = 0;
var oldStart = banner.curveStart;
var leftRect = null;
var rightRect = null;
var bottomRect = null;
if (bottom != null) {
bottomRect =  new $wt.graphics.Rectangle (x, y + size.y - bottomSize.y, bottomSize.x, bottomSize.y);
}if (showCurve) y += $wt.custom.CBanner.BORDER_TOP + $wt.custom.CBanner.BORDER_STRIPE;
if (left != null) {
leftRect =  new $wt.graphics.Rectangle (x, y, leftSize.x, leftSize.y);
banner.curveStart = x + leftSize.x - banner.curve_indent;
x += leftSize.x + banner.curve_width - 2 * banner.curve_indent;
}if (right != null) {
rightRect =  new $wt.graphics.Rectangle (x, y, rightSize.x, rightSize.y);
}if (banner.curveStart < oldStart) {
banner.redraw (banner.curveStart - $wt.custom.CBanner.CURVE_TAIL, 0, oldStart + banner.curve_width - banner.curveStart + $wt.custom.CBanner.CURVE_TAIL + 5, size.y, false);
}if (banner.curveStart > oldStart) {
banner.redraw (oldStart - $wt.custom.CBanner.CURVE_TAIL, 0, banner.curveStart + banner.curve_width - oldStart + $wt.custom.CBanner.CURVE_TAIL + 5, size.y, false);
}banner.update ();
banner.curveRect =  new $wt.graphics.Rectangle (banner.curveStart, 0, banner.curve_width, size.y);
if (bottomRect != null) bottom.setBounds (bottomRect);
if (rightRect != null) right.setBounds (rightRect);
if (leftRect != null) left.setBounds (leftRect);
}, "$wt.widgets.Composite,Boolean");
cla$$ = $_C (function () {
this.lastFocusId = 0;
this.items = null;
this.ignoreResize = false;
this.ignoreMouse = false;
$_Z (this, arguments);
}, $wt.widgets, "ToolBar", $wt.widgets.Composite);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.ToolBar, [parent, $wt.widgets.ToolBar.checkStyle (style)]);
if ((style & $WT.VERTICAL) != 0) {
this.style |= $WT.VERTICAL;
} else {
this.style |= $WT.HORIZONTAL;
}}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
if ((style & $WT.FLAT) == 0) style |= $WT.NO_FOCUS;
if ((style & $WT.VERTICAL) != 0) style &= ($t$ = ~ $WT.WRAP, $WT.prototype.WRAP = $WT.WRAP, $t$);
return style & ~($WT.H_SCROLL | $WT.V_SCROLL);
}, "Number");
$_V (cla$$, "createWidget", 
function () {
this.items =  new Array (0);
this.lastFocusId = -1;
this.register ();
this.handle = document.createElement ("DIV");
if (this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}this.handle.className = "tool-bar-default";
if ((this.style & $WT.BORDER) != 0) {
this.handle.className += " tool-bar-border";
}});
$_M (cla$$, "createItem", 
function (item, index) {
var count = this.items.length;
if (!(0 <= index && index <= count)) this.error ($WT.ERROR_INVALID_RANGE);
var id = this.items.length;
this.items[item.id = id] = item;
item.handle = document.createElement ("DIV");
item.handle.className = "tool-item-default";
if (index == count) {
this.handle.appendChild (item.handle);
} else {
this.handle.insertBefore (item.handle, this.items[index].handle);
}if ((this.style & $WT.VERTICAL) != 0) this.setRowCount (count + 1);
this.layoutItems ();
}, "$wt.widgets.ToolItem,Number");
$_M (cla$$, "setRowCount", 
function (count) {
if ((this.style & $WT.VERTICAL) != 0) {
}}, "Number");
$_M (cla$$, "computeTrim", 
function (x, y, width, height) {
var trim = $_U (this, $wt.widgets.ToolBar, "computeTrim", [x, y, width, height]);
trim.height += 2;
return trim;
}, "Number,Number,Number,Number");
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var width = 0;
var height = 0;
if ((this.style & $WT.VERTICAL) != 0) {
var count = this.items.length;
for (var i = 0; i < count; i++) {
var rect = this.items[i].getBounds ();
height += rect.height;
if ((this.items[i].style & $WT.SEPARATOR) != 0) {
width = Math.max (width, $wt.widgets.ToolBar.DEFAULT_WIDTH);
} else {
width = Math.max (width, rect.width);
}}
} else {
var count = this.items.length;
for (var i = 0; i < count; i++) {
var rect = this.items[i].getBounds ();
System.out.println (rect);
height = Math.max (height, rect.height);
width += rect.width;
}
}if (width == 0) width = $wt.widgets.ToolBar.DEFAULT_WIDTH;
if (height == 0) height = $wt.widgets.ToolBar.DEFAULT_HEIGHT;
if (wHint != $WT.DEFAULT) width = wHint;
if (hHint != $WT.DEFAULT) height = hHint;
var trim = this.computeTrim (0, 0, width, height);
width = trim.width;
height = trim.height;
return  new $wt.graphics.Point (width, height);
}, "Number,Number,Boolean");
$_M (cla$$, "getItemCount", 
function () {
return this.items.length;
});
$_M (cla$$, "getItem", 
function (index) {
var count = this.items.length;
if (!(0 <= index && index < count)) this.error ($WT.ERROR_INVALID_RANGE);
return this.items[index];
}, "Number");
$_M (cla$$, "layoutItems", 
function () {
if ((this.style & $WT.WRAP) != 0) {
try {
this.handle.style.whiteSpace = "wrap";
} catch (e) {
if ($_O (e, Exception)) {
} else {
throw e;
}
}
}if ((this.style & $WT.VERTICAL) != 0) {
}for (var i = 0; i < this.items.length; i++) {
var item = this.items[i];
if (item != null) item.resizeControl ();
}
});
$_S (cla$$,
"DEFAULT_WIDTH", 24,
"DEFAULT_HEIGHT", 22);
cla$$ = $_C (function () {
this.parent = null;
this.control = null;
this.toolTipText = null;
this.disabledImage = null;
this.hotImage = null;
this.disabledImage2 = null;
this.id = 0;
$_Z (this, arguments);
}, $wt.widgets, "ToolItem", $wt.widgets.Item);
$_K (cla$$, 
function (parent, style, index) {
$_R (this, $wt.widgets.ToolItem, [parent, $wt.widgets.ToolItem.checkStyle (style)]);
this.parent = parent;
parent.createItem (this, index);
}, "$wt.widgets.ToolBar,Number,Number");
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.ToolItem, [parent, $wt.widgets.ToolItem.checkStyle (style)]);
this.parent = parent;
parent.createItem (this, parent.getItemCount ());
}, "$wt.widgets.ToolBar,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
return $wt.widgets.Widget.checkBits (style, $WT.PUSH, $WT.CHECK, $WT.RADIO, $WT.SEPARATOR, $WT.DROP_DOWN, 0);
}, "Number");
$_M (cla$$, "getBounds", 
function () {
var x = 0;
var y = 0;
var left = this.handle.style.left;
if (left != null && left.length != 0) {
x = Integer.parseInt (left);
}var top = this.handle.style.top;
if (top != null && top.length != 0) {
y = Integer.parseInt (top);
}var w = 64;
var h = 64;
var width = this.handle.style.width;
if (width != null && width.length != 0) {
w = Integer.parseInt (width);
} else if (this.text != null && this.text.length != 0) {
w = UIStringUtil.calculatePlainStringLineWidth (this.text);
}var height = this.handle.style.height;
if (height != null && height.length != 0) {
h = Integer.parseInt (height);
} else if (this.text != null && this.text.length != 0) {
h = UIStringUtil.calculatePlainStringLineHeight (this.text);
}return  new $wt.graphics.Rectangle (x, y, w + 6, h + 6);
});
$_M (cla$$, "getParent", 
function () {
return this.parent;
});
$_M (cla$$, "setControl", 
function (control) {
if (control != null) {
if (control.isDisposed ()) this.error ($WT.ERROR_INVALID_ARGUMENT);
if (control.parent != this.parent) this.error ($WT.ERROR_INVALID_PARENT);
}if ((this.style & $WT.SEPARATOR) == 0) return ;
this.control = control;
if ((this.parent.style & ($WT.WRAP | $WT.VERTICAL)) != 0) {
}this.resizeControl ();
}, "$wt.widgets.Control");
$_M (cla$$, "resizeControl", 
function () {
if (this.control != null && !this.control.isDisposed ()) {
var itemRect = this.getBounds ();
this.control.setSize (itemRect.width, itemRect.height);
var rect = this.control.getBounds ();
rect.x = itemRect.x + Math.floor ((itemRect.width - rect.width) / 2);
rect.y = itemRect.y + Math.floor ((itemRect.height - rect.height) / 2);
this.control.setLocation (rect.x, rect.y);
}});
$_M (cla$$, "setText", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if ((this.style & $WT.SEPARATOR) != 0) return ;
$_U (this, $wt.widgets.ToolItem, "setText", [string]);
if (this.handle != null) {
this.handle.appendChild (document.createTextNode (string));
}this.parent.layoutItems ();
}, "String");
$_M (cla$$, "setToolTipText", 
function (string) {
this.toolTipText = string;
}, "String");
$_M (cla$$, "getToolTipText", 
function () {
return this.toolTipText;
});
cla$$ = $_C (function () {
this.items = null;
this.originalItems = null;
this.locked = false;
this.ignoreResize = false;
$_Z (this, arguments);
}, $wt.widgets, "CoolBar", $wt.widgets.Composite);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.CoolBar, [parent, $wt.widgets.CoolBar.checkStyle (style)]);
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
style |= $WT.NO_FOCUS;
return style & ~($WT.H_SCROLL | $WT.V_SCROLL);
}, "Number");
$_M (cla$$, "getItemCount", 
function () {
return this.items.length;
});
$_M (cla$$, "indexOf", 
function (item) {
if (item == null) this.error ($WT.ERROR_NULL_ARGUMENT);
for (var i = 0; i < this.items.length; i++) {
if (item == this.items[i]) {
return i;
}}
return -1;
}, "$wt.widgets.CoolItem");
$_M (cla$$, "getItem", 
function (index) {
var count = this.items.length;
if (!(0 <= index && index < count)) this.error ($WT.ERROR_INVALID_RANGE);
return this.items[index];
}, "Number");
$_M (cla$$, "createItem", 
function (item, index) {
var count = this.items.length;
if (!(0 <= index && index <= count)) this.error ($WT.ERROR_INVALID_RANGE);
var id = this.items.length;
this.items[item.id = id] = item;
item.handle = document.createElement ("DIV");
item.handle.className = "cool-item-default";
if (index == count) {
this.handle.appendChild (item.handle);
} else {
this.handle.insertBefore (item.handle, this.items[index].handle);
}}, "$wt.widgets.CoolItem,Number");
$_V (cla$$, "createWidget", 
function () {
this.items =  new Array (0);
this.register ();
this.handle = document.createElement ("DIV");
if (this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}this.handle.className = "cool-bar-default";
if ((this.style & $WT.BORDER) != 0) {
this.handle.className += " cool-bar-border";
}});
$_M (cla$$, "getMargin", 
function (index) {
var margin = 0;
if ((this.style & $WT.FLAT) != 0) {
margin += 8 + 4;
} else {
margin += 8 + 8;
}return margin;
}, "Number");
$_S (cla$$,
"SEPARATOR_WIDTH", 2,
"MAX_WIDTH", 0x7FFF);
cla$$ = $_C (function () {
this.parent = null;
this.control = null;
this.id = 0;
this.ideal = false;
this.minimum = false;
$_Z (this, arguments);
}, $wt.widgets, "CoolItem", $wt.widgets.Item);
$_K (cla$$, 
function (parent, style, index) {
$_R (this, $wt.widgets.CoolItem, [parent, style]);
this.parent = parent;
parent.createItem (this, index);
}, "$wt.widgets.CoolBar,Number,Number");
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.CoolItem, [parent, style]);
this.parent = parent;
parent.createItem (this, parent.getItemCount ());
}, "$wt.widgets.CoolBar,Number");
$_M (cla$$, "setText", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if ((this.style & $WT.SEPARATOR) != 0) return ;
$_U (this, $wt.widgets.CoolItem, "setText", [string]);
if (this.handle != null) {
this.handle.appendChild (document.createTextNode (string));
}}, "String");
$_M (cla$$, "setControl", 
function (control) {
if (control != null) {
if (control.parent != this.parent) this.error ($WT.ERROR_INVALID_PARENT);
}var index = this.parent.indexOf (this);
if (index == -1) return ;
if (this.control != null && this.control.isDisposed ()) {
this.control = null;
}var oldControl = this.control;
var newControl = control;
this.control = newControl;
}, "$wt.widgets.Control");
$_M (cla$$, "setPreferredSize", 
function (size) {
if (size == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.setPreferredSize (size.x, size.y);
}, "$wt.graphics.Point");
$_M (cla$$, "setPreferredSize", 
function (width, height) {
var index = this.parent.indexOf (this);
if (index == -1) return ;
width = Math.max (0, width);
height = Math.max (0, height);
this.ideal = true;
this.handle.style.width = width + "px";
this.handle.style.height = height + "px";
}, "Number,Number");
$_M (cla$$, "computeSize", 
function (wHint, hHint) {
var index = this.parent.indexOf (this);
if (index == -1) return  new $wt.graphics.Point (0, 0);
var width = wHint;
var height = hHint;
if (wHint == $WT.DEFAULT) width = 32;
if (hHint == $WT.DEFAULT) height = 32;
width += this.parent.getMargin (index);
return  new $wt.graphics.Point (width, height);
}, "Number,Number");
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.widgets, "Caret", $wt.widgets.Control);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Caret, [parent, style]);
}, "$wt.widgets.Composite,Number");
cla$$ = $_C (function () {
this.ignoreModify = false;
this.pageIncrement = 0;
this.digits = 0;
this.minimum = 0;
this.maximum = 0;
this.increment = 0;
this.textHandle = null;
this.updownHandle = null;
this.textInputHandle = null;
this.downBtnHandle = null;
this.upBtnHandle = null;
$_Z (this, arguments);
}, $wt.widgets, "Spinner", $wt.widgets.Composite);
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.Spinner, [parent, $wt.widgets.Spinner.checkStyle (style)]);
}, "$wt.widgets.Composite,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
return style & ~($WT.H_SCROLL | $WT.V_SCROLL);
}, "Number");
$_M (cla$$, "addModifyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Modify, typedListener);
}, "$wt.events.ModifyListener");
$_M (cla$$, "addSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Selection, typedListener);
this.addListener ($WT.DefaultSelection, typedListener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "addVerifyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener ($WT.Verify, typedListener);
}, "$wt.events.VerifyListener");
$_M (cla$$, "removeModifyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Modify, listener);
}, "$wt.events.ModifyListener");
$_M (cla$$, "removeSelectionListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Selection, listener);
this.eventTable.unhook ($WT.DefaultSelection, listener);
}, "$wt.events.SelectionListener");
$_M (cla$$, "removeVerifyListener", 
function (listener) {
if (listener == null) this.error ($WT.ERROR_NULL_ARGUMENT);
if (this.eventTable == null) return ;
this.eventTable.unhook ($WT.Verify, listener);
}, "$wt.events.VerifyListener");
$_M (cla$$, "verifyText", 
function (string, start, end, keyEvent) {
var event =  new $wt.widgets.Event ();
event.text = string;
event.start = start;
event.end = end;
if (keyEvent != null) {
event.character = keyEvent.character;
event.keyCode = keyEvent.keyCode;
event.stateMask = keyEvent.stateMask;
}var index = 0;
if (this.digits > 0) {
var decimalSeparator = this.getDecimalSeparator ();
index = string.indexOf (decimalSeparator);
if (index != -1) {
string = string.substring (0, index) + string.substring (index + 1);
}index = 0;
}while (index < string.length) {
if (!Character.isDigit (string.charAt (index))) break;
index++;
}
event.doit = index == string.length;
this.sendEvent ($WT.Verify, event);
if (!event.doit || this.isDisposed ()) return null;
return event.text;
}, "String,Number,Number,$wt.widgets.Event");
$_M (cla$$, "getDecimalSeparator", 
function () {
return ".";
});
$_M (cla$$, "setPageIncrement", 
function (value) {
if (value < 1) return ;
this.pageIncrement = value;
}, "Number");
$_M (cla$$, "getPageIncrement", 
function () {
return this.pageIncrement;
});
$_M (cla$$, "getMaximum", 
function () {
return this.maximum;
});
$_M (cla$$, "setMaximum", 
function (maximum) {
this.maximum = maximum;
}, "Number");
$_M (cla$$, "getMinimum", 
function () {
return this.minimum;
});
$_M (cla$$, "setMinimum", 
function (minimum) {
this.minimum = minimum;
}, "Number");
$_M (cla$$, "getDigits", 
function () {
return this.digits;
});
$_M (cla$$, "setDigits", 
function (value) {
if (value < 0) this.error ($WT.ERROR_INVALID_ARGUMENT);
if (value == this.digits) return ;
this.digits = value;
}, "Number");
$_M (cla$$, "getIncrement", 
function () {
return this.increment;
});
$_M (cla$$, "setIncrement", 
function (value) {
if (value < 1) return ;
this.increment = value;
}, "Number");
$_M (cla$$, "getSelection", 
function () {
return Integer.parseInt (this.textInputHandle.value);
});
$_M (cla$$, "setSelection", 
function (selection) {
this.setSelection (selection, false);
}, "Number");
$_M (cla$$, "setSelection", 
function (value, notify) {
var string = String.valueOf (value);
if (this.digits > 0) {
var decimalSeparator = this.getDecimalSeparator ();
var index = string.length - this.digits;
var buffer =  new StringBuffer ();
if (index > 0) {
buffer.append (string.substring (0, index));
buffer.append (decimalSeparator);
buffer.append (string.substring (index));
} else {
buffer.append ("0");
buffer.append (decimalSeparator);
while (index++ < 0) buffer.append ("0");

buffer.append (string);
}string = buffer.toString ();
}if (this.hooks ($WT.Verify) || this.filters ($WT.Verify)) {
var length = this.textInputHandle.value.length;
string = this.verifyText (string, 0, length, null);
if (string == null) return ;
}if (this.textInputHandle != null) {
this.textInputHandle.value = "" + value;
}if (notify) this.sendEvent ($WT.Selection);
}, "Number,Boolean");
$_V (cla$$, "createWidget", 
function () {
this.register ();
this.handle = document.createElement ("DIV");
this.handle.className = "spinner-default";
if (this.parent != null && this.parent.handle != null) {
this.parent.handle.appendChild (this.handle);
}if ((this.style & $WT.BORDER) != 0) {
this.handle.className += " spinner-border";
}this.updownHandle = document.createElement ("DIV");
this.handle.appendChild (this.updownHandle);
this.updownHandle.className = "spinner-up-down-default";
this.upBtnHandle = document.createElement ("BUTTON");
this.updownHandle.appendChild (this.upBtnHandle);
this.upBtnHandle.className = "spinner-up-button-default";
this.upBtnHandle.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Spinner$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Spinner$1", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
this.callbacks["$wt.widgets.Spinner"].setSelection (this.callbacks["$wt.widgets.Spinner"].getSelection () + this.callbacks["$wt.widgets.Spinner"].increment, true);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Spinner$1, innerThis, finalVars);
}) (this, null));
this.downBtnHandle = document.createElement ("BUTTON");
this.updownHandle.appendChild (this.downBtnHandle);
this.downBtnHandle.className = "spinner-down-button-default";
this.downBtnHandle.onclick = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Spinner$2")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Spinner$2", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
this.callbacks["$wt.widgets.Spinner"].setSelection (this.callbacks["$wt.widgets.Spinner"].getSelection () - this.callbacks["$wt.widgets.Spinner"].increment, true);
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Spinner$2, innerThis, finalVars);
}) (this, null));
this.textHandle = document.createElement ("DIV");
this.handle.appendChild (this.textHandle);
this.textHandle.className = "spinner-text-default";
this.textInputHandle = document.createElement ("INPUT");
this.textInputHandle.className = "spinner-text-field-default";
this.textHandle.appendChild (this.textInputHandle);
this.textInputHandle.onchange = Clazz.makeFunction ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Spinner$3")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Spinner$3", $wt.internal.RunnableCompatibility);
$_V (cla$$, "run", 
function () {
});
cla$$ = $_P ();
}
return $_N ($wt.widgets.Spinner$3, innerThis, finalVars);
}) (this, null));
});
$_M (cla$$, "setSize", 
function (width, height) {
$_U (this, $wt.widgets.Spinner, "setSize", [width, height]);
this.textInputHandle.style.width = (width - 28) + "px";
this.textInputHandle.style.height = ((height - 2) > 24 ? 20 : height - 2) + "px";
}, "Number,Number");
$_M (cla$$, "computeSize", 
function (wHint, hHint, changed) {
var width = 0;
var height = 0;
if (wHint == $WT.DEFAULT || hHint == $WT.DEFAULT) {
var string = null;
if (this.digits > 0) {
var leading = Math.floor (this.maximum / parseInt (Math.pow (10, this.digits)));
var buffer = "" + leading;
buffer += this.getDecimalSeparator ();
var count = this.digits - buffer.length + 1;
while (count >= 0) {
buffer += "0";
count--;
}
string = buffer;
System.out.println (buffer);
} else {
string = "" + this.maximum;
}width = UIStringUtil.calculatePlainStringLineWidth (string) + 16;
height = UIStringUtil.calculatePlainStringLineHeight (string);
}if (width == 0) width = $wt.widgets.Widget.DEFAULT_WIDTH;
if (height == 0) height = $wt.widgets.Widget.DEFAULT_HEIGHT;
if (wHint != $WT.DEFAULT) width = wHint;
if (hHint != $WT.DEFAULT) height = hHint;
var trim = this.computeTrim (0, 0, width, height);
System.err.println (trim);
return  new $wt.graphics.Point (trim.width, trim.height);
}, "Number,Number,Boolean");
$_V (cla$$, "computeTrim", 
function (x, y, width, height) {
var margins = 4;
x -= margins & 0xFFFF;
width += (margins & 0xFFFF) + ((margins >> 16) & 0xFFFF);
if ((this.style & $WT.BORDER) != 0) {
x -= 1;
y -= 1;
width += 2;
height += 2;
}width += 2;
return  new $wt.graphics.Rectangle (x, y, width, height);
}, "Number,Number,Number,Number");
cla$$ = $_C (function () {
this.style = 0;
this.parent = null;
this.title = null;
$_Z (this, arguments);
}, $wt.widgets, "Dialog");
$_K (cla$$, 
function (parent) {
this.construct (parent, $WT.PRIMARY_MODAL);
}, "$wt.widgets.Shell");
$_K (cla$$, 
function (parent, style) {
this.parent = parent;
this.style = style;
this.title = "";
}, "$wt.widgets.Shell,Number");
$_M (cla$$, "error", 
function (code) {
$WT.error (code);
}, "Number");
$_M (cla$$, "getParent", 
function () {
return this.parent;
});
$_M (cla$$, "getStyle", 
function () {
return this.style;
});
$_M (cla$$, "getText", 
function () {
return this.title;
});
$_M (cla$$, "setText", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.title = string;
}, "String");
$_M (cla$$, "dialogUnimplemented", 
function () {
var dialogShell =  new $wt.widgets.Shell (this.parent.display, this.style | $WT.CLOSE | $WT.BORDER);
dialogShell.addListener ($WT.Close, (function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Dialog$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Dialog$1", null, $wt.widgets.Listener);
$_V (cla$$, "handleEvent", 
function (event) {
}, "$wt.widgets.Event");
cla$$ = $_P ();
}
return $_N ($wt.widgets.Dialog$1, innerThis, finalVars);
}) (this, null));
dialogShell.setText (this.title);
dialogShell.setLayout ( new $wt.layout.GridLayout (2, false));
var icon =  new $wt.widgets.Label (dialogShell, $WT.NONE);
icon.setImage ( new $wt.graphics.Image (dialogShell.display, "j2slib/images/warning.png"));
var gridData =  new $wt.layout.GridData (32, 32);
icon.setLayoutData (gridData);
var label =  new $wt.widgets.Label (dialogShell, $WT.NONE);
label.setText ("Not implemented yet.");
var buttonPanel =  new $wt.widgets.Composite (dialogShell, $WT.NONE);
var gd =  new $wt.layout.GridData ($wt.layout.GridData.END, $wt.layout.GridData.CENTER, false, false);
gd.horizontalSpan = 2;
buttonPanel.setLayoutData (gd);
buttonPanel.setLayout ( new $wt.layout.GridLayout ());
var btn =  new $wt.widgets.Button (buttonPanel, $WT.PUSH);
btn.setText ("&OK");
btn.setLayoutData ( new $wt.layout.GridData (75, 24));
btn.addSelectionListener ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.Dialog$2")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "Dialog$2", $wt.events.SelectionAdapter);
$_V (cla$$, "widgetSelected", 
function (e) {
this.$finals.dialogShell.close ();
}, "$wt.events.SelectionEvent");
cla$$ = $_P ();
}
return $_N ($wt.widgets.Dialog$2, innerThis, finalVars);
}) (this, $_F ("dialogShell", dialogShell)));
dialogShell.pack ();
dialogShell.open ();
var size = dialogShell.getSize ();
var y = Math.floor ((document.body.clientHeight - size.y) / 2) - 20;
if (y < 0) {
y = 0;
}dialogShell.setLocation (Math.floor ((document.body.clientWidth - size.x) / 2), y);
$wt.internal.ResizeSystem.register (dialogShell, $WT.CENTER);
});
cla$$ = $_C (function () {
this.message = "";
this.buttonPanel = null;
this.dialogShell = null;
this.btn = null;
this.returnCode = 0;
$_Z (this, arguments);
}, $wt.widgets, "MessageBox", $wt.widgets.Dialog);
$_K (cla$$, 
function (parent) {
this.construct (parent, $WT.OK | $WT.ICON_INFORMATION | $WT.APPLICATION_MODAL);
}, "$wt.widgets.Shell");
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.MessageBox, [parent, $wt.widgets.MessageBox.checkStyle (style)]);
}, "$wt.widgets.Shell,Number");
cla$$.checkStyle = $_M (cla$$, "checkStyle", 
function (style) {
if ((style & ($WT.PRIMARY_MODAL | $WT.APPLICATION_MODAL | $WT.SYSTEM_MODAL)) == 0) style |= $WT.APPLICATION_MODAL;
var mask = ($WT.YES | $WT.NO | $WT.OK | $WT.CANCEL | $WT.ABORT | $WT.RETRY | $WT.IGNORE);
var bits = style & mask;
if (bits == $WT.OK || bits == $WT.CANCEL || bits == ($WT.OK | $WT.CANCEL)) return style;
if (bits == $WT.YES || bits == $WT.NO || bits == ($WT.YES | $WT.NO) || bits == ($WT.YES | $WT.NO | $WT.CANCEL)) return style;
if (bits == ($WT.RETRY | $WT.CANCEL) || bits == ($WT.ABORT | $WT.RETRY | $WT.IGNORE)) return style;
style = (style & ~mask) | $WT.OK;
return style;
}, "Number");
$_M (cla$$, "getMessage", 
function () {
return this.message;
});
$_M (cla$$, "open", 
function () {
this.returnCode = -1;
this.dialogShell =  new $wt.widgets.Shell (this.parent.display, this.style | $WT.CLOSE | $WT.BORDER);
this.dialogShell.addListener ($WT.Close, (function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.MessageBox$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "MessageBox$1", null, $wt.widgets.Listener);
$_V (cla$$, "handleEvent", 
function (event) {
this.callbacks["$wt.widgets.MessageBox"].updateReturnCode ();
}, "$wt.widgets.Event");
cla$$ = $_P ();
}
return $_N ($wt.widgets.MessageBox$1, innerThis, finalVars);
}) (this, null));
this.dialogShell.setText (this.title);
this.dialogShell.setLayout ( new $wt.layout.GridLayout (2, false));
var iconName = null;
if ((this.style & $WT.ICON_ERROR) != 0) {
iconName = "error";
} else if ((this.style & $WT.ICON_INFORMATION) != 0) {
iconName = "information";
} else if ((this.style & $WT.ICON_QUESTION) != 0) {
iconName = "question";
} else if ((this.style & $WT.ICON_WARNING) != 0) {
iconName = "warning";
} else if ((this.style & $WT.ICON_WORKING) != 0) {
iconName = "information";
}if (iconName != null) {
var composite =  new $wt.widgets.Composite (this.dialogShell, $WT.NONE);
composite.setLayout ( new $wt.layout.GridLayout ());
var gd =  new $wt.layout.GridData (48, 48);
composite.setLayoutData (gd);
var icon =  new $wt.widgets.Label (composite, $WT.NONE);
icon.setImage ( new $wt.graphics.Image (this.dialogShell.display, "j2slib/images/" + iconName + ".png"));
var gridData =  new $wt.layout.GridData (32, 32);
icon.setLayoutData (gridData);
}var composite =  new $wt.widgets.Composite (this.dialogShell, $WT.NONE);
composite.setLayout ( new $wt.layout.GridLayout (2, false));
var gd =  new $wt.layout.GridData ($wt.layout.GridData.FILL_BOTH | $wt.layout.GridData.VERTICAL_ALIGN_CENTER);
if (iconName == null) {
gd.horizontalSpan = 2;
}gd.grabExcessVerticalSpace = true;
gd.heightHint = 48;
var labelGD =  new $wt.layout.GridData ($wt.layout.GridData.VERTICAL_ALIGN_CENTER);
var wHint = UIStringUtil.calculatePlainStringLineWidth (this.message);
if (wHint > 480) {
labelGD.widthHint = 480;
var hHint = UIStringUtil.calculatePlainStringBlockHeight (this.message, labelGD.widthHint);
if (hHint > 48) {
gd.heightHint = hHint;
}} else if (wHint < 64) {
labelGD.widthHint = 64;
} else {
labelGD.widthHint = wHint;
}composite.setLayoutData (gd);
var messageLabel =  new $wt.widgets.Label (composite, $WT.WRAP);
messageLabel.setText (this.message);
messageLabel.setLayoutData (labelGD);
var gd2 =  new $wt.layout.GridData ();
gd2.grabExcessVerticalSpace = true;
 new $wt.widgets.Label (composite, $WT.NONE).setLayoutData (gd2);
this.buttonPanel =  new $wt.widgets.Composite (this.dialogShell, $WT.NONE);
var count = 0;
count += this.createButton ($WT.YES, "&Yes") == null ? 0 : 1;
count += this.createButton ($WT.NO, "&No") == null ? 0 : 1;
count += this.createButton ($WT.RETRY, "&Retry") == null ? 0 : 1;
count += this.createButton ($WT.ABORT, "&Abort") == null ? 0 : 1;
count += this.createButton ($WT.IGNORE, "&Ignore") == null ? 0 : 1;
count += this.createButton ($WT.OK, "&OK") == null ? 0 : 1;
count += this.createButton ($WT.CANCEL, "&Cancel") == null ? 0 : 1;
if (count == 0) {
this.createButton ($WT.OK, "&OK", true);
count = 1;
}var gridData =  new $wt.layout.GridData ($wt.layout.GridData.CENTER, $wt.layout.GridData.CENTER, false, false);
gridData.horizontalSpan = 2;
this.buttonPanel.setLayoutData (gridData);
this.buttonPanel.setLayout ( new $wt.layout.GridLayout (count, true));
this.dialogShell.pack ();
this.dialogShell.open ();
var size = this.dialogShell.getSize ();
var y = Math.floor ((document.body.clientHeight - size.y) / 2) - 20;
if (y < 0) {
y = 0;
}this.dialogShell.setLocation (Math.floor ((document.body.clientWidth - size.x) / 2), y);
$wt.internal.ResizeSystem.register (this.dialogShell, $WT.CENTER);
return $WT.CANCEL;
});
$_M (cla$$, "createButton", 
function (btnStyle, btnLabel) {
return this.createButton (btnStyle, btnLabel, false);
}, "Number,String");
$_M (cla$$, "createButton", 
function (btnStyle, btnLabel, forced) {
if ((this.style & btnStyle) != 0 || forced) {
this.btn =  new $wt.widgets.Button (this.buttonPanel, $WT.PUSH);
this.btn.setText (btnLabel);
var gridData =  new $wt.layout.GridData (75, 24);
this.btn.setLayoutData (gridData);
this.btn.addSelectionListener ((function (innerThis, finalVars) {
if (!$_D ("org.eclipse.swt.widgets.MessageBox$2")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, $wt.widgets, "MessageBox$2", $wt.events.SelectionAdapter);
$_V (cla$$, "widgetSelected", 
function (e) {
this.callbacks["$wt.widgets.MessageBox"].returnCode = this.$finals.btnStyle;
this.callbacks["$wt.widgets.MessageBox"].dialogShell.close ();
}, "$wt.events.SelectionEvent");
cla$$ = $_P ();
}
return $_N ($wt.widgets.MessageBox$2, innerThis, finalVars);
}) (this, $_F ("btnStyle", btnStyle)));
return this.btn;
} else {
return null;
}}, "Number,String,Boolean");
$_M (cla$$, "setMessage", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.message = string;
}, "String");
$_M (cla$$, "updateReturnCode", 
($fz = function () {
if (this.returnCode == -1) {
this.returnCode = $WT.CANCEL;
if ((this.style & $WT.OK) == $WT.OK) this.returnCode = $WT.OK;
if ((this.style & ($WT.OK | $WT.CANCEL)) == ($WT.OK | $WT.CANCEL)) this.returnCode = $WT.CANCEL;
if ((this.style & ($WT.YES | $WT.NO)) == ($WT.YES | $WT.NO)) this.returnCode = $WT.NO;
if ((this.style & ($WT.YES | $WT.NO | $WT.CANCEL)) == ($WT.YES | $WT.NO | $WT.CANCEL)) this.returnCode = $WT.CANCEL;
if ((this.style & ($WT.RETRY | $WT.CANCEL)) == ($WT.RETRY | $WT.CANCEL)) this.returnCode = $WT.CANCEL;
if ((this.style & ($WT.ABORT | $WT.RETRY | $WT.IGNORE)) == ($WT.ABORT | $WT.RETRY | $WT.IGNORE)) this.returnCode = $WT.IGNORE;
}}, $fz.isPrivate = true, $fz));
cla$$ = $_C (function () {
this.rgb = null;
$_Z (this, arguments);
}, $wt.widgets, "ColorDialog", $wt.widgets.Dialog);
$_K (cla$$, 
function (parent) {
this.construct (parent, $WT.PRIMARY_MODAL);
}, "$wt.widgets.Shell");
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.ColorDialog, [parent, style]);
}, "$wt.widgets.Shell,Number");
$_M (cla$$, "getRGB", 
function () {
return this.rgb;
});
$_M (cla$$, "open", 
function () {
this.dialogUnimplemented ();
return this.rgb;
});
$_M (cla$$, "setRGB", 
function (rgb) {
this.rgb = rgb;
}, "$wt.graphics.RGB");
cla$$ = $_C (function () {
this.message = "";
this.filterPath = "";
this.directoryPath = null;
$_Z (this, arguments);
}, $wt.widgets, "DirectoryDialog", $wt.widgets.Dialog);
$_K (cla$$, 
function (parent) {
this.construct (parent, $WT.PRIMARY_MODAL);
}, "$wt.widgets.Shell");
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.DirectoryDialog, [parent, style]);
}, "$wt.widgets.Shell,Number");
$_M (cla$$, "getFilterPath", 
function () {
return this.filterPath;
});
$_M (cla$$, "getMessage", 
function () {
return this.message;
});
$_M (cla$$, "open", 
function () {
this.dialogUnimplemented ();
return this.directoryPath;
});
$_M (cla$$, "setFilterPath", 
function (string) {
this.filterPath = string;
}, "String");
$_M (cla$$, "setMessage", 
function (string) {
if (string == null) this.error ($WT.ERROR_NULL_ARGUMENT);
this.message = string;
}, "String");
cla$$ = $_C (function () {
this.filterNames =  new Array (0);
this.filterExtensions =  new Array (0);
this.fileNames =  new Array (0);
this.filterPath = "";
this.fileName = "";
$_Z (this, arguments);
}, $wt.widgets, "FileDialog", $wt.widgets.Dialog);
$_K (cla$$, 
function (parent) {
this.construct (parent, $WT.PRIMARY_MODAL);
}, "$wt.widgets.Shell");
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.FileDialog, [parent, style]);
}, "$wt.widgets.Shell,Number");
$_M (cla$$, "getFileName", 
function () {
return this.fileName;
});
$_M (cla$$, "getFileNames", 
function () {
return this.fileNames;
});
$_M (cla$$, "getFilterExtensions", 
function () {
return this.filterExtensions;
});
$_M (cla$$, "getFilterNames", 
function () {
return this.filterNames;
});
$_M (cla$$, "getFilterPath", 
function () {
return this.filterPath;
});
$_M (cla$$, "open", 
function () {
this.dialogUnimplemented ();
return null;
});
$_M (cla$$, "setFileName", 
function (string) {
this.fileName = string;
}, "String");
$_M (cla$$, "setFilterExtensions", 
function (extensions) {
this.filterExtensions = extensions;
}, "Array");
$_M (cla$$, "setFilterNames", 
function (names) {
this.filterNames = names;
}, "Array");
$_M (cla$$, "setFilterPath", 
function (string) {
this.filterPath = string;
}, "String");
$_S (cla$$,
"FILTER", "*.*",
"BUFFER_SIZE", 1024 * 32);
cla$$ = $_C (function () {
this.fontData = null;
this.rgb = null;
$_Z (this, arguments);
}, $wt.widgets, "FontDialog", $wt.widgets.Dialog);
$_K (cla$$, 
function (parent) {
this.construct (parent, $WT.PRIMARY_MODAL);
}, "$wt.widgets.Shell");
$_K (cla$$, 
function (parent, style) {
$_R (this, $wt.widgets.FontDialog, [parent, style]);
}, "$wt.widgets.Shell,Number");
$_M (cla$$, "getFontData", 
function () {
return this.fontData;
});
$_M (cla$$, "getFontList", 
function () {
if (this.fontData == null) return null;
var result =  new Array (1);
result[0] = this.fontData;
return result;
});
$_M (cla$$, "getRGB", 
function () {
return this.rgb;
});
$_M (cla$$, "open", 
function () {
this.dialogUnimplemented ();
return this.fontData;
});
$_M (cla$$, "setFontData", 
function (fontData) {
this.fontData = fontData;
}, "$wt.graphics.FontData");
$_M (cla$$, "setFontList", 
function (fontData) {
if (fontData != null && fontData.length > 0) {
this.fontData = fontData[0];
} else {
this.fontData = null;
}}, "Array");
$_M (cla$$, "setRGB", 
function (rgb) {
this.rgb = rgb;
}, "$wt.graphics.RGB");
$_J ("org.eclipse.swt.program");
cla$$ = $_C (function () {
this.name = null;
this.command = null;
this.iconName = null;
$_Z (this, arguments);
}, $wt.program, "Program");
$_K (cla$$, 
function () {
});
cla$$.findProgram = $_M (cla$$, "findProgram", 
function (extension) {
if (extension == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (extension.length == 0) return null;
if ((extension.charAt (0)).charCodeAt (0) != ('.').charCodeAt (0)) extension = "." + extension;
extension = extension.toLowerCase ();
var program =  new $wt.program.Program ();
if (".js".equalsIgnoreCase (extension)) {
program.name = "Java2Script Pacemaker";
program.command = "$wt.program.Program.loadJavaScript(\"%1\")";
program.iconName = "images/z-logo.gif";
} else {
program.name = "Embeded Browser";
program.command = "window.open(\"%1\")";
program.iconName = "images/browser.gif";
}return program;
}, "String");
cla$$.getExtensions = $_M (cla$$, "getExtensions", 
function () {
return [".js", ".html", ".htm", ".xhtml", "xml", ".png", ".gif", ".jpg", ".jpeg"];
});
cla$$.getPrograms = $_M (cla$$, "getPrograms", 
function () {
var j2s =  new $wt.program.Program ();
j2s.name = "Java2Script Pacemaker";
j2s.command = "$wt.program.Program.loadJavaScript(\"%1\")";
j2s.iconName = "images/z-logo.gif";
var browser =  new $wt.program.Program ();
browser.name = "Embeded Browser";
browser.command = "window.open(\"%1\")";
browser.iconName = "images/browser.gif";
return [j2s, browser];
});
cla$$.loadJavaScript = $_M (cla$$, "loadJavaScript", 
function (url) {
var script = document.createElement ("SCRIPT");
script.src = url;
document.body.appendChild (script);
}, "String");
cla$$.launch = $_M (cla$$, "launch", 
function (fileName) {
if (fileName == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
if (fileName.endsWith (".js")) {
$wt.program.Program.findProgram (".js").execute (fileName);
} else {
$wt.program.Program.findProgram (fileName).execute (fileName);
}return true;
}, "String");
$_M (cla$$, "execute", 
function (fileName) {
if (fileName == null) $WT.error ($WT.ERROR_NULL_ARGUMENT);
var quote = true;
var prefix = this.command;
var suffix = "";
var index = this.command.indexOf ("%1");
if (index != -1) {
var count = 0;
var i = index + 2;
var length = this.command.length;
while (i < length) {
if ((this.command.charAt (i)).charCodeAt (0) == ('"').charCodeAt (0)) count++;
i++;
}
quote = count % 2 == 0;
prefix = this.command.substring (0, index);
suffix = this.command.substring (index + 2, length);
}if (!fileName.startsWith ("/") && !fileName.startsWith ("\\") && (fileName.charAt (1)).charCodeAt (0) == (':').charCodeAt (0)) {
fileName = "file:///" + fileName;
}if (quote) fileName = "\"" + fileName + "\"";
try {
eval ((prefix + fileName + suffix).replace (/\\/g, "\\\\"));
} catch (e) {
if ($_O (e, Error)) {
eval ((prefix + fileName + suffix).replace (/\\/g, "\\\\"));
} else {
throw e;
}
}
return true;
}, "String");
$_M (cla$$, "getImageData", 
function () {
return  new $wt.graphics.ImageData (this.iconName);
});
$_M (cla$$, "getName", 
function () {
return this.name;
});
$_V (cla$$, "equals", 
function (other) {
if (this == other) return true;
if ($_O (other, $wt.program.Program)) {
var program = other;
return this.name.equals (program.name) && this.command.equals (program.command) && this.iconName.equals (program.iconName);
}return false;
}, "Object");
$_V (cla$$, "hashCode", 
function () {
return this.name.hashCode () ^ this.command.hashCode () ^ this.iconName.hashCode ();
});
$_V (cla$$, "toString", 
function () {
return "Program {" + this.name + "}";
});
cla$$ = $_C (function () {
this.target = null;
this.x = 0;
this.y = 0;
this.leftButtonHold = false;
this.event = null;
this.type = 0;
$_Z (this, arguments);
}, $wt.internal.dnd, "HTMLEventWrapper");
$_K (cla$$, 
function (event) {
this.event = event;
this.wrapEvent (event);
}, "Object");
$_M (cla$$, "wrapEvent", 
function (event) {
}, "Object");
$_M (cla$$, "stopPropagation", 
function () {
});
$_M (cla$$, "preventDefault", 
function () {
});
$_I ($wt.internal.dnd, "DragListener");
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.internal.dnd, "DragAdapter", null, $wt.internal.dnd.DragListener);
$_V (cla$$, "dragBegan", 
function (e) {
return true;
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "dragCanceled", 
function (e) {
return true;
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "dragEnded", 
function (e) {
return true;
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "dragging", 
function (e) {
return true;
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "isDraggable", 
function (e) {
return true;
}, "$wt.internal.dnd.HTMLEventWrapper");
cla$$ = $_C (function () {
this.event = null;
this.sourceElement = null;
this.startX = 0;
this.startY = 0;
this.currentX = 0;
this.currentY = 0;
$_Z (this, arguments);
}, $wt.internal.dnd, "DragEvent");
$_K (cla$$, 
function (evt, src, x, y) {
this.event = evt;
this.sourceElement = src;
this.startX = x;
this.startY = y;
}, "$wt.internal.dnd.HTMLEventWrapper,$wt.internal.xhtml.Element,Number,Number");
$_M (cla$$, "deltaX", 
function () {
return this.currentX - this.startX;
});
$_M (cla$$, "deltaY", 
function () {
return this.currentY - this.startY;
});
$_M (cla$$, "mouseMoveTo", 
function (currentX, currentY) {
this.currentX = currentX;
this.currentY = currentY;
}, "Number,Number");
$_V (cla$$, "toString", 
function () {
return "DragEvent {" + this.sourceElement + "#" + "(" + this.startX + "," + this.startY + ")->" + "(" + this.currentX + "," + this.currentY + ")}";
});
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.internal.dnd, "DNDUtils");
cla$$.bindFunctionWith = $_M (cla$$, "bindFunctionWith", 
function (aFun, obj) {
return obj;
}, "Object,Object");
cla$$.onselectstart = $_M (cla$$, "onselectstart", 
function (e) {
var evt =  new $wt.internal.dnd.HTMLEventWrapper (e);
evt.preventDefault ();
evt.stopPropagation ();
return false;
}, "Object");
cla$$.onmousemove = $_M (cla$$, "onmousemove", 
function (e, oThis) {
var evt =  new $wt.internal.dnd.HTMLEventWrapper (e);
if (!evt.leftButtonHold) {
if (oThis.status != 0) {
var dndEvt =  new $wt.internal.dnd.DragEvent (evt, oThis.element, oThis.startX, oThis.startY);
dndEvt.mouseMoveTo (evt.x, evt.y);
oThis.notifyDragEnded (dndEvt);
oThis.status = 0;
}oThis.reset ();
return false;
}var dndEvt =  new $wt.internal.dnd.DragEvent (evt, oThis.element, oThis.startX, oThis.startY);
if (oThis.status == 0) {
oThis.status = 1;
oThis.startX = evt.x;
oThis.startY = evt.y;
dndEvt.mouseMoveTo (evt.x, evt.y);
oThis.notifyDragBegan (dndEvt);
}dndEvt.mouseMoveTo (evt.x, evt.y);
oThis.notifyDragging (dndEvt);
return true;
}, "Object,$wt.internal.dnd.DragAndDrop");
cla$$.onmousedown = $_M (cla$$, "onmousedown", 
function (e, oThis) {
var evt =  new $wt.internal.dnd.HTMLEventWrapper (e);
if (!oThis.checkDraggable (evt)) {
return true;
}document.onselectstart = $wt.internal.dnd.DNDUtils.$onselectstart;
evt.target.onselectstart = $wt.internal.dnd.DNDUtils.$onselectstart;
document.onmousemove = $wt.internal.dnd.DNDUtils.bindFunctionWith ($wt.internal.dnd.DNDUtils.$onmousemove, oThis);
document.onkeyup = $wt.internal.dnd.DNDUtils.bindFunctionWith ($wt.internal.dnd.DNDUtils.$onkeyup, oThis);
document.onmouseup = $wt.internal.dnd.DNDUtils.bindFunctionWith ($wt.internal.dnd.DNDUtils.$onmouseup, oThis);
evt.preventDefault ();
evt.stopPropagation ();
return false;
}, "Object,$wt.internal.dnd.DragAndDrop");
cla$$.onkeyup = $_M (cla$$, "onkeyup", 
function (e, oThis) {
var evt =  new $wt.internal.dnd.HTMLEventWrapper (e);
if ((evt.event).keyCode == 27) {
if (oThis.status != 0) {
var dndEvt =  new $wt.internal.dnd.DragEvent (evt, oThis.element, oThis.startX, oThis.startY);
dndEvt.mouseMoveTo (evt.x, evt.y);
oThis.notifyDragCanceled (dndEvt);
oThis.status = 0;
}oThis.reset ();
return false;
}return true;
}, "Object,$wt.internal.dnd.DragAndDrop");
cla$$.onmouseup = $_M (cla$$, "onmouseup", 
function (e, oThis) {
if (oThis.status != 0) {
var evt =  new $wt.internal.dnd.HTMLEventWrapper (e);
var dndEvt =  new $wt.internal.dnd.DragEvent (evt, oThis.element, oThis.startX, oThis.startY);
dndEvt.mouseMoveTo (evt.x, evt.y);
oThis.notifyDragEnded (dndEvt);
oThis.status = 0;
}oThis.reset ();
var evt =  new $wt.internal.dnd.HTMLEventWrapper (e);
evt.preventDefault ();
evt.stopPropagation ();
return false;
}, "Object,$wt.internal.dnd.DragAndDrop");
$_S (cla$$,
"$onselectstart", null,
"$onmousemove", null,
"$onmousedown", null,
"$onmouseup", null,
"$onkeyup", null);
cla$$ = $_C (function () {
this.status = 0;
this.element = null;
this.startX = 0;
this.startY = 0;
this.listeners =  new Array (0);
$_Z (this, arguments);
}, $wt.internal.dnd, "DragAndDrop");
$_M (cla$$, "reset", 
function () {
this.status = 0;
document.onmousemove = null;
document.onmouseup = null;
document.onselectstart = null;
document.onkeyup = null;
if (this.element != null) {
this.element.onselectstart = null;
}});
$_M (cla$$, "bind", 
function (el) {
this.element = el;
el.onmousedown = $wt.internal.dnd.DNDUtils.bindFunctionWith ($wt.internal.dnd.DNDUtils.$onmousedown, this);
}, "$wt.internal.xhtml.Element");
$_M (cla$$, "checkDraggable", 
function (e) {
for (var i = 0; i < this.listeners.length; i++) {
if (!this.listeners[i].isDraggable (e)) {
return false;
}}
return true;
}, "$wt.internal.dnd.HTMLEventWrapper");
$_M (cla$$, "notifyDragBegan", 
function (e) {
for (var i = 0; i < this.listeners.length; i++) {
if (!this.listeners[i].dragBegan (e)) {
return false;
}}
return true;
}, "$wt.internal.dnd.DragEvent");
$_M (cla$$, "notifyDragging", 
function (e) {
for (var i = 0; i < this.listeners.length; i++) {
this.listeners[i].dragging (e);
}
return true;
}, "$wt.internal.dnd.DragEvent");
$_M (cla$$, "notifyDragEnded", 
function (e) {
for (var i = 0; i < this.listeners.length; i++) {
this.listeners[i].dragEnded (e);
}
return true;
}, "$wt.internal.dnd.DragEvent");
$_M (cla$$, "notifyDragCanceled", 
function (e) {
for (var i = 0; i < this.listeners.length; i++) {
this.listeners[i].dragCanceled (e);
}
return true;
}, "$wt.internal.dnd.DragEvent");
$_M (cla$$, "addDragListener", 
function (listener) {
for (var i = 0; i < this.listeners.length; i++) {
if (this.listeners[i] == listener) {
return ;
}}
this.listeners[this.listeners.length] = listener;
}, "$wt.internal.dnd.DragListener");
$_M (cla$$, "removeDragListener", 
function (listener) {
for (var i = 0; i < this.listeners.length; i++) {
if (this.listeners[i] == listener) {
for (var j = i + 1; j < this.listeners.length; j++) {
this.listeners[j - 1] = this.listeners[j];
}
var oldListeners = this.listeners;
this.listeners =  new Array (oldListeners.length - 1);
for (var j = 0; j < oldListeners.length - 1; j++) {
this.listeners[j] = oldListeners[j];
}
return listener;
}}
return null;
}, "$wt.internal.dnd.DragListener");
cla$$ = $_C (function () {
this.sourceX = 0;
this.sourceY = 0;
this.sourceWidth = 0;
this.sourceHeight = 0;
this.resize = null;
this.frame = null;
this.overFrameHandle = null;
$_Z (this, arguments);
}, $wt.internal.dnd, "ShellFrameDND", $wt.internal.dnd.DragAdapter);
$_V (cla$$, "isDraggable", 
function (e) {
var cssName = e.target.className;
if (cssName != null) {
if (cssName.indexOf ("shell") == 0 && (cssName.indexOf ("top") != -1 || cssName.indexOf ("middle") != -1 || cssName.indexOf ("bottom") != -1)) {
this.resize = cssName.substring (6);
return true;
} else if (cssName.indexOf ("shelltitle") != -1) {
return true;
}}return false;
}, "$wt.internal.dnd.HTMLEventWrapper");
$_V (cla$$, "dragBegan", 
function (e) {
var firstTime = false;
if (this.frame == null) {
this.frame = document.createElement ("DIV");
this.frame.className = "shell-handle";
this.frame.style.backgroundColor = "transparent";
this.frame.style.left = this.sourceX + "px";
this.frame.style.top = this.sourceY + "px";
this.frame.style.zIndex = "" + (Integer.parseInt (window.currentTopZIndex) + 100);
document.body.appendChild (this.frame);
var titleBar = document.createElement ("DIV");
titleBar.className = "shell-title-bar opacity";
titleBar.style.paddingTop = "4px";
this.frame.appendChild (titleBar);
firstTime = true;
} else {
this.frame.style.left = this.sourceX + "px";
this.frame.style.top = this.sourceY + "px";
this.frame.style.display = "block";
}this.sourceX = Integer.parseInt (e.sourceElement.style.left);
this.sourceY = Integer.parseInt (e.sourceElement.style.top);
this.sourceWidth = Integer.parseInt (e.sourceElement.style.width);
this.sourceHeight = Integer.parseInt (e.sourceElement.style.height);
e.startX = e.currentX;
e.startY = e.currentY;
if (firstTime) {
this.frame.style.width = this.sourceWidth + "px";
this.frame.style.height = this.sourceHeight + "px";
}var frames = document.getElementsByTagName ("IFRAME");
if (frames.length != 0) {
this.overFrameHandle = document.createElement ("DIV");
this.overFrameHandle.className = "over-iframe-layer";
this.overFrameHandle.style.zIndex = window.currentTopZIndex;
document.body.appendChild (this.overFrameHandle);
}return true;
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "dragging", 
function (e) {
if (this.resize != null) {
var xx = this.sourceX;
var yy = this.sourceY;
var ww = this.sourceWidth;
var hh = this.sourceHeight;
if (this.resize == "left-top") {
xx += e.deltaX ();
yy += e.deltaY ();
ww -= e.deltaX ();
hh -= e.deltaY ();
document.body.style.cursor = "nw-resize";
} else if (this.resize == "center-top") {
yy += e.deltaY ();
hh -= e.deltaY ();
document.body.style.cursor = "n-resize";
} else if (this.resize == "right-top") {
yy += e.deltaY ();
ww += e.deltaX ();
hh -= e.deltaY ();
document.body.style.cursor = "ne-resize";
} else if (this.resize == "left-middle") {
xx += e.deltaX ();
ww -= e.deltaX ();
document.body.style.cursor = "w-resize";
} else if (this.resize == "right-middle") {
ww += e.deltaX ();
document.body.style.cursor = "e-resize";
} else if (this.resize == "left-bottom") {
xx += e.deltaX ();
ww -= e.deltaX ();
hh += e.deltaY ();
document.body.style.cursor = "sw-resize";
} else if (this.resize == "center-bottom") {
hh += e.deltaY ();
document.body.style.cursor = "s-resize";
} else if (this.resize == "right-bottom") {
ww += e.deltaX ();
hh += e.deltaY ();
document.body.style.cursor = "se-resize";
}this.frame.style.left = xx + "px";
this.frame.style.top = yy + "px";
this.frame.style.width = ((ww > 104) ? ww : 110) + "px";
this.frame.style.height = ((hh > 26) ? hh : 26) + "px";
return true;
}var xx = this.sourceX + e.deltaX ();
var yy = this.sourceY + e.deltaY ();
var gHeight = document.body.clientHeight;
var gWidth = document.body.clientWidth;
var dWidth = Integer.parseInt (e.sourceElement.style.width);
if (xx < -dWidth) {
xx = -dWidth;
} else if (xx > gWidth - 2) {
xx = gWidth - 2;
}if (yy < 0) {
yy = 0;
} else if (yy > gHeight + 18) {
yy = gHeight + 18;
}if (!(e.event.event).ctrlKey) {
if (Math.abs (xx - gWidth + dWidth) < 10) {
xx = gWidth - dWidth;
} else if (Math.abs (xx) < 10) {
xx = 0;
}var dHeight = Integer.parseInt (e.sourceElement.style.height);
if (Math.abs (yy - gHeight + dHeight + 2) < 10) {
yy = gHeight - dHeight - 2;
} else if (Math.abs (yy - (-1)) < 10) {
yy = -1;
}}this.frame.style.left = xx + "px";
this.frame.style.top = yy + "px";
if (document.body.scrollLeft != 0) {
document.body.scrollLeft = 0;
}if (document.body.scrollTop != 0) {
document.body.scrollTop = 0;
}return true;
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "dragEnded", 
function (e) {
var x = Integer.parseInt (this.frame.style.left);
var y = Integer.parseInt (this.frame.style.top);
var width = Integer.parseInt (this.frame.style.width);
var height = Integer.parseInt (this.frame.style.height);
var shell = e.sourceElement;
shell.style.left = x + "px";
shell.style.top = y + "px";
shell.style.width = width + "px";
shell.style.height = height + "px";
shell.style.zIndex = window.currentTopZIndex = "" + (Integer.parseInt (window.currentTopZIndex) + 2);
$wt.internal.dnd.ShellFrameDND.fixShellHeight (e.sourceElement);
$wt.internal.dnd.ShellFrameDND.fixShellWidth (e.sourceElement);
this.updateShellBounds (x, y, width, height);
this.clean ();
return true;
}, "$wt.internal.dnd.DragEvent");
$_M (cla$$, "clean", 
($fz = function () {
this.frame.style.display = "none";
document.body.style.cursor = "auto";
this.resize = null;
if (this.overFrameHandle != null) {
document.body.removeChild (this.overFrameHandle);
this.overFrameHandle = null;
}}, $fz.isPrivate = true, $fz));
$_M (cla$$, "updateShellBounds", 
function (x, y, width, height) {
return true;
}, "Number,Number,Number,Number");
$_V (cla$$, "dragCanceled", 
function (e) {
this.clean ();
return true;
}, "$wt.internal.dnd.DragEvent");
cla$$.fixShellHeight = $_M (cla$$, "fixShellHeight", 
function (shell) {
var height = Integer.parseInt ((shell).style.height);
var divs = (shell).getElementsByTagName ("DIV");
for (var i = 0; i < divs.length; i++) {
var div = divs[i];
if (div.className != null) {
if (div.className.indexOf ("middle") != -1) {
if (height - 40 >= 0) {
div.style.height = (height - 40) + "px";
} else {
div.style.height = "0px";
}} else if (div.className.indexOf ("shell-content") != -1) {
div.style.height = ((height - 30 >= 0) ? height - 30 : 0) + "px";
}}}
}, "Object");
cla$$.fixShellWidth = $_M (cla$$, "fixShellWidth", 
function (shell) {
var needToFixedWidth = true;
var width = Integer.parseInt ((shell).style.width) - 6;
var divs = (shell).getElementsByTagName ("DIV");
for (var i = 0; i < divs.length; i++) {
var div = divs[i];
var cssName = div.className;
if (cssName != null) {
if (cssName.indexOf ("shell-center-") != -1) {
if (needToFixedWidth) {
div.style.width = (width - 46) + "px";
}} else if (cssName.indexOf ("shell-content") != -1) {
div.style.width = width + "px";
} else if (cssName.indexOf ("shell-title-bar") != -1) {
div.style.width = width + "px";
}}}
}, "Object");
cla$$ = $_C (function () {
this.sourceX = 0;
this.sourceY = 0;
this.thumb = null;
this.isHorizontal = false;
this.overFrameHandle = null;
$_Z (this, arguments);
}, $wt.internal.dnd, "SashDND", $wt.internal.dnd.DragAdapter);
$_V (cla$$, "dragBegan", 
function (e) {
this.thumb = document.createElement ("DIV");
var cssName = e.sourceElement.className;
this.thumb.className = cssName;
if (cssName != null && cssName.indexOf ("sash-mouse-down") == -1) {
this.thumb.className += " sash-mouse-down";
}if (cssName.indexOf ("horizontal") != -1) {
this.isHorizontal = true;
} else {
this.isHorizontal = false;
}this.thumb.style.left = e.sourceElement.style.left;
this.thumb.style.top = e.sourceElement.style.top;
this.thumb.style.width = e.sourceElement.style.width;
this.thumb.style.height = e.sourceElement.style.height;
this.thumb.onselectstart = $wt.internal.dnd.DNDUtils.$onselectstart;
if (e.sourceElement.nextSibling != null) {
e.sourceElement.parentNode.insertBefore (this.thumb, e.sourceElement.nextSibling);
} else {
e.sourceElement.parentNode.appendChild (this.thumb);
}this.sourceX = Integer.parseInt (e.sourceElement.style.left);
this.sourceY = Integer.parseInt (e.sourceElement.style.top);
e.startX = e.currentX;
e.startY = e.currentY;
var frames = document.getElementsByTagName ("IFRAME");
if (frames.length != 0) {
this.overFrameHandle = document.createElement ("DIV");
this.overFrameHandle.className = "over-iframe-layer";
this.overFrameHandle.style.zIndex = window.currentTopZIndex;
document.body.appendChild (this.overFrameHandle);
}return true;
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "dragCanceled", 
function (e) {
this.clean ();
return true;
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "dragEnded", 
function (e) {
this.clean ();
return true;
}, "$wt.internal.dnd.DragEvent");
$_M (cla$$, "clean", 
function () {
this.thumb.style.display = "none";
document.body.style.cursor = "auto";
this.thumb.parentNode.removeChild (this.thumb);
if (this.overFrameHandle != null) {
document.body.removeChild (this.overFrameHandle);
this.overFrameHandle = null;
}});
$_M (cla$$, "currentLocation", 
function (e) {
var xx = this.sourceX + e.deltaX ();
var yy = this.sourceY + e.deltaY ();
var gHeight = Integer.parseInt (e.sourceElement.parentNode.style.height);
var gWidth = Integer.parseInt (e.sourceElement.parentNode.style.width);
var dWidth = Integer.parseInt (e.sourceElement.style.width);
var dHeight = Integer.parseInt (e.sourceElement.style.height);
if (xx < 0) {
xx = 0;
} else if (xx > gWidth - dWidth - 2) {
xx = gWidth - dWidth - 2;
}if (yy < 0) {
yy = 0;
} else if (yy > gHeight - dHeight - 2) {
yy = gHeight - dHeight - 2;
}return  new $wt.graphics.Point (xx, yy);
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "dragging", 
function (e) {
if (this.isHorizontal) {
document.body.style.cursor = "e-resize";
this.thumb.style.cursor = "e-resize";
} else {
document.body.style.cursor = "s-resize";
this.thumb.style.cursor = "s-resize";
}if (this.isHorizontal) {
this.thumb.style.left = this.currentLocation (e).x + "px";
} else {
this.thumb.style.top = this.currentLocation (e).y + "px";
}return true;
}, "$wt.internal.dnd.DragEvent");
cla$$ = $_C (function () {
this.sourceX = 0;
this.sourceY = 0;
this.isHorizontal = false;
$_Z (this, arguments);
}, $wt.internal.dnd, "ScaleDND", $wt.internal.dnd.DragAdapter);
$_V (cla$$, "dragBegan", 
function (e) {
var cssName = e.sourceElement.className;
if (cssName.indexOf ("horizontal") != -1) {
this.isHorizontal = true;
} else {
this.isHorizontal = false;
}this.sourceX = Integer.parseInt (e.sourceElement.style.left);
this.sourceY = Integer.parseInt (e.sourceElement.style.top);
e.startX = e.currentX;
e.startY = e.currentY;
return true;
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "dragCanceled", 
function (e) {
document.body.style.cursor = "auto";
return true;
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "dragEnded", 
function (e) {
document.body.style.cursor = "auto";
return true;
}, "$wt.internal.dnd.DragEvent");
$_M (cla$$, "currentLocation", 
function (e) {
var xx = this.sourceX + e.deltaX ();
var yy = this.sourceY + e.deltaY ();
var gHeight = Integer.parseInt (e.sourceElement.parentNode.style.height);
var gWidth = Integer.parseInt (e.sourceElement.parentNode.style.width);
var dWidth = Integer.parseInt (e.sourceElement.style.width);
var dHeight = Integer.parseInt (e.sourceElement.style.height);
if (this.isHorizontal) {
dWidth = 10;
dHeight = 18;
} else {
dWidth = 18;
dHeight = 10;
}if (xx < 0) {
xx = 0;
} else if (xx > gWidth - dWidth - 2) {
xx = gWidth - dWidth - 2;
}if (yy < 0) {
yy = 0;
} else if (yy > gHeight - dHeight - 2) {
yy = gHeight - dHeight - 2;
}return  new $wt.graphics.Point (xx, yy);
}, "$wt.internal.dnd.DragEvent");
$_V (cla$$, "dragging", 
function (e) {
if (this.isHorizontal) {
e.sourceElement.style.left = this.currentLocation (e).x + "px";
} else {
e.sourceElement.style.top = this.currentLocation (e).y + "px";
}return true;
}, "$wt.internal.dnd.DragEvent");
cla$$ = $_C (function () {
this.sourceX = 0;
this.sourceY = 0;
this.isHorizontal = false;
$_Z (this, arguments);
}, $wt.internal.dnd, "SliderDND", $wt.internal.dnd.DragAdapter);
$_V (cla$$, "dragBegan", 
function (e) {
var cssName = e.sourceElement.className;
if (cssName.indexOf ("horizontal") != -1) {
this.isHorizontal = true;
} else {
this.isHorizontal = false;
}this.sourceX = Integer.parseInt (e.sourceElement.style.left);
this.sourceY = Integer.parseInt (e.sourceElement.style.top);
e.startX = e.currentX;
e.startY = e.currentY;
return true;
}, "$wt.internal.dnd.DragEvent");
var methods = ["onmousedown", "onmouseup", "onmousemove",
		"onkeyup", "onselectstart"]
for (var i = 0; i < methods.length; i++) {
	org.eclipse.swt.internal.dnd.DNDUtils["$" + methods[i]] =
			org.eclipse.swt.internal.dnd.DNDUtils[methods[i]];
}
org.eclipse.swt.internal.dnd.DNDUtils.bindFunctionWith = function (aFun, obj) {
	var xFun = null;
	eval ("xFun = " + aFun + ";");
	return (function (yFun, o) {
		return function (e) {
			return yFun (e, o);
		}
	}) (xFun, obj);
};
org.eclipse.swt.internal.dnd.HTMLEventWrapper.prototype.wrapEvent = null;
org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton = 0;
Clazz.defineMethod (org.eclipse.swt.internal.dnd.HTMLEventWrapper, "wrapEvent",
function (e) {
	this.target = null;
	this.x = 0;
	this.y = 0;
	this.leftButtonHold = true;
	this.event = null;
	this.type = 0;

	/*
	 * See more about Event properties at 
	 * http://www.quirksmode.org/js/events_properties.html
	 */
	if (!e) {
		e = window.event;
		this.stopPropagation = function () {
			this.event.cancelBubble = true;
		};
		this.preventDefault = function () {
			this.event.returnValue = false;
		};
	} else {
		this.stopPropagation = function () {
			this.event.stopPropagation ();
		};
		this.preventDefault = function () {
			this.event.preventDefault ();
		};
	}
	this.event = e;
	this.type = e.type;
	if (e.target) {
		this.target = e.target;
	} else if (e.srcElement) {
		this.target = e.srcElement;
	}
	if (e.pageX || e.pageY) {
		this.x = e.pageX;
		this.y = e.pageY;
	} else if (e.clientX || e.clientY) {
		this.x = e.clientX + document.body.scrollLeft;
		this.y = e.clientY + document.body.scrollTop;
	}

	if (e.which) {
		this.leftButtonHold = (e.which == 1);
		if (e.which == 19 || e.which == 65536 || e.which > 8) {
			this.leftButtonHold = (org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton == 1);
		} else {
			org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton = e.which;
		}
	} else if (e.button) {
		this.leftButtonHold = (e.button == 1);
	}
}, "Object");cla$$ = $_C (function () {
this.shell = null;
this.status = 0;
$_Z (this, arguments);
}, $wt.internal, "ResizeHandler");
$_K (cla$$, 
function (shell, status) {
this.shell = shell;
this.status = status;
}, "$wt.widgets.Decorations,Number");
$_M (cla$$, "updateMinimized", 
function () {
this.shell.setLocation (-1, document.body.clientHeight - 26);
});
$_M (cla$$, "updateMaximized", 
function () {
var height = document.body.clientHeight - 0;
if (height > window.screen.availHeight - 10) {
height = window.screen.availHeight - 10;
}var width = document.body.clientWidth;
if (width > window.screen.availWidth) {
width = window.screen.availWidth;
}this.shell.setBounds (0 - 4, 0 - 4, width - 2, height + 4);
document.body.scrollTop = 0;
});
$_M (cla$$, "updateCentered", 
function () {
var size = this.shell.getSize ();
var y = Math.floor ((document.body.clientHeight - size.y) / 2) - 20;
if (y < 0) {
y = 0;
}this.shell.setLocation (Math.floor ((document.body.clientWidth - size.x) / 2), y);
});
$_M (cla$$, "getStatus", 
function () {
return this.status;
});
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.internal, "ResizeSystem");
cla$$.register = $_M (cla$$, "register", 
function (shell, status) {
for (var i = 0; i < $wt.internal.ResizeSystem.handlers.length; i++) {
if ($wt.internal.ResizeSystem.handlers[i] != null && $wt.internal.ResizeSystem.handlers[i].shell == shell) {
return ;
}}
for (var i = 0; i < $wt.internal.ResizeSystem.handlers.length; i++) {
if ($wt.internal.ResizeSystem.handlers[i] == null) {
$wt.internal.ResizeSystem.handlers[i] =  new $wt.internal.ResizeHandler (shell, status);
return ;
}}
$wt.internal.ResizeSystem.handlers[$wt.internal.ResizeSystem.handlers.length] =  new $wt.internal.ResizeHandler (shell, status);
return ;
}, "$wt.widgets.Decorations,Number");
cla$$.unregister = $_M (cla$$, "unregister", 
function (shell) {
for (var i = 0; i < $wt.internal.ResizeSystem.handlers.length; i++) {
if ($wt.internal.ResizeSystem.handlers[i] != null && $wt.internal.ResizeSystem.handlers[i].shell == shell) {
$wt.internal.ResizeSystem.handlers[i] = null;
return ;
}}
}, "$wt.widgets.Decorations");
cla$$.updateResize = $_M (cla$$, "updateResize", 
function () {
for (var i = 0; i < $wt.internal.ResizeSystem.handlers.length; i++) {
var hdl = $wt.internal.ResizeSystem.handlers[i];
if (hdl != null) {
var status = hdl.getStatus ();
if (status == $WT.MAX) {
hdl.updateMaximized ();
} else if (status == $WT.MIN) {
hdl.updateMinimized ();
} else if (status == $WT.CENTER) {
hdl.updateCentered ();
}}}
});
cla$$.handlers = cla$$.prototype.handlers =  new Array (5);
Sync2Async = {};
Sync2Async.block = function (shell, oThis, runnable) {
shell.addDisposeListener ((function (innerThis, finalVars) {
if (!Clazz.isClassDefined ("Sync2Async$1")) {
Clazz.pu$h ();
cla$$ = Sync2Async$1 = function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (cla$$, "Sync2Async$1", null, $wt.events.DisposeListener);
Clazz.defineMethod (cla$$, "widgetDisposed", 
function (e) {
var $runnable = this.$finals.runnable;
var $oThis = this.$finals.oThis;
window.setTimeout (function () {
$runnable.apply ($oThis);
}, 0);
//this.$finals.runnable.apply (this.$finals.oThis);
}, "$wt.events.DisposeEvent");
cla$$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (Sync2Async$1, innerThis, finalVars);
}) (this, Clazz.cloneFinals ("runnable", runnable, "oThis", oThis)));
};