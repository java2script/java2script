$_L(["$wt.widgets.Composite"],"$wt.widgets.Group",["java.lang.Character","$wt.graphics.Rectangle","$wt.internal.browser.OS"],function(){
$WTC$$.registerCSS ("$wt.widgets.Group", ".group-default {\nposition:absolute;\nfont-family:Arial, sans-serif;\nfont-size:8pt;\noverflow:hidden;\nbackground-color:buttonface;\n}\n.group-border-default {\nborder:2px inset white;\n}\n.group-border-frame {\nposition:absolute;\nwidth:100%;\nheight:100%;\n}\n.group-title-line {\nposition:absolute;\ntop:0.5em;\nheight:0.2em;\nwidth:100%;\nborder-style:groove groove none groove;\nborder-width:2px;\nborder-color:white;\ndisplay:none;\n}\n.group-left-corner {\nposition:absolute;\nmargin-top:0.5em;\nheight:0.6em;\noverflow:hidden;\nborder-style:groove none none groove;\nborder-width:2px;\nborder-color:white;\nwidth:4px;\n}\n.group-title-text {\nposition:absolute;\nmargin:0 2px 0 8px;\ncursor:default;\n}\n.group-right-corner {\nposition:absolute;\nmargin-top:0.5em;\nheight:0.6em;\nwidth:0.75em;\noverflow:hidden;\nborder-style:groove groove none none;\nborder-width:2px;\nborder-color:white;\nright:0;\n}\n.group-side-line-left {\nposition:absolute;\nleft:0;\ntop:0.6em;\nheight:50%;\nborder-style:none none none groove;\nborder-width:2px;\nborder-color:white;\n}\n.group-side-line-right {\nposition:absolute;\nright:0;\ntop:0.6em;\nheight:50%;\nborder-style:none groove none none;\nborder-width:2px;\nborder-color:white;\n}\n.group-bottom-line-left {\nposition:absolute;\nleft:0;\nbottom:0;\nborder-style:none none groove groove;\nborder-width:2px;\nborder-color:white;\nwidth:50%;\nheight:50%;\n}\n.group-bottom-line-right {\nposition:absolute;\nright:0;\nbottom:0;\nborder-style:none groove groove none;\nborder-width:2px;\nborder-color:white;\nwidth:50%;\nheight:50%;\n}\n* html .group-bottom-line-left {\nbottom:-1px;\n}\n* html .group-bottom-line-right {\nright:-1px;\nbottom:-1px;\n}\n* html .group-side-line-right {\nright:-1px;\n}\n* html .group-right-corner {\nright:-1px;\n}\n.group-content-box {\nposition:relative;\ntop:0;\nheight:100%;\npadding-top:1em;\noverflow:hidden;\n}\n.group-content {\nfont-family:Arial, sans-serif;\nfont-size:8pt;\npadding:0 2px;\nposition:absolute;\ntop:0;\n}\n.group-no-title-text .group-title-line {\ndisplay:block;\n}\n.group-no-title-text .group-title-text {\ndisplay:none;\n}\n.group-shadow-none .group-title-line {\nborder-style:none none none none;\n}\n.group-shadow-none .group-left-corner {\nborder-style:none none none none;\n}\n.group-shadow-none .group-right-corner {\nborder-style:none none none none;\n}\n.group-shadow-none .group-side-line-left {\nborder-style:none none none none;\n}\n.group-shadow-none .group-side-line-right {\nborder-style:none none none none;\n}\n.group-shadow-none .group-bottom-line-left {\nborder-style:none none none none;\n}\n.group-shadow-none .group-bottom-line-right {\nborder-style:none none none none;\n}\n.group-shadow-out .group-title-line {\nborder-style:groove groove none groove;\n}\n.group-shadow-out .group-left-corner {\nborder-style:groove none none groove;\n}\n.group-shadow-out .group-right-corner {\nborder-style:groove groove none none;\n}\n.group-shadow-out .group-side-line-left {\nborder-style:none none none groove;\n}\n.group-shadow-out .group-side-line-right {\nborder-style:none groove none none;\n}\n.group-shadow-out .group-bottom-line-left {\nborder-style:none none groove groove;\n}\n.group-shadow-out .group-bottom-line-right {\nborder-style:none groove groove none;\n}\n.group-shadow-in .group-title-line {\nborder-style:ridge ridge none ridge;\n}\n.group-shadow-in .group-left-corner {\nborder-style:ridge none none ridge;\n}\n.group-shadow-in .group-right-corner {\nborder-style:ridge ridge none none;\n}\n.group-shadow-in .group-side-line-left {\nborder-style:none none none ridge;\n}\n.group-shadow-in .group-side-line-right {\nborder-style:none ridge none none;\n}\n.group-shadow-in .group-bottom-line-left {\nborder-style:none none ridge ridge;\n}\n.group-shadow-in .group-bottom-line-right {\nborder-style:none ridge ridge none;\n}\n.group-shadow-etched-in .group-title-line {\nborder-style:inset inset none inset;\n}\n.group-shadow-etched-in .group-left-corner {\nborder-style:inset none none inset;\n}\n.group-shadow-etched-in .group-right-corner {\nborder-style:inset inset none none;\n}\n.group-shadow-etched-in .group-side-line-left {\nborder-style:none none none inset;\n}\n.group-shadow-etched-in .group-side-line-right {\nborder-style:none inset none none;\n}\n.group-shadow-etched-in .group-bottom-line-left {\nborder-style:none none inset inset;\n}\n.group-shadow-etched-in .group-bottom-line-right {\nborder-style:none inset inset none;\n}\n.group-shadow-etched-out .group-title-line {\nborder-style:outset outset none outset;\n}\n.group-shadow-etched-out .group-left-corner {\nborder-style:outset none none outset;\n}\n.group-shadow-etched-out .group-right-corner {\nborder-style:outset outset none none;\n}\n.group-shadow-etched-out .group-side-line-left {\nborder-style:none none none outset;\n}\n.group-shadow-etched-out .group-side-line-right {\nborder-style:none outset none none;\n}\n.group-shadow-etched-out .group-bottom-line-left {\nborder-style:none none outset outset;\n}\n.group-shadow-etched-out .group-bottom-line-right {\nborder-style:none outset outset none;\n}\n.swt-widgets-group {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.groupText = null;
this.textWidth = 0;
this.textHeight = 0;
this.borderFrame = null;
this.titleLine = null;
this.leftCorner = null;
this.titleText = null;
this.rightCorner = null;
this.leftSide = null;
this.rightSide = null;
this.bottomLeft = null;
this.bottomRight = null;
this.contentBox = null;
this.content = null;
$_Z (this, arguments);
}, $wt.widgets, "Group", $wt.widgets.Composite);
c$.checkStyle = $_M (c$, "checkStyle", 
function (style) {
style |= 524288;
return style & -769;
}, "~N");
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
O$.setTextSelection(this.titleText,false);
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
$_M(c$,"setText",
function(string){
O$.updateCSSClass(this.borderFrame,"group-no-title-text",string.length==0);
if(string.length!=0){
if(!string.equals(this.groupText)){
O$.clearChildren(this.titleText);
this.titleText.appendChild(d$.createTextNode(string));
this.textWidth=O$.getStringStyledWidth(string,"group-default",this.handle.style.cssText);
if(this.textWidth!=0){
var w=this.width-this.textWidth-24;
if(w>0){
this.rightCorner.style.width=w+"px";
}}}}this.groupText=string;
},"~S");
$_V(c$,"_updateOrientation",
function(){
if((this.style&67108864)!=0){
this.handle.style.direction="ltr";
}else if(this.parent!=null&&(this.parent.style&67108864)!=0){
this.handle.style.direction="ltr";
}});
$_S(c$,
"CLIENT_INSET",3);
});
