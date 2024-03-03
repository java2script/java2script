/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1997, 2006, Oracle and/or its affiliates. All rights reserved.
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

import java.util.Vector;

import javax.swing.border.EmptyBorder;

import java.awt.Component;
import java.awt.Graphics;
import java.awt.Insets;
import java.awt.JSComponent;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
//

/**
 * An implementation of a menu bar. You add <code>JMenu</code> objects to the
 * menu bar to construct a menu. When the user selects a <code>JMenu</code>
 * object, its associated <code>JPopupMenu</code> is displayed, allowing the
 * user to select one of the <code>JMenuItems</code> on it.
 * <p>
 * For information and examples of using menu bars see
 * <a
 href="http://java.sun.com/docs/books/tutorial/uiswing/components/menu.html">How to Use Menus</a>,
 * a section in <em>The Java Tutorial.</em>
 * <p>
 * <strong>Warning:</strong> Swing is not thread safe. For more
 * information see <a
 * href="package-summary.html#threading">Swing's Threading
 * Policy</a>.
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
 * @beaninfo
 *   attribute: isContainer true
 * description: A container for holding and displaying menus.
 *
 * @author Georges Saab
 * @author David Karlton
 * @author Arnaud Weber
 * @see JMenu
 * @see JPopupMenu
 * @see JMenuItem
 */
@SuppressWarnings({"rawtypes", "unchecked"})
public class JMenuBar extends JComponent implements MenuElement
{
    /*
     * Model for the selected subcontrol.
     */
    private transient SingleSelectionModel selectionModel;

    private boolean paintBorder           = false;//SwingJS true;
    private Insets     margin             = null;

//    /* diagnostic aids -- should be false for production builds. */
//    private static final boolean TRACE =   false; // trace creates and disposes
//    private static final boolean VERBOSE = false; // show reuse hits/misses
//    private static final boolean DEBUG =   false;  // show bad params, misc.

    /**
     * Creates a new menu bar.
     */
    public JMenuBar() {
        super();
        setBorder(new EmptyBorder(4, 4, 2, 4));
        //setFocusTraversalKeysEnabled(false);
        setSelectionModel(new DefaultSingleSelectionModel());
        updateUI();
    }

	@Override
	public String getUIClassID() {
		return "MenuBarUI";
	}



    /**
     * Returns the model object that handles single selections.
     *
     * @return the <code>SingleSelectionModel</code> property
     * @see SingleSelectionModel
     */
    public SingleSelectionModel getSelectionModel() {
        return selectionModel;
    }

    /**
     * Sets the model object to handle single selections.
     *
     * @param model the <code>SingleSelectionModel</code> to use
     * @see SingleSelectionModel
     * @beaninfo
     *       bound: true
     * description: The selection model, recording which child is selected.
     */
    public void setSelectionModel(SingleSelectionModel model) {
        SingleSelectionModel oldValue = selectionModel;
        this.selectionModel = model;
        firePropertyChange("selectionModel", oldValue, selectionModel);
    }


    /**
     * Appends the specified menu to the end of the menu bar.
     *
     * @param c the <code>JMenu</code> component to add
     * @return the menu component
     */
    public JMenu add(JMenu c) {
        super.add(c);
        return c;
    }

    /**
     * Returns the menu at the specified position in the menu bar.
     *
     * @param index  an integer giving the position in the menu bar, where
     *               0 is the first position
     * @return the <code>JMenu</code> at that position, or <code>null</code> if
     *          if there is no <code>JMenu</code> at that position (ie. if
     *          it is a <code>JMenuItem</code>)
     */
    public JMenu getMenu(int index) {
        Component c = getComponentAtIndex(index);
        if (c instanceof JMenu)
            return (JMenu) c;
        return null;
    }

    /**
     * Returns the number of items in the menu bar.
     *
     * @return the number of items in the menu bar
     */
    public int getMenuCount() {
        return getComponentCount();
    }

    /**
     * Sets the help menu that appears when the user selects the
     * "help" option in the menu bar. This method is not yet implemented
     * and will throw an exception.
     *
     * @param menu the JMenu that delivers help to the user
     */
    public void setHelpMenu(JMenu menu) {
        throw new Error("setHelpMenu() not yet implemented.");
    }

    /**
     * Gets the help menu for the menu bar.  This method is not yet
     * implemented and will throw an exception.
     *
     * @return the <code>JMenu</code> that delivers help to the user
     */
    public JMenu getHelpMenu() {
        throw new Error("getHelpMenu() not yet implemented.");
    }

    /**
     * Returns the component at the specified index.
     *
     * @param i an integer specifying the position, where 0 is first
     * @return the <code>Component</code> at the position,
     *          or <code>null</code> for an invalid index
     * @deprecated replaced by <code>getComponent(int i)</code>
     */
    @Deprecated
    public Component getComponentAtIndex(int i) {
        if(i < 0 || i >= getComponentCount()) {
            return null;
        }
        return getComponent(i);
    }

    /**
     * Returns the index of the specified component.
     *
     * @param c  the <code>Component</code> to find
     * @return an integer giving the component's position, where 0 is first;
     *          or -1 if it can't be found
     */
    public int getComponentIndex(Component c) {
        int ncomponents = this.getComponentCount();
        Component[] components = JSComponent.秘getChildArray(this);
        for (int i = 0 ; i < ncomponents ; i++) {
            Component comp = components[i];
            if (comp == c)
                return i;
        }
        return -1;
    }

    /**
     * Sets the currently selected component, producing a
     * a change to the selection model.
     *
     * @param sel the <code>Component</code> to select
     */
    public void setSelected(Component sel) {
        SingleSelectionModel model = getSelectionModel();
        int index = getComponentIndex(sel);
        model.setSelectedIndex(index);
    }

    /**
     * Returns true if the menu bar currently has a component selected.
     *
     * @return true if a selection has been made, else false
     */
    public boolean isSelected() {
        return selectionModel.isSelected();
    }

    /**
     * Returns true if the menu bars border should be painted.
     *
     * @return  true if the border should be painted, else false
     */
    public boolean isBorderPainted() {
        return paintBorder;
    }

    /**
     * Sets whether the border should be painted.
     *
     * @param b if true and border property is not <code>null</code>,
     *          the border is painted.
     * @see #isBorderPainted
     * @beaninfo
     *        bound: true
     *    attribute: visualUpdate true
     *  description: Whether the border should be painted.
     */
    public void setBorderPainted(boolean b) {
      /**
       * @j2sNative
       * 
       */
      {
        boolean oldValue = paintBorder;
        paintBorder = b;
        firePropertyChange("borderPainted", oldValue, paintBorder);
        if (b != oldValue) {
            revalidate();
            秘repaint();
        }
      }
    }

    /**
     * Paints the menubar's border if <code>BorderPainted</code>
     * property is true.
     *
     * @param g the <code>Graphics</code> context to use for painting
     * @see JComponent#paint
     * @see JComponent#setBorder
     */
    @Override
		protected void paintBorder(Graphics g) {
        if (isBorderPainted()) {
            super.paintBorder(g);
        }
    }

    /**
     * Sets the margin between the menubar's border and
     * its menus. Setting to <code>null</code> will cause the menubar to
     * use the default margins.
     *
     * @param m an Insets object containing the margin values
     * @see Insets
     * @beaninfo
     *        bound: true
     *    attribute: visualUpdate true
     *  description: The space between the menubar's border and its contents
     */
    public void setMargin(Insets m) {
        Insets old = margin;
        this.margin = m;
        firePropertyChange("margin", old, m);
        if (old == null || !old.equals(m)) {
            revalidate();
            秘repaint();
        }
    }

    /**
     * Returns the margin between the menubar's border and
     * its menus.  If there is no previous margin, it will create
     * a default margin with zero size.
     *
     * @return an <code>Insets</code> object containing the margin values
     * @see Insets
     */
    public Insets getMargin() {
        if(margin == null) {
            return new Insets(0,0,0,0);
        } else {
            return margin;
        }
    }


    /**
     * Implemented to be a <code>MenuElement</code> -- does nothing.
     *
     * @see #getSubElements
     */
    @Override
		public void processMouseEvent(MouseEvent event,MenuElement path[],MenuSelectionManager manager) {
    }

    /**
     * Implemented to be a <code>MenuElement</code> -- does nothing.
     *
     * @see #getSubElements
     */
    @Override
		public void processKeyEvent(KeyEvent e,MenuElement path[],MenuSelectionManager manager) {
    }

    /**
     * Implemented to be a <code>MenuElement</code> -- does nothing.
     *
     * @see #getSubElements
     */
    @Override
		public void menuSelectionChanged(boolean isIncluded) {
    }

    /**
     * Implemented to be a <code>MenuElement</code> -- returns the
     * menus in this menu bar.
     * This is the reason for implementing the <code>MenuElement</code>
     * interface -- so that the menu bar can be treated the same as
     * other menu elements.
     * @return an array of menu items in the menu bar.
     */
    @Override
		public MenuElement[] getSubElements() {
        MenuElement result[];
        Vector tmp = new Vector();
        int c = getComponentCount();
        int i;
        Component m;

        for(i=0 ; i < c ; i++) {
            m = getComponent(i);
            if(m instanceof MenuElement)
                tmp.addElement(m);
        }

        result = new MenuElement[tmp.size()];
        for(i=0,c=tmp.size() ; i < c ; i++)
            result[i] = (MenuElement) tmp.elementAt(i);
        return result;
    }

    /**
     * Implemented to be a <code>MenuElement</code>. Returns this object.
     *
     * @return the current <code>Component</code> (this)
     * @see #getSubElements
     */
    @Override
		public Component getComponent() {
        return this;
    }


    /**
     * Returns a string representation of this <code>JMenuBar</code>.
     * This method
     * is intended to be used only for debugging purposes, and the
     * content and format of the returned string may vary between
     * implementations. The returned string may be empty but may not
     * be <code>null</code>.
     *
     * @return  a string representation of this <code>JMenuBar</code>
     */
    @Override
		protected String paramString() {
        String paintBorderString = (paintBorder ?
                                    "true" : "false");
        String marginString = (margin != null ?
                               margin.toString() : "");

        return super.paramString() +
        ",margin=" + marginString +
        ",paintBorder=" + paintBorderString;
    }


    /**
     * Subclassed to check all the child menus.
     * @since 1.3
     */
    @Override
		protected boolean processKeyBinding(KeyStroke ks, KeyEvent e,
                                        int condition, boolean pressed) {
        // See if we have a local binding.
        boolean retValue = super.processKeyBinding(ks, e, condition, pressed);
        if (!retValue) {
            MenuElement[] subElements = getSubElements();
            for (int i=0; i<subElements.length; i++) {
                if (processBindingForKeyStrokeRecursive(
                                                        subElements[i], ks, e, condition, pressed)) {
                    return true;
                }
            }
        }
        return retValue;
    }

    static boolean processBindingForKeyStrokeRecursive(MenuElement elem,
                                                       KeyStroke ks, KeyEvent e, int condition, boolean pressed) {
        if (elem == null) {
            return false;
        }

        Component c = elem.getComponent();

        if ( !(c.isVisible() || (c instanceof JPopupMenu)) || !c.isEnabled() ) {
            return false;
        }

        if (c != null && c instanceof JComponent &&
            ((JComponent)c).processKeyBinding(ks, e, condition, pressed)) {

            return true;
        }

        MenuElement[] subElements = elem.getSubElements();
        for(int i=0; i<subElements.length; i++) {
            if (processBindingForKeyStrokeRecursive(subElements[i], ks, e,
                                                    condition, pressed)) {
                return true;
                // We don't, pass along to children JMenu's
            }
        }
        return false;
    }

    /**
     * Overrides <code>JComponent.addNotify</code> to register this
     * menu bar with the current keyboard manager.
     */
    @Override
		public void addNotify() {
        super.addNotify();
        KeyboardManager.getCurrentManager().registerMenuBar(this);
    }

    /**
     * Overrides <code>JComponent.removeNotify</code> to unregister this
     * menu bar with the current keyboard manager.
     */
    @Override
		public void removeNotify() {
        super.removeNotify();
        KeyboardManager.getCurrentManager().unregisterMenuBar(this);
    }

}
