import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    increaseMe: function() {
        console.log('increasing ' + this.props.target);

        this.props.increaseTargetGoal(
            this.props.me.get('name'),
            this.props.target
        );
    },

    decreaseMe: function() {
        console.log('decreasing ' + this.props.target);

        this.props.decreaseTargetGoal(
            this.props.me.get('name'),
            this.props.target
        );
    },

    render: function() {

        return <div className="strategy">
            <h2>{this.props.target}</h2>
            <input type="button" onClick={this.decreaseMe} value=" - "/>
            {this.props.targetScore}
            <input type="button" onClick={this.increaseMe} value=" + "/>
        </div>;
    }
});