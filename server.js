import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import nodemailer from "nodemailer";

dotenv.config();

// Necesario para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -----------------------------
// CONFIGURACIÓN DE HANDLEBARS
// -----------------------------
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// -----------------------------
// MIDDLEWARE
// -----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// -----------------------------
// DATOS DINÁMICOS (Proyectos)
// -----------------------------
const projects = [
  {
    name: "IncluTech",
    description:
      "Página web de empresa IncluTech, dedicada a desarrollar soluciones tecnológicas inclusivas.",
    Rol: ["Fundadora y desarrolladora Full Stack."],
    link: "https://inclutech.onrender.com/"

  },

   {
    name: "Tity Cristina Sonidos - Página Web",
    description:
      "Página web de sonidista disidente Tity Cristina Sonidos, dedicada a audio en vivo y de sala, y producción técnica para shows en vivo",
    Rol: ["Creadora desarrolladora Full Stack."],
    link: "https://titycristinasonidos.onrender.com/"
  },
 
];

// -----------------------------
// RUTA PRINCIPAL
// -----------------------------
app.get("/", (req, res) => {
  res.render("home", { projects });
});

// -----------------------------
// RUTA DE CONTACTO (ENVÍA CORREO)
// -----------------------------
app.post("/contacto", async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  console.log("Mensaje recibido:", req.body);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // Puedes dejarlo hardcodeado o usar variables de entorno
        user: "devia.cami@gmail.com",          // tu correo
        pass: process.env.EMAIL_PASS,          // contraseña de aplicación
      },
    });

    await transporter.sendMail({
      from: `"Formulario Portafolio" <devia.cami@gmail.com>`,
      to: "devia.cami@gmail.com",             // donde quieres recibirlos
      subject: "Nuevo mensaje desde tu portafolio",
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${correo}</p>
        <p><strong>Mensaje:</strong><br>${mensaje}</p>
      `,
    });

    // Después de enviar, redirigimos al home
    res.redirect("/?enviado=ok");
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).send("Error al enviar mensaje");
  }
});

// -----------------------------
// INICIAR SERVIDOR
// -----------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});

