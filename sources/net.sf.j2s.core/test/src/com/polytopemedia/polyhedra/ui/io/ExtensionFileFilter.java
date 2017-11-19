package com.polytopemedia.polyhedra.ui.io;

/** licence = LGPL */
import java.io.File;

import javax.swing.filechooser.FileFilter;

class ExtensionFileFilter extends FileFilter 
{
	private String description;

	private String extensions[];

	ExtensionFileFilter(String description, String... extensions) {
		if (description == null) {
			this.description = extensions[0];
		} else {
			this.description = description;
		}
		this.extensions = (String[]) extensions.clone();
		toLower(this.extensions);
	}

	private void toLower(String array[]) {
		for (int i = 0, n = array.length; i < n; i++) {
			array[i] = array[i].toLowerCase();
		}
	}

	public String getDescription() {
		return description;
	}

	public boolean accept(File file) {
		if (file.isDirectory()) {
			return true;
		} else {
			String path = file.getAbsolutePath().toLowerCase();
			for (int i = 0, n = extensions.length; i < n; i++) {
				String extension = extensions[i];
				if ((path.endsWith(extension) && path.length() > extension.length() && (path.charAt(path.length() - extension.length() - 1)) == '.')) {
					return true;
				}
			}
		}
		return false;
	}

	File ensureExtension(File file) {
		if (file.isDirectory()) {
			return null;
		}
		if (accept(file)) {
			return file;
		}
		return new File(file.getAbsoluteFile().getAbsolutePath()+"."+extensions[0]);
	}
}
