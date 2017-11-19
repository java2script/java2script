/* $RCSfile$
 * $Author: egonw $
 * $Date: 2006-03-18 15:59:33 -0600 (Sat, 18 Mar 2006) $
 * $Revision: 4652 $
 *
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (C) 2003-2005  Miguel, Jmol Development, www.jmol.org
 *
 * Contact: hansonr@stolaf.edu
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
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
package javajs.util;


import java.io.DataInputStream;
import java.io.BufferedInputStream;


import java.util.Map;

import javajs.api.GenericZipTools;



/* a simple compound document reader. 
 * 
 * DIRECTORY STRUCTURE IS NOT REGENERATED
 * 
 * See http://sc.openoffice.org/compdocfileformat.pdf
 * 
 * random access file info: 
 * http://java.sun.com/docs/books/tutorial/essential/io/rafs.html
 * 
 * SHOOT! random access is only for applications, not applets!
 * 
 * With a bit more work, this could be set up to deliver binary files, but
 * right now I've only implemented it for string-based data. 
 * 
 */

public class CompoundDocument extends BinaryDocument{

//  RandomAccessFile file;
  CompoundDocHeader header = new CompoundDocHeader(this);
  Lst<CompoundDocDirEntry> directory = new  Lst<CompoundDocDirEntry>();
  CompoundDocDirEntry rootEntry;

  protected GenericZipTools jzt;

  int[] SAT;
  int[] SSAT;
  int sectorSize;
  int shortSectorSize;
  int nShortSectorsPerStandardSector;
  int nIntPerSector;
  int nDirEntriesperSector;

  // called by reflection
  
  public CompoundDocument(){
    super();
    this.isBigEndian = true;
  }
  
  public void setDocStream(GenericZipTools jzt, BufferedInputStream bis) {
    this.jzt = jzt;
    if (!isRandom) {
      stream = new DataInputStream(bis);
    }
    stream.mark(Integer.MAX_VALUE);
    if (!readHeader())
      return;
    getSectorAllocationTable();
    getShortSectorAllocationTable();
    getDirectoryTable();
  }

  public Lst<CompoundDocDirEntry> getDirectory() {
    return directory;
  }

  public String getDirectoryListing(String separator) {
    SB sb = new SB();
    for (int i = 0; i < directory.size(); i++) {
      CompoundDocDirEntry thisEntry = directory.get(i);
      if (!thisEntry.isEmpty)
        sb.append(separator).append(thisEntry.entryName)
        .append("\tlen=").appendI(thisEntry.lenStream)
        .append("\tSID=").appendI(thisEntry.SIDfirstSector)
        .append(thisEntry.isStandard ? "\tfileOffset="
                + getOffset(thisEntry.SIDfirstSector) : "");
    }
    return sb.toString();
  }

  public SB getAllData() {
    return getAllDataFiles(null, null);
  }

  /**
   * reads a compound document directory and saves all data in a Hashtable
   * so that the files may be organized later in a different order. Also adds
   * a #Directory_Listing entry.
   * 
   * Files are bracketed by BEGIN Directory Entry and END Directory Entry lines, 
   * similar to ZipUtil.getAllData.
   * 
   * @param prefix
   * @param binaryFileList   |-separated list of files that should be saved
   *                         as xx xx xx hex byte strings. The directory listing
   *                         is appended with ":asBinaryString"
   * @param fileData
   */
  @Override
  public void getAllDataMapped(String prefix, 
                         String binaryFileList, Map<String, String> fileData) {
    fileData.put("#Directory_Listing", getDirectoryListing("|"));
    binaryFileList = "|" + binaryFileList + "|";
    for (int i = 0; i < directory.size(); i++) {
      CompoundDocDirEntry thisEntry = directory.get(i);
      if (!thisEntry.isEmpty && thisEntry.entryType != 5) {
      String name = thisEntry.entryName;
        System.out.println("CompoundDocument file " + name);
        boolean isBinary = (binaryFileList.indexOf("|" + name + "|") >= 0);
        if (isBinary)
          name += ":asBinaryString";
        fileData.put(prefix + "/" + name, appendData(new SB(), name, thisEntry, isBinary).toString());
      }
    }
    close();
  }

  @Override
  public SB getAllDataFiles(String binaryFileList, String firstFile) {
// firstFile is now ignored
//    if (firstFile != null) {
//      for (int i = 0; i < directory.size(); i++) {
//        CompoundDocDirEntry thisEntry = directory.get(i);
//        if (thisEntry.entryName.equals(firstFile)) {
//          directory.remove(i);
//          directory.add(1, thisEntry); // after ROOT_ENTRY
//          break;
//        }
//      }
//    }
    SB data = new SB();
    data.append("Compound Document File Directory: ");
    data.append(getDirectoryListing("|"));
    data.append("\n");
    CompoundDocDirEntry thisEntry;
    binaryFileList = "|" + binaryFileList + "|";
    for (int i = 0, n = directory.size(); i < n; i++) {
      thisEntry = directory.get(i);
      //System.out.println("CompoundDocument reading " + thisEntry.entryName);
      String name = thisEntry.entryName;
      switch (thisEntry.entryType) {
      case 5: // root
        break;
      case 1: // user storage (dir)
        data.append("NEW Directory ").append(name).append("\n");            
        break;
      case 2: // user stream (file)
        if (name.endsWith(".gz"))
          name = name.substring(0, name.length() - 3);
        appendData(data, name, thisEntry, binaryFileList.indexOf("|" + thisEntry.entryName + "|") >= 0);
        break;
      }
    }
    close();
    return data;
  }

  private SB appendData(SB data, String name, CompoundDocDirEntry thisEntry,
                          boolean isBinary) {
    data.append("BEGIN Directory Entry ").append(name).append("\n");            
    data.appendSB(getEntryAsString(thisEntry, isBinary));
    data.append("\nEND Directory Entry ").append(name).append("\n");
    return data;
  }

  public SB getFileAsString(String entryName) {
    for (int i = 0; i < directory.size(); i++) {
      CompoundDocDirEntry thisEntry = directory.get(i);
      if (thisEntry.entryName.equals(entryName))
        return getEntryAsString(thisEntry, false);
    }
    return new SB();
  }

  private long getOffset(int SID) {
    return (SID + 1) * sectorSize;
  }

  private void gotoSector(int SID) {
    seek(getOffset(SID));
  }

  private boolean readHeader() {
    if (!header.readData())
      return false;
    sectorSize = 1 << header.sectorPower;
    shortSectorSize = 1 << header.shortSectorPower;
    nShortSectorsPerStandardSector = sectorSize / shortSectorSize; // e.g. 512 / 64 = 8
    nIntPerSector = sectorSize / 4; // e.g. 512 / 4 = 128
    nDirEntriesperSector = sectorSize / 128; // e.g. 512 / 128 = 4
//    System.out.println(
//          "compound document: revNum=" + header.revNumber +
//          " verNum=" + header.verNumber + " isBigEndian=" + isBigEndian +
//          " bytes per standard/short sector=" + sectorSize + "/" + shortSectorSize);
    return true;
  }

  private void getSectorAllocationTable() {
    int nSID = 0;
    int thisSID;
    SAT = new int[header.nSATsectors * nIntPerSector + 109];

    try {
      for (int i = 0; i < 109; i++) {
        thisSID = header.MSAT0[i];
        if (thisSID < 0)
          break;
        gotoSector(thisSID);
        for (int j = 0; j < nIntPerSector; j++) {
          SAT[nSID++] = readInt();
          //Logger.debug(thisSID+"."+j + "/" + (nSID - 1) + " : " + SAT[nSID - 1]);
        }
      }
      int nMaster = header.nAdditionalMATsectors;
      thisSID = header.SID_MSAT_next;
      int[] MSAT = new int[nIntPerSector];
      out: while (nMaster-- > 0 && thisSID >= 0) {
        // read a page of sector identifiers pointing to SAT sectors
        gotoSector(thisSID);
        for (int i = 0; i < nIntPerSector; i++)
          MSAT[i] = readInt();
        // read each page of SAT sector identifiers 
        // last entry is pointer to next master sector allocation table page
        for (int i = 0; i < nIntPerSector - 1; i++) {
          thisSID = MSAT[i];
          if (thisSID < 0)
            break out;
          gotoSector(thisSID);
          for (int j = nIntPerSector; --j >= 0;)
            SAT[nSID++] = readInt();
        }
        thisSID = MSAT[nIntPerSector - 1];
      }
    } catch (Exception e) {
      System.out.println(e.toString());
    }
  }

  private void getShortSectorAllocationTable() {
    int nSSID = 0;
    int thisSID = header.SID_SSAT_start;
    int nMax = header.nSSATsectors * nIntPerSector;
    SSAT = new int[nMax];
    try {
      while (thisSID > 0 && nSSID < nMax) {
        gotoSector(thisSID);
        for (int j = 0; j < nIntPerSector; j++) {
          SSAT[nSSID++] = readInt();
          //System.out.println("short: " + thisSID+"."+j+" SSID=" +(nSSID-1)+" "+SSAT[nSSID-1]);
        }
        thisSID = SAT[thisSID];
      }
    } catch (Exception e) {
      System.out.println(e.toString());
    }
  }

  private void getDirectoryTable() {
    int thisSID = header.SID_DIR_start;
    CompoundDocDirEntry thisEntry;
    rootEntry = null;
    try {
      while (thisSID > 0) {
        gotoSector(thisSID);
        for (int j = nDirEntriesperSector; --j >= 0;) {
          thisEntry = new CompoundDocDirEntry(this);
          thisEntry.readData();
          directory.addLast(thisEntry);
          if (thisEntry.entryType == 5)
            rootEntry = thisEntry;
        }
        thisSID = SAT[thisSID];
      }
    } catch (Exception e) {
      System.out.println(e.toString());
    }
//    System.out.println("CompoundDocument directory entry: \n"
//        + getDirectoryListing("\n"));
  }

  private SB getEntryAsString(CompoundDocDirEntry thisEntry, boolean asBinaryString) {
    if(thisEntry.isEmpty)
      return new SB();
    //System.out.println(thisEntry.entryName + " " + thisEntry.entryType + " " + thisEntry.lenStream + " " + thisEntry.isStandard + " " + thisEntry.SIDfirstSector);
    return (thisEntry.isStandard ? getStandardStringData(
            thisEntry.SIDfirstSector, thisEntry.lenStream, asBinaryString)
            : getShortStringData(thisEntry.SIDfirstSector, thisEntry.lenStream, asBinaryString));
  }
  private SB getStandardStringData(int thisSID, int nBytes,
                                             boolean asBinaryString) {
    SB data = new SB();
    byte[] byteBuf = new byte[sectorSize];
    ZipData gzipData = new ZipData(nBytes);
    try {
      while (thisSID > 0 && nBytes > 0) {
        gotoSector(thisSID);
        nBytes = getSectorData(data, byteBuf, sectorSize, nBytes, asBinaryString, gzipData);
        thisSID = SAT[thisSID];
      }
      if (nBytes == -9999)
        return new SB();
    } catch (Exception e) {
      System.out.println(e.toString());
    }
    if (gzipData.isEnabled)
      gzipData.addTo(jzt, data);
    return data;
  }

  private int getSectorData(SB data, byte[] byteBuf,
                            int nSectorBytes, int nBytes, 
                            boolean asBinaryString, ZipData gzipData)
      throws Exception {
    readByteArray(byteBuf, 0, byteBuf.length);
    int n = gzipData.addBytes(byteBuf, nSectorBytes, nBytes);
    if (n >= 0)
      return n;
    if (asBinaryString) {
      for (int i = 0; i < nSectorBytes; i++) {
        data.append(Integer.toHexString(byteBuf[i] & 0xFF)).appendC(' ');
        if (--nBytes < 1)
          break;
      }
    } else {
      for (int i = 0; i < nSectorBytes; i++) {
        if (byteBuf[i] == 0)
          return -9999; // don't allow binary data
        data.appendC((char) byteBuf[i]);
        if (--nBytes < 1)
          break;
      }
    }
    return nBytes;
  }

  private SB getShortStringData(int shortSID, int nBytes, boolean asBinaryString) {
    SB data = new SB();
    if (rootEntry == null)
      return data;
    int thisSID = rootEntry.SIDfirstSector;
    int ptShort = 0;
    byte[] byteBuf = new byte[shortSectorSize];
    ZipData gzipData = new ZipData(nBytes);
    try {
      //System.out.println("CD shortSID=" + shortSID);
      // point to correct short data sector, 512/64 = 4 per page
      while (thisSID >= 0 && shortSID >= 0 && nBytes > 0) {
        while (shortSID - ptShort >= nShortSectorsPerStandardSector) {
          ptShort += nShortSectorsPerStandardSector;
          thisSID = SAT[thisSID];
        }
        seek(getOffset(thisSID) + (shortSID - ptShort) * shortSectorSize);
        nBytes = getSectorData(data, byteBuf, shortSectorSize, nBytes, asBinaryString, gzipData);
        shortSID = SSAT[shortSID];
        //System.out.println("CD shortSID=" + shortSID);
      }
    } catch (Exception e) {
      System.out.println(data.toString());
      System.out.println("reader error in CompoundDocument " + e.toString());
    }
    if (gzipData.isEnabled)
      gzipData.addTo(jzt, data);
    return data;
  }  
}
