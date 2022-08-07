// const process = require('process');
// const opentelemetry = require('@opentelemetry/sdk-node');
// const {
//   getNodeAutoInstrumentations,
// } = require('@opentelemetry/auto-instrumentations-node');
// const { Resource } = require('@opentelemetry/resources');
// const {
//   SemanticResourceAttributes,
// } = require('@opentelemetry/semantic-conventions');
// const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
// const { SimpleSpanProcessor } = require('@opentelemetry/tracing');

// const exporter = new JaegerExporter({
//   tags: [],
//   endpoint: `http://jaeger:14268/api/traces`,
// })

// // configure the SDK to export telemetry data to the console
// // enable all auto-instrumentations from the meta package
// const sdk = new opentelemetry.NodeSDK({
//   spanProcessor: new SimpleSpanProcessor(exporter),
//   resource: new Resource({
//     [SemanticResourceAttributes.SERVICE_NAME]: 'interface',
//   }),
//   exporter,
//   instrumentations: [
//     getNodeAutoInstrumentations({
//       // Each of the auto-instrumentations
//       // can have config set here or you can
//       // npm install each individually and not use the auto-instruments
//       '@opentelemetry/instrumentation-http': {
//         ignoreIncomingPaths: [
//           // You can filter conditionally
//           // Next.js gets a little too chatty
//           // if you trace all the incoming requests
//           ...(process.env.NODE_ENV !== 'production'
//             ? [/^\/_next\/static.*/]
//             : [/^\/__?next\/.*/]),
//         ],

//         // This gives your request spans a more meaningful name
//         // than `HTTP GET`
//         requestHook: (span, request) => {
//           span.setAttributes({
//             name: `${request.method} ${request.url || request.path}`,
//           });
//         },

//         // Re-assign the root span's attributes
//         startIncomingSpanHook: (request) => {
//           return {
//             name: `${request.method} ${request.url || request.path}`,
//             'request.path': request.url || request.path,
//           };
//         },
//       },
//     }),
//   ],
// });

// sdk
//   .start()
//   .then(() => {
//     console.log("Tracing initialized");
//   })
//   .catch((error) => console.log("Error initializing tracing", error));

// process.on("SIGTERM", () => {
//   sdk
//     .shutdown()
//     .then(() => console.log("Tracing terminated"))
//     .catch((error) => console.log("Error terminating tracing", error))
//     .finally(() => process.exit(0));
// });

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
