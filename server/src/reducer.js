import {addPlayer, initServer, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'INIT_SERVER':
            return initServer(state);
        case 'REGISTER':
            return addPlayer(state, action.player);
    }
    return state;
}