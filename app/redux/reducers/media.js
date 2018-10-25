import {
  ADD_DOCUMENT,
  ADD_AUDIO,
  ADD_VIDEO,
  ADD_IMAGE
} from '../actions/media';

const initialState = {
  documentInfos: [],
  audioInfos: [],
  imageInfos: [],
  videoInfos: []
};

export default function media(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_DOCUMENT:
      var tempUrls = state.documentInfos.slice();
      tempUrls.push(action.payload);
      return Object.assign({}, state, {
          ...state,
          documentInfos : tempUrls,
      });
    
    case ADD_AUDIO:
      var tempUrls = state.audioInfos.slice();
      tempUrls.push(action.payload);
      return Object.assign({}, state, {
          ...state,
          audioInfos : tempUrls,
      });
    
    case ADD_IMAGE:
      var tempUrls = state.imageInfos.slice();
      tempUrls.push(action.payload);
      return Object.assign({}, state, {
          ...state,
          imageInfos : tempUrls,
      });

    case ADD_VIDEO:
      var tempUrls = state.videoInfos.slice();
      tempUrls.push(action.payload);
      return Object.assign({}, state, {
          ...state,
          videoInfos : tempUrls,
      });

    default:
      return state;
  }
}
