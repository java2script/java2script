/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1998, 2004, Oracle and/or its affiliates. All rights reserved.
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

/**
 * The default model for combo boxes.
 *
 * @author Arnaud Weber
 * @author Tom Santos
 */

@SuppressWarnings({"rawtypes", "unchecked"})
public class DefaultComboBoxModel<E> extends AbstractListModel<E> implements MutableComboBoxModel<E> {
    Vector<E> objects;
    Object selectedObject;
	private boolean _isQuiet;

    /**
     * Constructs an empty DefaultComboBoxModel object.
     */
    public DefaultComboBoxModel() {
        objects = new Vector();
    }

    /**
     * Constructs a DefaultComboBoxModel object initialized with
     * an array of objects.
     *
     * @param items  an array of Object objects
     */
    public DefaultComboBoxModel(final E items[]) {
        objects = new Vector();
        objects.ensureCapacity( items.length );

        int i,c;
        for ( i=0,c=items.length;i<c;i++ )
            objects.addElement(items[i]);

        if ( getSize() > 0 ) {
            selectedObject = getElementAt( 0 );
        }
    }

    /**
     * Constructs a DefaultComboBoxModel object initialized with
     * a vector.
     *
     * @param v  a Vector object ...
     */
    public DefaultComboBoxModel(Vector<E> v) {
        objects = v;

        if ( getSize() > 0 ) {
            selectedObject = getElementAt( 0 );
        }
    }

    // implements javax.swing.ComboBoxModel
    /**
     * Set the value of the selected item. The selected item may be null.
     * <p>
     * @param anObject The combo box value or null for no selection.
     */
    @Override
		public void setSelectedItem(Object anObject) {
        if ((selectedObject != null && !selectedObject.equals( anObject )) ||
            selectedObject == null && anObject != null) {
            selectedObject = anObject;
            if (!_isQuiet)
            	fireContentsChanged(this, -1, -1);
        }
    }

    // implements javax.swing.ComboBoxModel
    @Override
		public Object getSelectedItem() {
        return selectedObject;
    }

    // implements javax.swing.ListModel
    @Override
		public int getSize() {
        return objects.size();
    }

    // implements javax.swing.ListModel
    @Override
		public E getElementAt(int index) {
        if ( index >= 0 && index < objects.size() )
            return objects.elementAt(index);
        else
            return null;
    }

    /**
     * Returns the index-position of the specified object in the list.
     *
     * @param anObject
     * @return an int representing the index position, where 0 is
     *         the first position
     */
    public int getIndexOf(Object anObject) {
        return objects.indexOf(anObject);
    }

    // implements javax.swing.MutableComboBoxModel
    @Override
		public void addElement(E anObject) {
        objects.addElement(anObject);
        fireIntervalAdded(this,objects.size()-1, objects.size()-1);
        if ( objects.size() == 1 && selectedObject == null && anObject != null ) {
        	_setSelectedItemQuiet(anObject);
        }
    }

    
    // implements javax.swing.MutableComboBoxModel
    @Override
		public void insertElementAt(E anObject,int index) {
        objects.insertElementAt(anObject,index);
        fireIntervalAdded(this, index, index);
    }

    // implements javax.swing.MutableComboBoxModel
    @Override
		public void removeElementAt(int index) {
        if ( getElementAt( index ) == selectedObject )
        	_setSelectedItemQuiet(index > 0 ? getElementAt( index - 1 )
        			:  getSize() == 1 ? null : getElementAt( index + 1 ) );

        objects.removeElementAt(index);

        fireIntervalRemoved(this, index, index);
    }

    // implements javax.swing.MutableComboBoxModel
    @Override
		public void removeElement(Object anObject) {
        int index = objects.indexOf(anObject);
        if ( index != -1 ) {
            removeElementAt(index);
        }
    }

    /**
     * Empties the list.
     */
    public void removeAllElements() {
        if ( objects.size() > 0 ) {
            int firstIndex = 0;
            int lastIndex = objects.size() - 1;
            objects.removeAllElements();
            selectedObject = null;
            fireIntervalRemoved(this, firstIndex, lastIndex);
        } else {
            selectedObject = null;
        }
    }

	void _setSelectedItemQuiet(Object o) {
        _isQuiet = (/**@j2sNative !!this.isAWT$ || */false);
        setSelectedItem( o );
        _isQuiet = false;
	}
}
