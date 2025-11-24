// -------------------------------
// MODO OSCURO
// -------------------------------
const toggleBtn = document.getElementById("darkToggle");

toggleBtn?.addEventListener("click", () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";

    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    toggleBtn.textContent = next === "dark" ? "☀️" : "🌙";
});

// Mantener el tema elegido al recargar
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const toggleBtn = document.getElementById("darkToggle");
    if (toggleBtn) {
        toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    }
});


// -------------------------------
// ANIMACIÓN SUAVE DE ENTRADA
// -------------------------------
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));


// -------------------------------
// FORMULARIO DE CONTACTO
// -------------------------------
const form = document.getElementById("contactForm");

form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        const res = await fetch("/send-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const msg = await res.json();

        document.getElementById("formMsg").textContent = msg.message;
        document.getElementById("formMsg").style.color = "var(--primary)";

        form.reset();
    } catch (err) {
        document.getElementById("formMsg").textContent =
            "Hubo un error al enviar tu mensaje 😢";
        document.getElementById("formMsg").style.color = "red";
    }
});
