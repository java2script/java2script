/*
 * Decompiled with CFR 0_118.
 * 
 * Could not load the following classes:
 *  MyMath
 */

package edu.stonybrook.eserc.projectjava.waveinteraction;

import java.awt.Graphics;
import java.awt.Point;

public class SineWave {
    public int wavelength;
    public int amplitude;
    public int phase;

    public SineWave(int n, int n2, int n3) {
        this.wavelength = n;
        this.amplitude = n2;
        this.phase = n3;
    }

    public void advance(int n) {
        this.phase -= n;
        if (this.phase >= 360) {
            this.phase %= 360;
        }
        if (this.phase < 0) {
            this.phase += 360;
        }
    }

    public SineWave copy() {
        return new SineWave(this.wavelength, this.amplitude, this.phase);
    }

    public int getY(int n) {
        double d = 360.0 / (double)this.wavelength;
        double d2 = (double)(- this.phase + 180) + (double)n * d;
        return (int)((double)this.amplitude * Math.sin(d2 * 3.141592653589793 / 180.0));
    }

    public void drawThick(Graphics graphics, int n, int n2, int n3) {
        double d = 360.0 / (double)this.wavelength;
        int n4 = (int)((double)this.amplitude / 2.0) + 2;
        int n5 = 0;
        while (n5 < n3) {
            double d2 = (double)this.phase + (double)n5 * d;
            int n6 = n + n5;
            int n7 = (int)((double)(n2 + n4) + (double)this.amplitude * Math.sin(d2 * 3.141592653589793 / 180.0));
            graphics.drawLine(n6, n7 - 1, n6, n7 + 1);
            ++n5;
        }
    }

    public void draw(Graphics graphics, int n, int n2, int n3) {
        int n4 = 1;
        while (n4 <= n3) {
            int x1 = n + n4;
            int y1= n2 + this.getY(n4);
            int x2 = n + n4 + 1;
            int y2 = n2 + this.getY(n4 + 1);
            graphics.drawLine(x1, y1, x2, y2);
            ++n4;
        }
    }

    public void draw(Graphics graphics, int n, int n2, int n3, int n4) {
        int n5 = 0;
        while (n5 < n3) {
            int x1 = n + n5;
            int y1 = n2 + this.getY(n5);
            int x2 = n + n5 + 1;
            int y2 = n2 + this.getY(n5 + 1);
            int n6 = 0;
            while (n6 < n4) {
                graphics.drawLine(x1 + n6, y1, x2 + n6, y2);
                ++n6;
            }
            ++n5;
        }
    }

    private Point ptTemp1 = new Point(), ptTemp2 = new Point();
    
    public void draw(Graphics graphics, Point point, Point point2) {
        float f = MyMath.getAngle(point, point2);
        float f2 = MyMath.length(point.x, point.y, point2.x, point2.y);
        int n = 1;
        while ((float)n <= f2) {
            ptTemp1.x = point.x + n;
            ptTemp1.y = point.y + this.getY(n);
            ptTemp2.x = point.x + n + 1;
            ptTemp2.y = point.y + this.getY(n + 1);
            MyMath.translate(point, ptTemp1, f);
            MyMath.translate(point, ptTemp2, f);
            graphics.drawLine(ptTemp1.x, ptTemp1.y, ptTemp2.x, ptTemp2.y);
            ++n;
        }
    }

    public int getPhase(float f) {
        return (int)(360.0f * (f / (float)this.wavelength) + (float)this.phase);
    }

    public float getWaveNum(int n) {
        return n / this.wavelength;
    }
}