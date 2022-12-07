package controllers

import (
	"net/http"
	"strconv"

	"CRUD_Api/models"
	"CRUD_Api/service"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateUserInput struct {
	Username string
	Email    string
}

type UpdateUserInput struct {
	User_id  string `json:"user_id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type AddUserToGroupInput struct {
	User_id string `json:"user_id"`
	Groupid string `json:"group_id"`
}

func CreateUser(c *gin.Context) {
	var input CreateUserInput
	newId := uuid.New()
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data := models.User{User_id: "SE" + newId.String(), Username: input.Username, Email: input.Email}

	if err := service.CreateUser(data); err == nil {
		c.JSON(http.StatusOK, gin.H{"data": "User created"})
	} else {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": models.ErrDupUser.Error()})
	}

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
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "JSON error"})
	}

	updatedUser := models.User{User_id: input.User_id, Username: input.Username, Email: input.Email}

	service.UpdateUser(user, updatedUser, c)
	c.JSON(http.StatusOK, gin.H{"data": "User updated"})
}

func DeleteUser(c *gin.Context) {
	var input UpdateUserInput
	var user models.User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "JSON error"})
	}

	if err := service.DeleteUser(user, input.User_id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "User deleted"})
}

func AddUserToGroup(c *gin.Context) {
	var input AddUserToGroupInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data := models.GroupUser{User_id: input.User_id, Groupid: input.Groupid}

	if err := service.AddUserToGroup(data); err == nil {
		c.JSON(http.StatusOK, gin.H{"data": "User added to group successfully"})
	} else {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": models.ErrExistedInGroup.Error()})
	}

}
