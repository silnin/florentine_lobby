export function initServer() {
    return {
        type: 'INIT_SERVER',
    };
}

export function register(playername) {
    return {
        meta: {remote: true},
        type: 'REGISTER',
        player: playername
    };
}