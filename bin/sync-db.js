import models from "../models";

export default () => {
  const options = {
    force: process.env.NODE_ENV === "test" ? true : false,
  };
  return models.sequelize.sync(options);
};
