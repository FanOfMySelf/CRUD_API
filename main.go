package main

import (
	"CRUD_Api/controllers"
	"CRUD_Api/models"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	models.ConnectDatabase()
	//User API
	router.POST("/api/users", controllers.CreateUser)
	router.GET("/api/users", controllers.FindAllUser)
	router.GET("/api/users/:user_id", controllers.FindUser)
	router.PATCH("/api/users", controllers.UpdateUser)
	router.DELETE("/api/users", controllers.DeleteUser)
	//Group API
	router.POST("/api/groups", controllers.CreateGroup)
	router.GET("/api/groups", controllers.FindAllGroup)
	router.GET("/api/groups/:groupid", controllers.FindGroup)
	router.PATCH("/api/groups/:groupid", controllers.UpdateGroup)
	router.DELETE("/api/groups/:groupid", controllers.DeleteGroup)

	//GroupUser API
	router.POST("/api/group-users", controllers.AddUserToGroup)

	router.Run("localhost:8080")

}
