package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.datatransfer.DataFlavor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import javax.swing.BoxLayout;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComponent;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.Timer;
import javax.swing.TransferHandler;
import javax.swing.WindowConstants;

import javajs.async.SwingJSUtils.StateHelper;
import javajs.util.VideoReader;
import swingjs.api.JSUtilI;
import swingjs.api.js.HTML5Video;

/**
 * Test of <video> tag.
 * 
 * See https://www.cimarronsystems.com/wp-content/uploads/2017/04/Elements-of-the-H.264-VideoAAC-Audio-MP4-Movie-v2_0.pdf
 * 
 * @author RM
 *
 */
public class Test_Video {

	public static void main(String[] args) {
		if (args.length > 0) {
			System.out.println(getMP4Codec(args[0], null));
		} else {
			new Test_Video();
		}
	}

	private static String getMP4Codec(String fname, String name) {
		try {
			VideoReader vr = new VideoReader(fname);
			vr.getContents(true);
			String info = vr.getFileType() + "|" + vr.getCodec();
			return (name == null ? fname : name) + ": " + info;
		} catch (IOException e) {
			e.printStackTrace();
			return fname + "?";
		}
	}

	private HTML5Video jsvideo;
	private JLabel imageLabel;
	private BufferedImage image;
	private int w;
	private int h;
	private int vw;
	private int vh;

	boolean isJS = /** @j2sNative true || */
			false;

	JDialog dialog;
	private JFrame main;

	@SuppressWarnings("unused")
	public Test_Video() {
		main = new JFrame();
		main.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

		main.setTransferHandler(new TransferHandler() {
			@Override
			public boolean canImport(TransferHandler.TransferSupport support) {
				return true;
			}

			@Override
			public boolean importData(TransferHandler.TransferSupport support) {
				try {
					loadVideo(((List<File>) support.getTransferable().getTransferData(DataFlavor.javaFileListFlavor))
							.get(0));
				} catch (Exception e) {
					return false;
				}
				return true;
			}

		});
		boolean testRemote = false;// setting this true requires Java 9
		isDiscrete = true;

		String video = (
		// "test/jmoljana_960x540.png");
		// fails"test/EnergyTransfer.mp4"
		// "test/jmoljana.mp4",
		"test/duet.mp4");

		URL videoURL = null;
		if (testRemote)
			try {
				videoURL = new URL("https://chemapps.stolaf.edu/test/duet.mp4");
			} catch (MalformedURLException e1) {
			}
		vw = 1920;
		vh = vw * 9 / 16;
		w = 1920 / 4;
		h = w * 9 / 16;
		Dimension dim = new Dimension(w, w * 9 / 16);

		imageLabel = new JLabel();
		imageLabel.setAlignmentX(0.5f);
		int type = (isJS ? JSUtilI.TYPE_4BYTE_HTML5 : BufferedImage.TYPE_4BYTE_ABGR);
		image = new BufferedImage(w, h, type);
		ImageIcon imageicon = new ImageIcon(image);
		imageLabel.setIcon(imageicon);
		File file = new File(video);

		createVideoLabel(file, videoURL, video);
		// A little trick to allow "final" self reference in a Runnable parameter

		createDialog();

		// dialog[0].setOpaque(true);

		Container cp = main.getContentPane();
		cp.setLayout(new BoxLayout(cp, BoxLayout.Y_AXIS));
		JPanel videoPanel = getLayerPane(dim);
		cp.add(videoPanel);
		videoPanel.setAlignmentX(0.5f);
		JPanel controls = getControls();
		controls.setAlignmentX(0.5f);
		cp.add(controls);
		cp.add(imageLabel);
		main.pack();
		main.setVisible(true);

		// main.setBackground(Color.orange);
		// main.getRootPane().setOpaque(true);
//		System.out.println(main.isOpaque() + " " + Integer.toHexString(main.getBackground().getRGB()));
//		cp.setBackground(Color.red);
		HTML5Video.setProperty(jsvideo, "currentTime", 0);

		showAllProperties();
	}

	private void createDialog() {
		if (dialog != null) {
			dialog.dispose();
		}
		dialog = HTML5Video.createDialog(null, label, 500, true, new Function<HTML5Video, Void>() {

			@Override
			public Void apply(HTML5Video video) {
				dialog.setVisible(true);
				return null;
			}

		});
	}

	JLabel label = new JLabel((String) null);

	private void createVideoLabel(File file, URL videoURL, String video) {
		boolean asBytes = (file != null);
		ImageIcon icon;
		if (!isJS) {
			icon = new ImageIcon("test/video_image.png");
			if (!(file.toString().equals(file.getAbsolutePath()))) {
				file = new File("site/swingjs/j2s/" + file.toString());
			}
			System.out.println(file.getAbsolutePath());
			System.out.println(getMP4Codec(file.getAbsolutePath(), file.getName()));
			return;
		} else if (asBytes) {
			try {
				byte[] bytes;
//				if (testRemote) {
//					bytes = videoURL.openStream().readAllBytes();// Argh! Java 9!
//				} else {
				bytes = Files.readAllBytes(file.toPath());
//				}
				icon = new ImageIcon(bytes, "jsvideo");
			} catch (IOException e1) {
				icon = null;
			}
		} else if (videoURL != null) {
			icon = new ImageIcon(videoURL, "jsvideo");
		} else {
			icon = new ImageIcon(video, "jsvideo");
		}
		label.setIcon(icon);
		jsvideo = (HTML5Video) label.getClientProperty("jsvideo");
		HTML5Video.addActionListener(jsvideo, new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				String event = e.getActionCommand();
				Object[] sources = (Object[]) e.getSource();
				HTML5Video target = (HTML5Video) sources[0];
				Object jsevent = sources[1];
				System.out.println(event + " " + HTML5Video.getCurrentTime(jsvideo));
				if (cbCapture.isSelected() && event.equals("canplaythrough")) {
					grabImage();
				}

			}

		});

//		try {
//			jsvideo.play();
//		} catch (Throwable e) {
//			System.out.println("couldn't play (yet)" + e);
//		}
//

	}

	protected void loadVideo(File file) {
		Rectangle bounds = label.getBounds();
		layerPane.remove(label);
		createVideoLabel(file, null, null);
		if (!isJS) {
			return;
		}
		createDialog();
		layerPane.add(label, JLayeredPane.DEFAULT_LAYER);
		label.setBounds(bounds);
		label.setVisible(true);

	}

	private void describeVideo(String resource, String name) throws IOException {
		VideoReader vr = new VideoReader(resource);
		List<Map<String, Object>> contents = vr.getContents(true);
		System.out.println("codec = " + vr.getCodec());
		main.setTitle(name + " " + vr.getFileType() + "|" + vr.getCodec());
	}

	private void showProperty(String key) {
		System.out.println(key + "=" + HTML5Video.getProperty(jsvideo, key));
	}

	private void showAllProperties() {
		if (!isJS)
			return;
		for (int i = 0; i < allprops.length; i++)
			showProperty(allprops[i]);
	}

	private static String[] allprops = { "audioTracks", //
			"autoplay", //
			"buffered", //
			"controller", //
			"controls", //
			"controlsList", //
			"crossOrigin", //
			"currentSrc", //
			"currentTime", //
			"defaultMuted", //
			"defaultPlaybackRate", //
			"disableRemotePlayback", //
			"duration", //
			"ended", //
			"error", //
			"loop", //
			"mediaGroup", //
			"mediaKeys", //
			"mozAudioCaptured", //
			"mozFragmentEnd", //
			"mozFrameBufferLength", //
			"mozSampleRate", //
			"muted", //
			"networkState", //
			"paused", //
			"playbackRate", //
			"played", //
			"preload", //
			"preservesPitch", //
			"readyState", //
			"seekable", //
			"seeking", //
			"sinkId", //
			"src", //
			"srcObject", //
			"textTracks", //
			"videoTracks", //
			"volume", //
			"initialTime", //
			"mozChannels",//

	};

	double vt, vt0, vt1;
	long t0 = 0;
	double duration;
	int totalTime;
	int delay = 33334;
	Timer timer;
	Object[] playListener;

	private void playVideoDiscretely(HTML5Video v) {
		vt0 = vt = HTML5Video.getCurrentTime(v);
		t0 = System.currentTimeMillis() - (int) (vt * 1000);
		duration = ((Double) HTML5Video.getProperty(v, "duration")).doubleValue();
		if (vt >= duration) {
			vt = 0;
			playing = false;
		}

		ActionListener listener = new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (cbCapture.isSelected()) {
					grabImage();
				}
				System.out.print("\0");
				vt += delay / 1000000.0;
				System.out.println("setting time to " + vt + " duration=" + delay);
				HTML5Video.setCurrentTime(v, vt);
				long dt = System.currentTimeMillis() - t0;
				double dtv = vt - vt0;
				System.out.println((dtv - dt / 1000.) + " " + HTML5Video.getProperty(jsvideo, "paused") + " "
						+ HTML5Video.getProperty(jsvideo, "seeking"));
				if (vt >= duration) {
					playing = false;
					removePlayListener(v);
				}
			}

		};
		playListener = HTML5Video.addActionListener(v, listener, "canplaythrough");
		t0 = System.currentTimeMillis();
		listener.actionPerformed(null);
	}

	protected void grabImage() {
		BufferedImage img = HTML5Video.getImage(jsvideo, Integer.MIN_VALUE);
		Graphics g = image.getGraphics();
		g.drawImage(img, 0, 0, w, h, 0, 0, vw, vh, null);
		g.dispose();
		imageLabel.repaint();
	}

	protected void removePlayListener(HTML5Video v) {
		if (playListener != null)
			HTML5Video.removeActionListener(v, playListener);
		playListener = null;
	}

	private JLayeredPane layerPane;
	private JPanel drawLayer;

	private List<Point> points = new ArrayList<Point>();

	protected boolean isDiscrete;

	protected boolean playing;

	private JCheckBox cbCapture;

	private JCheckBox cbDiscrete;
	private StateHelper helper;

	private JPanel getLayerPane(Dimension dim) {
		lockDim(label, dim);
		label.setBounds(0, 0, dim.width, dim.height);

		drawLayer = new JPanel() {
			@Override
			public void paintComponent(Graphics g) {
				super.paintComponent(g); // takes care of the background clearing
				g.setColor(Color.red);
				for (int i = 0, n = points.size(); i < n; i++) {
					Point p = points.get(i);
					g.drawLine(p.x - 5, p.y, p.x + 5, p.y);
					g.drawLine(p.x, p.y - 5, p.x, p.y + 5);
				}
			}
		};
		drawLayer.setBounds(0, 0, dim.width, dim.height);
		drawLayer.setOpaque(false);
		// drawLayer.setBackground(new Color(255,255,255,0));
		// note -- setting this to opaque/{255 255 255 0} does not quite work as
		// expected.
		// rather than paint a white background over the image in Java, Java paints
		// the default background color. This of course makes no sense; I consider it a
		// Java bug.
		//
		drawLayer.putClientProperty("jscanvas", "true");

		drawLayer.addMouseListener(new MouseAdapter() {

			@Override
			public void mouseClicked(MouseEvent e) {
				System.out.println("Draw layer mouse click " + e.getX() + " " + e.getY());
				points.add(new Point(e.getX(), e.getY()));
				drawLayer.repaint();
			}
		});

		layerPane = new JLayeredPane();
		lockDim(layerPane, dim);
		layerPane.add(drawLayer, JLayeredPane.PALETTE_LAYER);
		layerPane.add(label, JLayeredPane.DEFAULT_LAYER);

		JPanel p = new JPanel();
		p.add(layerPane, BorderLayout.CENTER);
		lockDim(p, dim);

		return p;
	}

	private void lockDim(JComponent c, Dimension dim) {
		c.setPreferredSize(dim);
		c.setMinimumSize(dim);
		c.setMaximumSize(dim);
	}

	private JPanel getControls() {

		cbCapture = new JCheckBox("capture");
		cbCapture.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				grabImage();
			}

		});
		cbDiscrete = new JCheckBox("discrete");

		JButton play = new JButton("play");
		play.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (playing || jsvideo == null)
					return;
				isDiscrete = cbDiscrete.isSelected();
				try {
					playing = true;
					if (isDiscrete) {
						playVideoDiscretely(jsvideo);
					} else {
						jsvideo.play();
					}
				} catch (Throwable e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}

		});
		JButton pause = new JButton("pause");
		pause.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (jsvideo == null)
					return;
				try {
					playing = false;
					duration = 0; // turns off timer
					jsvideo.pause();
					removePlayListener(jsvideo);
				} catch (Throwable e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}

		});

		if (isJS) {
			boolean canSeek = HTML5Video.getProperty(jsvideo, "seekToNextFrame") != null;
			System.out.println("canSeek = " + canSeek);
		}
		JButton next = new JButton("next");
		next.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (playing || jsvideo == null)
					return;
				double t = HTML5Video.getCurrentTime(jsvideo);
				System.out.println(t + "  " + (t - vt0));
				vt0 = t;
				HTML5Video.nextFrame(jsvideo, 0.03334);
			}

		});

		JButton reset = new JButton("reset");
		reset.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (jsvideo == null)
					return;
				vt0 = 0;
				try {
					HTML5Video.setCurrentTime(jsvideo, 0);
				} catch (Throwable e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}

		});

		JButton clear = new JButton("clear");
		clear.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				points.clear();
				drawLayer.repaint();
			}

		});

		JButton undo = new JButton("undo");
		undo.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (points.size() > 0)
					points.remove(points.size() - 1);
				drawLayer.repaint();
			}

		});

		JButton show = new JButton("show");
		show.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				showAllProperties();
			}

		});

		JButton getRate = new JButton("rate");
		getRate.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (rc != null || playing || jsvideo == null)
					return;
				rc = new RateCalc();
				rc.getRate(5);
			}

		});

		JPanel controls = new JPanel();
		controls.add(new JLabel("click to mark     "));
		controls.add(cbDiscrete);
		controls.add(cbCapture);
		controls.add(play);
		controls.add(pause);
		controls.add(next);
		controls.add(reset);
		controls.add(undo);
		controls.add(clear);
		controls.add(show);
		controls.add(getRate);
		return controls;
	}

	RateCalc rc;
	
	class RateCalc implements ActionListener {

		double curTime0 = 0, curTime = 0, ds = 0.01, tolerance = 0.00001, frameDur = 0;

		boolean expanding = true;

		private double[] results;

		private int pt;
		
		protected void getRate(int n) {
			results = new double[n];
			pt = 0;
			buffer = null;
			expanding = true;
			curTime0 = curTime = HTML5Video.getCurrentTime(jsvideo);
			ds = frameDur / 2 + 0.001;
			frameDur = 0;
			listener = HTML5Video.addActionListener(jsvideo, this, "canplaythrough");
			HTML5Video.setCurrentTime(jsvideo, curTime);
		}

		byte[] buffer, buffer0;
		
		Object[] listener;

		@Override
		public void actionPerformed(ActionEvent e) {
			BufferedImage img = HTML5Video.getImage(jsvideo, Integer.MIN_VALUE);
			byte[] b = ((DataBufferByte) img.getRaster().getDataBuffer()).getData();
			if (buffer == null) {
				buffer = new byte[img.getWidth() * img.getHeight() * 4];
			}
			System.arraycopy(b, 0, buffer, 0, b.length);
			if (buffer0 == null) {
				buffer0 = new byte[img.getWidth() * img.getHeight() * 4];
				System.arraycopy(buffer, 0, buffer0, 0, buffer.length);
			} else {
				if (Arrays.equals(buffer, buffer0)) {
					// time 0 0.1 0.24 0.44
					// ds 0.1 0.14 0.2
					if (expanding) {
						ds *= 1.4;
					}
				} else if (ds < 0 || Math.abs(ds) >= tolerance) {
					expanding = false;
					ds /= -2;
					buffer0 = buffer;
					buffer = null;
				} else {
					buffer = buffer0 = null;
					frameDur = curTime - curTime0;
					curTime0 = curTime;
					results[pt++] = frameDur;
					if (pt < results.length) {
						ds = frameDur / 2;
					} else {
						HTML5Video.removeActionListener(jsvideo, listener);
						JOptionPane.showMessageDialog(null, "frame Duration is " + Arrays.toString(results));
						rc = null;
						return;
					}
				}
			}
			curTime += ds;
			HTML5Video.setCurrentTime(jsvideo, curTime);

		}

	}
//	Event Name 	Fired When
//	audioprocess 	The input buffer of a ScriptProcessorNode is ready to be processed.
//	canplay 	The browser can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.
//	canplaythrough 	The browser estimates it can play the media up to its end without stopping for content buffering.
//	complete 	The rendering of an OfflineAudioContext is terminated.
//	durationchange 	The duration attribute has been updated.
//	emptied 	The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.
//	ended 	Playback has stopped because the end of the media was reached.
//	loadeddata 	The first frame of the media has finished loading.
//	loadedmetadata 	The metadata has been loaded.
//	pause 	Playback has been paused.
//	play 	Playback has begun.
//	playing 	Playback is ready to start after having been paused or delayed due to lack of data.
//	progress 	Fired periodically as the browser loads a resource.
//	ratechange 	The playback rate has changed.
//	seeked 	A seek operation completed.
//	seeking 	A seek operation began.
//	stalled 	The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
//	suspend 	Media data loading has been suspended.
//	timeupdate 	The time indicated by the currentTimeattribute has been updated.
//	volumechange 	The volume has changed.
//	waiting 	Playback has stopped because of a temporary lack of data

}
