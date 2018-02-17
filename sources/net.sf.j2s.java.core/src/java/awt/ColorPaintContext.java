/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1997, 2007, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */



package java.awt;

import java.awt.image.ColorModel;

class ColorPaintContext implements PaintContext {
    int color;
//    WritableRaster savedTile;

    protected ColorPaintContext(int color, ColorModel cm) {
        this.color = color;
    }

    @Override
		public void dispose() {
    }

    /*
     * Returns the RGB value representing the color in the default sRGB
     * {@link ColorModel}.
     * (Bits 24-31 are alpha, 16-23 are red, 8-15 are green, 0-7 are
     * blue).
     * @return the RGB value of the color in the default sRGB
     *         <code>ColorModel</code>.
     * @see java.awt.image.ColorModel#getRGBdefault
     * @see #getRed
     * @see #getGreen
     * @see #getBlue
     */
    int getRGB() {
        return color;
    }

    @Override
		public ColorModel getColorModel() {
        return ColorModel.getRGBdefault();
    }

//    public synchronized Raster getRaster(int x, int y, int w, int h) {
//        WritableRaster t = savedTile;
//
//        if (t == null || w > t.getWidth() || h > t.getHeight()) {
//            t = getColorModel().createCompatibleWritableRaster(w, h);
//            IntegerComponentRaster icr = (IntegerComponentRaster) t;
//            Arrays.fill(icr.getDataStorage(), color);
//            // Note - markDirty is probably unnecessary since icr is brand new
//            icr.markDirty();
//            if (w <= 64 && h <= 64) {
//                savedTile = t;
//            }
//        }
//
//        return t;
//    }
}
