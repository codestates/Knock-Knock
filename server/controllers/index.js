module.exports = {
  post_login : require('./methods/post/login.js'),
  post_signup : require('./methods/post/signup'),
  post_signout : require('./methods/post/signout'),
  post_toilet : require('./methods/post/toilet'),

  get_userinfo : require('./methods/get/userinfo'),
  get_mylist : require('./methods/get/mylist'),
  get_toilet : require('./methods/get/toilet'),
  
  put_toilet : require('./methods/put/toilet'),
  put_comment : require('./methods/put/comment'),
  put_userinfo : require('./methods/put/userinfo'),

  delete_userinfo : require('./methods/delete/userinfo'),
  delete_toilet : require('./methods/delete/toilet'),
  delete_comment : require('./methods/delete/comment'),
};
