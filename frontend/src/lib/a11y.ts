/**
 * A11y On Click
 *
 * Adds accessibility attributes to an element
 *
 * @param {Function} func - The function to call when the element is clicked
 */
export const a11yOnClick = (func: () => void) => {
    return {
        onClick: func,
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                func();
            }
        },
    };
};
