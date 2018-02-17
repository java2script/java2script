// PpmEncoder - write out an image as a PPM
//
// Copyright (C)1996,1998 by Jef Poskanzer <jef@mail.acme.com>. All rights reserved.
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


/**
 * see http://netpbm.sourceforge.net/doc/ppm.html
 */
public class PpmEncoder extends ImageEncoder {

  @Override
  protected void setParams(Map<String, Object> params) {
    // no params
  }

  @Override
  protected void generate() {
    putString("P6\n");
    putString(width + " " + height + "\n");
    putString("255\n");
    byte[] ppmPixels = new byte[width * 3];
    for (int pt = 0, row = 0; row < height; ++row) {
      for (int col = 0, j = 0; col < width; ++col, pt++) {
        int p = pixels[pt];
        ppmPixels[j++] = (byte) ((p >> 16) & 0xff);
        ppmPixels[j++] = (byte) ((p >> 8) & 0xff);
        ppmPixels[j++] = (byte) (p & 0xff);
      }
      out.write(ppmPixels, 0, ppmPixels.length);
    }
  }
}
