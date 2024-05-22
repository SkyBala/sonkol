import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useIsLoading = () => {
  const tour = useSelector((state: RootState) => state.tour);
  const tours = useSelector((state: RootState) => state.tours);

  return (
    tour.status === "loading" ||
    tour.status === "error" ||
    tours.status === "loading" ||
    tours.status === "error"
  );
};
