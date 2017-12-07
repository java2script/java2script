// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.components;


/**
 * Base class for Swing drag listeners that perform sim-sharing data collection.
 * Sends messages on startDrag, endDrag, and (optionally) on drag.
 * <p>
 * Can be customized in 3 ways:
 * 1. Override getParametersForAllEvents to augment or replace the standard parameters for all events.
 * 2. Override the get*Parameters methods to augment or replace the standard parameters for specific.
 * 3. Call set*Function methods to replace the functions invoked for specific events.
 * <p>
 * Client usage: Be sure to add this using both addMouseListener and addMouseMotionListener,
 * so that you get all drag-related events, and an accurate summary of drag points in the
 * endDrag message.
 * </p>
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class SimSharingDragListener {//extends MouseAdapter implements MouseMotionListener {
//
//    public interface DragFunction {
//        public void apply( IUserComponent userComponent, IUserComponentType componentType, IUserAction action, ParameterSet parameters, MouseEvent event );
//    }
//
//    protected final IUserComponent userComponent;
//    private final IUserComponentType componentType;
//    private final SimSharingDragPoints dragPoints; // mouse coordinates, accumulated during a drag sequence
//    private DragFunction startDragFunction, dragFunction, endDragFunction; // functions called for various events
//
//    // Sends a message on startDrag and endDrag, but not drag
//    public SimSharingDragListener( IUserComponent userComponent, IUserComponentType componentType ) {
//        this( userComponent, componentType, false );
//    }
//
//    // Sends a message on drag if reportDrag=true
//    public SimSharingDragListener( IUserComponent userComponent, IUserComponentType componentType, final boolean sendDragMessages ) {
//
//        this.userComponent = userComponent;
//        this.componentType = componentType;
//        this.dragPoints = new SimSharingDragPoints();
//
//        // default functions
//        this.startDragFunction = new DragFunction() {
//            public void apply( IUserComponent userComponent, IUserComponentType componentType, IUserAction action, ParameterSet parameterSet, MouseEvent event ) {
//                SimSharingManager.sendUserMessage( userComponent, componentType, action, parameterSet );
//            }
//        };
//        this.dragFunction = new DragFunction() {
//            public void apply( IUserComponent userComponent, IUserComponentType componentType, IUserAction action, ParameterSet parameterSet, MouseEvent event ) {
//                if ( sendDragMessages ) {
//                    SimSharingManager.sendUserMessage( userComponent, componentType, action, parameterSet );
//                }
//            }
//        };
//        this.endDragFunction = new DragFunction() {
//            public void apply( IUserComponent userComponent, IUserComponentType componentType, IUserAction action, ParameterSet parameterSet, MouseEvent event ) {
//                SimSharingManager.sendUserMessage( userComponent, componentType, action, parameterSet );
//            }
//        };
//    }
//
//    @Override public void mousePressed( MouseEvent event ) {
//        clearDragPoints();
//        addDragPoint( event );
//        startDragFunction.apply( userComponent, componentType, UserActions.startDrag, getStartDragParameters( event ), event );
//        super.mousePressed( event );
//    }
//
//    @Override public void mouseReleased( MouseEvent event ) {
//        addDragPoint( event );
//        endDragFunction.apply( userComponent, componentType, UserActions.endDrag, getEndDragParameters( event ), event );
//        clearDragPoints();
//        super.mouseReleased( event );
//    }
//
//    // This was added to MouseAdapter in 1.6, but we need to implement MouseMotionListener for 1.5 compatibility
//    public void mouseDragged( MouseEvent event ) {
//        addDragPoint( event );
//        dragFunction.apply( userComponent, componentType, UserActions.drag, getDragParameters( event ), event );
//    }
//
//    // This was added to MouseAdapter in 1.6, but we need to implement MouseMotionListener for 1.5 compatibility
//    public void mouseMoved( MouseEvent event ) {}
//
//    // Call this to replace the sim-sharing function that is called on startDrag.
//    public void setStartDragFunction( DragFunction f ) {
//        startDragFunction = f;
//    }
//
//    // Call this to replace the sim-sharing function that is called on drag.
//    public void setDragFunction( DragFunction f ) {
//        dragFunction = f;
//    }
//
//    // Call this to replace the sim-sharing function that is called on endDrag.
//    public void setEndDragFunction( DragFunction f ) {
//        endDragFunction = f;
//    }
//
//    // Override to supply any additional parameters to send on startDrag
//    protected ParameterSet getStartDragParameters( MouseEvent event ) {
//        return getParametersForAllEvents( event );
//    }
//
//    // Override to supply any additional parameters to send on drag
//    protected ParameterSet getDragParameters( MouseEvent event ) {
//        return getParametersForAllEvents( event );
//    }
//
//    // Override to supply any additional parameters to send on endDrag
//    protected ParameterSet getEndDragParameters( MouseEvent event ) {
//        return getParametersForAllEvents( event ).with( dragPoints.getParameters() ); // includes summary of drag points
//    }
//
//    // Return parameters that are used by default for all events
//    protected ParameterSet getParametersForAllEvents( MouseEvent event ) {
//        return new ParameterSet().with( getXParameter( event ) ).with( getYParameter( event ) );
//    }
//
//    private void addDragPoint( MouseEvent event ) {
//        dragPoints.add( getPosition( event ) );
//    }
//
//    private void clearDragPoints() {
//        dragPoints.clear();
//    }
//
//    private static Parameter getXParameter( MouseEvent event ) {
//        return new Parameter( ParameterKeys.x, getPosition( event ).getX() );
//    }
//
//    private static Parameter getYParameter( MouseEvent event ) {
//        return new Parameter( ParameterKeys.y, getPosition( event ).getY() );
//    }
//
//    // Gets the interpretation of the position used throughout this class.
//    private static Point2D getPosition( MouseEvent event ) {
//        return event.getPoint();
//    }
}
