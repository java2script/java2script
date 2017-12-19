// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import java.awt.geom.Point2D;
import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;

/**
 * This class fills the need for a serializable Point2D object which can be used for serialization-based copying
 * of model objects.
 * Sun recognized the need for Point2D to implement Serializable, but didn't make this change until 6.0
 * <p/>
 * We are using the workaround described at this bug report:
 * http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4263142
 */
public class SerializablePoint2D extends Point2D.Double implements Externalizable {
    public SerializablePoint2D() {
        super();
    }

    public SerializablePoint2D( double x, double y ) {
        super( x, y );
    }

    public SerializablePoint2D( Point2D pt ) {
        this( pt.getX(), pt.getY() );
    }

// BH unnecesary    public static DecimalFormat format;

    //Provide a useful debugging string for our units
    @Override
		public String toString() {
        return "(" + getX() + ", " + getY() + ")";
    }

    @Override
		public void readExternal( ObjectInput in ) throws IOException, ClassNotFoundException {
        x = in.readDouble();
        y = in.readDouble();
    }

    @Override
		public void writeExternal( ObjectOutput out ) throws IOException {
        out.writeDouble( x );
        out.writeDouble( y );
    }
}
