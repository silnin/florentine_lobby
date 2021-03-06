export function initServer() {
    return {
        type: 'INIT_SERVER'
    };
}

export function setState(state) {
    return {
        type: 'SET_STATE',
        state: state
    };
}

export function register(playername) {
    return {
        meta: {remote: true},
        type: 'REGISTER',
        player: playername
    };
}

export function increaseTargetGoal(player, target) {
    return {
        meta: {remote: true},
        type: 'INCREASE_TARGET_GOAL',
        player: player,
        target: target
    }
}

export function decreaseTargetGoal(player, target) {
    return {
        meta: {remote: true},
        type: 'DECREASE_TARGET_GOAL',
        player: player,
        target: target
    }
}

export function updatePlayerState(player, newPlayerState) {
    return {
        meta: {remote: true},
        type: 'UPDATE_PLAYER_STATE',
        player: player,
        newPlayerState: newPlayerState
    }
}

export function promiseResource(playerName, resourceValue, targetName) {
    return {
        meta: {remote: true},
        type: 'PROMISE_RESOURCE',
        playerName: playerName,
        resourceValue: resourceValue,
        targetName: targetName
    }
}

export function submitLobby(playerName) {
    return {
        meta: {remote: true},
        type: 'SUBMIT_LOBBY',
        playerName: playerName
    }
}
