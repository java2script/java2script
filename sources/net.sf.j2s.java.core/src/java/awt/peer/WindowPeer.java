/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1995, 2013, Oracle and/or its affiliates. All rights reserved.
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

package java.awt.peer;

import java.awt.Color;
import java.awt.Dialog;
import java.awt.JSDialog;
import java.awt.Window;
import java.awt.image.BufferedImage;

/**
 * The peer interfaces are intended only for use in porting
 * the AWT. They are not intended for use by application
 * developers, and developers should not implement peers
 * nor invoke any of the peer methods directly on the peer
 * instances.
 * 
 * Not a LightWeightPeer
 * 
 */
public interface WindowPeer extends ContainerPeer {
    void toFront();
    void toBack();
    void updateAlwaysOnTopState();
    void updateFocusableWindowState();
    boolean requestWindowFocus();
    void setModalBlocked(Dialog blocker, boolean blocked);
    void updateMinimumSize();
    void updateIconImages();

    /**
     * Sets the level of opacity for the window.
     *
     * @see Window#setOpacity(float)
     */
    void setOpacity(float opacity);

    /**
     * Enables the per-pixel alpha support for the window.
     *
     * @see Window#setBackground(Color)
     */
    void setOpaque(boolean isOpaque);

    /**
     * Updates the native part of non-opaque window using
     * the given image with color+alpha values for each pixel.
     *
     * @see Window#setBackground(Color)
     */
    void updateWindow(BufferedImage backBuffer);

    /**
     * Instructs the peer to update the position of the security warning.
     */
    void repositionSecurityWarning();
    
		WindowPeer setFrame(Window target, boolean b);
		
}
