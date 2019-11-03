$_J("net.sf.j2s.ajax");
$_L(null,"net.sf.j2s.ajax.Base64",["java.lang.IllegalArgumentException","$.StringBuffer"],function(){
c$=$_T(net.sf.j2s.ajax,"Base64");
c$.byteArrayToBase64=$_M(c$,"byteArrayToBase64",
function(a){
return net.sf.j2s.ajax.Base64.byteArrayToBase64(a,false);
},"~A");
c$.byteArrayToAltBase64=$_M(c$,"byteArrayToAltBase64",
function(a){
return net.sf.j2s.ajax.Base64.byteArrayToBase64(a,true);
},"~A");
c$.byteArrayToBase64=$_M(c$,"byteArrayToBase64",
($fz=function(a,alternate){
var aLen=a.length;
var numFullGroups=Math.floor(aLen/3);
var numBytesInPartialGroup=aLen-3*numFullGroups;
var resultLen=4*(Math.floor((aLen+2)/3));
var result=new StringBuffer(resultLen);
var intToAlpha=(alternate?net.sf.j2s.ajax.Base64.intToAltBase64:net.sf.j2s.ajax.Base64.intToBase64);
var inCursor=0;
for(var i=0;i<numFullGroups;i++){
var byte0=a[inCursor++]&0xff;
var byte1=a[inCursor++]&0xff;
var byte2=a[inCursor++]&0xff;
result.append(intToAlpha[byte0>>2]);
result.append(intToAlpha[(byte0<<4)&0x3f|(byte1>>4)]);
result.append(intToAlpha[(byte1<<2)&0x3f|(byte2>>6)]);
result.append(intToAlpha[byte2&0x3f]);
}
if(numBytesInPartialGroup!=0){
var byte0=a[inCursor++]&0xff;
result.append(intToAlpha[byte0>>2]);
if(numBytesInPartialGroup==1){
result.append(intToAlpha[(byte0<<4)&0x3f]);
result.append("==");
}else{
var byte1=a[inCursor++]&0xff;
result.append(intToAlpha[(byte0<<4)&0x3f|(byte1>>4)]);
result.append(intToAlpha[(byte1<<2)&0x3f]);
result.append('=');
}}return result.toString();
},$fz.isPrivate=true,$fz),"~A,~B");
c$.base64ToByteArray=$_M(c$,"base64ToByteArray",
function(s){
return net.sf.j2s.ajax.Base64.base64ToByteArray(s,false);
},"~S");
c$.altBase64ToByteArray=$_M(c$,"altBase64ToByteArray",
function(s){
return net.sf.j2s.ajax.Base64.base64ToByteArray(s,true);
},"~S");
c$.base64ToByteArray=$_M(c$,"base64ToByteArray",
($fz=function(s,alternate){
var alphaToInt=(alternate?net.sf.j2s.ajax.Base64.altBase64ToInt:net.sf.j2s.ajax.Base64.base64ToInt);
var sLen=s.length;
var numGroups=Math.floor(sLen/4);
if(4*numGroups!=sLen)throw new IllegalArgumentException("String length must be a multiple of four.");
var missingBytesInLastGroup=0;
var numFullGroups=numGroups;
if(sLen!=0){
if((s.charAt(sLen-1)).charCodeAt(0)==('=').charCodeAt(0)){
missingBytesInLastGroup++;
numFullGroups--;
}if((s.charAt(sLen-2)).charCodeAt(0)==('=').charCodeAt(0))missingBytesInLastGroup++;
}var result=$_A(3*numGroups-missingBytesInLastGroup,0);
var inCursor=0;
var outCursor=0;
for(var i=0;i<numFullGroups;i++){
var ch0=net.sf.j2s.ajax.Base64.base64toInt(s.charAt(inCursor++),alphaToInt);
var ch1=net.sf.j2s.ajax.Base64.base64toInt(s.charAt(inCursor++),alphaToInt);
var ch2=net.sf.j2s.ajax.Base64.base64toInt(s.charAt(inCursor++),alphaToInt);
var ch3=net.sf.j2s.ajax.Base64.base64toInt(s.charAt(inCursor++),alphaToInt);
result[outCursor++]=((ch0<<2)|(ch1>>4));
result[outCursor++]=((ch1<<4)|(ch2>>2));
result[outCursor++]=((ch2<<6)|ch3);
}
if(missingBytesInLastGroup!=0){
var ch0=net.sf.j2s.ajax.Base64.base64toInt(s.charAt(inCursor++),alphaToInt);
var ch1=net.sf.j2s.ajax.Base64.base64toInt(s.charAt(inCursor++),alphaToInt);
result[outCursor++]=((ch0<<2)|(ch1>>4));
if(missingBytesInLastGroup==1){
var ch2=net.sf.j2s.ajax.Base64.base64toInt(s.charAt(inCursor++),alphaToInt);
result[outCursor++]=((ch1<<4)|(ch2>>2));
}}return result;
},$fz.isPrivate=true,$fz),"~S,~B");
c$.base64toInt=$_M(c$,"base64toInt",
($fz=function(c,alphaToInt){
var result=alphaToInt[c.charCodeAt(0)];
if(result<0)throw new IllegalArgumentException("Illegal character "+c);
return result;
},$fz.isPrivate=true,$fz),"~N,~A");
$_S(c$,
"intToBase64",['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'],
"intToAltBase64",['!', '"', '#', '$', '%', '&', '\'', '(', ')', ',', '-', '.', ':', ';', '<', '>', '@', '[', ']', '^', '`', '_', '{', '|', '}', '~', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '?'],
"base64ToInt",[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51],
"altBase64ToInt",[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,-1,62,9,10,11,-1,52,53,54,55,56,57,58,59,60,61,12,13,14,-1,15,63,16,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,17,-1,18,19,21,20,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,22,23,24,25]);
});
