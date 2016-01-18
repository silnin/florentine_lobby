import {List, Map} from 'immutable';

export const INITIAL_STATE = initServer();

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
    const newPlayers = oldPlayers.push(player);
    const nextState = state.set('players', newPlayers);

    // update game state
    if (nextState.get('players').count() == 1) {
        return setGameState(nextState, 'registering_players');
    }

    if (nextState.get('players').count() == 2) {
        return setGameState(nextState, 'strategizing');
    }
}

export function setGameState(state, newState)
{
    console.log('setting state to ' + newState);
    return state.set('gamestate', newState);
}

export function initServer(state = Map()) {
    console.log('initServer much?');
    const initializedState = setGameState(state, 'uninitialized');
    return initPlayers(initializedState);
}

export function initPlayers(state) {
    return state.set('players', List());
}