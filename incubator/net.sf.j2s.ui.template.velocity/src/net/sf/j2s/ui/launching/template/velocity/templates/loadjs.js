/**javascript and css loader
 * @author: sgurin
 */
(function(){
if(!window.LOADJS){
var window.LOADJS = function(src, listener){
	var el=null;
	el=document.createElement("script");
	el.setAttribute("type","text/javascript");
	if(listener) {
		el.onreadystatechange = function () {
			if (this.readyState == 'complete') listener();
		};
		el.onload=listener;
	}
	el.setAttribute("src", src);
	document.body.appendChild(el);
}
}
})();

//(function(){if(!window.LOADJS){window.LOADJS=function(src,listener){var el=null;el=document.createElement("script");el.setAttribute("type","text/javascript");if(listener){el.onreadystatechange=function(){if(this.readyState=='complete')listener()};el.onload=listener}el.setAttribute("src",src);document.body.appendChild(el)}}})();
