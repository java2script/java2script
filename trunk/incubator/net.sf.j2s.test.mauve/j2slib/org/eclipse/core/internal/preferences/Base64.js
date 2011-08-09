Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (null, "org.eclipse.core.internal.preferences.Base64", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.preferences, "Base64");
c$.decode = Clazz.defineMethod (c$, "decode", 
function (data) {
if (data.length == 0) return data;
var lastRealDataIndex = data.length - 1;
while (data[lastRealDataIndex] == 61) lastRealDataIndex--;

var padBytes = data.length - 1 - lastRealDataIndex;
var byteLength = Math.floor (data.length * 6 / 8) - padBytes;
var result =  Clazz.newArray (byteLength, 0);
var dataIndex = 0;
var resultIndex = 0;
var allBits = 0;
var resultChunks = Math.floor ((lastRealDataIndex + 1) / 4);
for (var i = 0; i < resultChunks; i++) {
allBits = 0;
for (var j = 0; j < 4; j++) allBits = (allBits << 6) | org.eclipse.core.internal.preferences.Base64.decodeDigit (data[dataIndex++]);

for (var j = resultIndex + 2; j >= resultIndex; j--) {
result[j] = (allBits & 0xff);
allBits = allBits >>> 8;
}
resultIndex += 3;
}
switch (padBytes) {
case 1:
allBits = 0;
for (var j = 0; j < 3; j++) allBits = (allBits << 6) | org.eclipse.core.internal.preferences.Base64.decodeDigit (data[dataIndex++]);

allBits = allBits << 6;
allBits = allBits >>> 8;
for (var j = resultIndex + 1; j >= resultIndex; j--) {
result[j] = (allBits & 0xff);
allBits = allBits >>> 8;
}
break;
case 2:
allBits = 0;
for (var j = 0; j < 2; j++) allBits = (allBits << 6) | org.eclipse.core.internal.preferences.Base64.decodeDigit (data[dataIndex++]);

allBits = allBits << 6;
allBits = allBits << 6;
allBits = allBits >>> 8;
allBits = allBits >>> 8;
result[resultIndex] = (allBits & 0xff);
break;
}
return result;
}, "~A");
c$.decodeDigit = Clazz.defineMethod (c$, "decodeDigit", 
function (data) {
var charData = String.fromCharCode (data);
if ((charData).charCodeAt (0) <= ('Z').charCodeAt (0) && (charData).charCodeAt (0) >= ('A').charCodeAt (0)) return (charData).charCodeAt (0) - ('A').charCodeAt (0);
if ((charData).charCodeAt (0) <= ('z').charCodeAt (0) && (charData).charCodeAt (0) >= ('a').charCodeAt (0)) return (charData).charCodeAt (0) - ('a').charCodeAt (0) + 26;
if ((charData).charCodeAt (0) <= ('9').charCodeAt (0) && (charData).charCodeAt (0) >= ('0').charCodeAt (0)) return (charData).charCodeAt (0) - ('0').charCodeAt (0) + 52;
switch (charData) {
case '+':
return 62;
case '/':
return 63;
default:
throw  new IllegalArgumentException ("Invalid char to decode: " + data);
}
}, "~N");
c$.encode = Clazz.defineMethod (c$, "encode", 
function (data) {
var sourceChunks = Math.floor (data.length / 3);
var len = (Math.floor ((data.length + 2) / 3)) * 4;
var result =  Clazz.newArray (len, 0);
var extraBytes = data.length - (sourceChunks * 3);
var dataIndex = 0;
var resultIndex = 0;
var allBits = 0;
for (var i = 0; i < sourceChunks; i++) {
allBits = 0;
for (var j = 0; j < 3; j++) allBits = (allBits << 8) | (data[dataIndex++] & 0xff);

for (var j = resultIndex + 3; j >= resultIndex; j--) {
result[j] = (org.eclipse.core.internal.preferences.Base64.digits[(allBits & 0x3f)]).charCodeAt (0);
allBits = allBits >>> 6;
}
resultIndex += 4;
}
switch (extraBytes) {
case 1:
allBits = data[dataIndex++];
allBits = allBits << 8;
allBits = allBits << 8;
for (var j = resultIndex + 3; j >= resultIndex; j--) {
result[j] = (org.eclipse.core.internal.preferences.Base64.digits[(allBits & 0x3f)]).charCodeAt (0);
allBits = allBits >>> 6;
}
result[result.length - 1] = ('=').charCodeAt (0);
result[result.length - 2] = ('=').charCodeAt (0);
break;
case 2:
allBits = data[dataIndex++];
allBits = (allBits << 8) | (data[dataIndex++] & 0xff);
allBits = allBits << 8;
for (var j = resultIndex + 3; j >= resultIndex; j--) {
result[j] = (org.eclipse.core.internal.preferences.Base64.digits[(allBits & 0x3f)]).charCodeAt (0);
allBits = allBits >>> 6;
}
result[result.length - 1] = ('=').charCodeAt (0);
break;
}
return result;
}, "~A");
Clazz.defineStatics (c$,
"equalSign", ('=').charCodeAt (0),
"digits", ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/']);
});
