/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1995, 2011, Oracle and/or its affiliates. All rights reserved.
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
package java.awt;

import java.applet.JSApplet;
import java.awt.event.KeyListener;
import java.awt.peer.ComponentPeer;
import java.beans.PropertyChangeListener;
import java.util.Arrays;

import javax.swing.JComponent;
import javax.swing.JPopupMenu;
import javax.swing.RootPaneContainer;
import javax.swing.UIDefaults;
import javax.swing.UIManager;
import javax.swing.plaf.ComponentUI;

import swingjs.JSAppletThread;
import swingjs.JSAppletViewer;
import swingjs.JSFrameViewer;
import swingjs.JSGraphics2D;
import swingjs.api.js.HTML5Canvas;
import swingjs.plaf.JSComponentUI;

/**
 * A class to support swingJS for selected AWT and Swing components
 * 
 * Note that JPanel, JRootPane, and JDesktopPane allow for
 * 
 * putClientProperty("swingjs.overflow.hidden","false")
 * 
 * This allows for overflow, particularly of JInternalFrames on a JDesktop.
 * 
 * Used in Jalview. When used, one must set that client property for getRootPane(),
 * getContentPane(), and the JDesktop itself.
 * 
 * 
 * @author Bob Hanson
 * 
 */
public abstract class JSComponent extends Component {

	/**
	 * overridden in Applet
	 * 
	 * SwingJS Applet repurposes resize(width, height) to call
	 * J2S.Applet.prototype._resizeApplet in order to take care
	 * of all the HTML5 business associated with this applet, and
	 * it overrides resizeOriginal as well 
	 * 
	 * 
	 * @param width
	 * @param height
	 */
	@SuppressWarnings("deprecation")
	public void resizeOriginal(int width, int height) {
		// o
		resize(width, height);
	}

	/**
	 * For modal dialogs, make sure the parent component, if there is one, is a
	 * PropertyChangeListener for this component (JOptionPane, JFileChooser, or
	 * JColorChooser)
	 * 
	 * @param c
	 * @param listener
	 */
	public static void ensurePropertyChangeListener(Component c, Component listener) {
		if (listener instanceof PropertyChangeListener) {
			// BH SwingJS: We remove, then add, the parentComponent.
			// If it is not really a listener, there will be a notification
			c.removePropertyChangeListener((PropertyChangeListener) listener);
			c.addPropertyChangeListener((PropertyChangeListener) listener);
		} else if (listener != null) {
			System.err.println(
					"JSComponent: " + listener + " is not a PropertyChangeListener -- modal dialog will fail.");
		}
	}

	public static Component[] getChildArray(Container c) {
		return (c == null ? Container.EMPTY_ARRAY : c.getChildArray());
	}
	/**
	 * 
	 * used by SwingJS
	 * 
	 */

	protected boolean isAppletFrame;
	public boolean isFramedApplet;

	public String htmlName;
	protected int _num;
	private static int _incr;

	public boolean isRootPane, isContentPane;
	public HTML5Canvas canvas;
	public JSAppletViewer appletViewer = ((JSAppletThread) Thread.currentThread()).appletViewer;
	private JSFrameViewer frameViewer, topFrameViewer;
	public HTML5Canvas _canvas;
	public ComponentUI ui;

	private String uiClassID;

	Boolean peerVis;

	/**
	 * not totally successful; triggered for images, background, and fillBox
	 * 
	 */
	public boolean _isBackgroundPainted;

	

	public JSComponent() {
		super();
		_num = ++_incr;
	}

	/**
	 * 
	 * For SwingJS, we have the graphics without needing to get it from a peer.
	 * Creates a canvas and graphics context for this component's window or
	 * applet at the Applet or Frame level.
	 * 
	 */
	@Override
	public Graphics getGraphics() {
		if (width == 0 || height == 0 || !isVisible())
			return null;
		if (frameViewer != null)
			return frameViewer.getGraphics().create();
		if (parent == null) {
			return null;
		}
		Graphics g = parent.getGraphics();
		if (g == null)
			return null;
		// if (g instanceof ConstrainableGraphics) {
		// ((ConstrainableGraphics) g).constrain(x, y, width, height);
		// } else {
		g.translate(x, (isContentPane ? 0 : y));
		g.clipRect(0, 0, width, height); // BH changed 2018.12.05 was setClip
		// }
		g.setFont(getFont());
		return g;
	}

	public JSFrameViewer setFrameViewer(JSFrameViewer viewer) {
		// JApplet, JDialog, JFrame (including JInternalFrame), JRootPane, JWindow
		return frameViewer = (viewer == null ? viewer = new JSFrameViewer().setForWindow((RootPaneContainer) this) : viewer);
	}

	public JSFrameViewer getFrameViewer() {
		JSComponent parent = null;
		return (topFrameViewer != null ? topFrameViewer
				: frameViewer != null ? topFrameViewer = frameViewer
						: (parent = getParent()) == null ? null : (topFrameViewer = parent.getFrameViewer()));
	}

	public String getHTMLName(String uid) {
		return (htmlName == null ? htmlName = appContext.getThreadGroup().getName() + "_" + uid + "_" + _num : htmlName);
	}

	/**
	 * Returns the <code>UIDefaults</code> key used to look up the name of the
	 * <code>swing.plaf.ComponentUI</code> class that defines the look and feel
	 * for this component. Most applications will never need to call this
	 * method. Subclasses of <code>JComponent</code> that support pluggable look
	 * and feel should override this method to return a <code>UIDefaults</code>
	 * key that maps to the <code>ComponentUI</code> subclass that defines their
	 * look and feel.
	 *
	 * @return the <code>UIDefaults</code> key for a <code>ComponentUI</code>
	 *         subclass
	 * @see UIDefaults#getUI
	 * @beaninfo expert: true description: UIClassID
	 */
	public String getUIClassID() {
		return (uiClassID == null ? uiClassID = "ComponentUI" : uiClassID);
	}

	/**
	 * required by Container, but not actually ever called, 
	 * because all Containers are JComponents in SwingJS
	 * 
	 * @param ui
	 */
	public void setUI(ComponentUI ui) {
		this.ui = ui;
	}

	public ComponentUI getUI() {
		return ui;
	}

	@Override
	protected void updatePeerVisibility(boolean isVisible) {
		// check for visibility set prior to creation of ui.
		if (getOrCreatePeer() == null)
			peerVis = (isVisible ? Boolean.TRUE : Boolean.FALSE);
		else
			updatePeerVisibilityOrig(isVisible);
	}

	/**
	 * A peer in SwingJS can only be created after the ui is created.
	 */
	@Override
	protected ComponentPeer getOrCreatePeer() {
		return (ui == null ? null : peer == null ? (peer = getToolkit().createComponent(this)) : peer);
	}

	/**
	 * Run once for every component. Resets the UI property to a value from the
	 * current look and feel.
	 *
	 * @see JComponent#updateUI
	 */
	public void updateUI() {
		if (uiClassID == null)
			uiClassID = getUIClassID();
		if (ui == null)
			setUI(UIManager.getUI(this));
	}

	protected JSGraphics2D getJSGraphic2D(Graphics g) {
		return (/** @j2sNative g.mark$ ? g : */ null);
	}

	/**
	 * This method is added to ensure that if a jpanel or other object's
	 * background is painted to, that it becomes transparent -- since the actual
	 * painting is not to this canvas but instead to the JRootPane canvas.
	 *
	 * @param jsg
	 */
	public void checkBackgroundPainted(JSGraphics2D jsg) {
		if (jsg == null) {
			_isBackgroundPainted = false;
			return;
		}
		_isBackgroundPainted = jsg.isBackgroundPainted();
		if (_isBackgroundPainted) {
			((JSComponentUI) ui).setPainted(null);
			// It's all one canvas, and it is behind the root pane (bad design?)
			// so if it is painted, we should make the root pane transparent
			((JSComponentUI) ((JComponent) this).getRootPane().getUI()).setPainted(null);
		}
	}

	@Override
	public boolean isBackgroundSet() {
		return background != null;// false;// TODO (background != null &&
									// !isBackgroundPainted);
	}

	protected void updateUIZOrder() {
		
// developer could have created their own LayeredPane
//       if (uiClassID != "DesktopPaneUI")
//			return;
		
		// set the n by their position in the component list using the 
		// same z orders that are already there - probably something like 
		// 10000, 11000, 12000
    	int n = ((Container) this).getComponentCount();
    	if (n < 2)
    		return;
    	JSComponent[] components = (JSComponent[]) getChildArray((Container) this);
    	int[] zorders = new int[n];
        for (int i = 0; i < n; i++)
            zorders[i] = ((JSComponentUI) components[i].getUI()).getZIndex(null);
        Arrays.sort(zorders);
        for (int i = 0; i < n; i++)
        	((JSComponentUI) components[i].getUI()).setZOrder(zorders[n - 1 - i]);
	}

	
  @Override
  protected void invalidateComp() {
	  super.invalidateComp();
	  if (ui != null)
		  ((JSComponentUI)ui).invalidate();
	  
  }
  
  @Override
  public void validate() {
	  boolean wasValid = isValid();
	  super.validate();
	  if (ui != null && !wasValid)
		  ((JSComponentUI)ui).endValidate();
	  
  }

    /**
     * Paint this component, checking to see if the background got painted, and if so, make the 
     * div background transparent so that that underlying HTML5 canvas shows through.
     *  
     * @param g
     */
	public void paintWithBackgroundCheck(Graphics g) {
		checkBackgroundPainted(null);
		paint(g);
		checkBackgroundPainted(getJSGraphic2D(g));
	}

	@Override
	public void addKeyListener(KeyListener l) {
		super.addKeyListener(l);
		if (l != null && ui != null)
			((JSComponentUI)ui).enableJSKeys(true);
	}

	@Override
	public void removeKeyListener(KeyListener l) {
		super.removeKeyListener(l);
		if (keyListener == null && ui != null)
			((JSComponentUI)ui).enableJSKeys(false);
	}

}
