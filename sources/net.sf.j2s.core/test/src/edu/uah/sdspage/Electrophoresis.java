package edu.uah.sdspage; 
// Source File Name:   D:\Dave\Java\Electrophoresis\Electrophoresis.java

import a2s.Applet;
import java.applet.AudioClip;
import java.awt.BorderLayout;
import a2s.Button;
import java.awt.CardLayout;
import java.awt.Color;
import java.awt.Event;
import java.awt.GridLayout;
import a2s.Panel;
import java.net.MalformedURLException;
import java.net.URL;

public class Electrophoresis extends Applet
{

    URL howURL;

    URL defURL;

    AudioClip gong;

    AudioClip bong;

    AudioClip train;

    AudioClip drip;

    AudioClip hiThere;

    AudioClip tone1;

    AudioClip tone2;

    AudioClip tone3;

    AudioClip tone4;

    AudioClip tone5;

    AudioClip tone6;

    AudioClip tone7;

    AudioClip click1;

    AudioClip click2;

    AudioClip harp;

    AudioClip spaceMusic;

    AudioClip clockBong;

    AudioClip thinBeep;

    AudioClip ding;

    AudioClip calculate;

    AudioClip crunch;

    Parameters paramPanel;

    Simulation simPanel;

    ProteinData dataPanel;

    Plot plotPanel;

    CardLayout leftLayout;

    CardLayout rightLayout;

    Panel buttonPanel;

    Panel masterPanel;

    Panel leftPanel;

    Panel rightPanel;

    public Electrophoresis()
    {
        buttonPanel = new Panel();
        masterPanel = new Panel();
        leftPanel = new Panel();
        rightPanel = new Panel();
    }

    @Override
	public boolean action(Event event, Object obj)
    {
        if(event.target instanceof Button)
            return handleButton(obj);
        else
            return false;
    }
    public void addSample()
    {
        simPanel.addSample();
    }
    public void addStandard()
    {
        simPanel.addStandard();
    }
    public void displayData()
    {
        rightLayout.show(rightPanel, "data");
    }
    public void displayProtein(Protein protein)
    {
        dataPanel.displayData(protein);
    }
    public void displaySim()
    {
        rightLayout.show(rightPanel, "simulation");
    }
    public boolean handleButton(Object obj)
    {
        if("Parámetros".equals(obj))
        {
            leftLayout.show(leftPanel, "parameters");
            playThinBeep();
            return true;
        }
        if("Info. proteínas".equals(obj))
        {
            rightLayout.show(rightPanel, "data");
            playThinBeep();
            return true;
        }
        if("Simulación".equals(obj))
        {
            rightLayout.show(rightPanel, "simulation");
            playThinBeep();
            return true;
        }
        if("Gráfica".equals(obj))
        {
            leftLayout.show(leftPanel, "dataplot");
            playThinBeep();
            return true;
        }
        if("Ayuda".equals(obj))
        {
            playSpaceMusic();
            try
            {
                howURL = new URL(getCodeBase()	, "electro_how.html");
            }
            catch(MalformedURLException _ex)
            {
                System.out.println("Bad URL: " + howURL);
                return true;
            }
            if(howURL != null)
                getAppletContext().showDocument(howURL);
            return true;
        }
        if("Definiciones".equals(obj))
        {
            playCrunch();
            try
            {
                defURL = getAssetURL("electro_def.html");
            }
            catch(MalformedURLException _ex)
            {
                System.out.println("Bad URL: " + defURL);
                return true;
            }
            if(defURL != null)
                getAppletContext().showDocument(defURL);
            return true;
        } else
        {
            return false;
        }
    }
    private URL getAssetURL(String name) throws MalformedURLException {
    	return new URL(getCodeBase(), "edu/uah/sdspage/" + name);
	}

	@Override
	public void init()
    {
        setLayout(new BorderLayout());
        add("North", buttonPanel);
        add("Center", masterPanel);
        LoadSounds();
           hiThere.play();
        
        
        setLayout(new BorderLayout());
        add("North", buttonPanel);
        add("Center", masterPanel);

        paramPanel = new Parameters(this).set();
        paramPanel.setBackground(Color.gray);
        simPanel = new Simulation(this).set();
        dataPanel = new ProteinData(this).set();
        dataPanel.setBackground(Color.white);
        plotPanel = new Plot(this).set();
        buttonPanel.setBackground(Color.white);
        masterPanel.setBackground(Color.gray);
        rightPanel.setBackground(Color.black);
        leftPanel.setBackground(Color.black);
        
        masterPanel.setLayout(new GridLayout(1, 2, 5, 5));
        masterPanel.add(leftPanel);
        masterPanel.add(rightPanel);
        
        leftLayout = new CardLayout();
        leftPanel.setLayout(leftLayout);
        leftPanel.add("parameters", paramPanel);
        leftPanel.add("dataplot", plotPanel);
        
        
        buttonPanel.add(new Button("Ayuda"));
        buttonPanel.add(new Button("Parámetros"));
        buttonPanel.add(new Button("Gráfica"));
        buttonPanel.add(new Button("Simulación"));
        buttonPanel.add(new Button("Info. proteínas"));
        buttonPanel.add(new Button("Definiciones"));
        
        
        rightLayout = new CardLayout();
        rightPanel.setLayout(rightLayout);
        rightPanel.add("simulation", simPanel);
        rightPanel.add("data", dataPanel);
        
        
        paramPanel.setDefaults();
    }

	private void LoadSounds() {
		try {
			gong = getAudioClip(getAssetURL("Gong.au")); // BH was lowercase gong
			train = getAudioClip(getAssetURL("Train.au"));
			bong = getAudioClip(getAssetURL("Bong.au"));
			drip = getAudioClip(getAssetURL("Drip.au"));
			hiThere = getAudioClip(getAssetURL("Hello.au"));
			tone4 = getAudioClip(getAssetURL("0.au"));
			tone1 = getAudioClip(getAssetURL("1.au"));
			tone2 = getAudioClip(getAssetURL("2.au"));
			tone5 = getAudioClip(getAssetURL("3.au"));
			tone3 = getAudioClip(getAssetURL("4.au"));
			tone6 = getAudioClip(getAssetURL("7.au"));
			tone7 = getAudioClip(getAssetURL("8.au"));
			click1 = getAudioClip(getAssetURL("Button_1.au"));
			click2 = getAudioClip(getAssetURL("Button_2.au"));
			harp = getAudioClip(getAssetURL("Harp.au"));
			spaceMusic = getAudioClip(getAssetURL("Spacemus.au"));
			clockBong = getAudioClip(getAssetURL("Clock.au"));
			thinBeep = getAudioClip(getAssetURL("ThinBeep.au"));
			ding = getAudioClip(getAssetURL("Ding.au"));
			calculate = getAudioClip(getAssetURL("Computer.au"));
			crunch = getAudioClip(getAssetURL("Crunch.au"));
		} catch (Exception e) {
			System.out.println("Electrophoresis cannot create audioclips " +  e);
		}
	}
    public void playBong()
    {
           bong.play();
    }
    public void playCalculate()
    {
           calculate.play();
    }
    public void playClick1()
    {
           click1.play();
    }
    public void playClick2()
    {
            click2.play();
    }
    public void playClockBong()
    {
           clockBong.play();
    }
    public void playCrunch()
    {
           crunch.play();
    }
    public void playDing()
    {
           ding.play();
    }
    public void playDrip()
    {
           drip.play();
    }
    public void playHarp()
    {
        harp.play();
    }
    public void playSpaceMusic()
    {
        spaceMusic.play();
    }
    public void playThinBeep()
    {
		 thinBeep.play();
    }
    public void playTone1()
    {
        tone1.play();
    }
    public void playTone2()
    {
           tone2.play();
    }
    public void playTone3()
    {
           tone3.play();
    }
    public void playTone4()
    {
           tone4.play();
    }
    public void playTone5()
    {
           tone5.play();
    }
    public void playTone6()
    {
           tone6.play();
    }
    public void playTone7()
    {
           tone7.play();
    }
    public void playTrain()
    {
           train.play();
    }
    public void setAcrylaminde(Acrylamide acrylamide)
    {
        simPanel.setAcrylamide(acrylamide);
    }
    public void setAnimationSpeed(String s)
    {
        simPanel.setPause(s);
    }
    public void setPlotData(Protein aprotein[], Protein protein, Protein protein1)
    {
        plotPanel.setResults(aprotein, protein, protein1);
    }
    public void startRun(Protein aprotein[], Protein protein, Protein protein1, Protein protein2)
    {
        simPanel.startRun(aprotein, protein, protein1, protein2);
    }
    public void stopRun()
    {
        playClick1();
        simPanel.stopRun();
    }
}