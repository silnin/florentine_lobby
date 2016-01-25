import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    submitGonfaloniereRound: function() {
        console.log("heya, done gonfa yo");
        this.props.submitGonfaloniereRound();
    },

    render: function() {

        return <div className="gonfaloniere">
            <h1>Gonfaloniere</h1>
            <h2>Select which resource to have the Signoria work with</h2>

            [6] - [2] - [10]

            <input type="button" onClick={this.submitGonfaloniereRound} value="Finish"/>
        </div>
    }
});
