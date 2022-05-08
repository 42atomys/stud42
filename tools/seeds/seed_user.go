package main

import (
	"context"

	"atomys.codes/stud42/internal/models/generated"
)

func seedUsers() error {
	var users = []*generated.UserCreate{
		client.User.Create().SetEmail("15014@local.dev").SetDuoID(15014).SetDuoLogin("gdalmar").SetFirstName("Gregory").SetLastName("Dalmar"),
		client.User.Create().SetEmail("12297@local.dev").SetDuoID(12297).SetDuoLogin("rgaiffe").SetFirstName("Remi").SetLastName("Gaiffe"),
		client.User.Create().SetEmail("19265@local.dev").SetDuoID(19265).SetDuoLogin("jgengo").SetFirstName("Jordane").SetLastName("Gengo"),
		client.User.Create().SetEmail("24007@local.dev").SetDuoID(24007).SetDuoLogin("titus").SetFirstName("Jordane").SetLastName("Gengo").SetIsStaff(true),
		client.User.Create().SetEmail("-1@local.dev").SetDuoID(424242001).SetDuoLogin("aperez").SetFirstName("Alice").SetLastName("Perez"),
	}

	return client.User.CreateBulk(users...).OnConflict().DoNothing().Exec(context.Background())
}
