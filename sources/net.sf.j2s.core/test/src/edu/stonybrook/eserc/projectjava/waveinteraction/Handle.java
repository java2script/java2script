/*
 * Decompiled with CFR 0_118.
 */

package edu.stonybrook.eserc.projectjava.waveinteraction;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Polygon;
import java.awt.Rectangle;

public class Handle
extends Rectangle {
    public static final int HORIZONTAL = 0;
    public static final int VERTICAL = 1;
    public static final int BOTH = 2;
    public int Cx;
    public int Cy;
    private Polygon poly;
    private int orientation;

    public Handle(int n) {
        super(0, 0, 0, 0);
        this.orientation = n;
        switch (n) {
            case 0: {
                this.width = 18;
                this.height = 6;
                break;
            }
            case 1: {
                this.width = 6;
                this.height = 18;
                break;
            }
            case 2: {
                this.width = 14;
                this.height = 14;
                break;
            }
        }
        this.Cx = this.x + this.width / 2;
        this.Cy = this.y + this.height / 2;
        this.setPolygon();
    }

    public void move(int n, int n2) {
        this.Cx = n;
        this.Cy = n2;
        this.x = this.Cx - this.width / 2;
        this.y = this.Cy - this.height / 2;
        this.setPolygon();
    }

    public void translate(int n, int n2) {
        this.x += n;
        this.y += n2;
        this.Cx += n;
        this.Cy += n2;
        this.setPolygon();
    }

    public void draw(Graphics graphics) {
        graphics.drawPolygon(this.poly);
    }

    public void fill(Graphics graphics) {
        graphics.fillPolygon(this.poly);
    }

    public void fill3D(Graphics graphics, boolean bl) {
        this.translate(-1, -1);
        graphics.setColor(bl ? Color.white : Color.gray);
        this.fill(graphics);
        this.translate(2, 2);
        graphics.setColor(bl ? Color.gray : Color.white);
        this.fill(graphics);
        this.translate(-1, -1);
        graphics.setColor(Color.lightGray);
        this.fill(graphics);
    }

    private void setPolygon() {
        this.poly = new Polygon();
        switch (this.orientation) {
            case 0: {
                this.setHorizontal();
                return;
            }
            case 1: {
                this.setVertical();
                return;
            }
            case 2: {
                this.setBoth();
                return;
            }
        }
        this.setHorizontal();
    }

    private void setHorizontal() {
        this.poly.addPoint(this.x, this.y + this.height / 2);
        this.poly.addPoint(this.x + this.width / 4, this.y);
        this.poly.addPoint(this.x + this.width / 4, this.y + 2 * this.height / 5);
        this.poly.addPoint(this.x + 3 * this.width / 4, this.y + 2 * this.height / 5);
        this.poly.addPoint(this.x + 3 * this.width / 4, this.y);
        this.poly.addPoint(this.x + this.width, this.y + this.height / 2);
        this.poly.addPoint(this.x + 3 * this.width / 4, this.y + this.height);
        this.poly.addPoint(this.x + 3 * this.width / 4, this.y + 3 * this.height / 5);
        this.poly.addPoint(this.x + this.width / 4, this.y + 3 * this.height / 5);
        this.poly.addPoint(this.x + this.width / 4, this.y + this.height);
        this.poly.addPoint(this.x, this.y + this.height / 2);
    }

    private void setVertical() {
        this.poly.addPoint(this.x + this.width / 2, this.y);
        this.poly.addPoint(this.x + this.width, this.y + this.height / 4);
        this.poly.addPoint(this.x + 3 * this.width / 5, this.y + this.height / 4);
        this.poly.addPoint(this.x + 3 * this.width / 5, this.y + 3 * this.height / 4);
        this.poly.addPoint(this.x + this.width, this.y + 3 * this.height / 4);
        this.poly.addPoint(this.x + this.width / 2, this.y + this.height);
        this.poly.addPoint(this.x, this.y + 3 * this.height / 4);
        this.poly.addPoint(this.x + 2 * this.width / 5, this.y + 3 * this.height / 4);
        this.poly.addPoint(this.x + 2 * this.width / 5, this.y + this.height / 4);
        this.poly.addPoint(this.x, this.y + this.height / 4);
        this.poly.addPoint(this.x + this.width / 2, this.y);
    }

    private void setBoth() {
        int n = this.x + this.width / 2;
        int n2 = this.y + this.height / 2;
        int n3 = this.width / 5;
        int n4 = this.height / 5;
        int n5 = this.width / 20;
        int n6 = this.height / 20;
        this.poly.addPoint(n, this.y);
        this.poly.addPoint(n + n3, this.y + n4);
        this.poly.addPoint(n + n5, this.y + n4);
        this.poly.addPoint(n + n5, n2 - n6);
        this.poly.addPoint(this.x + this.width - n3, n2 - n6);
        this.poly.addPoint(this.x + this.width - n3, n2 - n4);
        this.poly.addPoint(this.x + this.width, n2);
        this.poly.addPoint(this.x + this.width - n3, n2 + n4);
        this.poly.addPoint(this.x + this.width - n3, n2 + n6);
        this.poly.addPoint(n + n5, n2 + n6);
        this.poly.addPoint(n + n5, this.y + this.height - n4);
        this.poly.addPoint(n + n3, this.y + this.height - n4);
        this.poly.addPoint(n, this.y + this.height);
        this.poly.addPoint(n - n3, this.y + this.height - n4);
        this.poly.addPoint(n - n5, this.y + this.height - n4);
        this.poly.addPoint(n - n5, n2 + n6);
        this.poly.addPoint(this.x + n3, n2 + n6);
        this.poly.addPoint(this.x + n3, n2 + n4);
        this.poly.addPoint(this.x, n2);
        this.poly.addPoint(this.x + n3, n2 - n4);
        this.poly.addPoint(this.x + n3, n2 - n6);
        this.poly.addPoint(n - n5, n2 - n6);
        this.poly.addPoint(n - n5, this.y + n4);
        this.poly.addPoint(n - n3, this.y + n4);
        this.poly.addPoint(n, this.y);
    }
}