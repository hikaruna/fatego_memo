export default class ActiveObject {
  static set data(data) {
    this._data = data;
    ActiveObject.loadedClasses[this.name] = this;

    this.where = (where = {}) => {
      return this._data.filter(e => {
        return Object.keys(where).reduce((ac,c)=> {
          return ac && (where[c] === e[c]);
        }, true);
      }).map(e => new this(e));
    };

    this.findBy = (where = {}) => {
      return this.where()[0] || null;
    };

    this.find = (id) => {
      return this.findBy({id: id});
    };

    this.all = () => {
      return this.where();
    };

    data.map(e => Object.keys(e)).flatten().uniq().map(e => {
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
          if(!(e[name.singularize()] === undefined)) {
            return e[name.singularize()];
          }else if(!(e[name.pluralize()] === undefined)) {
            return e[name.pluralize()];
          }else {
            return undefined;
          }
        }).flatten();
      }
    });
  }

  static has_many(name, option = {}) {
    console.log(`has_many ${name}`);
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
