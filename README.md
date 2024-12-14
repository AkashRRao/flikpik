# flikpik

## dev
```
$ cd app/frontend
$ npm install
$ npm run build
$ cd ../backend
$ npm install
$ npm start
```

## todo:

1. link to movie of the night api

  - using movie of the night api, do the following:
 
      - allow user who creates the room to select: i) checkbox streaming services (multiple streaming services allowed), and ii) genre
      - thus, user who creates room has the first turn, all other users can only respond with vetos if a suggestion is made
      - vibe check responses can be through chat or some other button if vibe check initiated
   
  - once streming services and genre set for turn 1, display randomly selected movie tiles from selected streaming service and genre
  - only current user can make selections, suggestions, and vibe checks
 
2.  logic for switch turns

  - once first player has made turn, switch to next player (can be random) AND log all activities/selections/vetos from previous turns
  - allow player 2 to change genre
  - reuse same turn code from section 1.
