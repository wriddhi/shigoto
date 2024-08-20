export const HTTP_CODES = {
  SUCCESS: {
    /**
     * The request has succeeded.
     */
    OK: 200,

    /**
     * The request has succeeded and a new resource has been created as a result.
     */
    CREATED: 201,

    /**
     * The request has been received but not yet acted upon.
     */
    ACCEPTED: 202,

    /**
     * The request was successful but the server is returning no content.
     */
    NO_CONTENT: 204,

    /**
     * The request was successful, but the enclosed payload has been modified from that of the origin server's 200 OK response by a transforming proxy.
     */
    RESET_CONTENT: 205,

    /**
     * The server is delivering only part of the resource due to a range header sent by the client.
     */
    PARTIAL_CONTENT: 206,

    /**
     * The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
     */
    MULTI_STATUS: 207,

    /**
     * The request was successful, and a new resource was created, but the resource's URI is different from the one that the client initially sent in the request.
     */
    ALREADY_REPORTED: 208,

    /**
     * The server has successfully processed the request, and is not returning any content.
     */
    IM_USED: 226,
    /**
     * The request has more than one possible response. The user-agent or user should choose one of them.
     */
  },
  MODIFIED: {
    MULTIPLE_CHOICES: 300,

    /**
     * The URL of the requested resource has been changed permanently. The new URL is given in the response.
     */
    MOVED_PERMANENTLY: 301,

    /**
     * The URI of the requested resource has been changed temporarily. The new URI is given in the response.
     */
    FOUND: 302,

    /**
     * The server sent this response to direct the client to get the requested resource at another URI with a GET request.
     */
    SEE_OTHER: 303,

    /**
     * This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.
     */
    NOT_MODIFIED: 304,

    /**
     * The requested resource is only available through a proxy, whose address is provided in the response.
     */
    USE_PROXY: 305,

    /**
     * The server is currently responding to the request with a different URI, but the client should use the same method as in the prior request.
     */
    TEMPORARY_REDIRECT: 307,

    /**
     * The server is currently responding to the request with a different URI, but the client should use the same method as in the prior request, and future requests should use one of the returned URIs.
     */
    PERMANENT_REDIRECT: 308,
  },
  CLIENT_ERROR: {
    // Client error codes
    /**
     * The server could not understand the request due to invalid syntax.
     */
    BAD_REQUEST: 400,

    /**
     * The client must authenticate itself to get the requested response.
     */
    UNAUTHORIZED: 401,

    /**
     * This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems.
     */
    PAYMENT_REQUIRED: 402,

    /**
     * The client does not have access rights to the content.
     */
    FORBIDDEN: 403,

    /**
     * The server can not find the requested resource.
     */
    NOT_FOUND: 404,

    /**
     * The request method is known by the server but has been disabled and cannot be used.
     */
    METHOD_NOT_ALLOWED: 405,

    /**
     * This response is sent when the web server, after performing server-driven content negotiation, doesn’t find any content that conforms to the criteria given by the user agent.
     */
    NOT_ACCEPTABLE: 406,

    /**
     * This is similar to 401 but authentication is needed to be done by a proxy.
     */
    PROXY_AUTHENTICATION_REQUIRED: 407,

    /**
     * This response is sent on an idle connection by some servers, even without any previous request by the client.
     */
    REQUEST_TIMEOUT: 408,

    /**
     * This response is sent when a request conflicts with the current state of the server.
     */
    CONFLICT: 409,

    /**
     * This response is sent when the requested content has been permanently deleted from the server, with no forwarding address.
     */
    GONE: 410,

    /**
     * The server rejected the request because the Content-Length header field is not defined, and the server requires it.
     */
    LENGTH_REQUIRED: 411,

    /**
     * The client has indicated preconditions in its headers which the server does not meet.
     */
    PRECONDITION_FAILED: 412,

    /**
     * Request entity is larger than limits defined by server; the server might close the connection or return a Retry-After header field.
     */
    PAYLOAD_TOO_LARGE: 413,

    /**
     * The URI requested by the client is longer than the server is willing to interpret.
     */
    URI_TOO_LONG: 414,

    /**
     * The media format of the requested data is not supported by the server.
     */
    UNSUPPORTED_MEDIA_TYPE: 415,

    /**
     * The range specified by the Range header field in the request cannot be fulfilled; it’s possible that the range is outside the size of the target URI’s data.
     */
    RANGE_NOT_SATISFIABLE: 416,

    /**
     * This response code means the expectation indicated by the Expect request header field can’t be met by the server.
     */
    EXPECTATION_FAILED: 417,

    /**
     * Any attempt to brew coffee with a teapot should result in the error code "418 I’m a teapot".
     */
    IM_A_TEAPOT: 418,

    /**
     * The request was directed at a server that is not able to produce a response.
     */
    MISDIRECTED_REQUEST: 421,

    /**
     * The request was well-formed but was unable to be followed due to semantic errors.
     */
    UNPROCESSABLE_ENTITY: 422,

    /**
     * The resource that is being accessed is locked.
     */
    LOCKED: 423,

    /**
     * The request failed due to failure of a previous request.
     */
    FAILED_DEPENDENCY: 424,

    /**
     * Indicates that the server is unwilling to risk processing a request that might be replayed.
     */
    TOO_EARLY: 425,

    /**
     * The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.
     */
    UPGRADE_REQUIRED: 426,

    /**
     * The origin server requires the request to be conditional.
     */
    PRECONDITION_REQUIRED: 428,

    /**
     * The user has sent too many requests in a given amount of time ("rate limiting").
     */
    TOO_MANY_REQUESTS: 429,

    /**
     * The server is unwilling to process the request because its header fields are too large.
     */
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,

    /**
     * The user requests an illegal resource, such as a web page censored by a government.
     */
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,

    // Server error codes
    /**
     * The server has encountered a situation it doesn’t know how to handle.
     */
  },
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: 500,

    /**
     * The request method is not supported by the server and cannot be handled.
     */
    NOT_IMPLEMENTED: 501,

    /**
     * The server, while working as a gateway to get a response needed to handle the request, got an invalid response.
     */
    BAD_GATEWAY: 502,

    /**
     * The server is not ready to handle the request.
     */
    SERVICE_UNAVAILABLE: 503,

    /**
     * The server is acting as a gateway and cannot get a response in time.
     */
    GATEWAY_TIMEOUT: 504,

    /**
     * The HTTP version used in the request is not supported by the server.
     */
    HTTP_VERSION_NOT_SUPPORTED: 505,

    /**
     * The server has an internal configuration error: transparent content negotiation for the request results in a circular reference.
     */
    VARIANT_ALSO_NEGOTIATES: 506,

    /**
     * The server is unable to store the representation needed to complete the request.
     */
    INSUFFICIENT_STORAGE: 507,

    /**
     * The server detected an infinite loop while processing a request with "Depth: infinity".
     */
    LOOP_DETECTED: 508,

    /**
     * Further extensions to the request are required for the server to fulfill it.
     */
    NOT_EXTENDED: 510,

    /**
     * The client needs to authenticate to gain network access.
     */
    NETWORK_AUTHENTICATION_REQUIRED: 511,
  },
} as const;
