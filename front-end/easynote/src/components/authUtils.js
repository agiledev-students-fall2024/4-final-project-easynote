export const handleLogin = async (email, password) => {
    try {
        const response = await fetch(`https://easynote-aivlj.ondigitalocean.app/api/auth/login`, {
        //const response = await fetch(`http://localhost:5000/auth/login`, {    
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const resp = await response.json();
        const { username, occupation, studying } = resp;

        if (resp.token) {
            localStorage.setItem('token', resp.token);
            return { success: true, username,  email,  occupation,  studying};
        } else {
            throw new Error("Login failed: invalid response");
        }

    } catch (error) {
        console.error("Error during login: ", error);
        return { success: false, error };
    }
};
