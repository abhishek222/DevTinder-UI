# DevTinder

- create Vite+React+Tailwind project
- remove unessary files
- install daisy UI
- Add Navbar Component to app.jsx
- create Navbar.jsx component and add it to app.jsx
- install react-router-dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer
- Create login page
- install axios
- CORS - install cors in backkend => add middleware to with configuration: origin, credentials: true
- whenever you're making a request to the backend, pass axios {withCredentials: true}
- install redux-tooolkit
- create redux store
- configureStore => Provider => createSlice => add reducer to store.
- login and see update as soon as user logs in
- navbar should update as soon as user logs in
- refactor our code add constants file + create a component folder
- you should not be access other routes without login.
- If token is not present, redirect user to login page
- Logout feature
- Get the feed and add the feed in the store
- build the user card on feed
- Edit profile feature
- show toast Message on save of profile
- New Page - See all my connections
- New Page - see all connection requests
- feature - accept or reject connection request
- send/ ignore request
- signup
- e2e test

- body
  Navbar
  Route=/ => Feed
  Route=/login => Login
  Route=/connections => Connections
  Route=/profile => Profile

# RazorPay payment gateway integration

- signnup on razorpay and complete KYC
- created UI for premium page

# Real time Chat using websocket( socket.io)

- create chat ui with target user id
- setup socket.io in backend
- npm i socket.io
- setup frontend socket.io-client
- initialize the chat
- createSocketConnection
- Listen to events
- Homework: improve the UI
- Homework: Fix Security Bug - auth in websocket
- Homework: fix bug - If I'm not friend with the user, I should not be able to chat with them
- homework: Feat: Show Green Dot for online users/ last seen
