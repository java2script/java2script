// Copyright 2002-2011, University of Colorado

/**
 * Class: Constraint
 * Package: edu.colorado.phet.physics
 * User: Ron LeMaster
 * Date: Feb 10, 2003
 * Time: 7:51:48 PM
 */
package edu.colorado.phet.idealgas.model;

import java.util.HashMap;

/**
 * This abstract class represents constraints on entities in a PhysicalSystem. The
 * semantics of the class are open-ended, subclasses can apply arbitrary rules to
 * the entities in a system.
 * <p/>
 * A Constraint has a single attribute, which is an instance of a concrete subclass
 * of Constraint.Spec, an inner class of Constraint. Constraint.Spec is basically a
 * HashMap that matches the names of arguments to the constraint with their values.
 * The argument names are specific to the type of constraint being implemented. See the
 * references below for examples.
 */
public abstract class Constraint {

    private Spec spec;

    public abstract Object apply( Spec spec );

    public Object apply() {
        apply( getSpec() );
        return null;
    }

    protected void setSpec( Spec spec ) {
        this.spec = spec;
    }

    protected Spec getSpec() {
        return spec;
    }

    @SuppressWarnings("serial")
		public class Spec extends HashMap<Object, Object> {

        private Constraint constraint;

        // This flag is a hack so that we can simulate a constraint
        // removing itself from a body without removing itself from
        // the body's constraint list, which would cause a concurrent
        // collection modification exception
        private boolean isActive;

        public Spec() {
            isActive = true;
        }

        //        public Spec( Constraint constraint ){
        //            setConstraint( constraint );
        //            isActive = true;
        //        }
        //
        public Constraint getConstraint() {
            return constraint;
        }

//        private void setConstraint( Constraint constraint ) {
//            this.constraint = constraint;
//        }

        public boolean isActive() {
            return isActive;
        }

        public void setActive( boolean active ) {
            isActive = active;
        }
    }
}
