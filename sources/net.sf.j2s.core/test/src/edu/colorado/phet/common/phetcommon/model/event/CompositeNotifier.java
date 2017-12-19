// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.event;

import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;

/**
 * Allows consolidation of other notifiers, so that we can essentially listen to multiple
 * sub-events at a time easily.
 *
 * @author Jonathan Olson
 */
public class CompositeNotifier<T> implements INotifier<T> {

    // same composition as Notifier class, for the same reason
    private Notifier<T> compositeNotifier = new Notifier<T>();

    public CompositeNotifier( INotifier<? extends T>... children ) {
        // listen to each child. we allow subclasses of T, since we are guaranteed they will all notify with a subclass of T
        for ( INotifier<? extends T> child : children ) {
            child.addListener( new VoidFunction1<T>() {
                @Override
								public void apply( T value ) {
                    compositeNotifier.updateListeners( value );
                }
            } );
        }
    }

    @Override
		public void addListener( VoidFunction1<? super T> listener ) {
        compositeNotifier.addListener( listener );
    }

    @Override
		public void addUpdateListener( UpdateListener listener, boolean fireOnAdd ) {
        compositeNotifier.addUpdateListener( listener, fireOnAdd );
    }

    @Override
		public void removeListener( VoidFunction1<? super T> listener ) {
        compositeNotifier.removeListener( listener );
    }

    /*---------------------------------------------------------------------------*
    * testing and demonstration
    *----------------------------------------------------------------------------*/

    // examples and testing for composite notifiers and generics
    public static void main( String[] args ) {
        Notifier<A> aNotifier = new Notifier<A>() {{
            addListener( new VoidFunction1<A>() {
                @Override
								public void apply( A a ) {
                    System.out.println( "aListener: " + a.aString );
                }
            } );
        }};
        Notifier<B> bNotifier = new Notifier<B>() {{
            addListener( new VoidFunction1<B>() {
                @Override
								public void apply( B b ) {
                    System.out.println( "bListener: " + b.aString + ", " + b.bString );
                }
            } );
        }};
        @SuppressWarnings("unchecked")
				CompositeNotifier<A> aAndBNotifier = new CompositeNotifier<A>( aNotifier, bNotifier ) {{
            // could be an A or B, but we have guaranteed that it is an A, so we only print that information
            addListener( new VoidFunction1<A>() {
                @Override
								public void apply( A a ) {
                    System.out.println( "aOrBListener: " + a.aString );
                }
            } );
        }};

        // can add listeners for any supertype
        aAndBNotifier.addListener( new VoidFunction1<Object>() {
            @Override
						public void apply( Object object ) {
                System.out.println( "objectListener: " + object );
            }
        } );

        System.out.println( "\nfiring A:penguin" );
        aNotifier.updateListeners( new A( "penguin" ) );

        System.out.println( "\nfiring B:spaghetti,supper" );
        bNotifier.updateListeners( new B( "spaghetti", "supper" ) );
    }

    private static class A {
        public final String aString;

        private A( String aString ) {
            this.aString = aString;
        }
    }

    private static class B extends A {
        public final String bString;

        private B( String aString, String bString ) {
            super( aString );
            this.bString = bString;
        }
    }
}
