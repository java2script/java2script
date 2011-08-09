Clazz.declarePackage ("junit.runner");
c$ = Clazz.declareType (junit.runner, "Sorter");
Clazz.declareInterface (junit.runner.Sorter, "Swapper");
c$.sortStrings = Clazz.defineMethod (c$, "sortStrings", 
function (values, left, right, swapper) {
var oleft = left;
var oright = right;
var mid = values.elementAt (Math.floor ((left + right) / 2));
do {
while (((values.elementAt (left))).compareTo (mid) < 0) left++;

while (mid.compareTo ((values.elementAt (right))) < 0) right--;

if (left <= right) {
swapper.swap (values, left, right);
left++;
right--;
}} while (left <= right);
if (oleft < right) junit.runner.Sorter.sortStrings (values, oleft, right, swapper);
if (left < oright) junit.runner.Sorter.sortStrings (values, left, oright, swapper);
}, "java.util.Vector,~N,~N,junit.runner.Sorter.Swapper");
