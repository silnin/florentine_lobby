import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {

        return <div className="wait">
            <h3>Please wait until your opponent has registered...</h3>
        </div>;
    }
});