import {
  ADD_ROW,
  DELETE_ROW,
  UPDATE_PROFILE
} from '../actions/profile';

const initialState = {
  avatarImage: null,
  profileName: null,
  rows: [],
  lastId: 0,
  birthday:null
};

export default function profile(state = initialState, action = {}) {
  let tempRows = [];
  switch (action.type) {
    case ADD_ROW:
      var lastId = state.lastId;
      const newItem = action.payload;
      newItem.id = lastId;
      tempRows = state.rows.slice();
      tempRows.push(newItem);
      return Object.assign({}, state, {
        ...state,
        rows: tempRows,
        lastId: ++lastId
      });

    case DELETE_ROW:
      const deleteId = action.payload;
      tempRows = state.rows.slice();
      for (let index = 0; index < tempRows.length; index++) {
        if (deleteId == tempRows[index].id) {
          var deleteIndex = index;
          break;
        }
      }
      tempRows.splice(deleteIndex, 1);
      return Object.assign({}, state, {
        ...state,
        rows: tempRows,
      });

    case UPDATE_PROFILE:
      const newProfile = action.payload;
      return Object.assign({}, state, {
        ...state,
        rows: newProfile.messages,
        avatarImage: newProfile.avatar,
        profileName: newProfile.profileName,
        birthday : newProfile.birthday
      });
    default:
      return state;
      break;
  }
}
