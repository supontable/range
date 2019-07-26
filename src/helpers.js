const MINMAX = ['Min', 'Max']
const prepareConditions = (conditions) => {

  const getVirtualConditions = (converted) => {
    function getMax(ranges) {
      return ranges.reduce((max, b) => Math.max(max, b[1]), ranges[0][0]);
    }
    function getMin(ranges) {
      return ranges.reduce((min, b) => Math.min(min, b[0]), ranges[0][0]);
    }
    let result = {}
    converted.names.forEach(name => {
      result[name] = [getMin(converted[name]), getMax(converted[name])]
      return name
    })
    return result
  }

  const convert = (conditions) => {
    let arrays = {}
    let names = new Set()
    let rest = new Set()
    let additional = conditions.map(condition => {
      Object.keys(condition).forEach((value) => {
        let pure = getPureName(value)
        pure
            ? names.add(pure)
            : rest.add({value: condition[value]})
      })
      names.forEach(name => {
        let marks = []
        let minmax = MINMAX.map(end => {
          let result = condition[name + end]
          marks.push(result)
          delete condition[name + end]
          return result
        })
        let rest = condition[`${name}Step`]
        delete condition[`${name}Step`]
        arrays[name] = pushOrAdd(arrays[name], minmax)
        arrays[`${name}Steps`] = pushOrAdd(arrays[`${name}Steps`], rest)
        arrays[`${name}Marks`] = pushOrAddMarks(marks, arrays[`${name}Marks`], rest)
      })
      return {
        ...condition
      }
    })
    return {...arrays, additional, names}
  }

  const converted = convert(conditions)
  return [converted, getVirtualConditions(converted), conditions.length]
}
const pushOrAdd = (array, value) => {
  array
      ? array.push(value)
      : array = [value]
  return array
}

const pushOrAddMarks = (toCheck, current, step) => {
  const [first, second] = toCheck
  if (current) {
    const [, {value}] = current
    value === first-step && current.push({value: second, label: second})
  } else {
    current = [{value: first, label: first},{value: second, label: second}]
  }
  return current
}

const getPureName = (name) => {
  let result = false
  MINMAX.forEach(end => {
    if (name.search(end) > 0) {
      result = name.replace(end, '')
    }
  })
  return result
}

const valueIn = (arrays, value) => {
  // console.log('value in', arrays, value)
  return arrays.reduce((acc, val, key) => {
    return valueInRange(val, value) ? key : acc
  }, 0)
}

const valueInRange = ([min, max], value) => {
  // console.log(min <= value && value <= max)
  return (min <= value && value <= max)
}
export {prepareConditions, valueIn}
