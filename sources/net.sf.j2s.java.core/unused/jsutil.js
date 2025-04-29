// JavaScript methods that use ES6 methods

J2S._ES6 || (J2S._ES6 = {});

J2S._ES6.jsutil = {
		
		// resolve and reject are Function<Object,Object>, taking in a value and returning 
		// a value or a Promise.
		importModule : function(resource, resolve, reject, asData) {
			if (asData) {
				var js = J2S.getFileData(resource);
				resource = 'data:text/javascript;charset=utf-8,' + encodeURIComponent(js);
			}
			return import(resource).then(
			    function(value) { return resolve ? resolve.apply$O(value) : value }, 
				function(reason) { return reject ? reject.apply$O(reason) : reason }
			)				
		}
}
