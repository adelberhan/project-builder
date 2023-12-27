/**
 *
 * @param {string} text - The input text to be sliced.
 * @param {number} [max=50] - The maximum length of the sliced text. Default is 50.
 * @returns {string} - The sliced text with ellipsis if truncated.
 *
 * @example
 * // Truncate text to a maximum length of 20 characters
 * const result = textSlice("Lorem ipsum dolor sit amet", 20);
 * console.log(result); // Output: "Lorem ipsum dolor..."
 *
 * @example
 * // Use default maximum length (50 characters)
 * const result = textSlice("Lorem ipsum dolor sit amet");
 * console.log(result); // Output: "Lorem ipsum dolor sit amet"
 */
export function textSlice(text:string, max = 50) {
    if (text.length > max) {
        return text.slice(0, max) + '...';
    }
    return text;
}
