Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["java.util.Hashtable"], "org.eclipse.core.internal.runtime.AuthorizationDatabase", ["java.io.File", "$.FileInputStream", "$.FileOutputStream", "$.ObjectInputStream", "$.ObjectOutputStream", "org.eclipse.core.internal.runtime.Assert", "$.CipherInputStream", "$.CipherOutputStream", "$.InternalPlatform", "$.Messages", "$.URLTool", "org.eclipse.core.runtime.CoreException", "$.Status", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.authorizationInfo = null;
this.protectionSpace = null;
this.file = null;
this.password = null;
this.needsSaving = true;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "AuthorizationDatabase");
Clazz.prepareFields (c$, function () {
this.authorizationInfo =  new java.util.Hashtable (5);
this.protectionSpace =  new java.util.Hashtable (5);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (filename, password) {
org.eclipse.core.internal.runtime.Assert.isNotNull (filename);
org.eclipse.core.internal.runtime.Assert.isNotNull (password);
this.password = password;
this.file =  new java.io.File (filename);
this.load ();
}, "~S,~S");
Clazz.defineMethod (c$, "addAuthorizationInfo", 
function (serverUrl, realm, authScheme, info) {
org.eclipse.core.internal.runtime.Assert.isNotNull (serverUrl);
org.eclipse.core.internal.runtime.Assert.isNotNull (realm);
org.eclipse.core.internal.runtime.Assert.isNotNull (authScheme);
org.eclipse.core.internal.runtime.Assert.isNotNull (info);
var url = serverUrl.toString ();
var realmToAuthScheme = this.authorizationInfo.get (url);
if (realmToAuthScheme == null) {
realmToAuthScheme =  new java.util.Hashtable (5);
this.authorizationInfo.put (url, realmToAuthScheme);
}var authSchemeToInfo = realmToAuthScheme.get (realm);
if (authSchemeToInfo == null) {
authSchemeToInfo =  new java.util.Hashtable (5);
realmToAuthScheme.put (realm, authSchemeToInfo);
}authSchemeToInfo.put (authScheme.toLowerCase (), info);
this.needsSaving = true;
}, "java.net.URL,~S,~S,java.util.Map");
Clazz.defineMethod (c$, "addProtectionSpace", 
function (resourceUrl, realm) {
org.eclipse.core.internal.runtime.Assert.isNotNull (resourceUrl);
org.eclipse.core.internal.runtime.Assert.isNotNull (realm);
if (!resourceUrl.getFile ().endsWith ("/")) {
resourceUrl = org.eclipse.core.internal.runtime.URLTool.getParent (resourceUrl);
}var oldRealm = this.getProtectionSpace (resourceUrl);
if (oldRealm != null && oldRealm.equals (realm)) {
return ;
}var url1 = resourceUrl.toString ();
var urls = this.protectionSpace.keys ();
while (urls.hasMoreElements ()) {
var url2 = urls.nextElement ();
if (url1.startsWith (url2) || url2.startsWith (url1)) {
this.protectionSpace.remove (url2);
break;
}}
this.protectionSpace.put (url1, realm);
this.needsSaving = true;
}, "java.net.URL,~S");
Clazz.defineMethod (c$, "flushAuthorizationInfo", 
function (serverUrl, realm, authScheme) {
var realmToAuthScheme = this.authorizationInfo.get (serverUrl.toString ());
if (realmToAuthScheme == null) {
return ;
}var authSchemeToInfo = realmToAuthScheme.get (realm);
if (authSchemeToInfo == null) {
return ;
}authSchemeToInfo.remove (authScheme.toLowerCase ());
this.needsSaving = true;
}, "java.net.URL,~S,~S");
Clazz.defineMethod (c$, "getAuthorizationInfo", 
function (serverUrl, realm, authScheme) {
var realmToAuthScheme = this.authorizationInfo.get (serverUrl.toString ());
if (realmToAuthScheme == null) {
return null;
}var authSchemeToInfo = realmToAuthScheme.get (realm);
if (authSchemeToInfo == null) {
return null;
}return authSchemeToInfo.get (authScheme.toLowerCase ());
}, "java.net.URL,~S,~S");
Clazz.defineMethod (c$, "getProtectionSpace", 
function (resourceUrl) {
while (resourceUrl != null) {
var realm = this.protectionSpace.get (resourceUrl.toString ());
if (realm != null) {
return realm;
}resourceUrl = org.eclipse.core.internal.runtime.URLTool.getParent (resourceUrl);
}
return null;
}, "java.net.URL");
Clazz.defineMethod (c$, "load", 
($fz = function () {
if (this.file == null) return ;
if (!this.file.exists ()) {
this.save ();
return ;
}try {
var input =  new java.io.FileInputStream (this.file);
try {
this.load (input);
} finally {
input.close ();
}
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_unableToReadAuthorization, this.file), e));
}
} else if (Clazz.instanceOf (e$$, ClassNotFoundException)) {
var e = e$$;
{
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_unableToReadAuthorization, this.file), e));
}
} else {
throw e$$;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "load", 
($fz = function (is) {
var version = is.read ();
if (version == 1) {
var cis =  new org.eclipse.core.internal.runtime.CipherInputStream (is, this.password);
var ois =  new java.io.ObjectInputStream (cis);
try {
this.authorizationInfo = ois.readObject ();
this.protectionSpace = ois.readObject ();
} finally {
ois.close ();
}
} else {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (2, "org.eclipse.core.runtime", 4, org.eclipse.core.internal.runtime.Messages.meta_authFormatChanged, null));
try {
is.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.needsSaving = true;
this.save ();
}}, $fz.isPrivate = true, $fz), "java.io.InputStream");
Clazz.defineMethod (c$, "save", 
function () {
if (!this.needsSaving || this.file == null) return ;
try {
this.file.$delete ();
if ((!this.file.getParentFile ().exists () && !this.file.getParentFile ().mkdirs ()) || !org.eclipse.core.internal.runtime.AuthorizationDatabase.canWrite (this.file.getParentFile ())) throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 5, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_unableToWriteAuthorization, this.file), null));
this.file.createNewFile ();
var out =  new java.io.FileOutputStream (this.file);
try {
this.save (out);
} finally {
out.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 5, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_unableToWriteAuthorization, this.file), e));
} else {
throw e;
}
}
this.needsSaving = false;
});
c$.canWrite = Clazz.defineMethod (c$, "canWrite", 
($fz = function (installDir) {
if (!installDir.canWrite ()) return false;
if (!installDir.isDirectory ()) return false;
var fileTest = null;
try {
fileTest = java.io.File.createTempFile ("writtableArea", null, installDir);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return false;
} else {
throw e;
}
} finally {
if (fileTest != null) fileTest.$delete ();
}
return true;
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "save", 
($fz = function (os) {
os.write (1);
var cos =  new org.eclipse.core.internal.runtime.CipherOutputStream (os, this.password);
var oos =  new java.io.ObjectOutputStream (cos);
try {
oos.writeObject (this.authorizationInfo);
oos.writeObject (this.protectionSpace);
os.flush ();
os.getFD ().sync ();
} finally {
oos.close ();
}
}, $fz.isPrivate = true, $fz), "java.io.FileOutputStream");
Clazz.defineMethod (c$, "setPassword", 
function (oldValue, newValue) {
if (!oldValue.equals (this.password)) return false;
this.password = newValue;
this.needsSaving = true;
return true;
}, "~S,~S");
Clazz.defineStatics (c$,
"KEYRING_FILE_VERSION", 1);
});
