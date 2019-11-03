Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["$wt.widgets.Layout", "java.util.ArrayList", "$wt.SWT"], "org.eclipse.jface.viewers.TableLayout", ["org.eclipse.jface.util.Assert", "$wt.graphics.Point"], function () {
c$ = Clazz.decorateAsClass (function () {
this.columns = null;
this.firstTime = true;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "TableLayout", $wt.widgets.Layout);
Clazz.prepareFields (c$, function () {
this.columns =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.viewers.TableLayout, []);
});
Clazz.defineMethod (c$, "addColumnData", 
function (data) {
this.columns.add (data);
}, "org.eclipse.jface.viewers.ColumnLayoutData");
Clazz.overrideMethod (c$, "computeSize", 
function (c, wHint, hHint, flush) {
if (wHint != -1 && hHint != -1) return  new $wt.graphics.Point (wHint, hHint);
var table = c;
table.setLayout (null);
var result = table.computeSize (wHint, hHint, flush);
table.setLayout (this);
var width = 0;
var size = this.columns.size ();
for (var i = 0; i < size; ++i) {
var layoutData = this.columns.get (i);
if (Clazz.instanceOf (layoutData, org.eclipse.jface.viewers.ColumnPixelData)) {
var col = layoutData;
width += col.width;
if (col.addTrim) {
width += org.eclipse.jface.viewers.TableLayout.COLUMN_TRIM;
}} else if (Clazz.instanceOf (layoutData, org.eclipse.jface.viewers.ColumnWeightData)) {
var col = layoutData;
width += col.minimumWidth;
} else {
org.eclipse.jface.util.Assert.isTrue (false, "Unknown column layout data");
}}
if (width > result.x) result.x = width;
return result;
}, "$wt.widgets.Composite,~N,~N,~B");
Clazz.overrideMethod (c$, "layout", 
function (c, flush) {
if (!this.firstTime) return ;
var table = c;
var width = table.getClientArea ().width;
if (width <= 1) return ;
var tableColumns = table.getColumns ();
var size = Math.min (this.columns.size (), tableColumns.length);
var widths =  Clazz.newArray (size, 0);
var fixedWidth = 0;
var numberOfWeightColumns = 0;
var totalWeight = 0;
for (var i = 0; i < size; i++) {
var col = this.columns.get (i);
if (Clazz.instanceOf (col, org.eclipse.jface.viewers.ColumnPixelData)) {
var cpd = col;
var pixels = cpd.width;
if (cpd.addTrim) {
pixels += org.eclipse.jface.viewers.TableLayout.COLUMN_TRIM;
}widths[i] = pixels;
fixedWidth += pixels;
} else if (Clazz.instanceOf (col, org.eclipse.jface.viewers.ColumnWeightData)) {
var cw = col;
numberOfWeightColumns++;
var weight = cw.weight;
totalWeight += weight;
} else {
org.eclipse.jface.util.Assert.isTrue (false, "Unknown column layout data");
}}
if (numberOfWeightColumns > 0) {
var rest = width - fixedWidth;
var totalDistributed = 0;
for (var i = 0; i < size; ++i) {
var col = this.columns.get (i);
if (Clazz.instanceOf (col, org.eclipse.jface.viewers.ColumnWeightData)) {
var cw = col;
var weight = cw.weight;
var pixels = totalWeight == 0 ? 0 : Math.floor (weight * rest / totalWeight);
if (pixels < cw.minimumWidth) pixels = cw.minimumWidth;
totalDistributed += pixels;
widths[i] = pixels;
}}
var diff = rest - totalDistributed;
for (var i = 0; diff > 0; ++i) {
if (i == size) i = 0;
var col = this.columns.get (i);
if (Clazz.instanceOf (col, org.eclipse.jface.viewers.ColumnWeightData)) {
++widths[i];
--diff;
}}
}this.firstTime = false;
for (var i = 0; i < size; i++) {
tableColumns[i].setWidth (widths[i]);
}
}, "$wt.widgets.Composite,~B");
c$.COLUMN_TRIM = c$.prototype.COLUMN_TRIM = "carbon".equals ($WT.getPlatform ()) ? 24 : 3;
});
