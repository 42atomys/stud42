'use strict';

const opentelemetry = require('@opentelemetry/api');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { Resource } = require('@opentelemetry/resources');
const {
  SemanticResourceAttributes,
} = require('@opentelemetry/semantic-conventions');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const {
  GraphQLInstrumentation,
} = require('@opentelemetry/instrumentation-graphql');

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'interface',
  }),
});

const exporter = new JaegerExporter({
  tags: [],
  endpoint: `http://jaeger:14268/api/traces`,
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

// Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
provider.register();

registerInstrumentations({
  tracerProvider: provider,
  instrumentations: [
    new HttpInstrumentation({
      ignoreIncomingPaths: [
        // You can filter conditionally
        // Next.js gets a little too chatty
        // if you trace all the incoming requests
        ...(process.env.NODE_ENV !== 'production'
          ? [/^\/_next\/static.*/]
          : [/^\/__?next.*/]),
      ],

      // This gives your request spans a more meaningful name
      // than `HTTP GET`
      requestHook: (span, request) => {
        span.updateName(`${request.method} ${request.url || request.path}`);
      },

      // Re-assign the root span's attributes
      startIncomingSpanHook: (request) => {
        return {
          name: `${request.method} ${request.url || request.path}`,
          'request.path': request.url || request.path,
        };
      },
    }),
    new GraphQLInstrumentation({
      mergeItems: true,
    }),
  ],
});
