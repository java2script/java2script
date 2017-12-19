package com.polytopemedia.polyhedra.ui;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Component;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.InputEvent;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.event.MouseWheelEvent;
import java.awt.event.MouseWheelListener;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;
import java.util.TreeMap;

import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;

import com.polytopemedia.polyhedra.nets.AngleFactory;
import com.polytopemedia.polyhedra.nets.Edge;
import com.polytopemedia.polyhedra.nets.FoldedNet;
import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.nets.PolygonToDraw;
import com.polytopemedia.polyhedra.nets.ProjectedNet;
import com.polytopemedia.polyhedra.print.PrintModel;
import com.polytopemedia.polyhedra.ui.events.NetEvent;
import com.polytopemedia.polyhedra.ui.events.NetEventListener;
import com.polytopemedia.polyhedra.ui.events.NetEventSource;
import com.polytopemedia.polyhedra.ui.events.NetEventType;
import com.polytopemedia.polyhedra.ui.io.FileUtils;
import com.polytopemedia.polyhedra.vec.CameraTransform;
import com.polytopemedia.polyhedra.vec.LineSegment2D;
import com.polytopemedia.polyhedra.vec.Vector;
import com.polytopemedia.polyhedra.vec.Vector2D;


class NetPanel extends JPanel implements ActionListener, MouseListener, MouseMotionListener, NetEventSource, MouseWheelListener, NetSource{ 
	private FoldedNet foldedNet;
	private Net net;
	private final AngleFactory angleFactory;
	private CameraTransform camera;
	private Color joinedEdgeColor;
	private Color unjoinedEdgeColor;
	private ProjectedNet edgePositions;
	private double[] topLeft;
	private double[] bottomRight;
	private Edge selectedEdge;
	private Edge clickedEdge;
	private MarkColors markColors;
	private final boolean isFolding;
	private boolean paintFrame;
	private final PrintModel printModel;
	private final String name;

	public void setNet(Net net) {
		this.net = net;
		refold(true);
	}

	public void setCamera(CameraTransform camera) {
		this.edgePositions = null;
		this.camera = camera;
		repaint();
	}

	public void setJoinedEdgeColor(Color joinedEdgeColor) {
		this.joinedEdgeColor = joinedEdgeColor;
		repaint();
	}

	public void setUnjoinedEdgeColor(Color unjoinedEdgeColor) {
		this.unjoinedEdgeColor = unjoinedEdgeColor;
		repaint();
	}

	public void setSelectedEdgeColor(Color selectedEdgeColor) {
		repaint();
	}

	public void setSelectedEdge(Edge edge) {
		this.selectedEdge = edge;
		repaint();
	}

	public void setClickedEdge(Edge edge) {
		this.clickedEdge = edge;
		repaint();
	}

	public void setEdgePositions(ProjectedNet edgePositions) {
		this.edgePositions = edgePositions;
		repaint();
	}

	public void setTopLeft(double[] topLeft) {
		this.topLeft = topLeft;
		repaint();
	}

	public void setBottomRight(double[] bottomRight) {
		this.bottomRight = bottomRight;
		repaint();
	}

	NetPanel(Net net, AngleFactory angleFactory, CameraTransform camera, Color bgColor, Color unjoinedEdgeColor, Color joinedEdgeColor, double[] topLeft, double[] bottomRight, boolean isFolding, MarkColors markColors, PrintModel printModel, String name, boolean autofoldAtStart) {
		
		this.net = net;
		this.angleFactory = angleFactory;
		this.camera = camera;
		this.unjoinedEdgeColor = unjoinedEdgeColor;
		this.joinedEdgeColor = joinedEdgeColor;
		this.topLeft = topLeft;
		this.bottomRight = bottomRight;
		this.isFolding = isFolding;
		this.markColors = markColors;
		this.printModel = printModel;
		this.name = name;
		this.foldedNet = angleFactory.fold(net, !autofoldAtStart);
		this.setBackground(bgColor);
		if (isFolding) {
			JButton fold = new JButton("Re-fold");
			this.add(fold);
			fold.setActionCommand("fold");
			fold.setToolTipText("Fold up this net");
			fold.addActionListener(this);
			
			JButton autoJoin = new JButton("Auto join");
			this.add(autoJoin);
			autoJoin.setActionCommand("autojoin");
			autoJoin.setToolTipText("Join edges that touch");
			autoJoin.addActionListener(this);
			
		}
		JButton undo = new JButton("Undo");
		this.add(undo);
		undo.setToolTipText("Undo the last change to the net");
		undo.setActionCommand("undo");
		undo.addActionListener(this);
		
		for (Component component : new PrintComponentFactory(printModel, this).getComponents()) {
			this.add(component);
		}
		
		JButton save = new JButton(FileUtils.canAccessFileSystem() ? "Save/Share" : "Share");
		this.add(save);
		save.setToolTipText(FileUtils.canAccessFileSystem() ? "Save or share this net" : "Share this net");
		save.setActionCommand("save");
		save.addActionListener(this);
		
		this.addMouseListener(this);
		this.addMouseMotionListener(this);
		this.addMouseWheelListener(this);
		
		
	}
	
	public void paintComponent(Graphics gr) {
		super.paintComponent(gr);		
		calculateEdgePositions();
		if (paintFrame) {
			LinkedHashMap<LineSegment2D, Edge> linesToDraw = edgePositions.getEdgesInDrawnPositions();
			drawEdges(gr, linesToDraw);
		} else {
			List<PolygonToDraw> polygonsToDraw = edgePositions.getPolygonsInDrawnPosition();
			TreeMap<Double, PolygonToDraw> sortedPolygons = new TreeMap<Double, PolygonToDraw>();
			Random jitter = new Random(87876);
			for (PolygonToDraw polygon : polygonsToDraw) {
				double distance = polygon.getDistance();
				distance += jitter.nextGaussian()/1e7;
				sortedPolygons.put(-distance, polygon);
			}
			for (PolygonToDraw polygon : sortedPolygons.values()) {
				int np = polygon.size();
				int[] xp = new int[np];
				int[] yp = new int[np];
				int i = 0;
				for (double[] p : polygon.getPoints()) {
					Vector2D v = new Vector2D(p);
					double[] screenXY = transformToScreenCoordinates(v);
					int scrX = (int)(Math.round(screenXY[0]));
					int scrY = (int)(Math.round(screenXY[1]));
					xp[i] = scrX;
					yp[i] = scrY;
					i++;
				}
				java.awt.Polygon poly = new java.awt.Polygon(xp,yp,np);
				gr.setColor(fillColor);
				gr.fillPolygon(poly);
				LinkedHashMap<LineSegment2D, Edge> edges = polygon.getEdges();
				drawEdges(gr, edges);
			}
		}
	}

	private void drawEdges(Graphics gr, LinkedHashMap<LineSegment2D, Edge> edges) {
		((Graphics2D)gr).setStroke(new BasicStroke(2f));
		for (LineSegment2D segment : edges.keySet()) { 
			Edge edge = edges.get(segment);
			drawEdge(gr, segment, edge);
		}
	}

	private void drawEdge(Graphics gr, LineSegment2D segment, Edge edge) {
		if (edge.isUnjoined()) {
			gr.setColor(unjoinedEdgeColor);
		} else {
			gr.setColor(joinedEdgeColor);
		}
		if (edge == selectedEdge) {
			if (edge.isUnjoined()) {
				gr.setColor(markColors.getColorFor(Mark.selected));
			} else if (edge.isTreeEdge()){
				gr.setColor(markColors.getColorFor(Mark.selectedTree));
			}
		}
		if (edge == clickedEdge) {
			gr.setColor(markColors.getColorFor(Mark.clicked));
		}
		double[] start = transformToScreenCoordinates(segment.getStart());
		double[] end = transformToScreenCoordinates(segment.getEnd());
		gr.drawLine((int)Math.round(start[0]), (int)Math.round(start[1]), (int)Math.round(end[0]), (int)Math.round(end[1]));
	}
	private Color fillColor = new Color(0.5f, 1f, 1f, 0.5f);
	private double[] transformToScreenCoordinates(Vector2D vec) {
		Vector2D topLeftVector = new Vector2D(topLeft);
		Vector2D offset = vec.minus(topLeftVector);
		Vector2D rightVector = new Vector2D(bottomRight[0]-topLeft[0], 0);
		Vector2D downVector = new Vector2D(0, bottomRight[1]-topLeft[1]);
		double horizontal = offset.dot(rightVector)/rightVector.dot(rightVector);
		double vertical = offset.dot(downVector)/downVector.dot(downVector);
		return new double[] {horizontal*getWidthOrHeight()+getWidthOffset(), vertical*getWidthOrHeight()+getHeightOffset()};
	}

	

	private Vector2D transformFromScreenCoordinates(double x, double y) {
		Vector2D topLeftVector = new Vector2D(topLeft);
		Vector2D rightVector = new Vector2D(bottomRight[0]-topLeft[0], 0);
		Vector2D downVector = new Vector2D(0, bottomRight[1]-topLeft[1]);
		double horizontal = (x-getWidthOffset())/getWidthOrHeight();
		double vertical = (y-getHeightOffset())/getWidthOrHeight();
		Vector2D offset = rightVector.times(horizontal).plus(downVector.times(vertical)); 
		return offset.plus(topLeftVector);
	}

	private int getWidthOffset() {
		return (getWidth()-getWidthOrHeight())/2;
	}

	private int getHeightOffset() {
		return (getHeight()-getWidthOrHeight())/2;
	}

	private int getWidthOrHeight() {
		return Math.min(getWidth(),getHeight());
	}

	private void calculateEdgePositions() {
		if (edgePositions == null) {
			edgePositions = new ProjectedNet(camera, foldedNet);
		}
	}

	public void actionPerformed(ActionEvent e) {
		String command = e.getActionCommand();
		if (command.equals("fold")) {
			refold(false);
		} else if (command.equals("undo")) {
			fireNetEvent(new NetEvent(NetEventType.undo, null, net, this));
		} else if (command.equals("autojoin")) {
			autoJoin();
			fireNetEvent(new NetEvent(NetEventType.auto, null, net, this));
		} else if (command.equalsIgnoreCase("print")) {
			SwingUtilities.invokeLater(new Runnable() {
				public void run() {
					printModel.print(net);
				}
			});
		} else if (command.equalsIgnoreCase("save")) {
			showSaveShareDialog();
		}
	}

	private void showSaveShareDialog() {
		BufferedImage image = new BufferedImage(this.getWidth(), this.getHeight(), BufferedImage.TYPE_INT_RGB);
		this.paintComponent(image.getGraphics());
		ShareSavePanel ssp = new ShareSavePanel(this, image, name);
		JOptionPane.showMessageDialog(this, ssp, FileUtils.canAccessFileSystem() ? "Share/Save your net" : "Share Your Net", JOptionPane.INFORMATION_MESSAGE);
	}

	private void autoJoin() {
		this.foldedNet.joinTouchingEdges();
		this.selectedEdge = null;
		this.clickedEdge = null;
		repaint();
	}

	private void refold(boolean basedOnOldAngles) {
		this.foldedNet = angleFactory.fold(net, basedOnOldAngles);
		this.edgePositions = null;
		this.selectedEdge = null;
		this.clickedEdge = null;
		repaint();
	}
	
	private Edge getUnjoinedOrTreeEdgeNearestScreenPoint(int x, int y) {
		Vector2D xy = transformFromScreenCoordinates(x,y);
		calculateEdgePositions();
		Edge closestUnjoinedOrTreeEdge = edgePositions.getClosestUnjoinedOrTreeEdgeTo(xy.getFirst(), xy.getSecond());
		return closestUnjoinedOrTreeEdge;
	}

	private List<NetEventListener> netEventLsteners = new ArrayList<NetEventListener>();
	private int wheelRotation;
	private int lastx;
	private int lasty;
	
	private void fireNetEvent(NetEvent netEvent) {
		for (NetEventListener listener : netEventLsteners) {
			listener.netTouched(netEvent);
		}
	}
	
	void addNetEventListener(NetEventListener listener) {
		netEventLsteners.add(listener);
	}

	public void mouseDragged(MouseEvent e) {
		int thisx = e.getX();
		int thisy = e.getY();
		double movex = (double)(thisx-lastx)/(getWidthOrHeight());
		double movey = (double)(thisy-lasty)/(getWidthOrHeight());
		lastx = thisx;
		lasty = thisy;
		if (e.isShiftDown()) {
			// BH added for better usability only
			zoom(movey < 0 ? 1 : -1, 1.03, e.isControlDown());
			return;
		}
		CameraTransform newCamera;
		if (isFolding) {
			movex = -2*movex;
			movey = -2*movey;
			Vector centre = camera.getCentre();
			Vector out = camera.getOut();
			Vector up = camera.getUp();
			Vector right = camera.getRight();
			Vector upN = up.times( 1/ up.length());
			Vector rightN = right.times( 1/ right.length());
			Vector outN = rightN.cross(upN);
			out = rotateX(movex, out, upN, rightN, outN);
			up = rotateX(movex, up, upN, rightN, outN); 
			centre = rotateX(movex, centre, upN, rightN, outN);
			out = rotateY(movey, out, upN, rightN, outN);
			up = rotateY(movey, up, upN, rightN, outN);
			centre = rotateY(movey, centre, upN, rightN, outN);
			newCamera = new CameraTransform(centre, out, up, camera.getFocus());
		} else {
			Vector centre = camera.getCentre();
			Vector out = camera.getOut();
			Vector up = camera.getUp();
			double right = (bottomRight[0]-topLeft[0])*movex;
			double down = (bottomRight[1]-topLeft[1])*movey;
			centre = centre.minus(new Vector(right, down, 0).times(camera.getFocus()*centre.getZ()));
			newCamera = new CameraTransform(centre, out, up, camera.getFocus());
		}
		this.setCamera(newCamera);
		
	}

	private Vector rotateY(double movey, Vector v, Vector up, Vector right, Vector out) {
		double x = v.dot(right);
		double y = v.dot(up);
		double z = v.dot(out);
		double cos = Math.cos(movey);
		double sin = Math.sin(movey);
		double newX = x;
		double newY = y*cos+z*sin;
		double newZ = z*cos-y*sin;
		return right.times(newX).plus(up.times(newY)).plus(out.times(newZ));
	}

	private Vector rotateX(double movex, Vector v, Vector up, Vector right, Vector out) {
		double x = v.dot(right);
		double y = v.dot(up);
		double z = v.dot(out);
		double cos = Math.cos(movex);
		double sin = Math.sin(movex);
		double newX = x*cos+z*sin;
		double newY = y;
		double newZ = z*cos-y*sin;
		return right.times(newX).plus(up.times(newY)).plus(out.times(newZ));
	}

	public void mouseMoved(MouseEvent e) {
		NetEventType type = NetEventType.moved;
		createAndFireNetEvent(e, type);
	}

	public void mouseClicked(MouseEvent e) {
		NetEventType type = NetEventType.clicked;
		if ((e.getModifiers() & InputEvent.CTRL_MASK) != 0) {
			type = NetEventType.ctrl_clicked;
		}
		createAndFireNetEvent(e, type);
	}

	public void mousePressed(MouseEvent e) {
		lastx = e.getX();
		lasty = e.getY();
		NetEventType type = NetEventType.pressed;
		createAndFireNetEvent(e, type);
	}

	public void mouseReleased(MouseEvent e) {
		NetEventType type = NetEventType.released;
		createAndFireNetEvent(e, type);
	}

	public void mouseEntered(MouseEvent e) {
		NetEventType type = NetEventType.entered;
		createAndFireNetEvent(e, type);
	}

	public void mouseExited(MouseEvent e) {
		NetEventType type = NetEventType.exited;
		createAndFireNetEvent(e, type);
	}

	private void createAndFireNetEvent(MouseEvent e, NetEventType type) {
		fireNetEvent(new NetEvent(type, getUnjoinedOrTreeEdgeNearestScreenPoint(e.getX(), e.getY()), net, this));
	}

	public void mouseWheelMoved(MouseWheelEvent e) {
		zoom(e.getWheelRotation(), 1.1, e.isControlDown());
	}

	private void zoom(int wheelRotation, double factor, boolean moveCamera) {
		if (selectedEdge  == null || selectedEdge.isUnjoined()) {
			double zoomfactor = 1;
			if (wheelRotation < 0) {
				zoomfactor = 1/factor;
			}
			if (wheelRotation > 0) {
				zoomfactor = factor;
			}
			CameraTransform zoom;
			zoom = camera.zoom(zoomfactor, moveCamera);
			setCamera(zoom);
			return;
		}
		net.bumpAngleFor(selectedEdge, wheelRotation);
		foldedNet = angleFactory.fold(net, true);
		edgePositions = null;
		calculateEdgePositions();
		repaint();
	}

	/* (non-Javadoc)
	 * @see com.polytopemedia.polyhedra.ui.NetSource#getNet()
	 */
	public Net getNet() {
		return net;
	}
	
	
	
}
