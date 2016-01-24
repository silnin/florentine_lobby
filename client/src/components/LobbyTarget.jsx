import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    assignResource: function()
    {
        this.props.promiseResource(this.props.playerName, this.props.resourceValue, this.props.targetName);
    },
    render: function() {

        return <div className="lobbyResource">
            <img src={this.props.img} onClick={this.assignResource} />
        </div>;
    }
});
