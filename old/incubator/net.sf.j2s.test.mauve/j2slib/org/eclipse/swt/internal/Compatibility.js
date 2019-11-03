$_L(null,"$wt.internal.Compatibility",["java.io.FileInputStream","$.FileOutputStream","$.IOException","java.lang.Character","$.Runtime","$.Thread","java.text.MessageFormat","java.util.ResourceBundle"],function(){
c$=$_T($wt.internal,"Compatibility");
c$.cos=$_M(c$,"cos",
function(angle,length){
return Math.round((Math.cos(angle*$wt.internal.Compatibility.toRadians)*length));
},"~N,~N");
c$.sin=$_M(c$,"sin",
function(angle,length){
return Math.round((Math.sin(angle*$wt.internal.Compatibility.toRadians)*length));
},"~N,~N");
c$.ceil=$_M(c$,"ceil",
function(p,q){
return Math.round(Math.ceil(p/q));
},"~N,~N");
c$.floor=$_M(c$,"floor",
function(p,q){
return Math.round(Math.floor(p/q));
},"~N,~N");
c$.round=$_M(c$,"round",
function(p,q){
return Math.round(p/q);
},"~N,~N");
c$.pow2=$_M(c$,"pow2",
function(n){
if(n>=1&&n<=30)return 2<<(n-1);
else return 1;
},"~N");
c$.newFileInputStream=$_M(c$,"newFileInputStream",
function(filename){
return new java.io.FileInputStream(filename);
},"~S");
c$.newFileOutputStream=$_M(c$,"newFileOutputStream",
function(filename){
return new java.io.FileOutputStream(filename);
},"~S");
c$.isLetter=$_M(c$,"isLetter",
function(c){
return Character.isLetter(c);
},"~N");
c$.isLetterOrDigit=$_M(c$,"isLetterOrDigit",
function(c){
return Character.isLetterOrDigit(c);
},"~N");
c$.isSpaceChar=$_M(c$,"isSpaceChar",
function(c){
return Character.isSpaceChar(c);
},"~N");
c$.isWhitespace=$_M(c$,"isWhitespace",
function(c){
return Character.isWhitespace(c);
},"~N");
c$.exec=$_M(c$,"exec",
function(prog){
Runtime.getRuntime().exec(prog);
},"~S");
c$.exec=$_M(c$,"exec",
function(progArray){
Runtime.getRuntime().exec(progArray);
},"~A");
c$.getMessage=$_M(c$,"getMessage",
function(key){
var answer=key;
if($wt.internal.Compatibility.msgs==null){
try{
($t$=$wt.internal.Compatibility.msgs=java.util.ResourceBundle.getBundle("org.eclipse.swt.internal.SWTMessages"),$wt.internal.Compatibility.prototype.msgs=$wt.internal.Compatibility.msgs,$t$);
}catch(ex){
if($_O(ex,java.util.MissingResourceException)){
answer=key+" (no resource bundle)";
}else{
throw ex;
}
}
}if($wt.internal.Compatibility.msgs!=null){
try{
answer=$wt.internal.Compatibility.msgs.getString(key);
}catch(ex2){
if($_O(ex2,java.util.MissingResourceException)){
}else{
throw ex2;
}
}
}return answer;
},"~S");
c$.getMessage=$_M(c$,"getMessage",
function(key,args){
var answer=key;
if($wt.internal.Compatibility.msgs==null){
try{
($t$=$wt.internal.Compatibility.msgs=java.util.ResourceBundle.getBundle("org.eclipse.swt.internal.SWTMessages"),$wt.internal.Compatibility.prototype.msgs=$wt.internal.Compatibility.msgs,$t$);
}catch(ex){
if($_O(ex,java.util.MissingResourceException)){
answer=key+" (no resource bundle)";
}else{
throw ex;
}
}
}if($wt.internal.Compatibility.msgs!=null){
try{
var formatter=new java.text.MessageFormat("");
formatter.applyPattern($wt.internal.Compatibility.msgs.getString(key));
answer=formatter.format(args);
}catch(ex2){
if($_O(ex2,java.util.MissingResourceException)){
}else{
throw ex2;
}
}
}return answer;
},"~S,~A");
c$.interrupt=$_M(c$,"interrupt",
function(){
Thread.currentThread().interrupt();
});
c$.equalsIgnoreCase=$_M(c$,"equalsIgnoreCase",
function(s1,s2){
return s1.equalsIgnoreCase(s2);
},"~S,~S");
$_S(c$,
"PI",3.141592653589793);
c$.toRadians=c$.prototype.toRadians=$wt.internal.Compatibility.PI/180;
$_S(c$,
"msgs",null);
});
