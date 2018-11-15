import {
  ADD_DOCUMENT,
  ADD_AUDIO,
  ADD_VIDEO,
  ADD_IMAGE,
  ADD_MEDIA,
  DELETE_MEDIA
} from '../actions/media';

import {
  findWithAttr
} from '../../utils/common';

const initialState = {
  documentInfos: [],
  audioInfos: [],
  imageInfos: [],
  videoInfos: [],
  mediaList: [],
  lastId: 0
};

export default function media(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_DOCUMENT:
      var tempUrls = state.documentInfos.slice();
      tempUrls.push(action.payload);
      return Object.assign({}, state, {
        ...state,
        documentInfos: tempUrls,
      });

    case ADD_AUDIO:
      var tempUrls = state.audioInfos.slice();
      tempUrls.push(action.payload);
      return Object.assign({}, state, {
        ...state,
        audioInfos: tempUrls,
      });

    case ADD_IMAGE:
      var tempUrls = state.imageInfos.slice();
      tempUrls.push(action.payload);
      return Object.assign({}, state, {
        ...state,
        imageInfos: tempUrls,
      });

    case ADD_VIDEO:
      var tempUrls = state.videoInfos.slice();
      tempUrls.push(action.payload);
      return Object.assign({}, state, {
        ...state,
        videoInfos: tempUrls,
      });

    case ADD_MEDIA:
      var mediaList = state.mediaList.slice();
      const newItem = action.payload;
      var lastId = state.lastId;
      newItem.id = lastId;
      mediaList.push(newItem);
      return Object.assign({}, state, {
        ...state,
        mediaList,
        lastId: ++lastId
      });

    case DELETE_MEDIA:
      var deleteList = action.payload;
      var mediaList = state.mediaList.slice();
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
    default:
      return state;
  }
}
