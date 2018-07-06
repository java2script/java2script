package swingjs;

import java.io.File;

public class JSFileBytes extends File {
	
	private byte[] _bytes;

	public JSFileBytes(String name, byte[] data) {
		super(name);
		_bytes = data;		
	}
	
	public byte[] getData() {
		return _bytes;
	}
 
}
