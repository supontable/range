const bordByNames = (conditions, names) => {
  function getMax(name) {
    return conditions.reduce((max, b) => Math.max(max, b[`${name}Max`]), conditions[0][`${name}Max`]);
  }
  function getMin(name) {
    return conditions.reduce((min, b) => Math.min(min, b[`${name}Min`]), conditions[0][`${name}Min`]);
  }
  let result = {}
  names.map(name => {
    result[name] = [getMin(name), getMax(name)]
    return name
  })
  return result
}
const prepareConditions = (conditions, names) => {
  return [conditions, bordByNames(conditions, names), conditions.length]
}

export {prepareConditions}