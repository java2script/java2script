/*
 * Decompiled with CFR 0_118.
 */

package edu.stonybrook.eserc.projectjava.waveinteraction;

import java.awt.Point;

public class MyMath {
    public static final float PI = 3.1415927f;

    public static int round(double d) {
        return Math.round(Math.round(d));
    }

    public static float sin(float f) {
        return (float)Math.sin(f);
    }

    public static float cos(float f) {
        return (float)Math.cos(f);
    }

    public static float round(float f, int n) {
        if (n < 0) {
            System.out.println("MyMath.round => places < 0, changing sign");
            n = - n;
        }
        int n2 = (int)Math.pow(10.0, n);
        f = Math.round(f * (float)n2);
        return f /= (float)n2;
    }

    public static float toRadians(float f) {
        return 3.1415927f * f / 180.0f;
    }

    public static float toDegrees(float f) {
        return 180.0f * f / 3.1415927f;
    }

    public static Point translate(Point start, Point p1, float angle) {
    	// SwingJS optimization ptTemp
        int n = p1.x - start.x;
        int n2 = p1.y - start.y;
        int n3 = MyMath.round(Math.sqrt(n * n + n2 * n2));
        float f2 = (float)Math.atan((float)n2 / (float)n);
        float f3 = 0.017453292f * angle;
        angle = f3 + f2;
        if (n < 0) {
            angle += 3.1415927f;
        }
        p1.x = start.x + Math.round((float)n3 * (float)Math.cos(angle));
        p1.y = start.y + Math.round((float)n3 * (float)Math.sin(angle));
        return p1;
    }

    public static Point rotate(Point point, float f, float f2) {
        Point point2 = new Point(0, 0);
        f = MyMath.toRadians(f);
        point2.x = point.x + Math.round(f2 * (float)Math.cos(f));
        point2.y = point.y + Math.round(f2 * (float)Math.sin(f));
        return point2;
    }

    public static float getAngle(Point point, Point point2) {
        int n = point2.x - point.x;
        int n2 = point2.y - point.y;
        float f = (float)n2 / (float)n;
        float f2 = (float)Math.atan(f);
        if (n < 0) {
            f2 += 3.1415927f;
        }
        f2 = MyMath.toDegrees(f2);
        return f2;
    }

    public static int length(int n, int n2, int n3, int n4) {
        float f = (float)Math.sqrt((n - n3) * (n - n3) + (n2 - n4) * (n2 - n4));
        return Math.round(f);
    }
}