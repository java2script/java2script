/* $RCSfile$
 * $Author$
 * $Date$
 * $Revision$
 *
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (C) 2011  The Jmol Development Team
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


class CompoundDocDirEntry {

  private final CompoundDocument cd;

  /**
   * @param compoundDocument
   */
  CompoundDocDirEntry(CompoundDocument compoundDocument) {
    cd = compoundDocument;
  }

  // 128 bytes
  //offset 0:
  byte[] unicodeName64 = new byte[64];
  short nBytesUnicodeName; // twice the ascii length, including terminating 0
  byte entryType; // 0 empty; 1 storage; 2 stream; 5 root storage
  //byte entryColor; // 0 red or 1 black
  //int DIDchildLeft;
  //int DIDchildRight;
  //int DIDstorageRoot;
  byte[] uniqueID16 = new byte[16];
  byte[] userflags4 = new byte[4];
  //long timeStamp1;
  //long timeStamp2;
  //offset 116:
  int SIDfirstSector; // either SAT or SSAT
  int lenStream;
  byte[] unused = new byte[8];

  // derived:

  String entryName;
  boolean isStandard;
  boolean isEmpty;

  final boolean readData() {
    try {
      cd.readByteArray(unicodeName64, 0, 64);
      nBytesUnicodeName = cd.readShort();
      entryType = cd.readByte();
      /*entryColor = */cd.readByte();
      /*DIDchildLeft = */cd.readInt();
      /*DIDchildRight = */cd.readInt();
      /*DIDstorageRoot = */cd.readInt();
      cd.readByteArray(uniqueID16, 0, 16);
      cd.readByteArray(userflags4, 0, 4);
      /*timeStamp1 = */      cd.readByteArray(unused, 0, 8);//cd.readLong();
      /*timeStamp2 = */      cd.readByteArray(unused, 0, 8);//cd.readLong();
      //offset 116:
      SIDfirstSector = cd.readInt();
      lenStream = cd.readInt();
      cd.readByteArray(unused, 0, 4);
    } catch (Exception e) {
      System.out.println(e.toString());
      return false;
    }
    entryName = "";
    for (int i = 0; i < nBytesUnicodeName - 2; i += 2)
      entryName += (char) unicodeName64[i];
    isStandard = (entryType == 5 || lenStream >= cd.header.minBytesStandardStream);
    isEmpty = (entryType == 0 || lenStream <= 0);
    //System.out.println(entryName + " type " + entryType);
    return true;
  }
  
  @Override
  public String toString() {
    return entryName + " " + lenStream;
  }
}