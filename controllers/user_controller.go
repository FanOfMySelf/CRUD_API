package controllers

import (
	"net/http"
	"strconv"

	"CRUD_Api/models"
	"CRUD_Api/service"

	"github.com/gin-gonic/gin"
)

type CreateUserInput struct {
	User_id  string `json:"user_id" binding:"required"`
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required"`
}

type UpdateUserInput struct {
	Username string `json:"username"`
	Email    string `json:"email"`
}

func CreateUser(c *gin.Context) {
	var input CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data := models.User{User_id: input.User_id, Username: input.Username, Email: input.Email}

	service.CreateUser(data)

	c.JSON(http.StatusOK, gin.H{"data": "User created"})
}

func FindAllUser(c *gin.Context) {
	var users []models.User
	var query = c.Request.URL.Query()
	models.PageNum, _ = strconv.Atoi(query.Get("page"))
	models.MaxPerPage, _ = strconv.Atoi(query.Get("max-per-page"))

	if models.PageNum < 0 {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": models.ErrInvalidPage.Error()})
		return
	}
	if models.MaxPerPage < 0 {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": models.ErrInvalidMaxUsers.Error()})
		return
	}

	users, err := service.FindAllUser(models.PageNum, models.MaxPerPage)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": models.ErrUserEmpty.Error()})
	}
	c.JSON(http.StatusOK, gin.H{"data": users})
}

func FindUser(c *gin.Context) {
	var id string
	users, err := service.FindUser(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": models.ErrNotFound.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"data": users,
	})
}

func UpdateUser(c *gin.Context) {
	var user models.User
	var input UpdateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": models.ErrNotFound.Error()})
	}

	updatedUser := models.User{Username: input.Username, Email: input.Email}

	service.UpdateUser(user, updatedUser, c)
	c.JSON(http.StatusOK, gin.H{"data": "User updated"})
}

func DeleteUser(c *gin.Context) {
	var id string
	var user models.User
	if err := service.DeleteUser(user, id, c); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": models.ErrNotFound.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "User deleted"})
}
