$_L(["$wt.widgets.Composite"],"$wt.widgets.Tree",["$wt.graphics.Point","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Tree", ".tree-default, .tree-default table, .tree-default tr, .tree-default td, .tree-text {\nfont-family:Tahoma, Arial,sans-serif;\nfont-size:8pt;\nmargin:0;\npadding:0;\nbackground-color:white;\n}\n.tree-default {\npadding-left:1px;\n_padding-left:2px;\n_padding-top:1px;\n}\n.tree-content {\npadding:0;\nmargin:0;\nborder-collapse:collapse;\n}\n.tree-v-scroll {\noverflow:scroll;\noverflow-x:hidden;\n}\n.tree-h-scroll {\noverflow:scroll;\noverflow-y:hidden;\n}\n.tree-default thead td {\noverflow:hidden;\npadding:0 !important;\n}\nthead .tree-head-text {\nbackground-color:buttonface;\nborder-style:solid;\nborder-width:1px 2px 2px 1px;\nborder-color:#666 white white #666;\nborder-color:white #666 #666 white;\ncursor:default;\npadding:1px 2px;\nwhite-space:nowrap;\n}\n.tree-column-last .tree-head-text {\nborder-width:1px 0 2px 1px;\n}\n.tree-default tbody td {\ncursor:default;\nwhite-space:nowrap;\n}\n.tree-grid-line tbody td {\nborder-style:solid;\nborder-color:menu;\nborder-width:1px 1px 0 0;\n}\n.tree-column-last {\nwidth:16px;\npadding-right:2px;\nbackground-color:white\n}\n.tree-grid-line tbody .tree-column-last {\nborder-width:1px 0 0 0;\n}\n.tree-grid-line .tree-row-first td {\n}\n.tree-full-selection tr.tree-item-selected td {\nbackground-color:ActiveCaption;\ncolor:highlighttext;\nmin-height:1px;\n}\n.tree-blur .tree-full-selection tr.tree-item-selected td {\nbackground-color:gray;\n}\n/*\n.tree-full-selection tr.tree-item-selected td.tree-column-first {\ncolor:black;\nbackground-color:white;\n}\n*/\n.tree-full-selection tr.tree-item-selected td.tree-column-last {\ncolor:black;\nbackground-color:white;\n}\n.tree-line {\nposition:relative;\nmargin:0;\npadding:0;\nheight:1.39em;\nline-height:1.39em;\noverflow:hidden;\n}\n.tree-line-wrapper {\nposition:relative;\nwidth:1024px;\nwhite-space:nowrap;\nmargin:0;\npadding:0;\nheight:100%;\nline-height:100%;\noverflow:hidden;\n}\n.tree-check-box {\nmargin:0;\npadding:0;\nposition:absolute;\ndisplay:none;\nleft:-14px !important;\nmin-height:13px;\n_height:1em;\nwidth:13px;\n_width:14px;\n}\n.tree-check .tree-check-box {\ndisplay:block;\n}\n@media all and (min-width:0px){/* opera */\n.tree-check-box {\ntop:50%;\nmargin-top:-8px;\nleft:-16px !important;\n}\n}\n.tree-text {\nmin-height:16px;\nheight:1.39em;\nline-height:1.39em;\nmargin-left:2px;\nleft:-1px;\n_left:-3px;\nwhite-space:nowrap;\nfloat:left;\npadding-bottom:1px;\nposition:relative;\n}\n/*\nposition:relative;\n*/\n.tree-text-rtl {\nfloat:right;\nmargin-left:auto;\nmargin-right:2px;\n}\n/*\nright:0px !important;\n*/\ntree-image-icon {\n_padding-bottom:2px;\n_height:16px;\ndisplay:none;\n}\ntree-image tree-image-icon {\ndisplay:block;\n}\n.tree-image .tree-text {\npadding-left:18px;\n}\n.tree-check .tree-text {\nmargin-left:16px;\n}\n.tree-column-first {\ncolor:black;\nbackground-color:white;\nwhite-space:nowrap;\nheight:1em;\noverflow:hidden;\n}\n.tree-text-inner {\n/*padding:2px 3px 1px 2px;*/\nmin-height:14px;\n_height:14px;\n_width:1px;\noverflow-x:visible;\nwhite-space:nowrap;\npadding:0 3px 2px 2px;\n}\n.tree-grid-line tbody .tree-text-inner {\npadding-top:1px;\npadding-right:2px;\n}\n.tree-column-last .tree-text-inner {\nwidth:1px;\nheight:1px;\n}\n.tree-no-columns .tree-column-last {\nwidth:1px;\noverflow-x:hidden;\npadding-left:0;\npadding-right:0;\nmargin-left:0;\nmargin-right:0;\nborder-left:0 none transparent;\nborder-right:0 none transparent;\n}\n.tree-item-selected .tree-column-first .tree-text-inner {\nbackground:ActiveCaption !important;\ncolor:highlighttext;\nmin-height:1px;\n}\n.tree-blur .tree-item-selected .tree-column-first .tree-text-inner {\nbackground-color:gray;\n}\n.tree-item-selected .tree-column-first .tree-text {\nbackground-color:ActiveCaption !important;\n}\n.tree-default {\noverflow:hidden;\nposition:absolute;\nbackground-color:white;\n}\n.tree-default td {\noverflow:hidden;\n}\n.tree-item-default {\ncursor:default;\nwhite-space:nowrap;\nfont-size:9pt;\nfont-family:Arial,sans-serif;\n}\n.tree-column-resize {\ntop:1px;\nposition:absolute;\ncursor:e-resize;\nwidth:3px;\nfont-size:0;\nz-index:100;\nfloat:right;\n}\n.tree-item-focus {\nbackground-color:#E8F2FE;\n}\n.tree-anchor {\nposition:relative;\nfloat:left;\ntop:0;\nleft:0;\nright:0;\nmargin-left:3px;\nwidth:16px;\nmin-height:16px;\nheight:1.39em;\nline-height:1.39em;\noverflow:hidden;\n}\n* html .tree-anchor {\nmargin-left:1px;\n}\n.tree-anchor-rtl {\nfloat:right;\nleft:auto;\nright:0px;\n}\n.tree-anchor-v {\nposition:absolute;\ntop:0;\nleft:5px;\nwidth:1px;\nheight:100%;\nfont-size:0;\n/*\nborder-left:1px dotted #777;\n}\n* html .tree-anchor-v {\n*/\n/*border-left:0 none transparent;*/\nwidth:16px;\nleft:0;\nright:0;\nbackground-repeat:repeat-y;\nbackground-position:-64px -16px;\nbackground-image:url(\'images/packed.gif\');\n}\n.tree-anchor-rtl .tree-anchor-v{\nright:5px;\nleft:auto;\n}\n.tree-anchor-single .tree-anchor-v {\nbackground-image:none;\n}\n.tree-anchor-begin .tree-anchor-v {\nheight:50%;\ntop:50%;\n}\n.tree-anchor-end .tree-anchor-v {\nheight:50%;\n}\n.tree-anchor-h {\nposition:absolute;\nleft:0;\nright:0;\ntop:50%;\nmargin-top:-8px;\nwidth:15px;\nmargin-right:1px;\nfont-size:0;\nheight:16px;\nbackground-repeat:no-repeat;\n}\n.tree-anchor-rtl .tree-anchor-h{\nleft:auto;\nright:0;\n}\n.tree-image .tree-anchor-h {\nwidth:16px;\nmargin-right:0;\n}\n.tree-anchor-minus {\nbackground-position:-48px 0px;\nbackground-image:url(\'images/packed.gif\');\n}\n.tree-anchor-plus {\nbackground-position:-48px -16px;\nbackground-image:url(\'images/packed.gif\');\n}\n.tree-anchor-line {\nbackground-position:-48px -32px;\nbackground-image:url(\'images/packed.gif\');\n}\n.tree-grid-line .tree-anchor-v {\nbackground-image:none;\n}\n.tree-grid-line .tree-anchor-minus {\nbackground-position:right top;\n}\n.tree-grid-line .tree-anchor-plus {\nbackground-position:right center;\n}\n.tree-grid-line .tree-anchor-line {\nbackground-position:right bottom;\n}\n/*\n* Common image position from Composite.css\n*/\n.image-p-4, .image-p-5 {\nposition:absolute;\n/*top:50%;\nmargin-top:-0.5em;\n*/\nbottom:50%;\nmargin-bottom:-0.5em;\n}\n.image-p-4 {\nleft:0;\n}\n.image-p-5 {\nleft:50%;\nmargin-left:-0.5em;\n}\n@media all and (-webkit-min-device-pixel-ratio:0){/* safari only */\n.image-p-4, .image-p-5 {\nmargin-bottom:-0.48em;\n}\n}\n*:first-child+html .image-p-4, *:first-child+html .image-p-5 { /* IE7 */\nmargin-bottom:-0.4em;\n}\n* html .image-p-4, * html .image-p-5 { /* IE6 */\nmargin-bottom:-0.4em;\n}\n/* default icon size 16x16 */\n.image-n-4, .image-n-5 {\nwidth:16px;\nheight:16px;\nfont-size:16px;\n_font-size:14px;\noverflow:hidden;\n}\n.swt-widgets-tree {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.items = null;
this.columns = null;
this.imageList = null;
this.dragStarted = false;
this.gestureCompleted = false;
this.insertAfter = false;
this.ignoreSelect = false;
this.ignoreExpand = false;
this.ignoreDeselect = false;
this.ignoreResize = false;
this.lockSelection = false;
this.oldSelected = false;
this.newSelected = false;
this.linesVisible = false;
this.customDraw = false;
this.printClient = false;
this.selections = null;
this.lastSelection = null;
this.directChildrens = null;
this.headerVisible = false;
this.lineVisible = false;
this.focusIndex = -1;
this.focusItem = null;
this.tableHandle = null;
this.theadHandle = null;
this.tbody = null;
this.hTreeKeyDown = null;
$_Z (this, arguments);
}, $wt.widgets, "Tree", $wt.widgets.Composite);
c$.checkStyle = $_M (c$, "checkStyle", 
function (style) {
style |= 768;
return $wt.widgets.Widget.checkBits (style, 4, 2, 0, 0, 0, 0);
}, "~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"addTreeListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(17,typedListener);
this.addListener(18,typedListener);
},"$wt.events.TreeListener");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
if(this.items.length==0&&this.columns.length==0&&!this.headerVisible){
}else if(this.columns.length==0&&!this.headerVisible){
width=23;
height=2;
height+=14*this.items.length+2*(this.items.length-1);
height+=(this.getHeaderVisible()?14:0);
var maxWidth=1;
for(var i=0;i<this.items.length;i++){
var text=this.items[i].getText();
if(text!=null){
maxWidth=Math.max(1+O$.getStringPlainWidth(text),maxWidth);
}}
width+=maxWidth-1;
}else{
width=0;
for(var i=0;i<this.columns.length;i++){
var colWidth=this.columns[i].getWidth();
width+=colWidth;
}
height=2;
height+=14*this.items.length+2*(this.items.length-1);
height+=(this.getHeaderVisible()?17:0);
}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var border=this.getBorderWidth();
width+=border*2;
height+=border*2;
if((this.style&512)!=0){
width+=16;
}if((this.style&256)!=0){
height+=16;
}return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
this.selections=new Array(0);
this.items=new Array(0);
$_U(this,$wt.widgets.Tree,"createHandle",[]);
this.state&=-3;
this.handle.className+=" tree-default";
if((this.style&512)!=0&&(this.style&256)!=0){
this.handle.style.overflow="auto";
}else{
if((this.style&512)!=0){
this.handle.className+=" tree-v-scroll";
}else if((this.style&256)!=0){
this.handle.className+=" tree-h-scroll";
}}this.tableHandle=d$.createElement("TABLE");
var cssTable="tree-content tree-no-columns";
if((this.style&65536)!=0){
cssTable+=" tree-full-selection";
}if((this.style&32)!=0){
cssTable+=" tree-check";
}this.tableHandle.className=cssTable;
this.handle.appendChild(this.tableHandle);
this.hTreeKeyDown=$_Q((($_D("$wt.widgets.Tree$1")?0:org.eclipse.swt.widgets.Tree.$Tree$1$()),$_N($wt.widgets.Tree$1,this,null)));
Clazz.addEvent(this.handle,"keydown",this.hTreeKeyDown);
});
$_M(c$,"setFocusIndex",
function(index){
if(index<0)return;
if(index==this.focusIndex){
return;
}var item=this.getItem(index);
if(item==null){
return;
}if(this.focusItem!=null){
O$.removeCSSClass(this.focusItem.handle,"tree-item-focus");
}this.focusItem=item;
this.focusIndex=index;
O$.addCSSClass(item.handle,"tree-item-focus");
},"~N");
$_M(c$,"createItem",
function(column,index){
if(this.columns==null){
this.columns=new Array(0);
}if(this.handle==null){
return;
}var table=this.handle.childNodes[0];
O$.removeCSSClass(this.handle,"tree-no-columns");
this.theadHandle=null;
for(var i=0;i<table.childNodes.length;i++){
if("THEAD".equals(table.childNodes[i].nodeName)){
this.theadHandle=table.childNodes[i];
break;
}}
if(this.theadHandle==null){
this.theadHandle=d$.createElement("THEAD");
table.appendChild(this.theadHandle);
}var theadTR=null;
if(this.theadHandle.childNodes!=null&&this.theadHandle.childNodes.length!=0){
for(var i=0;i<this.theadHandle.childNodes.length;i++){
if(this.theadHandle.childNodes[i]!=null&&"TR".equals(this.theadHandle.childNodes[i].nodeName)){
theadTR=this.theadHandle.childNodes[i];
}}
}if(theadTR==null){
theadTR=d$.createElement("TR");
this.theadHandle.appendChild(theadTR);
var theadTD=d$.createElement("TD");
theadTD.className="tree-column-last";
theadTR.appendChild(theadTD);
this.createCSSElement(theadTD,"tree-head-text").appendChild(d$.createTextNode("\u00a0"));
}var theadTD=d$.createElement("TD");
theadTR.insertBefore(theadTD,theadTR.childNodes[theadTR.childNodes.length-1]);
this.createCSSElement(theadTD,"tree-head-text").appendChild(d$.createTextNode("\u00a0"));
if(index<0||index>=theadTR.childNodes.length){
theadTR.appendChild(theadTD);
this.columns[index]=column;
}else{
theadTR.insertBefore(theadTD,theadTR.childNodes[index]);
for(var i=this.columns.length;i>index;i--){
this.columns[i]=this.columns[i-1];
}
this.columns[index]=column;
for(var i=0;i<this.items.length;i++){
}
}column.handle=theadTD;
},"$wt.widgets.TreeColumn,~N");
$_M(c$,"createCSSElement",
($fz=function(parent,css){
var div=d$.createElement("DIV");
div.className=css;
if(parent!=null){
(parent).appendChild(div);
}return div;
},$fz.isPrivate=true,$fz),"~O,~S");
$_M(c$,"createItem",
function(item,hParent,index){
if(this.items==null){
this.items=new Array(0);
}var itemList=(hParent==null?this.directChildrens:item.parentItem.items);
var idx=-1;
if(index<0||index>=itemList.length){
if(hParent==null){
idx=this.items.length;
}else{
if(itemList.length==0){
idx=item.parentItem.index+1;
}else{
idx=this.findSiblingNextItem(item.parentItem.index);
if(idx!=-1){
}else{
idx=this.items.length;
}}}index=itemList.length;
itemList[index]=item;
}else{
idx=this.findSiblingNextItem(itemList[index].index);
if(idx!=-1){
}else{
idx=this.items.length;
}for(var i=itemList.length;i>index;i--){
itemList[i]=itemList[i-1];
}
itemList[index]=item;
}for(var i=this.items.length-1;i>=idx;i--){
this.items[i+1]=this.items[i];
this.items[i+1].index=i+1;
}
this.items[idx]=item;
item.index=idx;
var table=this.handle.childNodes[0];
if(this.tbody==null){
this.tbody=d$.createElement("TBODY");
table.appendChild(this.tbody);
}var tbodyTR=d$.createElement("TR");
item.handle=tbodyTR;
if(idx==0){
tbodyTR.className="tree-row-first";
if(this.tbody.childNodes.length!=0){
this.tbody.childNodes[0].className="";
}}if(idx>=this.tbody.childNodes.length||this.tbody.childNodes[idx]==null){
this.tbody.appendChild(tbodyTR);
}else{
this.tbody.insertBefore(tbodyTR,this.tbody.childNodes[idx]);
}var td=d$.createElement("TD");
td.className="tree-column-first";
tbodyTR.appendChild(td);
var treeLine=this.createCSSElement(td,"tree-line");
if(O$.isIE&&this.columns!=null&&this.columns[0]!=null&&this.columns[0].cachedWidth!=0){
treeLine.style.width=this.columns[0].cachedWidth+"px";
}var lineWrapper=this.createCSSElement(treeLine,"tree-line-wrapper");
var chains=new Array(0);
chains[0]=item;
var parentItem=item.getParentItem();
while(parentItem!=null){
chains[chains.length]=parentItem;
parentItem=parentItem.getParentItem();
}
item.depth=chains.length;
var lastItem=null;
for(var i=chains.length-1;i>=0;i--){
var currentItem=chains[i];
var cssClass="tree-anchor";
if((this.style&67108864)!=0){
cssClass+=" tree-anchor-rtl";
}var listItems=(lastItem==null?this.directChildrens:lastItem.items);
if(listItems.length>1){
var j=0;
var isNoBreak=true;
for(;j<listItems.length;j++){
if(listItems[j]===currentItem){
isNoBreak=false;
break;
}}
if(isNoBreak){
}if(j==listItems.length-1){
if(i==0){
cssClass+=" tree-anchor-end";
}else{
cssClass+=" tree-anchor-single";
}}else if(j==0){
if(i==0){
cssClass+=" tree-anchor-begin";
}else if(listItems.length==1){
cssClass+=" tree-anchor-single";
}else{
cssClass+=" tree-anchor-middle";
}}else{
cssClass+=" tree-anchor-middle";
}}else if(hParent!=null&&i==0){
cssClass+=" tree-anchor-end";
}else{
cssClass+=" tree-anchor-single";
}var anchor=this.createCSSElement(lineWrapper,cssClass);
if(O$.isIE&&(this.style&67108864)!=0){
anchor.style.position="static";
}this.createCSSElement(anchor,"tree-anchor-v");
cssClass="tree-anchor-h";
if(i==0){
if(currentItem.items==null||currentItem.items.length==0){
cssClass+=" tree-anchor-line";
}else{
cssClass+=" tree-anchor-plus";
}}this.createCSSElement(anchor,cssClass);
lastItem=currentItem;
}
var textEl=this.createCSSElement(lineWrapper,"tree-text");
if((this.style&67108864)!=0)textEl.className+=" tree-text-rtl";
if((this.style&32)!=0){
var input=d$.createElement("INPUT");
input.type="checkbox";
input.className="tree-check-box image-p-4";
textEl.appendChild(input);
item.checkElement=input;
}this.createCSSElement(textEl,"tree-text-inner");
var length=Math.max(1,this.columns.length);
for(var i=1;i<length;i++){
td=d$.createElement("TD");
this.createCSSElement(td,"tree-text-inner");
tbodyTR.appendChild(td);
}
td=d$.createElement("TD");
td.className="tree-column-last";
this.createCSSElement(td,"tree-text-inner");
tbodyTR.appendChild(td);
if(item.parentItem!=null){
}var elIndex=chains.length-1;
if(index==itemList.length-1){
var prevIndex=0;
if(itemList.length==1){
prevIndex=(hParent==null?0:item.parentItem.index+1);
}else{
prevIndex=itemList[index-1].index;
}for(var k=prevIndex;k<item.index;k++){
var ti=this.items[k];
var anchor=ti.handle.childNodes[0].childNodes[0].childNodes[0].childNodes[elIndex];
var cssClass="tree-anchor";
if((this.style&67108864)!=0){
cssClass+=" tree-anchor-rtl";
}if(ti.parentItem===item.parentItem){
var i=0;
for(i=0;i<itemList.length;i++){
if(ti===itemList[i]){
break;
}}
if(i==0){
if(ti.parentItem==null){
cssClass+=" tree-anchor-begin";
}else if(itemList.length>1){
cssClass+=" tree-anchor-middle";
}else{
cssClass+=" tree-anchor-end";
}}else if(i==itemList.length-1){
cssClass+=" tree-anchor-end";
}else{
cssClass+=" tree-anchor-middle";
}}else{
cssClass+=" tree-anchor-middle";
}anchor.className=cssClass;
}
if(itemList.length==1&&hParent!=null){
var parentInnerChildren=item.parentItem.handle.childNodes[0].childNodes[0].childNodes[0].childNodes;
var anchorV=parentInnerChildren[elIndex-1];
anchorV.childNodes[1].className=item.parentItem.expandStatus?"tree-anchor-h tree-anchor-minus":"tree-anchor-h tree-anchor-plus";
}}var visible=true;
while(item.parentItem!=null&&(visible=item.parentItem.getExpanded())){
item=item.parentItem;
}
if(!visible){
tbodyTR.style.display="none";
}},"$wt.widgets.TreeItem,~O,~N");
$_M(c$,"toggleSelection",
function(item,isCtrlKeyHold,isShiftKeyHold){
if(item==null){
return false;
}if((this.style&2)!=0&&(isCtrlKeyHold||isShiftKeyHold)){
if(isCtrlKeyHold){
for(var i=0;i<this.selections.length;i++){
if(item===this.selections[i]){
var newSelections=new Array(this.selections.length);
for(var j=0;j<i;j++){
newSelections[j]=this.selections[j];
}
for(var j=i;j<this.selections.length-1;j++){
newSelections[j]=this.selections[j+1];
}
this.selections=newSelections;
item.showSelection(false);
this.lastSelection=item;
return false;
}}
this.selections[this.selections.length]=item;
this.lastSelection=item;
item.showSelection(true);
}else{
for(var i=0;i<this.selections.length;i++){
if(this.selections[i]!=null){
this.selections[i].showSelection(false);
}}
if(this.lastSelection!=null){
var idx1=Math.min(this.lastSelection.index,item.index);
var idx2=Math.max(this.lastSelection.index,item.index);
this.selections=new Array(0);
for(var i=idx1;i<=idx2;i++){
var ti=this.items[i];
if(ti.handle.style.display!=="none"){
this.selections[this.selections.length]=ti;
ti.showSelection(true);
}}
return true;
}else{
if(this.selections.length!=1){
this.selections=new Array(1);
}this.selections[0]=item;
}}}else{
item.showSelection(true);
for(var i=0;i<this.selections.length;i++){
if(this.selections[i]!=null&&this.selections[i]!==item){
this.selections[i].showSelection(false);
}}
if(this.selections.length!=1){
this.selections=new Array(1);
}this.selections[0]=item;
}this.lastSelection=item;
return true;
},"$wt.widgets.TreeItem,~B,~B");
$_M(c$,"skipItems",
function(index){
var parentItem=this.items[index];
index++;
while(this.items[index]!=null){
var item=this.items[index];
if(item.parentItem!==parentItem){
if(item.parentItem===this.items[index-1]){
index=this.skipItems(index-1);
if(index==-1){
return-1;
}var ti=this.items[index];
var outOfHierarchies=true;
while(ti!=null){
ti=ti.parentItem;
if(ti===parentItem){
outOfHierarchies=false;
break;
}}
if(outOfHierarchies){
return index;
}}else{
return index;
}}index++;
}
return-1;
},"~N");
$_M(c$,"createParent",
function(){
this.forceResize();
this.register();
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Tree,"createWidget",[]);
this.items=new Array(0);
this.columns=new Array(0);
this.directChildrens=new Array(0);
});
$_M(c$,"deselectAll",
function(){
for(var i=0;i<this.selections.length;i++){
this.selections[i].showSelection(false);
}
});
$_M(c$,"destroyItem",
function(column){
},"$wt.widgets.TreeColumn");
$_M(c$,"destroyItem",
function(item){
var length=this.selections.length;
var index=-1;
for(var i=0;i<length;i++){
if(this.selections[i].equals(item)){
index=i;
break;
}}
if(index!=-1){
var oldSelection=this.selections;
this.selections=new Array(length-1);
System.arraycopy(oldSelection,0,this.selections,0,index);
System.arraycopy(oldSelection,index+1,this.selections,index,length-index-1);
}var found=false;
length=this.items.length;
for(var i=0;i<length;i++){
if(found){
this.items[i-1]=this.items[i];
this.items[i-1].index=i-1;
}if(this.items[i].equals(item)){
found=true;
}}
{
this.items.length=length-1;
}this.updateScrollBar();
},"$wt.widgets.TreeItem");
$_M(c$,"findItem",
function(id){
return null;
},"~N");
$_M(c$,"getGridLineWidth",
function(){
return 1;
});
$_M(c$,"getHeaderHeight",
function(){
return 16;
});
$_M(c$,"getHeaderVisible",
function(){
return this.headerVisible;
});
$_M(c$,"getImageSize",
function(){
if(this.imageList!=null)return this.imageList.getImageSize();
return new $wt.graphics.Point(0,this.getItemHeight());
});
$_M(c$,"getColumn",
function(index){
return this.columns[index];
},"~N");
$_M(c$,"getColumnCount",
function(){
return this.columns.length;
});
$_M(c$,"getColumns",
function(){
return this.columns;
});
$_M(c$,"getDescendantItems",
function(index){
var nextSiblingIdx=this.findNextSiblingItem(index);
if(nextSiblingIdx==-1){
nextSiblingIdx=this.items.length;
}var children=new Array(nextSiblingIdx-index-1);
for(var i=index+1;i<nextSiblingIdx;i++){
children[i-index-1]=this.items[i];
}
return children;
},"~N");
$_M(c$,"findItem",
function(parentIndex,index){
if(parentIndex<0){
for(var i=0;i<this.items.length;i++){
if(this.items[i].parentItem==null){
if(index==0){
return i;
}index--;
}}
return-1;
}var parentItem=this.items[parentIndex];
parentIndex++;
while(this.items[parentIndex]!=null){
var item=this.items[parentIndex];
if(item.parentItem!==parentItem){
if(item.parentItem===this.items[parentIndex-1]){
parentIndex=this.skipItems(parentIndex-1);
if(parentIndex==-1){
return-1;
}}else{
return-1;
}}else{
if(index==0){
return parentIndex;
}index--;
}parentIndex++;
}
return-1;
},"~N,~N");
$_M(c$,"findNextSiblingItem",
function(parentIndex){
if(parentIndex<0){
parentIndex=0;
}var parentItem=this.items[parentIndex];
parentIndex++;
if(this.items[parentIndex]!=null){
var item=this.items[parentIndex];
if(item.parentItem!==parentItem.parentItem){
if(item.parentItem===this.items[parentIndex-1]){
parentIndex=this.skipItems(parentIndex-1);
if(parentIndex==-1){
return-1;
}var ti=this.items[parentIndex];
var outOfHierarchies=true;
while(ti!=null){
ti=ti.parentItem;
if(ti===parentItem){
outOfHierarchies=false;
break;
}}
if(outOfHierarchies){
return parentIndex;
}}else{
return-1;
}}else{
return parentIndex;
}}return-1;
},"~N");
$_M(c$,"findSiblingNextItem",
function(parentIndex){
if(parentIndex<0){
parentIndex=0;
}var parentItem=this.items[parentIndex];
parentIndex++;
if(this.items[parentIndex]!=null){
var item=this.items[parentIndex];
if(item.parentItem!==parentItem.parentItem){
if(item.parentItem===this.items[parentIndex-1]){
parentIndex=this.skipItems(parentIndex-1);
if(parentIndex==-1){
return-1;
}var ti=this.items[parentIndex];
var outOfHierarchies=true;
while(ti!=null){
ti=ti.parentItem;
if(ti===parentItem){
outOfHierarchies=false;
break;
}}
if(outOfHierarchies){
return parentIndex;
}}else{
return parentIndex;
}}else{
return parentIndex;
}}return-1;
},"~N");
$_M(c$,"indexOf",
function(parentIndex,ti){
var index=0;
if(parentIndex<0){
if(ti.parentItem!=null){
return-1;
}for(var i=0;i<this.items.length;i++){
if(this.items[i]===ti){
return index;
}else if(this.items[i].parentItem==null){
index++;
}}
return-1;
}var parentItem=this.items[parentIndex];
parentIndex++;
while(this.items[parentIndex]!=null){
var item=this.items[parentIndex];
if(item.parentItem!==parentItem){
if(item.parentItem===this.items[parentIndex-1]){
parentIndex=this.skipItems(parentIndex-1);
if(parentIndex==-1){
return-1;
}if(this.items[parentIndex].parentItem===parentItem.parentItem){
return-1;
}else{
if(this.items[parentIndex]===ti){
return index;
}index++;
}}else{
return-1;
}}else{
if(item===ti){
return index;
}index++;
}parentIndex++;
}
return-1;
},"~N,$wt.widgets.TreeItem");
$_M(c$,"getItem",
function(index){
return this.getItems()[index];
},"~N");
$_M(c$,"getItem",
function(point){
return null;
},"$wt.graphics.Point");
$_M(c$,"getItemCount",
function(){
return this.getItems().length;
});
$_M(c$,"getItemCount",
function(hItem){
return this.items.length;
},"~N");
$_M(c$,"getItemHeight",
function(){
return 16;
});
$_M(c$,"getItems",
function(){
var copiedItems=new Array(0);
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&this.items[i].parentItem==null){
copiedItems[copiedItems.length]=this.items[i];
}}
return copiedItems;
});
$_M(c$,"getItems",
function(hTreeItem){
var children=new Array(0);
if(hTreeItem<0){
hTreeItem=0;
}var parentItem=this.items[hTreeItem];
hTreeItem++;
while(this.items[hTreeItem]!=null){
var item=this.items[hTreeItem];
if(item.parentItem!==parentItem){
if(item.parentItem===this.items[hTreeItem-1]){
hTreeItem=this.skipItems(hTreeItem-1);
if(hTreeItem==-1){
return children;
}if(this.items[hTreeItem].parentItem===parentItem.parentItem){
return children;
}else{
children[children.length]=this.items[hTreeItem];
}}else{
return children;
}}else{
children[children.length]=item;
}hTreeItem++;
}
return children;
},"~N");
$_M(c$,"getLinesVisible",
function(){
return this.linesVisible;
});
$_M(c$,"getParentItem",
function(){
return null;
});
$_M(c$,"getSelection",
function(){
return this.selections;
});
$_M(c$,"getSelectionCount",
function(){
return this.selections.length;
});
$_M(c$,"getTopItem",
function(){
return this.items[0];
});
$_M(c$,"indexOf",
function(column){
var count=this.columns.length;
for(var i=0;i<count;i++){
if(this.columns[i]===column)return i;
}
return-1;
},"$wt.widgets.TreeColumn");
$_M(c$,"indexOf",
function(item){
for(var i=0;i<this.items.length;i++){
if(this.items[i]===item){
return i;
}}
return-1;
},"$wt.widgets.TreeItem");
$_M(c$,"releaseHandle",
function(){
if(this.hTreeKeyDown!=null){
Clazz.removeEvent(this.handle,"keydown",this.hTreeKeyDown);
this.hTreeKeyDown=null;
}if(this.theadHandle!=null){
O$.deepClearChildren(this.theadHandle);
O$.destroyHandle(this.theadHandle);
this.theadHandle=null;
}if(this.tbody!=null){
O$.deepClearChildren(this.tbody);
O$.destroyHandle(this.tbody);
this.tbody=null;
}if(this.tableHandle!=null){
O$.deepClearChildren(this.tableHandle);
O$.destroyHandle(this.tableHandle);
this.tableHandle=null;
}this.focusItem=null;
this.lastSelection=null;
this.directChildrens=null;
this.selections=null;
$_U(this,$wt.widgets.Tree,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
var columnCount=this.columns.length;
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed()){
item.releaseResources();
}}
this.items=null;
for(var i=0;i<columnCount;i++){
var column=this.columns[i];
if(!column.isDisposed())column.releaseResources();
}
this.columns=null;
$_U(this,$wt.widgets.Tree,"releaseWidget",[]);
});
$_M(c$,"removeAll",
function(){
this.ignoreDeselect=this.ignoreSelect=true;
var items=this.getItems();
var length=items.length;
for(var i=0;i<length;i++){
items[i].dispose();
}
this.items=new Array(0);
this.updateScrollBar();
});
$_M(c$,"removeSelectionListener",
function(listener){
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeTreeListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(17,listener);
this.eventTable.unhook(18,listener);
},"$wt.events.TreeListener");
$_M(c$,"setInsertMark",
function(item,before){
},"$wt.widgets.TreeItem,~B");
$_M(c$,"setLinesVisible",
function(show){
if(this.linesVisible==show)return;
this.linesVisible=show;
},"~B");
$_M(c$,"selectAll",
function(){
if((this.style&4)!=0)return;
});
$_M(c$,"setCheckboxImageList",
function(){
if((this.style&32)==0)return;
});
$_M(c$,"setHeaderVisible",
function(show){
this.headerVisible=show;
if(this.theadHandle!=null){
this.theadHandle.style.display=(show?"":"none");
}var table=this.handle.childNodes[0];
O$.updateCSSClass(table,"tree-no-columns",!show||this.columns==null||this.columns.length==0);
this.setScrollWidth();
this.updateScrollBar();
},"~B");
$_V(c$,"setRedraw",
function(redraw){
},"~B");
$_M(c$,"setScrollWidth",
function(){
});
$_M(c$,"setSelection",
function(item){
this.setSelection([item]);
},"$wt.widgets.TreeItem");
$_M(c$,"setSelection",
function(items){
var length=items.length;
if(length==0||((this.style&4)!=0&&length>1)){
this.deselectAll();
return;
}this.selections=items;
for(var i=0;i<items.length;i++){
items[i].showSelection(true);
}
},"~A");
$_M(c$,"setTopItem",
function(item){
this.updateScrollBar();
},"$wt.widgets.TreeItem");
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if(O$.isIE&&(this.columns==null||this.columns[0]==null||this.columns[0].cachedWidth<=0)){
var cachedWidth=cx-8;
if(this.columns==null||this.columns[0]==null){
}else if(this.columns[0].cachedWidth==0){
var w=cx-10;
var count=1;
for(var i=1;i<this.columns.length;i++){
if(this.columns[i]!=null&&this.columns[i].cachedWidth>0){
w-=this.columns[i].cachedWidth;
}else{
count++;
}}
cachedWidth=Math.floor(w/count);
}for(var i=0;i<this.items.length;i++){
this.items[i].handle.childNodes[0].childNodes[0].style.width=cachedWidth+"px";
}
}return $_U(this,$wt.widgets.Tree,"SetWindowPos",[hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags]);
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"showItem",
function(hItem){
this.updateScrollBar();
},"Element");
$_M(c$,"showColumn",
function(column){
if(column.parent!==this)return;
var index=this.indexOf(column);
if(index==-1)return;
},"$wt.widgets.TreeColumn");
$_M(c$,"showItem",
function(item){
this.showItem(item.handle);
},"$wt.widgets.TreeItem");
$_M(c$,"showSelection",
function(){
});
$_M(c$,"updateScrollBar",
function(){
});
$_V(c$,"useNativeScrollBar",
function(){
return true;
});
c$.$Tree$1$=function(){
$_H();
c$=$_W($wt.widgets,"Tree$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=this.getEvent();
var index=this.b$["$wt.widgets.Tree"].focusIndex;
switch(evt.keyCode){
case 13:
var item=this.b$["$wt.widgets.Tree"].getItem(index);
if(item==null)return;
this.b$["$wt.widgets.Tree"].toggleSelection(item,evt.ctrlKey,evt.shiftKey);
if(item.isSelected()){
var e=new $wt.widgets.Event();
e.display=this.b$["$wt.widgets.Tree"].display;
e.type=14;
e.detail=0;
e.item=item;
e.widget=item;
this.b$["$wt.widgets.Tree"].sendEvent(e);
this.toReturn(false);
}break;
case 32:
var item2=this.b$["$wt.widgets.Tree"].getItem(index);
if(item2==null)return;
this.b$["$wt.widgets.Tree"].toggleSelection(item2,evt.ctrlKey,evt.shiftKey);
if(item2.isSelected()){
var eDefault=new $wt.widgets.Event();
eDefault.display=this.b$["$wt.widgets.Tree"].display;
eDefault.type=13;
eDefault.detail=0;
eDefault.item=item2;
eDefault.widget=item2;
this.b$["$wt.widgets.Tree"].sendEvent(eDefault);
this.toReturn(false);
}break;
case 38:
if(index>0){
this.b$["$wt.widgets.Tree"].setFocusIndex(index-1);
this.toReturn(false);
}break;
case 40:
if(index<this.b$["$wt.widgets.Tree"].getItemCount()-1){
this.b$["$wt.widgets.Tree"].setFocusIndex(index+1);
this.toReturn(false);
}break;
default:
this.toReturn(true);
}
});
c$=$_P();
};
$_S(c$,
"INSET",3,
"GRID_WIDTH",1,
"HEADER_MARGIN",10);
});
