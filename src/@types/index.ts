export interface ITourCard {
  id: number
  images: string[]
  name: string
  description: string
  tour_time: string
  number_of_people: number
  price: number
  when_is_tour: string
  type: string
  types: string[]
  tours: {
    image: string
    id: number
  }[]
}

interface ILoactionTransport {
  time: string
  type: string
}

export interface ILocation {
  name_location: string
  type: string
  description_location: string
  nextTransport: ILoactionTransport
}

export interface IProgram {
  id: number
  name: string
  day: number
  locations: ILocation[]
}

interface IDate {
  id: number
  date_from: string
  date_up_to: string
  tour: string
}

export interface IPriceDetail {
  id: number
  person: number
  in_com: number
  per_person: number
  tour: string
}

export interface Tour extends ITourCard {
  program: IProgram[]
  prices: {
    price_includes: string[]
    price_not_includes: string[]
  }
  price_details: IPriceDetail[]
  tips: {
    tittle: string
    what_to_bring: string[]
    tittle_2: string
    description: string
  }
  photos: {
    images: string[]
  }
  images: string[]
  dates: IDate[]
  reviews: IReview[]
  reviewsCount: number
  similarTours: ITourCard[]
}

export interface IReview {
  id: number
  stars: number
  name: string
  text: string
  photos: Array<{ id: number; photo: string }>
  tour: string
  created_at: string
  date: string
}

interface ICarPhoto {
  car_slider: string
  id: number
}

export interface ICar {
  id: number
  name_car: string
  status: string
  capacity: number
  transmission: string
  steering_wheel: string
  type_of_fuel: string
  Type_of_drive: string
  engine_capacity: number
  power: string
  configuration: string
  consumption: string
  car_with_driver: {
    per_kilometer: number
    driver_comfort: number
  }
  car_without_driver: {
    one_day: number
    two_day: number
    more_day: number
  }
  photos: ICarPhoto[]
}

export interface ITaxi {
  id: number
  place_of_departure: string
  place_of_arrival: string
  name_taxi: string
  price: number
  how_hours: string
  map: string
}

export interface IBlogNews {
  id: number
  title: string
  category?: "Блог" | "Новости"
  created_at: string
  image: string
  content?: TrustedHTML | null
  slides: Array<{
    blog_news: number
    id: number
    slides: string
  }>
  similar: any
}

export interface ITeamPerson {
  id: number
  image: string
  name: string
  position: string
  experience: string
  quote: string
  description: string
}
