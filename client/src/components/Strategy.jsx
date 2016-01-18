import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import BudgetPool from './BudgetPool';
import GoalSpinner from './GoalSpinner';

export default React.createClass({
    mixins: [PureRenderMixin],

    submitStrategy: function() {
        console.log("heya, update player stateth ");
        this.props.updatePlayerState(this.props.me.get('name'), 'lobbying');
    },
    render: function() {

        return <div className="strategy">
            <h1>Determine Your Goals</h1>
            <BudgetPool {...this.props} />
            Nobility <GoalSpinner {...this.props} target="t1" targetScore={this.props.me.get('score').get('t1').get('goal')}/>
            Church <GoalSpinner {...this.props} target="t2" targetScore={this.props.me.get('score').get('t2').get('goal')}/>
            Common <GoalSpinner {...this.props} target="t3" targetScore={this.props.me.get('score').get('t3').get('goal')}/>

            <input type="button" onClick={this.submitStrategy} value="finish"/>
        </div>;
    }
});