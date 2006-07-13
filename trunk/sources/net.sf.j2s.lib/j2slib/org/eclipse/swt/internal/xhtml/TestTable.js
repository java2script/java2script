$_J("org.eclipse.swt.internal.xhtml");
Clazz.load(null,"$wt.internal.xhtml.TestTable",["java.util.Date"],function(){
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal.xhtml,"TestTable");
c$.main=$_M(c$,"main",
function(args){
var table=d$.createElement("TABLE");
table.style.position="absolute";
table.style.left="100px";
table.style.top="25px";
table.style.border="1px solid red";
table.style.backgroundColor="white";
d$.body.appendChild(table);
var tbody=d$.createElement("TBODY");
table.appendChild(tbody);
var last=new java.util.Date();
for(var i=0;i<100;i++){
var tr=d$.createElement("TR");
tbody.appendChild(tr);
for(var j=0;j<10;j++){
var td=d$.createElement("TD");
tr.appendChild(td);
var div=d$.createElement("DIV");
td.appendChild(div);
div.appendChild(d$.createTextNode("Hi"+Math.round(Math.random()*20)));
}
}
System.out.println(new java.util.Date().getTime()-last.getTime());
},"~A");
});
