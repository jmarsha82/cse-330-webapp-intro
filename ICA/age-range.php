<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Matchmaking Site - Users by Age</title>
    <style type="text/css">
    body{
    width: 760px; /* how wide to make your web page */
            background-color: teal; /* what color to make the background */
            margin: 0 auto;
            padding: 0;
            font:12px/16px Verdana, sans-serif; /* default font */
        }
        div#main{
            background-color: #FFF;
            margin: 0;
            padding: 10px;
        }

        h1 {
            text-align: center;
            text-decoration: underline;
        }
        form {
            display: block;
        }

    </style>
</head>
<body>
        <div id="main">
        <h1>Users in Age Range</h1>
        <?php
        require 'database.php';
        
        $low = POST('low');
        $high = POST('high');
        
        $stmt = $mysqli->prepare("SELECT age, count(*) FROM users group by age");
        if (!$stmt) {
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt->execute();
        $stmt->bind_result($age, $cnt);
        $table = "<table>";
        while($stmt->fetch()){
            if($low<=$age and $high>=$age){
                $table .= "<tr><td>".$age."</td><td>".$cnt."</td></tr>";
            }
        }
        $stmt->close();

        $table .="</table>";
        echo $table;
        echo "<a href='show-users.php'>See all Users</a>";
        ?>
    </div>
</body>
</html>