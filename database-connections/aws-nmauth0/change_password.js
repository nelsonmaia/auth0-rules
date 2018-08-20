function changePassword (email, newPassword, callback) {
    
    
    console.log("changePassword - connecting to aws mysql - using GitHub");
    var connection;
     connection = mysql({
       host: configuration.MYSQL_HOST,
       user: 'admin',
       password: configuration.MYSQL_PASSWORD,
       database: 'nmauth0'
     });
    connection.connect();
  
    var query = "UPDATE users SET password = ? WHERE email = ? ";
  
    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) {
        callback(err);
      } else {

        var params = [hash, email];
        
        connection.query(query, params, function (err, results) {
          if (err) return callback(err);
          callback(null, results.length > 0);
        });

      }
    });
  }
  