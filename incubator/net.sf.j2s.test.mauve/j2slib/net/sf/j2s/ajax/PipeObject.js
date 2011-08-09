$_J("net.sf.j2s.ajax");
c$=$_C(function(){
this.pipe=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"PipeObject");
$_K(c$,
function(pipe){
this.pipe=pipe;
},"net.sf.j2s.ajax.SimplePipeRunnable");
$_M(c$,"getPipe",
function(){
return this.pipe;
});
$_M(c$,"setPipe",
function(pipe){
this.pipe=pipe;
},"net.sf.j2s.ajax.SimplePipeRunnable");
