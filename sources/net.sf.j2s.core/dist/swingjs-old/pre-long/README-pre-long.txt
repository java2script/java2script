This directory holds 3.2.9 transpiler and runtime tagged previous 
to the transpiler fix for boxed number direct manipulation:

Long L = Long.valueOf(3);
L++;
L /= 2;
L += 10;
L = L / 5;

etc. 

These assignments are not made properly and fail. 

In addition, this runtime does not handle Long properly and also had an issue with Short.equals(Object)

just saving this and will probably delete it. 

