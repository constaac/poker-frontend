# Poker Tracker Front-End

The application - https://constaac.github.io/poker-frontend/

https://github.com/constaac/poker-frontend
https://github.com/constaac/poker-api

This is a single-page-application that allows a user to sign up and login to track
other players' actions at a poker table to then generate several statistics about
their tendencies. Players can be saved and reloaded, as well as the user's
career statistics. The user can see a list of their saved players, and delete
players if they so choose.

# Instructions

To get started, the user must create an account with an email address. The name
field is required, and determines what the user's player will be called within
the application. The user may change their password after logging in, by clicking
the 'Account' button.

Once logged in, click the table button. Choose the amount of seats at the table.
Beware: choosing a number of seats will reset all players, if there are any.

Clicking the radio buttons under 'User' will set that seat as the user. Doing so
will automatically load the user's statistics from the server. Setting the user
overwrites the player's data that was in that seat previously, so be sure to save
that player if you wish to retain that data. Saving players at the table initiates
a patch request to the server that saves the player if it exists, or creates it
if not. The first time a user sits at the table, a patch request will be made to
save the player, but fail and then a post request will intialize the user's player.
A list of saved players can be displayed by clicking the 'Player List'
button.

Players will be initiated as aunonymous players named 'Player x', where x is equal
to that player's seat number. Players can be named, but must be saved if you wish
to access that player's data at another time. Player's can be saved, deleted, or
loaded from the server by targeting the appropriate seat number with the seat
selector dropdown, and then clicking the appropriate button.

Before you save a player, ensure that you are not accidentally overwriting another
player with the same name by reviewing the list generated by Player List. Note that
players can not be saved as 'Player x'.

To delete a player, the player must exist on the server. To delete a player, ensure
that the player is loaded, and then target the seat the player is in and click
the delete button.

If a player is present, but not playing in the hand, you may uncheck the 'playing'
checkbox, and that player will be excluded from the round.

After the table is set, close the table menu, and click 'Start Round' to begin
tracking the round. Choose which player has the dealer chip, and then simply press
the correct button to match each player's action. If a check is not possible (E.g.
checking after a bet was made), the status indicator at the bottom will notify you.

The tracker will automatically determine who's action it is as well as the phase
of the round (pre-flop/flop/turn/river).

At any point, statistics can be displayed by clicking the 'Statistics' button to
display the statistics menu. Note that the statistics do not include the current
hand in progress, and will not incorporate that information until the round has
finished.

If you wish to sign in to a different
account, simply logout and sign in with the other account.

## Technologies Used

This project runs on a combination of Javascript, Ajax and Jquery (apart from the
CSS and HTML for the page itself). The logic to determine the majority of
how the tracker functions is determined by an "engine" built in javascript. Jquery
helps display error messages and manipulate the DOM as the user interacts with
the website. Account info, player history, etc. is stored with a remote API, which
the game contacts using AJAX requests.

## Planning Stages

I began the project by sketching out a wire frame (linked at the bottom) that
made space for every feature and button I wanted to include. The structure of the
page that I had envisioned during my wire frame sketching morphed into what it
resembles now after thinking more about how each feature would have to be implemented.

I began by establishing the login features, with the login and logout buttons hiding
and showing the main display div. After these features were implemented, I implemented
the main buttons that would be used to track player actions and display the statistics.
Next, I began working on the set table functionality in order to have a group of players
to work with before I designed the tracker logic.

The tracker logic uses a game object with a handful of properties including but not
limited to each player, an array to contain players that are actually playing, an
attribute to track the phase of the game, etc. Ten player objects are intialized
when the page loads via a constructor function. These objects contain a pleathora of
attributes to track a variety of statistics, hold values for the current session
as well as career values loaded from the server, and several booleans denoting things
such as whether the player is playing or is the dealer.

Each tracker button is attached to a function that runs several checks to determine if
the action is possible and whether or not to increment certain counters for various
statistics. Each action also checks if that action ends the phase, and if it does
the phase is incremented, and the actions begin with the proper player (determined in
relation to the player with the dealer chip).

Once the logic was in place to rotate around the table, I was able to then begin adding
in conditions to check for opportunities to track specific actions based on factors
such as the phase.

The logic was a bulk of the work, but the rest of the work lied in implementing
CRUD actions to handle loading and saving players. As compared to the tracker logic,
where testing was fairly easy, I had to account for a wide variety of user facing bugs
that arose. A few examples included disallowing the user from saving players without
a name, properly reseting the player object when a player was deleted, properly excluding
players from the round if their playing checkbox was unchecked, etc.

In retrospect, I did not allow for nearly enough time for the logic surrounding the
CRUD actions. I made too many changes in an erratic manner just before my deadline, and
wound up doing way more harm than good. I rolled back several git commits, and was
able to recover and clean up the code; however, an extra day for crud related work
would have done me wonders. There were many opportunites for me to clean up my code
and write much better commit messages, but I sacrificed those opportunities in order
to have an MVP by the deadline with a rather complicated concept. I began modularizing
certain aspects of the game logic that seemed repetitive, but much work is to be done.
I also need to use enumeration methods much more often, as I found myself writing
for loops over and over again.

## Plans for the Future

I would like to implement many more statistics (much of the scaffolding necessary
to do so is already in place). I would like to simplify the load/save functionality;
it feels very clunky as it stands. I would like to prevent current data from being reset
when a different table size is selected.

## User Stories

1. I would like to be able to login, and track everyone’s actions. I don’t need to be able to save player’s statistics for later because I rarely play with the same group of people.
2. I want my account to store and display my career statistics to see if I am playing too aggressively or passively in certain scenarios. The app should aggregate my actions over the course of multiple sessions.
3. I frequently play with a group of friends, so I would like to be able to load in other people’s statistics by name so that each session begins by adding current session’s actions into the calculations of the player’s career statistics.
4. I would like the tracker to automatically load in my own career statistics whenever I play.
5. I’m not a good poker player, but I would like it if there were some links to information on the statistics that the app generates so that I could learn about what the app is telling me about a player.


## Initial Wireframe Links

Login - http://i.imgur.com/BB0XLaT.png
Main - http://i.imgur.com/ZiwvBHM.png
