const setCountryName = (state = {}, action) => {
  switch (action.type) {
    case "SELECT_COUNTRY_NAME":
      return { ...state, countryName: action.countryName };
    default:
      return state;
  }
};

export default setCountryName;
