/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 2008, 2011, Oracle and/or its affiliates. All rights reserved.
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

import java.lang.reflect.InvocationTargetException;

import java.awt.AWTEvent;
import java.awt.Component;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.Window;
import java.awt.geom.Point2D;
import java.awt.image.BufferedImage;

/**
 * The AWTAccessor utility class.
 * The main purpose of this class is to enable accessing
 * private and package-private fields of classes from
 * different classes/packages. See sun.misc.SharedSecrets
 * for another example.
 */
public final class AWTAccessor {

//    private static final Unsafe unsafe = Unsafe.getUnsafe();

    /*
     * We don't need any objects of this class.
     * It's rather a collection of static methods
     * and interfaces.
     */
    private AWTAccessor() {
    }

    /**
     * An interface of an accessor for java.awt.Window class.
     */
    public interface WindowAccessor {
        /*
         * Get opacity level of the given window.
         */
        float getOpacity(Window window);
        /*
         * Set opacity level to the given window.
         */
        void setOpacity(Window window, float opacity);
        /*
         * Get a shape assigned to the given window.
         */
        Shape getShape(Window window);
        /*
         * Set a shape to the given window.
         */
        void setShape(Window window, Shape shape);
        /*
         * Identify whether the given window is opaque (true)
         *  or translucent (false).
         */
        boolean isOpaque(Window window);
        /*
         * Set the opaque preoperty to the given window.
         */
        void setOpaque(Window window, boolean isOpaque);
        /*
         * Update the image of a non-opaque (translucent) window.
         */
        void updateWindow(Window window, BufferedImage backBuffer);
        /**
         * Sets the synchronous status of focus requests on lightweight
         * components in the specified window to the specified value.
         */
        void setLWRequestStatus(Window changed, boolean status);

        /** Get the size of the security warning.
         */
        Dimension getSecurityWarningSize(Window w);

        /**
         * Set the size of the security warning.
         */
        void setSecurityWarningSize(Window w, int width, int height);

        /** Set the position of the security warning.
         */
        void setSecurityWarningPosition(Window w, Point2D point,
                float alignmentX, float alignmentY);

        /** Request to recalculate the new position of the security warning for
         * the given window size/location as reported by the native system.
         */
        Point2D calculateSecurityWarningPosition(Window window,
                double x, double y, double w, double h);
    }

    /*
     * An interface of accessor for the java.awt.Component class.
     */
    public interface ComponentAccessor {
        /**
         * Returns the appContext of the component.
         */
        AppContext getAppContext(Component comp);

        /**
         * Sets the appContext of the component.
         */
        void setAppContext(Component comp, AppContext appContext);

        /*
         * Sets whether the native background erase for a component
         * has been disabled via SunToolkit.disableBackgroundErase().
         */
        void setBackgroundEraseDisabled(Component comp, boolean disabled);
        /*
         * Indicates whether the native background erase for a
         * component has been disabled via
         * SunToolkit.disableBackgroundErase().
         */
        boolean getBackgroundEraseDisabled(Component comp);
        /*
         *
         * Gets the bounds of this component in the form of a
         * <code>Rectangle</code> object. The bounds specify this
         * component's width, height, and location relative to
         * its parent.
         */
        Rectangle getBounds(Component comp);
        /*
         * Sets the shape of a lw component to cut out from hw components.
         *
         * See 6797587, 6776743, 6768307, and 6768332 for details
         */
        void setMixingCutoutShape(Component comp, Shape shape);

        /*
         * Returns the acc this component was constructed with.
         */
//        AccessControlContext getAccessControlContext(Component comp);

        /**
         * Requests that this Component get the input focus, if this
         * Component's top-level ancestor is already the focused Window
         */
        boolean requestFocusInWindow(Component comp, CausedFocusEvent.Cause cause);

        /**
         * Requests that this Component get the input focus, providing the cause
         */
        void requestFocus(Component comp, CausedFocusEvent.Cause cause);

        /**
         * Returns whether the component is visible without invoking
         * any client code.
         */
        boolean isVisible_NoClientCode(Component comp);
    }

    /**
     * An interface of accessor for the KeyboardFocusManager class.
     */
    public interface KeyboardFocusManagerAccessor {
        /**
         * Indicates whether the native implementation should
         * proceed with a pending focus request for the heavyweight.
         */
        int shouldNativelyFocusHeavyweight(Component heavyweight,
                                           Component descendant,
                                           boolean temporary,
                                           boolean focusedWindowChangeAllowed,
                                           long time,
                                           CausedFocusEvent.Cause cause);

        void removeLastFocusRequest(Component heavyweight);
    }

    /*
     * An accessor for the AWTEvent class.
     */
    public interface AWTEventAccessor {
        /**
         * Marks the event as posted.
         */
        void setPosted(AWTEvent ev);

        /**
         * Sets the flag on this AWTEvent indicating that it was
         * generated by the system.
         */
        void setSystemGenerated(AWTEvent ev);

        /**
         * Indicates whether this AWTEvent was generated by the system.
         */
        boolean isSystemGenerated(AWTEvent ev);

        /*
         * Returns the acc this event was constructed with.
         */
//        AccessControlContext getAccessControlContext(AWTEvent ev);

        /**
         * Returns binary data associated with this event;
         */
        byte[] getBData(AWTEvent ev);

       /**
         * Associates binary data with this event;
         */
        void setBData(AWTEvent ev, byte[] bdata);
}

    /** An accessor for the EventQueue class
     */
    public interface EventQueueAccessor {
        /**
         * Returns whether an event is pending on any of the separate Queues.
         */
        boolean noEvents(EventQueue eventQueue);

        /**
         * Returns dispatch thread for the given EventQueue which has private access
         */
        Thread getDispatchThread(EventQueue eventQueue);

        /**
         * Returns next queue for the given EventQueue which has private access
         */
        EventQueue getNextQueue(EventQueue eventQueue);

        /**
         * Removes any pending events for the specified source object.
         */
        void removeSourceEvents(EventQueue eventQueue, Object source,
                                boolean removeAllEvents);
        /**
         * Static in EventQueue
         */
        void invokeAndWait(Object source, Runnable r)
            throws InterruptedException, InvocationTargetException;

        /**
         * Gets most recent event time in the EventQueue
         */
        long getMostRecentEventTime(EventQueue eventQueue);
    }
    /**
     * An accessor for the Cursor class
     */
    public interface CursorAccessor {
        /**
         * Returns pData of the Cursor class
         */
        long getPData(Cursor cursor);

        /**
         * Sets pData to the Cursor class
         */
        void setPData(Cursor cursor, long pData);

        /**
         * Return type of the Cursor class
         */
        int getType(Cursor cursor);
    }

    /**
     * An accessor for the ClientPropertyKey class
     */
    public interface ClientPropertyKeyAccessor {
        /**
         * Retrieves JComponent_TRANSFER_HANDLER enum object
         */
        Object getJComponent_TRANSFER_HANDLER();
    }

    /*
     * Accessor instances are initialized in the static initializers of
     * corresponding AWT classes by using setters defined below.
     */
    /* The java.awt.Component class accessor object.
     */
    private static ComponentAccessor componentAccessor;
//    private static KeyboardFocusManagerAccessor kfmAccessor;
    /*
     * The java.awt.Window class accessor object.
     */
    private static WindowAccessor windowAccessor;

    /*
     * The java.awt.AWTEvent class accessor object.
     */
    private static AWTEventAccessor awtEventAccessor;
//    private static MenuComponentAccessor menuComponentAccessor;
    private static EventQueueAccessor eventQueueAccessor;
//    private static PopupMenuAccessor popupMenuAccessor;
//    private static ScrollPaneAdjustableAccessor scrollPaneAdjustableAccessor;
//    private static CheckboxMenuItemAccessor checkboxMenuItemAccessor;
//    private static CursorAccessor cursorAccessor;
//    private static MenuBarAccessor menuBarAccessor;
//    private static MenuItemAccessor menuItemAccessor;
//    private static MenuAccessor menuAccessor;
//    private static ClientPropertyKeyAccessor clientPropertyKeyAccessor;
//    private static DefaultKeyboardFocusManagerAccessor defaultKeyboardFocusManagerAccessor;

    /**
     * Set an accessor object for the java.awt.Window class.
     */
    public static void setWindowAccessor(WindowAccessor wa) {
        windowAccessor = wa;
    }

    /**
     * Retrieve the accessor object for the java.awt.Window class.
     */
    public static WindowAccessor getWindowAccessor() {
//        if (windowAccessor == null) {
//            unsafe.ensureClassInitialized(Window.class);
//        }
//
        return windowAccessor;
    }

    /*
     * Set an accessor object for the java.awt.Component class.
     */
    public static void setComponentAccessor(ComponentAccessor ca) {
        componentAccessor = ca;
    }

    /*
     * Retrieve the accessor object for the java.awt.Component class.
     */
    public static ComponentAccessor getComponentAccessor() {
//        if (componentAccessor == null) {
//            unsafe.ensureClassInitialized(Component.class);
//        }
//
        return componentAccessor;
    }

    /*
     * Set an accessor object for the java.awt.AWTEvent class.
     */
    public static void setAWTEventAccessor(AWTEventAccessor aea) {
        awtEventAccessor = aea;
    }

    /*
     * Retrieve the accessor object for the java.awt.AWTEvent class.
     */
    public static AWTEventAccessor getAWTEventAccessor() {
//        if (awtEventAccessor == null) {
//            unsafe.ensureClassInitialized(AWTEvent.class);
//        }
        return awtEventAccessor;
    }

    /**
     * Set an accessor object for the java.awt.EventQueue class.
     */
    public static void setEventQueueAccessor(EventQueueAccessor eqa) {
        eventQueueAccessor = eqa;
    }

    /**
     * Retrieve the accessor object for the java.awt.EventQueue class.
     */
    public static EventQueueAccessor getEventQueueAccessor() {
//        if (eventQueueAccessor == null) {
//            unsafe.ensureClassInitialized(EventQueue.class);
//        }
        return eventQueueAccessor;
    }
//    /**
//     * Set an accessor object for the java.awt.Cursor class.
//     */
//    public static void setCursorAccessor(CursorAccessor ca) {
//        cursorAccessor = ca;
//    }
//
//    /**
//     * Retrieve the accessor object for the java.awt.Cursor class.
//     */
//    public static CursorAccessor getCursorAccessor() {
//        if (cursorAccessor == null) {
//            unsafe.ensureClassInitialized(CursorAccessor.class);
//        }
//        return cursorAccessor;
//    }
//
//    /**
//     * Set an accessor object for the javax.swing.ClientPropertyKey class.
//     */
//    public static void setClientPropertyKeyAccessor(ClientPropertyKeyAccessor cpka) {
//        clientPropertyKeyAccessor = cpka;
//    }
//
//    /**
//     * Retrieve the accessor object for the javax.swing.ClientPropertyKey class.
//     */
//    public static ClientPropertyKeyAccessor getClientPropertyKeyAccessor() {
//        if (clientPropertyKeyAccessor == null) {
//            unsafe.ensureClassInitialized(ClientPropertyKeyAccessor.class);
//        }
//        return clientPropertyKeyAccessor;
//    }

}
