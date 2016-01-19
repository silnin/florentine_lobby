import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    submitLobby: function() {
        console.log("heya, update lobby yo");
        this.props.updatePlayerState(this.props.me.get('name'), 'wait_for_election');
    },

    render: function() {

        return <div className="lobby">
            <h1>Lobby your ass off!</h1>
            <h2>Which resources do you promise to which party?</h2>
            <input type="button" onClick={this.submitLobby} value="finish"/>
        </div>;
    }
});


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
