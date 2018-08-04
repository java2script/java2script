package test;

import java.awt.BorderLayout;
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
import java.io.File;
import java.util.List;

import javax.swing.JApplet;
import javax.swing.JCheckBox;
import javax.swing.JLabel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

@SuppressWarnings("serial")
public class Test_Applet_DropFile extends JApplet implements DropTargetListener {

    JLabel fileName = new JLabel();
	DropTarget target;

    @Override
	public void init() {
		
		fileName.setSize(500, 20);
		JScrollPane fileDataPane = new JScrollPane();
		fileDataPane.setSize(500, 500);
		JTextArea fileData = new JTextArea();
		fileDataPane.getViewport().add(fileData);
		fileName.setText("drag-drop a file into this applet");
		getContentPane().add(fileName, BorderLayout.NORTH);
		getContentPane().add(fileDataPane, BorderLayout.CENTER);
		JCheckBox b = new JCheckBox("testing");
		b.addActionListener(new ActionListener(){

			@Override
			public void actionPerformed(ActionEvent e) {
				/**
				 * @j2sNative
				 * 
				 * alert("OK");
				 */
				
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
	
	
	@SuppressWarnings("unchecked")
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
					}
					dtde.dropComplete(true);
					return;
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
			return null;
		}
	}

	@Override
	public void dragExit(DropTargetEvent dte) {
	}

} 