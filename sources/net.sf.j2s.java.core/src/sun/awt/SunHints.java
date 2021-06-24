/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1998, 2005, Oracle and/or its affiliates. All rights reserved.
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

package sun.awt;

////import java.lang.ref.WeakReference;
//import java.util.HashMap;
//
//import java.awt.RenderingHints;

///**
// * This class contains rendering hints that can be used by the
// * {@link java.awt.Graphics2D} class, and classes that implement
// * {@link java.awt.image.BufferedImageOp} and
// * {@link java.awt.image.Raster}.
// */
public class SunHints {
	// moved to java.awt.RenderingHints
	

//    private static final int NUM_KEYS = 10;
//    private static final int VALS_PER_KEY = 8;

    /**
     * Rendering hint key and values
     */
    /*@native*/ public static final int INTKEY_RENDERING = 0;
    /*@native*/ public static final int INTVAL_RENDER_DEFAULT = 0;
    /*@native*/ public static final int INTVAL_RENDER_SPEED = 1;
    /*@native*/ public static final int INTVAL_RENDER_QUALITY = 2;

    /**
     * Antialiasing hint key and values
     */
    /*@native*/ public static final int INTKEY_ANTIALIASING = 1;
    /*@native*/ public static final int INTVAL_ANTIALIAS_DEFAULT = 0;
    /*@native*/ public static final int INTVAL_ANTIALIAS_OFF = 1;
    /*@native*/ public static final int INTVAL_ANTIALIAS_ON = 2;

    /**
     * Text antialiasing hint key and values
     */
    /*@native*/ public static final int INTKEY_TEXT_ANTIALIASING = 2;
    /*@native*/ public static final int INTVAL_TEXT_ANTIALIAS_DEFAULT = 0;
    /*@native*/ public static final int INTVAL_TEXT_ANTIALIAS_OFF = 1;
    /*@native*/ public static final int INTVAL_TEXT_ANTIALIAS_ON = 2;
    /*@native*/ public static final int INTVAL_TEXT_ANTIALIAS_GASP = 3;
    /*@native*/ public static final int INTVAL_TEXT_ANTIALIAS_LCD_HRGB = 4;
    /*@native*/ public static final int INTVAL_TEXT_ANTIALIAS_LCD_HBGR = 5;
    /*@native*/ public static final int INTVAL_TEXT_ANTIALIAS_LCD_VRGB = 6;
    /*@native*/ public static final int INTVAL_TEXT_ANTIALIAS_LCD_VBGR = 7;

    /**
     * Font fractional metrics hint key and values
     */
    /*@native*/ public static final int INTKEY_FRACTIONALMETRICS = 3;
    /*@native*/ public static final int INTVAL_FRACTIONALMETRICS_DEFAULT = 0;
    /*@native*/ public static final int INTVAL_FRACTIONALMETRICS_OFF = 1;
    /*@native*/ public static final int INTVAL_FRACTIONALMETRICS_ON = 2;

    /**
     * Dithering hint key and values
     */
    /*@native*/ public static final int INTKEY_DITHERING = 4;
    /*@native*/ public static final int INTVAL_DITHER_DEFAULT = 0;
    /*@native*/ public static final int INTVAL_DITHER_DISABLE = 1;
    /*@native*/ public static final int INTVAL_DITHER_ENABLE = 2;

    /**
     * Interpolation hint key and values
     */
    /*@native*/ public static final int INTKEY_INTERPOLATION = 5;
    /*@native*/ public static final int INTVAL_INTERPOLATION_NEAREST_NEIGHBOR = 0;
    /*@native*/ public static final int INTVAL_INTERPOLATION_BILINEAR = 1;
    /*@native*/ public static final int INTVAL_INTERPOLATION_BICUBIC = 2;

    /**
     * Alpha interpolation hint key and values
     */
    /*@native*/ public static final int INTKEY_ALPHA_INTERPOLATION = 6;
    /*@native*/ public static final int INTVAL_ALPHA_INTERPOLATION_DEFAULT = 0;
    /*@native*/ public static final int INTVAL_ALPHA_INTERPOLATION_SPEED = 1;
    /*@native*/ public static final int INTVAL_ALPHA_INTERPOLATION_QUALITY = 2;

    /**
     * Color rendering hint key and values
     */
    /*@native*/ public static final int INTKEY_COLOR_RENDERING = 7;
    /*@native*/ public static final int INTVAL_COLOR_RENDER_DEFAULT = 0;
    /*@native*/ public static final int INTVAL_COLOR_RENDER_SPEED = 1;
    /*@native*/ public static final int INTVAL_COLOR_RENDER_QUALITY = 2;

    /**
     * Stroke normalization control hint key and values
     */
    /*@native*/ public static final int INTKEY_STROKE_CONTROL = 8;
    /*@native*/ public static final int INTVAL_STROKE_DEFAULT = 0;
    /*@native*/ public static final int INTVAL_STROKE_NORMALIZE = 1;
    /*@native*/ public static final int INTVAL_STROKE_PURE = 2;

    /**
     * Image scaling hint key and values
     */
    /*@native*/ public static final int INTKEY_RESOLUTION_VARIANT = 9;
    /*@native*/ public static final int INTVAL_RESOLUTION_VARIANT_DEFAULT = 0;
    /*@native*/ public static final int INTVAL_RESOLUTION_VARIANT_OFF = 1;
    /*@native*/ public static final int INTVAL_RESOLUTION_VARIANT_ON = 2;
    /**
     * LCD text contrast control hint key.
     * Value is "100" to make discontiguous with the others which
     * are all enumerative and are of a different class.
     */
    /*@native*/ public static final int INTKEY_AATEXT_LCD_CONTRAST = 100;


}
