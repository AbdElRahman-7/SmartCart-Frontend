
package main
import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)



// Fake Models
type Product struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Category string `json:"category"`
	Brand    string `json:"brand"`
	Price    int    `json:"price"`
}

type Category struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Brand struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

// Fake Data
var categories = []Category{
	{ID: 1, Name: "Electronics"},
	{ID: 2, Name: "Clothing"},
	{ID: 3, Name: "Books"},
}

var brands = []Brand{
	{ID: 1, Name: "Apple"},
	{ID: 2, Name: "Nike"},
	{ID: 3, Name: "Samsung"},
}

var products = []Product{
	{ID: 1, Name: "iPhone 15", Category: "Electronics", Brand: "Apple", Price: 1200},
	{ID: 2, Name: "Galaxy S24", Category: "Electronics", Brand: "Samsung", Price: 1100},
	{ID: 3, Name: "Air Max Shoes", Category: "Clothing", Brand: "Nike", Price: 150},
	{ID: 4, Name: "Golang Book", Category: "Books", Brand: "O’Reilly", Price: 40},
	{ID: 5, Name: "iPhone 15", Category: "Electronics", Brand: "Apple", Price: 1200},
	{ID: 6, Name: "Galaxy S24", Category: "Electronics", Brand: "Samsung", Price: 1100},
	{ID: 7, Name: "Air Max Shoes", Category: "Clothing", Brand: "Nike", Price: 150},
	{ID: 8, Name: "Golang Book", Category: "Books", Brand: "O’Reilly", Price: 40},
	{ID: 9, Name: "iPhone 15", Category: "Electronics", Brand: "Apple", Price: 1200},
	{ID: 10, Name: "Galaxy S24", Category: "Electronics", Brand: "Samsung", Price: 1100},
	{ID: 11, Name: "Air Max Shoes", Category: "Clothing", Brand: "Nike", Price: 150},
	{ID: 12, Name: "Golang Book", Category: "Books", Brand: "O’Reilly", Price: 40},
	{ID: 13, Name: "iPhone 15", Category: "Electronics", Brand: "Apple", Price: 1200},
	{ID: 14, Name: "Galaxy S24", Category: "Electronics", Brand: "Samsung", Price: 1100},
	{ID: 15, Name: "Air Max Shoes", Category: "Clothing", Brand: "Nike", Price: 150},
	{ID: 16, Name: "Golang Book", Category: "Books", Brand: "O’Reilly", Price: 40},
	{ID: 17, Name: "iPhone 15", Category: "Electronics", Brand: "Apple", Price: 1200},
	{ID: 18, Name: "Galaxy S24", Category: "Electronics", Brand: "Samsung", Price: 1100},
	{ID: 19, Name: "Air Max Shoes", Category: "Clothing", Brand: "Nike", Price: 150},
	{ID: 20, Name: "Golang Book", Category: "Books", Brand: "O’Reilly", Price: 40},
}

func main() {
	r := gin.Default()

	// ✅ CORS Middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
		MaxAge: 12 * time.Hour,
	}))

	// List products
	r.GET("/products", func(c *gin.Context) {
		c.JSON(http.StatusOK, products)
	})

	// Get single product
	r.GET("/products/:id", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid product id"})
			return
		}
		for _, p := range products {
			if p.ID == id {
				c.JSON(http.StatusOK, p)
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "product not found"})
	})

	// List categories
	r.GET("/categories", func(c *gin.Context) {
		c.JSON(http.StatusOK, categories)
	})

	// List brands
	r.GET("/brands", func(c *gin.Context) {
		c.JSON(http.StatusOK, brands)
	})

	r.Run(":8080")
}

