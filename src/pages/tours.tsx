import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { getTours } from "../store/slices/toursSlice";
import ToursList from "../components/ToursList";
import StatusCheck from "../components/ui/StatusCheck";

const Tours: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status, message, types } = useSelector(
    (state: RootState) => state.tours
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(getTours());
  }, []);

  return (
    <section className="pt-[145px] pb-80 tb:pb-40">
      <div className="container ">
        <h2 className="text-center">Tours</h2>
        <StatusCheck
          status={status}
          errorMsg={message}
          loadingStyles="min-h-[50vh]"
          className="mt-80"
        >
          {types.map((type, key) => (
            <div className="my-40" key={key}>
              <h3>{type}</h3>
              <ToursList data={data.filter((tour) => tour.type === type)} />
            </div>
          ))}
        </StatusCheck>
      </div>
    </section>
  );
};

export default Tours;
