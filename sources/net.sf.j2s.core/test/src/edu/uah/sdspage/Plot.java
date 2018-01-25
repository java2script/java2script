package edu.uah.sdspage;
// Source File Name:   Plot.java

import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import a2s.Panel;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.DecimalFormat;
import javax.swing.Timer;

/**
 * BH: uses javax.swing.Timer instead of Thread
 * 
 * @author RM
 *
 */

public class Plot extends Panel
    implements Runnable
{

	
    Plot(Electrophoresis electrophoresis)
    {
    	parent = electrophoresis;
    }
    
    Plot set() {
        pause = 20;
        numberOfStds = 7;
        stds = new Protein[numberOfStds];
        sample = new Protein();
        dye = new Protein();
        stopAnimation = true;
        newYLine = true;
        newXLine = true;
        yAxisLabelX = 1;
        gridRows = 10;
        gridCols = 10;
        rows = 14;
        cols = 14;
        xArray = new int[cols];
        yArray = new int[rows];
        ln10 = 1.0D;
        yConversion = 1.0D;
        deltaPixelY = 1.0D;
        deltaPixelX = 1.0D;
        deltaMw = 1.0D;
        mwOffsetFromMax = 1.0D;
        pixOffsetFromTop = 1.0D;
        yPos = 1;
        xPos = 1;
        lineCoord = new Point(0, 0);
        errorMargin = 0.20000000000000001D;
        ln10 = Math.log(10D);
        rightGridCol = cols - 1;
        leftGridCol = rightGridCol - gridCols;
        bottomGridRow = rows - 1;
        topGridRow = bottomGridRow - gridRows;
        twoDigits = new DecimalFormat("0.00");
        return this;
    }

    public void update(Graphics g)
    {
        paint(g);
    }

    private void calcLine()
    {
        if(nPoints <= 1)
        {
            slope = 0.0D;
            yIntercept = 0.0D;
            return;
        } else
        {
            slope = ((double)nPoints * sumProd - sumX * sumY) / ((double)nPoints * sumXsq - sumX * sumX);
            yIntercept = (sumY - slope * sumX) / (double)nPoints;
            return;
        }
    }

    private void showNotBracket(Graphics g)
    {
        if(showNotBracketed)
            g.drawString("La movilidad relativa no está comprendida entre los patrones", xArray[leftGridCol], size().height / 8);
    }

    private void resetSums()
    {
        sumX = 0.0D;
        sumY = 0.0D;
        sumXsq = 0.0D;
        sumYsq = 0.0D;
        sumProd = 0.0D;
        nPoints = 0;
    }

    private Point calcLinePoint(double d)
    {
        double d1 = calcLogMw(d);
        double d2 = logMwMax - d1;
        double d3 = d2 * yConversion;
        int i = (int)((double)yArray[topGridRow] + d3);
        int j = (int)((double)xArray[leftGridCol] + d * deltaPixelX);
        return new Point(j, i);
    }

    protected void calcMaxMinLogs()
    {
        int i = 0;
        int j = 0x98967f;
        for(int k = 0; k < numberOfStds; k++)
        {
            if(stds[k].mw > i)
                i = stds[k].mw;
            if(stds[k].mw < j)
                j = stds[k].mw;
        }

        logMwMax = Math.log(i) / ln10;
        logMwMin = Math.log(j) / ln10;
        float f = (float)(1.1000000000000001D * (logMwMax - logMwMin));
        for(yDivision = 0.0D; 10D * yDivision < (double)f; yDivision += 0.050000000000000003D);
        float f1;
        for(f1 = (int)logMwMax; (double)f1 <= logMwMax; f1 = (float)((double)f1 + yDivision));
        logMwMax = f1;
        logMwMin = logMwMax - 10D * yDivision;
        deltaMw = logMwMax - logMwMin;
    }

    private void drawYScale(Graphics g)
    {
        double d = logMwMax;
        int i = topGridRow;
        if(standardsSet)
        {
            for(int j = 0; j <= gridRows; j++)
            {
                g.drawString(twoDigits.format(d), yAxisLabelX + 5 * charHalfWidth, yArray[i] + charHalfHeight);
                i++;
                d -= yDivision;
            }

        }
    }

    private void showExpMW(Graphics g)
    {
        DecimalFormat decimalformat = new DecimalFormat("00000.");
        if(showExperimentalMW)
            g.drawString("Mr experimental = " + String.valueOf((int)experimentalMW), xArray[leftGridCol], getSize().height / 8);
    }

    private boolean mouseOnXAxis(int i, int j)
    {
        byte byte0 = 3;
        if(i < xArray[leftGridCol] || i > xArray[rightGridCol] || j < yArray[bottomGridRow] - byte0 || j > yArray[bottomGridRow] + byte0)
        {
            return false;
        } else
        {
            xMouse = i;
            return true;
        }
    }

    private void sumYsqs(double d)
    {
        sumYsq += d * d;
    }

    private void calcStdCoords()
    {
        Point point = new Point(0, 0);
        for(int i = 0; i < numberOfStds; i++)
            if(stds[i].selected)
            {
                Point point1 = calcLinePoint(stds[i].relativeMigration);
                stds[i].plotXPos = point1.x;
                stds[i].plotYPos = point1.y;
            }

    }

    public void plotStandards(Graphics g)
    {
        byte byte0 = 6;
        byte byte1 = byte0;
        int i = byte1 / 2;
        int j = byte0 / 2;
        new Point(0, 0);
        if(standardsSet)
        {
            for(int k = 0; k < numberOfStds; k++)
                if(stds[k].selected)
                {
                    g.setColor(stds[k].color);
                    g.fillOval(stds[k].plotXPos - j, stds[k].plotYPos - i, byte0, byte1);
                    g.setColor(Color.black);
                    g.drawOval(stds[k].plotXPos - j, stds[k].plotYPos - i, byte0, byte1);
                }

            g.drawLine(fitLineX1, fitLineY1, fitLineX2, fitLineY2);
            g.drawString("Pendiente = " + twoDigits.format(slope), xArray[7], yArray[4]);
            g.drawString("Ord. en origen = " + twoDigits.format(yIntercept), xArray[7], yArray[4] + charHeight);
            g.drawString("r = " + twoDigits.format(rCorr), xArray[7], yArray[4] + charHeight * 2);
            g.drawString("r² = " + twoDigits.format(rCorrSq), xArray[7], yArray[4] + charHeight * 3);
        }
    }

    private void drawAxes(Graphics g)
    {
        DecimalFormat decimalformat = new DecimalFormat("0.0");
        g.setColor(Color.black);
        g.drawString("Gráfica log(Mr) frente a movilidad relativa", 10, charHeight);
        g.drawLine(xArray[leftGridCol], yArray[bottomGridRow], xArray[rightGridCol], yArray[bottomGridRow]);
        g.drawLine(xArray[leftGridCol], yArray[topGridRow], xArray[leftGridCol], yArray[bottomGridRow]);
        int i = leftGridCol;
        for(int j = 0; j <= gridCols; j += 2)
        {
            g.drawString(decimalformat.format((double)j / 10D), xArray[i] - charWidth, xAxesLabelY);
            i += 2;
        }

        g.drawString("Movilidad relativa", xArray[leftGridCol + 2] + charHalfWidth, xAxesRMLabelY + charHalfHeight);
        String s = "log Mr";
        i = yArray[leftGridCol + 5] - charHeight * (s.length() / 2);
        for(int k = 0; k < s.length(); k++)
        {
            g.drawString(s.substring(k, k + 1), yAxisLabelX + charWidth / 4, i);
            i += charHeight;
        }

        g.setColor(Color.lightGray);
        i = topGridRow;
        for(int l = 0; l < gridRows; l++)
        {
            g.drawLine(xArray[leftGridCol], yArray[i], xArray[rightGridCol], yArray[i]);
            i++;
        }

        i = leftGridCol + 1;
        for(int i1 = 0; i1 < gridCols; i1++)
        {
            g.drawLine(xArray[i], yArray[topGridRow], xArray[i], yArray[bottomGridRow]);
            i++;
        }

        g.setColor(Color.black);
    }

    private double calcLogMw(double d)
    {
        if(slope == 0.0D)
            return 0.0D;
        else
            return slope * d + yIntercept;
    }

    private void sumXs(double d)
    {
        sumX += d;
    }

    private void showLgMW(Graphics g)
    {
        if(showLogMW)
        {
            plotFont = new Font("Courier New", 0, 10);
            g.setFont(plotFont);
            g.drawString(twoDigits.format(logMw), xArray[leftGridCol] + charHalfWidth, userLineY);
        }
    }

    private void graphVertLine(Graphics g)
    {
        if(graphVerticalLine)
            g.drawLine(xPlot, yArray[bottomGridRow], xPlot, userLineY);
    }

    public void paint(Graphics g)
    {
        if(!imageCreated)
        {
            offScreenImage = createImage(getSize().width, getSize().height);
            font = getFont();
            fm = getFontMetrics(font);
            calcDimensions();
            if(standardsSet)
            {
                yConversion = deltaPixelY / deltaMw;
                calcStdCoords();
                calcLineCoords();
                imageCreated = true;
            }
        }
        offScreenGraphics = offScreenImage.getGraphics();
        offScreenGraphics.setColor(Color.white);
        offScreenGraphics.fillRect(0, 0, getSize().width, getSize().height);
        offScreenGraphics.setColor(Color.black);
        offScreenGraphics.drawRect(0, 0, getSize().width, getSize().height);
        offScreenGraphics.setColor(g.getColor());
        drawAxes(offScreenGraphics);
        drawYScale(offScreenGraphics);
        plotStandards(offScreenGraphics);
        displayRM(offScreenGraphics);
        plotUserRM(offScreenGraphics);
        showExpMW(offScreenGraphics);
        showSampMW(offScreenGraphics);
        showLgMW(offScreenGraphics);
        graphVertLine(offScreenGraphics);
        graphHorizLine(offScreenGraphics);
        showNotBracket(offScreenGraphics);
        g.drawImage(offScreenImage, 0, 0, this);
    }

    private void calcFit()
    {
        if(nPoints <= 1)
        {
            rCorr = 0.0D;
            rCorrSq = 0.0D;
            return;
        } else
        {
            double d = (double)nPoints * sumProd - sumX * sumY;
            double d1 = (double)nPoints * sumXsq - sumX * sumX;
            double d2 = (double)nPoints * sumYsq - sumY * sumY;
            d1 = Math.pow(d1, 0.5D);
            d2 = Math.pow(d2, 0.5D);
            rCorr = d / (d1 * d2);
            rCorrSq = rCorr * rCorr;
            return;
        }
    }

    private void showSampMW(Graphics g)
    {
        if(showSampleMW)
        {
            String s = sample.abbr + " MW = " + String.valueOf(sample.mw);
            g.drawString(s, xArray[leftGridCol], getSize().height / 6);
            parent.displayProtein(sample);
            if(!harpPlayed)
            {
                parent.playHarp();
                harpPlayed = true;
                return;
            }
        } else
        if(questionRCorr)
        {
            g.drawString("No coincide. La movilidad está bien, quizás la recta ajuste mal", xArray[leftGridCol], getSize().height / 6);
            if(!bongPlayed)
            {
                parent.playBong();
                bongPlayed = true;
            }
        }
    }

    public void setResults(Protein aprotein[], Protein protein, Protein protein1)
    {
        stds = aprotein;
        sample = protein;
        dye = protein1;
        resetSums();
        for(int i = 0; i < numberOfStds; i++)
            if(stds[i].selected)
            {
                stds[i].relativeMigration = stds[i].GetDistance() / dye.GetDistance();
                sumXs(stds[i].relativeMigration);
                sumXsqs(stds[i].relativeMigration);
                double d = Math.log(stds[i].mw) / ln10;
                sumYs(d);
                sumYsqs(d);
                sumProds(stds[i].relativeMigration, d);
                nPoints++;
            }

        calcLine();
        calcFit();
        sample.relativeMigration = sample.GetDistance() / dye.GetDistance();
        calcMaxMinLogs();
        standardsSet = true;
        graphVerticalLine = false;
        graphHorizontalLine = false;
        showExperimentalMW = false;
        showLogMW = false;
        showSampleMW = false;
        questionRCorr = false;
        imageCreated = false;
        repaint();
    }

    private void sumXsqs(double d)
    {
        sumXsq += d * d;
    }

    private void sumYs(double d)
    {
        sumY += d;
    }

    private void plotUserRM(Graphics g)
    {
        if(paintUserRM)
        {
            logMw = calcLogMw(plotRM);
            lineCoord = calcLinePoint(plotRM);
            if(newYLine)
            {
                newYLine = false;
                userLineY = yArray[bottomGridRow];
            } else
            if(userLineY >= lineCoord.y + 2)
                userLineY -= 2;
            graphVerticalLine = true;
            if(userLineY <= lineCoord.y + 2)
            {
                if(newXLine)
                {
                    newXLine = false;
                    userLineX = xPlot;
                } else
                {
                    userLineX -= 2;
                }
                graphHorizontalLine = true;
                if(userLineX <= xArray[leftGridCol])
                {
                    showLogMW = true;
                    experimentalMW = Math.pow(10D, logMw);
                    showExperimentalMW = true;
                    double d = Math.abs(((double)sample.mw - experimentalMW) / (double)sample.mw);
                    double d1 = Math.abs((sample.relativeMigration - plotRM) / sample.relativeMigration);
                    if(d < errorMargin)
                        showSampleMW = true;
                    else
                    if(d1 < errorMargin)
                        questionRCorr = true;
                    stop();
                    resetFlags();
                    paintUserRM = false;
                    return;
                }
            } else
            if(userLineY <= lineCoord.y + 2)
            {
                showNotBracketed = true;
                stop();
                resetFlags();
                paintUserRM = false;
            }
        }
    }

    protected void calcDimensions()
    {
        rightEdge = getSize().width;
        xArray[0] = 0;
        division = rightEdge / cols;
        for(int i = 1; i < cols; i++)
            xArray[i] = xArray[i - 1] + division;

        bottomEdge = getSize().height;
        yArray[0] = 0;
        division = bottomEdge / rows;
        for(int j = 1; j < rows; j++)
            yArray[j] = yArray[j - 1] + division;

        deltaPixelX = xArray[rightGridCol] - xArray[leftGridCol];
        deltaPixelY = yArray[bottomGridRow] - yArray[topGridRow];
        font = getFont();
        fm = getFontMetrics(font);
        charWidth = fm.charWidth('0');
        charHalfWidth = charWidth / 2;
        charHalfHeight = fm.getAscent() / 2;
        charHeight = fm.getHeight();
        xAxesLabelY = yArray[bottomGridRow] + fm.getHeight();
        xAxesRMLabelY = xAxesLabelY + fm.getHeight() / 2;
        yAxesLabelY = yArray[topGridRow] - fm.getHeight() / 2;
    }

    private void displayRM(Graphics g)
    {
        if(paintRM)
        {
            mouseRM = (double)(xMouse - xArray[leftGridCol]) / deltaPixelX;
            g.drawString(twoDigits.format(mouseRM), xArray[leftGridCol], yArray[bottomGridRow] + division);
        }
    }

    public boolean mouseDown(Event event, int i, int j)
    {
        parent.playClick1();
        if(standardsSet)
        {
            for(int k = 0; k < numberOfStds; k++)
                if(stds[k].matchPlotPosition(i, j))
                {
                    parent.displayProtein(stds[k]);
                    return true;
                }

            if(mouseOnXAxis(i, j))
            {
                xPlot = xMouse;
                plotRM = mouseRM;
                paintUserRM = true;
                stopAnimation = false;
                showExperimentalMW = false;
                showSampleMW = false;
                questionRCorr = false;
                showLogMW = false;
                showNotBracketed = false;
                graphVerticalLine = false;
                graphHorizontalLine = false;
                start();
            }
        }
        return true;
    }

    private void sumProds(double d, double d1)
    {
        sumProd += d * d1;
    }

    private void calcLineCoords()
    {
        Point point = new Point(0, 0);
        point = calcLinePoint(0.01D);
        fitLineX1 = point.x;
        fitLineY1 = point.y;
        point = calcLinePoint(1.0D);
        fitLineX2 = point.x;
        fitLineY2 = point.y;
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

		
    private void graphHorizLine(Graphics g)
    {
        if(graphHorizontalLine)
            g.drawLine(xPlot, userLineY, userLineX, userLineY);
    }

    private void resetFlags()
    {
        stopAnimation = true;
        newYLine = true;
        newXLine = true;
        paintRM = false;
        bongPlayed = false;
        harpPlayed = false;
    }

    public boolean mouseMove(Event event, int i, int j)
    {
        if(standardsSet)
        {
            if(mouseOnXAxis(i, j))
                paintRM = true;
            else
                paintRM = false;
            repaint();
        }
        return true;
    }

    Font plotFont;
    int pause;
    Electrophoresis parent;
    int numberOfStds;
    Protein stds[];
    Protein sample;
    Protein dye;
    private Image offScreenImage;
    private Graphics offScreenGraphics;
    FontMetrics fm;
    Font font;
    protected boolean imageCreated;
    protected boolean standardsSet;
    protected boolean paintRM;
    protected boolean paintUserRM;
    protected boolean stopAnimation;
    protected boolean showExperimentalMW;
    protected boolean showSampleMW;
    protected boolean questionRCorr;
    protected boolean showLogMW;
    protected boolean showNotBracketed;
    protected boolean graphVerticalLine;
    protected boolean graphHorizontalLine;
    protected boolean newYLine;
    protected boolean newXLine;
    protected boolean bongPlayed;
    protected boolean harpPlayed;
    protected int bottomEdge;
    protected int rightEdge;
    protected int xAxesLabelY;
    protected int xAxesRMLabelY;
    protected int yAxesLabelY;
    protected int yAxisLabelX;
    protected int charHalfHeight;
    protected int charHeight;
    protected int charWidth;
    protected int charHalfWidth;
    protected double yDivision;
    protected int division;
    protected int gridRows;
    protected int gridCols;
    protected int rightGridCol;
    protected int leftGridCol;
    protected int bottomGridRow;
    protected int topGridRow;
    protected int rows;
    protected int cols;
    protected int xArray[];
    protected int yArray[];
    protected double logMwMax;
    protected double logMwMin;
    protected double ln10;
    protected double yConversion;
    protected double deltaPixelY;
    protected double deltaPixelX;
    protected double deltaMw;
    protected double mwOffsetFromMax;
    protected double pixOffsetFromTop;
    protected double mouseRM;
    protected double plotRM;
    protected double experimentalMW;
    protected double logMw;
    protected double sumX;
    protected double sumY;
    protected double sumXsq;
    protected double sumYsq;
    protected double sumProd;
    protected double rCorr;
    protected double rCorrSq;
    protected int nPoints;
    protected double slope;
    protected double yIntercept;
    protected int yPos;
    protected int xPos;
    protected int xMouse;
    protected int xPlot;
    protected int userLineY;
    protected int userLineX;
    protected Point lineCoord;
    protected int fitLineX1;
    protected int fitLineX2;
    protected int fitLineY1;
    protected int fitLineY2;
    protected String cursorPos;
    protected int dotPos;
    protected double errorMargin;
    protected DecimalFormat twoDigits;
}