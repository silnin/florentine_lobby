import {List, Map} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles REGISTER', () => {
        const state = Map();
        const initialState = initServer(state);

        const action = {type: 'REGISTER', player: 'Bob'};
        const nextState = reducer(initialState, action);
        const expectedState = Map().set('players', List.of('Bob')).set('gamestate', 'registering_players');
        expect(nextState).to.equal(expectedState);
    });
});

export function setGameState(state, newState)
{
    return state.set('gamestate', newState);
}

export function initServer(state) {
    const initializedState = setGameState(state, 'uninitialized');
    return initPlayers(initializedState);
}

export function initPlayers(state) {
    return state.set('players', List());
}