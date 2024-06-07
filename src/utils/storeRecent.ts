export interface Location {
  name: string;
  coordinates: [number, number];
}

const recentSearchesKey = "recentSearches";

export const getRecentSearchLocations = (): Location[] => {
  const savedSearches = localStorage.getItem("recentSearches");
  if (savedSearches) {
    return JSON.parse(savedSearches);
  } else {
    return [];
  }
};

export const saveSearch = (location: Location): void => {
  const recentSearches = getRecentSearchLocations();
  const index = recentSearches.findIndex(
    (search) => search.name === location.name
  );
  if (index === -1) {
    recentSearches.unshift(location); //Adding new location search to the beginning
    if (recentSearches.length > 10) {
      recentSearches.pop(); //Keeping only 10 recent searches
    }
  } else {
    recentSearches.splice(index, 1);
    recentSearches.unshift(location);
  }
  localStorage.setItem(recentSearchesKey, JSON.stringify(recentSearches));
};
