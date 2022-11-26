package otelgql

import (
	"net/http"

	"go.opentelemetry.io/otel/trace"
)

func PropagateHeadersMiddleware(tracer trace.Tracer) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()

			ctx, span := tracer.Start(ctx, operationName(ctx))
			defer span.End()

			if traceID, err := trace.TraceIDFromHex(r.Header.Get("X-TraceID")); err == nil {
				span.SpanContext().WithTraceID(traceID)
			}

			if spanID, err := trace.SpanIDFromHex(r.Header.Get("X-SpanID")); err == nil {
				span.SpanContext().WithSpanID(spanID)
			}

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
