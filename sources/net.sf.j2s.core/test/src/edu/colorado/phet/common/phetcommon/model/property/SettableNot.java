// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property;

import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;

/**
 * Provides the negation of a Property<Boolean>--this one is settable and propagates the (negation) of the set value back to its parent.
 *
 * @author Sam Reid
 */
public class SettableNot extends SettableProperty<Boolean> {

    //The parent value which this property will observe and modify
    private SettableProperty<Boolean> parent;

    /**
     * Create a SettableNot to be the opposite of the specified parent value
     *
     * @param parent the value to be the opposite of
     */
    public SettableNot( final SettableProperty<Boolean> parent ) {

        //Initialize to the opposite value of the parent value
        super( !parent.get() );
        this.parent = parent;

        //When the parent changes, change our value and notify our own listeners
        parent.addObserver( new VoidFunction1<Boolean>() {
            @Override
						public void apply( Boolean value ) {
                set( !value );
            }
        } );
    }

    /**
     * Change the value of this property and set the parent to be the opposite
     *
     * @param value
     */
    @Override public void set( Boolean value ) {
        parent.set( !value );
        notifyIfChanged();
    }

    /**
     * Get the value of this property, which is the opposite of the parent
     *
     * @return
     */
    @Override public Boolean get() {
        return !parent.get();
    }

    /**
     * Combine this term with another under a boolean and
     *
     * @param term
     * @return
     */
    @SuppressWarnings("unchecked")
		public And and( SettableProperty<Boolean> term ) {
        return new And( this, term );
    }

    /**
     * Convenience method to create a SettableNot
     *
     * @param p the value to not
     * @return a property that reflects the opposite of the specified value
     */
    public static SettableNot not( SettableProperty<Boolean> p ) {
        return new SettableNot( p );
    }

    public static void main( String[] args ) {
        BooleanProperty a = new BooleanProperty( true );
        a.addObserver( new VoidFunction1<Boolean>() {
            @Override
						public void apply( Boolean aBoolean ) {
                System.out.println( "a = " + aBoolean );
            }
        } );
        SettableNot b = new SettableNot( a );
        b.addObserver( new VoidFunction1<Boolean>() {
            @Override
						public void apply( Boolean aBoolean ) {
                System.out.println( "b = " + aBoolean );
            }
        } );
        System.out.println( "Setting a to false:" );
        a.set( false );

        System.out.println( "Setting a to true" );
        a.set( true );

        System.out.println( "Setting b to true" );
        b.set( true );
        /*Correct output:

        a = true
        b = false
        Setting a to false:
        a = false
        b = true
        Setting a to true
        a = true
        b = false
        Setting b to true
        a = false
        b = true
         */
    }
}