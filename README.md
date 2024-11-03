# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices. 
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle. 
**Lets get coding!**

## Submission Details and Deadlines
* Coding playgrounds are **individual** work
* There will be 2 serparate submissions:
  * [Base Playgrounds](#base-coding-playgrounds): Submission Deadline **03.11.2024**
  * [Extended Playgrounds](#extended-coding-playgrounds): Submission Deadline **16.01.2025**
* The playgrounds will be guided through in our sessions - still there will be distance work!
* Use this base template to create your project repository.
* Each playground is linked in the corresponding course section.
* You can find the submissions at the bottom of the Moodle course.
  

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:



# Base Coding Playgrounds

## K.O. Criteria
* No JS Frameworks allowed to solve the base coding playgrounds (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to them!
* No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## Submission
Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:
> GitHub: leonardo1710
> 
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 1. JS Playground (10 Pts.)
The provided base project template contains some bugs and bad JS coding practices for you to fix in your first playground. Take a look into the component files and get a grasp of the inner workings of the provided project.
> **ATTENTION: After finishing the JS Playground please create a commit or branch and link it below. Otherwise it is not possible to grade your 1. submission, since we will switch to TypeScript afterwards!**
> 
> **This is my JS Playground commit/branch:** <LINK_TO_YOUR_COMMIT>

**Tasks:**
Fix application code and answer the questions:
* (2) Adapt the code to use ``async/await`` instead of the ``then()``-callback hell and refactor the functions to use arrow function syntax instead of ``function()``-syntax.
* (2) Add proper error handling to the code using ``try/catch`` and provide useful error messages to the users. Additionally, check the image URL availability before rendering the images in HTML. Provide placeholder images if the given URL does not exist.
* (1) Extract the range value from the provided Wikitext (response from the API). Examine the provided Wikitext format inside `extractBears` function. 
* (1) Split the code into separate modules with regards to clean separation of concerns.
* (1) Eliminate all other bad coding practices you can find. 
* (3) Answer the following questions and provide some examples inside the ``Readme.md`` file.

>  **What bad coding practices did you find? Why is it a bad practice and how did you fix it?**




### Identified Bad Coding Practices and Fixes

1. **Using `var` Instead of `let` or `const`**
    * **Bad Practice**: The original code used `var` to declare variables. `var` has function-level scope, which can lead to unintended behavior when variables are redefined or accessed outside the intended scope.
    * **Fix**: Replaced `var` with `let` and `const`. `let` and `const` provide block-level scoping, which is more predictable and reduces errors.  
``` js
// Bad Practice
var count = 5;

// Good Practice
let count = 5;
const MAX_COUNT = 10;
```

2. **Direct Manipulation of InnerHTML for Large Sections**
    * **Bad Practice**: Building large HTML blocks with `innerHTML` increases the risk of introducing XSS (cross-site scripting) vulnerabilities, reduces readability, and makes it harder to debug.
    * **Fix**: Used `document.createElement` and `appendChild` for each element. This approach improves readability and helps prevent XSS issues.
``` js
// Bad Practice
moreBearsSection.innerHTML += `<div><h3>\${bear.name}</h3></div>`;

// Good Practice
const bearElement = document.createElement('div');
const bearTitle = document.createElement('h3');
bearTitle.textContent = bear.name;
bearElement.appendChild(bearTitle);
moreBearsSection.appendChild(bearElement);
```

3. **Inconsistent Function Naming and Capitalization for Constants**
    * **Bad Practice**: Constants were defined with lowercase letters, which is harder to distinguish and inconsistent with JavaScript conventions.
    * **Fix**: Updated constants to use uppercase names with underscores (`BASE_URL`), improving readability and signaling that these values are immutable.
``` js
// Bad Practice
const baseUrl = "https://example.com";

// Good Practice
const BASE_URL = "https://example.com";
```

4. **Lack of Validation for User Inputs**
    * **Bad Practice**: The original form submission function didn’t validate inputs, allowing empty strings or whitespace to be submitted.
    * **Fix**: Added checks to ensure that form fields are not empty before appending data to the DOM.
```js
// Bad Practice
form.onsubmit = (e) => {
e.preventDefault();
// No validation
addComment(nameField.value, commentField.value);
};

// Good Practice
form.onsubmit = (e) => {
e.preventDefault();
const name = nameField.value.trim();
const comment = commentField.value.trim();
if (name && comment) {
addComment(name, comment);
    }
};
```

5. **Inefficient DOM Manipulation and Redundant Code**
    * **Bad Practice**: The \`toggleCommentsSection\` function redundantly set \`display\` and \`textContent\` properties.
    * **Fix**: Simplified the function to use a single toggle that reduces code repetition and increases readability.
```js
// Bad Practice
commentWrapper.style.display = 'none';
if (showHideBtn.textContent === 'Show comments') {
showHideBtn.textContent = 'Hide comments';
commentWrapper.style.display = 'block';
}

// Good Practice
const isVisible = commentWrapper.style.display === 'block';
commentWrapper.style.display = isVisible ? 'none' : 'block';
showHideBtn.textContent = isVisible ? 'Show comments' : 'Hide comments';
```

6. **Hard-Coded Values Instead of Constants**
    * **Bad Practice**: Used magic strings and hard-coded URLs directly in the code, which makes the code less adaptable and harder to maintain.
    * **Fix**: Defined reusable constants, such as \`placeholderImage\` for a placeholder image URL, improving maintainability.
``` js
// Bad Practice
moreBearsSection.innerHTML += '<img src="https://via.placeholder.com/200">';

// Good Practice
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/200";
moreBearsSection.innerHTML += \`<img src="\${PLACEHOLDER_IMAGE}">\`;
 ```

By implementing these fixes, the code is now cleaner, more readable, and more secure, adhering to modern JavaScript best practices.




## 2. Dependency- and Build Management Playground (10 Pts.)
Build the application with ``npm`` and a build and a dependency management tool of your choice (e.g. [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), or others). 

Here are some additional resources: [Package Management and Bundling](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2-Package-Management,-Build-Management-and-Modules), [Vite Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.1-Vite-Web-Application-Setup), [Webpack Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.2-Webpack-Web-Application-Setup).

**Tasks:**
* (1) Integrate `npm` and a build management tool into your project.
* (2) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.
* (2) Use ESLint and Prettier inside your project - rulesets can be found below.
* (1) Keep your builds clear and add dependencies to the right build (e.g. do not add dev dependencies inside the production build and vice versa).
* (1) Define the following tasks within `npm scripts`:
  * `dev`: starts the development server
  * `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
  * `lint`: runs ESLint on all  `.js` and `.ts` files in your projects `/src` directory
  * `lint:fix`: runs and also fixes all issues found by ESLint
  * `format`: formats all `.js` and `.ts` files in your projects `/src` directory
  * `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.
* (1) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).
* (2) Answer the question at the end of this section inside ``Readme.md`` file: 


**ESLint Configurations**

Use ESLint configs [standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and [TypeScript ESLint Plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
Your `.eslintrc` file should have the following extensions:
```.eslintrc.yml
...
extends:
  - standard-with-typescript
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
  - prettier
...
```
 
**Prettier Configurations**

Apply the following ruleset for Prettier:
``` .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80
}
```

>  **What improvements in your codebase were introduced by using TS instead of JS? Name at least 3 and explain why.**

# How TypeScript Improved the Codebase

Switching from JavaScript to TypeScript brought several great improvements to the code. Here are the main ones:

### 1. Better Type Safety

- **What Changed:** Started using explicit types and interfaces to define our data structures.
- **Example:**

```typescript
  interface Bear {
    name: string;
    binomial: string;
    image: string;
    range: string;
  }
  ```

- **Why it helps:** This means TypeScript can check that we're using data correctly. It catches mistakes like typos or wrong data types before we even run the code. This makes our code less buggy and more reliable.

### 2. Improved Error Handling with Null Checks

- **What Changed:** Added checks to make sure things aren't null or undefined before we use them.
- **Example:**

```typescript
  const form = document.querySelector('.comment-form') as HTMLFormElement;
if (form === null || list === null) {
console.error('Form or comment container not found in the DOM');
return;
}
```

- **Why it helps:** This prevents errors that happen when we try to use something that doesn't exist. Our app becomes more stable and doesn't crash unexpectedly.

## 3. Clearer Code with Type Annotations

- **What Changed:** Specified what types the functions expect and return.
- **Example:**

```typescript
export const fetchBearData = async (
title: string,
section = 3
): Promise<string> => {
// function code...
}
```
- **Why it helps:** This makes the code easier to read and understand. When someone looks at a function, they immediately know what to pass in and what they'll get back. It also helps catch mistakes if we accidentally pass the wrong type.

By moving to TypeScript, it can be said that the code is now safer and easier to work with, which helps spending less time debugging errors.

## 3.	CI/CD Pipeline Playground (5 Pts.)
Implementation of a CI/CD pipeline to automate the development and deployment process – write automated tests.

Here are some additional resources: [GitHub Actions Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/3.2-CI-CD-Pipeline-with-Github-Pages-and-Github-Actions) and [GitHub Actions Docs](https://docs.github.com/en/actions).

**Tasks:**
* (1.5) Write at least 2 meaningful unit tests (use [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)) for your project and configure the following tasks in ``npm scripts``:
  * `test`: runs all files that include `.test.` or `.spec.`, e.g.: `example.test.ts`
  * `test:coverage`: runs tests like `test` but also creates a test coverage report
* (1) Configure **2 Workflows** in GitHub Actions, one for development and one for deployment:
  * Create a `development` branch inside your repository
  * (1) Development Workflow should at least test and lint your code when developers push to branch `development`
  * (1) Deployment Workflow is triggered when developers push into `main` branch. It should at least test, lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice). 
* (0.5) Reuse existing workflows or jobs whenever possible! 

## 4.	Accessibility Playground (5 Pts.)
You might have noticed that the base project has a number of accessibility issues - your task is to explore the existing site and fix them.
Use the tools presented in our accessibility workshop to test the accessibility in your project.

**(0.5) Color** 

Test the current color contrast (text/background), report the results of the test, and then fix them by changing the assigned colors.

## Accessibility Report: Color Contrast

### Findings
Using the **WAVE** tool, we identified **44 contrast errors** on the page. These errors were primarily due to insufficient contrast between text and background colors in various sections of the HTML, particularly:
- The header, where white text was displayed on a light background.
- The navigation, article, footer, and secondary sections, where dark text was displayed on a relatively dark background.

### Fixes
To address these contrast issues, we made the following adjustments:

1. **Background of the HTML**: Darkened the background color to improve contrast with white text in the header.
```css
   html {
     font-size: 10px;
     background-color: #52665f; /* Darker background for white header text */
   }
```
2. **Background of Key Sections**: Lightened the background color for the div.nav, article, footer, and secondary sections to enhance readability of dark text.
```css
div[class='nav'],
article,
footer,
.secondary {
  background-color: #9ec2af; /* Lighter background for dark text */
}
```
### Results
After these adjustments:

- All previously flagged elements now meet the **contrast ratio requirements**.
- The **header text** now has a strong contrast ratio on the darker background.
- Text within the **navigation, article, footer, and secondary sections** is more readable due to the lighter background.

**(0.5) Semantic HTML**

Report on what happens when you try to navigate the page using a screen reader (NVDA). Fix those navigation issues.

# Accessibility Report for Wildlife Website

This report outlines the issues encountered when navigating the wildlife website using a screen reader and the solutions implemented to enhance accessibility.

## Navigation Issues and Solutions

### Landmark Navigation (`L` Key)

When pressing the `L` key to navigate through landmarks, the screen reader only announced two landmarks:

- **"The trouble with Bears"** (the article heading)
- **Footer** ("© Copyright 2050 by nobody. All rights reversed.")

The "Related" section was not recognized as a landmark, which limited users' ability to navigate efficiently.

**Solution Implemented:**

Wrapped the "Related" section in an `<aside>` element, defining it as complementary content. This semantic element is recognized as a landmark by screen readers, allowing users to navigate to the "Related" section using landmark navigation.

---

### Heading Navigation (`H` Key)

Pressing the `H` key navigated directly to the "More Bears" section. The screen reader read only the panda names sequentially, stating each as a level 3 heading. Other important headings, such as "Types of bear," were not recognized because they were improperly marked up.

**Solution Implemented:**

Added appropriate heading tags (`<h2>`, `<h3>`) to all sections to create a logical heading structure. This allows screen readers to navigate through all sections effectively using heading navigation.

---

### Tab Navigation

Using the Tab key to navigate, the focus moved through the main menu at the top but then skipped directly to the audio player. It went through all audio elements and then jumped to the "Related" list on the right, ignoring the comment section, which should be interactive.

**Solution Implemented:**

- Changed the "Show comments" toggle from a `<div>` to a `<button>` element, making it keyboard-accessible and focusable.
- Ensured that all form fields within the comment section have associated `<label>` elements with `for` attributes matching the `id` of the input fields.
- Updated the visibility and focus management of the comment form to include it in the Tab order when displayed.

---

### Text Content Structure

**Issue:**  
The original text content used `<br>` tags to create spacing between lines, simulating paragraphs. This approach is not semantically correct and caused issues with the screen reader, reading the text as one continuous block without appropriate pauses.

**Solution Implemented:**  
Replaced multiple `<br>` tags with `<p>` elements to properly structure the text into paragraphs. This enhances readability for screen readers by providing clear paragraph separations and improving the overall semantic structure of the content.

**Reasoning:**
- **Semantic HTML:** `<p>` elements clearly define paragraphs, providing meaningful structure to the content.
- **Improved Accessibility:** Screen readers recognize `<p>` elements and provide appropriate pauses between paragraphs, enhancing readability.
- **Best Practices:** Using `<p>` tags instead of `<br>` tags aligns with HTML standards and improves the overall code quality.
---

## Additional Enhancements

- **Semantic HTML:** Utilized semantic elements such as `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>` to provide meaningful structure and landmarks for screen readers.

- **Consistent Heading Levels:** Reviewed and corrected the heading levels to maintain a logical hierarchy, aiding in navigation and comprehension.

- **Focus Management:** Implemented proper focus handling when dynamic content is revealed or updated, such as setting focus to the comment form when it becomes visible.

- **ARIA Attributes:** Added ARIA attributes like `aria-live`, `aria-expanded`, and `aria-controls` to enhance interaction between dynamic content and assistive technologies.

---

## Conclusion

By addressing these navigation issues and implementing the solutions, the website's accessibility has been significantly improved. Screen reader users can now effectively navigate the page using landmarks, headings, and keyboard navigation, ensuring a more inclusive and user-friendly experience.


**(0.5) Audio** 

The ``<audio>`` player isn't accessible to hearing impaired (deaf) people — can you add some kind of accessible alternative for these users?

## Audio Accessibility Report

### Findings
During accessibility testing of the `<audio>` element, I identified the following issues:

1. **Lack of Transcript**: The audio content is not accessible to users who are deaf or hard of hearing, as there is no accompanying transcript or visual description of the audio content.
2. **Limited User Control**: Although the audio player provides basic controls, there is no additional context or description to help users understand the significance of the audio content within the article.

### Solution Implemented
To address these issues, I added an accessible transcript toggle directly below the audio player. The transcript button allows users to view a written transcript of the audio content at their discretion, making the information accessible to those who are unable to hear the audio.

```html
<!-- Audio element with transcript toggle -->
<div class="audio-container">
  <audio controls aria-describedby="transcript-toggle">
    <source src="media/bear.mp3" type="audio/mp3">
    <source src="media/bear.ogg" type="audio/ogg">
    <p>Your browser doesn't support HTML5 audio.</p>
  </audio>
  <button id="transcript-toggle" aria-expanded="false">Show Transcript</button>
  <div id="transcript" hidden>
    <h3>Audio Transcript</h3>
    <p>
      "This isn't really an audio fact file about bears, but it is an audio file that you can transcribe."
    </p>
  </div>
</div>
```

**(1) Forms** 
  * The ``<input>`` element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. Fix this issue by adding a label that is only accessible to screen readers.
  * The two ``<input>`` elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.

### Forms Accessibility Report

#### Search Form: Screen Reader-Only Label

To enhance accessibility, a hidden label was added to the search input in the navigation bar. This label, invisible to sighted users, is readable by screen readers, ensuring that users with visual impairments understand the input’s purpose without impacting the visual design.

**HTML Implementation:**
```html
<label for="search" class="sr-only">Search for:</label>
<form class="search">
  <input type="search" name="q" id="search" placeholder="Search query">
  <input type="submit" value="Go!">
</form>
```
**CSS for .sr-only Class:**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```
The `.sr-only` class hides the label visually but makes it accessible to screen readers, thus providing better context for users relying on assistive technology.

#### Comment Form: Explicit Label-Input Association

In the comment form, each input field is now clearly associated with its label using the `for` attribute, ensuring accessibility for screen reader users and better usability for keyboard navigation.

**HTML Implementation:**
```html
<div class="flex-pair">
    <label for="name">Your name:</label>
    <input type="text" name="name" id="name" placeholder="Enter your name">
</div>
<div class="flex-pair">
    <label for="comment">Your comment:</label>
    <input type="text" name="comment" id="comment" placeholder="Enter your comment">
</div>

```




**(0.5) Comment section**

The show/hide comment control button is not currently keyboard-accessible. Can you make it keyboard accessible, both in terms of focusing it using the tab key, and activating it using the return key?

## Accessibility Report: Comment Section Toggle Button

### Requirement
Ensure the "Show/Hide comments" toggle button is keyboard-accessible, allowing users to navigate and activate it with the Tab key and Return/Space keys.

### Solution and Implementation
This functionality was already addressed as part of the semantic HTML adjustments. The toggle button for showing/hiding comments is implemented as a native `<button>` element, which naturally supports keyboard accessibility, enabling:

- **Tab Navigation**: Users can focus on the button using the Tab key.
- **Activation with Enter/Space**: As a native button, it responds to both Enter and Space for activation, ensuring seamless keyboard interaction.

### Additional Accessibility Enhancements
The button includes `aria-expanded` and `aria-controls` attributes to communicate the expanded/collapsed state and provide screen readers with context on the content it controls. Here’s how it was implemented:

```html
<button class="show-hide" aria-expanded="false" aria-controls="comment-wrapper">Show comments</button>
```
In the JavaScript logic:

- `aria-expanded` is dynamically updated based on the button's state.
- The button text changes between "Show comments" and "Hide comments" to indicate the action clearly.

**(1) The table**

The data table is not currently very accessible — it is hard for screen reader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?

### Table Accessibility Improvements

The table displaying bear characteristics was modified to enhance accessibility for screen reader users, ensuring that data rows and columns are easily understandable without impacting the visual layout.

#### Problem
The original table lacked accessible features, making it difficult for screen readers to associate rows and columns effectively. Additionally, there was no clear summary to describe what the table shows, potentially causing confusion for screen reader users.

#### Solution
1. **Scope Attributes**: Added `scope="col"` to header cells (`<th>`) in the `<thead>` and `scope="row"` to row header cells in the `<tbody>`. This allows screen readers to associate each data cell with its respective row and column headers, clarifying the relationship between data points.

2. **Descriptive Caption**:
    - A `<caption>` was added with a description: `"Comparison of different bear types, their habitats, and characteristics"`. This caption gives context to the table's content.
    - The caption was styled with a visually hidden `sr-only` class so it is not visible on the page but still accessible to screen readers, enhancing accessibility without affecting the visual layout.

#### CSS for Screen Reader-Only Content
The following `sr-only` class was used to hide the caption visually:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```
### Result
These improvements make the table much more accessible:

- **Screen Reader Caption**: Screen readers now announce the caption, providing a clear description of the table’s purpose without altering the visual layout.
- **Enhanced Associations**: Row and column associations are clarified, making it easier for screen reader users to navigate and understand the table data in context.

**(1) More Findings**

What other accessibility issues did you find? Explain how you did fix them.

# #Accessibility Improvements and Fixes

**Button Hover Consistency**  
To improve visual accessibility, I standardized the hover effect across all buttons, making it easier for users to identify interactive elements. This was done by adding a consistent background color change on hover:
```css
button:hover,
input[type="submit"]:hover {
  background-color: #435c52;
}
```
**Landmark Roles for Semantic Structure**  
To help screen reader users navigate through the content, I added semantic landmarks (role attributes) to key sections. This included adding role="main" for the primary content, role="navigation" for the nav bar, and role="complementary" for the related topics sidebar. This improves accessibility by allowing screen readers to quickly locate and announce sections of the page.
```html
<main role="main">
    <!-- -->
</main>

<nav role="navigation">
    <!-- -->
</nav>

<aside class="secondary" aria-labelledby="related-section" role="complementary">
    <h2 id="related-section">Related</h2>
</aside>
```
**Enhanced Link Accessibility with ARIA Labels**
For clarity, I added aria-label attributes to navigation links, providing a description of each link’s purpose. Additionally, I added aria-current="page" to the "Home" link to inform users that it represents the current page.
```html
<ul>
    <li><a href="#" aria-current="page" aria-label="Home page">Home</a></li>
    <li><a href="#" aria-label="About our team">Our team</a></li>
    <li><a href="#" aria-label="View our projects">Projects</a></li>
    <li><a href="#" aria-label="Read our blog">Blog</a></li>
</ul>
```
**Button Hover Consistency**  
To ensure a cohesive user experience, I applied a uniform hover effect to all button elements, including the `Go` button, `Show/Hide Comments` button, and `Submit Comment` button. This consistency helps users visually identify interactive elements more easily, enhancing usability.

```css
button:hover,
input[type="submit"]:hover {
  background-color: #435c52;
}
```

**Accessible Form Feedback with ARIA Live Regions**  
To improve screen reader accessibility, I implemented a dynamic ARIA live region for form feedback, ensuring consistent announcements for both error and success messages, which enhances accessibility for screen reader users.

```typescript
// Clear and reset error message to re-trigger screen reader announcement
if (name === '' || comment === '') {
    errorMessage.style.display = 'block';
    errorMessage.textContent = ''; // Clear to reset announcement
    setTimeout(() => {
        errorMessage.textContent = 'Both name and comment are required.';
    }, 10);
    return;
}

// Success message spoken to confirm successful submission
const successMessage = new SpeechSynthesisUtterance(
    'Comment submitted successfully!'
);
window.speechSynthesis.speak(successMessage);
```

**Alt Text For Placeholder Images (When Image is Missing)**
Here, if the image is missing, the alt text dynamically provides context by saying "No image available for [bear name]".
This approach gives screen reader users helpful context about the image's availability while avoiding redundant or excessive information.
```typescript
const bearElement = document.createElement('div');
const isPlaceholder = imageUrl === placeholderImage; 

bearElement.innerHTML = `
  <h4 class="bear-name">${bear.name} (${bear.binomial})</h4>
  <img src="${imageUrl}" alt="${isPlaceholder ? 'No image available for ' + bear.name : ''}" style="width:200px; height:auto;">
  <p><strong>Range:</strong> ${bear.range}</p>
`;
```

# Extended Coding Playgrounds
Please create a new independent Repository for these playgrounds and submit a link to it in the Moodle submission. 
Additionally, provide a description of how to start your frontend and backend services inside the `README.md`.

## Submission
Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:
> GitHub: leonardo1710
> 
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 5. Migrate to a Frontend Framework (10 pts.)
In this playground you will migrate your application to a frontend framework of your choice.

**Tasks**:
* Migrate your application to a frontend framework of your choice (e.g. React, Angular, Vue.js, Svelte,...)
  * All previous features should still work
  * The application still should use build and dependency management
* Adapt your `npm scripts` if necessary

## 6. Integrate a Backend Framework (10 pts.)
In this playground you will use a backend framework of your choice and connect it with an API to your frontend application. 

**Tasks**:
* (3) Setup a backend framework of your choice
* (2) Create an API your frontend will be connected to (REST, GraphQL, gRPC, you choose...)
* (2) Your backend should now request the bear data from presented Wikipedia API
* (3) Replace the frontend Wikipedia API calls with calls to your backend - the functionality of your frontend should work as before!
* (Optional): you may want to introduce some sort of caching layer for Wikipedia API requests


## 7. Containerize your application (10 pts.)
Dockerize your frontend and backend applications. It should be possible to start all services in the corresponding mode (development, production) with a single command (e.g. use Docker Compose for this).

**Tasks**:
* (6) Create **multi-stage Dockerfiles** for your applications (depending on your frameworks):
  * The frontend Dockerfile should: 1. run the app in a development environment 2. build the app 3. serve build artefacts over Nginx
  * The backend Dockerfile should: 1. run the app in a development environment 2. build the app if there is a build step in your framework (optional) 3. serve the app 
* (4) Create two docker-compose files to orchestrate you applications in ``development`` and ``production`` mode:
  * Define ports and dependencies
  * Define corresponding stage (development, production)
  * Use environment variables if possible
* Your application should start with the following commands:
  * Development: `docker-compose -f docker-compose.yml up --build`
  * Production: `docker-compose -f docker-compose.prod.yml up --build`