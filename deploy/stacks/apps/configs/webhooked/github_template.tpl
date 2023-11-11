{
  "metadata" : {
    "specName": "{{ .Spec.Name }}",
    "event": "{{ .Request.Header | getHeader "x-github-event" }}",
  },
  "payload": {{ .Payload }}
}