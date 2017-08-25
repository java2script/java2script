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

//  Final encoding code from http://acme.com/resources/classes/Acme/JPM/Encoders/GifEncoder.java
//
//  GifEncoder - write out an image as a GIF
// 
// 
//  Transparency handling and variable bit size courtesy of Jack Palevich.
//  
//  Copyright (C)1996,1998 by Jef Poskanzer <jef@mail.acme.com>. All rights reserved.
//  
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions
//  are met:
//  1. Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
// 
//  THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
//  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//  ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
//  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
//  OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
//  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
//  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
//  OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
//  SUCH DAMAGE.
// 
//  Visit the ACME Labs Java page for up-to-date versions of this and other
//  fine Java utilities: http://www.acme.com/java/
// 
/// Write out an image as a GIF.
// <P>
// <A HREF="/resources/classes/Acme/JPM/Encoders/GifEncoder.java">Fetch the software.</A><BR>
// <A HREF="/resources/classes/Acme.tar.gz">Fetch the entire Acme package.</A>
// <P>
// @see ToGif

package javajs.img;

import javajs.util.CU;
import javajs.util.Lst;
import javajs.util.M3;
import javajs.util.P3;

import java.util.Hashtable;
import java.util.Map;
import java.io.IOException;

/**
 * 
 * GifEncoder extensively adapted for Jmol by Bob Hanson
 * 
 * Color quantization roughly follows the GIMP method
 * "dither Floyd-Steinberg (normal)" but with some twists. (For example, we
 * exclude the background color.)
 * 
 * Note that although GIMP code annotation refers to "median-cut", it is really
 * using MEAN-cut. That is what I use here as well.
 * 
 * -- commented code allows visualization of the color space using Jmol. Very
 * enlightening!
 * 
 * -- much simplified interface with ImageEncoder
 * 
 * -- uses simple Hashtable with Integer() to catalog colors
 * 
 * -- allows progressive production of animated GIF via Jmol CAPTURE command
 * 
 * -- uses general purpose javajs.util.OutputChannel for byte-handling options
 * such as posting to a server, writing to disk, and retrieving bytes.
 * 
 * -- allows JavaScript port
 * 
 * -- Bob Hanson, first try: 24 Sep 2013; final coding: 9 Nov 2014
 * 
 * 
 * @author Bob Hanson hansonr@stolaf.edu
 */

public class GifEncoder extends ImageEncoder {

  private Map<String, Object> params;
  private P3[] palette;
  private int backgroundColor;

  private boolean interlaced;
  private boolean addHeader = true;
  private boolean addImage = true;
  private boolean addTrailer = true;
  private boolean isTransparent;
  private boolean floydSteinberg = true;
  private boolean capturing;
  private boolean looping;

  private int delayTime100ths = -1;
  private int bitsPerPixel = 1;

  private int byteCount;

  /**
   * we allow for animated GIF by being able to re-enter the code with different
   * parameters held in params
   * 
   * 
   */
  @Override
  protected void setParams(Map<String, Object> params) {
    this.params = params;
    Integer ic = (Integer) params.get("transparentColor");
    if (ic == null) {
      ic = (Integer) params.get("backgroundColor");
      if (ic != null)
        backgroundColor = ic.intValue();
    } else {
      backgroundColor = ic.intValue();
      isTransparent = true;
    }

    interlaced = (Boolean.TRUE == params.get("interlaced"));
    if (params.containsKey("captureRootExt") // file0000.gif 
        || !params.containsKey("captureMode")) // animated gif
      return;
    interlaced = false;
    capturing = true;
    try {
      byteCount = ((Integer) params.get("captureByteCount")).intValue();
    } catch (Exception e) {
      // ignore
    }
    switch ("maec"
        .indexOf(((String) params.get("captureMode")).substring(0, 1))) {
    case 0: //"movie"
      params.put("captureMode", "add");
      addImage = false;
      addTrailer = false;
      break;
    case 1: // add 
      addHeader = false;
      addTrailer = false;
      int fps = Math.abs(((Integer) params.get("captureFps")).intValue());
      delayTime100ths = (fps == 0 ? 0 : 100 / fps);
      looping = (Boolean.FALSE != params.get("captureLooping"));
      break;
    case 2: // end
      addHeader = false;
      addImage = false;
      break;
    case 3: // cancel
      addHeader = false;
      addImage = false;
      out.cancel();
      break;
    }
  }

  @Override
  protected void generate() throws IOException {
    if (addHeader)
      writeHeader();
    addHeader = false; // only one header
    if (addImage) {
      createPalette();
      writeGraphicControlExtension();
      if (delayTime100ths >= 0 && looping)
        writeNetscapeLoopExtension();
      writeImage();
    }
  }

  @Override
  protected void close() {
    if (addTrailer) {
      writeTrailer();
    } else {
      doClose = false;
    }
    if (capturing)
      params.put("captureByteCount", Integer.valueOf(byteCount));
  }

  //////////////  256-color quantization  //////////////

  /**
   * a color point in normalized L*a*b space with a flag indicating whether it
   * is the background color
   */
  private class ColorItem extends P3 {
    /**
	 * 
	 */
	protected boolean isBackground;

    ColorItem(int rgb, boolean isBackground) {
      this.isBackground = isBackground;
      setT(toLABnorm(rgb));
    }
  }

  /**
   * A list of normalized L*a*b points with an index and a center and volume
   * 
   */
  private class ColorCell extends Lst<P3> {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected int index;
    protected P3 center;

    private float volume;

    ColorCell(int index) {
      this.index = index;
    }

    /**
     * @param doVisualize
     *        debugging only
     * @return volume in normalized L*a*b space
     */
    public float getVolume(boolean doVisualize) {
      if (volume != 0)
        return volume;
      if (size() < 2)
        return -1;
      //if (true)
      //return lst.size();
      //float d;
      float maxx = -Integer.MAX_VALUE;
      float minx = Integer.MAX_VALUE;
      float maxy = -Integer.MAX_VALUE;
      float miny = Integer.MAX_VALUE;
      float maxz = -Integer.MAX_VALUE;
      float minz = Integer.MAX_VALUE;
      int n = size();
      for (int i = n; --i >= 0;) {
        P3 xyz = get(i);
        if (xyz.x < minx)
          minx = xyz.x;
        if (xyz.y < miny)
          miny = xyz.y;
        if (xyz.z < minz)
          minz = xyz.z;
        if (xyz.x > maxx)
          maxx = xyz.x;
        if (xyz.y > maxy)
          maxy = xyz.y;
        if (xyz.z > maxz)
          maxz = xyz.z;
      }
      float dx = (maxx - minx);
      float dy = (maxy - miny);
      float dz = (maxz - minz);
      // Jmol visualization only
      //      if (doVisualize) {
      //        P3 ptRGB = toRGB(center);
      //        drawPt(index, -size(), ptRGB);
      //        //for (int i = n; --i >= 0;)
      //        //drawPt(index, i, toRGB(get(i)));
      //        P3 pt0 = toRGB(P3.new3(Math.max(minx, 0), Math.max(miny, 0),
      //            Math.max(minz, 0)));
      //        P3 pt1 = toRGB(P3.new3(Math.min(maxx, 100), Math.min(maxy, 100),
      //            Math.min(maxz, 100)));
      //        rgbToXyz(pt0, pt0);
      //        xyzToLab(pt0, pt0);
      //        rgbToXyz(pt1, pt1);
      //        xyzToLab(pt1, pt1);
      //        System.out.println("boundbox corners " + pt0 + " " + pt1);
      //        System.out.println("draw d" + index + " boundbox color " + ptRGB
      //            + " mesh nofill");
      //      }
      return volume = dx * dx + dy * dy + dz * dz;
    }

    //    // Jmol visualization only
    //      private void drawPt(int index, int i, P3 rgb) {
    //        boolean isMain = (i < 0);
    //      P3 lab = rgbToXyz(rgb, null);
    //      xyzToLab(lab, lab);
    //      System.out.println("draw d" + index + (isMain ? "_" : "_" + i) + " width "
    //          + (isMain ? 1.0 : 0.2) + " " + lab
    //          + " color " + rgb + (isMain ? " '" + -i + "'" : ""));
    //      }

    /**
     * Set the average normalized L*a*b value for this cell and return its RGB point
     * 
     * @return RGB point
     * 
     */
    protected P3 setColor() {
      int count = size();
      center = new P3();
      for (int i = count; --i >= 0;)
        center.add(get(i));
      center.scale(1f / count);
      // Jmol visualization only
      //volume = 0;
      //getVolume(true); 
      return toRGB(center);
    }

    /**
     * use median_cut algorithm to split the cell, creating a doubly linked
     * list.
     * 
     * Paul Heckbert, MIT thesis COLOR IMAGE QUANTIZATION FOR FRAME BUFFER
     * DISPLAY https://www.cs.cmu.edu/~ph/ciq_thesis
     * 
     * except, as in GIMP, we use center (not median) here.
     * 
     * @param cells
     * @return true if split
     */
    protected boolean splitCell(Lst<ColorCell> cells) {
      int n = size();
      if (n < 2)
        return false;
      int newIndex = cells.size();
      ColorCell newCell = new ColorCell(newIndex);
      cells.addLast(newCell);
      float[][] ranges = new float[3][3];
      for (int ic = 0; ic < 3; ic++) {
        float low = Float.MAX_VALUE;
        float high = -Float.MAX_VALUE;
        for (int i = n; --i >= 0;) {
          P3 lab = get(i);
          float v = (ic == 0 ? lab.x : ic == 1 ? lab.y : lab.z);
          if (low > v)
            low = v;
          if (high < v)
            high = v;
        }
        ranges[0][ic] = low;
        ranges[1][ic] = high;
        ranges[2][ic] = high - low;
      }
      float[] r = ranges[2];
      int mode = (r[0] >= r[1] ? (r[0] >= r[2] ? 0 : 2) : r[1] >= r[2] ? 1 : 2);
      float val = ranges[0][mode] + ranges[2][mode] / 2;
      volume = 0; // recalculate volume if needed
      switch (mode) {
      case 0:
        for (int i = n; --i >= 0;)
          if (get(i).x >= val)
            newCell.addLast(removeItemAt(i));
        break;
      case 1:
        for (int i = n; --i >= 0;)
          if (get(i).y >= val)
            newCell.addLast(removeItemAt(i));
        break;
      case 2:
        for (int i = size(); --i >= 0;)
          if (get(i).z >= val)
            newCell.addLast(removeItemAt(i));
        break;
      }
      return true;
    }
  }

  /**
   * Quantize all colors and create the final palette;
   * replace pixels[] with an array of color indices.
   * 
   */
  private void createPalette() {

    // catalog all pixel colors

    Lst<ColorItem> tempColors = new Lst<ColorItem>();
    Map<Integer, ColorItem> ciHash = new Hashtable<Integer, ColorItem>();
    for (int i = 0, n = pixels.length; i < n; i++) {
      int rgb = pixels[i];
      Integer key = Integer.valueOf(rgb);
      ColorItem item = ciHash.get(key);
      if (item == null) {
        item = new ColorItem(rgb, rgb == backgroundColor);
        ciHash.put(key, item);
        tempColors.addLast(item);
      }
    }
    int nColors = tempColors.size();
    System.out.println("GIF total image colors: " + nColors);
    ciHash = null;

    // create a set of <= 256 color cells

    Lst<ColorCell> cells = quantizeColors(tempColors);
    nColors = cells.size();
    System.out.println("GIF final color count: " + nColors);

    // generate the palette and map each cell's rgb color to itself

    Map<Integer, ColorCell> colorMap = new Hashtable<Integer, ColorCell>();
    bitsPerPixel = (nColors <= 2 ? 1 : nColors <= 4 ? 2 : nColors <= 16 ? 4 : 8);
    palette = new P3[1 << bitsPerPixel];
    for (int i = 0; i < nColors; i++) {
      ColorCell c = cells.get(i);
      colorMap.put(
          Integer.valueOf(CU.colorPtToFFRGB(palette[i] = c.setColor())), c);
    }

    // index all pixels to a pallete color

    pixels = indexPixels(cells, colorMap);
  }

  /**
   * Quantize colors by generating a set of cells in normalized L*a*b space
   * containing all colors. Start with just two cells -- fixed background color
   * and all others. Keep splitting cells while there are fewer than 256 and
   * some with multiple colors in them.
   * 
   * It is possible that we will end up with fewer than 256 colors.
   * 
   * @param tempColors
   * @return final list of colors
   */
  private Lst<ColorCell> quantizeColors(Lst<ColorItem> tempColors) {
    int n = tempColors.size();
    Lst<ColorCell> cells = new Lst<ColorCell>();
    ColorCell cc = new ColorCell(0);
    cc.addLast(new ColorItem(backgroundColor, true));
    cells.addLast(cc);
    cc = new ColorCell(1);
    if (n > 256)
      cells.addLast(cc);
    for (int i = 0; i < n; i++) {
      ColorItem c = tempColors.get(i);
      if (c.isBackground)
        continue;
      cc.addLast(c);
      if (n <= 256) {
        cells.addLast(cc);
        cc = new ColorCell(cells.size());
      }
    }
    tempColors.clear();
    if (n > 256)
      while ((n = cells.size()) < 256) {
        float maxVol = 0;
        ColorCell maxCell = null;
        for (int i = n; --i >= 1;) {
          ColorCell c = cells.get(i);
          float v = c.getVolume(false);
          if (v > maxVol) {
            maxVol = v;
            maxCell = c;
          }
        }
        if (maxCell == null || !maxCell.splitCell(cells))
          break;
      }
    return cells;
  }

  /**
   * 
   * Assign all colors to their closest approximation and return an array of
   * color indexes.
   * 
   * Uses Floyd-Steinberg dithering, finding the closest known color and then
   * spreading out the error over four leading pixels. Limits error to +/- 75
   * percent in normalized L*a*b space.
   * 
   * @param cells
   *        quantized color cells
   * @param colorMap
   *        map of quantized rgb to its cell
   * @return array of color indexes, one for each pixel
   * 
   */
  private int[] indexPixels(Lst<ColorCell> cells,
                            Map<Integer, ColorCell> colorMap) {
    // We need a strip only width+2 wide to process all the errors.
    // Errors are added to the next pixel and the next row's pixels 
    // only through p + width + 1:
    //         p  +1
    //   +w-1 +w  +w+1
    // so including p as well, we need a total of width + 2 errors.
    //
    // as p moves through the pixels, we just use mod to cycle through
    // this strip.
    //
    int w2 = width + 2;
    P3[] errors = new P3[w2];
    // We should replace, not overwrite, pixels 
    // as this may be the raw canvas.buf32.
    int[] newPixels = new int[pixels.length];
    P3 err = new P3();
    P3 lab;
    int rgb;
    Map<Integer, ColorCell> nearestCell = new Hashtable<Integer, ColorCell>();
    for (int i = 0, p = 0; i < height; ++i) {
      boolean notLastRow = (i != height - 1);
      for (int j = 0; j < width; ++j, p++) {
        if (pixels[p] == backgroundColor) {
          // leave as 0
          continue;
        }
        P3 pe = errors[p % w2];
        if (pe == null || pe.x == Float.MAX_VALUE) {
          lab = null;
          rgb = pixels[p];
        } else {
          lab = toLABnorm(pixels[p]);
          err = pe;
          // important not to round the clamp here -- full floating precision
          err.x = clamp(err.x, -75, 75);
          err.y = clamp(err.y, -75, 75);
          err.z = clamp(err.z, -75, 75);
          lab.add(err);
          rgb = CU.colorPtToFFRGB(toRGB(lab));
        }
        Integer key = Integer.valueOf(rgb);
        ColorCell cell = colorMap.get(key);
        if (cell == null) {
          // critical to generate normalized L*a*b from RGB here for nearestCell mapping.
          // otherwise future RGB keys may match the wrong cell
          lab = toLABnorm(rgb);
          cell = nearestCell.get(key);
          if (cell == null) {
            // find nearest cell
            float maxerr = Float.MAX_VALUE;
            // skip 0 0 0
            for (int ib = cells.size(); --ib >= 1;) {
              ColorCell c = cells.get(ib);
              err.sub2(lab, c.center);
              float d = err.lengthSquared();
              if (d < maxerr) {
                maxerr = d;
                cell = c;
              }
            }
            nearestCell.put(key, cell);
          }
          if (floydSteinberg) {
            // dither
            err.sub2(lab, cell.center);
            boolean notLastCol = (j < width - 1);
            if (notLastCol)
              addError(err, 7, errors, p + 1, w2);
            if (notLastRow) {
              if (j > 0)
                addError(err, 3, errors, p + width - 1, w2);
              addError(err, 5, errors, p + width, w2);
              if (notLastCol)
                addError(err, 1, errors, p + width + 1, w2);
            }
          }
          err.x = Float.MAX_VALUE; // used; flag for resetting to 0
        }
        newPixels[p] = cell.index;
      }
    }
    return newPixels;
  }

  private void addError(P3 err, int f, P3[] errors, int p, int w2) {
    // GIMP will allow changing the background color.
    if (pixels[p] == backgroundColor)
      return;
    p %= w2;
    P3 errp = errors[p];
    if (errp == null)
      errp = errors[p] = new P3();
    else if (errp.x == Float.MAX_VALUE) // reuse
      errp.set(0, 0, 0);
    errp.scaleAdd2(f / 16f, err, errp);
  }

  ///////////////////////// CIE L*a*b / XYZ / sRGB conversion methods /////////

  // these could be static, but that just makes for more JavaScript code

  protected P3 toLABnorm(int rgb) {
    P3 lab = CU.colorPtFromInt(rgb, null);
    rgbToXyz(lab, lab);
    xyzToLab(lab, lab);
    // normalize to 0-100
    lab.y = (lab.y + 86.185f) / (98.254f + 86.185f) * 100f;
    lab.z = (lab.z + 107.863f) / (94.482f + 107.863f) * 100f;
    return lab;
  }

  protected P3 toRGB(P3 lab) {
    P3 xyz = P3.newP(lab);
    // normalized to 0-100
    xyz.y = xyz.y / 100f * (98.254f + 86.185f) - 86.185f;
    xyz.z = xyz.z / 100f * (94.482f + 107.863f) - 107.863f;
    labToXyz(xyz, xyz);
    return xyzToRgb(xyz, xyz);
  }

  private static M3 xyz2rgb;
  private static M3 rgb2xyz;

  static {
    rgb2xyz = M3.newA9(new float[] { 0.4124f, 0.3576f, 0.1805f, 0.2126f,
        0.7152f, 0.0722f, 0.0193f, 0.1192f, 0.9505f });

    xyz2rgb = M3.newA9(new float[] { 3.2406f, -1.5372f, -0.4986f, -0.9689f,
        1.8758f, 0.0415f, 0.0557f, -0.2040f, 1.0570f });
  }

  public P3 rgbToXyz(P3 rgb, P3 xyz) {
    // http://en.wikipedia.org/wiki/CIE_1931_color_space
    // http://rsb.info.nih.gov/ij/plugins/download/Color_Space_Converter.java
    if (xyz == null)
      xyz = new P3();
    xyz.x = sxyz(rgb.x);
    xyz.y = sxyz(rgb.y);
    xyz.z = sxyz(rgb.z);
    rgb2xyz.rotate(xyz);
    return xyz;
  }

  private float sxyz(float x) {
    x /= 255;
    return (float) (x <= 0.04045 ? x / 12.92 : Math.pow(((x + 0.055) / 1.055),
        2.4)) * 100;
  }

  public P3 xyzToRgb(P3 xyz, P3 rgb) {
    // http://en.wikipedia.org/wiki/CIE_1931_color_space
    // http://rsb.info.nih.gov/ij/plugins/download/Color_Space_Converter.java
    if (rgb == null)
      rgb = new P3();
    rgb.setT(xyz);
    rgb.scale(0.01f);
    xyz2rgb.rotate(rgb);
    rgb.x = clamp(srgb(rgb.x), 0, 255);
    rgb.y = clamp(srgb(rgb.y), 0, 255);
    rgb.z = clamp(srgb(rgb.z), 0, 255);
    return rgb;
  }

  private float srgb(float x) {
    return (float) (x > 0.0031308f ? (1.055 * Math.pow(x, 1.0 / 2.4)) - 0.055
        : x * 12.92) * 255;
  }

  public P3 xyzToLab(P3 xyz, P3 lab) {
    // http://en.wikipedia.org/wiki/Lab_color_space
    // http://rsb.info.nih.gov/ij/plugins/download/Color_Space_Converter.java
    // Lab([0..100], [-86.185..98.254], [-107.863..94.482])
    // XYZn = D65 = {95.0429, 100.0, 108.8900};
    if (lab == null)
      lab = new P3();
    float x = flab(xyz.x / 95.0429f);
    float y = flab(xyz.y / 100);
    float z = flab(xyz.z / 108.89f);
    lab.x = (116 * y) - 16;
    lab.y = 500 * (x - y);
    lab.z = 200 * (y - z);
    return lab;
  }

  private float flab(float t) {
    return (float) (t > 8.85645168E-3 /* (24/116)^3 */? Math.pow(t,
        0.333333333) : 7.78703704 /* 1/3*116/24*116/24 */* t + 0.137931034 /* 16/116 */
    );
  }

  public P3 labToXyz(P3 lab, P3 xyz) {
    // http://en.wikipedia.org/wiki/Lab_color_space
    // http://rsb.info.nih.gov/ij/plugins/download/Color_Space_Converter.java
    // XYZn = D65 = {95.0429, 100.0, 108.8900};
    if (xyz == null)
      xyz = new P3();

    xyz.setT(lab);
    float y = (xyz.x + 16) / 116;
    float x = xyz.y / 500 + y;
    float z = y - xyz.z / 200;
    xyz.x = fxyz(x) * 95.0429f;
    xyz.y = fxyz(y) * 100;
    xyz.z = fxyz(z) * 108.89f;

    return xyz;
  }

  private float fxyz(float t) {
    return (float) (t > 0.206896552 /* (24/116) */? t * t * t
        : 0.128418549 /* 3*24/116*24/116 */* (t - 0.137931034 /* 16/116 */));
  }

  private float clamp(float c, float min, float max) {
    c = (c < min ? min : c > max ? max : c);
    return (min == 0 ? Math.round(c) : c);
  }

  ///////////////////////// GifEncoder writing methods ////////////////////////

  /**
   * includes logical screen descriptor
   * 
   * @throws IOException
   */
  private void writeHeader() throws IOException {
    putString("GIF89a");
    putWord(width);
    putWord(height);
    putByte(0); // no global color table -- using local instead
    putByte(0); // no background
    putByte(0); // no pixel aspect ratio given
  }

  private void writeGraphicControlExtension() {
    if (isTransparent || delayTime100ths >= 0) {
      putByte(0x21); // graphic control extension
      putByte(0xf9); // graphic control label
      putByte(4); // block size
      putByte((isTransparent ? 9 : 0) | (delayTime100ths > 0 ? 2 : 0)); // packed bytes 
      putWord(delayTime100ths > 0 ? delayTime100ths : 0);
      putByte(0); // transparent index
      putByte(0); // end-of-block
    }
  }

  // see  http://www.vurdalakov.net/misc/gif/netscape-looping-application-extension
  //      +---------------+
  //   0  |     0x21      |  Extension Label
  //      +---------------+
  //   1  |     0xFF      |  Application Extension Label
  //      +---------------+
  //   2  |     0x0B      |  Block Size
  //      +---------------+
  //   3  |               | 
  //      +-             -+
  //   4  |               | 
  //      +-             -+
  //   5  |               | 
  //      +-             -+
  //   6  |               | 
  //      +-  NETSCAPE   -+  Application Identifier (8 bytes)
  //   7  |               | 
  //      +-             -+
  //   8  |               | 
  //      +-             -+
  //   9  |               | 
  //      +-             -+
  //  10  |               | 
  //      +---------------+
  //  11  |               | 
  //      +-             -+
  //  12  |      2.0      |  Application Authentication Code (3 bytes)
  //      +-             -+
  //  13  |               | 
  //      +===============+                      --+
  //  14  |     0x03      |  Sub-block Data Size   |
  //      +---------------+                        |
  //  15  |     0x01      |  Sub-block ID          |
  //      +---------------+                        | Application Data Sub-block
  //  16  |               |                        |
  //      +-             -+  Loop Count (2 bytes)  |
  //  17  |               |                        |
  //      +===============+                      --+
  //  18  |     0x00      |  Block Terminator
  //      +---------------+

  private void writeNetscapeLoopExtension() {
    putByte(0x21); // graphic control extension
    putByte(0xff); // netscape loop extension
    putByte(0x0B); // block size
    putString("NETSCAPE2.0");
    putByte(3);
    putByte(1);
    putWord(0); // loop indefinitely
    putByte(0); // end-of-block

  }

  private int initCodeSize;
  private int curpt;

  private void writeImage() {
    putByte(0x2C);
    putWord(0); //left
    putWord(0); //top
    putWord(width);
    putWord(height);

    //    <Packed Fields>  =      LISx xZZZ

    //    L Local Color Table Flag
    //    I Interlace Flag
    //    S Sort Flag
    //    x Reserved
    //    ZZZ Size of Local Color Table

    int packedFields = 0x80 | (interlaced ? 0x40 : 0) | (bitsPerPixel - 1);
    putByte(packedFields);
    int colorMapSize = 1 << bitsPerPixel;
    P3 p = new P3();
    for (int i = 0; i < colorMapSize; i++) {
      if (palette[i] != null)
        p = palette[i];
      putByte((int) p.x);
      putByte((int) p.y);
      putByte((int) p.z);
    }
    putByte(initCodeSize = (bitsPerPixel <= 1 ? 2 : bitsPerPixel));
    compress();
    putByte(0);
  }

  private void writeTrailer() {
    // Write the GIF file terminator
    putByte(0x3B);
  }

  ///// compression routines /////

  private static final int EOF = -1;

  // Return the next pixel from the image
  private int nextPixel() {
    if (countDown-- == 0)
      return EOF;
    int colorIndex = pixels[curpt];
    // Bump the current X position
    ++curx;
    if (curx == width) {
      // If we are at the end of a scan line, set curx back to the beginning
      // If we are interlaced, bump the cury to the appropriate spot,
      // otherwise, just increment it.
      curx = 0;
      if (interlaced)
        updateY(INTERLACE_PARAMS[pass], INTERLACE_PARAMS[pass + 4]);
      else
        ++cury;
    }
    curpt = cury * width + curx;
    return colorIndex & 0xff;
  }

  private static final int[] INTERLACE_PARAMS = { 8, 8, 4, 2, 4, 2, 1, 0 };

  /**
   * 
   * Group 1 : Every 8th. row, starting with row 0. (Pass 1)
   * 
   * Group 2 : Every 8th. row, starting with row 4. (Pass 2)
   * 
   * Group 3 : Every 4th. row, starting with row 2. (Pass 3)
   * 
   * Group 4 : Every 2nd. row, starting with row 1. (Pass 4)
   * 
   * @param yNext
   * @param yNew
   */
  private void updateY(int yNext, int yNew) {
    cury += yNext;
    if (yNew >= 0 && cury >= height) {
      cury = yNew;
      ++pass;
    }
  }

  // Write out a word to the GIF file
  private void putWord(int w) {
    putByte(w);
    putByte(w >> 8);
  }

  // GIFCOMPR.C       - GIF Image compression routines
  //
  // Lempel-Ziv compression based on 'compress'.  GIF modifications by
  // David Rowley (mgardi@watdcsu.waterloo.edu)

  // General DEFINEs

  private static final int BITS = 12;

  private static final int HSIZE = 5003; // 80% occupancy

  // GIF Image compression - modified 'compress'
  //
  // Based on: compress.c - File compression ala IEEE Computer, June 1984.
  //
  // By Authors:  Spencer W. Thomas      (decvax!harpo!utah-cs!utah-gr!thomas)
  //              Jim McKie              (decvax!mcvax!jim)
  //              Steve Davies           (decvax!vax135!petsd!peora!srd)
  //              Ken Turkowski          (decvax!decwrl!turtlevax!ken)
  //              James A. Woods         (decvax!ihnp4!ames!jaw)
  //              Joe Orost              (decvax!vax135!petsd!joe)

  private int nBits; // number of bits/code
  private int maxbits = BITS; // user settable max # bits/code
  private int maxcode; // maximum code, given n_bits
  private int maxmaxcode = 1 << BITS; // should NEVER generate this code

  private final static int MAXCODE(int nBits) {
    return (1 << nBits) - 1;
  }

  private int[] htab = new int[HSIZE];
  private int[] codetab = new int[HSIZE];

  private int hsize = HSIZE; // for dynamic table sizing

  private int freeEnt = 0; // first unused entry

  // block compression parameters -- after all codes are used up,
  // and compression rate changes, start over.
  private boolean clearFlag = false;

  // Algorithm:  use open addressing double hashing (no chaining) on the
  // prefix code / next character combination.  We do a variant of Knuth's
  // algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime
  // secondary probe.  Here, the modular division first probe is gives way
  // to a faster exclusive-or manipulation.  Also do block compression with
  // an adaptive reset, whereby the code table is cleared when the compression
  // ratio decreases, but after the table fills.  The variable-length output
  // codes are re-sized at this point, and a special CLEAR code is generated
  // for the decompressor.  Late addition:  construct the table according to
  // file size for noticeable speed improvement on small files.  Please direct
  // questions about this implementation to ames!jaw.

  private int clearCode;
  private int EOFCode;

  private int countDown;
  private int pass = 0;
  private int curx, cury;

  private void compress() {

    // Calculate number of bits we are expecting
    countDown = width * height;

    // Indicate which pass we are on (if interlace)
    pass = 0;
    // Set up the current x and y position
    curx = 0;
    cury = 0;

    // Set up the necessary values
    clearFlag = false;
    nBits = initCodeSize + 1;
    maxcode = MAXCODE(nBits);

    clearCode = 1 << initCodeSize;
    EOFCode = clearCode + 1;
    freeEnt = clearCode + 2;

    // Set up the 'byte output' routine
    bufPt = 0;

    int ent = nextPixel();

    int hshift = 0;
    int fcode;
    for (fcode = hsize; fcode < 65536; fcode *= 2)
      ++hshift;
    hshift = 8 - hshift; // set hash code range bound

    int hsizeReg = hsize;
    clearHash(hsizeReg); // clear hash table

    output(clearCode);

    int c;
    outer_loop: while ((c = nextPixel()) != EOF) {
      fcode = (c << maxbits) + ent;
      int i = (c << hshift) ^ ent; // xor hashing

      if (htab[i] == fcode) {
        ent = codetab[i];
        continue;
      } else if (htab[i] >= 0) // non-empty slot
      {
        int disp = hsizeReg - i; // secondary hash (after G. Knott)
        if (i == 0)
          disp = 1;
        do {
          if ((i -= disp) < 0)
            i += hsizeReg;

          if (htab[i] == fcode) {
            ent = codetab[i];
            continue outer_loop;
          }
        } while (htab[i] >= 0);
      }
      output(ent);
      ent = c;
      if (freeEnt < maxmaxcode) {
        codetab[i] = freeEnt++; // code -> hashtable
        htab[i] = fcode;
      } else {
        clearBlock();
      }
    }
    // Put out the final code.
    output(ent);
    output(EOFCode);
  }

  // output
  //
  // Output the given code.
  // Inputs:
  //      code:   A n_bits-bit integer.  If == -1, then EOF.  This assumes
  //              that n_bits =< wordsize - 1.
  // Outputs:
  //      Outputs code to the file.
  // Assumptions:
  //      Chars are 8 bits long.
  // Algorithm:
  //      Maintain a BITS character long buffer (so that 8 codes will
  // fit in it exactly).  Use the VAX insv instruction to insert each
  // code in turn.  When the buffer fills up empty it and start over.

  private int curAccum = 0;
  private int curBits = 0;

  private int masks[] = { 0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F,
      0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF, 0x0FFF, 0x1FFF, 0x3FFF,
      0x7FFF, 0xFFFF };

  private void output(int code) {
    curAccum &= masks[curBits];

    if (curBits > 0)
      curAccum |= (code << curBits);
    else
      curAccum = code;

    curBits += nBits;

    while (curBits >= 8) {
      byteOut((byte) (curAccum & 0xff));
      curAccum >>= 8;
      curBits -= 8;
    }

    // If the next entry is going to be too big for the code size,
    // then increase it, if possible.
    if (freeEnt > maxcode || clearFlag) {
      if (clearFlag) {
        maxcode = MAXCODE(nBits = initCodeSize + 1);
        clearFlag = false;
      } else {
        ++nBits;
        if (nBits == maxbits)
          maxcode = maxmaxcode;
        else
          maxcode = MAXCODE(nBits);
      }
    }

    if (code == EOFCode) {
      // At EOF, write the rest of the buffer.
      while (curBits > 0) {
        byteOut((byte) (curAccum & 0xff));
        curAccum >>= 8;
        curBits -= 8;
      }
      flushBytes();
    }
  }

  // Clear out the hash table

  // table clear for block compress
  private void clearBlock() {
    clearHash(hsize);
    freeEnt = clearCode + 2;
    clearFlag = true;

    output(clearCode);
  }

  // reset code table
  private void clearHash(int hsize) {
    for (int i = 0; i < hsize; ++i)
      htab[i] = -1;
  }

  // GIF-specific routines (byte array buffer)

  // Number of bytes so far in this 'packet'
  private int bufPt;

  // Define the storage for the packet accumulator
  final private byte[] buf = new byte[256];

  // Add a byte to the end of the current packet, and if it is 254
  // byte, flush the packet to disk.
  private void byteOut(byte c) {
    buf[bufPt++] = c;
    if (bufPt >= 254)
      flushBytes();
  }

  // Flush the packet to disk, and reset the accumulator
  protected void flushBytes() {
    if (bufPt > 0) {
      putByte(bufPt);
      out.write(buf, 0, bufPt);
      byteCount += bufPt;
      bufPt = 0;
    }
  }

}
