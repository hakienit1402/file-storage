const musicReducer = (state = {musics :[]}, action) => {
    switch (action.type) {
      case "ADD_MUSIC":
        return state;
      case "DELETE_MUSIC":
        return state;
      
      default:
        return state;
    }
  };
  export default musicReducer;