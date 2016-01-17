import React from 'react';
import {connect} from 'react-redux';
import Registration from './Registration';
import * as actionCreators from '../action_creators';


export const Game = React.createClass({

    render: function() {
        switch (this.props.gamestate) {
            case 'registering_players':
                return <div><Registration {...this.props} /></div>;
            case 'uninitialized':
                return <div><Registration {...this.props} /></div>;
            case 'strategy':
            case 'lobby':
            case 'r1':
            case 'r2':
            case 'r3':
            case 'result':
            default:
                return <div>Could not load game</div>;
        }
    }
});

function mapStateToProps(state) {
    return {
        gamestate: state.get('gamestate'),
        players: state.get('players'),
        lobby: state.get('lobby'),
        gonfaloniere: state.get('gonfaloniere'),
        signoria: state.get('signoria')
    };
}

connect(mapStateToProps)(Game);

export const GameContainer = connect(
    mapStateToProps,
    actionCreators
)(Game);