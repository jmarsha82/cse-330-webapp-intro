<!DOCTYPE html>
<head><title>Calculation</title></head>
<body>
<?php
$first = $_GET['firstnumber'];
$second = $_GET['lastnumber'];
$operation = $_GET['operation'];


if($first=="" || $second=="" || $operation=="") {
    printf("All fields required!");
    exit();
}else{

switch($operation){
	case "add":
		$answer = $first + $second;
		$string = "+";
		break;
	case "subtract":
		$answer = $first - $second;
		$string = "-";
		break;
	case "multiply":
		$answer = $first * $second;
		$string = "*";
		break;
	case "divide":
		if($second!=0){
			$answer = $first / $second;
			$string = "/";
		}else{
			printf("The second number cannot be zero!");
			exit();
		}
		
		break;
}


 
printf("<p>%d %s %d = %d </p>\n",
	htmlentities($first),
	$string,
	htmlentities($second),
	$answer
);

}
?>
</body>
</html>