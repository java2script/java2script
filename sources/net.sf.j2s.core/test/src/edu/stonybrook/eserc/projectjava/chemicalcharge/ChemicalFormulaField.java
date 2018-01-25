package edu.stonybrook.eserc.projectjava.chemicalcharge;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;

import javax.swing.JPanel;
public class ChemicalFormulaField extends JPanel {
/*************************************************/
/* Component for displaying a chemical formula   */
/* along with the net charge.                                        */
/* Janet L. Kaczmarek                                                  */
/******************************************************************/
    String cationSymbol;
    int cationCount;
    int cationCharge;
    int anionCharge;
    String anionSymbol;
    int anionCount;
    int cationTotalCharge;
    int anionTotalCharge;
    int netCharge;
    Font fontBig = new Font("TimesRoman", Font.BOLD, 25);
    Font fontSmall = new Font("TimesRoman", Font.BOLD, 15);
    
    public ChemicalFormulaField() {
    // constructor
    }
    public void setFormula(String cationSymbol, int cationCount, int cationTotalCharge,
                           String anionSymbol, int anionCount, int anionTotalCharge, int netCharge) {
    // set the formula to be displayed
      
        this.cationSymbol = cationSymbol;
        this.cationCount = cationCount;
        this.anionSymbol = anionSymbol;
        this.anionCount = anionCount;
        this.cationTotalCharge = cationTotalCharge;
        this.anionTotalCharge = anionTotalCharge;
        this.netCharge = netCharge;
        // display the formula
        repaint();
    }

    public void paintComponent (Graphics g) {
    // paint this component
        int position =45;
        super.paintComponent(g);
        // use FontMetrics to control positioning of characters according to
        // length of preceding portion of formula
        FontMetrics fontMetricsBig = g.getFontMetrics(fontBig);
        FontMetrics fontMetricsSmall = g.getFontMetrics(fontSmall);
          int nc;
          int na;
          int i;
                
          nc = cationSymbol.length(); 
          na = anionSymbol.length(); 

        // display nothing, no cation, no anions yet
         if ((cationCount == 0) && (anionCount == 0)) {
            g.setFont(fontSmall);
            g.drawString("Please select from one ", 15,15); 
            g.drawString("of the buttons below.", 15,30); 
          }
        // display cation portion of formula, no anions yet
        else if ((cationCount > 0) && (anionCount == 0)) {
             for( i =0; i<nc; i++)  {
                   char ch = cationSymbol.charAt(i);
                 
                
                 if (Character.isLetter(ch) || (ch =='('  ) || (ch==')' ) )  {
	 if ((cationCount<2) && ( (ch =='('  ) || (ch==')' )))  {                                    
		    }
                   else { g.setFont(fontBig);
                    g.drawString(""+ch, position, 20);  
                    position += fontMetricsBig.stringWidth(""+ch);          }
                 }
                else {
                   g.setFont(fontSmall);
                   g.drawString(""+ch, position, 25);
                   position += fontMetricsSmall.stringWidth(""+ch);
                 }
            } //close for loop to print cation symbol

      //print the cation count and total charge
     if (cationCount>1) {
            g.setFont(fontSmall);
            g.drawString(""+cationCount, position, 25);
            position += fontMetricsSmall.stringWidth(""+cationCount);
            } 
            g.setFont(fontSmall);
            g.drawString("+" + cationTotalCharge, position, 10);

        }// close cation portion of formula, no anions yet 

        else if ((cationCount == 0) && (anionCount > 0)) {
            // display anion portion of formula, no cations yet
              
               for( i =0; i<na; i++)  {
                     char ch = anionSymbol.charAt(i);

                     if (Character.isLetter(ch) || (ch =='('  ) || (ch==')' ) )  {
		 if ((anionCount<2) && ( (ch =='('  ) || (ch==')' )))  {                                    
		    }
                        else {  g.setFont(fontBig);
                          g.drawString(""+ch, position, 20);  
                          position += fontMetricsBig.stringWidth(""+ch);          }
                      }
                     else {
	      g.setFont(fontSmall);
	      g.drawString(""+ch, position, 25);
                         position += fontMetricsSmall.stringWidth(""+ch);
                      }
                } //close for loop to write anion symbol

          // print anion count and total charge
            if (anionCount>1) {
            g.setFont(fontSmall);
            g.drawString(""+anionCount, position, 25);
            position += fontMetricsSmall.stringWidth (""+anionCount);
            }
            g.setFont(fontSmall);
            g.drawString("" + anionTotalCharge, position, 10);
        } // close anion portion of formula, no cations yet



          // display cation and anion 
         else {
  
                     for( i =0; i<nc; i++)  {

                           char ch = cationSymbol.charAt(i);
                            
                         
                               if (Character.isLetter(ch) || (ch =='('  ) || (ch==')' ) )  {
		 if ((cationCount<2) && ( (ch =='('  ) || (ch==')' )))  {                                    
		    }
 		else {                                        
          	                   g.setFont(fontBig);
                                     g.drawString(""+ch, position, 20);  
                                     position += fontMetricsBig.stringWidth(""+ch);   
		}
	          }
                          
                            else {
                                 g.setFont(fontSmall);
                                 g.drawString(""+ch, position, 25);
                                 position += fontMetricsSmall.stringWidth(""+ch);
                                }
                       } //close for loop
                       if (cationCount>1) {
                       g.setFont(fontSmall);
                       g.drawString(""+cationCount, position, 25);
                       position += fontMetricsSmall.stringWidth(""+cationCount);
                       }
                   // Anion portion
                   for( i =0; i<na; i++)  {
                       char ch = anionSymbol.charAt(i);

                        if (Character.isLetter(ch) || (ch =='('  ) || (ch==')' ) )  {
		 if ((anionCount<2) && ( (ch =='('  ) || (ch==')' )))  {                                    
		    }
                            else { g.setFont(fontBig);
                             g.drawString(""+ch, position, 20);  
                             position += fontMetricsBig.stringWidth(""+ch);          }
                         }
                         else {
	          g.setFont(fontSmall);
	          g.drawString(""+ch, position, 25);
                             position += fontMetricsSmall.stringWidth(""+ch);
                         }
                    } // close for loop
              if (anionCount>1) {
              g.setFont(fontSmall);
              g.drawString(""+anionCount, position, 25);
              position += fontMetricsSmall.stringWidth (""+anionCount);
              }
             
              g.setFont(fontSmall);
                   if (netCharge >0) {
	     g.drawString("+" + netCharge, position, 10);
                   }
                   else if (netCharge <0) {
	     g.drawString ("" + netCharge, position, 10);
                   }
	      
             } // close cation and anion: ELSE
    } // Close PaintComponent

    public Dimension getPreferredSize() {
    // preferred size of this component to be used by layout managers
        return new Dimension(225, 52);
    }

    public Dimension getMinimumSize() {
    // minimum size of this component to be used by layout managers
        return new Dimension(225, 52);
    }

}