import {List, Map} from 'immutable';

export const INITIAL_STATE = initServer();

/**
 *
 * @param state
 * @param player
 * @returns {*}
 */
export function addPlayer(state, player) {

    console.log("addplayer entered for " + player);

    if (state.get('gamestate') != 'uninitialized' &&
        state.get('gamestate') != 'registering_players')
    {
        // cant add more players right now
        console.log('state is not valid for registering more players (' + state.get('gamestate') + ')');
        return state;
    }

    const oldPlayers = state.get('players');
    const newPlayers = oldPlayers.set(player, initPlayer(player));
    const nextState = state.set('players', newPlayers);

    // update game state
    if (nextState.get('players').count() == 1) {
        return setGameState(nextState, 'registering_players');
    }

    if (nextState.get('players').count() == 2) {
        return setGameState(nextState, 'strategizing');
    }
}

/**
 *
 * @param state
 * @param player
 * @param target
 * @returns {*}
 */
export function increaseTargetGoal(state, player, target) {
    if (state.get('players').get(player).get('score').get('budget') > 0) {

        console.log("budget was " + state.get('players').get(player).get('score').get('budget'));
        const nextState = state.updateIn(
            ['players', player, 'score', 'budget'],
            0,
            budget => budget - 1
        );

        console.log("budget became " + nextState.get('players').get(player).get('score').get('budget'));

        return nextState.updateIn(
            ['players', player, 'score', target, 'goal'],
            0,
            goal => goal + 1
        );

    } else {
        return state;
    }
}

/**
 *
 * @param state
 * @param player
 * @param target
 * @returns {*}
 */
export function decreaseTargetGoal(state, player, target) {
    if (state.get('players').get(player).get('score').get(target).get('goal') > 0) {

        const nextState = state.updateIn(
            ['players', player, 'score', 'budget'],
            0,
            budget => budget + 1
        );

        return nextState.updateIn(
            ['players', player, 'score', target, 'goal'],
            0,
            goal => goal - 1
        );

    } else {
        return state;
    }
}

/**
 *
 * @param state
 * @param player
 * @param newPlayerState
 * @returns {*}
 */
export function updatePlayerState(state, player, newPlayerState) {
    return updateGameStateByPlayerState(state.updateIn(
        ['players', player, 'state'],
        0,
        state => newPlayerState
    ));
}

/**
 *
 * @param state
 * @returns {*}
 */
function updateGameStateByPlayerState(state)
{
    // check if we are going to election?
    if (bothPlayersAreOnState(state, 'lobbying')) {
        console.log('detected: both players are ready to lobby!');
        // set up empty lobby
        return state.set('gamestate', 'lobby');
    } else if (bothPlayersAreOnState(state, 'wait_for_election')) {
        //@todo instead of only gamestate update, tally the scores and assign the roles
        const electedState = tallyLobby(state);
        return electedState.set('gamestate', 'election');
    } else if (bothPlayersAreOnState(state, 'election_accepted')) {
        return state.set('gamestate', 'r1');
    } else {
        console.log('players are not on same state')
        return state;
    }
}

/**
 *
 * @param state
 */
function tallyLobbyVotes(state)
{
    const firstVote = letTargetVote(state, 't1');
    const secondVote = letTargetVote(firstVote, 't2');
    const thirdVote = letTargetVote(secondVote, 't3');

    return determineLobbyWinner(thirdVote);
}

/**
 *
 * @param state
 * @param playerName
 */
function electGonfaloniere(state, playerName)
{
    return state.set('gonfaloniere', state.get('players').get(playerName));
}

/**
 *
 * @param state
 * @returns {*}
 */
function determineLobbyWinner(state)
{
    const p1Votes = tallyPlayerVotes(state.get('players').first().get('name'));
    const p2Votes = tallyPlayerVotes(state.get('players').last().get('name'));

    if (p1Votes > p2Votes) {
        return electGonfaloniere(state, state.get('players').first().get('name'));
    }
    return electGonfaloniere(state, state.get('players').last().get('name'));
}

/**
 *
 * @param state
 * @param playerName
 * @returns {*}
 */
function tallyPlayerVotes(state, playerName)
{
    return state.get('players').get(playerName).get('score').get('t1').get('vote')
        + state.get('players').get(playerName).get('score').get('t2').get('vote')
        + state.get('players').get(playerName).get('score').get('t3').get('vote');
}

/**
 *
 * @param state
 * @param playerName
 * @param targetName
 * @returns {*}
 */
function tallyTargetFromPlayer(state, playerName, targetName)
{
    return state.get('players').get(playerName).get('score').get(targetName).get('promise6')
    + state.get('players').get(playerName).get('score').get(targetName).get('promise2')
    + state.get('players').get(playerName).get('score').get(targetName).get('promise1');
}

/**
 *
 * @param state
 * @param targetName
 * @returns {*}
 */
function letTargetVote(state, targetName)
{
    switch (compareLobbyTarget(state, state.get('players').first(), state.get('players').last(), targetName))
    {
        case -1:
            // p2 wins
            return giveVote(state.get('players').last().get('name'), targetName);
        case 0:
            // standoff
            return decideByReputation(state, targetName);
        case 1:
            // p1 wins
            return giveVote(state.get('players').first().get('name'), targetName);
    }
}

/**
 *
 * @param state
 * @param targetName
 * @returns {*}
 */
function decideByReputation(state, targetName)
{
    switch (compareTargetReputation(state,
        state.get('players').first().get('name'),
        state.get('players').last().get('name'),
        targetName))
    {
        case -1:
            return giveVote(state.get('players').first().get('name'), targetName);
        case 0:
            // decide randomly
        case 1:
            return giveVote(state.get('players').last().get('name'), targetName);
    }
}

/**
 *
 * @param state
 * @param targetName
 * @returns {*}
 */
function decideRandomly(state, targetName)
{
    const choice = Math.floor(Math.random() * 2) + 1;

    if (choice == 1) {
        return giveVote(state.get('players').first().get('name'), targetName);
    }

    return giveVote(state.get('players').last().get('name'), targetName);
}

/**
 *
 * @param state
 * @param playerName
 * @param targetName
 * @returns {*}
 */
function giveVote(state, playerName, targetName) {
    return state.updateIn(
        ['players', playerName, 'score', targetName, 'vote'],
        0,
            vote => 1
    );
}

/**
 *
 * @param state
 * @param player1Name
 * @param player2Name
 * @param targetName
 * @returns {number}
 */
function compareTargetReputation(state, player1Name, player2Name, targetName)
{
    const p1Rep = state.get('players').get(player1Name).get('score').get(targetName).get('reputation');
    const p2Rep = state.get('players').get(player2Name).get('score').get(targetName).get('reputation');

    if (p1Rep > p2Rep) {
        return -1;
    } else if (p2Rep > p1Rep) {
        return 1;
    } else {
        return 0;
    }
}

/**
 *
 * @param state
 * @param player1Name
 * @param player2Name
 * @param targetName
 * @returns {number}
 */
function compareLobbyTarget(state, player1Name, player2Name, targetName)
{
    const p1Total = tallyTargetFromPlayer(state, player1Name, targetName);
    const p2Total = tallyTargetFromPlayer(state, player2Name, targetName);

    if (p1Total > p2Total) {
        return -1;
    } else if (p2Total > p1Total) {
        return 1;
    } else {
        return 0;
    }
}


/**
 *
 * @param state
 * @param playerstate
 * @returns {boolean}
 */
function bothPlayersAreOnState(state, playerstate) {

    if (state.get('players').first().get('state') == playerstate
        && state.get('players').last().get('state') == playerstate ) {
        return true;
    }

    return false;
}


/**
 *
 * @param state
 * @param newState
 * @returns {*}
 */
function setGameState(state, newState)
{
    console.log('setting state to ' + newState);
    return state.set('gamestate', newState);
}

/**
 *
 * @param state
 * @returns {*}
 */
function initServer(state = Map()) {
    console.log('initServer much?');
    const initializedState = setGameState(state, 'uninitialized');
    return initPlayers(initializedState);
}

/**
 *
 * @param state
 * @returns {*}
 */
function initPlayers(state) {
    return state.set('players', Map());
}

/**
 *
 * @param name
 * @returns {*}
 */
function initPlayer(name) {

    return Map({
        name: name,
        score: Map({
            budget:100,
            t1:Map({
                reputation: 0,
                vote: 0,
                overState: 0,
                goal: 0,
                current: 0,
                promise6: 0,
                promise2: 0,
                promise1: 0
            }),
            t2:Map({
                reputation: 0,
                vote: 0,
                overState: 0,
                goal: 0,
                current: 0,
                promise6: 0,
                promise2: 0,
                promise1: 0
            }),
            t3:Map({
                reputation: 0,
                vote: 0,
                overState: 0,
                goal: 0,
                current: 0,
                promise6: 0,
                promise2: 0,
                promise1: 0
            })
        }),
        state: 'strategizing'
    });
}

/**
 *
 * @param state - Map
 * @param playerName - String
 * @param name - String
 * @returns {*}
 */
function resetPromiseOverTargets(state, playerName, name)
{
    const firstUpdateState = state.updateIn(
        ['players', playerName, 'score', 't1', name],
        0,
            name => 0
    );

    const secondStateState = firstUpdateState.updateIn(
        ['players', playerName, 'score', 't2', name],
        0,
            name => 0
    );

    return secondStateState.updateIn(
        ['players', playerName, 'score', 't3', name],
        0,
            name => 0
    );
}

/**
 *
 * @param value
 * @returns {string}
 */
function getPromiseNameByValue(value)
{
    return 'promise' + value.toString();
}

/**
 *
 * @param state
 * @param playerName
 * @param resourceValue
 * @param targetName
 * @returns {*}
 */
export function promiseResource(state, playerName, resourceValue, targetName)
{
    const promiseName = getPromiseNameByValue(resourceValue);

    // reset this resource for all targets to 0
    const nullifiedState = resetPromiseOverTargets(
        state,
        playerName,
        promiseName);


    // then set this one to the given value
    return nullifiedState.updateIn(
        ['players', playerName, 'score', targetName, promiseName],
        0,
        promiseName => resourceValue
    );
}

/**
 *
 * @param state
 * @param playerName
 */
export function submitLobby(state, playerName)
{
    // since we already have the actual state of the lobby,
    // only player update is needed (whiceh in turn might update game state)
    updatePlayerState(state, playerName, 'wait_for_election');
}

