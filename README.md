# PixelHunt (Where's Waldo)
![wheres-waldo-game](https://github.com/cColds/wheres-waldo/assets/103373668/eddfb3e3-88b0-458c-9970-ac38de2e14d8)

# [Live Preview](https://wheres-waldo-74fe1.web.app/)

A Where's Waldo (Photo Tagging) game where your goal is to find all the hidden characters. After finding all of them, you can submit your score on the leaderboard, sorted by fastest times.

## Built with

-   React
-   TypeScript
-   Vite
-   Firebase
-   date-fns
-   React Router
-   TailwindCSS

## Features

-   Custom 404 page for invalid urls.
-   Toggleable light/dark theme with a custom useTheme hook
-   Stopwatch timer to track how long you
    take
-   Notification that tells you if you found a character or not

### Firebase

-   Submit score to leaderboard, which includes your time, username, and submission date, with Firebase Firestore.
-   Handle invalid usernames and times using Firebase Security rules.
-   Validate if character clicked is valid using Firebase.
-   Fetch leaderboard game scores by querying Firebase Firestore documents, sorted by the fastest times.

### More Images
<details open>
<summary>More images</summary>
<img src="https://github.com/cColds/wheres-waldo/assets/103373668/278006e2-ca73-4c15-a6ef-1f81e499e73b" alt="home">
<img src="https://github.com/cColds/wheres-waldo/assets/103373668/5b68fde4-ac60-4437-b3b5-31aaf72c7160" alt="leaderboard">
<img src="https://github.com/cColds/wheres-waldo/assets/103373668/687be7f7-199a-405d-b986-2cf113ae8cc0" alt="404 page">
    
</details>
