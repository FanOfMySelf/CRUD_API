package models

type Group struct {
	// in: string
	Groupid string `json:"groupid" gorm:"primaryKey"`
	// in: string
	Groupname string `json:"groupname" gorm:"size:50;not null"`
}