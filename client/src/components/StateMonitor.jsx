import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PlayerMonitor from './PlayerMonitor';

export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {

        return <div className="stateMonitor">
            <b>gamestate</b>: {this.props.gamestate} <br />
            <b>PLAYERS</b>: <br />
            <PlayerMonitor {...this.props} />
            </div>
        }
});
