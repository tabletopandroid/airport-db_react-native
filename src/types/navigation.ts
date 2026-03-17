import { Airport } from './airport';

export type HomeStackParamList = {
  HomeMain: undefined;
  AirportDetails: { airport: Airport };
};

export type FavoritesStackParamList = {
  FavoritesMain: undefined;
  AirportDetails: { airport: Airport };
};

export type TabParamList = {
  HomeMain: undefined;
  Favorites: undefined;
  About: undefined;
};
