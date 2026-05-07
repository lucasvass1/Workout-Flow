
export async function login(email: string, password: string) {
    const res = await fetch("http://workout-flow.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Erro ao fazer login");
    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data;
}   