# Wheres Waldo

# [Live Preview](https://wheres-waldo-74fe1.web.app/)

A Where's Waldo (Photo Tagging) game where your goal is to find all the hidden characters. After finding all the characters, you can submit your score on the leaderboard, sorted by fastest times.

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
