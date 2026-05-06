// familias.js
const familias = {
  "sonia": { nombre: "Familia Sonia Cabello Godínez", cantidad: 5 },
  "robles": { nombre: "Familia Robles Martínez", cantidad: 4 },
  "hernandez": { nombre: "Familia Hernández López", cantidad: 3 }
};

if (typeof module !== "undefined") {
  module.exports = familias; // para Node.js
}
