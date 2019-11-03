$_L(null,"$wt.widgets.HTMLSource",["$wt.events.SelectionAdapter","$wt.internal.browser.OS","$wt.layout.GridData","$.GridLayout","$wt.widgets.Button","$.Label","$.Shell","$.Text"],function(){
c$=$_T($wt.widgets,"HTMLSource");
$_M(c$,"exportSource",
function(objShell,onlyContent){
var shell=new $wt.widgets.Shell(objShell.display,66800);
var c=null;
if(onlyContent){
shell.setText("Shell Content's HTML Source");
c=objShell.contentHandle.innerHTML;
}else{
shell.setText("Shell's HTML Source");
c=objShell.handle.innerHTML;
}if(O$.isIE){
c=c.replace(/(<\/?)(\w+)(\s|>)/ig,function($0,$1,$2,$3){
return $1+$2.toLowerCase()+$3;
}).replace(/(style\s*=\s*")([^"]+)(")/ig,function($0,$1,$2,$3){
if(!((/;$/).test($2))){
$2+=";";
}
return"style=\""+$2.toLowerCase().replace(/(:|;)\s+/g,"$1")+"\"";
}).replace(/(\s+(\w+)\s*=\s*)([^\"\s>]+)(\s|>)/ig,function($0,$1,$2,$3,$4){
return" "+$2+"=\""+$3+"\""+$4;



});
}else{
c=c.replace(/(style\s*=\s*")([^"]+)(")/ig,function($0,$1,$2,$3){
return"style=\""+$2.replace(/(:|;)\s+/g,"$1")+"\"";
});
}{
c=c.replace(/(\sclass\s*=\s*)"([^"]*)"(\s|>)/ig,function($0,$1,$2,$3){
$2=$2.replace(/\s\s+/g,' ').replace (/^\s+/, '').replace (/\s+$/g, '');
if($2.length==0){
if($3!=">"){
return $3;
}else{
return">";
}
}else{
return" class=\""+$2+"\""+$3;
}
});
}shell.setLayout(new $wt.layout.GridLayout());
var text=new $wt.widgets.Text(shell,2570);
var font=null;
{
font=new $wt.graphics.Font($wt.widgets.Display.getCurrent(),new $wt.graphics.FontData("Courier New",10,0));
}text.setFont(font);
var gd=new $wt.layout.GridData(1808);
var str="0123456789";
str+=str;
str+=str;
str+=str;
var defaultSize=O$.getStringStyledSize(str,null,"font-size:10pt;font-family:monospace,Arial,sans-serif;");
gd.widthHint=defaultSize.x;
gd.heightHint=defaultSize.y*25;
text.setLayoutData(gd);
var rect=objShell.getClientArea();
var html=null;
if(onlyContent){
html="<div class=\"shell-content\" style=\"width:"+rect.width+"px;height:"+rect.height+"px;\">"+c+"</div>";
}else{
var cssText=objShell.handle.style.cssText;
if(cssText!=null&&cssText.trim().length!=0){
cssText=cssText.replace(/([;\s]*)(top|left|right|bottom)\s*:\s*[^;"']*([;"'])/i,"$3").replace(/([;\s]*)(top|left|right|bottom)\s*:\s*[^;"']*([;"'])/i,"$3");
}html="<div class=\""+objShell.handle.className+"\""+((cssText!=null&&cssText.trim().length!=0)?" style=\""+cssText+"\"":"")+">"+c+"</div>";
}text.setText(html);
new $wt.widgets.Label(shell,258).setLayoutData(new $wt.layout.GridData(768));
var button=new $wt.widgets.Button(shell,8);
button.setText("&OK");
var gridData=new $wt.layout.GridData(128);
gridData.widthHint=80;
button.setLayoutData(gridData);
button.addSelectionListener((($_D("$wt.widgets.HTMLSource$1")?0:org.eclipse.swt.widgets.HTMLSource.$HTMLSource$1$()),$_N($wt.widgets.HTMLSource$1,this,$_F("shell",shell))));
shell.pack();
shell.open();
Sync2Async.block(shell,this,function(){
});
return;
},"$wt.widgets.Shell,~B");
c$.$HTMLSource$1$=function(){
$_H();
c$=$_W($wt.widgets,"HTMLSource$1",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.f$.shell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
};
});
