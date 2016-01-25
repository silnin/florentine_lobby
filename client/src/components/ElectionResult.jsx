import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    acceptElection: function() {
        console.log("heya, election accepter you");
        this.props.updatePlayerState(this.props.me.get('name'), 'election_accepted');
    },

    amIGonfaloniere: function() {
        if (this.props.gonfaloniere.get('name') == (this.props.me.get('name'))) {
            return true;
        }
        return false;
    },

    render: function() {

        if (this.amIGonfaloniere()) {
            return <div className="lobby">
                <h1>Congratulations! You have been elected Gonfaloniere!</h1>
                <input type="button" onClick={this.acceptElection} value="accept your term as Gonfaloniere"/>
            </div>;
        }

        return <div className="lobby">
            <h1>{this.props.gonfaloniere.get('name')} has been elected Gonfaloniere</h1>
            <input type="button" onClick={this.acceptElection} value="accept your term as Signoria"/>
        </div>;
    }
});