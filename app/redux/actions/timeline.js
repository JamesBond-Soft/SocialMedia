
import { timelineConstants } from '../constants';

export function addDcoument(fileInfo) {
  return {
    type: timelineConstants.ADD_DOCUMENT,
    payload: fileInfo
  };
}


export function addAudio(fileInfo) {
  return {
    type: timelineConstants.ADD_AUDIO,
    payload: fileInfo
  };
}

export function addVideo(fileInfo) {
  return {
    type: timelineConstants.ADD_VIDEO,
    payload: fileInfo
  };
}

export function addImage(fileInfo) {
  return {
    type: timelineConstants.ADD_IMAGE,
    payload: fileInfo
  };
}

export function addMedia(fileInfo) {
  console.log('------------ file Info ');
  return {
    type: timelineConstants.ADD_MEDIA,
    payload: fileInfo
  };
}

export function deleteMedia(idList) {
  return {
    type: timelineConstants.DELETE_MEDIA,
    payload: idList
  };
}

export function favoritePost(id) {
  return {
    type: timelineConstants.FAVOURTE_POST,
    payload: id
  };
}

export function unFavoritePost(id) {
  return {
    type: timelineConstants.UNFAVOURTE_POST,
    payload: id
  };
}
