package edu.stonybrook.eserc.projectjava.chemicalcharge;

//create a class that will be the type object for the cation and anion arrays
public class Ion  {
	// declare variables
    private String name;
    private String symbol;
    private int charge;

	//constructor, local variables
    public Ion (String n, String s, int c)	{
	name = n;
	symbol = s;
	charge = c;
    }

	//methods that get or return the instance of these private variables
    public String getName () 	{
	return name;
    }

    public String getSymbol ()	{
	return symbol;
    }
  
    public int getCharge ()	{
	return charge;
    }

     public String toString ()    {
         return name;
     }
}
