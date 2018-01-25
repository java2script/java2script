package edu.stonybrook.eserc.projectjava.WaveInteraction2;

import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Timer;

import a2s.Applet;
import a2s.Button;
import a2s.Scrollbar;
//a2s is a SwingJS Java AWT adapter package that allow us to 
//keep references here that look like AWT Applet and Components
//even though everything has to be Swing JApplet and JComponents.
//It fixes painting problems using paintMe(g) instead of paint(g) or update(g)
//and also provides Java 1.0 event handling.

/*
        Project Java, LICIL
	Author: Konstantin Lukin
        Modified for 3 waves by Glenn A. Richard - May, 2002
        Modified for SwingJS by Bob Hanson - Jan, 2017
        
*/


//web_Ready
//web_AppletName= Wave Interaction(2)
//web_Description= Adjust three sinusoidal waves and see their sum
//web_JavaVersion= http://www.eserc.stonybrook.edu/ProjectJava/WaveInteractionApplet
//web_AppletImage= waveinteraction2.png
//web_Category= Physics - Waves
//web_Info= width:700,height:700
//web_Date= $Date: 2016-12-30 10:36:32 -0600 (Fri, 30 Dec 2016) $
//web_Features= graphics, AWT-to-Swing with handleEvent, resizing added

// SwingJS optimizations: removal of new Point() in graphics draw methods

// SwingJS enhancements: adds resizing

public class WaveInteractionApplet extends Applet implements Runnable {

private Rectangle border, graph, clip, control, space[], base[], part[];
private SineWave wave[], store_wave[];
private SumWaves sum;
private Box box[], speed_box[];
private Handle[] handle;
private Scrollbar bar[], speed[];
private Image[] image;
private Graphics[] offg;
private FontMetrics fm;
private Font label_font, graph_font, title_font;
private int index, update_mode, values_mode, runner_state, speed_value[];
private Timer runner; // SwingJS Thread alternative
Button button;
	private int width;    // SwingJS added
	private int height;   // SwingJS added
	private int msDelay;  // SwingJS added
	private int startSpeed; // SwingJS added


public String getAppletInfo() {
   return "Waveform Interaction, written by Konstantin Lukin. (ProjectJava, LICIL" +
          "\nModified for 3 waves by Glenn A. Richard - MPI - May, 2002" +
          "\nModified for SwingJS by Bob Hanson - St. Olaf College - Jan 2017";
}


public void init() {
	setSize(700, 700); // BH for floating applet use and testing; a bit larger than original
	super.init(); // BH for event handling and proper painting
   title_font = new Font("Helvetica", Font.BOLD , 16);
   label_font = new Font("Helvetica", Font.PLAIN, 14);
   graph_font = new Font("Helvetica", Font.PLAIN, 12);
   
   
		boolean isJS = false; // SwingJS adapting to slower processing of JavaScript

		/**
		 * @j2sNative isJS = true;
		 * 
		 */
		{
		}

		msDelay = (isJS ? 2 : 30); // SwingJS optimization
		startSpeed = (isJS ? 15 : 5); // SwingJS optimization

   speed_value = new int[3]; // there are 3 waves
   for(int i=0; i<speed_value.length; i++) speed_value[i] = startSpeed;
   setLayout(null);
   setWaves();
   setComponents();
   defineLayout(); // SwingJS moved here
   
   index = -1;
   update_mode = 3;
   values_mode = 9;
   runner_state = 0;
}


private void defineLayout() {
	if (this.getWidth() == width && this.getHeight() == height)
		return;
	width = getWidth();
	height = getHeight();
	this.offg = null;
   border = new Rectangle(5, 5, size().width-10, size().height-10);
   graph  = new Rectangle(border.x+5, border.y+5, border.width-150, border.height-10);
   clip   = new Rectangle(graph.x+50, graph.y+2, graph.width-60, graph.height-4);
   control= new Rectangle(graph.x+graph.width+5, border.y+5, 138, border.y+border.height-15);

   space = new Rectangle[4]; // bounds of offscreen images with absolute coordinates

   space[0] = new Rectangle(clip.x, clip.y,               clip.width, clip.height/6);
   space[1] = new Rectangle(clip.x, clip.y+clip.height/6, clip.width, clip.height/6);

   space[2] = new Rectangle(clip.x, clip.y+clip.height/3, clip.width, clip.height/6);


   space[3] = new Rectangle(clip.x, clip.y+clip.height/2, clip.width, clip.height/2);

   base = new Rectangle[4];  // bounds of waves with coordinates relative to space[]
   base[0] = new Rectangle(10, (space[0].height-90)/2, space[0].width-20, 90);
   base[1] = new Rectangle(10, (space[1].height-90)/2, space[1].width-20, 90);

   base[2] = new Rectangle(10, (space[2].height-90)/2, space[2].width-20, 90);



   base[3] = new Rectangle(10, (space[3].height-180)/2, space[3].width-20, 180);

   part = new Rectangle[4];  // control panel subdivision
   part[0] = new Rectangle(control.x, control.y, control.width, control.height*9/40);
   part[1] = new Rectangle(control.x, part[0].y+part[0].height, control.width, control.height*9/40);
   part[2] = new Rectangle(control.x, part[1].y+part[1].height, control.width, control.height*9/40);
   part[3] = new Rectangle(control.x, part[2].y+part[2].height, control.width, control.height*13/40);
   
   setHandles();
   setComponentPositions();
}

private void setComponentPositions() {
  Rectangle r;
  r = new Rectangle(part[0].x+10, part[0].y+20, part[0].width-20, part[0].height-30);
  for(int i=0; i<3; i++) {
     box[i] = new Box(r.x, r.y+i*r.height/3, r.width, r.height/3);
     bar[i].reshape(box[i].x, box[i].left.y, box[i].width, box[i].left.height);
  }

  r = new Rectangle(part[1].x+10, part[1].y+20, part[1].width-20, part[1].height-30);
  for(int i=3; i<6; i++) {
     box[i] = new Box(r.x, r.y+(i-3)*r.height/3, r.width, r.height/3);
     bar[i].reshape(box[i].x, box[i].left.y, box[i].width, box[i].left.height);
  }

  r = new Rectangle(part[2].x+10, part[2].y+20, part[2].width-20, part[2].height-30);
  for(int i=6; i<9; i++) {
     box[i] = new Box(r.x, r.y+(i-6)*r.height/3, r.width, r.height/3);
     bar[i].reshape(box[i].x, box[i].left.y, box[i].width, box[i].left.height);
  }

  r = new Rectangle(part[3].x+10, part[3].y+20, part[3].width-20, part[3].height-30);
  for(int i=0; i<speed.length; i++) {
     speed_box[i] = new Box(r.x, r.y+i*r.height/4, r.width, r.height/4);
     speed[i].reshape(speed_box[i].x, speed_box[i].left.y,
                      speed_box[i].width, speed_box[i].left.height);
  }
  button.reshape(r.x+20, r.y+3*r.height/4+3, r.width-40, r.height/4-6);
}



//---------------------------------------------------------------

@Override
public void start() {
	
	// The original applet used a thread with a do/while loop and Thread.sleep(),
	// but we cannot use that in JavaScript. In this case we use a javax.swing.Timer, 
	// which is just a simple repeating setTimeout call. 
	
	this.runner = new Timer(msDelay, new ActionListener() {

		@Override
		public void actionPerformed(ActionEvent e) {
			run();
		}

	});
	this.runner.setRepeats(true);
	this.runner.start();
}

	@Override
	public void run() {
		switch (runner_state) {
		case 0:
			break;
		case 1:
			wave[0].advance(speed_value[0]);
			wave[1].advance(speed_value[1]);
			wave[2].advance(speed_value[2]);
			repaint();
			break;
		default:
		}
	}

// The original threading method is preserved below:

//	public void start() {
//		runner = new Thread(this);
//		runner.setPriority(Thread.MIN_PRIORITY);
//		runner.start();
//	}
//
//	public void stop() {
//		// runner.stop();
//		runner = null;
//	}

//	public void run() {
//		while (true) {
//			pause(30);
//			runner.yield();
//			switch (runner_state) {
//			case 0:
//				break;
//			case 1:
//				wave[0].advance(speed_value[0]);
//				wave[1].advance(speed_value[1]);
//				wave[2].advance(speed_value[2]);
//				repaint();
//				break;
//			default:
//			}
//		}
//	}
//
//	private void pause(int time) {
//		try {
//			runner.sleep(time);
//		} catch (InterruptedException e) {
//		}
//	}

	@Override
	public void stop() {
		this.runner.stop();
		this.runner = null;
	}



private void startAnimation() {
   store_wave[0] = wave[0].copy();
   store_wave[1] = wave[1].copy();
   store_wave[2] = wave[2].copy();
   for(int i=0; i<3; i++) bar[3*i+2].disable(); // disable phase bars
   update_mode = 3;
   values_mode = -2;
   runner_state = 1;
}

private void stopAnimation() {
   runner_state = 0;
   for(int i=0; i<3; i++) wave[i].phase = store_wave[i].phase; // store wave phases
   for(int i=0; i<3; i++) bar[3*i+2].enable(); // enable phase bars
   update_mode = 3;
   values_mode = 9;
   repaint();
}
//---------------------------------------------------------------
public boolean action(Event evt, Object arg) {
   if(evt.target instanceof Button) {
      if(button.getLabel().equals("start")) {
         startAnimation();
         button.setLabel("stop");
      }
      else {
         stopAnimation();
         button.setLabel("start");
      }
   }
   else return super.action(evt, arg);
   return true;
}

//---------------------------------------------------------------
public boolean handleEvent(Event evt) {
   if(evt.id == Event.SCROLL_ABSOLUTE  || evt.id == Event.SCROLL_LINE_UP   ||
      evt.id == Event.SCROLL_LINE_DOWN || evt.id == Event.SCROLL_PAGE_UP   ||
                                          evt.id == Event.SCROLL_PAGE_DOWN)  {
      int i;
      for(i=0; i<12; i++)  {  // 12 bars in total
         if(i<9 && evt.target == bar[i])     break;
         else if(i>8 && evt.target == speed[i-9]) break;
      }
      switch(i) { // i is index of event target bar
         case 0: case 3: case 6: // wavelength bar
            wave[i/3].wavelength = bar[i].getValue() * 20/9;
            values_mode = i / 3 * 2;
            break;
         case 1: case 4: case 7:  // amplitude bar
            wave[i/3].amplitude  = bar[i].getValue() * 1/2;
            values_mode = i / 3 * 2;
            break;
         case 2: case 5: case 8: // phase bar
            wave[i/3].phase      = bar[i].getValue() * 4;
            values_mode = i / 3 * 2 + 1;
            break;
         case 9: case 10: case 11:
            speed_value[i-9] = (speed[i-9].getValue()/3);
            values_mode = i - 3;
            break;
         default:
      }
      update_mode = i/3;
   }
   else return super.handleEvent(evt);
   repaint();
   return true;
}


//---------------------------------------------------------------
public boolean mouseDown(Event evt, int x, int y) {
   if(runner_state==1) return super.mouseDown(evt,x,y);
   index = insideHandle(x,y);  // which handle are we in, if any? if none, -1
   if(index==-1) return super.mouseDown(evt, x, y);
   else {
      notifyBars(Color.lightGray);
   }
   return true;
}

public boolean mouseUp(Event evt, int x, int y) {
   if(runner_state==1) return super.mouseDown(evt,x,y);
   notifyBars(Color.gray);
   index = -1;
   return super.mouseUp(evt, x, y);
}

	public boolean mouseDrag(Event evt, int x, int y) {
		int i, newx, newy;
		switch (index) {
		case -1: // not in a handle
			return super.mouseDrag(evt, x, y);
		case 0:
		case 2:
		case 4: // phase handle
			i = index / 2;
			newx = x - space[i].x - base[i].x;
			int phase = AdjustPhase(newx * 360 / wave[i].wavelength);
			wave[i].phase = phase;
			updateBars();
			update_mode = index / 2;
			values_mode = index + 1;
			break;
		case 1:
		case 3:
		case 5: // shape handle
			i = index / 2;
			newx = x - space[i].x - base[i].x;
			newy = y - space[i].y - base[i].y;
			int amp = AdjustAmp(base[i].height / 2 - newy);
			wave[i].amplitude = amp;
			int lambda = (newx * 360) / (wave[i].phase + 90);
			lambda = AdjustLambda(lambda);
			wave[i].wavelength = lambda;
			updateBars();
			update_mode = index / 2;
			values_mode = index - 1;
			break;
		default:
			return super.mouseDrag(evt, x, y);
		}
		repaint();
		return true;
	}

	private int AdjustLambda(int lambda) {
		if (lambda > 200)
			return 200;
		else if (lambda < 5)
			return 5;
		else
			return lambda;
	}

	private int AdjustAmp(int amp) {
		if (amp > 45)
			return 45;
		else if (amp < 0)
			return 0;
		else
			return amp;
	}

	private int AdjustPhase(int phase) {
		if (phase > 360)
			return 360;
		else if (phase < 0)
			return 0;
		else
			return phase;
	}

	private int insideHandle(int x, int y) {
		int newx, newy;
		for (int i = 0; i < handle.length; i++) {
			newx = x - space[i / 2].x;
			newy = y - space[i / 2].y;
			if (handle[i].inside(newx, newy))
				return i;
		}
		return -1;
	}

	private void notifyBars(Color color) {
		switch (index) {
		case -1:
			return;
			// wave 0
		case 0: // phase
			bar[2].setBackground(color);
			break;
		case 1: // wavelength and amplitude
			bar[0].setBackground(color);
			bar[1].setBackground(color);
			break;
		// wave 1
		case 2: // phase
			bar[5].setBackground(color);
			break;
		case 3: // wavelength and amplitude
			bar[3].setBackground(color);
			bar[4].setBackground(color);
			break;
		// wave 2
		case 4: // phase
			bar[8].setBackground(color);
			break;
		case 5: // wavelength and amplitude
			bar[6].setBackground(color);
			bar[7].setBackground(color);
			break;
		}
	}

	private void updateBars() {
		switch (index) {
		case -1:
			return;
		case 0:
			bar[2].setValue(wave[0].phase / 4);
			break;
		case 1:
			bar[0].setValue(wave[0].wavelength * 9 / 20);
			bar[1].setValue(wave[0].amplitude * 2);
			break;
		case 2:
			bar[5].setValue(wave[1].phase / 4);
			break;
		case 3:
			bar[3].setValue(wave[1].wavelength * 9 / 20);
			bar[4].setValue(wave[1].amplitude * 9 / 4);
			break;
		case 4:
			bar[8].setValue(wave[2].phase / 4);
			break;
		case 5:
			bar[6].setValue(wave[2].wavelength * 9 / 20);
			bar[7].setValue(wave[2].amplitude * 9 / 4);
			break;
		}
	}

	// ---------------------------------------------------------------
	public void paintMe(Graphics g) {
		defineLayout();
		if (offg == null) {
			image = new Image[4];
			offg = new Graphics[4];
			for (int i = 0; i < image.length; i++) {
				image[i] = createImage(space[i].width, space[i].height);
				offg[i] = image[i].getGraphics();
			}
		}
		drawBorder(g);
		drawControl(g);
		drawGraph(g);
		update_mode = 3;
		values_mode = 9;

		drawValues(g);
		if (runner_state == 1) {
			update_mode = 3;
			values_mode = -2;
		}
		switch (update_mode) {
		case -1:
			return;
		case 0:
			drawImage0();
			drawImage3();
			g.drawImage(image[0], space[0].x, space[0].y, null);
			g.drawImage(image[3], space[3].x, space[3].y, null);
			break;
		case 1:
			drawImage1();
			drawImage3();
			g.drawImage(image[1], space[1].x, space[1].y, null);
			g.drawImage(image[3], space[3].x, space[3].y, null);
			break;
		case 2:
			drawImage2();
			drawImage3();
			g.drawImage(image[2], space[2].x, space[2].y, null);
			g.drawImage(image[3], space[3].x, space[3].y, null);
			break;
		case 3:
			drawImage0();
			drawImage1();
			drawImage2();
			drawImage3();
			g.drawImage(image[0], space[0].x, space[0].y, null);
			g.drawImage(image[1], space[1].x, space[1].y, null);
			g.drawImage(image[2], space[2].x, space[2].y, null);
			g.drawImage(image[3], space[3].x, space[3].y, null);
			break;
		default:
			return;
		}
	}

	/*--------------------------------------------------------------
	 ----------------------------------------------------------------*/
	private void setHandles(int i) {
		handle[2 * i].move(base[i].x + (wave[i].phase * wave[i].wavelength) / 360,
				space[i].height / 2);
		handle[2 * i + 1].move(handle[2 * i].Cx + wave[i].wavelength / 4,
				space[i].height / 2 - wave[i].amplitude);
	}

	void drawGraphPaper(int mode, int start1, int start2) {
		offg[mode].setColor(Color.darkGray);
		for (int i = start1; i < space[mode].width; i += 10) {
			offg[mode].drawLine(i, 0, i, space[mode].height);
		}
		for (int i = start2; i < space[mode].height; i += 10) {
			offg[mode].drawLine(0, i, space[mode].width, i);
		}
	}

	// ---------------
	private void drawImage0() {
		offg[0].setColor(Color.black);
		offg[0].fillRect(0, 0, space[0].width, space[0].height);
		drawGraphPaper(0, 0, 8);
		offg[0].setColor(new Color(0, 180, 0));
		wave[0].draw(offg[0], base[0].x, space[0].height / 2, base[0].width, 2);
		if (runner_state == 0) {
			setHandles(0);
			offg[0].setColor(Color.white);
			handle[0].draw(offg[0]);
			handle[1].draw(offg[0]);
		}
	}

	// ---------------------
	private void drawImage1() {
		offg[1].setColor(Color.black);
		offg[1].fillRect(0, 0, space[1].width, space[1].height);
		drawGraphPaper(1, 0, 2);
		offg[1].setColor(new Color(0, 180, 0));
		wave[1].draw(offg[1], base[1].x, space[1].height / 2, base[1].width, 2);
		if (runner_state == 0) {
			setHandles(1);
			offg[1].setColor(Color.white);
			handle[2].draw(offg[1]);
			handle[3].draw(offg[1]);
		}
	}

	// ---------------------
	private void drawImage2() {
		offg[2].setColor(Color.black);
		offg[2].fillRect(0, 0, space[2].width, space[2].height);
		drawGraphPaper(2, 0, 6);
		offg[2].setColor(new Color(0, 180, 0));
		wave[2].draw(offg[2], base[2].x, space[2].height / 2, base[2].width, 2);
		if (runner_state == 0) {
			setHandles(2);
			offg[2].setColor(Color.white);
			handle[4].draw(offg[2]);
			handle[5].draw(offg[2]);
		}
	}

	// ----------------------------
	private void drawImage3() {
		offg[3].setColor(Color.black);
		offg[3].fillRect(0, 0, space[3].width, space[3].height);
		drawGraphPaper(3, 0, 0);
		offg[3].setColor(Color.blue);
		sum.draw(offg[3], base[3].x, space[3].height / 2, base[3].width, 3);
	}

	// ---------------------------------------------------------------
	void drawBorder(Graphics g) {
		g.setColor(Color.black);
		g.fillRect(border.x, border.y, border.width, border.height);
		g.setColor(Color.white);
		g.drawRect(border.x - 1, border.y - 1, border.width, border.height);
		g.setColor(Color.gray);
		g.drawRect(border.x + 1, border.y + 1, border.width, border.height);
		g.setColor(Color.black);
		g.drawRect(border.x, border.y, border.width, border.height);
	}


	// ---------------------------------------------------------------
	void drawGraph(Graphics g) {
		g.setColor(Color.black);
		g.fillRect(graph.x, graph.y, graph.width + 1, graph.height + 1);

		drawGraphPaper(g);
		drawGraphLabels(g);
	}

	void drawGraphPaper(Graphics g) {
		g.setColor(Color.darkGray);
		for (int i = graph.x; i < graph.x + graph.width; i += 10) {
			g.drawLine(i, graph.y, i, graph.y + graph.height);
		}
		for (int i = graph.y; i < graph.y + graph.height; i += 10) {
			g.drawLine(graph.x, i, graph.x + graph.width, i);
		}
	}

	void drawGraphLabels(Graphics g) {
		g.setFont(graph_font);
		g.setColor(Color.lightGray);
		g.drawString("Wave1", graph.x + 5, space[0].y + space[0].height / 2);
		g.drawString("Wave2", graph.x + 5, space[1].y + space[1].height / 2);
		g.drawString("Wave3", graph.x + 5, space[2].y + space[2].height / 2);
		g.drawString("Sum", graph.x + 5, space[3].y + space[3].height / 2);
	}


	// ---------------------------------------------------------------
	void drawControl(Graphics g) {
		g.setColor(Color.black);
		g.fillRect(control.x, control.y, control.width, control.height);
		drawWaveBox0(g);
		drawWaveBox1(g);
		drawWaveBox2(g);
		drawAnimBox(g);
		drawSeparator(g);
		drawControlLabels(g);
	}

	void drawControlLabels(Graphics g) {
		g.setFont(label_font);
		String[] label = { "Wavelength", "Amplitude", "Phase" };
		for (int i = 0; i < 9; i++) {
			g.setColor(Color.black);
			box[i].fill(g, 0);
			g.setColor(Color.green);
			g.drawString(label[i % 3], box[i].x, box[i].y + box[i].top.height - 5);
		}
		String[] label1 = { "Velocity 1", "Velocity 2", "Velocity 3" };
		for (int i = 0; i < 3; i++) {
			g.setColor(Color.black);
			speed_box[i].fill(g, 0);
			g.setColor(Color.green);
			g.drawString(label1[i], speed_box[i].x, speed_box[i].y
					+ speed_box[i].top.height - 5);
		}
		label = null;
		label1 = null;
	}

	private void drawValues(Graphics g) {
		g.setFont(label_font);
		switch (values_mode) {
		case -2: // do nothing
			break;
		case -1: // fill all boxes
			g.setColor(Color.black);
			for (int i = 0; i < 9; i++)
				box[i].fill(g, 4);
			for (int i = 0; i < 3; i++)
				speed_box[i].fill(g, 4);
			break;
		case 0: // draw wavelength and amplitude of wave 0
			g.setColor(Color.black);
			box[0].fill(g, 4);
			box[1].fill(g, 4);
			g.setColor(Color.green);
			g.drawString("" + wave[0].wavelength, box[0].right_top.x, box[0].y
					+ box[0].top.height - 5);
			g.drawString("" + wave[0].amplitude, box[1].right_top.x, box[1].y
					+ box[1].top.height - 5);
			break;
		case 1: // draw phase of wave 0
			g.setColor(Color.black);
			box[2].fill(g, 4);
			g.setColor(Color.green);
			g.drawString("" + wave[0].phase, box[2].right_top.x, box[2].y
					+ box[2].top.height - 5);
			break;
		case 2: // draw wavelength and amplitude of wave 1
			g.setColor(Color.black);
			box[3].fill(g, 4);
			box[4].fill(g, 4);
			g.setColor(Color.green);
			g.drawString("" + wave[1].wavelength, box[3].right_top.x, box[3].y
					+ box[3].top.height - 5);
			g.drawString("" + wave[1].amplitude, box[4].right_top.x, box[4].y
					+ box[4].top.height - 5);
			break;
		case 3: // draw phase of wave 1
			g.setColor(Color.black);
			box[5].fill(g, 4);
			g.setColor(Color.green);
			g.drawString("" + wave[1].phase, box[5].right_top.x, box[5].y
					+ box[5].top.height - 5);
			break;

		case 4: // draw wavelength and amplitude of wave 2
			g.setColor(Color.black);
			box[6].fill(g, 4);
			box[7].fill(g, 4);
			g.setColor(Color.green);
			g.drawString("" + wave[2].wavelength, box[6].right_top.x, box[6].y
					+ box[6].top.height - 5);
			g.drawString("" + wave[2].amplitude, box[7].right_top.x, box[7].y
					+ box[7].top.height - 5);
			break;
		case 5: // draw phase of wave 2
			g.setColor(Color.black);
			box[8].fill(g, 4);
			g.setColor(Color.green);
			g.drawString("" + wave[2].phase, box[8].right_top.x, box[8].y
					+ box[8].top.height - 5);
			break;

		case 6: // draw speed of wave 0
			g.setColor(Color.black);
			speed_box[0].fill(g, 4);
			g.setColor(Color.green);
			g.drawString("" + speed_value[0], speed_box[0].right_top.x,
					speed_box[0].y + speed_box[0].top.height - 5);
			break;
		case 7: // draw speed of wave 1
			g.setColor(Color.black);
			speed_box[1].fill(g, 4);
			g.setColor(Color.green);
			g.drawString("" + speed_value[1], speed_box[1].right_top.x,
					speed_box[1].y + speed_box[1].top.height - 5);
			break;

		case 8: // draw speed of wave 2
			g.setColor(Color.black);
			speed_box[2].fill(g, 4);
			g.setColor(Color.green);
			g.drawString("" + speed_value[2], speed_box[2].right_top.x,
					speed_box[2].y + speed_box[2].top.height - 5);
			break;

		case 9: // draw all values
			g.setColor(Color.black);
			for (int i = 0; i < 9; i++)
				box[i].fill(g, 4);
			for (int i = 0; i < 3; i++)
				speed_box[i].fill(g, 4);
			g.setColor(Color.green);
			g.drawString("" + wave[0].wavelength, box[0].right_top.x, box[0].y
					+ box[0].top.height - 5);
			g.drawString("" + wave[0].amplitude, box[1].right_top.x, box[1].y
					+ box[1].top.height - 5);
			g.drawString("" + wave[0].phase, box[2].right_top.x, box[2].y
					+ box[2].top.height - 5);
			g.drawString("" + wave[1].wavelength, box[3].right_top.x, box[3].y
					+ box[3].top.height - 5);
			g.drawString("" + wave[1].amplitude, box[4].right_top.x, box[4].y
					+ box[4].top.height - 5);
			g.drawString("" + wave[1].phase, box[5].right_top.x, box[5].y
					+ box[5].top.height - 5);
			g.drawString("" + wave[2].wavelength, box[6].right_top.x, box[6].y
					+ box[6].top.height - 5);
			g.drawString("" + wave[2].amplitude, box[7].right_top.x, box[7].y
					+ box[7].top.height - 5);
			g.drawString("" + wave[2].phase, box[8].right_top.x, box[8].y
					+ box[8].top.height - 5);
			g.drawString("" + speed_value[0], speed_box[0].right_top.x,
					speed_box[0].y + speed_box[0].top.height - 5);
			g.drawString("" + speed_value[1], speed_box[1].right_top.x,
					speed_box[1].y + speed_box[1].top.height - 5);
			g.drawString("" + speed_value[2], speed_box[2].right_top.x,
					speed_box[2].y + speed_box[2].top.height - 5);
			break;
		default:
		}
	}

	private void drawSeparator(Graphics g) {
		g.setColor(Color.lightGray);
		g.drawLine(control.x, control.y, control.x, control.y + control.height);
	}

	private void drawWaveBox0(Graphics g) {
		Rectangle r;
		String s;
		fm = g.getFontMetrics(title_font);
		s = "Wave 1";

		r = new Rectangle(part[0].x + 5, part[0].y + 10, part[0].width - 10,
				part[0].height - 15);
		g.setColor(Color.lightGray);
		g.drawRoundRect(r.x, r.y, r.width, r.height, 20, 20);

		int w = fm.stringWidth(s) + 10;
		r = new Rectangle(r.x + (r.width - w) / 2, r.y - 10, w, 15);
		g.setColor(Color.black);
		g.fillRect(r.x, r.y, r.width, r.height);

		g.setFont(title_font);
		g.setColor(Color.red);
		g.drawString(s, r.x + (r.width - fm.stringWidth(s)) / 2, r.y + r.height);
		fm = null;
	}

	private void drawWaveBox1(Graphics g) {
		Rectangle r;
		String s;
		fm = g.getFontMetrics(title_font);
		s = "Wave 2";

		r = new Rectangle(part[1].x + 5, part[1].y + 10, part[1].width - 10,
				part[1].height - 15);
		g.setColor(Color.lightGray);
		g.drawRoundRect(r.x, r.y, r.width, r.height, 20, 20);

		int w = fm.stringWidth(s) + 10;
		r = new Rectangle(r.x + (r.width - w) / 2, r.y - 10, w, 15);
		g.setColor(Color.black);
		g.fillRect(r.x, r.y, r.width, r.height);

		g.setFont(title_font);
		g.setColor(Color.red);
		g.drawString(s, r.x + (r.width - fm.stringWidth(s)) / 2, r.y + r.height);
		fm = null;
	}

	private void drawWaveBox2(Graphics g) {
		Rectangle r;
		String s;
		fm = g.getFontMetrics(title_font);
		s = "Wave 3";

		r = new Rectangle(part[2].x + 5, part[2].y + 10, part[2].width - 10,
				part[2].height - 15);
		g.setColor(Color.lightGray);
		g.drawRoundRect(r.x, r.y, r.width, r.height, 20, 20);

		int w = fm.stringWidth(s) + 10;
		r = new Rectangle(r.x + (r.width - w) / 2, r.y - 10, w, 15);
		g.setColor(Color.black);
		g.fillRect(r.x, r.y, r.width, r.height);

		g.setFont(title_font);
		g.setColor(Color.red);
		g.drawString(s, r.x + (r.width - fm.stringWidth(s)) / 2, r.y + r.height);
		fm = null;
	}


	private void drawAnimBox(Graphics g) {
		Rectangle r;
		String text;
		g.setFont(title_font);
		fm = g.getFontMetrics(title_font);
		text = "Animation";

		r = new Rectangle(part[3].x + 5, part[3].y + 10, part[3].width - 10,
				part[3].height - 15);
		g.setColor(Color.lightGray);
		g.drawRoundRect(r.x, r.y, r.width, r.height, 20, 20);

		int w = fm.stringWidth(text) + 10;
		r = new Rectangle(r.x + (r.width - w) / 2, r.y - 10, w, 15);
		g.setColor(Color.black);
		g.fillRect(r.x, r.y, r.width, r.height);

		g.setColor(Color.red);
		g.drawString(text, r.x + (r.width - fm.stringWidth(text)) / 2, r.y
				+ r.height);
		fm = null;
	}

	// ---------------------------------------------------------------
	private void setHandles() {
		handle = new Handle[6];
		for (int i = 0; i < handle.length; i++) {
			if (i % 2 == 0) {
				handle[i] = new Handle(Handle.HORIZONTAL);
				handle[i].move(base[i / 2].x, base[i / 2].y + base[i / 2].height / 2);
			} else {
				handle[i] = new Handle(Handle.BOTH);
				handle[i].move(base[i / 2].x + wave[i / 2].wavelength / 4,
						base[i / 2].y + base[i / 2].height / 2 - wave[i / 2].amplitude);
			}
		}
	}


	private void setComponents() {
		box = new Box[9];
		speed_box = new Box[3];
		bar = new Scrollbar[9];
		speed = new Scrollbar[3];

		for (int i = 0; i < 3; i++) {
			int j = 3 * i;
			bar[j] = new Scrollbar(Scrollbar.HORIZONTAL, 0, 0, 0, 90);
			bar[j + 1] = new Scrollbar(Scrollbar.HORIZONTAL, 0, 0, 0, 90);
			bar[j + 2] = new Scrollbar(Scrollbar.HORIZONTAL, 0, 0, 0, 90);
			speed[i] = new Scrollbar(Scrollbar.HORIZONTAL, 0, 0, 0, 90);

			add(bar[j]);
			add(bar[j + 1]);
			add(bar[j + 2]);
			add(speed[i]);

			bar[j].setBackground(Color.gray);
			bar[j + 1].setBackground(Color.gray);
			bar[j + 2].setBackground(Color.gray);
			speed[i].setBackground(Color.gray);

			bar[j].setValue(wave[i].wavelength * 9 / 20);
			bar[j + 1].setValue(wave[i].amplitude * 2);
			bar[j + 2].setValue(wave[i].phase * 1 / 4);
			speed[i].setValue(speed_value[i] * 3);
		}

		button = new Button("start");
		button.setFont(title_font);
		button.setBackground(Color.lightGray);
		button.setForeground(Color.black);
		add(button);
	}


	private void setWaves() {
		wave = new SineWave[3];
		store_wave = new SineWave[3];
		wave[0] = new SineWave(40, 40, 0);
		wave[1] = new SineWave(30, 40, 0);
		wave[2] = new SineWave(40, 30, 0);
		sum = new SumWaves(wave[0], wave[1], wave[2]);
	}

// SwingJS optimization: initial

//	Clazz.startProfiling(10,true)
//	"use Clazz.getProfile() to show results"
//	total wall time: 10 sec
//
//	count   	prep(ms)	exec(ms)
//	--------	--------	--------
//	....143043	......2033	.....26916	
//	--------	--------	--------
//	....132480	......1800	......1011	java.awt.Point construct 
//	......1728	........48	.........1	java.awt.BasicStroke construct 
//	......1728	........26	........22	java.util.HashMap construct 
//	......1728	........22	......1140	swingjs.JSGraphics2D create 
//	......1152	........28	.......177	swingjs.JSGraphics2D drawString 
//	.......827	........18	........26	java.awt.Rectangle construct 
//	.......827	.........7	.........6	java.awt.geom.Rectangle2D construct 
//	.......576	........13	.........0	swingjs.plaf.JSComponentUI paint 
//	.......180	.........6	........45	edu.stonybrook.eserc.projectjava.WaveInteraction2.WaveInteractionApplet drawGraphPaper 
//	.......144	.........4	........62	swingjs.JSGraphics2D drawImage 
//	.......144	.........3	.........0	swingjs.JSGraphics2D getFontMetrics 
//	.......142	.........3	.........4	java.lang.Thread init 
//	.......108	.........3	......5261	edu.stonybrook.eserc.projectjava.WaveInteraction2.SineWave draw 
//	.......107	.........1	.........1	JU.Lst construct 
//	.......106	.........3	.........3	java.awt.AWTEvent construct 
//	........71	.........4	.........6	java.awt.event.InvocationEvent construct 
//	........71	.........3	........18	java.awt.EventDispatchThread construct 
//	........71	.........2	.........3	java.util.HashMap.Entry construct 
//	........71	.........1	.........8	JU.JSThread construct 
//	........71	.........1	.........5	java.lang.Thread construct 
//	........71	.........1	.........0	java.util.MapEntry construct 
//	........71	.........1	.........0	java.awt.EventQueue noEvents 
//	........71	.........0	.........2	JU.JSThread start 
//	........70	.........1	.......113	javax.swing.JApplet repaint 
//	........70	.........1	........80	javax.swing.RepaintManager scheduleProcessingRunnable 
//	........36	.........1	......9161	javax.swing.JLayeredPane paint 
//	........36	.........1	......1943	edu.stonybrook.eserc.projectjava.WaveInteraction2.SumWaves draw 
//	........36	.........1	.........0	java.util.IdentityHashMap.IdentityHashMapEntry construct 
//	........36	.........0	......7701	a2s.Applet$1 paintComponent 
//	........36	.........0	........41	javax.swing.JApplet getGraphics 
//	........36	.........0	.........4	java.util.IdentityHashMap getEntry 
//	........36	.........0	.........0	javax.swing.AbstractButton paintBorder 
//	........36	.........0	.........0	java.awt.Rectangle setBounds 
//	........35	........12	.........6	java.awt.event.ActionEvent construct 
//	........35	.........1	........51	javax.swing.RepaintManager addDirtyRegion 
//
//	 Total new objects: 164511
//
//	count   	exec(ms)
//	--------	--------	------------------------------
//	........72	.........1		java.awt.EventDispatchThread.HierarchyEventFilter
//	.......143	.........2		java.awt.EventDispatchThread$1
//	........71	........13		java.awt.event.InvocationEvent
//	.......107	.........7		JU.Lst
//	........71	........24		java.awt.EventDispatchThread
//	........71	.........7		java.util.HashMap.Entry
//	........71	.........1		java.awt.EventQueueItem
//	........36	.........0		java.util.IdentityHashMap$1$1
//	........36	.........0		java.util.IdentityHashMap.IdentityHashMapIterator
//	........36	.........2		java.util.IdentityHashMap.IdentityHashMapEntry
//	......2880	........43		java.util.Hashtable
//	......2880	........26		Float
//	.....14184	.......125		java.util.HashtableEntry
//	......1728	........12		java.awt.Graphics
//	......1728	........18		java.awt.geom.AffineTransform
//	......1728	........77		java.util.HashMap
//	......1728	.......129		java.awt.RenderingHints
//	......1728	........12		java.util.AbstractMap
//	......1728	........74		java.awt.BasicStroke
//	.......827	........61		java.awt.Rectangle
//	.......108	.........2		java.awt.Color
//	....132480	......4525		java.awt.Point
//	........35	........21		java.awt.event.ActionEvent
//	........35	.........0		javax.swing.Timer$1
//	....164511	......5194	
	
// After removal of new Point():
	
//	Clazz.startProfiling(10,true)
//	"use Clazz.getProfile() to show results"
//	total wall time: 10 sec
//
//	count   	prep(ms)	exec(ms)
//	--------	--------	--------
//	.....29988	.......637	.....20160	
//	--------	--------	--------
//	......4896	.......140	.........6	java.awt.BasicStroke construct 
//	......4896	........71	........63	java.util.HashMap construct 
//	......4896	........62	......3125	swingjs.JSGraphics2D create 
//	......3264	........74	.......485	swingjs.JSGraphics2D drawString 
//	......2346	........51	........71	java.awt.Rectangle construct 
//	......2346	........22	........18	java.awt.geom.Rectangle2D construct 
//	......1632	........39	.........1	swingjs.plaf.JSComponentUI paint 
//	.......510	........21	.......115	edu.stonybrook.eserc.projectjava.WaveInteraction2.WaveInteractionApplet drawGraphPaper 
//	.......408	........16	.......178	swingjs.JSGraphics2D drawImage 
//	.......408	.........9	.........0	swingjs.JSGraphics2D getFontMetrics 
//	.......408	.........8	........13	java.lang.Thread init 
//	.......306	........10	......1808	edu.stonybrook.eserc.projectjava.WaveInteraction2.SineWave draw 
//	.......306	.........8	.........8	java.awt.AWTEvent construct 
//	.......306	.........4	.........4	JU.Lst construct 
//	.......204	........11	........16	java.awt.event.InvocationEvent construct 
//	.......204	.........8	........48	java.awt.EventDispatchThread construct 
//	.......204	.........6	.........8	java.util.HashMap.Entry construct 
//	.......204	.........4	.......290	javax.swing.JApplet repaint 
//	.......204	.........4	.......191	javax.swing.RepaintManager scheduleProcessingRunnable 
//	.......204	.........4	........22	JU.JSThread construct 
//	.......204	.........4	........14	java.lang.Thread construct 
//	.......204	.........4	.........0	java.util.MapEntry construct 
//	.......204	.........3	.........0	java.awt.EventQueue noEvents 
//	.......204	.........2	.........6	JU.JSThread start 
//	.......102	........18	........13	java.awt.event.ActionEvent construct 
//	.......102	.........4	.......131	javax.swing.RepaintManager addDirtyRegion 
//	.......102	.........3	.........0	java.util.IdentityHashMap.IdentityHashMapEntry construct 
//	.......102	.........2	......8121	javax.swing.JLayeredPane paint 
//	.......102	.........2	......4209	a2s.Applet$1 paintComponent 
//	.......102	.........2	......1080	edu.stonybrook.eserc.projectjava.WaveInteraction2.SumWaves draw 
//	.......102	.........1	........91	javax.swing.JApplet getGraphics 
//	.......102	.........1	.........9	java.util.IdentityHashMap getEntry 
//	.......102	.........1	.........1	javax.swing.AbstractButton paintBorder 
//	.......102	.........1	.........0	java.awt.Rectangle setBounds 
//
//	 Total new objects: 90782
//
//	count   	exec(ms)
//	--------	--------	------------------------------
//	.......205	.........5		java.awt.EventDispatchThread.HierarchyEventFilter
//	.......409	.........6		java.awt.EventDispatchThread$1
//	.......102	........37		java.awt.event.ActionEvent
//	......2346	.......168		java.awt.Rectangle
//	.......204	........35		java.awt.event.InvocationEvent
//	.......306	........17		JU.Lst
//	.......204	........64		java.awt.EventDispatchThread
//	.......204	........19		java.util.HashMap.Entry
//	.......204	.........2		java.awt.EventQueueItem
//	.......102	.........1		javax.swing.Timer$1
//	.......102	.........1		java.util.IdentityHashMap$1$1
//	.......102	.........0		java.util.IdentityHashMap.IdentityHashMapIterator
//	.......102	.........5		java.util.IdentityHashMap.IdentityHashMapEntry
//	......8160	.......128		java.util.Hashtable
//	......8160	........73		Float
//	.....40188	.......341		java.util.HashtableEntry
//	......4896	........33		java.awt.Graphics
//	......4896	........50		java.awt.geom.AffineTransform
//	......4896	.......213		java.util.HashMap
//	......4896	.......357		java.awt.RenderingHints
//	......4896	........36		java.util.AbstractMap
//	......4896	.......213		java.awt.BasicStroke
//	.......306	.........8		java.awt.Color
//	.....90782	......1824	

// after removing Hashtable creation in JSGraphics2D:
	
//	Clazz.startProfiling(10,true)
//	"use Clazz.getProfile() to show results"
//	total wall time: 10 sec
//
//	count   	prep(ms)	exec(ms)
//	--------	--------	--------
//	.....33810	.......672	.....20770	
//	--------	--------	--------
//	......5520	.......135	.........6	java.awt.BasicStroke construct 
//	......5520	........78	........51	java.util.HashMap construct 
//	......5520	........64	......2861	swingjs.JSGraphics2D create 
//	......3680	........81	.......555	swingjs.JSGraphics2D drawString 
//	......2645	........54	........81	java.awt.Rectangle construct 
//	......2645	........24	........20	java.awt.geom.Rectangle2D construct 
//	......1840	........43	.........1	swingjs.plaf.JSComponentUI paint 
//	.......575	........23	.......126	edu.stonybrook.eserc.projectjava.WaveInteraction2.WaveInteractionApplet drawGraphPaper 
//	.......460	........18	.......204	swingjs.JSGraphics2D drawImage 
//	.......460	........11	.........0	swingjs.JSGraphics2D getFontMetrics 
//	.......460	.........9	........13	java.lang.Thread init 
//	.......345	........12	......2030	edu.stonybrook.eserc.projectjava.WaveInteraction2.SineWave draw 
//	.......345	.........9	.........9	java.awt.AWTEvent construct 
//	.......345	.........5	.........4	JU.Lst construct 
//	.......230	........12	........31	java.awt.event.InvocationEvent construct 
//	.......230	.........8	........51	java.awt.EventDispatchThread construct 
//	.......230	.........7	.........9	java.util.HashMap.Entry construct 
//	.......230	.........5	.......296	javax.swing.JApplet repaint 
//	.......230	.........4	.......194	javax.swing.RepaintManager scheduleProcessingRunnable 
//	.......230	.........4	........23	JU.JSThread construct 
//	.......230	.........4	........15	java.lang.Thread construct 
//	.......230	.........4	.........0	java.util.MapEntry construct 
//	.......230	.........3	.........0	java.awt.EventQueue noEvents 
//	.......230	.........2	.........6	JU.JSThread start 
//	.......115	........18	........14	java.awt.event.ActionEvent construct 
//	.......115	.........4	.......134	javax.swing.RepaintManager addDirtyRegion 
//	.......115	.........3	......1216	edu.stonybrook.eserc.projectjava.WaveInteraction2.SumWaves draw 
//	.......115	.........3	.........0	java.util.IdentityHashMap.IdentityHashMapEntry construct 
//	.......115	.........2	......7981	javax.swing.JLayeredPane paint 
//	.......115	.........2	......4721	a2s.Applet$1 paintComponent 
//	.......115	.........2	.........9	java.util.IdentityHashMap getEntry 
//	.......115	.........2	.........1	javax.swing.AbstractButton paintBorder 
//	.......115	.........2	.........0	java.awt.Rectangle setBounds 
//	.......115	.........1	........91	javax.swing.JApplet getGraphics 
//
//	 Total new objects: 47840
//
//	count   	exec(ms)
//	--------	--------	------------------------------
//	.......230	.........5		java.awt.EventDispatchThread.HierarchyEventFilter
//	.......460	.........6		java.awt.EventDispatchThread$1
//	.......230	........50		java.awt.event.InvocationEvent
//	.......345	........18		JU.Lst
//	.......230	........67		java.awt.EventDispatchThread
//	.......230	........20		java.util.HashMap.Entry
//	.......230	.........2		java.awt.EventQueueItem
//	.......115	.........1		java.util.IdentityHashMap$1$1
//	.......115	.........1		java.util.IdentityHashMap.IdentityHashMapIterator
//	.......115	.........6		java.util.IdentityHashMap.IdentityHashMapEntry
//	......9200	.......105		Float
//	......5520	........33		java.awt.Graphics
//	......5520	........58		java.awt.geom.AffineTransform
//	......5520	.......212		java.util.HashMap
//	......5520	.......377		java.awt.RenderingHints
//	......5520	........38		java.util.AbstractMap
//	......5520	.......212		java.awt.BasicStroke
//	......2645	.......184		java.awt.Rectangle
//	.......345	.........8		java.awt.Color
//	.......115	........38		java.awt.event.ActionEvent
//	.......115	.........1		javax.swing.Timer$1
//	.....47840	......1454	
//	
}




