import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { Icon } from 'react-fa';
import QueryLink from 'QueryLink.jsx';
import Util from 'Util.js';

export default class ModelsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.importStateFromLocation();
    this.component = this.props.component || DefaultTdComponent;
    this.columns = this.props.columns;
  }

  importStateFromLocation() {
    this.state.order = new URL(location.toString()).searchParams.get('order');
  }

  isValuePrimitive(value) {
    return value.constructor == String || value.constructor == Number;
  }

  getDeepsCount(ary) {
    let a = ary.map(e => {
      if(e.constructor == Object) {
        return 1 + this.getDeepsCount(e[Object.keys(e)[0]]);
      }else {
        return 1;
      }
    });
    return Math.max.apply(null, [0].concat(a));
  }

  getNodeCount(ary) {
    return ary.reduce((r,e) => {
      if(this.isValuePrimitive(e)) {
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
      return this.unwrap(this.unwrap(ary), c -1);
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

  // 非破壊のinsert
  // returns insertされたあとのarray
  arrayInserted(array, toIndex, ...elements) {
    let clone = array.concat([]);
    clone.splice(toIndex, 0, ...elements);
    return clone;
  }

  buildTRecordsForOneModel(columns, model) {
    let attrs = columns.filter(e => this.isValuePrimitive(e)).map(e => {
      return {
        column: e,
        model: model,
        value: model[e]
      };
    });
    let hasManyAssoc = columns.filter(e => e.constructor == Object)[0] || null;

    let hasManyModels;
    let recordsForOneModel;
    if(hasManyAssoc != null) {
      let assocName = Object.keys(hasManyAssoc)[0];
      let subColumns = hasManyAssoc[assocName];
      hasManyModels = this.buildTRecordsForManyModels(subColumns, model[assocName]);
      recordsForOneModel = hasManyModels.map((record, index) => {
        if(index === 0) {
          attrs.forEach(attr => {
            attr.rowSpan = hasManyModels.length
          });
          return this.arrayInserted(attrs, columns.indexOf(hasManyAssoc), ...record);
        }else {
          return record;
        }
      });
      //console.log(`recordsForOneModel: ${JSON.stringify(recordsForOneModel)}`);
      if(recordsForOneModel.length === 0) {
        attrs.forEach(attr => attr.rowSpan = 1);
        recordsForOneModel = [this.arrayInserted(attrs, columns.indexOf(hasManyAssoc), {value: null, rowSpan: 1})];
      }
    }else {
      attrs.forEach(attr => attr.rowSpan = 1);
      recordsForOneModel = [attrs];
    }
    //console.log(`model: ${JSON.stringify(model)}`);
    //console.log(`cols: ${JSON.stringify(columns)}`);
    //console.log(`attrs: ${JSON.stringify(attrs)}`);
    //console.log(`hasManyModels: ${JSON.stringify(hasManyModels)}`);
    //console.log(`recordsForOneModel: ${JSON.stringify(recordsForOneModel)}`);
    return recordsForOneModel;
  }

  buildTRecordsForManyModels(columns, models) {
    let recordsForManyModels = [];
    models.map(model => {
      recordsForManyModels = recordsForManyModels.concat(
        this.buildTRecordsForOneModel(columns, model)
      );
    });
    return recordsForManyModels;
  }

  renderSortIcon(column) {
    if(!this.columns.includes(column)) {
      return
    }
    let d = this.getOrderedDirectionBy(column);
    if(d === 'asc') {
      return <Icon name="sort-asc" />;
    }else if(d === 'desc') {
      return <Icon name="sort-desc" />;
    }else {
      return <Icon name="sort" />;
    }
  }

  // 'attr desc' -> {by: 'attr', direction: 'desc'}
  parseOrderString(orderString) {
    if(!/^(.*)(?: (asc|desc))?$/.test(orderString)) {
      return null;
    }
    const matched = orderString.match(/(.*) (asc|desc)$/);
    if(matched == null) {
      return {by: orderString, direction: 'asc'};
    }else {
      return {by: matched[1], direction: matched[2]};
    }
  }

  getOrderedDirectionBy(column) {
    if(!this.state.order) {
      return null;
    }
    let order = this.parseOrderString(this.state.order);
    if(order === null) {
      return null;
    }
    if(order.by !== column) {
      return null;
    }
    return order.direction;
  }

  onSort(column) {
    let direction = this.getOrderedDirectionBy(column) === 'asc' ? ' desc' : '';
    if(this.state.order) {
      let b = (this.parseOrderString(this.state.order) || {});
      if(b.by === column && b.direction === 'asc') {
        direction = ' desc';
      }
    }

    let url = new URL(location.toString());
    url.searchParams.set('order', `${column}${direction}`);
    browserHistory.push(url.pathname + url.search + url.hash);
    this.importStateFromLocation();
    this.forceUpdate();
  }

  render() {
    return (
      <table className="table table-bordered">
        <thead>
          {Array(this.getDeepsCount(this.columns)).fill().map((_,trIndex) => {
            return (
              <tr key={trIndex}>
                {this.unwrapWithCount(this.props.columns, trIndex).map((e,i,ary) => {
                  if(e.constructor == Object) {
                    const k = Object.keys(e)[0];
                    const v = e[k];
                    return ( <th key={`head_${i}_${k}`} colSpan={this.getNodeCount(v)}>{k}</th>);
                  }else if(this.isValuePrimitive(e)) {
                    const deepsCount = this.getDeepsCount(ary);
                    const k = `head_${i}_${e}`;
                    if(trIndex === 0) {
                      return (
                        <th key={k} rowSpan={deepsCount} onClick={() => this.onSort(e)}>
                          {e} {this.renderSortIcon(e)} 
                        </th>
                      );
                    }else {
                      return <th key={k} rowSpan={deepsCount}>{e}</th>;
                    }
                  }
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {this.buildTRecordsForManyModels(this.columns, this.sortedModels).map((tr,i) => {
            return (
              <tr key={`table_${i}`}>
                {tr.map((td,j) => {
                  return new this.component({
                    column: td.column,
                    model: td.model,
                    key: `table_${i}_${j}`,
                    rowSpan: td.rowSpan,
                    value: td.value,
                  }).render();
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  get sortedModels() {
    let models = this.props.models;
    if(this.state.order) {
      models = models.order(this.state.order);
    }
    return models;
  }
}

class DefaultTdComponent extends Component {
  render() {
    return <td key={this.props.key} rowSpan={this.props.rowSpan}>{this.props.value}</td>;
  }
}
