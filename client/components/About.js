import React from 'react';

class Greetings extends React.Component {
  render() {
    return (
      <div className="container">
      	<div className="col-md-12">
        	<h2>How does Redux Work? </h2>
        	<br/>
        	<p>Redux can be broken down into the following:</p>
        	<hr/>
        	<ul>
				<li>
					<code>store</code>: manages the states. Mainly there is a <code>dispatch</code> method to dispatch an <code>action</code>. <strong>In a Redux app, you can obtain its states via <code>store.getState()</code></strong>
				</li> <br/>
				<li>
					<code>action</code>: a simple, plain JavaScript object. <strong>An action can also be considered as a command to change a state.</strong>
				</li> <br/>
				<li>
					<code>reducer</code>: decides how to change a state after receiving an <code>action</code>, and thus can be considered the entrance of a state change. A <code>reducer</code> is comprised of functions, and it changes states by taking an <code>action</code> as an argument, in which it then <code>return</code>s a new state.
				</li> <br/>
				<li>
					<code>middleware</code>: the middleman between a <code>store.dispatch()</code> and a <code>reducer</code>. Its purpose is to intercept an <code>action</code> that has been <code>dispatch</code>ed, and modify or even cancel the <code>action</code> before it reaches the <code>reducer</code>.
				</li>
			</ul>
			<hr/>
        </div>
      </div>
    );
  }
}

export default Greetings;