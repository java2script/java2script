package com.polytopemedia.polyhedra.ui.events;

import java.awt.print.PrinterJob;

import com.polytopemedia.polyhedra.print.PrintModel;
import com.polytopemedia.polyhedra.print.PrintableNet;

public interface PrintModelListener {

	public void edgeLengthChanged(PrintModel printModel);

	public void printingError(PrintModel printModel, Exception exception);

	public void printDialogDismissed(PrintModel printModel,	PrintableNet printableNet, PrinterJob printerJob, Runnable print);
	
}
