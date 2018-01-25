package org.physicslab.mechanics.micrometer;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Label;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.Shape;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.event.MouseWheelEvent;
import java.awt.event.MouseWheelListener;
import java.awt.geom.AffineTransform;
import java.awt.geom.Arc2D;
import java.awt.geom.Ellipse2D;
import java.awt.geom.GeneralPath;
import java.awt.geom.Line2D;
import java.awt.geom.PathIterator;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;

import javax.swing.JPanel;


public class ScrewGaugePanel extends JPanel implements MouseMotionListener, MouseListener,MouseWheelListener {

	private double mx, my;
	private boolean isdragging=false;
	private final double MMTOPIXELFACTOR=10;
	private int msd=10;
	private double vsd=9; //10VSD=1MSD;
	
	private int t=25;
	/**diameter of spindle*/
	private int w1=50;
	/**	width of frame;*/
	private int w2=40;
    /**radius of fame*/
	private int R=113;
	
	/*drawing offset*/
	private int Xoffset=20;
	private int Yoffset=20;
	
	/**Number of divisions of main scale*/
	private int numDiv=20;
	/**Path for frame of scewgause*/
	private GeneralPath path;
	
	public Vernier vernier;
	private int mainscaleHeight=80;
	private int mainscaleWidth=500;
	private int vernierscaleHeight=50;
	private int vernierscaleWidth=100;
	/**x-coordinate of main scale Zero*/
	private int mainscaleZero=10;
	/**x-coordinate of vernier scale Zero*/
	private int vernierscaleZero=10;
	
	public boolean displayInfo=false;
	private int msReading;
	private int vsReading;
	private int zeroerror;//vsReading when it was supposed to read zero
	private int reading=0;//vsReading
	public ScrewGaugePanel(){
		mainscaleZero=Xoffset+t+w2+2*R+w2+2*t+w2;
		vernierscaleZero=Xoffset+t+w2+2*R+w2+2*t+w2;
		vernierscaleWidth=w1+R;
		mainscaleWidth=msd*numDiv;
		createmainscalePath();
		vernier=new Vernier(vernierscaleZero,Yoffset,vernierscaleWidth,vernierscaleHeight);
		this.setPreferredSize(new Dimension((int) (mainscaleZero+mainscaleWidth*1.8+2*Xoffset),400));
		this.addMouseMotionListener(this);
		this.addMouseListener(this);
		this.addMouseWheelListener(this);
		this.setFocusable(true);
	}
	
	private void createmainscalePath(){
		path=new GeneralPath();
		double t1=mainscaleZero;
		double t2=0.7*vernierscaleHeight;
		double x,y;
		x=Xoffset+t;
		y=Yoffset+t;
		path.moveTo(x, y);
		path.lineTo(x+w2,y);
		path.lineTo(x+w2,y+w1+4*t);
		Arc2D.Double arc=new Arc2D.Double(x+w2,y+w1+4*t-R,2*R,2*R,180,180,Arc2D.OPEN);
		path.append(arc, true);
		
		path.moveTo(x+w2+2*R, y+w1+4*t);
		path.lineTo(x+w2+2*R, Yoffset);
		path.lineTo(x+w2+2*R+w2+2*t, Yoffset);
		path.lineTo(x+w2+2*R+w2+2*t, Yoffset+w1+4*t);
		arc=new Arc2D.Double(x+w2-w2-t, y+w1+4*t-(R+w2+t),2*(R+w2+t),2*(R+w2+t),0,-180,Arc2D.OPEN);
		path.append(arc, true);
		path.lineTo(x-t, y);
	    path.lineTo(x, y);
	   
	
	}
	private void drawMainScale(Graphics2D g){
		Graphics2D g2d=(Graphics2D)g;
		
		//Rectangle2D.Double rect = new Rectangle2D.Double(Xoffset,Yoffset,mainscaleWidth,mainscaleHeight);
		g2d.setPaint(new Color(206,206,200));
		g2d.fill(path);
		g2d.setPaint(Color.black);
		g2d.draw(path);
		//draw anvil
		Rectangle2D.Double rect = new Rectangle2D.Double(Xoffset+t+w2,Yoffset+2*t,t,w1);
		g2d.setPaint(new Color(225,225,225));
		g2d.fill(rect);
		g2d.setPaint(Color.black);
		g2d.draw(rect);
		//draw spindle
		double gap=(reading-zeroerror)*vernier.pitch+1;
		rect = new Rectangle2D.Double(Xoffset+t+w2+t+gap,Yoffset+2*t,2*R-t-gap,w1);
	    g2d.setPaint(new Color(225,225,225));
		g2d.fill(rect);
		g2d.setPaint(Color.black);
		g2d.draw(rect);
		//draw main scale(sleeve)
		rect = new Rectangle2D.Double(Xoffset+t+w2+2*R+w2+2*t,Yoffset+t,w2+msd*numDiv,w1+2*t);
		g2d.setPaint(new Color(220,220,210));
		g2d.fill(rect);
		g2d.setPaint(Color.black);
		g2d.draw(rect);
	
		//draw main scale divisions
		double x=Xoffset+t+w2+2*R+w2+2*t;
		double y=Yoffset+t+w1/2+t;
		g.draw(new Line2D.Double(x,y,msd*numDiv+mainscaleZero,y));
		double ticklength=8;
		g.setFont(new Font("arial",0,12));
		for (int i=0;i<=numDiv;i++){
			x=mainscaleZero+msd*i;
			ticklength=(i % 5==0)?8:5;
			ticklength=(i % 2==0)?ticklength:-ticklength;
			g.draw(new Line2D.Double(x,y,x,y-ticklength));
			g.setFont(new Font("Arial",0,10));
			if (i%10==0)CommonUtils.outString(g2d,(int)x, (int)(y-ticklength-3),String.valueOf(i/2),1,2 );
		}
		x=Xoffset+t+w2+R;
		y=Yoffset+w1+4*t+R+w2+t;
		g.setFont(new Font("arial",0,11));
		CommonUtils.outString(g2d,(int)x, (int)(y-ticklength-3),"1 msd = pitch = 0.50 mm",1,2 );
		
		vernier.draw(g);
		//CommonUtils.outString(g2d,0, 0,String.valueOf(getReading()),0,0 );
		drawInfo(g2d);
		
	}
	
	/**
	 * calculates msReading and vernier reading for current position
	 */
	private void calculateReading(){
		//int reading=(int) (vernier.x-mainscaleZero);
		
		//msReading=(int) (Math.floor((vernier.x-mainscaleZero)/msd));
		//vsReading=reading%10;
	}
	
	/**
	 * returns reading of vernier without applying zero error
	 * @return
	 */
	public double getReading(){
		calculateReading();
		return reading/100.0;
	}

	/**
	 * returns reading after applying correction of zero error
	 * @return
	 */
	public double getCorrectedReading(){
		return getReading()-zeroerror/100.0;
	}
	
	private void drawInfo(Graphics2D g){
		g.setFont(new Font("Arial",0,11));
		g.setPaint(Color.gray);
		
		int x1,y1,x2,y2;
		x1=Xoffset+t+w2+t+1;
		y1=Yoffset+2*t+w1/2;
		x2=(int) (x1+(reading-zeroerror)*vernier.pitch)-2;
			//drawHorizontalArrow for reading
		if (displayInfo)
			g.setPaint(Color.RED);
		g.drawLine(x1, y1, x2, y1);
		g.drawLine(x1, y1, x1+3, y1+3);
		g.drawLine(x1, y1, x1+3, y1-3);
		g.drawLine(x2, y1, x2-3, y1+3);
		g.drawLine(x2, y1, x2-3, y1-3);	
		
		y1=y1+15;
		if (displayInfo){
			calculateReading();
			String s;
			if (zeroerror!=0){
				s=String.format("%.2f",getReading())+"-("+String.format("%.2f",zeroerror/100.0)+") ="+String.format("%.2f", getCorrectedReading())+" mm";	
			}else{
				s=String.format("%.2f", getCorrectedReading())+" mm";	
			}
			g.setPaint(Color.RED);
			CommonUtils.outString(g,(x1+x2)/2, y1,s,1,2);
		}else
		{
			CommonUtils.outString(g,(x1+x2)/2, y1,"?",1,2);
		}
		if (displayInfo==false)return;
		g.setPaint(Color.RED);
		//drawVerticalArrow for zero of vernier.
		x1=(int) (vernier.x+14);
		y1=Yoffset+t+w1/2+t;
		x2=x1+20;
		g.drawLine(x1, y1, x2, y1);
		g.drawLine(x1, y1, x1+3, y1+3);
		g.drawLine(x1, y1, x1+3, y1-3);
		CommonUtils.outString(g,x2+2,y1,"VSR = "+String.format("%.2f", Double.valueOf(vsReading/100f))+" mm",0,1);
		
		//drawVerticalArrow for main scale reading.
		x1=(int) (mainscaleZero+msReading*msd);
		y1=Yoffset+t+w1/2+t-2;
		y2=y1-20;
		g.drawLine(x1, y1, x1, y2);
		g.drawLine(x1, y1, x1-3, y1-3);
		g.drawLine(x1, y1, x1+3, y1-3);
		CommonUtils.outString(g,x1,y2-2,"MSR = "+String.format("%.1f", Double.valueOf(msReading/2.0))+" mm",2,2);
	
	}

	
    public void paint(Graphics g)
    {
      super.paint(g);

      Graphics2D g2 = (Graphics2D) g;

      RenderingHints rh =
           new RenderingHints(RenderingHints.KEY_ANTIALIASING,
                               RenderingHints.VALUE_ANTIALIAS_ON);

      rh.put(RenderingHints.KEY_RENDERING,
             RenderingHints.VALUE_RENDER_QUALITY);

      g2.setRenderingHints(rh);
      drawMainScale(g2);
     // vernier.draw(g2, 10, 10);
    }
    
    
     @Override
     public void mouseDragged(MouseEvent me) {
         if (!isdragging)  return;
         double dx,dy;
         dx = me.getX() - mx;
         dy = me.getY() - my;
         
         mx = me.getX();
         my = me.getY();

         if ((vernier.x<=mainscaleZero)&&dy<0)return;
         if ((vernier.x>=mainscaleZero+mainscaleWidth)&& (dy>0))return;
         vernier.Rotate((int) Math.round(dy));
         repaint();
     }

     @Override
     public void mouseMoved(MouseEvent me) {
         //  throw new UnsupportedOperationException("Not supported yet.");
     }

     @Override
     public void mouseClicked(MouseEvent me) {
         //   throw new UnsupportedOperationException("Not supported yet.");
     }

     @Override
     public void mousePressed(MouseEvent me) {
         mx = me.getX();
         my = me.getY();
         isdragging=vernier.contains(mx, my);
        }

     @Override
     public void mouseReleased(MouseEvent me) {
    	 isdragging = false;
     }

     @Override
     public void mouseEntered(MouseEvent me) {
//         throw new UnsupportedOperationException("Not supported yet.");
     }

     @Override
     public void mouseExited(MouseEvent me) {
         //    throw new UnsupportedOperationException("Not supported yet.");
     }
     
 	@Override
 	public void mouseWheelMoved(MouseWheelEvent e) {
 		System.out.println(e.getWheelRotation());
 		vernier.Rotate(e.getWheelRotation());
 		repaint();
 	}
     
     /**
 	 * @return the zeroerror
 	 */
 	public int getZeroerror() {
 		return zeroerror;
 	}

 	/**
 	 * @param zeroerror the zeroerror to set
 	 */
 	public void setZeroerror(int newzeroerror) {
 		/*
 		if(true)vernierscaleZero=mainscaleZero+zeroerror;
 		vsReading+=newzeroerror-zeroerror;		
 		this.zeroerror = newzeroerror;
  		if (vsReading>=50)vsReading=vsReading-50;
 		if (vsReading<0)vsReading=50+vsReading;
   		msReading=(int) ((vernier.x-mainscaleZero)/msd);
 		calculateReading();
 		*/
 		int delta;
 		delta=newzeroerror-zeroerror;
 		zeroerror=newzeroerror;
 		reading+=delta;
 		vernier.Rotate(0);
 		repaint();
 	}


     class Vernier implements Shape{
     	private GeneralPath path;
     	double x,y,w,h;
     	private final double pitch;
     	/**
     	 * Constructor
     	 * @param x leftTop X coordinate
     	 * @param y leftTop Y coordinate
     	 * @param w width
     	 * @param h height
     	 * @param t thiskness of strip
     	 */
     	public Vernier(double x,double y,double w, double h){
     		this.x=x;
     		this.y=y;
     		this.w=w;
     		this.h=h;
     	    createPath();
     	    pitch=(msd)/50.0;
        	}
     	
     	private void createPath(){
     		path = new GeneralPath();
     		//vernier scale + Outside jaws:
     		path.moveTo(x, y+t);
     		path.lineTo(x+w1,y);
     		path.lineTo(x+w1+msd*numDiv,y);
     		path.lineTo(x+w1+msd*numDiv, y+w1+4*t);
     		path.lineTo(x+w1, y+w1+4*t);
     		path.lineTo(x, y+w1+3*t);
     		path.lineTo(x, y+t);
     		/*
     		//Rachet :
     		double t1=mainscaleZero;
     		path.moveTo(x+w1+msd*numDiv,y+t+t+w1/2-2*t);
     		path.moveTo(x+w1+msd*numDiv+w1,y+t+t+w1/2-2*t);
     		path.moveTo(x+w1+msd*numDiv+w1,y+t+t+w1/2+2*t);
     		path.lineTo(x+w1+msd*numDiv,y+t+t+w1/2+2*t);
     		
     		//Spindle
     		int width=10;
     		int slenderlength=10;
     		path.moveTo(Xoffset+t+w2+2*R, Yoffset+2*t);
     		path.moveTo(Xoffset+t+w2+2*R, Yoffset+2*t+w1);
     		path.moveTo(Xoffset+t+w2-slenderlength, Yoffset+2*t+w1);
     		path.moveTo(Xoffset+t+w2-slenderlength, Yoffset+2*t);
     		*/
      	}
     	
     	public void setX(double x){
     		this.x=x;
     		createPath();
       	}
     	
     	public void translate(double dx){
     		if (dx==0)return;
     		this.x+=dx;
     		createPath();
     	}
     	
    	public void Rotate(int count){
    		if((reading<=zeroerror)&&(count<=0))return;
    		if((reading>=zeroerror+msd*200)&&(count>=0))return;
        	
     		reading+=count;
     		if (reading<zeroerror)reading=zeroerror;
     		if (reading>zeroerror+msd*100)reading=zeroerror+msd*100;     		
     		this.x=mainscaleZero+(reading-zeroerror)*pitch;

     		vsReading=reading%50;
    		msReading=(int) Math.floor((reading-zeroerror)/50);
     		
     		//if (vsReading>=50)vsReading=vsReading-50;
     		//if (vsReading<0)vsReading=50+vsReading;
       		//msReading=(int) Math.floor((this.x+vsReading*pitch-mainscaleZero)/msd);
     		//this.x+=count*pitch;
     		//if (this.x<mainscaleZero+pitch){this.x=mainscaleZero;msReading=-1;vsReading=(zeroerror<0)?50+zeroerror:zeroerror;}
     		//if (this.x>mainscaleZero+mainscaleWidth){this.x=mainscaleZero+mainscaleWidth;vsReading=zeroerror;}
       		createPath();
     	}

     	public void draw(Graphics2D g) {
      		g.setPaint(new Color(208,212,205));
     		g.fill(path);
     		g.setPaint(Color.black);
     		g.draw(path);
     		//draw rulers
     		double ticklength=8;
     		double x1,y1;
    		g.setFont(new Font("arial",0,9));
    		int val=vsReading;
    		if (vsReading<0)val=50+vsReading;
         	for (int i=0;i<=10;i++){
         		x1=vernier.x;
     			ticklength=((i+val%5)%5==0)?8:5;
     			y1=Yoffset+t+w1/2+t-i*5;
     			g.draw(new Line2D.Double(x1,y1,x1+ticklength,y1));
     			String s;
     			s=String.valueOf((val+i<50)?val+i:val+i-50);
     			if ((i+val%5)%5==0)CommonUtils.outString(g, (int) (x1+ticklength+2), (int)(y1),s,0,1);
       			if (i==0)continue;
       			y1=Yoffset+t+w1/2+t+i*5;
     			ticklength=((i-val%5)%5==0)?8:5;
     			g.draw(new Line2D.Double(x1,y1,x1+ticklength,y1));
     			s=String.valueOf((val>=i)?val-i:50+(val-i));
       			if ((i-val%5)%5==0)CommonUtils.outString(g, (int) (x1+ticklength+2), (int)(y1),s,0,1);
     		}
     	}
     	
 		@Override
 		public Rectangle getBounds() {
 			return path.getBounds();
 		}

 		@Override
 		public Rectangle2D getBounds2D() {
 			return path.getBounds2D();
 		}

 		@Override
 		public boolean contains(double x, double y) {
 			return path.contains(x, y);
 		}

 		@Override
 		public boolean contains(Point2D p) {
 			return path.contains(p);
 		}

 		@Override
 		public boolean intersects(double x, double y, double w, double h) {
 			return path.intersects(x,y,w,h);
 		}

 		@Override
 		public boolean intersects(Rectangle2D r) {
 			return path.intersects(r);
 		}

 		@Override
 		public boolean contains(double x, double y, double w, double h) {
 			return path.contains(x, y);
 		}

 		@Override
 		public boolean contains(Rectangle2D r) {
 			return path.contains(r);
 		}

 		@Override
 		public PathIterator getPathIterator(AffineTransform at) {
 			return path.getPathIterator(at);
 		}

 		@Override
 		public PathIterator getPathIterator(AffineTransform at, double flatness) {
 			return path.getPathIterator(at,flatness);
 		}
     	
     }



}
	