Clazz.declarePackage ("org.eclipse.jface.util");
Clazz.load (null, "org.eclipse.jface.util.Geometry", ["$wt.graphics.Point", "$.Rectangle"], function () {
c$ = Clazz.declareType (org.eclipse.jface.util, "Geometry");
c$.distanceSquared = Clazz.defineMethod (c$, "distanceSquared", 
function (p1, p2) {
var term1 = p1.x - p2.x;
var term2 = p1.y - p2.y;
return term1 * term1 + term2 * term2;
}, "$wt.graphics.Point,$wt.graphics.Point");
c$.magnitude = Clazz.defineMethod (c$, "magnitude", 
function (p) {
return Math.sqrt (org.eclipse.jface.util.Geometry.magnitudeSquared (p));
}, "$wt.graphics.Point");
c$.magnitudeSquared = Clazz.defineMethod (c$, "magnitudeSquared", 
function (p) {
return p.x * p.x + p.y * p.y;
}, "$wt.graphics.Point");
c$.dotProduct = Clazz.defineMethod (c$, "dotProduct", 
function (p1, p2) {
return p1.x * p2.x + p1.y * p2.y;
}, "$wt.graphics.Point,$wt.graphics.Point");
c$.min = Clazz.defineMethod (c$, "min", 
function (p1, p2) {
return  new $wt.graphics.Point (Math.min (p1.x, p2.x), Math.min (p1.y, p2.y));
}, "$wt.graphics.Point,$wt.graphics.Point");
c$.max = Clazz.defineMethod (c$, "max", 
function (p1, p2) {
return  new $wt.graphics.Point (Math.max (p1.x, p2.x), Math.max (p1.y, p2.y));
}, "$wt.graphics.Point,$wt.graphics.Point");
c$.getDirectionVector = Clazz.defineMethod (c$, "getDirectionVector", 
function (distance, direction) {
switch (direction) {
case 128:
return  new $wt.graphics.Point (0, -distance);
case 1024:
return  new $wt.graphics.Point (0, distance);
case 16384:
return  new $wt.graphics.Point (-distance, 0);
case 131072:
return  new $wt.graphics.Point (distance, 0);
}
return  new $wt.graphics.Point (0, 0);
}, "~N,~N");
c$.centerPoint = Clazz.defineMethod (c$, "centerPoint", 
function (rect) {
return  new $wt.graphics.Point (rect.x + Math.floor (rect.width / 2), rect.y + Math.floor (rect.height / 2));
}, "$wt.graphics.Rectangle");
c$.copy = Clazz.defineMethod (c$, "copy", 
function (toCopy) {
return  new $wt.graphics.Point (toCopy.x, toCopy.y);
}, "$wt.graphics.Point");
c$.set = Clazz.defineMethod (c$, "set", 
function (result, toCopy) {
result.x = toCopy.x;
result.y = toCopy.y;
}, "$wt.graphics.Point,$wt.graphics.Point");
c$.set = Clazz.defineMethod (c$, "set", 
function (result, toCopy) {
result.x = toCopy.x;
result.y = toCopy.y;
result.width = toCopy.width;
result.height = toCopy.height;
}, "$wt.graphics.Rectangle,$wt.graphics.Rectangle");
c$.add = Clazz.defineMethod (c$, "add", 
function (point1, point2) {
return  new $wt.graphics.Point (point1.x + point2.x, point1.y + point2.y);
}, "$wt.graphics.Point,$wt.graphics.Point");
c$.divide = Clazz.defineMethod (c$, "divide", 
function (toDivide, scalar) {
return  new $wt.graphics.Point (Math.floor (toDivide.x / scalar), Math.floor (toDivide.y / scalar));
}, "$wt.graphics.Point,~N");
c$.subtract = Clazz.defineMethod (c$, "subtract", 
function (point1, point2) {
return  new $wt.graphics.Point (point1.x - point2.x, point1.y - point2.y);
}, "$wt.graphics.Point,$wt.graphics.Point");
c$.flipXY = Clazz.defineMethod (c$, "flipXY", 
function (toFlip) {
var temp = toFlip.x;
toFlip.x = toFlip.y;
toFlip.y = temp;
}, "$wt.graphics.Point");
c$.flipXY = Clazz.defineMethod (c$, "flipXY", 
function (toFlip) {
var temp = toFlip.x;
toFlip.x = toFlip.y;
toFlip.y = temp;
temp = toFlip.width;
toFlip.width = toFlip.height;
toFlip.height = temp;
}, "$wt.graphics.Rectangle");
c$.getDimension = Clazz.defineMethod (c$, "getDimension", 
function (toMeasure, width) {
if (width) {
return toMeasure.width;
} else {
return toMeasure.height;
}}, "$wt.graphics.Rectangle,~B");
c$.getCoordinate = Clazz.defineMethod (c$, "getCoordinate", 
function (toMeasure, width) {
return width ? toMeasure.x : toMeasure.y;
}, "$wt.graphics.Point,~B");
c$.getCoordinate = Clazz.defineMethod (c$, "getCoordinate", 
function (toMeasure, width) {
return width ? toMeasure.x : toMeasure.y;
}, "$wt.graphics.Rectangle,~B");
c$.setDimension = Clazz.defineMethod (c$, "setDimension", 
function (toSet, width, newCoordinate) {
if (width) {
toSet.width = newCoordinate;
} else {
toSet.height = newCoordinate;
}}, "$wt.graphics.Rectangle,~B,~N");
c$.setCoordinate = Clazz.defineMethod (c$, "setCoordinate", 
function (toSet, width, newCoordinate) {
if (width) {
toSet.x = newCoordinate;
} else {
toSet.y = newCoordinate;
}}, "$wt.graphics.Rectangle,~B,~N");
c$.setCoordinate = Clazz.defineMethod (c$, "setCoordinate", 
function (toSet, width, newCoordinate) {
if (width) {
toSet.x = newCoordinate;
} else {
toSet.y = newCoordinate;
}}, "$wt.graphics.Point,~B,~N");
c$.getDistanceFromEdge = Clazz.defineMethod (c$, "getDistanceFromEdge", 
function (rectangle, testPoint, edgeOfInterest) {
switch (edgeOfInterest) {
case 128:
return testPoint.y - rectangle.y;
case 1024:
return rectangle.y + rectangle.height - testPoint.y;
case 16384:
return testPoint.x - rectangle.x;
case 131072:
return rectangle.x + rectangle.width - testPoint.x;
}
return 0;
}, "$wt.graphics.Rectangle,$wt.graphics.Point,~N");
c$.getExtrudedEdge = Clazz.defineMethod (c$, "getExtrudedEdge", 
function (toExtrude, size, orientation) {
var bounds =  new $wt.graphics.Rectangle (toExtrude.x, toExtrude.y, toExtrude.width, toExtrude.height);
if (!org.eclipse.jface.util.Geometry.isHorizontal (orientation)) {
bounds.width = size;
} else {
bounds.height = size;
}switch (orientation) {
case 131072:
bounds.x = toExtrude.x + toExtrude.width - bounds.width;
break;
case 1024:
bounds.y = toExtrude.y + toExtrude.height - bounds.height;
break;
}
org.eclipse.jface.util.Geometry.normalize (bounds);
return bounds;
}, "$wt.graphics.Rectangle,~N,~N");
c$.getOppositeSide = Clazz.defineMethod (c$, "getOppositeSide", 
function (swtDirectionConstant) {
switch (swtDirectionConstant) {
case 128:
return 1024;
case 1024:
return 128;
case 16384:
return 131072;
case 131072:
return 16384;
}
return swtDirectionConstant;
}, "~N");
c$.getSwtHorizontalOrVerticalConstant = Clazz.defineMethod (c$, "getSwtHorizontalOrVerticalConstant", 
function (horizontal) {
if (horizontal) {
return 256;
} else {
return 512;
}}, "~B");
c$.isHorizontal = Clazz.defineMethod (c$, "isHorizontal", 
function (swtSideConstant) {
return !(swtSideConstant == 16384 || swtSideConstant == 131072);
}, "~N");
c$.moveRectangle = Clazz.defineMethod (c$, "moveRectangle", 
function (rect, delta) {
rect.x += delta.x;
rect.y += delta.y;
}, "$wt.graphics.Rectangle,$wt.graphics.Point");
c$.expand = Clazz.defineMethod (c$, "expand", 
function (rect, left, right, top, bottom) {
rect.x -= left;
rect.width = Math.max (0, rect.width + left + right);
rect.y -= top;
rect.height = Math.max (0, rect.height + top + bottom);
}, "$wt.graphics.Rectangle,~N,~N,~N,~N");
c$.normalize = Clazz.defineMethod (c$, "normalize", 
function (rect) {
if (rect.width < 0) {
rect.width = -rect.width;
rect.x -= rect.width;
}if (rect.height < 0) {
rect.height = -rect.height;
rect.y -= rect.height;
}}, "$wt.graphics.Rectangle");
c$.toControl = Clazz.defineMethod (c$, "toControl", 
function (coordinateSystem, toConvert) {
return (coordinateSystem.getDisplay ().map (null, coordinateSystem, toConvert));
}, "$wt.widgets.Control,$wt.graphics.Rectangle");
c$.toDisplay = Clazz.defineMethod (c$, "toDisplay", 
function (coordinateSystem, toConvert) {
return (coordinateSystem.getDisplay ().map (coordinateSystem, null, toConvert));
}, "$wt.widgets.Control,$wt.graphics.Rectangle");
c$.getRelativePosition = Clazz.defineMethod (c$, "getRelativePosition", 
function (boundary, toTest) {
var result = 0;
if (toTest.x < boundary.x) {
result |= 16384;
} else if (toTest.x >= boundary.x + boundary.width) {
result |= 131072;
}if (toTest.y < boundary.y) {
result |= 128;
} else if (toTest.y >= boundary.y + boundary.height) {
result |= 1024;
}return result;
}, "$wt.graphics.Rectangle,$wt.graphics.Point");
c$.getDistanceFrom = Clazz.defineMethod (c$, "getDistanceFrom", 
function (boundary, toTest) {
var side = org.eclipse.jface.util.Geometry.getClosestSide (boundary, toTest);
return org.eclipse.jface.util.Geometry.getDistanceFromEdge (boundary, toTest, side);
}, "$wt.graphics.Rectangle,$wt.graphics.Point");
c$.getClosestSide = Clazz.defineMethod (c$, "getClosestSide", 
function (boundary, toTest) {
var sides = [16384, 131072, 128, 1024];
var closestSide = 16384;
var closestDistance = 2147483647;
for (var idx = 0; idx < sides.length; idx++) {
var side = sides[idx];
var distance = org.eclipse.jface.util.Geometry.getDistanceFromEdge (boundary, toTest, side);
if (distance < closestDistance) {
closestDistance = distance;
closestSide = side;
}}
return closestSide;
}, "$wt.graphics.Rectangle,$wt.graphics.Point");
c$.copy = Clazz.defineMethod (c$, "copy", 
function (toCopy) {
return  new $wt.graphics.Rectangle (toCopy.x, toCopy.y, toCopy.width, toCopy.height);
}, "$wt.graphics.Rectangle");
c$.getSize = Clazz.defineMethod (c$, "getSize", 
function (rectangle) {
return  new $wt.graphics.Point (rectangle.width, rectangle.height);
}, "$wt.graphics.Rectangle");
c$.setSize = Clazz.defineMethod (c$, "setSize", 
function (rectangle, newSize) {
rectangle.width = newSize.x;
rectangle.height = newSize.y;
}, "$wt.graphics.Rectangle,$wt.graphics.Point");
c$.setLocation = Clazz.defineMethod (c$, "setLocation", 
function (rectangle, newSize) {
rectangle.width = newSize.x;
rectangle.height = newSize.y;
}, "$wt.graphics.Rectangle,$wt.graphics.Point");
c$.getLocation = Clazz.defineMethod (c$, "getLocation", 
function (toQuery) {
return  new $wt.graphics.Point (toQuery.x, toQuery.y);
}, "$wt.graphics.Rectangle");
c$.createRectangle = Clazz.defineMethod (c$, "createRectangle", 
function (position, size) {
return  new $wt.graphics.Rectangle (position.x, position.y, size.x, size.y);
}, "$wt.graphics.Point,$wt.graphics.Point");
});
