
import { factsConstants } from '../constants';

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

export default function facts(state = initialState, action = {}) {
  switch (action.type) {
    case factsConstants.ADD_MEDIA:
    console.log('facts reducer');
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

    case factsConstants.DELETE_MEDIA:
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

    default:
      return state;
  }
}
