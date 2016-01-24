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
                <b>T1 Reputation</b>: {this.props.me.get('score').get('t1').get('reputation')}<br/>
                <b>T1 Vote</b>: {this.props.me.get('score').get('t1').get('vote')}<br/>
                <b>T1 overStateP</b>: {this.props.me.get('score').get('t1').get('overState')}<br/>
                <b>T1 promise6</b>: {this.props.me.get('score').get('t1').get('promise6')}<br/>
                <b>T1 promise2</b>: {this.props.me.get('score').get('t1').get('promise2')}<br/>
                <b>T1 promise1</b>: {this.props.me.get('score').get('t1').get('promise1')}<br/>

                <b>T2 Goal</b>: {this.props.me.get('score').get('t2').get('goal')}<br/>
                <b>T2 Current</b>: {this.props.me.get('score').get('t2').get('current')}<br/>
                <b>T2 Reputation</b>: {this.props.me.get('score').get('t2').get('reputation')}<br/>
                <b>T2 Vote</b>: {this.props.me.get('score').get('t2').get('vote')}<br/>
                <b>T2 overStateP</b>: {this.props.me.get('score').get('t2').get('overState')}<br/>
                <b>T2 promise6</b>: {this.props.me.get('score').get('t2').get('promise6')}<br/>
                <b>T2 promise2</b>: {this.props.me.get('score').get('t2').get('promise2')}<br/>
                <b>T2 promise1</b>: {this.props.me.get('score').get('t2').get('promise1')}<br/>

                <b>T3 Goal</b>: {this.props.me.get('score').get('t3').get('goal')}<br/>
                <b>T3 Current</b>: {this.props.me.get('score').get('t3').get('current')}<br/>
                <b>T3 Reputation</b>: {this.props.me.get('score').get('t3').get('reputation')}<br/>
                <b>T3 Vote</b>: {this.props.me.get('score').get('t3').get('vote')}<br/>
                <b>T3 overStateP</b>: {this.props.me.get('score').get('t3').get('overState')}<br/>
                <b>T3 promise6</b>: {this.props.me.get('score').get('t3').get('promise6')}<br/>
                <b>T3 promise2</b>: {this.props.me.get('score').get('t3').get('promise2')}<br/>
                <b>T3 promise1</b>: {this.props.me.get('score').get('t3').get('promise1')}<br/>
            </div>;
        } else {
            return <div className="playerMonitor">
                not registered yet
                </div>;
        }
    }
});
