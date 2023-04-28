import { Link } from "react-router-dom";
import { useState } from "react";
import { useWorkoutsContext } from "../hooks/newWorkoutContext";
function Navbar() {
  const { dispatch } = useWorkoutsContext();
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    setQuery(e.target.value)
    dispatch({type:"SEARCH_WORKOUT",payload:e.target.value})
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white">
        <header className="md:container p-3 flex item-center justify-between border shadow-sm m-auto md:p-6">
          <div className="md:text-2xl font-extrabold">
            <Link to="/">Cozy_WorkOut</Link>
          </div>
          <div className="border text-center">
            <input
              name="searchInput"
              type="text"
              placeholder="Search By Title"
              value={query}
              onChange={(e)=>handleSearch(e)}
              className="border p-1 pl-4 outline-none rounded md:w-[300px]"
            />
          </div>
          {/* {searchedWorkout} */}
        </header>
      </div>
    </>
  );
}

export default Navbar;
