import React from 'react';
import {connect} from 'react-redux';
import Registration from './Registration';
import StateMonitor from './StateMonitor';
import Strategy from './Strategy';
import Lobby from './Lobby';
import ElectionResult from './ElectionResult';
import Gonfaloniere from './Gonfaloniere';
import Signoria from './Signoria';
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
                if (this.props.players.has(me)
                    && this.props.players.get(me).get('state') != 'strategizing') {
                    // show waiting screen
                    return <div>
                        <StateMonitor {...this.props} />
                        <Wait reason="Wait for opponent to finish his goals..." />
                    </div>;
                }
                return <div>
                    <StateMonitor {...this.props} />
                    <Strategy {...this.props} />
                </div>;

            case 'lobby':
                if (this.props.players.has(me)
                    && this.props.players.get(me).get('state') != 'lobbying') {
                    // show waiting screen
                    return <div>
                        <StateMonitor {...this.props} />
                        <Wait reason="Wait for the election..." />
                    </div>;
                }
                return <div>
                    <StateMonitor {...this.props} />
                    <Lobby {...this.props} />
                </div>;
            case 'election':
                if (this.props.players.has(me)
                    && this.props.players.get(me).get('state') != 'wait_for_election') {
                    // show waiting screen
                    return <div>
                        <StateMonitor {...this.props} />
                        <Wait reason="Wait until the other player is ready..." />
                    </div>;
                }
                return <div>
                    <StateMonitor {...this.props} />
                    <ElectionResult {...this.props} />
                </div>;
            case 'r1':
                if (this.props.players.get(me).get('state') != 'election_accepted') {
                    // show waiting screen
                    return <div>
                        <StateMonitor {...this.props} />
                        <Wait reason="Wait until everyone has accepted the election..." />
                    </div>;
                }

                if (this.props.me.get('name') == this.props.gonfaloniere.get('name')) {
                    return <div>
                        <StateMonitor {...this.props} />
                        <Gonfaloniere {...this.props} />
                    </div>;
                }

                return <div>
                    <StateMonitor {...this.props} />
                    <Signoria {...this.props} />
                </div>;
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
