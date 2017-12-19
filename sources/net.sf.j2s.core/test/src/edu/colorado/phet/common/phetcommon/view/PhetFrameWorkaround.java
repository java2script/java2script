// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author$
 * Revision : $Revision$
 * Date modified : $Date$
 */

package edu.colorado.phet.common.phetcommon.view;

import java.awt.HeadlessException;

import edu.colorado.phet.common.phetcommon.application.PhetApplication;

/**
 * PhetFrameWorkaround contains a workaround for Sun bug report 4473503
 * (see http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4473503)
 * <p/>
 * This class exists mainly for the purposes of documenting the problem
 * and the workaround.
 * <p/>
 * First, the problem...
 * Under some conditions, parts of our simulation are not painted properly
 * while the simulations clock is running. The reason for this is described
 * in bug report 4473503: "All of Swing's repainting architecture
 * funnels into an invokeLater. This results in the event being processed
 * at NORM_PRIORITY. AWT's painting/updating is processed at LOW_PRIORITY.
 * If the machine is bogged down this can result in odd behavior when
 * heavy weights need to repaint (swing can end painting its components
 * numerous times before the awt one is painted), as well as not being
 * responsive to the user."
 * <p/>
 * The workaround, developed by Sam Reid, overrides repaint and forces
 * a paint of any lightweight components that are children of the PhetFrame.
 * <p/>
 * Sample usage:
 * <p/>
 * <code><blockquote><pre>
 * public class MyApplication extends PhetApplication {
 *     //....
 *     protected PhetFrame createPhetFrame() {
 *          return new PhetFrameWorkaround( this );
 *     }
 * }
 * </pre></blockquote></code>
 * <p/>
 * Pros:
 * <ul>
 * <li>This solution produces the desired behavior on XP and Macintosh
 * <li>PhetFrame.paint() is only called a few times in a few sample
 * applications tried (eg, BoundStates and TestPaintPriorityWorkaround).
 * This solution could be a debilitating performance problem if it was
 * called every 30 ms.
 * <li>This solution is only one line of code, and only needs to be done in a
 * few places (I recommend on a per-application basis).
 * </ul>
 * <p/>
 * Cons:
 * <ul>
 * <li>This workaround ignores a great deal of AWT paint infrastructure,
 * including the Toolkit, the EventQueue and the Component.dispatchEvent().
 * <li>This workaround could be a performance problem, paint requests are not
 * coalesced.  I recommend putting a debug statement by the call to update() to
 * make sure it's not being called all the time.
 * <li>This workaround could draw incorrectly, if something needs to be done to
 * the Graphics (setting up transforms, etc) before drawing on it.
 * <li>This workaround would need to be applied to each parent component for
 * which this problem is exhibited.
 * </ul>
 *
 * @author Sam Reid / Chris Malley
 * @version $Revision$
 */
public class PhetFrameWorkaround extends PhetFrame {

    public PhetFrameWorkaround( PhetApplication application ) throws HeadlessException {
        super( application );
    }

    @Override
		public void repaint( long tm, int x, int y, int width, int height ) {
        super.repaint( tm, x, y, width, height ); // in case other important stuff happens here.
        update( getGraphics() );
    }
}
