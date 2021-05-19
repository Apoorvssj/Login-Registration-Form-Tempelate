const initialState = false;

const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VERIFY":
      return true;
    case "NOTVERIFY":
      return false;
    default:
      return state;
  }
};

export default otpReducer;
