package test;

public class JavaFiddle extends javax.swing.JFrame implements java.awt.dnd.DropTargetListener {

	java.awt.dnd.DropTarget target;

	public class ThreadTest {
		
		public String delayedReturn(String s) {
			
			try {
				Thread.sleep(5000);
			} catch (InterruptedException e) {
				return e.getMessage();
			}
			return s;
			
		}
	}

	private javax.swing.JButton newTestButton() {
		javax.swing.JButton b = new javax.swing.JButton("testing");
		b.addActionListener(new java.awt.event.ActionListener() {

			@Override
			public void actionPerformed(java.awt.event.ActionEvent e) {				
				javax.swing.JOptionPane.showConfirmDialog(null, new ThreadTest().delayedReturn("OK"));
				System.out.println("ok");
			}
			
		});
		return b;
	}


	public JavaFiddle() {
		
		startFiddleFrame();
		
		setSize(new java.awt.Dimension(400,400));
		//setPreferredSize(new java.awt.Dimension(400,400));
			setTransferHandler(new javax.swing.TransferHandler() {
			
			  @Override
			  public boolean canImport(javax.swing.TransferHandler.TransferSupport support) {
				  return true;
			  }


			@Override
			public boolean importData(javax.swing.TransferHandler.TransferSupport support) {
				System.out.println(support.getComponent());
				java.awt.datatransfer.Transferable tr = support.getTransferable();
				java.awt.datatransfer.DataFlavor[] flavors = tr.getTransferDataFlavors();
				try {
					for (int i = 0; i < flavors.length; i++) {
						if (flavors[i].isFlavorJavaFileListType()) {
							java.util.List<java.io.File> list = null;
							list = (java.util.List<java.io.File>) tr.getTransferData(flavors[i]);
							for (int j = 0; j < list.size(); j++) {
								java.io.File file = (java.io.File) list.get(j);
								byte[] data = getDroppedFileBytes(file);
								String s = ">>>>>>>>>" + file.getName() + " - " + new String(data) + " "
										+ support.getDropLocation() + "\n";
								System.out.println(s);
							}
							return true;
						} else if (flavors[i].isFlavorTextType()) {
							String data = (String) tr.getTransferData(flavors[i]);
							System.out.println(data);
							return true;
						}
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return false;
			}	
			  
		});

	}

	private void startFiddleFrame() {
		
		javax.swing.JFrame f = new javax.swing.JFrame();
		f.setLocation(400, 400);
		f.add(newTestButton());
		f.pack();
		f.setVisible(true);
	}
	@Override
	public void dragEnter(java.awt.dnd.DropTargetDragEvent dtde) {		
	}

	@Override
	public void dragOver(java.awt.dnd.DropTargetDragEvent dtde) {
	}

	@Override
	public void dropActionChanged(java.awt.dnd.DropTargetDragEvent dtde) {
	}
	
	
	@Override
	public void drop(java.awt.dnd.DropTargetDropEvent dtde) {
		
		try {
			java.awt.datatransfer.Transferable tr = dtde.getTransferable();
			Object target = ((java.awt.dnd.DropTarget) dtde.getSource()).getComponent();			
			java.awt.datatransfer.DataFlavor[] flavors = tr.getTransferDataFlavors();
			for (int i = 0; i < flavors.length; i++) {
				if (flavors[i].isFlavorJavaFileListType()) {
					dtde.acceptDrop(java.awt.dnd.DnDConstants.ACTION_COPY_OR_MOVE);
					java.util.List<java.io.File> list = (java.util.List<java.io.File>) tr.getTransferData(flavors[i]);
					for (int j = 0; j < list.size(); j++) {
						java.io.File file = (java.io.File) list.get(j);
						byte[] data = getDroppedFileBytes(file);
						String s = ">>>>>>>>>"+ file.getName() + " - " + new String(data) + " " + dtde.getLocation() + "\n";	
						System.out.println(s + new String(data));
					}
					dtde.dropComplete(true);					
					return;
				} else if (flavors[i].isFlavorTextType()) {
					dtde.acceptDrop(java.awt.dnd.DnDConstants.ACTION_COPY_OR_MOVE);
					String data = (String) tr.getTransferData(flavors[i]);
					System.out.println(data);
					dtde.dropComplete(true);					
				}
			}
			dtde.rejectDrop();
		} catch (Exception e) {
			e.printStackTrace();
			dtde.rejectDrop();
		}
	}

	private byte[] getDroppedFileBytes(java.io.File file) {
				return new String("file bytes " + file.length()).getBytes();
	}

	@Override
	public void dragExit(java.awt.dnd.DropTargetEvent dte) {
	}

	public static void main(String[] args) {
		new JavaFiddle().setVisible(true);
	}
} 