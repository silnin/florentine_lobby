import {addPlayer, increaseTargetGoal, decreaseTargetGoal, initServer, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'INIT_SERVER':
            return initServer(state);
        case 'REGISTER':
            return addPlayer(state, action.player);
        case 'INCREASE_TARGET_GOAL':
            return increaseTargetGoal(state, action.player, action.target);
        case 'DECREASE_TARGET_GOAL':
            return decreaseTargetGoal(state, action.player, action.target);
    }
    return state;
}
