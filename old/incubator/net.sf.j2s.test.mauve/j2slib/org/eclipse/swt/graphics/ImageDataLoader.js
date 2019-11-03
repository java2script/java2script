$_L(null,"$wt.graphics.ImageDataLoader",["$wt.graphics.ImageLoader"],function(){
c$=$_T($wt.graphics,"ImageDataLoader");
c$.load=$_M(c$,"load",
function(stream){
return new $wt.graphics.ImageLoader().load(stream);
},"java.io.InputStream");
c$.load=$_M(c$,"load",
function(filename){
return new $wt.graphics.ImageLoader().load(filename);
},"~S");
});
