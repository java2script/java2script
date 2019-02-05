package java.awt;

public interface MenuComponent {

    public void addFocusListener(java.awt.event.FocusListener l);

	public boolean contains(Point p);

	public void dispatchEvent(AWTEvent e);

	public Color getBackground();

	public Rectangle getBounds();

	public Cursor getCursor();

	public FontMetrics getFontMetrics(Font f);

	public Color getForeground();

	public java.util.Locale getLocale();

	public Point getLocation();

	public Point getLocationOnScreen();

	public String getName();

//	public MenuContainer getParent();

	public Dimension getSize();

	public boolean isEnabled();

	public boolean isFocusTraversable();

	public boolean isShowing();

	public boolean isVisible();

	public void removeFocusListener(java.awt.event.FocusListener l);

	public void removeNotify();

	public void requestFocus();

	public void setBackground(Color c);

	public void setBounds(Rectangle r);

	public void setCursor(Cursor cursor);

	public void setEnabled(boolean b);

	public void setFont(Font f);

	public void setForeground(Color c);

	public void setLocation(Point p);

	public void setName(String name);

	public void setSize(Dimension d);

	public void setVisible(boolean b);

	// original MenuContainer
    Font getFont();

    @Deprecated
    boolean postEvent(Event evt);

    void remove(MenuComponent comp);



}
