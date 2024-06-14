import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { WebTracerProvider } from '@opentelemetry/web';
import { CollectorTraceExporter } from '@opentelemetry/exporter-collector';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { context, setSpan } from '@opentelemetry/api';
import TokenService from "./token.service";

export function setupInterceptor() {
    const provider = new WebTracerProvider();
    provider.addSpanProcessor(new SimpleSpanProcessor(new CollectorTraceExporter()));
  
    provider.register();
  
    registerInstrumentations({
      instrumentations: [
        new HttpInstrumentation({
          responseHook: (span, request, response) => {
            const spanContext = span.context();
            const traceId = spanContext.traceId;
            const spanId = spanContext.spanId;

            const url = new URL(request.url);
            const endpoint = url.pathname;
            const query = url.search;
            const method = request.method;
            const pricingToken = TokenService.getLocalPricingToken();
            const requestSize = request.headers.get('content-length') || 'unknown';
            const status = response.status;
            const responseSize = response.headers.get('content-length') || 'unknown';
            const requestTime = span.startTime[0] * 1e9 + span.startTime[1]; // convert to nanoseconds
            
            const cacheControl = response.headers.get('cache-control');
            const eTag = response.headers.get('etag');
            const expires = response.headers.get('expires');
            const lastModified = response.headers.get('last-modified');
            const age = response.headers.get('age');

            const cacheUsed = cacheControl || eTag || expires || lastModified || age ? 'Yes' : 'No';
            
            // Get the PerformanceEntry for the request
            const performanceEntries = performance.getEntriesByName(request.url, "resource");

            // Check if we have at least one entry
            if (performanceEntries.length > 0) {
                // Get the first entry
                const performanceEntry = performanceEntries[0];

                // Calculate the round-trip time
                const roundTripTime = performanceEntry.responseEnd - performanceEntry.startTime;

                // Add the round-trip time to the CSV content
                const csvContent = `${endpoint},${query},${method},${pricingToken},${requestSize},${status},${responseSize},${cacheUsed},${requestTime},${roundTripTime},${traceId},${spanId}\n`;

                // Write to CSV file
                // This is a placeholder. In a real application, you would need to implement this function.
                writeToCsvFile(csvContent);
            }
        },
      }),
    ],
  });
}

function writeToCsvFile(content) {
  // Implement this function to write to a CSV file.
  // This might involve sending the content to a server that has file system access, or using a library that can write files in the browser.
}