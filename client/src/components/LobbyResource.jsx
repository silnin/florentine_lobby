import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {

        return <div className="lobbyResource">
            <img src={this.props.img} />
        </div>;
    }
});
