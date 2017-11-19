package com.polytopemedia.polyhedra.ui;

import java.awt.Color;
import java.awt.Component;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;

import com.polytopemedia.polyhedra.print.PrintModel;
import com.polytopemedia.polyhedra.ui.io.FileUtils;
import com.polytopemedia.polyhedra.ui.io.ImageFileFilter;
import com.polytopemedia.polyhedra.ui.io.JSCallback;

class PrintComponentFactory {

	private final PrintModel printModel;
	private final NetSource netPanel;

	PrintComponentFactory(PrintModel printModel, NetSource netPanel) {
		this.printModel = printModel;
		this.netPanel = netPanel;
	}

// BH -- the issue here is that we don't want to be loading unnecessary classes in JavaScript
	
// private static JFileChooser jfc = new JFileChooser();
//	static {
//		jfc.setFileFilter(new ImageFileFilter());
//	}

//	private static JFileChooser jfc;
//	
//	private static JFileChooser getFileChooser() {
//		// NOT USED?
//		if (jfc == null) {
//			jfc = new JFileChooser();
//			jfc.setFileFilter(new ImageFileFilter());
//		}			
//		return jfc;
//	}

	public List<Component> getComponents() {
		List<Component> rtn = new ArrayList<Component>();
		
		JButton overlay = new JButton("Choose Overlay");
		overlay.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent arg0) {
				final JSCallback cb = new JSCallback();
				cb.setRunnable(new Runnable() {
					public void run() {
						printModel.setImageFile((File) cb.getData());
					}
				});
				File file = FileUtils.getFile(new ImageFileFilter(), cb, false);
				if (file != null) {
					printModel.setImageFile(file);
				}
			}
		});
		overlay.setToolTipText("select image file to overlay on your net");
		if (FileUtils.canAccessFileSystem()) {
			rtn.add(overlay);
		}
		
		JButton print = new JButton("Print Preview");
		print.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				printModel.print(netPanel.getNet());
			}
		});
		print.setToolTipText("Get ready to print this fold-out net");
		rtn.add(print);
		
		JSpinner inchSpinner = new JSpinner(new SpinnerNumberModel(1, 0.2, 10, 0.05));
		JSpinner cmSpinner = new JSpinner(new SpinnerNumberModel(2.5, 0.5, 25.4, 0.1));
		inchSpinner.addChangeListener(new SpinnerSyncher(inchSpinner, cmSpinner, 2.54, printModel, 1));
		cmSpinner.addChangeListener(new SpinnerSyncher(cmSpinner, inchSpinner, 1/2.54, printModel, 1/2.54));
		inchSpinner.setToolTipText("The length of each edge, in inches");
		cmSpinner.setToolTipText("The length of each edge, in cm");
		rtn.add(newJLabel("Edge Length : "));
		rtn.add(inchSpinner);
		rtn.add(newJLabel("inches = "));
		rtn.add(cmSpinner);
		rtn.add(newJLabel("cm."));
		return rtn;
	}

	private JLabel newJLabel(String text) {
		JLabel rtn = new JLabel(text);
		rtn.setForeground(Color.white);
		return rtn;
	}

}
