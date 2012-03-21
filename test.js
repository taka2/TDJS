function output(text, color) {
  var p = document.createElement("p");
  p.innerHTML = text;
  p.style.color = color;
  document.body.appendChild(p);
}

function assert(message, expr) {
  if(!expr) {
    throw new Error(message);
  }
  
  assert.count++;
  return true;
}

function testCase(name, tests) {
  assert.count = 0;
  var successful = 0;
  var testCount = 0;
  var hasSetup = typeof tests.setUp == "function";
  var hasTeardown = typeof tests.tearDown == "function";
  for(var test in tests) {
    if(!/^test/.test(test)) {
      continue;
    }
    
    testCount++;
    
    try {
      if(hasSetup) {
        tests.setUp();
      }
      tests[test]();
      output(test, "#0c0");
      if(hasTeardown) {
        tests.tearDown();
      }
      successful++;
    } catch(e) {
      output(test + " failed: " + e.message, "#c00");
    }
  }
  
  var color = successful == testCount ? "#0c0" : "#c00";
  output("<strong>" + testCount + " tests, " + 
         (testCount - successful) + " failures</strong>",
         color);
}
