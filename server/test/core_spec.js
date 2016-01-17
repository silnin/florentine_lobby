import {List, Map} from 'immutable';
import {expect} from 'chai';
import {addPlayer} from '../src/core';

describe('application logic', () => {

    describe('addPlayer', () => {
        it('adds player to the game', () => {
            const state = getUninitializedState();
            const newPlayer = 'Bob';
            const expectedState = getUninitializedState().set('players', List.of('Bob')).set('gamestate', 'registering_players');

            const nextState = addPlayer(state, newPlayer);
            expect(nextState).to.equal(expectedState);
        });
    });
});

function getUninitializedState()
{
    const state = Map();
    const stateWithZeroPlayers = state.set('players', List());
    return stateWithZeroPlayers.set('gamestate', 'uninitialized');
}