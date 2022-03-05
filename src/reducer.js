export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const CHANGE_THEME = "CHANGE_THEME"


export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
      case CHANGE_THEME:
        return {
          ...state,
          theme: action.payload
        }
      default: return state;
  }
  
};
