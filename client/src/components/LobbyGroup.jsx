import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LobbyResource from './LobbyResource';
import LobbyTarget from './LobbyTarget';

export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {

        return <div className="lobbyGroup">
            <LobbyResource img={this.props.img} />
            <LobbyTarget promiseResource={this.props.promiseResource} resourceValue={this.props.resourceValue} playerName={this.props.playerName} targetName="t1" img="resources/images/nobility.png" />
            <LobbyTarget promiseResource={this.props.promiseResource} resourceValue={this.props.resourceValue} playerName={this.props.playerName} targetName="t2" img="resources/images/church.png" />
            <LobbyTarget promiseResource={this.props.promiseResource} resourceValue={this.props.resourceValue} playerName={this.props.playerName} targetName="t3" img="resources/images/common_people.png" />
        </div>
    }
});
