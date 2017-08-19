/* $RCSfile$
 * $Author: hansonr $
 * $Date: 2009-06-30 18:58:33 -0500 (Tue, 30 Jun 2009) $
 * $Revision: 11158 $
 *
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (C) 2002-2005  The Jmol Development Team
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
package javajs.img;

import java.util.Hashtable;
import java.util.Map;

import javajs.export.PDFCreator;

/**
 * A relatively primitive PDF generator that just makes a document with an image
 * in it.
 * 
 */
public class PdfEncoder extends ImageEncoder {

  private boolean isLandscape;
  private PDFCreator pdf;
  private String comment;

  public PdfEncoder() {
    // for Class.forName  
  }

  @Override
  protected void setParams(Map<String, Object> params) {
  	isLandscape = (quality > 1);
    comment = "Jmol " + (String) params.get("comment");
  }

  @Override
  protected void generate() throws Exception {
    pdf = new PDFCreator();
    int pageWidth = 8 * 72;
    int pageHeight = 11 * 72;
    pdf.setOutputStream(out);
    pdf.newDocument(pageWidth, pageHeight, isLandscape); // A4 or Letter
    addMyImage(pageWidth, pageHeight);
    Map<String, String> ht = new Hashtable<String, String>();
    if (comment != null)
      ht.put("Producer", comment);
    ht.put("Author", "JMol");
    ht.put("CreationDate", date);
    pdf.addInfo(ht);
    pdf.closeDocument();
  }

  
  /**
   * centered on the page
   * 
   * @param pageWidth
   * @param pageHeight
   */
  private void addMyImage(int pageWidth, int pageHeight) {
    pdf.addImageResource("img1", width, height, pixels, true);
    int w = (isLandscape ? pageHeight : pageWidth);
    int h = (isLandscape ? pageWidth : pageHeight);
    int iw = width;
    int ih = height;
    if (iw > 0.9 * w) {
      ih = (int) (ih * 0.9 * w / iw);
      iw = (int) (w * 0.9);
    }
    if (ih > 0.9 * h) {
      iw = (int) (iw * 0.9 * h / ih);
      ih = (int) (h * 0.9);
    }
    int x = 0;
    int y = 0;
    int x1 = iw;
    int y1 = ih;
    if (w > iw) {
      x = (w - iw) / 2;
      x1 = iw + x;
    }
    if (h > ih) {
      y = (h - ih) / 2;
      y1 = ih + y;
    }
    pdf.drawImage("img1", x, y, x1, y1, 0, 0, width, height);
  }

}
