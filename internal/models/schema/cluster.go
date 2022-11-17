package schema

// import (
// 	"entgo.io/ent"
// 	"entgo.io/ent/dialect/entsql"
// 	"entgo.io/ent/schema/edge"
// 	"entgo.io/ent/schema/field"
// 	"entgo.io/ent/schema/index"
// 	"github.com/google/uuid"
// )

// type Cluster struct {
// 	ent.Schema
// }

// func (Cluster) Fields() []ent.Field {
// 	return []ent.Field{
// 		field.UUID("id", uuid.UUID{}).Unique().Immutable().Default(uuid.New).Annotations(entsql.Annotation{
// 			Default: "uuid_generate_v4()",
// 		}),
// 		field.UUID("campus_id", uuid.UUID{}),
// 		field.String("regexp").Comment("Regular expression to match location identifiers using named matches (cluster,zone,row,host)"),
// 		field.String("name").Comment("Name of the cluster"),
// 		field.String("short").MaxLen(4).Comment("Short name of the cluster (e1,e2,c1,e2z1)"),
// 		field.Int("total_workspace").NonNegative().Comment("Total number of workspace in the cluster"),
// 		field.Int("occupied_workspace").NonNegative().Comment("Number of occupied workspace in the cluster"),
// 	}
// }

// func (Cluster) Edges() []ent.Edge {
// 	return []ent.Edge{
// 		edge.From("campus", Campus.Type).Required().Field("campus_id").Ref("locations").Unique(),
// 		edge.To("locations", Location.Type),
// 	}
// }

// func (Cluster) Indexes() []ent.Index {
// 	return []ent.Index{
// 		index.Fields("campus_id"),
// 	}
// }
