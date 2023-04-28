import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/newWorkoutContext";
function WorkoutForm() {
 const {dispatch} = useWorkoutsContext()
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyfield,setEmptyfield] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, reps, load };
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/workouts`, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyfield(json.emptyField)
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyfield([])
      dispatch({type: "CREATE_WORKOUTS", payload: json})
      console.log("new workout");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <h3 className="text-32 font-extrabold text-center">Add a New Workout to Log</h3>

        <div className="block">
        <label className="font-semibold">Excercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Enter Workout Title"
          className={emptyfield.includes("title") ? "block outline-none border-red-600 border w-[300px] p-2":"block outline-none border w-[300px] p-2"}
        />
        </div>

       <div>
       <label className="font-semibold">Reps:</label>
        <input
          type="text"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          placeholder="Enter Number of Reps"
          className={emptyfield.includes("reps") ? "block outline-none border-red-600 border w-[300px] p-2":"block outline-none border w-[300px] p-2"}
        />
       </div>

        <div>
        <label className="font-semibold">Load:kg</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          placeholder="Select Load"
          className={emptyfield.includes("load") ? "block outline-none border-red-600 border w-[300px] p-2":"block outline-none border w-[300px] p-2"}
        />
        </div>

        <button className="p-2 shadow-md rounded">Add New Workout</button>
        {error && <span className="text-sm block text-center font-bold w-1/2 p-2 bg-red-200 rounded text-red-600">{error}</span>}
      </form>
    </div>
  );
}

export default WorkoutForm;
