//bot.js - main bot logic
//Copyright (c) Kevin Zhou 2013
//BEGIN MH BOT CODE

//Don't want to clutter up global namespace
var mhBotOptions = {
	//15 minutes
	hornSoundTime: 1000*60*15,
	//Delay in milliseconds.
	minDelay: 5000,
	maxDelay: 10000,
	timeout: null
};
var waitTime;
var waitInterval;
var theTime;
//Just for sounding horn, no delay here.
function soundHorn(elementRef) {
	if (elementRef.tagName.toLowerCase() == "iframe") {
		//It's an iframe, lets do work!
		//Legacy URL for browsers without JS, perfect for our needs.
		elementRef.src="http://mousehuntgame.com/canvas/turn.php";
	}
}
function wait(options) {
	var generatedRandom = mhBotOptions.hornSoundTime + generateRandom(options.minDelay, options.maxDelay);
	options.timeout = setTimeout("document.getElementById('start').click();", generatedRandom);
	//We need this to tell user how long until next horn sound.
	waitTime = generatedRandom;
}
function generateRandom(lowerBound, upperBound) {
	var random = Math.floor(Math.random() * (upperBound - lowerBound));
	return random + lowerBound;
}
function changeStatus(msg) {
	document.getElementById('status').innerHTML = msg;
}
function begin() {
	//OK kiddos, lets use the Date object
	theTime = new Date();
	waitInterval = setInterval("var curTime = new Date();var diff = curTime.valueOf() - theTime.valueOf();var waitTimeLeft = Math.floor((waitTime - diff)/1000);document.getElementById('timeLeft').innerHTML = Math.floor(waitTimeLeft/60) + \" minute(s) \" + Math.floor(waitTimeLeft % 60) + \" second(s)\";", 1000);
}
function pause() {
	clearInterval(waitInterval);
	document.getElementById('timeLeft').innerHTML = "N/A";
}