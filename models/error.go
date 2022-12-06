package models

import "errors"

//ErrNotFound User not found
var ErrNotFound = errors.New("User not found")

//ErrInvalidEntity invalid entity
var ErrInvalidEntity = errors.New("Invalid entity")

//ErrCannotBeDeleted cannot be deleted
var ErrCannotBeDeleted = errors.New("Cannot be deleted")

//ErrUserAlreadyExsisted User exsisted
var ErrUserAlreadyExsisted= errors.New("User exsisted")

//ErrGroupAlreadyExsisted User exsisted
var ErrGroupAlreadyExsisted= errors.New("Group exsisted")

//ErrUserEmpty No User in DB
var ErrUserEmpty= errors.New("No user in DB")

//ErrGroupEmpty No group in DB
var ErrGroupEmpty= errors.New("No group in DB")

//ErrInvalidPage Invalid page num
var ErrInvalidPage = errors.New("Invalid page num")

//ErrInvalidMaxUsers Invalid max user
var ErrInvalidMaxUsers = errors.New("Invalid max user")

//ErrInvalidMaxGroups Invalid max groups
var ErrInvalidMaxGroups = errors.New("Invalid max groups")