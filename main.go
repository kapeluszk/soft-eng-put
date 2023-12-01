package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"os"
	"os/signal"
	"syscall"
)

//var (
//	//go:embed all:templates/*
//	templateFS embed.FS
//
//	//go:embed css/output.css
//	css embed.FS
//
//	//parsed templates
//	html *template.Template
//)

func main() {

	//exit process immediately upon sigterm
	handleSigTerms()

	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.GET("/tickets", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "tickets",
		})
	})

	r.GET("/tickets/:id", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "id",
		})
	})

	r.POST("/login", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.POST("/tickets", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.POST("/tickets/:id/close", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.POST("/tickets/:id/assing", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.Run()
}

func handleSigTerms() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		fmt.Println("received SIGTERM, exiting")
		os.Exit(1)
	}()
}
