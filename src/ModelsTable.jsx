import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'react-fa';
import QueryLink from 'QueryLink.jsx';

export default class ModelsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.models = this.props.models.order(...this.props.order);
    this.state.orders = this.props.order;
    this.columns = props.columns;
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
    let attrs = columns.filter(e => e.constructor == String).map(e => {
      return {value: model[e]};
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

    let orders = this.state.orders
    orders = orders.map(order => this.parseOrderString(order));

    const order = orders.filter(e => e.by === column)[0] || null;
    if(order === null) {
      return <Icon name="sort" />;
    }
    if(order.direction === 'asc') {
      return <Icon name="sort-asc" />;
    }else if(order.direction === 'desc') {
      return <Icon name="sort-desc" />;
    }else {
      throw new Error(`Illegal order direction ${orderDirection}`);
    }
  }

  // 'attr desc' -> {by: 'attr', direction: 'desc'}
  parseOrderString(orderString) {
    const matched = orderString.match(/(.*) (asc|desc)$/);
    if(matched == null) {
      return {by: orderString, direction: 'asc'};
    }else {
      return {by: matched[1], direction: matched[2]};
    }
  }

  onSort(column) {
    let order = this.state.orders
      .map(order => this.parseOrderString(order))
      .filter(order => order.by === column)[0] || null;
    if(order === null || order.direction === 'desc') {
      this.state.orders = [`${column} asc`];
    }else {
      this.state.orders = [`${column} desc`];
    }
    this.state.models = this.state.models.order(...this.state.orders);
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
                  }else if(e.constructor == String) {
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
          {this.buildTRecordsForManyModels(this.columns, this.state.models).map((tr,i) => {
            return (
              <tr key={`table_${i}`}>
                {tr.map((td,j) => {
                  return (
                    <td key={`table_${i}_${j}`} rowSpan={td.rowSpan}>
                      {td.value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
