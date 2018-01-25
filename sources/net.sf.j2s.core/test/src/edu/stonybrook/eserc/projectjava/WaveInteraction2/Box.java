package edu.stonybrook.eserc.projectjava.WaveInteraction2;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;
/*
	Project Java, LICIL
	Author:		Konstantin Lukin
        Project:	SineWave
        
                Modified for SwingJS by Bob Hanson - Jan, 2017
*/


public class Box extends Rectangle {

public Rectangle top, left, right_top, right_bottom;
private double top_ratio    = 0.6;
private double bottom_ratio = 0.4;
private double left_ratio   = 0.77;
private double right_ratio  = 0.23;

public Box(int x, int y, int w, int h) {
   super(x,y,w,h);
   setTop();
   setLeft();
   setRightTop();
   setRightBottom();
}

public void draw(Graphics g) {
   g.setColor(Color.cyan);
   g.fillRect(top.x, top.y, top.width, top.height);
   g.setColor(Color.yellow);
   g.fillRect(left.x, left.y, left.width, left.height);
   g.setColor(Color.blue);
   g.fillRect(right_top.x, right_top.y, right_top.width, right_top.height);
   g.setColor(Color.red);
   g.fillRect(right_bottom.x, right_bottom.y, right_bottom.width, right_bottom.height);
}

public void fill(Graphics g, int mode) {
   switch(mode) {
      case 0:
         g.fillRect(top.x, top.y, top.width, top.height);
         break;
      case 1:
	 g.fillRect(left.x, left.y, left.width, left.height);
         break;
      case 2:
         g.fillRect(right_top.x, right_top.y, right_top.width, right_top.height);
         break;
      case 3:
         g.fillRect(right_bottom.x, right_bottom.y, right_bottom.width, right_bottom.height);
         break;
      case 4:
         g.fillRect(right_top.x, y, right_top.width, top.height);
         break;
      default:
         g.fillRect(x, y, width, height);
   }
}



void setTop() {
   int _x, _y, _w, _h;
   _x = this.x;
   _y = this.y;
   _w = this.width;
   _h = (int)(this.height * top_ratio);
   top = new Rectangle(_x, _y, _w, _h);
}

void setLeft() {
   int _x, _y, _w, _h;
   _x = this.x;
   _y = top.y + top.height;
   _w = (int)(top.width*left_ratio);
   _h = (int)(this.height * bottom_ratio);
   left = new Rectangle(_x, _y, _w, _h);
}  

void setRightTop() {
   int _x, _y, _w, _h;
   _x = left.x + left.width;
   _y = left.y;
   _w = (int)(top.width*right_ratio);
   _h = left.height/2;
   right_top = new Rectangle(_x, _y, _w, _h);
}

void setRightBottom() {
   int _x, _y, _w, _h;
   _x = right_top.x;
   _y = right_top.y + right_top.height;
   _w = (int)(top.width*right_ratio);
   _h = left.height/2;
   right_bottom = new Rectangle(_x, _y, _w, _h);
}  
}   
