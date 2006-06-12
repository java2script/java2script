/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ui.jdtenhancer;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.File;
import java.io.IOException;

import javax.swing.BorderFactory;
import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JDialog;
import javax.swing.JFileChooser;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JSeparator;
import javax.swing.JTextField;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;
import javax.swing.filechooser.FileFilter;

/**
 * @author josson smith
 *
 * 2006-2-12
 */
public class JDTCoreEnhancer extends JDialog {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4230496383464095040L;
	/**
	 * 
	 */
	private JPanel jContentPane = null;
	private JButton btnEnhance;
	private JButton btnCancel;
	private JPanel instructionArea;
	private JTextField backupPath;
	private JTextField coreJarPath;
	/**
	 * This is the default constructor
	 */
	public JDTCoreEnhancer() {
		super();
		initialize();
	}

	/**
	 * This method initializes this
	 * 
	 * @return void
	 */
	private void initialize() {
		this.setSize(480, 253);
		this.setContentPane(getJContentPane());
	}

	/**
	 * This method initializes jContentPane
	 * 
	 * @return javax.swing.JPanel
	 */
	private JPanel getJContentPane() {
		if (jContentPane == null) {
			jContentPane = new JPanel();
			jContentPane.setLayout(new BorderLayout());
			createContents(jContentPane);
		}
		return jContentPane;
	}
	
    protected JComponent createContents(JComponent parent) {
        JPanel area = new JPanel();
        area.setBorder(BorderFactory.createEmptyBorder(6, 10, 6, 10));
        parent.add(area, BorderLayout.CENTER);
        //area.setLayout(new BoxLayout(area, BoxLayout.Y_AXIS));
        area.setLayout(new BorderLayout());
        createDialogArea(area);
        createButtonBar(parent);
        return parent;
    }

    protected JComponent createDialogArea(JComponent parent) {
        instructionArea = new JPanel();
        instructionArea.setLayout(new BoxLayout(instructionArea, BoxLayout.PAGE_AXIS));
        instructionArea.setAlignmentX(0);
		parent.add(instructionArea, BorderLayout.NORTH);
		JLabel label = makeInstruction("Enhancing JDT Core Jar Instruction");
		label.setForeground(Color.BLACK);
		makeInstruction("1. Make sure that Eclipse is closed.");
		makeInstruction("2. Choose the JDT Core jar location.");
		makeInstruction("3. Choose the JDT Core jar backup location.");
		makeInstruction("4. Click \"Enhance JDT Core\" button.");
		makeInstruction("5. Exit this dialog and then restart Eclipse.");
		
		instructionArea.add(Box.createRigidArea(new Dimension(4, 4)));
		instructionArea.add(new JSeparator());

        JPanel optionsPanel = new JPanel();
        optionsPanel.setLayout(new BorderLayout());
        parent.add(optionsPanel, BorderLayout.CENTER);

        JPanel optionsArea = new JPanel();
        optionsArea.setLayout(new BoxLayout(optionsArea, BoxLayout.PAGE_AXIS));
        optionsPanel.add(optionsArea, BorderLayout.NORTH);
		optionsArea.setBorder(BorderFactory.createEmptyBorder(8, 0, 8, 0));
		
		JPanel coreJarPanel = new JPanel();
		coreJarPanel.setLayout(new BorderLayout(4, 2));
		optionsArea.add(coreJarPanel);
		JPanel backupJarPanel = new JPanel();
		backupJarPanel.setLayout(new BorderLayout(4, 2));
		optionsArea.add(backupJarPanel);
		
		JLabel label1 = new JLabel("JDT Core Jar Path:");
		coreJarPanel.add(label1, BorderLayout.WEST);
		coreJarPath = new JTextField();
		File current = null;
		try {
			current = new File(".").getCanonicalFile();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		String currentPath = current.getAbsolutePath();
		if ("plugins".equals(current.getParentFile().getName())) {
			currentPath = current.getParentFile().getAbsolutePath();
		} else if ("workspace".equals(current.getParentFile().getName())) {
			File plugins = new File(current.getParentFile().getParentFile(), "plugins");
			currentPath = plugins.getAbsolutePath();
		} else if (!"plugins".equals(current.getName())){
			currentPath = current.getParentFile().getAbsolutePath();
		}
		String coreJarName = JarUtil.getJDTCoreJarName(currentPath);
		if (coreJarName != null) {
			coreJarPath.setText(new File(currentPath, coreJarName).getAbsolutePath());
		} else {
			coreJarPath.setText(currentPath);
		}
		coreJarPanel.add(coreJarPath, BorderLayout.CENTER);
		JButton btnBrowse1 = createButton(coreJarPanel,
                "Choose...", false, BorderLayout.EAST);
		btnBrowse1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				JFileChooser fileChooser = new JFileChooser();
				String path = coreJarPath.getText();
				if (path != null) {
					path = path.trim();
					if (path.length() != 0) {
						File file = new File(path);
						if (file.exists()) {
							if (file.isDirectory()) {
								fileChooser.setCurrentDirectory(file);
							} else {
								fileChooser.setCurrentDirectory(file.getParentFile());
							}
						} else {
							fileChooser.setCurrentDirectory(file.getParentFile());
						}
					}
				}
				fileChooser.setFileFilter(new FileFilter() {
					public String getDescription() {
						return "JDT Core Jar";
					}
				
					public boolean accept(File f) {
						if (!f.isFile() || (f.getName().endsWith(".jar") && f.getName().startsWith("org.eclipse.jdt.core"))) {
							return true;
						}
						return false;
					}
				});
				fileChooser.showOpenDialog(JDTCoreEnhancer.this);
				File file = fileChooser.getSelectedFile();
				if (file != null) {
					coreJarPath.setText(file.getAbsolutePath());
				}
			}
		});
		
		JLabel label2 = new JLabel("Backup Path:");
		backupJarPanel.add(label2, BorderLayout.WEST);
		backupPath = new JTextField();
		backupJarPanel.add(backupPath, BorderLayout.CENTER);
		JButton btnBrowse2 = createButton(backupJarPanel,
                "Choose...", false, BorderLayout.EAST);
		
		btnBrowse2.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				JFileChooser fileChooser = new JFileChooser();
				String path = backupPath.getText();
				if (path != null) {
					path = path.trim();
					if (path.length() != 0) {
						File file = new File(path);
						if (file.exists()) {
							if (file.isDirectory()) {
								fileChooser.setCurrentDirectory(file);
							} else {
								fileChooser.setCurrentDirectory(file.getParentFile());
							}
						} else {
							fileChooser.setCurrentDirectory(file.getParentFile());
						}
					}
				}
				fileChooser.showSaveDialog(JDTCoreEnhancer.this);
				File file = fileChooser.getSelectedFile();
				if (file != null) {
					backupPath.setText(file.getAbsolutePath());
				}
			}
		});

		backupJarPanel.add(btnBrowse2, BorderLayout.EAST);
		backupJarPanel.add(Box.createRigidArea(new Dimension(4, 4)), BorderLayout.NORTH);
		if (coreJarName != null) {
			backupPath.setText(new File(new File(currentPath).getParent(), coreJarName).getAbsolutePath());
		} else {
			backupPath.setText(new File(currentPath).getParent());
		}

		Dimension size1 = label1.getPreferredSize();
		Dimension size2 = label2.getPreferredSize();
		Dimension size = new Dimension((int) Math.max(size1.getWidth(), size2.getWidth()), size1.height);
		label1.setPreferredSize(size);
		label2.setPreferredSize(size);

        return parent;
    }

	private JLabel makeInstruction(String label) {
		JLabel jLabel = new JLabel();
		jLabel.setText(label);
		instructionArea.add(jLabel);
		jLabel.setForeground(Color.DARK_GRAY);
		return jLabel;
	}

	public static void main(String[] args) {
		try {
			UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
		} catch (ClassNotFoundException e1) {
			e1.printStackTrace();
		} catch (InstantiationException e1) {
			e1.printStackTrace();
		} catch (IllegalAccessException e1) {
			e1.printStackTrace();
		} catch (UnsupportedLookAndFeelException e1) {
			e1.printStackTrace();
		}
		JDTCoreEnhancer dialog = new JDTCoreEnhancer();
		dialog.setTitle("JDT Core Enhancer");
		dialog.makeMeCenter();
		dialog.addWindowListener(new WindowAdapter() {
			public void windowClosed(WindowEvent e) {
				System.exit(0);
			}
			public void windowClosing(WindowEvent e) {
				System.exit(0);
			}
		});
		dialog.show();
	}
	
    protected void makeMeCenter() {
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        Dimension labelSize = getSize();
        int left = screenSize.width / 2 - (labelSize.width / 2);
        // 80 is just some pixels to make dialogs a little above the center
        int top = screenSize.height / 2 - ((labelSize.height + 80) / 2);
        if (left < 0) {
            left = 0;
        }
        if (top < 0) {
            top = 0;
        }
        setLocation(left, top);
    }

    protected JComponent createButtonBar(JComponent parent) {
    	JPanel buttonBar = new JPanel();
        buttonBar.setLayout(new BorderLayout());
        parent.add(buttonBar, BorderLayout.SOUTH);
        JPanel buttonsPane = new JPanel();
        buttonBar.add(new JSeparator(), BorderLayout.NORTH);
        buttonBar.add(buttonsPane, BorderLayout.EAST);
        buttonBar.add(Box.createHorizontalStrut(480), BorderLayout.SOUTH);
        buttonsPane.setBorder(BorderFactory.createEmptyBorder(6, 6, 6, 6));
        createButtonsForButtonBar(buttonsPane);
        return buttonBar;
    }

    protected void createButtonsForButtonBar(JComponent parent) {
        btnEnhance = createButton(parent,
		                "Enhance JDT Core", true);
		btnCancel = createButton(parent,
		                "Cancel", false);
    }

    protected JButton createButton(JComponent parent, String label,
            boolean defaultButton) {
    	return createButton(parent, label,
                defaultButton, null);
    }
    protected JButton createButton(JComponent parent, String label,
            boolean defaultButton, String position) {
        JButton button = new JButton(label);
        int width = button.getPreferredSize().width;
        button.setFont(this.getFont());
        if (width < 75) {
            width = 75;
        }
        button.setPreferredSize(new Dimension(width, 21));
        if (position != null) {
        	parent.add(button, position);
        } else {
            parent.add(button);
        }
        button.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                Object source = e.getSource();
                if (source instanceof JButton) {
                    JButton btn = (JButton) source;
                    if (btn == btnEnhance) {
                    	okPressed();
                    } else if (btn == btnCancel) {
                    	cancelPressed();
                    }
                }
            }
        });
        if (defaultButton) {
            getRootPane().setDefaultButton(button);
        }
        return button;
    }


    protected void okPressed() {
    	setCursor(new Cursor(Cursor.WAIT_CURSOR));
		String srcPath = coreJarPath.getText();
		if (srcPath != null) {
			srcPath = srcPath.trim();
		}
		String destPath = backupPath.getText();
		if (destPath != null) {
			destPath = destPath.trim();
		}
    	try {
			JarUtil.enhanceJDTCoreBackup(srcPath, destPath, new File(".").getCanonicalPath());
		} catch (IOException e) {
			e.printStackTrace();
			setCursor(new Cursor(Cursor.DEFAULT_CURSOR));
	        JOptionPane.showMessageDialog(JDTCoreEnhancer.this,
	        		e.getMessage(),
	                "Enhancing Error!", 
	                JOptionPane.ERROR_MESSAGE);
	        return ;
		}
		setCursor(new Cursor(Cursor.DEFAULT_CURSOR));
    	hide();
        JOptionPane.showMessageDialog(JDTCoreEnhancer.this,
        		"Enhancing the JDT Core jar is done. You can restart Eclipse now.",
                "Enhancing Done!", 
                JOptionPane.INFORMATION_MESSAGE);
        System.exit(0);
    }

    protected void cancelPressed() {
		hide();
		System.exit(0);
    }
}
