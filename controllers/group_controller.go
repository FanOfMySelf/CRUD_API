package controllers

import (
	"net/http"
	"strconv"

	"CRUD_Api/models"
	"CRUD_Api/service"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateGroupInput struct {
	Groupname string
}

type UpdateGroupInput struct {
	Groupname string
}

func CreateGroup(c *gin.Context) {
	var input CreateGroupInput
	newId := uuid.New()
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data := models.Group{Groupid:"Admin" + newId.String(), Groupname: input.Groupname}

	if err := service.CreateGroup(data); err == nil {
		c.JSON(http.StatusOK, gin.H{"data": "Group created"})
	} else {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": models.ErrDupGroup.Error()})
	}

}

func FindAllGroup(c *gin.Context) {
	var groups []models.Group
	var query = c.Request.URL.Query()
	models.PageNum, _ = strconv.Atoi(query.Get("page"))
	models.MaxPerPage, _ = strconv.Atoi(query.Get("max-per-page"))

	if models.PageNum < 0 {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": models.ErrInvalidPage.Error()})
		return
	}
	if models.MaxPerPage < 0 {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": models.ErrInvalidMaxGroups.Error()})
		return
	}

	groups, err := service.FindAllGroup(models.PageNum, models.MaxPerPage)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": models.ErrGroupEmpty.Error()})
	}
	c.JSON(http.StatusOK, gin.H{"data": groups})
}

func FindGroup(c *gin.Context) {
	var id string
	group, err := service.FindGroup(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": models.ErrNotFound.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"data": group,
	})
}

func UpdateGroup(c *gin.Context) {
	var group models.Group
	var input UpdateGroupInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": models.ErrNotFound.Error()})
	}

	updatedGroup := models.Group{Groupname: input.Groupname}

	service.UpdateGroup(group, updatedGroup, c)
	c.JSON(http.StatusOK, gin.H{"data": "Group updated"})
}

func DeleteGroup(c *gin.Context) {
	var id string
	var group models.Group
	if err := service.DeleteGroup(group, id, c); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": models.ErrNotFound.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "Group deleted"})
}
