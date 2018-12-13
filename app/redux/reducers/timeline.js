
import { timelineConstants } from '../constants';

import {
  findWithAttr } from '../../utils/common';

const initialState = {
  documentInfos: [],
  audioInfos: [],
  imageInfos: [],
  videoInfos: [],
  mediaList: [],
  lastId: 0
};
let mediaList,
  deleteList,
  tempUrls,
  newItem,
  lastId,
  id,
  index;

export default function timeline(state = initialState, action = {}) {
  switch (action.type) {
    case timelineConstants.ADD_DOCUMENT:
      tempUrls = state.documentInfos.slice();
      tempUrls.push(action.payload);
      return Object.assign({}, state, {
        ...state,
        documentInfos: tempUrls,
      });

    case timelineConstants.ADD_AUDIO:
      tempUrls = state.audioInfos.slice();
      tempUrls.push(action.payload);
      return Object.assign({}, state, {
        ...state,
        audioInfos: tempUrls,
      });

    case timelineConstants.ADD_IMAGE:
      tempUrls = state.imageInfos.slice();
      tempUrls.push(action.payload);
      return Object.assign({}, state, {
        ...state,
        imageInfos: tempUrls,
      });

    case timelineConstants.ADD_VIDEO:
      tempUrls = state.videoInfos.slice();
      tempUrls.push(action.payload);
      return Object.assign({}, state, {
        ...state,
        videoInfos: tempUrls,
      });

    case timelineConstants.ADD_MEDIA:
      console.log(' timeline reducer');
      mediaList = state.mediaList.slice();
      newItem = action.payload;
      lastId = state.lastId;
      newItem.id = lastId;
      mediaList.push(newItem);
      return Object.assign({}, state, {
        ...state,
        mediaList,
        lastId: ++lastId
      });

    case timelineConstants.DELETE_MEDIA:
      deleteList = action.payload;
      mediaList = state.mediaList.slice();
      deleteList.forEach((item) => {
        const index = findWithAttr(mediaList, 'id', item);
        if (index !== -1) {
          mediaList.splice(index, 1);
        }
      });
      return Object.assign({}, state, {
        ...state,
        mediaList,
      });

    case timelineConstants.FAVOURTE_POST:
      id = action.payload;
      mediaList = state.mediaList.slice();
      index = findWithAttr(mediaList, 'id', id);
      mediaList[index].favorited = true;
      return Object.assign({}, state, {
        ...state,
        mediaList,
      });

    case timelineConstants.UNFAVOURTE_POST:
      id = action.payload;
      mediaList = state.mediaList.slice();
      index = findWithAttr(mediaList, 'id', id);
      mediaList[index].favorited = false;
      return Object.assign({}, state, {
        ...state,
        mediaList,
      });

    default:
      return state;
  }
}
