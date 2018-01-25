package edu.stonybrook.eserc.projectjava.chemicalcharge;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;

import javax.swing.JPanel;
public class StandardCationField extends JPanel {
/*************************************************/
/* Component for displaying a cation's standard ion.  */
/*                                                                   */
/* Janet L. Kaczmarek                              */
/*************************************************/
    String cationSymbol;
    int cationCharge;
   
    Font fontBig = new Font("TimesRoman", Font.BOLD, 22);
    Font fontSmall = new Font("TimesRoman", Font.BOLD, 12);


    public StandardCationField ()  {
    //constructor
    }
     public void setStandardCation (String cationSymbol, int cationCharge)  {
          // set the ion to be displayed
          this.cationSymbol = cationSymbol;
          this.cationCharge = cationCharge;

          //display the ion
          repaint();
    }

public void paintComponent (Graphics g)  {
//paint this component
    int position =30;
    super.paintComponent(g);
    FontMetrics fontMetricsBig = g.getFontMetrics(fontBig);
    FontMetrics fontMetricsSmall = g.getFontMetrics(fontSmall);
    int nc;
    int i;
    nc = cationSymbol.length();
    
    for( i =0; i<nc; i++)  {

        char ch = cationSymbol.charAt(i);
     
      if (Character.isLetter(ch) )  {
              g.setFont(fontBig);
              g.drawString(""+ch, position, 20);  
              position += fontMetricsBig.stringWidth(""+ch);          
        }
        else if (Character.isDigit(ch))  {
               g.setFont(fontSmall);
               g.drawString(""+ch, position, 25);
               position += fontMetricsSmall.stringWidth(""+ch);
        }


      } //close for loop

    //print the charge (superscript)
    g.setFont(fontSmall);
    g.drawString("+" + cationCharge, position, 10);
     
}

public Dimension getPreferredSize () {
//preferred size of this component to be used by layout manager
    return new Dimension(100, 32);
}

public Dimension getMinimumSize () {
//minimum size of this component to be used by layout manager
    return new Dimension(100, 32);
}
}
