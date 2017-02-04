export default class ActiveObject {
  static set data(data) {
    this._data = data;

    this.where = (where = {}) => {
      return this._data.filter(e => {
        return Object.keys(where).reduce((ac,c)=> {
          return ac && (where[c] === e[c]);
        }, true);
      }).map(e => new this(e));
    };

    this.findBy = (where = {}) => {
      return this.where()[0];
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

  static has_many(name, option = {}) {
    console.log(`has_many ${name}`);
    let defaultOption = { 
      foreign_key: `${this.name.toSnakeCase()}_id`
    };
    option = Object.assign(defaultOption, option);
    Object.defineProperty(this.prototype, name, {
      get: function() {
        let where = {};
        where[option.foreign_key] = this.id;
        return option.class.where(where);
      }
    });
  }

  constructor(value) {
    this.value = value;
  }

  toJson() {
    return JSON.stringify(this.value);
  }
}
