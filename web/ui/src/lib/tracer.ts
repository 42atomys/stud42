import opentelemetry from '@opentelemetry/api';

export function getTracer() {
  return opentelemetry.trace.getTracer('interface');
}
