package main

import (
	"CRUD_Api/controllers"
	"CRUD_Api/models"

	//"github.com/gin-gonic/contrib/static"
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

	router.Static("/static", "./templates")
	//router.LoadHTMLFiles("templates/index.html")
	router.LoadHTMLGlob("./templates/*")
	//router.StaticFile("/users.js", ".templates/users.js")
	//router.StaticFile("/test.js", ".templates/test.js")
	router.Use(static.Serve("/templates", static.LocalFile("./templates", true)))

	router.GET("/", func(c *gin.Context) {
       c.HTML(200, "index.html", map[string]string{"title": "about page"})
  })

	router.Run("localhost:8080")
  
}
