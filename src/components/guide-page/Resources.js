var React = require('react');
var Resources = React.createClass({
	// links to resources we found helpful
	render: function(){
		return(
			<div>
				<div className="guide-block">
					<h3>
						<strong>Tools to Program in Pairs</strong>
					</h3>
					<ul>
						<li>
						  <a href="http://tmux.github.io/">TMUX</a> Allows multiple users to connect to a single terminal session. Directions here for quick reference <a href="https://www.howtoforge.com/sharing-terminal-sessions-with-tmux-and-screen">tmux shared session</a> and in <a href="https://www.youtube.com/watch?v=wKEGA8oEWXw&feature=youtu.be">video here</a>
						</li>
						<li>
						  <a href="https://github.com/zolrath/wemux">Wemux</a> A simple script that makes shared tmux sessions more easily managable. A great write up on how to here <a href="http://spin.atomicobject.com/2012/04/04/simple-remote-pairing-with-wemux/">Simple Remote Pairing with wemux</a> by <a href="http://spin.atomicobject.com/author/english/">Mike English</a>.
						</li>
						<li>
						  <a href="http://termbeamer.com/">Termbeamer</a> lets two Linux users share a terminal session across the Internet.
						</li>
						<li>
						  <a href="https://github.com/livingsocial/ls-pair">ls-pair</a> 'Advice and some software tools for doing terminal-based remote pair programming.' by Bruce Campbell from <a href="Advice and some software tools for doing terminal-based remote pair programming">Living Social</a>.
						</li>
						<li>
						  <a href="https://github.com/PeopleAdmin/tweemux">Tweemux</a> A slim wrapper around tmux to ease remote pairing setup by <a href="https://github.com/PeopleAdmin/tweemux/graphs/contributors">PeopleAdmin</a>.
						</li>
						<li>
						  <a href="https://github.com/yarmand/webpair">webpair</a>Webpair is a tool to make pairing even easier by sharing a tmux session through a web browser by <a href="http://yarmand.github.io/">Yann Armand</a>.
						</li>
						<li>
						  <a href="https://github.com/chrishunt/github-auth">github-auth</a> allows you to quickly pair with anyone who has a GitHub account by adding and removing their public ssh keys from your authorized_keys file by <a href="http://www.chrishunt.co">Chris Hunt</a>
						</li>
						<li>
						  <a href="http://www.google.com/+/learnmore/hangouts/">Google+ Hangouts</a> have screen-sharing and remote desktop control capabilities with integrated audio and video chat.
						</li>
						<li>
						  <a href="http://screenhero.com/">Screenhero</a> is a screen-sharing app for Mac/Windows, optimized for collaboration. Recently acquired by <a href="https://slack.com/">Slack</a> and it is integrated beautifully into the already massively useful Slack tool.
						</li>
						<li>
						  <a href="https://join.me/">Join.me</a> Simple, free and awesome cross-platform (mac/win/mobile) screensharing for multiple users, with remote control, audio/visual connection, built in scheduling and screen recording.
						</li>
						<li>
						  <a href="https://github.com/rondale-sc/remote_pair_chef">Remote Pair Chef</a> Quickly build customized EC2 instances bootstrapped with RVM, TMUX, Vim and pre-built users in a single command by <a href="https://github.com/rondale-sc">Jonathan Jackson</a>.
						</li>
						<li>
						  <a href="https://c9.io">Cloud9</a> is an online ide that allows "developers around the world to edit the same code and chat together in real-time". You can sign in with your github account and clone repos straight into it. Cloud9 also has a great post about Pair Programming <a href="https://c9.io/blog/a-look-into-the-future/">and how it's the future</a>.
						</li>
						<li>
						  <a href="http://madeye.io">MadEye</a> MadEye is a collaborative web editor backed by your filesystem. Easy to use, designed for collaboration and built with the ACE editor. See it in action <a href="https://www.youtube.com/watch?v=MxBnPNgh8LA">here</a>.
						</li>
						<li>
						  <a href="https://github.com/FredKSchott/CoVim">CoVim</a> allows you to remotely code, write, edit, and collaborate, all within your custom Vim configuration by <a href="http://fredkschott.com/">Fred K Schott</a>. See the <a href="http://fredkschott.com/post/2013/05/introducing-covim-real-time-collaboration-for-vim/">details</a>.
						</li>
						<li>
						  <a href="https://floobits.com/">Floobits</a> Floobits lets you use native editors to work on the same files as others in real-time. It also has <a href="https://floobits.com/help/flootty">flootty</a> to share terminals as well as voice chat and screen-share via Google+ Hangouts and WebRTC to their web-based editor.
						</li>
						<li>
						  <a href="http://tmate.io/">tmate</a> is a fork of tmux. tmate and tmux can coexist on the same system, they do not conflict with each other.
						</li>
						<li>
						  <a href="https://www.nitrous.io/">Nitrous.io</a> creates a full-featured IDE in your browser. Install libraries, manage dependencies and execute scripts in your project with terminal and full root access. Zero-to-code in seconds with the power of Docker. Create and work on multiple containers, or create custom containers using Docker images with GitHub integration. Code collaboratively in real-time. Get help from a friend or co-worker, and code directly on the same machine in the cloud and take Snapshots to save your work.
						</li>
						<li>
						  <a href="http://www.teamviewer.com/">TeamViewer</a> screen-sharing app for   Mac/Windows/Linux, allows remote control and you can change color/quality
						  settings to improve latency. Free for personal use.
						</li>
						<li>
						  <a href="http://jsfiddle.net/">JSFiddle.net</a> is a great testing ground for almost anything and integrates almost all libraries and frameworks for Javascript including jQuery, YUI, MooTools, Zepto etc…
						</li>
						<li>
						  <a href="https://atom.io/packages/atom-pair">atom-pair</a> An Atom Package that allows for epic pair programming. Powered by <a href="https://pusher.com/">Pusher</a> and maintained by <a href="https://github.com/jpatel531">Jamie Patel</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}

});
module.exports = Resources;
