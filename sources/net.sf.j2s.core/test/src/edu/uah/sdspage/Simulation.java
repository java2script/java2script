package edu.uah.sdspage;
// Source File Name:   Simulation.java

import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import a2s.Panel;
import java.text.DecimalFormat;

import javax.swing.Timer;

/**
 * BH: uses javax.swing.Timer instead of Thread
 * 
 * @author RM
 *
 */
public class Simulation extends Panel
    implements Runnable
{

    public void addStandard()
    {
        if(sampLoadState == loading)
        {
            parent.playClockBong();
            return;
        } else
        {
            parent.playClick1();
            stopRun();
            stdSample.reset();
            stdSample.fill();
            stdSample.setRatio(wellOpening1Height / ratioModifier);
            stdSample.setXPosition(wellOpening1X);
            stdSample.setWidth(wellOpening1Width);
            stdSample.setYPosition(wellBottom);
            stdSample.setMaxY(wellBottom);
            pipette.setSample(stdSample);
            pipette.setStartXPosition(wellOpening1X + halfWellWidth);
            pipette.setMaxYPosition(wellBottom);
            pipette.setSampleDepth(wellOpening1Height * 2);
            ResetFlags();
            addSampleFlag = true;
            stdLoadState = loading;
            setPause("fill");
            start();
            return;
        }
    }

    private void paintData(Graphics g)
    {
        g.setColor(Color.black);
        int i = charHeight - 3;
        int j = (int)(0.90000000000000002D * (double)charHeight);
        if(noLoadError)
        {
            i += charHeight * 2;
            g.drawString("Debes añadir patrón y muestra", plateX, i);
            noLoadError = false;
        } else
        {
            g.drawString(proteinName, plateX, i);
            i += j;
            g.drawString(proteinMW, plateX, i);
            i += j;
            g.drawString(proteinDist, plateX, i);
            i += j;
            g.drawString(relMigration, plateX, i);
        }
        addInfo = false;
    }

    public void startRun(Protein aprotein[], Protein protein, Protein protein1, Protein protein2)
    {
        stopRun();
        if(stdLoadState == notLoaded || sampLoadState == notLoaded)
        {
            parent.playClockBong();
            addInfo = true;
            noLoadError = true;
            repaint();
            return;
        }
        parent.playClick1();
        stdSamples = aprotein;
        sample = protein;
        dye1 = protein1;
        dye2 = protein2;
        int i = 0;
        do
            if(stdSamples[i].selected)
            {
                stdSamples[i].setWidth(wellOpening1Width);
                stdSamples[i].setStartPosition(wellOpening1X, wellBottom);
                stdSamples[i].setMaxPosition(plateBottom);
                stdSamples[i].SetHostScaleFactor(scaleFactor);
            }
        while(++i < 7);
        sample.setWidth(wellOpening2Width);
        sample.setStartPosition(wellOpening2X, wellBottom);
        sample.setMaxPosition(plateBottom);
        sample.SetHostScaleFactor(scaleFactor);
        dye1.setWidth(wellOpening1Width);
        dye1.setStartPosition(wellOpening1X, wellBottom);
        dye1.setMaxPosition(plateBottom);
        dye1.SetHostScaleFactor(scaleFactor);
        dye2.setWidth(wellOpening2Width);
        dye2.setStartPosition(wellOpening2X, wellBottom);
        dye2.setMaxPosition(plateBottom);
        dye2.SetHostScaleFactor(scaleFactor);
        stdSample.setRatio(0);
        sampSample.setRatio(0);
        stdSample.drawSwitch(true);
        sampSample.drawSwitch(true);
        stdSample.empty();
        sampSample.empty();
        ResetFlags();
        runSampleFlag = true;
        stdLoadState = notLoaded;
        sampLoadState = notLoaded;
        setPause("elute");
        parent.playTrain();
        start();
    }

    public void stopRun()
    {
        stopAnimation = true;
        stop();
    }

    private void calcDimensions()
    {
        int i = 0;
        int j = 0;
        int k = 0;
        int l = 0;
        int i1 = 0;
        int j1 = 0;
        int k1 = 0;
        int l1 = 0;
        int i2 = 0;
        int j2 = 0;
        int k2 = 0;
        int l2 = 0;
        byte byte0 = 2;
        byte byte1 = 4;
        float f = 60F;
        bottomEdge = size().height - 2;
        rightEdge = size().width - 2;
        i = rightEdge / 2;
        border = size().width / 16;
        l1 = border / 2;
        i2 = border + border;
        j = bottomEdge / 8;
        k = bottomEdge / 10;
        l = rightEdge / 6;
        i1 = rightEdge / 18;
        baseX = leftEdge + border;
        baseY = bottomEdge - border - j;
        baseHeight = j;
        baseWidth = rightEdge - i2;
        topX = leftEdge + border;
        topY = border + j;
        topHeight = j;
        topWidth = rightEdge - i2;
        k1 = (baseHeight / 4) * 3 + baseY;
        j1 = topY + topHeight / 4;
        plateX = i - l - l;
        plateY = j1;
        plateHeight = k1 - plateY;
        plateWidth = l * 4;
        plateBottom = plateY + plateHeight;
        plateRtEdge = plateX + plateWidth;
        topOpeningX = plateX + l1;
        topOpeningY = plateY;
        topOpeningHeight = l1;
        topOpeningWidth = plateWidth - border;
        wellOpening1X = topOpeningX + border;
        wellOpening1Y = topOpeningY + topOpeningHeight;
        wellOpening1Height = i2;
        wellOpening1Width = l;
        wellOpening2X = i + (i - (wellOpening1X + wellOpening1Width));
        wellOpening2Y = topOpeningY + topOpeningHeight;
        wellOpening2Height = wellOpening1Height;
        wellOpening2Width = wellOpening1Width;
        wellBottom = wellOpening1Y + wellOpening1Height;
        halfWellWidth = wellOpening1Width / 2;
        totalElutionDist = plateBottom - wellBottom;
        j2 = plateBottom - wellBottom;
        k2 = j2 / 6;
        l2 = j2 / 12;
        int i3 = wellBottom;
        int j3 = wellBottom;
        int k3 = 0;
        do
        {
            scaleDivs[k3] = i3;
            i3 += k2;
        } while(++k3 < 7);
        k3 = 0;
        do
        {
            scaleHalfDivs[k3] = j3;
            j3 += l2;
        } while(++k3 < 13);
        divStart = plateRtEdge - byte0;
        divXLine = divStart + byte1;
        divLabelX = divStart + fm.charWidth('0');
        charHalfHeight = fm.getAscent() / 8;
        charHeight = fm.getHeight();
        scaleFactor = f / (float)totalElutionDist;
        gelLabelX = baseX + byte0;
        gelLabelY = (baseY + baseHeight) - byte0;
        cellLabelY = baseY + baseHeight + charHeight;
        negProbeX = topX;
        negProbeY = topY - k;
        probeWidth = i1;
        posProbeX = (baseX + baseWidth) - probeWidth;
        posProbeY = baseY - k;
        probeHeight = topY - negProbeY - byte0 * 2;
        negProbeCenterX = negProbeX + probeWidth / 2;
        posProbeCenterX = posProbeX + probeWidth / 2;
        negLineX = negProbeCenterX - 1;
        posLineX = posProbeCenterX - 1;
        posLineHeight = posProbeY;
        polarityNegHorizontalX1 = negProbeCenterX - 2;
        polarityNegHorizontalX2 = negProbeCenterX + 2;
        polarityPlusHorizontalX1 = posProbeCenterX - 2;
        polarityPlusHorizontalX2 = posProbeCenterX + 2;
        polarityNegHorizontalY = negProbeY + probeHeight / 2;
        polarityPlusVerticalY1 = (posProbeY + probeHeight / 2) - 2;
        polarityPlusVerticalY2 = posProbeY + probeHeight / 2 + 2;
        polarityPlusY = posProbeY + probeHeight / 2;
        endWidth = probeWidth / 3;
        endPosX = negProbeCenterX - endWidth / 2;
        endPosY = (negProbeY + probeHeight) - 2;
        endNegX = posProbeCenterX - endWidth / 2;
        endNegY = (posProbeY + probeHeight) - 2;
        endHeight = probeHeight / 2;
    }

    public boolean mouseDown(Event event, int i, int j)
    {
        if(stopAnimation && notAtBottom)
        {
            int k = 0;
            do
            {
                if(k >= 7)
                    break;
                if(stdSamples[k].matchPosition(i, j))
                {
                    stdSamples[k].relativeMigration = stdSamples[k].GetDistance() / dye1.GetDistance();
                    proteinName = stdSamples[k].fullName;
                    proteinMW = (new StringBuilder()).append("Mr = ").append(String.valueOf(stdSamples[k].mw)).toString();
                    proteinDist = (new StringBuilder()).append("Avance (mm) = ").append(twoDigits.format(stdSamples[k].GetDistance())).toString();
                    relMigration = (new StringBuilder()).append("Movilidad relativa = ").append(twoDigits.format(stdSamples[k].relativeMigration)).toString();
                    addInfo = true;
                    repaint();
                    break;
                }
                k++;
            } while(true);
            if(sample.matchPosition(i, j))
            {
                proteinName = sample.name;
                proteinMW = "Mr = por determinar";
                proteinDist = (new StringBuilder()).append("Avance (mm) = ").append(twoDigits.format(sample.GetDistance())).toString();
                relMigration = (new StringBuilder()).append("Movilidad relativa =  ").append(twoDigits.format(sample.GetDistance() / dye1.GetDistance())).toString();
                addInfo = true;
                repaint();
            } else
            if(dye1.matchPosition(i, j) || dye2.matchPosition(i, j))
            {
                proteinName = dye1.name;
                proteinMW = "  ";
                proteinDist = (new StringBuilder()).append("Avance (mm) = ").append(twoDigits.format(dye1.GetDistance())).toString();
                relMigration = "  ";
                addInfo = true;
                repaint();
            }
        }
        return true;
    }

    public void setPause(String s)
    {
        int i = 100;
        float f = 2.0F;
        float f1 = 4F;
        float f2 = 1.8F;
        float f3 = 2.5F;
        float f4 = 3.5F;
        if(s == "elute")
            modifier = f;
        else
        if(s == "fill")
            modifier = f1;
        else
        if(s.compareTo("Lenta") == 0)
            animationModifier = f2;
        else
        if(s.compareTo("Media") == 0)
            animationModifier = f3;
        else
        if(s.compareTo("Rápida") == 0)
            animationModifier = f4;
        pause = (int)((float)i / modifier / animationModifier);
        /**
         * @j2sNative
         * 
         * this.pause /= 2;
         */
    }

    private void drawCell(Graphics g)
    {
        g.setColor(Color.black);
        g.drawRect(0, 0, rightEdge, bottomEdge);
        g.setColor(Color.cyan);
        g.fillRect(baseX, baseY, baseWidth, baseHeight);
        g.setColor(Color.black);
        g.drawRect(baseX, baseY, baseWidth, baseHeight);
        g.setColor(Color.red);
        g.fillRect(posLineX, 0, powerLineWidth, posLineHeight);
        g.setColor(Color.cyan);
        g.fillRect(topX, topY, topWidth, topHeight);
        g.setColor(Color.black);
        g.drawRect(topX, topY, topWidth, topHeight);
        g.setColor(Color.lightGray);
        g.fillRect(plateX, plateY, plateWidth, plateHeight);
        g.setColor(Color.darkGray);
        g.drawLine(plateX, plateY, plateX, plateBottom);
        g.drawLine(plateRtEdge, plateY, plateRtEdge, plateBottom);
        g.setColor(Color.white);
        g.fillRect(topOpeningX, topOpeningY, topOpeningWidth, topOpeningHeight);
        g.fillRect(wellOpening1X, wellOpening1Y, wellOpening1Width, wellOpening1Height);
        g.fillRect(wellOpening2X, wellOpening2Y, wellOpening2Width, wellOpening2Height);
        g.setColor(Color.black);
        int i = 0;
        do
            g.drawString(labels[i], divLabelX, scaleDivs[i] + charHalfHeight);
        while(++i < 7);
        i = 0;
        do
            g.drawLine(divStart, scaleHalfDivs[i], divXLine, scaleHalfDivs[i]);
        while(++i < 13);
        g.drawString(gelLabel, gelLabelX, gelLabelY);
        g.setColor(Color.gray);
        g.fillRect(endPosX, endPosY, endWidth, endHeight);
        g.fillRect(endNegX, endNegY, endWidth, endHeight);
        g.setColor(Color.black);
        g.drawRoundRect(negProbeX, negProbeY, probeWidth, probeHeight, probeWidth, probeWidth);
        g.fillRoundRect(negProbeX, negProbeY, probeWidth, probeHeight, probeWidth, probeWidth);
        g.fillRect(negLineX, 0, powerLineWidth, negProbeY);
        g.setColor(Color.white);
        g.drawLine(polarityNegHorizontalX1, polarityNegHorizontalY, polarityNegHorizontalX2, polarityNegHorizontalY);
        g.setColor(Color.red);
        g.drawRoundRect(posProbeX, posProbeY, probeWidth, probeHeight, probeWidth, probeWidth);
        g.fillRoundRect(posProbeX, posProbeY, probeWidth, probeHeight, probeWidth, probeWidth);
        g.setColor(Color.black);
        g.drawLine(posProbeCenterX, polarityPlusVerticalY1, posProbeCenterX, polarityPlusVerticalY2);
        g.drawLine(polarityPlusHorizontalX1, polarityPlusY, polarityPlusHorizontalX2, polarityPlusY);
        g.setColor(Color.red);
        g.drawString("  CUBETA DE ELECTROFORESIS", plateX, cellLabelY);
    }

    public void addSample()
    {
        if(stdLoadState == loading)
        {
            parent.playClockBong();
            return;
        } else
        {
            parent.playClick1();
            stopRun();
            sampSample.reset();
            sampSample.fill();
            sampSample.setRatio(wellOpening2Height / ratioModifier);
            sampSample.setXPosition(wellOpening2X);
            sampSample.setWidth(wellOpening2Width);
            sampSample.setYPosition(wellBottom);
            sampSample.setMaxY(wellBottom);
            pipette.setSample(sampSample);
            pipette.setStartXPosition(wellOpening2X + halfWellWidth);
            pipette.setMaxYPosition(wellBottom);
            pipette.setSampleDepth(wellOpening2Height * 2);
            ResetFlags();
            addSampleFlag = true;
            sampLoadState = loading;
            setPause("fill");
            start();
            return;
        }
    }

    public void setAcrylamide(Acrylamide acrylamide)
    {
        gelLabel = (new StringBuilder()).append(acrylamide.percentGel).append(" Acrilamida").toString();
        repaint();
    }

    private void drawGraph(Graphics g)
    {
        g.setColor(Color.black);
        int i = 0;
        do
            g.drawString(labels[i], border, scaleDivs[i] + charHalfHeight);
        while(++i < 7);
    }

    private void paintSample(Graphics g)
    {
        int i = 0;
        notAtBottom = false;
        dye1.drawProtein(g);
        dye2.drawProtein(g);
        i = 0;
        do
            if(stdSamples[i].selected && stdSamples[i].drawProtein(g))
                notAtBottom = true;
        while(++i < 7);
        if(sample.drawProtein(g))
            notAtBottom = true;
        if(!notAtBottom)
            stopRun();
    }

	public void start() {
		if (mode != MODE_STOP)
			return;
		stopAnimation = false;
		mode = MODE_START;
		run();
	}

	public void stop() {
		stopAnimation = true;
		mode = MODE_STOP;
	}

    protected final int MODE_START = 0;
    protected final int MODE_RUN = 1;
    protected final int MODE_STOP = 2;
    
    protected int mode = MODE_STOP;
    
	public void run() {
		int delay = pause;
		switch (mode) {
		case MODE_START:
			mode = MODE_RUN;
			// fall through
		case MODE_RUN:
			if (stopAnimation) {
				mode = MODE_STOP;
				return;
			}
			repaint();
			break;
		case MODE_STOP:
			repaint();
			return;
		}
		Timer t = new Timer(delay, new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				run();
			}
			
		});
		t.setDelay(delay);
		t.setRepeats(false);
		t.start();
	}

//  Thread runner;
//	public void start() {
//			if (runner == null) {
//				runner = new Thread(this);
//				runner.start();
//			}
//	}

//	public void stop() {
//			if (runner != null) {
//				runner.stop();
//				runner = null;
//			}
//	}

//	public void run() {		
//		Thread.currentThread().setPriority(1);
//		while (!stopAnimation) {
//			try {
//				Thread.sleep(pause);
//			} catch (Throwable interruptedexception) // BH was
//														// InterruptedException,
//														// but we also have
//														// ThreadDeath
//			{
//				System.out.println("thread interrupted");
//			}
//			repaint();
//		}
//	}

    private void paintAddition(Graphics g)
    {
        if(!pipette.fillWell(g))
        {
            if(stdLoadState == loading)
                stdLoadState = loaded;
            else
            if(sampLoadState == loading)
                sampLoadState = loaded;
            stopRun();
        }
    }

    private void ResetFlags()
    {
        runSampleFlag = false;
        addSampleFlag = false;
        stopAnimation = false;
        notAtBottom = false;
    }

    Simulation(Electrophoresis electrophoresis)
    {
        parent = electrophoresis;
    }
    
    Simulation set() {
        animationModifier = 1.0F;
        modifier = 1.0F;
        stdSamples = new Protein[7];
        sample = new Protein();
        dye1 = new Protein();
        dye2 = new Protein();
        stdSample = new Sample();
        sampSample = new Sample();
        pipette = new Pipette();
        ratioModifier = 10;
        scaleDivs = new int[7];
        scaleHalfDivs = new int[13];
        labels = new String[7];
        gelLabel = "notSet";
        powerLineWidth = 3;
        proteinName = "notSet";
        proteinMW = "0.0";
        proteinDist = "0 mm";
        relMigration = "0.0";
        runExperiment = true;
        loading = 1;
        loaded = 2;
        sampLoadState = notLoaded;
        stdLoadState = notLoaded;
        labels[0] = "0";
        labels[1] = "1";
        labels[2] = "2";
        labels[3] = "3";
        labels[4] = "4";
        labels[5] = "5";
        labels[6] = "6";
        twoDigits = new DecimalFormat("0.00");
		return this;
    }

    public void update(Graphics g)
    {
        paint(g);
    }

    public void paint(Graphics g)
    {
        if(!imageCreated)
        {
            offScreenImage = createImage(size().width, size().height);
            font = getFont();
            fm = getFontMetrics(font);
            calcDimensions();
            imageCreated = true;
        }
        offScreenGraphics = offScreenImage.getGraphics();
        if(addInfo)
        {
            offScreenGraphics.setColor(Color.white);
            offScreenGraphics.fillRect(plateX, 1, plateWidth, topY - 5);
            paintData(offScreenGraphics);
            g.drawImage(offScreenImage, 0, 0, this);
            return;
        }
        offScreenGraphics.setColor(Color.white);
        offScreenGraphics.fillRect(0, 0, size().width, size().height);
        offScreenGraphics.setColor(g.getColor());
        if(runExperiment)
        {
            drawCell(offScreenGraphics);
            if(runSampleFlag)
                paintSample(offScreenGraphics);
            else
            if(addSampleFlag)
                paintAddition(offScreenGraphics);
            stdSample.drawSample(offScreenGraphics);
            sampSample.drawSample(offScreenGraphics);
        } else
        {
            drawGraph(offScreenGraphics);
        }
        g.drawImage(offScreenImage, 0, 0, this);
    }

    private final int numOfStds = 7;
    Electrophoresis parent;
    int pause;
    float animationModifier;
    float modifier;
    boolean addInfo;
    Protein stdSamples[];
    Protein sample;
    Protein dye1;
    Protein dye2;
    Sample stdSample;
    Sample sampSample;
    Pipette pipette;
    protected int border;
    protected int baseX;
    protected int baseY;
    protected int baseHeight;
    protected int baseWidth;
    protected int topX;
    protected int topY;
    protected int topHeight;
    protected int topWidth;
    protected int bottomEdge;
    protected int rightEdge;
    protected int leftEdge;
    protected int plateX;
    protected int plateY;
    protected int plateHeight;
    protected int plateWidth;
    protected int plateBottom;
    protected int plateRtEdge;
    protected int topOpeningX;
    protected int topOpeningY;
    protected int topOpeningHeight;
    protected int topOpeningWidth;
    protected int wellOpening1X;
    protected int wellOpening1Y;
    protected int wellOpening1Height;
    protected int wellOpening1Width;
    protected int wellOpening2X;
    protected int wellOpening2Y;
    protected int wellOpening2Height;
    protected int wellOpening2Width;
    protected int wellBottom;
    protected int halfWellWidth;
    protected int totalElutionDist;
    protected float scaleFactor;
    int ratioModifier;
    int divStart;
    int divXLine;
    int divLabelX;
    int charHalfHeight;
    int charHeight;
    int scaleDivs[];
    int scaleHalfDivs[];
    String labels[];
    FontMetrics fm;
    Font font;
    int gelLabelX;
    int gelLabelY;
    String gelLabel;
    int cellLabelY;
    int posProbeX;
    int posProbeY;
    int probeWidth;
    int probeHeight;
    int negProbeX;
    int negProbeY;
    int posProbeCenterX;
    int negProbeCenterX;
    int polarityPlusHorizontalX1;
    int polarityPlusHorizontalX2;
    int polarityNegHorizontalY;
    int polarityPlusVerticalY1;
    int polarityPlusVerticalY2;
    int polarityNegHorizontalX1;
    int polarityNegHorizontalX2;
    int polarityPlusY;
    int endPosX;
    int endPosY;
    int endNegX;
    int endNegY;
    int endWidth;
    int endHeight;
    int posLineX;
    int powerLineWidth;
    int negLineX;
    int posLineHeight;
    String proteinName;
    String proteinMW;
    String proteinDist;
    String relMigration;
    private Image offScreenImage;
    private Graphics offScreenGraphics;
    boolean addSampleFlag;
    boolean runSampleFlag;
    boolean imageCreated;
    boolean stopAnimation;
    boolean notAtBottom;
    boolean runExperiment;
    int notLoaded;
    int loading;
    int loaded;
    int sampLoadState;
    int stdLoadState;
    boolean noLoadError;
    protected DecimalFormat twoDigits;
}