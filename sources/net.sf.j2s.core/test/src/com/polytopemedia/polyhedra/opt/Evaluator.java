package com.polytopemedia.polyhedra.opt;
/** this is an abstract class representing a real-valued function of several variables */
public interface Evaluator {
	public double evaluate(double[] vars);
	public int getArgumentCount();
}
