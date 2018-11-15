import {
  ADD_JOURNAL,
  DELETE_JOURNAL,
  UPDATE_JOURNAL
} from '../actions/journal';

const initialState = {
  journals: [],
  lastId: 0
};
import {
  findWithAttr
} from '../../utils/common';


export default function journal(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_JOURNAL:
      var lastId = state.lastId;
      const newItem = action.payload;
      newItem.id = lastId;
      var tempRows = state.journals.slice();
      tempRows.push(newItem);
      return Object.assign({}, state, {
        ...state,
        journals: tempRows,
        lastId: ++lastId
      });

    case DELETE_JOURNAL:
      const deleteId = action.payload;
      var tempRows = state.journals.slice();
      console.log('before deleted items: ', tempRows);
      const index = findWithAttr(tempRows, 'id', deleteId);
      console.log(' deleteId: ', index);
      if (index !== -1) {
        tempRows.splice(index, 1);
      }
      console.log('deleted items: ', tempRows);
      return Object.assign({}, state, {
        ...state,
        journals: tempRows,
      });

    case UPDATE_JOURNAL:
      const newJournalList = action.payload;
      return Object.assign({}, state, {
        ...state,
        journals: newJournalList,
      });
    default:
      return state;
      break;
  }
}

