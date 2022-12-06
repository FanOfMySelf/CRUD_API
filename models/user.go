package models

type User struct {
	// in: strings	
	User_id string `json:"user_id" gorm:"primaryKey;size:10;not null;unique"`
	// in: strings
	Username string `json:"username" gorm:"size:50;not null"`
	// in: strings
	Email string `json:"email" gorm:"size:50;not null"`
}