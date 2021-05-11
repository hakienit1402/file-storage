import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/authConstants";

const userReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
       
      };
      case REGISTER_SUCCESS:
        return {
          ...state,
         
        };
    case REGISTER_FAIL:
      return {
        ...state,
       
      };
    case LOGIN_REQUEST:
      return {
        ...state, 
        loading:true,
        
        // isLoggedIn: true,
        // user: payload.user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
      loading: false, 
      users: action.payload 
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false, error: action.payload
      };
    // case LOGOUT:
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //     user: null,
    //   };
    default:
      return state;
  }
};
export default userReducer;
