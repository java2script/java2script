/* $RCSfile$
 * $Author$
 * $Date$
 * $Revision$
 *
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (C) 2006  The Jmol Development Team
 *
 * Contact: jmol-developers@lists.sf.net
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 *  02110-1301, USA.
 */

package javajs.util;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;
import java.util.zip.CRC32;
import java.util.zip.GZIPInputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import javajs.api.GenericZipInputStream;
import javajs.api.GenericZipTools;
import javajs.api.Interface;
import javajs.api.ZInputStream;

import org.apache.tools.bzip2.CBZip2InputStreamFactory;


/**
 * Note the JSmol/HTML5 must use its own version of java.util.zip.ZipOutputStream.
 * 
 */
public class ZipTools implements GenericZipTools {

  public ZipTools() {
    // for reflection
  }
  
  @Override
  public ZInputStream newZipInputStream(InputStream is) {
    return newZIS(is);
  }

  @SuppressWarnings("resource")
  private static ZInputStream newZIS(InputStream is) {
    return (is instanceof ZInputStream ? (ZInputStream) is
        : is instanceof BufferedInputStream ? new GenericZipInputStream(is)
            : new GenericZipInputStream(new BufferedInputStream(is)));
  }

  /**
   * reads a ZIP file and saves all data in a Hashtable so that the files may be
   * organized later in a different order. Also adds a #Directory_Listing entry.
   * 
   * Files are bracketed by BEGIN Directory Entry and END Directory Entry lines,
   * similar to CompoundDocument.getAllData.
   * 
   * @param is
   * @param subfileList
   * @param name0
   *        prefix for entry listing
   * @param binaryFileList
   *        |-separated list of files that should be saved as xx xx xx hex byte
   *        strings. The directory listing is appended with ":asBinaryString"
   * @param fileData
   */
  @Override
  public void getAllZipData(InputStream is, String[] subfileList,
                                          String name0, String binaryFileList, String exclude,
                                          Map<String, String> fileData) {
    ZipInputStream zis = (ZipInputStream) newZIS(is);
    ZipEntry ze;
    SB listing = new SB();
    binaryFileList = "|" + binaryFileList + "|";
    String prefix = PT.join(subfileList, '/', 1);
    String prefixd = null;
    if (prefix != null) {
      prefixd = prefix.substring(0, prefix.indexOf("/") + 1);
      if (prefixd.length() == 0)
        prefixd = null;
    }
    try {
      while ((ze = zis.getNextEntry()) != null) {
        String name = ze.getName();
        if (prefix != null && prefixd != null
            && !(name.equals(prefix) || name.startsWith(prefixd))
            || exclude != null && name.contains(exclude))
          continue;
        //System.out.println("ziputil: " + name);
        listing.append(name).appendC('\n');
        String sname = "|" + name.substring(name.lastIndexOf("/") + 1) + "|";
        boolean asBinaryString = (binaryFileList.indexOf(sname) >= 0);
        byte[] bytes = Rdr.getLimitedStreamBytes(zis, ze.getSize());
        String str;
        if (asBinaryString) {
          str = getBinaryStringForBytes(bytes);
          name += ":asBinaryString";
        } else {
          str = Rdr.fixUTF(bytes);
        }
        str = "BEGIN Directory Entry " + name + "\n" + str
            + "\nEND Directory Entry " + name + "\n";
        String key = name0 + "|" + name;
        fileData.put(key, str);
      }
    } catch (Exception e) {
    }
    fileData.put("#Directory_Listing", listing.toString());
  }

  private String getBinaryStringForBytes(byte[] bytes) {
    SB ret = new SB();
    for (int i = 0; i < bytes.length; i++)
      ret.append(Integer.toHexString(bytes[i] & 0xFF)).appendC(' ');
    return ret.toString();
  }

  /**
   * iteratively drills into zip files of zip files to extract file content or
   * zip file directory. Also works with JAR files.
   * 
   * Does not return "__MACOS" paths
   * 
   * @param bis
   * @param list
   * @param listPtr
   * @param asBufferedInputStream
   *        for Pmesh
   * @return directory listing or subfile contents
   */
  @Override
  public Object getZipFileDirectory(BufferedInputStream bis, String[] list,
                                    int listPtr, boolean asBufferedInputStream) {
    SB ret;
    if (list == null || listPtr >= list.length)
      return getZipDirectoryAsStringAndClose(bis);
    bis = Rdr.getPngZipStream(bis, true);
    String fileName = list[listPtr];
    ZipInputStream zis = new ZipInputStream(bis);
    ZipEntry ze;
    //System.out.println("fname=" + fileName);
    try {
      boolean isAll = (fileName.equals("."));
      if (isAll || fileName.lastIndexOf("/") == fileName.length() - 1) {
        ret = new SB();
        while ((ze = zis.getNextEntry()) != null) {
          String name = ze.getName();
          if (isAll || name.startsWith(fileName))
            ret.append(name).appendC('\n');
        }
        String str = ret.toString();
        return (asBufferedInputStream ? Rdr.getBIS(str.getBytes()) : str);
      }
      int pt = fileName.indexOf(":asBinaryString");
      boolean asBinaryString = (pt > 0);
      if (asBinaryString)
        fileName = fileName.substring(0, pt);
      fileName = fileName.replace('\\', '/');
      while ((ze = zis.getNextEntry()) != null
          && !fileName.equals(ze.getName())) {
      }
      byte[] bytes = (ze == null ? null : Rdr.getLimitedStreamBytes(zis,
          ze.getSize()));
      ze = null;
      zis.close();
      if (bytes == null)
        return "";
      if (Rdr.isZipB(bytes) || Rdr.isPngZipB(bytes))
        return getZipFileDirectory(Rdr.getBIS(bytes), list, ++listPtr,
            asBufferedInputStream);
      if (asBufferedInputStream)
        return Rdr.getBIS(bytes);
      if (asBinaryString) {
        ret = new SB();
        for (int i = 0; i < bytes.length; i++)
          ret.append(Integer.toHexString(bytes[i] & 0xFF)).appendC(' ');
        return ret.toString();
      }
      if (Rdr.isGzipB(bytes))
        bytes = Rdr.getLimitedStreamBytes(getUnGzippedInputStream(bytes), -1);
      return Rdr.fixUTF(bytes);
    } catch (Exception e) {
      return "";
    }
  }

  @Override
  public byte[] getZipFileContentsAsBytes(BufferedInputStream bis,
                                          String[] list, int listPtr) {
    byte[] ret = new byte[0];
    String fileName = list[listPtr];
    if (fileName.lastIndexOf("/") == fileName.length() - 1)
      return ret;
    try {
      bis = Rdr.getPngZipStream(bis, true);
      ZipInputStream zis = new ZipInputStream(bis);
      ZipEntry ze;
      while ((ze = zis.getNextEntry()) != null) {
        if (!fileName.equals(ze.getName()))
          continue;
        byte[] bytes = Rdr.getLimitedStreamBytes(zis, ze.getSize());
        return ((Rdr.isZipB(bytes) || Rdr.isPngZipB(bytes)) && ++listPtr < list.length ? getZipFileContentsAsBytes(
            Rdr.getBIS(bytes), list, listPtr) : bytes);
      }
    } catch (Exception e) {
    }
    return ret;
  }
  
  @Override
  public String getZipDirectoryAsStringAndClose(BufferedInputStream bis) {
    SB sb = new SB();
    String[] s = new String[0];
    try {
      s = getZipDirectoryOrErrorAndClose(bis, null);
      bis.close();
    } catch (Exception e) {
      System.out.println(e.toString());
    }
    for (int i = 0; i < s.length; i++)
      sb.append(s[i]).appendC('\n');
    return sb.toString();
  }

  @Override
  public String[] getZipDirectoryAndClose(BufferedInputStream bis,
                                                 String manifestID) {
    String[] s = new String[0];
    try {
      s = getZipDirectoryOrErrorAndClose(bis, manifestID);
      bis.close();
    } catch (Exception e) {
      System.out.println(e.toString());
    }
    return s;
  }

  private String[] getZipDirectoryOrErrorAndClose(BufferedInputStream bis,
                                                  String manifestID)
      throws IOException {
    bis = Rdr.getPngZipStream(bis, true);
    Lst<String> v = new Lst<String>();
    ZipInputStream zis = new ZipInputStream(bis);
    ZipEntry ze;
    String manifest = null;
    while ((ze = zis.getNextEntry()) != null) {
      String fileName = ze.getName();
      if (manifestID != null && fileName.startsWith(manifestID))
        manifest = getStreamAsString(zis);
      else if (!fileName.startsWith("__MACOS")) // resource fork not nec.
        v.addLast(fileName);
    }
    zis.close();
    if (manifestID != null)
      v.add(0, manifest == null ? "" : manifest + "\n############\n");
    return v.toArray(new String[v.size()]);
  }

  public static String getStreamAsString(InputStream is) throws IOException {
    return Rdr.fixUTF(Rdr.getLimitedStreamBytes(is, -1));
  }

  @Override
  public InputStream newGZIPInputStream(InputStream is) throws IOException {
    return new BufferedInputStream(new GZIPInputStream(is, 512));
  }

  @Override
  public InputStream newBZip2InputStream(InputStream is) throws IOException {
    return new BufferedInputStream(((CBZip2InputStreamFactory) Interface.getInterface("org.apache.tools.bzip2.CBZip2InputStreamFactory")).getStream(is));
  }

  @Override
  public BufferedInputStream getUnGzippedInputStream(byte[] bytes) {
    try {
      return Rdr.getUnzippedInputStream(this, Rdr.getBIS(bytes));
    } catch (Exception e) {
      return null;
    }
  }

  @Override
  public void addZipEntry(Object zos, String fileName) throws IOException {
    ((ZipOutputStream) zos).putNextEntry(new ZipEntry(fileName));
  }

  @Override
  public void closeZipEntry(Object zos) throws IOException {
    ((ZipOutputStream) zos).closeEntry();
  }

  @Override
  public Object getZipOutputStream(Object bos) {
//    /**
//     * xxxxj2sNative
//     * 
//     *            return javajs.api.Interface.getInterface(
//     *            "java.util.zip.ZipOutputStream").setZOS(bos);
//     * 
//     */
//    {
      return new ZipOutputStream((OutputStream) bos);
//    }
  }

  @Override
  public int getCrcValue(byte[] bytes) {
    CRC32 crc = new CRC32();
    crc.update(bytes, 0, bytes.length);
    return (int) crc.getValue();
  }

  @Override
  public void readFileAsMap(BufferedInputStream bis, Map<String, Object> bdata, String name) {
  	readFileAsMapStatic(bis, bdata, name);
  }

  public static void readFileAsMapStatic(BufferedInputStream bis,
			Map<String, Object> bdata, String name) {
    int pt = (name == null ? -1 : name.indexOf("|"));
    name = (pt >= 0 ? name.substring(pt + 1) : null);
    try {
      if (Rdr.isPngZipStream(bis)) {
        boolean isImage = "_IMAGE_".equals(name);
        if (name == null || isImage)
          bdata.put((isImage ? "_DATA_" : "_IMAGE_"), new BArray(getPngImageBytes(bis)));
        if (!isImage)
          cacheZipContentsStatic(bis, name, bdata, true);
      } else if (Rdr.isZipS(bis)) {
        cacheZipContentsStatic(bis, name, bdata, true);
      } else if (name == null){
        bdata.put("_DATA_", new BArray(Rdr.getLimitedStreamBytes(bis, -1)));
      } else {
        throw new IOException("ZIP file " + name + " not found");
      }
      bdata.put("$_BINARY_$", Boolean.TRUE);
    } catch (IOException e) {
      bdata.clear();
      bdata.put("_ERROR_", e.getMessage());
    }
  }

  @Override
  public String cacheZipContents(BufferedInputStream bis,
                                        String fileName,
                                        Map<String, Object> cache, 
                                        boolean asByteArray) {
		return cacheZipContentsStatic(bis, fileName, cache, asByteArray);
  }

	/**
	 * 
	 * @param bis
	 * @param fileName may end with "/" for a prefix or contain "|xxxx.xxx" for a specific file or be null
	 * @param cache
	 * @param asByteArray
	 * @return
	 */
  public static String cacheZipContentsStatic(BufferedInputStream bis,
			String fileName, Map<String, Object> cache, boolean asByteArray) {
    ZipInputStream zis = (ZipInputStream) newZIS(bis);
    ZipEntry ze;
    SB listing = new SB();
    long n = 0;
    boolean isPath = (fileName != null && fileName.endsWith("/"));
    boolean oneFile = (asByteArray && !isPath && fileName != null);
    int pt = (oneFile ? fileName.indexOf("|") : -1);
    String file0 = (pt >= 0 ? fileName : null);
    if (pt >= 0)
      fileName = fileName.substring(0,  pt);
    String prefix = (fileName == null ? "" : isPath ? fileName : fileName + "|");
    try {
      while ((ze = zis.getNextEntry()) != null) {
        String name = ze.getName();
        if (fileName != null) {
          if (oneFile) {
            if (!name.equalsIgnoreCase(fileName))
              continue;
          } else {
            listing.append(name).appendC('\n');
          }
        }
        long nBytes = ze.getSize();
        byte[] bytes = Rdr.getLimitedStreamBytes(zis, nBytes);
        if (file0 != null) {
          readFileAsMapStatic(Rdr.getBIS(bytes), cache, file0);
          return null;
        }
        n += bytes.length;
        Object o = (asByteArray ? new BArray(bytes) : bytes);        
        cache.put((oneFile ? "_DATA_" : prefix + name), o);
        if (oneFile)
          break;
      }
      zis.close();
    } catch (Exception e) {
      try {
        zis.close();
      } catch (IOException e1) {
      }
      return null;
    }
    if (n == 0 || fileName == null)
      return null;
    System.out.println("ZipTools cached " + n + " bytes from " + fileName);
    return listing.toString();
  }

  private static byte[] getPngImageBytes(BufferedInputStream bis) {
    try {
      if (Rdr.isPngZipStream(bis)) {
        int pt_count[] = new int[2];
        Rdr.getPngZipPointAndCount(bis, pt_count);
        if (pt_count[1] != 0)
          return deActivatePngZipB(Rdr.getLimitedStreamBytes(bis, pt_count[0]));
      }
      return Rdr.getLimitedStreamBytes(bis, -1);
    } catch (IOException e) {
      return null;
    }
  }

  /**
   * Once a PNGJ image has been extracted, we want to red-line its
   * iTXt "Jmol Type PNGJ" tag, since it is no longer associated with
   * ZIP data.
   *  
   * @param bytes
   * @return disfigured bytes
   * 
   */
  private static byte[] deActivatePngZipB(byte[] bytes) {
    // \0PNGJ starting at byte 50 changed to \0 NGJ
    if (Rdr.isPngZipB(bytes))
      bytes[51] = 32;
    return bytes;
  }



}
