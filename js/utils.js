// Utility functions

/**
 * Format tanggal ke format Indonesia
 * @param {Date|string} date - Tanggal yang akan diformat
 * @returns {string} Tanggal dalam format Indonesia
 */
const showFormattedDate = (date) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    return new Date(date).toLocaleDateString("id-ID", options);
};

/**
 * Generate ID unik berdasarkan timestamp
 * @returns {number} ID unik
 */
const generateId = () => {
    return Date.now();
};

/**
 * Truncate text jika terlalu panjang
 * @param {string} text - Teks yang akan dipotong
 * @param {number} maxLength - Panjang maksimum
 * @returns {string} Teks yang sudah dipotong
 */
const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

/**
 * Escape HTML untuk mencegah XSS
 * @param {string} text - Teks yang akan di-escape
 * @returns {string} Teks yang sudah di-escape
 */
const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};