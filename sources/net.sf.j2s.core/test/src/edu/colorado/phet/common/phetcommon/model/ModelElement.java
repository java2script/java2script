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


/**
 * An element of the BaseModel, notified when the simulation time changes.
 *
 * @author ?
 * @version $Revision: 47760 $
 */
public interface ModelElement {
	
	  public final static int TYPE_UNKNOWN         = 0; 
    public final static int TYPE_BODY            = 1;
  	public final static int TYPE_PARTICLE        = 3; // BH note that this is not the hierarchy -- Body extends Particle ?? 
    public final static int TYPE_GRAVITY  = 4;
    public final static int TYPE_OTHER           = 8; // BH 0x8 reserved for phetcommon

	  public void stepInTime( double dt );
    public int getType(); // BH
}
