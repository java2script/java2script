package edu.uah.sdspage; // Decompiled by DJ v3.7.7.81 Copyright 2004 Atanas Neshkov  Date: 11/6/16 17:47:27
// Home Page : http://members.fortunecity.com/neshkov/dj.html  - Check often for new version!
// Decompiler options: packimports(3) 
// Source File Name:   D:\Dave\Java\Electrophoresis\Acrylamide.java


public class Acrylamide
{

    Acrylamide(String s, double d)
    {
        percentGel = "0.0%";
        suppressor = 1;
        percentGel = s;
        concentration = d;
        setSuppressor(concentration);
    }

    public double getConc()
    {
        return concentration;
    }

    public void setSuppressor(double d)
    {
        if(d > 12D)
        {
            suppressor = 6;
            return;
        }
        if(d > 10D)
        {
            suppressor = 3;
            return;
        }
        if(d > 7.5D)
        {
            suppressor = 2;
            return;
        } else
        {
            suppressor = 1;
            return;
        }
    }

    private double concentration;
    public String percentGel;
    public int suppressor;
}