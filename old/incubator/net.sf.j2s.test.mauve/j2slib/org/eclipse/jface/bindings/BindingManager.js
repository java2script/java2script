Clazz.declarePackage ("org.eclipse.jface.bindings");
Clazz.load (["org.eclipse.core.commands.contexts.IContextManagerListener", "org.eclipse.jface.bindings.ISchemeListener", "java.util.HashMap", "$.Locale", "$wt.SWT"], "org.eclipse.jface.bindings.BindingManager", ["java.lang.NullPointerException", "$.StringBuffer", "java.util.ArrayList", "$.Arrays", "$.Collections", "$.HashSet", "$.StringTokenizer", "org.eclipse.core.commands.ParameterizedCommand", "org.eclipse.core.commands.common.NotDefinedException", "org.eclipse.jface.bindings.BindingManagerEvent", "$.CachedBindingSet", "$.Scheme", "org.eclipse.jface.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.activeBindings = null;
this.activeBindingsByParameterizedCommand = null;
this.activeScheme = null;
this.activeSchemeIds = null;
this.bindingCount = 0;
this.bindings = null;
this.cachedBindings = null;
this.commandManager = null;
this.contextManager = null;
this.definedSchemeCount = 0;
this.definedSchemes = null;
this.listeners = null;
this.locale = null;
this.locales = null;
this.platform = null;
this.platforms = null;
this.prefixTable = null;
this.schemesById = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings, "BindingManager", null, [org.eclipse.core.commands.contexts.IContextManagerListener, org.eclipse.jface.bindings.ISchemeListener]);
Clazz.prepareFields (c$, function () {
this.cachedBindings =  new java.util.HashMap ();
this.locale = java.util.Locale.getDefault ().toString ();
this.locales = org.eclipse.jface.bindings.BindingManager.expand (this.locale, "_");
this.platform = $WT.getPlatform ();
this.platforms = org.eclipse.jface.bindings.BindingManager.expand (this.platform, "");
this.schemesById =  new java.util.HashMap ();
});
c$.addReverseLookup = Clazz.defineMethod (c$, "addReverseLookup", 
($fz = function (map, key, value) {
if (map == null) {
return ;
}var currentValue = map.get (key);
if (currentValue != null) {
var values = currentValue;
values.add (value);
} else {
var values =  new java.util.ArrayList (1);
values.add (value);
map.put (key, values);
}}, $fz.isPrivate = true, $fz), "java.util.Map,~O,~O");
c$.expand = Clazz.defineMethod (c$, "expand", 
($fz = function (string, separator) {
if (string == null || separator == null) {
return  new Array (0);
}var strings =  new java.util.ArrayList ();
var stringBuffer =  new StringBuffer ();
string = string.trim ();
if (string.length > 0) {
var stringTokenizer =  new java.util.StringTokenizer (string, separator);
while (stringTokenizer.hasMoreElements ()) {
if (stringBuffer.length () > 0) stringBuffer.append (separator);
stringBuffer.append ((stringTokenizer.nextElement ()).trim ());
strings.add (stringBuffer.toString ());
}
}java.util.Collections.reverse (strings);
strings.add ("");
strings.add (null);
return strings.toArray ( new Array (strings.size ()));
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.makeConstructor (c$, 
function (contextManager, commandManager) {
if (contextManager == null) {
throw  new NullPointerException ("A binding manager requires a context manager");
}if (commandManager == null) {
throw  new NullPointerException ("A binding manager requires a command manager");
}this.contextManager = contextManager;
contextManager.addContextManagerListener (this);
this.commandManager = commandManager;
}, "org.eclipse.core.commands.contexts.ContextManager,org.eclipse.core.commands.CommandManager");
Clazz.defineMethod (c$, "addBinding", 
function (binding) {
if (binding == null) {
throw  new NullPointerException ("Cannot add a null binding");
}if (this.bindings == null) {
this.bindings =  new Array (1);
} else if (this.bindingCount >= this.bindings.length) {
var oldBindings = this.bindings;
this.bindings =  new Array (oldBindings.length * 2);
System.arraycopy (oldBindings, 0, this.bindings, 0, oldBindings.length);
}this.bindings[this.bindingCount++] = binding;
this.clearCache ();
}, "org.eclipse.jface.bindings.Binding");
Clazz.defineMethod (c$, "addBindingManagerListener", 
function (listener) {
if (listener == null) {
throw  new NullPointerException ();
}if (this.listeners == null) {
this.listeners =  new java.util.HashSet ();
}this.listeners.add (listener);
}, "org.eclipse.jface.bindings.IBindingManagerListener");
Clazz.defineMethod (c$, "buildPrefixTable", 
($fz = function (activeBindings) {
var prefixTable =  new java.util.HashMap ();
var bindingItr = activeBindings.entrySet ().iterator ();
while (bindingItr.hasNext ()) {
var entry = bindingItr.next ();
var triggerSequence = entry.getKey ();
if (!prefixTable.containsKey (triggerSequence)) {
prefixTable.put (triggerSequence, null);
}var prefixes = triggerSequence.getPrefixes ();
var prefixesLength = prefixes.length;
if (prefixesLength == 0) {
continue ;}var binding = entry.getValue ();
for (var i = 0; i < prefixesLength; i++) {
var prefix = prefixes[i];
var value = prefixTable.get (prefix);
if ((prefixTable.containsKey (prefix)) && (Clazz.instanceOf (value, java.util.Map))) {
(value).put (triggerSequence, binding);
} else {
var map =  new java.util.HashMap ();
prefixTable.put (prefix, map);
map.put (triggerSequence, binding);
}}
}
return prefixTable;
}, $fz.isPrivate = true, $fz), "java.util.Map");
Clazz.defineMethod (c$, "clearCache", 
($fz = function () {
if (org.eclipse.jface.bindings.BindingManager.DEBUG) {
System.out.println ("BINDINGS >> Clearing cache");
}this.cachedBindings.clear ();
this.clearSolution ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "clearSolution", 
($fz = function () {
this.setActiveBindings (null, null, null);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "computeBindings", 
($fz = function (activeContextTree, bindingsByTrigger, triggersByCommandId) {
var trimmedBindings = this.removeDeletions (this.bindings);
var possibleBindings =  new java.util.HashMap ();
var length = trimmedBindings.length;
for (var i = 0; i < length; i++) {
var binding = trimmedBindings[i];
var found;
var contextId = binding.getContextId ();
if ((activeContextTree != null) && (!activeContextTree.containsKey (contextId))) {
continue ;}if (!this.localeMatches (binding)) {
continue ;}if (!this.platformMatches (binding)) {
continue ;}var schemeId = binding.getSchemeId ();
found = false;
if (this.activeSchemeIds != null) {
for (var j = 0; j < this.activeSchemeIds.length; j++) {
if (org.eclipse.jface.util.Util.equals (schemeId, this.activeSchemeIds[j])) {
found = true;
break;
}}
}if (!found) {
continue ;}var trigger = binding.getTriggerSequence ();
var existingMatch = possibleBindings.get (trigger);
if (Clazz.instanceOf (existingMatch, org.eclipse.jface.bindings.Binding)) {
possibleBindings.remove (trigger);
var matches =  new java.util.ArrayList ();
matches.add (existingMatch);
matches.add (binding);
possibleBindings.put (trigger, matches);
} else if (Clazz.instanceOf (existingMatch, java.util.Collection)) {
var matches = existingMatch;
matches.add (binding);
} else {
possibleBindings.put (trigger, binding);
}}
var possibleBindingItr = possibleBindings.entrySet ().iterator ();
while (possibleBindingItr.hasNext ()) {
var entry = possibleBindingItr.next ();
var trigger = entry.getKey ();
var match = entry.getValue ();
if (activeContextTree == null) {
var bindings =  new java.util.ArrayList ();
if (Clazz.instanceOf (match, org.eclipse.jface.bindings.Binding)) {
bindings.add (match);
bindingsByTrigger.put (trigger, bindings);
org.eclipse.jface.bindings.BindingManager.addReverseLookup (triggersByCommandId, (match).getParameterizedCommand (), trigger);
} else if (Clazz.instanceOf (match, java.util.Collection)) {
bindings.addAll (this.resolveConflicts (match));
bindingsByTrigger.put (trigger, bindings);
var matchItr = bindings.iterator ();
while (matchItr.hasNext ()) {
org.eclipse.jface.bindings.BindingManager.addReverseLookup (triggersByCommandId, (matchItr.next ()).getParameterizedCommand (), trigger);
}
}} else {
if (Clazz.instanceOf (match, org.eclipse.jface.bindings.Binding)) {
var binding = match;
bindingsByTrigger.put (trigger, binding);
org.eclipse.jface.bindings.BindingManager.addReverseLookup (triggersByCommandId, binding.getParameterizedCommand (), trigger);
} else if (Clazz.instanceOf (match, java.util.Collection)) {
var winner = this.resolveConflicts (match, activeContextTree);
if (winner == null) {
if (org.eclipse.jface.bindings.BindingManager.DEBUG) {
System.out.println ("BINDINGS >> A conflict occurred for " + trigger);
System.out.println ("BINDINGS >>     " + match);
}} else {
bindingsByTrigger.put (trigger, winner);
org.eclipse.jface.bindings.BindingManager.addReverseLookup (triggersByCommandId, winner.getParameterizedCommand (), trigger);
}}}}
}, $fz.isPrivate = true, $fz), "java.util.Map,java.util.Map,java.util.Map");
Clazz.overrideMethod (c$, "contextManagerChanged", 
function (contextManagerEvent) {
if (contextManagerEvent.isActiveContextsChanged ()) {
this.clearSolution ();
}}, "org.eclipse.core.commands.contexts.ContextManagerEvent");
Clazz.defineMethod (c$, "createContextTreeFor", 
($fz = function (contextIds) {
var contextTree =  new java.util.HashMap ();
var contextIdItr = contextIds.iterator ();
while (contextIdItr.hasNext ()) {
var childContextId = contextIdItr.next ();
while (childContextId != null) {
var childContext = this.contextManager.getContext (childContextId);
try {
var parentContextId = childContext.getParentId ();
contextTree.put (childContextId, parentContextId);
childContextId = parentContextId;
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.commands.common.NotDefinedException)) {
break;
} else {
throw e;
}
}
}
}
return contextTree;
}, $fz.isPrivate = true, $fz), "java.util.Set");
Clazz.defineMethod (c$, "createFilteredContextTreeFor", 
($fz = function (contextIds) {
var dialog = false;
var window = false;
var contextIdItr = contextIds.iterator ();
while (contextIdItr.hasNext ()) {
var contextId = contextIdItr.next ();
if ("org.eclipse.ui.contexts.dialog".equals (contextId)) {
dialog = true;
continue ;}if ("org.eclipse.ui.contexts.window".equals (contextId)) {
window = true;
continue ;}}
try {
contextIdItr = contextIds.iterator ();
while (contextIdItr.hasNext ()) {
var contextId = contextIdItr.next ();
var context = this.contextManager.getContext (contextId);
var parentId = context.getParentId ();
while (parentId != null) {
if ("org.eclipse.ui.contexts.dialog".equals (parentId)) {
if (!dialog) {
contextIdItr.remove ();
}break;
}if ("org.eclipse.ui.contexts.window".equals (parentId)) {
if (!window) {
contextIdItr.remove ();
}break;
}if ("org.eclipse.ui.contexts.dialogAndWindow".equals (parentId)) {
if ((!window) && (!dialog)) {
contextIdItr.remove ();
}break;
}context = this.contextManager.getContext (parentId);
parentId = context.getParentId ();
}
}
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.commands.common.NotDefinedException)) {
if (org.eclipse.jface.bindings.BindingManager.DEBUG) {
System.out.println ("BINDINGS >>> NotDefinedException('" + e.getMessage () + "') while filtering dialog/window contexts");
}} else {
throw e;
}
}
return this.createContextTreeFor (contextIds);
}, $fz.isPrivate = true, $fz), "java.util.Set");
Clazz.defineMethod (c$, "fireBindingManagerChanged", 
($fz = function (event) {
if (event == null) throw  new NullPointerException ();
if (this.listeners != null) {
var listenerItr = this.listeners.iterator ();
while (listenerItr.hasNext ()) {
var listener = listenerItr.next ();
listener.bindingManagerChanged (event);
}
}}, $fz.isPrivate = true, $fz), "org.eclipse.jface.bindings.BindingManagerEvent");
Clazz.defineMethod (c$, "getActiveBindings", 
($fz = function () {
if (this.activeBindings == null) {
this.recomputeBindings ();
}return java.util.Collections.unmodifiableMap (this.activeBindings);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getActiveBindingsByParameterizedCommand", 
($fz = function () {
if (this.activeBindingsByParameterizedCommand == null) {
this.recomputeBindings ();
}return java.util.Collections.unmodifiableMap (this.activeBindingsByParameterizedCommand);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getActiveBindingsDisregardingContext", 
function () {
if (this.bindings == null) {
return java.util.Collections.EMPTY_MAP;
}var bindingCache =  new org.eclipse.jface.bindings.CachedBindingSet (null, this.locales, this.platforms, this.activeSchemeIds);
var existingCache = this.cachedBindings.get (bindingCache);
if (existingCache == null) {
existingCache = bindingCache;
this.cachedBindings.put (existingCache, existingCache);
}var commandIdsByTrigger = existingCache.getBindingsByTrigger ();
if (commandIdsByTrigger != null) {
if (org.eclipse.jface.bindings.BindingManager.DEBUG) {
System.out.println ("BINDINGS >> Cache hit");
}return java.util.Collections.unmodifiableMap (commandIdsByTrigger);
}if (org.eclipse.jface.bindings.BindingManager.DEBUG) {
System.out.println ("BINDINGS >> Cache miss");
}commandIdsByTrigger =  new java.util.HashMap ();
this.computeBindings (null, commandIdsByTrigger, null);
existingCache.setBindingsByTrigger (commandIdsByTrigger);
return java.util.Collections.unmodifiableMap (commandIdsByTrigger);
});
Clazz.defineMethod (c$, "getActiveBindingsDisregardingContextFlat", 
function () {
var bindingCollections = this.getActiveBindingsDisregardingContext ().values ();
var mergedBindings =  new java.util.ArrayList ();
var bindingCollectionItr = bindingCollections.iterator ();
while (bindingCollectionItr.hasNext ()) {
var bindingCollection = bindingCollectionItr.next ();
if ((bindingCollection != null) && (!bindingCollection.isEmpty ())) {
mergedBindings.addAll (bindingCollection);
}}
return mergedBindings;
});
Clazz.defineMethod (c$, "getActiveBindingsFor", 
function (parameterizedCommand) {
var object = this.getActiveBindingsByParameterizedCommand ().get (parameterizedCommand);
if (Clazz.instanceOf (object, java.util.Collection)) {
var collection = object;
return collection.toArray ( new Array (collection.size ()));
}return  new Array (0);
}, "org.eclipse.core.commands.ParameterizedCommand");
Clazz.defineMethod (c$, "getActiveBindingsFor", 
function (commandId) {
var parameterizedCommand =  new org.eclipse.core.commands.ParameterizedCommand (this.commandManager.getCommand (commandId), null);
var object = this.getActiveBindingsByParameterizedCommand ().get (parameterizedCommand);
if (Clazz.instanceOf (object, java.util.Collection)) {
var collection = object;
return collection.toArray ( new Array (collection.size ()));
}return  new Array (0);
}, "~S");
Clazz.defineMethod (c$, "getActiveScheme", 
function () {
return this.activeScheme;
});
Clazz.defineMethod (c$, "getBindings", 
function () {
if (this.bindings == null) {
return null;
}var returnValue =  new Array (this.bindingCount);
System.arraycopy (this.bindings, 0, returnValue, 0, this.bindingCount);
return returnValue;
});
Clazz.defineMethod (c$, "getDefinedSchemes", 
function () {
if ((this.definedSchemes == null) || (this.definedSchemeCount == 0)) {
return  new Array (0);
}var returnValue =  new Array (this.definedSchemeCount);
System.arraycopy (this.definedSchemes, 0, returnValue, 0, this.definedSchemeCount);
return returnValue;
});
Clazz.defineMethod (c$, "getLocale", 
function () {
return this.locale;
});
Clazz.defineMethod (c$, "getPartialMatches", 
function (trigger) {
var partialMatches = this.getPrefixTable ().get (trigger);
if (partialMatches == null) {
return java.util.Collections.EMPTY_MAP;
}return partialMatches;
}, "org.eclipse.jface.bindings.TriggerSequence");
Clazz.defineMethod (c$, "getPerfectMatch", 
function (trigger) {
return this.getActiveBindings ().get (trigger);
}, "org.eclipse.jface.bindings.TriggerSequence");
Clazz.defineMethod (c$, "getPlatform", 
function () {
return this.platform;
});
Clazz.defineMethod (c$, "getPrefixTable", 
($fz = function () {
if (this.prefixTable == null) {
this.recomputeBindings ();
}return java.util.Collections.unmodifiableMap (this.prefixTable);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getScheme", 
function (identifier) {
if (identifier == null) {
throw  new NullPointerException ("Cannot get a scheme with a null identifier");
}var scheme = this.schemesById.get (identifier);
if (scheme == null) {
scheme =  new org.eclipse.jface.bindings.Scheme (identifier);
this.schemesById.put (identifier, scheme);
scheme.addSchemeListener (this);
}return scheme;
}, "~S");
Clazz.defineMethod (c$, "getSchemeIds", 
($fz = function (schemeId) {
var strings =  new java.util.ArrayList ();
while (schemeId != null) {
strings.add (schemeId);
try {
schemeId = this.getScheme (schemeId).getParentId ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.commands.common.NotDefinedException)) {
return  new Array (0);
} else {
throw e;
}
}
}
return strings.toArray ( new Array (strings.size ()));
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "isPartialMatch", 
function (trigger) {
return (this.getPrefixTable ().get (trigger) != null);
}, "org.eclipse.jface.bindings.TriggerSequence");
Clazz.defineMethod (c$, "isPerfectMatch", 
function (trigger) {
return this.getActiveBindings ().containsKey (trigger);
}, "org.eclipse.jface.bindings.TriggerSequence");
Clazz.defineMethod (c$, "localeMatches", 
($fz = function (binding) {
var matches = false;
var locale = binding.getLocale ();
if (locale == null) {
return true;
}for (var i = 0; i < this.locales.length; i++) {
if (org.eclipse.jface.util.Util.equals (this.locales[i], locale)) {
matches = true;
break;
}}
return matches;
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.bindings.Binding");
Clazz.defineMethod (c$, "platformMatches", 
($fz = function (binding) {
var matches = false;
var platform = binding.getPlatform ();
if (platform == null) {
return true;
}for (var i = 0; i < this.platforms.length; i++) {
if (org.eclipse.jface.util.Util.equals (this.platforms[i], platform)) {
matches = true;
break;
}}
return matches;
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.bindings.Binding");
Clazz.defineMethod (c$, "recomputeBindings", 
($fz = function () {
if (this.bindings == null) {
this.setActiveBindings (java.util.Collections.EMPTY_MAP, java.util.Collections.EMPTY_MAP, java.util.Collections.EMPTY_MAP);
return ;
}var activeContextIds =  new java.util.HashSet (this.contextManager.getActiveContextIds ());
var activeContextTree = this.createFilteredContextTreeFor (activeContextIds);
var bindingCache =  new org.eclipse.jface.bindings.CachedBindingSet (activeContextTree, this.locales, this.platforms, this.activeSchemeIds);
var existingCache = this.cachedBindings.get (bindingCache);
if (existingCache == null) {
existingCache = bindingCache;
this.cachedBindings.put (existingCache, existingCache);
}var commandIdsByTrigger = existingCache.getBindingsByTrigger ();
if (commandIdsByTrigger != null) {
if (org.eclipse.jface.bindings.BindingManager.DEBUG) {
System.out.println ("BINDINGS >> Cache hit");
}this.setActiveBindings (commandIdsByTrigger, existingCache.getTriggersByCommandId (), existingCache.getPrefixTable ());
return ;
}if (org.eclipse.jface.bindings.BindingManager.DEBUG) {
System.out.println ("BINDINGS >> Cache miss");
}commandIdsByTrigger =  new java.util.HashMap ();
var triggersByParameterizedCommand =  new java.util.HashMap ();
this.computeBindings (activeContextTree, commandIdsByTrigger, triggersByParameterizedCommand);
existingCache.setBindingsByTrigger (commandIdsByTrigger);
existingCache.setTriggersByCommandId (triggersByParameterizedCommand);
this.setActiveBindings (commandIdsByTrigger, triggersByParameterizedCommand, this.buildPrefixTable (commandIdsByTrigger));
existingCache.setPrefixTable (this.prefixTable);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "removeBindingManagerListener", 
function (listener) {
if (listener == null) {
throw  new NullPointerException ();
}if (this.listeners == null) {
return ;
}this.listeners.remove (listener);
if (this.listeners.isEmpty ()) {
this.listeners = null;
}}, "org.eclipse.jface.bindings.IBindingManagerListener");
Clazz.defineMethod (c$, "removeBindings", 
function (sequence, schemeId, contextId, locale, platform, windowManager, type) {
if ((this.bindings == null) || (this.bindingCount < 1)) {
return ;
}var newBindings =  new Array (this.bindings.length);
var bindingsChanged = false;
var index = 0;
for (var i = 0; i < this.bindingCount; i++) {
var binding = this.bindings[i];
var equals = true;
equals = new Boolean (equals & org.eclipse.jface.util.Util.equals (sequence, binding.getTriggerSequence ())).valueOf ();
equals = new Boolean (equals & org.eclipse.jface.util.Util.equals (schemeId, binding.getSchemeId ())).valueOf ();
equals = new Boolean (equals & org.eclipse.jface.util.Util.equals (contextId, binding.getContextId ())).valueOf ();
equals = new Boolean (equals & org.eclipse.jface.util.Util.equals (locale, binding.getLocale ())).valueOf ();
equals = new Boolean (equals & org.eclipse.jface.util.Util.equals (platform, binding.getPlatform ())).valueOf ();
equals = new Boolean (equals & (type == binding.getType ())).valueOf ();
if (equals) {
bindingsChanged = true;
} else {
newBindings[index++] = binding;
}}
if (bindingsChanged) {
this.bindings = newBindings;
this.bindingCount = index;
this.clearCache ();
}}, "org.eclipse.jface.bindings.TriggerSequence,~S,~S,~S,~S,~S,~N");
Clazz.defineMethod (c$, "removeDeletions", 
($fz = function (bindings) {
var deletions =  new java.util.HashMap ();
var bindingsCopy =  new Array (this.bindingCount);
System.arraycopy (bindings, 0, bindingsCopy, 0, this.bindingCount);
var deletedCount = 0;
for (var i = 0; i < this.bindingCount; i++) {
var binding = bindingsCopy[i];
if ((binding.getParameterizedCommand () == null) && (this.localeMatches (binding)) && (this.platformMatches (binding))) {
var sequence = binding.getTriggerSequence ();
var currentValue = deletions.get (sequence);
if (Clazz.instanceOf (currentValue, org.eclipse.jface.bindings.Binding)) {
var collection =  new java.util.ArrayList (2);
collection.add (currentValue);
collection.add (binding);
deletions.put (sequence, collection);
} else if (Clazz.instanceOf (currentValue, java.util.Collection)) {
var collection = currentValue;
collection.add (binding);
} else {
deletions.put (sequence, binding);
}bindingsCopy[i] = null;
deletedCount++;
}}
if (org.eclipse.jface.bindings.BindingManager.DEBUG) {
System.out.println ("BINDINGS >> There are " + deletions.size () + " deletion markers");
}for (var i = 0; i < this.bindingCount; i++) {
var binding = bindingsCopy[i];
if (binding != null) {
var deletion = deletions.get (binding.getTriggerSequence ());
if (Clazz.instanceOf (deletion, org.eclipse.jface.bindings.Binding)) {
if ((deletion).deletes (binding)) {
bindingsCopy[i] = null;
deletedCount++;
}} else if (Clazz.instanceOf (deletion, java.util.Collection)) {
var collection = deletion;
var iterator = collection.iterator ();
while (iterator.hasNext ()) {
var deletionBinding = iterator.next ();
if (Clazz.instanceOf (deletionBinding, org.eclipse.jface.bindings.Binding)) {
if ((deletionBinding).deletes (binding)) {
bindingsCopy[i] = null;
deletedCount++;
break;
}}}
}}}
var returnValue =  new Array (this.bindingCount - deletedCount);
var index = 0;
for (var i = 0; i < this.bindingCount; i++) {
var binding = bindingsCopy[i];
if (binding != null) {
returnValue[index++] = binding;
}}
return returnValue;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "resolveConflicts", 
($fz = function (bindings) {
var matches =  new java.util.ArrayList ();
var bindingItr = bindings.iterator ();
var bestMatch = bindingItr.next ();
matches.add (bestMatch);
while (bindingItr.hasNext ()) {
var current = bindingItr.next ();
var currentScheme = current.getSchemeId ();
var bestScheme = bestMatch.getSchemeId ();
if (!currentScheme.equals (bestScheme)) {
var goToNextBinding = false;
for (var i = 0; i < this.activeSchemeIds.length; i++) {
var schemePointer = this.activeSchemeIds[i];
if (currentScheme.equals (schemePointer)) {
bestMatch = current;
matches.clear ();
matches.add (current);
goToNextBinding = true;
break;
} else if (bestScheme.equals (schemePointer)) {
goToNextBinding = true;
break;
}}
if (goToNextBinding) {
continue ;}}if (current.getType () > bestMatch.getType ()) {
bestMatch = current;
matches.clear ();
matches.add (current);
continue ;} else if (bestMatch.getType () > current.getType ()) {
continue ;}matches.add (current);
}
return matches;
}, $fz.isPrivate = true, $fz), "java.util.Collection");
Clazz.defineMethod (c$, "resolveConflicts", 
($fz = function (bindings, activeContextTree) {
var conflict = false;
var bindingItr = bindings.iterator ();
var bestMatch = bindingItr.next ();
while (bindingItr.hasNext ()) {
var current = bindingItr.next ();
var currentScheme = current.getSchemeId ();
var bestScheme = bestMatch.getSchemeId ();
if (!currentScheme.equals (bestScheme)) {
var goToNextBinding = false;
for (var i = 0; i < this.activeSchemeIds.length; i++) {
var schemePointer = this.activeSchemeIds[i];
if (currentScheme.equals (schemePointer)) {
bestMatch = current;
conflict = false;
goToNextBinding = true;
break;
} else if (bestScheme.equals (schemePointer)) {
goToNextBinding = true;
break;
}}
if (goToNextBinding) {
continue ;}}var currentContext = current.getContextId ();
var bestContext = bestMatch.getContextId ();
if (!currentContext.equals (bestContext)) {
var goToNextBinding = false;
var contextPointer = currentContext;
while (contextPointer != null) {
if (contextPointer.equals (bestContext)) {
bestMatch = current;
conflict = false;
goToNextBinding = true;
break;
}contextPointer = activeContextTree.get (contextPointer);
}
contextPointer = bestContext;
while (contextPointer != null) {
if (contextPointer.equals (currentContext)) {
goToNextBinding = true;
break;
}contextPointer = activeContextTree.get (contextPointer);
}
if (goToNextBinding) {
continue ;}}if (current.getType () > bestMatch.getType ()) {
bestMatch = current;
conflict = false;
continue ;} else if (bestMatch.getType () > current.getType ()) {
continue ;}conflict = true;
}
if (conflict) {
return null;
}return bestMatch;
}, $fz.isPrivate = true, $fz), "java.util.Collection,java.util.Map");
Clazz.overrideMethod (c$, "schemeChanged", 
function (schemeEvent) {
if (schemeEvent.isDefinedChanged ()) {
var scheme = schemeEvent.getScheme ();
var schemeIdAdded = scheme.isDefined ();
var activeSchemeChanged = false;
if (schemeIdAdded) {
if (this.definedSchemes == null) {
this.definedSchemes = [scheme];
this.definedSchemeCount = 1;
} else if (this.definedSchemeCount < this.definedSchemes.length) {
this.definedSchemes[this.definedSchemeCount++] = scheme;
} else {
var newArray =  new Array (this.definedSchemes.length * 2);
System.arraycopy (this.definedSchemes, 0, newArray, 0, this.definedSchemes.length);
this.definedSchemes = newArray;
this.definedSchemes[this.definedSchemeCount++] = scheme;
}} else {
if (this.definedSchemes != null) {
var found = false;
for (var i = 0; i < this.definedSchemeCount; i++) {
if (scheme === this.definedSchemes[i]) {
found = true;
}if (found) {
if (i + 1 < this.definedSchemes.length) {
this.definedSchemes[i] = this.definedSchemes[i + 1];
} else {
this.definedSchemes[i] = null;
}}}
if (found) {
this.definedSchemeCount--;
}}if (this.activeScheme === scheme) {
this.activeScheme = null;
this.activeSchemeIds = null;
activeSchemeChanged = true;
this.clearSolution ();
}}this.fireBindingManagerChanged ( new org.eclipse.jface.bindings.BindingManagerEvent (this, false, null, activeSchemeChanged, scheme, schemeIdAdded, false, false));
}}, "org.eclipse.jface.bindings.SchemeEvent");
Clazz.defineMethod (c$, "setActiveBindings", 
($fz = function (activeBindings, activeBindingsByCommandId, prefixTable) {
this.activeBindings = activeBindings;
var previousBindingsByParameterizedCommand = this.activeBindingsByParameterizedCommand;
this.activeBindingsByParameterizedCommand = activeBindingsByCommandId;
this.prefixTable = prefixTable;
this.fireBindingManagerChanged ( new org.eclipse.jface.bindings.BindingManagerEvent (this, true, previousBindingsByParameterizedCommand, false, null, false, false, false));
}, $fz.isPrivate = true, $fz), "java.util.Map,java.util.Map,java.util.Map");
Clazz.defineMethod (c$, "setActiveScheme", 
function (scheme) {
if (scheme == null) {
throw  new NullPointerException ("Cannot activate a null scheme");
}if ((scheme == null) || (!scheme.isDefined ())) {
throw  new org.eclipse.core.commands.common.NotDefinedException ("Cannot activate an undefined scheme");
}if (org.eclipse.jface.util.Util.equals (this.activeScheme, scheme)) {
return ;
}this.activeScheme = scheme;
this.activeSchemeIds = this.getSchemeIds (this.activeScheme.getId ());
this.clearSolution ();
this.fireBindingManagerChanged ( new org.eclipse.jface.bindings.BindingManagerEvent (this, false, null, true, null, false, false, false));
}, "org.eclipse.jface.bindings.Scheme");
Clazz.defineMethod (c$, "setBindings", 
function (bindings) {
if (java.util.Arrays.equals (this.bindings, bindings)) {
return ;
}if ((bindings == null) || (bindings.length == 0)) {
this.bindings = null;
this.bindingCount = 0;
} else {
var bindingsLength = bindings.length;
this.bindings =  new Array (bindingsLength);
System.arraycopy (bindings, 0, this.bindings, 0, bindingsLength);
this.bindingCount = bindingsLength;
}this.clearCache ();
}, "~A");
Clazz.defineMethod (c$, "setLocale", 
function (locale) {
if (locale == null) {
throw  new NullPointerException ("The locale cannot be null");
}if (!org.eclipse.jface.util.Util.equals (this.locale, locale)) {
this.locale = locale;
this.locales = org.eclipse.jface.bindings.BindingManager.expand (locale, "_");
this.clearSolution ();
this.fireBindingManagerChanged ( new org.eclipse.jface.bindings.BindingManagerEvent (this, false, null, false, null, false, true, false));
}}, "~S");
Clazz.defineMethod (c$, "setPlatform", 
function (platform) {
if (platform == null) {
throw  new NullPointerException ("The platform cannot be null");
}if (!org.eclipse.jface.util.Util.equals (this.platform, platform)) {
this.platform = platform;
this.platforms = org.eclipse.jface.bindings.BindingManager.expand (platform, "");
this.clearSolution ();
this.fireBindingManagerChanged ( new org.eclipse.jface.bindings.BindingManagerEvent (this, false, null, false, null, false, false, true));
}}, "~S");
Clazz.defineStatics (c$,
"DEBUG", false,
"LOCALE_SEPARATOR", "_");
});
