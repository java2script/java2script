Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (null, "org.eclipse.core.internal.runtime.AuthorizationHandler", ["java.io.File", "java.lang.IllegalStateException", "java.util.HashMap", "org.eclipse.core.internal.runtime.AuthorizationDatabase", "$.InternalPlatform", "$.Messages", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.runtime, "AuthorizationHandler");
c$.loadKeyring = Clazz.defineMethod (c$, "loadKeyring", 
($fz = function () {
if (org.eclipse.core.internal.runtime.AuthorizationHandler.keyring != null &&  new java.io.File (org.eclipse.core.internal.runtime.AuthorizationHandler.keyringFile).lastModified () == org.eclipse.core.internal.runtime.AuthorizationHandler.keyringTimeStamp) return ;
if (org.eclipse.core.internal.runtime.AuthorizationHandler.keyringFile == null) {
var file =  new java.io.File (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getConfigurationLocation ().getURL ().getPath () + '/' + "org.eclipse.core.runtime");
file =  new java.io.File (file, ".keyring");
($t$ = org.eclipse.core.internal.runtime.AuthorizationHandler.keyringFile = file.getAbsolutePath (), org.eclipse.core.internal.runtime.AuthorizationHandler.prototype.keyringFile = org.eclipse.core.internal.runtime.AuthorizationHandler.keyringFile, $t$);
}try {
($t$ = org.eclipse.core.internal.runtime.AuthorizationHandler.keyring =  new org.eclipse.core.internal.runtime.AuthorizationDatabase (org.eclipse.core.internal.runtime.AuthorizationHandler.keyringFile, org.eclipse.core.internal.runtime.AuthorizationHandler.password), org.eclipse.core.internal.runtime.AuthorizationHandler.prototype.keyring = org.eclipse.core.internal.runtime.AuthorizationHandler.keyring, $t$);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (e.getStatus ());
} else {
throw e;
}
}
if (org.eclipse.core.internal.runtime.AuthorizationHandler.keyring == null) {
 new java.io.File (org.eclipse.core.internal.runtime.AuthorizationHandler.keyringFile).$delete ();
($t$ = org.eclipse.core.internal.runtime.AuthorizationHandler.keyring =  new org.eclipse.core.internal.runtime.AuthorizationDatabase (org.eclipse.core.internal.runtime.AuthorizationHandler.keyringFile, org.eclipse.core.internal.runtime.AuthorizationHandler.password), org.eclipse.core.internal.runtime.AuthorizationHandler.prototype.keyring = org.eclipse.core.internal.runtime.AuthorizationHandler.keyring, $t$);
}($t$ = org.eclipse.core.internal.runtime.AuthorizationHandler.keyringTimeStamp =  new java.io.File (org.eclipse.core.internal.runtime.AuthorizationHandler.keyringFile).lastModified (), org.eclipse.core.internal.runtime.AuthorizationHandler.prototype.keyringTimeStamp = org.eclipse.core.internal.runtime.AuthorizationHandler.keyringTimeStamp, $t$);
}, $fz.isPrivate = true, $fz));
c$.addAuthorizationInfo = Clazz.defineMethod (c$, "addAuthorizationInfo", 
function (serverUrl, realm, authScheme, info) {
org.eclipse.core.internal.runtime.AuthorizationHandler.loadKeyring ();
org.eclipse.core.internal.runtime.AuthorizationHandler.keyring.addAuthorizationInfo (serverUrl, realm, authScheme,  new java.util.HashMap (info));
org.eclipse.core.internal.runtime.AuthorizationHandler.keyring.save ();
}, "java.net.URL,~S,~S,java.util.Map");
c$.addProtectionSpace = Clazz.defineMethod (c$, "addProtectionSpace", 
function (resourceUrl, realm) {
org.eclipse.core.internal.runtime.AuthorizationHandler.loadKeyring ();
org.eclipse.core.internal.runtime.AuthorizationHandler.keyring.addProtectionSpace (resourceUrl, realm);
org.eclipse.core.internal.runtime.AuthorizationHandler.keyring.save ();
}, "java.net.URL,~S");
c$.flushAuthorizationInfo = Clazz.defineMethod (c$, "flushAuthorizationInfo", 
function (serverUrl, realm, authScheme) {
org.eclipse.core.internal.runtime.AuthorizationHandler.loadKeyring ();
org.eclipse.core.internal.runtime.AuthorizationHandler.keyring.flushAuthorizationInfo (serverUrl, realm, authScheme);
org.eclipse.core.internal.runtime.AuthorizationHandler.keyring.save ();
}, "java.net.URL,~S,~S");
c$.getAuthorizationInfo = Clazz.defineMethod (c$, "getAuthorizationInfo", 
function (serverUrl, realm, authScheme) {
var info = null;
try {
org.eclipse.core.internal.runtime.AuthorizationHandler.loadKeyring ();
info = org.eclipse.core.internal.runtime.AuthorizationHandler.keyring.getAuthorizationInfo (serverUrl, realm, authScheme);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
return info == null ? null :  new java.util.HashMap (info);
}, "java.net.URL,~S,~S");
c$.getProtectionSpace = Clazz.defineMethod (c$, "getProtectionSpace", 
function (resourceUrl) {
try {
org.eclipse.core.internal.runtime.AuthorizationHandler.loadKeyring ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
return null;
} else {
throw e;
}
}
return org.eclipse.core.internal.runtime.AuthorizationHandler.keyring.getProtectionSpace (resourceUrl);
}, "java.net.URL");
c$.setKeyringFile = Clazz.defineMethod (c$, "setKeyringFile", 
function (file) {
if (org.eclipse.core.internal.runtime.AuthorizationHandler.keyringFile != null) throw  new IllegalStateException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_keyringFileAlreadySpecified, org.eclipse.core.internal.runtime.AuthorizationHandler.keyringFile));
($t$ = org.eclipse.core.internal.runtime.AuthorizationHandler.keyringFile = file, org.eclipse.core.internal.runtime.AuthorizationHandler.prototype.keyringFile = org.eclipse.core.internal.runtime.AuthorizationHandler.keyringFile, $t$);
}, "~S");
c$.setPassword = Clazz.defineMethod (c$, "setPassword", 
function (keyringPassword) {
($t$ = org.eclipse.core.internal.runtime.AuthorizationHandler.password = keyringPassword, org.eclipse.core.internal.runtime.AuthorizationHandler.prototype.password = org.eclipse.core.internal.runtime.AuthorizationHandler.password, $t$);
}, "~S");
Clazz.defineStatics (c$,
"F_KEYRING", ".keyring",
"keyring", null,
"keyringTimeStamp", 0,
"keyringFile", null,
"password", "");
});
