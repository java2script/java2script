$_J("org.apache.harmony.luni.util");
$_L(["java.util.Locale","org.apache.harmony.luni.util.MsgHelp"],"org.apache.harmony.luni.util.Msg",null,function(){
c$=$_T(org.apache.harmony.luni.util,"Msg");
c$.getString=$_M(c$,"getString",
function(msg){
if(org.apache.harmony.luni.util.Msg.bundle==null)return msg;
try{
return org.apache.harmony.luni.util.Msg.bundle.getString(msg);
}catch(e){
if($_O(e,java.util.MissingResourceException)){
return msg;
}else{
throw e;
}
}
},"~S");
c$.getString=$_M(c$,"getString",
function(msg,arg){
return org.apache.harmony.luni.util.Msg.getString(msg,[arg]);
},"~S,~O");
c$.getString=$_M(c$,"getString",
function(msg,arg){
return org.apache.harmony.luni.util.Msg.getString(msg,[Integer.toString(arg)]);
},"~S,~N");
c$.getString=$_M(c$,"getString",
function(msg,arg){
return org.apache.harmony.luni.util.Msg.getString(msg,[String.valueOf(arg)]);
},"~S,~N");
c$.getString=$_M(c$,"getString",
function(msg,arg1,arg2){
return org.apache.harmony.luni.util.Msg.getString(msg,[arg1,arg2]);
},"~S,~O,~O");
c$.getString=$_M(c$,"getString",
function(msg,args){
var format=msg;
if(org.apache.harmony.luni.util.Msg.bundle!=null){
try{
format=org.apache.harmony.luni.util.Msg.bundle.getString(msg);
}catch(e){
if($_O(e,java.util.MissingResourceException)){
}else{
throw e;
}
}
}return org.apache.harmony.luni.util.MsgHelp.format(format,args);
},"~S,~A");
$_S(c$,
"bundle",null);
});
