$_L(["$wt.widgets.Dialog"],"$wt.widgets.FontDialog",["$wt.events.ModifyListener","$.SelectionAdapter","$wt.graphics.Color","$.Font","$.FontData","$.RGB","$wt.layout.GridData","$.GridLayout","$wt.widgets.Button","$.Combo","$.Composite","$.Group","$.Label","$.List","$.Shell","$.Text"],function(){
c$=$_C(function(){
this.fontData=null;
this.returnFD=null;
this.rgb=null;
this.familyText=null;
this.styleText=null;
this.sizeText=null;
this.familyList=null;
this.styleList=null;
this.sizeList=null;
this.previewLabel=null;
this.lastFont=null;
this.strikeButton=null;
this.underlineButton=null;
this.colorCombo=null;
this.lastPreviewLabel=null;
$_Z(this,arguments);
},$wt.widgets,"FontDialog",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.FontDialog,[parent,style]);
},"$wt.widgets.Shell,~N");
$_M(c$,"getFontData",
function(){
return this.fontData;
});
$_M(c$,"getFontList",
function(){
if(this.fontData==null)return null;
var result=new Array(1);
result[0]=this.fontData;
return result;
});
$_M(c$,"getRGB",
function(){
return this.rgb;
});
$_M(c$,"updatePreviewFontData",
function(){
if(this.fontData.getName()==null)return;
var font=this.previewLabel.getFont();
var font2=new $wt.graphics.Font(this.dialogShell.getDisplay(),this.fontData);
this.previewLabel.setFont(font2);
this.previewLabel.getParent().layout();
if(font!=null&&font===this.lastFont){
this.lastFont.dispose();
}this.lastFont=font2;
});
$_M(c$,"open",
function(){
this.returnFD=null;
this.dialogShell=new $wt.widgets.Shell(this.parent.display,this.style|64|65536);
this.dialogShell.setText("Font");
var gl=new $wt.layout.GridLayout();
this.dialogShell.setLayout(gl);
var fontPicker=new $wt.widgets.Composite(this.dialogShell,0);
fontPicker.setLayoutData(new $wt.layout.GridData(768));
var grid=new $wt.layout.GridLayout(4,false);
grid.verticalSpacing=1;
grid.horizontalSpacing=8;
fontPicker.setLayout(grid);
var familyLabel=new $wt.widgets.Label(fontPicker,0);
var gdLabel=new $wt.layout.GridData();
gdLabel.heightHint=20;
familyLabel.setLayoutData(gdLabel);
familyLabel.setText("&Font:");
new $wt.widgets.Label(fontPicker,0).setText("Font st&yle:");
new $wt.widgets.Label(fontPicker,0).setText("&Size:");
var buttonsPanel=new $wt.widgets.Composite(fontPicker,0);
var gdButtons=new $wt.layout.GridData(768);
gdButtons.verticalSpan=3;
gdButtons.verticalAlignment=1;
new $wt.widgets.Label(buttonsPanel,0);
buttonsPanel.setLayoutData(gdButtons);
var gridLayout=new $wt.layout.GridLayout(1,true);
gridLayout.verticalSpacing=2;
gridLayout.horizontalSpacing=0;
gridLayout.marginWidth=0;
buttonsPanel.setLayout(gridLayout);
var okButton=new $wt.widgets.Button(buttonsPanel,8);
okButton.setText("OK");
var gridData=new $wt.layout.GridData(72,21);
gridData.verticalIndent=1;
okButton.setLayoutData(gridData);
okButton.addSelectionListener((($_D("$wt.widgets.FontDialog$1")?0:org.eclipse.swt.widgets.FontDialog.$FontDialog$1$()),$_N($wt.widgets.FontDialog$1,this,null)));
var cancelButton=new $wt.widgets.Button(buttonsPanel,8);
cancelButton.setText("Cancel");
cancelButton.setLayoutData(gridData);
cancelButton.addSelectionListener((($_D("$wt.widgets.FontDialog$2")?0:org.eclipse.swt.widgets.FontDialog.$FontDialog$2$()),$_N($wt.widgets.FontDialog$2,this,null)));
this.familyText=new $wt.widgets.Text(fontPicker,2052);
this.familyText.setLayoutData(new $wt.layout.GridData(768));
this.familyText.addModifyListener((($_D("$wt.widgets.FontDialog$3")?0:org.eclipse.swt.widgets.FontDialog.$FontDialog$3$()),$_N($wt.widgets.FontDialog$3,this,null)));
this.styleText=new $wt.widgets.Text(fontPicker,2052);
this.styleText.setLayoutData(new $wt.layout.GridData(768));
this.styleText.addModifyListener((($_D("$wt.widgets.FontDialog$4")?0:org.eclipse.swt.widgets.FontDialog.$FontDialog$4$()),$_N($wt.widgets.FontDialog$4,this,null)));
this.sizeText=new $wt.widgets.Text(fontPicker,2052);
var gd=new $wt.layout.GridData();
gd.widthHint=48;
this.sizeText.setLayoutData(gd);
this.sizeText.addModifyListener((($_D("$wt.widgets.FontDialog$5")?0:org.eclipse.swt.widgets.FontDialog.$FontDialog$5$()),$_N($wt.widgets.FontDialog$5,this,null)));
this.familyList=new $wt.widgets.List(fontPicker,2624);
this.familyList.addSelectionListener((($_D("$wt.widgets.FontDialog$6")?0:org.eclipse.swt.widgets.FontDialog.$FontDialog$6$()),$_N($wt.widgets.FontDialog$6,this,null)));
var gdList=new $wt.layout.GridData(768);
gdList.heightHint=80;
gdList.widthHint=120;
this.familyList.setLayoutData(gdList);
var familyNames=new Array($wt.widgets.FontDialog.fontFamilies.length);
for(var i=0;i<familyNames.length;i++){
familyNames[i]=$wt.widgets.FontDialog.fontFamilies[i].name;
}
this.familyList.setItems(familyNames);
this.styleList=new $wt.widgets.List(fontPicker,2564);
this.styleList.addSelectionListener((($_D("$wt.widgets.FontDialog$7")?0:org.eclipse.swt.widgets.FontDialog.$FontDialog$7$()),$_N($wt.widgets.FontDialog$7,this,null)));
gdList=new $wt.layout.GridData(1808);
gdList.widthHint=90;
this.styleList.setLayoutData(gdList);
var styles=["Regular","Italic","Bold","Bold Italic"];
this.styleList.setItems(styles);
this.sizeList=new $wt.widgets.List(fontPicker,2624);
this.sizeList.addSelectionListener((($_D("$wt.widgets.FontDialog$8")?0:org.eclipse.swt.widgets.FontDialog.$FontDialog$8$()),$_N($wt.widgets.FontDialog$8,this,null)));
gdList=new $wt.layout.GridData(1808);
gdList.heightHint=80;
this.sizeList.setLayoutData(gdList);
this.sizeList.setItems(["8","9","10","11","12","14","16","18","20","22","24","26","28","36","48","72"]);
if(this.fontData==null){
this.fontData=new $wt.graphics.FontData();
this.fontData.setStyle(0);
this.fontData.setHeight(10);
}var heightStr=""+this.fontData.getHeight();
this.sizeList.setSelection([heightStr]);
var effectGroup=new $wt.widgets.Group(fontPicker,0);
effectGroup.setText("Effects");
effectGroup.setLayout(new $wt.layout.GridLayout());
var gdEffect=new $wt.layout.GridData(1810);
gdEffect.verticalIndent=17;
effectGroup.setLayoutData(gdEffect);
this.strikeButton=new $wt.widgets.Button(effectGroup,32);
this.strikeButton.setText("Stri&keout");
this.strikeButton.addSelectionListener((($_D("$wt.widgets.FontDialog$9")?0:org.eclipse.swt.widgets.FontDialog.$FontDialog$9$()),$_N($wt.widgets.FontDialog$9,this,null)));
this.underlineButton=new $wt.widgets.Button(effectGroup,32);
this.underlineButton.setText("&Underline");
this.underlineButton.addSelectionListener((($_D("$wt.widgets.FontDialog$10")?0:org.eclipse.swt.widgets.FontDialog.$FontDialog$10$()),$_N($wt.widgets.FontDialog$10,this,null)));
new $wt.widgets.Label(effectGroup,0).setText("&Color:");
this.colorCombo=new $wt.widgets.Combo(effectGroup,12);
var colorNames=["Black","Dark Red","Green","Silver","Olive","Navy","Purple","Aqua","Gray","Red","Light Green","Yellow","Blue","Pink","Light Blue","White"];
this.colorCombo.setItems(colorNames);
this.colorCombo.setLayoutData(new $wt.layout.GridData(768));
var ssPanel=new $wt.widgets.Composite(fontPicker,0);
ssPanel.setLayout(new $wt.layout.GridLayout());
var gdCross=new $wt.layout.GridData(768);
gdCross.horizontalSpan=2;
ssPanel.setLayoutData(gdCross);
var sampleGroup=new $wt.widgets.Group(ssPanel,0);
sampleGroup.setLayout(new $wt.layout.GridLayout());
var gdSample=new $wt.layout.GridData(768);
gdSample.verticalIndent=12;
sampleGroup.setLayoutData(gdSample);
sampleGroup.setText("Sample");
var previewComposite=new $wt.widgets.Composite(sampleGroup,2048);
var gdPreview=new $wt.layout.GridData(1808);
gdPreview.heightHint=36;
previewComposite.setLayoutData(gdPreview);
var glPreview=new $wt.layout.GridLayout();
glPreview.marginWidth=0;
glPreview.verticalSpacing=0;
previewComposite.setLayout(glPreview);
this.previewLabel=new $wt.widgets.Label(previewComposite,0);
var ggg=new $wt.layout.GridData(1808);
ggg.grabExcessVerticalSpace=true;
ggg.verticalAlignment=2;
ggg.grabExcessHorizontalSpace=true;
ggg.horizontalAlignment=2;
this.previewLabel.setLayoutData(ggg);
this.previewLabel.setText("AaBbYyZz");
new $wt.widgets.Label(ssPanel,0).setText("Sc&ript");
var scriptCombo=new $wt.widgets.Combo(ssPanel,12);
scriptCombo.setItems(["Western"]);
scriptCombo.select(0);
scriptCombo.setLayoutData(new $wt.layout.GridData(768));
this.colorCombo.addSelectionListener((($_D("$wt.widgets.FontDialog$11")?0:org.eclipse.swt.widgets.FontDialog.$FontDialog$11$()),$_N($wt.widgets.FontDialog$11,this,null)));
var idx=0;
var style=this.fontData.getStyle();
if((style&1)!=0&&(style&2)!=0){
idx=3;
}else if((style&1)!=0){
idx=2;
}else if((style&2)!=0){
idx=1;
}this.styleList.setSelection(idx);
this.styleText.setText(styles[idx]);
this.familyList.setSelection([this.fontData.getName()]);
this.familyText.setText(this.fontData.getName());
this.sizeText.setText(""+this.fontData.getHeight());
this.strikeButton.setSelection(this.fontData.isStrikeout);
this.underlineButton.setSelection(this.fontData.isUnderline);
var rgb=this.rgb;
if(rgb==null){
rgb=new $wt.graphics.RGB(0,0,0);
}for(var i=0;i<Math.floor($wt.widgets.FontDialog.simpleColors.length/3);i++){
var i3=i+i+i;
if($wt.widgets.FontDialog.simpleColors[i3]==rgb.red&&$wt.widgets.FontDialog.simpleColors[i3+1]==rgb.green&&$wt.widgets.FontDialog.simpleColors[i3+2]==rgb.blue){
this.colorCombo.select(i);
break;
}}
this.dialogShell.pack();
this.dialogShell.open();
Sync2Async.block(this.dialogShell,this,function(){
{
this.dialogReturn=this.returnFD;
}return this.returnFD;
});
return;
});
$_M(c$,"setFontData",
function(fontData){
this.fontData=fontData;
},"$wt.graphics.FontData");
$_M(c$,"setFontList",
function(fontData){
if(fontData!=null&&fontData.length>0){
this.fontData=fontData[0];
}else{
this.fontData=null;
}},"~A");
$_M(c$,"setRGB",
function(rgb){
this.rgb=rgb;
},"$wt.graphics.RGB");
c$.$FontDialog$1$=function(){
$_H();
c$=$_W($wt.widgets,"FontDialog$1",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.b$["$wt.widgets.FontDialog"].returnFD=this.b$["$wt.widgets.FontDialog"].fontData;
this.b$["$wt.widgets.FontDialog"].dialogShell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
};
c$.$FontDialog$2$=function(){
$_H();
c$=$_W($wt.widgets,"FontDialog$2",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.b$["$wt.widgets.FontDialog"].returnFD=this.b$["$wt.widgets.FontDialog"].fontData=null;
this.b$["$wt.widgets.FontDialog"].dialogShell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
};
c$.$FontDialog$3$=function(){
$_H();
c$=$_W($wt.widgets,"FontDialog$3",null,$wt.events.ModifyListener);
$_V(c$,"modifyText",
function(e){
var family=this.b$["$wt.widgets.FontDialog"].familyText.getText();
if(family==null)return;
var existed=false;
for(var i=0;i<$wt.widgets.FontDialog.fontFamilies.length;i++){
if(family.equals($wt.widgets.FontDialog.fontFamilies[i].name)){
var label=$wt.widgets.FontDialog.fontFamilies[i].previewLabel;
if(label==null){
if(this.b$["$wt.widgets.FontDialog"].lastPreviewLabel==null||!this.b$["$wt.widgets.FontDialog"].lastPreviewLabel.equals("AaBbYyZz")){
this.b$["$wt.widgets.FontDialog"].lastPreviewLabel="AaBbYyZz";
this.b$["$wt.widgets.FontDialog"].previewLabel.setText(this.b$["$wt.widgets.FontDialog"].lastPreviewLabel);
}}else{
if(this.b$["$wt.widgets.FontDialog"].lastPreviewLabel==null||!this.b$["$wt.widgets.FontDialog"].lastPreviewLabel.equals(label)){
this.b$["$wt.widgets.FontDialog"].lastPreviewLabel=label;
this.b$["$wt.widgets.FontDialog"].previewLabel.setText(label);
}}existed=true;
break;
}}
if(!existed)return;
var selection=this.b$["$wt.widgets.FontDialog"].familyList.getSelection();
if(selection==null||selection.length==0||!family.equals(selection[0])){
this.b$["$wt.widgets.FontDialog"].familyList.setSelection([family]);
this.b$["$wt.widgets.FontDialog"].updatePreviewFontData();
}},"$wt.events.ModifyEvent");
c$=$_P();
};
c$.$FontDialog$4$=function(){
$_H();
c$=$_W($wt.widgets,"FontDialog$4",null,$wt.events.ModifyListener);
$_V(c$,"modifyText",
function(e){
var style=this.b$["$wt.widgets.FontDialog"].styleText.getText();
if(style==null)return;
var items=this.b$["$wt.widgets.FontDialog"].styleList.getItems();
var existed=false;
for(var i=0;i<items.length;i++){
if(items[i].equals(style)){
existed=true;
break;
}}
if(!existed)return;
var selection=this.b$["$wt.widgets.FontDialog"].styleList.getSelection();
if(selection==null||selection.length==0||!style.equals(selection[0])){
this.b$["$wt.widgets.FontDialog"].styleList.setSelection([style]);
this.b$["$wt.widgets.FontDialog"].updatePreviewFontData();
}},"$wt.events.ModifyEvent");
c$=$_P();
};
c$.$FontDialog$5$=function(){
$_H();
c$=$_W($wt.widgets,"FontDialog$5",null,$wt.events.ModifyListener);
$_V(c$,"modifyText",
function(e){
var size=this.b$["$wt.widgets.FontDialog"].sizeText.getText();
if(size==null)return;
var selection=this.b$["$wt.widgets.FontDialog"].sizeList.getSelection();
if(selection==null||selection.length==0||!size.equals(selection[0])){
this.b$["$wt.widgets.FontDialog"].sizeList.setSelection([size]);
}this.b$["$wt.widgets.FontDialog"].updatePreviewFontData();
},"$wt.events.ModifyEvent");
c$=$_P();
};
c$.$FontDialog$6$=function(){
$_H();
c$=$_W($wt.widgets,"FontDialog$6",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
var family=this.b$["$wt.widgets.FontDialog"].familyList.getSelection()[0];
this.b$["$wt.widgets.FontDialog"].familyText.setText(family);
this.b$["$wt.widgets.FontDialog"].fontData.setName(family);
this.b$["$wt.widgets.FontDialog"].updatePreviewFontData();
},"$wt.events.SelectionEvent");
c$=$_P();
};
c$.$FontDialog$7$=function(){
$_H();
c$=$_W($wt.widgets,"FontDialog$7",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.b$["$wt.widgets.FontDialog"].styleText.setText(this.b$["$wt.widgets.FontDialog"].styleList.getSelection()[0]);
var index=this.b$["$wt.widgets.FontDialog"].styleList.getSelectionIndex();
if(index==1){
this.b$["$wt.widgets.FontDialog"].fontData.setStyle(2);
}else if(index==2){
this.b$["$wt.widgets.FontDialog"].fontData.setStyle(1);
}else if(index==3){
this.b$["$wt.widgets.FontDialog"].fontData.setStyle(3);
}else{
this.b$["$wt.widgets.FontDialog"].fontData.setStyle(0);
}this.b$["$wt.widgets.FontDialog"].updatePreviewFontData();
},"$wt.events.SelectionEvent");
c$=$_P();
};
c$.$FontDialog$8$=function(){
$_H();
c$=$_W($wt.widgets,"FontDialog$8",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.b$["$wt.widgets.FontDialog"].sizeText.setText(this.b$["$wt.widgets.FontDialog"].sizeList.getSelection()[0]);
var size=-1;
try{
size=Integer.parseInt(this.b$["$wt.widgets.FontDialog"].sizeList.getSelection()[0]);
}catch(e1){
if($_O(e1,NumberFormatException)){
e1.printStackTrace();
}else{
throw e1;
}
}
if(size!=-1){
this.b$["$wt.widgets.FontDialog"].fontData.setHeight(size);
this.b$["$wt.widgets.FontDialog"].updatePreviewFontData();
}},"$wt.events.SelectionEvent");
c$=$_P();
};
c$.$FontDialog$9$=function(){
$_H();
c$=$_W($wt.widgets,"FontDialog$9",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
var fd=this.b$["$wt.widgets.FontDialog"].fontData;
fd.isStrikeout=(e.widget).getSelection();
this.b$["$wt.widgets.FontDialog"].updatePreviewFontData();
},"$wt.events.SelectionEvent");
c$=$_P();
};
c$.$FontDialog$10$=function(){
$_H();
c$=$_W($wt.widgets,"FontDialog$10",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
var fd=this.b$["$wt.widgets.FontDialog"].fontData;
fd.isUnderline=(e.widget).getSelection();
this.b$["$wt.widgets.FontDialog"].updatePreviewFontData();
},"$wt.events.SelectionEvent");
c$=$_P();
};
c$.$FontDialog$11$=function(){
$_H();
c$=$_W($wt.widgets,"FontDialog$11",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
var index=this.b$["$wt.widgets.FontDialog"].colorCombo.getSelectionIndex();
var i3=index+index+index;
this.b$["$wt.widgets.FontDialog"].rgb=new $wt.graphics.RGB($wt.widgets.FontDialog.simpleColors[i3],$wt.widgets.FontDialog.simpleColors[i3+1],$wt.widgets.FontDialog.simpleColors[i3+2]);
this.b$["$wt.widgets.FontDialog"].previewLabel.setForeground(new $wt.graphics.Color(e.display,this.b$["$wt.widgets.FontDialog"].rgb));
},"$wt.events.SelectionEvent");
c$=$_P();
};
$_H();
c$=$_C(function(){
this.name=null;
this.previewLabel=null;
this.scripts=null;
$_Z(this,arguments);
},$wt.widgets.FontDialog,"FontFamily");
$_K(c$,
function(a){
this.name=a;
},"~S");
$_K(c$,
function(a,b){
this.name=a;
this.previewLabel=b;
},"~S,~S");
$_K(c$,
function(a,b,c){
this.name=a;
this.previewLabel=b;
this.scripts=c;
},"~S,~S,~A");
c$=$_P();
c$.fontFamilies=c$.prototype.fontFamilies=[new $wt.widgets.FontDialog.FontFamily("Arial"),new $wt.widgets.FontDialog.FontFamily("Arial Baltic"),new $wt.widgets.FontDialog.FontFamily("Arial Black"),new $wt.widgets.FontDialog.FontFamily("Arial CE"),new $wt.widgets.FontDialog.FontFamily("Arial CYR"),new $wt.widgets.FontDialog.FontFamily("Arial Greek"),new $wt.widgets.FontDialog.FontFamily("Arial Narrow"),new $wt.widgets.FontDialog.FontFamily("Arial TUR"),new $wt.widgets.FontDialog.FontFamily("Basemic"),new $wt.widgets.FontDialog.FontFamily("Basemic Symbol"),new $wt.widgets.FontDialog.FontFamily("Basemic Times"),new $wt.widgets.FontDialog.FontFamily("Batang"),new $wt.widgets.FontDialog.FontFamily("BatangChe"),new $wt.widgets.FontDialog.FontFamily("Berling Antiqua"),new $wt.widgets.FontDialog.FontFamily("Book Antiqua"),new $wt.widgets.FontDialog.FontFamily("Bookdings"),new $wt.widgets.FontDialog.FontFamily("Bookman Old Style"),new $wt.widgets.FontDialog.FontFamily("Century"),new $wt.widgets.FontDialog.FontFamily("Century Gothic"),new $wt.widgets.FontDialog.FontFamily("Comic Sans MS"),new $wt.widgets.FontDialog.FontFamily("Courier"),new $wt.widgets.FontDialog.FontFamily("Courier New"),new $wt.widgets.FontDialog.FontFamily("Courier New Baltic"),new $wt.widgets.FontDialog.FontFamily("Courier New CE"),new $wt.widgets.FontDialog.FontFamily("Courier New CYR"),new $wt.widgets.FontDialog.FontFamily("Courier New Greek"),new $wt.widgets.FontDialog.FontFamily("Courier New TUR"),new $wt.widgets.FontDialog.FontFamily("Dotum"),new $wt.widgets.FontDialog.FontFamily("DotumChe"),new $wt.widgets.FontDialog.FontFamily("Estrangelo Edessa"),new $wt.widgets.FontDialog.FontFamily("Euclid"),new $wt.widgets.FontDialog.FontFamily("Euclid Extra"),new $wt.widgets.FontDialog.FontFamily("Euclid Fraktur"),new $wt.widgets.FontDialog.FontFamily("Euclid Math One"),new $wt.widgets.FontDialog.FontFamily("Euclid Math Two"),new $wt.widgets.FontDialog.FontFamily("Euclid Symbol"),new $wt.widgets.FontDialog.FontFamily("Fixedsys"),new $wt.widgets.FontDialog.FontFamily("Franklin Gothic Medium"),new $wt.widgets.FontDialog.FontFamily("Frutiger Linotype"),new $wt.widgets.FontDialog.FontFamily("Garamond"),new $wt.widgets.FontDialog.FontFamily("Gautami"),new $wt.widgets.FontDialog.FontFamily("Georgia"),new $wt.widgets.FontDialog.FontFamily("Gulim"),new $wt.widgets.FontDialog.FontFamily("GulimChe"),new $wt.widgets.FontDialog.FontFamily("Gungsuh"),new $wt.widgets.FontDialog.FontFamily("GungsuhChe"),new $wt.widgets.FontDialog.FontFamily("Haettenschweiler"),new $wt.widgets.FontDialog.FontFamily("Impact"),new $wt.widgets.FontDialog.FontFamily("Kingsoft Phonetic Plain"),new $wt.widgets.FontDialog.FontFamily("LCD"),new $wt.widgets.FontDialog.FontFamily("Latha"),new $wt.widgets.FontDialog.FontFamily("Lucida Console"),new $wt.widgets.FontDialog.FontFamily("Lucida Sans Typewriter"),new $wt.widgets.FontDialog.FontFamily("Lucida Sans Unicode"),new $wt.widgets.FontDialog.FontFamily("MS Gothic"),new $wt.widgets.FontDialog.FontFamily("MS Mincho"),new $wt.widgets.FontDialog.FontFamily("MS Outlook"),new $wt.widgets.FontDialog.FontFamily("MS PGothic"),new $wt.widgets.FontDialog.FontFamily("MS PMincho"),new $wt.widgets.FontDialog.FontFamily("MS Sans Serif"),new $wt.widgets.FontDialog.FontFamily("MS Serif"),new $wt.widgets.FontDialog.FontFamily("MS UI Gothic"),new $wt.widgets.FontDialog.FontFamily("MV Boli"),new $wt.widgets.FontDialog.FontFamily("Mangal"),new $wt.widgets.FontDialog.FontFamily("Map Symbols"),new $wt.widgets.FontDialog.FontFamily("MapInfo Cartographic"),new $wt.widgets.FontDialog.FontFamily("Marlett"),new $wt.widgets.FontDialog.FontFamily("Math1"),new $wt.widgets.FontDialog.FontFamily("Math1Mono"),new $wt.widgets.FontDialog.FontFamily("Math2"),new $wt.widgets.FontDialog.FontFamily("Math2Mono"),new $wt.widgets.FontDialog.FontFamily("Math3"),new $wt.widgets.FontDialog.FontFamily("Math3Mono"),new $wt.widgets.FontDialog.FontFamily("Math4"),new $wt.widgets.FontDialog.FontFamily("Math4Mono"),new $wt.widgets.FontDialog.FontFamily("Math5"),new $wt.widgets.FontDialog.FontFamily("Math5Mono"),new $wt.widgets.FontDialog.FontFamily("Microsoft Sans Serif"),new $wt.widgets.FontDialog.FontFamily("MingLiU"),new $wt.widgets.FontDialog.FontFamily("Modern"),new $wt.widgets.FontDialog.FontFamily("Monotype Corsiva"),new $wt.widgets.FontDialog.FontFamily("PMingLiU"),new $wt.widgets.FontDialog.FontFamily("Palatino Linotype"),new $wt.widgets.FontDialog.FontFamily("Raavi"),new $wt.widgets.FontDialog.FontFamily("Roman"),new $wt.widgets.FontDialog.FontFamily("SPSS Marker Set"),new $wt.widgets.FontDialog.FontFamily("Script"),new $wt.widgets.FontDialog.FontFamily("Shruti"),new $wt.widgets.FontDialog.FontFamily("Small Fonts"),new $wt.widgets.FontDialog.FontFamily("Sydnie"),new $wt.widgets.FontDialog.FontFamily("Sylfaen"),new $wt.widgets.FontDialog.FontFamily("Symbol"),new $wt.widgets.FontDialog.FontFamily("System"),new $wt.widgets.FontDialog.FontFamily("Tahoma"),new $wt.widgets.FontDialog.FontFamily("Terminal"),new $wt.widgets.FontDialog.FontFamily("Times New Roman"),new $wt.widgets.FontDialog.FontFamily("Times New Roman Baltic"),new $wt.widgets.FontDialog.FontFamily("Times New Roman CE"),new $wt.widgets.FontDialog.FontFamily("Times New Roman CYR"),new $wt.widgets.FontDialog.FontFamily("Times New Roman Greek"),new $wt.widgets.FontDialog.FontFamily("Times New Roman TUR"),new $wt.widgets.FontDialog.FontFamily("Trebuchet MS"),new $wt.widgets.FontDialog.FontFamily("Tunga"),new $wt.widgets.FontDialog.FontFamily("Verdana"),new $wt.widgets.FontDialog.FontFamily("WST_Czec"),new $wt.widgets.FontDialog.FontFamily("WST_Engl"),new $wt.widgets.FontDialog.FontFamily("WST_Fren"),new $wt.widgets.FontDialog.FontFamily("WST_Germ"),new $wt.widgets.FontDialog.FontFamily("WST_Ital"),new $wt.widgets.FontDialog.FontFamily("WST_Span"),new $wt.widgets.FontDialog.FontFamily("WST_Swed"),new $wt.widgets.FontDialog.FontFamily("Warnock Pro"),new $wt.widgets.FontDialog.FontFamily("Warnock Pro Caption"),new $wt.widgets.FontDialog.FontFamily("Warnock Pro Display"),new $wt.widgets.FontDialog.FontFamily("Warnock Pro Light"),new $wt.widgets.FontDialog.FontFamily("Warnock Pro Light Caption"),new $wt.widgets.FontDialog.FontFamily("Warnock Pro Light Display"),new $wt.widgets.FontDialog.FontFamily("Warnock Pro Light Subhead"),new $wt.widgets.FontDialog.FontFamily("Warnock Pro SmBd"),new $wt.widgets.FontDialog.FontFamily("Warnock Pro SmBd Caption"),new $wt.widgets.FontDialog.FontFamily("Warnock Pro SmBd Display"),new $wt.widgets.FontDialog.FontFamily("Warnock Pro SmBd Subhead"),new $wt.widgets.FontDialog.FontFamily("Warnock Pro Subhead"),new $wt.widgets.FontDialog.FontFamily("Webdings"),new $wt.widgets.FontDialog.FontFamily("Wingdings"),new $wt.widgets.FontDialog.FontFamily("Wingdings 2"),new $wt.widgets.FontDialog.FontFamily("Wingdings 3"),new $wt.widgets.FontDialog.FontFamily("ZWAdobeF")];
$_S(c$,
"simpleColors",[0,0,0,128,0,0,0,128,0,192,192,192,128,128,0,0,0,128,128,0,128,0,255,255,128,128,128,255,0,0,0,255,64,255,255,0,0,0,255,255,128,255,173,216,230,255,255,255]);
});
