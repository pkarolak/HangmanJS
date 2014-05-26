var letters = ['a','ą','b','c','ć','d','e','ę','f','g','h','i','j','k','l','ł','m','n','ń','o','ó','p','r','s','ś','t','u','w','y','z','ź','ż']
var letter = '';
var toGuess = 0;
var lives = 10;
var word = '';

$(document).ready(function() {
	init();
	generateInterface();
	$("button.letter").click(
		function(event) {
			l = event.target.id
			console.log(l);
			if(toGuess && lives) {
				$("#"+l).fadeOut();
				validateLetter(l);
			}
		}
	);
	$("button.new_game").click(
		function() {
			removeOldGame();
			init();
		}
	);
});


function init() {
	word = '';
	req = $.ajax(
		{
			type: "GET",
			url: "hangman.php",   
         	async: false,
         	success : function(text) {
	            word = text;
	        }
	    }
	);
	console.log(word);
	createInput(word.length);
}

function generateInterface() {
	letters.forEach(function(entry) {
		$("#letters ul").append("<button class=\"letter\" id=\""+entry+"\" >"+entry+"</button>");	
	});
}


function removeOldGame() {
	$('button.letter').fadeIn();
	$('.password').remove();
	$('.letter').show();
	$('.main_picture').attr('src','images/hangman.jpg');
	letter = '';
	toGuess = 0;
	lives = 10;
}

function createInput(placeholders) {
	var i = 0;
	toGuess = placeholders;
	while(placeholders--)
	{
		var newInput = document.createElement('input');
		newInput.type = 'text';
		newInput.className = 'password';
		newInput.id = i;
		newInput.readOnly = true;
		i++;
		$('#grid').append(newInput);
	}
}

function validateLetter(letter) {
	var flag = false;
	for(var i = 0; i < word.length ; ++i) {
		if(word[i]==letter) {
			flag = true;
			$('.password#'+i).val(letter);
			$('.password#'+i).addClass("guessed");
			toGuess--;
			if(toGuess == 0) {
				$('.guessed').css("color","#00FF00")
				$('.main_picture').attr('src', 'images/winner.jpg');
			}
		}
	}
	if(!flag) {
		if(lives > 0) {
			--lives;
			var add = 10-lives
			$('.main_picture').attr('src', 'images/hangman'+add.toString()+'.jpg');
			if(lives == 0) {
				for(var i = 0; i < word.length ; ++i) {
					$('.password#'+i).val(word[i]);
					$('.password#'+i).addClass("dead");
				}
				$(".dead").css("color","red");
			}
		}
	}
}