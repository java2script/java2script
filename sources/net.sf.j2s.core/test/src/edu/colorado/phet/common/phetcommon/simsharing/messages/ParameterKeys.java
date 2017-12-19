// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.messages;

/**
 * @author Sam Reid
 */
public enum ParameterKeys implements IParameterKey {
    canvasPositionX, canvasPositionY, componentType, description, height, interactive, item,
    isSelected, key, part, text, title, value, width, window, x, y, z, type,
    angle,
    enabled,
    minX, maxX, averageX, minY, maxY, averageY,
    isPlaying,
    selectedKit,

    //For system:
    time, name, version, project, flavor, locale, distributionTag, javaVersion, osName, osVersion,
    parserVersion, study, id, machineCookie, messageCount, messageIndex, sessionId, commandLineArgs,

    errorMessage,
    //For drag events
    numberDragEvents, minValue, maxValue, averageValue,

    correctedValue,
    ipAddress,
    mountainTime,
    errorType,
    commitAction,
    x2, y2, wavelength
}
