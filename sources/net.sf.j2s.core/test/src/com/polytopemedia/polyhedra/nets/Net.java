package com.polytopemedia.polyhedra.nets;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.TreeMap;

import com.polytopemedia.polyhedra.Polygon;
import com.polytopemedia.polyhedra.opt.grad.ConjugateGradient;
import com.polytopemedia.polyhedra.opt.grad.EvaluatorWithGradient;
import com.polytopemedia.polyhedra.opt.grad.ValueAndGradient;
import com.polytopemedia.polyhedra.opt.grad.ValueAndGradientSource;

public class Net {
	
	private double[] lastFoldingAngles = {}; 
	
	public List<NetAction> getReconstruction() {
		return reconstruction;
	}
	
	public Net clone() {
		return new NetBuilder().buildFrom(getReconstruction(), lastFoldingAngles);
	}
	
	private final class FoldEvaluator extends ValueAndGradientSource {
		private final int n;
		private int power;
		
		
		private FoldEvaluator(int power) {
			this.power = power;
			this.n = countFolds();
		}

		public int getArgumentCount() {
			return n;
		}

		public ValueAndGradient getValueAndGradient(double[] vars) {
			// TODO Auto-generated method stub
			double[] gradient = new double[vars.length];
			double misfold = foldUp(vars).misfold(power, gradient);
			return new ValueAndGradient(misfold, gradient);
		}
	}

	Face firstFace;
	private LinkedHashSet<Edge> allTreeEdges;
	private ArrayList<NetAction> reconstruction = new ArrayList<NetAction>();
	private LinkedHashMap<Edge, Integer> indices = new LinkedHashMap<Edge, Integer>();
	private LinkedHashMap<Edge, Integer> foldIndices = new LinkedHashMap<Edge, Integer>();
	private int nextFoldIndex = 0;
	private TreeMap<Integer, Edge> edges = new TreeMap<Integer, Edge>();
	private int nextIndex = 0;
	
	private int getNextIndex() {
		return nextIndex++;
	}
	
	public Net(Polygon p) {
		Face f = new Face(p);
		NetAction action = new NetAction(NetActionType.start, p.getParameters());
		reconstruction.add(action);
		firstFace = f;
		for (Edge e : f.getEdges()) {
			int index = getNextIndex();
			edges.put(index, e);
			indices.put(e, index);
		}
	}
	
	private ArrayList<NetAction> reconBeforeMulti;
	
	void beginMultiAction() {
		if (reconBeforeMulti != null) {
			throw new IllegalStateException("Multi Already Begun");
		}
		reconBeforeMulti = reconstruction;
		reconstruction = new ArrayList<NetAction>();
	}
	
	void endMultiAction() {
		if (reconBeforeMulti == null) {
			throw new IllegalStateException("No Multi In Progress");
		}
		NetAction multi=new NetBuilder().buildMultiAction(reconstruction);
		reconstruction = reconBeforeMulti;
		reconstruction.add(multi);
		reconBeforeMulti = null;
	}
	
	/**
	 * TODO : 
	 *  * test whether all the faces' knowledge of their edges in the next two methods is correctly maintained.
	 *  * implement UNDO
	 *  * implement foldUp();
	 *  
	 * @param p
	 * @param e
	 */
	public void addPolygon(Polygon p, Edge e) {
		if (!e.isUnjoined()) {
			return;
		}
		int index = indices.get(e);
		NetAction action = new NetAction(NetActionType.add, p.getParameters(), new int[] {index});
		reconstruction.add(action);
		Face f = new Face(p, e);
		e.join(f,0);
		foldIndices.put(e, nextFoldIndex++);
		Edge[] newEdges = f.getEdges();
		for (int i=1; i<newEdges.length; i++) {
			int ind = getNextIndex();
			Edge edg = newEdges[i];
			indices.put(edg,ind);
			edges.put(ind, edg);
		}
		allTreeEdges = null;
		double[] newLastFoldingAngles = new double[lastFoldingAngles.length+1];
		for (int i=0; i<lastFoldingAngles.length; i++) {
			newLastFoldingAngles[i] = lastFoldingAngles[i];
		}
		lastFoldingAngles = newLastFoldingAngles;
		
	}
	
	public void join(Edge e1, Edge e2) {
		if (!e1.isUnjoined() || !e2.isUnjoined()) {
			return;
		}
		int ind1 = indices.get(e1);
		int ind2 = indices.get(e2);
		NetAction action = new NetAction(NetActionType.join, new int[] {ind1,ind2});
		reconstruction.add(action);
		Edge e = e1.joinWith(e2);
		int ind = getNextIndex();
		edges.remove(ind1);
		edges.remove(ind2);
		indices.remove(e1);
		indices.remove(e2);
		edges.put(ind, e);
		indices.put(e,ind);
		allTreeEdges = null;
	}
	
	FoldedNet foldUp(double[] angles) {
		return new FoldedNet(this, angles);
	}
	
	public int countFolds() {
		if (allTreeEdges == null) {
			allTreeEdges = new LinkedHashSet<Edge>(); 
			LinkedHashSet<Edge> foundTreeEdges = new LinkedHashSet<Edge>();
			foundTreeEdges.addAll(firstFace.getTreeEdges());
			while (foundTreeEdges.size() > 0) {
				Edge e = foundTreeEdges.iterator().next();
				foundTreeEdges.remove(e);
				allTreeEdges.add(e);
				Face f2 = e.getSecondFace();
				foundTreeEdges.addAll(f2.getTreeEdges());
			}
		}
		return allTreeEdges.size();
	}

	public double[] findOptimalAngles(boolean useOldAngles) {
		if (useOldAngles && lastFoldingAngles != null) {
			return lastFoldingAngles;
		}
		EvaluatorWithGradient ev1 = new FoldEvaluator(2);
		EvaluatorWithGradient ev2 = new FoldEvaluator(1);
		ConjugateGradient opt1 = new ConjugateGradient();
//		JustRollAlong opt1 = new JustRollAlong();
		double[] initialValues = new double[countFolds()];
		setInitial(initialValues);
		opt1.setInitialGuess(initialValues);
		double[] angles1 = opt1.optimise(ev1, 1e-10);
//		opt1.setInitialGuess(angles1);
//		angles1 = opt1.optimiseUsingGradient(ev1, 1e-15);
		double benchmark = ev2.evaluate(angles1);
		double[] angles = angles1;
		for (int i=0; i<angles1.length; i++) {
			angles = angles.clone();
			angles[i] = 0;
			double trial = ev2.evaluate(angles);
			if (trial > benchmark+1e-6) {
				angles[i] = angles1[i];
			}
		}
		return lastFoldingAngles = angles;
	}

	private void setInitial(double[] initialValues) {
		for (int i=0; i<initialValues.length; i++) {
			initialValues[i] = lastFoldingAngles == null || lastFoldingAngles[i] == 0 ? 0.1*Math.random() : lastFoldingAngles[i];
		}
	}

	Edge getEdge(int i) {
		return edges.get(i);
	}

	public int getNumberOfFolds() {
		return nextFoldIndex;
	}

	int getFoldingIndexOf(Edge e) {
		Integer rtn = foldIndices.get(e);
		return rtn == null ? -1 : rtn;
	}
	
	public void undoLastAction() {
		if (reconstruction.size() <= 1) 
			return;
		List<NetAction> construction = new ArrayList<NetAction>();
		NetAction last = null;
		for (NetAction action : reconstruction) {
			if (last != null) 
				construction.add(last);
			last = action;
		}
		Net newnet = new NetBuilder().buildFrom(construction,lastFoldingAngles);
		this.allTreeEdges = newnet.allTreeEdges;
		this.edges = newnet.edges;
		this.firstFace = newnet.firstFace;
		this.foldIndices = newnet.foldIndices;
		this.indices = newnet.indices;
		this.nextFoldIndex = newnet.nextFoldIndex;
		this.nextIndex = newnet.nextIndex;
		this.reconstruction = newnet.reconstruction;
	}

	public Face getFirstFace() {
		return firstFace;
	}

	public double[] getLastFoldingAngles() {
		return lastFoldingAngles;
	}

	public void setFoldingAngles(double[] angles) {
		lastFoldingAngles = angles;
	}

	public void bumpAngleFor(Edge selectedEdge, double wheelRotation) {
		Integer index = foldIndices.get(selectedEdge);
		if (index == null) return;
		int sign = wheelRotation < 0 ? -1 : 1;
		wheelRotation *= sign;
		wheelRotation = Math.sqrt(wheelRotation*wheelRotation+4)-2;
		wheelRotation *= sign*0.3;
		lastFoldingAngles[index] += wheelRotation;
	}

	
}
