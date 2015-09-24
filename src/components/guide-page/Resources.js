var React = require('react');
var Resources = React.createClass({
	// links to resources we found helpful
	render: function(){
		return(
			<div>
				<h3>Resources for Pair Programming</h3>

					<div className='links'>
						<a href="https://www.versionone.com/agile-101/agile-software-programming-best-practices/pair-programming/">What Pair Programming is</a><hr/>
					</div>
					<div className='links'>
						<a href="http://remotepairprogramming.com/">Remote Pairing guide</a><hr/>
					</div>
					<div className='links'>
						<a href="http://cafe.elharo.com/programming/why-pair-programming-works/">Why Pair Program</a><hr/>
					</div>
				</div>
			);
	}

});
module.exports = Resources;

<div className="guide-block">
					<h4><strong>What is Pair Programming?</strong></h4>
					<p>
							Pair Programming in its simple form is just two people working together on a project. We recommend when programming to follow the driver navigator method to be the most efficient. This essentially means one partner,driver, types while the other, navigator, researches problems and checks the drivers work.

<li>Sam Livingston-Gray <a href="http://www.youtube.com/watch?v=W_hsEi_UZHE">talks about Tools
for Pair Programming (video)</a>. See also the
<a href="https://github.com/livingsocial/ls-pair">ls-pair README</a>, which
distills many of the best practices Sam and others at LivingSocial
have evolved for remote pairing.</li>
<li>Sam also has a <a href="http://youtu.be/wKEGA8oEWXw">tmux Quick Start
screencast</a> to get you all orientated with this terminal power tool.</li>
<li>Joe Moore has a whole
<a href="http://remotepairprogramming.com/">blog dedicated to remote pair-programming</a>.</li>
<li><a href="http://zeespencer.com/articles/building-a-remote-pairing-setup/">"Build
a Command Line Remote Pairing Setup"</a>, from Zee Spencer</li>
<li>Evan Light's
"<a href="http://evan.tiggerpalace.com/articles/2011/10/17/some-people-call-me-the-remote-pairing-guy-/">The Remote Pairing Guy</a>"
blog post.</li>
<li>Steven Haddox's
"<a href="http://blog.stevenhaddox.com/2012/04/11/remote-pairing-with-ssh-tmux-vim/">Remote Pairing with ssh, tmux, and vim</a>"
blog post.</li>
<li>Angela Harms <a href="http://www.youtube.com/watch?v=OQXEzwXtzJ8">has a talk</a> about
common pitfalls.</li>