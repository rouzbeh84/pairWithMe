var React = require('react');

var Questions = React.createClass({

	render: function() {
		return (
			<div>
			  <div className="guide-block">
					<h4><strong>What is Pair Programming?</strong></h4>
					<p>
							Pair Programming in its simple form is just two people working together on a project. We recommend when programming to follow the driver navigator method to be the most efficient. This essentially means one partner,driver, types while the other, navigator, researches problems and checks the drivers work.
					</p>
					<ul>
						<li><a href="https://en.wikipedia.org/wiki/Pair_programming">Overview of what Pair Programming is</a></li>
						<li><a href="http://www.extremeprogramming.org/rules/pair.html">Quick guide on the rules of Pair Programming
						</a></li> 
					</ul>

			  </div>
				<div className="guide-block">
					<h4><strong>Why Pair Program?</strong></h4>
					<p>
						Pair Programming allows you to have two minds working on the same problem making it much easier and faster to solve. It also forces you to express your logic in an efficient manner. Pair programming forces you to write better code faster.
					</p>
					<ul>
						<li><a href='http://cafe.elharo.com/programming/why-pair-programming-works/'>Article on the benifits of Pair Programming</a></li>
						<li><a href='https://blog.inf.ed.ac.uk/sapm/2014/02/17/why-pair-programming/'>Blog on why Pair Programming works</a></li>
					</ul>
				</div>
				<div className="guide-block">
					<h4><strong>How to Pair Program?</strong></h4>
					<p>
						To pair program take shifts revolving every 15 to 30 minutes or every other challenge. As one partner takes on the role of driver and actually types out the code. The other partner assumes the role of navigator and they are in charge of research and helping the driver through blocks. As the driver types the navigator should watch for errors and problems with the logic. At all times both partners should be able to articulate there logic and thoughts.
					</p>
					<ul>
						<li><a href='http://www.wikihow.com/Pair-Program'>Shows the steps to Pair Programming</a></li>
						<li><a href='http://anh.cs.luc.edu/170/Kindergarten.html'>Simple explanation of how to Pair Program</a></li>
					</ul>
				</div>
				<div className="guide-block">
					<h4><strong>Who Can Pair Program?</strong></h4>
					<p>
						We recommend that anyone wanting to start with going through tutorials like Codeschool or Codeacademy to have a basic understanding of what programming is. After that there are plenty of people on our site that love teaching through pair programming. So the simple answer to that anyone can program!
					</p>

				</div>
				<div className="guide-block">
					<h4><strong>When to Pair Program</strong></h4>
					<p>
						Anytime you are willing to share and use different views on a project. There are few instances in which pair programming will not be the most fun and efficient, way to program.
					</p>
					<ul>
					<li><a href="http://www.boost.co.nz/blog/2011/11/pair-programming-when-and-why/">Blog about when to pair program</a></li>
					</ul>
				</div>
				<div className="guide-block">
					<h4><strong>What Technologies to Use?</strong></h4>
						<p>
							I would recommend agreeing on one type of text editor. I also recommend using GitHub to share your code with each other. Then each situation will require different sets of technology for a specific instance. So keep an open mind and pick the best tools for the job.
						</p>
						<ul>
						<li><a href="http://blog.stevenhaddox.com/2012/04/11/remote-pairing-with-ssh-tmux-vim/">Blog on using ssh, tmux, and vim</a></li>
						<li><a href="https://guides.github.com/activities/hello-world/">GitHub is a great form of version control and sharing of projects</a></li>
						</ul>
				</div>
				<div className="guide-block">
					<h4><strong>How to Remote Pair Program?</strong></h4>
					<p>
						Remote pair programming can be simple and just as efficient as in person programming. We recommend using a text editor in which you can share a workspace and some form of video chatting. Other than that you basically do the same thing as you would in person with a little bit more articulation of your thoughts since you can not read body language as well.
					</p>
					<ul>
						<li><a href="http://remotepairprogramming.com/">A great blog on how to pair program remotley</a></li>
						<li><a href="http://zeespencer.com/articles/building-a-remote-pairing-setup/">A guide to building A remote Command Line setup</a></li>
						<li><a href="http://evan.tiggerpalace.com/articles/2011/10/17/some-people-call-me-the-remote-pairing-guy-/">Great guide to what you need to remote program</a></li>
						
						<li><a href="https://github.com/livingsocial/ls-pair">Info on some of the best remote programming practices</a></li>
					</ul>
				</div>
				<div className="guide-block">
					<h4><strong>What is A Good Project?</strong></h4>
					<p>
						All projects are a good project. Pick a project goal in scope for your skill level and just have fun with it. Just because your project is not ground breaking or has been done before does not mean your project is not good!
					</p>
					<ul>
						<li><a href='http://www.ideaswatch.com/startup-ideas/app'>Great site to find project ideas</a></li>
						<li><a href='http://www.linuxtrainingacademy.com/projects/'>List of projects to develop coding skills</a></li>
					</ul>
				</div>
			</div>
		);
	}

});

module.exports = Questions;
