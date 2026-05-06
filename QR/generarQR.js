const QRCode = require("qrcode");
const { createCanvas, Image } = require("canvas"); // 👈 Importamos Image desde canvas
const fs = require("fs");
const path = require("path");
const familias = require("../familias");

const outputDir = path.join(__dirname, "imagenes");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const baseURL = "https://lizette113.github.io/qr";

for (const clave in familias) {
  const fam = familias[clave];
  const url = `${baseURL}/?f=${clave}`;

  const canvas = createCanvas(400, 500);
  const ctx = canvas.getContext("2d");

  // Fondo azul oscuro
  ctx.fillStyle = "#0a1a3a";
  ctx.fillRect(0, 0, 400, 500);

  // Estrellitas
  ctx.fillStyle = "white";
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 400, Math.random() * 500, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Generar QR como DataURL
  QRCode.toDataURL(url, { width: 250, margin: 2 }, (err, qrData) => {
    if (err) throw err;

    const img = new Image(); // 👈 Ahora sí funciona en Node.js
    img.onload = () => {
      ctx.drawImage(img, 75, 50, 250, 250);

      // Texto amarillo (nombre)
      ctx.fillStyle = "yellow";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(fam.nombre, 200, 420);

      // Texto blanco (cantidad)
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText(`Válido para ${fam.cantidad} personas`, 200, 450);

      // Guardar imagen
      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync(path.join(outputDir, `${clave}.png`), buffer);
      console.log(`QR generado: ${clave}.png`);
    };
    img.src = qrData;
  });
}
