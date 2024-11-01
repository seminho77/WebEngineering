import { checkImageAvailability } from './utils';

const placeholderImage =
  'https://via.placeholder.com/200x200.png?text=Image+Not+Available';

export const toggleCommentsSection = (): void => {
  const showHideBtn = document.querySelector('.show-hide') as HTMLDivElement;
  const commentWrapper = document.querySelector(
    '.comment-wrapper'
  ) as HTMLDivElement;

  if (showHideBtn === null || commentWrapper === null) {
    console.error('Required elements not found in the DOM');
    return;
  }

  commentWrapper.style.display = 'none';
  showHideBtn.textContent = 'Show comments';

  showHideBtn.onclick = () => {
    const isVisible = commentWrapper.style.display === 'block';
    commentWrapper.style.display = isVisible ? 'none' : 'block';
    showHideBtn.textContent = isVisible ? 'Show comments' : 'Hide comments';
  };
};

export const renderBearData = async (
  bears: Array<{ name: string; binomial: string; image: string; range: string }>
): Promise<void> => {
  const moreBearsSection = document.querySelector('.more_bears');

  if (moreBearsSection === null) {
    console.error('The .more_bears element was not found in the DOM');
    return;
  }

  if (bears.length === 0) {
    moreBearsSection.innerHTML =
      '<p>No bear data available at the moment. Please try again later.</p>';
    return;
  }

  for (const bear of bears) {
    const imageUrl = await checkImageAvailability(
      bear.image !== undefined && bear.image !== null && bear.image !== ''
        ? bear.image
        : placeholderImage
    );
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
  const list = document.querySelector('.comment-container');

  if (form === null || list === null) {
    console.error('Form or comment container not found in the DOM');
    return;
  }
  const errorMessage = document.createElement('p');

  errorMessage.style.color = 'red';
  errorMessage.style.display = 'none';
  errorMessage.textContent = 'Both name and comment are required.';
  form.appendChild(errorMessage);

  form.onsubmit = (event: Event) => {
    event.preventDefault();
    const name = (
      form.elements.namedItem('name') as HTMLInputElement
    ).value.trim();
    const comment = (
      form.elements.namedItem('comment') as HTMLInputElement
    ).value.trim();

    if (name === '' || comment === '') {
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
