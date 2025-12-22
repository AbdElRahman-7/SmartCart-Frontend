/**
 * Generates a deterministic image URL based on product ID and name.
 * @param {number|string} id - The product ID.
 * @param {string} [name=''] - The product name for specific image matching.
 * @returns {string} The image URL.
 */
export const getProductImage = (id, name = '') => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes('iphone')) {
        return 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80';
    }

    if (lowerName.includes('ipad')) {
        return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80';
    }

    if (lowerName.includes('macbook') || lowerName.includes('laptop')) {
        return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=500&q=80';
    }

    // using a reliable placeholder service with a seed to ensure the same image for the same product
    return `https://picsum.photos/seed/${id}/400/400`;
};

/**
 * Generates an array of deterministic image URLs based on product ID and name.
 * @param {number|string} id - The product ID.
 * @param {string} [name=''] - The product name for specific image matching.
 * @param {number} count - Number of images to generate.
 * @returns {string[]} Array of image URLs.
 */
export const getProductImages = (id, name = '', count = 3) => {
    const mainImage = getProductImage(id, name);
    // Create variations or just return same/similar for simplicity
    // For specific devices, we might want slightly different angles if available, 
    // but for now let's just use the main image + some generic tech ones as gallery
    return [
        mainImage,
        `https://picsum.photos/seed/${id}-1/600/600`, // random gallery 1
        `https://picsum.photos/seed/${id}-2/600/600`  // random gallery 2
    ];
};
