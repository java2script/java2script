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
package swingjs.plaf;

import java.awt.Color;
import java.awt.Container;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Insets;
import java.awt.LayoutManager;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.event.ActionEvent;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;
import java.awt.geom.Point2D.Double;
import java.awt.geom.Rectangle2D;
import java.util.ArrayList;

import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.ActionMap;
import javax.swing.InputMap;
import javax.swing.JComponent;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JViewport;
import javax.swing.SwingConstants;
import javax.swing.SwingUtilities;
import javax.swing.TransferHandler;
import javax.swing.UIManager;
import javax.swing.event.CaretEvent;
import javax.swing.plaf.ActionMapUIResource;
import javax.swing.plaf.ComponentUI;
import javax.swing.plaf.InputMapUIResource;
import javax.swing.plaf.TextUI;
import javax.swing.plaf.UIResource;
import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.Caret;
import javax.swing.text.DefaultCaret;
import javax.swing.text.DefaultEditorKit;
import javax.swing.text.Document;
import javax.swing.text.EditorKit;
import javax.swing.text.Element;
import javax.swing.text.JTextComponent;
import javax.swing.text.Position;
import javax.swing.text.Position.Bias;
import javax.swing.text.TextAction;
import javax.swing.text.View;
import javax.swing.text.html.HTMLDocument;

import swingjs.JSKeyEvent;
import swingjs.JSToolkit;
import swingjs.api.js.DOMNode;

/**
 * <p>
 * Basis of a text components look-and-feel. This provides the basic editor view
 * and controller services that may be useful when creating a look-and-feel for
 * an extension of <code>JTextComponent</code>.
 * <p>
 * Most state is held in the associated <code>JTextComponent</code> as bound
 * properties, and the UI installs default values for the various properties.
 * This default will install something for all of the properties. Typically, a
 * LAF implementation will do more however. At a minimum, a LAF would generally
 * install key bindings.
 * <p>
 * This class also provides some concurrency support if the
 * <code>Document</code> associated with the JTextComponent is a subclass of
 * <code>AbstractDocument</code>. Access to the View (or View hierarchy) is
 * serialized between any thread mutating the model and the Swing event thread
 * (which is expected to render, do model/view coordinate translation, etc).
 * <em>Any access to the root view should first
 * acquire a read-lock on the AbstractDocument and release that lock
 * in a finally block.</em>
 * <p>
 * An important method to define is the {@link #getPropertyPrefix} method which
 * is used as the basis of the keys used to fetch defaults from the UIManager.
 * The string should reflect the type of TextUI (eg. TextField, TextArea, etc)
 * without the particular LAF part of the name (eg Metal, Motif, etc).
 * <p>
 * To build a view of the model, one of the following strategies can be
 * employed.
 * <ol>
 * <li>
 * One strategy is to simply redefine the ViewFactory interface in the UI. By
 * default, this UI itself acts as the factory for View implementations. This is
 * useful for simple factories. To do this reimplement the {@link #create}
 * method.
 * <li>
 * A common strategy for creating more complex types of documents is to have the
 * EditorKit implementation return a factory. Since the EditorKit ties all of
 * the pieces necessary to maintain a type of document, the factory is typically
 * an important part of that and should be produced by the EditorKit
 * implementation.
 * </ol>
 * <p>
 * <strong>Warning:</strong> Serialized objects of this class will not be
 * compatible with future Swing releases. The current serialization support is
 * appropriate for short term storage or RMI between applications running the
 * same version of Swing. As of 1.4, support for long term storage of all
 * JavaBeans<sup><font size="-2">TM</font></sup> has been added to the
 * <code>java.beans</code> package. Please see {@link java.beans.XMLEncoder}.
 * 
 * In Java, this UI extends TextUI, but here we just mimic that.
 * 
 * 
 * @author Timothy Prinzing
 * @author Shannon Hickey (drag and drop)
 */
public abstract class JSTextUI extends JSLightweightUI {
	
	
//    /**
//     * Causes the portion of the view responsible for the
//     * given part of the model to be repainted.
//     *
//     * @param p0 the beginning of the range >= 0
//     * @param p1 the end of the range >= p0
//     */
//    public abstract void damageRange(JTextComponent t, int p0, int p1);
//
//    /**
//     * Causes the portion of the view responsible for the
//     * given part of the model to be repainted.
//     *
//     * @param p0 the beginning of the range >= 0
//     * @param p1 the end of the range >= p0
//     */
//    public abstract void damageRange(JTextComponent t, int p0, int p1,
//                                     Position.Bias firstBias,
//                                     Position.Bias secondBias);
//

	/**
     * Returns the string to be used as the tooltip at the passed in location.
     *
     * @see javax.swing.text.JTextComponent#getToolTipText
     * @since 1.4
     */
    public String getToolTipText(JTextComponent t, Point pt) {
        return null;
    }

	
	protected static EditorKit defaultKit = new DefaultEditorKit();
	
	private final static String[] overflows = new String[] { "auto", "hidden", "scroll" };

	
	static final Point markDot = new Point();

	protected JTextComponent editor;

	protected boolean editable = true;
	protected boolean isEditorPane;


    protected RootView rootView = new RootView();

    TextListener textListener; // referred to in j2sApplet.js

	protected boolean useRootView = false; // TextArea only?

	private ArrayList<Double> charMap;

	private static final Cursor textCursor = new Cursor(Cursor.TEXT_CURSOR);	
	@Override
	public DOMNode updateDOMNode() {
		if (editor.isOpaque() && editor.isEnabled())
			setBackgroundImpl(getBackground());
		setEditable(editable);
		if (editor.getCursor() == null)
			DOMNode.setStyle(domNode, "cursor", "text");
		Color cc = editor.getCaretColor();
		if (cc != null)
			DOMNode.setStyle(domNode, "caret-color", toCSSString(cc));
		setPadding(editor.getMargin());
		return updateDOMNodeCUI();
	}
	
    @Override
	protected Cursor getCursor() {
        if ((! editor.isCursorSet())
               || editor.getCursor() instanceof UIResource) {
            return (editor.isEditable()) ? textCursor : null;
        }
        return super.getCursor();
    }

	/**
	 * called by JSComponentUI.bindJSEvents
	 * 
	 * @return handled
	 * 
	 * 
	 */
	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {

		// String type = /** @j2sNative jQueryEvent.type || */null;
		// System.out.println("JSTextUI handlejs "+type + " " + eventType);
		if (JSToolkit.isMouseEvent(eventType)) {
			return NOT_HANDLED;
		}
		Boolean b = checkAllowEvent(jQueryEvent);
		if (b != null)
			return b.booleanValue();
		int keyCode = /** @j2sNative jQueryEvent.keyCode || */
				0;
		JSKeyEvent keyEvent = null;
		boolean ret = NOT_HANDLED;
		switch (eventType) {
		case SOME_KEY_EVENT:
			// note that events are bundled here into one eventType
			// 0 param here says "get the real event type from jQueryEvent
			// Android will not fire keypressed (KEY_TYPED)
			keyEvent = JSKeyEvent.newJSKeyEvent(editor, jQueryEvent, 0, false);
			if (keyEvent == null)
				return HANDLED;
			switch (keyCode) {
			case KeyEvent.VK_ALT:
				JSToolkit.consumeEvent(jQueryEvent);
				// fall through
				// case KeyEvent.VK_SHIFT:
				// BH note 2019.11.03
				// Including VK_SHIFT here caused Firefox to ignore a first upper-case L in
				// SequenceSearcher pattern JTextField
			case KeyEvent.VK_CONTROL:
				ret = HANDLED;
				break;
			}
			eventType = keyEvent.getID();
			break;
		}
		if (keyEvent != null) {
			if (eventType == KeyEvent.KEY_RELEASED) {
				handleJSTextEvent(eventType, jQueryEvent, keyCode, false);
				ret = HANDLED;
			}
			editor.dispatchEvent(keyEvent);
			boolean ignore =
					/**
					 * set in DefaultEditorKit for a "pass-through" action CTRL-C,V,X,A
					 * 
					 * @j2sNative keyEvent.bdata.doPropagate ||
					 */
					false;
			if (!ignore && keyEvent.isConsumed()) {
				JSToolkit.consumeEvent(jQueryEvent);
				return HANDLED;
			}
			if (!ignore && eventType == KeyEvent.KEY_PRESSED
					&& (keyEvent.getModifiersEx() 
					    & (InputEvent.CTRL_DOWN_MASK 
					    		| InputEvent.ALT_DOWN_MASK)) != 0) {
				// dispatch a missing KeyTyped event.
				int code = keyEvent.getKeyCode();
				if (code >= 65 && code <= 90) {
					@SuppressWarnings("unused")
					char c = (char) (code & 0x1F); // 1-26

					/**
					 * @j2sNative keyEvent.id = 400; keyEvent.keyCode = 0; keyEvent.keyChar = c; jQueryEvent.stopPropagation();
					 * keyEvent.consumed = false;
					 */

					editor.dispatchEvent(keyEvent);
					JSToolkit.consumeEvent(jQueryEvent);
					if (keyEvent.isConsumed()) {
						return HANDLED;
					}
				}
			}

		}
		if (ret != HANDLED) {
			handleJSTextEvent(eventType, jQueryEvent, keyCode, false);
		}
		return HANDLED;
	}

	protected void handleJSTextEvent(int eventType, Object jQueryEvent, int keyCode, boolean trigger) {
		textListener.handleJSTextEvent(this, eventType, jQueryEvent);
	}


	/**
	 * mouse events only -- called by j2sApplet.js
	 * 
	 * Handle stopPropagation and preventDefault here.
	 * 
	 * By existing at all, this method prevents j2sApplet.checkStopPropagation
	 * from acting, and by returning false, it indicates
	 * that other components (such as the JRootPane) should
	 * handle this mouse action. 
	 * 
	 * 
	 * @param ev
	 * @param handled
	 * @return true only if no further processing is desired
	 */
	public boolean checkStopPropagation(Object ev, boolean handled) {
		return NOT_HANDLED;
	}

	@Override
	protected void undisposeUI(DOMNode node) {
		super.undisposeUI(node);
		bindJSKeyEvents(focusNode, true);		
	}
	
	/**
	 * Initializes component properties, e.g. font, foreground, background, caret
	 * color, selection color, selected text color, disabled text color, and
	 * border color. The font, foreground, and background properties are only set
	 * if their current value is either null or a UIResource, other properties are
	 * set if the current value is null.
	 * 
	 * @see #uninstallDefaults
	 * @see #installUI
	 */
	protected void installDefaults() {
		String prefix = getPropertyPrefix();
		
		Font f = editor.getFont();
		if ((f == null && !isAWT) || (f instanceof UIResource)) {
			editor.setFont(UIManager.getFont(prefix + ".font"));
		}
		setColors(prefix);
		//setBorder(prefix);
		Insets margin = editor.getMargin();
		if (margin == null || margin instanceof UIResource) {
			editor.setMargin(UIManager.getInsets(prefix + ".margin"));
		}
		//
		// updateCursor();
	}

	protected void setBorder(String prefix) {
		// set JSEditorPaneUI
	}

	protected void setColors(String prefix) {
		Color bg = editor.getBackground();
		if ((bg == null) || (bg instanceof UIResource)) {
			editor.setBackground(UIManager.getColor(prefix + ".background"));
		}

		if (!isAWT) {
			Color fg = editor.getForeground();
			if ((fg == null) || (fg instanceof UIResource)) {
				editor.setForeground(UIManager.getColor(prefix + ".foreground"));
			}
		}
		//
		// Color color = editor.getCaretColor();
		// if ((color == null) || (color instanceof UIResource)) {
		// editor.setCaretColor(UIManager.getColor(prefix + ".caretForeground"));
		// }
		//
		// Color s = editor.getSelectionColor();
		// if ((s == null) || (s instanceof UIResource)) {
		// editor.setSelectionColor(UIManager.getColor(prefix +
		// ".selectionBackground"));
		// }
		//
		// Color sfg = editor.getSelectedTextColor();
		// if ((sfg == null) || (sfg instanceof UIResource)) {
		// editor.setSelectedTextColor(UIManager.getColor(prefix +
		// ".selectionForeground"));
		// }
		//
		Color dfg = editor.getDisabledTextColor();
		if ((dfg == null) || (dfg instanceof UIResource)) {
			editor.setDisabledTextColor(UIManager.getColor(prefix + ".inactiveForeground"));
		}
		dfg =  UIManager.getColor(isAWT ? "control" : prefix + ".inactiveBackground");
		if (dfg != null)
			inactiveBackground = dfg;

	}



	protected void installDefaults2() {
		// editor.addMouseListener(dragListener);
		// editor.addMouseMotionListener(dragListener);
		//
		// String prefix = getPropertyPrefix();

		Caret caret = editor.getCaret();
		if (caret == null || caret instanceof UIResource) {
			editor.setCaret(new DefaultCaret() {
				@Override
				public void paint(Graphics g) {
					// ignore
				}

				@Override
				public boolean isVisible() {
					return true;
				}

				@Override
				public void setVisible(boolean v) {
				}

				@Override
				public boolean isSelectionVisible() {
					return true;
				}

				@Override
				public void setSelectionVisible(boolean v) {
				}

				@Override
				public void setBlinkRate(int rate) {
				}

				@Override
				public int getBlinkRate() {
					return 0;
				}

				@Override
				public String toString() {
					return "caret[" + dot + "," + mark + "]";
				}

			});
		}
		//
		// Highlighter highlighter = editor.getHighlighter();
		// if (highlighter == null || highlighter instanceof UIResource) {
		// editor.setHighlighter(createHighlighter());
		// }
		//
		// TransferHandler th = editor.getTransferHandler();
		// if (th == null || th instanceof UIResource) {
		// editor.setTransferHandler(getTransferHandler());
		// }
	}

	/**
	 * Sets the component properties that haven't been explicitly overridden to
	 * null. A property is considered overridden if its current value is not a
	 * UIResource.
	 * 
	 * @see #installDefaults
	 * @see #uninstallUI
	 */
	protected void uninstallDefaults() {
		// editor.removeMouseListener(dragListener);
		// editor.removeMouseMotionListener(dragListener);
		//
		if (editor.getCaretColor() instanceof UIResource) {
			editor.setCaretColor(null);
		}

		if (editor.getSelectionColor() instanceof UIResource) {
			editor.setSelectionColor(null);
		}

		if (editor.getDisabledTextColor() instanceof UIResource) {
			editor.setDisabledTextColor(null);
		}

		if (editor.getSelectedTextColor() instanceof UIResource) {
			editor.setSelectedTextColor(null);
		}

		if (editor.getBorder() instanceof UIResource) {
			editor.setBorder(null);
		}

		if (editor.getMargin() instanceof UIResource) {
			editor.setMargin(null);
		}

		// if (editor.getCaret() instanceof UIResource) {
		// editor.setCaret(null);
		// }
		//
		// if (editor.getHighlighter() instanceof UIResource) {
		// editor.setHighlighter(null);
		// }
		//
		// if (editor.getTransferHandler() instanceof UIResource) {
		// editor.setTransferHandler(null);
		// }
		//
		// if (editor.getCursor() instanceof UIResource) {
		// editor.setCursor(null);
		// }
	}

	protected void installKeyboardActions() {
		// backward compatibility support... keymaps for the UI
		// are now installed in the more friendly input map.
		
//        editor.setKeymap(createKeymap());

		InputMap km = getInputMap();
		if (km != null) {
			SwingUtilities.replaceUIInputMap(editor, JComponent.WHEN_FOCUSED, km);
		}

		ActionMap map = getActionMap();
		if (map != null) {
			SwingUtilities.replaceUIActionMap(editor, map);
		}

		// updateFocusAcceleratorBinding(false);
	}

	/**
	 * Get the InputMap to use for the UI.
	 * 
	 * Overridden in JSTextFieldUI
	 */
	InputMap getInputMap() {
		InputMap map = new InputMapUIResource();
        InputMap shared =
                (InputMap) UIManager.get(getPropertyPrefix() + ".focusInputMap", null);
        if (shared != null) {
            map.setParent(shared);
        }
		return map;
	}

//	protected InputMap getSharedMap() {
//		return null;
//	}
//
	/**
	 * Fetch an action map to use.
	 */
	ActionMap getActionMap() {
		String mapName = classID + ".actionMap";
		ActionMap map = (ActionMap) UIManager.get(mapName);
		if (map == null) {
			map = createActionMap();
			if (map != null) {
				UIManager.getLookAndFeelDefaults().put(mapName, map); 
			}
		}
		return map;
	}
	/**
	 * Create a default action map. This is basically the set of actions found
	 * exported by the component.
	 */
	/**
	 * @return
	 */
	ActionMap createActionMap() {
		ActionMap map = new ActionMapUIResource();
		Action[] actions = this.editor.getActions();
		// BH: The problem with the above is that for generic JTextComponent,
		// that method just returns us here, but UI has not been created yet, so it bails.
		if (actions == null)
			actions = getEditorKit(editor).getActions();
		int n = (actions == null ? 0 : actions.length);
		for (int i = 0; i < n; i++) {
			Action a = actions[i];
			map.put(a.getValue(Action.NAME), a);
			//System.out.println("JSTextUI " + jc.getUIClassID() + ".createAction: " + a.getValue(Action.NAME));
		}
		 map.put(TransferHandler.getCutAction().getValue(Action.NAME),
		 TransferHandler.getCutAction());
		 map.put(TransferHandler.getCopyAction().getValue(Action.NAME),
		 TransferHandler.getCopyAction());
		 map.put(TransferHandler.getPasteAction().getValue(Action.NAME),
		 TransferHandler.getPasteAction());
		return map;
	}

	protected void uninstallKeyboardActions() {
		editor.setKeymap(null);
		SwingUtilities.replaceUIInputMap(editor, JComponent.WHEN_IN_FOCUSED_WINDOW,
				null);
		SwingUtilities.replaceUIActionMap(editor, null);
	}

	/**
	 * Fetches the text component associated with this UI implementation. This
	 * will be null until the ui has been installed.
	 * 
	 * @return the editor component
	 */
	protected final JTextComponent getComponent() {
		return editor;
	}

	// --- ComponentUI methods --------------------------------------------

	/**
	 * Installs the UI for a component. This does the following things.
	 * <ol>
	 * <li>
	 * Set the associated component to opaque (can be changed easily by a subclass
	 * or on JTextComponent directly), which is the most common case. This will
	 * cause the component's background color to be painted.
	 * <li>
	 * Install the default caret and highlighter into the associated component.
	 * <li>
	 * Attach to the editor and model. If there is no model, a default one is
	 * created.
	 * <li>
	 * create the view factory and the view hierarchy used to represent the model.
	 * </ol>
	 * 
	 * @param c
	 *          the editor component
	 * @see ComponentUI#installUI
	 */
	@Override
	public void installUI(JComponent jc) {
//		isToolbarFixed = false;
		editor = (JTextComponent) jc;
		textListener = new TextListener(this, editor);

		installDefaults();
		installDefaults2();

		// // This is a workaround as these should not override what synth has
		// // set them to
		// if (!(this instanceof sun.swing.plaf.synth.SynthUI)){
		// // common case is background painted... this can
		// // easily be changed by subclasses or from outside
		// // of the component.
		// LookAndFeel.installProperty(editor, "opaque", Boolean.TRUE);
		// LookAndFeel.installProperty(editor, "autoscrolls", Boolean.TRUE);
		// }
		//
		// attach to the model and editor
		// Document doc = editor.getDocument();
		// if (doc == null) {
		// // no model, create a default one. This will
		// // fire a notification to the updateHandler
		// // which takes care of the rest.
		// editor.setDocument(getEditorKit(editor).createDefaultDocument());
		// } else {
		// // doc.addDocumentListener(updateHandler);
		// // modelChanged();
		// }

		// install keymap
		installListeners(editor);
		installKeyboardActions();

		// LayoutManager oldLayout = editor.getLayout();
		// if ((oldLayout == null) || (oldLayout instanceof UIResource)) {
		// // by default, use default LayoutManger implementation that
		// // will position the components associated with a View object.
		// editor.setLayout(updateHandler);
		// }
		//
		// updateBackground(editor);
	}

	/**
	 * Deinstalls the UI for a component. This removes the listeners, uninstalls
	 * the highlighter, removes views, and nulls out the keymap.
	 * 
	 * @param c
	 *          the editor component
	 * @see ComponentUI#uninstallUI
	 */
	@Override
	public void uninstallUI(JComponent jc) {
		// detach from the model
		// editor.removePropertyChangeListener(updateHandler);
		// editor.getDocument().removeDocumentListener(updateHandler);

		// view part
		// painted = false;
		uninstallDefaults();
		// rootView.setView(null);
		jc.removeAll();
		LayoutManager lm = jc.getLayout();
		if (lm instanceof UIResource) {
			jc.setLayout(null);
		}

		// controller part
		uninstallKeyboardActions();
		uninstallListeners(editor);

		editor = null;
		textListener = null;
	}

	protected void installListeners(JTextComponent b) {
		TextListener listener = textListener;
		b.addMouseListener(listener);
//		b.addMouseMotionListener(listener);
		b.addKeyListener(textListener);
		b.addFocusListener(listener);
		b.addPropertyChangeListener(listener);
		b.addCaretListener(listener);
		// SwingJS there won't be a document yet; this is in constructor
		// b.getDocument().addDocumentListener(listener);
	}

	protected void uninstallListeners(JTextComponent b) {
		TextListener listener = textListener;
		b.removeKeyListener(textListener);
		b.removeMouseListener(listener);
//		b.removeMouseMotionListener(listener);
		b.removeFocusListener(listener);
		b.removePropertyChangeListener(listener);
		//b.removeCaretListener(listener); 
		b.getDocument().removeDocumentListener(listener);
	}

	protected void updateRootView() {
		// only TextArea for now
	}

	/**
	 * Gets the minimum size for the editor component.
	 * 
	 * @return the size
	 */
	@Override
	public Dimension getMinimumSize(JComponent jc) {
		Dimension d = getPreferredSize(jc);// new Dimension();
		// Document doc = editor.getDocument();
		// Insets i = jc.getInsets();
		// if (doc instanceof AbstractDocument) {
		// ((AbstractDocument)doc).readLock();
		// }
		// try {

		// TODO: check that we really do not want these insets here.
		
		//d.width += i.left + i.right;
		//d.height = jc.getFont().getSize() + i.top + i.bottom;

		// d.width = (int) rootView.getMinimumSpan(View.X_AXIS) + i.left + i.right;
		// d.height = (int) rootView.getMinimumSpan(View.Y_AXIS) + i.top + i.bottom;
		// } finally {
		// if (doc instanceof AbstractDocument) {
		// ((AbstractDocument)doc).readUnlock();
		// }
		// }
		return d;
	}

	
	/**
	 * original TextUI call; only for JTextArea here
	 * 
	 * @param tc
	 * @return
	 */
    public View getRootView(JTextComponent tc) {
        return rootView;
    }

    protected View create(Element elem) {
    	// See TextArea
		return null;
	}


	@Override
	public Dimension getPreferredSize(JComponent c) {
		if (!useRootView)
			return super.getPreferredSize(c);
        Insets i = c.getInsets();
        Dimension d = c.getSize();
        
            if ((d.width > (i.left + i.right)) && (d.height > (i.top + i.bottom))) {
                rootView.setSize(d.width - i.left - i.right, d.height - i.top - i.bottom);
            }
            else if (d.width == 0 && d.height == 0) {
                // Probably haven't been laid out yet, force some sort of
                // initial sizing.
                rootView.setSize(Integer.MAX_VALUE, Integer.MAX_VALUE);
            }
            d.width = (int) Math.min((long) rootView.getPreferredSpan(View.X_AXIS) +
                                     (long) i.left + (long) i.right, Integer.MAX_VALUE);
            d.height = (int) Math.min((long) rootView.getPreferredSpan(View.Y_AXIS) +
                                      (long) i.top + (long) i.bottom, Integer.MAX_VALUE);
        return d;
    }

    
    class RootView extends View {

        private View view;

		RootView() {
            super(null);
        }

        /**
         * Returns the document model underlying the view.
         *
         * @return the model
         */
        @Override
		public Document getDocument() {
            return editor.getDocument();
        }

        /**
         * Returns the starting offset into the model for this view.
         *
         * @return the starting offset
         */
        @Override
		public int getStartOffset() {
            if (view != null) {
                return view.getStartOffset();
            }
            return getElement().getStartOffset();
        }

        /**
         * Returns the ending offset into the model for this view.
         *
         * @return the ending offset
         */
        @Override
		public int getEndOffset() {
            if (view != null) {
                return view.getEndOffset();
            }
            return getElement().getEndOffset();
        }

        /**
         * Gets the element that this view is mapped to.
         *
         * @return the view
         */
        @Override
		public Element getElement() {
            if (view != null) {
                return view.getElement();
            }
            return editor.getDocument().getDefaultRootElement();
        }

        /**
         * Sets the view size.
         *
         * @param width the width
         * @param height the height
         */
        @Override
		public void setSize(float width, float height) {
            if (view != null) {
                view.setSize(width, height);
            }
        }

        /**
         * Fetches the container hosting the view.  This is useful for
         * things like scheduling a repaint, finding out the host
         * components font, etc.  The default implementation
         * of this is to forward the query to the parent view.
         *
         * @return the container
         */
        @Override
		public Container getContainer() { 
            return editor;
        }

        void setView(View v) {
            View oldView = view;
            view = null;
            if (oldView != null) {
                // get rid of back reference so that the old
                // hierarchy can be garbage collected.
                oldView.setParent(null);
            }
            if (v != null) {
                v.setParent(this);
            }
            view = v;
        }

        /**
         * Fetches the attributes to use when rendering.  At the root
         * level there are no attributes.  If an attribute is resolved
         * up the view hierarchy this is the end of the line.
         */
        @Override
		public AttributeSet getAttributes() {
            return null;
        }

        /**
         * Determines the preferred span for this view along an axis.
         *
         * @param axis may be either X_AXIS or Y_AXIS
         * @return the span the view would like to be rendered into.
         *         Typically the view is told to render into the span
         *         that is returned, although there is no guarantee.
         *         The parent may choose to resize or break the view.
         */
        @Override
		public float getPreferredSpan(int axis) {
        	switch (axis) {
        	case View.X_AXIS:
        		return (view == null ? 10 : view.getPreferredSpan(axis));
        	default:
        	case View.Y_AXIS:
            	JTextArea area = (JTextArea) editor;
            	int h = getFont().getFontMetrics().getHeight();
            	int r = area.getRows();
            	return  h * (r > 0 ? r : isAWT ? 10 : 6);
        	}
        }

        /**
         * Determines the minimum span for this view along an axis.
         *
         * @param axis may be either X_AXIS or Y_AXIS
         * @return the span the view would like to be rendered into.
         *         Typically the view is told to render into the span
         *         that is returned, although there is no guarantee.
         *         The parent may choose to resize or break the view.
         */
        @Override
		public float getMinimumSpan(int axis) {
            if (view != null) {
                return view.getMinimumSpan(axis);
            }
            return 10;
        }

        /**
         * Determines the maximum span for this view along an axis.
         *
         * @param axis may be either X_AXIS or Y_AXIS
         * @return the span the view would like to be rendered into.
         *         Typically the view is told to render into the span
         *         that is returned, although there is no guarantee.
         *         The parent may choose to resize or break the view.
         */
        @Override
		public float getMaximumSpan(int axis) {
            return Integer.MAX_VALUE;
        }

        /**
         * Specifies that a preference has changed.
         * Child views can call this on the parent to indicate that
         * the preference has changed.  The root view routes this to
         * invalidate on the hosting component.
         * <p>
         * This can be called on a different thread from the
         * event dispatching thread and is basically unsafe to
         * propagate into the component.  To make this safe,
         * the operation is transferred over to the event dispatching
         * thread for completion.  It is a design goal that all view
         * methods be safe to call without concern for concurrency,
         * and this behavior helps make that true.
         *
         * @param child the child view
         * @param width true if the width preference has changed
         * @param height true if the height preference has changed
         */
        @Override
		public void preferenceChanged(View child, boolean width, boolean height) {
            editor.revalidate();
        }

        /**
         * Determines the desired alignment for this view along an axis.
         *
         * @param axis may be either X_AXIS or Y_AXIS
         * @return the desired alignment, where 0.0 indicates the origin
         *     and 1.0 the full span away from the origin
         */
        @Override
		public float getAlignment(int axis) {
            if (view != null) {
                return view.getAlignment(axis);
            }
            return 0;
        }

        /**
         * Renders the view.
         *
         * @param g the graphics context
         * @param allocation the region to render into
         */
        @Override
		public void paint(Graphics g, Shape allocation) {
            if (view != null) {
                Rectangle alloc = (allocation instanceof Rectangle) ?
                          (Rectangle)allocation : allocation.getBounds();
                setSize(alloc.width, alloc.height);
                view.paint(g, allocation);
            }
        }

        /**
         * Sets the view parent.
         *
         * @param parent the parent view
         */
        @Override
		public void setParent(View parent) {
            throw new Error("Can't set parent on root view");
        }

        /**
         * Returns the number of views in this view.  Since
         * this view simply wraps the root of the view hierarchy
         * it has exactly one child.
         *
         * @return the number of views
         * @see #getView
         */
        @Override
		public int getViewCount() {
            return 1;
        }

        /**
         * Gets the n-th view in this container.
         *
         * @param n the number of the view to get
         * @return the view
         */
        @Override
		public View getView(int n) {
            return view;
        }

        /**
         * Returns the child view index representing the given position in
         * the model.  This is implemented to return the index of the only
         * child.
         *
         * @param pos the position &gt;= 0
         * @return  index of the view representing the given position, or
         *   -1 if no view represents that position
         * @since 1.3
         */
        @Override
		public int getViewIndex(int pos, Position.Bias b) {
            return 0;
        }

        /**
         * Fetches the allocation for the given child view.
         * This enables finding out where various views
         * are located, without assuming the views store
         * their location.  This returns the given allocation
         * since this view simply acts as a gateway between
         * the view hierarchy and the associated component.
         *
         * @param index the index of the child
         * @param a  the allocation to this view.
         * @return the allocation to the child
         */
        @Override
		public Shape getChildAllocation(int index, Shape a) {
            return a;
        }

		@Override
		public Shape modelToView(int pos, Shape a, Bias b) throws BadLocationException {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public int viewToModel(float x, float y, Shape a, Bias[] biasReturn) {
			return 0;
		}
		
		
    }
    
	/**
	 * Fetches the EditorKit for the UI.
	 * 
	 * @param tc
	 *          the text component for which this UI is installed
	 * @return the editor capabilities
	 * @see TextUI#getEditorKit
	 */
	public EditorKit getEditorKit(JTextComponent tc) {
		return defaultKit;
	}


	/**
	 * Wrapper for text actions to return isEnabled false in case editor is non
	 * editable
	 */
	class TextActionWrapper extends TextAction {
		public TextActionWrapper(TextAction action) {
			super((String) action.getValue(Action.NAME));
			this.action = action;
		}

		/**
		 * The operation to perform when this action is triggered.
		 * 
		 * @param e
		 *          the action event
		 */
		@Override
		public void actionPerformed(ActionEvent e) {
			action.actionPerformed(e);
		}

		@Override
		public boolean isEnabled() {
			return (editor == null || editor.isEditable()) ? action.isEnabled()
					: false;
		}

		TextAction action = null;
	}

	/**
	 * Registered in the ActionMap.
	 */
	class FocusAction extends AbstractAction {

		@Override
		public void actionPerformed(ActionEvent e) {
			editor.requestFocus();
		}

		@Override
		public boolean isEnabled() {
			return editor.isEditable();
		}
	}

	boolean handleEnter() {
		return false;
	}

	public void setEditable(boolean editable) {		
		this.editable = editable;
		if (focusNode == null)
			return;
		setEditableCSS();
		if (jc.isOpaque()) {
			Color bg = getBackground();
			setBackgroundImpl(editable || !(bg instanceof UIResource) 
					|| inactiveBackground == colorUNKNOWN ? bg : inactiveBackground);
		}		
		setCursor();
	}
	
	protected void setEditableCSS() {
		// could be subclassed
		DOMNode.setAttr(focusNode, "readOnly", editable ? null : TRUE);
	}

	@Override
	protected Color getInactiveTextColor(Color fg) {
		// For TextComponents:
		// !enabled: c.getDisabledTextColor();
		// enabled and editable: c.getForeground();
		// enabled but !editable: inactiveForeground
		// 
		// In addition, if color == null, then no text is shown		
		return (!editor.isEnabled() ? editor.getDisabledTextColor() : !editor.isEditable() ? inactiveForeground : fg);
	}

	protected String setCurrentText() {
		return (editor.getDocument() == null ? null : (currentText = editor.getText()));
	}

	boolean checkNewEditorTextValue() {
		String val = getJSTextValue();
		if (val.equals(fixText(currentText)))
			return false;
//		 System.out.println("editor: " + editor.getText().replace('\n', '.'));
//		 System.out.println(("from HTML: " + DOMNode.getAttr(domNode, "innerHTML")).replace('\n', '.'));
//		 System.out.println("to editor: " + val.replace('\n', '.'));
		editor.setTextFromUI(val);
		setCurrentText();
		return true;
	}

	void setJSText() {
		charMap = null;
		updateDOMNode();
	}

	
	@Override
	public boolean focus() {
		if (!editor.isEditable() || !super.focus())
			return false;
		if (haveFocus()) {
			
		} else {
			// need to transfer selection to this component
			updateJSCursor("focus");
		}
		return true;
	}
		
	boolean haveFocus() {
		return jquery.contains(focusNode, /** @j2sNative document.activeElement || */ null);
	}

	
	////////////////////// cursor and selection methods //////////////
	

	
	/// from Java ///
	
	/**
	 * update the JavaScript selection/cursor
	 * @param why
	 */
	public void updateJSCursor(String why) {	
		if (domNode == null || editor.getDocument() == null || editor.getText().length() == 0)
			return;
		if (isAWT && why != "focus" && why != "default")
			return;
		int start = editor.getCaret().getMark();
		int end = editor.getCaret().getDot();
		setJSSelection(start, end, start == end && why == "default");
	}

	protected void setJSSelection(int mark, int dot, boolean andScroll) {
		// overridden by JSEditorPaneUI
	  //System.out.println(id + " seJSSelection  " + mark + " " + dot + " " +andScroll);
		Object[] r1 = getJSNodePt(focusNode, mark, null, 0);
		Object[] r2 = (r1 == null || dot == mark ? r1 : getJSNodePt(focusNode, dot, null, 0));
		
		//System.out.println(id + " setJSSelection " + r1 + " " + r2);
		
		if (r1 != null && r2 != null)
			jsSelect(r1, r2, andScroll);
	}


	/**
	 * create a range array [node, pt]
	 * 
	 * Overridden in JSEditorPaneUI
	 * 
	 * @param node
	 * @param offset
	 * @param pt
	 * @return
	 */
	protected Object[] getJSNodePt(DOMNode node, int pt, Object[] lastRange, int level) {
		/**
		 * @j2sNative return [null, pt];
		 */
		{
			return null;
		}
	}

	/**
	 * Given two JavaScript ranges, set the JavaScript cursor/selection object;
	 * Overridden in JSEditorPaneUI.
	 * 
	 * @param r1
	 * @param r2
	 */

	protected void jsSelect(Object[] r1, Object[] r2, boolean andScroll) {
		// overridden in JSEditorPaneUI
//		System.out.println("scrolling to " + r1 + " " + r2 + " " + editor.getText());
		setJSMarkAndDot(/** @j2sNative r1[1] || */0, /** @j2sNative r2[1] || */0, andScroll);
	}
	
    /**
     * Set the selection range in the HTML5 node.
     * Overridden in JSEditorPaneUI.
     * 
     * @param mark
     * @param dot
     */
    void setJSMarkAndDot(int mark, int dot, boolean andScroll) {
    	//System.out.println(">>JSTextUI setJSMarkAndDot " + mark + " " + dot + " for " + editor.getText());
    	try {
		focusNode.setSelectionRange(Math.min(mark, dot), Math.max(mark, dot), (mark == dot ? "none" : mark < dot ? "forward" : "backward"));
    	} catch (Throwable e) {
    		// ignore - probably we are not attached to the body -- SeaMonkey failure here
    	}
	}

	/**
     * overridden in JSEditorPaneUI
     * 
     * @param pt
     * @return
     */
    @SuppressWarnings("unused")
	boolean getJSMarkAndDot(Point pt, int keyCode) {
    	DOMNode node = focusNode;
    	int start = /** @j2sNative node.selectionStart || */ 0;
    	int end = /** @j2sNative node.selectionEnd || */ 1;
//    	boolean reversed = /** @j2sNative node.selectionDirection == "backward" || */false;
    	pt.x = start;
    	pt.y = end;
    	return true;
    }


	/**
	 * Enable only the keys that are appropriate for this component, editable or not
	 * editable.
	 * 
	 * @param jQueryEvent
	 * @return null to continue processing, CONSUMED(false) to stop propagation,
	 *         UNHANLDED(true) to ignore
	 */
	protected Boolean checkAllowEvent(Object jQueryEvent) {
		boolean b = NOT_CONSUMED; // jQuery event will propagate
		boolean checkEditable = false;
		String type = /** @j2sNative jQueryEvent.type || */
				"";
		// note: all options are set in JSComponentUI.bindJSKeyEvents

		switch (type) {
		case "drop":
			// accept if editable
			checkEditable = true;
			break;
		case "focusout":
		case "dragover":
			// System.out.println("jstextvui " + (/** @j2sNative jQueryEvent.type || */"") +
			// editable);
			break;
		case "keydown":
		case "keypress":
		case "keyup":
			boolean isCTRL = /** @j2sNative jQueryEvent.ctrlKey || */
					false;
			switch (/** @j2sNative jQueryEvent.keyCode || */
			0) {
			case KeyEvent.VK_V: // paste
				if (!isCTRL)
					return null;
				allowKeyEvent(jQueryEvent);
				if (type == "keydown")
					handleCtrlV(KeyEvent.KEY_PRESSED);
				else if (type == "keyup")
					handleCtrlV(KeyEvent.KEY_RELEASED);
				return NOT_CONSUMED;
			case KeyEvent.VK_A: // a
				return null;
//				allowKeyEvent(jQueryEvent);
//				return NOT_CONSUMED; // allow standard browser CTRL-C, with no Java-Event processing
			case KeyEvent.VK_C: // copy
				if (!isCTRL)
					return null;
				allowKeyEvent(jQueryEvent);
				return NOT_CONSUMED; // allow standard browser CTRL-C, with no Java-Event processing
			
			case KeyEvent.VK_TAB:
				return handleTab(jQueryEvent, type);
			case KeyEvent.VK_UP:
			case KeyEvent.VK_DOWN:
				// Jmol needs to catch these
				return null;
			case KeyEvent.VK_PAGE_UP:
			case KeyEvent.VK_PAGE_DOWN:
				// unfortunately, these CTRL-PAGE_UP and CTRL-PAGE_DOWN 
				// cannot be stopped in a browser from switching tabs
			case KeyEvent.VK_HOME:
			case KeyEvent.VK_END:
			case KeyEvent.VK_LEFT:
			case KeyEvent.VK_RIGHT:
			case KeyEvent.VK_KP_UP:
			case KeyEvent.VK_KP_DOWN:
			case KeyEvent.VK_KP_LEFT:
			case KeyEvent.VK_KP_RIGHT:
				// BH 2024 - I don't understand why I did this
			    // BH 2024 - removed VK_UP and VK_DOWN from this list
				// accept only if neither ALT nor CTRL is down
				return (/** @j2sNative jQueryEvent.altKey || */
				isCTRL ? CONSUMED : null);
			default:
				// accept all others only if editable
				checkEditable = true;
				break;
			}
			break;
		default:
			return null;
		}
		if (checkEditable) {
			// NEVER allowing editing of HTMLDocument
			if (editor.isEditable() && !(editor.getDocument() instanceof HTMLDocument))
				return null;
			b = CONSUMED; // this will cancel the jQuery event
		}
		return b;
	}

	private void allowKeyEvent(Object jQueryEvent) {
		/**
		 * @j2sNative
		 * 
		 * jQueryEvent.originalEvent.xallowKeyEvent = true;
		 */		
	}

	/**
	 * 
	 * @param mode
	 * @return ignored)
	 */
	protected boolean handleCtrlV(int mode) {
		switch (mode) {
		case KeyEvent.KEY_PRESSED:
			break;
		case KeyEvent.KEY_RELEASED:
			String val = getJSTextValue();
			Point pt = new Point();
			getJSMarkAndDot(pt, 0);
			editor.setTextFromUI(val);		
			setJSMarkAndDot(pt.x, pt.x, false);
			setJavaMarkAndDot(pt);
			break;
		}
		return true;
	}

	protected Boolean handleTab(Object jQueryEvent, String type) {
		return (type == "keydown" ? null : Boolean.valueOf(CONSUMED));
	}


	/**
	 * Get the current selection point for the Java model.
	 * 
	 * @param t
	 * @param pt
	 * @param biasReturn
	 * @return 
	 */
    public int viewToModel(JTextComponent t, Point pt,
            Position.Bias[] biasReturn) {
    	if (pt.x == Integer.MAX_VALUE) {
        	// from DefaultCursor mouse event
    		getJSMarkAndDot(pt, 0);
    		return pt.y;
    	}    	
		if (charMap == null)
			createCharMap();
		for (int n = charMap.size(), i = n; --i >= 0;) {
			Double p = charMap.get(i);
			if (p.y < pt.y && p.x < pt.x)
				return (i == n - 1 ? i - 1 : i);
		}
	    return 0;
    }
    
    /**
     * This method does not account for line wrapping -- just for very simple strings
     */
    private void createCharMap() {
    	charMap = new ArrayList<Double>();
    	String s = editor.getText();
    	double x = 0, y = 0;
    	FontMetrics fm = editor.getFont().getFontMetrics();
    	int tabWidth = fm.stringWidth("    ");
    	int h = fm.getHeight();
    	int line0 = 0;
    	int ntab = 0;
    	for (int i = 0; i < s.length(); i++) {
    		charMap.add(new Double(x, y)); 
    		char c = s.charAt(i);
    		switch (c) {
    		case '\n':
    			y += h;
    			x = 0;
    			ntab = 0;
    			line0 = i + 1;
    			break;
    		case '\t':
    			x += tabWidth;
    			ntab++;
    			break;
    			// todo
    	    default:
    	    	Rectangle2D r = fm.getStringBounds(s, line0, i + 1, null);
    	    	x = r.getWidth() + ntab * tabWidth;
    	    	break;
    		}
    	}
		charMap.add(new Double(x, y)); 
		charMap.add(new Double(0, y+h)); 
	}

	/**
     * transfer the mark and dot to the Java TextComponent
     * @param markDot
     */
	void setJavaMarkAndDot(Point markDot) {
		int mark = markDot.x;
		int dot = markDot.y;
		Caret c = editor.getCaret();
		if (c.getMark() == mark && c.getDot() == dot)
			return;
		if (c.getMark() != mark)
			c.setDot(mark);
		if (c.getDot() != dot)
			c.moveDot(dot);
	}

	/**
	 * get the new Java cursor position after a key event
	 * 
	 * @param pt
	 * @return a new dot (y) and, if they are changed, a new mark (x), or if not
	 *         changed, x will be Integer.MIN_VALUE
	 */
	Point getNewCaretPosition(int eventType, int keyCode) {
		Point pt = markDot;
		pt.x = 0;
		getJSMarkAndDot(pt, keyCode); 
		
		int mark = pt.x, dot = pt.y; 

		// HTML5 selection is always mark....dot
		// but Java can be Dot....Mark

		int oldMark = editor.getCaret().getMark();
		int oldDot = editor.getCaret().getDot();
		if (dot != mark && oldMark == dot) {
			dot = mark;
			mark = oldMark;
		}
		pt.x = (dot == oldDot && mark == oldMark ? Integer.MIN_VALUE : mark);
		pt.y = dot;
		return pt;
	}

	public void caretUpdatedByProgram(CaretEvent e) {
		//System.out.println("JSTextUI "+ e);
//		
//		// AWT components need to show the change, but not Swing components.
//		if (false && isAWT && !jc.hasFocus()) { 
//			Component fc = KeyboardFocusManager.getCurrentKeyboardFocusManager().getFocusOwner();
//			jc.requestFocus();
//			if (fc != null)
//				fc.requestFocus();
//		}
	}
	



//	/**
//	 * Gets the maximum size for the editor component.
//	 * 
//	 * @return the size
//	 */
//	@Override
//	public Dimension getMaximumSize(JComponent jc) {
//
//		return super.getMaximumSize(jc);
//
//		// Document doc = editor.getDocument();
//		// Insets i = c.getInsets();
//		// Dimension d = new Dimension();
//		// if (doc instanceof AbstractDocument) {
//		// ((AbstractDocument)doc).readLock();
//		// }
//		// try {
//		// d.width = (int) Math.min((long) rootView.getMaximumSpan(View.X_AXIS) +
//		// (long) i.left + (long) i.right, Integer.MAX_VALUE);
//		// d.height = (int) Math.min((long) rootView.getMaximumSpan(View.Y_AXIS) +
//		// (long) i.top + (long) i.bottom, Integer.MAX_VALUE);
//		// } finally {
//		// if (doc instanceof AbstractDocument) {
//		// ((AbstractDocument)doc).readUnlock();
//		// }
//		// }
//		// return d;
//	}

	// /**
	// * Paints a background for the view. This will only be
	// * called if isOpaque() on the associated component is
	// * true. The default is to paint the background color
	// * of the component.
	// *
	// * @param g the graphics context
	// */
	// protected void paintBackground(Graphics g) {
	// g.setColor(editor.getBackground());
	// g.fillRect(0, 0, editor.getWidth(), editor.getHeight());
	// }
	//
	// /**
	// * Flags model changes.
	// * This is called whenever the model has changed.
	// * It is implemented to rebuild the view hierarchy
	// * to represent the default root element of the
	// * associated model.
	// */
	// protected void modelChanged() {
	// // create a view hierarchy
	// ViewFactory f = rootView.getViewFactory();
	// Document doc = editor.getDocument();
	// Element elem = doc.getDefaultRootElement();
	// setView(f.create(elem));
	// }
	//
	// /**
	// * Sets the current root of the view hierarchy and calls invalidate().
	// * If there were any child components, they will be removed (i.e.
	// * there are assumed to have come from components embedded in views).
	// *
	// * @param v the root view
	// */
	// protected final void setView(View v) {
	// rootView.setView(v);
	// painted = false;
	// editor.revalidate();
	// editor.repaint();
	// }
	//
	// /**
	// * Paints the interface safely with a guarantee that
	// * the model won't change from the view of this thread.
	// * This does the following things, rendering from
	// * back to front.
	// * <ol>
	// * <li>
	// * If the component is marked as opaque, the background
	// * is painted in the current background color of the
	// * component.
	// * <li>
	// * The highlights (if any) are painted.
	// * <li>
	// * The view hierarchy is painted.
	// * <li>
	// * The caret is painted.
	// * </ol>
	// *
	// * @param g the graphics context
	// */
	// protected void paintSafely(Graphics g) {
	// painted = true;
	// Highlighter highlighter = editor.getHighlighter();
	// Caret caret = editor.getCaret();
	//
	// // paint the background
	// if (editor.isOpaque()) {
	// paintBackground(g);
	// }
	//
	// // paint the highlights
	// if (highlighter != null) {
	// highlighter.paint(g);
	// }
	//
	// // paint the view hierarchy
	// Rectangle alloc = getVisibleEditorRect();
	// if (alloc != null) {
	// rootView.paint(g, alloc);
	// }
	//
	// // paint the caret
	// if (caret != null) {
	// caret.paint(g);
	// }
	//
	// if (dropCaret != null) {
	// dropCaret.paint(g);
	// }
	// }

	/**
	 * Gets the allocation to give the root View. Due to an unfortunate set of
	 * historical events this method is inappropriately named. The Rectangle
	 * returned has nothing to do with visibility. The component must have a
	 * non-zero positive size for this translation to be computed.
	 *
	 * @return the bounding box for the root view
	 */
	protected Rectangle getVisibleEditorRect() {
		Rectangle alloc = editor.getBounds();
		if ((alloc.width > 0) && (alloc.height > 0)) {
			alloc.x = alloc.y = 0;
			Insets insets = editor.getInsets();
			alloc.x += insets.left;
			alloc.y += insets.top;
			alloc.width -= insets.left + insets.right;
			alloc.height -= insets.top + insets.bottom;
			return alloc;
		}
		return null;
	}
	
	 /**
	 * Converts the given location in the model to a place in
	 * the view coordinate system.
	 * The component must have a non-zero positive size for
	 * this translation to be computed.
	 *
	 * @param tc the text component for which this UI is installed
	 * @param pos the local location in the model to translate >= 0
	 * @return the coordinates as a rectangle, null if the model is not painted
	 * @exception BadLocationException if the given position does not
	 * represent a valid location in the associated document
	 * @see TextUI#modelToView
	 */
	 public Rectangle modelToView(JTextComponent tc, int pos) throws
	 BadLocationException {
	 return modelToView(tc, pos, Position.Bias.Forward);
	 }
	
	 /**
	 * Converts the given location in the model to a place in
	 * the view coordinate system.
	 * The component must have a non-zero positive size for
	 * this translation to be computed.
	 *
	 * @param tc the text component for which this UI is installed
	 * @param pos the local location in the model to translate >= 0
	 * @return the coordinates as a rectangle, null if the model is not painted
	 * @exception BadLocationException if the given position does not
	 * represent a valid location in the associated document
	 * @see TextUI#modelToView
	 */
	 public Rectangle modelToView(JTextComponent tc, int pos, Position.Bias
	 bias) throws BadLocationException {
//	 Document doc = editor.getDocument();
//	 if (doc instanceof AbstractDocument) {
//	 ((AbstractDocument)doc).readLock();
//	 }
//	 try {
	 Rectangle alloc = getVisibleEditorRect();
	 return alloc;
//	 if (alloc != null) {
//	 rootView.setSize(alloc.width, alloc.height);
//	 Shape s = rootView.modelToView(pos, alloc, bias);
//	 if (s != null) {
//	 return s.getBounds();
//	 }
//	 }
//	 } finally {
//	 if (doc instanceof AbstractDocument) {
//	 ((AbstractDocument)doc).readUnlock();
//	 }
//	 }
//	 return null;
	 }
	
	 /**
	 * Converts the given place in the view coordinate system
	 * to the nearest representative location in the model.
	 * The component must have a non-zero positive size for
	 * this translation to be computed.
	 *
	 * @param tc the text component for which this UI is installed
	 * @param pt the location in the view to translate. This
	 * should be in the same coordinate system as the mouse events.
	 * @return the offset from the start of the document >= 0,
	 * -1 if not painted
	 * @see TextUI#viewToModel
	 */
	 public int viewToModel(JTextComponent tc, Point pt) {
	 return viewToModel(tc, pt, discardBias);
	 }
	
	 /**
	 * Called from javax.swing.text classes, particularly DefaultEditorKit
	 */
	 public int getNextVisualPositionFrom(JTextComponent t, int pos,
	 Position.Bias b, int direction, Position.Bias[] biasRet)
	 throws BadLocationException{
		 
		 int dot = editor.getCaretPosition();
		 
//		 System.out.println("next " + dot + " " + direction);
		 switch (direction) {
		 case SwingConstants.SOUTH:
			 dot = editor.getText().indexOf('\n', dot + 1);
			 if (dot >= 0)
				 return dot;
			 dot = Integer.MAX_VALUE;
			 // fall through
		 case SwingConstants.EAST:
			 int len = editor.getDocument().getLength() - (isEditorPane ? 0 : 1);
			 dot = (dot >= len ? len : ++dot);
			 return dot;
		 case SwingConstants.NORTH:
			 dot = editor.getText().lastIndexOf('\n', dot - 1);
			 if (dot >= 0)
				 return dot;
			 dot = -1;
			 // fall through
		 case SwingConstants.WEST:
			 return (dot <= 0 ? 0 : --dot);
		 }
	 return -1;
	 }
	//
	// /**
	// * Causes the portion of the view responsible for the
	// * given part of the model to be repainted. Does nothing if
	// * the view is not currently painted.
	// *
	// * @param tc the text component for which this UI is installed
	// * @param p0 the beginning of the range >= 0
	// * @param p1 the end of the range >= p0
	// * @see TextUI#damageRange
	// */
	// public void damageRange(JTextComponent tc, int p0, int p1) {
	// damageRange(tc, p0, p1, Position.Bias.Forward, Position.Bias.Backward);
	// }
	//
	// /**
	// * Causes the portion of the view responsible for the
	// * given part of the model to be repainted.
	// *
	// * @param p0 the beginning of the range >= 0
	// * @param p1 the end of the range >= p0
	// */
	// public void damageRange(JTextComponent t, int p0, int p1,
	// Position.Bias p0Bias, Position.Bias p1Bias) {
	// if (painted) {
	// Rectangle alloc = getVisibleEditorRect();
	// if (alloc != null) {
	// Document doc = t.getDocument();
	// if (doc instanceof AbstractDocument) {
	// ((AbstractDocument)doc).readLock();
	// }
	// try {
	// rootView.setSize(alloc.width, alloc.height);
	// Shape toDamage = rootView.modelToView(p0, p0Bias,
	// p1, p1Bias, alloc);
	// Rectangle rect = (toDamage instanceof Rectangle) ?
	// (Rectangle)toDamage : toDamage.getBounds();
	// editor.repaint(rect.x, rect.y, rect.width, rect.height);
	// } catch (BadLocationException e) {
	// } finally {
	// if (doc instanceof AbstractDocument) {
	// ((AbstractDocument)doc).readUnlock();
	// }
	// }
	// }
	// }
	// }

	// /**
	// * Fetches a View with the allocation of the associated
	// * text component (i.e. the root of the hierarchy) that
	// * can be traversed to determine how the model is being
	// * represented spatially.
	// * <p>
	// * <font color=red><b>NOTE:</b>The View hierarchy can
	// * be traversed from the root view, and other things
	// * can be done as well. Things done in this way cannot
	// * be protected like simple method calls through the TextUI.
	// * Therefore, proper operation in the presence of concurrency
	// * must be arranged by any logic that calls this method!
	// * </font>
	// *
	// * @param tc the text component for which this UI is installed
	// * @return the view
	// * @see TextUI#getRootView
	// */
	// public View getRootView(JTextComponent tc) {
	// return rootView;
	// }

	// /**
	// * Returns the string to be used as the tooltip at the passed in location.
	// * This forwards the method onto the root View.
	// *
	// * @see javax.swing.text.JTextComponent#getToolTipText
	// * @see javax.swing.text.View#getToolTipText
	// * @since 1.4
	// */
	// public String getToolTipText(JTextComponent t, Point pt) {
	// if (!painted) {
	// return null;
	// }
	// Document doc = editor.getDocument();
	// String tt = null;
	// Rectangle alloc = getVisibleEditorRect();
	//
	// if (alloc != null) {
	// if (doc instanceof AbstractDocument) {
	// ((AbstractDocument)doc).readLock();
	// }
	// try {
	// tt = rootView.getToolTipText(pt.x, pt.y, alloc);
	// } finally {
	// if (doc instanceof AbstractDocument) {
	// ((AbstractDocument)doc).readUnlock();
	// }
	// }
	// }
	// return tt;
	// }
	//
	// --- ViewFactory methods ------------------------------
	//
	// /**
	// * Creates a view for an element.
	// * If a subclass wishes to directly implement the factory
	// * producing the view(s), it should reimplement this
	// * method. By default it simply returns null indicating
	// * it is unable to represent the element.
	// *
	// * @param elem the element
	// * @return the view
	// */
	// public View create(Element elem) {
	// return null;
	// }
	//
	// /**
	// * Creates a view for an element.
	// * If a subclass wishes to directly implement the factory
	// * producing the view(s), it should reimplement this
	// * method. By default it simply returns null indicating
	// * it is unable to represent the part of the element.
	// *
	// * @param elem the element
	// * @param p0 the starting offset >= 0
	// * @param p1 the ending offset >= p0
	// * @return the view
	// */
	// public View create(Element elem, int p0, int p1) {
	// return null;
	// }
	//
	// public static class BasicCaret extends DefaultCaret implements UIResource
	// {}
	//
	// public static class BasicHighlighter extends DefaultHighlighter implements
	// UIResource {}
	//
	// static class BasicCursor extends Cursor implements UIResource {
	// BasicCursor(int type) {
	// super(type);
	// }
	//
	// BasicCursor(String name) {
	// super(name);
	// }
	// }
	//
	// protected static BasicCursor textCursor = new
	// BasicCursor(Cursor.TEXT_CURSOR);
	// ----- member variables ---------------------------------------

	// transient boolean painted;
	// transient RootView rootView = new RootView();
	// transient UpdateHandler updateHandler = new UpdateHandler();
	// protected static final TransferHandler defaultTransferHandler = new
	// TextTransferHandler();
	// protected final DragListener dragListener = getDragListener();
	protected static final Position.Bias[] discardBias = new Position.Bias[1];
	// protected DefaultCaret dropCaret;

	// /**
	// * Root view that acts as a gateway between the component
	// * and the View hierarchy.
	// */
	// class RootView extends View {
	//
	// RootView() {
	// super(null);
	// }
	//
	// void setView(View v) {
	// View oldView = view;
	// view = null;
	// if (oldView != null) {
	// // get rid of back reference so that the old
	// // hierarchy can be garbage collected.
	// oldView.setParent(null);
	// }
	// if (v != null) {
	// v.setParent(this);
	// }
	// view = v;
	// }
	//
	// /**
	// * Fetches the attributes to use when rendering. At the root
	// * level there are no attributes. If an attribute is resolved
	// * up the view hierarchy this is the end of the line.
	// */
	// public AttributeSet getAttributes() {
	// return null;
	// }
	//
	// /**
	// * Determines the preferred span for this view along an axis.
	// *
	// * @param axis may be either X_AXIS or Y_AXIS
	// * @return the span the view would like to be rendered into.
	// * Typically the view is told to render into the span
	// * that is returned, although there is no guarantee.
	// * The parent may choose to resize or break the view.
	// */
	// public float getPreferredSpan(int axis) {
	// if (view != null) {
	// return view.getPreferredSpan(axis);
	// }
	// return 10;
	// }
	//
	// /**
	// * Determines the minimum span for this view along an axis.
	// *
	// * @param axis may be either X_AXIS or Y_AXIS
	// * @return the span the view would like to be rendered into.
	// * Typically the view is told to render into the span
	// * that is returned, although there is no guarantee.
	// * The parent may choose to resize or break the view.
	// */
	// public float getMinimumSpan(int axis) {
	// if (view != null) {
	// return view.getMinimumSpan(axis);
	// }
	// return 10;
	// }
	//
	// /**
	// * Determines the maximum span for this view along an axis.
	// *
	// * @param axis may be either X_AXIS or Y_AXIS
	// * @return the span the view would like to be rendered into.
	// * Typically the view is told to render into the span
	// * that is returned, although there is no guarantee.
	// * The parent may choose to resize or break the view.
	// */
	// public float getMaximumSpan(int axis) {
	// return Integer.MAX_VALUE;
	// }
	//
	// /**
	// * Specifies that a preference has changed.
	// * Child views can call this on the parent to indicate that
	// * the preference has changed. The root view routes this to
	// * invalidate on the hosting component.
	// * <p>
	// * This can be called on a different thread from the
	// * event dispatching thread and is basically unsafe to
	// * propagate into the component. To make this safe,
	// * the operation is transferred over to the event dispatching
	// * thread for completion. It is a design goal that all view
	// * methods be safe to call without concern for concurrency,
	// * and this behavior helps make that true.
	// *
	// * @param child the child view
	// * @param width true if the width preference has changed
	// * @param height true if the height preference has changed
	// */
	// public void preferenceChanged(View child, boolean width, boolean height) {
	// editor.revalidate();
	// }
	//
	// /**
	// * Determines the desired alignment for this view along an axis.
	// *
	// * @param axis may be either X_AXIS or Y_AXIS
	// * @return the desired alignment, where 0.0 indicates the origin
	// * and 1.0 the full span away from the origin
	// */
	// public float getAlignment(int axis) {
	// if (view != null) {
	// return view.getAlignment(axis);
	// }
	// return 0;
	// }
	//
	// /**
	// * Renders the view.
	// *
	// * @param g the graphics context
	// * @param allocation the region to render into
	// */
	// public void paint(Graphics g, Shape allocation) {
	// if (view != null) {
	// Rectangle alloc = (allocation instanceof Rectangle) ?
	// (Rectangle)allocation : allocation.getBounds();
	// setSize(alloc.width, alloc.height);
	// view.paint(g, allocation);
	// }
	// }
	//
	// /**
	// * Sets the view parent.
	// *
	// * @param parent the parent view
	// */
	// public void setParent(View parent) {
	// throw new Error("Can't set parent on root view");
	// }
	//
	// /**
	// * Returns the number of views in this view. Since
	// * this view simply wraps the root of the view hierarchy
	// * it has exactly one child.
	// *
	// * @return the number of views
	// * @see #getView
	// */
	// public int getViewCount() {
	// return 1;
	// }
	//
	// /**
	// * Gets the n-th view in this container.
	// *
	// * @param n the number of the view to get
	// * @return the view
	// */
	// public View getView(int n) {
	// return view;
	// }
	//
	// /**
	// * Returns the child view index representing the given position in
	// * the model. This is implemented to return the index of the only
	// * child.
	// *
	// * @param pos the position >= 0
	// * @return index of the view representing the given position, or
	// * -1 if no view represents that position
	// * @since 1.3
	// */
	// public int getViewIndex(int pos, Position.Bias b) {
	// return 0;
	// }
	//
	// /**
	// * Fetches the allocation for the given child view.
	// * This enables finding out where various views
	// * are located, without assuming the views store
	// * their location. This returns the given allocation
	// * since this view simply acts as a gateway between
	// * the view hierarchy and the associated component.
	// *
	// * @param index the index of the child
	// * @param a the allocation to this view.
	// * @return the allocation to the child
	// */
	// public Shape getChildAllocation(int index, Shape a) {
	// return a;
	// }
	//
	// /**
	// * Provides a mapping from the document model coordinate space
	// * to the coordinate space of the view mapped to it.
	// *
	// * @param pos the position to convert
	// * @param a the allocated region to render into
	// * @return the bounding box of the given position
	// */
	// public Shape modelToView(int pos, Shape a, Position.Bias b) throws
	// BadLocationException {
	// if (view != null) {
	// return view.modelToView(pos, a, b);
	// }
	// return null;
	// }
	//
	// /**
	// * Provides a mapping from the document model coordinate space
	// * to the coordinate space of the view mapped to it.
	// *
	// * @param p0 the position to convert >= 0
	// * @param b0 the bias toward the previous character or the
	// * next character represented by p0, in case the
	// * position is a boundary of two views.
	// * @param p1 the position to convert >= 0
	// * @param b1 the bias toward the previous character or the
	// * next character represented by p1, in case the
	// * position is a boundary of two views.
	// * @param a the allocated region to render into
	// * @return the bounding box of the given position is returned
	// * @exception BadLocationException if the given position does
	// * not represent a valid location in the associated document
	// * @exception IllegalArgumentException for an invalid bias argument
	// * @see View#viewToModel
	// */
	// public Shape modelToView(int p0, Position.Bias b0, int p1, Position.Bias
	// b1, Shape a) throws BadLocationException {
	// if (view != null) {
	// return view.modelToView(p0, b0, p1, b1, a);
	// }
	// return null;
	// }
	//
	// /**
	// * Provides a mapping from the view coordinate space to the logical
	// * coordinate space of the model.
	// *
	// * @param x x coordinate of the view location to convert
	// * @param y y coordinate of the view location to convert
	// * @param a the allocated region to render into
	// * @return the location within the model that best represents the
	// * given point in the view
	// */
	// public int viewToModel(float x, float y, Shape a, Position.Bias[] bias) {
	// if (view != null) {
	// int retValue = view.viewToModel(x, y, a, bias);
	// return retValue;
	// }
	// return -1;
	// }
	//
	// /**
	// * Provides a way to determine the next visually represented model
	// * location that one might place a caret. Some views may not be visible,
	// * they might not be in the same order found in the model, or they just
	// * might not allow access to some of the locations in the model.
	// *
	// * @param pos the position to convert >= 0
	// * @param a the allocated region to render into
	// * @param direction the direction from the current position that can
	// * be thought of as the arrow keys typically found on a keyboard.
	// * This may be SwingConstants.WEST, SwingConstants.EAST,
	// * SwingConstants.NORTH, or SwingConstants.SOUTH.
	// * @return the location within the model that best represents the next
	// * location visual position.
	// * @exception BadLocationException
	// * @exception IllegalArgumentException for an invalid direction
	// */
	// public int getNextVisualPositionFrom(int pos, Position.Bias b, Shape a,
	// int direction,
	// Position.Bias[] biasRet)
	// throws BadLocationException {
	// if( view != null ) {
	// int nextPos = view.getNextVisualPositionFrom(pos, b, a,
	// direction, biasRet);
	// if(nextPos != -1) {
	// pos = nextPos;
	// }
	// else {
	// biasRet[0] = b;
	// }
	// }
	// return pos;
	// }
	//
	// /**
	// * Gives notification that something was inserted into the document
	// * in a location that this view is responsible for.
	// *
	// * @param e the change information from the associated document
	// * @param a the current allocation of the view
	// * @param f the factory to use to rebuild if the view has children
	// */
	// public void insertUpdate(DocumentEvent e, Shape a, ViewFactory f) {
	// if (view != null) {
	// view.insertUpdate(e, a, f);
	// }
	// }
	//
	// /**
	// * Gives notification that something was removed from the document
	// * in a location that this view is responsible for.
	// *
	// * @param e the change information from the associated document
	// * @param a the current allocation of the view
	// * @param f the factory to use to rebuild if the view has children
	// */
	// public void removeUpdate(DocumentEvent e, Shape a, ViewFactory f) {
	// if (view != null) {
	// view.removeUpdate(e, a, f);
	// }
	// }
	//
	// /**
	// * Gives notification from the document that attributes were changed
	// * in a location that this view is responsible for.
	// *
	// * @param e the change information from the associated document
	// * @param a the current allocation of the view
	// * @param f the factory to use to rebuild if the view has children
	// */
	// public void changedUpdate(DocumentEvent e, Shape a, ViewFactory f) {
	// if (view != null) {
	// view.changedUpdate(e, a, f);
	// }
	// }
	//
	// /**
	// * Returns the document model underlying the view.
	// *
	// * @return the model
	// */
	// public Document getDocument() {
	// return editor.getDocument();
	// }
	//
	// /**
	// * Returns the starting offset into the model for this view.
	// *
	// * @return the starting offset
	// */
	// public int getStartOffset() {
	// if (view != null) {
	// return view.getStartOffset();
	// }
	// return getElement().getStartOffset();
	// }
	//
	// /**
	// * Returns the ending offset into the model for this view.
	// *
	// * @return the ending offset
	// */
	// public int getEndOffset() {
	// if (view != null) {
	// return view.getEndOffset();
	// }
	// return getElement().getEndOffset();
	// }
	//
	// /**
	// * Gets the element that this view is mapped to.
	// *
	// * @return the view
	// */
	// public Element getElement() {
	// if (view != null) {
	// return view.getElement();
	// }
	// return editor.getDocument().getDefaultRootElement();
	// }
	//
	// /**
	// * Breaks this view on the given axis at the given length.
	// *
	// * @param axis may be either X_AXIS or Y_AXIS
	// * @param len specifies where a break is desired in the span
	// * @param the current allocation of the view
	// * @return the fragment of the view that represents the given span
	// * if the view can be broken, otherwise null
	// */
	// public View breakView(int axis, float len, Shape a) {
	// throw new Error("Can't break root view");
	// }
	//
	// /**
	// * Determines the resizability of the view along the
	// * given axis. A value of 0 or less is not resizable.
	// *
	// * @param axis may be either X_AXIS or Y_AXIS
	// * @return the weight
	// */
	// public int getResizeWeight(int axis) {
	// if (view != null) {
	// return view.getResizeWeight(axis);
	// }
	// return 0;
	// }
	//
	// /**
	// * Sets the view size.
	// *
	// * @param width the width
	// * @param height the height
	// */
	// public void setSize(float width, float height) {
	// if (view != null) {
	// view.setSize(width, height);
	// }
	// }
	//
	// /**
	// * Fetches the container hosting the view. This is useful for
	// * things like scheduling a repaint, finding out the host
	// * components font, etc. The default implementation
	// * of this is to forward the query to the parent view.
	// *
	// * @return the container
	// */
	// public Container getContainer() {
	// return editor;
	// }
	//
	// /**
	// * Fetches the factory to be used for building the
	// * various view fragments that make up the view that
	// * represents the model. This is what determines
	// * how the model will be represented. This is implemented
	// * to fetch the factory provided by the associated
	// * EditorKit unless that is null, in which case this
	// * simply returns the BasicTextUI itself which allows
	// * subclasses to implement a simple factory directly without
	// * creating extra objects.
	// *
	// * @return the factory
	// */
	// public ViewFactory getViewFactory() {
	// EditorKit kit = getEditorKit(editor);
	// ViewFactory f = kit.getViewFactory();
	// if (f != null) {
	// return f;
	// }
	// return BasicTextUI.this;
	// }
	//
	// protected View view;
	//
	// }

	// /**
	// * Handles updates from various places. If the model is changed,
	// * this class unregisters as a listener to the old model and
	// * registers with the new model. If the document model changes,
	// * the change is forwarded to the root view. If the focus
	// * accelerator changes, a new keystroke is registered to request
	// * focus.
	// */
	// class UpdateHandler implements PropertyChangeListener, DocumentListener,
	// LayoutManager2, UIResource {
	//
	// // --- PropertyChangeListener methods -----------------------
	//
	// /**
	// * This method gets called when a bound property is changed.
	// * We are looking for document changes on the editor.
	// */
	// public final void propertyChange(PropertyChangeEvent evt) {
	// Object oldValue = evt.getOldValue();
	// Object newValue = evt.getNewValue();
	// String propertyName = evt.getPropertyName();
	// if ((oldValue instanceof Document) || (newValue instanceof Document)) {
	// if (oldValue != null) {
	// ((Document)oldValue).removeDocumentListener(this);
	// i18nView = false;
	// }
	// if (newValue != null) {
	// ((Document)newValue).addDocumentListener(this);
	// if ("document" == propertyName) {
	// setView(null);
	// BasicTextUI.this.propertyChange(evt);
	// modelChanged();
	// return;
	// }
	// }
	// modelChanged();
	// }
	// if ("focusAccelerator" == propertyName) {
	// updateFocusAcceleratorBinding(true);
	// } else if ("componentOrientation" == propertyName) {
	// // Changes in ComponentOrientation require the views to be
	// // rebuilt.
	// modelChanged();
	// } else if ("font" == propertyName) {
	// modelChanged();
	// } else if ("dropLocation" == propertyName) {
	// dropIndexChanged();
	// } else if ("editable" == propertyName) {
	// updateCursor();
	// modelChanged();
	// }
	// BasicTextUI.this.propertyChange(evt);
	// }
	//
	// protected void dropIndexChanged() {
	// if (editor.getDropMode() == DropMode.USE_SELECTION) {
	// return;
	// }
	//
	// JTextComponent.DropLocation dropLocation = editor.getDropLocation();
	//
	// if (dropLocation == null) {
	// if (dropCaret != null) {
	// dropCaret.deinstall(editor);
	// editor.repaint(dropCaret);
	// dropCaret = null;
	// }
	// } else {
	// if (dropCaret == null) {
	// dropCaret = new BasicCaret();
	// dropCaret.install(editor);
	// dropCaret.setVisible(true);
	// }
	//
	// dropCaret.setDot(dropLocation.getIndex(),
	// dropLocation.getBias());
	// }
	// }
	//
	// // --- DocumentListener methods -----------------------
	//
	// /**
	// * The insert notification. Gets sent to the root of the view structure
	// * that represents the portion of the model being represented by the
	// * editor. The factory is added as an argument to the update so that
	// * the views can update themselves in a dynamic (not hardcoded) way.
	// *
	// * @param e The change notification from the currently associated
	// * document.
	// * @see DocumentListener#insertUpdate
	// */
	// public final void insertUpdate(DocumentEvent e) {
	// Document doc = e.getDocument();
	// Object o = doc.getProperty("i18n");
	// if (o instanceof Boolean) {
	// Boolean i18nFlag = (Boolean) o;
	// if (i18nFlag.booleanValue() != i18nView) {
	// // i18n flag changed, rebuild the view
	// i18nView = i18nFlag.booleanValue();
	// modelChanged();
	// return;
	// }
	// }
	//
	// // normal insert update
	// Rectangle alloc = (painted) ? getVisibleEditorRect() : null;
	// rootView.insertUpdate(e, alloc, rootView.getViewFactory());
	// }
	//
	// /**
	// * The remove notification. Gets sent to the root of the view structure
	// * that represents the portion of the model being represented by the
	// * editor. The factory is added as an argument to the update so that
	// * the views can update themselves in a dynamic (not hardcoded) way.
	// *
	// * @param e The change notification from the currently associated
	// * document.
	// * @see DocumentListener#removeUpdate
	// */
	// public final void removeUpdate(DocumentEvent e) {
	// Rectangle alloc = (painted) ? getVisibleEditorRect() : null;
	// rootView.removeUpdate(e, alloc, rootView.getViewFactory());
	// }
	//
	// /**
	// * The change notification. Gets sent to the root of the view structure
	// * that represents the portion of the model being represented by the
	// * editor. The factory is added as an argument to the update so that
	// * the views can update themselves in a dynamic (not hardcoded) way.
	// *
	// * @param e The change notification from the currently associated
	// * document.
	// * @see DocumentListener#changeUpdate
	// */
	// public final void changedUpdate(DocumentEvent e) {
	// Rectangle alloc = (painted) ? getVisibleEditorRect() : null;
	// rootView.changedUpdate(e, alloc, rootView.getViewFactory());
	// }
	//
	// // --- LayoutManager2 methods -------------------------------
	//
	// /**
	// * Adds the specified component with the specified name to
	// * the layout.
	// * @param name the component name
	// * @param comp the component to be added
	// */
	// public void addLayoutComponent(String name, Component comp) {
	// // not supported
	// }
	//
	// /**
	// * Removes the specified component from the layout.
	// * @param comp the component to be removed
	// */
	// public void removeLayoutComponent(Component comp) {
	// if (constraints != null) {
	// // remove the constraint record
	// constraints.remove(comp);
	// }
	// }
	//
	// /**
	// * Calculates the preferred size dimensions for the specified
	// * panel given the components in the specified parent container.
	// * @param parent the component to be laid out
	// *
	// * @see #minimumLayoutSize
	// */
	// public Dimension preferredLayoutSize(Container parent) {
	// // should not be called (JComponent uses UI instead)
	// return null;
	// }
	//
	// /**
	// * Calculates the minimum size dimensions for the specified
	// * panel given the components in the specified parent container.
	// * @param parent the component to be laid out
	// * @see #preferredLayoutSize
	// */
	// public Dimension minimumLayoutSize(Container parent) {
	// // should not be called (JComponent uses UI instead)
	// return null;
	// }
	//
	// /**
	// * Lays out the container in the specified panel. This is
	// * implemented to position all components that were added
	// * with a View object as a constraint. The current allocation
	// * of the associated View is used as the location of the
	// * component.
	// * <p>
	// * A read-lock is acquired on the document to prevent the
	// * view tree from being modified while the layout process
	// * is active.
	// *
	// * @param parent the component which needs to be laid out
	// */
	// public void layoutContainer(Container parent) {
	// if ((constraints != null) && (! constraints.isEmpty())) {
	// Rectangle alloc = getVisibleEditorRect();
	// if (alloc != null) {
	// Document doc = editor.getDocument();
	// if (doc instanceof AbstractDocument) {
	// ((AbstractDocument)doc).readLock();
	// }
	// try {
	// rootView.setSize(alloc.width, alloc.height);
	// Enumeration components = constraints.keys();
	// while (components.hasMoreElements()) {
	// Component comp = (Component) components.nextElement();
	// View v = (View) constraints.get(comp);
	// Shape ca = calculateViewPosition(alloc, v);
	// if (ca != null) {
	// Rectangle compAlloc = (ca instanceof Rectangle) ?
	// (Rectangle) ca : ca.getBounds();
	// comp.setBounds(compAlloc);
	// }
	// }
	// } finally {
	// if (doc instanceof AbstractDocument) {
	// ((AbstractDocument)doc).readUnlock();
	// }
	// }
	// }
	// }
	// }
	//
	// /**
	// * Find the Shape representing the given view.
	// */
	// Shape calculateViewPosition(Shape alloc, View v) {
	// int pos = v.getStartOffset();
	// View child = null;
	// for (View parent = rootView; (parent != null) && (parent != v); parent =
	// child) {
	// int index = parent.getViewIndex(pos, Position.Bias.Forward);
	// alloc = parent.getChildAllocation(index, alloc);
	// child = parent.getView(index);
	// }
	// return (child != null) ? alloc : null;
	// }
	//
	// /**
	// * Adds the specified component to the layout, using the specified
	// * constraint object. We only store those components that were added
	// * with a constraint that is of type View.
	// *
	// * @param comp the component to be added
	// * @param constraint where/how the component is added to the layout.
	// */
	// public void addLayoutComponent(Component comp, Object constraint) {
	// if (constraint instanceof View) {
	// if (constraints == null) {
	// constraints = new Hashtable(7);
	// }
	// constraints.put(comp, constraint);
	// }
	// }
	//
	// /**
	// * Returns the maximum size of this component.
	// * @see java.awt.Component#getMinimumSize()
	// * @see java.awt.Component#getPreferredSize()
	// * @see LayoutManager
	// */
	// public Dimension maximumLayoutSize(Container target) {
	// // should not be called (JComponent uses UI instead)
	// return null;
	// }
	//
	// /**
	// * Returns the alignment along the x axis. This specifies how
	// * the component would like to be aligned relative to other
	// * components. The value should be a number between 0 and 1
	// * where 0 represents alignment along the origin, 1 is aligned
	// * the furthest away from the origin, 0.5 is centered, etc.
	// */
	// public float getLayoutAlignmentX(Container target) {
	// return 0.5f;
	// }
	//
	// /**
	// * Returns the alignment along the y axis. This specifies how
	// * the component would like to be aligned relative to other
	// * components. The value should be a number between 0 and 1
	// * where 0 represents alignment along the origin, 1 is aligned
	// * the furthest away from the origin, 0.5 is centered, etc.
	// */
	// public float getLayoutAlignmentY(Container target) {
	// return 0.5f;
	// }
	//
	// /**
	// * Invalidates the layout, indicating that if the layout manager
	// * has cached information it should be discarded.
	// */
	// public void invalidateLayout(Container target) {
	// }
	//
	// /**
	// * The "layout constraints" for the LayoutManager2 implementation.
	// * These are View objects for those components that are represented
	// * by a View in the View tree.
	// */
	// protected Hashtable constraints;
	//
	// protected boolean i18nView = false;
	// }
	// protected static DragListener getDragListener() {
	// synchronized(DragListener.class) {
	// DragListener listener =
	// (DragListener)AppContext.getAppContext().
	// get(DragListener.class);
	//
	// if (listener == null) {
	// listener = new DragListener();
	// AppContext.getAppContext().put(DragListener.class, listener);
	// }
	//
	// return listener;
	// }
	// }
	//
	// /**
	// * Listens for mouse events for the purposes of detecting drag gestures.
	// * BasicTextUI will maintain one of these per AppContext.
	// */
	// static class DragListener extends MouseInputAdapter
	// implements BeforeDrag {
	//
	// protected boolean dragStarted;
	//
	// public void dragStarting(MouseEvent me) {
	// dragStarted = true;
	// }
	//
	// public void mousePressed(MouseEvent e) {
	// JTextComponent c = (JTextComponent)e.getSource();
	// if (c.getDragEnabled()) {
	// dragStarted = false;
	// if (isDragPossible(e) && DragRecognitionSupport.mousePressed(e)) {
	// e.consume();
	// }
	// }
	// }
	//
	// public void mouseReleased(MouseEvent e) {
	// JTextComponent c = (JTextComponent)e.getSource();
	// if (c.getDragEnabled()) {
	// if (dragStarted) {
	// e.consume();
	// }
	//
	// DragRecognitionSupport.mouseReleased(e);
	// }
	// }
	//
	// public void mouseDragged(MouseEvent e) {
	// JTextComponent c = (JTextComponent)e.getSource();
	// if (c.getDragEnabled()) {
	// if (dragStarted || DragRecognitionSupport.mouseDragged(e, this)) {
	// e.consume();
	// }
	// }
	// }
	//
	// /**
	// * Determines if the following are true:
	// * <ul>
	// * <li>the component is enabled
	// * <li>the press event is located over a selection
	// * </ul>
	// */
	// protected boolean isDragPossible(MouseEvent e) {
	// JTextComponent c = (JTextComponent)e.getSource();
	// if (c.isEnabled()) {
	// Caret caret = c.getCaret();
	// int dot = caret.getDot();
	// int mark = caret.getMark();
	// if (dot != mark) {
	// Point p = new Point(e.getX(), e.getY());
	// int pos = c.viewToModel(p);
	//
	// int p0 = Math.min(dot, mark);
	// int p1 = Math.max(dot, mark);
	// if ((pos >= p0) && (pos < p1)) {
	// return true;
	// }
	// }
	// }
	// return false;
	// }
	// }

	// static class TextTransferHandler extends TransferHandler implements
	// UIResource {
	//
	// protected JTextComponent exportComp;
	// protected boolean shouldRemove;
	// protected int p0;
	// protected int p1;
	//
	// /**
	// * Whether or not this is a drop using
	// * <code>DropMode.INSERT</code>.
	// */
	// protected boolean modeBetween = false;
	//
	// /**
	// * Whether or not this is a drop.
	// */
	// protected boolean isDrop = false;
	//
	// /**
	// * The drop action.
	// */
	// protected int dropAction = MOVE;
	//
	// /**
	// * The drop bias.
	// */
	// protected Position.Bias dropBias;
	//
	// /**
	// * Try to find a flavor that can be used to import a Transferable.
	// * The set of usable flavors are tried in the following order:
	// * <ol>
	// * <li>First, an attempt is made to find a flavor matching the content type
	// * of the EditorKit for the component.
	// * <li>Second, an attempt to find a text/plain flavor is made.
	// * <li>Third, an attempt to find a flavor representing a String reference
	// * in the same VM is made.
	// * <li>Lastly, DataFlavor.stringFlavor is searched for.
	// * </ol>
	// */
	// protected DataFlavor getImportFlavor(DataFlavor[] flavors, JTextComponent
	// c) {
	// DataFlavor plainFlavor = null;
	// DataFlavor refFlavor = null;
	// DataFlavor stringFlavor = null;
	//
	// if (c instanceof JEditorPane) {
	// for (int i = 0; i < flavors.length; i++) {
	// String mime = flavors[i].getMimeType();
	// if (mime.startsWith(((JEditorPane)c).getEditorKit().getContentType())) {
	// return flavors[i];
	// } else if (plainFlavor == null && mime.startsWith("text/plain")) {
	// plainFlavor = flavors[i];
	// } else if (refFlavor == null &&
	// mime.startsWith("application/x-java-jvm-local-objectref")
	// && flavors[i].getRepresentationClass() == java.lang.String.class) {
	// refFlavor = flavors[i];
	// } else if (stringFlavor == null &&
	// flavors[i].equals(DataFlavor.stringFlavor)) {
	// stringFlavor = flavors[i];
	// }
	// }
	// if (plainFlavor != null) {
	// return plainFlavor;
	// } else if (refFlavor != null) {
	// return refFlavor;
	// } else if (stringFlavor != null) {
	// return stringFlavor;
	// }
	// return null;
	// }
	//
	//
	// for (int i = 0; i < flavors.length; i++) {
	// String mime = flavors[i].getMimeType();
	// if (mime.startsWith("text/plain")) {
	// return flavors[i];
	// } else if (refFlavor == null &&
	// mime.startsWith("application/x-java-jvm-local-objectref")
	// && flavors[i].getRepresentationClass() == java.lang.String.class) {
	// refFlavor = flavors[i];
	// } else if (stringFlavor == null &&
	// flavors[i].equals(DataFlavor.stringFlavor)) {
	// stringFlavor = flavors[i];
	// }
	// }
	// if (refFlavor != null) {
	// return refFlavor;
	// } else if (stringFlavor != null) {
	// return stringFlavor;
	// }
	// return null;
	// }
	//
	// /**
	// * Import the given stream data into the text component.
	// */
	// protected void handleReaderImport(Reader in, JTextComponent c, boolean
	// useRead)
	// throws BadLocationException, IOException {
	// if (useRead) {
	// int startPosition = c.getSelectionStart();
	// int endPosition = c.getSelectionEnd();
	// int length = endPosition - startPosition;
	// EditorKit kit = c.getUI().getEditorKit(c);
	// Document doc = c.getDocument();
	// if (length > 0) {
	// doc.remove(startPosition, length);
	// }
	// kit.read(in, doc, startPosition);
	// } else {
	// char[] buff = new char[1024];
	// int nch;
	// boolean lastWasCR = false;
	// int last;
	// StringBuffer sbuff = null;
	//
	// // Read in a block at a time, mapping \r\n to \n, as well as single
	// // \r to \n.
	// while ((nch = in.read(buff, 0, buff.length)) != -1) {
	// if (sbuff == null) {
	// sbuff = new StringBuffer(nch);
	// }
	// last = 0;
	// for(int counter = 0; counter < nch; counter++) {
	// switch(buff[counter]) {
	// case '\r':
	// if (lastWasCR) {
	// if (counter == 0) {
	// sbuff.append('\n');
	// } else {
	// buff[counter - 1] = '\n';
	// }
	// } else {
	// lastWasCR = true;
	// }
	// break;
	// case '\n':
	// if (lastWasCR) {
	// if (counter > (last + 1)) {
	// sbuff.append(buff, last, counter - last - 1);
	// }
	// // else nothing to do, can skip \r, next write will
	// // write \n
	// lastWasCR = false;
	// last = counter;
	// }
	// break;
	// default:
	// if (lastWasCR) {
	// if (counter == 0) {
	// sbuff.append('\n');
	// } else {
	// buff[counter - 1] = '\n';
	// }
	// lastWasCR = false;
	// }
	// break;
	// }
	// }
	// if (last < nch) {
	// if (lastWasCR) {
	// if (last < (nch - 1)) {
	// sbuff.append(buff, last, nch - last - 1);
	// }
	// } else {
	// sbuff.append(buff, last, nch - last);
	// }
	// }
	// }
	// if (lastWasCR) {
	// sbuff.append('\n');
	// }
	// c.replaceSelection(sbuff != null ? sbuff.toString() : "");
	// }
	// }
	//
	// // --- TransferHandler methods ------------------------------------
	//
	// /**
	// * This is the type of transfer actions supported by the source. Some models
	// are
	// * not mutable, so a transfer operation of COPY only should
	// * be advertised in that case.
	// *
	// * @param c The component holding the data to be transfered. This
	// * argument is provided to enable sharing of TransferHandlers by
	// * multiple components.
	// * @return This is implemented to return NONE if the component is a
	// JPasswordField
	// * since exporting data via user gestures is not allowed. If the text
	// component is
	// * editable, COPY_OR_MOVE is returned, otherwise just COPY is allowed.
	// */
	// public int getSourceActions(JComponent c) {
	// if (c instanceof JPasswordField &&
	// c.getClientProperty("JPasswordField.cutCopyAllowed") !=
	// Boolean.TRUE) {
	// return NONE;
	// }
	//
	// return ((JTextComponent)c).isEditable() ? COPY_OR_MOVE : COPY;
	// }
	//
	// /**
	// * Create a Transferable to use as the source for a data transfer.
	// *
	// * @param comp The component holding the data to be transfered. This
	// * argument is provided to enable sharing of TransferHandlers by
	// * multiple components.
	// * @return The representation of the data to be transfered.
	// *
	// */
	// protected Transferable createTransferable(JComponent comp) {
	// exportComp = (JTextComponent)comp;
	// shouldRemove = true;
	// p0 = exportComp.getSelectionStart();
	// p1 = exportComp.getSelectionEnd();
	// return (p0 != p1) ? (new TextTransferable(exportComp, p0, p1)) : null;
	// }
	//
	// /**
	// * This method is called after data has been exported. This method should
	// remove
	// * the data that was transfered if the action was MOVE.
	// *
	// * @param source The component that was the source of the data.
	// * @param data The data that was transferred or possibly null
	// * if the action is <code>NONE</code>.
	// * @param action The actual action that was performed.
	// */
	// protected void exportDone(JComponent source, Transferable data, int action)
	// {
	// // only remove the text if shouldRemove has not been set to
	// // false by importData and only if the action is a move
	// if (shouldRemove && action == MOVE) {
	// TextTransferable t = (TextTransferable)data;
	// t.removeText();
	// }
	//
	// exportComp = null;
	// }
	//
	// public boolean importData(TransferSupport support) {
	// isDrop = support.isDrop();
	//
	// if (isDrop) {
	// modeBetween =
	// ((JTextComponent)support.getComponent()).getDropMode() == DropMode.INSERT;
	//
	// dropBias =
	// ((JTextComponent.DropLocation)support.getDropLocation()).getBias();
	//
	// dropAction = support.getDropAction();
	// }
	//
	// try {
	// return super.importData(support);
	// } finally {
	// isDrop = false;
	// modeBetween = false;
	// dropBias = null;
	// dropAction = MOVE;
	// }
	// }
	//
	// /**
	// * This method causes a transfer to a component from a clipboard or a
	// * DND drop operation. The Transferable represents the data to be
	// * imported into the component.
	// *
	// * @param comp The component to receive the transfer. This
	// * argument is provided to enable sharing of TransferHandlers by
	// * multiple components.
	// * @param t The data to import
	// * @return true if the data was inserted into the component, false
	// otherwise.
	// */
	// public boolean importData(JComponent comp, Transferable t) {
	// JTextComponent c = (JTextComponent)comp;
	//
	// int pos = modeBetween
	// ? ((JTextComponent.DropLocation)c.getDropLocation()).getIndex()
	// : c.getCaretPosition();
	//
	// // if we are importing to the same component that we exported from
	// // then don't actually do anything if the drop location is inside
	// // the drag location and set shouldRemove to false so that exportDone
	// // knows not to remove any data
	// if (dropAction == MOVE && c == exportComp && pos >= p0 && pos <= p1) {
	// shouldRemove = false;
	// return true;
	// }
	//
	// boolean imported = false;
	// DataFlavor importFlavor = getImportFlavor(t.getTransferDataFlavors(), c);
	// if (importFlavor != null) {
	// try {
	// boolean useRead = false;
	// if (comp instanceof JEditorPane) {
	// JEditorPane ep = (JEditorPane)comp;
	// if (!ep.getContentType().startsWith("text/plain") &&
	// importFlavor.getMimeType().startsWith(ep.getContentType())) {
	// useRead = true;
	// }
	// }
	// InputContext ic = c.getInputContext();
	// if (ic != null) {
	// ic.endComposition();
	// }
	// Reader r = importFlavor.getReaderForText(t);
	//
	// if (modeBetween) {
	// Caret caret = c.getCaret();
	// if (caret instanceof DefaultCaret) {
	// ((DefaultCaret)caret).setDot(pos, dropBias);
	// } else {
	// c.setCaretPosition(pos);
	// }
	// }
	//
	// handleReaderImport(r, c, useRead);
	//
	// if (isDrop) {
	// c.requestFocus();
	// Caret caret = c.getCaret();
	// if (caret instanceof DefaultCaret) {
	// int newPos = caret.getDot();
	// Position.Bias newBias = ((DefaultCaret)caret).getDotBias();
	//
	// ((DefaultCaret)caret).setDot(pos, dropBias);
	// ((DefaultCaret)caret).moveDot(newPos, newBias);
	// } else {
	// c.select(pos, c.getCaretPosition());
	// }
	// }
	//
	// imported = true;
	// } catch (UnsupportedFlavorException ufe) {
	// } catch (BadLocationException ble) {
	// } catch (IOException ioe) {
	// }
	// }
	// return imported;
	// }
	//
	// /**
	// * This method indicates if a component would accept an import of the given
	// * set of data flavors prior to actually attempting to import it.
	// *
	// * @param comp The component to receive the transfer. This
	// * argument is provided to enable sharing of TransferHandlers by
	// * multiple components.
	// * @param flavors The data formats available
	// * @return true if the data can be inserted into the component, false
	// otherwise.
	// */
	// public boolean canImport(JComponent comp, DataFlavor[] flavors) {
	// JTextComponent c = (JTextComponent)comp;
	// if (!(c.isEditable() && c.isEnabled())) {
	// return false;
	// }
	// return (getImportFlavor(flavors, c) != null);
	// }
	//
	// /**
	// * A possible implementation of the Transferable interface
	// * for text components. For a JEditorPane with a rich set
	// * of EditorKit implementations, conversions could be made
	// * giving a wider set of formats. This is implemented to
	// * offer up only the active content type and text/plain
	// * (if that is not the active format) since that can be
	// * extracted from other formats.
	// */
	// static class TextTransferable extends BasicTransferable {
	//
	// TextTransferable(JTextComponent c, int start, int end) {
	// super(null, null);
	//
	// this.c = c;
	//
	// Document doc = c.getDocument();
	//
	// try {
	// p0 = doc.createPosition(start);
	// p1 = doc.createPosition(end);
	//
	// plainData = c.getSelectedText();
	//
	// if (c instanceof JEditorPane) {
	// JEditorPane ep = (JEditorPane)c;
	//
	// mimeType = ep.getContentType();
	//
	// if (mimeType.startsWith("text/plain")) {
	// return;
	// }
	//
	// StringWriter sw = new StringWriter(p1.getOffset() - p0.getOffset());
	// ep.getEditorKit().write(sw, doc, p0.getOffset(), p1.getOffset() -
	// p0.getOffset());
	//
	// if (mimeType.startsWith("text/html")) {
	// htmlData = sw.toString();
	// } else {
	// richText = sw.toString();
	// }
	// }
	// } catch (BadLocationException ble) {
	// } catch (IOException ioe) {
	// }
	// }
	//
	// void removeText() {
	// if ((p0 != null) && (p1 != null) && (p0.getOffset() != p1.getOffset())) {
	// try {
	// Document doc = c.getDocument();
	// doc.remove(p0.getOffset(), p1.getOffset() - p0.getOffset());
	// } catch (BadLocationException e) {
	// }
	// }
	// }
	//
	// // ---- EditorKit other than plain or HTML text -----------------------
	//
	// /**
	// * If the EditorKit is not for text/plain or text/html, that format
	// * is supported through the "richer flavors" part of BasicTransferable.
	// */
	// protected DataFlavor[] getRicherFlavors() {
	// if (richText == null) {
	// return null;
	// }
	//
	// try {
	// DataFlavor[] flavors = new DataFlavor[3];
	// flavors[0] = new DataFlavor(mimeType + ";class=java.lang.String");
	// flavors[1] = new DataFlavor(mimeType + ";class=java.io.Reader");
	// flavors[2] = new DataFlavor(mimeType +
	// ";class=java.io.InputStream;charset=unicode");
	// return flavors;
	// } catch (ClassNotFoundException cle) {
	// // fall through to unsupported (should not happen)
	// }
	//
	// return null;
	// }
	//
	// /**
	// * The only richer format supported is the file list flavor
	// */
	// protected Object getRicherData(DataFlavor flavor) throws
	// UnsupportedFlavorException {
	// if (richText == null) {
	// return null;
	// }
	//
	// if (String.class.equals(flavor.getRepresentationClass())) {
	// return richText;
	// } else if (Reader.class.equals(flavor.getRepresentationClass())) {
	// return new StringReader(richText);
	// } else if (InputStream.class.equals(flavor.getRepresentationClass())) {
	// return new StringBufferInputStream(richText);
	// }
	// throw new UnsupportedFlavorException(flavor);
	// }
	//
	// Position p0;
	// Position p1;
	// String mimeType;
	// String richText;
	// JTextComponent c;
	// }
	//
	// }

	// /**
	// * Creates a new UI.
	// */
	// public JSTextUI() {
	// // painted = false;
	// }
	//
	// /**
	// * Creates the object to use for a caret. By default an
	// * instance of BasicCaret is created. This method
	// * can be redefined to provide something else that implements
	// * the InputPosition interface or a subclass of JCaret.
	// *
	// * @return the caret object
	// */
	// protected Caret createCaret() {
	// return new BasicCaret();
	// }
	//
	// /**
	// * Creates the object to use for adding highlights. By default
	// * an instance of BasicHighlighter is created. This method
	// * can be redefined to provide something else that implements
	// * the Highlighter interface or a subclass of DefaultHighlighter.
	// *
	// * @return the highlighter
	// */
	// protected Highlighter createHighlighter() {
	// return new BasicHighlighter();
	// }
	//

	/**
	 * Fetches the name of the keymap that will be installed/used by default for
	 * this UI. This is implemented to create a name based upon the classname. The
	 * name is the the name of the class with the package prefix removed.
	 *
	 * @return the name
	 */
	protected String getKeymapName() {
		String nm = getClass().getName();
		int index = nm.lastIndexOf('.');
		if (index >= 0) {
			nm = nm.substring(index + 1, nm.length());
		}
		return nm;
	}
	
//	 /**
//	 * Creates the keymap to use for the text component, and installs
//	 * any necessary bindings into it. By default, the keymap is
//	 * shared between all instances of this type of TextUI. The
//	 * keymap has the name defined by the getKeymapName method. If the
//	 * keymap is not found, then DEFAULT_KEYMAP from JTextComponent is used.
//	 * <p>
//	 * The set of bindings used to create the keymap is fetched
//	 * from the UIManager using a key formed by combining the
//	 * {@link #getPropertyPrefix} method
//	 * and the string <code>.keyBindings</code>. The type is expected
//	 * to be <code>JTextComponent.KeyBinding[]</code>.
//	 *
//	 * @return the keymap
//	 * @see #getKeymapName
//	 * @see javax.swing.text.JTextComponent
//	 */
//	 protected Keymap createKeymap() {
//	 String nm = getKeymapName();
//	 Keymap map = JTextComponent.getKeymap(nm);
//	 if (map == null) {
//	 Keymap parent = JTextComponent.getKeymap(JTextComponent.DEFAULT_KEYMAP);
//	 map = JTextComponent.addKeymap(nm, parent);
//	 String prefix = getPropertyPrefix();
//	 Object o = DefaultLookup.get(editor, this,
//	 prefix + ".keyBindings");
//	 if ((o != null) && (o instanceof JTextComponent.KeyBinding[])) {
//	 JTextComponent.KeyBinding[] bindings = (JTextComponent.KeyBinding[]) o;
//	 JTextComponent.loadKeymap(map, bindings, getComponent().getActions());
//	 }
//	 }
//	 return map;
//	 }
	//
	// /**
	// * This method gets called when a bound property is changed
	// * on the associated JTextComponent. This is a hook
	// * which UI implementations may change to reflect how the
	// * UI displays bound properties of JTextComponent subclasses.
	// * This is implemented to do nothing (i.e. the response to
	// * properties in JTextComponent itself are handled prior
	// * to calling this method).
	// *
	// * This implementation updates the background of the text
	// * component if the editable and/or enabled state changes.
	// *
	// * @param evt the property change event
	// */
	// protected void propertyChange(PropertyChangeEvent evt) {
	// if (evt.getPropertyName().equals("editable") ||
	// evt.getPropertyName().equals("enabled")) {
	//
	// updateBackground((JTextComponent)evt.getSource());
	// }
	// }
	//
	// /**
	// * Updates the background of the text component based on whether the
	// * text component is editable and/or enabled.
	// *
	// * @param c the JTextComponent that needs its background color updated
	// */
	// protected void updateBackground(JTextComponent c) {
	// // This is a temporary workaround.
	// // This code does not correctly deal with Synth (Synth doesn't use
	// // properties like this), nor does it deal with the situation where
	// // the developer grabs the color from a JLabel and sets it as
	// // the background for a JTextArea in all look and feels. The problem
	// // scenario results if the Color obtained for the Label and TextArea
	// // is ==, which is the case for the windows look and feel.
	// // Until an appropriate solution is found, the code is being
	// // reverted to what it was before the original fix.
	// if (this instanceof sun.swing.plaf.synth.SynthUI ||
	// (c instanceof JTextArea)) {
	// return;
	// }
	// Color background = c.getBackground();
	// if (background instanceof UIResource) {
	// String prefix = getPropertyPrefix();
	//
	// Color disabledBG =
	// DefaultLookup.getColor(c, this, prefix + ".disabledBackground", null);
	// Color inactiveBG =
	// DefaultLookup.getColor(c, this, prefix + ".inactiveBackground", null);
	// Color bg =
	// DefaultLookup.getColor(c, this, prefix + ".background", null);
	//
	// /* In an ideal situation, the following check would not be necessary
	// * and we would replace the color any time the previous color was a
	// * UIResouce. However, it turns out that there is existing code that
	// * uses the following inadvisable pattern to turn a text area into
	// * what appears to be a multi-line label:
	// *
	// * JLabel label = new JLabel();
	// * JTextArea area = new JTextArea();
	// * area.setBackground(label.getBackground());
	// * area.setEditable(false);
	// *
	// * JLabel's default background is a UIResource. As such, just
	// * checking for UIResource would have us always changing the
	// * background away from what the developer wanted.
	// *
	// * Therefore, for JTextArea/JEditorPane, we'll additionally check
	// * that the color we're about to replace matches one that was
	// * installed by us from the UIDefaults.
	// */
	// if ((c instanceof JTextArea || c instanceof JEditorPane)
	// && background != disabledBG
	// && background != inactiveBG
	// && background != bg) {
	//
	// return;
	// }
	//
	// Color newColor = null;
	// if (!c.isEnabled()) {
	// newColor = disabledBG;
	// }
	// if (newColor == null && !c.isEditable()) {
	// newColor = inactiveBG;
	// }
	// if (newColor == null) {
	// newColor = bg;
	// }
	// if (newColor != null && newColor != background) {
	// c.setBackground(newColor);
	// }
	// }
	// }
	//

//	/**
//	 * overridden by JSEditorPanelUI
//	 * 
//	 * @param val
//	 */
//	public void setText(String val) {
//		String prop = null;
//		DOMNode obj = null;
//		if (val == null ? currentText != null : !val.equals(currentText)) {
//			currentText = val;			
//			if (textNode != null) {
//				prop = "innerHTML";
//				obj = textNode;
//			} else if (valueNode != null) {
//				prop = "value";
//				obj = valueNode;
//			}
//			if (obj != null) {
//				System.out.println("JSTextUI setting text " + val);
//				setJSText(obj, prop, val);
//			}
//		}
//	}


	// /**
	// * Superclass paints background in an uncontrollable way
	// * (i.e. one might want an image tiled into the background).
	// * To prevent this from happening twice, this method is
	// * reimplemented to simply paint.
	// * <p>
	// * <em>NOTE:</em> Superclass is also not thread-safe in
	// * it's rendering of the background, although that's not
	// * an issue with the default rendering.
	// */
	// public void update(Graphics g, JComponent c) {
	// paint(g, c);
	// }
	//
	// /**
	// * Paints the interface. This is routed to the
	// * paintSafely method under the guarantee that
	// * the model won't change from the view of this thread
	// * while it's rendering (if the associated model is
	// * derived from AbstractDocument). This enables the
	// * model to potentially be updated asynchronously.
	// *
	// * @param g the graphics context
	// * @param c the editor component
	// */
	// public final void paint(Graphics g, JComponent c) {
	// if ((rootView.getViewCount() > 0) && (rootView.getView(0) != null)) {
	// Document doc = editor.getDocument();
	// if (doc instanceof AbstractDocument) {
	// ((AbstractDocument)doc).readLock();
	// }
	// try {
	// paintSafely(g);
	// } finally {
	// if (doc instanceof AbstractDocument) {
	// ((AbstractDocument)doc).readUnlock();
	// }
	// }
	// }
	// }

	// /**
	// * Gets the preferred size for the editor component. If the component
	// * has been given a size prior to receiving this request, it will
	// * set the size of the view hierarchy to reflect the size of the component
	// * before requesting the preferred size of the view hierarchy. This
	// * allows formatted views to format to the current component size before
	// * answering the request. Other views don't care about currently formatted
	// * size and give the same answer either way.
	// *
	// * @param c the editor component
	// * @return the size
	// */
	// public Dimension getPreferredSize(JComponent c) {
	// Dimension d = c.getSize();
	// // Document doc = editor.getDocument();
	// // Insets i = c.getInsets();
	// //
	// // if (doc instanceof AbstractDocument) {
	// // ((AbstractDocument)doc).readLock();
	// // }
	// // try {
	// // if ((d.width > (i.left + i.right)) && (d.height > (i.top + i.bottom))) {
	// // rootView.setSize(d.width - i.left - i.right, d.height - i.top -
	// i.bottom);
	// // }
	// // else if (d.width == 0 && d.height == 0) {
	// // // Probably haven't been layed out yet, force some sort of
	// // // initial sizing.
	// // rootView.setSize(Integer.MAX_VALUE, Integer.MAX_VALUE);
	// // }
	// // d.width = (int) Math.min((long) rootView.getPreferredSpan(View.X_AXIS) +
	// // (long) i.left + (long) i.right, Integer.MAX_VALUE);
	// // d.height = (int) Math.min((long) rootView.getPreferredSpan(View.Y_AXIS)
	// +
	// // (long) i.top + (long) i.bottom, Integer.MAX_VALUE);
	// // } finally {
	// // if (doc instanceof AbstractDocument) {
	// // ((AbstractDocument)doc).readUnlock();
	// // }
	// // }
	// return d;
	// }

	// /**
	// * Invoked when the focus accelerator changes, this will update the
	// * key bindings as necessary.
	// */
	// void updateFocusAcceleratorBinding(boolean changed) {
	// char accelerator = editor.getFocusAccelerator();
	//
	// if (changed || accelerator != '\0') {
	// InputMap km = SwingUtilities.getUIInputMap
	// (editor, JComponent.WHEN_IN_FOCUSED_WINDOW);
	//
	// if (km == null && accelerator != '\0') {
	// km = new ComponentInputMapUIResource(editor);
	// SwingUtilities.replaceUIInputMap(editor, JComponent.
	// WHEN_IN_FOCUSED_WINDOW, km);
	// ActionMap am = getActionMap();
	// SwingUtilities.replaceUIActionMap(editor, am);
	// }
	// if (km != null) {
	// km.clear();
	// if (accelerator != '\0') {
	// km.put(KeyStroke.getKeyStroke(accelerator,
	// ActionEvent.ALT_MASK),
	// "requestFocus");
	// }
	// }
	// }
	// }
	//
	//
	// /**
	// * Invoked when editable property is changed.
	// *
	// * removing 'TAB' and 'SHIFT-TAB' from traversalKeysSet in case
	// * editor is editable
	// * adding 'TAB' and 'SHIFT-TAB' to traversalKeysSet in case
	// * editor is non editable
	// */
	//
	// void updateFocusTraversalKeys() {
	// /*
	// * Fix for 4514331 Non-editable JTextArea and similar
	// * should allow Tab to keyboard - accessibility
	// */
	// EditorKit editorKit = getEditorKit(editor);
	// if ( editorKit != null
	// && editorKit instanceof DefaultEditorKit) {
	// Set storedForwardTraversalKeys = editor.
	// getFocusTraversalKeys(KeyboardFocusManager.
	// FORWARD_TRAVERSAL_KEYS);
	// Set storedBackwardTraversalKeys = editor.
	// getFocusTraversalKeys(KeyboardFocusManager.
	// BACKWARD_TRAVERSAL_KEYS);
	// Set forwardTraversalKeys =
	// new HashSet(storedForwardTraversalKeys);
	// Set backwardTraversalKeys =
	// new HashSet(storedBackwardTraversalKeys);
	// if (editor.isEditable()) {
	// forwardTraversalKeys.
	// remove(KeyStroke.getKeyStroke(KeyEvent.VK_TAB, 0));
	// backwardTraversalKeys.
	// remove(KeyStroke.getKeyStroke(KeyEvent.VK_TAB,
	// InputEvent.SHIFT_MASK));
	// } else {
	// forwardTraversalKeys.add(KeyStroke.
	// getKeyStroke(KeyEvent.VK_TAB, 0));
	// backwardTraversalKeys.
	// add(KeyStroke.
	// getKeyStroke(KeyEvent.VK_TAB, InputEvent.SHIFT_MASK));
	// }
	// LookAndFeel.installProperty(editor,
	// "focusTraversalKeysForward",
	// forwardTraversalKeys);
	// LookAndFeel.installProperty(editor,
	// "focusTraversalKeysBackward",
	// backwardTraversalKeys);
	// }
	//
	// }

	// /**
	// * As needed updates cursor for the target editor.
	// */
	// protected void updateCursor() {
	// if ((! editor.isCursorSet())
	// || editor.getCursor() instanceof UIResource) {
	// Cursor cursor = (editor.isEditable()) ? textCursor : null;
	// editor.setCursor(cursor);
	// }
	// }
	//
	// /**
	// * Returns the <code>TransferHandler</code> that will be installed if
	// * their isn't one installed on the <code>JTextComponent</code>.
	// */
	// TransferHandler getTransferHandler() {
	// return defaultTransferHandler;
	// }
	//
	// ActionMap componentMap = new ActionMapUIResource();
	// componentMap.put("requestFocus", new FocusAction());
	// /*
	// * fix for bug 4515750
	// * JTextField & non-editable JTextArea bind return key - default btn not
	// accessible
	// *
	// * Wrap the return action so that it is only enabled when the
	// * component is editable. This allows the default button to be
	// * processed when the text component has focus and isn't editable.
	// *
	// */
	// if (getEditorKit(editor) instanceof DefaultEditorKit) {
	// if (map != null) {
	// Object obj = map.get(DefaultEditorKit.insertBreakAction);
	// if (obj != null
	// && obj instanceof DefaultEditorKit.InsertBreakAction) {
	// Action action = new TextActionWrapper((TextAction)obj);
	// componentMap.put(action.getValue(Action.NAME),action);
	// }
	// }
	// }
	// if (map != null) {
	// componentMap.setParent(map);
	// }
	// return componentMap;
	// }
	//

	@Override
	public boolean isFocusable() {
		return true;
	}


	public void action(String what, int data) {
		// see JSEditorPaneUI
	}


	public void setCaretFromJS() {
		Point pt = new Point();
		getJSMarkAndDot(pt, 0);
		setJavaMarkAndDot(pt);
	}

	@Override
	protected void setOverflow() {
		if (textNode == null) // JTextField
			return;
		Container scroller = jc.getParent();
		if (isAWT) {
			scroller = jc;
		} else if (!(scroller instanceof JViewport) || !((scroller = scroller.getParent()) instanceof JScrollPane)) {
			DOMNode.setStyles(domNode, "overflow", "hidden", "overflow-x", null, "overflow-y", null);
			return;
		} 
		JScrollPane sp = (JScrollPane) scroller;
		DOMNode.setStyle(domNode, "overflow", null);
		DOMNode.setStyle(domNode, "overflow-x", overflows[sp.getHorizontalScrollBarPolicy() % 10]);
		DOMNode.setStyle(domNode, "overflow-y", overflows[sp.getVerticalScrollBarPolicy() % 10]);
	}
	

}
