package swingjs;

import java.io.File;

/**
 * A File subclass used by JSDnD to save the bytes as well as the file name in a File object.
 *
 * Also caches the data.
 * 
 * @author hansonr
 *
 */
public class JSFileBytes extends File {
	
	public JSFileBytes(String name, byte[] data) {
		super(name);
		_bytes = data;
		JSUtil.cacheFileData(name, data);
	}
	
	public byte[] getData() {
		return _bytes;
	}
 
}
