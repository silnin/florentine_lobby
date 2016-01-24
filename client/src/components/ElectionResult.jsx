import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    acceptElection: function() {
        console.log("heya, election accepter you");
        this.props.updatePlayerState(this.props.me.get('name'), 'election_accepted');
    },

    render: function() {

        return <div className="lobby">
            <h1>And the Gonfaloniere is....</h1>
            {this.props.gonfaloniere.get('name')}
            <input type="button" onClick={this.acceptElection} value="accept your term"/>
        </div>;
    }
});