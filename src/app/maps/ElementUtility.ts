
export type ElementOffset = {
	left: number;
	top: number
  };
  
  /**
   * Returns an element's position relative to the whole document (page).
   *
   * If the element does not exist, returns O/O (top-left window corner).
   *
   * @example getOffset(document.getElementById('#element'));
   *
   * @param el
   * @see https://stackoverflow.com/a/28222246/2391795
   */
  export const getElementOffset = (el: Element | null): ElementOffset => {
	const rect = el.getBoundingClientRect();
  
	return {
	  left: (rect.left || 0) + window.scrollX,
	  top: (rect.top || 0) + window.scrollY,
	};
  };
  
  export default getElementOffset;

