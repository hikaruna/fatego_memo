import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ModelsTable extends Component {

  constructor(props) {
    super(props);
    this.models = props.models;
    this.columns = props.columns;
  }

  getStringOrKey(ary) {
    return ary.map(e => {
    });
  }

  getDeepsCount(ary) {
    let a = ary.map(e => {
      if(typeof e === 'object' && !Array.isArray(e)) {
        return 1 + this.getDeepsCount(e[Object.keys(e)[0]]);
      }else {
        return 1;
      }
    });
    return Math.max.apply(null, [0].concat(a));
  }


  getNodeCount(ary) {
    return ary.reduce((r,e) => {
      if(e.constructor == String) {
        return r+1;
      }
      return r+this.getNodeCount(e[Object.keys(e)[0]]);
    }, 0);
  }

  // unwrapする
  // [ a, b, { c: [ d, e] }, { f: [ g, { h: [ j, k]}]}] =>
  // [d, e, g, {h: [ j, k]}]
  unwrap(ary) {
    return ary.filter(e => e.constructor == Object).reduce((r,e) => {
      return r.concat(e[Object.keys(e)[0]]);
    }, []);
  }

  // 指定した回数分unwrapを行う
  // param c: unwrapを行う回数
  unwrapWithCount(ary, c) {
    if(c === 0) {
      return ary;
    }else if(c === 1) {
      return this.unwrap(ary);
    }else {
      return this.hoge(this.unwrap(ary), c -1);
    }
  }

  renderComponent(key, model) {
    if(new this.props.component({}) instanceof Component) {
      return new this.props.component({ value: model[key], model: model, column: key }).render();
    }
    if(this.props.component.constructor == Object) {
      return new this.props.component[key]({ value: model[key], model: model, column: key }).render();
    }
    return <td>{model[key]}</td>;
  }

  render() {
    return (
      <table className="table table-bordered">
        <thead>
          {Array(this.getDeepsCount(this.columns)).fill().map((_,i) => {
            return (
              <tr key={i}>
                {this.unwrapWithCount(this.props.columns, i).map((e,i,ary) => {
                  if(e.constructor == Object) {
                    const k = Object.keys(e)[0];
                    const v = e[k];
                    return ( <th key={`head_${i}_${k}`} colSpan={this.getNodeCount(v)}>{k}</th>);
                  }else if(e.constructor == String) {
                    return ( <th key={`head_${i}_${e}`} rowSpan={this.getDeepsCount(ary)}>{e}</th>);
                  }
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {this.models.map(model => {
            return (
              <tr key={`body_${model.id}`}>
                {this.columns.map(column => {
                  return this.renderComponent(column, model);
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
