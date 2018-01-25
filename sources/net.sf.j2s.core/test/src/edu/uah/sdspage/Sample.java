package edu.uah.sdspage; // Decompiled by DJ v3.7.7.81 Copyright 2004 Atanas Neshkov  Date: 11/6/16 17:50:52
// Home Page : http://members.fortunecity.com/neshkov/dj.html  - Check often for new version!
// Decompiler options: packimports(3) 
// Source File Name:   D:\Dave\Java\Electrophoresis\Sample.java

import java.awt.Color;
import java.awt.Graphics;

public class Sample
{

    public void setXPosition(int i)
    {
        sampX = i;
    }

    public void setYPosition(int i)
    {
        sampY = i;
    }

    public void drawSwitch(boolean flag)
    {
        changeOn = flag;
    }

    public void empty()
    {
        fillSwitch = false;
        emptySwitch = true;
    }

    public void fill()
    {
        fillSwitch = true;
        emptySwitch = false;
    }

    public Sample()
    {
    }

    public void drawSample(Graphics g)
    {
        if(changeOn)
        {
            if(fillCounter > fillRatio)
            {
                if(fillSwitch)
                {
                    sampY--;
                    sampHeight++;
                }
                if(emptySwitch)
                {
                    sampY++;
                    sampHeight--;
                }
                fillCounter = 0;
            } else
            {
                fillCounter++;
            }
            if(emptySwitch && sampY > maxY)
            {
                changeOn = false;
                sampHeight = 0;
            }
        }
        if(sampHeight > 0)
        {
            g.setColor(Color.blue);
            g.fillRect(sampX, sampY, sampWidth, sampHeight);
        }
    }

    public void setWidth(int i)
    {
        sampWidth = i;
    }

    public void setMaxY(int i)
    {
        maxY = i;
    }

    public void setRatio(int i)
    {
        fillRatio = i;
    }

    public void reset()
    {
        changeOn = false;
        fillSwitch = false;
        emptySwitch = false;
        sampX = 0;
        sampY = 0;
        sampWidth = 0;
        sampHeight = 0;
        fillCounter = 0;
        fillRatio = 0;
        maxY = 0;
    }

    int sampX;
    int sampY;
    int sampWidth;
    int sampHeight;
    int fillCounter;
    int fillRatio;
    int maxY;
    boolean changeOn;
    boolean fillSwitch;
    boolean emptySwitch;
}