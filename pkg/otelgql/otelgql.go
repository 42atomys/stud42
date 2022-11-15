// This package is inspired by the work of Ravil Galaktionov on
// https://github.com/ravilushqa/otelgqlgen project
//
// The project is rewritted on s42 app due to the fact of how otel is used.
// On August 2022, this option is not possible with the package of ravilushqa,
// that the motivation of the rewrite. All credits to Ravil Galaktionov
package otelgql

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler/extension"

	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/trace"
	oteltrace "go.opentelemetry.io/otel/trace"
)

const (
	extensionName   = "OpenTelemetry"
	complexityLimit = "ComplexityLimit"
)

type Tracer struct {
	complexityExtensionName     string
	tracer                      oteltrace.Tracer
	requestVariablesBuilderFunc RequestVariablesBuilderFunc
}

// RequestVariablesBuilderFunc is the signature of the function
// used to build the request variables attributes.
type RequestVariablesBuilderFunc func(requestVariables map[string]interface{}) []attribute.KeyValue

var _ interface {
	graphql.HandlerExtension
	graphql.ResponseInterceptor
	graphql.FieldInterceptor
} = Tracer{}

func (a Tracer) ExtensionName() string {
	return extensionName
}

func (a Tracer) Validate(_ graphql.ExecutableSchema) error {
	return nil
}

func (a Tracer) InterceptResponse(ctx context.Context, next graphql.ResponseHandler) *graphql.Response {
	ctx, span := a.tracer.Start(ctx, operationName(ctx), oteltrace.WithSpanKind(oteltrace.SpanKindServer))
	defer span.End()
	if !span.IsRecording() {
		return next(ctx)
	}

	oc := graphql.GetOperationContext(ctx)

	span.SetAttributes(
		RequestQuery(oc.RawQuery),
	)
	complexityExtension := a.complexityExtensionName
	if complexityExtension == "" {
		complexityExtension = complexityLimit
	}
	complexityStats, ok := oc.Stats.GetExtension(complexityExtension).(*extension.ComplexityStats)
	if !ok {
		// complexity extension is not used
		complexityStats = &extension.ComplexityStats{}
	}

	if complexityStats.ComplexityLimit > 0 {
		span.SetAttributes(
			RequestComplexityLimit(int64(complexityStats.ComplexityLimit)),
			RequestOperationComplexity(int64(complexityStats.Complexity)),
		)
	}

	if a.requestVariablesBuilderFunc != nil {
		span.SetAttributes(a.requestVariablesBuilderFunc(oc.Variables)...)
	}

	resp := next(ctx)
	if resp != nil && len(resp.Errors) > 0 {
		span.SetStatus(codes.Error, resp.Errors.Error())
		span.RecordError(fmt.Errorf(resp.Errors.Error()))
		span.SetAttributes(ResolverErrors(resp.Errors)...)
	}

	return resp
}

func (a Tracer) InterceptField(ctx context.Context, next graphql.Resolver) (interface{}, error) {
	fc := graphql.GetFieldContext(ctx)
	ctx, span := a.tracer.Start(ctx,
		fc.Field.ObjectDefinition.Name+"/"+fc.Field.Name,
		oteltrace.WithSpanKind(oteltrace.SpanKindServer),
	)
	defer span.End()
	if !span.IsRecording() {
		return next(ctx)
	}

	span.SetAttributes(
		ResolverPath(fc.Path().String()),
		ResolverObject(fc.Field.ObjectDefinition.Name),
		ResolverField(fc.Field.Name),
		ResolverAlias(fc.Field.Alias),
	)
	span.SetAttributes(ResolverArgs(fc.Field.Arguments)...)

	resp, err := next(ctx)

	errList := graphql.GetFieldErrors(ctx, fc)
	if len(errList) != 0 {
		span.SetStatus(codes.Error, errList.Error())
		span.RecordError(fmt.Errorf(errList.Error()))
		span.SetAttributes(ResolverErrors(errList)...)
	}

	return resp, err
}

// Middleware sets up a handler to start tracing the incoming
// requests.  The service parameter should describe the name of the
// (virtual) server handling the request. extension parameter may be empty string.
func Middleware(tr trace.Tracer) Tracer {
	return Tracer{
		tracer:                      tr,
		requestVariablesBuilderFunc: RequestVariables,
	}
}

func operationName(ctx context.Context) string {
	requestContext := graphql.GetOperationContext(ctx)
	if requestContext.Doc != nil && len(requestContext.Doc.Operations) != 0 {
		op := requestContext.Doc.Operations[0]
		if op.Name != "" {
			return op.Name
		}
	}
	return GetOperationName(ctx)
}

type operationNameCtxKey struct{}

// SetOperationName adds the operation name to the context so that the interceptors can use it.
// It will replace the operation name if it already exists in the context.
// example:
//
//		ctx = otelgqlgen.SetOperationName(r.Context(), "my-operation")
//	 	r = r.WithContext(ctx)
func SetOperationName(ctx context.Context, name string) context.Context {
	return context.WithValue(ctx, operationNameCtxKey{}, name)
}

// GetOperationName gets the operation name from the context.
func GetOperationName(ctx context.Context) string {
	if oc, _ := ctx.Value(operationNameCtxKey{}).(string); oc != "" {
		return oc
	}
	return "nameless-operation"
}
