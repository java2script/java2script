package swingjs;

import java.util.function.Consumer;

import swingjs.api.js.DOMNode.Promise;

/** Do not include this class in files to compress, as the GCC cannot handle that.
 * 
 * @author hansonr
 *
 */
public class JSUtil2 {

	public static Promise importModule(String resource, Consumer<Object> resolve, Consumer<Object> reject) {
		return /**
				 * @j2sNative import(resource).then(
				 * 		function(value) { resolve && resolve.accept$O(value) }, 
				 * 		function(reason) {reject && reject.accept$O(reason)}) ||
				 */null;
	}
	
}

