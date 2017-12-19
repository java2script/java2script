package com.polytopemedia.polyhedra.ui;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.print.PageFormat;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JScrollPane;

import com.polytopemedia.polyhedra.print.PrintModel;
import com.polytopemedia.polyhedra.print.PrintableNet;


class PrintPreviewFactory implements ActionListener { 

	private final PrintPreview preview;
	private final PrintableNet printableNet;
	private final PageFormat pageFormat;
	private final Runnable print;


	public void actionPerformed(ActionEvent e) {
		String command = e.getActionCommand();
		if (command.equals("Print")) {
			print.run();
		}
		preview.previewDismissed();
	}

	
	PrintPreviewFactory(PrintPreview preview, PrintModel printModel,
			PrintableNet printableNet, PageFormat defaultPage, Runnable print) {
				this.preview = preview;
				this.printableNet = printableNet;
				this.pageFormat = defaultPage;
				this.print = print;
	}

	public List<JScrollPane> getPreviewPanels() {
		int numberOfPages = printableNet.getNumberOfPages(pageFormat);
		List<JScrollPane> rtn = new ArrayList<JScrollPane>();
		for (int i=0; i<numberOfPages; i++) {
			JPanel jp = new JPanel();
			PreviewPanel previewPanel = new PreviewPanel(printableNet, pageFormat, i);
			addButtonsTo(previewPanel);
			jp.add(previewPanel);
			JScrollPane jsp = new JScrollPane(jp);
			rtn.add(jsp);
		}
		return rtn;
	}

	private void addButtonsTo(PreviewPanel previewPanel) {
		addOneButton(previewPanel, "Print", "Print this net");
		addOneButton(previewPanel, "Cancel", "Cancel printing");
	}

	private void addOneButton(PreviewPanel previewPanel, String text,
			String tooltip) {
		JButton jb = new JButton(text);
		jb.setActionCommand(text);
		jb.addActionListener(this);
		jb.setToolTipText(tooltip);
		previewPanel.add(jb);
	}

}
