/**
 * Name is multiple?
 *
 * @param {string} val - element.name
 * @return {boolean} multiple = true
 */
const isMultipleName = val => {
  return !!val.match(/\[\]/);
};

/**
 * Remove bracket for name
 *
 * @param {string} val - element name
 * @return {string} remove bracket name
 */
const removeBracket = val => {
  return val.replace(/\[\]/, '');
};

/**
 * Get multiple element is
 *
 * @param {HTMLElement} $el - html elemnt
 * @return {boolean} multiple = true
 */
const isMultiSelect = $el => $el.options && $el.multiple;

/**
 * Get selected options from a multi-select as an array
 * @param {HTMLOptionsCollection} $options - options for the select
 * @return {array} an array of selected option values
 */
const getSelectedValues = $options => [].reduce.call($options, (arr, opt) => opt.selected ? arr.concat(opt.value) : arr, []);

/**
 * All elements data change to JSON
 * Not support: multi checkbox
 *
 * @param {array} elements - document.querySelector('form').elements
 * @return {object} JSON from parameter
 */
const toJSON = elements => [].reduce.call(elements, (data, element) => {
  const json = data;

  if (isMultipleName(element.name)) {
    json[removeBracket(element.name)] = (json[removeBracket(element.name)] || []).concat(element.value);
  } else if (isMultiSelect(element)) {
    json[element.name] = getSelectedValues(element);
  } else if (element.type === 'checkbox') {
    json[element.name] = element.checked;
  } else {
    json[element.name] = element.value;
  }

  return json;
}, {});

/**
 * Form element change to JSON
 *
 * @param {HTMLFormElement} $form - document.querySelector('form')
 * @return {object} form data change to JSON
 */
const formToJSON = ($form) => {
  const filtered = Array.from($form.elements).filter($el => $el.name !== '');
  const json = toJSON(filtered) || {};
  return json;
};

module.exports = formToJSON;
