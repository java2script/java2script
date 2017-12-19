// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: cmalley $
 * Revision : $Revision: 72210 $
 * Date modified : $Date: 2013-02-19 18:19:40 -0600 (Tue, 19 Feb 2013) $
 */
package edu.colorado.phet.common.phetcommon.util;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
//import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.EventListener;
import java.util.List;

/**
 * A proxy that broadcasts method calls to registered objects that implement
 * a specified interface. The primary use of this class is for doing event firing/handling.
 * It eliminates the need for clients to manage lists of listeners, and iterate those lists
 * and cast their elements when clients want to send events to those listeners.
 * <p/>
 * EventChannel is concurrency-safe in that clients can add and remove listeners from the channel
 * while the channel is processing an event.
 * <p/>
 * Some oddities in this class' use are due to the way the Proxy and InvocationHandler
 * classes work.
 * <p/>
 * Example of use:
 * <p/>
 * <code>
 * public class TestEventChannel {
 * <p/>
 * public static void main( String[] args ) {
 * // Create a channel and get a reference to its proxy
 * EventChannel eventChannel = new EventChannel( ITestListener.class );
 * ITestListener testListenerProxy = (ITestListener)eventChannel.getListenerProxy();
 * <p/>
 * // Create a listener, and attach it to the channel
 * TestListener testListener = new TestListener();
 * eventChannel.addListener( testListener );
 * <p/>
 * // Invoke a method on all listeners attached to the channel
 * testListenerProxy.aHappened( "FOO" );
 * }
 * <p/>
 * public interface ITestListener extends EventListener {
 * void aHappened( String s );
 * }
 * <p/>
 * public static class TestListener implements ITestListener {
 * public void aHappened( String s ) {
 * System.out.println( "TestProxy$TestListener.aHappened: " + s );
 * }
 * }
 * }
 * </code>
 *
 * @author Ron LeMaster
 * @version $Revision: 72210 $
 * @deprecated DO NOT USE! This implementation causes security issues when run under Java Web Start, see #3511.
 */
@Deprecated
public class EventChannel implements InvocationHandler {

    private List<EventListener> targets = new ArrayList<EventListener>();
    private Class<?> targetInterface;
    private Object proxy;
    private List<EventListener> listenersToAdd = new ArrayList<EventListener>();
    private List<EventListener> listenersToRemove = new ArrayList<EventListener>();
    private boolean invokingTargets;

    /**
     * Creates a proxy for a list of objects that implement a specified interface.
     * WARNING! If theClass is not already loaded, this will fail when running under Java Web Start, see #3511.
     *
     * @param theClass The interface for which the channel provides a proxy.
     */
    public EventChannel( Class<?> theClass ) {
//        if ( !EventListener.class.isAssignableFrom( theClass ) ) {
//            throw new InvalidParameterException( "Attempt to create proxy for a class that is not an EventListener" );
//        }
        targetInterface = theClass;
        proxy = Proxy.newProxyInstance( theClass.getClassLoader(),
                                        new Class<?>[] { theClass }, this );
    }

    /**
     * Registers a listener for all events for which it has handlers. A handler is recognized
     * by a name ending in "Occurred" and having a single parameter of type assignable to
     * EventObject.
     *
     * @param listener
     */
    public synchronized void addListener( EventListener listener ) {
        if ( targetInterface.isInstance( listener ) ) {
            if ( invokingTargets ) {
                listenersToAdd.add( listener );
            }
            else {
                targets.add( listener );
            }
        }
//        else {
//            throw new InvalidParameterException( "Parameter is not EventListener" );
//        }
    }

    /**
     * Removes a listener from the registry
     *
     * @param listener
     */
    public synchronized void removeListener( EventListener listener ) {
        if ( targetInterface.isInstance( listener ) ) {
            if ( invokingTargets ) {
                listenersToRemove.add( listener );
            }
            else {
                targets.remove( listener );
            }
        }
//        else {
//            throw new InvalidParameterException( "Parameter is not EventListener" );
//        }
    }

    /**
     * Removes all listeners from the registry
     */
    public void removeAllListeners() {
        targets.clear();
    }

    /**
     * Returns the number of registered listeners.
     *
     * @return the number of registered listeners.
     */
    public int getNumListeners() {
        return targets.size();
    }

    /**
     * Determines whether this EventChannel contains the specified listener.
     *
     * @param eventListener
     * @return true if this EventChannel contains the specified listener.
     */
    public boolean containsListener( EventListener eventListener ) {
        return targets.contains( eventListener );
    }

    /**
     * Returns the interface for which this object acts as a proxy.
     *
     * @return the interface Class
     */
    public Class<?> getInterface() {
        return targetInterface;
    }

    /**
     * Returns a reference to the proxy
     *
     * @return the proxy
     */
    public Object getListenerProxy() {
        return proxy;
    }

    //----------------------------------------------------------------------------
    // Invocation Handler implementation
    //----------------------------------------------------------------------------

    /**
     * Invokes a specified method on all the instances in the channel that implement it
     *
     * @param proxy
     * @param method  just a string method name in JavaScript
     * @param args
     * @return the result of the invocation.
     * @throws Throwable
     */
    @Override
		public Object invoke( Object proxy, Method method, Object[] args ) throws Throwable {
        Object target = null;
        try {
            invokingTargets = true;
            for ( int i = 0; i < targets.size(); i++ ) {
                target = targets.get( i );
                invokeMethod( method, target, args );
            }
            invokingTargets = false;

            // If anyone tried to add or remove a listener while we were invoking
            // targets, add/remove them now
            if ( !listenersToAdd.isEmpty() ) {
                targets.addAll( listenersToAdd );
                listenersToAdd.clear();
            }
            if ( !listenersToRemove.isEmpty() ) {
                targets.removeAll( listenersToRemove );
                listenersToRemove.clear();
            }
        }
        catch ( Throwable t ) {
        	System.out.println("Event Channel target method " + target + "." + method + " does not exist\n\n" +  t);
        }
        return null;
    }

	protected void invokeMethod(Method method, Object target, Object[] args)
			throws InvocationTargetException, IllegalAccessException {
			method.invoke(target, args);
	}
}
