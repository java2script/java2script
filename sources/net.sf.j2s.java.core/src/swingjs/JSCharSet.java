package swingjs;

import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;
import java.nio.charset.CharsetEncoder;


public class JSCharSet extends Charset {

	String name;
	
	public JSCharSet(String canonicalName, String[] aliases) {
		super(canonicalName, aliases);
	}

	@Override
	public boolean contains(Charset cs) {
		return true;
	}

	@Override
	public CharsetDecoder newDecoder() {
		return new JSCharsetDecoder(this, 0, 0);
	}

	@Override
	public CharsetEncoder newEncoder() {
		// TODO Auto-generated method stub
		return new JSCharsetEncoder(this, 0, 0);
	}

}
