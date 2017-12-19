// Copyright 2002-2012, University of Colorado

/**
 * Class: SphereBoxExpert
 * Package: edu.colorado.phet.collision
 * Author: Another Guy
 * Date: Sep 21, 2004
 */
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Line2D;
import java.awt.geom.Point2D;
import java.util.HashMap;
import java.util.Map;

import edu.colorado.phet.common.phetcommon.math.MathUtil;
import edu.colorado.phet.idealgas.model.IdealGasModel;

public class SphereWallExpert implements CollisionExpert, ContactDetector {

	public static final int NO_CONTACT = 0, LEFT_SIDE = 1, RIGHT_SIDE = 2,
			TOP = 3, BOTTOM = 4;

	private IdealGasModel model;
	private Map<Wall, WallDescriptor> walls = new HashMap<Wall, WallDescriptor>();

	private SphereWallCollision collider;

	/**
	 * @param model
	 */
	public SphereWallExpert(IdealGasModel model) {
		this.model = model;
	}

	@Override
	public boolean detectAndDoCollision(CollidableBody bodyA, CollidableBody bodyB) {
		boolean haveCollided = false;
		if (!applies(bodyA, bodyB))
			return false;

		Wall wall = (Wall) bodyB;
		SphericalBody sphere = (SphericalBody) bodyA;

		int contactType = getContactType(sphere, wall);
		if (contactType != NO_CONTACT) {
			if (collider == null)
				collider = new SphereWallCollision(model);
			collider.sphere = sphere;
			collider.wall = wall;
			collider.contactType = contactType;
			collider.collide();
			haveCollided = true;
		}
		return haveCollided;
	}

	@Override
	public boolean applies(CollidableBody bodyA, CollidableBody bodyB) {
		return (((bodyA.type | bodyB.type) & (CollidableBody.TYPE_WALL | CollidableBody.TYPE_SPHERICAL_BODY)) == (CollidableBody.TYPE_WALL | CollidableBody.TYPE_SPHERICAL_BODY));
	}

	@Override
	public boolean areInContact(CollidableBody bodyA, CollidableBody bodyB) {
		// unused;
		return false;
	}

	
	private Line2D.Double PQ = new Line2D.Double();
	/**
	 * Determines if the sphere is hitting the wall and returns an object that
	 * describes the nature of the contact. Determines if the sphere is hitting
	 * the wall and if it is, which side of the wall it's hitting
	 * 
	 * @param sphere
	 * @param wall
	 * @return
	 */
	private int getContactType(SphericalBody sphere, Wall wall) {

		WallDescriptor wallDesc = walls.get(wall);
		if (wallDesc == null)
			walls.put(wall, wallDesc = wall.getDescriptor(sphere.getRadius()));

		// P is the previous position of the sphere
		// Q is the current position of the sphere
		Point2D.Double Q = sphere.getPosition();
		Point2D.Double P = sphere.getPositionPrev();
		PQ.x1 = Q.x;
		PQ.y1 = Q.y;
		PQ.x2 = P.x;
		PQ.y2 = P.y;
		//Line2D.Double PQ = new Line2D.Double(Q, P);
		if (sphere.getVelocity().getX() > 0) {
			if (MathUtil.segmentsIntersectL2(PQ, wallDesc.AD))
				return LEFT_SIDE;
		} else if (MathUtil.segmentsIntersectL2(PQ, wallDesc.BC)) {
			return RIGHT_SIDE;
		}
		if (sphere.getVelocity().getY() > 0) {
			if (MathUtil.segmentsIntersectL2(PQ, wallDesc.AB))
				return TOP;
		} else if (MathUtil.segmentsIntersectL2(PQ, wallDesc.CD)) {
			return BOTTOM;
		}
		return NO_CONTACT;
	}

// BH never called
//	/**
//	 * Last-ditch method to get a sphere out of the wall. A total hack.
//	 * 
//	 * @param wall
//	 * @param sphere
//	 */
//	public void fixup(Wall wall, SphericalBody sphere) {
//		WallDescriptor wallDesc = wall.getDescriptor(sphere.getRadius());
//
//		// Figure out which boundary of the wall the sphere crossed to get inside
//		MutableVector2D v = new MutableVector2D(-sphere.getVelocity().getX(),
//				-sphere.getVelocity().getY()).normalize().scale(1000);
//		Point2D.Double Q = sphere.getPosition();
////		Point2D P = new Point2D.Double(Q.getX() + v.getX(), Q.getY() + v.getY());
//		PQ.x1 = Q.x;
//		PQ.y1 = Q.y;
//		PQ.x2 = Q.x + v.getX();
//		PQ.y2 = Q.y + v.getY();
//		if (MathUtil.segmentsIntersectL2(PQ, wallDesc.AB)) {
//			sphere.setVelocity(sphere.getVelocity().getX(), -sphere.getVelocity()
//					.getY());
//			sphere.setPositionP(sphere.getPosition().getX(), wallDesc.AB.getY1());
//			System.out.println("SphereWallExpert.fixup: AB");
//		}
//		if (MathUtil.segmentsIntersectL2(PQ, wallDesc.BC)) {
//			sphere.setVelocity(-sphere.getVelocity().getX(), sphere.getVelocity()
//					.getY());
//			sphere.setPositionP(wallDesc.BC.getX1(), sphere.getPosition().getY());
//			System.out.println("SphereWallExpert.fixup: BC");
//		}
//		if (MathUtil.segmentsIntersectL2(PQ, wallDesc.CD)) {
//			sphere.setVelocity(sphere.getVelocity().getX(), -sphere.getVelocity()
//					.getY());
//			sphere.setPositionP(sphere.getPosition().getX(), wallDesc.CD.getY1());
//			System.out.println("SphereWallExpert.fixup: CD");
//		}
//		if (MathUtil.segmentsIntersectL2(PQ, wallDesc.AD)) {
//			sphere.setVelocity(-sphere.getVelocity().getX(), sphere.getVelocity()
//					.getY());
//			sphere.setPositionP(wallDesc.AD.getX1(), sphere.getPosition().getY());
//			System.out.println("SphereWallExpert.fixup: AD");
//		}
//	}
	
	@Override
	public int getType() {
		return CollidableBody.TYPE_WALL  | CollidableBody.TYPE_SPHERICAL_BODY;
	}


}
