package test;

import java.applet.Applet;
import java.awt.Button;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class TApp6 extends Applet {
	Color col = Color.red;
	private Image img;
// never keep local copies of a Graphics
// private Graphics imggc;

	public void init() {
        Dimension d=size();
        img=createImage(d.width,d.height);
//        imggc=img.getGraphics();
		setLayout(null);
		Button bt = new Button("Press");
		bt.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				Graphics imggc = img.getGraphics();
				/**
				 * @j2sNative
				 * imggc.setAntialias$Z(false);
				 */
				if (col == Color.red)
					col = Color.white;
				else
					col = Color.red;
				imggc.setColor(col);
				for (int i = 0; i < 100; ++i) {
					for (int j = 0; j < 100; ++j) {
						imggc.fillRect(2 * i, 2 * j, 1, 1);
					}
				}
// must dispose
				imggc.dispose();
				repaint();
			}
		});
		bt.setBounds(0, 0, 200, 100);
		add(bt);
	}

	public void paint(Graphics gc) {
		/**
		 * @j2sNative
		 * 
		 * gc.setAntialias$Z(false);
		 */
        if (img!=null) gc.drawImage(img,0,0,this);
	}
}
