'use strict';
module.exports = (sequelize, DataTypes) => {
	const Course = sequelize.define(
		'Course',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Please enter a title'
					}
				}
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Please enter a description'
					}
				}
			},
			estimatedTime: DataTypes.STRING,
			materialsNeeded: DataTypes.STRING
		},
		{}
	);
	Course.associate = (models) => {
		// associations can be defined here
		Course.belongsTo(models.User, {
			foreignKey: {
				fieldName: 'userId',
				allowNull: false
			}
		});
	};

	return Course;
};