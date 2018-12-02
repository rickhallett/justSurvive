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
