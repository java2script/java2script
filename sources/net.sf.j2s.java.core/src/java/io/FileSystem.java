/*
 * Copyright (c) 1998, 2012, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package java.io;

import swingjs.JSUtil;

/**
 * Package-private abstract class for the local filesystem abstraction.
 * 
 * SwingJS and Java implementation is only for File (including JSTempFile for
 * SwingJS). All other "FileSystem" references are to java.nio.FileSystem, via
 * FileSystems.getDefault().
 * 
 * Note that JSFileSystem does not implement java.io.FileSystem. It implements
 * java.nio.FileSystem.
 * 
 */

class FileSystem {

	/**
	 * Return the FileSystem object representing this platform's local filesystem.
	 * 
	 * SwingJS just returns this non-abstract class; Java would return a
	 * WinNTFileSystem or similar subclass.
	 */
	public static FileSystem getFileSystem() {
		return new FileSystem();
	}

	/**
	 * Return the local filesystem's name-separator character.
	 */
	public char getSeparator() {
		return '/';
	}

	/**
	 * Return the local filesystem's path-separator character.
	 */
	public char getPathSeparator() {
		return '/';
	};

	/* -- Attribute accessors -- */

	/* Constants for simple boolean attributes */
	public static final int BA_EXISTS = 0x01;
	public static final int BA_REGULAR = 0x02;
	public static final int BA_DIRECTORY = 0x04;
	public static final int BA_HIDDEN = 0x08;

	public static final int ACCESS_READ = 0x04;
	public static final int ACCESS_WRITE = 0x02;
	public static final int ACCESS_EXECUTE = 0x01;

	/**
	 * Delete the file or directory denoted by the given abstract pathname,
	 * returning <code>true</code> if and only if the operation succeeds.
	 */
	public boolean delete(File f) {
		f.秘bytes = null;
		JSUtil.removeCachedFileData(f.toPath().toString());
		return true;
	}

	/**
	 * List the elements of the directory denoted by the given abstract pathname.
	 * Return an array of strings naming the elements of the directory if
	 * successful; otherwise, return <code>null</code>.
	 */
	public String[] list(File f) {
		return JSUtil.getCachedFileList(f);
	}

	/**
	 * Return the simple boolean attributes for the file or directory denoted by the
	 * given abstract pathname, or zero if it does not exist or some other I/O error
	 * occurs.
	 */
	public int getBooleanAttributes(File file) {
		return (_isDir(file) ? BA_DIRECTORY : 0) | (_exists(file) ? BA_EXISTS : 0) | (_regular(file) ? BA_REGULAR : 0)
				| (_hidden(file) ? BA_HIDDEN : 0);
	}

	private boolean _hidden(File file) {
		return false;
	}

	private boolean _regular(File file) {
		return _isValid(file) && !_isDir(file);
	}

	private boolean _isValid(File file) {
		return file.toString().indexOf(":") < 0;
	}
	
	boolean _exists(File file) {
		return _isValid(file) && (file.秘bytes != null || file.getPrefixLength() == file.path.length() // is a directory
				|| file.秘isTempFile ? (file.秘bytes =  _getTempFileBytes(file)) != null
						: (file.秘bytes = JSUtil.getFileAsBytes(file)) != null);
	}

	private static byte[] _getTempFileBytes(File file) {
		return (byte[]) JSUtil.getCachedFileData(file.path, true);
	}

	boolean _isDir(File file) {
		// only an approximation. avoiding xxxx:  here completely
		return (file.秘bytes == null && _isValid(file) && file.getPrefixLength() == file.path.length());
	}

	/**
	 * Compute the length of this pathname string's prefix. The pathname string must
	 * be in normal form.
	 */
	public int prefixLength(String path) {
		return path.lastIndexOf("/") + 1;
	}

	/**
	 * Resolve the child pathname string against the parent. Both strings must be in
	 * normal form, and the result will be in normal form.
	 */
	public String resolve(File file) {
		// TODO: /../,/./?
		return file.path;
	}

	/**
	 * Return the parent pathname string to be used when the parent-directory
	 * argument in one of the two-argument File constructors is the empty pathname.
	 */
	public String getDefaultParent() {
		return "/";
	}

	/**
	 * Post-process the given URI path string if necessary. This is used on win32,
	 * e.g., to transform "/c:/foo" into "c:/foo". The path string still has slash
	 * separators; code in the File class will translate them after this method
	 * returns.
	 */
	public String fromURIPath(String path) {
		if (path.startsWith("file://"))
			path = path.substring(7);
		return path;
	}

	/**
	 * Tell whether or not the given abstract pathname is absolute.
	 */
	public boolean isAbsolute(File f) {
		return f.getAbsolutePath() == f.path;
	}

	//
//  /**
//   * Create a new directory denoted by the given abstract pathname,
//   * returning <code>true</code> if and only if the operation succeeds.
//   */
//  public abstract boolean createDirectory(File f);
//
//  /**
//   * Rename the file or directory denoted by the first abstract pathname to
//   * the second abstract pathname, returning <code>true</code> if and only if
//   * the operation succeeds.
//   */
//  public abstract boolean rename(File f1, File f2);
//
//  /**
//   * Set the last-modified time of the file or directory denoted by the
//   * given abstract pathname, returning <code>true</code> if and only if the
//   * operation succeeds.
//   */
//  public abstract boolean setLastModifiedTime(File f, long time);
//
//  /**
//   * Mark the file or directory denoted by the given abstract pathname as
//   * read-only, returning <code>true</code> if and only if the operation
//   * succeeds.
//   */
//  public abstract boolean setReadOnly(File f);
//
//
//  /* -- Filesystem interface -- */
//
//  /**
//   * List the available filesystem roots.
//   */
//  public abstract File[] listRoots();
//
//  /* -- Disk usage -- */
//  public static final int SPACE_TOTAL  = 0;
//  public static final int SPACE_FREE   = 1;
//  public static final int SPACE_USABLE = 2;
//
//  public abstract long getSpace(File f, int t);
//
//  /* -- Basic infrastructure -- */
//
//  /**
//   * Compare two abstract pathnames lexicographically.
//   */
//  public abstract int compare(File f1, File f2);
//
//  /**
//   * Compute the hash code of an abstract pathname.
//   */
//  public abstract int hashCode(File f);
//
//  // Flags for enabling/disabling performance optimizations for file
//  // name canonicalization
//  static boolean useCanonCaches      = true;
//  static boolean useCanonPrefixCache = true;
//
//  private static boolean getBooleanProperty(String prop, boolean defaultVal) {
//      String val = System.getProperty(prop);
//      if (val == null) return defaultVal;
//      if (val.equalsIgnoreCase("true")) {
//          return true;
//      } else {
//          return false;
//      }
//  }
//
//  static {
//      useCanonCaches      = getBooleanProperty("sun.io.useCanonCaches",
//                                               useCanonCaches);
//      useCanonPrefixCache = getBooleanProperty("sun.io.useCanonPrefixCache",
//                                               useCanonPrefixCache);
//  }
//
	/**
	 * Convert the given pathname string to normal form. If the string is already in
	 * normal form then it is simply returned.
	 */
	public String normalize(String path) {
		return path.replaceAll("\\\\", "/");
	}

	public long getLength(File file) {
		return (_exists(file) && file.秘bytes != null ? file.秘bytes.length : 0);
	}

//
//
// /**
//  * Resolve the given abstract pathname into absolute form.  Invoked by the
//  * getAbsolutePath and getCanonicalPath methods in the File class.
//  */
// public abstract String resolve(File f);
//
// public abstract String canonicalize(String path) throws IOException;
//
//  /**
//  * Check whether the file or directory denoted by the given abstract
//  * pathname may be accessed by this process.  The second argument specifies
//  * which access, ACCESS_READ, ACCESS_WRITE or ACCESS_EXECUTE, to check.
//  * Return false if access is denied or an I/O error occurs
//  */
// public abstract boolean checkAccess(File f, int access);
// /**
//  * Set on or off the access permission (to owner only or to all) to the file
//  * or directory denoted by the given abstract pathname, based on the parameters
//  * enable, access and oweronly.
//  */
// public abstract boolean setPermission(File f, int access, boolean enable, boolean owneronly);
//
// /**
//  * Return the time at which the file or directory denoted by the given
//  * abstract pathname was last modified, or zero if it does not exist or
//  * some other I/O error occurs.
//  */
// public abstract long getLastModifiedTime(File f);

// /**
//  * Return the length in bytes of the file denoted by the given abstract
//  * pathname, or zero if it does not exist, is a directory, or some other
//  * I/O error occurs.
//  */
// public abstract long getLength(File f);
//
//
// /* -- File operations -- */
//
// /**
//  * Create a new empty file with the given pathname.  Return
//  * <code>true</code> if the file was created and <code>false</code> if a
//  * file or directory with the given pathname already exists.  Throw an
//  * IOException if an I/O error occurs.
//  *
//  * <p>
//  * The resulting file may have more restrictive access permission
//  * on some platforms, if restrictive is true. 
//  */
// public abstract boolean createFileExclusively(String pathname,
//                                               boolean restrictive)
//     throws IOException;
//

}
