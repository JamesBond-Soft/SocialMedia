export const ADD_JOURNAL = 'ADD_JOURNAL';
export const DELETE_JOURNAL = 'DELETE_JOURNAL';
export const UPDATE_JOURNAL = 'UPDATE_JOURNAL';

export function addJournal(item) {
  return {
    type: ADD_JOURNAL,
    payload: item
  };
}

export function deleteJournal(id) {
  return {
    type: DELETE_JOURNAL,
    payload: id
  };
}

export function updateJournalList(journalList) {
  return {
    type: UPDATE_JOURNAL,
    payload: journalList
  };
}
