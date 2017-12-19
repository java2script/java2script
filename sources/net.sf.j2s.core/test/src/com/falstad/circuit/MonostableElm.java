package com.falstad.circuit;

import java.util.StringTokenizer;

import a2s.Checkbox;

    class MonostableElm extends ChipElm {

	//Used to detect rising edge
	private boolean prevInputValue=false;
	private boolean retriggerable=false;
	private boolean triggered=false;
	private double lastRisingEdge=0;
	private double delay=0.01;

	public MonostableElm(int xx, int yy) { super(xx, yy); }
	public MonostableElm(int xa, int ya, int xb, int yb, int f,
			    StringTokenizer st) {
	    super(xa, ya, xb, yb, f, st);
	retriggerable=new Boolean(st.nextToken()).booleanValue();
	delay=new Double(st.nextToken()).doubleValue();
	}
	String getChipName() { return "Monostable"; }
	void setupPins() {
	    sizeX = 2;
	    sizeY = 2;
	    pins = new Pin[getPostCount()];
	    pins[0] = new Pin(0, SIDE_W, "");
	    pins[0].clock = true;
	    pins[1] = new Pin(0, SIDE_E, "Q");
	    pins[1].output=true;
	    pins[2] = new Pin(1, SIDE_E, "Q");
	    pins[2].output=true;
	    pins[2].lineOver=true;
	}
	int getPostCount() {
	return 3;
	}
	int getVoltageSourceCount() { return 2; }

	void execute() {

			if(pins[0].value&&prevInputValue!=pins[0].value&&(retriggerable||!triggered)){
			lastRisingEdge=sim.t;
			pins[1].value=true;
			pins[2].value=false;
			triggered=true;
			}

			if(triggered&&sim.t>lastRisingEdge+delay)
			{
			pins[1].value=false;
			pins[2].value=true;
			triggered=false;
			}
		prevInputValue=pins[0].value;
	   	}
	String dump(){
	   return super.dump() + " " + retriggerable + " " + delay;
	}
	int getDumpType() { return 194; }
	public EditInfo getEditInfo(int n) {
	    if (n == 2) {
		EditInfo ei = new EditInfo("", 0, -1, -1);
		ei.checkbox=new Checkbox("Retriggerable",retriggerable);
		return ei;
	    }
	    if (n == 3) {
		EditInfo ei = new EditInfo("Period (s)",delay, 0.001,0.1);
		return ei;
	    }
	    return super.getEditInfo(n);
	}
	public void setEditValue(int n, EditInfo ei) {
	    if (n == 2) {
		retriggerable=ei.checkbox.getState();
	    }
	    if (n == 3) {
		delay=ei.value;
	    }
	    super.setEditValue(n, ei);
	}
    }
