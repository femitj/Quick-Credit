const Helper = {
  getParams(eachParamArray) {
    const params = {};
    eachParamArray.forEach((param) => {
      const key = param.split('=')[0];
      const value = param.split('=')[1];
      Object.assign(params, { [key]: value });
    });
    return params;
  },
};

export default Helper;
