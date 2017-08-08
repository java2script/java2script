Clazz.declarePackage ("org.ultrastudio.boids");
c$ = Clazz.declareType (org.ultrastudio.boids, "Constants");
Clazz.defineStatics (c$,
"stepTime", 0.1,
"holdFlockCenter", 0.001,
"avoidNeibourthood", 0.01,
"count", 8,
"keepAwayDistance", 50,
"minSpeed", 2);
c$.maxSpeed = c$.prototype.maxSpeed = org.ultrastudio.boids.Constants.minSpeed * 5;
Clazz.defineStatics (c$,
"speedAdjust", 0.001);
