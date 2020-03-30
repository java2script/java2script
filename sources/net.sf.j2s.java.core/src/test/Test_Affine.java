package test;

import java.awt.Shape;
import java.awt.geom.AffineTransform;
import java.awt.geom.Rectangle2D;

public class Test_Affine extends Test_ {

	static void testTransform() {
		double px = 87;
		double py = 33;
		double ar = 0.3;
		double theta = Math.PI / 3.2;
		Shape temp = new Rectangle2D.Double(1, 2, 3, 4);
		
		// original: 
		
		temp = AffineTransform.getTranslateInstance(-px, -py).createTransformedShape(temp);
		temp = AffineTransform.getScaleInstance(1, 1 / ar).createTransformedShape(temp);
		temp = AffineTransform.getRotateInstance(-theta).createTransformedShape(temp);
		temp = AffineTransform.getScaleInstance(1, ar).createTransformedShape(temp);
		temp = AffineTransform.getTranslateInstance(px, py).createTransformedShape(temp);
		System.out.println(((java.awt.geom.Path2D.Double) temp).getBounds2D());

		//java.awt.geom.Rectangle2D$Double[x=-46.69756664428215,y=36.4809161227257,w=12.752972196426072,h=2.970603583150705]

		System.out.println("---");

		// using preConcatenate:
		
		temp = new Rectangle2D.Double(1, 2, 3, 4);
		AffineTransform tr;
		tr = AffineTransform.getTranslateInstance(-px, -py);
		tr.preConcatenate(AffineTransform.getScaleInstance(1, 1 / ar));
		tr.preConcatenate(AffineTransform.getRotateInstance(-theta));
		tr.preConcatenate(AffineTransform.getScaleInstance(1, ar));
		tr.preConcatenate(AffineTransform.getTranslateInstance(px, py));
		temp = tr.createTransformedShape(temp);
		System.out.println(((java.awt.geom.Path2D.Double) temp).getBounds2D());

		// java.awt.geom.Rectangle2D$Double[x=-46.697566644282126,y=36.48091612272571,w=12.752972196426079,h=2.970603583150698]

		// Applying transforms in reverse order; only one new object
		
		temp = new Rectangle2D.Double(1, 2, 3, 4);
		tr.setToTranslation(px, py);
		tr.scale(1, ar);
		tr.rotate(-theta);
		tr.scale(1, 1 / ar);
		tr.translate(-px, -py);
		temp = tr.createTransformedShape(temp);
		System.out.println(((java.awt.geom.Path2D.Double) temp).getBounds2D());

		// java.awt.geom.Rectangle2D$Double[x=-46.697566644282126,y=36.4809161227257,w=12.752972196426079,h=2.970603583150698]

		// test for DrawableGroup
		
		AffineTransform at;
		at = new AffineTransform(tr);
	    at.concatenate(AffineTransform.getRotateInstance(-theta, px, py));
	    double xt = Math.sin(theta)*10;
	    double yt = Math.cos(theta)*10;
	    at.concatenate(AffineTransform.getTranslateInstance(xt, yt));
	    System.out.println(at);
	    
	    at.setTransform(tr);
	    at.rotate(-theta, px, py);
	    at.translate(xt, yt);    
	    
	    System.out.println(at);
	    
	    System.out.println("///");
	}
	
	
	

	public static void main(String[] args) {

		testTransform();
		System.out.println("Test_Affine OK");
	}

}