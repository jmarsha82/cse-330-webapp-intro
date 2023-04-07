<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Matches</title>
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
        <h1>User Listings</h1>
        <?php
        require 'database.php';
        
        $stmt = $mysqli->prepare("SELECT email, name, filename, age, description FROM users");
        if (!$stmt) {
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        
        $stmt->execute();
        $stmt->bind_result($email, $name, $filename, $age, $decription);

        while($stmt->fetch()){
            printf("<table><tr><td>
                   <img src='uploads/".$filename."' max-width='300'>
                   </td><td>".$name."</td><td>".$age."</td><td>"."</td><td>".$email."</td><td>".$decription."</td></tr></table>");
        }

        ?>
        
        <form action=age-range.php method="post" enctype="multipart/form-data">
			<label for="low">Low</label>
            <input id="low" type="number" name="low" min="18"><br>
            <label for="high">High</label>
            <input id="high" type="number" name="high" min="18"><br>
            <input type="submit" value="submit">
        </form>
    </div>
</body>
</html>