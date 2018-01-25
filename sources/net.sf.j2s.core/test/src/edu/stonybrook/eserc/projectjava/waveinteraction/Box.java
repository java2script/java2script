/*
 * Decompiled with CFR 0_118.
 */

package edu.stonybrook.eserc.projectjava.waveinteraction;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;

public class Box extends Rectangle {
    public Rectangle top;
    public Rectangle left;
    public Rectangle right_top;
    public Rectangle right_bottom;
    private double top_ratio = 0.6;
    private double bottom_ratio = 0.4;
    private double left_ratio = 0.77;
    private double right_ratio = 0.23;

    public Box(int n, int n2, int n3, int n4) {
        super(n, n2, n3, n4);
        this.setTop();
        this.setLeft();
        this.setRightTop();
        this.setRightBottom();
    }

    public void draw(Graphics graphics) {
        graphics.setColor(Color.cyan);
        graphics.fillRect(this.top.x, this.top.y, this.top.width, this.top.height);
        graphics.setColor(Color.yellow);
        graphics.fillRect(this.left.x, this.left.y, this.left.width, this.left.height);
        graphics.setColor(Color.blue);
        graphics.fillRect(this.right_top.x, this.right_top.y, this.right_top.width, this.right_top.height);
        graphics.setColor(Color.red);
        graphics.fillRect(this.right_bottom.x, this.right_bottom.y, this.right_bottom.width, this.right_bottom.height);
    }

    public void fill(Graphics graphics, int n) {
        switch (n) {
            case 0: {
                graphics.fillRect(this.top.x, this.top.y, this.top.width, this.top.height);
                return;
            }
            case 1: {
                graphics.fillRect(this.left.x, this.left.y, this.left.width, this.left.height);
                return;
            }
            case 2: {
                graphics.fillRect(this.right_top.x, this.right_top.y, this.right_top.width, this.right_top.height);
                return;
            }
            case 3: {
                graphics.fillRect(this.right_bottom.x, this.right_bottom.y, this.right_bottom.width, this.right_bottom.height);
                return;
            }
            case 4: {
                graphics.fillRect(this.right_top.x, this.y, this.right_top.width, this.top.height);
                return;
            }
        }
        graphics.fillRect(this.x, this.y, this.width, this.height);
    }

    void setTop() {
        int n = this.x;
        int n2 = this.y;
        int n3 = this.width;
        int n4 = (int)((double)this.height * this.top_ratio);
        this.top = new Rectangle(n, n2, n3, n4);
    }

    void setLeft() {
        int n = this.x;
        int n2 = this.top.y + this.top.height;
        int n3 = (int)((double)this.top.width * this.left_ratio);
        int n4 = (int)((double)this.height * this.bottom_ratio);
        this.left = new Rectangle(n, n2, n3, n4);
    }

    void setRightTop() {
        int n = this.left.x + this.left.width;
        int n2 = this.left.y;
        int n3 = (int)((double)this.top.width * this.right_ratio);
        int n4 = this.left.height / 2;
        this.right_top = new Rectangle(n, n2, n3, n4);
    }

    void setRightBottom() {
        int n = this.right_top.x;
        int n2 = this.right_top.y + this.right_top.height;
        int n3 = (int)((double)this.top.width * this.right_ratio);
        int n4 = this.left.height / 2;
        this.right_bottom = new Rectangle(n, n2, n3, n4);
    }
}