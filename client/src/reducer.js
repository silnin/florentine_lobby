import {List, Map} from 'immutable';
import {setCookie} from './cookie_actions';

export default function(state = initState(), action = null) {
    console.log('received ' + action.type);

    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'INIT_SERVER':
            return initState(state);
        case 'REGISTER':
            // set playername in cookie
            setCookie('playername', action.player);
            return state;
        case 'INCREASE_TARGET_GOAL':
            return state;
        case 'DECREASE_TARGET_GOAL':
            return state;
        case 'UPDATE_PLAYER_STATE':
            return state;
        default:
            return state;
    }
}

function setState(state, newState) {
    return state.merge(newState);
}

function setGameState(state, newState)
{
    return state.set('gamestate', newState);
}

function initState(state = Map()) {
    const initializedState = setGameState(state, 'uninitialized');
    return initPlayers(initializedState);
}

function initPlayers(state) {
    return state.set('players', Map());
}
