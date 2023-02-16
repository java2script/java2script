package swingjs.api.js;

import java.awt.Container;
import java.awt.Dimension;
import java.awt.Frame;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.net.URL;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.function.Function;

import javax.swing.BoxLayout;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JPanel;

import swingjs.api.JSUtilI;

/**
 * A full-service interface for HTML5 video element interaction. Allows setting
 * and getting HTML5 video element properties. ActionListeners can be set to
 * listen for JavaScript events associated with a video element.
 * 
 * Video is added using a JavaScript-only two-parameter constructor for
 * ImageIcon with "jsvideo" as the description, allowing for video construction
 * from byte[], File, or URL.
 * 
 * After adding the ImageIcon to a JLabel, calling
 * jlabel.getClientProperty("jsvideo") returns an HTML5 object of type
 * HTML5Video (the &lt;video&gt; tag), which has the full suite of HTML5 video
 * element properties, methods, and events.
 * 
 * Access to event listeners is via the method addActionListener, below, which
 * return an ActionEvent that has as its source both the video element source as
 * well as the original JavaScript event as an Object[] { jsvideo, event }. The
 * id of this ActionEvent is 12345, and its command is the name of the event,
 * for example, "canplay" or "canplaythrough".
 * 
 * See https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement for
 * details.
 * 
 * @author hansonr
 *
 */
public interface HTML5Video extends DOMNode {

	final static String[] eventTypes = new String[] { "audioprocess", // The input buffer of a ScriptProcessorNode is
																		// ready to be processed.
			"canplay", // The browser can play the media, but estimates that not enough data has been
						// loaded to play the media up to its end without having to stop for further
						// buffering of content.
			"canplaythrough", // The browser estimates it can play the media up to its end without stopping
								// for content buffering.
			"complete", // The rendering of an OfflineAudioContext is terminated.
			"durationchange", // The duration attribute has been updated.
			"emptied", // The media has become empty; for example, this event is sent if the media has
						// already been loaded (or partially loaded), and the load() method is called to
						// reload it.
			"ended", // Playback has stopped because the end of the media was reached.
			"loadeddata", // The first frame of the media has finished loading.
			"loadedmetadata", // The metadata has been loaded.
			"pause", // Playback has been paused.
			"play", // Playback has begun.
			"playing", // Playback is ready to start after having been paused or delayed due to lack of
						// data.
			"progress", // Fired periodically as the browser loads a resource.
			"ratechange", // The playback rate has changed.
			"seeked", // A seek operation completed.
			"seeking", // A seek operation began.
			"stalled", // The user agent is trying to fetch media data, but data is unexpectedly not
						// forthcoming.
			"suspend", // Media data loading has been suspended.
			"timeupdate", // The time indicated by the currentTimeattribute has been updated.
			"volumechange", // The volume has changed.
			"waiting", // Playback has stopped because of a temporary lack of data
	};

	// direct methods

	public void addTextTrack() throws Throwable;

	public Object captureStream() throws Throwable;

	public String canPlayType(String mediaType) throws Throwable;

	public void fastSeek(double time) throws Throwable;

	public void load() throws Throwable;

	public void mozCaptureStream() throws Throwable;

	public void mozCaptureStreamUntilEnded() throws Throwable;

	public void mozGetMetadata() throws Throwable;

	public void pause() throws Throwable;

	public Promise play() throws Throwable;

	public Promise seekToNextFrame() throws Throwable;

	public Promise setMediaKeys(Object mediaKeys) throws Throwable;

	public Promise setSinkId(String id) throws Throwable;

	// convenience methods

	public static double getDuration(HTML5Video v) {
		return /** @j2sNative v.duration || */
		0;
	}

	public static double setCurrentTime(HTML5Video v, double time) {
		return /** @j2sNative v.currentTime = time|| */
		0;
	}

	public static double getCurrentTime(HTML5Video v) {
		return /** @j2sNative v.currentTime|| */
		0;
	}

	public static String getErrorMessage(HTML5Video v) {
		return /** @j2sNative v.error && v.error.message || */null;
	}

	public static Dimension getSize(HTML5Video v) {
		return new Dimension(/** @j2sNative v.videoWidth || */
				0, /** @j2sNative v.videoHeight|| */
				0);
	}

	/**
	 * 
	 * Create a BufferedIfmage from the current frame. The image will be of type
	 * swingjs.api.JSUtilI.TYPE_4BYTE_HTML5, matching the data buffer of HTML5
	 * images.
	 * 
	 * @param v
	 * @param imageType  if Integer.MIN_VALUE, swingjs.api.JSUtilI.TYPE_4BYTE_HTML5
	 * @return an image, or null if width or height == 0 
	 */
	public static BufferedImage getImage(HTML5Video v, int imageType) {
		Dimension d = HTML5Video.getSize(v);
		BufferedImage image = (BufferedImage) HTML5Video.getProperty(v, "_image");
		if (image == null || image.getWidth() != d.width || image.getHeight() != d.height) {
			if (d.width == 0 || d.height == 0)
				return null;
			image = new BufferedImage(d.width, d.height, imageType == Integer.MIN_VALUE ? JSUtilI.TYPE_4BYTE_HTML5 : imageType);
			HTML5Video.setProperty(v, "_image", image);
		}
		HTML5Canvas.setImageNode(v, image);
		return image;
	}

	// property setting and getting

	/**
	 * Set a property of the the HTML5 video element using jsvideo[key] = value.
	 * Numbers and Booleans will be unboxed.
	 * 
	 * @param jsvideo the HTML5 video element
	 * @param key
	 * @param value
	 */
	public static void setProperty(HTML5Video jsvideo, String key, Object value) {
		if (value instanceof Number) {
			/** @j2sNative jsvideo[key] = +value; */
		} else if (value instanceof Boolean) {
			/** @j2sNative jsvideo[key] = !!+value */
		} else {
			/** @j2sNative jsvideo[key] = value; */
		}
	}

	/**
	 * Get a property using jsvideo[key], boxing number as Double and boolean as
	 * Boolean.
	 * 
	 * @param jsvideo the HTML5 video element
	 * 
	 * @param key
	 * @return value or value boxed as Double or Boolean
	 */
	@SuppressWarnings({ "unused", "null" })
	public static Object getProperty(HTML5Video jsvideo, String key) {
		Object val = (/** @j2sNative 1? jsvideo[key] : */
		null);
		if (val == null)
			return null;
		switch (/** @j2sNative typeof val || */
		"") {
		case "number":
			return Double.valueOf(/** @j2sNative val || */
					0);
		case "boolean":
			return Boolean.valueOf(/** @j2sNative val || */
					false);
		default:
			return val;
		}
	}

	// event action

	/**
	 * Add an ActionListener for the designated events. When an event is fired,
	 * 
	 * @param jsvideo  the HTML5 video element
	 * @param listener
	 * @param events   array of events to listen to or null to listen on all video
	 *                 element event types
	 * @return an array of event/listener pairs that can be used for removal. If null, all events.
	 */
	public static Object[] addActionListener(HTML5Video jsvideo, ActionListener listener, String... events) {
		if (events == null || events.length == 0)
			events = eventTypes;
		@SuppressWarnings("unused")
		Function<Object, Void> f = new Function<Object, Void>() {

			@Override
			public Void apply(Object jsevent) {
				String name = (/** @j2sNative jsevent.type || */
				"?");
				//System.out.println("HTML5Video " + (/** @j2sNative jsevent.target.id || */null) + " " + name);
				ActionEvent e = new ActionEvent(new Object[] { jsvideo, jsevent }, 12345, name,
						System.currentTimeMillis(), 0);
				listener.actionPerformed(e);
				return null;
			}
		};
		ArrayList<Object> listeners = new ArrayList<>();
		for (int i = 0; i < events.length; i++) {
			Object func = /**
							 * @j2sNative function(event){f.apply$O.apply(f, [event])} ||
							 */
					null;
			listeners.add(events[i]);
			listeners.add(func);
			if (jsvideo != null)
				jsvideo.addEventListener(events[i], func);

		}
		return listeners.toArray(new Object[listeners.size()]);
	}

	/**
	 * Remove action listener
	 * 
	 * @param jsvideo   the HTML5 video element
	 * @param listeners an array of event/listener pairs created by
	 *                  addActionListener
	 */
	public static void removeActionListener(HTML5Video jsvideo, Object[] listeners) {
		if (listeners == null) {
			for (int i = 0; i < eventTypes.length; i++) {
				jsvideo.removeEventListener(eventTypes[i]);
			}
			return;
		}
		
		for (int i = 0; i < listeners.length; i += 2) {
			String event = (String) listeners[i];
			Object listener = listeners[i + 1];
			jsvideo.removeEventListener(event, listener);
		}
	}

	/**
	 * Create an ImageIcon which, when placed in a JLabel, displays the video.
	 * 
	 * @param source
	 * @return
	 */
	public static ImageIcon createIcon(Object source) {
		try {
			if (source instanceof URL) {
				return new ImageIcon((URL) source, "jsvideo");
			} else if (source instanceof byte[]) {
				return new ImageIcon((byte[]) source, "jsvideo");
			} else if (source instanceof File) {
				return new ImageIcon(Files.readAllBytes(((File) source).toPath()));
			} else {
				return new ImageIcon(Files.readAllBytes(new File(source.toString()).toPath()));
			}
		} catch (Throwable t) {
			return null;
		}
	}

	/**
	 * Create a label that, when shown, displays the video.
	 * 
	 * @param source
	 * @return
	 */
	public static JLabel createLabel(Object source) {
		ImageIcon icon = (source instanceof ImageIcon ? (ImageIcon) source : createIcon(source));
		return (icon == null ? null : new JLabel(icon));
	}

	/**
	 * Create a dialog that includes rudimentary controls. Optional maxWidth allows
	 * image downscaling by factors of two.
	 * 
	 * @param parent
	 * @param source
	 * @param maxWidth
	 * @return
	 */
	public static JDialog createDialog(Frame parent, Object source, int maxWidth,
			Function<HTML5Video, Void> whenReady) {
		return createDialog(parent, source, maxWidth, true, whenReady);
	}
	
	public static class HTML5VideoDialog extends JDialog {

		public HTML5VideoDialog(Frame parent) {
			super(parent);
		}
		public JPanel controls;
		
	}
	public static JDialog createDialog(Frame parent, Object source, int maxWidth, boolean addControls,
			Function<HTML5Video, Void> whenReady) {
		HTML5VideoDialog dialog = new HTML5VideoDialog(parent);
		Container p = dialog.getContentPane();
		p.setLayout(new BoxLayout(p, BoxLayout.Y_AXIS));
		JLabel label = (source instanceof JLabel ? (JLabel) source : createLabel(source));
		label.setAlignmentX(0.5f);
		// not in Java! dialog.putClientProperty("jsvideo", label);
		p.add(label);
		label.setVisible(false);
		JPanel q = dialog.controls = getControls(label);
			p.add(q);
			q.setVisible(addControls);
		label.putClientProperty("controls", q);
		dialog.setModal(false);
		dialog.pack();
		dialog.setVisible(true);
		dialog.setVisible(false);
		HTML5Video jsvideo = (HTML5Video) label.getClientProperty("jsvideo");
		/**
		 * @j2sNative
		 * 
		 * jsvideo.dialog = dialog;
		 * 
		 */
		Object[] j2sListener = HTML5Video.addActionListener(jsvideo, new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (label.getClientProperty("jsvideo.size") != null)
					return;
				Dimension dim = HTML5Video.getSize(jsvideo);
				while (dim.width > maxWidth) {
					dim.width /= 2;
					dim.height /= 2;
				}
				label.putClientProperty("jsvideo.size", dim);
				label.setPreferredSize(dim);
				label.setVisible(true);
//				label.invalidate();
				dialog.pack();
//				dialog.setVisible(false);
				if (whenReady != null)
					whenReady.apply(jsvideo);
				HTML5Video.removeActionListener(jsvideo, (Object[]) HTML5Video.getProperty(jsvideo, "j2sListener"));
			}

		}, "canplaythrough");
		HTML5Video.setProperty(jsvideo, "j2sListener", j2sListener);
		HTML5Video.setCurrentTime(jsvideo, 0);
		return dialog;
	}
	
	static JPanel getControls(JLabel label) {

		JPanel controls = new JPanel();
		controls.setAlignmentX(0.5f);
		JButton btn = new JButton("play");
		btn.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				try {
					((HTML5Video) label.getClientProperty("jsvideo")).play();
				} catch (Throwable e1) {
					e1.printStackTrace();
				}
			}

		});
		controls.add(btn);

		btn = new JButton("pause");
		btn.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				try {
					((HTML5Video) label.getClientProperty("jsvideo")).pause();
				} catch (Throwable e1) {
					e1.printStackTrace();
				}
			}

		});
		controls.add(btn);
		
		btn = new JButton("reset");
		btn.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				HTML5Video.setCurrentTime((HTML5Video) label.getClientProperty("jsvideo"), 0);
			}

		});
		controls.add(btn);

		return controls;
	}

	/**
	 * Advance to the next frame, using seekToNextFrame() if available, or using the time difference supplied.
	 * 
	 * @param jsvideo
	 * @param dt  seconds to advance if seekToNextFrame() is not available
	 * @return true if can use seekToNextFrame()
	 * 
	 */
	public static boolean nextFrame(HTML5Video jsvideo, double dt) {
		Boolean canSeek = (Boolean) getProperty(jsvideo,"_canseek");
		if (canSeek == null) {
			setProperty(jsvideo, "_canseek", canSeek = Boolean.valueOf(getProperty(jsvideo, "seekToNextFrame") != null));
		}
		try {			
			if (canSeek) {
				jsvideo.seekToNextFrame();
			} else {
				HTML5Video.setCurrentTime(jsvideo, HTML5Video.getCurrentTime(jsvideo) + dt);						
			}
		} catch (Throwable e1) {
		}
		return canSeek.booleanValue();
	}

	public static int getFrameCount(HTML5Video jsvideo) {
		return (int) (getDuration(jsvideo) / 0.033334);
	}

	public static void startVideo(HTML5Video jsvideo) {
		@SuppressWarnings("unused")
		HTML5VideoDialog d = /** @j2sNative jsvideo.dialog || */null;
		try {
			/**
			 * @j2sNative
			 * 
			 * 			var promise = jsvideo.play();
			 *            if (promise !== undefined) { promise["catch"](function(){
			 *            d.controls.setVisible$Z(true);d.pack$();
			 *            if (!d.t)
			 *            d.t = setTimeout(function(){
			 *            alert("Please press OK and then the play button.")}
			 *            ,1000); }); }
			 * 
			 */
		} catch (Throwable e) {
			e.printStackTrace();
		}

		// TODO Auto-generated method stub
		
	}

// HTMLMediaElement properties

//	audioTracks
//	autoplay
//	buffered Read only
//	controller
//	controls
//	controlsList Read only
//	crossOrigin
//	currentSrc Read only
//	currentTime
//	defaultMuted
//	defaultPlaybackRate
//	disableRemotePlayback
//	duration Read only
//	ended Read only
//	error Read only
//	loop
//	mediaGroup
//	mediaKeys Read only
//	mozAudioCaptured Read only
//	mozFragmentEnd
//	mozFrameBufferLength
//	mozSampleRate Read only
//	muted
//	networkState Read only
//	paused Read only
//	playbackRate
//	played Read only
//	preload
//	preservesPitch
//	readyState Read only
//	seekable Read only
//	seeking Read only
//	sinkId Read only
//	src
//	srcObject
//	textTracks Read only
//	videoTracks Read only
//	volume
//	initialTime Read only
//	mozChannels Read only

}
