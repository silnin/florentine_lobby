import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    submitSignoriaRound: function() {
        console.log("heya, done signa yo");
        this.props.submitSignoriaRound();
    },

    render: function() {

        return <div className="gonfaloniere">
            <h1>Signoria</h1>
            <h2>Select which party the Gonfaloniere's chose funds should be given to.</h2>

            [nobility] - [church] - [common people]

            <input type="button" onClick={this.submitSignoriaRound} value="Finish"/>
        </div>
    }
});
