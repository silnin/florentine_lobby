import {List, Map} from 'immutable';

export default function(state = initState(), action) {
    console.log('received ' + action.type);

    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'INIT_SERVER':
            return initState(state);
        case 'REGISTER':
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
    return state.set('players', List());
}
