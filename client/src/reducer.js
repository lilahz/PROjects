export const userAuthReducer = (state = {}, action) => {
    switch(action.type) {
      case 'login':
        return {
          loggedIn: true
        };
      case "logout": {
        localStorage.clear();
        return {
          loggedIn: false
        }
      }
      default:
        return state;
    }
} 