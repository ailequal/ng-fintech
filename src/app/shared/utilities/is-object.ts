// Check if it's an object.
// @link https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript/8511350#8511350
export const isObject = (maybeObject: any): boolean => {
  return (
    typeof maybeObject === 'object' &&
    !Array.isArray(maybeObject) &&
    maybeObject !== null
  )
}
