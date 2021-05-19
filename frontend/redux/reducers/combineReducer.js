import { combineReducers } from "redux";
import tokenReducer from "./tokenReducer";
import otpReducer from "./otpReducer";

const allReducers = combineReducers({
  token: tokenReducer,
  verified: otpReducer,
});

export default allReducers;
