export const sendRequest = async (onLoading, requestConfig) => {
    onLoading();
    try {
        const response = await fetch(requestConfig.url, {
            method: requestConfig.params.method,
            body: JSON.stringify(requestConfig.params.body),
            headers: requestConfig.params.headers
        });
        if (!response.ok) {
            throw new Error("Unsuccessful request to: " + requestConfig.url + " - Server response code: " + response.status);
        }
        return await response.json();
    } catch (err) {
        return undefined;
    }
};
