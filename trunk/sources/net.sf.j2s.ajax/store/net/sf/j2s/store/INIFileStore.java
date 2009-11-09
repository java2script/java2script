package net.sf.j2s.store;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

class INIFileStore implements IStore {

	private File file;
	
	private Properties properties;
	
	private long lastUpdated;
	
	public INIFileStore(String path) {
		this.file = new File(path);
		load();
	}
	
	private void load() {
		properties = new Properties();
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(this.file);
			properties.load(fis);
		} catch (FileNotFoundException e) {
			//e.printStackTrace();
		} catch (IOException e) {
			//e.printStackTrace();
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					//e.printStackTrace();
				}
			}
		}
		lastUpdated = System.currentTimeMillis();
	}

	public String getProperty(String name) {
		long lastModified = file.lastModified();
		if (lastModified > lastUpdated) {
			load();
		}
		return properties.getProperty(name);
	}

	public void setProperty(String name, String value) {
		long lastModified = file.lastModified();
		if (lastModified > lastUpdated) {
			load();
		}
		if (value == null) {
			properties.remove(name);
		} else {
			properties.setProperty(name, value);
		}
		save();
	}

	private void save() {
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(this.file);
			properties.store(fos, "Java2Script Simple Store");
		} catch (FileNotFoundException e) {
			//e.printStackTrace();
		} catch (IOException e) {
			//e.printStackTrace();
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (IOException e) {
					//e.printStackTrace();
				}
			}
		}
		lastUpdated = System.currentTimeMillis();
	}

	public boolean isReady() {
		return true;
	}

}
