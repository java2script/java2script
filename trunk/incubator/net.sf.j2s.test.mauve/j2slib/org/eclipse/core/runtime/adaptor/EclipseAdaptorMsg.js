Clazz.declarePackage ("org.eclipse.core.runtime.adaptor");
Clazz.load (["org.eclipse.osgi.util.NLS"], "org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg", ["java.lang.IllegalArgumentException", "$.StringBuffer", "$.Thread", "java.util.Date"], function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.adaptor, "EclipseAdaptorMsg", org.eclipse.osgi.util.NLS);
c$.getResolutionFailureMessage = Clazz.defineMethod (c$, "getResolutionFailureMessage", 
function (unsatisfied) {
if (unsatisfied.isResolved ()) throw  new IllegalArgumentException ();
if (Clazz.instanceOf (unsatisfied, org.eclipse.osgi.service.resolver.ImportPackageSpecification)) return org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_MISSING_IMPORTED_PACKAGE, org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.toString (unsatisfied));
 else if (Clazz.instanceOf (unsatisfied, org.eclipse.osgi.service.resolver.BundleSpecification)) if ((unsatisfied).isOptional ()) return org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_MISSING_OPTIONAL_REQUIRED_BUNDLE, org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.toString (unsatisfied));
 else return org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_MISSING_REQUIRED_BUNDLE, org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.toString (unsatisfied));
 else return org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_MISSING_HOST, org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.toString (unsatisfied));
}, "org.eclipse.osgi.service.resolver.VersionConstraint");
c$.debug = Clazz.defineMethod (c$, "debug", 
function (message) {
var buffer =  new StringBuffer ();
buffer.append ( new java.util.Date (System.currentTimeMillis ()));
buffer.append (" - [");
buffer.append (Thread.currentThread ().getName ());
buffer.append ("] ");
buffer.append (message);
System.out.println (buffer.toString ());
}, "~S");
c$.toString = Clazz.defineMethod (c$, "toString", 
($fz = function (constraint) {
var versionRange = constraint.getVersionRange ();
if (versionRange == null) return constraint.getName ();
return constraint.getName () + '_' + versionRange;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.VersionConstraint");
Clazz.defineStatics (c$,
"BUNDLE_NAME", "org.eclipse.core.runtime.adaptor.EclipseAdaptorMessages",
"ECLIPSE_MISSING_IMPORTED_PACKAGE", null,
"ECLIPSE_MISSING_OPTIONAL_REQUIRED_BUNDLE", null,
"ECLIPSE_MISSING_REQUIRED_BUNDLE", null,
"ECLIPSE_MISSING_HOST", null,
"ECLIPSE_CANNOT_CHANGE_LOCATION", null,
"ECLIPSE_BUNDLESTOPPER_CYCLES_FOUND", null,
"ECLIPSE_BUNDLESTOPPER_ERROR_STOPPING_BUNDLE", null,
"ECLIPSE_CACHEDMANIFEST_UNEXPECTED_EXCEPTION", null,
"fileManager_cannotLock", null,
"fileManager_couldNotSave", null,
"fileManager_updateFailed", null,
"fileManager_illegalInReadOnlyMode", null,
"fileManager_notOpen", null,
"ECLIPSE_ADAPTOR_ERROR_XML_SERVICE", null,
"ECLIPSE_ADAPTOR_RUNTIME_ERROR", null,
"ECLIPSE_ADAPTOR_EXITING", null,
"ECLIPSE_DATA_MANIFEST_NOT_FOUND", null,
"ECLIPSE_CONVERTER_ERROR_CONVERTING", null,
"ECLIPSE_DATA_ERROR_READING_MANIFEST", null,
"ECLIPSE_CLASSLOADER_CANNOT_GET_HEADERS", null,
"ECLIPSE_CLASSLOADER_CONCURRENT_STARTUP", null,
"ECLIPSE_CLASSLOADER_ACTIVATION", null,
"ECLIPSE_CLASSLOADER_ALREADY_STOPPED", null,
"ECLIPSE_CLASSLOADER_GENERATED_EXCEPTION", null,
"ECLIPSE_CLASSLOADER_CANNOT_SET_CONTEXTFINDER", null,
"ECLIPSE_CONSOLE_COMMANDS_HEADER", null,
"ECLIPSE_CONSOLE_HELP_DIAG_COMMAND_DESCRIPTION", null,
"ECLIPSE_CONSOLE_HELP_ACTIVE_COMMAND_DESCRIPTION", null,
"ECLIPSE_CONSOLE_HELP_GETPROP_COMMAND_DESCRIPTION", null,
"ECLIPSE_CONSOLE_NO_BUNDLE_SPECIFIED_ERROR", null,
"ECLIPSE_CONSOLE_NO_CONSTRAINTS_NO_PLATFORM_ADMIN_MESSAGE", null,
"ECLIPSE_CONSOLE_CANNOT_FIND_BUNDLE_ERROR", null,
"ECLIPSE_CONSOLE_NO_CONSTRAINTS", null,
"ECLIPSE_CONSOLE_OTHER_VERSION", null,
"ECLIPSE_CONSOLE_BUNDLES_ACTIVE", null,
"ECLIPSE_STARTUP_ALREADY_RUNNING", null,
"ECLIPSE_STARTUP_STARTUP_ERROR", null,
"ECLIPSE_STARTUP_SHUTDOWN_ERROR", null,
"ECLIPSE_STARTUP_ERROR_CHECK_LOG", null,
"ECLIPSE_STARTUP_NOT_RUNNING", null,
"ECLIPSE_STARTUP_ERROR_NO_APPLICATION", null,
"ECLIPSE_STARTUP_ERROR_BUNDLE_NOT_ACTIVE", null,
"ECLIPSE_STARTUP_ERROR_BUNDLE_NOT_RESOLVED", null,
"ECLIPSE_STARTUP_BUNDLE_NOT_FOUND", null,
"ECLIPSE_STARTUP_INVALID_PORT", null,
"ECLIPSE_STARTUP_FAILED_FIND", null,
"ECLIPSE_STARTUP_FAILED_UNINSTALL", null,
"ECLIPSE_STARTUP_FAILED_INSTALL", null,
"ECLIPSE_STARTUP_FAILED_START", null,
"ECLIPSE_STARTUP_APP_ERROR", null,
"ECLIPSE_STARTUP_FILEMANAGER_OPEN_ERROR", null,
"error_badNL", null,
"location_cannotLock", null,
"location_cannotLockNIO", null,
"ECLIPSE_CONVERTER_FILENOTFOUND", null,
"ECLIPSE_CONVERTER_ERROR_CREATING_BUNDLE_MANIFEST", null,
"ECLIPSE_CONVERTER_PLUGIN_LIBRARY_IGNORED", null,
"ECLIPSE_CONVERTER_ERROR_PARSING_PLUGIN_MANIFEST", null,
"ECLIPSE_CONVERTER_MISSING_ATTRIBUTE", null,
"parse_error", null,
"parse_errorNameLineColumn", null,
"ECLIPSE_CONVERTER_NO_SAX_FACTORY", null,
"ECLIPSE_CONVERTER_PARSE_UNKNOWNTOP_ELEMENT", null);
c$.NEW_LINE = c$.prototype.NEW_LINE = System.getProperty ("line.separator", "\n");
{
org.eclipse.osgi.util.NLS.initializeMessages ("org.eclipse.core.runtime.adaptor.EclipseAdaptorMessages", org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg);
}});
