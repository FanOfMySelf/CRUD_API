package models

type Group struct {
	// in: string
	Groupid string `json:"groupid" gorm:"primaryKey"`
	// in: string
	Groupname string `json:"groupname" gorm:"size:50;not null;unique"`
	//many to many rela with group user
	Users []User `gorm:"many2many:group_user;association_foreignkey:Groupid"`
}