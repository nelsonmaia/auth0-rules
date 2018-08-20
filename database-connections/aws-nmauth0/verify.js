function verify (email, callback) {
    var connection;
    connection = mysql({
      host: configuration.MYSQL_HOST,
      user: 'admin',
      password: configuration.MYSQL_PASSWORD,
      database: 'nmauth0'
    });
  
    connection.connect();
  
    var query = "UPDATE users SET email_Verified = true WHERE email_Verified = false AND email = ? ";
  
    connection.query(query, email, function (err, results) {
      if (err) return callback(err);
      if (results.length === 0) return callback();
  
      callback(null, results.length > 0);
    });
  
  }
  