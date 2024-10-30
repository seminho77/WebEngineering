// utils.js

export const checkImageAvailability = async (url) => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok ? url : "https://via.placeholder.com/200x200.png?text=Image+Not+Available";
    } catch (error) {
        console.error("Error checking image availability:", error);
        return "https://via.placeholder.com/200x200.png?text=Image+Not+Available";
    }
};
