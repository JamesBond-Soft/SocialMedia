export const ADD_DOCUMENT = 'ADD_DOCUMENT';
export const ADD_AUDIO = 'ADD_AUDIO';
export const ADD_VIDEO = 'ADD_VIDEO';
export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_MEDIA = 'ADD_MEDIA';
export const DELETE_MEDIA = 'DELETE_MEDIA';
export function addDcoument(fileInfo) {
  return {
    type: ADD_DOCUMENT,
    payload: fileInfo
  };
}


export function addAudio(fileInfo) {
  return {
    type: ADD_AUDIO,
    payload: fileInfo
  };
}

export function addVideo(fileInfo) {
  return {
    type: ADD_VIDEO,
    payload: fileInfo
  };
}

export function addImage(fileInfo) {
  return {
    type: ADD_IMAGE,
    payload: fileInfo
  };
}

export function addMedia(fileInfo) {
  return {
    type: ADD_MEDIA,
    payload: fileInfo
  };
}

export function deleteMedia(idList) {
  return {
    type: DELETE_MEDIA,
    payload: idList
  };
}
