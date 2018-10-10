package a2s;

import java.awt.GraphicsConfiguration;
import java.awt.Window;

import javax.swing.JDialog;

public class Dialog extends JDialog {

     public Dialog(java.awt.Frame owner) {
    	 super(owner);
     }

     public Dialog(Frame owner) {
    	 super(owner);
     }

     public Dialog(java.awt.Frame owner, boolean modal) {
         super(owner, modal);
     }

     public Dialog(Frame owner, boolean modal) {
         super(owner, modal);
     }

     public Dialog(java.awt.Frame owner, String title) {
         super(owner, title);
     }

     public Dialog(Frame owner, String title) {
         super(owner, title);
     }

     public Dialog(java.awt.Frame owner, String title, boolean modal) {
         super(owner, title, modal);
     }

     public Dialog(Frame owner, String title, boolean modal) {
         super(owner, title, modal);
     }

     public Dialog(java.awt.Frame owner, String title, boolean modal,
                   GraphicsConfiguration gc) {
    	 super(owner, title, modal, gc);
     }

     public Dialog(Frame owner, String title, boolean modal,
             GraphicsConfiguration gc) {
    	 super(owner, title, modal, gc);
     }

     public Dialog(java.awt.Dialog owner) {
    	 super(owner);
     }

     public Dialog(Dialog owner) {
    	 super(owner);
     }

     public Dialog(java.awt.Dialog owner, String title) {
         super(owner, title, false);
     }

     public Dialog(Dialog owner, String title) {
         super(owner, title, false);
     }

	public Dialog(java.awt.Dialog owner, String title, boolean modal) {
         super(owner, title, modal);
     }

	public Dialog(Dialog owner, String title, boolean modal) {
        super(owner, title, modal);
    }

     public Dialog(java.awt.Dialog owner, String title, boolean modal,
                   GraphicsConfiguration gc) {
         super(owner, title, modal, gc);
     }

	public Dialog(Dialog owner, String title, boolean modal, GraphicsConfiguration gc) {
		super(owner, title, modal, gc);
	}

    public Dialog(Window owner) {
        super(owner);
    }

    public Dialog(Window owner, String title) {
        super(owner, title);
    }

    public Dialog(Window owner, java.awt.Dialog.ModalityType modalityType) {
        super(owner, modalityType);
    }

    public Dialog(Window owner, String title, java.awt.Dialog.ModalityType modalityType) {
        super(owner, title, modalityType);
    }

    public Dialog(Window owner, String title, java.awt.Dialog.ModalityType modalityType,
                  GraphicsConfiguration gc) {
        super(owner, title, modalityType, gc);
    }


}
