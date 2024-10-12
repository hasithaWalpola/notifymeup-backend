module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.INTEGER
        },

    },
        {
            scopes: {
                withoutPassword: {
                    attributes: { exclude: ['password', 'token'] },
                }
            }
        }
    );

    return User;
};