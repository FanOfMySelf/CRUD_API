package main

import (
	"CRUD_Api/controllers"
	"CRUD_Api/models"

	//"net/http"

	"github.com/gin-gonic/contrib/static"
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
	router.PATCH("/api/groups", controllers.UpdateGroup)
	router.DELETE("/api/groups", controllers.DeleteGroup)

	//GroupUser API	
	router.POST("/api/group-users", controllers.AddUserToGroup)

	//Get HTML files
	router.LoadHTMLFiles("my-app/public/index.html","my-app/src/pages/Group/groupInterface.html","my-app/src/pages/User/userInterface.html")
	router.Use(static.Serve("/", static.LocalFile("my-app/src/pages", true)))
	router.Use(static.Serve("/Group", static.LocalFile("my-app/src/pages/Group", false)))
	router.Use(static.Serve("/User", static.LocalFile("my-app/src/pages/User", false)))
	router.Use(static.Serve("/components/Api", static.LocalFile("my-app/src/components/Api", false)))
	router.Use(static.Serve("/components/Buttons", static.LocalFile("my-app/src/components/Buttons", false)))
	
	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	router.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", map[string]string{"title": "index"})
	})
	router.GET("/Group", func(c *gin.Context) {
		c.HTML(200, "groupInterface.html", map[string]string{"title": "index"})
	})
	router.GET("/User", func(c *gin.Context) {
		c.HTML(200, "userInterface.html", map[string]string{"title": "index"})
	})
	
	router.Run("localhost:3000")

}