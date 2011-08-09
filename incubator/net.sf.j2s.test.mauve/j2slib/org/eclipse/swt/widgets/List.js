$_L(["$wt.widgets.Scrollable"],"$wt.widgets.List",["$wt.graphics.Point","$wt.internal.browser.OS","$wt.widgets.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.List", ".list-default {\nposition:absolute;\nleft:0;\ntop:0;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\n}\n.list-border {\nborder:2px inset gray;\n}\n.swt-widgets-list {\nwidth:324px;\n}\n");
 c$ = $_T ($wt.widgets, "List", $wt.widgets.Scrollable);
$_M (c$, "add", 
function (string) {
if (this.handle != null) {
this.handle.options[this.handle.options.length] =  new Option (string, string);
}}, "~S");
$_M(c$,"add",
function(string,index){
if(this.handle!=null){
this.handle.options[index]=new Option(string,string);
}},"~S,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,4,2,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var border=this.getBorderWidth();
width+=border*2+3;
height+=border*2;
if((this.style&512)!=0){
if(wHint==-1){
width-=16;
}else{
width+=16;
}}if((this.style&256)!=0){
height+=16;
}return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("SELECT");
this.handle.size=2;
this.handle.className="list-default";
if((this.style&2048)!=0){
this.handle.className+=" list-border";
}this.handle.multiple=(this.style&2)!=0;
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}});
$_M(c$,"deselect",
function(indices){
if(indices.length==0)return;
},"~A");
$_M(c$,"deselect",
function(index){
if(index==-1)return;
if((this.style&4)!=0){
return;
}},"~N");
$_M(c$,"deselect",
function(start,end){
if(start>end)return;
if((this.style&4)!=0){
return;
}},"~N,~N");
$_M(c$,"deselectAll",
function(){
});
$_M(c$,"getFocusIndex",
function(){
return-1;
});
$_M(c$,"getItem",
function(index){
if(index==-1)return null;
return this.handle.options[index].value;
},"~N");
$_M(c$,"getItemCount",
function(){
return 0;
});
$_M(c$,"getItemHeight",
function(){
return 12;
});
$_M(c$,"getItems",
function(){
var count=this.getItemCount();
var result=new Array(count);
for(var i=0;i<count;i++)result[i]=this.getItem(i);

return result;
});
$_M(c$,"getSelection",
function(){
var indices=this.getSelectionIndices();
var result=new Array(indices.length);
for(var i=0;i<indices.length;i++){
result[i]=this.getItem(indices[i]);
}
return result;
});
$_M(c$,"getSelectionCount",
function(){
if((this.style&4)!=0){
return 1;
}return 1;
});
$_M(c$,"getSelectionIndex",
function(){
return this.handle.selectedIndex;
});
$_M(c$,"getSelectionIndices",
function(){
var idx=this.handle.selectedIndex;
return[idx];
});
$_M(c$,"getTopIndex",
function(){
return 0;
});
$_M(c$,"indexOf",
function(string){
return this.indexOf(string,0);
},"~S");
$_M(c$,"indexOf",
function(string,start){
if(string.length==0){
var count=this.getItemCount();
for(var i=start;i<count;i++){
if(string.equals(this.getItem(i)))return i;
}
return-1;
}return-1;
},"~S,~N");
$_M(c$,"isSelected",
function(index){
return false;
},"~N");
$_M(c$,"remove",
function(indices){
if(indices.length==0)return;
var newIndices=$_A(indices.length,0);
System.arraycopy(indices,0,newIndices,0,indices.length);
this.sort(newIndices);
},"~A");
$_M(c$,"remove",
function(index){
},"~N");
$_M(c$,"remove",
function(start,end){
if(start>end)return;
},"~N,~N");
$_M(c$,"remove",
function(string){
var index=this.indexOf(string,0);
this.remove(index);
},"~S");
$_M(c$,"removeAll",
function(){
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"select",
function(indices){
var length=indices.length;
if(length==0||((this.style&4)!=0&&length>1))return;
this.select(indices,false);
},"~A");
$_M(c$,"select",
function(indices,scroll){
var i=0;
while(i<indices.length){
var index=indices[i];
if(index!=-1){
this.select(index,false);
}i++;
}
if(scroll)this.showSelection();
},"~A,~B");
$_M(c$,"select",
function(index){
this.select(index,false);
},"~N");
$_M(c$,"select",
function(index,scroll){
if(index<0)return;
this.handle.selectedIndex=index;
},"~N,~B");
$_M(c$,"select",
function(start,end){
if(end<0||start>end||((this.style&4)!=0&&start!=end))return;
if((this.style&4)!=0){
this.select(start,false);
}else{
this.select(start,end,false);
}},"~N,~N");
$_M(c$,"select",
function(start,end,scroll){
if(start==end){
this.select(start,scroll);
return;
}if(scroll)this.showSelection();
},"~N,~N,~B");
$_M(c$,"selectAll",
function(){
if((this.style&4)!=0)return;
});
$_M(c$,"setFocusIndex",
function(index){
},"~N");
$_M(c$,"setItem",
function(index,string){
var topIndex=this.getTopIndex();
var isSelected=this.isSelected(index);
this.remove(index);
this.add(string,index);
if(isSelected)this.select(index,false);
this.setTopIndex(topIndex);
},"~N,~S");
$_M(c$,"setItems",
function(items){
O$.clearChildren(this.handle);
for(var i=0;i<items.length;i++){
var it=d$.createElement("OPTION");
it.appendChild(d$.createTextNode(items[i]));
it.value=items[i];
this.handle.appendChild(it);
}
},"~A");
$_M(c$,"setIntSelection",
function(indices){
this.select(indices,true);
if((this.style&2)!=0){
var focusIndex=indices[0];
if(focusIndex>=0)this.setFocusIndex(focusIndex);
}},"~A");
$_M(c$,"setSelection",
function(items){
this.deselectAll();
var length=items.length;
if(length==0||((this.style&4)!=0&&length>1))return;
{
if(typeof items[0]=="number"){
this.setIntSelection(items);
return;
}
}var focusIndex=-1;
for(var i=length-1;i>=0;--i){
var string=items[i];
var index=0;
if(string!=null){
var localFocus=-1;
while((index=this.indexOf(string,index))!=-1){
if(localFocus==-1)localFocus=index;
this.select(index,false);
if((this.style&4)!=0&&this.isSelected(index)){
this.showSelection();
return;
}index++;
}
if(localFocus!=-1)focusIndex=localFocus;
}}
if((this.style&2)!=0){
if(focusIndex>=0)this.setFocusIndex(focusIndex);
}},"~A");
$_M(c$,"setSelection",
function(index){
this.deselectAll();
this.select(index,true);
if((this.style&2)!=0){
if(index>=0)this.setFocusIndex(index);
}},"~N");
$_M(c$,"setSelection",
function(start,end){
this.deselectAll();
if(end<0||start>end||((this.style&4)!=0&&start!=end))return;
if((this.style&4)!=0){
this.select(start,true);
}else{
this.select(start,end,true);
this.setFocusIndex(start);
}},"~N,~N");
$_M(c$,"setTopIndex",
function(index){
},"~N");
$_M(c$,"showSelection",
function(){
});
$_V(c$,"useNativeScrollBar",
function(){
return true;
});
});
