<?php
	class Dictionary{
		public $filename;
		public $handler;
		public $size;
		public function __construct($filename)
		{
			if(file_exists($filename))
			{
				$this->filename = $filename;
			}
			else
			{
				echo("No such file ".$filename);
			}
			$this->determineDictionarySize();
		}

		public function getWordFromDict()
		{
			$which = rand(1, $this->size);
			$this->handler = fopen($this->filename, 'r');
			while($which--)
			{
				$word = fgets($this->handler);
			}
			fclose($this->handler);
			return trim($word);
		}

		private function determineDictionarySize()
		{
			$words = 0;
			$this->handler = fopen($this->filename, 'r');
			while(!feof($this->handler))
			{
				fgets($this->handler);
 				$words++;
			}
			fclose($this->handler);
			$this->size = $words;
		}
	}

	class Word{
		public $answer;
		public function __construct($word)
		{
			$this->answer = $word;
		}
	}
	$dict =  new Dictionary('resources/dictionary');
	$ans = new Word($dict->getWordFromDict());
	echo($ans->answer);
?>
