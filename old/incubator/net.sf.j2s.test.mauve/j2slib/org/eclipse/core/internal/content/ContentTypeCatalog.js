Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["java.util.HashMap"], "org.eclipse.core.internal.content.ContentTypeCatalog", ["java.util.ArrayList", "$.Arrays", "$.Collections", "$.HashSet", "org.eclipse.core.internal.content.ContentTypeManager", "$.ContentTypeVisitor", "$.FileSpec", "org.eclipse.core.internal.runtime.Policy", "org.eclipse.core.runtime.ISafeRunnable", "$.Platform"], function () {
c$ = Clazz.decorateAsClass (function () {
this.allChildren = null;
this.contentTypes = null;
this.fileExtensions = null;
this.fileNames = null;
this.generation = 0;
this.manager = null;
this.policyConstantGeneralIsBetter = null;
this.policyConstantSpecificIsBetter = null;
this.policyGeneralIsBetter = null;
this.policyLexicographical = null;
this.policySpecificIsBetter = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "ContentTypeCatalog");
Clazz.prepareFields (c$, function () {
this.allChildren =  new java.util.HashMap ();
this.contentTypes =  new java.util.HashMap ();
this.fileExtensions =  new java.util.HashMap ();
this.fileNames =  new java.util.HashMap ();
this.policyConstantGeneralIsBetter = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.ContentTypeCatalog$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.content, "ContentTypeCatalog$1", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (o1, o2) {
var type1 = o1;
var type2 = o2;
var depthCriteria = type1.getDepth () - type2.getDepth ();
if (depthCriteria != 0) return depthCriteria;
var priorityCriteria = type1.getPriority () - type2.getPriority ();
if (priorityCriteria != 0) return -priorityCriteria;
return type1.getId ().compareTo (type2.getId ());
}, "~O,~O");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.content.ContentTypeCatalog$1, i$, v$);
}) (this, null);
this.policyConstantSpecificIsBetter = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.ContentTypeCatalog$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.content, "ContentTypeCatalog$2", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (o1, o2) {
var type1 = o1;
var type2 = o2;
var depthCriteria = type1.getDepth () - type2.getDepth ();
if (depthCriteria != 0) return -depthCriteria;
var priorityCriteria = type1.getPriority () - type2.getPriority ();
if (priorityCriteria != 0) return -priorityCriteria;
return type1.getId ().compareTo (type2.getId ());
}, "~O,~O");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.content.ContentTypeCatalog$2, i$, v$);
}) (this, null);
this.policyGeneralIsBetter = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.ContentTypeCatalog$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.content, "ContentTypeCatalog$3", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (o1, o2) {
var type1 = o1;
var type2 = o2;
var depthCriteria = type1.getDepth () - type2.getDepth ();
if (depthCriteria != 0) return depthCriteria;
var priorityCriteria = type1.getPriority () - type2.getPriority ();
if (priorityCriteria != 0) return -priorityCriteria;
return 0;
}, "~O,~O");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.content.ContentTypeCatalog$3, i$, v$);
}) (this, null);
this.policyLexicographical = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.ContentTypeCatalog$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.content, "ContentTypeCatalog$4", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (o1, o2) {
var type1 = o1;
var type2 = o2;
return type1.getId ().compareTo (type2.getId ());
}, "~O,~O");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.content.ContentTypeCatalog$4, i$, v$);
}) (this, null);
this.policySpecificIsBetter = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.ContentTypeCatalog$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.content, "ContentTypeCatalog$5", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (o1, o2) {
var type1 = o1;
var type2 = o2;
var depthCriteria = type1.getDepth () - type2.getDepth ();
if (depthCriteria != 0) return -depthCriteria;
var priorityCriteria = type1.getPriority () - type2.getPriority ();
if (priorityCriteria != 0) return -priorityCriteria;
return 0;
}, "~O,~O");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.content.ContentTypeCatalog$5, i$, v$);
}) (this, null);
});
c$.concat = Clazz.defineMethod (c$, "concat", 
($fz = function (types) {
if (types[0].length == 0) return types[1];
if (types[1].length == 0) return types[0];
var result =  new Array (types[0].length + types[1].length);
System.arraycopy (types[0], 0, result, 0, types[0].length);
System.arraycopy (types[1], 0, result, types[0].length, types[1].length);
return result;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.makeConstructor (c$, 
function (manager, generation) {
this.manager = manager;
this.generation = generation;
}, "org.eclipse.core.internal.content.ContentTypeManager,~N");
Clazz.defineMethod (c$, "addContentType", 
function (contentType) {
this.contentTypes.put (contentType.getId (), contentType);
}, "org.eclipse.core.runtime.content.IContentType");
Clazz.defineMethod (c$, "applyPolicy", 
($fz = function (policy, candidates, fileName, contents) {
var result = [candidates];
org.eclipse.core.runtime.Platform.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.ContentTypeCatalog$6")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.content, "ContentTypeCatalog$6", null, org.eclipse.core.runtime.ISafeRunnable);
Clazz.overrideMethod (c$, "handleException", 
function (exception) {
}, "Throwable");
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.result[0] = this.f$.policy.select (this.f$.candidates, this.f$.fileName, this.f$.contents);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.content.ContentTypeCatalog$6, i$, v$);
}) (this, Clazz.cloneFinals ("result", result, "policy", policy, "candidates", candidates, "fileName", fileName, "contents", contents)));
return result[0];
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.content.IContentTypeManager.ISelectionPolicy,~A,~B,~B");
Clazz.defineMethod (c$, "associate", 
function (contentType) {
var builtInFileNames = contentType.getFileSpecs (6);
for (var i = 0; i < builtInFileNames.length; i++) this.associate (contentType, builtInFileNames[i], 4);

var builtInFileExtensions = contentType.getFileSpecs (10);
for (var i = 0; i < builtInFileExtensions.length; i++) this.associate (contentType, builtInFileExtensions[i], 8);

}, "org.eclipse.core.internal.content.ContentType");
Clazz.defineMethod (c$, "associate", 
function (contentType, text, type) {
var fileSpecMap = ((type & 4) != 0) ? this.fileNames : this.fileExtensions;
var mappingKey = org.eclipse.core.internal.content.FileSpec.getMappingKeyFor (text);
var existing = fileSpecMap.get (mappingKey);
if (existing == null) fileSpecMap.put (mappingKey, existing =  new java.util.HashSet ());
existing.add (contentType);
}, "org.eclipse.core.internal.content.ContentType,~S,~N");
Clazz.defineMethod (c$, "collectMatchingByContents", 
($fz = function (valid, subset, destination, contents) {
for (var i = 0; i < subset.length; i++) {
var current = subset[i];
var describer = current.getDescriber ();
var status = 1;
if (describer != null) {
status = current.describe (describer, contents, null);
if (status == 0) continue ;}if (status == 2) destination.add (valid++, current);
 else destination.add (current);
}
return valid;
}, $fz.isPrivate = true, $fz), "~N,~A,java.util.List,org.eclipse.core.internal.content.ILazySource");
Clazz.defineMethod (c$, "dissociate", 
function (contentType, text, type) {
var fileSpecMap = ((type & 4) != 0) ? this.fileNames : this.fileExtensions;
var mappingKey = org.eclipse.core.internal.content.FileSpec.getMappingKeyFor (text);
var existing = fileSpecMap.get (mappingKey);
if (existing == null) return ;
existing.remove (contentType);
}, "org.eclipse.core.internal.content.ContentType,~S,~N");
Clazz.defineMethod (c$, "ensureValid", 
($fz = function (type) {
if (type.getValidation () != 0) return type.isValid ();
type.setValidation (2);
if (type.isAlias ()) return false;
var baseType = null;
if (type.getBaseTypeId () != null) {
baseType = this.contentTypes.get (type.getBaseTypeId ());
if (baseType == null) return false;
baseType = baseType.getAliasTarget (true);
this.ensureValid (baseType);
if (baseType.getValidation () != 1) return false;
}type.setValidation (1);
type.setBaseType (baseType);
return true;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.content.ContentType");
Clazz.defineMethod (c$, "findContentTypesFor", 
function (matcher, contents, fileName) {
var buffer = org.eclipse.core.internal.content.ContentTypeManager.readBuffer (contents);
var selected = this.internalFindContentTypesFor (matcher, buffer, fileName, true);
var policy = matcher.getPolicy ();
if (policy != null) selected = this.applyPolicy (policy, selected, fileName != null, true);
return selected;
}, "org.eclipse.core.internal.content.ContentTypeMatcher,java.io.InputStream,~S");
Clazz.defineMethod (c$, "findContentTypesFor", 
function (matcher, fileName) {
var selected = org.eclipse.core.internal.content.ContentTypeCatalog.concat (this.internalFindContentTypesFor (matcher, fileName, this.policyConstantGeneralIsBetter));
var policy = matcher.getPolicy ();
if (policy != null) selected = this.applyPolicy (policy, selected, true, false);
return selected;
}, "org.eclipse.core.internal.content.ContentTypeMatcher,~S");
Clazz.defineMethod (c$, "getAllContentTypes", 
function () {
var result =  new java.util.ArrayList (this.contentTypes.size ());
for (var i = this.contentTypes.values ().iterator (); i.hasNext (); ) {
var type = i.next ();
if (type.isValid () && !type.isAlias ()) result.add (type);
}
return result.toArray ( new Array (result.size ()));
});
Clazz.defineMethod (c$, "getChildren", 
function (parent) {
var children = this.allChildren.get (parent);
if (children != null) return children;
var result =  new java.util.ArrayList (5);
for (var i = this.contentTypes.values ().iterator (); i.hasNext (); ) {
var next = i.next ();
if (next.getBaseType () === parent) result.add (next);
}
children = result.toArray ( new Array (result.size ()));
this.allChildren.put (parent, children);
return children;
}, "org.eclipse.core.internal.content.ContentType");
Clazz.defineMethod (c$, "getContentType", 
function (contentTypeIdentifier) {
var type = this.internalGetContentType (contentTypeIdentifier);
return (type != null && type.isValid () && !type.isAlias ()) ? type : null;
}, "~S");
Clazz.defineMethod (c$, "getDescriptionFor", 
($fz = function (matcher, contents, fileName, options) {
var selected = this.internalFindContentTypesFor (matcher, contents, fileName, false);
if (selected.length == 0) return null;
var policy = matcher.getPolicy ();
if (policy != null) {
selected = this.applyPolicy (policy, selected, fileName != null, true);
if (selected.length == 0) return null;
}return matcher.getSpecificDescription ((selected[0]).internalGetDescriptionFor (contents, options));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.content.ContentTypeMatcher,org.eclipse.core.internal.content.ILazySource,~S,~A");
Clazz.defineMethod (c$, "getDescriptionFor", 
function (matcher, contents, fileName, options) {
return this.getDescriptionFor (matcher, org.eclipse.core.internal.content.ContentTypeManager.readBuffer (contents), fileName, options);
}, "org.eclipse.core.internal.content.ContentTypeMatcher,java.io.InputStream,~S,~A");
Clazz.defineMethod (c$, "getDescriptionFor", 
function (matcher, contents, fileName, options) {
return this.getDescriptionFor (matcher, org.eclipse.core.internal.content.ContentTypeManager.readBuffer (contents), fileName, options);
}, "org.eclipse.core.internal.content.ContentTypeMatcher,java.io.Reader,~S,~A");
Clazz.defineMethod (c$, "getGeneration", 
function () {
return this.generation;
});
Clazz.defineMethod (c$, "getManager", 
function () {
return this.manager;
});
Clazz.defineMethod (c$, "internalAccept", 
function (visitor, root) {
if (!root.isValid () || root.isAlias ()) return true;
var result = visitor.visit (root);
switch (result) {
case 2:
return false;
case 1:
return true;
}
var children = this.getChildren (root);
if (children == null) return true;
for (var i = 0; i < children.length; i++) if (!this.internalAccept (visitor, children[i])) return false;

return true;
}, "org.eclipse.core.internal.content.ContentTypeVisitor,org.eclipse.core.internal.content.ContentType");
Clazz.defineMethod (c$, "internalFindContentTypesFor", 
function (buffer, subset, validPolicy, indeterminatePolicy) {
var appropriate =  new java.util.ArrayList (5);
var validFullName = this.collectMatchingByContents (0, subset[0], appropriate, buffer);
var appropriateFullName = appropriate.size ();
var validExtension = this.collectMatchingByContents (validFullName, subset[1], appropriate, buffer) - validFullName;
var appropriateExtension = appropriate.size () - appropriateFullName;
var result = appropriate.toArray ( new Array (appropriate.size ()));
if (validFullName > 1) java.util.Arrays.sort (result, 0, validFullName, validPolicy);
if (validExtension > 1) java.util.Arrays.sort (result, validFullName, validFullName + validExtension, validPolicy);
if (appropriateFullName - validFullName > 1) java.util.Arrays.sort (result, validFullName + validExtension, appropriateFullName + validExtension, indeterminatePolicy);
if (appropriateExtension - validExtension > 1) java.util.Arrays.sort (result, appropriateFullName + validExtension, appropriate.size (), indeterminatePolicy);
return result;
}, "org.eclipse.core.internal.content.ILazySource,~A,java.util.Comparator,java.util.Comparator");
Clazz.defineMethod (c$, "internalFindContentTypesFor", 
($fz = function (matcher, buffer, fileName, forceValidation) {
var subset;
var validPolicy;
var indeterminatePolicy;
if (fileName == null) {
subset = [this.getAllContentTypes (), org.eclipse.core.internal.content.ContentTypeCatalog.NO_CONTENT_TYPES];
indeterminatePolicy = this.policyConstantGeneralIsBetter;
validPolicy = this.policyConstantSpecificIsBetter;
} else {
subset = this.internalFindContentTypesFor (matcher, fileName, this.policyLexicographical);
indeterminatePolicy = this.policyGeneralIsBetter;
validPolicy = this.policySpecificIsBetter;
}var total = subset[0].length + subset[1].length;
if (total == 0) return subset[0];
if (!forceValidation && total == 1) return subset[0].length == 1 ? subset[0] : subset[1];
return this.internalFindContentTypesFor (buffer, subset, validPolicy, indeterminatePolicy);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.content.ContentTypeMatcher,org.eclipse.core.internal.content.ILazySource,~S,~B");
Clazz.defineMethod (c$, "internalFindContentTypesFor", 
function (matcher, fileName, sortingPolicy) {
var context = matcher.getContext ();
var result = [org.eclipse.core.internal.content.ContentTypeCatalog.NO_CONTENT_TYPES, org.eclipse.core.internal.content.ContentTypeCatalog.NO_CONTENT_TYPES];
var allByFileName;
if (context.equals (this.manager.getContext ())) allByFileName = this.getDirectlyAssociated (fileName, 4);
 else {
allByFileName =  new java.util.HashSet (this.getDirectlyAssociated (fileName, 6));
allByFileName.addAll (matcher.getDirectlyAssociated (this, fileName, 4));
}var selectedByName = this.selectMatchingByName (context, allByFileName, java.util.Collections.EMPTY_SET, fileName, 4);
result[0] = selectedByName.toArray ( new Array (selectedByName.size ()));
var fileExtension = org.eclipse.core.internal.content.ContentTypeManager.getFileExtension (fileName);
if (fileExtension != null) {
var allByFileExtension;
if (context.equals (this.manager.getContext ())) allByFileExtension = this.getDirectlyAssociated (fileExtension, 8);
 else {
allByFileExtension =  new java.util.HashSet (this.getDirectlyAssociated (fileExtension, 10));
allByFileExtension.addAll (matcher.getDirectlyAssociated (this, fileExtension, 8));
}var selectedByExtension = this.selectMatchingByName (context, allByFileExtension, selectedByName, fileExtension, 8);
if (!selectedByExtension.isEmpty ()) result[1] = selectedByExtension.toArray ( new Array (selectedByExtension.size ()));
}if (result[0].length > 1) java.util.Arrays.sort (result[0], sortingPolicy);
if (result[1].length > 1) java.util.Arrays.sort (result[1], sortingPolicy);
return result;
}, "org.eclipse.core.internal.content.ContentTypeMatcher,~S,java.util.Comparator");
Clazz.defineMethod (c$, "getDirectlyAssociated", 
function (text, typeMask) {
var associations = (typeMask & 4) != 0 ? this.fileNames : this.fileExtensions;
var result = null;
if ((typeMask & (3)) == 0) result = associations.get (org.eclipse.core.internal.content.FileSpec.getMappingKeyFor (text));
 else {
var initialSet = associations.get (org.eclipse.core.internal.content.FileSpec.getMappingKeyFor (text));
if (initialSet != null && !initialSet.isEmpty ()) {
result =  new java.util.HashSet (initialSet);
typeMask ^= (3);
for (var i = result.iterator (); i.hasNext (); ) {
var contentType = i.next ();
if (!contentType.hasFileSpec (text, typeMask, true)) i.remove ();
}
}}return result == null ? java.util.Collections.EMPTY_SET : result;
}, "~S,~N");
Clazz.defineMethod (c$, "internalGetContentType", 
function (contentTypeIdentifier) {
return this.contentTypes.get (contentTypeIdentifier);
}, "~S");
Clazz.defineMethod (c$, "makeAliases", 
function () {
for (var i = this.contentTypes.values ().iterator (); i.hasNext (); ) {
var type = i.next ();
var targetId = type.getAliasTargetId ();
if (targetId == null) continue ;var target = this.internalGetContentType (targetId);
if (target != null) type.setAliasTarget (target);
}
});
Clazz.defineMethod (c$, "organize", 
function () {
this.makeAliases ();
for (var i = this.contentTypes.values ().iterator (); i.hasNext (); ) {
var type = i.next ();
if (this.ensureValid (type)) this.associate (type);
}
if (org.eclipse.core.internal.content.ContentTypeManager.DEBUGGING) for (var i = this.contentTypes.values ().iterator (); i.hasNext (); ) {
var type = i.next ();
if (!type.isValid ()) org.eclipse.core.internal.runtime.Policy.debug ("Invalid: " + type);
}
});
Clazz.defineMethod (c$, "selectMatchingByName", 
($fz = function (context, source, existing, fileSpecText, fileSpecType) {
if (source == null || source.isEmpty ()) return java.util.Collections.EMPTY_SET;
var destination =  new java.util.HashSet (5);
for (var i = source.iterator (); i.hasNext (); ) {
var root = i.next ();
this.internalAccept ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.content.ContentTypeCatalog$7")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.content, "ContentTypeCatalog$7", null, org.eclipse.core.internal.content.ContentTypeVisitor);
Clazz.defineMethod (c$, "visit", 
function (type) {
if (type !== this.f$.root && type.hasBuiltInAssociations ()) return 1;
if (type === this.f$.root && !type.hasFileSpec (this.f$.context, this.f$.fileSpecText, this.f$.fileSpecType)) return 1;
if (!this.f$.existing.contains (type)) this.f$.destination.add (type);
return 0;
}, "org.eclipse.core.internal.content.ContentType");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.content.ContentTypeCatalog$7, i$, v$);
}) (this, Clazz.cloneFinals ("root", root, "context", context, "fileSpecText", fileSpecText, "fileSpecType", fileSpecType, "existing", existing, "destination", destination)), root);
}
return destination;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.preferences.IScopeContext,java.util.Collection,java.util.Collection,~S,~N");
c$.NO_CONTENT_TYPES = c$.prototype.NO_CONTENT_TYPES =  new Array (0);
});
