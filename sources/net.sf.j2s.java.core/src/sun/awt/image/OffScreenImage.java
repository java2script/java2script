/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1996, 2007, Oracle and/or its affiliates. All rights reserved.
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

package sun.awt.image;

import java.awt.Component;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GraphicsEnvironment;
import java.awt.image.BufferedImage;
import java.awt.image.ImageProducer;

/**
 * This is a special variant of BufferedImage that keeps a reference to
 * a Component.  The Component's foreground and background colors and
 * default font are used as the defaults for this image.
 */
public class OffScreenImage extends BufferedImage {

    public OffScreenImage(int width, int height, int imageType) {
		super(width, height, imageType);
		// TODO Auto-generated constructor stub
	}

		protected Component c;
//    private OffScreenImageSource osis;
    private Font defaultFont;

//    /**
//     * Constructs an OffScreenImage given a color model and tile,
//     * for offscreen rendering to be used with a given component.
//     * The component is used to obtain the foreground color, background
//     * color and font.
//     */
//    public OffScreenImage(Component c, ColorModel cm, WritableRaster raster,
//                          boolean isRasterPremultiplied)
//    {
////        super(cm, raster, isRasterPremultiplied, null);
////        this.c = c;
////        initSurface(raster.getWidth(), raster.getHeight());
//    }

    @Override
		public Graphics getGraphics() {
        return createGraphics();
    }

    @Override
		public Graphics2D createGraphics() {
        if (c == null) {
            GraphicsEnvironment env =
                GraphicsEnvironment.getLocalGraphicsEnvironment();
            return env.createGraphics(this);
        }

//        Color bg = c.getBackground();
//        if (bg == null) {
//            bg = SystemColor.window;
//        }

//        Color fg = c.getForeground();
//        if (fg == null) {
//            fg = SystemColor.windowText;
//        }

        Font font = c.getFont();
        if (font == null) {
            if (defaultFont == null) {
                defaultFont = new Font("Dialog", Font.PLAIN, 12);
            }
            font = defaultFont;
        }
        return null;
        
//        return new SunGraphics2D(SurfaceData.getPrimarySurfaceData(this),
//                                 fg, bg, font);
    }

//    private void initSurface(int width, int height) {
//        Graphics2D g2 = createGraphics();
//        try {
//            g2.clearRect(0, 0, width, height);
//        } finally {
//            g2.dispose();
//        }
//    }

    @Override
		public ImageProducer getSource() {
//        if (osis == null) {
//            osis = new OffScreenImageSource(this);
//        }
//        return osis;
    	return null;
    }
}
