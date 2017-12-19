package com.polytopemedia.polyhedra.ui;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.print.PageFormat;
import java.awt.print.PrinterException;

import javax.swing.JPanel;

import com.polytopemedia.polyhedra.print.PrintableNet;
import com.polytopemedia.polyhedra.utils.Utils;


class PreviewPanel extends JPanel { 

	private final int page;
	private final PageFormat pageFormat;
	private final PrintableNet printableNet;

	PreviewPanel(PrintableNet printableNet, PageFormat pageFormat, int page) {
		this.printableNet = printableNet;
		this.pageFormat = pageFormat;
		this.page = page;
		this.setBackground(Color.white);
		this.setPreferredSize(new Dimension(Utils.toInt(pageFormat.getWidth()), Utils.toInt(pageFormat.getHeight())));
	}
	
	public void paintComponent(Graphics gr) {
		super.paintComponent(gr);
		try {
			printableNet.print(gr, pageFormat, page);
		} catch (PrinterException e) {
		}
	}

}
