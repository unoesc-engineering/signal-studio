import { max, median, min } from 'mathjs'
import outliers from 'outliers'
import isNumber from '../../utils/isNumber'

export async function iqrOutlierRemoval(input, filter) {
  const filteredInputValues = input.values.filter(isNumber)
  if (!filteredInputValues.length) {
    return input
  }

  console.time('iqr')
  const currentOutliers = outliers(input.values)
  const currentMedian = median(filteredInputValues)
  const values = input.values.map((value, index, list) =>
    currentOutliers.includes(value) ? currentMedian : value
  )
  const filteredOutputValues = values.filter(isNumber)
  console.timeEnd('iqr')

  return {
    ...input,
    values,
    minAmplitude: min(filteredOutputValues),
    maxAmplitude: max(filteredOutputValues),
  }
}
