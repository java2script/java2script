package test;

import java.util.TooManyListenersException;

public class JavaFiddle extends javax.swing.JFrame implements java.awt.dnd.DropTargetListener {

	
    public static void main(String[] args)
    {
      System.out.println("HelloWorld!");
      t = new Thread(() -> {
          runT();
      });
      t.start();
      try{
      Thread.sleep(6000);
      } catch (Exception e) {
          e.printStackTrace();
          
      }
      java.util.concurrent.locks.LockSupport.unpark(t);
    }


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
				testLong();
				// javax.swing.JOptionPane.showConfirmDialog(null, new
				// ThreadTest().delayedReturn("OK"));
				System.out.println("ok");
			}

		});
		return b;
	}

	protected void testLong() {
		long t0;
//		t0 = System.nanoTime();
//		for (int i = 0; i < 10000000; i++) {
//			i++;
//		}
//		System.out.println(System.nanoTime() - t0);
//	    t0 = System.nanoTime();
//		for (long i = 0; i < 10000000; i++) {
//			i++;
//		}
//		System.out.println(System.nanoTime() - t0);
		t0 = System.nanoTime();
		String s = "";
		for (int i = 0; i < 100000; i++) {
			s += " ";
		}
		System.out.println("cat " + ((System.nanoTime() - t0) / 1e9));
//		s = ""
//		StringBuffer sb = new StringBuffer();
//	    t0 = System.nanoTime();
//		for (int i = 0; i < 10000; i++) {
//			sb.append(" ");
//		}
//		s = sb.toString();
//		System.out.println(System.nanoTime() - t0);

// Java/Eclipse
//00.001453100
//00.003155300
//01.838415200 !Java String concatenation
//
// SwingJS
//00.008000000
//00.249000000 !long++
//00.007000000
//
//
//00.004000000
//00.259000000
//00.007000000
//00.009000000		

//
// alternative:
//SWING/AWT
//TEXT CONSOLE
//
//> Running...
//
//00.028000000
//00.203000064 !long++
//62.700000000 !!String concatenation!
//ok
//00.034999808
//00.254999808
//65.229000192
//ok
//00.035000064
//00.232999936
//65.128000000
//ok
//00.068000000
//00.193999872
//66.120000000
//ok
//00.036000256
//00.163000064
//68.228000000
//ok
//

// with StringBuffer:
//
//SWING/AWT
//TEXT CONSOLE
//
//> Running...
//
//00.027000064
//00.196999936
//61.617999872
//00.018000128
//ok

	}

	public JavaFiddle() {

		startFiddleFrame();

		setSize(new java.awt.Dimension(400, 400));
		// setPreferredSize(new java.awt.Dimension(400,400));
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
						String s = ">>>>>>>>>" + file.getName() + " - " + new String(data) + " " + dtde.getLocation()
								+ "\n";
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

	static private Thread t = null;

	public static void testPark() {
		System.out.println("HelloWorld!");
		t = new Thread(() -> {
			runT();
		});
		t.start();
		try {
			Thread.sleep(3000);
		} catch (Exception e) {

		}
		java.util.concurrent.locks.LockSupport.unpark(t);
	}

	private static void runT() {
		System.out.println("OK1");
		java.util.concurrent.locks.LockSupport.park(t);
		System.out.println("continuing");
	}
	
	public static void main2(String[] args) {
		testPark();
		if (true)return;
		JavaFiddle jf = new JavaFiddle();
		jf.setVisible(true);
		java.awt.dnd.DropTarget dt = new java.awt.dnd.DropTarget();
		try {
			dt.addDropTargetListener(jf);
		} catch (TooManyListenersException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		jf.setDropTarget(dt);
	}


}