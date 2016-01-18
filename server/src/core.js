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
    const newPlayers = oldPlayers.set(player, initPlayer(player));
    const nextState = state.set('players', newPlayers);

    // update game state
    if (nextState.get('players').count() == 1) {
        return setGameState(nextState, 'registering_players');
    }

    if (nextState.get('players').count() == 2) {
        return setGameState(nextState, 'strategizing');
    }
}

export function increaseTargetGoal(state, player, target) {
    if (state.get('players').get(player).get('score').get('budget') > 0) {

        console.log("budget was " + state.get('players').get(player).get('score').get('budget'));
        const nextState = state.updateIn(
            ['players', player, 'score', 'budget'],
            0,
            budget => budget - 1
        );

        console.log("budget became " + nextState.get('players').get(player).get('score').get('budget'));

        return nextState.updateIn(
            ['players', player, 'score', target, 'goal'],
            0,
            goal => goal + 1
        );

    } else {
        return state;
    }
}

export function decreaseTargetGoal(state, player, target) {
    if (state.get('players').get(player).get('score').get(target).get('goal') > 0) {

        const nextState = state.updateIn(
            ['players', player, 'score', 'budget'],
            0,
                budget => budget + 1
        );

        return nextState.updateIn(
            ['players', player, 'score', target, 'goal'],
            0,
                goal => goal - 1
        );

    } else {
        return state;
    }
}

function setGameState(state, newState)
{
    console.log('setting state to ' + newState);
    return state.set('gamestate', newState);
}

function initServer(state = Map()) {
    console.log('initServer much?');
    const initializedState = setGameState(state, 'uninitialized');
    return initPlayers(initializedState);
}

function initPlayers(state) {
    return state.set('players', Map());
}

function initPlayer(name) {

    return Map({
        name: name,
        score: Map({
            budget:100,
            t1:Map({
                goal: 0,
                current: 0
            }),
            t2:Map({
                goal: 0,
                current: 0
            }),
            t3:Map({
                goal: 0,
                current: 0
            })
        }),
        state: 'strategizing'
    });
}