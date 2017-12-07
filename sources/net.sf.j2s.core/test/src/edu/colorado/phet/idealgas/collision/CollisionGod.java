// Copyright 2002-2011, University of Colorado

/**
 * Class: CollisionGod
 * Package: edu.colorado.phet.idealgas.physics.collision
 * Author: Another Guy
 * Date: Jan 20, 2004
 */
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.util.ArrayList;
import java.util.List;

import edu.colorado.phet.common.mechanics.Body;
import edu.colorado.phet.idealgas.model.Box2D;
import edu.colorado.phet.idealgas.model.GasMolecule;
import edu.colorado.phet.idealgas.model.HollowSphere;
import edu.colorado.phet.idealgas.model.IdealGasModel;

/**
 * This class takes care of detecting and computing all the collisions in
 * the system. To avoid combinatorial explosions in collision detection,
 * the area in which collisions are to be handled is divided up into regions,
 * and particle-particle collisions are only searched for within each
 * region and those adjacent to it.
 */
public class CollisionGod {
    private int numRegionsX;
    private int numRegionsY;
    private Region[][] regions;
    //private Hashtable<GasMolecule, Region> elementToRegionMap = new Hashtable<GasMolecule, Region>();
    // List to track bodies that are to be removed from the system at the
    // end of the apply() method, to avoid concurrentModificationExceptions
    //private ArrayList <GasMolecule>removalList = new ArrayList<GasMolecule>();
    private double regionWidth;
    private double regionHeight;
    // private static boolean overlappingRegions = true; // BH optimized out
    private IdealGasModel model; 
    private Rectangle2D.Double bounds;
    private double regionOverlap;
    private Box2D box;
    
    private ArrayList<GasMolecule> lstGasMolecules = new ArrayList<GasMolecule>(); // BH optimization
		private int nGas, nWalls, nNonGas; // BH optimization
		private boolean rebuildLists = true; // BH optimization

 // BH unused    private Hashtable<Wall, MoleculeDescriptor> wallToRegion = new Hashtable<Wall, MoleculeDescriptor>();

    /**
     * @param model
     * @param dt
     * @param bounds
     * @param numRegionsX
     * @param numRegionsY
     */
    public CollisionGod( IdealGasModel model, double dt,
                         Rectangle2D.Double bounds, int numRegionsX, int numRegionsY ) {
        this.model = model;
        this.bounds = bounds;
        this.numRegionsX = numRegionsX;
        this.numRegionsY = numRegionsY;
        regions = new Region[numRegionsX][numRegionsY];
        regionWidth = bounds.getWidth() / numRegionsX;
        regionHeight = bounds.getHeight() / numRegionsY;
        regionOverlap = 2 * GasMolecule.s_radius;

        for( int i = 0; i < numRegionsX; i++ ) {
            for( int j = 0; j < numRegionsY; j++ ) {
//                if( overlappingRegions ) {
                    regions[i][j] = new Region( bounds.getX() + i * regionWidth, // - regionOverlap,
                                                bounds.getX() + ( ( i + 1 ) * regionWidth ) + regionOverlap,
                                                bounds.getY() + j * regionHeight, // - regionOverlap,
                                                bounds.getY() + ( ( j + 1 ) * regionHeight ) + regionOverlap );
//                }
//                else {
//                    regions[i][j] = new Region( bounds.getX() + (double)i * regionWidth, ( bounds.getX() + (double)( i + 1 ) * regionWidth ) - -Double.MIN_VALUE,
//                                                bounds.getY() + (double)j * regionHeight, ( bounds.getY() + (double)( j + 1 ) * regionHeight ) - Double.MIN_VALUE );
//                }
            }
        }
    }

    
		/**
		 * BH optimization flag if collection has changed
		 */
		public void modelElementsChanged() {
			rebuildLists = true;
		}

	/**
	 * Causes the collision god to detect and handle collisions
	 * 
	 * @param dt
	 * @param collisionExperts
	 */
	public void doYourThing(double dt, List<CollisionExpert> collisionExperts) {
		List<Body> bodies = model.getBodies();
		if (rebuildLists) {
			rebuildLists = false;
			otherCollisionExperts.clear();
			for (int i = collisionExperts.size(); --i >= 0;) {
				CollisionExpert expert = collisionExperts.get(i); 
				if (expert.getType() == CollidableBody.TYPE_SPHERICAL_BODY) {
					sphereSphereExpert = expert;
				} else if (expert.getType() == (CollidableBody.TYPE_SPHERICAL_BODY | CollidableBody.TYPE_BOX2D)) {
					sphereBoxExpert = expert;
				} else {
					otherCollisionExperts.add(expert);
				}
			}
			lstGasMolecules.clear();
			walls.clear();
			nonGasBodies.clear();
			for (int i = bodies.size(); --i >= 0;) {
				Body body = bodies.get(i);
				if ((body.type & CollidableBody.TYPE_GAS_MOLECULE) == CollidableBody.TYPE_GAS_MOLECULE)
					lstGasMolecules.add((GasMolecule) body);
				else if ((body.type & CollidableBody.TYPE_BOX2D) == CollidableBody.TYPE_BOX2D)
					box = (Box2D) body;
				else if ((body.type & CollidableBody.TYPE_WALL) == CollidableBody.TYPE_WALL)
					walls.add((Wall) body);
				else
					nonGasBodies.add(body);
			}
			nWalls = walls.size();
			nNonGas = nonGasBodies.size();
			nGas = lstGasMolecules.size();
		}

		// Put all the gas molecules in the model in the right regions
		// Remove any gas molecules from our internal structures that
		// are no longer in the physical system

		adjustRegionMembership();

//		if (nWalls > 0)
//			for (int i = collisionExperts.size(); --i >= 0;) {
//				if ((collisionExperts.get(i).getType() & CollidableBody.TYPE_WALL) == CollidableBody.TYPE_WALL) {
//					// Assign molecules to region relative to walls
//					adjustMoleculeWallRelations();
//					break;
//				}
//			}

		// Do particle-particle collisions. Each region collides with
		// itself and the regions to the right and below.

		doGasToGasCollisions();

		// Do the miscellaneous collisions after the gas to gas collisions. This
		// seems to help keep things more graphically accurate. Note that gas-gas
		// collisions
		// must be detected,even if they aren't executed, because otherwise
		// performance will
		// be different when they are switched off.

		doMiscCollisions();

		for (int n = regions.length, i = n; --i >= 0;) {
			Region[] region = regions[i];
			for (int j = n; --j >= 0;) {
				region[j].n = 0;
			}
		}

		keepMoleculesInContainer(lstGasMolecules);
	}

//// BH this is not used
//	/**
//	 * @param bodies
//	 */
//	private void adjustMoleculeWallRelations() {
//		// Assign molecules to region relative to walls
//		wallToRegion.clear();
//		for (int j = nGas; --j >= 0;) {
//			GasMolecule molecule = lstGasMolecules.get(j);
//			for (int i = nWalls; --i >= 0;) {
//				Wall wall = (Wall) walls.get(i);
//				if (molecule.getPosition().getX() < wall.getBounds().getMinX()
//						+ wall.getBounds().getWidth() / 2) {
//					MoleculeDescriptor desc = (MoleculeDescriptor) wallToRegion
//							.get(molecule);
//					if (desc == null) {
//						desc = new MoleculeDescriptor(wall, molecule);
//						wallToRegion.put(wall, desc);
//					} else {
//						desc.update();
//					}
//				}
//			}
//		}
//	}

    private void keepMoleculesInContainer( List<GasMolecule> molecules ) {
    	if (nGas == 0)
    		return;
    	box.checkContainment(molecules);
  		for (int i = nNonGas; --i >= 0;) {
  			CollidableBody body1 = (CollidableBody) nonGasBodies.get(i);
  			if ((body1.type & CollidableBody.TYPE_HOLLOW_SPHERE) ==  CollidableBody.TYPE_HOLLOW_SPHERE)
  				((HollowSphere) body1).checkContainment(molecules);
  		}
    }

	/**
	 * Makes sure all gas molecules are in the correct regions.
	 * 
	 */
	private void adjustRegionMembership() {
		// Put all the gas molecules in the model in the right regions
		for (int i = nGas; --i >= 0;) {
			GasMolecule body = lstGasMolecules.get(i);
//			if (overlappingRegions) {
				if (!assignRegions(body))
					assignRegions((GasMolecule) body.center(bounds)); // BH
//			} else {
//				if (elementToRegionMap.containsKey(body)) {
//					this.placeBody(body);
//				} else {
//					this.addBody(body);
//				}
//			}
		}

		// Remove any gas molecules from our internal structures that
		// are no longer in the physical system
		// BH this is not necessary and not used since 
//		removalList.clear();
//		Set<GasMolecule> placedBodies = elementToRegionMap.keySet();
//		for (Iterator<GasMolecule> iterator = placedBodies.iterator(); iterator
//				.hasNext();) {
//			GasMolecule body = iterator.next();
//			if (!lstGasMolecules.contains(body)) {
//				removalList.add(body);
//			}
//		}
//		while (!removalList.isEmpty()) {
//			removeBody(removalList.remove(0));
//		}
	}

    private ArrayList<Wall> walls = new ArrayList<Wall>();
    private ArrayList<Body> nonGasBodies = new ArrayList<Body>();
		private CollisionExpert sphereSphereExpert, sphereBoxExpert;
		private List<CollisionExpert> otherCollisionExperts = new ArrayList<CollisionExpert>();

	/**
	 * Detects and performs collisions in which at least one of the bodies is not
	 * a gas molecule
	 * 
	 */
	private void doMiscCollisions() {
		// Find all collisions between non-gas molecules and other
		// bodies
		for (int i = nNonGas; --i >= 0;) {
			CollidableBody body1 = (CollidableBody) nonGasBodies.get(i);
			for (int j = nGas; --j >= 0;)
				detectAndDoCollision(lstGasMolecules.get(j), body1);
			if (box != null && (body1.type & CollidableBody.TYPE_SPHERICAL_BODY) == CollidableBody.TYPE_SPHERICAL_BODY)
				sphereBoxExpert.detectAndDoCollision(body1, box);
		}

		// Finally, let the gas molecules collide with the box and walls
		for (int j = nGas; --j >= 0;) {
			GasMolecule molecule = lstGasMolecules.get(j);
			// Collide gas with walls and box until there aren't any collisions
			boolean b;
			do {
				b = false;
				if (nWalls > 0)
					for (int i = 0; i < nWalls && !b; i++) {
						Wall wall = walls.get(i);
						b = detectAndDoCollision(molecule, wall);
					}
				if (!b && box != null) {
					b = sphereBoxExpert.detectAndDoCollision(molecule, box);
				}
			} while (b);
		}

		// As a final check, look to see if any molecules are inside any of the
		// walls
		if (nWalls > 0)
			for (int j = nGas; --j >= 0;) {
				GasMolecule molecule = lstGasMolecules.get(j);
				boolean fixupDone = false;
				boolean isLight = (molecule.type == CollidableBody.TYPE_LIGHT_SPECIES);
				double r = molecule.getRadius();				do {
					fixupDone = false;
					Point2D.Double p = molecule.getPosition();

					for (int i = nWalls; --i >= 0;) {
						Wall wall = walls.get(i); 
						if (wall.needsFixup(p, r, isLight)) {  
							wall.fixup(molecule);
							fixupDone = true;
							break;
						}
					}
				} while (fixupDone);
			}
	}

    /**
     *
     */
    private void doGasToGasCollisions() {
        // Do particle-particle collisions. Each region collides with
        // itself and the regions to the right and below.
        for( int i = 0; i < numRegionsX; i++ ) {
            for( int j = 0; j < numRegionsY; j++ ) {
                doRegionToRegionCollision( regions[i][j], regions[i][j] );
//                if( !overlappingRegions ) {
                    if( i < numRegionsX - 1 ) {
                        doRegionToRegionCollision( regions[i][j], regions[i + 1][j] );
                    }
                    if( j < numRegionsY - 1 ) {
                        doRegionToRegionCollision( regions[i][j], regions[i][j + 1] );
                    }
                    if( i < numRegionsX - 1 && j < numRegionsY - 1 ) {
                        doRegionToRegionCollision( regions[i][j], regions[i + 1][j + 1] );
                    }
//                }
            }
        }
    }

    private void doRegionToRegionCollision( Region region1, Region region2 ) {
        for( int i = 0, len2 = region2.size(), len1 = region1.size(); i < len1; i++ ) {
            GasMolecule body1 = region1.get( i );
            for( int j = ( region1 == region2 ? i + 1 : 0); j < len2; j++ ) {
                GasMolecule body2 = region2.get( j );
                if( body1 != body2 ) {
                    sphereSphereExpert.detectAndDoCollision( body1, body2 );
                }
            }
        }
    }

	private boolean detectAndDoCollision(GasMolecule molecule,
			CollidableBody body2) {
		boolean haveCollided = false;
		for (int i = otherCollisionExperts.size(); --i >= 0;) {
			CollisionExpert expert = otherCollisionExperts.get(i);
			haveCollided |= expert.detectAndDoCollision(molecule, body2);
		}
		return haveCollided;
	}

//    /**
//     * Add a body to the region map
//     *
//     * @param body
//     */
//    private void addBody( GasMolecule body ) {
////        if( overlappingRegions ) {
//            assignRegions( body );
////        }
////        else {
////            Region region = findRegionFor( body );
////            elementToRegionMap.put( body, region );
////            if( region == null ) {
////                System.out.println( "halt" );
////            }
////            region.add( body );
////        }
//    }

//    /**
//     * Remove a body from the region map
//     *
//     * @param body
//     */
//    private void removeBody( GasMolecule body ) {
////        if( overlappingRegions ) {
//            int iLimit = numRegionsX;
//            int jLimit = numRegionsY;
//            for( int i = 0; i < iLimit; i++ ) {
//                for( int j = 0; j < jLimit; j++ ) {
//                    if( regions[i][j].contains( body ) ) {
//                        // If we have found a region in which the particle belongs, we only have to
//                        // test for membership in the next region, and no farther
//                        iLimit = Math.min( ( i + 2 ), numRegionsX );
//                        jLimit = Math.min( ( j + 2 ), numRegionsY );
//                        regions[i][j].remove( body );
//                    }
//                }
//            }
////        }
////        else {
////            ( (Region)elementToRegionMap.get( body ) ).remove( body );
////            elementToRegionMap.remove( body );
////        }
//    }
//
    /**
     * Assign a body to the proper regions
     *
     * @param body
     */
    private boolean assignRegions( GasMolecule body ) { // BH adds true/false return
        double x = body.getPosition().getX();
        double y = body.getPosition().getY();
        try {
            int i = (int)( ( x - bounds.x ) / regionWidth );
            int j = (int)( ( y - bounds.y ) / regionHeight );
            if (i < 0 || i >= numRegionsX || j < 0 || j >= numRegionsY)
            	return false;
            int iPrime = (int)( ( x - regionOverlap - bounds.x ) / ( regionWidth ) );
            int jPrime = (int)( ( y - regionOverlap - bounds.y ) / ( regionHeight ) );
            regions[i][j].add( body );
            if( i != iPrime ) {
                regions[iPrime][j].add( body );
            }
            if( j != jPrime ) {
                regions[i][jPrime].add( body );
            }
            if( i != iPrime && j != jPrime ) {
                regions[iPrime][jPrime].add( body );
            }
        }
        catch( Throwable aiobe ) {
            System.out.println( "ArrayIndexOutOfBoundsException in CollisionGod.assignRegions()" );
        }
        return true;
    }

//    private Region findRegionFor( GasMolecule body ) {
//        Region region = null;
//        if( IdealGasConfig.REGION_TEST ) {
//            int i = (int)( (double)body.getPosition().getX() / regionWidth );
//            int j = (int)( (double)body.getPosition().getY() / regionHeight );
//            region = regions[i][j];
//        }
//        else {
//            for( int i = 0; region == null && i < numRegionsX; i++ ) {
//                for( int j = 0; region == null && j < numRegionsY; j++ ) {
//                    if( regions[i][j].belongsIn( body ) ) {
//                        region = regions[i][j];
//                    }
//                }
//            }
//        }
//        return region;
//    }
//
//    private void placeBody( GasMolecule body ) {
//        Region currRegion = (Region)elementToRegionMap.get( body );
//        if( currRegion == null ) {
//            addBody( body );
//        }
//        else if( !currRegion.belongsIn( body ) ) {
//            currRegion.remove( body );
//            addBody( body );
//        }
//    }

	/**
	 * A region within the physical system
	 */
	public class Region {
		/**
		 * 
		 */
//		private static final long serialVersionUID = 1L;
		double xMin;
		double xMax;
		double yMin;
		double yMax;
		GasMolecule[] list = new GasMolecule[10];
		private int n;

		int size() {
			return n;
		}
		
		public boolean contains(GasMolecule body) {
			// TODO Auto-generated method stub
			return body.region == this;
		}

		public void remove(GasMolecule body) {
			for (int i = body.regionPt + 1; i < n; i++)
				list[i - 1] = list[i];
			n--;
		}

		public void add(GasMolecule body) {
			if (n == list.length) {
				GasMolecule[] b = new GasMolecule[list.length*2];
				for (int i = n; --i >= 0;)
					b[i] = list[i];
				list = b;
			}
			body.regionPt = n;
			body.region = this;
			list[n++] = body;
		}

		void clear() {
			n = 0;
		}

		GasMolecule get(int i) {
			return list[i];
		}
		
		Region(double xMin, double xMax, double yMin, double yMax) {
			this.xMin = xMin;
			this.xMax = xMax;
			this.yMin = yMin;
			this.yMax = yMax;
		}

		boolean belongsIn(GasMolecule body) {
			double x, y;
			return (x = body.getPosition().getX()) >= xMin && x <= xMax
					&& (y = body.getPosition().getY()) >= yMin && y <= yMax;
		}
	}


// BH unused
//
//    //----------------------------------------------------------------
//    // Inner classes
//    //----------------------------------------------------------------
//    private class MoleculeDescriptor {
//        static final int LEFT = 1;
//        static final int RIGHT = 2;
//        static final int ABOVE = 3;
//        static final int BELOW = 4;
//        int xDesc;
//        int yDesc;
//        private Wall wall;
//        private SphericalBody sphere;
//
//        public MoleculeDescriptor( Wall wall, SphericalBody sphere ) {
//            this.wall = wall;
//            this.sphere = sphere;
//            update();
//        }
//
//        public void update() {
//
//            if( sphere.getPosition().getX() < wall.getBounds().getMinX() + wall.getBounds().getWidth() / 2 ) {
//                xDesc = LEFT;
//            }
//            else {
//                xDesc = RIGHT;
//            }
//            if( sphere.getPosition().getY() < wall.getBounds().getMinY() + wall.getBounds().getHeight() / 2 ) {
//                yDesc = ABOVE;
//            }
//            else {
//                yDesc = BELOW;
//            }
//        }
//    }

}
