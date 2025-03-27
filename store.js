import { atom } from 'jotai';

// Create a Jotai atom to store the list of favourite artworks
export const favouritesAtom = atom([]);

// Create a Jotai atom to collect the search query

export const searchHistoryAtom = atom({});