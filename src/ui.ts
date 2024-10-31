import { fetchImageUrl } from './api.ts';
import { checkImageAvailability } from './utils.ts';

const placeholderImage = "https://via.placeholder.com/200x200.png?text=Image+Not+Available";

export const toggleCommentsSection = (): void => {
    const showHideBtn = document.querySelector('.show-hide') as HTMLButtonElement;
    const commentWrapper = document.querySelector('.comment-wrapper') as HTMLElement;

    commentWrapper.style.display = 'none';
    showHideBtn.textContent = 'Show comments';

    showHideBtn.onclick = () => {
        const isVisible = commentWrapper.style.display === 'block';
        commentWrapper.style.display = isVisible ? 'none' : 'block';
        showHideBtn.textContent = isVisible ? 'Show comments' : 'Hide comments';
    };
};


export const renderBearData = async (bears: {name: string; binomial: string; image: string; range: string}[]): Promise<void> => {
    const moreBearsSection = document.querySelector('.more_bears') as HTMLDivElement;
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

export const handleFormSubmission = (): void => {
    const form = document.querySelector('.comment-form') as HTMLFormElement;
    const list = document.querySelector('.comment-container') as HTMLElement;
    const errorMessage = document.createElement('p') as HTMLParagraphElement;

    errorMessage.style.color = 'red';
    errorMessage.style.display = 'none';
    errorMessage.textContent = 'Both name and comment are required.';
    form.appendChild(errorMessage);

    form.onsubmit = (event: Event) => {
        event.preventDefault();
        const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
        const comment = (form.elements.namedItem('comment') as HTMLInputElement).value.trim();

        if (!name || !comment) {
            errorMessage.style.display = 'block';
            return;
        }

        errorMessage.style.display = 'none';

        const listItem = document.createElement('li');
        listItem.innerHTML = `<p>${name}</p><p>${comment}</p>`;
        list.appendChild(listItem);

        form.reset();
    };
};
