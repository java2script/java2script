package com.polytopemedia;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;

import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

import com.polytopemedia.polyhedra.nets.NameAndNet;
import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.nets.NetBuilder;
import com.polytopemedia.polyhedra.ui.ImagePanel;
import com.polytopemedia.polyhedra.ui.MainPanel;
import com.polytopemedia.polyhedra.ui.MarkColors;
import com.polytopemedia.polyhedra.ui.io.FileUtils;
import com.polytopemedia.polyhedra.ui.io.JSCallback;
import com.polytopemedia.polyhedra.ui.io.PolyhedronFileFilter;
import com.polytopemedia.polyhedra.utils.Utils;


public class PolyhedronApplet extends JApplet implements ActionListener{
	private String encodedNet;
	private String name;

	public static boolean isJS = false;
	public static String myURL =  "http://www.dr-mikes-math-games-for-kids.com/polyhedral-nets.html?";
	
	static {
		boolean isJS = false;
		String url = myURL;
		/**
		 *   -- // BH getting the URL directly
		 * 
		 * @j2sNative
		 * 
		 * isJS = true;
		 * url = document.location.href.split("#")[0];
		 */
		{}
		PolyhedronApplet.isJS = isJS;
		if (url != null)
			PolyhedronApplet.myURL = url;
	}
	
	public void start() {
				
		JPanel panel = ImagePanel.defaultImage();
		this.setContentPane(panel);
		NetBuilder netBuilder = new NetBuilder();
		
		encodedNet = getParameterOrQuery("net"); // BH
		name = getParameterOrQuery("name");       // BH
		
		// BH trim down the url now, not necessarily removing other parameters
		// that come prior to net= and name=
		myURL = myURL.split("#")[0].split("net=")[0].split("name=")[0];
		if (myURL.endsWith("?"))
			myURL = myURL.substring(0, myURL.length() - 1);
		
		if (name != null && name.length() == 0) {
			name = null;
		}
		if (Utils.containsRudeWord(name)) {
			name = null;
		}
		try {
			netBuilder.decode(encodedNet);
		} catch (NullPointerException e) {
			encodedNet = null;
			name = null;
		}

		addButton(panel, "New Net", "Create a new polyhedral net");
		if (FileUtils.canAccessFileSystem()) {
			addButton(panel, "Load Net", "Load a saved polyhedral net from your hard disk");
		}


		if (encodedNet != null) {
			addButton(panel, "Linked Net", "Show the linked polyhedral net"+(name == null ? "" : ", \""+name+"\""));
			showMainPanel(netBuilder.decode(encodedNet), name);
		}
	}

	/**
	 * Check query first, then parameters, for a key=value pair
	 * 
	 * @param key
	 * @return value or null
	 * @author Bob Hanson
	 */
	private String getParameterOrQuery(String key) {
		// split out the key/value pairs in the query
		String query = getDocumentBase().getQuery();
		if (query != null) { // BH URL.getQuery() is supposed to return null.
			String[] fields = query.split("[\\=\\&#]");
			for (int i = 0; i < fields.length; i += 2)
				if (fields[i].equals(key))
					return fields[i + 1];
		}
		return getParameter(key);
	}

	public void actionPerformed(ActionEvent e) {
		String cmd = e.getActionCommand();
		if (cmd.equalsIgnoreCase("linked net")) {
			try {
				showMainPanel(new NetBuilder().decode(encodedNet), name);
			} catch (NullPointerException ex) {
				// BH NetBuilder.decode can throw NullPointerException() for
				// invalid encodedNet
				ex.printStackTrace();
			}
		} else if (cmd.equalsIgnoreCase("new net")) {
			showMainPanel(null, null);
		} else if (cmd.equalsIgnoreCase("load net")) {
			PolyhedronFileFilter filter = new PolyhedronFileFilter();
			
			final JSCallback cb = new JSCallback();
			cb.setRunnable(new Runnable() {
				public void run() {
					if (cb.getData() instanceof File) {
						//first time, dialog returns the File object with  __bytes attached
						try {
							FileUtils.loadNameAndNet((File) cb.getData(), cb);
						} catch (Exception e) {
							JOptionPane.showMessageDialog(PolyhedronApplet.this, "I couldn't read a polyhedron from your file!", "Error!",
									JOptionPane.ERROR_MESSAGE);
						} 
					} else {
						// second time, returns the NameAndNet
						showMainPanel((NameAndNet) cb.getData());
					}
				}
			});
			File file = FileUtils.getFile(filter, cb, false); // BH added asynchronous file load option
			if (file != null) {
				try {
					// Java only
					FileUtils.loadNameAndNet(file, cb); // adding callback
				} catch (Exception e1) {
					e1.printStackTrace();
				}
				if (!cb.getSuccessful()) {
					JOptionPane.showMessageDialog(this, "I couldn't read a polyhedron from your file!", "Error!",
							JOptionPane.ERROR_MESSAGE);
				}
			}
		}
	}

	private void addButton(JPanel panel, String text, String tooltip) {
		JButton jb = new JButton(text);
		jb.setToolTipText(tooltip);
		jb.setActionCommand(text);
		panel.add(jb);
		jb.addActionListener(this);
	}

	private void showMainPanel(NameAndNet nn) {
		showMainPanel(nn.getNet(), nn.getName());
	}
	private void showMainPanel(Net net, String name) {
		Color bgColor = Color.black;
		Color unjoinedEdgeColor = Color.red;
		Color joinedEdgeColor = Color.cyan;
		MarkColors markColors = new MarkColors(Color.green, Color.yellow, Color.blue);
		show(new MainPanel(joinedEdgeColor, bgColor, unjoinedEdgeColor, markColors,net, name), name);
	}

	private static void show(JPanel panel, String title) {
		if (title == null) title = "Polyhedral Nets";
		JFrame jf = new JFrame(title);
		panel.setPreferredSize(new Dimension(800, 600));
		jf.setContentPane(panel);
		jf.pack();
		jf.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		jf.setVisible(true);
	}

}
