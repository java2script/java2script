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
package javax.swing.border;

import java.awt.Color;
import java.awt.Component;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Insets;
import java.awt.geom.Path2D;
import java.awt.geom.Rectangle2D;
import java.awt.geom.RoundRectangle2D;

/**
 * A class which implements a line border of arbitrary thickness
 * and of a single color.
 * <p>
 * <strong>Warning:</strong>
 * Serialized objects of this class will not be compatible with
 * future Swing releases. The current serialization support is
 * appropriate for short term storage or RMI between applications running
 * the same version of Swing.  As of 1.4, support for long term storage
 * of all JavaBeans<sup><font size="-2">TM</font></sup>
 * has been added to the <code>java.beans</code> package.
 * Please see {@link java.beans.XMLEncoder}.
 *
 * @author David Kloba
 */
public class LineBorder extends AbstractBorder
{
    private static Border blackLine;
    private static Border grayLine;

    protected final int thickness;
    protected final Color lineColor;
    protected final boolean roundedCorners;

    /** Convenience method for getting the Color.black LineBorder of thickness 1.
      */
    public static Border createBlackLineBorder() {
        if (blackLine == null) {
            blackLine = new LineBorder(Color.black, 1);
        }
        return blackLine;
    }

    /** Convenience method for getting the Color.gray LineBorder of thickness 1.
      */
    public static Border createGrayLineBorder() {
        if (grayLine == null) {
            grayLine = new LineBorder(Color.gray, 1);
        }
        return grayLine;
    }

    /**
     * Creates a line border with the specified color and a
     * thickness = 1.
     * @param color the color for the border
     */
    public LineBorder(Color color) {
        this(color, 1, false);
    }

    /**
     * Creates a line border with the specified color and thickness.
     * @param color the color of the border
     * @param thickness the thickness of the border
     */
    public LineBorder(Color color, int thickness)  {
        this(color, thickness, false);
    }

    /**
     * Creates a line border with the specified color, thickness,
     * and corner shape.
     * @param color the color of the border
     * @param thickness the thickness of the border
     * @param roundedCorners whether or not border corners should be round
     * @since 1.3
     */
    public LineBorder(Color color, int thickness, boolean roundedCorners)  {
        lineColor = color;
        this.thickness = thickness;
        this.roundedCorners = roundedCorners;
    }

    private RoundRectangle2D.Float 秘outerR;
    private RoundRectangle2D.Float 秘innerR;

    private Rectangle2D.Float 秘outer;
    private Rectangle2D.Float 秘inner;
    
    Path2D.Float 秘path = new Path2D.Float(Path2D.WIND_EVEN_ODD);

    /**
     * Paints the border for the specified component with the
     * specified position and size.
     * @param c the component for which this border is being painted
     * @param g the paint graphics
     * @param x the x position of the painted border
     * @param y the y position of the painted border
     * @param width the width of the painted border
     * @param height the height of the painted border
     */
    @Override
		public void paintBorder(Component c, Graphics g, int x, int y, int width, int height) {
        if ((this.thickness > 0)/* && (g instanceof Graphics2D)*/) {
            Graphics2D g2d = (Graphics2D) g;

            Color oldColor = g2d.getColor();
            g2d.setColor(this.lineColor);
            int offs = this.thickness;
            int size = offs + offs;
            秘path.clear();
            if (this.roundedCorners) {
                int arc = offs + size;
                if (秘outerR == null) {
                	秘outerR = new RoundRectangle2D.Float(x, y, width, height, arc, arc);
                	秘innerR = new RoundRectangle2D.Float(x + offs, y + offs, width - size, height - size, arc, arc);
                } else {
                	秘outerR.setRoundRect(x, y, width, height, arc, arc);
                	秘innerR.setRoundRect(x + offs, y + offs, width - size, height - size, arc, arc);
                }
                秘path.append(秘outer, false);
                秘path.append(秘inner, false);
            }
            else {
            	if (秘outer == null) {
            		秘outer = new Rectangle2D.Float(x-0.5f, y-0.5f, width+1, height+1);
            		秘inner = new Rectangle2D.Float(x + offs-0.5f, y + offs-0.5f, width - size+1, height - size+1);
            	} else {
                    秘outer.setRect(x-0.5f, y-0.5f, width+1, height+1);
                    秘inner.setRect(x + offs-0.5f, y + offs-0.5f, width - size+1, height - size+1);
            	}
                秘path.append(秘outer, false);
                秘path.append(秘inner, false);
            }
            g2d.fill(秘path);
            g2d.setColor(oldColor);
        }
    }

    /**
     * Returns the insets of the border.
     * @param c the component for which this border insets value applies
     */
    @Override
		public Insets getBorderInsets(Component c)       {
        return new Insets(thickness, thickness, thickness, thickness);
    }

    /**
     * Reinitialize the insets parameter with this Border's current Insets.
     * @param c the component for which this border insets value applies
     * @param insets the object to be reinitialized
     */
    @Override
		public Insets getBorderInsets(Component c, Insets insets) {
        insets.left = insets.top = insets.right = insets.bottom = thickness;
        return insets;
    }

    /**
     * Returns the color of the border.
     */
    public Color getLineColor()     {
        return lineColor;
    }

    /**
     * Returns the thickness of the border.
     */
    public int getThickness()       {
        return thickness;
    }

    /**
     * Returns whether this border will be drawn with rounded corners.
     * @since 1.3
     */
    public boolean getRoundedCorners() {
        return roundedCorners;
    }

    /**
     * Returns whether or not the border is opaque.
     */
    @Override
		public boolean isBorderOpaque() {
        return !roundedCorners;
    }

}
