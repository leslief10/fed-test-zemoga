# Zemoga Front End Test

Our client's app Rule of Thumb™️ tracks the sentiment of their users on trending and controversial people from different fields, including politics, business, media and entertainment, etc. The website has the following main requirement:
- They need to present their users with an easy way to share their opinion on each presented celebrity, using votes (thumbs up and down), and display the results to the user while the poll is open. These features should be available to all users, regardless of where they're accessing the website from, whether it's a smartphone, a tablet or a desktop computer.
---
## Acceptance Criteria 🔍
- The website should meet the design criteria. You should be able to create the website markup using HTML, CSS and Javascript (check out Tips on Delivery section for more details). You can find below in the different required resolutions:
    - [Desktop Prototype](https://www.figma.com/proto/NlQ6PjfanVO2YyuDUaohjx/Rule-of-Thumb---FED-Challenge?node-id=84%3A2401&scaling=min-zoom)
    - [Mobile Prototype](https://www.figma.com/proto/NlQ6PjfanVO2YyuDUaohjx/Rule-of-Thumb---FED-Challenge?node-id=6%3A43&scaling=min-zoom)
    - [Figma Resources](https://www.figma.com/file/NlQ6PjfanVO2YyuDUaohjx/Rule-of-Thumb---FED-Challenge)
- In the mobile version, cards should only be displayed as a list of cards, with horizontal scrolling and overflow.
- Each card should contain a gauge bar at the bottom, which will display the distribution of positive and negative votes as a percentage.`(See assets/data.json for reference).`
- Each card should contain three buttons: a "thumbs down" (yellow), a "thumbs up" (teal) and a "Vote now" button which should be disabled by default.
    - If either the "thumbs up" or "thumbs down" button is pressed, it should toggle the selected state of that button (denoted as a white border, see design specs for reference), and enable the "Vote Now" button.
    - If "Vote Now" button is pressed, that vote should be posted, and three other things should happen:
        - Eyebrow text should change to the copy "Thank you for your vote!"
        - "Vote now" text should change to the copy "Vote Again"
        - The gauge bar below should reflect the changes in the registered data and percentage should be updated.
    - If the "Vote Again" button is pressed, all buttons should return to the initial state, and all modified copy texts should be reverted to their original state. The gauge bar, however, should persist the votes already posted.

## Tips on Delivery 🧐 
- **Do not use any framework/library**. Using Vanilla HTML, CSS and JS is preferred, but if you do not know how to set up a project like that you can use a Front End framework such as React, Vue, Angular or whatever you feel comfortable working with.
- **We don't care about IE and neither should you**. We'll test in Chromium, like all cool people do.
- **We value your time.** We don't expect you to take more than **three days** on it, and as long as you send us working code that meets the criteria described above, we're happy. Don't overthink it though, find an easy way to achieve a good result and stick to it.
- **No copypasta, please.** You can find anything on GitHub and StackOverflow these days, can't you? Well, _so can we_. We won't blame you if you forgot how to use the LocalStorage API. Just don't copypaste big chunks of code.

## Going above and beyond 🚀 
If you feel that covering the basic acceptance criteria isn't enough to showcase the best of your abilities feel free to add a little extra. This is by no means mandatory but if there are any valuable additional skills you'd like to show off go right ahead. These are just a few ideas of things you could add:

- In desktop versions, users should be able to switch views between list view and grid view, using the dropdown menu, which should be located at the top right section of the component.
- Data must be obtained from `assets/data.json`. The file contains all the information required to add each famous person into the DOM. 
- All posted votes should be persisted by any means, and should be exactly the same count, even if the page is refreshed. Use any persistence mechanisms you prefer: LocalStorage, Cookies, IndexedDB, URL params, a Back End service (Firebase, DynamoDB, Redis, etc).
- Using a CSS preprocessor like SASS or SCSS.
- Write some tests. Unit, Integration, E2E, anything that ensures that your code is unbreakable.
- Document your code. Use any format you know of to generate documentation that allows us to peek under the hood.
- Include any SEO strategy, and show off your score in any popular tool.

## Challenge complete?
Send a link to your recruiter pointing to your repository (Github or Bitbucket). The master branch should contain the entire result, along with the instructions to run your code on the README.md file (if apples).

Happy coding! 🙌