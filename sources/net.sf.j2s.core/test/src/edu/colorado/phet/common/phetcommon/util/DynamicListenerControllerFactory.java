// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;

/**
 * This factory can be used to produce controllers for listeners.
 * <p/>
 * Usage:
 * <p/>
 * DynamicListenerController c = DynamicListenerControllerFactory.newController(Listener.class);
 * <p/>
 * c.addListener(myListener);
 * <p/>
 * Listener listenerController = (Listener)c;
 * <p/>
 * listenerController.notifyXXX(arg1, arg2, arg2); <-- Notifies myListener
 */
public class DynamicListenerControllerFactory {
    public static DynamicListenerController newController( Class<?> theInterface ) {
        if ( !theInterface.isInterface() ) {
            throw new IllegalStateException( "The specified class must be an interface." );
        }

        DynamicListenerControllerImpl controller = new DynamicListenerControllerImpl( theInterface );

        return (DynamicListenerController) Proxy.newProxyInstance(
                theInterface.getClassLoader(),
                new Class<?>[] { theInterface, DynamicListenerController.class },
                controller
        );
    }

	private static class DynamicListenerControllerImpl implements
			DynamicListenerController, InvocationHandler {
		private Collection<Object> listeners = new HashSet<Object>();

		private final Class<?> listenerInterface;

		DynamicListenerControllerImpl(Class<?> listenerInterface) {
			this.listenerInterface = listenerInterface;
		}

		@Override
		public void addListener(Object listener) throws IllegalStateException {
			if (!listenerInterface.isAssignableFrom(listener.getClass())) {
				throw new IllegalStateException("The object " + listener
						+ " fails to implement " + listenerInterface + ".");
			}

			listeners.add(listener);
		}

		@Override
		public void removeListener(Object listener) {
			listeners.remove(listener);
		}

		@Override
		public Collection<Object> getAllListeners() {
			return Collections.unmodifiableCollection(listeners);
		}

		@Override
		public Object invoke(Object proxy, Method method, Object[] args)
				throws Throwable {
			if (method.getDeclaringClass() == Object.class) {
				return method.invoke(this, args);
			} else if (method.getDeclaringClass() == DynamicListenerController.class) {
				try {
					return method.invoke(this, args);
				} catch (InvocationTargetException e) {
					throw e.getTargetException();
				}
			} else if (method.getReturnType() == void.class) {
				Iterator<Object> iterator = getAllListeners().iterator();

				while (iterator.hasNext()) {
					Object listener = iterator.next();

					method.invoke(listener, args);
				}

				return null;
			} else {
				throw new IllegalStateException("Cannot implement method " + method);
			}
		}
	}
}
