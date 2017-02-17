import Util from 'Util.js';

export default class ActiveObject {
  static set data(data) {
    this._data = data;
    ActiveObject.loadedClasses[this.name] = this;

    this.where = (where = {}) => {
      return this.all().where(where);
    };


    this.findBy = (where = {}) => {
      return this.all().findBy(where);
    };

    this.find = (id) => {
      return this.findBy({id: id});
    };

    this.all = () => {
      return new ActiveCollection(this._data, this);
    };

    this.columns = data.map(e => Object.keys(e)).flatten().uniq();

    this.columns.map(e => {
      Object.defineProperty(this.prototype, e, {
        get: function() {
          if(!this.value.hasOwnProperty(e)) {
            return null;
          }
          return this.value[e];
        }
      });
    });
  }

  static has_many_through(name, through, option = {}) {
    Object.defineProperty(this.prototype, name, {
      get: function() {
        return this[through].map(e => {
          if(option.hasOwnProperty('source')) {
            return e[option.source];
          }else if(!(e[name.singularize()] === undefined)) {
            return e[name.singularize()];
          }else if(!(e[name] === undefined)) {
            return e[name];
          }else {
            return undefined;
          }
        }).flatten().uniq((a,b) => a.id === b.id);
      }
    });
    Object.defineProperty(this.prototype, `${name.singularize()}_ids`, {
      get: function() {
        return this[name].map(e => e.id);
      }
    });
  }

  static has_many(name, option = {}) {
    if(option.hasOwnProperty('through')) {
      return this.has_many_through(name, option.through, option);
    }

    let defaultOption = { 
      foreign_key: `${this.name.toSnakeCase()}_id`,
      class_name: name.classify()
    };
    option = Object.assign(defaultOption, option);
    Object.defineProperty(this.prototype, name, {
      get: function() {
        let where = {};
        where[option.foreign_key] = this.id;
        return ActiveObject.loadClass(option.class_name).where(where);
      }
    });
    Object.defineProperty(this.prototype, `${name.singularize()}_ids`, {
      get: function() {
        return this[name].map(e => e.id);
      }
    });
  }

  static belongs_to(name, option ={}) {
    let defaultOption = { 
      foreign_key: `${name}_id`,
      class_name: name.classify()
    };
    option = Object.assign(defaultOption, option);
    Object.defineProperty(this.prototype, name, {
      get: function() {
        return ActiveObject.loadClass(option.class_name).find(this[option.foreign_key]);
      }
    });
  }

  static loadClass(class_name) {
    if(!ActiveObject.loadedClasses.hasOwnProperty(class_name)) {
      require(`models/${class_name}.js`);
    }
    return ActiveObject.loadedClasses[class_name];
  }

  constructor(value) {
    this.value = value;
  }

  toJson() {
    return JSON.stringify(this.value);
  }
}
ActiveObject.loadedClasses = {};

export class ActiveCollection {
  constructor(data, type) {
    this.data = data;
    this.type = type;
  }

  where(option = {}) {
    return new ActiveCollection(
      this.data.filter(e => {
        return Object.keys(option).reduce((ac,c)=> {
          return ac && (option[c] === e[c]);
        }, true);
      }),
      this.type
    );
  }

  order(...args) {
    return new ActiveCollection(
      args.reverse().reduce((result, arg) => {
        let key;
        let order;
        if(typeof arg === 'string') {
          // case "key asc|desc"
          const matched = arg.match(/(.*) (asc|desc)$/);
          if(matched == null) {
            key = arg;
            order = 'asc';
          }else {
            key = matched[1];
            order = matched[2];
          }
        }else {
          // case { "key": "asc|desc" }
          key = Object.keys(arg)[0];
          order = arg[Object.keys(arg)[0]];
        }
        return result.sort(this.generateDictionaryCompare(key, order));
      }, this.data.slice()),
      this.type
    );
  }

  findBy(option) {
    return this.where(option).first;
  }

  map(...args) {
    return this.values.map(...args);
  }

  get first() {
    if(this.data.length == 0) {
      return null;
    }
    return new this.type(this.data[0]);
  }

  get values() {
    if(typeof this._values === 'undefined') {
      this._values = this.data.map((e) => new this.type(e));
    }
    return this._values;
  }

  [Symbol.iterator]() {
    return this.values;
  }

  get length() {
    return this.values.length;
  }

  get(index) {
    return this.values[index];
  }

  toJson() {
    return JSON.stringify(this.data);
  }

  // private
  generateDictionaryCompare(key, order='asc') {
    const o = {asc: 1, desc: -1}[order];
    return (a,b) => {
      a = `${a[key]}`;
      b = `${b[key]}`;
      if(order === 'asc') {
        return a < b ? -1 : 1;
      }else if(order === 'desc') {
        return a > b ? -1 : 1;
      }else {
        throw new Error();
      }
    };
  }
}

class A extends ActiveObject {
}
A.data = [{"id":1},{"id":2}];
const result = A.where();
console.log(result);
