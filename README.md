# Wheres Waldo

# [Live Preview](https://wheres-waldo-74fe1.web.app/)

A Where's Waldo (Photo Tagging) game where your goal is to find all the hidden characters.

## Built with

-   React
-   TypeScript
-   Vite
-   Firebase
-   date-fns
-   React Router
-   TailwindCSS

## Features

-   Submit score to leaderboard, which includes your time, username, and submission date, with Firebase Firestore.
-   Toggleable light/dark theme with a custom useTheme hook
-   Dates formatted with date-fns.
-   Handle invalid usernames and times using Firebase Security rules.
-   Validate if character clicked is valid using Firebase as a backend.
-   Fetch leaderboard game scores by querying Firebase Firestore documents.
