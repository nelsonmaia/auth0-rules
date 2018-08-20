function (user, context, callback) {
    user.app_metadata = user.app_metadata || {};
    // You can add a Role based on what you want
    // In this case I check domain
    var addRolesToUser = function(user, cb) {
      if (user.email && user.email.indexOf('nellson.maia+useradmin@gmail.com') > -1) {
        cb(null, ['Delegated Admin - User']);
      } else {
        cb(null, ['Delegated Admin - Administrator']);
      }
    };
  
    addRolesToUser(user, function(err, roles) {
      if (err) {
        callback(err);
      } else {
        user.app_metadata.roles = roles;
        auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
          .then(function(){
            context.idToken['https://example.com/roles'] = user.app_metadata.roles;
            callback(null, user, context);
          })
          .catch(function(err){
            callback(err);
          });
      }
    });
  }