var React = require('react');
var HomeHero = React.createClass({

render: function(){
	return (
		<div className="row">
      <div className="col-xs-12 col-sm-4 col-sm-push-8">
        <p className= "homehero">
          Program in Pairs is a site deticated to finding the optimal pair programming partner for you! We dedicate our self to making sure anyone can find the person they want to work with to ensure they have very best experience. We hope you enjoy and find our site helpful!
        </p>
        <p className="text-center">
					<a href="/auth/github">
						<img src="./img/github-sign-in.png" alt="sign in with GitHub" className="img-responsive img-shadow img-rounded"/>
					</a>
        </p>
      </div>
        <div className="col-xs-12 col-sm-8 col-sm-pull-4">
        	<img src="./img/img-home-hero.jpg" className="img-responsive img-rounded img-shadow" />
      	</div>
    </div>
		);
	},
});
module.exports = HomeHero;
