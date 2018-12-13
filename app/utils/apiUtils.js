
import {
  BACKEND_BASE_URL, } from './endpoints';


export function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export function parseJSON(response) {
  return response.json();
}

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */

export function callApi(
  url,
  config,
  request,
  onRequestSuccess,
  onRequestError,
  onRequestFailure
) {
  return dispatch => {
    dispatch(request);
    return fetch(BACKEND_BASE_URL + url, config)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        const data = json;
        console.log('server data: ', data);
        const responseData = data.data;
        const message = data.message;
        console.log('server response : ', responseData);
        switch (data.code) {
          /**
                     * Handle when has success response
                     */
          case 200:
            dispatch(onRequestSuccess(responseData));
            break;
            /**
                     *  Handle when wrong fields in request body
                     */
          case 300:
            // test version
            dispatch(onRequestError(message));
            break;
            /**
                     * Handle when has Invalid  token in api call
                     */
          case 301:
            // removeIdToken();
            break;
            /**
                     * Erorr Handler for Expired Token
                     */
          case 303:
            // dispatch(eventConfirmModal(EXPIRE_ALERT));
            break;
            /**
                     * Error Handler
                     */
          case 302:
            // removeIdToken();
            break;
          default:
            return 'success';
        }

      })
      .catch(error => {
        console.log('----------------error----------------', error);
        const response = error.response;
        if (response === undefined) {
          dispatch(onRequestFailure(error));
        } else {
          error.status = response.status;
          error.statusText = response.statusText;
          response.text().then(text => {
            try {
              const json = JSON.parse(text);
              error.message = json.message;
            } catch (ex) {
              error.message = text;
            }
            dispatch(onRequestFailure(error));
          });
        }
      });
  };
}

