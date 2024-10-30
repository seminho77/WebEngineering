// ui.js
import { fetchImageUrl } from './api.js';
import { checkImageAvailability } from './utils.js';

const placeholderImage = "https://via.placeholder.com/200x200.png?text=Image+Not+Available";

export const toggleCommentsSection = () => {
    const showHideBtn = document.querySelector('.show-hide');
    const commentWrapper = document.querySelector('.comment-wrapper');
    const isVisible = commentWrapper.style.display === 'block';

    commentWrapper.style.display = isVisible ? 'none' : 'block';
    showHideBtn.textContent = isVisible ? 'Show comments' : 'Hide comments';
};

export const renderBearData = async (bears) => {
    const moreBearsSection = document.querySelector('.more_bears');
    moreBearsSection.innerHTML = '';

    if (bears.length === 0) {
        moreBearsSection.innerHTML = '<p>No bear data available at the moment. Please try again later.</p>';
        return;
    }

    for (const bear of bears) {
        const imageUrl = await checkImageAvailability(bear.image || placeholderImage);
        const bearElement = document.createElement('div');
        bearElement.innerHTML = `
      <h3>${bear.name} (${bear.binomial})</h3>
      <img src="${imageUrl}" alt="${bear.name}" style="width:200px; height:auto;">
      <p><strong>Range:</strong> ${bear.range}</p>
    `;
        moreBearsSection.appendChild(bearElement);
    }
};

export const handleFormSubmission = () => {
    const form = document.querySelector('.comment-form');
    const list = document.querySelector('.comment-container');

    form.onsubmit = (event) => {
        event.preventDefault();
        const name = form.elements['name'].value.trim();
        const comment = form.elements['comment'].value.trim();

        if (!name || !comment) return;

        const listItem = document.createElement('li');
        listItem.innerHTML = `<p>${name}</p><p>${comment}</p>`;
        list.appendChild(listItem);

        form.reset();
    };
};
