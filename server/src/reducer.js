import {submitLobby, promiseResource, addPlayer, updatePlayerState, increaseTargetGoal, decreaseTargetGoal, initServer, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action = null) {
    switch (action.type) {
        case 'INIT_SERVER':
            return initServer(state);
        case 'REGISTER':
            return addPlayer(state, action.player);
        case 'INCREASE_TARGET_GOAL':
            return increaseTargetGoal(state, action.player, action.target);
        case 'DECREASE_TARGET_GOAL':
            return decreaseTargetGoal(state, action.player, action.target);
        case 'UPDATE_PLAYER_STATE':
            return updatePlayerState(state, action.player, action.newPlayerState);
        case 'PROMISE_RESOURCE':
            return promiseResource(state, action.playerName, action.resourceValue, action.targetName);
        case 'SUBMIT_LOBBY':
            return submitLobby(state, action.playerName);
    }
    return state;
}
