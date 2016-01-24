import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LobbyGroup from './LobbyGroup';

export default React.createClass({
    mixins: [PureRenderMixin],

    submitLobby: function() {
        console.log("heya, done lobby yo");
        this.props.submitLobby(this.props.me.get('name'));
    },

    render: function() {

        return <div className="lobby">
            <h1>Lobby your ass off!</h1>
            <h2>Which resources do you promise to which party?</h2>

            <LobbyGroup promiseResource={this.props.promiseResource} playerName={this.props.me.get('name')} resourceValue="6" img="resources/images/6.png" />
            <LobbyGroup promiseResource={this.props.promiseResource} playerName={this.props.me.get('name')} resourceValue="2" img="resources/images/2.png" />
            <LobbyGroup promiseResource={this.props.promiseResource} playerName={this.props.me.get('name')} resourceValue="1" img="resources/images/1.png" />

            <input type="button" onClick={this.submitLobby} value="Register"/>
        </div>;
    }
});
