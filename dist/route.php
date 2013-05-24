<?php

class route{
	public $uri;

	public function map($map){
		preg_match_all("/\{([^\}]+)\}/", $map, $keys);
		$keys = $keys[1];

		$baseRequest = str_replace($_SERVER['DOCUMENT_ROOT'], "", $_SERVER['SCRIPT_FILENAME']);
		$baseRequest =  str_replace(".php", "", $baseRequest);
		$requestParameters = str_replace($baseRequest, "", $_SERVER['REQUEST_URI']);
		$requestParameters = preg_split("/(\/|\?)/", $requestParameters);
		array_shift($requestParameters);

		for($i=0; $i<count($requestParameters) && $i<count($keys); $i++){
			$this->$keys[$i] = $requestParameters[$i];
		}
	}
}

?>