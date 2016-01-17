import {List, Map} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
}

export default function(state = Map(), action) {
    console.log('received ' + action.type);

    switch (action.type) {
        case 'INIT_SERVER':
            return initState(state);
        case 'REGISTER':
            //return state.get('players').push(action.player);
            return state;
            //return state;//@todo make registration greyed out, or update game or player state to waiting?
    }
    return state;
}

function setGameState(state, newState)
{
    return state.set('gamestate', newState);
}

function initState(state) {
    const initializedState = setGameState(state, 'uninitialized');
    return initPlayers(initializedState);
}

function initPlayers(state) {
    return state.set('players', List());
}
