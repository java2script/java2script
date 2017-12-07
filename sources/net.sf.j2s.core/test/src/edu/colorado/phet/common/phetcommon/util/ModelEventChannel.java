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

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import javax.swing.SwingUtilities;

/**
 * MvcEventChannel
 * <p/>
 * A specialization of EventChannel that executes calls to specified event listeners in the Swing
 * thread. These listeners are indicated by their type: SwingThreadModelListener.
 *
 * @author Ron LeMaster
 * @version $Revision: 72210 $
 * @deprecated DO NOT USE! This inherits from EventChannel, which has security issues when run under Java Web Start, see #3511.
 */
@Deprecated
public class ModelEventChannel extends EventChannel {

    public ModelEventChannel( Class<?> interf ) {
        super( interf );
    }

    @Override
		protected void invokeMethod( final Method method,
                                 final Object target,
                                 final Object[] args ) throws InvocationTargetException, IllegalAccessException {

        // If the target listener is part of the view, then invoke the callback method in the
        // Swing dispatch thread. Otherwise, call the parent class behavior
        if ( target instanceof SwingThreadModelListener ) {
            SwingUtilities.invokeLater( new Runnable() {
                @Override
								public void run() {
                    try {
                        ModelEventChannel.super.invokeMethod( method, target, args );
                    }
                    catch ( InvocationTargetException e ) {
                        e.printStackTrace();
                    }
                    catch ( IllegalAccessException e ) {
                        e.printStackTrace();
                    }
                }
            } );
        }
        else {
            super.invokeMethod( method, target, args );
        }
    }
}
