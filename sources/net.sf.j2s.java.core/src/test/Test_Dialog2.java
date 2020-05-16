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
import java.io.File;

import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

import javajs.async.AsyncColorChooser;
import javajs.async.AsyncDialog;
import javajs.async.AsyncFileChooser;

public class Test_Dialog2 extends JFrame {

	public static int ii;

	public static Object o = new Object();
	public static Color c = new Color(1, 2, 3);

	JLabel status;

	private File[] a = new File[0];
	
	private JButton colorButton;

	public Test_Dialog2() {
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
				new AsyncDialog().showConfirmDialog(Test_Dialog2.this,
						"<html>The frame is now " + (isResizable() ? "" : "<b>NOT</b> ") + "resizable. Switch that?</html>",
						"Testing JOptionPane", JOptionPane.YES_NO_OPTION, new ActionListener() {

							@Override
							public void actionPerformed(ActionEvent e) {
								switch (e.getID()) {
								case JOptionPane.YES_OPTION:
									setResizable(!isResizable());
									break;
								case JOptionPane.NO_OPTION:
									break;
								case JOptionPane.CLOSED_OPTION:
									System.out.println("Confirm canceled");
									return;
								}
								String msg = "this.isResizable() == " + isResizable();
								System.out.println(msg);
								status.setText(msg);
							}
					
				});
			}

		});
		p.add(b);

		b = new JButton("MessageDialog");
		final JPanel message = new JPanel();
		message.setLayout(new BorderLayout());
		message.add(new JLabel("this is the message panel"), BorderLayout.CENTER);
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				new AsyncDialog().showMessageDialog(Test_Dialog2.this, message, new ActionListener() {

					@Override
					public void actionPerformed(ActionEvent e) {
						String ok = "OK -- " + e.getActionCommand();
						status.setText(ok);
						System.out.println(ok);
					}
					
				});
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
				new AsyncDialog().showInputDialog(Test_Dialog2.this, input, new ActionListener() {

					@Override
					public void actionPerformed(ActionEvent e) {

						System.out.println("Input was " + e.getActionCommand());
						status.setText(e.getActionCommand());
					}
					
				});
			}

		});
		p.add(b);

		b = new JButton("OptionDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				new AsyncDialog().showOptionDialog(Test_Dialog2.this, "Pick one of the following three options:", "Option title",
						0, 0, null, new Object[] {"Option A", "Option B", "Option C"} , "Option B", new ActionListener() {
					@Override
					public void actionPerformed(ActionEvent e) {
						String msg = "Option selected " + ((AsyncDialog)e.getSource()).getValue() + " (" + e.getActionCommand() + ")";
						System.out.println(msg);
						status.setText(msg);
					}
					
				});
			}

		});
		p.add(b);



		b = new JButton("FileOpenDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				AsyncFileChooser fc = new AsyncFileChooser();
				fc.showOpenDialog(Test_Dialog2.this, new Runnable() {

					@Override
					public void run() {
						File file = fc.getSelectedFile();
						System.out.println("FileChooser returned " + file.length() + " bytes for " + file);
					}
					
				}, null);
			}

		});
		p.add(b);

		b = new JButton("FilesOpenDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				AsyncFileChooser fc = new AsyncFileChooser();
				fc.setMultiSelectionEnabled(true);
				fc.showOpenDialog(Test_Dialog2.this, new Runnable() {

					@Override
					public void run() {
						System.out.println(fc.getSelectedFile());
						File[] files = fc.getSelectedFiles();
						String s = "";
						for (int i = 0; i < files.length; i++) {
							System.out.println("FileChooser returned " + files[i].length() + " bytes for files[" + i
									+ "] = " + files[i]);
							s += files[i].getName() + " " + files[i].length() + ",";
						}
						status.setText(s);
					}
					
				}, null);
			}

		});
		p.add(b);

		b = new JButton("FileSaveDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				AsyncFileChooser fc = new AsyncFileChooser();
				fc.showSaveDialog(Test_Dialog2.this, new Runnable() {

					@Override
					public void run() {
						File file = fc.getSelectedFile();
						String msg = "FileChooser returned " + file;
						System.out.println(msg);
						status.setText(msg);
					}
					
				}, null);
			}

		});
		p.add(b);

		b = new JButton("FileSaveDialog2");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				JFileChooser fc = new JFileChooser();
				int ret = fc.showSaveDialog(Test_Dialog2.this);						
				File file = fc.getSelectedFile();
				String msg = "FileChooser returned " + ret + " " + file + (file == null ? "" : " path=" + file.getAbsolutePath());
				System.out.println(msg);
				status.setText(msg);
			}

		});
		p.add(b);


		b = colorButton = new JButton("ColorDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {

				new AsyncColorChooser().showDialog(Test_Dialog2.this, "Testing JColorChooser", Color.RED, new ActionListener() {

					@Override
					public void actionPerformed(ActionEvent e) {
						// note that e.getID() is Color.getRGB();
						Color value = (e.getID() == 0 ? null : ((AsyncColorChooser) e.getSource()).getSelectedColor());
						if(value != null) {
							colorButton.setBackground((Color) value);
							status.setText(value.toString());
						}
						System.out.println("ColorChooser returned " + value + (value == null ? "" : " = " + new Color(e.getID())));
						
					}
					
				});

			}

		});
		p.add(b);

		b = new JButton("ExportDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {

				Dialog d = new ImportExportDialog2(null, "Export Dialog");
				d.setVisible(true);
//				Test_Dialog2.this
//						.onDialogReturn(JColorChooser.showDialog(Test_Dialog2.this, "Testing JColorChooser", Color.RED));
//
			}

		});
		p.add(b);

		b = new JButton("ExportJDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {

				JDialog d = new ImportExportJDialog2(null, "Export Dialog");
				d.setVisible(true);
//				Test_Dialog2.this
//						.onDialogReturn(JColorChooser.showDialog(Test_Dialog2.this, "Testing JColorChooser", Color.RED));
//
			}

		});
		p.add(b);

		pack();
		setVisible(true);

	}

	public static void main(String[] args) {
		try {
			new Test_Dialog2();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

class ImportExportDialog2 extends Dialog
{
  protected Button closeButton, copyPasteButton, importButton;
  protected Label label;
  public TextArea textArea;

  public ImportExportDialog2(Frame parent, String title) {

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
class ImportExportJDialog2 extends JDialog
{
  protected Button closeButton, copyPasteButton, importButton;
  protected Label label;
  public TextArea textArea;

  public ImportExportJDialog2(JFrame parent, String title) {

    super(parent, title, true);

	  
    setLayout(new BorderLayout(15, 0));

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