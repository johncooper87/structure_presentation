type QueryFieldValue = boolean | string | number | (boolean | string | number)[];

type QueryFieldOrder = 'asc' | 'desc';

type QueryFieldOperator = '=' | '=~' | '!=';

interface QueryFieldExpression {
  operator?: QueryFieldOperator;
  value?: QueryFieldValue;
  order?: QueryFieldOrder;
}

class QueryFields {
  private exprList = new Map<string, QueryFieldExpression | QueryFields>();

  private setExpression(name: string, expression: QueryFieldExpression) {
    let expr = this.exprList.get(name);
    if (expr instanceof QueryFields) expr = {};
    this.exprList.set(name, {
      ...expr,
      ...expression,
    });
  }

  add(name: string) {
    this.exprList.set(name, undefined);
    return this;
  }

  setEqual(name: string, value: QueryFieldValue, negate: boolean = false) {
    this.setExpression(name, {
      operator: negate ? '!=' : '=',
      value,
    });
    return this;
  }

  setLike(name: string, value: QueryFieldValue) {
    this.setExpression(name, {
      operator: '=~',
      value,
    });
    return this;
  }

  expand(name: string, subfields: QueryFields) {
    this.exprList.set(name, subfields);
    return this;
  }

  orderBy(name: string, order: QueryFieldOrder = 'asc') {
    this.setExpression(name, { order });
    return this;
  }

  subfields(name: string) {
    const subfields = this.exprList.get(name);
    if (subfields instanceof QueryFields) return subfields;
    return undefined;
  }

  toString(): string {
    const { exprList } = this;
    const keys = [...exprList.keys()];
    return keys
      .map((name) => {
        const expr = exprList.get(name);
        if (expr === undefined) return name;
        if (expr instanceof QueryFields) return name + '[' + expr.toString() + ']';
        const { operator, value, order } = expr;
        return (
          name +
          (value === undefined
            ? ''
            : operator + (value instanceof Array ? value.join('|') : value)) +
          (order ? ':' + order : '')
        );
      })
      .join(',');
  }
}

export default QueryFields;
