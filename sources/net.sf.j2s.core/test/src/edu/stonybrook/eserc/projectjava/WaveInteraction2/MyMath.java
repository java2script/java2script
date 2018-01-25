package edu.stonybrook.eserc.projectjava.WaveInteraction2;

import java.awt.Point;

public class MyMath {

public final static float PI = (float)Math.PI;

public static int round(double d) {
   return Math.round(Math.round(d));
}


public static float sin(float f) {
   return (float)Math.sin(f);
}


public static float cos(float f) {
   return (float)Math.cos(f);
}


public static float round(float d, int places) {  
   if(places<0) { 
      System.out.println("MyMath.round => places < 0, changing sign"); 
      places = - places;
   }
   int c = (int)Math.pow(10, places);
   d = Math.round(d * c);
   d /= c;
   return d;
}
   


public static float toRadians(float AngleInDegrees) {  
   return PI * AngleInDegrees/180;
}
   


public static float toDegrees(float AngleInRadians) {
   return 180 * AngleInRadians/PI;
}
   


public static Point translate(Point start, Point p1, float angle)  {
	// SwingJS optimized; no new Point()
   int dx = p1.x-start.x;
   int dy = p1.y-start.y;
   int R = MyMath.round(Math.sqrt(dx*dx + dy*dy));

   float lambda = (float) (Math.atan((float)dy/dx));
   float theta = PI / 180f * angle;
   angle = theta + lambda;
   if(dx < 0) angle += PI;
   p1.x = start.x + Math.round(R * (float)Math.cos(angle) );
   p1.y = start.y + Math.round(R * (float)Math.sin(angle) );
   return p1;
}
   

public static Point rotate(Point center, float angle, float Radius) {
   Point p = new Point(0,0);
   angle = toRadians(angle);
   p.x = center.x + Math.round(Radius * (float)Math.cos(angle));
   p.y = center.y + Math.round(Radius * (float)Math.sin(angle));
   return p;
}


   
public static float getAngle(Point start, Point stop) {
   int dx = stop.x - start.x;
   int dy = stop.y - start.y;
   float slope = dy/(float)dx;
   float angle = (float)Math.atan(slope);
   if(dx < 0) angle += PI;
   angle = toDegrees(angle);
   return angle;
}

public static int length(int x, int y, int x1, int y1) {  
   float f = (float)Math.sqrt( (x-x1)*(x-x1) +
                               (y-y1)*(y-y1) );
   return Math.round(f);
}
   
}
