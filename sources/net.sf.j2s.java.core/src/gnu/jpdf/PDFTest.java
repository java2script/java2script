/*
 * $Id: PDFTest.java,v 1.2 2007/08/26 18:56:35 gil1 Exp $
 *
 * $Date: 2007/08/26 18:56:35 $
 *
 * Copyright (C) 2001  Eric Z. Beard, ericzbeard@hotmail.com
 * 
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 * 
 */
package gnu.jpdf;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.JobAttributes;
import java.awt.MediaTracker;
import java.awt.Point;
import java.awt.PrintJob;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.KeyStroke;
import javax.swing.ScrollPaneConstants;
import javax.swing.Scrollable;

/*
 * SwingJS note: This took an afternoon to integrate into SwingJS -- we were just missing
 * a few classes, which were easy enough to get from GrepCode (OpenJDK), and in SwingJS, 
 * for performance reasons, we do not implement OutputStream.write(byte[]), and we have 
 * a better way to get a FontMetrics. Other than that, flawless! 
 * 
 * Thank you, GNU Java PDF team!!!
 * 
 * Bob Hanson
 * 
 */


/**
 * <p>The purpose of this class is to test all functionality of the 
 * gnu.jpdf package and serve as a demonstration of how to use the 
 * library.</p>
 *
 * <p>This library produces pdf format files and can display and print 
 * them in a java Graphics context by extending java.awt.Graphics and 
 * java.awt.PrintJob.  The pdf file itself is not viewed, but an  
 * identical copy made with the same methods that constructed the 
 * pdf file.  See the code or the tutorial for an example</p>
 *
 * @author Eric Z. Beard 
 *         <a href = "mailto:ericzbeard@hotmail.com">ericzbeard@hotmail.com</a>
 * @version $Revision: 1.2 $
 */
public class PDFTest extends JFrame implements ActionListener
{
  /** Entered on the command line after '-pdf' */
  private static String outputPdfFile;

  /** Entered on the command line after '-img' */
  private static String sampleImageFile;

  /** Not yet supported - test without a window */
  private static boolean noWindow;

  /** Main content pane */
  private JPanel pane = new JPanel();

  /** All sizes will be derived from the desired pdf document size */  
  private Dimension documentDimension;

  private int currentPage;

  private PDFJob job;

  private boolean pdfDocumentAlreadyDone;

  /** 
   * A JPanel used for drawing the document on the screen 
   *
   * The source is included in this file at the bottom
   */
  private TestPanel drawingArea;

  /** The menu bar */
  private TestMenuBar menuBar;

  // TODO: Add the toolbar, use Action objects for action handling

  public PDFTest(String outputPdfFile, 
                 String sampleImageFile, 
                 boolean noWindow) {

    // First see if the file path is valid
    File file = null;
    FileOutputStream fileOutputStream = null;
    try {
      file = new File(outputPdfFile);
      fileOutputStream = new FileOutputStream(file);
    }
    catch (Exception e) {
      System.err.println("Error!! - Invalid output file path: " + 
			 outputPdfFile);
      usage();
      System.exit(1);
    }

    // Handle window closing
    addWindowListener(new WindowAdapter() {
        public void windowClosing(WindowEvent e) {
          System.exit(0);
        }
      });

    Container contentPane = getContentPane();
    
    pane.setLayout(new BorderLayout());

    // Add the menubar
    menuBar = new TestMenuBar(this);
    setJMenuBar(menuBar);
       
    // Get the Graphics object for pdf writing
    Graphics pdfGraphics = null;
    job = new PDFJob(fileOutputStream);
    pdfGraphics = job.getGraphics();
    Dimension d = job.getPageDimension();
    documentDimension = d;

    // Finish setting up the window and bring to front
    int w = (int)d.getWidth();
    int h = (int)d.getHeight();

    drawingArea = new TestPanel();

    // Put the drawing area in a scroll pane
    JScrollPane scrollPane = new JScrollPane(drawingArea, 
                        ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS,
                        ScrollPaneConstants.HORIZONTAL_SCROLLBAR_ALWAYS);

    // Set the preferred size bigger than the scroll pane so the bars show up
    drawingArea.setPreferredSize(new Dimension(1000, 1000));
    
    pane.add(scrollPane, "Center");
    
    contentPane.add(pane);

    setTitle("PDF Test Application");

    // Set the location and size of the window and show it
    Toolkit toolkit = Toolkit.getDefaultToolkit();
    Dimension screenSize = toolkit.getScreenSize();
    setLocation(50, 50);
    setSize(w, h/2);
    setVisible(true);
    toFront();
    
    doFirstPage(pdfGraphics);   
    currentPage = 1;
    
    if (fileOutputStream != null) {
      try {
        fileOutputStream.close();
      }
      catch (IOException e) {
        e.printStackTrace();
      }
      fileOutputStream = null;
    }
    drawingArea.repaint();
    pane.revalidate();
    
  } // end constructor



  private void doFirstPage(Graphics pdfGraphics) {
    Dimension d = documentDimension;
    // Get the graphics object for screen drawing
    Image img = drawingArea.createImage((int)d.getWidth(),
                                        (int)d.getHeight());
    if (img == null) {
      System.out.println("Error!! - drawing image is null");
      System.exit(1);
    }

    drawingArea.setImage(img);
    Graphics javaGraphics = img.getGraphics();    

    // Now we have two Graphics objects - one for java Graphics to 
    // draw to the screen , another to write 
    // to the pdf file.  We'll use the same methods to act on both 
    // objects, and (theoretically) the results should be identical.
    // If 'Print' is selected from the menu, the same methods wi
    // act on a Graphics object from the java.awt.PrintJob    

    doTest(javaGraphics, d);
    javaGraphics.dispose();

    // The whole pdf doc will be written when the program starts
    if ((!pdfDocumentAlreadyDone) && (pdfGraphics != null)) {
      doTest(pdfGraphics, d);
      pdfGraphics.dispose();

      pdfGraphics = job.getGraphics();
      doSecondPageTest(pdfGraphics);
      pdfGraphics.dispose();
      job.end();
    }

    // The same methods (such as 'job.end()') are called on the pdf job 
    // as on a print job, so this could be abstracted further to use the 
    // same code on both jobs
    currentPage = 1;

    drawingArea.repaint();
    drawingArea.revalidate();
  }

  /**
   * <p>Very basic action handler - a more robust app would use 
   * Action objects</p>
   *
   * @param e an <code>ActionEvent</code> value
   */
  public void actionPerformed(ActionEvent e) {
    Object source = e.getSource();    
    if (source == menuBar.close) {
        System.exit(0);
    }        
    if (source == menuBar.printer) {
      printPdf();
      return;
    }
    if (source == menuBar.helpTopics) {
      System.out.println("Help..");
      showHelp();
      return;
    }
    if (source == menuBar.aboutApp) {
      System.out.println("About...");
      showAboutBox();
      return;
    }
    if (source == menuBar.viewFirstPage) {
      if (currentPage != 1) {
        doFirstPage(null);
        return;
      }
    }
    if (source == menuBar.viewSecondPage) {
      if (currentPage != 2) {
        doSecondPage();
        return;
      }
    }
  }


  /**
   * <p>Show the about dialog box</p>
   *
   */
  private void showAboutBox() {
    JOptionPane.showMessageDialog(this, "gnujpdf test application, " +
                                  "by Eric Z. Beard.  " + 
                                  "http://gnujpdf.sourceforge.net");
  }


  /**
   * <p>Show a help dialog - it would be good to use text from 
   * a tutorial that sits in the docs directory</p>
   *
   */
  private void showHelp() {
    HelpFrame helpFrame = new HelpFrame();
  }

  /**
   * <p>Gets a print job and uses the same drawing methods that 
   * were used on the other Graphics objects to print the document</p>
   *
   */
  private void printPdf() {
    System.out.println("Printing...");
    JobAttributes jobAttributes = new JobAttributes(); 
    //jobAttributes.setDialog(JobAttributes.DialogType.NONE); 
    // CRAP!! - This doesn't work with jdk1.2.2 - fix it
    Toolkit toolkit = Toolkit.getDefaultToolkit();
    PrintJob pjob = toolkit.getPrintJob(this, 
                                        "PDF Test Print", 
                                        jobAttributes,  
                                        null); 
    if(pjob != null) {  
      Graphics printGraphics = pjob.getGraphics(); 
      if (currentPage == 1) {
        doTest(printGraphics, documentDimension); 
        printGraphics.dispose();
        pjob.end(); 
      }
      else {
        doSecondPageTest(printGraphics);
        printGraphics.dispose();
        pjob.end();
      }
    } 
    else { 
      System.err.println("Can't print: printjob null"); 
    } 
  }



  /**
   * <p>This method accepts any Graphics object and draws to it.  It 
   * can be a java Graphics object for drawing to the screen, a pdf 
   * graphics object for constructing a pdf object, or a print job 
   * graphics object.  The goal is to make all three look exactly the 
   * same, along with how the document looks when opened in Acrobat 
   * Reader and printed from Acrobat Reader - so it's actually 5 things 
   * that should ultimately look exactly the same, all constructed with 
   * the same set of methods</p>
   *
   * <p>This method should provide programmers with a good basis 
   * for using the BoundingBox class, if they choose to do so.  It is by 
   * no means necessary, as it only makes layout on a fixed dimension 
   * canvas easier.  The point of the pdf graphics library is to use 
   * the same drawing methods used in applets and applications</p>
   *
   * @param g a <code>Graphics</code> object to draw to
   * @param d a <code>Dimension</code> object, the size of the document
   */
  private void doTest(Graphics g, Dimension d) {
    g.setColor(Color.white);
    g.fillRect(0,0,d.width, d.height);


    g.setColor(Color.black);
    Point boxUpperLeft = new Point(60, 60);
    Dimension boxSize  = new Dimension(200, 200);
    Font f = new Font("TimesRoman", Font.PLAIN, 14);
    g.setFont(f);
    FontMetrics fm = g.getFontMetrics(f);
    BoundingBox box = new BoundingBox(boxUpperLeft, boxSize);
    String string = "Hello World! this is a really long string";
    int padding = 10;
    BoundingBox child = null;
    try { 
      child = box.getStringBounds(string,
                                  BoundingBox.HORIZ_ALIGN_CENTER,
                                  BoundingBox.VERT_ALIGN_BOTTOM,
                                  fm, 
                                  padding);
    }
    catch (StringTooLongException stle) {
      // A more robust app might just cut off the end of the string or 
      // prevent the string from ever being too long or break it into 
      // pieces and create a new PDFPage (by getting a new graphics object)
      // and continue the document
      stle.printStackTrace();
      return;
    }
    
    g.drawRect(60, 60, 200, 200);
    g.drawRect((int)child.getLocation().getX() + 60,
               (int)child.getLocation().getY() + 60,
               (int)child.getSize().getWidth(),
               (int)child.getSize().getHeight());
    Point p = child.getDrawingPoint();
    int x = (int)p.getX();
    int y = (int)p.getY();
    // Draw the baseline
    g.drawLine(x, y, x + ((int)child.getSize().getWidth() - padding*2), y);

    try {
      child.drawWrappedString(g, fm, padding, BoundingBox.HORIZ_ALIGN_CENTER);
    }
    catch (StringTooLongException stle) {
      stle.printStackTrace();
      return;
    }

    //drawHeader(g, d);
    //drawBody(g, d);
    
    // Draw Hello world in a nested box
    BoundingBox b1 = new BoundingBox(new Point(300, 60), 
				     new Dimension(200, 200));
    g.drawRect((int)b1.getAbsoluteLocation().getX(), 
               (int)b1.getAbsoluteLocation().getY(), 
               (int)b1.getSize().getWidth(),
               (int)b1.getSize().getHeight());
    BoundingBox b2 = new BoundingBox(new Point(10, 10), 
				     new Dimension(100, 100));
    b1.add(b2);        
    g.drawRect((int)b2.getAbsoluteLocation().getX(), 
               (int)b2.getAbsoluteLocation().getY(), 
               (int)b2.getSize().getWidth(),
               (int)b2.getSize().getHeight());
    
    try {    
      BoundingBox b3 = b2.getStringBounds(string,
                                        BoundingBox.HORIZ_ALIGN_CENTER,
                                        BoundingBox.VERT_ALIGN_BOTTOM,
                                        fm, 
                                        padding);
      g.drawRect((int)b3.getAbsoluteLocation().getX(), 
               (int)b3.getAbsoluteLocation().getY(), 
               (int)b3.getSize().getWidth(),
               (int)b3.getSize().getHeight());
    
      Point pt = b3.getDrawingPoint();
      int px = (int)pt.getX();
      int py = (int)pt.getY();
      b3.drawWrappedString(g, fm, padding, BoundingBox.HORIZ_ALIGN_CENTER); 
    }
    catch (StringTooLongException stle) {
      stle.printStackTrace();
    }

    drawStringsInBox(g);
    drawSampleImage(g, d);
    
    
  } // end doTest





  /**
   * Describe <code>drawStringsInBox</code> method here.
   *
   * @param g a <code>Graphics</code> value
   */
  private void drawStringsInBox(Graphics g) {
    g.setColor(Color.black);
    BoundingBox box = new BoundingBox(new Point(20, 300), 
                                      new Dimension(250, 250));
    g.drawRect((int)box.getAbsoluteLocation().getX(),
               (int)box.getAbsoluteLocation().getY(),
               (int)box.getSize().getWidth(),
               (int)box.getSize().getHeight());
    Font f = new Font("Helvetica", Font.PLAIN, 12);
    g.setFont(f);
    FontMetrics fm = g.getFontMetrics();
    String line1 = "Line 1";
    String line2 = "Line 2";
    String line3 = "Line 3 realllllly loooooong   .h gkjhg kjh gkjh gkjhg kjhg kjhg kjh gk jbhg";
    int padding = 5;

    BoundingBox child = null;
    try {
      child = box.getStringBounds(line1,
                                  BoundingBox.HORIZ_ALIGN_LEFT,
                                  BoundingBox.VERT_ALIGN_TOP,
                                  fm, 
                                  padding);
      child.drawWrappedString(g, fm, padding, BoundingBox.HORIZ_ALIGN_LEFT);
    }
    catch (StringTooLongException stle) {
      stle.printStackTrace();
      return;
    }
    box.subtract(child, BoundingBox.SUBTRACT_FROM_BOTTOM);

    try {
      child = box.getStringBounds(line2,
                                BoundingBox.HORIZ_ALIGN_LEFT,
                                BoundingBox.VERT_ALIGN_TOP,
                                fm, 
                                padding);
      child.drawWrappedString(g, fm, padding, BoundingBox.HORIZ_ALIGN_LEFT);
    }
    catch (StringTooLongException stle) {
      stle.printStackTrace();
      return;
    }

    box.subtract(child, BoundingBox.SUBTRACT_FROM_BOTTOM);

    try {
      child = box.getStringBounds(line3,
                                BoundingBox.HORIZ_ALIGN_LEFT,
                                BoundingBox.VERT_ALIGN_TOP,
                                fm, 
                                padding);
      child.drawWrappedString(g, fm, padding, BoundingBox.HORIZ_ALIGN_LEFT);
    }
    catch (StringTooLongException stle) {
      stle.printStackTrace();
      return;
    }
    box.subtract(child, BoundingBox.SUBTRACT_FROM_BOTTOM);

    try {
      child = box.getStringBounds(line1,
                                BoundingBox.HORIZ_ALIGN_RIGHT,
                                BoundingBox.VERT_ALIGN_BOTTOM,
                                fm, 
                                padding);
      child.drawWrappedString(g, fm, padding, BoundingBox.HORIZ_ALIGN_RIGHT);
      box.subtract(child, BoundingBox.SUBTRACT_FROM_TOP);

      child = box.getStringBounds(line2,
                                BoundingBox.HORIZ_ALIGN_RIGHT,
                                BoundingBox.VERT_ALIGN_BOTTOM,
                                fm, 
                                padding);
      child.drawWrappedString(g, fm, padding, BoundingBox.HORIZ_ALIGN_RIGHT);
      box.subtract(child, BoundingBox.SUBTRACT_FROM_TOP);

      child = box.getStringBounds(line3,
                                BoundingBox.HORIZ_ALIGN_RIGHT,
                                BoundingBox.VERT_ALIGN_BOTTOM,
                                fm, 
                                padding);
      child.drawWrappedString(g, fm, padding, BoundingBox.HORIZ_ALIGN_RIGHT);
      box.subtract(child, BoundingBox.SUBTRACT_FROM_TOP);
    }
    catch (StringTooLongException stle) {
      stle.printStackTrace();
      return;
    }
    
  } // end drawStringsInBox




  /**
   * Describe <code>drawSampleImage</code> method here.
   *
   * @param g a <code>Graphics</code> value
   * @param d a <code>Dimension</code> value
   */
  private void drawSampleImage(Graphics g, Dimension d) {
    try {
    	if (sampleImageFile == null)
    		return;
      Toolkit toolkit = Toolkit.getDefaultToolkit();
      Image img = toolkit.createImage(sampleImageFile);
      MediaTracker tracker = new MediaTracker(drawingArea);
      tracker.addImage(img, 0);
      try {
        tracker.waitForID(0);
      }
      catch (Exception e) {
        e.printStackTrace();
      }
      /* bazsoft 
      g.drawImage(img, 300, 300, 
                  img.getWidth(drawingArea), 
                  img.getHeight(drawingArea), 
                  Color.green, 
                  drawingArea);
                  */
      g.drawImage(img, 10, 10, 
                  img.getWidth(drawingArea), 
                  img.getHeight(drawingArea), 
                  Color.green, 
                  drawingArea);
    }
    catch (Exception e) {
      e.printStackTrace();
    }
  }


  private void doSecondPage() {

    Dimension d = documentDimension;
    // Get the graphics object for screen drawing
    Image img = drawingArea.createImage((int)d.getWidth(),
                                        (int)d.getHeight());
    if (img == null) {
      System.out.println("Error!! - drawing image is null");
      System.exit(1);
    }

    drawingArea.setImage(img);
    Graphics javaGraphics = img.getGraphics();    
   
    doSecondPageTest(javaGraphics);
    javaGraphics.dispose();

    currentPage = 2;
    drawingArea.repaint();
    drawingArea.revalidate();
  }

  private void doSecondPageTest(Graphics g) {
    g.setColor(Color.white);
    g.fillRect(0,0,documentDimension.width, documentDimension.height);
    g.setColor(Color.black);
    // test drawLine()
    g.drawLine(10,10,50,50);
    
    // test drawRect()
    g.drawRect(30,10,10,10);
    
    // test fillRect()
    g.fillRect(30,90,10,10);
    
    // test drawPolygon()
    int xp[] = new int[] {10,10,20,15,20};
    int yp[] = new int[] {50,60,60,55,50};
    int np = xp.length;
    g.drawPolygon(xp,yp,np);
    
    // test drawPolygon()
    xp = new int[] {60,60,70,65,70};
    yp = new int[] {80,90,90,85,80};
    np = xp.length;
    g.drawPolyline(xp,yp,np);
    
    // test fillPolygon()
    xp = new int[] {60,60,70,65,70};
    yp = new int[] {50,60,60,55,50};
    np = xp.length;
    g.fillPolygon(xp,yp,np);
    
    // Now some text
    g.setFont(new Font("SansSerif",Font.PLAIN,12));
    g.drawString("This is a simple string",10,120);
    
    g.drawString("This is a (complex) string",10,130);
    
    g.drawString("(complex) string (with ( (multiple brackets ))",10,140);
    
    // Now some arcs - first test is with a square
    g.drawRect(200, 60, 50, 50);                // rectangle
    g.drawLine(200, 60,250,110);                // join both corners
    g.drawLine(200,110,250, 60);
    g.drawLine(200, 85,225, 60);                // this should be a chord
    g.drawArc( 200, 60, 50, 50, 45,180);        // the arc
    

    // June 20, 2001 ezb - Looks like ovals work as expected
    g.drawArc(100, 400, 100, 200, 0, 360);

    g.drawOval(200, 400, 100, 200);

    g.fillOval(300, 400, 100, 200);

    // These two tests act on a rectangular region (ie width != height)
    // Now the interesting thing is that they don't fit the arc within
    // the rectangle, but act on the width. This - by accident - matches the
    // way the Linux JDK operates...
    
    // Now the same test, but with a rectangle
    g.drawRect(300,50,80,40);
    g.drawLine(300,50,380,90);
    g.drawLine(300,90,380,50);
    g.drawArc(300,50,80,40, 135,180);
    
    // Again the same test, but we will fill the arc
    g.drawRect(400,50,40,80);
    g.drawLine(400,50,440,130);
    g.drawLine(400,130,440,50);
    g.setColor(Color.blue);
    g.fillArc(400,50,40,80, 135,180);
    g.setColor(Color.black);
    
    // Repeat again, but this time with different angles to the arc.
    // We do this to compare how Java and PDF render the arcs
    g.drawRect(400,150,40,80);
    g.drawLine(400,150,440,230);
    g.drawLine(400,230,440,150);
    g.setColor(Color.blue);
    g.fillArc(400,150,40,80, 135,225);
    g.setColor(Color.black);
    
    
    
    // Finally draw a small table of all the fonts and styles
    String fonts[] = new String[] {"SansSerif",
                                   "Monospaced",
                                   "TimesRoman",
                                   "Helvetica",
                                   "Courier",
                                   "Dialog",
                                   "DialogInput"};
    String modes[] = new String[] {"Plain",
                                   "Bold",
                                   "Italic",
                                   "Bold+Italic"};
    int imodes[] = new int[] {Font.PLAIN,
                              Font.BOLD,
                              Font.ITALIC,
                              Font.BOLD + Font.ITALIC};
    
    int ty = 170;
    
    for(int i=0;i<modes.length;i++)
      g.drawString(modes[i],100+(50*i),ty-14);
    
    FontMetrics fm = g.getFontMetrics();
    for(int i=0;i<fonts.length;i++)
      g.drawString(fonts[i],98-fm.stringWidth(fonts[i]),ty+(12*i));
    
    Font cf = g.getFont();
    
    for(int i=0;i<fonts.length;i++) {
      for(int j=0;j<modes.length;j++) {
        g.setFont(new Font(fonts[i],imodes[j],10));
        g.drawString(modes[j],100+(50*j),ty);
      }
      
      ty+=12;
    }
  } // end doSecondPage

  /**
   * <p>The test is initiated through the main method.  From the 
   * command line, two parameters are needed, -pdf [path-to-pdf], which 
   * is the path and filename of the pdf you would like to create using 
   * this test.  It should end in ".pdf".  The other param is 
   * -img [path-to-image].  It should be a pre-existing image, preferably 
   * a very small jpg.  The command line arg -nw, for no window test, is 
   * not yet supported.</p>
   *
   * @param args a <code>String[]</code> value
   */
  public static void main(String[] args) {
  	args = new String[] {"-pdf", "c:/temp/test/gnu-test.pdf", "-img", null };
    if ((args != null) && (args.length > 0)) {
      int len = args.length;

      for (int i = 0; i < len; i++) {
      	if (args[i] == null)
      		continue;
        if (args[i].equals("-nw")) {
          noWindow = true;
        }
        if (args[i].equals("-pdf")) {
          if (len > (i + 1)) {
            outputPdfFile = args[i + 1];
          }
        }
        if (args[i].equals("-img")) {
          if (len > (i + 1)) {
            sampleImageFile = args[i + 1];
          }
        }
      }
    }
    else {
      usage();
      System.exit(1);
    }
    if (outputPdfFile == null) {
      System.err.println("No output file specified");
      usage();
      System.exit(1);
    }
//    if (sampleImageFile == null) {
//      System.err.println("No sample image file specified");
//      usage();
//      System.exit(1);
//    }

    // Params are ok, proceed with test
    PDFTest window = new PDFTest(outputPdfFile, sampleImageFile, noWindow);

  } // end main



  private static void usage() {
    System.out.println("PDFTest Usage:");
    System.out.println();
    System.out.print("java -classpath <$CLASSPATH> gnu.jpdf.PDFTest -pdf ");
    System.out.print("<output-file-path> -img <path-to-image>");
    System.out.println();
    System.out.println();
    System.out.println("This will produce the pdf file generated at ");
    System.out.println("<output-file-path> (which should end in '.pdf') and ");
    System.out.println("use the image at <path-to-image>.  Use a small jpg ");
    System.out.println("preferably since the compression is not so good ");
    System.out.println("and a pdf file will typically be 10 times as big as ");
    System.out.println("the image used as a sample.");
    System.out.println();
  }
} // end class PDFTest


// Non public classes used by PDFTest

class TestPanel extends JPanel implements Scrollable 
{
  // Scrollable methods
  private Image image;

  public Dimension getPreferredScrollableViewportSize() {
    return getPreferredSize(); // Not sure if this is what I want    
  }

  public int getScrollableBlockIncrement(Rectangle visibleRect, 
                                         int orientation, 
                                         int direction) {
    return 20; // This is fine, no customization needed
  }

  public boolean getScrollableTracksViewportHeight() {
    return false; // true disables scrolling
  }

  public boolean getScrollableTracksViewportWidth() {
    return false; // true disables scrolling
  }

  public int getScrollableUnitIncrement(Rectangle visibleRect, 
                                        int orientation, 
                                        int direction) {
    return 5; // This is fine, no customization needed
  }

  public void setImage(Image img) {
    image = img;
  }

  protected void paintComponent(Graphics g) {
    super.paintComponent(g);
    g.setColor(Color.gray);
    g.fillRect(0,0,getSize().width,getSize().height);
    if (image != null) {
      g.drawImage(image, 0, 0, this);
    }    
  } // end paintComponent

} // end class TestPanel



/**
 * Really basic toolbar - not an example of the finest GUI design
 *
 */
class TestMenuBar extends JMenuBar
{
  JMenu file, personnel, help, about, view;
  JMenuItem printer;
  JMenuItem close;
  JMenuItem helpTopics;
  JMenuItem aboutApp;
  JMenuItem viewFirstPage;
  JMenuItem viewSecondPage;
  
  
  public TestMenuBar(ActionListener parent)
  {
    file = new JMenu("File");
    file.setMnemonic(KeyEvent.VK_F);
    
    printer = new JMenuItem("Print");
    printer.setMnemonic(KeyEvent.VK_R);
    printer.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_R, 
						  ActionEvent.CTRL_MASK));
    printer.addActionListener(parent);
    //printer.setEnabled(false);
    file.add(printer);
    
    close = new JMenuItem("Close");
    close.setMnemonic(KeyEvent.VK_Q);
    close.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_Q, 
						ActionEvent.CTRL_MASK));
    close.addActionListener(parent);
    file.add(close);    
    
    view = new JMenu("View");
    view.setMnemonic(KeyEvent.VK_V);

    // This isn't very extensible
    viewFirstPage = new JMenuItem("First Page");
    viewFirstPage.addActionListener(parent);
    view.add(viewFirstPage);
    viewSecondPage = new JMenuItem("Second Page");
    viewSecondPage.addActionListener(parent);
    view.add(viewSecondPage);
    
    
    
    help = new JMenu("Help");
    help.setMnemonic(KeyEvent.VK_H);
    helpTopics = new JMenuItem("Help Topics");
    helpTopics.addActionListener(parent);
    help.add(helpTopics);
    
    about = new JMenu("About");
    about.setMnemonic(KeyEvent.VK_A);
    aboutApp = new JMenuItem("About");
    aboutApp.addActionListener(parent);
    about.add(aboutApp);
    
    add(file);
    add(view);   
    add(help);
    add(about);
  } // end constructor
  
} // end class TestMenuBar




/**
 * A simple help frame.  Nothing fancy.
 *
 */
class HelpFrame extends JFrame
{
  public HelpFrame() {
    setTitle("gnupdf Help");
        
    Container helpContent = getContentPane();
    
    helpContent.setLayout(new BorderLayout());
    JTextArea textArea = new JTextArea(20, 40);
    textArea.setLineWrap(true);
    textArea.append(getHelpText());    
    JScrollPane helpScroller = new JScrollPane(textArea);
    helpContent.add(helpScroller);
    setSize(helpScroller.getSize());
    setLocation(new Point(200, 200));
    pack();
    toFront();
    show();
    //helpScroller.getViewport().setViewPosition(new Point(0, 0));
    //textArea.scrollRectToVisible(new Rectangle(0, 0, 2, 2));
    textArea.setCaretPosition(0);
    textArea.setEditable(false);
  }

  private String getHelpText() {
    StringBuffer out = new StringBuffer();
    out.append("gnujpdf Help File and Tutorial\n");
    out.append("\n");
    out.append("This file contains some general help and a simple tutorial on the\n");
    out.append("gnujpdf java package (gnu.jpdf.*).  More information can be\n");
    out.append("obtained from the website, http://gnujpdf.sourceforge.net.\n");
    out.append("\n");
    out.append("gnujpdf is a set of Java classes that allows a programmer to use\n");
    out.append("extended versions of java.awt.Graphics and java.awt.PrintJob to\n");
    out.append("generate and print pdf files.  The idea is to use methods and\n");
    out.append("classes that act on a Graphics object to produce the same output\n");
    out.append("in a pdf file, on the screen, and on the printer.\n");
    out.append("\n");
    out.append("The best source of information for a programmer wishing to use\n");
    out.append("this simple API is the source code in PDFTest.java.  It\n");
    out.append("demonstrates a simple application that displays various\n");
    out.append("formatting and simultaneously writes a pdf file that will be an\n");
    out.append("identical copy of what is seen on the screen.\n");
    out.append("\n");
    out.append("The starting point for creating any PDF document with this\n");
    out.append("library is the PDFJob class.\n");
    out.append("\n");
    out.append("PDFJob job = new PDFJob(fileOutputStream);\n");
    out.append("\n");
    out.append("The fileOutputStream is normally a stream initialized with the\n");
    out.append("name of the pdf you wish to generate, such as \"test.pdf\".  A\n");
    out.append("PDFGraphics object can be obtained from the job by calling:\n");
    out.append("\n");
    out.append("Graphics pdfGraphics = job.getGraphics();\n");
    out.append("\n");
    out.append("This Graphics object can be passed into the same methods used to\n");
    out.append("draw to the screen.  Most of the common methods in\n");
    out.append("java.awt.Graphics have been implemented (with a few important\n");
    out.append("exceptions - this is a beta product, so there is still plenty of\n");
    out.append("work to be done - see the source code for more specifics).  When\n");
    out.append("calling methods such as drawString(..)  or drawImage(..), what is\n");
    out.append("actually happening is that the PDFGraphics object is writing the\n");
    out.append("necessary markup to the output stream.\n");
    out.append("\n");
    out.append("A new pdf page is initialized by disposing of the exisiting\n");
    out.append("Graphics object and getting a new one from the job.\n");
    out.append("\n");
    out.append("pdfGraphics.dispose(); \n");
    out.append("pdfGraphics = job.getGraphics();\n");
    out.append("\n");
    out.append("Any Graphics operations will now be made on a new page in the pdf\n");
    out.append("document.  When the document is finished, the job must be closed\n");
    out.append("out:\n");
    out.append("\n");
    out.append("pdfGraphics.dispose();\n");
    out.append("job.end();\n");
    out.append("\n");
    out.append("And the fileOutputStream will need to be closed properly as well,\n");
    out.append("as this is not guaranteed to be taken care of by the PDF classes.\n");
    out.append("\n");
    out.append("----------------\n");
    out.append("End of Help File\n");
    out.append("\n");
    out.append("For more information, see http://gnujpdf.sourceforge.net\n");
    out.append("\n");



    return out.toString();
  }
} // end class HelpFrame





