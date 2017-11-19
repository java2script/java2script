package javajs.api;

/**
 * GenericColor allows both java.awt.Color and javajs.awt.Color to be
 * handled by methods that need not distinguish between them. It is used
 * in the javajs package for the background color of a javajs.swing.JComponent
 * 
 * @author hansonr
 *
 */
public interface GenericColor {

	int getRGB();

	int getOpacity255();

	void setOpacity255(int a);
	
}
