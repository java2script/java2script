package test;

import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.Color;
import java.awt.Dialog;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Frame;
import java.awt.GridLayout;
import java.awt.Label;
import java.awt.Panel;
import java.awt.TextArea;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.File;

import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JColorChooser;
import javax.swing.JDialog;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.plaf.UIResource;

public class Test_Dialog extends JFrame implements PropertyChangeListener {

	public static int ii;

	public static Object o = new Object();
	public static Color c = new Color(1, 2, 3);

	@Override
	public void propertyChange(PropertyChangeEvent event) {
		Object val = event.getNewValue();
		String name = event.getPropertyName();
		System.out.println(name);
		switch (event.getSource().getClass().getName()) {
		case "javax.swing.JOptionPane":
			switch (name) {
			case "inputValue":
				onDialogReturn(val);
				return;
			case "value":
				if (val instanceof Integer)
					onDialogReturn(((Integer) val).intValue());
				else
					onDialogReturn(val);
				return;
			}
			break;
		case "javax.swing.ColorChooserDialog":
			switch (name) {
			case "SelectedColor":
				onDialogReturn(val);
				return;
			}
			break;
		case "javax.swing.JFileChooser":
			switch (name) {
			case "SelectedFiles":
				File[] files = (File[]) val;
				long[] len = new long[files.length];
				for (int i = 0; i < files.length; i++) {
					len[i] = files[i].length();
				}
				onDialogReturn(files.length + " files read sizes=" + len);
				return;
			case "SelectedFile":
				File file = (File) val;
				byte[] array = (val == null ? null : /** @j2sNative file.秘bytes || */
						null);
				lastFile = file.getName();
				onDialogReturn("fileName is '" + lastFile + " size=" + array.length);
				return;
			}
			break;
		}
		System.out.println(
				event.getSource().getClass().getName() + " " + event.getPropertyName() + ": " + event.getNewValue());
	}

	// JSComponent.DialogCaller interface
	public void onDialogReturn(int value) {	
		if (value != Math.floor(value))
			return; // in JavaScript, this will be NaN
		System.out.println("int value is " + value);
		
	status.setText("You chose option " + value);
	}

	// JSComponent.DialogCaller interface
	public void onDialogReturn(Object value) {
		if (value == null || value instanceof UIResource)
			return;
		if (value instanceof Color) {
			colorButton.setBackground((Color) value);
		}
			
		status.setText(value.toString());
	}

	JLabel status;

	private JButton colorButton;

	private String lastFile = "";
	
	public Test_Dialog() {
		super();
		this.setTitle("testing dialogs");

		JPanel m = new JPanel(new GridLayout());
		status = new JLabel("testing");
		m.add(status, null);
		add(m, BorderLayout.SOUTH);

		JPanel p = new JPanel();
		p.setLayout(new BoxLayout(p, BoxLayout.X_AXIS));
		add(p, BorderLayout.CENTER);
		this.setLocation(300, 300);
		JButton b;

		b = new JButton("ConfirmDialog");
		final JPanel content = new JPanel();
		content.setLayout(new BorderLayout());
		content.add(new JLabel("this is the option panel"), BorderLayout.CENTER);
		b.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				Test_Dialog.this.onDialogReturn(JOptionPane.showConfirmDialog(Test_Dialog.this,
						"<html>The frame is now " + (isResizable() ? "<b>NOT</b> " : "") + "resizable.</html>",
						"Testing JOptionPane", JOptionPane.OK_CANCEL_OPTION));
				setResizable(!isResizable());
			}

		});
		p.add(b);

		b = new JButton("Message1");
		final JPanel message = new JPanel();
		message.setLayout(new BorderLayout());
		message.add(new JLabel("this is the message panel"), BorderLayout.CENTER);
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				JOptionPane.showMessageDialog(Test_Dialog.this, message, "title", JOptionPane.WARNING_MESSAGE);
				System.out.println("continuing1");
			}

		});
		p.add(b);

		b = new JButton("Message2");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				JOptionPane.showMessageDialog(Test_Dialog.this, "message", "title", JOptionPane.ERROR_MESSAGE);
				System.out.println("continuing2");
			}

		});
		p.add(b);

		
		b = new JButton("InputDialog");
		final JPanel input = new JPanel();
		input.setLayout(new BorderLayout());
		input.add(new JLabel("this is the input panel"), BorderLayout.CENTER);
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				Test_Dialog.this.onDialogReturn(JOptionPane.showInputDialog(Test_Dialog.this, input));
			}

		});
		p.add(b);


		b = new JButton("OptionDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				Test_Dialog.this.onDialogReturn(JOptionPane.showOptionDialog(Test_Dialog.this, "Pick one of the following three options:", "Option title",
						0, 0, null, new Object[] {"Option A", "Option B", "Option C"} , "Option B"));
			}

		});
		p.add(b);

		
		b = new JButton("FileOpenDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				JFileChooser fc = new JFileChooser();
				fc.setSelectedFile(new File(lastFile));
				onDialogReturn(fc.showOpenDialog(Test_Dialog.this));
			}

		});
		p.add(b);

		b = new JButton("FilesOpenDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				JFileChooser fc = new JFileChooser();
				fc.setMultiSelectionEnabled(true);
				onDialogReturn(fc.showOpenDialog(Test_Dialog.this));
			}

		});
		p.add(b);

		b = colorButton = new JButton("ColorDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {

				Test_Dialog.this
						.onDialogReturn(JColorChooser.showDialog(Test_Dialog.this, "Testing JColorChooser", Color.RED));

			}

		});
		p.add(b);

		b = new JButton("ExportDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {

				Dialog d = new ImportExportDialog(null, "Export Dialog");
				d.setVisible(true);
//				Test_Dialog.this
//						.onDialogReturn(JColorChooser.showDialog(Test_Dialog.this, "Testing JColorChooser", Color.RED));
//
			}

		});
		p.add(b);

		b = new JButton("ExportJDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {

				JDialog d = new ImportExportJDialog(null, "Export Dialog") {
				    public void setFocusableWindowState(boolean focusableWindowState) {
				    	super.setFocusableWindowState(focusableWindowState);
				    }

				};
				
				System.out.println(d.getFocusableWindowState());
				
				d.setVisible(true);
				
				System.out.println(d.getFocusableWindowState());

//				Test_Dialog.this
//						.onDialogReturn(JColorChooser.showDialog(Test_Dialog.this, "Testing JColorChooser", Color.RED));
//
			}

		});
		p.add(b);

		pack();
		setVisible(true);

	}

	public static void main(String[] args) {
		try {
			new Test_Dialog();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

class ImportExportDialog extends Dialog
{
  protected Button closeButton, copyPasteButton, importButton;
  protected Label label;
  public TextArea textArea;

  public ImportExportDialog(Frame parent, String title) {

    super(parent, title, true);

    this.setLayout(new BorderLayout(15, 0));

    if (title.equals("Import Dialog"))
    	add("North", new Label("Import using CTRL + V"));
    else
    	add("North", new Label("Export using CTRL + C"));

    textArea = new TextArea() {
    	@Override
		public Dimension getPreferredSize() {
    		Dimension d = super.getPreferredSize();
    		System.out.println(this.getRows() + " " + this.getColumns());
    		System.out.println("export dialog textarea pref d = " + d);
    		return d;
    	}
    	@Override
		public Dimension preferredSize() {
    		Dimension d = super.preferredSize();
    		System.out.println("export dialog pref textarea pref d = " + d);
    		return d;
    	}

    	@Override
		public Dimension minimumSize() {
    		Dimension d = super.minimumSize();
    		System.out.println("export dialog min textarea min d = " + d);
    		return d;
    	}

    	@Override
		public Dimension getMinimumSize() {
    		Dimension d = super.getMinimumSize();
    		System.out.println("export dialog textarea min d = " + d);
    		return d;
    	}
   
    };
    textArea.setText(
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    		"this is a test of the system and this is a test of the system\n"
    		+ 
    				"this is a test of the system\nthis is a test of the system\nthis is a test of the system\nthis is a test of the system\n");
    textArea.setFont(new Font(Font.DIALOG, Font.PLAIN, 18));
    this.add("Center", textArea);

    copyPasteButton = new Button("Copy");
    if (title.equals("Import Dialog"))
    	copyPasteButton.setLabel("Paste");

    importButton = new Button("Import");

    closeButton = new Button("Close");
    if (title.equals("Import Dialog"))
    	closeButton.setLabel("Close");
    closeButton.addActionListener(new ActionListener() {

		@Override
		public void actionPerformed(ActionEvent e) {
			hide();
			dispose();
		}
    	
    });

    Panel p = new Panel();
    p.setLayout(new FlowLayout(FlowLayout.CENTER, 15, 10));
//    p.add(copyPasteButton);
    if (title.equals("Import Dialog"))
	    p.add(importButton);
    p.add(closeButton);
    this.add("South", p);
    setLocation(430,0);
    this.pack();
    System.out.println(textArea.getPreferredSize());
    setResizable(false);
    validate();
    repaint();
  }

} // end class
class ImportExportJDialog extends JDialog
{
  protected Button closeButton, copyPasteButton, importButton;
  protected Label label;
  public TextArea textArea;

  public ImportExportJDialog(JFrame parent, String title) {

    super(parent, title, true);

    this.setLayout(new BorderLayout(15, 0));

    if (title.equals("Import Dialog"))
    	add("North", new Label("Import using CTRL + V"));
    else
    	add("North", new Label("Export using CTRL + C"));

    textArea = new TextArea() {
    	@Override
		public Dimension getPreferredSize() {
    		Dimension d = super.getPreferredSize();
    		System.out.println(this.getRows() + " " + this.getColumns());
    		System.out.println("export dialog textarea pref d = " + d);
    		return d;
    	}
    	@Override
		public Dimension preferredSize() {
    		Dimension d = super.preferredSize();
    		System.out.println("export dialog pref textarea pref d = " + d);
    		return d;
    	}

    	@Override
		public Dimension minimumSize() {
    		Dimension d = super.minimumSize();
    		System.out.println("export dialog min textarea min d = " + d);
    		return d;
    	}

    	@Override
		public Dimension getMinimumSize() {
    		Dimension d = super.getMinimumSize();
    		System.out.println("export dialog textarea min d = " + d);
    		return d;
    	}
   
    };
    textArea.setText("this is a test of the system and this is a test of the system\nthis is a test of the system\nthis is a test of the system\nthis is a test of the system\nthis is a test of the system\n");
    textArea.setFont(new Font(Font.DIALOG, Font.PLAIN, 18));
    this.add("Center", textArea);
    
    copyPasteButton = new Button("Copy");
    if (title.equals("Import Dialog"))
    	copyPasteButton.setLabel("Paste");

    importButton = new Button("Import");

    closeButton = new Button("Close");
    if (title.equals("Import Dialog"))
    	closeButton.setLabel("Close");
    closeButton.addActionListener(new ActionListener() {

		@Override
		public void actionPerformed(ActionEvent e) {
			hide();
			dispose();
		}
    	
    });


    Panel p = new Panel();
    p.setLayout(new FlowLayout(FlowLayout.CENTER, 15, 10));
//    p.add(copyPasteButton);
    if (title.equals("Import Dialog"))
	    p.add(importButton);
    p.add(closeButton);
    this.add("South", p);
    setLocation(430,0);
    this.pack();
    System.out.println(textArea.getPreferredSize());
    setResizable(false);
    validate();
    repaint();
  }

}