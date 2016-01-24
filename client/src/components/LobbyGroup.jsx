import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LobbyResource from './LobbyResource';
import LobbyTarget from './LobbyTarget';

export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {

        return <div className="lobbyGroup">
            <table>
                <tr>
                    <td><LobbyResource img={this.props.img} /></td>
                    <td><LobbyTarget promiseResource={this.props.promiseResource} resourceValue={this.props.resourceValue} playerName={this.props.playerName} targetName="t1" img="resources/images/nobility.png" /></td>
                    <td><LobbyTarget promiseResource={this.props.promiseResource} resourceValue={this.props.resourceValue} playerName={this.props.playerName} targetName="t2" img="resources/images/church.png" /></td>
                    <td><LobbyTarget promiseResource={this.props.promiseResource} resourceValue={this.props.resourceValue} playerName={this.props.playerName} targetName="t3" img="resources/images/common_people.png" /></td>
                </tr>
            </table>
        </div>;
    }
});
