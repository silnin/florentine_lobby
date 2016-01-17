import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    registerMe: function() {
        //console.log("heya, registerMe");
        this.props.register('blaat');
    },

    render: function() {

        //@todo check if name is already set in cookie, if not show registration screen
        return <div className="registration">
            <h1>Name:</h1>
            <input type="text" id="playername" />
            <br />
            <button
                onClick={this.registerMe()}>
            Register
            </button>

            Registered players: {this.props.players}
        </div>;
    }
});