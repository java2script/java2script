package swingjs;

import java.awt.AWTEvent;
import java.awt.ActiveEvent;
import java.awt.Component;
import java.awt.Point;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.Transferable;
import java.awt.datatransfer.UnsupportedFlavorException;
import java.awt.dnd.DnDConstants;
import java.awt.dnd.DropTarget;
import java.awt.dnd.DropTargetContext;
import java.awt.dnd.DropTargetDropEvent;
import java.awt.dnd.InvalidDnDOperationException;
import java.awt.dnd.peer.DropTargetContextPeer;
import java.awt.event.MouseEvent;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JComponent;

import swingjs.api.js.HTML5DataTransfer;

public class JSDnD {

	/**
	 * File-specific. Called from j2sApplet J2S.setDragDropTarget upon receiving file data.
	 * Called from j2sApplet J2S.setDragDropTarget if no file is indicated. 
	 * Automatically converts URLs to files -- for example, for directory listings.
	 * 
	 * @param jc
	 * @param name
	 * @param data
	 * @param x
	 * @param y
	 */
	public static void drop(JComponent jc, Object html5DataTransfer, String name, byte[] data, int x, int y) {
		if (html5DataTransfer == null)
			return;
		JSTransferable t = new JSTransferable(html5DataTransfer);
		if (name == null) {
			String url = (String) t.getTransferData("text/uri-list");
			if (url != null) {
				drop(jc, t, url, JSUtil.getFileAsBytes(url), x, y);
				return;
			}
		}
		DropTarget target = jc.getDropTarget();
		System.out.println("JSDnD drop for " +  jc.getUIClassID() + " target " + target);
		Point offset;
		if (target != null) {
		    offset = jc.getLocationOnScreen();
//		    if (name == null)
				target.drop(createDropEvent(target, t, name, data, x, y));
			return;
		}
	    Component top = jc.getTopLevelAncestor();
	    offset = top.getLocationOnScreen();
	    
	    System.out.println("JSDnD drop for " + jc.getUIClassID() + " offset " + x + " " + y + "  -"+ offset);
		
	    top.dispatchEvent(new JSDropMouseEvent(jc, MouseEvent.MOUSE_RELEASED, x 
	    		//- offset.x
	    		, y 
	    		//- offset.y
	    		, t, name, data));
	}

	public static void drop(JComponent jc, Object html5DataTransfer, Object[][] data, int x, int y) {
		if (html5DataTransfer == null)
			return;
		FileTransferable t = new FileTransferable(data);
		DropTarget target = jc.getDropTarget();
		System.out.println("JSDnD[] drop for " + jc.getUIClassID() + " target " + (target == null ? null : target.getClass().getName()));
		if (target != null) {
			target.drop(createDropEvent(target, t, data, x, y));
			return;
		}
		Component top = jc.getTopLevelAncestor();

		System.out.println("JSDnD drop for " + jc.getUIClassID() + " offset " + x + " " + y);

		top.dispatchEvent(new JSDropMouseEvent(jc, MouseEvent.MOUSE_RELEASED, x, y, t, null, null));
		
		t.files = null;
	}

	@SuppressWarnings("serial")
	public static class JSDropMouseEvent extends MouseEvent implements ActiveEvent {

	    public static final int MOUSE_DROPPED = MOUSE_RELEASED;
		private String name;
		private Transferable transferable;

	    public JSDropMouseEvent(Component source, int id, int x, int y, Transferable t, String name, byte[] data) {
	        super(source, id, System.currentTimeMillis(), 0, x, y, 0, false, NOBUTTON);
	        this.transferable = t;
	        this.name = name;
	        if (name != null)
	        	setBData(data);
	    }

	    public JSDropMouseEvent(Component target, int id, int x, int y) {
			this(target, id, x, y, null, null, null);
		}

		//	    public JSDropMouseEvent(Component source, int id, int x, int y, Transferable t, Object[][] data) {
//	        super(source, id, System.currentTimeMillis(), 0, x, y, 0, false, NOBUTTON);
//	        System.out.println("new JSDropMouseEvent for " + source);
//	        this.transferable = t;
//	        // 
//	        setBData((byte[]) (Object) data);
//	    }
//
	    protected void copyPrivateDataInto(AWTEvent that) {

	    	// in case this gets transferred. 
	    	JSDropMouseEvent e = (JSDropMouseEvent)that;
	    	e.transferable = transferable;
	    	e.name = name;
	    	e.bdata = bdata;
	    }
	    
	    /**
	     * The dispatch event causes this to be an ActiveEvent and run this
	     * method. 
	     * 
	     */
	    @Override
		public void dispatch() {
	    	try {
	    		DropTarget target = ((Component) getSource()).getDropTarget();
	    		if (name == null)
		    		target.drop(createDropEvent(target, transferable, null, null, getX(), getY()));	
	    		else
		    		target.drop(createDropEvent(target, transferable, name, getBData(), getX(), getY()));	    		
	    	} catch (Throwable e) {
	    		System.out.println("JSDnD Error creating Drop event "  + e);
	    	}
	    }

	    @Override
	    public void consume() {
	        super.consume();
	    }

	    @Override
	    public String paramString() {
	        String typeStr = null;

	        switch (id) {
	        case MOUSE_DROPPED:
	            typeStr = "MOUSE_DROPPED"; break;
	        default:
	            return super.paramString();
	        }
	        return typeStr + ",(" + getX() + "," + getY() + ")";
	    }

		public Transferable getDispatcher() {
			// TODO Auto-generated method stub
			return null;
		}

	}

	static DropTargetDropEvent createDropEvent(DropTarget target, Transferable t, Object[][] data, int x, int y) {
		DropTargetContext context = new DropTargetContext(target);
		context.addNotify(new JSDropTargetContextPeer(target, t, null, null));
		return new DropTargetDropEvent(context, new Point(x, y), DnDConstants.ACTION_MOVE, DnDConstants.ACTION_LINK | DnDConstants.ACTION_COPY_OR_MOVE);
	}

	static DropTargetDropEvent createDropEvent(DropTarget target, Transferable t, String name, byte[] data, int x, int y) {
		DropTargetContext context = new DropTargetContext(target);
		context.addNotify(new JSDropTargetContextPeer(target, t, name, data));	
		return new DropTargetDropEvent(context, new Point(x, y), DnDConstants.ACTION_MOVE, DnDConstants.ACTION_LINK | DnDConstants.ACTION_COPY_OR_MOVE);
	}

	static class JSDropTargetContextPeer implements DropTargetContextPeer {

		public JSDropTargetContextPeer (DropTarget target, Transferable t, String name, byte[] data) {
			this.target = target;
			transferable = (name == null ? t : new FileTransferable(name, data));
		}
		
		private Transferable transferable;
		private DropTarget target;

		@Override
		public void setTargetActions(int actions) {
		}

		@Override
		public int getTargetActions() {
			return DnDConstants.ACTION_COPY_OR_MOVE;
		}

		@Override
		public DropTarget getDropTarget() {
			// TODO Auto-generated method stub
			return target;
		}

		@Override
		public DataFlavor[] getTransferDataFlavors() {
			return transferable.getTransferDataFlavors();
		}

		@Override
		public Transferable getTransferable() throws InvalidDnDOperationException {
			return transferable;
		}

		@Override
		public boolean isTransferableJVMLocal() {
			return true;
		}

		@Override
		public void acceptDrag(int dragAction) {
		}

		@Override
		public void rejectDrag() {
		}

		@Override
		public void acceptDrop(int dropAction) {
		}

		@Override
		public void rejectDrop() {
		}

		@Override
		public void dropComplete(boolean success) {
		}
	}

	/**
	 * A class for representing HTML5 event.dataTransfer objects. 
	 * 
	 * @author hansonr
	 *
	 */
	public static class JSTransferable implements Transferable {

		HTML5DataTransfer dataTransfer;
		String[] mimeTypes;
		DataFlavor[] flavors;

		public JSTransferable() {
			// for dynamic loading;
		}
		
		public JSTransferable(Object html5DataTransfer) {
			set(html5DataTransfer);
		}
		
		public JSTransferable set(Object html5DataTransfer) {
			dataTransfer = (HTML5DataTransfer)html5DataTransfer;
			mimeTypes = /** @j2sNative html5DataTransfer && html5DataTransfer.types ||*/null;
			if (mimeTypes != null) {
				if (mimeTypes.length == 0) {
					// Chrome ver. 77 does this
					mimeTypes = new String[] {"application/x-java-file-list;class=java.util.List"};
					
				} else {
				String[] t = new String[mimeTypes.length];
				// check for valid mimeType syntax; make a normal String
				for (int i = 0; i < mimeTypes.length; i++)
					t[i] = (mimeTypes[i].equals("Files") ? "application/x-java-file-list;class=java.util.List" 
							: mimeTypes[i]);
				mimeTypes = t;
				}
			}
			return this;
		}

		@Override
		public DataFlavor[] getTransferDataFlavors() {
			return getFlavors();
		}

		private DataFlavor[] getFlavors() {
			if (flavors == null) {
				flavors = new DataFlavor[mimeTypes.length];
				for (int i = 0; i < mimeTypes.length; i++) {
					try {
						flavors[i] = new DataFlavor(mimeTypes[i]);
					} catch (ClassNotFoundException e) {
						e.printStackTrace();
					}					
				}
			}
			return flavors;
		}

		@Override
		public boolean isDataFlavorSupported(DataFlavor flavor) {
			String type = fixType(flavor.getMimeType());
			Object data = dataTransfer.getData(type);
			return (data != null && !data.equals(""));
		}

		public boolean isDataFlavorSupported(String mimeType) {
			Object data = dataTransfer.getData(fixType(mimeType));
			return (data != null && !data.equals(""));
		}

		@Override
		public Object getTransferData(DataFlavor flavor) throws UnsupportedFlavorException, IOException {
			Object data = dataTransfer.getData(fixType(flavor.getMimeType()));
			return (data == null || data.equals("") ? null : data);
		}

		public Object getTransferData(String mimeType) {
			Object data = dataTransfer.getData(fixType(mimeType));
			return (data == null || data.equals("") ? null : data);
		}
		
		private static String fixType(String s) {
			int i = s.indexOf(";");
			return (i < 0 ? s : s.substring(0, i)).trim();
		}

	}

	static public class FileTransferable extends JSTransferable {
		
		private List<File> files;
		
		public FileTransferable(String name, byte[] data) {
			super(null);
			files = new ArrayList<File>();
			addFile(name, data);
		}

		private static String temp = System.getProperty("java.io.tmpdir");
		
		private void addFile(String name, byte[] data) {
			File file = new File(temp + name);
			JSUtil.setFileBytesStatic(file, data);
			files.add(file);
		}

		public FileTransferable(Object[][] data) {
			super(null);
			files = new ArrayList<File>();
			for (int i = 0; i < data.length; i++) {
				addFile((String) data[i][0],(byte[]) data[i][1]);
			}
		}

		@Override
		public DataFlavor[] getTransferDataFlavors() {
			DataFlavor[] flavors = new DataFlavor[1];
			flavors[0] = DataFlavor.javaFileListFlavor;
			return flavors;
		}

		@Override
		public boolean isDataFlavorSupported(DataFlavor flavor) {
			return flavor.isFlavorJavaFileListType();
		}

		@Override
		public Object getTransferData(DataFlavor flavor) throws UnsupportedFlavorException, IOException {
			Object o = files;
			return o;
		}
		
	}

}
