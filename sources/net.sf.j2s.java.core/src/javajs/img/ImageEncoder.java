/* $RCSfile$
 * $Author: hansonr $
 * $Date: 2007-06-02 12:14:13 -0500 (Sat, 02 Jun 2007) $
 * $Revision: 7831 $
 *
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (C) 2000-2005  The Jmol Development Team
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
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */

// ImageEncoder - abstract class for writing out an image
//
// Copyright (C) 1996 by Jef Poskanzer <jef@mail.acme.com>.  All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
// OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
// HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
// OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
// SUCH DAMAGE.
//
// Visit the ACME Labs Java page for up-to-date versions of this and other
// fine Java utilities: http://www.acme.com/java/

package javajs.img;

import java.util.Map;

import javajs.api.GenericImageEncoder;
import javajs.util.OC;



/**
 * Generic abstract image creator:
 * 
 *   (1) set parameters
 *   
 *   (2) encode the image bytes, if necessary
 *   
 *   (3) generate the image 
 * @author Bob Hanson hansonr@stolaf.edu
 */

public abstract class ImageEncoder implements GenericImageEncoder {

  protected OC out;

  protected int width = -1;
  protected int height = -1;
  protected int quality = -1;
  protected String date;
  protected boolean logging;
  protected boolean doClose = true;

  /**
   * @param type
   * @param out
   * @param params
   */
  @Override
  public boolean createImage(String type, OC out, Map<String, Object> params)
      throws Exception {
    this.out = out;
    logging = (Boolean.TRUE == params.get("logging"));
    width = ((Integer) params.get("imageWidth")).intValue();
    height = ((Integer) params.get("imageHeight")).intValue();
    pixels = (int[]) params.get("imagePixels");
    date = (String) params.get("date");
    Integer q = (Integer) params.get("quality");
    quality = (q == null ? -1 : q.intValue());
    setParams(params);
    generate();
    close(); // GIF will override this and not close
    return doClose;
  }

  abstract protected void setParams(Map<String, Object> params);
  abstract protected void generate() throws Exception;

  protected int[] pixels;

  protected void putString(String s) {
    byte[] b = s.getBytes();
    out.write(b, 0, b.length);
  }

  protected void putByte(int b) {
    out.writeByteAsInt(b);
  }
  
  protected void close() {
    // your responsibility to close the output channel
  }

}
