import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {

        if (this.props.me.size > 0) {
            return <div className="playerMonitor">
                <b>Name</b>: {this.props.me.get('name')}<br/>
                <b>State</b>: {this.props.me.get('state')}<br/>
                <b>Budget</b>: {this.props.me.get('score').get('budget')}<br/>
                <b>T1 Goal</b>: {this.props.me.get('score').get('t1').get('goal')}<br/>
                <b>T1 Current</b>: {this.props.me.get('score').get('t1').get('current')}<br/>
                <b>T2 Goal</b>: {this.props.me.get('score').get('t2').get('goal')}<br/>
                <b>T2 Current</b>: {this.props.me.get('score').get('t2').get('current')}<br/>
                <b>T3 Goal</b>: {this.props.me.get('score').get('t3').get('goal')}<br/>
                <b>T3 Current</b>: {this.props.me.get('score').get('t3').get('current')}<br/>
            </div>;
        } else {
            return <div className="playerMonitor">
                not registered yet
                </div>;
        }
    }
});
