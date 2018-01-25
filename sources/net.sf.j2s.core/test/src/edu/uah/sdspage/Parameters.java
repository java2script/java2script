package edu.uah.sdspage;
// Source File Name:   Parameters.java

import a2s.Button;
import a2s.Checkbox;
import a2s.CheckboxGroup;
import a2s.Choice;
import java.awt.Color;
import java.awt.Event;
import java.awt.GridLayout;
import a2s.Label;
import a2s.Panel;

public class Parameters extends Panel
{

    Parameters(Electrophoresis electrophoresis)
    {
        parent = electrophoresis;
    }
    
    public Parameters set() {
        low = 0.80000000000000004D;
        medium = 1.0D;
        high = 1.5D;
        boogie = 2D;
        selectedSpeed = medium;
        fiftyV = "50V";
        hundredV = "100V";
        oneFiftyV = "150V";
        twoHundredV = "200V";
        slow = "Lenta";
        moderate = "Media";
        fast = "Rápida";
        std2Ref = 1;
        std3Ref = 2;
        std4Ref = 3;
        std5Ref = 4;
        std6Ref = 5;
        std7Ref = 6;
        dyeColor = new Color(132, 50, 237);
        unknown1 = new Protein("Problema nº1", "Aconitasa", "Acon", 0x14250, Color.black);
        unknown2 = new Protein("Problema nº2", "Concanavalina A", "Con A", 25556, Color.black);
        unknown3 = new Protein("Problema nº3", "Glucosa-oxidasa", "GO", 63058, Color.black);
        unknown4 = new Protein("Problema nº4", "Neuraminidasa", "Neur", 43505, Color.black);
        unknown5 = new Protein("Problema nº5", "Fosforilasa b", "Fos b", 0x172f9, Color.black);
        unknown6 = new Protein("Problema nº6", "Piruvato-cinasa", "PK", 56773, Color.black);
        unknown7 = new Protein("Problema nº7", "Ribonucleasa A", "RNasa A", 13673, Color.black);
        unknown8 = new Protein("Problema nº8", "Quimotripsinógeno", "Quimo", 23564, Color.black);
        unknown9 = new Protein("Problema nº9", "p-Hidroxibenzoato", "HOBz", 43939, Color.black);
        unknown10 = new Protein("Problema nº10", "Ribonucleasa H", "RNasa H", 16638, Color.black);
        dye1 = new Protein("Colorante", "Colorante", "Colorante", 6000, dyeColor);
        dye2 = new Protein("Colorante", "Colorante", "Colorante", 6000, dyeColor);
        stdArray = new Protein[7];
        gel1 = new Acrylamide("7,5%", 7.5D);
        gel2 = new Acrylamide("10%", 10D);
        gel3 = new Acrylamide("12%", 12D);
        gel4 = new Acrylamide("15%", 15D);
        acrylamide = new Choice();
        sample = new Choice();
        voltage = new CheckboxGroup();
        speed = new CheckboxGroup();
        headerPanel = new Panel();
        headerSub1 = new Panel();
        headerSub2 = new Panel();
        headerSub3 = new Panel();
        labelPanel1 = new Panel();
        labelPanel2 = new Panel();
        dropPanel = new Panel();
        selectionPanel1 = new Panel();
        selectionPanel2 = new Panel();
        standardPanel = new Panel();
        colorPanel = new Panel();
        voltagePanel = new Panel();
        voltageSub1Panel = new Panel();
        voltageSub2Panel = new Panel();
        controlPanel = new Panel();
        color1Panel = new Panel();
        color2Panel = new Panel();
        color3Panel = new Panel();
        color4Panel = new Panel();
        color5Panel = new Panel();
        color6Panel = new Panel();
        color7Panel = new Panel();
        
        
        add(headerPanel);
        add(dropPanel);
        add(selectionPanel2);
        add(voltagePanel);
        add(controlPanel);

        
        headerPanel.setBackground(Color.lightGray);
        selectionPanel1.setBackground(Color.lightGray);
        selectionPanel2.setBackground(Color.lightGray);
        standardPanel.setBackground(Color.lightGray);
        voltagePanel.setBackground(Color.lightGray);
        voltageSub1Panel.setBackground(Color.lightGray);
        voltageSub2Panel.setBackground(Color.lightGray);
        controlPanel.setBackground(Color.lightGray);
        labelPanel1.setBackground(Color.lightGray);
        labelPanel2.setBackground(Color.lightGray);
        dropPanel.setBackground(Color.lightGray);
        stdArray[std1Ref] = new Protein("Patrón nº1", "beta-Galactosidasa", "ß-gal.", 0x1c58b, Color.blue);
        stdArray[std2Ref] = new Protein("Patrón nº2", "Ovalbúmina", "ovalb.", 42734, Color.yellow);
        stdArray[std3Ref] = new Protein("Patrón nº3", "Anhidrasa carbónica", "anh. carb.", 29011, Color.gray);
        stdArray[std4Ref] = new Protein("Patrón nº4", "Triosa-fosfato-isomerasa", "TIM", 26527, Color.green);
        stdArray[std5Ref] = new Protein("Patrón nº5", "Mioglobina", "Mioglob.", 17183, Color.magenta);
        stdArray[std6Ref] = new Protein("Patrón nº6", "Lisozima", "Lisoz.", 14296, Color.white);
        stdArray[std7Ref] = new Protein("Patrón nº7", "Inhibidor de tripsina", "BPTI", 6500, Color.red);
        acrylamide.addItem(gel1.percentGel);
        acrylamide.addItem(gel2.percentGel);
        acrylamide.addItem(gel3.percentGel);
        acrylamide.addItem(gel4.percentGel);
        sample.addItem(unknown1.name);
        sample.addItem(unknown2.name);
        sample.addItem(unknown3.name);
        sample.addItem(unknown4.name);
        sample.addItem(unknown5.name);
        sample.addItem(unknown6.name);
        sample.addItem(unknown7.name);
        sample.addItem(unknown8.name);
        sample.addItem(unknown9.name);
        sample.addItem(unknown10.name);
        setLayout(new GridLayout(5, 1, 5, 2));
        
        headerPanel.setLayout(new GridLayout(3, 1));
        
        headerPanel.add(headerSub1);
        headerPanel.add(headerSub2);
        headerPanel.add(headerSub3);

        headerSub1.add(new Label("PARÁMETROS DE LA ELECTROFORESIS"));
        headerSub2.add(new Label("Velocidad de la animación "));

        headerSub3.setLayout(new GridLayout(1, 3));
        headerSub3.add(new Checkbox(slow, speed, false));
        headerSub3.add(new Checkbox(moderate, speed, true));
        headerSub3.add(new Checkbox(fast, speed, false));

        dropPanel.setLayout(new GridLayout(3, 1));
        
        
        labelPanel1.setLayout(new GridLayout(1, 2));
        labelPanel1.add(new Label("Proteínas problema"));
        labelPanel1.add(new Label("% Acrilamida"));
        labelPanel2.add(new Label("Patrones"));
        
        selectionPanel1.setLayout(new GridLayout(1, 2));
        selectionPanel2.setLayout(new GridLayout(1, 2));
        
        voltagePanel.setLayout(new GridLayout(2, 1));       
        voltagePanel.add(voltageSub1Panel);
        voltagePanel.add(voltageSub2Panel);
        
        
        voltageSub1Panel.add(new Label("Voltaje "));


        voltageSub2Panel.setLayout(new GridLayout(1, 4));
        voltageSub2Panel.add(new Checkbox(fiftyV, voltage, false));
        voltageSub2Panel.add(new Checkbox(hundredV, voltage, true));
        voltageSub2Panel.add(new Checkbox(oneFiftyV, voltage, false));
        voltageSub2Panel.add(new Checkbox(twoHundredV, voltage, false));
        
        
        standardPanel.setLayout(new GridLayout(7, 1));
        standardPanel.add(new Checkbox(stdArray[std1Ref].abbr));
        standardPanel.add(new Checkbox(stdArray[std2Ref].abbr));
        standardPanel.add(new Checkbox(stdArray[std3Ref].abbr));
        standardPanel.add(new Checkbox(stdArray[std4Ref].abbr));
        standardPanel.add(new Checkbox(stdArray[std5Ref].abbr));
        standardPanel.add(new Checkbox(stdArray[std6Ref].abbr));
        standardPanel.add(new Checkbox(stdArray[std7Ref].abbr));
        color1Panel.setBackground(stdArray[std1Ref].color);
        color2Panel.setBackground(stdArray[std2Ref].color);
        color3Panel.setBackground(stdArray[std3Ref].color);
        color4Panel.setBackground(stdArray[std4Ref].color);
        color5Panel.setBackground(stdArray[std5Ref].color);
        color6Panel.setBackground(stdArray[std6Ref].color);
        color7Panel.setBackground(stdArray[std7Ref].color);
        colorPanel.setLayout(new GridLayout(7, 1, 1, 3));
        colorPanel.add(color1Panel);
        colorPanel.add(color2Panel);
        colorPanel.add(color3Panel);
        colorPanel.add(color4Panel);
        colorPanel.add(color5Panel);
        colorPanel.add(color6Panel);
        colorPanel.add(color7Panel);
        selectionPanel1.add(sample);
        selectionPanel1.add(acrylamide);
        selectionPanel2.add(standardPanel);
        selectionPanel2.add(colorPanel);
        dropPanel.add(labelPanel1);
        dropPanel.add(selectionPanel1);
        dropPanel.add(labelPanel2);
        controlPanel.setLayout(new GridLayout(2, 2, 4, 4));
        controlPanel.add(new Button("Añadir patrón"));
        controlPanel.add(new Button("Añadir muestra"));
        controlPanel.add(new Button("Comenzar"));
        controlPanel.add(new Button("Detener"));
        setSpeed(selectedSpeed);
        selectedSample = unknown1;
        
        return this;
    }

    private void setAnimationSpeed(String s)
    {
        parent.setAnimationSpeed(s);
    }

    public boolean action(Event event, Object obj)
    {
        if(event.target instanceof Button)
            handleButton(obj);
        if(event.target instanceof Checkbox)
            handleCheckBox(event.target);
        if(event.target instanceof Choice)
            handleChoice(obj);
        return true;
    }

    private void setAcrylamideEffect()
    {
        int i = 0;
        do
            if(selectedGel.getConc() > 12D)
            {
                if(stdArray[i].mw > 26000)
                    stdArray[i].SetDecider(selectedGel.suppressor);
                else
                    stdArray[i].ResetDecider();
            } else
            if(selectedGel.getConc() > 10D)
            {
                if(stdArray[i].mw > 29000)
                    stdArray[i].SetDecider(selectedGel.suppressor);
                else
                    stdArray[i].ResetDecider();
            } else
            if(selectedGel.getConc() > 7.5D)
            {
                if(stdArray[i].mw > 40000)
                    stdArray[i].SetDecider(selectedGel.suppressor);
                else
                    stdArray[i].ResetDecider();
            } else
            {
                stdArray[i].ResetDecider();
            }
        while(++i < 7);
        if(selectedGel.getConc() > 12D)
            if(selectedSample.mw > 26000)
            {
                selectedSample.SetDecider(selectedGel.suppressor);
                return;
            } else
            {
                selectedSample.ResetDecider();
                return;
            }
        if(selectedGel.getConc() > 10D)
            if(selectedSample.mw > 29000)
            {
                selectedSample.SetDecider(selectedGel.suppressor);
                return;
            } else
            {
                selectedSample.ResetDecider();
                return;
            }
        if(selectedGel.getConc() > 7.5D)
        {
            if(selectedSample.mw > 40000)
            {
                selectedSample.SetDecider(selectedGel.suppressor);
                return;
            } else
            {
                selectedSample.ResetDecider();
                return;
            }
        } else
        {
            selectedSample.ResetDecider();
            return;
        }
    }

    public void setDefaults()
    {
        parent.setAcrylaminde(gel1);
        selectedGel = gel1;
        setAcrylamideEffect();
    }

    public boolean handleChoice(Object obj)
    {
        if(unknown1.name.equals(obj))
        {
            parent.playClick2();
            selectedSample = unknown1;
            parent.displayProtein(unknown1);
            return true;
        }
        if(unknown2.name.equals(obj))
        {
            parent.playClick2();
            selectedSample = unknown2;
            parent.displayProtein(unknown2);
            return true;
        }
        if(unknown3.name.equals(obj))
        {
            parent.playClick2();
            selectedSample = unknown3;
            parent.displayProtein(unknown3);
            return true;
        }
        if(unknown4.name.equals(obj))
        {
            parent.playClick2();
            selectedSample = unknown4;
            parent.displayProtein(unknown4);
            return true;
        }
        if(unknown5.name.equals(obj))
        {
            parent.playClick2();
            selectedSample = unknown5;
            parent.displayProtein(unknown5);
            return true;
        }
        if(unknown6.name.equals(obj))
        {
            parent.playClick2();
            selectedSample = unknown6;
            parent.displayProtein(unknown6);
            return true;
        }
        if(unknown7.name.equals(obj))
        {
            parent.playClick2();
            selectedSample = unknown7;
            parent.displayProtein(unknown7);
            return true;
        }
        if(unknown8.name.equals(obj))
        {
            parent.playClick2();
            selectedSample = unknown8;
            parent.displayProtein(unknown8);
            return true;
        }
        if(unknown9.name.equals(obj))
        {
            parent.playClick2();
            selectedSample = unknown9;
            parent.displayProtein(unknown9);
            return true;
        }
        if(unknown10.name.equals(obj))
        {
            parent.playClick2();
            selectedSample = unknown10;
            parent.displayProtein(unknown10);
            return true;
        }
        if(gel1.percentGel.equals(obj))
        {
            parent.playDing();
            selectedGel = gel1;
            parent.setAcrylaminde(gel1);
            selectedGel.setSuppressor(gel1.getConc());
            setAcrylamideEffect();
            return true;
        }
        if(gel2.percentGel.equals(obj))
        {
            parent.playDing();
            selectedGel = gel2;
            parent.setAcrylaminde(gel2);
            selectedGel.setSuppressor(gel2.getConc());
            setAcrylamideEffect();
            return true;
        }
        if(gel3.percentGel.equals(obj))
        {
            parent.playDing();
            selectedGel = gel3;
            parent.setAcrylaminde(gel3);
            selectedGel.setSuppressor(gel3.getConc());
            setAcrylamideEffect();
            return true;
        }
        if(gel4.percentGel.equals(obj))
        {
            parent.playDing();
            selectedGel = gel4;
            parent.setAcrylaminde(gel4);
            selectedGel.setSuppressor(gel4.getConc());
            setAcrylamideEffect();
            return true;
        } else
        {
            return false;
        }
    }

    public boolean handleButton(Object obj)
    {
        if("Añadir patrón".equals(obj))
        {
            parent.addStandard();
            return true;
        }
        if("Añadir muestra".equals(obj))
        {
            parent.addSample();
            return true;
        }
        if("Comenzar".equals(obj))
        {
            parent.startRun(stdArray, selectedSample, dye1, dye2);
            return true;
        }
        if("Detener".equals(obj))
        {
            parent.stopRun();
            parent.setPlotData(stdArray, selectedSample, dye1);
            return true;
        } else
        {
            return false;
        }
    }

    public boolean handleCheckBox(Object obj)
    {
        Checkbox checkbox = (Checkbox)obj;
        String s = checkbox.getLabel();
        if(s == stdArray[std1Ref].abbr)
        {
            parent.playClick1();
            stdArray[std1Ref].selected = checkbox.getState();
            if(stdArray[std1Ref].selected)
                parent.displayProtein(stdArray[std1Ref]);
        } else
        if(s == stdArray[std2Ref].abbr)
        {
            parent.playClick1();
            stdArray[std2Ref].selected = checkbox.getState();
            if(stdArray[std2Ref].selected)
                parent.displayProtein(stdArray[std2Ref]);
        } else
        if(s == stdArray[std3Ref].abbr)
        {
            parent.playClick1();
            stdArray[std3Ref].selected = checkbox.getState();
            if(stdArray[std3Ref].selected)
                parent.displayProtein(stdArray[std3Ref]);
        } else
        if(s == stdArray[std4Ref].abbr)
        {
            parent.playClick1();
            stdArray[std4Ref].selected = checkbox.getState();
            if(stdArray[std4Ref].selected)
                parent.displayProtein(stdArray[std4Ref]);
        } else
        if(s == stdArray[std5Ref].abbr)
        {
            parent.playClick1();
            stdArray[std5Ref].selected = checkbox.getState();
            if(stdArray[std5Ref].selected)
                parent.displayProtein(stdArray[std5Ref]);
        } else
        if(s == stdArray[std6Ref].abbr)
        {
            parent.playClick1();
            stdArray[std6Ref].selected = checkbox.getState();
            if(stdArray[std6Ref].selected)
                parent.displayProtein(stdArray[std6Ref]);
        } else
        if(s == stdArray[std7Ref].abbr)
        {
            parent.playClick1();
            stdArray[std7Ref].selected = checkbox.getState();
            if(stdArray[std7Ref].selected)
                parent.displayProtein(stdArray[std7Ref]);
        } else
        if(s == fiftyV)
        {
            parent.playTone1();
            selectedSpeed = low;
            setSpeed(selectedSpeed);
        } else
        if(s == hundredV)
        {
            parent.playTone3();
            selectedSpeed = medium;
            setSpeed(selectedSpeed);
        } else
        if(s == oneFiftyV)
        {
            parent.playTone2();
            selectedSpeed = medium;
            setSpeed(selectedSpeed);
        } else
        if(s == twoHundredV)
        {
            parent.playTone4();
            selectedSpeed = boogie;
            setSpeed(selectedSpeed);
        } else
        if(s == slow)
        {
            parent.playTone6();
            setAnimationSpeed(slow);
        } else
        if(s == moderate)
        {
            parent.playTone7();
            setAnimationSpeed(moderate);
        } else
        if(s == fast)
        {
            parent.playTone5();
            setAnimationSpeed(fast);
        }
        return true;
    }

    private void setSpeed(double d)
    {
        dye1.speed = 0.94528800000000002D * d;
        dye2.speed = 0.94528800000000002D * d;
        stdArray[std1Ref].speed = 0.048245000000000003D * d;
        stdArray[std2Ref].speed = 0.35087200000000002D * d;
        stdArray[std3Ref].speed = 0.46814299999999998D * d;
        stdArray[std4Ref].speed = 0.49524400000000002D * d;
        stdArray[std5Ref].speed = 0.62672099999999997D * d;
        stdArray[std6Ref].speed = 0.68241399999999997D * d;
        stdArray[std7Ref].speed = 0.92105300000000001D * d;
        unknown1.speed = 0.15166299999999999D * d;
        unknown2.speed = 0.50653499999999996D * d;
        unknown3.speed = 0.233075D * d;
        unknown4.speed = 0.34545900000000002D * d;
        unknown5.speed = 0.10909099999999999D * d;
        unknown6.speed = 0.26486500000000002D * d;
        unknown7.speed = 0.69590399999999997D * d;
        unknown8.speed = 0.53110599999999997D * d;
        unknown9.speed = 0.34245300000000001D * d;
        unknown10.speed = 0.63648000000000005D * d;
    }

    Electrophoresis parent;
    double low;
    double medium;
    double high;
    double boogie;
    double selectedSpeed;
    String fiftyV;
    String hundredV;
    String oneFiftyV;
    String twoHundredV;
    String slow;
    String moderate;
    String fast;
    int std1Ref;
    int std2Ref;
    int std3Ref;
    int std4Ref;
    int std5Ref;
    int std6Ref;
    int std7Ref;
    Color dyeColor;
    Protein unknown1;
    Protein unknown2;
    Protein unknown3;
    Protein unknown4;
    Protein unknown5;
    Protein unknown6;
    Protein unknown7;
    Protein unknown8;
    Protein unknown9;
    Protein unknown10;
    Protein dye1;
    Protein dye2;
    Protein selectedSample;
    Protein stdArray[];
    Acrylamide gel1;
    Acrylamide gel2;
    Acrylamide gel3;
    Acrylamide gel4;
    Acrylamide selectedGel;
    Choice acrylamide;
    Choice sample;
    CheckboxGroup voltage;
    CheckboxGroup speed;
    Panel headerPanel;
    Panel headerSub1;
    Panel headerSub2;
    Panel headerSub3;
    Panel labelPanel1;
    Panel labelPanel2;
    Panel dropPanel;
    Panel selectionPanel1;
    Panel selectionPanel2;
    Panel standardPanel;
    Panel colorPanel;
    Panel voltagePanel;
    Panel voltageSub1Panel;
    Panel voltageSub2Panel;
    Panel controlPanel;
    Panel color1Panel;
    Panel color2Panel;
    Panel color3Panel;
    Panel color4Panel;
    Panel color5Panel;
    Panel color6Panel;
    Panel color7Panel;
}