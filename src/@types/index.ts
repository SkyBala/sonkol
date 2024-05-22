export interface ITourCard {
  id: number;
  images: string[];
  name: string;
  description: string;
  tour_time: string;
  number_of_people: number;
  price: number;
  when_is_tour: string;
  type: string;
  types: string[]
}

interface ILoactionTransport {
  time: string;
  type: string;
}

export interface ILocation {
  name_location: string;
  type: string;
  description_location: string;
  nextTransport: ILoactionTransport;
}

export interface IProgram {
  id: number;
  name: string;
  day: number;
  locations: ILocation[];
}

interface IDate {
  id: number;
  date_from: string;
  date_up_to: string;
  tour: string;
}

export interface IPriceDetail {
  id: number;
  person: number;
  in_com: number;
  per_person: number;
  tour: string;
}

export interface Tour extends ITourCard {
  program: IProgram[];
  prices: {
    price_includes: string[];
    price_not_includes: string[];
  };
  price_details: IPriceDetail[];
  tips: {
    tittle: string;
    what_to_bring: string[];
    tittle_2: string;
    description: string;
  };
  photos: {
    images: string[];
  };
  images: string[];
  dates: IDate[];
  reviews: IReview[];
  reviewsCount: number;
  similarTours: ITourCard[];
}

export interface IReview {
  id: number;
  stars: number;
  name: string;
  text: string;
  photos: string[];
  tour: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
}

export interface ICar {
  id: number;
  name_car: string;
  status: string;
  capacity: number;
  transmission: string;
  steering_wheel: string;
  type_of_fuel: string;
  Type_of_drive: string;
  engine_capacity: number;
  power: string;
  configuration: string;
  consumption: string;
  per_kilometer: number;
  driver_comfort: number;
  how_days_driving: number;
  how_days_driving_without_driver: number;
  how_days_driving_without_driver_2: number;
  how_days_driving_without_driver_3: number;
  images: string[];
}

export interface ITaxi {
  id: number;
  place_of_departure: string;
  place_of_arrival: string;
  name_taxi: string;
  price: number;
  how_hours: string;
  map: string;
}

export interface IBlogNews {
  id: number;
  title: string;
  category?: "Blog" | "News";
  date_posted: string;
  image: string;
  content?: TrustedHTML | null;
  similar?: { id: number; title: string; date_posted: string; image: string }[];
}

export interface ITeamPerson {
  id: number;
  image: string;
  name: string;
  position: string;
  experience: string;
  quote: string;
  description: string;
}