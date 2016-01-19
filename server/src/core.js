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

    //return initializedState.get('players').push(player);

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
        const stateWithLobby = state.set('lobby', initLobby());
        return stateWithLobby.set('gamestate', 'lobby');
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

function tallyLobby(state)
{
    return state;
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
 * Create an empty lobby
 *
 * @returns Map
 */
function initLobby() {
    return Map({
        t1: Map({
            p1: 0,
            p2: 0
        }),
        t2: Map({
            p1:0,
            p2:0
        }),
        t3: Map({
            p1:0,
            p2:0
        })
    });
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
                goal: 0,
                current: 0
            }),
            t2:Map({
                goal: 0,
                current: 0
            }),
            t3:Map({
                goal: 0,
                current: 0
            })
        }),
        state: 'strategizing'
    });
}