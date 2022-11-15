{
  "metadata": {
    "specName": "{{ .Spec.Name }}",
    "model": "{{ .Request.Header | getHeader "X-Model" }}",
    "event": "{{ .Request.Header | getHeader "X-Event" }}",
    "deliveryID": "{{ .Request.Header | getHeader "X-Delivery" | default "unknown" }}"
  },
  "payload": {{ .Payload }}
}