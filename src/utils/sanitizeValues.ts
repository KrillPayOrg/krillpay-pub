export function removeEmptyValues(obj: any) {
  // Iterate through the object's keys
  for (let key in obj) {
    // Check if the value of the property is empty
    if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
      // If the value is empty, remove the property from the object
      delete obj[key];
    }
  }
  return {user: obj};
}
