package edu.uwi;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.text.DecimalFormat;

import javajs.util.SB;

import javax.swing.BorderFactory;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.JViewport;
import javax.swing.ScrollPaneConstants;
import javax.swing.border.Border;
//import java.awt.Toolkit;
//import java.awt.datatransfer.Clipboard;
//import java.awt.datatransfer.StringSelection;

// SwingJS[1] -- move explicit java.awt... references to imports.
// SwingJS[2] -- Clipboard is not supported in JavaScript.
// SwingJS[3] -- It is necessary to use setPreferredSize() on a JPanel.
// SwingJS[4] -- original calls Canvas.paint(Graphics) directly; this does not work with JPanel
// SwingJS       (and probably should never be done even in AWT -- 
// SwingJS        see http://stackoverflow.com/questions/18816251/calling-the-paint-method-from-another-class
// SwingJS[5] -- We use a thread here instead of a blocking loop -- this caused a thread-clash

//web_Ready
//web_AppletName= Boltzmann
//web_Description= A simulation of the Boltzmann distribution.
//web_Date= $Date: 2017-03-09 22:25:55 -0600 (Thu, 09 Mar 2017) $
//web_AppletImage= boltzmann.png
//web_Category= Chemistry
//web_Features= canvas, simple threading, scrolling text

// SwingJS TODO: thread in JS, JTextArea
/*
 A basic extension of the JApplet class
 */
public class Boltzmann extends JApplet {

	//_CONTROLS
	JPanel BoltzSimGraph = new JPanel();
	BoltzCanvas DispBoltz = new BoltzCanvas(this);
	JPanel EntropyGraph = new JPanel();
	EntropyCanvas DispEntropy = new EntropyCanvas();
	Border lineBorder1 = BorderFactory.createLineBorder(Color.black);
	Border lineBorder2 = BorderFactory.createLineBorder(Color.black);
	JPanel UserInput = new JPanel();
	JLabel lQuanta = new JLabel();
	JLabel lParticles = new JLabel();
	JLabel lCollisions = new JLabel();
	JTextField tEnergy = new JTextField();

	JTextField tParticles = new JTextField();
	JTextField tCollisions = new JTextField();
	JButton bStartSim = new JButton();
	// Border lineBorder3 = BorderFactory.createLineBorder(Color.black);
	JScrollPane DispResults = new JScrollPane();
	LevelInfoArea ShowText = new LevelInfoArea();

	// My variables
	int initialEnergy; // Initial Energy of all particles
	int curMaxEnergy; // Highest Energy Level with a particle
	int maxParticles; // Max number of particles
	int maxCollisions; // Max number of collisions
	int particleEnergy[];// stores Energy for each particle
	int EntropyCalcs;
	// double Entropy[]; //Entropy of the system
	boolean start_pressed;

	public Boltzmann() {
		setName("Boltzmann");
	}

	@Override
	public void init() {

		// Take out this line if you don't use symantec.itools.net.RelativeURL or
		// symantec.itools.awt.util.StatusScroller
		// symantec.itools.lang.Context.setApplet(this);
		// This line prevents the "Swing: checked access to system event queue"
		// message seen in some browsers.
		// getRootPane().putClientProperty("defeatSystemEventQueueCheck",
		// Boolean.TRUE);

		// {{INIT_CONTROLS
		getContentPane().setLayout(null);
		setSize(562, 391);
		BoltzSimGraph.setBorder(lineBorder2);
		BoltzSimGraph.setLayout(new FlowLayout(FlowLayout.CENTER, 5, 5));
		getContentPane().add(BoltzSimGraph);
		BoltzSimGraph.setBackground(Color.white);
		BoltzSimGraph.setBounds(0, 0, 384, 300);

		BoltzSimGraph.add(DispBoltz);
		DispBoltz.setPreferredSize(new Dimension(380, 294)); // SwingJS[3]
		DispBoltz.setBounds(2, 6, 380, 294);

		EntropyGraph.setBorder(lineBorder1);
		EntropyGraph.setLayout(new FlowLayout(FlowLayout.CENTER, 5, 5));

		getContentPane().add(EntropyGraph);

		EntropyGraph.setBackground(java.awt.Color.white);
		EntropyGraph.setBounds(384, 0, 180, 156);
		EntropyGraph.add(DispEntropy);
		DispEntropy.setPreferredSize(new Dimension(178, 150)); // SwingJS[3]
		DispEntropy.setBounds(1, 6, 178, 150);
		// $$ lineBorder1.move(0,392);
		// $$ lineBorder2.move(24,392);
		UserInput.setLayout(new GridBagLayout());
		getContentPane().add(UserInput);
		UserInput.setBackground(Color.yellow);
		UserInput.setBounds(0, 300, 384, 96);
		lQuanta.setText("Initial Energy");
		UserInput.add(lQuanta, new GridBagConstraints(0, 0, 1, 1, 1.0, 1.0,
				GridBagConstraints.CENTER, GridBagConstraints.NONE, new Insets(0, 0, 0,
						0), 0, 0));
		lQuanta.setBounds(15, 6, 97, 15);
		lParticles.setText("No. of Particles");
		UserInput.add(lParticles, new GridBagConstraints(1, 0, 1, 1, 1.0, 0.0,
				GridBagConstraints.CENTER, GridBagConstraints.NONE, new Insets(0, 0, 0,
						0), 0, 0));
		lParticles.setBounds(149, 6, 86, 15);
		lCollisions.setText("No. of Collisions");
		UserInput.add(lCollisions, new GridBagConstraints(2, 0, 1, 1, 1.0, 0.0,
				GridBagConstraints.CENTER, GridBagConstraints.NONE, new Insets(0, 0, 0,
						0), 0, 0));
		lCollisions.setBounds(275, 6, 90, 15);
		tEnergy.setAutoscrolls(false);
		tEnergy.setColumns(10);
//
//tEnergy.setEditable(false);
//tEnergy.setBackground(Color.GREEN);
//tEnergy.setForeground(Color.BLACK);
//tEnergy.setDisabledTextColor(Color.RED);
//tEnergy.setOpaque(false);
//
		tEnergy.setNextFocusableComponent(tParticles);
		UserInput.add(tEnergy, new GridBagConstraints(0, 1, 1, 1, 1.0, 1.0,
				GridBagConstraints.CENTER, GridBagConstraints.NONE, new Insets(0, 0, 0,
						0), 0, 0));
		tEnergy.setBounds(9, 33, 110, 19);
		tParticles.setAutoscrolls(false);
		tParticles.setColumns(10);
//		
//tParticles.setEnabled(false);
//tParticles.setBackground(Color.GREEN);
//tParticles.setForeground(null);
//tParticles.setDisabledTextColor(null);
//tParticles.setOpaque(true);
//		
		tParticles.setNextFocusableComponent(tCollisions);
		UserInput.add(tParticles, new GridBagConstraints(1, 1, 1, 1, 1.0, 1.0,
				GridBagConstraints.CENTER, GridBagConstraints.NONE, new Insets(0, 0, 0,
						0), 0, 0));
		tParticles.setBounds(137, 33, 110, 19);
		tCollisions.setAutoscrolls(false);
		tCollisions.setColumns(10);
		tCollisions.setNextFocusableComponent(bStartSim);
		UserInput.add(tCollisions, new GridBagConstraints(2, 1, 1, 1, 1.0, 1.0,
				GridBagConstraints.CENTER, GridBagConstraints.NONE, new Insets(0, 0, 0,
						0), 0, 0));
		tCollisions.setBounds(265, 33, 110, 19);
		bStartSim.setText("Start");
		bStartSim.setActionCommand("Start");
		bStartSim.setNextFocusableComponent(tEnergy);
		bStartSim.setMargin(new Insets(2, 16, 2, 16));
		UserInput.add(bStartSim, new GridBagConstraints(1, 2, 1, 1, 1.0, 1.0,
				GridBagConstraints.CENTER, GridBagConstraints.NONE, new Insets(0, 0, 0,
						0), 0, 0));
		bStartSim.setBackground(Color.green);
		bStartSim.setBounds(160, 64, 63, 55); // note that 63 and 55 here are ignored
		// lineBorder3.move(48,392);
		DispResults
				.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
		DispResults
				.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS);
		DispResults.setOpaque(true);
		getContentPane().add(DispResults);
		DispResults.setBounds(384, 156, 180, 240);
		ShowText.setRows(10000);
		ShowText.setDisabledTextColor(new Color(153, 153, 153));		
		DispResults.getViewport().add(ShowText);
		ShowText.setBounds(0, 0, 162, 150000);

		// {{REGISTER_LISTENERS
		SymAction lSymAction = new SymAction();
		bStartSim.addActionListener(lSymAction);
		tEnergy.addActionListener(lSymAction);
		tParticles.addActionListener(lSymAction);
		tCollisions.addActionListener(lSymAction);
		SymMouse aSymMouse = new SymMouse();
		ShowText.addMouseListener(aSymMouse);
		// }}
		// Initialize the environment
		setBackground(Color.white);
		maxParticles = 10000; // Default number of particles in simulation
		maxCollisions = 60000; // Default number of collisions
		initialEnergy = 250; // start Energy of at 250
		EntropyCalcs = 50; // calculate the Entropy 50 times

		tEnergy.setText(Integer.toString(initialEnergy));
		tParticles.setText(Integer.toString(maxParticles));
		tCollisions.setText(Integer.toString(maxCollisions));
		initEnvironment();
	}

	// }}

	class SymAction implements ActionListener {
		@Override
		public void actionPerformed(ActionEvent event) {
			Object object = event.getSource();
			initEnvironment();
			if (object == bStartSim)
				bStartSim_actionPerformed(event);
			ShowText.levelInfo.setLength(0);
		}
	}

	public class LevelInfoArea extends JTextArea {
		SB levelInfo = new SB();

		public LevelInfoArea() {
			super();
			levelInfo.setLength(0);
		}

		public void appendLine(String s) {
			levelInfo.append(s).append("\n");
		}
	}

	private Thread simThread;
	
	void bStartSim_actionPerformed(ActionEvent event)
	// Action performed on pressing start button
	{
		// SwingJS[5]
		// Graphics canvasGraphics = DispBoltz.getGraphics();
		// initEnvironment()
		// DispBoltz.paint(canvasGraphics);
		
		if (!initEnvironment())
			return;
		if (simThread != null)
			simThread.interrupt();
		simThread = new SimThread(this);
		simThread.start();
	}


	boolean initEnvironment() {

		try {
		int tmp = (Integer.parseInt(tCollisions.getText().trim()));
		if (tmp >= 0)
			maxCollisions = tmp;
		tmp = (Integer.parseInt(tEnergy.getText().trim()));
		if (tmp > 0)
			initialEnergy = tmp;
		tmp = (Integer.parseInt(tParticles.getText().trim()));
		if (tmp >= 0)
			maxParticles = tmp;
		} catch (NumberFormatException e) {
			return false;
		}
		
		// Initialize environment
		DispBoltz.maxEnergy = 20 * initialEnergy; // Highest Energy Level displayed
		particleEnergy = new int[maxParticles];
		DispBoltz.energyLevels = new int[DispBoltz.maxEnergy + 1];
		curMaxEnergy = initialEnergy;
		DispEntropy.Entropy = new double[EntropyCalcs + 1];
		DispEntropy.EntropyCalc = EntropyCalcs;

		DispEntropy.entCounter = 0;

		for (int i = 0; i < maxParticles; i++) {
			particleEnergy[i] = initialEnergy;
		}
		for (int i = 0; i <= DispBoltz.maxEnergy; i++) {
			DispBoltz.energyLevels[i] = 0;
		}
		for (int i = 0; i < EntropyCalcs; i++) {
			DispEntropy.Entropy[i] = 0;
		}
		DispBoltz.energyLevels[initialEnergy] = maxParticles;
		return  true;
	}

	void calcEntropy(int x) {
		int i;
		DispEntropy.Entropy[x] = maxParticles * Math.log(maxParticles);
		for (i = 0; i <= curMaxEnergy; i++)
			if (DispBoltz.energyLevels[i] > 0)
				DispEntropy.Entropy[x] = DispEntropy.Entropy[x]
						- (DispBoltz.energyLevels[i] * Math.log(DispBoltz.energyLevels[i]));
	}

	// class to handle mouseclick
	class SymMouse extends MouseAdapter {
		@Override
		public void mouseReleased(MouseEvent event) {
			Object object = event.getSource();
			if (object == ShowText)
				ShowText_mouseReleased(event);
		}
	}

	// Upon a button click in the Text Window selects all data
	// and copies to clipboard
	void ShowText_mouseReleased(MouseEvent event) {
		// SwingJS[2]
		// Clipboard cb = Toolkit.getDefaultToolkit().
		// getSystemClipboard();
		// String s = ShowText.getText();
		// StringSelection contents = new StringSelection(s);
		// cb.setContents(contents, null);
	}

	int particle1, particle2;
	int e1, e2; // Energy of particle1 and particle2
	int collisionEnergy;
	int numOfCollisions;
	// Refresh the display approx displayFactor times
	int displayFactor;
	// find out when to perform Entropy calculation
	int entropyFactor;

	// int systemEnergy = maxParticles * initialEnergy;

	public void sjs_initSimulation() {
		numOfCollisions = maxCollisions;
		entropyFactor = (int) Math.ceil(maxCollisions / EntropyCalcs);

		/**
		 * just too slow
		 * 
		 * @j2sNative
		 * 
		 *            this.displayFactor = 100;
		 */
		{
			// Adjust displayFactor based on maxCollisions

			if (maxCollisions <= 5000)
				displayFactor = 1;
			else if (maxCollisions <= 20000)
				displayFactor = 4;
			else
				displayFactor = 10;
		}

		// Show the intial graph with all particles having E of initialEnergy

		// TODO Auto-generated method stub

	}

	public boolean sjs_loopSimulation() {
		// Select two particles at random
		particle1 = (int) ((maxParticles - 1) * Math.random());
		particle2 = (int) ((maxParticles - 1) * Math.random());

		// Make sure they are different
		while (particle1 == particle2) {
			particle2 = (int) ((maxParticles - 1) * Math.random());
		}

		// Make sure particle1 has the higher energy
		// i.e always pass energy from higher to lower
		if (particleEnergy[particle1] < particleEnergy[particle2]) {
			// Swap Particle1 with Particle2
			int temp = particleEnergy[particle1];
			particleEnergy[particle1] = particleEnergy[particle2];
			particleEnergy[particle2] = temp;
		}
		e1 = particleEnergy[particle1];
		e2 = particleEnergy[particle2];

		// Take a random amount of energy from particle1
		collisionEnergy = (int) Math.ceil(e1 * Math.random());

		// Perform energy transfer from particle1 to particle2
		particleEnergy[particle1] = e1 - collisionEnergy;
		particleEnergy[particle2] = e2 + collisionEnergy;

		// Reduce numOfParticles at EnergyLevels e1 and e2 by 1 each
		DispBoltz.energyLevels[e1] = DispBoltz.energyLevels[e1] - 1;
		DispBoltz.energyLevels[e2] = DispBoltz.energyLevels[e2] - 1;

		// Find new energy of particle 1 and 2
		e1 = particleEnergy[particle1];
		e2 = particleEnergy[particle2];

		// increment numOfParticles at these EnergyLevels by 1 each
		DispBoltz.energyLevels[e1] = DispBoltz.energyLevels[e1] + 1;
		DispBoltz.energyLevels[e2] = DispBoltz.energyLevels[e2] + 1;

		// find which has larger energy
		if (e1 < e2)
			e1 = e2;

		// Update curMaxEnergy
		if (e1 > curMaxEnergy)
			curMaxEnergy = e1;

		DispBoltz.maxEnergy = curMaxEnergy;

		return (--numOfCollisions > 0);
		// // Delay to slow down display
		// for (int i = 0; i < (10000 / displayFactor); i++)
		// ;
	}

	protected void sjs_finalizeGraph() {
		// ensure top energy level is occupied
		for (int i = curMaxEnergy; i > 0; i--) {
			if (DispBoltz.energyLevels[i] < 1)
				curMaxEnergy--;
			else
				break;
		}

		showTheText();
	}

	private void showTheText() {
		ShowText.levelInfo.setLength(0);
		ShowText.appendLine("Init. Energy   = " + initialEnergy);
		ShowText.appendLine("No. particles  = " + maxParticles);
		ShowText.appendLine("No. collisions = " + maxCollisions);
		ShowText.appendLine("-------------");
		for (int i = 1; i <= curMaxEnergy; i++)
			ShowText.appendLine("EL " + i + "= " + DispBoltz.energyLevels[i]);
		ShowText.appendLine("-------------");
		DecimalFormat df = new DecimalFormat("0.00");
		for (int i = 0; i < EntropyCalcs; i++)
			ShowText.appendLine("WL " + i + "= " + df.format(DispEntropy.Entropy[i]));
		ShowText.setRows(curMaxEnergy + EntropyCalcs + 2);
		ShowText.setText(ShowText.levelInfo.toString());
		JViewport vp = DispResults.getViewport();
    Insets insets = vp.getInsets();
    Dimension viewPrefSize = vp.getPreferredSize();
    Dimension vpSize = vp.getSize();
    Dimension extentSize = vp.toViewCoordinates(vpSize);
    Dimension viewSize = new Dimension(viewPrefSize);
		System.out.println(ShowText.getHeight() + " " + insets + " " + viewPrefSize + " " + vpSize + " " + extentSize + " " + viewSize);

		
		repaint();
	}

	public boolean sjs_checkRepaint() {
		if ((numOfCollisions % entropyFactor) == 0) {
			calcEntropy(DispEntropy.entCounter++);
			DispEntropy.invalidate();
		}
		if ((numOfCollisions % displayFactor) != 1) // BH: was 0
			return false;
		repaint();
		return true;
	}

}
