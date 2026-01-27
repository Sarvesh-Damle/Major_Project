/**
 * Add Cloudinary transformations to an image URL for optimization.
 * Only modifies URLs from res.cloudinary.com.
 *
 * @param {string} url - Original Cloudinary image URL
 * @param {object} options - Transformation options
 * @param {number} [options.width] - Desired width
 * @param {string} [options.quality='auto'] - Quality setting
 * @param {string} [options.format='auto'] - Format setting
 * @returns {string} Optimized URL
 */
export const getOptimizedUrl = (url, { width, quality = 'auto', format = 'auto' } = {}) => {
  if (!url || !url.includes('res.cloudinary.com')) return url;

  const transforms = [`q_${quality}`, `f_${format}`];
  if (width) transforms.push(`w_${width}`);

  const transformStr = transforms.join(',');

  // Insert transforms after /upload/
  return url.replace('/upload/', `/upload/${transformStr}/`);
};
