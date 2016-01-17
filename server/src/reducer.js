import {addPlayer, initServer} from './core';

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'REGISTER':
            return addPlayer(state, action.player);
        case 'INIT_SERVER':
            return initServer(state);
    }
    return state;
}