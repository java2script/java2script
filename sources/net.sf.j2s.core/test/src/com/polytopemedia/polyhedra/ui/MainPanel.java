package com.polytopemedia.polyhedra.ui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.print.PrinterJob;

import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
//import javax.swing.JTabbedPane;

import com.polytopemedia.polyhedra.nets.Edge;
import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.print.PrintModel;
import com.polytopemedia.polyhedra.print.PrintableNet;
import com.polytopemedia.polyhedra.ui.events.NetEvent;
import com.polytopemedia.polyhedra.ui.events.NetEventListener;
import com.polytopemedia.polyhedra.ui.events.NetEventType;
import com.polytopemedia.polyhedra.ui.events.PolygonPickerEvent;
import com.polytopemedia.polyhedra.ui.events.PolygonPickerListener;
import com.polytopemedia.polyhedra.ui.events.PrintModelListener;

public class MainPanel extends JPanel implements PolygonPickerListener,
		NetEventListener, PrintModelListener, PrintPreview {
	private JTabbedPane jtp;
	private Net net;
	private final Color bgColor;
	private final Color fgColor;
	private final MarkColors markColors;
	private final Color unjoinedEdgeColor;
	private FlatNetPanel flatNetPanel;
	private FoldedNetPanel foldedNetPanel;
	private PrintModel printModel;
	private final String name;

	public MainPanel(Color fgColor, Color bgColor, Color unjoinedEdgeColor,
			MarkColors markColors, Net net, String name) {
		this.fgColor = fgColor;
		this.bgColor = bgColor;
		this.unjoinedEdgeColor = unjoinedEdgeColor;
		this.markColors = markColors;
		this.name = name;
		this.setLayout(new BorderLayout());
		jtp = new JTabbedPane();
		JPanel jp1 = buildInitialPanel();
		JPanel jp2 = buildInitialPanel();
		jtp.add(jp1, "2D View", 0);
		jtp.add(jp2, "3D View", 1);
		this.add(jtp, "Center");

		JPanel controlPanel = new JPanel();
		polygonPicker = new PolygonPickerPanelArray(4, 3, unjoinedEdgeColor,
				bgColor);
		polygonPicker.addPolygonPickerListener(this);
		controlPanel.add(polygonPicker);
		this.add(controlPanel, "South");

		this.printModel = new PrintModel();
		printModel.addPrintModelListener(this);
		if (net != null) {
			this.net = net;
			createNetPanels(false);
		}
	}

	private JPanel buildInitialPanel() {
		JPanel jp = new JPanel();
		JButton button = new JButton("Please choose your first polygon below");
		jp.setLayout(new BorderLayout());
		button.setEnabled(false);
		jp.add(button, "Center");
		return jp;
	}

	public void polygonPicked(PolygonPickerEvent event, int index) {
		if (net == null) {
			net = new Net(event.getPolygon());
			createNetPanels(true);
		} else if (clickedEdge != null) {
			net.addPolygon(event.getPolygon(), clickedEdge);
			clickedEdge = null;
			remunge(true, true);
		}
	}

	private void createNetPanels(boolean autofoldAtStart) {

		flatNetPanel = new FlatNetPanel(net, bgColor, unjoinedEdgeColor, fgColor,
				markColors, printModel, name);
		foldedNetPanel = new FoldedNetPanel(net, bgColor, unjoinedEdgeColor,
				fgColor, markColors, printModel, name, autofoldAtStart);

		jtp.setComponentAt(0, flatNetPanel);
		jtp.setComponentAt(1, foldedNetPanel);

		flatNetPanel.addNetEventListener(this);
		foldedNetPanel.addNetEventListener(this);
	}

	private Edge clickedEdge;
	private Edge nearestEdge;
	private PolygonPickerPanelArray polygonPicker;

	public void netTouched(NetEvent netEvent) {
		NetEventType type = netEvent.getType();
		Edge edge = netEvent.getEdge();
		boolean isTreeEdge = edge != null && edge.isTreeEdge();
		switch (type) {
		case clicked:
			if (isTreeEdge) {
				return;
			}
			if (clickedEdge == null) {
				clickedEdge = edge;
				remunge(true, false);
				return;
			}
			if (clickedEdge == edge) {
				clickedEdge = null;
				remunge(true, false);
				return;
			}
			net.join(edge, clickedEdge);
			clickedEdge = null;
			remunge(true, true);
			return;
		case undo:
			net.undoLastAction();
		case auto:
			clickedEdge = null;
			remunge(true, true);
			return;
		case ctrl_clicked:
			if (isTreeEdge) {
				return;
			}
			net.addPolygon(polygonPicker.getPolygon(), edge);
			clickedEdge = null;
			remunge(true, true);
			return;
		case moved:
		case entered:
			if (nearestEdge == edge) {
				return;
			}
			nearestEdge = edge;
			remunge(true, false);
			return;
		default:
			break;
		}
	}

	private void remunge(boolean selectedEdgesChanged, boolean netChanged) {
		if (netChanged) {
			foldedNetPanel.setNet(net);
			flatNetPanel.setNet(net);
		}
		if (selectedEdgesChanged) {
			foldedNetPanel.setSelectedEdge(nearestEdge);
			foldedNetPanel.setClickedEdge(clickedEdge);
			flatNetPanel.setSelectedEdge(nearestEdge);
			flatNetPanel.setClickedEdge(clickedEdge);
		}
	}

	public void edgeLengthChanged(PrintModel printModel) {
		// do nothing
	}

	public void printingError(PrintModel printModel, Exception exception) {
		JOptionPane.showMessageDialog(this,
				"An error occurred while I was trying to print your net!",
				"Printing Error!", JOptionPane.ERROR_MESSAGE);
	}

	public void printDialogDismissed(PrintModel printModel,
			PrintableNet printableNet, PrinterJob printerJob, Runnable print) {
		PrintPreviewFactory printPreviewFactory = new PrintPreviewFactory(this,
				printModel, printableNet, printerJob.defaultPage(), print);
		int pageNumber = 1;
		int npages = printableNet.getNumberOfPages(); // BH method of Pageable
		lastSelectedIndex = jtp.getSelectedIndex();
		for (JScrollPane panel : printPreviewFactory.getPreviewPanels()) {
			this.jtp.add("Page " + pageNumber + " of " + npages, panel); // BH adding "of n" for pages, since we don't have tabs
			pageNumber++;
		}
		jtp.setSelectedIndex(2);
		jtp.setEnabledAt(0, false);
		jtp.setEnabledAt(1, false);
	}

	private int lastSelectedIndex;

	public void previewDismissed() {
		jtp.setEnabledAt(0, true);
		jtp.setEnabledAt(1, true);
		while (jtp.getTabCount() > 2) {
			jtp.remove(2);
		}
		jtp.setSelectedIndex(lastSelectedIndex);

	}

}
