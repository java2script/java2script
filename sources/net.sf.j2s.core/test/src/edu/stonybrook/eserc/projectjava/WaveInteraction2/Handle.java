package edu.stonybrook.eserc.projectjava.WaveInteraction2;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Polygon;
import java.awt.Rectangle;
/*
   ProjectJava, LICIL
   Author:   Konstantin Lukin
   Project:  SineWave
   
           Modified for SwingJS by Bob Hanson - Jan, 2017
*/


public class Handle extends Rectangle {

public static final int HORIZONTAL = 0;
public static final int VERTICAL   = 1;
public static final int BOTH       = 2;
public int Cx, Cy;

   
public Handle(int orient) {
   super(0, 0, 0, 0);
   orientation = orient;
   switch(orient) {
      case HORIZONTAL:
         width=18; height=6;
         break;
      case VERTICAL:
         width=6;  height=18;
         break;
      case BOTH:
         width=14; height=14;
         break;
   }
   Cx = x + width/2;
   Cy = y + height/2;
   setPolygon();
}


public void move(int _Cx, int _Cy) {
   Cx = _Cx;
   Cy = _Cy;
   x = Cx - width/2;
   y = Cy - height/2;
   setPolygon();
}

public void translate(int dx, int dy) {
   x += dx;
   y += dy;
   Cx += dx;
   Cy += dy;
   setPolygon();
}


public void draw(Graphics g) {
   g.drawPolygon(poly);
}   

public void fill(Graphics g) {
   g.fillPolygon(poly);
}

public void fill3D(Graphics g, boolean raised) {
   translate(-1,-1); // ori -1
   g.setColor((raised) ? Color.white : Color.gray);
   fill(g);

   translate(+2,+2);  // ori -1 +2
   g.setColor((raised) ? Color.gray : Color.white);
   fill(g);

   translate(-1, -1); // ori -1+2-1
   g.setColor(Color.lightGray);
   fill(g);
}   

private void setPolygon() {
   poly = new Polygon();
   switch (orientation) {
      case HORIZONTAL: 
         setHorizontal();
         break;
      case VERTICAL:
         setVertical();
         break;
      case BOTH:
         setBoth();
         break;
      default:
         setHorizontal();
   }
}
   
private void setHorizontal() {   
   poly.addPoint(x,y+height/2);               
   poly.addPoint(x+width/4, y);               
   poly.addPoint(x+width/4, y+2*height/5);    
   poly.addPoint(x+3*width/4, y+2*height/5);  
   poly.addPoint(x+3*width/4, y);             
   poly.addPoint(x+width, y+height/2);        
   poly.addPoint(x+3*width/4, y+height);      
   poly.addPoint(x+3*width/4, y+3*height/5);  
   poly.addPoint(x+width/4, y+3*height/5);    
   poly.addPoint(x+width/4, y+height);        
   poly.addPoint(x, y+height/2);              
}

private void setVertical() {
   poly.addPoint(x+width/2, y);               
   poly.addPoint(x+width, y+height/4);        
   poly.addPoint(x+3*width/5, y+height/4);    
   poly.addPoint(x+3*width/5, y+3*height/4);  
   poly.addPoint(x+width, y+3*height/4);      
   poly.addPoint(x+width/2, y+height);        
   poly.addPoint(x,y+3*height/4);     
   poly.addPoint(x+2*width/5, y+3*height/4);
   poly.addPoint(x+2*width/5, y+height/4);  
   poly.addPoint(x,y+height/4);        
   poly.addPoint(x+width/2, y);        
}

private void setBoth() {
   int xmid = x+width/2;
   int ymid = y+height/2;
   
   int xhead = width/5;
   int yhead = height/5;
   
   int xstem = width/20;
   int ystem = height/20;
   
   poly.addPoint(xmid, y);
   poly.addPoint(xmid+xhead, y+yhead);   
   poly.addPoint(xmid+xstem, y+yhead);
   poly.addPoint(xmid+xstem, ymid-ystem);
   poly.addPoint(x+width-xhead, ymid-ystem);
   poly.addPoint(x+width-xhead, ymid-yhead);
   poly.addPoint(x+width, ymid);
   poly.addPoint(x+width-xhead, ymid+yhead);
   poly.addPoint(x+width-xhead, ymid+ystem);
   poly.addPoint(xmid+xstem, ymid+ystem);
   poly.addPoint(xmid+xstem, y+height-yhead);
   poly.addPoint(xmid+xhead, y+height-yhead);
   poly.addPoint(xmid, y+height);
   poly.addPoint(xmid-xhead, y+height-yhead);
   poly.addPoint(xmid-xstem, y+height-yhead);
   poly.addPoint(xmid-xstem, ymid+ystem);
   poly.addPoint(x+xhead, ymid+ystem);
   poly.addPoint(x+xhead, ymid+yhead);
   poly.addPoint(x, ymid);
   poly.addPoint(x+xhead, ymid-yhead);
   poly.addPoint(x+xhead, ymid-ystem);
   poly.addPoint(xmid-xstem, ymid-ystem);
   poly.addPoint(xmid-xstem, y+yhead);
   poly.addPoint(xmid-xhead, y+yhead);
   poly.addPoint(xmid, y);
}


private Polygon poly;
private int orientation;
}
   
   
    
      
