package test.oracle;

/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1995, 2008, Oracle and/or its affiliates. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle or the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.image.BufferedImage;
import java.awt.image.RescaleOp;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import javax.imageio.ImageIO;
import javax.swing.JApplet;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

//SwingJS[1] Component --> JPanel	
//SwingJS[2] getCodeBase() --> getDocumentBase()
class SeeThroughComponent extends JPanel {

	private BufferedImage bi;
	float[] scales = { 1f, 1f, 1f, 0.5f };
	float[] offsets = new float[4];
	RescaleOp rop;

	public SeeThroughComponent(URL imageSrc) {
		try {
			BufferedImage img = ImageIO.read(imageSrc);
			int w = img.getWidth(null);
			int h = img.getHeight(null);
			bi = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
			Graphics g = bi.getGraphics();
			g.drawImage(img, 0, 0, null);

		} catch (IOException e) {
			System.out.println("Image could not be read");
			// System.exit(1);
		}
		setOpacity(0.5f);
	}

	@Override
	public Dimension getPreferredSize() {
		return new Dimension(bi.getWidth(null), bi.getHeight(null));
	}

	public void setOpacity(float opacity) {
		scales[3] = opacity;
		rop = new RescaleOp(scales, offsets, null);
	}

	@Override
	public void paint(Graphics g) {
		Graphics2D g2d = (Graphics2D) g;
		g2d.setColor(Color.white);
		g2d.fillRect(0, 0, getWidth(), getHeight());
		g2d.setColor(Color.black);
		g2d.setFont(new Font("Dialog", Font.BOLD, 24));
		g2d.drawString("JavaScript is cool!", 5, 80);
		g2d.drawImage(bi, rop, 0, 0);
	}
}

public class SeeThroughImageApplet extends JApplet {

	static String imageFileName = "duke_skateboard.jpg";
	private URL imageSrc;

	public SeeThroughImageApplet() {
	}

	public SeeThroughImageApplet(URL imageSrc) {
		this.imageSrc = imageSrc;
	}

	@Override
	public void init() {
		try {
			imageSrc = pathTo(imageFileName);// new URL(getCodeBase(), imageFileName);
		} catch (MalformedURLException e) {
		}
		buildUI();
	}

	public void buildUI() {
		final SeeThroughComponent st = new SeeThroughComponent(imageSrc);
		add("Center", st);
		try {
			JSlider opacitySlider = new JSlider(0, 100);
			opacitySlider.addChangeListener(new ChangeListener() {
				@Override
				public void stateChanged(ChangeEvent e) {
					JSlider slider = (JSlider) e.getSource();
					st.setOpacity(slider.getValue() / 100f);
					st.repaint();
				}
			});
			Dimension size = st.getPreferredSize();
			Dimension sliderSize = opacitySlider.getPreferredSize();
			resize(size.width, size.height + sliderSize.height);
			add("South", opacitySlider);
		} catch (Exception e) {
			//
		}
	}

	public static void main(String s[]) {
		JFrame f = new JFrame("See Through Image");
		f.addWindowListener(new WindowAdapter() {
			@Override
			public void windowClosing(WindowEvent e) {
				System.exit(0);
			}
		});
		URL imageSrc = null;
		try {
			imageSrc = ((new File(imageFileName)).toURI()).toURL();
		} catch (MalformedURLException e) {
		}
		SeeThroughImageApplet sta = new SeeThroughImageApplet(imageSrc);
		sta.buildUI();
		f.add("Center", sta);
		f.pack();
		f.setVisible(true);
	}

	/**
	 * SwingJS[2]: The original Applet called getCodebase(), but that is not
	 * appropriate for this demo. Instead, we switch to getDocumentBase()
	 * 
	 * SwingJS[3]: We do a switch of /bin/ to /html/ so that we can run it as a
	 * Java applet within Eclipse.
	 * 
	 * @param file
	 * @return
	 * @throws MalformedURLException
	 */
	private URL pathTo(String file) throws MalformedURLException {
		String path = getDocumentBase().toString();
		int pt = path.indexOf("/bin/");
		if (pt > 0)
			path = path.substring(0, pt) + "/html/" + path.substring(pt + 5);
		path = path.substring(0, path.lastIndexOf("/") + 1) + file;
		if (path.startsWith("/"))
			path = "file://" + path;
		return new URL(path);
	}

}
