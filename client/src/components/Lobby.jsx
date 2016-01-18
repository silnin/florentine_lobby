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

//<BudgetPool {...this.props} />
//Nobility <GoalSpinner {...this.props} target="t1" targetScore={this.props.me.get('score').get('t1').get('goal')}/>
//Church <GoalSpinner {...this.props} target="t2" targetScore={this.props.me.get('score').get('t2').get('goal')}/>
//Common <GoalSpinner {...this.props} target="t3" targetScore={this.props.me.get('score').get('t3').get('goal')}/>