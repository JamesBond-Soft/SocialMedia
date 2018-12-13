
import { factsConstants } from '../constants';

export function addMedia(fileInfo) {
  console.log('------------ file Info ');
  return {
    type: factsConstants.ADD_MEDIA,
    payload: fileInfo
  };
}

export function deleteMedia(idList) {
  return {
    type: factsConstants.DELETE_MEDIA,
    payload: idList
  };
}

