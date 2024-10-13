module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todos", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        translation: {
            type: Sequelize.JSONB
        }
    });

    return Todo;
};