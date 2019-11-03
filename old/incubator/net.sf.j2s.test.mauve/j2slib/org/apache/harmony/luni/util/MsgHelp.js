$_J("org.apache.harmony.luni.util");
$_L(["java.util.ResourceBundle"],"org.apache.harmony.luni.util.MsgHelp",["java.lang.StringBuilder"],function(){
c$=$_T(org.apache.harmony.luni.util,"MsgHelp");
c$.format=$_M(c$,"format",
function(format,args){
var answer=new StringBuilder(format.length+(args.length*20));
var argStrings=new Array(args.length);
for(var i=0;i<args.length;++i){
if(args[i]==null)argStrings[i]="<null>";
else argStrings[i]=args[i].toString();
}
var lastI=0;
for(var i=format.indexOf('{', 0); i >= 0; i = format.indexOf ('{',lastI)){
if(i!=0&&(format.charAt(i-1)).charCodeAt(0)==('\\').charCodeAt(0)){
if(i!=1)answer.append(format.substring(lastI,i-1));
answer.append('{');
lastI=i+1;
}else{
if(i>format.length-3){
answer.append(format.substring(lastI,format.length));
lastI=format.length;
}else{
var argnum=((format.charAt(i+1)).charCodeAt(0)-('0').charCodeAt(0));
if(argnum<0||(format.charAt(i+2)).charCodeAt(0)!=('}').charCodeAt(0)){
answer.append(format.substring(lastI,i+1));
lastI=i+1;
}else{
answer.append(format.substring(lastI,i));
if(argnum>=argStrings.length)answer.append("<missing argument>");
else answer.append(argStrings[argnum]);
lastI=i+3;
}}}}
if(lastI<format.length)answer.append(format.substring(lastI,format.length));
return answer.toString();
},"~S,~A");
c$.setLocale=$_M(c$,"setLocale",
function(locale,resource){
return java.util.ResourceBundle.getBundle(resource);
},"java.util.Locale,~S");
});
