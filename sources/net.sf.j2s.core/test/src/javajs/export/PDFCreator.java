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
package javajs.export;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Hashtable;
import java.util.Map;
import java.util.Map.Entry;

import javajs.util.Lst;
import javajs.util.SB;



public class PDFCreator {
 
  private OutputStream os;
  private Lst<PDFObject> indirectObjects;
  private PDFObject root;
  private PDFObject graphics; 
//  private PDFObject pageResources;
//  private PDFObject graphicsResources;

  private int pt;
  private int xrefPt;
  private int count;

  private int height;
  private int width;
  
  private Map<String, PDFObject>fonts;

  public PDFCreator() {
   // for Class.forName  
  }

  public void setOutputStream(OutputStream os) {
    this.os = os;
  }

  public void newDocument(int paperWidth, int paperHeight, boolean isLandscape) {
    width = (isLandscape ? paperHeight : paperWidth);
    height = (isLandscape ? paperWidth : paperHeight);
    System.out.println("Creating PDF with width=" + width + " and height=" + height);
    fonts = new Hashtable<String, PDFObject>();
    indirectObjects = new Lst<PDFObject>();
    //graphicsResources = newObject(null);
    //pageResources = newObject(null); // will set this to compressed stream later
    root = newObject("Catalog");
    PDFObject pages = newObject("Pages");
    PDFObject page = newObject("Page");
    PDFObject pageContents = newObject(null);
    graphics = newObject("XObject");
    
    root.addDef("Pages", pages.getRef());
    pages.addDef("Count", "1");
    pages.addDef("Kids", "[ " + page.getRef() +" ]");
    page.addDef("Parent", pages.getRef());
    page.addDef("MediaBox", "[ 0 0 " + paperWidth + " " + paperHeight + " ]");
    if (isLandscape)
      page.addDef("Rotate", "90");

    pageContents.addDef("Length", "?");
    pageContents.append((isLandscape ? "q 0 1 1 0 0 0 " : "q 1 0 0 -1 0 "+(paperHeight))+" cm /" + graphics.getID() + " Do Q");
    page.addDef("Contents", pageContents.getRef());   
    addProcSet(page);
    addProcSet(graphics);
    // will add fonts as well as they are needed
    graphics.addDef("Subtype", "/Form");
    graphics.addDef("FormType", "1");
    graphics.addDef("BBox", "[0 0 " + width + " " + height + "]");
    graphics.addDef("Matrix", "[1 0 0 1 0 0]");
    graphics.addDef("Length", "?");
    page.addResource("XObject", graphics.getID(), graphics.getRef());   
    g("q 1 w 1 J 1 j 10 M []0 d q "); // line width 1, line cap circle, line join circle, miter limit 10, solid
    clip(0, 0, width, height);
  }   

  private void addProcSet(PDFObject o) {
    o.addResource(null, "ProcSet", "[/PDF /Text /ImageB /ImageC /ImageI]");
  }

  private void clip(int x1, int y1, int x2, int y2) {
    moveto(x1, y1);
    lineto(x2, y1);
    lineto(x2, y2);
    lineto(x1, y2);
    g("h W n");
  }

  public void moveto(int x, int y) {
    g(x + " " + y  + " m");
  }

  public void lineto(int x, int y) {
    g(x + " " + y  + " l");
  }

  private PDFObject newObject(String type) {
    PDFObject o = new PDFObject(++count);
    if (type != null)
      o.addDef("Type", "/" + type);
    indirectObjects.addLast(o);
    return o;
  }

  public void addInfo(Map<String, String> data) {
    Hashtable<String, Object> info = new Hashtable<String, Object>();
    for (Entry<String, String> e: data.entrySet()) {
      String value = "(" + e.getValue().replace(')','_').replace('(','_')+ ")";
      info.put(e.getKey(), value);      
    }
    root.addDef("Info", info);
  }

  private PDFObject addFontResource(String fname) {
    PDFObject f = newObject("Font");
    fonts.put(fname, f);
    f.addDef("BaseFont", fname);
    f.addDef("Encoding", "/WinAnsiEncoding");
    f.addDef("Subtype", "/Type1");
    graphics.addResource("Font", f.getID(), f.getRef());
    return f;
  }

  private Map<Object, PDFObject> images;
  
  public void addImageResource(Object newImage, int width, int height, int[] buffer, boolean isRGB) {
    PDFObject imageObj = newObject("XObject");
    if (images == null)
      images = new Hashtable<Object, PDFObject>();
    images.put(newImage, imageObj);   
    imageObj.addDef("Subtype", "/Image");
    imageObj.addDef("Length", "?");
    imageObj.addDef("ColorSpace", isRGB ? "/DeviceRGB" : "/DeviceGray");
    imageObj.addDef("BitsPerComponent", "8");
    imageObj.addDef("Width", "" + width);
    imageObj.addDef("Height", "" + height);
    graphics.addResource("XObject", imageObj.getID(), imageObj.getRef());
    int n = buffer.length;
    byte[] stream = new byte[n * (isRGB ? 3 : 1)];
    if (isRGB) {
      for (int i = 0, pt = 0; i < n; i++) {
        stream[pt++] = (byte) ((buffer[i] >> 16) & 0xFF);
        stream[pt++] = (byte) ((buffer[i] >> 8) & 0xFF);
        stream[pt++] = (byte) (buffer[i] & 0xFF);
      }
    } else {
      for (int i = 0; i < n; i++)
        stream[i] = (byte) buffer[i];
    }
    imageObj.setStream(stream);
    graphics.addResource("XObject", imageObj.getID(), imageObj.getRef());
  }

  public void g(String cmd) {
    graphics.append(cmd).appendC('\n');
  }

  private void output(String s) throws IOException {
   byte[] b = s.getBytes();
   os.write(b, 0, b.length);
   pt += b.length;
  }

  public void closeDocument() throws IOException {
    g("Q Q");
    outputHeader();
    writeObjects();
    writeXRefTable();
    writeTrailer();
    os.flush();
    os.close();
  }

  private void outputHeader() throws IOException {
    output("%PDF-1.3\n%");
    byte[] b = new byte[] {-1, -1, -1, -1};
    os.write(b, 0, b.length);
    pt += 4;
    output("\n");
  }

  private void writeTrailer() throws IOException {
    PDFObject trailer = new PDFObject(-2);
    output("trailer");
    trailer.addDef("Size", "" + indirectObjects.size());
    trailer.addDef("Root", root.getRef());
    trailer.output(os);
    output("startxref\n");
    output("" + xrefPt + "\n");
    output("%%EOF\n");
  }

  /**
   * Write Font objects first.
   * 
   * @throws IOException
   */
  private void writeObjects() throws IOException {
    int nObj = indirectObjects.size();
    for (int i = 0; i < nObj; i++) {
      PDFObject o = indirectObjects.get(i);
      if (!o.isFont())
        continue;
      o.pt = pt;
      pt += o.output(os);
    }
    for (int i = 0; i < nObj; i++) {
      PDFObject o = indirectObjects.get(i);
      if (o.isFont())
        continue;
      o.pt = pt;
      pt += o.output(os);
    }
  }

  private void writeXRefTable() throws IOException {
    xrefPt = pt;
    int nObj = indirectObjects.size();
    SB sb = new SB();
    // note trailing space, needed because \n is just one character
    sb.append("xref\n0 " + (nObj + 1) 
        + "\n0000000000 65535 f\r\n");
    for (int i = 0; i < nObj; i++) {
      PDFObject o = indirectObjects.get(i);
      String s = "0000000000" + o.pt;
      sb.append(s.substring(s.length() - 10));
      sb.append(" 00000 n\r\n");
    }
    output(sb.toString());
  }

  public boolean canDoLineTo() {
    return true;
  }

  public void fill() {
    g("f");   
  }

  public void stroke() {
    g("S");   
  }

  public void doCircle(int x, int y, int r, boolean doFill) {
    double d = r*4*(Math.sqrt(2)-1)/3;
    double dx = x;
    double dy = y;
    g((dx + r) + " " + dy + " m");
    g((dx + r) + " " + (dy + d) + " " + (dx + d) + " " + (dy + r) + " " + (dx) + " " + (dy + r) + " "  + " c");
    g((dx - d) + " " + (dy + r) + " " + (dx - r) + " " + (dy + d) + " " + (dx - r) + " " + (dy) + " c");
    g((dx - r) + " " + (dy - d) + " " + (dx - d) + " " + (dy - r) + " " + (dx) + " " + (dy - r) + " c");
    g((dx + d) + " " + (dy - r) + " " + (dx + r) + " " + (dy - d) + " " + (dx + r) + " " + (dy) + " c");
    g(doFill ? "f" : "s");
  }

  public void doPolygon(int[] axPoints, int[] ayPoints, int nPoints, boolean doFill) {
    moveto(axPoints[0], ayPoints[0]);
    for (int i = 1; i < nPoints; i++)
      lineto(axPoints[i], ayPoints[i]);
    g(doFill ? "f" : "s");
  }

  public void doRect(int x, int y, int width, int height, boolean doFill) {
    g(x + " " + y + " " + width + " " + height + " re " + (doFill ? "f" : "s"));
  }

  public void drawImage(Object image, int destX0, int destY0,
      int destX1, int destY1, int srcX0, int srcY0, int srcX1, int srcY1) {
    PDFObject imageObj = images.get(image);
    if (imageObj == null)
      return;
    g("q");
    clip(destX0, destY0, destX1, destY1);
    double iw = Double.parseDouble((String) imageObj.getDef("Width"));
    double ih = Double.parseDouble((String) imageObj.getDef("Height"));   
    double dw = (destX1 - destX0 + 1);
    double dh  = (destY1 - destY0 + 1);
    double sw = (srcX1 - srcX0 + 1);
    double sh = (srcY1 - srcY0 + 1);
    double scaleX = dw / sw;
    double scaleY = dh / sh;
    double transX = destX0 - srcX0 * scaleX;
    double transY = destY0 + (ih - srcY0) * scaleY;
    g(scaleX*iw + " 0 0 " + -scaleY*ih + " " + transX + " " + transY + " cm");
    g("/" + imageObj.getID() + " Do");
    g("Q");
  }

  public void drawStringRotated(String s, int x, int y, int angle) {
    g("q " + getRotation(angle) + " " + x + " " + y
        + " cm BT(" + s + ")Tj ET Q");
  }

  public String getRotation(int angle) {    
    float cos = 0, sin = 0;
    switch (angle) {
    case 0:
      cos = 1;
      break;
    case 90:
      sin = 1;
      break;
    case -90:
      sin = -1;
      break;
    case 180:
      cos = -1;
      break;
    default:
      float a = (float) (angle * (Math.PI / 180));
      cos = (float) Math.cos(a);
      sin = (float) Math.sin(a);
      if (Math.abs(cos) < 0.0001)
        cos = 0;
      if (Math.abs(sin) < 0.0001)
        sin = 0;
    }
    return  cos + " " + sin + " " + sin + " " + -cos;
  }

  public void setColor(float[] rgb, boolean isFill) {
    g(rgb[0] + " " + rgb[1] + " " + rgb[2] + (isFill ? " rg" : " RG"));
  }

  public void setFont(String fname, float size) {
    PDFObject f = fonts.get(fname);
    if (f == null)
      f = addFontResource(fname);
    g("/" + f.getID() + " " + size + " Tf");
  }

  public void setLineWidth(float width) {
    g(width + " w");    
  }

  public void translateScale(float x, float y, float scale) {
    g(scale + " 0 0 " + scale + " " + x + " " + y + " cm");
  }

}
