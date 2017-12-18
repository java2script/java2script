package com.polytopemedia.polyhedra.print;

import java.awt.print.PrinterJob;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.print.attribute.Attribute;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.standard.PageRanges;
import javax.swing.JOptionPane;

import com.polytopemedia.PolyhedronApplet;
import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.ui.events.PrintModelListener;

public class PrintModel {
	
	private double edgeLengthInches=1;
	private URL imageURL = null;
	private List<PrintModelListener> listeners = new ArrayList<PrintModelListener>();
	
	public void print(Net net) {
		final PrinterJob job = PrinterJob.getPrinterJob(); // BH javascript will return swingjs.JSPrinterJob extends gnu.jpdf.PDFJob
		PrintableNet pnet;
		try {
			pnet = new PrintableNet(job, net, edgeLengthInches, imageURL);
		} catch (IOException e) {
			JOptionPane.showMessageDialog(null, "I couldn't read an image from "+imageURL, "Error!", JOptionPane.ERROR_MESSAGE);
			e.printStackTrace();
			return;
		}
		// BH Pageable allows for getting the correct number of pages in the dialog
		job.setPageable(pnet);
		// BH just trying to get the page range selection option working -- giving up!
		//		int pageCount = pnet.getNumberOfPages(); 
		//		PrintRequestAttributeSet attributes = new HashPrintRequestAttributeSet();
		//		attributes.add(new PageRanges("1,2,4"));		
		//		if (job.printDialog(attributes)) {
		if (job.printDialog()) { // BH in JavaScript this will bypass any actual dialog
			firePrintDialogDismissed(this,pnet,job,
			new Runnable() {
				public void run() {
					try {
						job.print(); // BH gnu.jpdf.PrinterJob will request a file name here using JFileChooser.showFileSaveDialog()
					} catch (Exception ex) {
						ex.printStackTrace();
						firePrintingError(ex);
					}
				}
			});
		} 
	}

	private void firePrintDialogDismissed(PrintModel printModel, PrintableNet printableNet,
			PrinterJob printerJob, Runnable print) {
		for (PrintModelListener listener : listeners) {
			listener.printDialogDismissed(printModel, printableNet, printerJob, print);
		}
	}

	private void firePrintingError(Exception ex) {
		for (PrintModelListener listener : listeners) {
			listener.printingError(this,ex);
		}
	}
	
	public double getEdgeLengthInches() {
		return edgeLengthInches;
	}
	
	public double getEdgeLengthCentimetres() {
		return edgeLengthInches*2.54;
	}
	
	public void setEdgeLengthInches(double edgeLengthInches) {
		if (this.edgeLengthInches != edgeLengthInches){
			this.edgeLengthInches = edgeLengthInches;
			fireEdgeLengthChanged();
		}
	}

	public void setImageURL(URL url) {
		this.imageURL = url;
	}

	public void setImageFile(File file) {
		try {
			this.imageURL = file.toURI().toURL();
		} catch (MalformedURLException e) {
			JOptionPane.showMessageDialog(null, "I couldn't understand the filename "+file.getAbsolutePath(), "Error!", JOptionPane.ERROR_MESSAGE);
		}
	}

	private void fireEdgeLengthChanged() {
		for (PrintModelListener listener : listeners) {
			listener.edgeLengthChanged(this);
		}
	}

	public void addPrintModelListener(PrintModelListener listener) {
		listeners.add(listener);
	}
	
}
