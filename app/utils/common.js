import {
  VIDEO_FILE,
  AUDIO_FILE,
  DOCUMENT_FILE,
  IMAGE_FILE,
  OTHER_FILE
} from './constants';

export default function getFileType(fileName) {
  const ext = fileName.split('.').pop();
  const audioTypes = ['mp3', 'wav', 'ogg', 'wma'];
  const videoTypes = ['avi', 'mp4', 'mov'];
  const documentTypes = ['doc', 'docx', 'txt', 'pdf'];
  const imageTypes = ['png', 'jpg', 'jpeg'];
  if (audioTypes.includes(ext)) {
    return AUDIO_FILE;
  } else if (videoTypes.includes(ext)) {
    return VIDEO_FILE;
  } else if (documentTypes.includes(ext)) {
    return DOCUMENT_FILE;
  } else if (imageTypes.includes(ext)) {
    return IMAGE_FILE;
  }
  return OTHER_FILE;
}

export function findWithAttr(array, attr, value) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}


export const ID_TOKEN = 'id_token';
export const USER_PROFILE = 'user_profile';

/**
 * Handle for store and load, remove token in Local storage
 * @param {*} idToken
 */
export function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN, idToken);
}

export function removeIdToken() {
  localStorage.removeItem(ID_TOKEN);
}

export function loadIdToken() {
  return localStorage.getItem(ID_TOKEN);
}

/**
 * Handle for storing, loading , remove User data in local storage
 */
export function loadUserProfile() {
  return localStorage.getItem(USER_PROFILE);
}

export function saveUserProfile(user) {
  console.log('User profile is saved into local storage');
  localStorage.setItem(USER_PROFILE, JSON.stringify(user));
}

export function removeUserProfile() {
  localStorage.removeItem(USER_PROFILE);
}

