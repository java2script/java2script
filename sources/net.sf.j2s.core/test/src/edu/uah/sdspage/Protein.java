package edu.uah.sdspage; // Decompiled by DJ v3.7.7.81 Copyright 2004 Atanas Neshkov  Date: 11/6/16 17:49:45
// Home Page : http://members.fortunecity.com/neshkov/dj.html  - Check often for new version!
// Decompiler options: packimports(3) 
// Source File Name:   D:\Dave\Java\Electrophoresis\Protein.java

import java.awt.Color;
import java.awt.Graphics;

public class Protein
{

    public void setStartPosition(int i, int j)
    {
        x1 = i;
        y1 = j;
        startY = y1;
        y1float = y1;
    }

    public void ResetDecider()
    {
        decider = 1;
        counter = 1;
    }

    private void IncrPosition()
    {
        if(counter == decider)
        {
            y1float = y1float + speed;
            counter = 1;
        } else
        {
            counter++;
        }
        y1 = (int)y1float;
    }

    public boolean matchPosition(int i, int j)
    {
        int k = x1 + width;
        int l = y1 + height;
        byte byte0 = 2;
        return i >= x1 - byte0 && i <= k + byte0 && j >= y1 - byte0 && j <= l + byte0;
    }

    public void setWidth(int i)
    {
        width = i;
    }

    public int GetDecider()
    {
        return decider;
    }

    public void SetDecider(int i)
    {
        decider = i;
    }

    void SetHostScaleFactor(float f)
    {
        scaleFactor = f;
    }

    public void setMaxPosition(int i)
    {
        maxPosition = i;
    }

    boolean matchPlotPosition(int i, int j)
    {
        byte byte0 = 3;
        return i >= plotXPos - byte0 && i <= plotXPos + byte0 && j >= plotYPos - byte0 && j <= plotYPos + byte0;
    }

    float GetDistance()
    {
        distance = scaleFactor * (float)(y1 - startY);
        return distance;
    }

    Protein()
    {
        speed = 0.01D;
        name = "notSet";
        fullName = "notSet";
        abbr = "notSet";
        color = Color.blue;
        height = 2;
        decider = 1;
        counter = 1;
    }

    Protein(String s, String s1, String s2, int i, Color color1)
    {
        speed = 0.01D;
        name = "notSet";
        fullName = "notSet";
        abbr = "notSet";
        color = Color.blue;
        height = 2;
        decider = 1;
        counter = 1;
        name = s;
        fullName = s1;
        abbr = s2;
        mw = i;
        color = color1;
    }

    public boolean drawProtein(Graphics g)
    {
        if(y1 < maxPosition)
        {
            g.setColor(color);
            g.fillRect(x1, y1, width, height);
            IncrPosition();
            return true;
        } else
        {
            return false;
        }
    }

    int startY;
    public float scaleFactor;
    public double relativeMigration;
    public double speed;
    public int mw;
    public float charge;
    public String name;
    public String fullName;
    public String abbr;
    public boolean selected;
    public Color color;
    public int x1;
    public int y1;
    public int width;
    public int height;
    public double y1float;
    public int maxPosition;
    public float distance;
    private int decider;
    private int counter;
    public int plotYPos;
    public int plotXPos;
}