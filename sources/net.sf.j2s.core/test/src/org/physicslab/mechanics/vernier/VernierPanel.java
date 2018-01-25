package org.physicslab.mechanics.vernier;

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
import java.awt.geom.Ellipse2D;
import java.awt.geom.GeneralPath;
import java.awt.geom.Line2D;
import java.awt.geom.PathIterator;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;

import javax.swing.JPanel;


public class VernierPanel extends JPanel implements MouseMotionListener, MouseListener,MouseWheelListener {

	private double mx, my;
	private boolean isdragging=false;
	private final double MMTOPIXELFACTOR=10;
	private double msd=10;
	private double vsd=9; //10VSD=1MSD;
	public Vernier vernier;
	private int mainscaleHeight=80;
	private int mainscaleWidth=500;
	private int vernierscaleHeight=50;
	private int vernierscaleWidth=100;
	private int mainscaleZero=10;
	private int vernierscaleZero=10;
	
	private int numDiv=30;
	private int Xoffset=55;
	private int Yoffset=45;
	private GeneralPath path;
	
	public boolean displayInfo=false;
	private int msReading;
	private int vsReading;
	private int zeroerror;//vsReading when it was supposed to read zero
	public VernierPanel(){
		vernierscaleWidth=(int)(2*vernierscaleZero+vsd*10);
		mainscaleWidth=(int) (msd*numDiv)+vernierscaleWidth;
		createmainscalePath();
		vernier=new Vernier(Xoffset,Yoffset+mainscaleHeight,vernierscaleWidth,vernierscaleHeight);
		this.setPreferredSize(new Dimension(mainscaleWidth+2*Xoffset,mainscaleHeight+3*vernierscaleHeight));
		this.addMouseMotionListener(this);
		this.addMouseListener(this);
		this.addMouseWheelListener(this);
		this.setFocusable(true);
	}
	
	private void createmainscalePath(){
		path=new GeneralPath();
		double t1=mainscaleZero;
		double t2=0.7*vernierscaleHeight;
		path.moveTo(10, 10+1.5*t1);
		path.lineTo(10+t2,10+1.5*t1);
		path.lineTo(10+t2,10);
		path.quadTo(10+t2+0.6*mainscaleZero,10+0.5*t1,10+t2+mainscaleZero,10+1.5*t1);
		
		//path.lineTo(10+t2+mainscaleZero,10+1.5*t1);
		path.lineTo(10+t2+mainscaleWidth,10+1.5*t1);
		path.lineTo(10+t2+mainscaleWidth,10+1.5*t1+mainscaleHeight);
		path.lineTo(10+t2,10+1.5*t1+mainscaleHeight);
		path.lineTo(10+t2,10+1.5*t1+mainscaleHeight+3*t2);
		path.lineTo(10+0.7*t2,10+1.5*t1+mainscaleHeight+2.7*t2);
		
		path.lineTo(10,10+1.5*t1+mainscaleHeight);
		path.lineTo(10,10+1.5*t1);
		path.moveTo(10,10+1.5*t1);
		Xoffset=(int) (10+t2);
		Yoffset=(int) (10+1.5*t1);
	}
	private void drawMainScale(Graphics2D g){
		Graphics2D g2d=(Graphics2D)g;
		Rectangle2D.Double rect = new Rectangle2D.Double(Xoffset,Yoffset,mainscaleWidth,mainscaleHeight);
		g2d.setPaint(new Color(210,210,210));
		g2d.fill(path);
		g2d.setPaint(Color.black);
		g2d.draw(path);
		double x=Xoffset;
		double y=Yoffset+mainscaleHeight;
		double ticklength=8;
		g.setFont(new Font("arial",0,12));
		for (int i=0;i<=numDiv;i++){
			x=Xoffset+mainscaleZero+msd*i;
			ticklength=(i % 5==0)?12:8;
			g.draw(new Line2D.Double(x,y,x,y-ticklength));
			if (i%10==0)CommonUtils.outString(g2d,(int)x, (int)(y-ticklength-3),String.valueOf(i),1,2 );
		}
		
		x=Xoffset+mainscaleZero+msd*numDiv+10;
		CommonUtils.outString(g2d,(int)x, (int)(y-ticklength-3),"mm",0,2 );
		
		vernier.draw(g);
		drawInfo(g2d);
	}

	private void calculateReading(){
		int reading=(int) Math.floor(vernier.x-Xoffset);//actual distance
		reading+=zeroerror;//measured distance
		msReading=reading/10;
		vsReading=reading%10;
	}
	public double getReading(){
		calculateReading();
		return msReading+vsReading/10.0;
	}
	
	public double getCorrectedReading(){
		return getReading()-zeroerror/10.0;
	}
	
	private void drawInfo(Graphics2D g){
		g.setFont(new Font("Arial",0,11));
		g.setPaint(Color.gray);
		
		int x1,y1,x2,y2;
		x1=Xoffset+1;
		x2=(int) (vernier.x-1);
			//drawHorizontalArrow for reading
		y1=Yoffset+mainscaleHeight+vernierscaleHeight*2;
		g.drawLine(x1, y1, x2, y1);
		g.drawLine(x1, y1, x1+3, y1+3);
		g.drawLine(x1, y1, x1+3, y1-3);
		g.drawLine(x2, y1, x2-3, y1+3);
		g.drawLine(x2, y1, x2-3, y1-3);	
		
		y1=Yoffset+mainscaleHeight+vernierscaleHeight*2+15;
		if (displayInfo){
			calculateReading();
			String s;
			g.setPaint(Color.RED);
			if (zeroerror!=0){
				s=String.format("%.1f",getReading())+"-("+String.format("%.1f",zeroerror/10.0)+") = "+String.format("%.1f", getCorrectedReading())+" mm";	
			}else{
				s=String.format("%.1f", getCorrectedReading())+" mm";	
			}
			CommonUtils.outString(g,(x1+x2)/2, y1,s,1,2);
		}else
		{
			CommonUtils.outString(g,(x1+x2)/2, y1,"?",1,2);
		}
		
		if (displayInfo==false)return;
		g.setPaint(Color.RED);
		//drawVerticalArrow for zero of vernier.
		x1=(int) (vernier.x+vernierscaleZero);
		y1=(int) vernier.y-1;
		y2=y1-20;
		g.drawLine(x1, y1, x1, y2);
		g.drawLine(x1, y2, x1-3, y2+3);
		g.drawLine(x1, y2, x1+3, y2+3);
		//drawVerticalArrow for vernier reading.
		x1=(int) (vernier.x+vernierscaleZero+vsReading*vsd);
		y1=(int) vernier.y+20;
		y2=y1+20;
		g.drawLine(x1, y1, x1, y2);
		g.drawLine(x1, y1, x1-3, y1+3);
		g.drawLine(x1, y1, x1+3, y1+3);
		CommonUtils.outString(g,x1,y2+2,"VSR = "+String.format("%.1f", vsReading/10.0)+" mm",1,0);
		
		//drawVerticalArrow for main scale reading.
		x1=(int) (Xoffset+mainscaleZero+msReading*msd);
		y1=(int) vernier.y-25;
		y2=y1-20;
		g.drawLine(x1, y1, x1, y2);
		g.drawLine(x1, y1, x1-3, y1-3);
		g.drawLine(x1, y1, x1+3, y1-3);
		CommonUtils.outString(g,x1,y2-2,"MSR = "+msReading+" mm",1,2);
		
		
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
         double dx;
         dx = me.getX() - mx;
         mx = me.getX();
         my = me.getY();

         if ((vernier.x<=Xoffset)&dx<0)return;
         if ((vernier.x>=mainscaleWidth-vernierscaleWidth+Xoffset)&dx>0)return;
         if ((vernier.x+dx<Xoffset)){vernier.setX(Xoffset);repaint();return;}
         if ((vernier.x+dx>=mainscaleWidth-vernierscaleWidth+Xoffset)){vernier.setX(mainscaleWidth-vernierscaleWidth+Xoffset);repaint();return;};    
         
         vernier.translate(dx);
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
  		vernier.translate(e.getWheelRotation());
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
	public void setZeroerror(int zeroerror) {
		this.zeroerror = zeroerror;
		if(true)vernierscaleZero=mainscaleZero+zeroerror;
		calculateReading();
		repaint();
	}


	class Vernier implements Shape{
     	private GeneralPath path;
     	double x,y,w,h,t;
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
     		this.t=0.7*h;
     	    createPath();
        	}
     	
     	private void createPath(){
     		path = new GeneralPath();
     		//vernier scale + Outside jaws:
     		path.moveTo(x, y);
     		path.lineTo(x,y+3*t);
     		path.lineTo(x+0.3*t,y+2.7*t);
     		path.lineTo(x+t, y+t);
     		path.lineTo(x+w, y+t);
     		path.lineTo(x+w, y);
     		path.lineTo(x, y);
     		//Inside jaws:
     		double t1=mainscaleZero;
     		path.moveTo(x,y-mainscaleHeight);
     		path.lineTo(x,y-mainscaleHeight-1.5*t1);
     		path.quadTo(x-0.8*t1,y-mainscaleHeight-0.6*t1,x-t1,y-mainscaleHeight);
     		path.lineTo(x,y-mainscaleHeight);
     		//Depth probe:
     		int width=10;
     		path.moveTo(Xoffset+mainscaleWidth, Yoffset+mainscaleHeight/2-width/2);
     		path.lineTo(Xoffset+mainscaleWidth+x-Xoffset, Yoffset+mainscaleHeight/2-width/2);
     		path.lineTo(Xoffset+mainscaleWidth+x-Xoffset, Yoffset+mainscaleHeight/2+width/2);
     		path.lineTo(Xoffset+mainscaleWidth, Yoffset+mainscaleHeight/2+width/2);
     		path.lineTo(Xoffset+mainscaleWidth, Yoffset+mainscaleHeight/2-width/2);
     		
      	}
     	
     	public void setX(double x){
     		this.x=x;
     		createPath();
       	}
     	
     	public void translate(double dx){
     	   if ((vernier.x<=Xoffset)&dx<=0)return;
           if ((vernier.x>=mainscaleWidth-vernierscaleWidth+Xoffset)&dx>=0)return;
           if ((vernier.x+dx<Xoffset)){vernier.setX(Xoffset);repaint();return;}
           if ((vernier.x+dx>=mainscaleWidth-vernierscaleWidth+Xoffset)){vernier.setX(mainscaleWidth-vernierscaleWidth+Xoffset);repaint();return;};    
          
     		this.x+=dx;
     		createPath();
     	}
     	
     	public void draw(Graphics2D g) {
      		g.setPaint(new Color(229,229,229));
     		g.fill(path);
     		g.setPaint(Color.black);
     		g.draw(path);
     		//draw rulers
     		double ticklength=8;
     		double x1,y1;
    		g.setFont(new Font("arial",0,9));
         	for (int i=0;i<=10;i++){
     			x1=x+vernierscaleZero+vsd*i;
     			y1=y;
     			g.draw(new Line2D.Double(x1,y1,x1,y1+ticklength));
     			CommonUtils.outString(g, (int) x1, (int)(y1+ticklength+2),String.valueOf(i),1,0);
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
	