import React from 'react';
import {connect} from 'react-redux';
import Registration from './Registration';
import StateMonitor from './StateMonitor';
import Strategy from './Strategy';
import Wait from './Wait';
import * as actionCreators from '../action_creators';
import {getCookie} from '../cookie_actions';
import {Map} from 'immutable';

export const Game = React.createClass({

    render: function() {

        // read my name from cookie
        const me = getCookie('playername');
        console.log('Welcome ' + me);

        // read
        switch (this.props.gamestate) {
            case 'registering_players':
                if (this.props.players.has(me)) {
                    // show waiting screen
                    return <div>
                        <StateMonitor {...this.props} />
                        <Wait reason="Wait until your opponent has registered..." />
                    </div>;
                }
                return <div>
                    <StateMonitor {...this.props} />
                    <Registration {...this.props} />
                </div>;
            case 'uninitialized':
                return <div>
                    <StateMonitor {...this.props} />
                    <Registration {...this.props} />
                </div>;
            case 'strategizing':
                return <div>
                    <StateMonitor {...this.props} />
                    <Strategy {...this.props} />
                </div>;
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

    // read my name from cookie
    const me = getCookie('playername');

    const meState = state.get('players').has(me) ? state.get('players').get(me) : Map();

    return {
        gamestate: state.get('gamestate'),
        players: state.get('players'),
        lobby: state.get('lobby'),
        gonfaloniere: state.get('gonfaloniere'),
        signoria: state.get('signoria'),
        me: meState
    };
}

connect(mapStateToProps)(Game);

export const GameContainer = connect(
    mapStateToProps,
    actionCreators
)(Game);
