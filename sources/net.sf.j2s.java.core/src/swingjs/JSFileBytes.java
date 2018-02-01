package swingjs;

import java.io.File;

public class JSFileBytes extends File {
	
	private byte[] bytes;

	public JSFileBytes(String name, byte[] data) {
		super(name);
		bytes = data;		
	}
	
	public byte[] getData() {
		return bytes;
	}
 
}
