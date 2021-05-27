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

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.image.BufferedImage;
import java.awt.peer.ComponentPeer;
import java.awt.peer.LightweightPeer;
import java.beans.PropertyChangeListener;
import java.util.Arrays;

import javax.swing.Action;
import javax.swing.JComponent;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JRootPane;
import javax.swing.RootPaneContainer;
import javax.swing.UIDefaults;
import javax.swing.UIManager;
import javax.swing.border.AbstractBorder;
import javax.swing.border.EmptyBorder;
import javax.swing.plaf.BorderUIResource;
import javax.swing.plaf.ComponentUI;
import javax.swing.plaf.FontUIResource;
import javax.swing.plaf.UIResource;

import swingjs.JSAppletViewer;
import swingjs.JSFrameViewer;
import swingjs.JSGraphics2D;
import swingjs.JSKeyEvent;
import swingjs.JSMouse;
import swingjs.JSToolkit;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;
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
	 * A marker for the SwingJS version of JViewPort to indicate that it 
	 * can add an A2SWrappedComponent, not pass it back for wrapping.
	 * 
	 * @author hansonr
	 *
	 */
	public interface A2SComponentWrapper {

		public void 秘isWrapper();
	}

	/**
	 * For JViewPort. 
	 * 
	 * Implementations of java.awt.List require a JScrollPane/JViewPort
	 * wrapper.  
	 * 
	 * @author hansonr
	 *
	 */
	public interface A2SWrappedComponent {

	   public Component 秘getWrap();

	}

	/**
	 * indicates an key action is being processed
	 */
	public Action 秘keyAction;

//	protected boolean 秘isAppletFrame;
//	public boolean 秘isFramedApplet;

	public String 秘htmlName;

	protected boolean 秘winOrApplet;

	protected int 秘num;
	private static int 秘incr;
	private Insets 秘tempInsets;
	public JSGraphics2D 秘g;
	public JSGraphics2D 秘gtemp; // indicates that we are painting, so that g.setBackground() should also be set 

	public boolean 秘isRootPane, 秘isContentPane;
	// initially, we go with the current thread, but later we will pick up the actual JSAppletViewer
	public JSAppletViewer 秘appletViewer = Thread.currentThread().getThreadGroup().秘appletViewer;
	public JSFrameViewer 秘frameViewer, 秘topFrameViewer;
	public HTML5Canvas 秘canvas;
	public ComponentUI ui; // from JComponent

	public JSComponentUI 秘getUI() {
		return (JSComponentUI) ui;
	}

	private String 秘uiClassID;

	Boolean 秘peerVis;

	protected AbstractBorder 秘border; // from private JComponent field; was Border

    public final static int PAINTS_SELF_NO = -1;
    public final static int PAINTS_SELF_YES = 1;
    public final static int PAINTS_SELF_ALWAYS = 2;
    public final static int PAINTS_SELF_UNKNOWN = 0;

    /**
     * will be set to 1 if paint(graphics) is found to be overridden, signally that
     * we can't depend upon this component to be drawn by itself; JLabel will
     * also set this to 1 if there there is an icon
     * 
     */
    private int 秘iPaintMyself = PAINTS_SELF_UNKNOWN;
    
    /**
     * 	paint(g) or paintComponent(g) or update(g) or paintContainer(g) is overridden
     */
    private boolean 秘iPaintMyselfEntirely;
	private boolean 秘repaintAsUpdate = true;
	private static boolean 秘isRepaint = true;
	
	public boolean 秘paintsSelfEntirely() {
		return 秘iPaintMyselfEntirely;
	}

	protected static void 秘setIsRepaint(boolean b) {
		秘isRepaint = b;
	}
	
	@Override
	public void repaint() {
		if (width <= 0 || height <= 0)
			return;
		if (秘isAWT()) {
			秘repaintCmp(0, 0, 0, width, height);
		} else {
			repaint(0, 0, 0, width, height);
		}
	}

	
    // trying to replace these two:
	// public boolean 秘isBackgroundPainted;
	// protected boolean 秘alwaysPaint; // in AWT canvas

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
	public void 秘resizeOriginal(int width, int height) {
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
	public static void 秘ensurePropertyChangeListener(Component c, Component listener) {
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

	/**
	 * Note that the length of this array may be longer than getComponentCount()
	 * @param c
	 * @return
	 */
	public static Component[] 秘getChildArray(Container c) {
		return (c == null ? Container.EMPTY_ARRAY : c.getChildArray());
	}
	/**
	 * 
	 * used by SwingJS
	 * 
	 */

	public JSComponent() {
		super();
		秘num = ++秘incr;
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
		Graphics g;
		// this was 秘frameViewer != null, but that
		// fails for paintImmediately, because all components
		// have a reference to FrameViewer now, and so the 
		// offset was not being applied. The special case for
		// ContentPane adds its insets. parent == null is a 
		// proxy for Applet or Window since only they can be
		// here and not have a parent.
		if (秘isRootPane || 秘winOrApplet || 秘isContentPane) {
			// this next call adds the necessary transform.
			g = 秘frameViewer.getGraphics().create();
			if (秘isContentPane) {
				if (秘tempInsets == null)
					秘tempInsets = new Insets(0,0,0,0);
				((JComponent) this).getRootPane().getInsets(秘tempInsets);
				if (秘tempInsets.left != 0 || 秘tempInsets.top != 0)
					g.translate(秘tempInsets.left, 秘tempInsets.top);
				// when user has inset the applet -- should clip? 
			}
			return g;
		}
		if (parent == null) {
			return null;
		}
		g = parent.getGraphics();
		if (g == null)
			return null;
		// if (g instanceof ConstrainableGraphics) {
		// ((ConstrainableGraphics) g).constrain(x, y, width, height);
		// } else {
		// Check to see if the subclass is getting this graphics
		// object directly, without using paint(Graphics).
		if (!JComponent.isComponentObtainingGraphicsFrom(null) && !秘paintsSelf()) {
			秘setPaintsSelf(PAINTS_SELF_YES);
			((JSComponentUI) ui).clearPaintPath();
		}
		
		g.translate(x, (秘isContentPane ? 0 : y));
		g.clipRect(0, 0, width, height); // BH changed 2018.12.05 was setClip
		// }
		g.setFont(getFont());
		return g;
	}

	@Override
	public void addNotify() {
		if (秘paintsSelf() && ui != null) // BoxFiller will not have a ui? 
			((JSComponentUI) ui).clearPaintPath();
		if (parent != null)
			秘appletViewer = parent.秘appletViewer;
		super.addNotify();
	}

	public JSFrameViewer setFrameViewer(JSFrameViewer viewer) {
		// JApplet, JDialog, JFrame (including JInternalFrame), JRootPane, JWindow
		return 秘frameViewer = (viewer == null ? viewer = new JSFrameViewer().setForWindow((RootPaneContainer) this) : viewer);
	}

	
	public JSFrameViewer getFrameViewer() {
		JSComponent parent = null;
		return (秘topFrameViewer != null ? 秘topFrameViewer
				: 秘frameViewer != null ? 秘topFrameViewer = 秘frameViewer
						: (parent = getParent()) == null ? null : (秘topFrameViewer = parent.getFrameViewer()));
	}

	public String getHTMLName(String uid) {
		return (秘htmlName == null ? 秘htmlName = appContext.getThreadGroup().getName() + "_" + uid + "_" + 秘num : 秘htmlName);
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
		return (秘uiClassID == null ? 秘uiClassID = "ComponentUI" : 秘uiClassID);
	}

	/**
	 * for JSToolkit use only
	 * @param id
	 */
	public void setUIClassID(String id) {
		秘uiClassID = id;
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
	public boolean isDisplayable() { 
		return ui != null && 秘getUI().isDisplayable();
	}

	@Override
	protected void updatePeerVisibility(boolean isVisible) {
		// check for visibility set prior to creation of ui.
		if (getOrCreatePeer() == null)
			秘peerVis = (isVisible ? Boolean.TRUE : Boolean.FALSE);
		else
			updatePeerVisibilityOrig(isVisible);
	}

	/**
	 * A peer in SwingJS can only be created after the ui is created.
	 */
	@Override
	public ComponentPeer getOrCreatePeer() {
		return (ui == null ? null : peer == null ? (peer = getToolkit().createComponent(this)) : peer);
	}

	/**
	 * Run once for every component. Resets the UI property to a value from the
	 * current look and feel.
	 *
	 * @see JComponent#updateUI
	 */
	public void updateUI() {
		if (秘uiClassID == null)
			秘uiClassID = getUIClassID();
		if (ui == null)
			setUI(UIManager.getUI(this));
	}

	protected JSGraphics2D 秘getJSGraphic2D(Graphics g) {
		return (/** @j2sNative g.mark$ ? g : */ null);
	}

	public boolean 秘isAWT() {
		return (/** @j2sNative !!this.isAWT$ || */ false);
	}
	
	protected void 秘setIsAWT() {
        /**
         * @j2sNative
         * this.isAWT$ = true;
         */
    }

	@SuppressWarnings("unused")
	@Override
	public boolean isBackgroundSet() {
		return (background == null ? false 
				: /** @j2sNative this.isAWT$ || */false ? !(background instanceof UIResource) : true);
	}

	@SuppressWarnings("unused")
	@Override
	public boolean isForegroundSet() {
		return (foreground == null ? false 
				: /** @j2sNative this.isAWT$ || */false ? !(foreground instanceof UIResource) : true);
	}

	@SuppressWarnings("unused")
	@Override
	public boolean isFontSet() {
		return (font == null ? null : /** @j2sNative this.isAWT$ || */false ? !(font instanceof FontUIResource) : true);
	}

//	@Override
//	@SuppressWarnings("unused")
//	public Color getBackground() {
//		if (/** @j2sNative !this.isAWT$ || */ false) {
//			return getBackground_NoClient();
//		}
//		// AWT only - don't use Swing's UIResource
//		Color background = this.background;
//        if (background!= null && !(background instanceof UIResource)) {
//			return background;
//		}
//		background = (parent != null) ? parent.getBackground() : null;
//        return (background == null ? getBackground_NoClient() : background);
//	}
//
//	@Override
//	@SuppressWarnings("unused")
//	public Color getForeground() {
//		if (/** @j2sNative !this.isAWT$  || */ false) {
//			return getForeground_NoClient();
//		}
//		// AWT only - don't use Swing's UIResource
//		Color foreground = this.foreground;
//        if (foreground!= null && !(foreground instanceof UIResource)) {
//			return foreground;
//		}
//		foreground = (parent != null) ? parent.getForeground() : null;
//        return (foreground == null ? getForeground_NoClient() : foreground);
//	}
//
//	
//	@SuppressWarnings("unused")
//	@Override
//	public Font getFont() {
//		if (/** @j2sNative !this.isAWT$ || */ false) {
//			return getFont_NoClientCode();
//		}
//		// AWT only - don't use Swing's UIResource
//        Font font = this.font;
//        if (font != null && !(font instanceof FontUIResource)) {
//            return font;
//        }
//        font = (parent == null ? null : parent.getFont());
//        return (font == null ? getFont_NoClientCode() : font);
//    }
//
	
	protected void 秘updateUIZOrder() {
		
// developer could have created their own LayeredPane
//       if (uiClassID != "DesktopPaneUI")
//			return;
		
		// set the n by their position in the component list using the 
		// same z orders that are already there - probably something like 
		// 10000, 11000, 12000
    	int n = ((Container) this).getComponentCount();
    	if (n < 2)
    		return;
    	JSComponent[] components = (JSComponent[]) 秘getChildArray((Container) this);
    	int[] zorders = new int[n];
        for (int i = 0; i < n; i++)
            zorders[i] = JSComponentUI.getInheritedZ((JComponent)components[i]);
        Arrays.sort(zorders);
        for (int i = 0; i < n; i++)
        	components[i].秘getUI().setZ(zorders[n - 1 - i]);
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
	public void 秘paintWithBackgroundCheck(Graphics g) {
		JSGraphics2D jcg = 秘getJSGraphic2D(g);
		秘checkBackgroundPainted(jcg, true);
		paint(g);
		秘checkBackgroundPainted(jcg, false);
	}

	public void 秘paintContainerBackgroundCheck(Graphics g) {
		JSGraphics2D jcg = 秘getJSGraphic2D(g);
		秘checkBackgroundPainted(jcg, true);
		((Container) this).paintContainer(g);
		秘checkBackgroundPainted(jcg, false);
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
	
	protected void 秘jsInputMapSet() {
		if (ui != null)
			((JSComponentUI)ui).enableJSKeys(true);		
	}

	
	
 	/**
 	 * Invoker must be focusable and could cross from popupmenu to associated component
 	 * SwingJS from KeyboardManager. Brought here because it is smarter to do this
 	 * before going through all the keys first. And I want to debug this only
 	 * when it's necessary! BH
 	 * 
 	 * @param c
 	 * @param focusable TODO
 	 * @return
 	 */
 	public static Container 秘getTopInvokableAncestor(Component c, boolean andFocusable) {
 	    for(Component p = c; p != null; p = 秘nextHigher(p)) { 
 	        if (p.isWindowOrJSApplet() && (!andFocusable || ((Window)p).isFocusableWindow())) {
 	            return (Container) p;
 	        }
 	    }
 	    return null;
 	 }
 	
	/**
	 * SwingJS -- this was in KeyboardManager, way too late in the process. It was
	 * just parent(), but in SwingJS the popup windows do not have parents, only
	 * invokers. Perhaps that is a mistake. But it has to do with the fact that we
	 * do not have to repaint anything relating to the popup -- of course, the
	 * browser does that for us!
	 * 
	 * @param c
	 * @return
	 */
	public static Container 秘nextHigher(Component c) {
		Container p = c.getParent();
		if (p == null && c instanceof JPopupMenu)
			p = (Container) ((JPopupMenu) c).getInvoker();
		return p;
	}

    final public boolean 秘isFocusSetAndEnabled() {
        return 秘isFocusableSet && isFocusable();
    }


    /**
     * Check that a local graphic has the correct size of canvas, and if it does not, 
     * replace it. Maybe could just flat out change its size.
     * 
     * @return the JSGraphics coercion of the possibly new JSGraphics object as a "Graphics"
     */
	protected JSGraphics2D 秘checkG() {
		// I know, it's an insane amount of cast coercion
		boolean isNew = ((Object) 秘g) == Boolean.TRUE;
		if (isNew || 秘g.getWidth() != width || 秘g.getHeight() != height) {
			if (!isNew)
				DOMNode.dispose(秘g.getCanvas());
			秘g = (JSGraphics2D) (Object) ((BufferedImage) createImage(width, height)).秘getImageGraphic();
			DOMNode c = 秘g.getCanvas();
			DOMNode d = 秘getUI().getDOMNode();
			if (d != c)
				d.prepend(c);
		}
		return this.秘g;
	}

	/**
	 * This method is added to ensure that if a jpanel or other object's
	 * background is painted to, that it becomes transparent -- since the actual
	 * painting is not to this canvas but instead to the JRootPane canvas.
	 *
	 * @param jsg
	 */
	public void 秘checkBackgroundPainted(JSGraphics2D jsg, boolean init) {
		if (jsg == null || init) {
//			秘isBackgroundPainted = false;
			秘gtemp = jsg;
			((JSComponentUI) ui).paintBackground(jsg);
			return;
		}
		秘gtemp = null;
//		秘isBackgroundPainted = 秘alwaysPaint || jsg.isBackgroundPainted();
//		if (秘isBackgroundPainted) {
//			((JSComponentUI) ui).setPainted(jsg);
//			// It's all one canvas, and it is behind the root pane (bad design?)
//			// so if it is painted, we should make the root pane transparent
//			((JSComponentUI) ((JComponent) this).getRootPane().getUI()).setPainted(jsg);
//		}
	}

    public int 秘setPaintsSelf(int flag) {
    	flag = (秘iPaintMyself == PAINTS_SELF_ALWAYS ? PAINTS_SELF_ALWAYS : (秘iPaintMyself = flag));
    	JRootPane r;
    	return (flag == PAINTS_SELF_NO 
    			|| (r = ((JComponent) this).getRootPane()) == null
    			|| r.秘paintsSelf() ? flag : r.秘setPaintsSelf(PAINTS_SELF_YES)
    					);		
    }
    
    /**
     * the lowest subclass that does not actually paint anything other than a background
     */
    public Class<?> 秘paintClass,  秘updateClass;
    
	/**
	 * Used by:
	 * 
	 * JComponent to checked to see if a component in SwingJS can paint immediately
	 * because it is opaque or DOES NOT paint itself;
	 * 
	 * JScrollPane to check if it needs to fire a repaint()
	 * on the scrolled component; and 
	 * 
	 * JSComponentUI to check if it can use a CSS background
	 * 
	 * @return
	 */
	public boolean 秘paintsSelf() {
		
		if (秘iPaintMyself == PAINTS_SELF_UNKNOWN) {
			// don't allow if not opaque and has components
			// don't allow if JComponent.paint(Graphics) has been overridden
			// don't allow if AbstractBorder.paintBorder(...) has been overridden
			// unchecked here is if a class calls getGraphics outside of this context
			秘iPaintMyself = 秘setPaintsSelf(
					(秘iPaintMyselfEntirely = (
							JSUtil.isOverridden(this, "paint$java_awt_Graphics", 秘paintClass)
							|| JSUtil.isOverridden(this, "paintComponent$java_awt_Graphics", /** @j2sNative javax.swing.JComponent || */null)
							|| JSUtil.isOverridden(this, "update$java_awt_Graphics", 秘updateClass)
							|| JSUtil.isOverridden(this, "paintContainer$java_awt_Graphics", /** @j2sNative java.awt.Container || */null)
							))
					|| 秘paintsBorder() && JSUtil.isOverridden(秘border, "paintBorder$java_awt_Component$java_awt_Graphics$I$I$I$I",
							秘border.秘paintClass) 
					? PAINTS_SELF_YES : PAINTS_SELF_NO);
		}
		// TODO -- still need to set RepaintManager so that
		// objects with the same paintable root can be grouped together.

		return (秘iPaintMyself != PAINTS_SELF_NO);
	}

	protected boolean 秘paintsBorder() {
		// default ButtonBorders are not painted by default; this happens to also include internal frames
		return (秘border != null
				&& !(秘border instanceof BorderUIResource.CompoundBorderUIResource)
				&& !(秘border instanceof EmptyBorder));
	}

	/**
	 * JScrollBar needs to know if we need to paint this component when it is scrolled
	 * 
	 */

	public boolean 秘selfOrChildIsPainted() {
		return 秘paintsSelf(); 
	}

	public void removeAll() {
		秘setPaintsSelf(PAINTS_SELF_UNKNOWN);
	    ((JComponent) this).paintImmediately(0,  0,  width,  height);
	}

	@Override
	protected boolean canPaint() {
		// meaning can UPDATE
		return (秘isRepaint && 秘repaintAsUpdate && 秘isAWT() || !(peer instanceof LightweightPeer));
	}

	public void 秘update() {
		// from AWT repaint() via a PaintEvent.UPDATE
		Graphics g = getGraphics();
		try {
			update(g);
		} finally {
			g.dispose();
		}
	}

	protected void 秘paint(Graphics g) {
		if (秘isRepaint && 秘isAWT() && 秘repaintAsUpdate) {
			update(g);
		} else {
			paint(g);
		}
	}


	/**
	 * AWT controls will direct repaint() to update(Graphics) unless called this way (from
	 * javax.swing, primarily)
	 */
	public void 秘repaint() {
		if (width <= 0 || height <= 0)
			return;
		if (秘isAWT()) {
			// this is an internal Swing repaint call - do not use update(Graphics)
			秘repaintAsUpdate = false;
			try {
				super.repaint();
			} finally {
				秘repaintAsUpdate = true;
			}
		} else {
			repaint();
		}
	}


//	private boolean childPaintsItself() {
//		Component[] a = JSComponent.秘getChildArray((Container) this);
//		for (int i = ((Container) this).getComponentCount(); --i >= 0;)
//			if (((JSComponent) a[i]).秘selfOrChildIsPainted())
//				return true;
//		return false;
//	}

	private boolean 秘isDesktop;

	public void 秘setIsDesktop() {
		秘isDesktop = true;
	}

	public boolean 秘isDesktop() {
		return 秘isDesktop;
	}

	protected void 秘frameAddNodify(JRootPane rootPane) {
		addNotify(); // BH added; applet will not do this automatically
		rootPane.addNotify(); // builds a peer for the root pane
	} 

	public JComponent 秘transferFrameTo(JComponent jc) {
		if (jc.秘frameViewer == 秘frameViewer)
			return jc;
		if (jc.getUIClassID() == "AppletUI") {
			System.out.println("JSComponent setContentPane to applet; using content.contentPane instead");
			// applet or frame or window of some sort
			// take just the content pane
			jc = (JComponent) jc.getRootPane().getContentPane();
			jc.秘isContentPane = false;
			jc.getRootPane().setContentPane(new JPanel());
		}
		jc.秘frameViewer = 秘frameViewer;
		jc.秘topFrameViewer = 秘topFrameViewer;
		return jc;
	}



	/**
	 * 
	 * SwingJS copied here from Dialog so that it is not necessary to load that AWT class.
	 * 
	 * Any top-level window can be marked not to be blocked by modal
	 * dialogs. This is called "modal exclusion". This enum specifies
	 * the possible modal exclusion types.
	 *
	 * @see Window#getModalExclusionType
	 * @see Window#setModalExclusionType
	 * @see Toolkit#isModalExclusionTypeSupported
	 *
	 * @since 1.6
	 */
	public static enum ModalExclusionType {
	    /**
	     * No modal exclusion.
	     */
	    NO_EXCLUDE,
	    /**
	     * <code>APPLICATION_EXCLUDE</code> indicates that a top-level window
	     * won't be blocked by any application-modal dialogs. Also, it isn't
	     * blocked by document-modal dialogs from outside of its child hierarchy.
	     */
	    APPLICATION_EXCLUDE,
	    /**
	     * <code>TOOLKIT_EXCLUDE</code> indicates that a top-level window
	     * won't be blocked by  application-modal or toolkit-modal dialogs. Also,
	     * it isn't blocked by document-modal dialogs from outside of its
	     * child hierarchy.
	     * The "toolkitModality" <code>AWTPermission</code> must be granted
	     * for this exclusion. If an exclusion property is being changed to
	     * <code>TOOLKIT_EXCLUDE</code> and this permission is not granted, a
	     * <code>SecurityEcxeption</code> will be thrown, and the exclusion
	     * property will be left unchanged.
	     */
	    TOOLKIT_EXCLUDE
	}



    public Insets getInsets() {
    	// Panel, ScrollPane, and Window only
    	return 秘getInsets();
    }

    public Insets 秘getInsets() {
    	// in SwingJS, we do not clone. Everything is a ContainerPeer.
    	// it is inconsistent with other classes that this would need cloning.
    	Insets i =  (ui == null ? null :  秘getUI().getInsets());
    	return (i == null ? Container.NULL_INSETS : i);
    }

	public void 秘repaintParentIfNeeded(int oldX, int oldY, int oldWidth, int oldHeight) {
		if (parent != null && peer instanceof LightweightPeer && isShowing()) {
			// Have the parent redraw the area this component occupied.
			// Have the parent redraw the area this component *now* occupies.
			if (秘getUI().allowPaintedBackground && 秘paintsSelf()) {
				parent.repaint(oldX, oldY, oldWidth, oldHeight);
				秘repaint();
			}
		}
	}

	public Object 秘getLastKeyListener() {
		AWTEventMulticaster k = (AWTEventMulticaster) keyListener;
		return (k == null ? null : /** @j2sNative k.b || k.a || */k);
	}

	public void 秘setProxy(Container parent) {
		if (parent != null) {
			long mask = 0;
			if ((mouseListener != null) || ((eventMask & AWTEvent.MOUSE_EVENT_MASK) != 0)) {
				mask |= AWTEvent.MOUSE_EVENT_MASK;
			}
			if ((mouseMotionListener != null) || ((eventMask & AWTEvent.MOUSE_MOTION_EVENT_MASK) != 0)) {
				mask |= AWTEvent.MOUSE_MOTION_EVENT_MASK;
			}
			if ((mouseWheelListener != null) || ((eventMask & AWTEvent.MOUSE_WHEEL_EVENT_MASK) != 0)) {
				mask |= AWTEvent.MOUSE_WHEEL_EVENT_MASK;
			}
			if (focusListener != null || (eventMask & AWTEvent.FOCUS_EVENT_MASK) != 0) {
				mask |= AWTEvent.FOCUS_EVENT_MASK;
			}
			if (keyListener != null || (eventMask & AWTEvent.KEY_EVENT_MASK) != 0) {
				mask |= AWTEvent.KEY_EVENT_MASK;
			}
			if (mask != 0) {
				parent.proxyEnableEvents(mask);
			}
		}
	}

	/**
	 * From j2sApplet vis JSMouse
	 * @param c 
	 * 
	 * @param id
	 * @param modifiers
	 * @param jqevent
	 * @param time
	 * @return
	 */
	public static boolean 秘dispatchKeyEvent(JComponent c, int id, Object jqevent, long time) {
		if (id == 0)
			id = JSMouse.fixEventType(jqevent, 0);
		JSComponentUI ui = (c == null ? null : c.秘getUI());
		if (id == KeyEvent.KEY_TYPED) {
			// HTML5 keypress is no longer reliable
			if (ui != null && !ui.j2sDoPropagate)
				JSToolkit.consumeEvent(jqevent);
			return false;
		}
		if (c != null) {
			KeyEvent e = JSKeyEvent.newJSKeyEvent(c, jqevent, id, false);
			// create our own KEY_PRESSED event
			c.dispatchEvent(e);
			if (!ui.j2sDoPropagate)
				JSToolkit.consumeEvent(e);
			if (!e.isConsumed() && id == KeyEvent.KEY_PRESSED && e.getKeyChar() != KeyEvent.CHAR_UNDEFINED) {
				e = JSKeyEvent.newJSKeyEvent(c, jqevent, KeyEvent.KEY_TYPED, false);
				// yield to keyboard focus manager
				c.dispatchEvent(e);
	
				if (!ui.j2sDoPropagate)
					JSToolkit.consumeEvent(e);
			}
		}
		return true;
	}

}
