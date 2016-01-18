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