package service

import (
	"CRUD_Api/models"

	"github.com/gin-gonic/gin"
)

func CreateGroup(group models.Group) error {
	return models.DB.Create(&group).Error
}

func FindAllGroup(pageNum , MaxPerPage int) (group []models.Group, err error) {
	var sql = `SELECT * FROM groups LIMIT ? OFFSET ?`
	err = models.DB.Raw(sql, models.MaxPerPage, (pageNum-1)*models.MaxPerPage).Scan(&group).Error
	return group, err
}

func FindGroup(id string) (group models.Group, err error) {
	return group, models.DB.Find(&group, id).Error
}

func UpdateGroup(group models.Group, updatedGroup models.Group, c *gin.Context) error {
	if err := models.DB.Where("groupid = ?", c.Param("groupid")).First(&group).Error; err != nil {
		return models.ErrNotFound
	}

	return models.DB.Model(&group).Updates(&updatedGroup).Error
}

func DeleteGroup(group models.Group, id string, c *gin.Context) error {
	if err := models.DB.Where("groupid = ?", c.Param("groupid")).First(&group).Error; err != nil {
		return models.ErrNotFound
	} else {
		return models.DB.Delete(&group).Error
	}

}