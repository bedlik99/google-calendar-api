export const authRequest = {
    url: "/auth/login",
    params: {
        method: 'POST',
        body: {
            username: null,
            password: null
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }
};

export const validateTokenRequest = {
    url: "/auth/validate-token",
    params: {
        method: 'POST',
        body: null,
        headers: {
            'Content-Type': 'application/json'
        }
    }
};

