export const SET_AVATAR = 'SET_AVATAR';
export const ADD_ROW = 'ADD_ROW';
export const DELETE_ROW = 'DELETE_ROW';
export const UPDATE_ROW = 'UPDATE_ROW';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export function setAvatar(path) {
  return {
    type: SET_AVATAR,
    payload: path
  };
}

export function addRow(item) {
  return {
    type: ADD_ROW,
    payload: item
  };
}

export function deleteRow(rowId) {
  return {
    type: DELETE_ROW,
    payload: rowId
  };
}

export function updateRow(item) {
  return {
    type: UPDATE_ROW,
    payload: item
  };
}

export function updateProfile(newProfile) {
  return {
    type: UPDATE_PROFILE,
    payload: newProfile
  };
}
