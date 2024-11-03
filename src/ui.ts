import { checkImageAvailability } from './utils';

const placeholderImage =
  'https://via.placeholder.com/200x200.png?text=Image+Not+Available';

export const toggleCommentsSection = (): void => {
  const showHideBtn = document.querySelector('.show-hide') as HTMLButtonElement;
  const commentWrapper = document.getElementById(
    'comment-wrapper'
  ) as HTMLDivElement;

  if (showHideBtn === null || commentWrapper === null) {
    console.error('Required elements not found in the DOM');
    return;
  }

  commentWrapper.hidden = true;
  showHideBtn.textContent = 'Show comments';
  showHideBtn.setAttribute('aria-expanded', 'false');

  showHideBtn.onclick = () => {
    const isExpanded = showHideBtn.getAttribute('aria-expanded') === 'true';
    showHideBtn.setAttribute('aria-expanded', (!isExpanded).toString());
    commentWrapper.hidden = isExpanded;
    showHideBtn.textContent = isExpanded ? 'Show comments' : 'Hide comments';

    if (!isExpanded) {
      const nameInput = document.getElementById('name') as HTMLInputElement;
      nameInput?.focus();
    }
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
      bear.image !== '' ? bear.image : placeholderImage
    );
    const bearElement = document.createElement('div');
    bearElement.innerHTML = `
      <h4 class="bear-name">${bear.name} (${bear.binomial})</h4>
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

  // ARIA live region for the error message
  const errorMessage = document.createElement('p');
  errorMessage.setAttribute('role', 'alert');
  errorMessage.setAttribute('aria-live', 'assertive');
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
      // Display and announce the error message
      errorMessage.style.display = 'block';

      // Reset the content briefly to ensure it’s announced each time
      errorMessage.textContent = '';
      setTimeout(() => {
        errorMessage.textContent = 'Both name and comment are required.';
      }, 10);

      return;
    }

    errorMessage.style.display = 'none';

    // Verbally informing user of successful submission without displaying it
    const successMessage = new SpeechSynthesisUtterance(
      'Comment submitted successfully!'
    );
    window.speechSynthesis.speak(successMessage);

    const listItem = document.createElement('li');
    listItem.innerHTML = `<p>${name}</p><p>${comment}</p>`;
    list.appendChild(listItem);

    form.reset();
  };
};

export function toggleTranscript(): void {
  const transcript = document.getElementById('transcript') as HTMLDivElement;
  const toggleButton = document.getElementById(
    'transcript-toggle'
  ) as HTMLButtonElement;

  const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
  toggleButton.setAttribute('aria-expanded', (!isExpanded).toString());
  transcript.hidden = isExpanded;
  toggleButton.textContent = isExpanded ? 'Show Transcript' : 'Hide Transcript';
}

const toggleButton = document.getElementById('transcript-toggle');
toggleButton?.addEventListener('click', toggleTranscript);
