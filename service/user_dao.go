package service

import (
	"CRUD_Api/models"

	"github.com/gin-gonic/gin"
)

func FindAllUser(pageNum, MaxPerPage int) (users []models.User, err error) {
	var sql = `SELECT * FROM users LIMIT ? OFFSET ?`
	err = models.DB.Raw(sql, models.MaxPerPage, (pageNum-1)*models.MaxPerPage).Scan(&users).Error
	return users, err
}

func FindUser(id string) (users models.User, err error) {
	return users, models.DB.Find(&users, id).Error
}

func CreateUser(user models.User) error {
	return models.DB.Create(&user).Error
}

func UpdateUser(user models.User, updatedUser models.User, c *gin.Context) error {
	if err := models.DB.Where("user_id = ?", c.Param("user_id")).First(&user).Error; err != nil {
		return models.ErrNotFound
	}

	return models.DB.Model(&user).Updates(&updatedUser).Error
}

func DeleteUser(user models.User, id string) error {
	if err := models.DB.Where("user_id = ?", id).Error; err != nil {
		return models.ErrNotFound
	} else {
		return models.DB.Where("user_id = ?", id).Delete(&user).Error
	}

}

func AddUserToGroup(data models.GroupUser) error {
	var groupuser models.GroupUser
	sql := `SELECT * FROM group_users where user_id = ? and groupid = ?`
	models.DB.Raw(sql, data.User_id, data.Groupid).Scan(&groupuser)

	if (groupuser.User_id != "" && groupuser.Groupid != "") {
		return models.ErrExistedInGroup
	} else {
		return models.DB.Create(&data).Error 
	}

}

func DeleteUserFromGroup(group_user models.GroupUser, id string) error {
	err := models.DB.Where("user_id = ?", id).Delete(&group_user).Error
	return err
}
