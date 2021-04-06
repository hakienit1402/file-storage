const audioReducer = (state, action) => {
    switch (action.type) {
      case "ADD_AUDIO":
        return state;
      case "DELETE_AUDIO":
        return state;
      
      default:
        return state;
    }
  };
  export default audioReducer;