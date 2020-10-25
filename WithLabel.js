/**
 * @param text {Text}
 * @param label {string}
 */

const WithLabel = (text, label) => {

  const TextWithLabel = `${ label }: ${ text.text }`;

  Object.defineProperty(text, 'text', {
    get: function() { return TextWithLabel; }
  });
  return text;
};

export default WithLabel;
