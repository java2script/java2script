package swingjs;

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
import java.io.IOException;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.swing.JComponent;

public class JSDnD {

	public static void drop(JComponent jc, String name, byte[] data, int x, int y) {
		DropTarget target = jc.getDropTarget();
		Point offset;
		if (target != null) {
		    offset = jc.getLocationOnScreen();
			target.drop(JSDnD.createFileDropEvent(target, name, data, x, y));
			return;
		}
	    Component top = jc.getTopLevelAncestor();
	    offset = top.getLocationOnScreen();
	    top.dispatchEvent(new JSDropFileMouseEvent(jc, MouseEvent.MOUSE_RELEASED, x - offset.x, y - offset.y, name, data));
	}
		

	@SuppressWarnings("serial")
	static abstract class JSDropTargetEvent extends MouseEvent {
		
		protected JSDropTargetEvent(Component source, int id, long when, int modifiers, int x, int y, int clickCount) {
			super(source, id, when, modifiers, x, y, clickCount, false, NOBUTTON);
		}
		
		public abstract void dispatch();

	}

	@SuppressWarnings("serial")
	public static class JSDropFileMouseEvent extends JSDropTargetEvent {

	    public static final int MOUSE_DROPPED = MOUSE_RELEASED;
		private String name;

	    public JSDropFileMouseEvent(Component source, int id, int x, int y, String name, byte[] data) {
	        super(source, id, System.currentTimeMillis(), 0, x, y, 0);
	        this.name = name;
	        setBData(data);
	    }

	    @Override
	    public void dispatch() {
	    	try {
	    		DropTarget target = ((Component) getSource()).getDropTarget();
	    		target.drop(JSDnD.createFileDropEvent(target, name, getBData(), getX(), getY()));	    		
	    	} catch (Throwable e) {
	    		System.out.println("Error creating Drop event "  + e);
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

	}

	static DropTargetDropEvent createFileDropEvent(DropTarget target, String name, byte[] data, int x, int y) {
		DropTargetContext context = new DropTargetContext(target);
		context.addNotify(new FileDropTargetContextPeer(target, name, data));
		
		return new DropTargetDropEvent(context, new Point(x, y), DnDConstants.ACTION_MOVE, DnDConstants.ACTION_LINK | DnDConstants.ACTION_COPY_OR_MOVE);
	}

	static class FileDropTargetContextPeer implements DropTargetContextPeer {

		public FileDropTargetContextPeer (DropTarget target, String name, byte[] data) {
			this.target = target;
			fileTransferable = new FileTransferable(name, data);
		}
		
		private Transferable fileTransferable;
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
			return fileTransferable.getTransferDataFlavors();
		}

		@Override
		public Transferable getTransferable() throws InvalidDnDOperationException {
			return fileTransferable;
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
	
	static public class FileTransferable implements Transferable {
		
		private JSFileBytes file;
		
		public FileTransferable(String name, byte[] data) {
			file = new JSFileBytes(name, data);
			JSUtil.cacheFileData(name, data);
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
			List<JSFileBytes> list = new ArrayList<JSFileBytes>();
			list.add(file);
			return list;
		}
		
	}


}
