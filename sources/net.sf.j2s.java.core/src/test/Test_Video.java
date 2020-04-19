package test;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.color.ColorSpace;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.ComponentColorModel;
import java.awt.image.DataBuffer;
import java.awt.image.DataBufferByte;
import java.awt.image.DataBufferUShort;
import java.awt.image.IndexColorModel;
import java.awt.image.PackedColorModel;
import java.awt.image.Raster;
import java.awt.image.WritableRaster;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.WindowConstants;
import javax.swing.border.EmptyBorder;

import sun.awt.image.PixelConverter;
import swingjs.JSUtil;

/**
 * Test of <video> tag.
 * 
 * @author RM
 *
 */
public class Test_Video extends Test_ {

	public static void main(String[] args) {
		JFrame main = new JFrame();
		main.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
		ImageIcon icon;
		
		String video = ( 
			//"test/jmoljana_960x540.png");
			// fails"test/EnergyTransfer.mp4"
			"test/jmoljana.mp4"
			);
		URL videoURL;
		try {
			videoURL = new URL("https://chemapps.stolaf.edu/test/duet.mp4");
		} catch (MalformedURLException e1) {
			// TODO Auto-generated catch block
			videoURL = null;
		}
		boolean testRemote = false;
		boolean isJS = /** @j2sNative true || */false;
		boolean asBytes = true;
		
		if (!isJS) {
			icon = new ImageIcon("src/test/video_image.png");
		} else if (asBytes) {
			try {
				byte[] bytes = Files.readAllBytes(new File(video).toPath());
				icon = new ImageIcon(bytes, "jsvideo");
			} catch (IOException e1) {
				icon = null;
			}
		} else if (testRemote) {
			icon = new ImageIcon(videoURL, "jsvideo");
		} else {
			icon = new ImageIcon(video, "jsvideo");						
		}
		JLabel label = new JLabel(icon);
		//label.setBorder(new EmptyBorder(10,10,10,10));
		int w = 1920/4;
		Dimension dim = new Dimension(w, w*9/16);
		label.setPreferredSize(dim);
		label.setMinimumSize(dim);
		label.setMaximumSize(dim);
		main.add(label, BorderLayout.CENTER);
		JButton play = new JButton("play");
		play.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				/**
				 * @j2sNative
				 * 
				 * label.ui.imageNode.play();
				 */
			}
			
		});
		JButton pause = new JButton("pause");
		pause.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				/**
				 * @j2sNative
				 * 
				 * label.ui.imageNode.pause();
				 */
			}
			
		});
		JPanel controls = new JPanel();
		controls.add(play);
		controls.add(pause);
		main.add(controls, BorderLayout.SOUTH);
		main.pack();
		System.out.println(label.getBounds());
		main.setVisible(true);

	}


}
