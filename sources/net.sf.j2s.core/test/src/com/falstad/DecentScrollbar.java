package com.falstad;

import a2s.Canvas;
import a2s.Scrollbar;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.Dimension;
import java.awt.Insets;
import java.awt.Color;
import java.awt.FontMetrics;
import java.awt.Event;
import java.awt.LayoutManager;
import java.awt.Image;
import java.awt.Container;
import java.awt.Component;
import java.awt.Graphics;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;

// this is a scrollbar that notifies us when the user is _done_ fiddling
// with the value.
class DecentScrollbar extends Scrollbar implements AdjustmentListener {
    int value, lo, hi;
    DecentScrollbarListener listener;
    DecentScrollbar(DecentScrollbarListener parent, 
		    int start, int lo_, int hi_) {
	super(HORIZONTAL, start, 1, lo_, hi_);
	value = start;
	lo = lo_;
	hi = hi_;
	listener = parent;
	addAdjustmentListener(this);
    }
    @Override
    public void adjustmentValueChanged(AdjustmentEvent e) {
	if (getValueIsAdjusting())
	    listener.scrollbarValueChanged(this);
	else
	    listener.scrollbarFinished(this);
    }
    
};

