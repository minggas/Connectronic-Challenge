export default (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload;
    case "addItem": {
      return [
        ...state,
        {
          name: action.payload.name,
          description: action.payload.description
        }
      ];
    }
    case "deleteItem":
      return state.filter((_, index) => index !== action.payload);
    case "updateItem":
      return state.map((item, index) => {
        if (index === action.payload.id) {
          return {
            ...item,
            name: action.payload.name,
            description: action.payload.description
          };
        } else {
          return { ...item };
        }
      });
    default:
      return state;
  }
};
