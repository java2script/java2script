package swingjs;

import java.io.File;

public class JSTempFile extends File {

	final boolean isTemp = true;
	
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
		JSUtil.cacheFileData(path, _bytes);
	}


}
