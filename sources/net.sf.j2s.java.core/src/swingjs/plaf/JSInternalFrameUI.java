package swingjs.plaf;

import java.awt.Color;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.IllegalComponentStateException;
import java.awt.event.ComponentEvent;
import java.awt.event.WindowEvent;
import java.awt.event.WindowFocusListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.DefaultDesktopManager;
import javax.swing.DesktopManager;
import javax.swing.Icon;
import javax.swing.InputMap;
import javax.swing.JComponent;
import javax.swing.JInternalFrame;
import javax.swing.LookAndFeel;
import javax.swing.SwingConstants;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;
import javax.swing.event.InternalFrameEvent;
import javax.swing.event.InternalFrameListener;
import javax.swing.plaf.UIResource;

import sun.swing.DefaultLookup;

public class JSInternalFrameUI extends JSFrameUI {

	public JSInternalFrameUI() {
		super();
		isInternalFrame = true;
	}

	
	@Override
	protected void frameCloserAction() {
		JInternalFrame jif = (JInternalFrame) iframe;
         if(jif.isClosable())
            jif.doDefaultCloseAction();
	}
	
	@Override
	public int[] getMoveCoords(int x, int y) {
//		JInternalFrame jif = (JInternalFrame) frame;    	
//        if (jif.getDesktopPane() == null) {
//        	// in another object 
//        } else if (jif.getDesktopPane().getDesktopManager() == null) {
//        	int pw = jif.getWidth();
//        	int ph = jif.getHeight();
//        	if (pw > 0 && ph > 0) {
//        		x = Math.min(Math.max(0, x), pw - 20);
//        		y = Math.min(Math.max(0, y), ph - 20);
//        	}
//        }
	
	return new int[] {x, y};
}

	private JInternalFrame iframe;
	private Handler handler;
	private Handler internalFrameListener;
	private PropertyChangeListener propertyChangeListener;
	private static DesktopManager sharedDesktopManager;
	
    @Override
	public void installUI(JComponent c)   {
    	super.installUI(c);

        iframe = (JInternalFrame)c;

        installDefaults();
        installListeners();
 //       installComponents();
        installKeyboardActions();

        LookAndFeel.installProperty(iframe, "opaque", Boolean.TRUE);
    }

    @Override
	public void uninstallUI(JComponent c) {
        if(c != iframe)
            throw new IllegalComponentStateException(
                this + " was asked to deinstall() "
                + c + " when it only knows about "
                + iframe + ".");

        uninstallKeyboardActions();
 //       uninstallComponents();
        uninstallListeners();
        uninstallDefaults();
  //      updateFrameCursor();
        handler = null;
        iframe = null;
        super.uninstallUI(c);
    }

    protected void installDefaults(){
        Icon frameIcon = iframe.getFrameIcon();
        if (frameIcon == null || frameIcon instanceof UIResource) {
            iframe.setFrameIcon(UIManager.getIcon("InternalFrame.icon"));
        }

        // Enable the content pane to inherit background color from its
        // parent by setting its background color to null.
        Container contentPane = iframe.getContentPane();
        if (contentPane != null) {
          Color bg = contentPane.getBackground();
          if (bg instanceof UIResource)
            contentPane.setBackground(null);
        }
//        frame.setLayout(internalFrameLayout = createLayoutManager());
        iframe.setBackground(UIManager.getLookAndFeelDefaults().getColor("control"));

        LookAndFeel.installBorder(iframe, "InternalFrame.border");

    }

    protected void createInternalFrameListener(){
        internalFrameListener = getHandler();
    }

  protected void installKeyboardActions(){
        createInternalFrameListener();
        if (internalFrameListener != null) {
            iframe.addInternalFrameListener(internalFrameListener);
        }

        LazyActionMap.installLazyActionMap(iframe, JSInternalFrameUI.class,
            "InternalFrame.actionMap");
    }

    static void loadActionMap(LazyActionMap map) {
//        map.put(new UIAction("showSystemMenu") {
//            public void actionPerformed(ActionEvent evt) {
//                JInternalFrame iFrame = (JInternalFrame)evt.getSource();
//                if (iFrame.getUI() instanceof JSInternalFrameUI) {
//                    JComponent comp = ((JSInternalFrameUI)
//                        iFrame.getUI()).getNorthPane();
//                    if (comp instanceof JSInternalFrameTitlePane) {
//                        ((JSInternalFrameTitlePane)comp).
//                            showSystemMenu();
//                    }
//                }
//            }
//
//            public boolean isEnabled(Object sender){
//                if (sender instanceof JInternalFrame) {
//                    JInternalFrame iFrame = (JInternalFrame)sender;
//                    if (iFrame.getUI() instanceof JSInternalFrameUI) {
//                        return ((JSInternalFrameUI)iFrame.getUI()).
//                            isKeyBindingActive();
//                    }
//                }
//                return false;
//            }
//        });
//
        // Set the ActionMap's parent to the Auditory Feedback Action Map
//        BasicLookAndFeel.installAudioActionMap(map);
    }

    protected PropertyChangeListener createPropertyChangeListener(){
        return getHandler();
    }

    /**
     * @since 1.3
     */
    protected void installListeners() {
//        borderListener = createBorderListener(frame);
        propertyChangeListener = createPropertyChangeListener();
        iframe.addPropertyChangeListener(propertyChangeListener);
//        installMouseHandlers(frame);
//        glassPaneDispatcher = createGlassPaneDispatcher();
//        if (glassPaneDispatcher != null) {
//            frame.getGlassPane().addMouseListener(glassPaneDispatcher);
//            frame.getGlassPane().addMouseMotionListener(glassPaneDispatcher);
//        }
//        componentListener =  createComponentListener();
//        if (frame.getParent() != null) {
//          parentBounds = frame.getParent().getBounds();
//        }
//        if ((frame.getParent() != null) && !componentListenerAdded) {
//            frame.getParent().addComponentListener(componentListener);
//            componentListenerAdded = true;
//        }
    }

    // Provide a FocusListener to listen for a WINDOW_LOST_FOCUS event,
    // so that a resize can be cancelled if the focus is lost while resizing
    // when an Alt-Tab, modal dialog popup, iconify, dispose, or remove
    // of the internal frame occurs.
    private WindowFocusListener getWindowFocusListener(){
        return getHandler();
    }

//    // Cancel a resize in progress by calling finishMouseReleased().
//    private void cancelResize() {
//        if (resizing) {
//            if (borderListener instanceof BorderListener) {
//                ((BorderListener)borderListener).finishMouseReleased();
//            }
//        }
//    }

    private Handler getHandler() {
        if (handler == null) {
            handler = new Handler();
        }
        return handler;
    }

    InputMap getInputMap(int condition) {
        if (condition == JComponent.WHEN_IN_FOCUSED_WINDOW) {
            return createInputMap(condition);
        }
        return null;
    }

    InputMap createInputMap(int condition) {
        if (condition == JComponent.WHEN_IN_FOCUSED_WINDOW) {
            Object[] bindings = (Object[])DefaultLookup.get(
                    iframe, this, "InternalFrame.windowBindings");

            if (bindings != null) {
                return LookAndFeel.makeComponentInputMap(iframe, bindings);
            }
        }
        return null;
    }

    protected void uninstallDefaults() {
        Icon frameIcon = iframe.getFrameIcon();
        if (frameIcon instanceof UIResource) {
            iframe.setFrameIcon(null);
        }
//        internalFrameLayout = null;
        iframe.setLayout(null);
        LookAndFeel.uninstallBorder(iframe);
    }

    
    protected void uninstallListeners() {
//        if ((frame.getParent() != null) && componentListenerAdded) {
//            frame.getParent().removeComponentListener(componentListener);
//            componentListenerAdded = false;
//        }
//        componentListener = null;
//      if (glassPaneDispatcher != null) {
//          frame.getGlassPane().removeMouseListener(glassPaneDispatcher);
//          frame.getGlassPane().removeMouseMotionListener(glassPaneDispatcher);
//          glassPaneDispatcher = null;
//      }
//      deinstallMouseHandlers(frame);
      iframe.removePropertyChangeListener(propertyChangeListener);
      propertyChangeListener = null;
//      borderListener = null;
    }

    protected void uninstallKeyboardActions(){
        if (internalFrameListener != null) {
            iframe.removeInternalFrameListener(internalFrameListener);
        }
        internalFrameListener = null;

        SwingUtilities.replaceUIInputMap(iframe, JComponent.
                                         WHEN_IN_FOCUSED_WINDOW, null);
        SwingUtilities.replaceUIActionMap(iframe, null);

    }


    public class InternalFramePropertyChangeListener implements
    PropertyChangeListener {
    // NOTE: This class exists only for backward compatibility. All
    // its functionality has been moved into Handler. If you need to add
    // new functionality add it to the Handler, but make sure this
    // class calls into the Handler.
    /**
     * Detects changes in state from the JInternalFrame and handles
     * actions.
     */
    @Override
	public void propertyChange(PropertyChangeEvent evt) {
        getHandler().propertyChange(evt);
    }
}

  /// DesktopManager methods
    /** Returns the proper DesktopManager. Calls getDesktopPane() to
      * find the JDesktop component and returns the desktopManager from
      * it. If this fails, it will return a default DesktopManager that
      * should work in arbitrary parents.
      */
    protected DesktopManager getDesktopManager() {
        if(iframe.getDesktopPane() != null
           && iframe.getDesktopPane().getDesktopManager() != null)
            return iframe.getDesktopPane().getDesktopManager();
        if(sharedDesktopManager == null)
          sharedDesktopManager = createDesktopManager();
        return sharedDesktopManager;
    }

    protected DesktopManager createDesktopManager(){
      return new DefaultDesktopManager();
    }

    /**
     * This method is called when the user wants to close the frame.
     * The <code>playCloseSound</code> Action is fired.
     * This action is delegated to the desktopManager.
     */
    protected void closeFrame(JInternalFrame f) {
        // Internal Frame Auditory Cue Activation
        //BasicLookAndFeel.playSound(frame,"InternalFrame.closeSound");
        // delegate to desktop manager
        getDesktopManager().closeFrame(f);
    }


    /** This method is called when the frame becomes selected.
     * This action is delegated to the desktopManager.
     */
   protected void activateFrame(JInternalFrame f) {
       getDesktopManager().activateFrame(f);
   }
   /** This method is called when the frame is no longer selected.
     * This action is delegated to the desktopManager.
     */
   protected void deactivateFrame(JInternalFrame f) {
       getDesktopManager().deactivateFrame(f);
   }


	@Override
	protected void selected() {
		activateFrame((JInternalFrame) jc);
	}


    // PropertyChangeListener
    @Override
	public void propertyChange(PropertyChangeEvent evt) {
    	super.propertyChange(evt);
        String prop = evt.getPropertyName();
        JInternalFrame f = (JInternalFrame)evt.getSource();
        Object newValue = evt.getNewValue();
        Object oldValue = evt.getOldValue();

        if (JInternalFrame.IS_CLOSED_PROPERTY == prop) {
            if (newValue == Boolean.TRUE) {
//                // Cancel a resize in progress if the internal frame
//                // gets a setClosed(true) or dispose().
//                cancelResize();
//                if ((frame.getParent() != null) && componentListenerAdded) {
//                    frame.getParent().removeComponentListener(componentListener);
//                }
//                closeFrame(f);
            }
        } else if (JInternalFrame.IS_MAXIMUM_PROPERTY == prop) {
//            if(newValue == Boolean.TRUE) {
//                maximizeFrame(f);
//            } else {
//                minimizeFrame(f);
//            }
        } else if(JInternalFrame.IS_ICON_PROPERTY == prop) {
//            if (newValue == Boolean.TRUE) {
//                iconifyFrame(f);
//            } else {
//                deiconifyFrame(f);
//            }
        } else if (JInternalFrame.IS_SELECTED_PROPERTY == prop) {
            if (newValue == Boolean.TRUE && oldValue == Boolean.FALSE) {
                activateFrame(f);
            } else if (newValue == Boolean.FALSE &&
                       oldValue == Boolean.TRUE) {
                deactivateFrame(f);
            }
        } else if (prop == "ancestor") {
//            if (newValue == null) {
//                // Cancel a resize in progress, if the internal frame
//                // gets a remove(), removeNotify() or setIcon(true).
//                cancelResize();
//            }
//            if (frame.getParent() != null) {
//                parentBounds = f.getParent().getBounds();
//            } else {
//                parentBounds = null;
//            }
//            if ((frame.getParent() != null) && !componentListenerAdded) {
//                f.getParent().addComponentListener(componentListener);
//                componentListenerAdded = true;
//            }
        } else if (JInternalFrame.TITLE_PROPERTY == prop ||
                prop == "closable" || prop == "iconable" ||
                prop == "maximizable") {
//            Dimension dim = frame.getMinimumSize();
//            Dimension frame_dim = frame.getSize();
//            if (dim.width > frame_dim.width) {
//                frame.setSize(dim.width, frame_dim.height);
//            }
        }
    }

    protected class BasicInternalFrameListener implements InternalFrameListener
    {
      // NOTE: This class exists only for backward compatibility. All
      // its functionality has been moved into Handler. If you need to add
      // new functionality add it to the Handler, but make sure this
      // class calls into the Handler.
      @Override
	public void internalFrameClosing(InternalFrameEvent e) {
          getHandler().internalFrameClosing(e);
      }

      @Override
	public void internalFrameClosed(InternalFrameEvent e) {
          getHandler().internalFrameClosed(e);
      }

      @Override
	public void internalFrameOpened(InternalFrameEvent e) {
          getHandler().internalFrameOpened(e);
      }

      @Override
	public void internalFrameIconified(InternalFrameEvent e) {
          getHandler().internalFrameIconified(e);
      }

      @Override
	public void internalFrameDeiconified(InternalFrameEvent e) {
          getHandler().internalFrameDeiconified(e);
      }

      @Override
	public void internalFrameActivated(InternalFrameEvent e) {
          getHandler().internalFrameActivated(e);
      }


      @Override
	public void internalFrameDeactivated(InternalFrameEvent e) {
          getHandler().internalFrameDeactivated(e);
      }
    }

    private class Handler implements /*ComponentListener, */InternalFrameListener,
            /*LayoutManager, MouseInputListener, */PropertyChangeListener,
            WindowFocusListener, SwingConstants {

        @Override
		public void windowGainedFocus(WindowEvent e) {
        }

        @Override
		public void windowLostFocus(WindowEvent e) {
            // Cancel a resize which may be in progress, when a
            // WINDOW_LOST_FOCUS event occurs, which may be
            // caused by an Alt-Tab or a modal dialog popup.
//            cancelResize();
        }

        // ComponentHandler methods
        /** Invoked when a JInternalFrame's parent's size changes. */
        public void componentResized(ComponentEvent e) {
//            // Get the JInternalFrame's parent container size
//            Rectangle parentNewBounds = ((Component) e.getSource()).getBounds();
//            JInternalFrame.JDesktopIcon icon = null;
//
//            if (frame != null) {
//                icon = frame.getDesktopIcon();
//                // Resize the internal frame if it is maximized and relocate
//                // the associated icon as well.
//                if (frame.isMaximum()) {
//                    frame.setBounds(0, 0, parentNewBounds.width,
//                        parentNewBounds.height);
//                }
//            }
//
//            // Relocate the icon base on the new parent bounds.
//            if (icon != null) {
//                Rectangle iconBounds = icon.getBounds();
//                int y = iconBounds.y +
//                        (parentNewBounds.height - parentBounds.height);
//                icon.setBounds(iconBounds.x, y,
//                        iconBounds.width, iconBounds.height);
//            }
//
//            // Update the new parent bounds for next resize.
////            if (!parentBounds.equals(parentNewBounds)) {
////                parentBounds = parentNewBounds;
////            }
//
//            // Validate the component tree for this container.
//            if (frame != null) frame.validate();
        }

        public void componentMoved(ComponentEvent e) {}
        public void componentShown(ComponentEvent e) {}
        public void componentHidden(ComponentEvent e) {}


        // InternalFrameListener
        @Override
		public void internalFrameClosed(InternalFrameEvent e) {
            iframe.removeInternalFrameListener(getHandler());
        }

        @Override
		public void internalFrameActivated(InternalFrameEvent e) {
//            if (!isKeyBindingRegistered()){
//                setKeyBindingRegistered(true);
//                setupMenuOpenKey();
//                setupMenuCloseKey();
//            }
//            if (isKeyBindingRegistered())
//                setKeyBindingActive(true);
        }

        @Override
		public void internalFrameDeactivated(InternalFrameEvent e) {
//            setKeyBindingActive(false);
        }

        @Override
		public void internalFrameClosing(InternalFrameEvent e) { }
        @Override
		public void internalFrameOpened(InternalFrameEvent e) { }
        @Override
		public void internalFrameIconified(InternalFrameEvent e) { }
        @Override
		public void internalFrameDeiconified(InternalFrameEvent e) { }



        // PropertyChangeListener
        @Override
		public void propertyChange(PropertyChangeEvent evt) {
            String prop = evt.getPropertyName();
            JInternalFrame f = (JInternalFrame)evt.getSource();
            Object newValue = evt.getNewValue();
            Object oldValue = evt.getOldValue();

            if (JInternalFrame.IS_CLOSED_PROPERTY == prop) {
                if (newValue == Boolean.TRUE) {
                    // Cancel a resize in progress if the internal frame
                    // gets a setClosed(true) or dispose().
//                    cancelResize();
//                    if ((frame.getParent() != null) && componentListenerAdded) {
//                        frame.getParent().removeComponentListener(componentListener);
//                    }
                    closeFrame(f);
                }
            } else if (JInternalFrame.IS_MAXIMUM_PROPERTY == prop) {
//                if(newValue == Boolean.TRUE) {
//                    maximizeFrame(f);
//                } else {
//                    minimizeFrame(f);
//                }
            } else if(JInternalFrame.IS_ICON_PROPERTY == prop) {
//                if (newValue == Boolean.TRUE) {
//                    iconifyFrame(f);
//                } else {
//                    deiconifyFrame(f);
//                }
            } else if (JInternalFrame.IS_SELECTED_PROPERTY == prop) {
                if (newValue == Boolean.TRUE && oldValue == Boolean.FALSE) {
                    activateFrame(f);
                } else if (newValue == Boolean.FALSE &&
                           oldValue == Boolean.TRUE) {
                    deactivateFrame(f);
                }
            } else if (prop == "ancestor") {
//                if (newValue == null) {
//                    // Cancel a resize in progress, if the internal frame
//                    // gets a remove(), removeNotify() or setIcon(true).
//                    cancelResize();
//                }
//                if (frame.getParent() != null) {
//                    parentBounds = f.getParent().getBounds();
//                } else {
//                    parentBounds = null;
//                }
//                if ((frame.getParent() != null) && !componentListenerAdded) {
//                    f.getParent().addComponentListener(componentListener);
//                    componentListenerAdded = true;
//                }
            } else if (JInternalFrame.TITLE_PROPERTY == prop ||
                    prop == "closable" || prop == "iconable" ||
                    prop == "maximizable") {
                Dimension dim = iframe.getMinimumSize();
                Dimension frame_dim = iframe.getSize();
                if (dim.width > frame_dim.width) {
                    iframe.setSize(dim.width, frame_dim.height);
                }
            }
        }
    }

}
