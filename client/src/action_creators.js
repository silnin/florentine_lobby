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