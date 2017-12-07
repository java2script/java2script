// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author:samreid $
 * Revision : $Revision:14677 $
 * Date modified : $Date:2007-04-17 03:40:29 -0500 (Tue, 17 Apr 2007) $
 */
package edu.colorado.phet.common.phetcommon.util.persistence;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.Serializable;

/**
 * PersistenceUtil
 *
 * @author Ron LeMaster
 * @version $Revision:14677 $
 */
public class PersistenceUtil {

    /**
     * Perform a deep copy of a Serializable object graph using serialization.
     *
     * @param object the object to be copied.
     * @return a deep copy of the specified object.
     * @throws edu.colorado.phet.common.phetcommon.util.persistence.PersistenceUtil.CopyFailedException
     *
     */
    public static Serializable copy( Serializable object ) throws CopyFailedException {
        return copy( object, null );
    }

    public static interface CopyObjectReplacementStrategy {
        public Object replaceObject( Object obj );
    }

    @SuppressWarnings("resource")
		public static Serializable copy( Serializable object, CopyObjectReplacementStrategy copyObjectReplacementStrategy ) throws CopyFailedException {
        ByteArrayOutputStream byteOut = new ByteArrayOutputStream();

        try {
            ObjectOutputStream objectOut = copyObjectReplacementStrategy == null ? new ObjectOutputStream( byteOut ) : new MyObjectOutputStream( byteOut, copyObjectReplacementStrategy );

            objectOut.writeObject( object );
            objectOut.flush();

            ByteArrayInputStream byteIn = new ByteArrayInputStream( byteOut.toByteArray() );
            return (Serializable) new ObjectInputStream( byteIn ).readObject();
        }
        catch ( IOException e ) {
            throw new CopyFailedException( e );
        }
        catch ( ClassNotFoundException e ) {
            throw new CopyFailedException( e );
        }
    }

    private static class MyObjectOutputStream extends ObjectOutputStream {
        private CopyObjectReplacementStrategy copyObjectReplacementStrategy;

        public MyObjectOutputStream( OutputStream out, CopyObjectReplacementStrategy copyObjectReplacementStrategy ) throws IOException {
            super( out );
            this.copyObjectReplacementStrategy = copyObjectReplacementStrategy;
//            enableReplaceObject( true );//fails under web start due to security restrictions
        }

        @Override
				protected Object replaceObject( Object obj ) throws IOException {
            return copyObjectReplacementStrategy.replaceObject( obj );
        }
    }

    public static class CopyFailedException extends Exception {
        public CopyFailedException( Throwable cause ) {
            super( cause );
        }
    }
}
