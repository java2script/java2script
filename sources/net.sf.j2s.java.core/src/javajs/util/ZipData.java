/* $RCSfile$
 * $Author$
 * $Date$
 * $Revision$
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

import javajs.api.GenericZipTools;




public class ZipData {
  boolean isEnabled = true;
  byte[] buf;
  int pt;
  int nBytes;
  
  public ZipData(int nBytes) {
    this.nBytes = nBytes;
  }
  
  public int addBytes(byte[] byteBuf, int nSectorBytes, int nBytesRemaining) {
    if (pt == 0) {
      if (!Rdr.isGzipB(byteBuf)) {
        isEnabled = false;
        return -1;
      }
      buf = new byte[nBytesRemaining];
    }
    int nToAdd = Math.min(nSectorBytes, nBytesRemaining);
    System.arraycopy(byteBuf, 0, buf, pt, nToAdd);
    pt += nToAdd;
    return nBytesRemaining - nToAdd;
  }    

  public void addTo(GenericZipTools jzt, SB data) {
    data.append(getGzippedBytesAsString(jzt, buf));
  }

  static String getGzippedBytesAsString(GenericZipTools jzt, byte[] bytes) {
    try {
      BufferedInputStream bis = jzt.getUnGzippedInputStream(bytes);
      String s = ZipTools.getStreamAsString(bis);
      bis.close();
      return s;
    } catch (Exception e) {
      return "";
    }
  }

 
}

