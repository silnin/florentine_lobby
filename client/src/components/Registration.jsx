import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    registerMe: function() {
        const name = document.getElementById("playername").value;
        console.log("heya, registerMe " + name );
        this.props.register(name);
    },

    render: function() {

        //@todo check if name is already set in cookie, if not show registration screen
        return <div className="registration">
            <h1>Name:</h1>
            <input type="text" id="playername" />
            <br />
            <input type="button" onClick={this.registerMe} value="Register"/>
        </div>;
    }
});