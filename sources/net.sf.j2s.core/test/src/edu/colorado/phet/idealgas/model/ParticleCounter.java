// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.model;

import java.awt.geom.Rectangle2D;
import java.util.List;

import edu.colorado.phet.common.phetcommon.model.ModelElement;
import edu.colorado.phet.common.phetcommon.util.SimpleObservable;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;

/**
 * ParticleCounter
 * <p/>
 * A model element that counts the number of particles in a region of the model.
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
public class ParticleCounter extends SimpleObservable implements ModelElement {
    // The region within which to count particles
    private Rectangle2D.Double region;
    private int cnt;
    private IdealGasModel model;

    public ParticleCounter( IdealGasModel model ) {
        this.model = model;
    }

	@Override
	public void stepInTime(double dt) {
		cnt = 0;
		List<GasMolecule> molecules = model.getGasMolecules();
		for (int i = molecules.size(); --i >= 0;) {
			if ( RectangleUtils.containsPt(region, molecules.get(i).getPosition()))
				cnt++;
		}
		notifyObservers();
	}

    public void setRegion( Rectangle2D.Double region ) {
        this.region = region;
    }

    public int getCnt() {
        return cnt;
    }

		@Override
		public int getType() {
			return TYPE_OTHER;
		}
}
