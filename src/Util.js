import Inflector from 'i';

export default class Util {
  static where(from, by) {
    return from.filter(e => {
      return Object.keys(by).reduce((ac,c)=> {
        return ac && (by[c] === e[c]);
      }, true);
    });
  }
}

Number.prototype.times = function(func) {
  return Array(this).fill().map((e,i) => i);
}

Array.prototype.flatten = function() {
  return Array.prototype.concat.apply([], this);
};

Array.prototype.uniq = function(predicate = null) {
  if(predicate === null) {
    return Array.from(new Set(this));
  }
  return this.filter((e,i,array) => {
    return this.findIndex(e2 => predicate(e, e2)) === i;
  })
};

String.prototype.toSnakeCase = function() {
  return this.split(".").map(e => e.replace(/^./, (a)=> a.toLowerCase()).split(/(?=[A-Z])/).join("_").replace(/_([A-Z])/, (a,b)=> "_" + b.toLowerCase())).join(".");
};

String.prototype.classify = function() {
  return this.split('.').map(e => {
    return e.split('_').map(e1 => e1.replace(/^./, (e2) => e2.toUpperCase())).join('');
  }).join('.').singularize();
};

String.prototype.toCamelCase = function() {
  return this.replace(/_./g, function(s) {
    return s.charAt(1).toUpperCase();
  });
};

String.prototype.pluralize = function() {
  return new Inflector().pluralize(this);
}

String.prototype.singularize = function() {
  return new Inflector().singularize(this);
}
