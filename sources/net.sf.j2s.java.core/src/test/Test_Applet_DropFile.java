package test;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.Transferable;
import java.awt.dnd.DnDConstants;
import java.awt.dnd.DropTarget;
import java.awt.dnd.DropTargetDragEvent;
import java.awt.dnd.DropTargetDropEvent;
import java.awt.dnd.DropTargetEvent;
import java.awt.dnd.DropTargetListener;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import javax.swing.JApplet;
import javax.swing.JCheckBox;
import javax.swing.JLabel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.ScrollPaneConstants;

import javajs.util.Rdr;

public class Test_Applet_DropFile extends JApplet implements DropTargetListener {

    JLabel fileName = new JLabel();
	DropTarget target;

    @Override
	public void init() {
		
		//fileName.setSize(500, 20);
		JScrollPane fileDataPane = new JScrollPane() {
		};
		JTextArea fileData = new JTextArea();
		fileData.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 12));
		fileDataPane.getViewport().add(fileData);
// no size preferences make any difference at all for the scrollpane or the viewport..
		// 		fileDataPane.getViewport().setPreferredSize(new Dimension(50,50));
		
		fileDataPane.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		fileDataPane.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED);

		
		fileName.setText("drag-drop a file into this applet");
		getContentPane().add(fileName, BorderLayout.NORTH);
		getContentPane().add(fileDataPane, BorderLayout.CENTER);
		JCheckBox b = new JCheckBox("wrap");
		b.addActionListener(new ActionListener(){

			@Override
			public void actionPerformed(ActionEvent e) {
				fileData.setLineWrap(!fileData.getLineWrap());
			}
			
		});
		getContentPane().add(b, BorderLayout.SOUTH);
		target = new DropTarget(fileData, this);
	}

	@Override
	public void dragEnter(DropTargetDragEvent dtde) {		
	}

	@Override
	public void dragOver(DropTargetDragEvent dtde) {
	}

	@Override
	public void dropActionChanged(DropTargetDragEvent dtde) {
	}
	
	
	@Override
	public void drop(DropTargetDropEvent dtde) {
		
		try {
			Transferable tr = dtde.getTransferable();
			DataFlavor[] flavors = tr.getTransferDataFlavors();
			for (int i = 0; i < flavors.length; i++) {
				if (flavors[i].isFlavorJavaFileListType()) {
					dtde.acceptDrop(DnDConstants.ACTION_COPY_OR_MOVE);
					List<File> list = (List<File>) tr.getTransferData(flavors[i]);
					for (int j = 0; j < list.size(); j++) {
						File file = (File) list.get(j);
						byte[] data = getDroppedFileBytes(file);
						fileName.setText(file.getName() + " - " + data.length + " " + dtde.getLocation());
						JTextArea target = (JTextArea) ((DropTarget) dtde.getSource()).getComponent();
						target.setText(new String(data));						
						System.out.println("prefsize " + target.getPreferredSize());
					}
					dtde.dropComplete(true);					
					return;
				} else if (flavors[i].isFlavorTextType()) {
					dtde.acceptDrop(DnDConstants.ACTION_COPY_OR_MOVE);
					String data = (String) tr.getTransferData(flavors[i]);
					JTextArea target = (JTextArea) ((DropTarget) dtde.getSource()).getComponent();
					target.setText(data);
					dtde.dropComplete(true);					
				}
			}
			dtde.rejectDrop();
		} catch (Exception e) {
			e.printStackTrace();
			dtde.rejectDrop();
		}
	}

	private byte[] getDroppedFileBytes(File file) {
		/**
		 * @j2sNative
		 * return file._bytes;
		 */
		{
			try {
				return (byte[]) Rdr.getStreamAsBytes(new BufferedInputStream(new FileInputStream(file)), null);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		}
	}

	@Override
	public void dragExit(DropTargetEvent dte) {
	}

} 