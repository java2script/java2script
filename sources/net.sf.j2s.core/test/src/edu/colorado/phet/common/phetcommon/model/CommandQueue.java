// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47760 $
 * Date modified : $Date: 2011-01-07 11:42:54 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.common.phetcommon.model;

import java.util.ArrayList;

/**
 * A synchronized list of Commands to be executed in the BaseModel's update.
 *
 * @author ?
 * @version $Revision: 47760 $
 */
public class CommandQueue implements Command {
    private ArrayList<Command> al = new ArrayList<Command>();

    public int size() {
        return al.size();
    }

    @Override
		public void doIt() {
        while ( !al.isEmpty() ) {
            commandAt( 0 ).doIt();
            al.remove( 0 );
        }
    }

    private Command commandAt( int i ) {
        return al.get( i );
    }

    public void addCommand( Command c ) {
        al.add( c );
    }

}
