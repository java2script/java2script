// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author$
 * Revision : $Revision$
 * Date modified : $Date$
 */

package edu.colorado.phet.common.phetcommon.util;

import javax.swing.JComponent;
import javax.swing.RepaintManager;
import javax.swing.SwingUtilities;

/**
 * ThreadCheckingRepaintManager provides an easy way to determine
 * if you are modifying Swing components on non-Swing threads.
 * Install this repaint manager like this:
 * <code>
 * RepaintManager.setCurrentManager( new ThreadCheckingRepaintManager() );
 * </code>
 * <p/>
 * This code was taken from an article at:
 * http://www.clientjava.com/blog/2004/08/20/1093059428000.html
 * <p/>
 * Sun's rule for Swing threading was:
 * Once a Swing component has been realized, all code that might
 * affect or depend on the state of that component should be executed
 * in the event-dispatching thread.
 * <p/>
 * Sun's has ammended this in The Java Tutorial as follows:
 * "We used to say that you could create the GUI on the main thread
 * as long as you didn't modify components that had already been realized.
 * Realized means that the component has been painted onscreen, or is ready
 * to be painted. The methods setVisible(true) and pack cause a window to
 * be realized, which in turn causes the components it contains to be realized.
 * While this worked for most applications, in certain situations it could
 * cause problems. Out of all the demos in the Swing Tutorial, we encountered
 * a problem only in ComponentEventDemo. In that case, sometimes when you
 * launched the demo, it would not come up because it would deadlock when
 * updating the text area if the text area had not yet been realized, while
 * other times it would come up without incident. To avoid the possibility
 * of thread problems, we recommend that you use invokeLater to create the
 * GUI on the event-dispatching thread for all new applications. If you
 * have old programs that are working fine they are probably OK; however
 * you might want to convert them when it's convenient to do so."
 *
 * @author unknown
 * @version $Revision$
 */
public class ThreadCheckingRepaintManager extends RepaintManager {

    public ThreadCheckingRepaintManager() {
    }

    @Override
		public synchronized void addInvalidComponent( JComponent jComponent ) {
        checkThread();
        super.addInvalidComponent( jComponent );
    }

    private void checkThread() {
        if ( !SwingUtilities.isEventDispatchThread() ) {
            System.out.println( "Wrong Thread" );
            Thread.dumpStack();
        }
    }

    @Override
		public synchronized void addDirtyRegion( JComponent jComponent, int i, int i1, int i2, int i3 ) {
        checkThread();
        super.addDirtyRegion( jComponent, i, i1, i2, i3 );
    }
}

