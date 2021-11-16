export function toFlatPropertyMap(obj: object, keySeparator = '.') {
  const flattenRecursive = (
    obj: object,
    parentProperty?: string,
    propertyMap: Record<string, unknown> = {}
  ) => {
    for (const [key, value] of Object.entries(obj)) {
      const property = parentProperty
        ? `${parentProperty}${keySeparator}${key}`
        : key;
      if (value && typeof value === 'object') {
        flattenRecursive(value, property, propertyMap);
      } else {
        propertyMap[property] = value;
      }
    }
    return propertyMap;
  };
  return flattenRecursive(obj);
}
