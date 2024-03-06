export const typeOf = (v: unknown) => Object.prototype.toString.call(v).toLowerCase().slice(8, -1)

export const is = (v: unknown, type: string) => typeOf(v) === type

export const isNumber = (v: unknown) => typeOf(v) === "number"

export const isString = (v: unknown) => typeOf(v) === "string"

export const isBoolean = (v: unknown) => typeOf(v) === "boolean"

export const isNull = (v: unknown) => typeOf(v) === "null"

export const isUndefined = (v: unknown) => typeOf(v) === "undefined"

export const isObject = (v: unknown) => typeOf(v) === "object"

export const isArray = (v: unknown) => typeOf(v) === "array"

export const isReference = (v: unknown) => isObject(v) || isArray(v)

export const isFunction = (v: unknown) => typeOf(v) === "function"

export const isFormDate = (v: unknown) => typeOf(v) === "formdata"

export default typeOf
