// This action is dispatched when a person attempts to login , with payload whose value is a jwt token
export const login = (payload) => {
  return {
    type: "SET_TOKEN",
    payload: payload,
  };
};

// This action is dispatched when a person attempts to logout
export const logout = () => {
  return {
    type: "REMOVE_TOKEN",
  };
};
