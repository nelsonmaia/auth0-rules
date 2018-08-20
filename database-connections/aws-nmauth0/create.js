function create(user, callback) {
    console.log("create - connecting to aws mysql - using GitHub");
    var connection;
     connection = mysql({
       host: configuration.MYSQL_HOST,
       user: 'admin',
       password: configuration.MYSQL_PASSWORD,
       database: 'nmauth0'
     });
    connection.connect();
  
    var query = "INSERT INTO users SET ?";
  
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) { return callback(err); }
      var insert = {
        password: hash,
        email: user.email
      };
      connection.query(query, insert, function (err, results) {
        if (err) return callback(err);
        if (results.length === 0) return callback();
        callback(null);
      });
    });
  
  }
  