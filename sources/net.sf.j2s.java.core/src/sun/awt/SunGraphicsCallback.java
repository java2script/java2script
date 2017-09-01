/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1999, 2007, Oracle and/or its affiliates. All rights reserved.
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

import java.awt.Component;
import java.awt.Container;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.Shape;


public abstract class SunGraphicsCallback {
    public static final int HEAVYWEIGHTS = 0x1;
    public static final int LIGHTWEIGHTS = 0x2;
    public static final int TWO_PASSES = 0x4;

//    private static final Logger log = Logger.getLogger("sun.awt.SunGraphicsCallback");

    public abstract void run(Component comp, Graphics cg);

    /**
     * This method is particularly entered by 
     * 
     * In SwingJS we consider the graphic to be owned be a background for
     * the content pane. As such, its lower bound is 0,0, not bounds.x, bounds.y
     *  
     *   
     * @param g
     * @param bounds
     */
    protected void constrainGraphics(Graphics g, Rectangle bounds) {
//        if (g instanceof ConstrainableGraphics) {
//            ((ConstrainableGraphics)g).constrain(bounds.x, bounds.y, bounds.width, bounds.height);
//        } else {
//           // g.translate(bounds.x, bounds.y);
//        }
        g.clipRect(0, 0, bounds.width, bounds.height);
    }

    /**
     * 
     * @param comp
     * @param bounds
     * @param g
     * @param clip
     * @param weightFlags
     */
    public final void runOneComponent(Component comp, Rectangle bounds,
                                      Graphics g, Shape clip,
                                      int weightFlags) {
        if (comp == null /* || !comp.isLightweight() getPeer() == null*/ || !comp.isVisible()) {
            return;
        }
        boolean lightweight = true;//comp.isLightweight();
        if ((lightweight && (weightFlags & LIGHTWEIGHTS) == 0) ||
            (!lightweight && (weightFlags & HEAVYWEIGHTS) == 0)) {
            return;
        }

        if (bounds == null) {
            bounds = comp.getBounds();
        }

        if (clip == null || clip.intersects(bounds)) {
            Graphics cg = g.create();
            try {
            	// note: this caused problems with JDialog
                //constrainGraphics(cg, bounds);
                cg.setFont(comp.getFont());
                cg.setColor(comp.getForeground());
                if (cg instanceof Graphics2D) {
                    ((Graphics2D)cg).setBackground(comp.getBackground());
                } else if (cg instanceof Graphics2Delegate) {
                    ((Graphics2Delegate)cg).setBackground(
                        comp.getBackground());
                }
                run(comp, cg);
            } finally {
                cg.dispose();
            }
        }
    }

    /**
     * clip the graphic and run its paint method. Called by 
     * Container.paint, which is only called for a top-level
     * window such as JFrame, JDialog, and JWindow.
     * 
     * 
     * @param comps
     * @param g
     * @param weightFlags
     */
    public final void runComponents(Component[] comps, Graphics g,
                                    int weightFlags) {
        int ncomponents = comps.length;
        
        // SwingJS -- this will be null because it is not implemented
        Shape clip = g.getClip();

//        if (log.isLoggable(Level.FINER) && (clip != null)) {
//            Rectangle newrect = clip.getBounds();
//            log.log(Level.FINER, "x = " + newrect.x + ", y = " + newrect.y +
//                                 ", width = " + newrect.width +
//                                 ", height = " + newrect.height);
//        }

        // A seriously sad hack--
        // Lightweight components always paint behind peered components,
        // even if they are at the top of the Z order. We emulate this
        // behavior by making two printing passes: the first for lightweights;
        // the second for heavyweights.
        //
        // ToDo(dpm): Either build a list of heavyweights during the
        // lightweight pass, or redesign the components array to keep
        // lightweights and heavyweights separate.
//        if ((weightFlags & TWO_PASSES) != 0) {
//            for (int i = ncomponents - 1; i >= 0; i--) {
//                runOneComponent(comps[i], null, g, clip, LIGHTWEIGHTS);
//            }
//            for (int i = ncomponents - 1; i >= 0; i--) {
//                runOneComponent(comps[i], null, g, clip, HEAVYWEIGHTS);
//            }
//        } else {
            for (int i = ncomponents - 1; i >= 0; i--) {
                runOneComponent(comps[i], null, g, clip, weightFlags);
            }
//        }
    }

    public static final class PaintHeavyweightComponentsCallback
        extends SunGraphicsCallback
    {
        private static PaintHeavyweightComponentsCallback instance =
            new PaintHeavyweightComponentsCallback();

        private PaintHeavyweightComponentsCallback() {}
        @Override
				public void run(Component comp, Graphics cg) {
            if (!comp.isLightweight()) {
                comp.paintAll(cg);
            } else if (comp instanceof Container) {
                runComponents(((Container)comp).getComponents(), cg,
                              LIGHTWEIGHTS | HEAVYWEIGHTS);
            }
        }
        public static PaintHeavyweightComponentsCallback getInstance() {
            return instance;
        }
    }
    
//    public static final class PrintHeavyweightComponentsCallback
//        extends SunGraphicsCallback
//    {
//        private static PrintHeavyweightComponentsCallback instance =
//            new PrintHeavyweightComponentsCallback();
//
//        private PrintHeavyweightComponentsCallback() {}
//        public void run(Component comp, Graphics cg) {
//            if (!comp.isLightweight()) {
//                comp.printAll(cg);
//            } else if (comp instanceof Container) {
//                runComponents(((Container)comp).getComponents(), cg,
//                              LIGHTWEIGHTS | HEAVYWEIGHTS);
//            }
//        }
//        public static PrintHeavyweightComponentsCallback getInstance() {
//            return instance;
//        }
//    }
}
