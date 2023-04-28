import React from "react";
import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/newWorkoutContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
function Home() {
  const { filteredWorkout, dispatch } = useWorkoutsContext();
  console.log({ filteredWorkout });
  // This hook helps to connect to the API for getting all books to be rendered on this component on pageload
  useEffect(() => {
    fetchAllWorkout();
  }, []);

  const fetchAllWorkout = async () => {
    console.log(process.env);
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/workouts`
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "SET_WORKOUTS", payload: json });
    }
  };

  return (
    <div className="container p-4 md:p-8 flex md:flex-row flex-col-reverse  justify-between  gap-4 m-auto mt-32">
      {filteredWorkout?.length > 0 ? (
        <div className=" md:w-1/2 grid grid-cols-1 gap-4">
          {filteredWorkout &&
            filteredWorkout?.map((workout) => (
              <div className=" shadow-lg space-y-4" key={workout._id}>
                <WorkoutDetails workout={workout} />
              </div>
            ))}
        </div>
      ) : (
        <div className="md:container m-auto border-t-0 shadow-lg flex border flex-col items-center justify-center h-[200px]">
          <div className="font-medium text-red-800 w-[400px] text-center">
         <p> No records Available at The Moment. Fill the Form to record workout
          details.</p>
        </div>
        </div>
      )}
      <div className=" md:p-4 md:w-1/2 m-auto ">
        <WorkoutForm />
      </div>
    </div>
  );
}

export default Home;
