package swingjs;

import java.io.File;
import java.io.InputStream;

public class JSTempFile extends File {

	public boolean isTempFile() {
		return true;
	}
	
	public JSTempFile(File dir, String name) {
		super(dir, name);
		
	}

	public JSTempFile(String name) {
		super(name);
	}

	@Override
    public void deleteOnExit() {
		// maybe unnecessary?
  }

	public void cacheBytes() {
		JSUtil.cacheFileData(path, 秘bytes);
	}
	
	public boolean setBytes(Object isOrBytes) {
		if (isOrBytes instanceof InputStream) {
			秘bytes = /**
						 * @j2sNative (isOrBytes.$in.$in || isOrBytes.$in).buf ||
						 */
					null;
		} else if (isOrBytes instanceof byte[]) {
			秘bytes = /**
						 * @j2sNative isOrBytes ||
						 */
				null;
		} else {
			秘bytes = null;
		}
		return 秘bytes != null;
	}


}
