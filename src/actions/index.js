const setCountryName = (countryName) => {
  return {
    type: "SELECT_COUNTRY_NAME",
    payload: countryName,
  };
};

export default setCountryName;
