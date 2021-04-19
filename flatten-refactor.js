export const flatten = (data) => {  
  const isArray = Array.isArray(data);
  const isObj = typeof data === 'object';
  let arrData = data.length && !isArray ? [...data] :  Object.keys(data);
  
  if (data.length && data.length === 1) {
    return data[0];
  } 
  
  if (isArray || isObj || data.length) {    
    return arrData.reduce((arr, arrItem) => {
      const item = isObj ? data[arrItem] : arrItem;
      const flatItem = flattenNew(item);
      const itemIsArr = Array.isArray(flatItem) && flatItem.length;
      itemIsArr ? flatItem.forEach(x => arr.push(x)) : arr.push(flatItem);  
      return arr;
    }, []);
  }
  
  return data;
}