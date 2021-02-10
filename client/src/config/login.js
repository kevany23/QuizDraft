/**
 * This file handles the login token in sessionStorage, thus
 * creating a layer of abstraction between sessionStorage
 * and the Vue components.
 */

export const setLoginToken = function(token) {
  sessionStorage['access_token'] = token;
}

export const getLoginToken = function() {
  return sessionStorage['access_token'];
}

export const clearLogin = function() {
  sessionStorage['access_token'] = "";
}

export const isLoggedIn = function() {
  return sessionStorage['access_token'] !== "";
}

/**
 * Adds token to object passed in TODO
 */

/**
 * This function is convenient for spread operators when creating
 * json objects in requests
 */
export const loginTokenObject = function() {
  return {
    authorization: sessionStorage['access_token']
  }
}