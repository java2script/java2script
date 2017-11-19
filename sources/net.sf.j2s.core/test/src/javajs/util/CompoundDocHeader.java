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


class CompoundDocHeader {

  /**
   * 
   */
  private final CompoundDocument cd;

  /**
   * @param compoundDocument
   */
  CompoundDocHeader(CompoundDocument compoundDocument) {
    cd = compoundDocument;
  }

  //512 bytes
  //offset 0:
  byte[] magicNumbers = new byte[8]; // D0CF11E0A1B11AE1
  byte[] uniqueID16 = new byte[16];
  byte revNumber; // 3E = 62
  //byte unusedb1;
  byte verNumber; // 3
  //byte unusedb2;
  //short byteOrder; // -2 littleEndian
  short sectorPower; // 2^sectorPower = sector size; 512 = 2^9
  short shortSectorPower; // 2^shortSectorPower = short sector size; 64 = 2^6
  byte[] unused = new byte[10];
  int nSATsectors; // number of sectors for sector allocation table
  int SID_DIR_start; // sector identifier of start of directory sector
  //offset 56:
  int minBytesStandardStream; // less than this (and not DIR) will be "short"
  int SID_SSAT_start; // start of short sector allocation table (SSAT)
  int nSSATsectors; // number of sectors allocated to SSAT
  int SID_MSAT_next; // pointer to next master sector allocation table sector
  int nAdditionalMATsectors; // number of sectors allocated to more MSAT sectors
  //offset 76; 436 bytes:      
  int[] MSAT0 = new int[109]; // beginning of master allocation table 

  /*
   *  Sector 0 is first sector AFTER this header
   *  
   *  If sectorPower = 9, then this allows for 109 PAGES
   *  of sector allocation tables, with 127 pointers per
   *  page (plus 1 pointer to the next SAT page), each 
   *  pointing to a sector of 512 bytes. Thus, with no additional
   *  MSAT pages, the header allows for 109*128*512 = 7.1 Mb file
   *  
   */

  final boolean readData() {
    try {
      cd.readByteArray(magicNumbers, 0, 8);
      if ((magicNumbers[0] & 0xFF) != 0xD0 || (magicNumbers[1] & 0xFF) != 0xCF
          || (magicNumbers[2] & 0xFF) != 0x11 || (magicNumbers[3] & 0xFF) != 0xE0
          || (magicNumbers[4] & 0xFF) != 0xA1 || (magicNumbers[5] & 0xFF) != 0xB1
          || (magicNumbers[6] & 0xFF) != 0x1A || (magicNumbers[7] & 0xFF) != 0xE1)
        return false;
      cd.readByteArray(uniqueID16, 0, 16);
      revNumber = cd.readByte();
      cd.readByte();
      verNumber = cd.readByte();
      cd.readByte();
      byte b1 = cd.readByte();
      byte b2 = cd.readByte();
      cd.isBigEndian = (b1 == -1 && b2 == -2);
      sectorPower = cd.readShort();
      shortSectorPower = cd.readShort();
      cd.readByteArray(unused, 0, 10);
      nSATsectors = cd.readInt();
      SID_DIR_start = cd.readInt();
      cd.readByteArray(unused, 0, 4);
      minBytesStandardStream = cd.readInt();
      SID_SSAT_start = cd.readInt();
      nSSATsectors = cd.readInt();
      SID_MSAT_next = cd.readInt();
      nAdditionalMATsectors = cd.readInt();
      for (int i = 0; i < 109; i++)
        MSAT0[i] = cd.readInt();
    } catch (Exception e) {
      System.out.println(e.toString());
      return false;
    }
    return true;
  }
}