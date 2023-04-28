import { createContext, useReducer } from "react";
export const WorkoutContext = createContext();

export const wokoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      console.log(action.payload)
      return {
        
        workouts: action.payload,
        filteredWorkout:action.payload
      };
      
    case "CREATE_WORKOUTS":
      return {
        workouts: [action.payload, ...state.workouts],
        filteredWorkout:[action.payload, ...state.workouts]
      };
      case "DELETE_WORKOUT":
        return{
          workouts: state.workouts.filter((workout)=>workout._id !== action.payload._id),
          filteredWorkout: state.workouts.filter((workout)=>workout._id !== action.payload._id)
        };
        
        case "SEARCH_WORKOUT":
          console.log(action.payload)
       const filtered = state.workouts.filter((workout)=>workout.title.toLowerCase().includes(action.payload.toLowerCase()))
        return{
          ...state,
          filteredWorkout: action.payload.length > 0 ? filtered : [...state.workouts]
          
        };
        
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wokoutReducer,{ workouts: null, filteredWorkout:null });

  return <WorkoutContext.Provider value={{...state, dispatch}}>{children}</WorkoutContext.Provider>;
};
