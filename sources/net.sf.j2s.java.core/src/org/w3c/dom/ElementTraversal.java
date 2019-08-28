package org.w3c.dom;
//  (version 1.1 : 45.3, no super bit)
public abstract interface ElementTraversal {
  
  // Method descriptor #4 ()Lorg/w3c/dom/Element;
  public abstract Element getFirstElementChild();
  
  // Method descriptor #4 ()Lorg/w3c/dom/Element;
  public abstract Element getLastElementChild();
  
  // Method descriptor #4 ()Lorg/w3c/dom/Element;
  public abstract Element getPreviousElementSibling();
  
  // Method descriptor #4 ()Lorg/w3c/dom/Element;
  public abstract Element getNextElementSibling();
  
  // Method descriptor #9 ()I
  public abstract int getChildElementCount();
}