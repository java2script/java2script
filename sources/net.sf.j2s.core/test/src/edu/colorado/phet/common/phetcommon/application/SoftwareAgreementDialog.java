// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.application;


/**
 * Displays the full text of PhET's Software Use Agreement.
 */
public class SoftwareAgreementDialog extends PaintImmediateDialog {
//
//    private static final Dimension PREFERRED_SIZE = new Dimension( 700, 400 );
//
//    private static final String TITLE = PhetCommonResources.getString( "Common.softwareAgreement.title" );
//    private static final String CLOSE_BUTTON = PhetCommonResources.getString( "Common.choice.close" );
//
//    public SoftwareAgreementDialog( Frame owner ) {
//        super( owner );
//        init();
//    }
//
//    public SoftwareAgreementDialog( Dialog owner ) {
//        super( owner );
//        init();
//    }
//
//    private void init() {
//
//        setTitle( TITLE );
//        setModal( true );
//        setResizable( true );
//
//        JComponent agreementPanel = createAgreementPanel();
//        JComponent buttonPanel = createButtonPanel();
//
//        JPanel panel = new JPanel( new BorderLayout() );
//        panel.setBorder( new EmptyBorder( 5, 5, 5, 5 ) );
//        panel.add( agreementPanel, BorderLayout.CENTER );
//        panel.add( buttonPanel, BorderLayout.SOUTH );
//        panel.setPreferredSize( PREFERRED_SIZE );
//
//        setContentPane( panel );
//        pack();
//        SwingUtils.centerDialogInParent( this );
//    }
//
//    protected JComponent createAgreementPanel() {
//
//        String html = HTMLUtils.createStyledHTMLFromFragment( SoftwareAgreement.getInstance().getContent() );
//        HTMLEditorPane htmlEditorPane = new HTMLUtils.InteractiveHTMLPane( html );
//
//        final HTMLEditorKit.HTMLFactory htmlFactory = new HTMLFactoryWithImages();
//
//        htmlEditorPane.setEditorKit( new HTMLEditorKit() {
//            public ViewFactory getViewFactory() {
//                return htmlFactory;
//            }
//        } );
//        htmlEditorPane.setText( html );
//        htmlEditorPane.setBackground( Color.WHITE );
//
//        JScrollPane scrollPane = new JScrollPane( htmlEditorPane );
//        scrollPane.setPreferredSize( new Dimension( scrollPane.getPreferredSize().width + 30, 300 ) );
//
//        // this ensures that the first line of text is at the top of the scrollpane
//        htmlEditorPane.setCaretPosition( 0 );
//
//        return scrollPane;
//    }
//
//    private JPanel createButtonPanel() {
//        JPanel panel = new JPanel();
//        JButton closeButton = new JButton( CLOSE_BUTTON );
//        closeButton.addActionListener( new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                dispose();
//            }
//        } );
//        panel.add( closeButton );
//        return panel;
//    }
//
//    //TODO: provide correct bounds for the image
//    private class HTMLTagImageView extends ImageView {
//        public HTMLTagImageView( Element elem ) {
//            super( elem );
//        }
//
//        public void paint( Graphics g, Shape a ) {
//            Rectangle rect = ( a instanceof Rectangle ) ? (Rectangle) a : a.getBounds();
//            String src = (String) getElement().getAttributes().getAttribute( HTML.Attribute.SRC );
//
//            Image image = new DefaultResourceLoader().getImage( src );
//            g.drawImage( image, rect.x, rect.y, image.getWidth( null ), image.getHeight( null ), null );
//        }
//    }
//
//    private class HTMLFactoryWithImages extends HTMLEditorKit.HTMLFactory {
//        public View create( Element elem ) {
//            Object nameAttribute = elem.getAttributes().getAttribute( StyleConstants.NameAttribute );
//            if ( nameAttribute instanceof HTML.Tag ) {
//                HTML.Tag htmlTag = (HTML.Tag) nameAttribute;
//                if ( htmlTag == HTML.Tag.IMG ) {
//                    return new HTMLTagImageView( elem );
//                }
//                else {
//                    return super.create( elem );
//                }
//            }
//            else {
//                return super.create( elem );
//            }
//        }
//    }
}
