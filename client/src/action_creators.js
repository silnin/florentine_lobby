export function initServer() {
    return {
        type: 'INIT_SERVER',
    };
}

export function register(state, player) {
    return {
        meta: {remote: true},
        type: 'REGISTER',
        player: player
    };
}