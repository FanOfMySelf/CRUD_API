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
	router.LoadHTMLGlob("src/*.html")
	//router.LoadHTMLGlob("src/pages/Group/*.html")
	//router.LoadHTMLGlob("src/pages/User/*.html")
	router.Use(static.Serve("/", static.LocalFile("/src/pages", true)))
	router.Use(static.Serve("/", static.LocalFile("/src/components/", true)))
	//router.Static("/js", "/public/style/bootstrap/dist/js")	
	router.Static("/src/pages","./src/pages")
	router.Static("/src/components/","./src/components/")
	 
	router.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", map[string]string{"title": "index"})
	})
	router.Run()

}