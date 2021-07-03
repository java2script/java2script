/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1997, 2003, Oracle and/or its affiliates. All rights reserved.
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
package javax.swing;

import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Graphics;
import java.awt.Rectangle;
import swingjs.api.js.DOMNode;
import swingjs.plaf.JSComponentUI;

/**
 * This class is inserted in between cell renderers and the components that
 * use them.  It just exists to thwart the repaint() and invalidate() methods
 * which would otherwise propagate up the tree when the renderer was configured.
 * It's used by the implementations of JTable, JTree, and JList.  For example,
 * here's how CellRendererPane is used in the code the paints each row
 * in a JList:
 * <pre>
 *   cellRendererPane = new CellRendererPane();
 *   ...
 *   Component rendererComponent = renderer.getListCellRendererComponent();
 *   renderer.configureListCellRenderer(dataModel.getElementAt(row), row);
 *   cellRendererPane.paintComponent(g, rendererComponent, this, x, y, w, h);
 * </pre>
 * <p>
 * A renderer component must override isShowing() and unconditionally return
 * true to work correctly because the Swing paint does nothing for components
 * with isShowing false.
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
 * @author Hans Muller
 */
public class CellRendererPane extends JPanel
{
	// SwingJS switched to JPanel instead of Container
	// This class is essentially final. Only UI classes create it.

    /**
     * Construct a CellRendererPane object.
     */
    public CellRendererPane() {
        super();
    	秘isCRP = true;
    	秘paintClass = 秘updateClass = /**@j2sNative C$ || */null;

        setLayout(null);
        setVisible(false);
    }

    /**
     * Overridden to avoid propagating a invalidate up the tree when the
     * cell renderer child is configured.
     */
    @Override
		public void invalidate() { }


    @Override
		public void repaint() { 
    	// called by 
    }

    /**
     * Shouldn't be called.
     */
    @Override
		public void paint(Graphics g) { }


    /**
     * Shouldn't be called.
     */
    @Override
		public void update(Graphics g) { }


    /**
     * If the specified component is already a child of this then we don't
     * bother doing anything - stacking order doesn't matter for cell
     * renderer components (CellRendererPane doesn't paint anyway).<
     */
    @Override
		protected void addImpl(Component x, Object constraints, int index) {
        if (x.getParent() != this)
        	addImplCont(x, constraints, index);
    }


    /**
     * Paint a cell renderer component c on graphics object g.  Before the component
     * is drawn it's reparented to this (if that's necessary), its bounds
     * are set to w,h and the graphics object is (effectively) translated to x,y.
     * If it's a JComponent, double buffering is temporarily turned off. After
     * the component is painted its bounds are reset to -w, -h, 0, 0 so that, if
     * it's the last renderer component painted, it will not start consuming input.
     * The Container p is the component we're actually drawing on, typically it's
     * equal to this.getParent(). If shouldValidate is true the component c will be
     * validated before painted.
     * 
     * @param g
     * @param c
     * @param p
     * @param x
     * @param y
     * @param w
     * @param h
     * @param shouldValidate  probably a NOP
     */
    public void paintComponent(Graphics g, Component c, Container p, int x, int y, int w, int h, boolean shouldValidate) {
    	// p is the table, list, etc. 
      if (c == null) {
          if (p != null) {
              Color oldColor = g.getColor();
              g.setColor(p.getBackground());
              g.fillRect(x, y, w, h);
              g.setColor(oldColor);
          }
          return;
      }

      if (c.getParent() != this) {
          this.add(c);
      }

      c.秘reshape(-w, -h, 0, 0, false); // force new bounds
      
//      if(shouldValidate) {
//    	  // unlikely that this will do much; only JRootPane does anything significant here. 
//          c.validate();
//      } 
	  JSComponentUI ui = ((JComponent) c).秘getUI();
      c.秘reshape(0, 0, w, h, false);
      // x and y are not used in Component.reshape in SwingJS
      //c.setLocation(x, y);
      //ui.setBounds(x,  y, 0, 0, ComponentPeer.SET_LOCATION);
      ((JComponent) c).validateTree();
      ui.updateDOMNode();
      if (p instanceof JTable)
    	  DOMNode.setTopLeftAbsolute(ui.domNode, ((JTable) p).getRowMargin() / 2, ((JTable) p).getColumnModel().getColumnMargin() / 2);
      if (c instanceof JLabel)
    	  DOMNode.setStyle(ui.domNode, "overflow", "hidden");
//          if (!ui.doPaintBackground())
//        	  return;
//	  ui.setTainted(false);
      
//      boolean wasDoubleBuffered = false;
//      if ((c instanceof JComponent) && ((JComponent)c).isDoubleBuffered()) {
//          wasDoubleBuffered = true;
//          ((JComponent)c).setDoubleBuffered(false);
//      }

      Graphics cg = g.create(x, y, w, h);
      try {
          c.paint(cg);
      }
      finally {
          cg.dispose();
      }

//      if (wasDoubleBuffered && (c instanceof JComponent)) {
//          ((JComponent)c).setDoubleBuffered(true);
//      }
//
      c.秘reshape(-w, -h, 0, 0, false);
      
		}

		/**
     * Calls this.paintComponent(g, c, p, x, y, w, h, false).
     */
    public void paintComponent(Graphics g, Component c, Container p, int x, int y, int w, int h) {
        paintComponent(g, c, p, x, y, w, h, false);
    }


    /**
     * Calls this.paintComponent() with the rectangles x,y,width,height fields.
     */
    public void paintComponent(Graphics g, Component c, Container p, Rectangle r) {
        paintComponent(g, c, p, r.x, r.y, r.width, r.height, false);
    }


//    private void writeObject(ObjectOutputStream s) throws IOException {
//        removeAll();
//        s.defaultWriteObject();
//    }
//

/////////////////
// Accessibility support
////////////////
//
//    protected AccessibleContext accessibleContext = null;
//
//    /**
//     * Gets the AccessibleContext associated with this CellRendererPane.
//     * For CellRendererPanes, the AccessibleContext takes the form of an
//     * AccessibleCellRendererPane.
//     * A new AccessibleCellRendererPane instance is created if necessary.
//     *
//     * @return an AccessibleCellRendererPane that serves as the
//     *         AccessibleContext of this CellRendererPane
//     */
//    public AccessibleContext getAccessibleContext() {
//        if (accessibleContext == null) {
//            accessibleContext = new AccessibleCellRendererPane();
//        }
//        return accessibleContext;
//    }
//
//    /**
//     * This class implements accessibility support for the
//     * <code>CellRendererPane</code> class.
//     */
//    protected class AccessibleCellRendererPane extends AccessibleAWTContainer {
//        // AccessibleContext methods
//        //
//        /**
//         * Get the role of this object.
//         *
//         * @return an instance of AccessibleRole describing the role of the
//         * object
//         * @see AccessibleRole
//         */
//        public AccessibleRole getAccessibleRole() {
//            return AccessibleRole.PANEL;
//        }
//    } // inner class AccessibleCellRendererPane
}
