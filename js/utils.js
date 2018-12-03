function leftPad(attr, points, padLength = 20) {
  return `${attr}${` `.repeat(padLength - attr.length)}-> ${points}`;
}

// Higher order function for wrapping other functions and catching errors
function catchErrors(fn) {
  return function(...args) {
    return fn(...args).catch((err) => {
      throw Error(err);
      console.error(err);
    });
  };
}

function append(parent, el) {
  return parent.appendChild(el);
}

// create a version of a function that can only be called once
function once ( fn ) {
    let called = false;
    return function () {
      if ( !called ) {
        called = true;
        fn.apply( this, arguments );
      }
    };
  }

/**
 * creates a function that can toggle between two attribute values
 * @param {*} el
 * @param {*} attr
 * @param {*} primary
 * @param {*} secondary
 */
function toggleAttribute ( el, attr, primary, secondary ) {
  let mrSwitch = false;
  return function () {
    mrSwitch = !mrSwitch;
    return mrSwitch
      ? el.setAttribute( attr, primary )
      : el.setAttribute( attr, secondary );
  };
}

/**
 * Create a cached version of a pure function.
 */
function cached ( fn ) {
  var cache = Object.create( null );
  return function cachedFn ( str ) {
    var hit = cache[str];
    return hit || ( cache[str] = fn( str ) );
  };
}

