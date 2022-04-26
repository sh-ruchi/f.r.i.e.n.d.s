import * as RequestUtil from '../util/RequestUtil';

/**
 * To SignIn User
 * @param {JSON} user - user details
 */
 export const signInUser = async function(user){
  const data = await RequestUtil.postReq('user/signin',user);  
  return data;
  // need to show proper error messages
}


/**
 * To SignUp User
 * @param {JSON} user - user details
 */
 export const signUpUser = async  function(user){
  const data = await RequestUtil.postReq('user',user);  
  console.log(data);
  return data;
  // need to show proper error messages
}


/**
 * To get current user email
 
 */
 export const getCurrentUsername = function(){
  const user  = JSON.parse(localStorage.getItem('user')); 
  return user.username;
  // need to show proper error messages
}

/**
 * To get current user email
 
 */
 export const getCurrentUser = function(){
  const user  = JSON.parse(localStorage.getItem('user')); 
  return user;
  // need to show proper error messages
}

/**
 * To get current user email
 
 */
 export const signOutUser = function(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href=`http://${window.location.host}`;
  // need to show proper error messages
}

