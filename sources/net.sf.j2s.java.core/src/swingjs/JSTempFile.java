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
		boolean ok = JSUtil.setFileBytesStatic((File) this, isOrBytes);
		if (ok) {
			String path = getAbsolutePath();
			JSUtil.cacheFileData(path, 秘bytes);
		}
		return ok;
	}


}
