$_L(["$wt.widgets.Control"],"$wt.widgets.Button",["java.lang.Character","$wt.graphics.Color","$.Point","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Button", ".button-default {\nposition:absolute;\nwhite-space:nowrap;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\nmargin:0;\npadding:0;\noverflow:hidden;\ncursor:default;\n}\n.button-border {\nborder:2px inset white;\n}\n.button-flat .button-push {\nborder:2px solid buttonshadow;\n}\n.button-flat .button-toggle {\nborder:2px solid buttonshadow;\n}\n.button-flat .button-arrow {\nborder:2px solid buttonshadow;\n}\n.button-push, .button-toggle, .button-arrow {\nposition:absolute;\nwhite-space:nowrap;\nfont-family:inherit;\nfont-size:1em;\nfont-size:inherit;\nmargin:0;\npadding:0;\nwidth:100%;\nheight:100%;\n}\n* html .button-push {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:1em;\n}\n* html .button-toggle {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:1em;\n}\n.button-push-safari, .button-toggle-safari {\nheight:auto !important;\ntop:-0.9em;\nmargin-top:50%;\npadding:0.25em 0 0.35em 0;\n}\n.button-arrow-safari {\nheight:auto !important;\ntop:-0.7em;\nmargin-top:50%;\npadding:0.25em 0 0.35em 0;\n}\nbody:nth-of-type(1) .button-push-chrome,\nbody:nth-of-type(1) .button-toggle-chrome,\nbody:nth-of-type(1) .button-arrow-chrome {\ntop:auto;\nmargin:0 !important;\npadding:0 !important;\nheight:100% !important;\n}\n.button-check .button-input-wrapper {\nfloat:left;\nposition:relative;\n/*bottom:-0.5em;*/\nmargin-top:4px;\n_bottom:-0.5em;\n_margin-top:auto;\n}\n.button-radio .button-input-wrapper {\nfloat:left;\nposition:relative;\n/*bottom:-0.5em;*/\nmargin-top:4px;\n_bottom:-0.5em;\n_margin-top:auto;\n}\n.button-text {\nposition:relative;\n/*padding-left:2px;*/\ncursor:default;\n}\n* html .button-text {\npadding-left:0;\n}\n.button-disabled .button-text {\ncolor:gray !important;\n}\n.button-input-wrapper INPUT {\nposition:relative;\ntop:-6px;\nmargin:3px;\nmargin-left:0;\n/*margin-right:0;*/\npadding-left:0;\npadding-right:0;\n}\n* html .button-input-wrapper INPUT {\nleft:-1px;\ntop:-3px;\nmargin-top:0;\n_left:0;\n_top:-5px;\n_margin-top:auto;\nwidth:13px;\nheight:13px;\noverflow:hidden;\n}\n@media all and (min-width:0px){/* opera */\n.button-input-wrapper INPUT {\nleft:0;\ntop:-4px;\nmargin-top:0;\nwidth:13px;\nheight:13px;\nmargin-right:2px;\noverflow:hidden;\n}\n}\n.button-selected {\nborder-style:inset;\nbackground-color:#eee7e0;\n}\n.button-arrow-left {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:solid solid solid none;\nborder-color:transparent;\nborder-right-color:black !important;\nborder-left-width:0;\n}\n.button-arrow-right {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:solid none solid solid;\nborder-color:transparent;\nborder-left-color:black !important;\nborder-right-width:0;\n}\n.button-arrow-up {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:none solid solid solid;\nborder-color:transparent;\nborder-bottom-color:black !important;\nborder-top-width:0;\n}\n.button-arrow-down {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:solid solid none solid;\nborder-color:transparent;\nborder-top-color:black !important;\nborder-bottom-width:0;\n}\n* html .button-arrow-left, * html .button-arrow-right, * html .button-arrow-up, * html .button-arrow-down {\nborder-color:buttonface;\n}\n.button-disabled .button-arrow-left {\nborder-right-color:gray !important;\n}\n.button-disabled .button-arrow-right {\nborder-left-color:gray !important;\n}\n.button-disabled .button-arrow-up {\nborder-bottom-color:gray !important;\n}\n.button-disabled .button-arrow-down {\nborder-top-color:gray !important;\n}\n.button-default span {\ncursor:default;\n}\n.button-text-mnemonics {\ntext-decoration:underline;\n}\n.swt-widgets-button {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.text = "";
this.textSizeCached = false;
this.textWidthCached = 0;
this.textHeightCached = 0;
this.lastColor = null;
this.hasImage = false;
this.image = null;
this.image2 = null;
this.imageList = null;
this.ignoreMouse = false;
this.btnText = null;
this.btnIcon = null;
this.btnHandle = null;
this.hSelectionHandler = null;
this.hSelectionKeyDown = null;
$_Z (this, arguments);
}, $wt.widgets, "Button", $wt.widgets.Control);
$_K (c$, 
function (parent, style) {
$_R (this, $wt.widgets.Button, [parent, $wt.widgets.Button.checkStyle (style)]);
}, "$wt.widgets.Composite,~N");
$_M(c$,"_setImage",
function(image){
},"$wt.graphics.Image");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Widget.checkBits(style,8,4,32,16,2,0);
if((style&(10))!=0){
return $wt.widgets.Widget.checkBits(style,16777216,16384,131072,0,0,0);
}if((style&(48))!=0){
return $wt.widgets.Widget.checkBits(style,16384,131072,16777216,0,0,0);
}if((style&4)!=0){
style|=524288;
return $wt.widgets.Widget.checkBits(style,128,1024,16384,131072,0,0);
}return style;
},"~N");
$_M(c$,"click",
function(){
this.ignoreMouse=true;
this.ignoreMouse=false;
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var border=this.getBorderWidth();
var width=0;
var height=0;
if((this.style&4)!=0){
if((this.style&(1152))!=0){
width+=16;
height+=16;
}else{
width+=16;
height+=16;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
}var extra=0;
if(this.text==null||this.text.length==0){
height+=O$.getStringStyledHeight(".","button-default",null);
}else{
if(!this.textSizeCached||changed){
var string=this.text.replaceAll("[\r\n]+","");
var cssSize=O$.getStringStyledSize(string,"button-default",this.handle.style.cssText);
this.textSizeCached=true;
this.textWidthCached=cssSize.x;
this.textHeightCached=cssSize.y;
}width=this.textWidthCached;
height=this.textHeightCached;
if((this.style&(48))!=0){
width-=5;
}extra=Math.max(8,height);
}if(this.image!=null){
var imageSize=O$.getImageSize(this.image);
width+=imageSize.x;
if(this.text!=null&&this.text.length!=0){
width+=8;
}height=Math.max(imageSize.y,height);
extra=8;
}if((this.style&(48))!=0){
width+=13+extra;
height=Math.max(height,16);
}if((this.style&(10))!=0){
width+=12;
height+=10;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
var cssName="button-default";
if((this.style&2048)!=0){
cssName+=" button-border";
}if((this.style&8388608)!=0){
cssName+=" button-flat";
}this.handle.className=cssName;
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}if((this.style&(48))!=0){
var btnEl=d$.createElement("DIV");
this.handle.appendChild(btnEl);
var btnWrapperEl=d$.createElement("DIV");
btnWrapperEl.className="button-input-wrapper";
if(O$.isIE70){
btnWrapperEl.style.marginTop="-2px";
btnWrapperEl.style.marginLeft="-4px";
}btnEl.appendChild(btnWrapperEl);
this.btnHandle=d$.createElement("INPUT");
if((this.style&32)!=0){
btnEl.className="button-check";
this.btnHandle.type="checkbox";
}else{
btnEl.className="button-radio";
this.btnHandle.type="radio";
}if(O$.isIE&&!O$.isIE80){
btnWrapperEl.style.bottom="-0.5em";
}btnWrapperEl.appendChild(this.btnHandle);
this.btnText=d$.createElement("DIV");
this.btnText.className="button-text";
btnEl.appendChild(this.btnText);
if(O$.isIE80){
this.btnText.style.paddingTop=((this.style&16)!=0)?"2px":"1px";
}}else{
this.btnHandle=d$.createElement("BUTTON");
this.handle.appendChild(this.btnHandle);
this.btnText=d$.createElement("DIV");
this.btnHandle.appendChild(this.btnText);
if((this.style&2)!=0){
this.btnHandle.className="button-toggle";
}else if((this.style&4)!=0){
this.btnHandle.className="button-arrow";
this.updateArrowStyle();
}else{
this.btnHandle.className="button-push";
}if(O$.isChrome){
this.btnHandle.className+=" "+this.btnHandle.className+"-chrome";
}else if(O$.isSafari){
var isSafari4Plus=false;
{
var ua=navigator.userAgent;
var verIdx=ua.indexOf("Version/");
if(verIdx!=-1){
var verStr=ua.substring(verIdx+8);
var verNumber=parseFloat(verStr);
isSafari4Plus=verNumber>=4.0
}
}if(!isSafari4Plus){
this.btnHandle.className+=" "+this.btnHandle.className+"-safari";
}}}this.hookSelection();
O$.setTextSelection(this.handle,false);
});
$_V(c$,"enableWidget",
function(enabled){
this.btnHandle.disabled=!enabled;
O$.updateCSSClass(this.handle,"button-disabled",!enabled);
O$.updateCSSClass(this.btnHandle,"button-disabled",!enabled);
},"~B");
$_M(c$,"getAlignment",
function(){
if((this.style&4)!=0){
if((this.style&128)!=0)return 128;
if((this.style&1024)!=0)return 1024;
if((this.style&16384)!=0)return 16384;
if((this.style&131072)!=0)return 131072;
return 128;
}if((this.style&16384)!=0)return 16384;
if((this.style&16777216)!=0)return 16777216;
if((this.style&131072)!=0)return 131072;
return 16384;
});
$_V(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 2;
}return 0;
});
$_M(c$,"getDefault",
function(){
if((this.style&8)==0)return false;
return false;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getSelection",
function(){
if((this.style&(50))==0)return false;
if((this.style&2)!=0){
return O$.existedCSSClass(this.btnHandle,"button-selected");
}else if((this.style&(48))!=0){
return this.btnHandle.checked;
}return false;
});
$_M(c$,"getText",
function(){
if((this.style&4)!=0)return"";
return this.text;
});
$_V(c$,"isEnabled",
function(){
return!this.btnHandle.disabled;
});
$_V(c$,"mnemonicHit",
function(ch){
if(!this.setFocus())return false;
if((this.style&16)==0)this.click();
return true;
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
var mnemonic=this.findMnemonic(this.getText());
if((mnemonic).charCodeAt(0)==('\0').charCodeAt(0))return false;
return(Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(mnemonic)).charCodeAt(0);
},"~N");
$_M(c$,"releaseHandle",
function(){
if(this.hSelectionKeyDown!=null){
Clazz.removeEvent(this.handle,"keydown",this.hSelectionKeyDown);
this.hSelectionKeyDown=null;
}if(this.hSelectionHandler!=null){
if((this.style&(48))!=0){
Clazz.removeEvent(this.btnHandle,"click",this.hSelectionHandler);
Clazz.removeEvent(this.btnText,"click",this.hSelectionHandler);
Clazz.removeEvent(this.btnText,"dblclick",this.hSelectionHandler);
}else{
Clazz.removeEvent(this.handle,"click",this.hSelectionHandler);
Clazz.removeEvent(this.handle,"dblclick",this.hSelectionHandler);
}this.hSelectionHandler=null;
}if(this.btnText!=null){
if(this.hMouseEnter!=null){
Clazz.removeEvent(this.btnText,"mouseover",this.hMouseEnter);
}if(this.hMouseExit!=null){
Clazz.removeEvent(this.btnText,"mouseout",this.hMouseExit);
}if(this.hMouseMove!=null){
Clazz.removeEvent(this.btnText,"mousemove",this.hMouseMove);
}O$.destroyHandle(this.btnText);
this.btnText=null;
}if(this.btnIcon!=null){
if(this.hMouseEnter!=null){
Clazz.removeEvent(this.btnIcon,"mouseover",this.hMouseEnter);
}if(this.hMouseExit!=null){
Clazz.removeEvent(this.btnIcon,"mouseout",this.hMouseExit);
}if(this.hMouseMove!=null){
Clazz.removeEvent(this.btnIcon,"mousemove",this.hMouseMove);
}O$.destroyHandle(this.btnIcon);
this.btnIcon=null;
}if(this.btnHandle!=null){
if(this.hMouseEnter!=null){
Clazz.removeEvent(this.btnHandle,"mouseover",this.hMouseEnter);
}if(this.hMouseExit!=null){
Clazz.removeEvent(this.btnHandle,"mouseout",this.hMouseExit);
}if(this.hMouseMove!=null){
Clazz.removeEvent(this.btnHandle,"mousemove",this.hMouseMove);
}O$.destroyHandle(this.btnHandle);
this.btnHandle=null;
}$_U(this,$wt.widgets.Button,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Button,"releaseWidget",[]);
if(this.imageList!=null)this.imageList.dispose();
this.imageList=null;
if(this.image2!=null)this.image2.dispose();
this.image2=null;
this.text=null;
this.image=null;
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"selectRadio",
function(){
var children=this.parent._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
if(this!==child)child.setRadioSelection(false);
}
this.setSelection(true);
});
$_M(c$,"setAlignment",
function(alignment){
if((this.style&4)!=0){
if((this.style&(148608))==0)return;
this.style&=-148609;
this.style|=alignment&(148608);
this.updateArrowStyle();
var cx=this.width;
var cy=this.height;
if((this.style&2048)!=0){
cx-=4;
cy-=4;
}O$.updateArrowSize(this.btnText,this.style,cx,cy);
return;
}if((alignment&(16924672))==0)return;
this.style&=-16924673;
this.style|=alignment&(16924672);
if((this.style&(10))!=0){
if(this.btnIcon!=null){
this.updateImagePosition();
}}},"~N");
$_M(c$,"setDefault",
function(value){
if((this.style&8)==0)return;
if(value){
O$.SetFocus(this.handle);
}},"~B");
$_M(c$,"setFixedFocus",
function(){
if((this.style&16)!=0&&!this.getSelection())return false;
return $_U(this,$wt.widgets.Button,"setFixedFocus",[]);
});
$_V(c$,"setForeground",
function(color){
if(color!=null){
this.btnHandle.style.color=color.getCSSHandle();
this.btnText.style.color=color.getCSSHandle();
}else{
this.btnHandle.style.color="";
this.btnText.style.color="";
}if(this.lastColor!=null){
this.lastColor=this.btnHandle.style.color;
}},"$wt.graphics.Color");
$_V(c$,"setBackground",
function(color){
if(color!=null){
this.handle.style.backgroundColor=color.getCSSHandle();
}else{
this.handle.style.backgroundColor="";
}},"$wt.graphics.Color");
$_V(c$,"getBackground",
function(){
var bg=this.btnHandle.style.backgroundColor;
if(bg==null||(""+bg).length==0){
return new $wt.graphics.Color(this.display,"menu");
}return new $wt.graphics.Color(this.display,bg);
});
$_V(c$,"getForeground",
function(){
var fg=this.btnHandle.style.color;
if(fg==null||(""+fg).length==0){
return new $wt.graphics.Color(this.display,"black");
}return new $wt.graphics.Color(this.display,this.handle.style.color);
});
$_M(c$,"setImage",
function(image){
if((this.style&4)!=0)return;
if(image==null){
this.hasImage=false;
this.btnText.style.backgroundImage="";
if(O$.isIENeedPNGFix&&this.btnText.style.filter!=null){
this.btnText.style.filter="";
}return;
}this.image=image;
this.hasImage=true;
if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
if(this.btnIcon==null){
this.btnIcon=d$.createElement("DIV");
if(this.btnText.className!==""){
this.btnIcon.className=this.btnText.className;
}this.btnIcon.style.position="absolute";
this.btnText.parentNode.insertBefore(this.btnIcon,this.btnText);
}this.btnText.style.display="";
this.btnText.style.paddingTop="";
this.btnHandle.style.top="";
var handleStyle=null;
handleStyle=this.btnText.style;
O$.getImageSize(this.image);
if((this.style&(48))!=0){
if(!O$.isIE){
handleStyle.marginLeft="16px";
handleStyle.paddingLeft=(this.image.width+3)+"px";
}else{
handleStyle.marginLeft="13px";
}}else{
if(!O$.isSafari||O$.isChrome){
if(O$.isIE){
handleStyle.marginLeft="3px";
}else{
handleStyle.marginLeft="1px";
}}else{
if(this.text!=null&&this.text.length>0){
handleStyle.marginLeft="6px";
}else{
handleStyle.marginLeft="4px";
}}handleStyle.paddingLeft=(this.image.width+1)+"px";
}handleStyle.minHeight=this.image.height+"px";
if(O$.isIE&&(this.style&(58))!=0){
handleStyle.height=this.image.height+"px";
}if(O$.isIENeedPNGFix&&image.url!=null&&image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
this.btnIcon.style.cssText=this.btnText.style.cssText;
this.btnIcon.style.position="absolute";
this.btnIcon.style.paddingLeft="0px";
this.btnIcon.style.backgroundImage="";
this.btnIcon.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+this.image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
handleStyle.backgroundRepeat="no-repeat";
this.btnIcon.style.cssText=this.btnText.style.cssText;
this.btnIcon.style.position="absolute";
this.btnIcon.style.paddingLeft="0px";
if(this.image.packedURL!=null){
this.btnIcon.style.backgroundImage="url(\""+this.image.packedURL+"\")";
this.btnIcon.style.width=this.image.packedItemWidth+"px";
this.btnIcon.style.height=this.image.packedItemHeight+"px";
var y=this.image.packedOffsetY;
this.btnIcon.style.backgroundPosition="-"+this.image.packedOffsetX+"px -"+y+"px";
}else{
var w=16;
if(this.image.width>0){
w=this.image.width;
}var h=16;
if(this.image.height>0){
h=this.image.height;
}this.btnIcon.style.width=w+"px";
this.btnIcon.style.height=h+"px";
this.btnIcon.style.backgroundPosition="center center";
this.btnIcon.style.backgroundImage="url(\""+this.image.url+"\")";
}}if(this.text==null||this.text.length==0){
this.btnText.appendChild(d$.createTextNode("\u00a0"));
}}else if(this.image!=null){
this.image.draw(this.btnHandle);
}if(O$.isIE&&(this.style&(48))!=0){
if(O$.isIE70||O$.isIE80){
this.btnHandle.parentNode.style.marginTop="-3px";
}else{
this.btnHandle.parentNode.style.marginTop="1px";
}}},"$wt.graphics.Image");
$_V(c$,"setRadioFocus",
function(){
if((this.style&16)==0||!this.getSelection())return false;
return this.setFocus();
});
$_M(c$,"setRadioSelection",
function(value){
if((this.style&16)==0)return false;
if(this.getSelection()!=value){
this.setSelection(value);
this.postEvent(13);
}return true;
},"~B");
$_M(c$,"setSavedFocus",
function(){
if((this.style&16)!=0&&!this.getSelection())return false;
return $_U(this,$wt.widgets.Button,"setSavedFocus",[]);
});
$_M(c$,"setSelection",
function(selected){
if((this.style&(50))==0)return;
if((this.style&2)!=0){
O$.updateCSSClass(this.btnHandle,"button-selected",selected);
}else if((this.style&(48))!=0){
this.btnHandle.checked=selected;
}},"~B");
$_M(c$,"setText",
function(string){
if((this.style&4)!=0)return;
if(string!==this.text){
this.textSizeCached=false;
}O$.clearChildren(this.btnText);
this.text=string;
string=string.replaceAll("[\r\n]+","").replaceAll("(&(&))","$2");
var idx=string.indexOf('&');
if(idx==-1){
this.btnText.appendChild(d$.createTextNode(string));
}else{
this.btnText.appendChild(d$.createTextNode(string.substring(0,idx)));
var underline=d$.createElement("SPAN");
underline.appendChild(d$.createTextNode(string.substring(idx+1,idx+2)));
underline.className="button-text-mnemonics";
this.btnText.appendChild(underline);
this.btnText.appendChild(d$.createTextNode(string.substring(idx+2)));
}if(O$.isIE&&(this.style&(48))!=0){
if(O$.isIE70){
this.btnHandle.parentNode.style.marginTop=this.text.length==0?"-5px":"-6px";
}else if((this.style&16)!=0){
this.btnHandle.parentNode.style.marginTop=this.text.length==0?"0":"2px";
}else{
this.btnHandle.parentNode.style.marginTop=this.text.length==0?"-1px":"1px";
}}},"~S");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if((this.style&2048)!=0){
cx-=4;
cy-=4;
}if((this.style&4)!=0){
O$.updateArrowSize(this.btnText,this.style,cx,cy);
}if((this.style&(48))!=0){
var h=0;
if(this.textSizeCached&&!O$.isIE80){
this.btnText.style.display="block";
if(this.textHeightCached<13){
this.btnText.style.paddingTop=(Math.floor((13-this.textHeightCached)/2))+"px";
this.btnHandle.parentNode.style.bottom="0";
this.btnHandle.parentNode.style.top="0";
this.btnHandle.style.top="0";
}else{
this.btnText.style.paddingTop="0";
}}h=this.textHeightCached;
if(this.hasImage){
h=Math.max(this.image.height,h);
}h=Math.max(16,h);
if(h<cy){
this.btnText.parentNode.style.position="relative";
this.btnText.parentNode.style.top=(Math.floor((cy-h)/2))+"px";
}}var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
var w=cx>0?cx:0;
el.style.width=w+"px";
var h=cy>0?cy:0;
el.style.height=h+"px";
if(this.btnIcon!=null){
this.updateImagePosition();
}return true;
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"updateImagePosition",
($fz=function(){
var w=O$.getContainerWidth(this.btnText);
var iw=16;
if(this.image!=null&&this.image.packedURL!=null){
iw=this.image.packedItemWidth;
}if(w<iw){
w=iw;
}if(O$.isIE){
if(O$.isIE50||O$.isIE55||O$.isIE60||O$.isIE70){
this.btnIcon.style.marginTop="2px";
}}else if(O$.isFirefox){
this.btnIcon.style.marginTop="-1px";
}if((this.style&(48))!=0){
this.btnIcon.style.marginLeft="17px";
}else{
var marginLeft=4;
if(O$.isIE){
if(O$.isIE50||O$.isIE55||O$.isIE60||O$.isIE70){
marginLeft=2;
}}else if(O$.isFirefox){
marginLeft=2;
}if((this.style&16384)!=0){
this.btnIcon.style.marginLeft=marginLeft+"px";
}else if((this.style&16777216)!=0){
if(this.text==null||this.text.length==0){
var x=Math.floor((w-iw)/2);
this.btnIcon.style.marginLeft=(x<marginLeft&&marginLeft==4?marginLeft:x)+"px";
}else{
this.btnIcon.style.marginLeft=marginLeft+"px";
}}else if((this.style&131072)!=0){
if(this.text==null||this.text.length==0){
this.btnIcon.style.marginLeft=(w-iw<marginLeft&&marginLeft==4?marginLeft:w-iw)+"px";
}else{
this.btnIcon.style.marginLeft=marginLeft+"px";
}}}},$fz.isPrivate=true,$fz));
$_M(c$,"setCursor",
function(cursor){
if(this.handle!=null){
this.handle.style.cursor=cursor.handle;
}},"$wt.graphics.Cursor");
$_M(c$,"updateArrowStyle",
($fz=function(){
if((this.style&16384)!=0){
this.btnText.className="button-arrow-left";
}else if((this.style&131072)!=0){
this.btnText.className="button-arrow-right";
}else if((this.style&128)!=0){
this.btnText.className="button-arrow-up";
}else if((this.style&1024)!=0){
this.btnText.className="button-arrow-down";
}else{
this.btnText.className="button-arrow-up";
}},$fz.isPrivate=true,$fz));
$_V(c$,"hookSelection",
function(){
if(this.hSelectionHandler!=null){
return;
}this.hSelectionHandler=$_Q((($_D("$wt.widgets.Button$1")?0:org.eclipse.swt.widgets.Button.$Button$1$()),$_N($wt.widgets.Button$1,this,null)));
if((this.style&(48))!=0){
Clazz.addEvent(this.btnHandle,"click",this.hSelectionHandler);
Clazz.addEvent(this.btnText,"click",this.hSelectionHandler);
Clazz.addEvent(this.btnText,"dblclick",this.hSelectionHandler);
if(this.btnIcon!=null){
Clazz.addEvent(this.btnIcon,"click",this.hSelectionHandler);
Clazz.addEvent(this.btnIcon,"dblclick",this.hSelectionHandler);
}}else{
Clazz.addEvent(this.handle,"click",this.hSelectionHandler);
Clazz.addEvent(this.handle,"dblclick",this.hSelectionHandler);
}this.hSelectionKeyDown=$_Q((($_D("$wt.widgets.Button$2")?0:org.eclipse.swt.widgets.Button.$Button$2$()),$_N($wt.widgets.Button$2,this,null)));
Clazz.addEvent(this.handle,"keydown",this.hSelectionKeyDown);
});
$_M(c$,"hookMouseEnter",
function(){
$_U(this,$wt.widgets.Button,"hookMouseEnter",[]);
Clazz.addEvent(this.btnHandle,"mouseover",this.hMouseEnter);
Clazz.addEvent(this.btnText,"mouseover",this.hMouseEnter);
if(this.btnIcon!=null){
Clazz.addEvent(this.btnIcon,"mouseover",this.hMouseEnter);
}});
$_M(c$,"hookMouseExit",
function(){
$_U(this,$wt.widgets.Button,"hookMouseExit",[]);
Clazz.addEvent(this.btnHandle,"mouseout",this.hMouseExit);
Clazz.addEvent(this.btnText,"mouseout",this.hMouseExit);
if(this.btnIcon!=null){
Clazz.addEvent(this.btnIcon,"mouseout",this.hMouseExit);
}});
$_M(c$,"hookMouseMove",
function(){
$_U(this,$wt.widgets.Button,"hookMouseMove",[]);
Clazz.addEvent(this.btnHandle,"mousemove",this.hMouseMove);
Clazz.addEvent(this.btnText,"mousemove",this.hMouseMove);
if(this.btnIcon!=null){
Clazz.addEvent(this.btnIcon,"mousemove",this.hMouseMove);
}});
c$.$Button$1$=function(){
$_H();
c$=$_W($wt.widgets,"Button$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.Button"].isEnabled()){
this.toReturn(false);
return;
}if((this.b$["$wt.widgets.Button"].style&(34))!=0){
var e=this.getEvent();
if((this.b$["$wt.widgets.Button"].style&32)!=0){
if(e.srcElement!==this.b$["$wt.widgets.Button"].btnHandle&&e.target!==this.b$["$wt.widgets.Button"].btnHandle){
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
this.toReturn(false);
}else{
this.toReturn(true);
if(O$.isIE){
new $wt.internal.dnd.HTMLEventWrapper(e).stopPropagation();
}}}else{
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}}else{
if((this.b$["$wt.widgets.Button"].style&16)!=0){
if((this.b$["$wt.widgets.Button"].parent.getStyle()&4194304)!=0){
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}else{
this.b$["$wt.widgets.Button"].selectRadio();
}}}this.b$["$wt.widgets.Button"].postEvent(13);
});
c$=$_P();
};
c$.$Button$2$=function(){
$_H();
c$=$_W($wt.widgets,"Button$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=this.getEvent();
if(e.keyCode==32||e.keyCode==13){
this.toReturn(false);
}this.toReturn(true);
});
c$=$_P();
};
$_S(c$,
"CHECK_WIDTH",13,
"CHECK_HEIGHT",13,
"ICON_WIDTH",128,
"ICON_HEIGHT",128);
});
