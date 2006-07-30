$_L(["$wt.widgets.Composite"],"$wt.widgets.Group",["java.lang.Character","$wt.graphics.Rectangle","$wt.internal.browser.OS","$wt.widgets.Control"],function(){
c$=$_C(function(){
this.groupText=null;
this.textWidth=0;
this.textHeight=0;
this.borderFrame=null;
this.titleLine=null;
this.leftCorner=null;
this.titleText=null;
this.rightCorner=null;
this.leftSide=null;
this.rightSide=null;
this.bottomLeft=null;
this.bottomRight=null;
this.contentBox=null;
this.content=null;
$_Z(this,arguments);
},$wt.widgets,"Group",$wt.widgets.Composite);
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=524288;
return style&-769;
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var size=$_U(this,$wt.widgets.Group,"computeSize",[wHint,hHint,changed]);
var length=0;
if(this.groupText!=null){
length=this.groupText.length;
}if(length!=0){
size.x=Math.max(size.x,this.textWidth+18);
}return size;
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(x,y,width,height){
var trim=$_U(this,$wt.widgets.Group,"computeTrim",[x,y,width,height]);
trim.x-=3;
if(this.textHeight<=0){
this.textHeight=O$.getStringStyledHeight(".","group-default",this.handle.style.cssText);
}trim.y-=this.textHeight;
trim.width+=6;
trim.height+=this.textHeight+3;
return trim;
},"~N,~N,~N,~N");
$_M(c$,"containerHandle",
function(){
return this.content;
});
$_M(c$,"createCSSElement",
function(parent,css){
var el=d$.createElement("DIV");
el.className=css;
(parent).appendChild(el);
return el;
},"~O,~S");
$_V(c$,"createHandle",
function(){
this.children=new Array(0);
this.state&=-3;
this.handle=d$.createElement("DIV");
if((this.style&2048)!=0){
this.handle.className="group-default group-border-default";
}else{
this.handle.className="group-default";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}var className=null;
if((this.style&16)!=0){
className="group-shadow-etched-in";
}else if((this.style&64)!=0){
className="group-shadow-etched-out";
}else if((this.style&4)!=0){
className="group-shadow-in";
}else if((this.style&8)!=0){
className="group-shadow-out";
}else if((this.style&32)!=0){
className="group-shadow-none";
}if(className==null){
className="group-border-frame group-no-title-text";
}else{
className="group-border-frame group-no-title-text "+className;
}this.borderFrame=this.createCSSElement(this.handle,className);
this.titleLine=this.createCSSElement(this.borderFrame,"group-title-line");
this.leftCorner=this.createCSSElement(this.borderFrame,"group-left-corner");
this.rightCorner=this.createCSSElement(this.borderFrame,"group-right-corner");
this.titleText=this.createCSSElement(this.borderFrame,"group-title-text");
this.leftSide=this.createCSSElement(this.borderFrame,"group-side-line-left");
this.rightSide=this.createCSSElement(this.borderFrame,"group-side-line-right");
this.bottomLeft=this.createCSSElement(this.borderFrame,"group-bottom-line-left");
this.bottomRight=this.createCSSElement(this.borderFrame,"group-bottom-line-right");
this.contentBox=this.createCSSElement(this.handle,"group-content-box");
this.content=this.createCSSElement(this.contentBox,"group-content");
});
$_V(c$,"getClientArea",
function(){
this.forceResize();
if(this.textHeight<=0){
this.textHeight=O$.getStringStyledHeight(".","group-default",this.handle.style.cssText);
}var x=3;
var y=this.textHeight;
var border=this.getBorderWidth();
var width=this.width-border*2-6;
var height=this.height-border*2-y-3;
return new $wt.graphics.Rectangle(x,y,width,height);
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getText",
function(){
return this.groupText;
});
$_V(c$,"mnemonicHit",
function(key){
return this.setFocus();
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
var mnemonic=this.findMnemonic(this.getText());
if((mnemonic).charCodeAt(0)==('\0').charCodeAt(0))return false;
return(Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(mnemonic)).charCodeAt(0);
},"~N");
$_M(c$,"releaseHandle",
function(){
if(this.titleLine!=null){
O$.destroyHandle(this.titleLine);
this.titleLine=null;
}if(this.titleText!=null){
O$.destroyHandle(this.titleText);
this.titleText=null;
}if(this.leftCorner!=null){
O$.destroyHandle(this.leftCorner);
this.leftCorner=null;
}if(this.rightCorner!=null){
O$.destroyHandle(this.rightCorner);
this.rightCorner=null;
}if(this.bottomLeft!=null){
O$.destroyHandle(this.bottomLeft);
this.bottomLeft=null;
}if(this.bottomRight!=null){
O$.destroyHandle(this.bottomRight);
this.bottomRight=null;
}if(this.leftSide!=null){
O$.destroyHandle(this.leftSide);
this.leftSide=null;
}if(this.rightSide!=null){
O$.destroyHandle(this.rightSide);
this.rightSide=null;
}if(this.borderFrame!=null){
O$.destroyHandle(this.borderFrame);
this.borderFrame=null;
}if(this.content!=null){
O$.destroyHandle(this.content);
this.content=null;
}if(this.contentBox!=null){
O$.destroyHandle(this.contentBox);
this.contentBox=null;
}$_U(this,$wt.widgets.Group,"releaseHandle",[]);
});
$_M(c$,"setBounds",
function(x,y,width,height){
$_U(this,$wt.widgets.Group,"setBounds",[x,y,width,height]);
if(this.textWidth==0&&this.groupText!=null&&this.groupText.length!=0){
this.textWidth=O$.getStringStyledWidth(this.groupText,"group-default",this.handle.style.cssText);
}if(this.textWidth!=0){
var w=this.width-this.textWidth-12;
if(w<0){
w=0;
}this.rightCorner.style.width=w+"px";
}},"~N,~N,~N,~N");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.widgets.Group,"setFont",[font]);
},"$wt.graphics.Font");
$_M(c$,"setText",
function(string){
var cssName=this.borderFrame.className;
if(cssName==null)cssName="";
var key="group-no-title-text";
var idx=cssName.indexOf(key);
if(string.length==0){
if(idx==-1){
this.borderFrame.className+=" "+key;
}}else{
if(idx!=-1){
this.borderFrame.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}if(!string.equals(this.groupText)){
for(var i=this.titleText.childNodes.length-1;i>=0;i--){
this.titleText.removeChild(this.titleText.childNodes[i]);
}
this.titleText.appendChild(d$.createTextNode(string));
this.textWidth=O$.getContainerWidth(this.titleText);
if(this.textWidth==0){
this.textWidth=O$.getStringStyledWidth(string,"group-default",this.handle.style.cssText);
}if(this.textWidth!=0){
var w=this.width-this.textWidth-24;
if(w>0){
this.rightCorner.style.width=w+"px";
}}}}this.groupText=string;
},"~S");
$_S(c$,
"CLIENT_INSET",3);
});
