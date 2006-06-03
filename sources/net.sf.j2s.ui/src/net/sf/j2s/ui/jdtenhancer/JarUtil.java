/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ui.jdtenhancer;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

/**
 * @author josson smith
 * 
 * 2006-2-9
 */
public class JarUtil {

	public static final String CURRENT_J2S_VERSION = "1.0.0";
	
	private static final String J2SENHANCE_TXT = "j2senhance.txt";

	public static void enhance(InputStream is, OutputStream os,
			String[] relativePaths, String basePath) throws IOException {
		List updatedList = new ArrayList();
		List pathList = new ArrayList();
		for (int i = 0; i < relativePaths.length; i++) {
			pathList.add(relativePaths[i]);
		}
		byte[] data = new byte[1024];
		ZipOutputStream zos = new ZipOutputStream(os);
		ZipInputStream zis = new ZipInputStream(is);
		ZipEntry nextEntry = zis.getNextEntry();
		while (nextEntry != null) {
			String name = nextEntry.getName();
			if (pathList.contains(name)) {
				ZipEntry zipEntry = new ZipEntry(name);
				File file = new File(basePath, name.replace('/',
						File.separatorChar));
				zipEntry.setTime(file.lastModified());
				zipEntry.setSize(file.length());
				zos.putNextEntry(zipEntry);
				InputStream inputStream = new FileInputStream(file);
				int length = inputStream.read(data);
				while (length != -1) {
					zos.write(data, 0, length);
					length = inputStream.read(data);
				}
				inputStream.close();
				updatedList.add(name);
			} else if (!J2SENHANCE_TXT.equals(nextEntry.getName())) {
				zos.putNextEntry(nextEntry);
				int length = zis.read(data, 0, 1024);
				while (length != -1) {
					zos.write(data, 0, length);
					length = zis.read(data, 0, 1024);
				}
			}
			nextEntry = zis.getNextEntry();
		}
		zis.close();
		
		List appendedList = new ArrayList();
		for (Iterator iter = pathList.iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			if (updatedList.contains(name)) {
				continue;
			}
			ZipEntry zipEntry = new ZipEntry(name);
			File file = new File(basePath, name
					.replace('/', File.separatorChar));
			zipEntry.setTime(file.lastModified());
			zipEntry.setSize(file.length());
			zos.putNextEntry(zipEntry);
			InputStream inputStream = new FileInputStream(file);
			int length = inputStream.read(data);
			while (length != -1) {
				zos.write(data, 0, length);
				length = inputStream.read(data);
			}
			inputStream.close();
			appendedList.add(name);
		}
		if (!updatedList.contains(J2SENHANCE_TXT)) {
			ZipEntry zipEntry = new ZipEntry(J2SENHANCE_TXT);
			zipEntry.setTime(new Date().getTime());
			StringBuffer buffer = new StringBuffer();
			buffer.append("#Java2Script JDT Enhancing\r\n");
			buffer.append("#" + new Date() + "\r\n");
			buffer.append("version=" + CURRENT_J2S_VERSION + "\r\n");
			buffer.append("updated.list=");
			for (int i = 0; i < updatedList.size(); i++) {
				buffer.append(updatedList.get(i));
				if (i != updatedList.size() - 1) {
					buffer.append(",");
				}
			}
			buffer.append("\r\n");
			buffer.append("appended.list=");
			for (int i = 0; i < appendedList.size(); i++) {
				buffer.append(appendedList.get(i));
				if (i != appendedList.size() - 1) {
					buffer.append(",");
				}
			}
			buffer.append("\r\n");
			String s = buffer.toString();
			byte[] bytes = s.getBytes();
			zipEntry.setSize(bytes.length);
			zos.putNextEntry(zipEntry);
			zos.write(bytes);
		}
		zos.close();
	}

	static final String PACKAGE_ORG_ECLIPSE_JDT_INTERNAL = "org/eclipse/jdt/internal/";

	static final String COMPILER = PACKAGE_ORG_ECLIPSE_JDT_INTERNAL
			+ "compiler/";

	static final String BUILDER = PACKAGE_ORG_ECLIPSE_JDT_INTERNAL
			+ "core/builder/";

	public static void main(String[] args) throws IOException {
//		Date date = new Date();
//		enhanceJDTCore("org.eclipse.jdt.core_3.1.1.jar", "./", "jdtenhance");
//		System.out.println(new Date().getTime() - date.getTime());
		
//		String version = getEnhancedJDTCoreVersion("jdtenhance", "org.eclipse.jdt.core_3.1.1.jar");
//		System.out.println(version);
		
		String coreJarName = getJDTCoreJarName("../../plugins");
		System.out.println(coreJarName);
	}
	
	public static String getJDTCoreJarName(String path) {
		String[] list = new File(path).list(new FilenameFilter() {
		
			public boolean accept(File dir, String name) {
				if (name.startsWith("org.eclipse.jdt.core_") && name.endsWith(".jar")) {
					return true;
				}
				return false;
			}
		
		});
		if (list.length > 0) {
			return list[0];
		}
		return null;
	}
	public static String getEnhancedJDTCoreVersion(String base, String jdtCoreJar) throws IOException {
		if (EnhancerInfo.currentDetectedVersion != null) {
			return EnhancerInfo.currentDetectedVersion;
		}
		File file = new File(base, jdtCoreJar);
		if (!file.exists()) {
			return null;
		}
		byte[] data = new byte[1024];
		ZipInputStream zis = new ZipInputStream(new FileInputStream(file));
		ZipEntry nextEntry = zis.getNextEntry();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		boolean isStreamClosed = false;
		String version = null;
		while (nextEntry != null) {
			if (nextEntry.getName().indexOf("ExtendedCompilers") != -1) {
				version = "0.2.0"; //+
			}
			if (J2SENHANCE_TXT.equals(nextEntry.getName())) {
				int length = zis.read(data);
				while (length != -1) {
					baos.write(data, 0, length);
					length = zis.read(data);
				}
				zis.close();
				isStreamClosed = true;
				break;
			}
			nextEntry = zis.getNextEntry();
		}
		if (!isStreamClosed) {
			zis.close();
		}
		byte[] bytes = baos.toByteArray();
		baos.close();
		if (bytes.length == 0) {
			if (version != null) {
				EnhancerInfo.currentDetectedVersion = version;
				return version;
			}
			return null;
		}
		Properties props = new Properties();
		props.load(new ByteArrayInputStream(bytes));
		String ver = props.getProperty("version");
		EnhancerInfo.currentDetectedVersion = ver;
		return ver;
	}
    public static void copyFile(String srcFile, String destFile) throws IOException {
        copyFile(new File(srcFile), new File(destFile));
    }
    public static void copyFile(File srcFile, File destFile) throws IOException {
        FileInputStream fi = new FileInputStream(srcFile);
        FileOutputStream fo = new FileOutputStream(destFile);
        byte[] buf = new byte[1024];
        int readLength = 0;
        while (readLength != -1) {
            readLength = fi.read(buf);
            if (readLength != -1) {
                fo.write(buf, 0, readLength);
            }
        }
        fo.close();
        fi.close();
    }

	public static void enhanceJDTCore(String jdtCoreJar, String srcPath, String backupPath, String enhancePath) throws FileNotFoundException, IOException {
		File srcJarFile = new File(srcPath, jdtCoreJar);
		File backupJarFile = new File(backupPath, jdtCoreJar);
		if (!backupJarFile.exists()) {
//			boolean renamed = srcJarFile.renameTo(backupJarFile);
//			if (!renamed) {
				copyFile(srcJarFile, backupJarFile);
//				boolean deleted = srcJarFile.delete();
//				if (!deleted) {
//					throw new IOException(srcJarFile.getAbsolutePath() + " can not be enhanced!");
//				}
//			}
//		} else {
//			boolean deleted = srcJarFile.delete();
//			if (!deleted) {
//				throw new IOException(srcJarFile.getAbsolutePath() + " can not be enhanced!");
//			}
		}
		List classList = new ArrayList();
		classList.add("plugin.xml");
		//String base = "jdtenhance/";
		String base = new File(enhancePath, "jdtenhance/").getAbsolutePath();
		FileFilter filter = new FileFilter() {
			public boolean accept(File pathname) {
				if (pathname.isFile() && pathname.getName().endsWith(".class")) {
					return true;
				}
				return false;
			}
		};
		File[] files = new File(base, COMPILER).listFiles(filter);
		for (int i = 0; i < files.length; i++) {
			classList.add(COMPILER + files[i].getName());
		}
		files = new File(base, BUILDER).listFiles(filter);
		for (int i = 0; i < files.length; i++) {
			classList.add(BUILDER + files[i].getName());
		}
		String[] classes = (String[]) classList.toArray(new String[0]);
		FileInputStream is = new FileInputStream(
				backupJarFile);
		FileOutputStream os = new FileOutputStream(
				srcJarFile);
		enhance(is, os, classes, base);
	}

	public static void enhanceJDTCoreBackup(String srcPath, String backupPath, String enhancePath) throws FileNotFoundException, IOException {
		File srcJarFile = new File(srcPath);
		File backupJarFile = new File(backupPath);
		if (!backupJarFile.exists()) {
			boolean renamed = srcJarFile.renameTo(backupJarFile);
			if (!renamed) {
				copyFile(srcJarFile, backupJarFile);
				boolean deleted = srcJarFile.delete();
				if (!deleted) {
					throw new IOException(srcJarFile.getAbsolutePath() + " can not be enhanced!");
				}
			}
		} else {
			boolean deleted = srcJarFile.delete();
			if (!deleted) {
				throw new IOException(srcJarFile.getAbsolutePath() + " can not be enhanced!");
			}
		}
		List classList = new ArrayList();
		classList.add("plugin.xml");
		//String base = "jdtenhance/";
		
		File enhanceFolder = new File(enhancePath, "jdtenhance/");
		boolean isTmpFolderCreated = false;
		if (!enhanceFolder.exists()) {
			enhanceFolder.mkdirs();
			isTmpFolderCreated = true;
			byte[] data = new byte[1024];
			File[] list = new File(enhancePath).listFiles(new FilenameFilter() {
				public boolean accept(File dir, String name) {
					if (name.startsWith("net.sf.j2s.core") && name.endsWith(".jar")) {
						return true;
					}
					return false;
				}
			});
			if (list.length <= 0) {
				enhanceFolder.delete();
				boolean renamed = backupJarFile.renameTo(srcJarFile);
				if (!renamed) {
					copyFile(backupJarFile, srcJarFile);
					backupJarFile.delete();
				}
				throw new IOException(new File(enhancePath).getAbsolutePath() + " contains no sources net.sf.j2s.core_x.x.x.jar!");
			}
			FileInputStream fis = new FileInputStream(list[0]);
			ZipInputStream zis = new ZipInputStream(fis);
			ZipEntry nextEntry = zis.getNextEntry();
			while (nextEntry != null) {
				String name = nextEntry.getName();
				if (name.endsWith(".class") && (name.startsWith(COMPILER) || name.startsWith(BUILDER))) {
					File file = new File(enhanceFolder, name);
					if (!file.getParentFile().exists()) {
						file.getParentFile().mkdirs();
					}
					FileOutputStream os = new FileOutputStream(file);
					int length = zis.read(data, 0, 1024);
					while (length != -1) {
						os.write(data, 0, length);
						length = zis.read(data, 0, 1024);
					}
					os.close();
				} else if (name.endsWith("plugin.xml") && name.startsWith("org/eclipse/jdt")) {
					/*
					 * Special case for plugin.xml, as there is already a plugin.xml in net.sf.j2s.core, so
					 * the JDT Core's plugin.xml is placed in org.eclipse.jdt.
					 */
					File file = new File(enhanceFolder, "plugin.xml");
					if (!file.getParentFile().exists()) {
						file.getParentFile().mkdirs();
					}
					FileOutputStream os = new FileOutputStream(file);
					int length = zis.read(data, 0, 1024);
					while (length != -1) {
						os.write(data, 0, length);
						length = zis.read(data, 0, 1024);
					}
					os.close();
				}
				nextEntry = zis.getNextEntry();
			}
			zis.close();
			fis.close();
		}
		String base = enhanceFolder.getAbsolutePath();
		File[] files = new File(base, COMPILER).listFiles();
		for (int i = 0; i < files.length; i++) {
			classList.add(COMPILER + files[i].getName());
		}
		files = new File(base, BUILDER).listFiles();
		for (int i = 0; i < files.length; i++) {
			classList.add(BUILDER + files[i].getName());
		}
		String[] classes = (String[]) classList.toArray(new String[0]);
		FileInputStream is = new FileInputStream(
				backupJarFile);
		FileOutputStream os = new FileOutputStream(
				srcJarFile);
		enhance(is, os, classes, base);
		if (isTmpFolderCreated) {
			deleteFolder(enhanceFolder);
		}
	}

	public static void deleteFolder(File folder) {
		if (folder != null && folder.exists()) {
			File[] listFiles = folder.listFiles();
			for (int i = 0; i < listFiles.length; i++) {
				if (listFiles[i].isDirectory()) {
					deleteFolder(listFiles[i]);
				} else {
					listFiles[i].delete();
				}
			}
			folder.delete();
		}
	}
	public static void enhanceJDTCoreTo(String jdtCoreJar, String srcPath, String destPath, String enhancePath) throws FileNotFoundException, IOException {
		File srcJarFile = new File(srcPath, jdtCoreJar);
		File destJarFile = new File(destPath, jdtCoreJar);
		if (destJarFile.exists()) {
			boolean deleted = destJarFile.delete();
			if (!deleted) {
				throw new IOException(destJarFile.getAbsolutePath() + " can not be enhanced!");
			}
		}
		List classList = new ArrayList();
		classList.add("plugin.xml");
		String base = new File(enhancePath, "jdtenhance/").getAbsolutePath();
		File[] files = new File(base, COMPILER).listFiles();
		for (int i = 0; i < files.length; i++) {
			classList.add(COMPILER + files[i].getName());
		}
		files = new File(base, BUILDER).listFiles();
		for (int i = 0; i < files.length; i++) {
			classList.add(BUILDER + files[i].getName());
		}
		String[] classes = (String[]) classList.toArray(new String[0]);
		FileInputStream is = new FileInputStream(
				srcJarFile);
		FileOutputStream os = new FileOutputStream(
				destJarFile);
		enhance(is, os, classes, base);
	}

}
