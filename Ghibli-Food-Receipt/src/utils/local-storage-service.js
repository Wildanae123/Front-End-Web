// src/utils/local-storage-service.js

const NOTES_KEY = 'GhibliNotes';

// Initial data as per requirement
const initialData = [
    {
        id: 'notes-jT-jjsyz61J8XKiI',
        title: 'Breakfasts & Breads',
        body: 'Master the art of fluffy pancakes from Kiki\'s Delivery Service and the perfect bacon and eggs from Howl\'s Moving Castle.',
        createdAt: '2022-07-28T10:03:12.594Z',
        archived: false,
    },
    {
        id: 'notes-abc-123',
        title: 'Archived Example',
        body: 'This is an example of an archived note.',
        createdAt: '2022-07-27T10:03:12.594Z',
        archived: true,
    }
];


export const getNotes = () => {
  const notes = localStorage.getItem(NOTES_KEY);
  if (notes) {
    return JSON.parse(notes);
  }
  // If no notes in storage, set initial data
  localStorage.setItem(NOTES_KEY, JSON.stringify(initialData));
  return initialData;
};

export const saveNotes = (notes) => {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};