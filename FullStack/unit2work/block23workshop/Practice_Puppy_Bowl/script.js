const playerContainer = document.querySelector("#all-players-container");
const newPlayerFormContainer = document.querySelector("#new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-ACC-PT-WEB-PT-A";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-PT-WEB-PT-A/players`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(APIURL);
    const data = await response.json();

    // if statement with Array method

    if (!Array.isArray(data.data.players)) {
      console.warn("Uh nooo, fetched player data is not an array!", data);
      return [];
    }

    return data.data.players;
  } catch (err) {
    console.error("Uh nooo, trouble fetching players!", err);
    return [];
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    // DELETE method by id witch deletes a player
    const requestOption = {
      method: "DELETE",
    };
    const response = await fetch(`${APIURL}/${playerId}`);
    const players = await response.json();
    return players;
  } catch (err) {
    console.error(`Oh nooo, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    };
    const response = await fetch(APIURL, requestOption);
    const newPlayer = await response.json();
    return newPlayer;
  } catch (err) {
    console.error(
      "Oops, there was something wrong with adding that player!",
      err
    );
  }
};

const removePlayer = async (playerId) => {
  try {
    const requestOption = {
      method: "DELETE",
    };
    const response = await fetch(`${APIURL}/${playerId}`, requestOption);
    const players = await response.json();
    return players;
  } catch (err) {
    console.error(
      `Oops, we have issues removing player #${playerId} from the roster!`,
      err
    );
  }
};