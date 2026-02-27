# Meal Prep Startup
startup for cs 260

### Specification Deliverable

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

We all know that life gets really busy. So much so that finding time to take care of yourself can feel impossible, especially all the work required for cooking healthy meals. But with tried and tested recipes all in one place, your meal prep will make life a little easier. Try out top-rated recipes and even rate others' submitted recipes yourself.

### Design

![IMG_1879](https://github.com/user-attachments/assets/11601902-6185-4783-93ab-d276a029973a)

### Key features

- Login and register
- See and rate meal prep recipes submitted by other users
- Submit links to recipes
- See average ratings

### Technologies
I will use the required technologies in the following ways.

- **HTML** - One page for login and one main page with voting. Hyperlinks to submitted recipes in titles.
- **CSS** - Color scheme, highlighting buttons, even whitespace
- **React** - Rating and displaying average ratings, provides login
- **Service** - Backend functionality for getting ratings and retrieving average ratings, authentication, third party call for random photo of food
- **DB/Login** - Storing reviews, recipe hyperlinks, authentication, user info
- **WebSocket** - Small notification bar lighting up when a user submits a review

## HTML Deliverable
For this deliverable, I used HTML to structure my startup.

- [x] Deliverable prerequisites (Git commits, Simon deployed, Github link)
- [x] **HTML pages** - One login page and one main page displaying content.
- [x] **Proper HTML element usage** - use of HTML tags including body, nav, main, header, footer.
- [x] **Links** - Links in header for each page, and links to recipes on submission placeholders.
- [x] **Text** - Text describing submission for each one.
- [x] **3rd party API placeholder** - Placeholder on login page for random photo call.
- [x] **Images** - Image on main page and under drop down for each submission.
- [x] **DB/Login** - Username input for login which will be displayed with submissions.
- [x] **Websocket** - Placeholder button on login page (New Rating Submitted) which will light up in realtime with every submitted vote.

## CSS Deliverable
For this deliverable, I used CSS to design my startup.

- [x] Deliverable prerequisites (Git commits, Simon deployed, Github link)
- [x] **Header, main block, footer** - I used consistent structural elements across both pages.
- [x] **Resizing elements** - Bootstrap flex ensures screen resizing.
- [x] **Text standardization** - I imported 'Work Sans' for all of my fonts. `styles.css` contains styling for both `index.html` and `main.html`.
- [x] **Images** - I used the same images, but resized them to better fit the new structure.
- [x] **Spacing** - Margin and padding help even out the main structure.
- [x] **Cards** - I used Bootstrap cards for my recipe submissions.
- [x] **Forms** - Bootstrap forms create my login structure and input rating dropdowns.

## React Pt. 1: Routing Deliverable

- [x] Deliverable prerequisites (Git commits, Simon deployed, Github link)
- [x] **Bundled using Vite**
- [x] **Components**
- [x] **Router**

## React Pt. 2: Reactivity Deliverable

- [x] Deliverable prerequisites (Git commits, Simon deployed, Github link)
- [x] **All functionality implemented or mocked out** - login, navigation after authentication, display new ratings with username, new recipe submissions saved in local storage, New Recipe Submitted button flashing for Websocket placeholder
- [x] **Hooks** - Both useState and useReact hooks used in startup