
$(document).ready(function(){

	var userImageRef = {
		shawndrost : "https://www.gravatar.com/avatar/5yyy66788900?s=250&d=identicon&r=PG",
		sharksforcheap: "https://www.gravatar.com/avatar/67899?s=250&d=identicon&r=PG",
		mracus:"https://www.gravatar.com/avatar/222222222344?s=220&d=identicon&r=PG",
		douglascalhoun : "https://www.gravatar.com/avatar/42456627899?s=250&d=identicon&r=PG",
		homeuser : "https://www.gravatar.com/avatar/6677889?s=250&d=identicon&r=PG"
	}

	constructTwittlerPage();
	handleClick();

	function constructTwittlerPage(){
		var $body = $('body');
		contructHeader($body);
		constructProfileSection($body);
		constructTweetSection($body);
		loadTweets();
		setInterval(loadTweets, 30000);
	}

	function handleClick(){
		$('.tweetsSection').click(function(event){
			if($(event.target).hasClass('usernamelink')){
				handleUsernameClick($(event.target));
			}
		});
		$('.home a').click(function(){
			handleHomeClick();
		})
	}

	function handleUsernameClick(clickObject){
		window.location.hash = "#"+$(clickObject).html();
        loadTweets();
	}

	function handleHomeClick(clickObject){
		window.location.hash = "";
        loadTweets();
	}

	function contructHeader(container){
		addTag('header', container, {'class' : 'topbar'});
		addTag('nav', $('header'), {'class' : 'container'});
		var $home = addTag('div', $('nav'),{'class' : 'home'});
		addTag('i', $home, {'class' : 'fa fa-home'});
		addTag('a', $home, {}, 'Home');
	}

	function constructProfileSection(container){
		var $profileSection = addTag('section', container, {'class' : 'profileSection'});
		var $profilePic = addTag('div', $profileSection, {'class' : 'profilepic'});
		addTag('img', $profilePic);
		var $profileStats = addTag('div', $profileSection, {'class' : 'profilestats'});
		addTag('div', $profileStats, {'class' : 'accountname'});
		addTag('div', $profileStats, {'class' : 'accounthandle'});
		var $accountStats = addTag('div', $profileSection, {'class' : 'accountstats'});;
		var $taccountStatsList = addTag('ul', $accountStats);
		var $tweetStats = addTag('li', $taccountStatsList)
		addTag('span', $tweetStats, {'class' : 'statheadings'}, 'tweets');
		addTag('span', $tweetStats, {'class' : 'statvalue nooftweets'});
		var $followinStats = addTag('li', $taccountStatsList);
		addTag('span', $followinStats, {'class' : 'statheadings'}, 'following');
		addTag('span', $followinStats, {'class' : 'statvalue'}, '130');
		var $followerStats = addTag('li', $taccountStatsList);
		addTag('span', $followerStats, {'class' : 'statheadings'}, 'followers');
		addTag('span', $followerStats, {'class' : 'statvalue'}, '150');
	}

	function constructTweetSection(container){
		 var $tweetSection = addTag('section', container, {'class' : 'tweetsSection'});
		 constructAddTweet($tweetSection);
		 addTag('div', $tweetSection, {'class' : 'displaytweet'})
	}

	function constructAddTweet(container){
		var $tweet = addTag('div', container, {'class' : 'addtweet'});
		addTag('img', $tweet);

		var $tweetbox = addTag('span', $tweet);
		addTag('textarea', $tweetbox, { 'id' : 'tweet', 'placeholder' : ' Whats Happening?','rows':'1','class':'collapse'});

		var $submit=addTag('input',$tweet,{'type':'button','value':'Tweet','class':'submit','disabled':'true'});
		$submit.hide();

		$("#tweet").keyup(function(){
			var text = $("#tweet").val();
			
			if(text.length>0){
				$("input.submit").removeAttr("disabled");
			}else{
				$("input.submit").attr("disabled","true");
			}
		});


		$(".submit").click(function(){
			var text = $("#tweet").val();
			visitor = username;
			writeTweet(text);
			console.log(streams.users[username]);
			$(".addtweet").blur();
			$("#tweet").val('');
			$("#tweet").attr('placeholder','Whats Happening?');
		});	


		$("#tweet").click(function(){
			if(username !== '' && username !== 'homeuser'){
				$("#tweet").attr('placeholder','');
				if($("#tweet").hasClass("collapse")){
					$("#tweet").removeClass("collapse").addClass("expand");
					$("#tweet").animate({
					    height: "+=50"
					}, 50);
					$(".addtweet").animate({
					    height: "+=110"
					}, 50,function(){
						$("input.submit").show();
					});
			}
		}

		});

		$(".addtweet").blur(function(){
			$("#tweet").removeClass("expand").addClass("collapse");
			$("input.submit").hide();
			$("#tweet").css('height','30px');
			$(".addtweet").css('height','65px');
			$("#tweet").attr('placeholder','Whats Happening?');
		});
	}

	function constructTweets(container){
		var $tweetContainer = addTag('div', container, {'class' : 'tweetContainer'});

		var $image = addTag('div', $tweetContainer, {'class' : 'profileimage'});
		addTag('img', $image, {'class' : 'image'});

		var $user = addTag('div', $tweetContainer, {'class' : 'user'});
		var $username = addTag('span', $user, {'class' : 'username'});
		addTag('a', $username,{'class' : 'usernamelink'})
		addTag('span', $user, {'class' : 'userhandle'});
		addTag('span', $user, {'class' : 'separator'});
		addTag('time', $user, {'class' : 'tweettime'});

		var $message = addTag('div', $tweetContainer, {'class' : 'tweettext'});
		addTag('span', $message, {'class' : 'tweet'});
		addTag('span', $message, {'class' : 'tag'});

		return $tweetContainer;
	}

	function loadTweets(){
		username = window.location.hash;
		var index, tweet;
      	if(username === ""){
	        index = streams.home.length - 1;
	        tweetList = streams.home;
	        $('.addtweet img').attr({'src' :userImageRef['homeuser']});
	        $('.accountname').text('homeuser');
	        $('.accounthandle').text('@homeuser');
	        $('.nooftweets').text(index+1);
	        $('.profilepic img').attr({'src' :userImageRef['homeuser']})
	        $('#tweet').attr("disabled","true");
      	}else{
	        username=username.slice(1);
	        index = streams.users[username].length-1;
	        tweetList = streams.users[username];
	        $('.addtweet img').attr({'src' :userImageRef[username]});
	        $('.accountname').text(username);
	        $('.accounthandle').text('@' + username);
	        $('.nooftweets').text(index+1);
	        $('.profilepic img').attr({'src' :userImageRef[username]})
	        $('#tweet').removeAttr("disabled");
      	}
      	var $displayTweet = $('.displaytweet');
      	$displayTweet.html("");

      	while(index >= 0){
      		tweet = tweetList[index];
      		var $tweetContainer = constructTweets($displayTweet);
     
      		$tweetContainer.find('.image').attr({'src' :userImageRef[tweet.user]});
      		$tweetContainer.find('.username a').text(tweet.user);
      		$tweetContainer.find('.userhandle').text('@'+ tweet.user);
      		$tweetContainer.find('.separator').text('.');
      		$tweetContainer.find('.tweettime').text(moment(tweet.created_at).fromNow(true));
      		var msgList = tweet.message.split('#');
      		$tweetContainer.find('.tweet').text(msgList[0]);
      		var tags = '';
      		for(var i=1; i<msgList.length; i++){
      			tags += '#' + msgList[i] +' '; 
      		}
      		$tweetContainer.find('.tag').text(tags);
      		index --;
      	}
	}

	function addTag(tagName, parentObject, attributes={}, text){
		var $tag=$("<"+tagName+"></"+tagName+">");
		$tag.attr(attributes).appendTo(parentObject);
		if(text){
			$tag.text(text);
		}
		return $tag;
	}

})