import React from 'react';

export default React.createClass({

    render: function() {

        //@todo check if name is already set in cookie, if not show registration screen

        return <div className="registration">
            <h1>Name:</h1>
            <input type="text" onclick="alert('hi!');" name="playername" />
            <br />
            <button>Register</button>
        </div>;
    }
});