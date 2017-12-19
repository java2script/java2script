// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */

package edu.colorado.phet.common.phetcommon.application;


/**
 * AWTSplashWindow is a splash window based on AWT, that allows
 * us to show some animation outside of the event dispatch thread.
 * <p/>
 * To overcome some deadlock problems at startup, we've started using
 * SwingUtilities.invokeLater to do all of our initialization of PhET
 * sims. An unfortunate consequence of this is that an indeterminate
 * progress bar will not animate in the event dispatch thread.
 * AWTSplashWindow does an animation that is similar to an
 * indeterminate progress bar, but does its painting in its
 * own thread.
 *
 * @author Sam Reid
 * @version $Revision: 54200 $
 */
public class AWTSplashWindow {//extends Window {
//
//    private Color backgroundColor = Color.white;
//
//    private static final String LOGO_RESOURCE_NAME = PhetLookAndFeel.PHET_LOGO_120x50;
//
//    private boolean done = false; // flag that tells the animation thread to stop
//    private Panel panel; // panel that contains all the UI components
//    private AnimationComponent animationComponent;
//    private ImageComponent textComponent;
//    private String labelString;
//
//    /**
//     * Constructor.
//     *
//     * @param owner the Frame to act as owner
//     * @param title title of the simulation, will be inserted into a standard message format
//     */
//    public AWTSplashWindow( Frame owner, String title ) {
//        super( owner );
//
//        addMouseListener( new MouseAdapter() {
//            public void mousePressed( MouseEvent e ) {
//                hide();
//            }
//        } );
//        setCursor( Cursor.getPredefinedCursor( Cursor.WAIT_CURSOR ) );
//
//        // UI components
//        String message = PhetCommonResources.getInstance().getLocalizedString( "PhetApplication.StartupDialog.message" );
//        labelString = MessageFormat.format( message, new Object[] { title } );
//        BufferedImage image = getLogoImage();
//        Component imageComponent = new ImageComponent( image ) {
//            public void paint( Graphics g ) {
//                super.paint( g );
//                drawBorder( this, g );
//            }
//        };
////        textComponent = new Label( labelString );
//        textComponent = new ImageComponent( createLabelImage( labelString, backgroundColor, Color.black ) );
//        animationComponent = new AnimationComponent();
//
//        // Panel to hold all of the components
//        panel = new Panel( new GridBagLayout() ) {
//            public void paint( Graphics g ) {
//                super.paint( g );
//                drawBorder( this, g );
//            }
//
//            /**
//             * This is necessary to reduce flicker.
//             *
//             * @param g
//             */
//            public void update( Graphics g ) {
//                if ( g != null ) {
//                    paint( g );
//                }
//            }
//        };
//
//        // Layout
//        final GridBagConstraints gbc = new GridBagConstraints( 0, 0, 1, 1, 1, 1,
//                                                               GridBagConstraints.CENTER, GridBagConstraints.NONE, new Insets( 0, 20, 0, 10 ), 0, 0 );
//        add( panel );
//        gbc.gridheight = 2;
//        panel.add( imageComponent, gbc );
//        gbc.gridx = 1;
//        gbc.gridheight = 1;
//        gbc.insets = new Insets( 20, 10, 10, 20 );
//        panel.add( textComponent, gbc );
//        gbc.gridy++;
//        gbc.fill = GridBagConstraints.REMAINDER;
//        gbc.insets = new Insets( 10, 10, 20, 20 );
//        panel.add( animationComponent, gbc );
//
//        // Paint in a separate thread.
//        // We need to paint the entire panel or some things don't paint.
//        startPaintThread( panel );
//
//        // Set the background color
//        setBackground( backgroundColor );
//
//        invalidate();
//        pack();
//        SwingUtils.centerWindowOnScreen( this );
//    }
//
//    /* Creates an image used to render the text "TITLE is starting up"
//     * This workaround is necessary because peered AWT components can only use logical fonts.
//     */
//    private Image createLabelImage( String labelString, Color background, Color foreground ) {
//        PhetFont font = new PhetFont( 13, false );
//        final TextLayout textLayout = new TextLayout( labelString, font, new FontRenderContext( new AffineTransform(), true, false ) );
//        Rectangle2D bounds = textLayout.getBounds();
//        BufferedImage bufferedImage = new BufferedImage( (int) Math.ceil( bounds.getWidth() ) + 2, (int) Math.ceil( bounds.getHeight() ) + 2, BufferedImage.TYPE_INT_RGB );
//
//        Graphics2D g2 = bufferedImage.createGraphics();
//        g2.setRenderingHint( RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON );
//        g2.setColor( background );
//        g2.fillRect( 0, 0, bufferedImage.getWidth(), bufferedImage.getHeight() );
//        g2.setColor( foreground );
//        g2.setFont( font );
//        textLayout.draw( g2, 0, textLayout.getAscent() - textLayout.getDescent() - textLayout.getLeading() + 1 );
//        return bufferedImage;
//    }
//
//    /*
//     * Gets the PhET logo image.
//     */
//    private static BufferedImage getLogoImage() {
//        return PhetCommonResources.getInstance().getImage( LOGO_RESOURCE_NAME );
//    }
//
//    /**
//     * Hides the window and stops the animation.
//     */
//    public void hide() {
//        super.hide();
//        done = true; // stop the animation
//    }
//
//    /**
//     * Sets the background color for the window and main panel.
//     *
//     * @param color
//     */
//    public void setBackground( Color color ) {
//        this.backgroundColor = color;
//        super.setBackground( color );
//        panel.setBackground( color );
//        textComponent.setBackground( color );
//        textComponent.setImage( createLabelImage( labelString, backgroundColor, Color.black ) );
//    }
//
//    /*
//     * Paints a component in a separate thread.
//     */
//    private void startPaintThread( final Component component ) {
//        Thread t = new Thread( new Runnable() {
//            public void run() {
//                while ( !done ) {
//                    try {
//                        Thread.sleep( 30 );
//                        component.invalidate();
//                        component.repaint();
//                        component.update( component.getGraphics() );
//                    }
//                    catch ( InterruptedException e ) {
//                        e.printStackTrace();
//                    }
//                }
//            }
//        } );
//        t.start();
//    }
//
//    /*
//     * Draws a 1-pixel border around a Component.
//     */
//    private static void drawBorder( Component component, Graphics g ) {
//        g.setColor( Color.black );
//        g.drawRect( 0, 0, component.getWidth() - 1, component.getHeight() - 1 );
//    }
//
//    /*
//     * AWT component that provides something similar to Swing's indeterminate progress bar.
//     * A black "block" moves sinusoidally in a "track".
//     */
//    private static class AnimationComponent extends Component {
//
//        private static final int BLOCK_WIDTH = 20;
//        private static final int BLOCK_HEIGHT = 14;
//        private static final Color BLOCK_COLOR = Color.BLACK;
//
//        private static final int TRACK_WIDTH = 250;
//        private static final int TRACK_HEIGHT = BLOCK_HEIGHT;
//        private static final Color TRACK_COLOR = Color.LIGHT_GRAY;
//
//        private static final double FREQUENCY = 0.25; // Hz
//        private Image buffer = null;
//
//        public AnimationComponent() {
//        }
//
//        public Dimension getPreferredSize() {
//            return getMinimumSize();
//        }
//
//        public Dimension getMinimumSize() {
//            return new Dimension( TRACK_WIDTH, TRACK_HEIGHT );
//        }
//
//        public void update( Graphics g ) {
//            paint( g );
//        }
//
//        public void paint( Graphics g ) {
//            if ( g == null ) {
//                return;
//            }
//
//            if ( buffer == null || buffer.getWidth( null ) != getWidth() || buffer.getHeight( null ) != getHeight() ) {
//                buffer = createImage( getWidth(), getHeight() );
//            }
//
//            Graphics bufferedGraphics = buffer.getGraphics();
//            bufferedGraphics.clearRect( 0, 0, getWidth(), getHeight() );
//            doPaint( bufferedGraphics );
//            g.drawImage( buffer, 0, 0, null );
//        }
//
//        private void doPaint( Graphics g ) {
//            g.setColor( TRACK_COLOR );
//            g.fillRect( 0, 0, getWidth(), getHeight() );
//            g.setColor( BLOCK_COLOR );
//            double angularfrequency = FREQUENCY * 2 * Math.PI;
//            int x = (int) ( Math.sin( System.currentTimeMillis() / 1000.0 * angularfrequency ) * getWidth() / 2.0 + getWidth() / 2.0 );
//            int a = x - BLOCK_WIDTH / 2;
//
//            g.fillRect( a, 0, BLOCK_WIDTH, BLOCK_HEIGHT );
//            g.drawRect( 0, 0, getWidth() - 1, getHeight() - 1 );
//        }
//    }
//
//    /*
//     * AWT component that draws an image.
//     */
//    private static class ImageComponent extends Component {
//        Image image;
//
//        public ImageComponent( Image image ) {
//            this.image = image;
//        }
//
//        public Dimension getMinimumSize() {
//            return new Dimension( image.getWidth( this ), image.getHeight( this ) );
//        }
//
//        public Dimension getPreferredSize() {
//            return getMinimumSize();
//        }
//
//        public void paint( Graphics g ) {
//            super.paint( g );
//            g.drawImage( image, 0, 0, this );
//        }
//
//        public void setImage( Image labelImage ) {
//            this.image = labelImage;
//        }
//    }
//
//    // Test harness
//    public static void main( String[] args ) throws InterruptedException, InvocationTargetException {
//        // Use invokeLater like we would in our simulation's main.
//        SwingUtilities.invokeLater( new Runnable() {
//            public void run() {
//                try {
//                    runTest();
//                }
//                catch ( Exception e ) {
//                    e.printStackTrace();
//                }
//            }
//        } );
//    }
//
//    private static void runTest() throws InterruptedException {
//        Frame owner = new Frame();
//        AWTSplashWindow awtSplashWindow = new AWTSplashWindow( owner, "Test AWTSplashWindow" );
////        awtSplashWindow.setBackground( new Color( 200, 240, 200 ) ); // light green
//        awtSplashWindow.show();
//        Thread.sleep( 5000 );
//        awtSplashWindow.hide();
//        owner.dispose(); // clean up the owner so the program exits
//    }
}
