//First method to create our reducer
const initialState = null;

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.payload;
    case "REMOVE_TOKEN":
      return null; // here we set the jwt token to null ,when user logs out
    default:
      return state;
  }
};

export default tokenReducer;

//Second method, both methods yeilds the same result

// const initialState = {
//   token: null,
// };

// const tokenReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_TOKEN":
//       return {
//         ...state,
//         token: action.payload,
//       };
//     case "REMOVE_TOKEN":
//       return {
//         ...state,
//         token: null,
//       };
//     default:
//       return { ...state };
//   }
// };

// export default tokenReducer;
