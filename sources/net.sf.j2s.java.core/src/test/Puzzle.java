package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.Image;
import java.awt.MediaTracker;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionAdapter;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Random;
import a2s.*;
//import java.awt.*;


// =================================
// Puzzle-Applet zu MathePrisma
// Autor: Stefanie Krivsky
// Stand: November 2003
// www.MathePrisma.de
// MathePrisma@math.uni-wuppertal.de
// =================================
// Appletpoints eingefügt von
// U. Schwebinghaus 2007

public class Puzzle extends Applet {
//===============================//

int mpcount; //eingefügt U. Schwebinghaus
String par_antw="Welches Bild muss wohin?";

oben Kontrolle;
mitte Feld;
String Dateiname;


Matrix[] Felder;
String[] BilderNamen;
ZMatrix[] Zufaelle;
int AnzFelder;
int BilderAnz;
int ZufallAnz;
String PositionenString, LoesungenString;



  //für MathePrisma Points
  //eingefügt U. Schwebinghaus
  public int send_to_html()
  {
    int points=-1;
    if (mpcount>0) points=mpcount;
    return points;
  }


  public void InitBilder (String s) {
  String sneu = "";
  int BildNr = 0;
  for (int i=0; i<s.length(); i++) {
    if ( !(s.charAt(i) == '?') ) {
      sneu = sneu + s.charAt(i);
    }
    else {
      BilderNamen[BildNr] = sneu;
      BildNr++;
      sneu = "";
    }
  }
  }

  public void InitFelder (String s) {
  String sneu = "";
  ZufallAnz = 0;
  int FeldNr = 0;
  int[] FiW = new int[9];
  int Feldp = 0;
  for (int i=0; i<s.length(); i++) {
    if ( ('0'<= s.charAt(i)) && (s.charAt(i)<='9')
    || (s.charAt(i) == '.') ) {
      sneu = sneu + s.charAt(i);
    }
    if ( s.charAt(i) == ',') {
      double db;
      try {
        db = Double.valueOf(sneu).doubleValue();
      } catch (java.lang.NumberFormatException ex) {
        db = 0.0;
      }
      FiW[Feldp] = Math.round((float)(db));
      Feldp++;
      sneu = "";
    }
    if (Feldp == 9) {
      if (FiW[3] > ZufallAnz) {
        Zufaelle[ZufallAnz] = new ZMatrix(FiW[0], FiW[1]);
        ZufallAnz++;
      }
      if (FiW[2]==0) {
        Felder[FeldNr] = new Matrix(FiW[0], FiW[1], true, FiW[3],
           FiW[4], FiW[5], FiW[6], FiW[7], FiW[8]);
      }
      else {
        Felder[FeldNr] = new Matrix(FiW[0], FiW[1], false, FiW[3],
           FiW[4], FiW[5], FiW[6], FiW[7], FiW[8]);
      }
      FeldNr++;
      Feldp = 0;
    }
  }
  }


  public void InitElemente (String s) {
  String sneu = "";
  int FeldNr = 0;
  int Feldpx = 0;
  int Feldpy = 0;
  for (int i=0; i<s.length(); i++) {
    if ( ('0'<= s.charAt(i)) && (s.charAt(i)<='9')
       || (s.charAt(i) == '.') ) {
      sneu = sneu + s.charAt(i);
    }
    if ( (s.charAt(i) == ',') || (s.charAt(i) == ';') || (s.charAt(i) == ']') ) {
      double db;
      try {
        db = Double.valueOf(sneu).doubleValue();
      } catch (java.lang.NumberFormatException ex) {
        db = 0.0;
      }
      if (Felder[FeldNr].zufall == 0) {
        Felder[FeldNr].Elem[Feldpx][Feldpy] = Math.round((float)(db)-1);
      }
      else {
          int zFeldpx = Zufaelle[Felder[FeldNr].zufall-1].ZufX[Feldpx];
        int zFeldpy = Zufaelle[Felder[FeldNr].zufall-1].ZufY[Feldpy];
        Felder[FeldNr].Elem[zFeldpx][zFeldpy] = Math.round((float)(db)-1);
      }
      if (s.charAt(i) == ',') {Feldpx++;}
      if (s.charAt(i) == ';') {Feldpx = 0;Feldpy++;}
      if ( s.charAt(i)== ']') {Feldpx = 0;Feldpy = 0;FeldNr++;}
      sneu = "";
    }
  }
  }




  public void InitLoesungen (String s) {
  String sneu = "";
  int FeldNr = 0;
  int Feldpx = 0;
  int Feldpy = 0;
  for (int i=0; i<s.length(); i++) {
    if ( ('0'<= s.charAt(i)) && (s.charAt(i)<='9')
       || (s.charAt(i) == '.') ) {
      sneu = sneu + s.charAt(i);
    }
    if ( (s.charAt(i) == ',') || (s.charAt(i) == ';') || (s.charAt(i) == ']') ) {
      double db;
      try {
        db = Double.valueOf(sneu).doubleValue();
      } catch (java.lang.NumberFormatException ex) {
        db = 0.0;
      }
      if ( !Felder[FeldNr].fix ) {
        if (Felder[FeldNr].zufall == 0) {
          Felder[FeldNr].Lsg[Feldpx][Feldpy] = Math.round((float)(db)-1);
        }
        else {
            int zFeldpx = Zufaelle[Felder[FeldNr].zufall-1].ZufX[Feldpx];
          int zFeldpy = Zufaelle[Felder[FeldNr].zufall-1].ZufY[Feldpy];
          Felder[FeldNr].Lsg[zFeldpx][zFeldpy] = Math.round((float)(db)-1);
        }
      }
      if (s.charAt(i) == ',') {Feldpx++;}
      if (s.charAt(i) == ';') {Feldpx = 0;Feldpy++;}
      if ( s.charAt(i)== ']') {Feldpx = 0;Feldpy = 0;FeldNr++;}
      sneu = "";
    }
  }
  }

  
  
  public URL getCodeBase() {
		try {
			  return new URL("http://www2.math.uni-wuppertal.de/~kblanken/swingjs/site/swingjs/j2s/test/x");
		} catch (MalformedURLException e) {
			return null;
		}

  }

  static {
	  /** @j2sNative
	   * 
	   * thisApplet.__Info.width = 524;
	   * thisApplet.__Info.height = 620;
	   */
  }
  
  public void init() {
	  setSize(524,620);
  Dateiname = getParameter("PuzzleDatei");
  Dateiname = "datoriginal.txt";
  String BilderString = "";
  String FelderString = "";
  PositionenString = "";
  LoesungenString = "";
  BilderAnz = 0;
  AnzFelder = 0;
  String thisLine;
  try {
  //  File file = new File(Dateiname);
  //  BufferedReader in = new BufferedReader ( new FileReader(file) );
	  URL url = new URL(getCodeBase(), Dateiname);
	  System.out.println(url);
    BufferedReader in = new BufferedReader ( new InputStreamReader ( (url).openStream(), "ISO-8859-1" ) );
    do {}
    while( (thisLine=in.readLine()).indexOf("// --- ( Bildernamen )") != 0 );
    while( (thisLine=in.readLine()).indexOf("// --- ( Matrizenparameter )") != 0 ) {
      BilderAnz++;
      BilderString = BilderString+thisLine+"?";
    }
    thisLine = in.readLine();
    while( (thisLine=in.readLine()).indexOf("// --- ( Werte in Matrizen )") != 0 ) {
      AnzFelder++;
      FelderString = FelderString+thisLine+",";
    }
    while( (thisLine=in.readLine()).indexOf("// --- ( Loesungen in Matrizen )") !=0 ) {
      PositionenString = PositionenString+thisLine+" ";
    }
    while( (thisLine=in.readLine()).indexOf("// Ende der Initialisierungsdatei") !=0 ) {
      LoesungenString = LoesungenString+thisLine+" ";
    }
    in.close();

    BilderNamen = new String [BilderAnz];
    InitBilder (BilderString);
  } catch (Exception e) {
    // System.out.println("error " + e);
  }

  //folgender Abschnitt eingefügt U. Schwebinghaus
  mpcount=0;
  try
  {
    String h=getParameter("quest");
    if (h!=null) par_antw=h;
  } catch ( Exception e ) { }

  if (BilderNamen == null)
  {
	  String NameStr = "frage";
	  String AnswStr = "antwort";
	  String Form = "png";
	  String mode="2x3";
	  int img_w = 210;
	  int quest_h = 167;
	  int answ_h = 36;
	  BilderAnz = 12;
	  AnzFelder = 13;
	  int x1,x2,x3,y1,y2,y3,y4,y5;

	  try
	  {
		String h=getParameter("puzzlecount");
		if (h!=null) BilderAnz=2*Integer.valueOf(h).intValue();
	  } catch ( Exception e ) { }

	  try
	  {
		String h=getParameter("question_img");
		if (h!=null) NameStr=h;
	  } catch ( Exception e ) { }

	  try
	  {
		String h=getParameter("answer_img");
		if (h!=null) AnswStr=h;
	  } catch ( Exception e ) { }

	  try
	  {
		String h=getParameter("img_format");
		if (h!=null) Form=h;
	  } catch ( Exception e ) { }

	  try
	  {
		String h=getParameter("img_width");
		if (h!=null) img_w=Integer.valueOf(h).intValue();
	  } catch ( Exception e ) { }

	  try
	  {
		String h=getParameter("question_height");
		if (h!=null) quest_h=Integer.valueOf(h).intValue();
	  } catch ( Exception e ) { }

	  try
	  {
		String h=getParameter("answer_height");
		if (h!=null) answ_h=Integer.valueOf(h).intValue();
	  } catch ( Exception e ) { }

	  try
	  {
		String h=getParameter("modus");
		if (h!=null) mode=h;
	  } catch ( Exception e ) { }

	  BilderNamen = new String [BilderAnz];

	  int j;
	  for (int i = 0; i<BilderAnz/2; i++)
	  {
		j = i+1;
		BilderNamen[i] = "Pics/"+NameStr+j+"."+Form;
		BilderNamen[BilderAnz/2+i] = "Pics/"+AnswStr+j+"."+Form;
	  }

	  x1 = img_w+5;
	  x2 = 2*(img_w+5);
	  y1 = quest_h+3;
	  y2 = quest_h+answ_h+10;
	  y3 = 2*quest_h+answ_h+8;
	  y4 = 2*quest_h+2*answ_h+15;

	  FelderString = "1, 1, 0, 1, 0, 5,"+img_w+","+quest_h+", 5"+","+      //Fragebild 1
					 "1, 1, 0, 1, "+x1+", 5,"+img_w+","+quest_h+", 5"+","+  //Fragebild 2
					 "1, 1, 0, 1, "+x2+", 5,"+img_w+","+quest_h+", 5"+","+  //Fragebild 3
					 "1, 1, 1, 0, 0, "+y1+","+img_w+","+answ_h+", 5"+","+     //Feld 1
					 "1, 1, 1, 0, "+x1+", "+y1+","+img_w+","+answ_h+", 5"+","+  //Feld 2
					 "1, 1, 1, 0, "+x2+", "+y1+","+img_w+","+answ_h+", 5"+","+  //Feld 3
					 "1, 1, 0, 1, 0, "+y2+","+img_w+","+quest_h+", 5"+","+        //Fragebild 4
					 "1, 1, 0, 1, "+x1+", "+y2+","+img_w+","+quest_h+", 5"+","+   //Fragebild 5
					 "1, 1, 0, 1, "+x2+", "+y2+","+img_w+","+quest_h+", 5"+","+   //Fragebild 6
					 "1, 1, 1, 0, 0, "+y3+","+img_w+","+answ_h+", 5"+","+        //Feld 4
					 "1, 1, 1, 0, "+x1+", "+y3+","+img_w+","+answ_h+", 5"+","+   //Feld 5
					 "1, 1, 1, 0, "+x2+", "+y3+","+img_w+","+answ_h+", 5"+","+   //Feld 6
					 "3, 2, 1, 2, 0, "+y4+","+img_w+","+answ_h+", 5"+",";        //Antworten 1 bis 6 in 3x2-Anordnung


	  PositionenString = "[1]"+" "+"[2]"+" "+"[3]"+" "+"[0]"+" "+"[0]"+" "+"[0]"+" "+
						 "[4]"+" "+"[5]"+" "+"[6]"+" "+"[0]"+" "+"[0]"+" "+"[0]"+" "+
						 "[7,8,9;10,11,12]"+" ";

	  LoesungenString = "[0]"+" "+"[0]"+" "+"[0]"+" "+"[7]"+" "+"[8]"+" "+"[9]"+" "+
						"[0]"+" "+"[0]"+" "+"[0]"+" "+"[10]"+" "+"[11]"+" "+"[12]"+" ";

	  if (mode.equals("3x2"))
	  {
		BilderAnz = 12;
		x1 = img_w+5;
		x2 = 2*(img_w+5);
		y1 = quest_h+3;
		y2 = quest_h+answ_h+10;
		y3 = 2*quest_h+answ_h+8;
		y4 = 2*quest_h+2*answ_h+15;
		y5 = 3*quest_h+2*answ_h+15;

		FelderString = "1, 1, 0, 1, 0, 5,"+img_w+","+quest_h+", 5"+","+         //Fragebild 1
					   "1, 1, 0, 1, "+x1+", 5,"+img_w+","+quest_h+", 5"+","+    //Fragebild 2
					   "1, 1, 1, 0, 0, "+y1+","+img_w+","+answ_h+", 5"+","+     //Feld 1
					   "1, 1, 1, 0, "+x1+", "+y1+","+img_w+","+answ_h+", 5"+","+  //Feld 2
					   "1, 1, 0, 1, 0, "+y2+","+img_w+","+quest_h+", 5"+","+        //Fragebild 3
					   "1, 1, 0, 1, "+x1+", "+y2+","+img_w+","+quest_h+", 5"+","+  //Fragebild 4
					   "1, 1, 1, 0, 0, "+y3+","+img_w+","+answ_h+", 5"+","+       //Feld 3
					   "1, 1, 1, 0, "+x1+", "+y3+","+img_w+","+answ_h+", 5"+","+   //Feld 4
					   "1, 1, 0, 1, 0, "+y4+","+img_w+","+quest_h+", 5"+","+   //Fragebild 5
					   "1, 1, 0, 1, "+x1+", "+y4+","+img_w+","+quest_h+", 5"+","+   //Fragebild 6
					   "1, 1, 1, 0, 0, "+y5+","+img_w+","+answ_h+", 5"+","+       //Feld 5
					   "1, 1, 1, 0, "+x1+", "+y5+","+img_w+","+answ_h+", 5"+","+   //Feld 6
					   "1, 6, 1, 2, "+x2+", "+y1+","+img_w+","+answ_h+", 5"+",";     //Antworten 1 bis 6 in 1x6-Anordnung


		PositionenString = "[1]"+" "+"[2]"+" "+"[0]"+" "+"[0]"+" "+"[3]"+" "+"[4]"+" "+
						 "[0]"+" "+"[0]"+" "+"[5]"+" "+"[6]"+" "+"[0]"+" "+"[0]"+" "+
						 "[7;8;9;10;11;12]"+" ";

		LoesungenString = "[0]"+" "+"[0]"+" "+"[7]"+" "+"[8]"+" "+"[0]"+" "+"[0]"+" "+
						"[9]"+" "+"[10]"+" "+"[0]"+" "+"[0]"+" "+"[11]"+" "+"[12]"+" ";
	  }

	  if (mode.equals("3x3"))
	  {
		BilderAnz = 18;
		AnzFelder = 19;
		x1 = img_w+5;
		x2 = 2*(img_w+5);
		x3 = 3*(img_w+5);
		y1 = quest_h+3;
		y2 = quest_h+answ_h+10;
		y3 = 2*quest_h+answ_h+8;
		y4 = 2*quest_h+2*answ_h+15;
		y5 = 3*quest_h+2*answ_h+15;

		FelderString = "1, 1, 0, 1, 0, 5,"+img_w+","+quest_h+", 5"+","+      //Fragebild 1
					 "1, 1, 0, 1, "+x1+", 5,"+img_w+","+quest_h+", 5"+","+  //Fragebild 2
					 "1, 1, 0, 1, "+x2+", 5,"+img_w+","+quest_h+", 5"+","+  //Fragebild 3
					 "1, 1, 1, 0, 0, "+y1+","+img_w+","+answ_h+", 5"+","+     //Feld 1
					 "1, 1, 1, 0, "+x1+", "+y1+","+img_w+","+answ_h+", 5"+","+  //Feld 2
					 "1, 1, 1, 0, "+x2+", "+y1+","+img_w+","+answ_h+", 5"+","+  //Feld 3
					 "1, 1, 0, 1, 0, "+y2+","+img_w+","+quest_h+", 5"+","+        //Fragebild 4
					 "1, 1, 0, 1, "+x1+", "+y2+","+img_w+","+quest_h+", 5"+","+   //Fragebild 5
					 "1, 1, 0, 1, "+x2+", "+y2+","+img_w+","+quest_h+", 5"+","+   //Fragebild 6
					 "1, 1, 1, 0, 0, "+y3+","+img_w+","+answ_h+", 5"+","+        //Feld 4
					 "1, 1, 1, 0, "+x1+", "+y3+","+img_w+","+answ_h+", 5"+","+   //Feld 5
					 "1, 1, 1, 0, "+x2+", "+y3+","+img_w+","+answ_h+", 5"+","+   //Feld 6
					 "1, 1, 0, 1, 0, "+y4+","+img_w+","+quest_h+", 5"+","+        //Fragebild 7
					 "1, 1, 0, 1, "+x1+", "+y4+","+img_w+","+quest_h+", 5"+","+   //Fragebild 8
					 "1, 1, 0, 1, "+x2+", "+y4+","+img_w+","+quest_h+", 5"+","+   //Fragebild 9
					 "1, 1, 1, 0, 0, "+y5+","+img_w+","+answ_h+", 5"+","+        //Feld 7
					 "1, 1, 1, 0, "+x1+", "+y5+","+img_w+","+answ_h+", 5"+","+   //Feld 8
					 "1, 1, 1, 0, "+x2+", "+y5+","+img_w+","+answ_h+", 5"+","+   //Feld 9
					 "1, 9, 1, 2, "+x3+", "+y1+","+img_w+","+answ_h+", 5"+",";   //Antworten 1 bis 9 in 1x9-Anordnung


		PositionenString = "[1]"+" "+"[2]"+" "+"[3]"+" "+"[0]"+" "+"[0]"+" "+"[0]"+" "+
						 "[4]"+" "+"[5]"+" "+"[6]"+" "+"[0]"+" "+"[0]"+" "+"[0]"+" "+
						 "[7]"+" "+"[8]"+" "+"[9]"+" "+"[0]"+" "+"[0]"+" "+"[0]"+" "+
						 "[10;11;12;13;14;15;16;17;18]"+" ";

		LoesungenString = "[0]"+" "+"[0]"+" "+"[0]"+" "+"[10]"+" "+"[11]"+" "+"[12]"+" "+
						"[0]"+" "+"[0]"+" "+"[0]"+" "+"[13]"+" "+"[14]"+" "+"[15]"+" "+
						"[0]"+" "+"[0]"+" "+"[0]"+" "+"[16]"+" "+"[17]"+" "+"[18]"+" ";
	  }

	  if (mode.equals("2x2"))
	  {
		BilderAnz = 8;
		AnzFelder = 9;
		x1 = img_w+5;
		x2 = 2*(img_w+5);
		y1 = quest_h+3;
		y2 = quest_h+answ_h+10;
		y3 = 2*quest_h+answ_h+8;
		y4 = 2*quest_h+2*answ_h+15;
		//y5 = 3*quest_h+2*answ_h+15;

		FelderString = "1, 1, 0, 1, 0, 5,"+img_w+","+quest_h+", 5"+","+         //Fragebild 1
					   "1, 1, 0, 1, "+x1+", 5,"+img_w+","+quest_h+", 5"+","+    //Fragebild 2
					   "1, 1, 1, 0, 0, "+y1+","+img_w+","+answ_h+", 5"+","+     //Feld 1
					   "1, 1, 1, 0, "+x1+", "+y1+","+img_w+","+answ_h+", 5"+","+  //Feld 2
					   "1, 1, 0, 1, 0, "+y2+","+img_w+","+quest_h+", 5"+","+        //Fragebild 3
					   "1, 1, 0, 1, "+x1+", "+y2+","+img_w+","+quest_h+", 5"+","+  //Fragebild 4
					   "1, 1, 1, 0, 0, "+y3+","+img_w+","+answ_h+", 5"+","+       //Feld 3
					   "1, 1, 1, 0, "+x1+", "+y3+","+img_w+","+answ_h+", 5"+","+   //Feld 4
					   "2, 2, 1, 2, 0, "+y4+","+img_w+","+answ_h+", 5"+",";       //Antworten 1 bis 4 in 2x2-Anordnung


		PositionenString = "[1]"+" "+"[2]"+" "+"[0]"+" "+"[0]"+" "+"[3]"+" "+"[4]"+" "+
						 "[0]"+" "+"[0]"+" "+ "[5,6;7,8]"+" ";

		LoesungenString = "[0]"+" "+"[0]"+" "+"[5]"+" "+"[6]"+" "+"[0]"+" "+"[0]"+" "+
						"[7]"+" "+"[8]"+" ";
	  }

	  if (mode.equals("1x5"))
	  {
		BilderAnz = 10;
		AnzFelder = 11;
		x1 = img_w+7;
		x2 = 2*(img_w+7);
		y1 = quest_h+12;
		y2 = 2*(quest_h+7)+5;
		y3 = 3*(quest_h+7)+5;
		y4 = 4*(quest_h+7)+5;


		FelderString = "1, 1, 0, 1, 0, 5,"+img_w+","+quest_h+", 5"+","+             //Fragebild 1
					   "1, 1, 1, 0, "+x1+", 5,"+img_w+","+answ_h+", 5"+","+         //Feld 1
					   "1, 1, 0, 1, 0, "+y1+","+img_w+","+quest_h+", 5"+","+        //Fragebild 2
					   "1, 1, 1, 0, "+x1+", "+y1+","+img_w+","+answ_h+", 5"+","+    //Feld 2
					   "1, 1, 0, 1, 0, "+y2+","+img_w+","+quest_h+", 5"+","+        //Fragebild 3
					   "1, 1, 1, 0, "+x1+", "+y2+","+img_w+","+answ_h+", 5"+","+    //Feld 3
					   "1, 1, 0, 1, 0, "+y3+","+img_w+","+quest_h+", 5"+","+        //Fragebild 4
					   "1, 1, 1, 0, "+x1+", "+y3+","+img_w+","+answ_h+", 5"+","+    //Feld 4
					   "1, 1, 0, 1, 0, "+y4+","+img_w+","+quest_h+", 5"+","+        //Fragebild 5
					   "1, 1, 1, 0, "+x1+", "+y4+","+img_w+","+answ_h+", 5"+","+    //Feld 5
					   "1, 5, 1, 2, "+x2+", 5,"+img_w+","+answ_h+", 7"+",";     //Antwort 1 bis 5 in 1x5-Anordnung


		PositionenString = "[1]"+" "+"[0]"+" "+"[2]"+" "+"[0]"+" "+"[3]"+ " "+
						 "[0]"+" "+ "[4]"+" "+"[0]"+" "+ "[5]"+" "+"[0]"+" "+
						 "[6;7;8;9;10]"+" ";

		LoesungenString = "[0]"+" "+"[6]"+" "+"[0]"+" "+"[7]"+" "+"[0]"+" "+"[8]"+" "+
						"[0]"+" "+"[9]"+" "+"[0]"+" "+"[10]";
	  }
  }

  Felder = new Matrix[AnzFelder];
  Zufaelle = new ZMatrix[AnzFelder];
  InitFelder (FelderString);
  ResetFeld();
  setBackground(Color.white);
  setLayout(new BorderLayout());
  add("North", Kontrolle= new oben(this));
  add("Center", Feld = new mitte(this));

  validate();

  } // init




  public void ResetFeld() {
  // alle Elemente werden auf -1 = frei gesetzt
  for (int z=0; z<(AnzFelder); z++) {
    for (int i=0; i<Felder[z].dimX; i++) {
      for (int j=0; j<Felder[z].dimY; j++) {
        Felder[z].Elem[i][j] = -1;
      }
    }
    if (Felder[z].fix == false) {
      for (int i=0; i<Felder[z].dimX; i++) {
        for (int j=0; j<Felder[z].dimY; j++) {
          Felder[z].Lsg[i][j] = -1;
        }
      }
    }
  }
  Random rz;//initialisiere Zufallsz.
  rz = new Random();
  //erzeuge Vektor mit
  // "zufaellig" verschiedenen Eintraegen
  for (int i=0; i<ZufallAnz; i++) {
    for (int j=0; j<Zufaelle[i].dimX; j++) {
      Zufaelle[i].ZufX[j] = -1;
    }
    for (int j=0; j<Zufaelle[i].dimX; j++) {
      int z = rz.nextInt();
      z =Math.abs(z)%Zufaelle[i].dimX;
      while (Zufaelle[i].ZufX[z] != -1) {
        z = (z+1)%Zufaelle[i].dimX;
      }
      Zufaelle[i].ZufX[z] = j;
    }
    for (int j=0; j<Zufaelle[i].dimY; j++) {
      Zufaelle[i].ZufY[j] = -1;
    }
    for (int j=0; j<Zufaelle[i].dimY; j++) {
      int z = rz.nextInt();
      z =Math.abs(z)%Zufaelle[i].dimY;
      while (Zufaelle[i].ZufY[z] != -1) {
        z = (z+1)%Zufaelle[i].dimY;
      }
      Zufaelle[i].ZufY[z] = j;
    }
  }
  InitElemente (PositionenString);
  InitLoesungen (LoesungenString);
  } // Ende RestFeld


  public int TestFeld() {
  int fehleranz = 0;
  for (int z=0; z<(AnzFelder); z++) {
    if ( !Felder[z].fix ) {
      for (int i=0; i<(Felder[z].dimX); i++) {
        for (int j=0; j<(Felder[z].dimY); j++) {
          if ( (Felder[z].Lsg[i][j] > -1) &&
           (Felder[z].Elem[i][j] != Felder[z].Lsg[i][j]) ){
            fehleranz++;
          } // if
        } // for
      } // for
    } // if
  } // for
  return fehleranz;
  } // Ende TestFeld



  public void start() {
  Feld.init();
  Feld.repaint();
  }




//////////////////////////////////////////////////////////////
//Die FeldMatrix und die Zufallsmatrix
//////////////////////////////////////////////////////////////



class Matrix {
int dimX, dimY;
boolean fix;
int zufall;
int UrspX, UrspY;
int BildW, BildH, Rand;

int[][] Elem;
int[][] Lsg;

  public Matrix( int dx, int dy,
  boolean f, int z, int Ux, int Uy,
  int w, int h, int r) {
  dimX= dx;
  dimY= dy;
  fix = f;
  zufall= z;
  UrspX = Ux;
  UrspY = Uy;
  BildW = w;
  BildH = h;
  Rand= r;

  Elem = new int[dimX][dimY];
  if (fix == false) {
    Lsg = new int[dimX][dimY];
  }
  } // Matrix

} // class Matrix



class ZMatrix {
int dimX, dimY;
int[] ZufX, ZufY;

  public ZMatrix( int dx, int dy) {
  dimX= dx;
  dimY= dy;
  ZufX = new int[dimX];
  ZufY = new int[dimY];
  } // ZMatrix

} // class ZMatrix



//////////////////////////////////////////////////////////////
// Die oberen Einstellungen //
//////////////////////////////////////////////////////////////


class oben extends Panel {
Puzzle theapplet;
Label Antwort = new Label();
Panel buttons = new Panel();
Button[] Knopfl = new Button[2];


  public oben (Puzzle a) {
  theapplet = a;
  setLayout(new GridLayout(2,1));
  setBackground(Color.white);
  setFont(new Font("Helvetica",Font.PLAIN,14));
  buttons.setLayout(new GridLayout(1,2));
  Knopfl[0]=new Button("Neues Puzzle");
  Knopfl[1]=new Button("Kontrolle");
  Knopfl[0].setBackground(Color.lightGray);
  Knopfl[1].setBackground(Color.lightGray);
  buttons.add(Knopfl[0]);
  buttons.add(Knopfl[1]);
  add(buttons);
  Antwort.setForeground(Color.black);
  Antwort.setText(par_antw);  // geändert U. Schwebinghaus
  Antwort.setHorizontalAlignment(Label.CENTER);
  add(Antwort);


  ActionListener ActionButton0 = new ActionListener() {
  public void actionPerformed(ActionEvent e){
  ResetFeld();
  Antwort.setForeground(Color.black);
  Antwort.setText(par_antw);  // geändert U. Schwebinghaus
  Feld.repaint();
  }
  }; // Ende ActionButton0

  ActionListener ActionButton1 = new ActionListener() {
  public void actionPerformed(ActionEvent e){
  int falsch = 0;
  falsch = TestFeld();

  mpcount=BilderAnz/2-falsch;

  if (falsch == 0) {
    Antwort.setForeground(Color.green.darker());
    Antwort.setText("Klasse, alles richtig!");
  }
  else {
    if (falsch == 1) {
      Antwort.setForeground(Color.red);
      Antwort.setText("Ein Bild ist noch falsch.");
    }
    else {
      Antwort.setForeground(Color.red);
      Antwort.setText(falsch+" Bilder sind noch falsch.");
    }
  }
  }
  }; // Ende ActionButton1


  Knopfl[0].addActionListener(ActionButton0);
  Knopfl[1].addActionListener(ActionButton1);
  } // public oben


} // class oben




//////////////////////////////////////////////////////////////
//Das Feld//
//////////////////////////////////////////////////////////////



class mitte extends Panel {

Puzzle theapplet;
Image img, currentImage;
Graphics imggc;
int width,height;
Image[] Bilder;
MediaTracker ladekontrolle = new MediaTracker(this);

int dragnr = -1;
int dragx = -1;
int dragy = -1;
int vx = 0;
int vy = 0;

int merkeFN = -1;
int merkeFj = -1;
int merkeFi = -1;


  public mitte(Puzzle a) {
  theapplet = a;
  addMouseListener( new meinMA());
  addMouseMotionListener( new meinMML());
  }


  public void init(){
  if (img==null) {
    Dimension d=getSize();
    width=d.width; height=d.height;
    img=createImage(width,height);
    imggc=img.getGraphics();
    imggc.setFont (new Font("Helvetica", Font.PLAIN, 14));

    Bilder= new Image[BilderAnz];
    for (int i=0; i<(BilderAnz); i++) {
      // Bilder[i] = getImage(getCodeBase(), (String)(BilderNamen[i]));
      try
      {
    	  
    	  URL url = new java.net.URL(getCodeBase(), (String)(BilderNamen[i]));
    	  System.out.println(url);

	    Bilder[i] = javax.imageio.ImageIO.read(url);
	  }
	  catch (Exception e) {
		  System.out.println(e);
	  }

      ladekontrolle.addImage(Bilder[i],i);
      try {ladekontrolle.waitForID(i);}
      catch (InterruptedException e)
      {}
    }
  }
  validate();
  }


  public void paint(Graphics gc) {
  if (img!=null) { malen(gc); }
  }

  public void update(Graphics gc) {
  if (img!=null) { paint(gc); }
  }


  void maleFeld (Matrix maleF) {
//  Graphics gc = getGraphics();
  imggc.setColor(Color.lightGray);
  for (int i=0; i<(maleF.dimX); i++) {
    for (int j=0; j<(maleF.dimY); j++) {
      if (maleF.Elem[i][j] == -1) {
        imggc.fillRect(maleF.UrspX+i*(maleF.BildW+maleF.Rand),
           maleF.UrspY+j*(maleF.BildH+maleF.Rand),
           maleF.BildW, maleF.BildH);//;, false);

      }
      else {
        imggc.drawImage(Bilder[maleF.Elem[i][j]],
           maleF.UrspX+i*(maleF.BildW+maleF.Rand),
           maleF.UrspY+j*(maleF.BildH+maleF.Rand),
           maleF.BildW, maleF.BildH, this);
      }
    }
  }
  } // Ende maleFeld




  void malen (Graphics gc) {
  imggc.setColor(Color.white);
  imggc.fillRect( 0, 0, width, height);
  for (int i=0; i<(AnzFelder); i++) {
    maleFeld(Felder[i]);
  }
  if (dragnr != -1) {
    imggc.setColor(Color.red);
    imggc.drawImage(Bilder[dragnr], dragx, dragy,
       Felder[merkeFN].BildW, Felder[merkeFN].BildH, this);
  }
  gc.drawImage(img,0,0,theapplet);
  } // Ende malen




  public boolean TesteFFrei (Matrix testF, int px, int py, boolean frei) {
  // Teste ob px,py im Feld mit Wert uebereinstimmen
  // falls ja, dann merke FeldNr und Koord und gebe true zurueck
  int posx = testF.UrspX;
  int posy = testF.UrspY;
  int i = -1;
  int j = -1;
  boolean aktion = false;

  if ( (px >= posx) && (py >= posy) ) {
    i = 0;
    j = 0;
    while ( ((posx+testF.BildW) <= px) && (i<testF.dimX) ) {
      posx = posx+testF.BildW+testF.Rand; i++;
    }
    if (i>=testF.dimX) {
      i = -1;
    }
    while ( ((posy+testF.BildH) <= py) && (j<testF.dimY) ) {
      posy = posy+testF.BildH+testF.Rand; j++;
    }
    if (j>=testF.dimY) {
      j = -1;
    }
  }
  if ( (i>=0)&&(j>=0) ) {
    if ( (posx < px) && (px <=posx+testF.BildW) &&
       (posy < py) && (py <=posy+testF.BildH) &&
       ( (testF.Elem[i][j]<0) == frei ) ) {
      merkeFi = i;
      merkeFj = j;
      aktion = true;
    }
  }
  return aktion;
  } // Ende TesteFrei



  class meinMML extends MouseMotionAdapter {

  public void mouseDragged( MouseEvent me ) {
  if (dragnr == -1) { // ehem. MouseDown
    int mx = me.getX();
    int my = me.getY();
    merkeFN = -1;
    merkeFi = -1;
    merkeFj = -1;
    vx = 0;
    vy = 0;
    boolean inFeld = false;
    for (int i=0; i<(AnzFelder); i++) {
      if ( !Felder[i].fix ) {
        if ( TesteFFrei (Felder[i], mx, my, false) ) {
          merkeFN = i;
        }
      }
    }
    if ( merkeFN != -1 ) {
      dragnr = Felder[merkeFN].Elem[merkeFi][merkeFj];
      Felder[merkeFN].Elem[merkeFi][merkeFj] = -1;
      dragx= Felder[merkeFN].UrspX+merkeFi*(Felder[merkeFN].BildW+Felder[merkeFN].Rand);
      dragy= Felder[merkeFN].UrspY+merkeFj*(Felder[merkeFN].BildH+Felder[merkeFN].Rand);
      vx = mx-dragx;
      vy = my-dragy;
      repaint();
    }
  }
  if (dragnr != -1) { // ehem. MouseMove
    int mx = me.getX();
    int my = me.getY();
    dragx = mx-vx;
    dragy = my-vy;
    if ( dragx < 0 ){
      dragx = 0;
    }
    if ( dragx > (width-Felder[merkeFN].BildW) ) {
      dragx = width-Felder[merkeFN].BildW;
    }
    if ( dragy < 0 ){
      dragy = 0;
    }
    if ( dragy > (height-Felder[merkeFN].BildH) ) {
      dragy = height-Felder[merkeFN].BildH;
    }
    repaint();
  }
  } // Ende MouseDragged

  } // Ende meinMML


  class meinMA extends MouseAdapter {

  public void mouseReleased( MouseEvent me ) {
  if (dragnr != -1) {
    int mx = me.getX();
    int my = me.getY();
    for (int i=0; i<(AnzFelder); i++) {
      if ( TesteFFrei (Felder[i], mx, my, true) ) {
        merkeFN = i;
      }
    }
    Felder[merkeFN].Elem[merkeFi][merkeFj] = dragnr;
    dragnr = -1;
    dragx= -1;
    dragy= -1;
    vx = 0;
    vy = 0;
    repaint();
  }
  } // Ende mouseReleased

  } // Ende meinMA


} // Mitte

} // class Puzzle
