// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.dialogs;

import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents.aboutDialogCloseButton;

import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Frame;
import java.awt.HeadlessException;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSeparator;

import edu.colorado.phet.common.phetcommon.application.ISimInfo;
import edu.colorado.phet.common.phetcommon.application.PaintImmediateDialog;
import edu.colorado.phet.common.phetcommon.application.PhetApplication;
import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;
import edu.colorado.phet.common.phetcommon.simsharing.components.SimSharingJButton;
import edu.colorado.phet.common.phetcommon.view.VerticalLayoutPanel;
import edu.colorado.phet.common.phetcommon.view.util.SwingUtils;
//import edu.colorado.phet.common.phetcommon.view.util.HTMLUtils;

public class PhetAboutDialog extends PaintImmediateDialog {

//    // Copyright notice, not translated so no one messes with it, and so that we can easily change the date.
//    private static final String COPYRIGHT_HTML_FRAGMENT =
//            "<b>PhET Interactive Simulations</b><br>" +
//            "Copyright &copy; 2004-2015 University of Colorado.<br>" +
//            "<a href=" + PhetCommonConstants.PHET_LICENSE_URL + ">Some rights reserved.</a><br>" +
//            "Visit " + HTMLUtils.getPhetHomeHref();
//
    // translated strings
    private static final String TITLE = PhetCommonResources.getString( "Common.HelpMenu.AboutTitle" );
//    private static final String LOGO_TOOLTIP = PhetCommonResources.getString( "Common.About.WebLink" );
    private static final String SIM_VERSION = PhetCommonResources.getString( "Common.About.Version" );
    private static final String BUILD_DATE = PhetCommonResources.getString( "Common.About.BuildDate" );
    private static final String DISTRIBUTION = PhetCommonResources.getString( "Common.About.Distribution" );
    private static final String JAVA_VERSION = PhetCommonResources.getString( "Common.About.JavaVersion" );
    private static final String OS_VERSION = PhetCommonResources.getString( "Common.About.OSVersion" );
//    private static final String CREDITS_BUTTON = PhetCommonResources.getString( "Common.About.CreditsButton" );
    private static final String CLOSE_BUTTON = PhetCommonResources.getString( "Common.choice.close" );

//    private final ISimInfo config;

    /**
     * Constructs the dialog.
     *
     * @param phetApplication
     * @throws HeadlessException
     */
    public PhetAboutDialog( PhetApplication phetApplication ) {
        this( phetApplication.getPhetFrame(), phetApplication.getSimInfo() );
    }

    /**
     * Constructs a dialog.
     *
     * @param config
     * @param owner
     */
    protected PhetAboutDialog( Frame owner, ISimInfo config ) {
        super( owner );
        setResizable( false );

//        this.config = config;

        String titleString = config.getName();
        setTitle( TITLE + " " + titleString );

//        JPanel logoPanel = createLogoPanel();
        JPanel infoPanel = createInfoPanel( config );
        JPanel buttonPanel = createButtonPanel( config.isStatisticsFeatureIncluded() );

        VerticalLayoutPanel contentPanel = new VerticalLayoutPanel();
        contentPanel.setFillHorizontal();
  //      contentPanel.add( logoPanel );
  //      contentPanel.add( new JSeparator() );
        contentPanel.add( infoPanel );
        contentPanel.add( new JSeparator() );
        contentPanel.add( buttonPanel );
        setContentPane( contentPanel );

        pack();
        SwingUtils.centerDialogInParent( this );
    }

//    /*
//     * Creates the panel that contains the logo and general copyright info.
//     */
//    private JPanel createLogoPanel() {
//
//        BufferedImage image = PhetCommonResources.getInstance().getImage( PhetLookAndFeel.PHET_LOGO_120x50 );
//        JLabel logoLabel = new JLabel( new ImageIcon( image ) );
//        logoLabel.setCursor( Cursor.getPredefinedCursor( Cursor.HAND_CURSOR ) );
//        logoLabel.setToolTipText( LOGO_TOOLTIP );
//        logoLabel.addMouseListener( new MouseInputAdapter() {
//            public void mouseReleased( MouseEvent e ) {
//                PhetServiceManager.showPhetPage();
//            }
//        } );
//
//        String html = HTMLUtils.createStyledHTMLFromFragment( COPYRIGHT_HTML_FRAGMENT );
//        InteractiveHTMLPane pane = new InteractiveHTMLPane( html );
//        pane.setBackground( new JPanel().getBackground() );//see #1275
//
//        HorizontalLayoutPanel logoPanel = new HorizontalLayoutPanel();
//        logoPanel.setInsets( new Insets( 10, 10, 10, 10 ) ); // top,left,bottom,right
//        logoPanel.add( logoLabel );
//        logoPanel.add( pane );
//
//        return logoPanel;
//    }

    /*
     * Creates the panel that displays info specific to the simulation.
     */
    private JPanel createInfoPanel( ISimInfo config ) {

        String titleString = config.getName();
        String versionString = config.getVersion().formatForAboutDialog();
        String buildDate = config.getVersion().formatTimestamp();
        String distributionTag = config.getDistributionTag();

        VerticalLayoutPanel infoPanel = new VerticalLayoutPanel();

        // Simulation title
        JLabel titleLabel = new JLabel( titleString );
        Font f = titleLabel.getFont();
        titleLabel.setFont( new Font( f.getFontName(), Font.BOLD, f.getSize() ) );

        // Simulation version
        JLabel versionLabel = new JLabel( SIM_VERSION + " " + versionString );

        // Build date
        JLabel buildDateLabel = new JLabel( BUILD_DATE + " " + buildDate );

        // Distribution tag (optional)
        JLabel distributionTagLabel = null;
        if ( distributionTag != null && distributionTag.length() > 0 ) {
            distributionTagLabel = new JLabel( DISTRIBUTION + " " + distributionTag );
        }

        // Java runtime version
        String javaVersionString = JAVA_VERSION + " " + System.getProperty( "java.version" );
        JLabel javaVersionLabel = new JLabel( javaVersionString );

        // OS version
        String osVersion = OS_VERSION + " " + System.getProperty( "os.name" ) + " " + System.getProperty( "os.version" );
        JLabel osVersionLabel = new JLabel( osVersion );

        // layout
        int xMargin = 10;
        int ySpacing = 10;
        infoPanel.setInsets( new Insets( 0, xMargin, 0, xMargin ) ); // top,left,bottom,right
        infoPanel.add( Box.createVerticalStrut( ySpacing ) );
        infoPanel.add( titleLabel );
        infoPanel.add( Box.createVerticalStrut( ySpacing ) );
        infoPanel.add( versionLabel );
        infoPanel.add( buildDateLabel );
        if ( distributionTagLabel != null ) {
            infoPanel.add( distributionTagLabel );
        }
        infoPanel.add( Box.createVerticalStrut( ySpacing ) );
        infoPanel.add( javaVersionLabel );
        infoPanel.add( osVersionLabel );
        infoPanel.add( Box.createVerticalStrut( ySpacing ) );

        return infoPanel;
    }

    /*
    * Create the panel that contains the buttons.
    * The Credits button is added only if a credits file exists.
    */
    private JPanel createButtonPanel( boolean isStatisticsFeatureIncluded ) {

//        // Software Use Agreement
//        JButton agreementButton = new SoftwareAgreementButton( this );

//        // Credits
//        JButton creditsButton = new SimSharingJButton( aboutDialogCreditsButton, CREDITS_BUTTON );
//        creditsButton.addActionListener( new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                showCredits();
//            }
//        } );

        // Close
        JButton closeButton = new SimSharingJButton( aboutDialogCloseButton, CLOSE_BUTTON );
        getRootPane().setDefaultButton( closeButton );
        closeButton.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                dispose();
            }
        } );

        // layout
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout( new FlowLayout() );
//        buttonPanel.add( agreementButton );
//        buttonPanel.add( creditsButton );
        buttonPanel.add( closeButton );

        return buttonPanel;
    }

    protected void showCredits() {
//        new CreditsDialog( this, config.getProjectName() ).setVisible( true );
    }
}
