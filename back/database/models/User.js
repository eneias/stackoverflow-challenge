
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      user_id: { type: DataTypes.UUID, primaryKey: true, autoIncrement: true, },
      account_id: { type: DataTypes.INTEGER },
      user_type : { type: DataTypes.STRING },
      location : { type: DataTypes.STRING },
      website_url : { type: DataTypes.STRING },
      link : { type: DataTypes.STRING },
      profile_image : { type: DataTypes.STRING },
      display_name : { type: DataTypes.STRING },
  }, {});

  return User;
};

