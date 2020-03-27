/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1997, 2004, Oracle and/or its affiliates. All rights reserved.
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
package javax.swing.undo;

import java.util.ArrayList;
import java.util.List;

/**
 * A concrete subclass of AbstractUndoableEdit, used to assemble little
 * UndoableEdits into great big ones.
 *
 * @author Ray Ryan
 */
@SuppressWarnings({"rawtypes"})
public class CompoundEdit extends AbstractUndoableEdit {
    /**
     * True if this edit has never received <code>end</code>.
     */
    boolean inProgress;

    /**
     * The collection of <code>UndoableEdit</code>s
     * undone/redone en masse by this <code>CompoundEdit</code>.
     */
    protected List<UndoableEdit> edits;

    public CompoundEdit() {
        super();
        inProgress = true;
        edits = new ArrayList<UndoableEdit>();
    }

    /**
     * Sends <code>undo</code> to all contained
     * <code>UndoableEdits</code> in the reverse of
     * the order in which they were added.
     */
    @Override
		public void undo() throws CannotUndoException {
        super.undo();
        for (int i = edits.size(); --i >= 0;) {
            UndoableEdit e = (UndoableEdit)edits.get(i);
            e.undo();
        }
    }

    /**
     * Sends <code>redo</code> to all contained
     * <code>UndoableEdit</code>s in the order in
     * which they were added.
     */
    @Override
		public void redo() throws CannotRedoException {
        super.redo();
        for (int i = edits.size(); --i >= 0;) {
        	edits.get(i).redo();
        }
    }

    /**
     * Returns the last <code>UndoableEdit</code> in
     * <code>edits</code>, or <code>null</code>
     * if <code>edits</code> is empty.
     */
    protected UndoableEdit lastEdit() {
        int count = edits.size();
        return (count > 0 ? edits.get(count - 1) : null);
    }

    /**
     * Sends <code>die</code> to each subedit,
     * in the reverse of the order that they were added.
     */
    @Override
		public void die() {
    	for (int i = edits.size(); --i >= 0;)
        {
            UndoableEdit e = edits.get(i);
            e.die();
        }
        super.die();
    }

	/**
	 * If this edit is <code>inProgress</code>, accepts <code>anEdit</code> and
	 * returns true.
	 *
	 * <p>
	 * The last edit added to this <code>CompoundEdit</code> is given a chance to
	 * <code>addEdit(anEdit)</code>. If it refuses (returns false),
	 * <code>anEdit</code> is given a chance to <code>replaceEdit</code> the last
	 * edit. If <code>anEdit</code> returns false here, it is added to
	 * <code>edits</code>.
	 *
	 * @param anEdit the edit to be added
	 * @return true if the edit is <code>inProgress</code>; otherwise returns false
	 */
	@Override
	public boolean addEdit(UndoableEdit anEdit) {
		if (!inProgress) {
			return false;
		} else {
			UndoableEdit last = lastEdit();

			// If this is the first subedit received, just add it.
			// Otherwise, give the last one a chance to absorb the new
			// one. If it won't, give the new one a chance to absorb
			// the last one.

			if (last == null) {
				edits.add(anEdit);
			} else if (!last.addEdit(anEdit)) {
				if (anEdit.replaceEdit(last)) {
					edits.remove(edits.size() - 1);
				}
				edits.add(anEdit);
			}

			return true;
		}
	}

    /**
     * Sets <code>inProgress</code> to false.
     *
     * @see #canUndo
     * @see #canRedo
     */
    public void end() {
        inProgress = false;
    }

    /**
     * Returns false if <code>isInProgress</code> or if super
     * returns false.
     *
     * @see     #isInProgress
     */
    @Override
		public boolean canUndo() {
        return !isInProgress() && super.canUndo();
    }

    /**
     * Returns false if <code>isInProgress</code> or if super
     * returns false.
     *
     * @see     #isInProgress
     */
    @Override
		public boolean canRedo() {
        return !isInProgress() && super.canRedo();
    }

    /**
     * Returns true if this edit is in progress--that is, it has not
     * received end. This generally means that edits are still being
     * added to it.
     *
     * @see     #end
     */
    public boolean isInProgress() {
        return inProgress;
    }

    /**
     * Returns true if any of the <code>UndoableEdit</code>s
     * in <code>edits</code> do.
     * Returns false if they all return false.
     */
    @Override
		public boolean  isSignificant() {
    	for (int i = edits.size(); --i >= 0;) {
            if (edits.get(i).isSignificant()) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns <code>getPresentationName</code> from the
     * last <code>UndoableEdit</code> added to
     * <code>edits</code>. If <code>edits</code> is empty,
     * calls super.
     */
    @Override
		public String getPresentationName() {
        UndoableEdit last = lastEdit();
        if (last != null) {
            return last.getPresentationName();
        } else {
            return super.getPresentationName();
        }
    }

    /**
     * Returns <code>getUndoPresentationName</code>
     * from the last <code>UndoableEdit</code>
     * added to <code>edits</code>.
     * If <code>edits</code> is empty, calls super.
     */
    @Override
		public String getUndoPresentationName() {
        UndoableEdit last = lastEdit();
        if (last != null) {
            return last.getUndoPresentationName();
        } else {
            return super.getUndoPresentationName();
        }
    }

    /**
     * Returns <code>getRedoPresentationName</code>
     * from the last <code>UndoableEdit</code>
     * added to <code>edits</code>.
     * If <code>edits</code> is empty, calls super.
     */
    @Override
		public String getRedoPresentationName() {
        UndoableEdit last = lastEdit();
        if (last != null) {
            return last.getRedoPresentationName();
        } else {
            return super.getRedoPresentationName();
        }
    }

    /**
     * Returns a string that displays and identifies this
     * object's properties.
     *
     * @return a String representation of this object
     */
    @Override
		public String toString()
    {
        return super.toString()
            + " inProgress: " + inProgress
            + " edits: " + edits;
    }
}
