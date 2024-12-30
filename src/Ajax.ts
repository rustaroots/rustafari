/**
 * A utility class for making AJAX requests using the Fetch API.
 */
export class Ajax {
    /**
     * Performs a GET request.
     * @param url The URL to send the GET request to.
     * @param headers Optional headers to include in the request.
     * @returns A promise resolving to the JSON response of type `T`.
     */
    static get<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
        return Ajax.request<T, undefined>(url, 'GET', undefined, headers);
    }

    /**
     * Performs a POST request.
     * @param url The URL to send the POST request to.
     * @param data The data to send in the body of the request.
     * @param headers Optional headers to include in the request.
     * @returns A promise resolving to the JSON response of type `T`.
     */
    static post<T, D = Record<string, unknown>>(url: string, data: D, headers: Record<string, string> = {}): Promise<T> {
        return Ajax.request<T, D>(url, 'POST', data, headers);
    }

    /**
     * Performs a PUT request.
     * @param url The URL to send the PUT request to.
     * @param data The data to send in the body of the request.
     * @param headers Optional headers to include in the request.
     * @returns A promise resolving to the JSON response of type `T`.
     */
    static put<T, D = Record<string, unknown>>(url: string, data: D, headers: Record<string, string> = {}): Promise<T> {
        return Ajax.request<T, D>(url, 'PUT', data, headers);
    }

    /**
     * Performs a DELETE request.
     * @param url The URL to send the DELETE request to.
     * @param headers Optional headers to include in the request.
     * @returns A promise resolving to the JSON response of type `T`.
     */
    static delete<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
        return Ajax.request<T, undefined>(url, 'DELETE', undefined, headers);
    }

    /**
     * Performs a PATCH request.
     * @param url The URL to send the PATCH request to.
     * @param data The data to send in the body of the request.
     * @param headers Optional headers to include in the request.
     * @returns A promise resolving to the JSON response of type `T`.
     */
    static patch<T, D = Record<string, unknown>>(url: string, data: D, headers: Record<string, string> = {}): Promise<T> {
        return Ajax.request<T, D>(url, 'PATCH', data, headers);
    }

    /**
     * Performs a HEAD request.
     * @param url The URL to send the HEAD request to.
     * @param headers Optional headers to include in the request.
     * @returns A promise resolving to the response headers.
     */
    static head(url: string, headers: Record<string, string> = {}): Promise<Headers> {
        return Ajax.request<void, undefined>(url, 'HEAD', undefined, headers).then(() => {
            return fetch(url, { method: 'HEAD', headers }).then(response => response.headers);
        });
    }

    /**
     * Makes an AJAX request using the Fetch API.
     * This is a helper method used internally by other methods like `get`, `post`, `put`, and `delete`.
     * @param url The URL to send the request to.
     * @param method The HTTP method to use (e.g., "GET", "POST").
     * @param data Optional data to send in the body of the request (for POST/PUT).
     * @param headers Optional headers to include in the request.
     * @returns A promise resolving to the JSON response of type `T`.
     */
    private static async request<T, D>(
        url: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD',
        data?: D,
        headers: Record<string, string> = {}
    ): Promise<T> {
        try {
            const config: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
            };

            if (data !== undefined) {
                config.body = JSON.stringify(data);
            }

            const response = await fetch(url, config);

            // Check if the response status is in the successful range
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Error ${response.status} (${response.statusText}): ${errorText || 'No details'}`
                );
            }

            // Attempt to parse JSON response
            try {
                return await response.json();
            } catch {
                throw new Error(`Failed to parse response as JSON from ${url}`);
            }
        } catch (error) {
            // Provide additional context for the error
            throw new Error(
                `Request to ${url} with method ${method} failed: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        }
    }
}
