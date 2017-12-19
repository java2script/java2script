package com.polytopemedia.polyhedra.print;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.print.PageFormat;
import java.awt.print.Pageable;
import java.awt.print.Printable;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import com.polytopemedia.colorfactory.ColorFactory;
import com.polytopemedia.colorfactory.ImageColorFactory;
import com.polytopemedia.colorfactory.NetScaledPlanarColorFactory;
import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.nets.split.NetFragment;
import com.polytopemedia.polyhedra.nets.split.PaperToSpaceMap;
import com.polytopemedia.polyhedra.utils.Utils;
import com.polytopemedia.polyhedra.vec.LineSegment2D;
import com.polytopemedia.polyhedra.vec.Vector;
import com.polytopemedia.polyhedra.vec.Vector2D;

public class PrintableNet implements Printable, Pageable {

	private final Net net;
	private final double edgeLengthInches;
	private LinkedHashMap<PageFormat, FragmentedNet> fragments = new LinkedHashMap<PageFormat, FragmentedNet>();
	private final float lineThickness;
	private final ColorFactory colors;
	private final boolean lineLabelsIn;
	private final float fontScale;
	private PrinterJob job;
	private FragmentedNet fragmentedNet;
	public PrintableNet(Net net, double edgeLengthInches, float lineThickness, ColorFactory colors, boolean lineLabelsIn, float fontScale) {
		this.net = net;
		this.edgeLengthInches = edgeLengthInches;
		this.lineThickness = lineThickness;
		this.colors = colors;
		this.lineLabelsIn = lineLabelsIn;
		this.fontScale = fontScale;
	}
	
	public PrintableNet(Net net, double edgeLengthInches) {
		this(net,edgeLengthInches, 2f, null, true, 1f);
	}

	public PrintableNet(PrinterJob job, Net net, double edgeLengthInches, URL imageURL) throws IOException {
		this(net, edgeLengthInches, 2f, imageURL == null ? null : new NetScaledPlanarColorFactory(new ImageColorFactory(imageURL, Color.green), net, new Vector(1,0,0), new Vector(0,1,0)), false, 1f);
		this.job = job;
	}
	
	public int print(Graphics graphics, PageFormat pageFormat, int pageIndex)
			throws PrinterException {
		Graphics2D gr = (Graphics2D)graphics;
		if (fragmentedNet == null)
			fragmentedNet = getFragmentedNet(pageFormat);
 		NetFragment page = getNetFragment(pageIndex, fragmentedNet);
		if (page == null) {
			return NO_SUCH_PAGE;
		}
		List<Label> labels = new ArrayList<Label>();
		LinkedHashMap<LineSegment2D, LineType> lines = new LinkedHashMap<LineSegment2D, LineType>();
		fragmentedNet.findLinesAndLabels(lines, labels, page, lineLabelsIn);
		gr.setColor(Color.black);
		gr.setFont(gr.getFont().deriveFont(Font.BOLD, fontScale*gr.getFont().getSize2D()));
		for (boolean drawCertain : new boolean[] {false, true}) {
			for (Label label : labels) {
				FontMetrics fm   = gr.getFontMetrics();
				java.awt.geom.Rectangle2D rect = fm.getStringBounds(label.getText(), gr);

				double textHeight = rect.getHeight(); 
				double textWidth  = rect.getWidth();
				boolean certain = label.hasMatching();
				if (certain) {
					gr.setColor(labelColor);
				} else {
					gr.setColor(uncertainColor);
				}
				if (certain == drawCertain) {
					gr.drawString(label.getText(), Utils.toInt(label.getX()-textWidth/2), Utils.toInt(label.getY()+textHeight/2));
				}
			}
			gr.setStroke(new BasicStroke(lineThickness));
			for (LineSegment2D line : lines.keySet()) {
				LineType type = lines.get(line);
				Vector2D end = line.getEnd();
				Vector2D start = line.getStart();
				int x1 = Utils.toInt(start.getFirst());
				int y1 = Utils.toInt(start.getSecond());
				int x2 = Utils.toInt(end.getFirst());
				int y2 = Utils.toInt(end.getSecond());
				gr.setColor(getPrintColor(type));
				boolean certain = !type.equals(LineType.unmatchedTab);
				if (certain == drawCertain) {
					gr.drawLine(x1, y1, x2, y2);
				}
			}
		}
		if (colors != null) {
			PaperToSpaceMap[] maps = page.getPolygonsToColor();
			for (PaperToSpaceMap map : maps) {
				map.paint(gr, colors); // TODO : change to map.paint(gr, colors);
			}
		}
		// TODO - delete from here,,,,
		gr.setColor(Color.black);
		gr.setStroke(new BasicStroke(lineThickness));
		for (LineSegment2D line : lines.keySet()) {
			LineType type = lines.get(line);
			Vector2D end = line.getEnd();
			Vector2D start = line.getStart();
			int x1 = Utils.toInt(start.getFirst());
			int y1 = Utils.toInt(start.getSecond());
			int x2 = Utils.toInt(end.getFirst());
			int y2 = Utils.toInt(end.getSecond());
			gr.setColor(getPrintColor(type));
			if (type.equals(LineType.edge)) {
				gr.drawLine(x1, y1, x2, y2);
			}
		}
		if (colors != null) {
			PaperToSpaceMap[] maps = page.getPolygonsToColor();
			for (PaperToSpaceMap map : maps) {
				map.paint(gr, colors); // TODO : change to map.paint(gr, colors);
			}
		}
		// ,,,, until here
		return PAGE_EXISTS;
	}

	private Color uncertainColor = Color.white;//new Color(196,196,196);
	private Color tabColor = new Color(128,128,128);
	private Color lineColor = Color.black;
	private Color labelColor = new Color(128,128,128);
	private Color getPrintColor(LineType type) {
		switch (type) {
		case edge:
			return lineColor;
		case tab:
			return tabColor;
		case unmatchedTab :
			return uncertainColor;
		}
		return uncertainColor;
	}

	private NetFragment getNetFragment(int pageIndex,
			FragmentedNet fragmentedNet) {
		if (pageIndex<0 || pageIndex >= fragmentedNet.fragmentCount()) {
			return null;
		}
		return fragmentedNet.getFragment(pageIndex);
	}

	private FragmentedNet getFragmentedNet(PageFormat pageFormat) {
		if (!fragments.containsKey(pageFormat)) {
			fragments.put(pageFormat, new FragmentedNet(net, pageFormat, edgeLengthInches));
		}
		FragmentedNet fragmentedNet = fragments.get(pageFormat);
		return fragmentedNet;
	}

	public int getNumberOfPages(PageFormat pageFormat) {
		return getFragmentedNet(pageFormat).fragmentCount();
	}

	@Override
	public int getNumberOfPages() {
		if (fragmentedNet == null)
			fragmentedNet = getFragmentedNet(job.defaultPage());
		return fragmentedNet.fragmentCount();
	}

	@Override
	public PageFormat getPageFormat(int page) throws IndexOutOfBoundsException {
		return job.defaultPage();
	}

	@Override
	public Printable getPrintable(int page) throws IndexOutOfBoundsException {
		return this;
	}

}
