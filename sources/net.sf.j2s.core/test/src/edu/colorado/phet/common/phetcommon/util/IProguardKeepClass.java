// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.util;

import java.io.Serializable;

/**
 * IProguardKeepClass is a marker interface related to PhET's use of Proguard.
 * When applying Proguard to JAR files, we will tell Proguard to keep
 * any class that implements this interface.  All fields and methods of
 * the class will be kept. If you have a class that is dynamically loaded,
 * you'll want to implement this interface so that Proguard keeps your class.
 * <p/>
 * The relevant entry in the Proguard configuration file will look like this:
 * <code>
 * -keep class * extends edu.colorado.phet.common.phetcommon.util.IProguardKeepClass {
 * <fields>;
 * <methods>;
 * }
 * </code>
 * <p/>
 * For more details, see the "-keep" option in the Proguard manual.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public interface IProguardKeepClass extends Serializable {
}
