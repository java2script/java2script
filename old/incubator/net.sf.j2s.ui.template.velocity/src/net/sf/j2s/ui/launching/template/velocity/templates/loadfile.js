/**javascript and css loader
 * @author: sgurin
 */
(function(){
if(window.LOADFILE){
var _loadF = function(name, type, listener){
	var el=null;
	if (type=="js"){	
		el=document.createElement("script");
		el.setAttribute("type","text/javascript");
		if(listener) {
			el.onreadystatechange = function () {
				if (this.readyState == 'complete') listener();
			};
			el.onload=listener;
		}
		el.setAttribute("src", name);
	}
	else if (type=="css"){ 
		el=document.createElement("link");  
		el.setAttribute("rel", "stylesheet");
		el.setAttribute("type", "text/css");
		el.setAttribute("href", name);
	}
	document.body.appendChild(el);
};
/**public global function
 * @param css - array of css url to load. can be null
 * @param js - array of javascript scripts urls to load. can be null
 * @param listener function that will be called when ALL js and css files are loaded.
 */
LOADFILE = function (css, js, listener) {	
	css=css==null?[]:css;
	js=js==null?[]:js;
	var subListener=function(){
		LOADFILE.counter--;
		if(LOADFILE.counter==0)
			listener();
	};
	for(var i=0; i<css.length; i++) {
		_loadF(css[i], "css", subListener);
	}
	for(var i=0; i<js.length; i++) {
		LOADFILE.counter++;
		_loadF(js[i], "js", subListener);
	}
};
LOADFILE.counter=0;//file load counter
}
})();
