/* http://j2s.sf.net/ */$_L(["$wt.widgets.Control"],"$wt.widgets.Label",["$wt.graphics.Point","$wt.internal.browser.OS"],function(){
$WTC$$.registerCSS ("$wt.widgets.Label", ".label-default {\nposition:absolute;\nleft:0;\ntop:0;\nwhite-space:nowrap;\ncursor:default;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\noverflow:hidden;\nbackground-color:buttonface;\n}\n.label-default span span {\ntext-decoration:underline;\n}\n.label-wrap {\nwhite-space:normal;\n}\n.label-border {\nborder-style:solid;\nborder-width:1px;\nborder-color:black white white black;\n}\n.label-seperator-horizontal-top {\nheight:0;\nfont-size:0;\nborder-bottom-style:solid;\nborder-bottom-width:1px;\nborder-bottom-color:#777777;\n}\n.label-seperator-horizontal-bottom {\nheight:0;\nfont-size:0;\nborder-top-style:solid;\nborder-top-width:1px;\nborder-top-color:white;\n}\n.shadow-in .label-seperator-horizontal-top {\nborder-bottom-color:white;\n}\n.shadow-in .label-seperator-horizontal-bottom {\nborder-top-color:#777777;\n}\n.shadow-none .label-seperator-horizontal-top {\nborder-style:none;\n}\n.shadow-none .label-seperator-horizontal-bottom {\nborder-style:none;\n}\n.label-seperator-vertical-left {\nposition:absolute;\nwidth:0;\nheight:100%;\nfont-size:0;\nborder-right-style:solid;\nborder-right-width:1px;\nborder-right-color:#777777;\n}\n.label-seperator-vertical-right {\nposition:absolute;\nwidth:0;\nheight:100%;\nfont-size:0;\nborder-left-style:solid;\nborder-left-width:1px;\nborder-left-color:white;\n}\n.shadow-in .label-seperator-vertical-left {\nborder-right-color:white;\n}\n.shadow-in .label-seperator-vertical-right {\nborder-left-color:#777777;\n}\n.shadow-none .label-seperator-vertical-left {\nborder-style:none;\n}\n.shadow-none .label-seperator-vertical-right {\nborder-style:none;\n}\n.swt-widgets-label {\nwidth:324px;\n}\n");
c$=$_C(function(){
this.text="";
this.textSizeCached=false;
this.textWidthCached=0;
this.textHeightCached=0;
this.lastColor=null;
this.image=null;
this.image2=null;
$_Z(this,arguments);
},$wt.widgets,"Label",$wt.widgets.Control);
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=524288;
if((style&2)!=0){
style=$wt.widgets.Widget.checkBits(style,512,256,0,0,0,0);
return $wt.widgets.Widget.checkBits(style,8,4,32,0,0,0);
}return $wt.widgets.Widget.checkBits(style,16384,16777216,131072,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
var border=this.getBorderWidth();
if((this.style&2)!=0){
var lineWidth=1;
if((this.style&256)!=0){
width=64;
height=lineWidth*2;
}else{
width=lineWidth*2;
height=64;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
}if(this.text!=null){
if((this.style&64)!=0&&wHint!=-1&&hHint==-1){
height=O$.getStringStyledWrappedHeight(this.text,"label-default",this.handle.style.cssText,wHint);
}else{
if(!this.textSizeCached||changed){
var cssSize=O$.getStringStyledSize(this.text,"label-default",this.handle.style.cssText);
this.textSizeCached=true;
this.textWidthCached=cssSize.x;
this.textHeightCached=cssSize.y;
}width=this.textWidthCached;
height=this.textHeightCached;
}}if(this.image!=null){
var imageSize=O$.getImageSize(this.image);
width+=imageSize.x;
height=Math.max(imageSize.y,height);
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"getAlignment",
function(){
if((this.style&2)!=0)return 0;
if((this.style&16384)!=0)return 16384;
if((this.style&16777216)!=0)return 16777216;
if((this.style&131072)!=0)return 131072;
return 16384;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getText",
function(){
if((this.style&2)!=0)return"";
return this.text;
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Label,"releaseWidget",[]);
if(this.image2!=null)this.image2.dispose();
this.image2=null;
this.text=null;
this.image=null;
});
$_M(c$,"setAlignment",
function(alignment){
if((this.style&2)!=0)return;
if((alignment&(16924672))==0)return;
this.style&=-16924673;
this.style|=alignment&(16924672);
if((this.style&16384)!=0){
this.handle.style.textAlign="left";
this.handle.style.backgroundPosition="left center";
}else if((this.style&16777216)!=0){
this.handle.style.textAlign="center";
this.handle.style.backgroundPosition="center center";
}else if((this.style&131072)!=0){
this.handle.style.textAlign="right";
this.handle.style.backgroundPosition="right center";
}},"~N");
$_M(c$,"setImage",
function(image){
if(image==null)return;
if((this.style&2)!=0)return;
this.image=image;
if(image==null){
this.handle.style.backgroundImage="";
if(O$.isIENeedPNGFix&&this.handle.style.filter!=null){
this.handle.style.filter="";
}return;
}if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
var handleStyle=this.handle.style;
if(O$.isIENeedPNGFix&&image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.backgroundImage="";
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+this.image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
handleStyle.backgroundRepeat="no-repeat";
handleStyle.backgroundPosition="left center";
handleStyle.backgroundImage="url(\""+this.image.url+"\")";
}}else if(this.handle.childNodes.length==0){
if(image.handle==null)return;
for(var i=0;i<image.handle.childNodes.length;i++){
this.handle.appendChild(image.handle.childNodes[i]);
}
}else{
if(image.handle==null)return;
var txt=this.handle.childNodes[0];
for(var i=0;i<image.handle.childNodes.length;i++){
this.handle.insertBefore(image.handle.childNodes[i],txt);
}
}},"$wt.graphics.Image");
$_M(c$,"setText",
function(string){
if((this.style&2)!=0)return;
if(this.image!=null){
this.handle.style.backgroundImage="";
if(O$.isIE&&this.image.url!=null&&this.image.url.toLowerCase().endsWith(".png")&&this.handle.style.filter!=null){
this.handle.style.filter="";
}}if(string===this.text){
return;
}this.textSizeCached=false;
this.text=string;
var children=this.handle.childNodes;
if(children!=null){
for(var i=0;i<children.length;i++){
this.handle.removeChild(children[i]);
}
}O$.insertText(this.handle,this.text);
},"~S");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
this.handle.className="label-default";
if((this.style&2)!=0){
if((this.style&4)!=0){
this.handle.className+=" shadow-in";
}else if((this.style&8)!=0){
this.handle.className+=" shadow-out";
}else{
this.handle.className+=" shadow-none";
}this.handle.style.fontSize="0";
var seperator1=d$.createElement("DIV");
var seperator2=d$.createElement("DIV");
if((this.style&512)!=0){
seperator1.className="label-seperator-vertical-left";
seperator2.className="label-seperator-vertical-right";
}else{
seperator1.className="label-seperator-horizontal-top";
seperator2.className="label-seperator-horizontal-bottom";
}this.handle.appendChild(seperator1);
this.handle.appendChild(seperator2);
}if((this.style&64)!=0){
this.handle.className+=" label-wrap";
}if((this.style&2048)!=0){
this.handle.className+=" label-border";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}});
$_M(c$,"setBounds",
function(x,y,width,height){
$_U(this,$wt.widgets.Label,"setBounds",[x,y,width,height]);
if((this.style&2)!=0){
var handleStyle=this.handle.childNodes[0].style;
if((this.style&256)!=0){
var h=(Math.floor(height/2))-1;
if(O$.isIE){
h--;
}handleStyle.marginTop=h+"px";
handleStyle.width=width+"px";
this.handle.childNodes[1].style.width=width+"px";
}else{
handleStyle.marginLeft=((Math.floor(width/2))-1)+"px";
handleStyle.height=height+"px";
this.handle.childNodes[1].style.marginLeft=(Math.floor(width/2))+"px";
this.handle.childNodes[1].style.height=height+"px";
}}},"~N,~N,~N,~N");
$_M(c$,"setEnabled",
function(enabled){
$_U(this,$wt.widgets.Label,"setEnabled",[enabled]);
if(!enabled){
this.lastColor=this.handle.style.color;
this.handle.style.color="gray";
}else{
this.handle.style.color=this.lastColor;
this.lastColor=null;
}},"~B");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.widgets.Label,"setForeground",[color]);
if(this.lastColor!=null){
this.lastColor=this.handle.style.color;
}},"$wt.graphics.Color");
$_M(c$,"setFont",
function(font){
this.textSizeCached=false;
$_U(this,$wt.widgets.Label,"setFont",[font]);
},"$wt.graphics.Font");
});
$_L(["$wt.widgets.Control"],"$wt.widgets.Button",["java.lang.Character","$wt.graphics.Color","$.Point","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Button", ".button-default {\nposition:absolute;\nwhite-space:nowrap;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\nmargin:0;\npadding:0;\noverflow:hidden;\n}\n.button-border {\nborder:2px inset white;\n}\n.button-flat .button-push {\nborder:2px solid buttonshadow;\n}\n.button-flat .button-toggle {\nborder:2px solid buttonshadow;\n}\n.button-flat .button-arrow {\nborder:2px solid buttonshadow;\n}\n.button-push, .button-toggle, .button-arrow {\nposition:absolute;\nwhite-space:nowrap;\nfont-family:inherit;\nfont-size:1em;\nfont-size:inherit;\nmargin:0;\npadding:0;\nwidth:100%;\nheight:100%;\n}\n* html .button-push {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:1em;\n}\n* html .button-toggle {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:1em;\n}\n@media all and (-webkit-min-device-pixel-ratio:0){/* safari only */\n.button-push, .button-toggle {\nheight:auto !important;\ntop:-0.9em;\nmargin-top:50%;\npadding:0.25em 0 0.35em 0;\n}\n.button-arrow {\nheight:auto !important;\ntop:-0.7em;\nmargin-top:50%;\npadding:0.25em 0 0.35em 0;\n}\n}\nbody:nth-of-type(1) .button-push-chrome,\nbody:nth-of-type(1) .button-toggle-chrome,\nbody:nth-of-type(1) .button-arrow-chrome {\ntop:auto;\nmargin:0 !important;\npadding:0 !important;\nheight:100% !important;\n}\n.button-check .button-input-wrapper {\nfloat:left;\nposition:relative;\n/*bottom:-0.5em;*/\nmargin-top:4px;\n_bottom:-0.5em;\n_margin-top:auto;\n}\n.button-radio .button-input-wrapper {\nfloat:left;\nposition:relative;\n/*bottom:-0.5em;*/\nmargin-top:4px;\n_bottom:-0.5em;\n_margin-top:auto;\n}\n.button-text {\nposition:relative;\n/*padding-left:2px;*/\ncursor:default;\n}\n* html .button-text {\npadding-left:0;\n}\n.button-disabled .button-text {\ncolor:gray !important;\n}\n.button-input-wrapper INPUT {\nposition:relative;\ntop:-6px;\nmargin:3px;\nmargin-left:0;\n/*margin-right:0;*/\npadding-left:0;\npadding-right:0;\n}\n* html .button-input-wrapper INPUT {\nleft:-1px;\ntop:-3px;\nmargin-top:0;\n_left:0;\n_top:-5px;\n_margin-top:auto;\nwidth:13px;\nheight:13px;\noverflow:hidden;\n}\n@media all and (min-width:0px){/* opera */\n.button-input-wrapper INPUT {\nleft:0;\ntop:-4px;\nmargin-top:0;\nwidth:13px;\nheight:13px;\nmargin-right:2px;\noverflow:hidden;\n}\n}\n.button-selected {\nborder-style:inset;\nbackground-color:#eee7e0;\n}\n.button-arrow-left {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:solid solid solid none;\nborder-color:transparent;\nborder-right-color:black !important;\nborder-left-width:0;\n}\n.button-arrow-right {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:solid none solid solid;\nborder-color:transparent;\nborder-left-color:black !important;\nborder-right-width:0;\n}\n.button-arrow-up {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:none solid solid solid;\nborder-color:transparent;\nborder-bottom-color:black !important;\nborder-top-width:0;\n}\n.button-arrow-down {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:solid solid none solid;\nborder-color:transparent;\nborder-top-color:black !important;\nborder-bottom-width:0;\n}\n* html .button-arrow-left, * html .button-arrow-right, * html .button-arrow-up, * html .button-arrow-down {\nborder-color:buttonface;\n}\n.button-disabled .button-arrow-left {\nborder-right-color:gray !important;\n}\n.button-disabled .button-arrow-right {\nborder-left-color:gray !important;\n}\n.button-disabled .button-arrow-up {\nborder-bottom-color:gray !important;\n}\n.button-disabled .button-arrow-down {\nborder-top-color:gray !important;\n}\n.button-default span {\ncursor:default;\n}\n.button-text-mnemonics {\ntext-decoration:underline;\n}\n.swt-widgets-button {\nwidth:324px;\n}\n");
c$=$_C(function(){
this.text="";
this.textSizeCached=false;
this.textWidthCached=0;
this.textHeightCached=0;
this.lastColor=null;
this.hasImage=false;
this.image=null;
this.image2=null;
this.imageList=null;
this.ignoreMouse=false;
this.btnText=null;
this.btnHandle=null;
$_Z(this,arguments);
},$wt.widgets,"Button",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Button,[parent,$wt.widgets.Button.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
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
}if(O$.isIE){
btnWrapperEl.style.bottom="-0.5em";
}btnWrapperEl.appendChild(this.btnHandle);
this.btnText=d$.createElement("DIV");
this.btnText.className="button-text";
btnEl.appendChild(this.btnText);
}else{
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
}}this.btnHandle.onmouseover=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Button$1")){
$_H();
c$=$_W($wt.widgets,"Button$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var cssName=" button-hover";
var idx=this.b$["$wt.widgets.Button"].btnHandle.className.indexOf(cssName);
if(idx==-1){
this.b$["$wt.widgets.Button"].btnHandle.className=this.b$["$wt.widgets.Button"].btnHandle.className+cssName;
}});
c$=$_P();
}
return $_N($wt.widgets.Button$1,i$,v$);
})(this,null));
this.btnHandle.onmouseout=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Button$2")){
$_H();
c$=$_W($wt.widgets,"Button$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var cssName=" button-hover";
var idx=this.b$["$wt.widgets.Button"].btnHandle.className.indexOf(cssName);
if(idx!=-1){
this.b$["$wt.widgets.Button"].btnHandle.className=this.b$["$wt.widgets.Button"].btnHandle.className.substring(0,idx)+this.b$["$wt.widgets.Button"].btnHandle.className.substring(cssName.length+idx);
}});
c$=$_P();
}
return $_N($wt.widgets.Button$2,i$,v$);
})(this,null));
this.hookSelection();
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
if(this.btnText!=null){
O$.destroyHandle(this.btnText);
this.btnText=null;
}if(this.btnHandle!=null){
O$.destroyHandle(this.btnHandle);
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
var handleStyle=null;
handleStyle=this.btnText.style;
if((this.style&16384)!=0){
this.btnText.style.textAlign="left";
handleStyle.backgroundPosition="left center";
}if((this.style&16777216)!=0){
this.btnText.style.textAlign="center";
handleStyle.backgroundPosition="center center";
}else if((this.style&131072)!=0){
this.btnText.style.textAlign="right";
handleStyle.backgroundPosition="right center";
}}},"~N");
$_M(c$,"setDefault",
function(value){
if((this.style&8)==0)return;
if(value){
try{
this.handle.focus();
}catch(e){
if($_O(e,Error)){
}else{
throw e;
}
}
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
this.btnText.style.display="";
this.btnText.style.paddingTop="";
this.btnHandle.style.top="";
var handleStyle=null;
handleStyle=this.btnText.style;
var img=new Image();
img.src=this.image.url;
if(image.width==0){
this.image.width=img.width;
}if(image.height==0){
this.image.height=img.height;
}if((this.style&(48))!=0){
handleStyle.marginLeft="16px";
handleStyle.paddingLeft=(this.image.width+3)+"px";
}else{
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
if(O$.isIENeedPNGFix&&image.url!=null&&image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.backgroundImage="";
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+this.image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
handleStyle.backgroundRepeat="no-repeat";
var bgXPos="center";
if((this.style&131072)!=0){
bgXPos="right";
}else if((this.style&16777216)!=0){
bgXPos="center";
}else{
bgXPos="left";
}handleStyle.backgroundPosition=bgXPos+" center";
handleStyle.backgroundImage="url(\""+this.image.url+"\")";
}if(this.text==null||this.text.length==0){
this.btnText.appendChild(d$.createTextNode("\u00a0"));
}}else if(this.image!=null){
this.image.draw(this.btnHandle);
}if(O$.isIE&&(this.style&(48))!=0){
var emptyText=(image!=null||this.text.length==0);
if(O$.isIE70){
this.btnHandle.parentNode.style.marginTop=emptyText?"-2px":"-3px";
}else if((this.style&16)!=0){
this.btnHandle.parentNode.style.marginTop=emptyText?"0":"2px";
}else{
this.btnHandle.parentNode.style.marginTop=emptyText?"-1px":"1px";
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
string=string.replaceAll("[\r\n]+","").replaceAll ("(&(&))", "$2");
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
if(this.textSizeCached){
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
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
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
var eventHandler=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Button$3")){
$_H();
c$=$_W($wt.widgets,"Button$3",$wt.internal.RunnableCompatibility);
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
}else if(O$.isIE){
this.toReturn(true);
new $wt.internal.dnd.HTMLEventWrapper(e).stopPropagation();
}}else{
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
}
return $_N($wt.widgets.Button$3,i$,v$);
})(this,null));
this.handle.onclick=this.handle.ondblclick=eventHandler;
if((this.style&(48))!=0){
this.btnText.onclick=eventHandler;
}if((this.style&32)!=0){
}this.handle.onkeydown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Button$4")){
$_H();
c$=$_W($wt.widgets,"Button$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=this.getEvent();
if(e.keyCode==32||e.keyCode==13){
this.toReturn(false);
}this.toReturn(true);
});
c$=$_P();
}
return $_N($wt.widgets.Button$4,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseEnter",
function(){
$_U(this,$wt.widgets.Button,"hookMouseEnter",[]);
this.btnHandle.onmouseover=this.btnText.onmouseover=this.handle.onmouseover;
});
$_M(c$,"hookMouseExit",
function(){
$_U(this,$wt.widgets.Button,"hookMouseExit",[]);
this.btnHandle.onmouseout=this.btnText.onmouseout=this.handle.onmouseout;
});
$_M(c$,"hookMouseMove",
function(){
$_U(this,$wt.widgets.Button,"hookMouseMove",[]);
this.btnHandle.onmousemove=this.btnText.onmousemove=this.handle.onmousemove;
});
$_S(c$,
"CHECK_WIDTH",13,
"CHECK_HEIGHT",13,
"ICON_WIDTH",128,
"ICON_HEIGHT",128);
});
$_L(["$wt.widgets.Scrollable"],"$wt.widgets.Text",["$wt.graphics.Point","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.Event","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Text", ".text-default {\nposition:absolute;\nborder-style:none;\n/*background-color:white;*/\nmargin:0;\npadding:0;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\n/*white-space:nowrap;*/\noverflow:hidden;\n}\n.text-default textarea {\n/*background-color:transparent;*/\nmargin:0;\npadding:0;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\n}\n.text-editable textarea {\n/*background-color:white;*/\n}\n.text-default input {\n/*background-color:transparent;*/\nmargin:0;\npadding:0;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\n}\n.text-editable input {\n/*background-color:white;*/\n}\ntextarea.text-ie-default {\noverflow-y:hidden;\n}\ntextarea.text-v-scroll {\noverflow:scroll;\noverflow-x:hidden;\n}\ntextarea.text-h-scroll {\noverflow:scroll;\noverflow-y:hidden;\n}\n.text-no-border {\nborder-style:none;\nbackground-color:transparent;\n}\ntextarea.text-no-border, input.text-no-border {\nborder-style:none;\n_padding:0 3px;\n}\n.text-default textarea {\npadding:0;\n_padding:0 1px;\n}\ninput.text-wrap {\npadding:0 3px;\n}\n.text-disabled {\nbackground-color:buttonface;\n}\ninput.text-readonly {\nbackground-color:buttonface;\n}\ntextarea.text-disabled, input.text-disabled {\nbackground-color:buttonface;\n}\n.swt-widgets-text {\nwidth:324px;\n}\n");
c$=$_C(function(){
this.tabs=0;
this.oldStart=0;
this.oldEnd=0;
this.doubleClick=false;
this.ignoreModify=false;
this.ignoreVerify=false;
this.ignoreCharacter=false;
this.keyDownOK=false;
this.textHandle=null;
this.lineHeight=0;
$_Z(this,arguments);
},$wt.widgets,"Text",$wt.widgets.Scrollable);
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
var cssName="text-default text-editable";
this.handle.className=cssName;
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}this.doubleClick=true;
if((this.style&2)!=0){
this.textHandle=d$.createElement("TEXTAREA");
}else{
this.textHandle=d$.createElement("INPUT");
if((this.style&4194304)!=0){
this.textHandle.type="password";
}else{
this.textHandle.type="text";
}}var textCSSName=null;
if(O$.isIE){
textCSSName="text-ie-default";
}if((this.style&2048)==0){
if(textCSSName!=null){
textCSSName+=" text-no-border";
}else{
textCSSName="text-no-border";
}}if((this.style&64)!=0){
if(textCSSName!=null){
textCSSName+=" text-wrap";
}else{
textCSSName="text-wrap";
}}if((this.style&8)!=0){
this.textHandle.readOnly=true;
if(textCSSName!=null){
textCSSName+=" text-readonly";
}else{
textCSSName="text-readonly";
}}if((this.style&512)!=0&&(this.style&256)!=0){
this.textHandle.style.overflow="scroll";
}else{
if((this.style&512)!=0){
if(textCSSName!=null){
textCSSName+=" text-v-scroll";
}else{
textCSSName="text-v-scroll";
}}else if((this.style&256)!=0){
if(textCSSName!=null){
textCSSName+=" text-h-scroll";
}else{
textCSSName="text-h-scroll";
}}}if(textCSSName!=null){
this.textHandle.className=textCSSName;
}this.handle.onfocus=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Text$1")){
$_H();
c$=$_W($wt.widgets,"Text$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Text"].textHandle.focus();
});
c$=$_P();
}
return $_N($wt.widgets.Text$1,i$,v$);
})(this,null));
var wrapper=d$.createElement("DIV");
wrapper.style.overflow=((this.style&2)!=0)?"auto":"hidden";
this.handle.appendChild(wrapper);
wrapper.appendChild(this.textHandle);
if(!O$.isChrome){
wrapper.onscroll=function(e){
this.scrollLeft=0;
this.scrollTop=0;
};
}});
$_V(c$,"hookKeyDown",
function(){
this.textHandle.onkeydown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Text$2")){
$_H();
c$=$_W($wt.widgets,"Text$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var verifyHooked=false;
if(this.b$["$wt.widgets.Text"].hooks(25)){
verifyHooked=true;
var evt=this.getEvent();
if(!O$.isInputCharacter(evt.keyCode,evt.shiftKey,evt.altKey,evt.ctrlKey)){
this.toReturn(true);
}else{
var e=new $wt.widgets.Event();
e.character=O$.getInputCharacter(evt.keyCode,evt.shiftKey);
var txt=""+e.character;
if((e.character).charCodeAt(0)==8||(e.character).charCodeAt(0)==46){
txt="";
}e.keyCode=(e.character).charCodeAt(0);
e.stateMask=(evt.shiftKey?131072:0)|(evt.ctrlKey?262144:0);
var s=this.b$["$wt.widgets.Text"].verifyText(txt,0,0,e);
if(s==null){
this.toReturn(false);
}else if(this.b$["$wt.widgets.Text"].hooks(24)){
var ev=new $wt.widgets.Event();
ev.type=24;
ev.widget=this.b$["$wt.widgets.Text"];
ev.display=this.b$["$wt.widgets.Text"].display;
ev.time=this.b$["$wt.widgets.Text"].display.getLastEventTime();
this.b$["$wt.widgets.Text"].sendEvent(ev);
this.toReturn(ev.doit);
}}}this.b$["$wt.widgets.Text"].keyDownOK=this.isReturned();
if(!verifyHooked||this.b$["$wt.widgets.Text"].hooks(1)){
var ev=new $wt.widgets.Event();
ev.type=24;
ev.widget=this.b$["$wt.widgets.Text"];
ev.display=this.b$["$wt.widgets.Text"].display;
ev.time=this.b$["$wt.widgets.Text"].display.getLastEventTime();
this.b$["$wt.widgets.Text"].sendEvent(ev);
this.toReturn(ev.doit);
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var evt=e.event;
var keyCode=evt.keyCode;
if(keyCode==27){
this.b$["$wt.widgets.Text"].dragStatus=false;
}var event=new $wt.widgets.Event();
event.character=O$.getInputCharacter(evt.keyCode,evt.shiftKey);
event.keyCode=(event.character).charCodeAt(0);
event.type=1;
event.display=this.b$["$wt.widgets.Text"].display;
event.stateMask=(evt.altKey?65536:0)|(evt.shiftKey?131072:0)|(evt.ctrlKey?262144:0);
event.widget=this.b$["$wt.widgets.Text"];
if(event.time==0){
event.time=this.b$["$wt.widgets.Text"].display.getLastEventTime();
}this.b$["$wt.widgets.Text"].sendEvent(event);
this.toReturn(!(!ev.doit||!event.doit));
this.b$["$wt.widgets.Text"].keyDownOK=ev.doit&&event.doit;
}});
c$=$_P();
}
return $_N($wt.widgets.Text$2,i$,v$);
})(this,null));
this.textHandle.onkeypress=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Text$3")){
$_H();
c$=$_W($wt.widgets,"Text$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var e=evt.event;
var kc=0;
{
if(e.which){
kc=e.which;
}else{
kc=e.keyCode;
}
}($t$=O$.isCapsLockOn=(kc>64&&kc<91&&!e.shiftKey)||(kc>=97&&kc<=122&&e.shiftKey),O$.prototype.isCapsLockOn=O$.isCapsLockOn,$t$);
if(O$.isOpera){
this.toReturn(this.b$["$wt.widgets.Text"].keyDownOK);
}});
c$=$_P();
}
return $_N($wt.widgets.Text$3,i$,v$);
})(this,null));
});
$_V(c$,"hookKeyUp",
function(){
this.textHandle.onkeyup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Text$4")){
$_H();
c$=$_W($wt.widgets,"Text$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var evt=e.event;
var keyCode=evt.keyCode;
if(keyCode==27){
this.b$["$wt.widgets.Text"].dragStatus=false;
}var event=new $wt.widgets.Event();
event.character=O$.getInputCharacter(evt.keyCode,evt.shiftKey);
event.keyCode=(event.character).charCodeAt(0);
event.type=2;
event.display=this.b$["$wt.widgets.Text"].display;
event.stateMask=(evt.altKey?65536:0)|(evt.shiftKey?131072:0)|(evt.ctrlKey?262144:0);
event.widget=this.b$["$wt.widgets.Text"];
if(event.time==0){
event.time=this.b$["$wt.widgets.Text"].display.getLastEventTime();
}this.b$["$wt.widgets.Text"].sendEvent(event);
this.toReturn(event.doit);
});
c$=$_P();
}
return $_N($wt.widgets.Text$4,i$,v$);
})(this,null));
});
$_V(c$,"hookModify",
function(){
this.textHandle.onkeyup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Text$5")){
$_H();
c$=$_W($wt.widgets,"Text$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if((this.b$["$wt.widgets.Text"].style&8)!=0||(this.b$["$wt.widgets.Text"].hooks(25)&&!this.b$["$wt.widgets.Text"].filters(25))){
this.toReturn(true);
return;
}var newText=this.b$["$wt.widgets.Text"].textHandle.value;
if(newText!=null){
newText=this.b$["$wt.widgets.Text"].verifyText(newText,0,0,null);
if(newText==null){
this.toReturn(true);
return;
}var e=new $wt.widgets.Event();
e.type=24;
e.item=this.b$["$wt.widgets.Text"];
e.widget=this.b$["$wt.widgets.Text"];
this.b$["$wt.widgets.Text"].sendEvent(e);
this.toReturn(e.doit);
}});
c$=$_P();
}
return $_N($wt.widgets.Text$5,i$,v$);
})(this,null));
this.textHandle.onblur=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Text$6")){
$_H();
c$=$_W($wt.widgets,"Text$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
O$.removeCSSClass(this.b$["$wt.widgets.Text"].handle,"text-focus");
var e=new $wt.widgets.Event();
e.type=16;
e.item=this.b$["$wt.widgets.Text"];
e.widget=this.b$["$wt.widgets.Text"];
this.b$["$wt.widgets.Text"].sendEvent(e);
this.toReturn(e.doit);
});
c$=$_P();
}
return $_N($wt.widgets.Text$6,i$,v$);
})(this,null));
this.textHandle.onfocus=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Text$7")){
$_H();
c$=$_W($wt.widgets,"Text$7",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
O$.addCSSClass(this.b$["$wt.widgets.Text"].handle,"text-focus");
var e=new $wt.widgets.Event();
e.type=15;
e.item=this.b$["$wt.widgets.Text"];
e.widget=this.b$["$wt.widgets.Text"];
this.b$["$wt.widgets.Text"].sendEvent(e);
this.toReturn(e.doit);
});
c$=$_P();
}
return $_N($wt.widgets.Text$7,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseDoubleClick",
function(){
$_U(this,$wt.widgets.Text,"hookMouseDoubleClick",[]);
this.textHandle.ondblclick=this.handle.ondblclick;
});
$_M(c$,"hookMouseDown",
function(){
$_U(this,$wt.widgets.Text,"hookMouseDown",[]);
this.textHandle.onmousedown=this.handle.onmousedown;
});
$_M(c$,"hookMouseUp",
function(){
$_U(this,$wt.widgets.Text,"hookMouseUp",[]);
this.textHandle.onmouseup=this.handle.onmouseup;
});
$_M(c$,"addModifyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(24,typedListener);
},"$wt.events.ModifyListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"addVerifyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(25,typedListener);
},"$wt.events.VerifyListener");
$_M(c$,"append",
function(string){
this.textHandle.value+=string;
},"~S");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&4)!=0&&(style&2)!=0){
style&=-3;
}style=$wt.widgets.Widget.checkBits(style,16384,16777216,131072,0,0,0);
if((style&4)!=0)style&=-833;
if((style&64)!=0){
style|=2;
style&=-257;
}if((style&2)!=0)style&=-4194305;
if((style&(6))!=0)return style;
if((style&(768))!=0)return style|2;
return style|4;
},"~N");
$_M(c$,"clearSelection",
function(){
this.clearSelection(this.textHandle);
});
$_M(c$,"clearSelection",
($fz=function(handle){
var handle=arguments[0];
handle.focus();
if(typeof handle.selectionStart!="undefined"){
var start=handle.selectionStart;
handle.setSelectionRange(start,start);
}else if(document.selection){
var workRange=document.selection.createRange();
workRange.text=workRange.text;
workRange.select();
}
},$fz.isPrivate=true,$fz),"~O");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var height=0;
var width=0;
if(wHint==-1||hHint==-1){
var size=null;
var text=this.getText();
if(text!=null&&text.length!=0){
var wrap=(this.style&2)!=0&&(this.style&64)!=0;
if(wrap&&wHint!=-1&&wHint>0){
size=new $wt.graphics.Point(wHint,O$.getStringStyledWrappedHeight(text,"text-default",this.handle.style.cssText,wHint));
}else{
text=text.replaceAll("(^\\s)|(\\s$)","\u00a0").replaceAll("\\s\\s"," \u00a0");
size=O$.getStringStyledSize(text,"text-default",this.handle.style.cssText);
}width=size.x;
height=size.y;
if(height<=0){
height=this.getLineHeight();
}}else{
width=0;
height=this.getLineHeight();
}}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var trim=this.computeTrim(0,0,width,height);
return new $wt.graphics.Point(trim.width,trim.height);
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(x,y,width,height){
var rect=$_U(this,$wt.widgets.Text,"computeTrim",[x,y,width,height]);
if((this.style&2)!=0){
rect.width+=6;
}else{
rect.width+=1;
}if((this.style&256)!=0)rect.width++;
if((this.style&512)!=0){
rect.width+=16;
}if((this.style&256)!=0){
rect.height+=16;
}if((this.style&2048)!=0){
rect.x-=1;
rect.y-=1;
rect.width+=2;
rect.height+=2;
}return rect;
},"~N,~N,~N,~N");
$_M(c$,"copy",
function(){
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Text,"createWidget",[]);
this.doubleClick=true;
this.setTabStops(this.tabs=8);
this.fixAlignment();
});
$_M(c$,"cut",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"fixAlignment",
function(){
});
$_V(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 2;
}return 0;
});
$_M(c$,"getCaretLineNumber",
function(){
return this.getTextCaretLineNumber(this.textHandle);
});
$_M(c$,"getTextCaretLineNumber",
($fz=function(textHandle){
var handle=arguments[0];
var txt="";
if(typeof handle.selectionStart!="undefined"){
txt=handle.value.substring(0,handle.selectionStart);
}else if(document.selection){
handle.focus();
var workRange=document.selection.createRange();
workRange.moveStart("character",-65535);
if(workRange.htmlText!=null){
var s=workRange.htmlText;
var key=handle.nodeName;
txt=this.parseInnerText(s,key);
}else{
txt=workRange.text;
}
}
return txt.split(/\r\n|\r|\n/g).length;
},$fz.isPrivate=true,$fz),"~O");
$_M(c$,"getCaretLocation",
function(){
return new $wt.graphics.Point(0,0);
});
$_M(c$,"getCaretPosition",
function(){
return this.getTextCaretPosition(this.textHandle);
});
$_M(c$,"getTextCaretPosition",
($fz=function(handle){
var handle=arguments[0];
if(typeof handle.selectionStart!="undefined"){
return handle.selectionStart;
}else if(document.selection){
handle.focus();
var workRange=document.selection.createRange();
workRange.moveStart("character",-32767);
if(workRange.htmlText!=null){
var s=workRange.htmlText;
var key=handle.nodeName;
var txt=this.parseInnerText(s,key);
if(txt!=null){
return txt.length;
}
}
return workRange.text.length;
}
return-1;
},$fz.isPrivate=true,$fz),"~O");
$_M(c$,"getCharCount",
function(){
return this.textHandle.value.length;
});
$_M(c$,"getDoubleClickEnabled",
function(){
return this.doubleClick;
});
$_M(c$,"getEchoChar",
function(){
return'*';
});
$_M(c$,"getEditable",
function(){
var editableClass="text-editable";
if(this.handle.className!=null){
var idx=this.handle.className.indexOf(editableClass);
if(idx!=-1){
return true;
}}return false;
});
$_M(c$,"getLineCount",
function(){
return 0;
});
$_M(c$,"getLineDelimiter",
function(){
return"\r\n";
});
$_M(c$,"getLineHeight",
function(){
if(this.lineHeight!=-1){
this.lineHeight=O$.getStringStyledHeight(".","text-default",this.handle.style.cssText);
}return this.lineHeight;
});
$_M(c$,"getOrientation",
function(){
return this.style&(100663296);
});
$_M(c$,"getSelection",
function(){
return this.getTextSelection(this.textHandle);
});
$_M(c$,"getTextSelection",
($fz=function(textHandle){
var handle=arguments[0];
if(typeof handle.selectionStart!="undefined"){
return new org.eclipse.swt.graphics.Point(handle.selectionStart,
handle.selectionEnd);
}else if(document.selection){
return new org.eclipse.swt.graphics.Point(
this.getTextCaretPosition(handle),
this.getTextCaretPositionEnd(handle));
}
return new new org.eclipse.swt.graphics.Point(0,0);
},$fz.isPrivate=true,$fz),"~O");
$_M(c$,"getSelectionCount",
function(){
var selection=this.getSelection();
return selection.y-selection.x;
});
$_M(c$,"getSelectionText",
function(){
return this.getSelectionText(this.textHandle);
});
$_M(c$,"getSelectionText",
($fz=function(textHandle){
var handle=arguments[0];
handle.focus();
if(typeof handle.selectionStart!="undefined"){
var start=handle.selectionStart;
return handle.value.substring(start,handle.selectionEnd);
}else if(document.selection){
var workRange=document.selection.createRange();
return workRange.text;
}
return"";
},$fz.isPrivate=true,$fz),"~O");
$_M(c$,"getTabs",
function(){
return this.tabs;
});
$_M(c$,"getTabWidth",
function(tabs){
return 64;
},"~N");
$_M(c$,"getText",
function(){
return this.textHandle.value;
});
$_M(c$,"getText",
function(start,end){
var length=this.textHandle.value.length;
start=Math.max(0,start);
end=Math.min(end,length-1);
return this.getText().substring(start,end+1);
},"~N,~N");
$_M(c$,"getTextLimit",
function(){
return 0;
});
$_M(c$,"getTopIndex",
function(){
if((this.style&4)!=0)return 0;
return 0;
});
$_M(c$,"getTopPixel",
function(){
return this.getTopIndex()*this.getLineHeight();
});
$_M(c$,"insert",
function(string){
var sel=this.getTextSelection(this.textHandle);
if(this.hooks(25)||this.filters(25)){
string=this.verifyText(string,sel.x,sel.y,null);
if(string==null)return;
}this.insertTextString(this.textHandle,string);
if((this.style&2)!=0){
this.sendEvent(24);
}},"~S");
$_M(c$,"insertTextString",
($fz=function(textHandle,string){
var handle=arguments[0];
var str=arguments[1];
handle.focus();
if(typeof handle.selectionStart!="undefined"){
var start=handle.selectionStart;
handle.value=handle.value.substring(0,start)+str+handle.value.substring(handle.selectionEnd);
handle.setSelectionRange(start+str.length,start+str.length);
}else if(document.selection){
var workRange=document.selection.createRange();
workRange.text=str;
workRange.select();
}
},$fz.isPrivate=true,$fz),"~O,~S");
$_M(c$,"paste",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"releaseHandle",
function(){
if(this.textHandle!=null){
O$.destroyHandle(this.textHandle);
this.textHandle=null;
}$_U(this,$wt.widgets.Text,"releaseHandle",[]);
});
$_M(c$,"removeModifyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(24,listener);
},"$wt.events.ModifyListener");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeVerifyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(25,listener);
},"$wt.events.VerifyListener");
$_M(c$,"selectAll",
function(){
this.textHandle.select();
});
$_M(c$,"sendKeyEvent",
function(type,msg,wParam,lParam,event){
return false;
},"~N,~N,~N,~N,$wt.widgets.Event");
$_M(c$,"setBackground",
function(color){
if(color!=null)this.textHandle.style.backgroundColor=color.getCSSHandle();
$_U(this,$wt.widgets.Text,"setBackground",[color]);
},"$wt.graphics.Color");
$_M(c$,"setDoubleClickEnabled",
function(doubleClick){
this.doubleClick=doubleClick;
},"~B");
$_M(c$,"setEchoChar",
function(echo){
if((this.style&2)!=0)return;
try{
this.textHandle.type="password";
}catch(e){
if($_O(e,Exception)){
}else{
throw e;
}
}
},"~N");
$_M(c$,"setEditable",
function(editable){
this.style&=-9;
if(!editable)this.style|=8;
this.textHandle.readOnly=!editable;
O$.updateCSSClass(this.handle,"text-editable",editable);
},"~B");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.widgets.Text,"setFont",[font]);
var tmp=this.handle;
this.handle=this.textHandle;
$_U(this,$wt.widgets.Text,"setFont",[font]);
this.handle=tmp;
},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
if(color!=null)this.textHandle.style.color=color.getCSSHandle();
$_U(this,$wt.widgets.Text,"setForeground",[color]);
},"$wt.graphics.Color");
$_M(c$,"setOrientation",
function(orientation){
this.fixAlignment();
},"~N");
$_M(c$,"setSelection",
function(start){
this.setSelection(start,this.textHandle.value.length);
},"~N");
$_M(c$,"setSelection",
function(start,end){
this.setTextSelection(this.textHandle,start,end);
},"~N,~N");
$_M(c$,"setTextSelection",
($fz=function(handle,start,end){
var handle=arguments[0];
var start=arguments[1];
var end=arguments[2];
handle.focus();
if(!(handle.setSelectionRange&&handle.createTextRange)){
var s=handle.value.substring(0,start);
var count=s.split(/\r\n|\r|\n/g).length;
start-=count;
end-=count;
s=handle.value.substring(start,end);
end-=s.split(/\r\n|\r|\n/g).length;
}
if(handle.setSelectionRange){
handle.setSelectionRange(start,end);
}else if(handle.createTextRange){
var range=handle.createTextRange();
range.collapse(true);
range.moveStart("character",start);
range.moveEnd("character",end-start+1);
range.select();
}
handle.focus();
},$fz.isPrivate=true,$fz),"~O,~N,~N");
$_M(c$,"setRedraw",
function(redraw){
$_U(this,$wt.widgets.Text,"setRedraw",[redraw]);
if(this.drawCount!=0)return;
},"~B");
$_M(c$,"setSelection",
function(selection){
this.setSelection(selection.x,selection.y);
},"$wt.graphics.Point");
$_M(c$,"setTabs",
function(tabs){
if(tabs<0)return;
this.tabs=tabs;
},"~N");
$_M(c$,"setTabStops",
function(tabs){
},"~N");
$_M(c$,"setText",
function(string){
this.textHandle.value=string;
this.sendEvent(24);
},"~S");
$_M(c$,"setTextLimit",
function(limit){
if(limit>32767){
}},"~N");
$_M(c$,"setTopIndex",
function(index){
if((this.style&4)!=0)return;
},"~N");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
var b=0;
if((this.style&2048)!=0){
b=4;
if(O$.isIE){
b++;
}}this.textHandle.style.height=(cy-b>0?cy-b:0)+"px";
if(O$.isIE&&b!=0){
if((this.style&(66))!=0){
b+=5;
}else{
b++;
}}this.textHandle.style.width=(cx-b>0?cx-b:0)+"px";
var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"showSelection",
function(){
});
$_M(c$,"verifyText",
function(string,start,end,keyEvent){
if(this.ignoreVerify)return string;
var event=new $wt.widgets.Event();
event.text=string;
event.start=start;
event.end=end;
if(keyEvent!=null){
event.character=keyEvent.character;
event.keyCode=keyEvent.keyCode;
event.stateMask=keyEvent.stateMask;
}this.sendEvent(25,event);
if(!event.doit||this.isDisposed())return null;
return event.text;
},"~S,~N,~N,$wt.widgets.Event");
$_V(c$,"useNativeScrollBar",
function(){
return true;
});
$_M(c$,"windowClass",
function(){
return"TEXTAREA";
});
$_V(c$,"enableWidget",
function(enabled){
this.textHandle.disabled=!enabled;
O$.updateCSSClass(this.textHandle,"text-disabled",!enabled);
O$.updateCSSClass(this.handle,"text-disabled",!enabled);
},"~B");
$_M(c$,"forceFocus",
function(){
var ret=$_U(this,$wt.widgets.Text,"forceFocus",[]);
{
try{
this.textHandle.focus();
}catch(e){}
}return ret;
});
$_S(c$,
"LIMIT",0x7FFF,
"DELIMITER","\r\n");
});
$_L(["$wt.widgets.Composite"],"$wt.widgets.Group",["java.lang.Character","$wt.graphics.Rectangle","$wt.internal.browser.OS"],function(){
$WTC$$.registerCSS ("$wt.widgets.Group", ".group-default {\nposition:absolute;\nfont-family:Arial, sans-serif;\nfont-size:8pt;\noverflow:hidden;\nbackground-color:buttonface;\n}\n.group-border-default {\nborder:2px inset white;\n}\n.group-border-frame {\nposition:absolute;\nwidth:100%;\nheight:100%;\n}\n.group-title-line {\nposition:absolute;\ntop:0.5em;\nheight:0.2em;\nwidth:100%;\nborder-style:groove groove none groove;\nborder-width:2px;\nborder-color:white;\ndisplay:none;\n}\n.group-left-corner {\nposition:absolute;\nmargin-top:0.5em;\nheight:0.6em;\noverflow:hidden;\nborder-style:groove none none groove;\nborder-width:2px;\nborder-color:white;\nwidth:4px;\n}\n.group-title-text {\nposition:absolute;\nmargin:0 2px 0 8px;\ncursor:default;\n}\n.group-right-corner {\nposition:absolute;\nmargin-top:0.5em;\nheight:0.6em;\nwidth:0.75em;\noverflow:hidden;\nborder-style:groove groove none none;\nborder-width:2px;\nborder-color:white;\nright:0;\n}\n.group-side-line-left {\nposition:absolute;\nleft:0;\ntop:0.6em;\nheight:50%;\nborder-style:none none none groove;\nborder-width:2px;\nborder-color:white;\n}\n.group-side-line-right {\nposition:absolute;\nright:0;\ntop:0.6em;\nheight:50%;\nborder-style:none groove none none;\nborder-width:2px;\nborder-color:white;\n}\n.group-bottom-line-left {\nposition:absolute;\nleft:0;\nbottom:0;\nborder-style:none none groove groove;\nborder-width:2px;\nborder-color:white;\nwidth:50%;\nheight:50%;\n}\n.group-bottom-line-right {\nposition:absolute;\nright:0;\nbottom:0;\nborder-style:none groove groove none;\nborder-width:2px;\nborder-color:white;\nwidth:50%;\nheight:50%;\n}\n* html .group-bottom-line-left {\nbottom:-1px;\n}\n* html .group-bottom-line-right {\nright:-1px;\nbottom:-1px;\n}\n* html .group-side-line-right {\nright:-1px;\n}\n* html .group-right-corner {\nright:-1px;\n}\n.group-content-box {\nposition:relative;\ntop:0;\nheight:100%;\npadding-top:1em;\noverflow:hidden;\n}\n.group-content {\nfont-family:Arial, sans-serif;\nfont-size:8pt;\npadding:0 2px;\nposition:absolute;\ntop:0;\n}\n.group-no-title-text .group-title-line {\ndisplay:block;\n}\n.group-no-title-text .group-title-text {\ndisplay:none;\n}\n.group-shadow-none .group-title-line {\nborder-style:none none none none;\n}\n.group-shadow-none .group-left-corner {\nborder-style:none none none none;\n}\n.group-shadow-none .group-right-corner {\nborder-style:none none none none;\n}\n.group-shadow-none .group-side-line-left {\nborder-style:none none none none;\n}\n.group-shadow-none .group-side-line-right {\nborder-style:none none none none;\n}\n.group-shadow-none .group-bottom-line-left {\nborder-style:none none none none;\n}\n.group-shadow-none .group-bottom-line-right {\nborder-style:none none none none;\n}\n.group-shadow-out .group-title-line {\nborder-style:groove groove none groove;\n}\n.group-shadow-out .group-left-corner {\nborder-style:groove none none groove;\n}\n.group-shadow-out .group-right-corner {\nborder-style:groove groove none none;\n}\n.group-shadow-out .group-side-line-left {\nborder-style:none none none groove;\n}\n.group-shadow-out .group-side-line-right {\nborder-style:none groove none none;\n}\n.group-shadow-out .group-bottom-line-left {\nborder-style:none none groove groove;\n}\n.group-shadow-out .group-bottom-line-right {\nborder-style:none groove groove none;\n}\n.group-shadow-in .group-title-line {\nborder-style:ridge ridge none ridge;\n}\n.group-shadow-in .group-left-corner {\nborder-style:ridge none none ridge;\n}\n.group-shadow-in .group-right-corner {\nborder-style:ridge ridge none none;\n}\n.group-shadow-in .group-side-line-left {\nborder-style:none none none ridge;\n}\n.group-shadow-in .group-side-line-right {\nborder-style:none ridge none none;\n}\n.group-shadow-in .group-bottom-line-left {\nborder-style:none none ridge ridge;\n}\n.group-shadow-in .group-bottom-line-right {\nborder-style:none ridge ridge none;\n}\n.group-shadow-etched-in .group-title-line {\nborder-style:inset inset none inset;\n}\n.group-shadow-etched-in .group-left-corner {\nborder-style:inset none none inset;\n}\n.group-shadow-etched-in .group-right-corner {\nborder-style:inset inset none none;\n}\n.group-shadow-etched-in .group-side-line-left {\nborder-style:none none none inset;\n}\n.group-shadow-etched-in .group-side-line-right {\nborder-style:none inset none none;\n}\n.group-shadow-etched-in .group-bottom-line-left {\nborder-style:none none inset inset;\n}\n.group-shadow-etched-in .group-bottom-line-right {\nborder-style:none inset inset none;\n}\n.group-shadow-etched-out .group-title-line {\nborder-style:outset outset none outset;\n}\n.group-shadow-etched-out .group-left-corner {\nborder-style:outset none none outset;\n}\n.group-shadow-etched-out .group-right-corner {\nborder-style:outset outset none none;\n}\n.group-shadow-etched-out .group-side-line-left {\nborder-style:none none none outset;\n}\n.group-shadow-etched-out .group-side-line-right {\nborder-style:none outset none none;\n}\n.group-shadow-etched-out .group-bottom-line-left {\nborder-style:none none outset outset;\n}\n.group-shadow-etched-out .group-bottom-line-right {\nborder-style:none outset outset none;\n}\n.swt-widgets-group {\nwidth:324px;\n}\n");
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
$_M(c$,"setText",
function(string){
O$.updateCSSClass(this.borderFrame,"group-no-title-text",string.length==0);
if(string.length!=0){
if(!string.equals(this.groupText)){
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
$_L(["$wt.widgets.Item"],"$wt.widgets.TabItem",["$wt.internal.RunnableCompatibility","$wt.internal.browser.OS"],function(){
c$=$_C(function(){
this.parent=null;
this.control=null;
this.toolTipText=null;
this.hasImage=false;
this.textEl=null;
$_Z(this,arguments);
},$wt.widgets,"TabItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TabItem,[parent,style]);
this.parent=parent;
var index=parent.getItemCount();
parent.createItem(this,index);
this.configure(index);
},"$wt.widgets.TabFolder,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.TabItem,[parent,style]);
this.parent=parent;
parent.createItem(this,index);
this.configure(index);
},"$wt.widgets.TabFolder,~N,~N");
$_M(c$,"configure",
($fz=function(index){
this.textEl.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TabItem$1")){
$_H();
c$=$_W($wt.widgets,"TabItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TabItem"].parent.setSelection(this.f$.index,true);
});
c$=$_P();
}
return $_N($wt.widgets.TabItem$1,i$,v$);
})(this,$_F("index",index)));
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getToolTipText",
function(){
return this.toolTipText;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TabItem,"releaseChild",[]);
var index=this.parent.indexOf(this);
if(index==this.parent.getSelectionIndex()){
if(this.control!=null)this.control.setVisible(false);
}this.parent.destroyItem(this);
});
$_M(c$,"releaseHandle",
function(){
if(this.textEl!=null){
O$.destroyHandle(this.textEl);
this.textEl=null;
}if(this.handle!=null){
O$.destroyHandle(this.handle);
this.handle=null;
}$_U(this,$wt.widgets.TabItem,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TabItem,"releaseWidget",[]);
this.control=null;
this.parent=null;
});
$_M(c$,"setControl",
function(control){
if(control!=null){
}if(this.control!=null&&this.control.isDisposed()){
this.control=null;
}var oldControl=this.control;
var newControl=control;
this.control=control;
var index=this.parent.indexOf(this);
if(index!=this.parent.getSelectionIndex()){
if(newControl!=null)newControl.setVisible(false);
return;
}if(newControl!=null){
newControl.setBounds(this.parent.getClientArea());
newControl.setVisible(true);
}if(oldControl!=null)oldControl.setVisible(false);
},"$wt.widgets.Control");
$_M(c$,"setImage",
function(image){
var index=this.parent.indexOf(this);
if(index==-1)return;
var boundsChanged=(image!=null&&this.image==null)||(image==null&&this.image!=null);
$_U(this,$wt.widgets.TabItem,"setImage",[image]);
if(image!=null&&image.handle==null&&image.url!=null&&image.url.length!=0){
var handleStyle=this.textEl.style;
if(O$.isIENeedPNGFix&&image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.backgroundImage="";
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+this.image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
handleStyle.backgroundImage="url(\""+this.image.url+"\")";
}}else{
this.textEl.style.backgroundImage="";
if(O$.isIENeedPNGFix&&this.textEl.style.filter!=null){
this.textEl.style.filter="";
}}this.hasImage=image!=null;
O$.updateCSSClass(this.handle,"tab-item-image",this.hasImage);
if(boundsChanged){
this.parent.updateSelection(this.parent.getSelectionIndex());
}},"$wt.graphics.Image");
$_M(c$,"setText",
function(string){
var index=this.parent.indexOf(this);
if(index==-1)return;
var boundsChanged=string!==this.text;
$_U(this,$wt.widgets.TabItem,"setText",[string]);
if(this.handle!=null){
O$.clearChildren(this.handle);
this.textEl=d$.createElement("SPAN");
this.handle.appendChild(this.textEl);
this.textEl.appendChild(d$.createTextNode(string));
this.handle.style.height="14px";
}this.text=string;
this.configure(index);
if(boundsChanged){
this.parent.updateSelection(this.parent.getSelectionIndex());
}},"~S");
$_M(c$,"setToolTipText",
function(string){
this.toolTipText=string;
},"~S");
});
$_L(["$wt.widgets.Composite"],"$wt.widgets.TabFolder",["java.lang.Character","$wt.graphics.Point","$.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.TabFolder", ".tab-folder-default {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\nposition:absolute;\noverflow:hidden;\n}\n.tab-folder-border-default {\nborder:2px inset #ccc;\n}\n.tab-folder-border {\nposition:absolute;\nwidth:50%;\nheight:50%;\nborder-width:2px;\nborder-color:white;\nz-index:100;\n}\n.tab-folder-border-nw {\ntop:7px;\nborder-style:outset none none outset;\nborder-left:1px solid white;\nborder-top:1px solid white;\nmargin-top:1.2em;\n}\nbody:nth-of-type(1) .tab-folder-border-nw {\ntop:8px;\n}\n* html .tab-folder-border-nw {\ntop:6px;\nmargin-top:1.3em;\n}\n.tab-folder-border-sw {\nbottom:0;\nborder-style:none none outset outset;\nborder-left:1px solid white;\n}\n.tab-folder-border-ne {\nright:0;\ntop:7px;\nborder-style:outset outset none none;\nborder-top:1px solid white;\nmargin-top:1.2em;\n}\nbody:nth-of-type(1) .tab-folder-border-ne {\ntop:8px;\n}\n* html .tab-folder-border-ne {\ntop:6px;\nmargin-top:1.3em;\n}\n.tab-folder-border-se {\nright:0;\nbottom:0;\nborder-style:none outset outset none;\n}\n* html .tab-folder-border-sw {\nbottom:1px;\n}\n* html .tab-folder-border-se {\nbottom:1px;\n}\n.tab-folder-bottom .tab-folder-border-nw {\ntop:0;\nmargin-top:0;\n}\n.tab-folder-bottom .tab-folder-border-sw {\nbottom:7px;\nmargin-bottom:1.2em;\nborder-bottom:1px outset #777;\n}\n* html .tab-folder-bottom .tab-folder-border-sw {\nbottom:6px;\nmargin-bottom:1.3em;\n}\n.tab-folder-bottom .tab-folder-border-ne {\nright:0;\ntop:0;\nmargin-top:0;\n}\n.tab-folder-bottom .tab-folder-border-se {\nbottom:7px;\nmargin-bottom:1.2em;\nborder-bottom:1px outset #777;\n}\n* html .tab-folder-bottom .tab-folder-border-se {\nbottom:6px;\nmargin-bottom:1.3em;\n}\n.tab-folder-no-tab .tab-folder-border-nw {\ntop:2px;\nmargin-top:0;\n}\n.tab-folder-no-tab .tab-folder-border-sw {\nbottom:2px;\nmargin-bottom:0;\n}\n.tab-folder-no-tab .tab-folder-border-ne {\nright:0;\ntop:2px;\nmargin-top:0;\n}\n.tab-folder-no-tab .tab-folder-border-se {\nbottom:2px;\nmargin-bottom:0;\n}\n* html .tab-folder-no-tab .tab-folder-border-nw {\ntop:1px;\n}\n* html .tab-folder-no-tab .tab-folder-border-sw {\nbottom:1px;\n}\n* html .tab-folder-no-tab .tab-folder-border-ne {\ntop:1px;\n}\n* html .tab-folder-no-tab .tab-folder-border-se {\nbottom:1px;\n}\n.tab-item-default {\nposition:absolute;\nmargin-top:2px;\npadding:2px 5px 2px 5px;\nmin-width:28px;\ncursor:default;\noverflow:visible;\nwhite-space:nowrap;\nborder-top:1px solid white;\nborder-left:1px solid white;\nborder-right:2px outset #777;\nbackground-color:buttonface;\nborder-bottom-style:none;\n}\n* html .tab-item-default {\npadding-top:1px;\n/*width:28px;*/\n}\n* html .tab-item-image {\n/*width:52px;*/\n/*width:68px;*/\n}\n.tab-item-selected {\nmargin-top:0;\npadding-left:7px;\npadding-right:7px;\npadding-bottom:4px;\n}\n.tab-item-default span {\nwhite-space:nowrap;\npadding-bottom:4px;\nbackground-position:left center;\nbackground-repeat:no-repeat;\n}\n.tab-folder-bottom .tab-item-default span {\npadding-top:1px;\npadding-bottom:3px;\n}\n* html .tab-folder-bottom .tab-item-default span {\npadding-top:3px;\npadding-bottom:1px;\n}\n.tab-item-image span {\nmargin-left:2px;\npadding-left:22px;\n}\n.tab-folder-bottom .tab-item-default {\nbottom:2px;\nmargin-top:0;\npadding-top:2px;\nborder-top-width:0;\nborder-bottom:2px outset white;\n}\n* html .tab-folder-bottom .tab-item-default {\npadding-top:2px;\npadding-bottom:0;\n}\n.tab-folder-bottom .tab-item-selected {\nmargin-top:0;\npadding-top:4px;\npadding-bottom:2px;\nmargin-bottom:0;\nbottom:0;\n}\n* html .tab-folder-bottom .tab-item-selected {\npadding-top:4px;\n}\n.tab-item-more {\nposition:absolute;\nheight:16px;\nleft:-36px;\n/*margin-top:2px;*/\n/*top:-4px;*/\n/*\nleft:-3em;\ntop:-0.4em;\nheight:0.8em;\npadding:4px;\n*/\nmargin-left:100%;\ndisplay:none;\nz-index:111;\n}\n.tab-show-more-item .tab-item-more {\ndisplay:block;\n}\n* html .tab-item-more {\nleft:-2px;\ntop:2px;\nmargin-left:0;\nwidth:100%;\n}\n.tab-folder-bottom .tab-item-more {\nmargin-bottom:2px;\ntop:auto;\nbottom:8px;\n}\n* html .tab-folder-bottom .tab-item-more {\nmargin-bottom:2px;\ntop:auto;\nbottom:0;\n}\n.tab-item-button {\nwidth:16px;\nheight:16px;\n/*\nwidth:0.8em;\nheight:0.8em;\npadding:4px;\n*/\nfloat:right;\n}\n.tab-item-button button {\nposition:relative;\nwidth:16px;\nheight:16px;\n/*\nwidth:100%;\nheight:100%;\ntop:-1em;\nleft:0;\n*/\n}\n.tab-item-button .button-arrow-left {\nborder-width:0.4em;\nborder-left-width:0;\nborder-width:4px 4px 4px 0;\nposition:relative;\n/*left:-6px; mozilla 1.8*/\nleft:-1px;\ntop:-2px;\n}\n.tab-item-button .button-arrow-right {\nborder-width:0.4em;\nborder-right-width:0;\nborder-width:4px 0 4px 4px;\nposition:relative;\n/*left:-5px; mozilla 1.8*/\nleft:0;\ntop:-2px;\n}\n* html .tab-item-button .button-arrow-left {\nleft:-1px;\ntop:0;\n}\n* html .tab-item-button .button-arrow-right {\nleft:0;\ntop:0;\n}\n.tab-folder-content-area {\nposition:absolute;\nwidth:100%;\nz-index:120;\n}\n.swt-widgets-tabfolder {\nwidth:324px;\n}\n");
c$=$_C(function(){
this.items=null;
this.borderFrame=null;
this.borderNW=null;
this.borderNE=null;
this.borderSW=null;
this.borderSE=null;
this.itemMore=null;
this.btnPrevTab=null;
this.btnNextTab=null;
this.contentArea=null;
this.offset=0;
this.imageList=null;
$_Z(this,arguments);
},$wt.widgets,"TabFolder",$wt.widgets.Composite);
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Widget.checkBits(style,128,1024,0,0,0,0);
return style&-769;
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var size=$_U(this,$wt.widgets.TabFolder,"computeSize",[wHint,hHint,changed]);
var width=12;
var height=0;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
var containerWidth=O$.getContainerWidth(this.items[i].handle);
if(containerWidth==d$.body.clientWidth){
if(this.items[i].image!=null){
containerWidth=18;
}else{
containerWidth=0;
}containerWidth+=6+O$.getStringStyledWidth(this.items[i].text,"tab-folder-default",null);
}width+=containerWidth;
if(this.items[i].control!=null){
var s=this.items[i].control.computeSize(wHint,hHint);
height=Math.max(height,s.y);
}}}
}var border=this.getBorderWidth();
width+=border*2;
size.x=Math.max(width,size.x);
size.y=Math.max(height,size.y);
return size;
},"~N,~N,~B");
$_V(c$,"computeTrim",
function(x,y,width,height){
var lineHeight=0;
if(this.items!=null&&this.items.length>0){
lineHeight=Math.max(O$.getContainerHeight(this.items[this.offset].handle),20);
if(this.getSelectionIndex()==this.offset){
lineHeight-=2;
}if(O$.isIE){
lineHeight++;
}else{
if((this.style&1024)!=0){
lineHeight--;
}}x-=4;
y-=4+lineHeight;
}width+=8;
height+=8+lineHeight;
var border=this.getBorderWidth();
x-=border;
y-=border;
width+=border*2;
height+=border*2;
return new $wt.graphics.Rectangle(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"containerHandle",
function(){
return this.contentArea;
});
$_M(c$,"createCSSElement",
function(parent,css){
var el=d$.createElement("DIV");
if(css!=null){
el.className=css;
}if(parent!=null){
(parent).appendChild(el);
}return el;
},"~O,~S");
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var tab=d$.createElement("DIV");
tab.className="tab-item-default";
this.borderFrame.insertBefore(tab,this.itemMore);
O$.removeCSSClass(this.borderFrame,"tab-folder-no-tab");
item.textEl=d$.createElement("SPAN");
tab.appendChild(item.textEl);
item.textEl.appendChild(d$.createTextNode(item.getNameText()));
var width=-2;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<index;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=O$.getContainerWidth(this.items[i].handle);
}}
}if(width<2){
width=2;
}tab.style.left=width+"px";
this.items[index]=item;
this.items[index].handle=tab;
if(count==0){
this.setSelection(0,false);
var event=new $wt.widgets.Event();
event.item=this.items[0];
this.sendEvent(13,event);
}},"$wt.widgets.TabItem,~N");
$_V(c$,"createHandle",
function(){
this.children=new Array(0);
this.items=new Array(0);
var cssName="tab-folder-default";
if((this.style&2048)!=0){
cssName+=" tab-folder-border-default";
}this.handle=this.createCSSElement(this.parent.containerHandle(),cssName);
cssName="tab-folder-no-tab";
if((this.style&1024)!=0){
cssName+=" tab-folder-bottom";
}this.borderFrame=this.createCSSElement(this.handle,cssName);
cssName="tab-folder-border ";
this.itemMore=this.createCSSElement(this.borderFrame,"tab-item-more");
if(O$.isMozilla&&!O$.isFirefox){
this.itemMore.style.bottom="6px";
}var el=this.createCSSElement(this.itemMore,"tab-item-button");
this.btnNextTab=d$.createElement("BUTTON");
el.appendChild(this.btnNextTab);
var arrowRight=this.createCSSElement(this.btnNextTab,"button-arrow-right");
if(((O$.isSafari&&O$.isChrome)||O$.isMozilla)&&!O$.isFirefox){
arrowRight.style.left="-5px";
arrowRight.style.top="0";
}else if(O$.isIE){
arrowRight.style.top="0";
}else if(O$.isSafari){
arrowRight.style.left="-1px";
arrowRight.style.top="1px";
}else if(O$.isOpera){
arrowRight.style.left="-4px";
arrowRight.style.top="0";
}el.onclick=this.btnNextTab.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TabFolder$1")){
$_H();
c$=$_W($wt.widgets,"TabFolder$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.TabFolder"].offset+1>=this.b$["$wt.widgets.TabFolder"].items.length)return;
var w=0;
var ww=O$.getContainerWidth(this.b$["$wt.widgets.TabFolder"].items[this.b$["$wt.widgets.TabFolder"].offset].handle);
var width=this.b$["$wt.widgets.TabFolder"].getSize().x-36;
for(var i=this.b$["$wt.widgets.TabFolder"].offset+1;i<this.b$["$wt.widgets.TabFolder"].items.length;i++){
var x=O$.getContainerWidth(this.b$["$wt.widgets.TabFolder"].items[i].handle);
w+=x;
ww+=x;
if(w>width){
if(i<this.b$["$wt.widgets.TabFolder"].items.length-1){
this.b$["$wt.widgets.TabFolder"].offset++;
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
return;
}}}
if(ww>width){
this.b$["$wt.widgets.TabFolder"].offset++;
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
return;
}});
c$=$_P();
}
return $_N($wt.widgets.TabFolder$1,i$,v$);
})(this,null));
el=this.createCSSElement(this.itemMore,"tab-item-button");
this.btnPrevTab=d$.createElement("BUTTON");
el.appendChild(this.btnPrevTab);
var arrowLeft=this.createCSSElement(this.btnPrevTab,"button-arrow-left");
if(((O$.isSafari&&O$.isChrome)||O$.isMozilla)&&!O$.isFirefox){
arrowLeft.style.left="-6px";
arrowLeft.style.top="0";
}else if(O$.isIE){
arrowLeft.style.top="0";
}else if(O$.isSafari){
arrowLeft.style.left="-3px";
arrowLeft.style.top="1px";
}else if(O$.isOpera){
arrowLeft.style.left="-4px";
arrowLeft.style.top="0";
}el.onclick=this.btnPrevTab.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TabFolder$2")){
$_H();
c$=$_W($wt.widgets,"TabFolder$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.TabFolder"].offset<=0)return;
this.b$["$wt.widgets.TabFolder"].offset--;
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
});
c$=$_P();
}
return $_N($wt.widgets.TabFolder$2,i$,v$);
})(this,null));
this.borderNW=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-nw");
this.borderNE=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-ne");
this.borderSW=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-sw");
this.borderSE=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-se");
this.contentArea=this.createCSSElement(this.handle,"tab-folder-content-area");
this.state&=-3;
});
$_M(c$,"destroyItem",
function(item){
},"$wt.widgets.TabItem");
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
var selectionIndex=this.getSelectionIndex();
if(selectionIndex!=-1){
var ctrl=this.items[selectionIndex].control;
if(ctrl!=null)ctrl.setBounds(this.getClientArea());
this.setSelection(selectionIndex,false);
var ww=0;
if(this.handle.style.width.length>0){
ww=Integer.parseInt(this.handle.style.width);
}if(ww==0){
this.updateSelectionWithWidth(selectionIndex,cx);
}}return $_U(this,$wt.widgets.TabFolder,"SetWindowPos",[hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags]);
},"~O,~O,~N,~N,~N,~N,~N");
$_V(c$,"getClientArea",
function(){
this.forceResize();
var x=4;
var y=4;
var h=this.height-8;
var w=this.width-8;
if(this.items!=null&&this.items.length!=0){
var lineHeight=O$.getContainerHeight(this.items[this.offset].handle);
if(O$.isIE)lineHeight++;
if(this.getSelectionIndex()==this.offset){
lineHeight-=2;
}h-=lineHeight;
if((this.style&1024)==0){
y+=lineHeight;
}else{
if(O$.isIE)h--;
}}var border=this.getBorderWidth();
x+=border;
y+=border;
w-=border*2;
h-=border*2;
return new $wt.graphics.Rectangle(x,y,w,h);
});
$_M(c$,"getItem",
function(index){
return this.items[index];
},"~N");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItems",
function(){
var count=this.getItemCount();
var result=new Array(count);
System.arraycopy(this.items,0,result,0,count);
return result;
});
$_M(c$,"getSelection",
function(){
var index=this.getSelectionIndex();
if(index==-1)return new Array(0);
return[this.items[index]];
});
$_M(c$,"getSelectionIndex",
function(){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&this.items[i].handle!=null&&this.items[i].handle.className!=null&&this.items[i].handle.className.indexOf("selected")!=-1){
return i;
}}
return-1;
});
$_V(c$,"hookSelection",
function(){
});
$_M(c$,"indexOf",
function(item){
var count=this.getItemCount();
for(var i=0;i<count;i++){
if(this.items[i]===item)return i;
}
return-1;
},"$wt.widgets.TabItem");
$_V(c$,"minimumSize",
function(wHint,hHint,flushCache){
var children=this._getChildren();
var width=0;
var height=0;
for(var i=0;i<children.length;i++){
var child=children[i];
var index=0;
var count=this.getItemCount();
while(index<count){
if(this.items[index].control===child)break;
index++;
}
if(index==count){
var rect=child.getBounds();
width=Math.max(width,rect.x+rect.width);
height=Math.max(height,rect.y+rect.height);
}else{
var size=child.computeSize(wHint,hHint,flushCache);
width=Math.max(width,size.x);
height=Math.max(height,size.y);
}}
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"mnemonicHit",
function(key){
var selection=this.getSelectionIndex();
for(var i=0;i<this.items.length;i++){
if(i!=selection){
var item=this.items[i];
if(item!=null){
var ch=this.findMnemonic(item.getText());
if((Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(ch)).charCodeAt(0)){
if(this.setFocus()){
this.setSelection(i,true);
return true;
}}}}}
return false;
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null){
var ch=this.findMnemonic(item.getText());
if((Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(ch)).charCodeAt(0)){
return true;
}}}
return false;
},"~N");
$_M(c$,"releaseHandle",
function(){
if(this.borderNW!=null){
O$.destroyHandle(this.borderNW);
this.borderNW=null;
}if(this.borderNE!=null){
O$.destroyHandle(this.borderNE);
this.borderNE=null;
}if(this.borderSW!=null){
O$.destroyHandle(this.borderSW);
this.borderSW=null;
}if(this.borderSE!=null){
O$.destroyHandle(this.borderSE);
this.borderSE=null;
}if(this.btnPrevTab!=null){
O$.destroyHandle(this.btnPrevTab.parentNode);
O$.destroyHandle(this.btnPrevTab);
this.btnPrevTab=null;
}if(this.btnNextTab!=null){
O$.destroyHandle(this.btnNextTab.parentNode);
O$.destroyHandle(this.btnNextTab);
this.btnNextTab=null;
}if(this.itemMore!=null){
O$.destroyHandle(this.itemMore);
this.itemMore=null;
}if(this.borderFrame!=null){
O$.destroyHandle(this.borderFrame);
this.borderFrame=null;
}if(this.contentArea!=null){
O$.destroyHandle(this.contentArea);
this.contentArea=null;
}$_U(this,$wt.widgets.TabFolder,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
var count=this.getItemCount();
for(var i=0;i<count;i++){
var item=this.items[i];
if(!item.isDisposed())item.releaseResources();
}
this.items=null;
if(this.imageList!=null){
this.display.releaseImageList(this.imageList);
}this.imageList=null;
$_U(this,$wt.widgets.TabFolder,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(control){
$_U(this,$wt.widgets.TabFolder,"removeControl",[control]);
var count=this.getItemCount();
for(var i=0;i<count;i++){
var item=this.items[i];
if(item.control===control)item.setControl(null);
}
},"$wt.widgets.Control");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setSelection",
function(items){
if(items.length==0){
this.setSelection(-1,false);
}else{
for(var i=items.length-1;i>=0;--i){
var index=this.indexOf(items[i]);
if(index!=-1)this.setSelection(index,false);
}
}},"~A");
$_M(c$,"setSelection",
function(index){
var count=this.getItemCount();
if(!(0<=index&&index<count))return;
this.setSelection(index,false);
},"~N");
$_M(c$,"setSelection",
function(index,notify){
var oldIndex=this.getSelectionIndex();
if(oldIndex!=-1&&oldIndex!=index){
var item=this.items[oldIndex];
var control=item.control;
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}}this.updateSelection(index);
var newIndex=index;
if(oldIndex==index){
newIndex=-1;
}if(newIndex!=-1){
var item=this.items[newIndex];
var control=item.control;
if(control!=null&&!control.isDisposed()){
control.setBounds(this.getClientArea());
control.setVisible(true);
}if(notify){
var event=new $wt.widgets.Event();
event.item=item;
this.sendEvent(13,event);
}}},"~N,~B");
$_V(c$,"_updateOrientation",
function(){
if((this.style&67108864)!=0){
this.handle.style.direction="ltr";
}else if(this.parent!=null&&(this.parent.style&67108864)!=0){
this.handle.style.direction="ltr";
}});
$_M(c$,"updateSelection",
function(index){
this.updateSelectionWithWidth(index,-1);
},"~N");
$_M(c$,"updateSelectionWithWidth",
function(index,prefWidth){
var key="tab-item-selected";
for(var i=0;i<this.offset;i++){
if(i!=index&&this.items[i].control!=null){
this.items[i].control.setVisible(false);
}if(index>=this.offset){
O$.removeCSSClass(this.items[i].handle,key);
}}
if(this.items[index]!=null){
var left=-2;
var x=2;
for(var i=this.offset;i<this.items.length;i++){
if("" + this.items[i].handle.style.zIndex === "-1"){
this.items[i].handle.style.display="";
}this.items[i].handle.style.zIndex=(i+1)+"";
O$.removeCSSClass(this.items[i].handle,key);
var w=O$.getContainerWidth(this.items[i].handle);
if(i<index){
left+=w;
}var s=this.items[i].handle.style;
if(i==index){
x-=2;
}s.left=x+"px";
x+=w;
}
var ww=0;
if(this.handle.style.width.length>0){
ww=Integer.parseInt(this.handle.style.width);
}if(prefWidth!=-1&&ww==0){
ww=prefWidth;
}if(ww>0){
O$.updateCSSClass(this.borderFrame,"tab-show-more-item",x>ww||this.offset!=0);
}O$.addCSSClass(this.items[index].handle,key);
this.items[index].handle.style.zIndex=((index>=this.offset)?this.items.length+1:-1)+"";
if(index<this.offset){
this.items[index].handle.style.display="none";
}else{
this.items[index].handle.style.display="";
}if(this.width!=0){
var w=O$.getContainerWidth(this.items[index].handle);
left+=4;
var y=(this.width-left-((this.style&2048)!=0?4:0));
if(index>=this.offset){
y-=w;
}if(y<0){
y=0;
}if(left<2){
left=2;
}if((this.style&1024)!=0){
this.borderSW.style.width=(left-2)+"px";
this.borderSE.style.width=y+"px";
}else{
this.borderNW.style.width=(left-2)+"px";
this.borderNE.style.width=y+"px";
}}}},"~N,~N");
$_V(c$,"traversePage",
function(next){
var count=this.getItemCount();
if(count<=1)return false;
var index=this.getSelectionIndex();
if(index==-1){
index=0;
}else{
var offset=(next)?1:-1;
index=(index+offset+count)%count;
}this.setSelection(index,true);
return index==this.getSelectionIndex();
},"~B");
});
