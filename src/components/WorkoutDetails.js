import React from "react";
import { useWorkoutsContext } from "../hooks/newWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
function WorkoutDetails({ workout }) {
const {dispatch} = useWorkoutsContext()
 const handleDelete = async()=>{
const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/workouts/` + workout._id,{
  method: "DELETE",
})
const json = await response.json();
console.log(json)
if(response.ok){
  dispatch({type:"DELETE_WORKOUT",payload: json})
}
 }
  return (
    <div className="w-full p-4 rounded">
      <h4 className="text-32 text-center font-bold capitalize">
        {workout.title}
      </h4>
      <div className="flex justify-between items-center">
        <div>
        <p>
          <strong>Load (kg) :</strong> {workout.load}
        </p>
        <p>
          <strong>Reps:</strong> {workout.reps}
        </p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p> 
        </div>
        <div>
          <button onClick={handleDelete} className="rounded bg-red-600 text-white font-bold p-1">DELETE</button>
        </div>
      </div>
    </div>
  );
}

export default WorkoutDetails;
