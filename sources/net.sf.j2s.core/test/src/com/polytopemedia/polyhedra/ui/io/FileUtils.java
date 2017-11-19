package com.polytopemedia.polyhedra.ui.io;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import javax.swing.JFileChooser;

import com.polytopemedia.polyhedra.nets.NameAndNet;
import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.nets.NetBuilder;
import com.polytopemedia.polyhedra.utils.Utils;

public class FileUtils {

	
	// BH -- the issue here is that we don't want to be loading unnecessary classes in JavaScript

	private static JFileChooser jfc;
	
	private static JFileChooser getFileChooser() { 
		if (jfc == null) {
			jfc = new JFileChooser();
			jfc.setMultiSelectionEnabled(false);
		}
		return jfc;
	}


	private static Boolean canAccessFileSystem;
//	static {
//		jfc.setMultiSelectionEnabled(false);
//	}
	
	public static File getFile(ExtensionFileFilter filter, JSCallback cb, boolean save) {
		if (!canAccessFileSystem()) return null;
		JFileChooser jfc = FileUtils.getFileChooser();
		jfc.setFileFilter(filter);
		jfc.setMultiSelectionEnabled(false);
		//	int result = save ? jfc.showSaveDialog(null) : jfc.showOpenDialog(null); // BH open only
		File file = null;
		/**
		 * We must provide a callback to the JFileChooser for asynchronous file reading
		 * 
		 * 
		 * @j2sNative
		 * 
		 * jfc.setCallback(cb);
		 * 
		 */
		{}
		switch (save ? jfc.showSaveDialog(null) : jfc.showOpenDialog(null)) {
		case Integer.MAX_VALUE:
			// we return null here; callback will have to take care of it.
			break;
		case JFileChooser.APPROVE_OPTION:
			file = jfc.getSelectedFile();
			file = filter.ensureExtension(file);
			break;
		}
		return file;
	}

	public static boolean canAccessFileSystem() {
		/**
		 * 
		 * @j2sNative
		 * 
		 * 			return true;
		 */
		{
			if (canAccessFileSystem == null) {
				canAccessFileSystem = false;
				try {
					new File("/").listFiles();
					canAccessFileSystem = true;
				} catch (SecurityException e) {
				}
			}
			return canAccessFileSystem;
		}
	}

	
	public static void loadNameAndNet(File file, final JSCallback callback) throws FileNotFoundException, IOException, NullPointerException {
		
		BufferedReader br = new BufferedReader(new FileReader(file));
		br.readLine();
		br.readLine();
		String encoded = br.readLine();
		String name = br.readLine();
		if (Utils.containsRudeWord(name)) {
			name = null;
		}
		br.close();
		Net net = new NetBuilder().decode(encoded);
		callback.setData(new NameAndNet(name, net));
		callback.setSuccessful(true);
		callback.run();
	}

	public static String getName(File file) {
		String name = file.getName();
		if (name.indexOf('.') > -1) {
			name = name.substring(0,name.lastIndexOf('.'));
		}
		return name;
	}

}
