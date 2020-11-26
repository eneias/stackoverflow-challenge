'use strict';
module.exports = {
    up: (queryInterface, Sequelize, done) => {
        return queryInterface.createTable('User', {
            user_id : { type: Sequelize.UUID, primaryKey: true, allowNull: false }, 
            account_id : { type: Sequelize.STRING, allowNull: false }, 
            user_type : { type: Sequelize.INTEGER, allowNull: false }, 
            location : { type: Sequelize.STRING, allowNull: false }, 
            website_url : { type: Sequelize.STRING, allowNull: false }, 
            link : { type: Sequelize.STRING,  }, 
            profile_image : { type: Sequelize.STRING,  }, 
            display_name : { type: Sequelize.STRING,  },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        })
        .then(function () {
            console.log("==> Table `User` created.");
            if(done) {
                done();
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('User');
    }
};
