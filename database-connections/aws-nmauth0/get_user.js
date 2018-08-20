function getByEmail (name, callback) {


    console.log("getbyEmail - connecting to aws mysql - using GitHub");
    var connection;
     connection = mysql({
       host: configuration.MYSQL_HOST,
       user: 'admin',
       password: configuration.MYSQL_PASSWORD,
       database: 'nmauth0'
     });
   

    connection.connect();
  
     var query = "SELECT id, nickname, email, email_Verified from users u where u.email = ? ";

     connection.query(query, name, function (err, results) {

        if (err) return callback(err);
        if (results.length === 0) return callback();
    
        var user = results[0];

        var profile = {
            id: user.id.toString(),
             nickname: user.nickname,
             email: user.email
          };
        
          callback(null, profile);
     });
  }
  