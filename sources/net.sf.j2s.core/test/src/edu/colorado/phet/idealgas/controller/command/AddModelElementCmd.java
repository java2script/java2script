// Copyright 2002-2011, University of Colorado

/**
 * Class: AddModelElementCmd
 * Package: edu.colorado.phet.idealgas.controller
 * Author: Another Guy
 * Date: Jan 13, 2004
 */
package edu.colorado.phet.idealgas.controller.command;

import edu.colorado.phet.common.phetcommon.model.Command;
import edu.colorado.phet.common.phetcommon.model.ModelElement;
import edu.colorado.phet.idealgas.model.IdealGasModel;

public class AddModelElementCmd implements Command {
    private IdealGasModel model;
    private ModelElement body;

    public AddModelElementCmd( IdealGasModel model, ModelElement body ) {
        this.model = model;
        this.body = body;
    }

    @Override
		public void doIt() {
        model.addModelElement( body );
    }
}
