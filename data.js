function makeImage(symbol, bgColor) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">' +
    '<rect width="400" height="260" fill="' + bgColor + '"/>' +
    '<text x="200" y="165" font-size="110" text-anchor="middle">' + symbol + "</text>" +
    "</svg>";
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

const tools = [
  {
    id: 1,
    name: "Drel",
    description: "Devor va yog'ochni teshish uchun kuchli elektr drel, 850 Vt.",
    pricePerDay: 40000,
    image: makeImage("🛠️", "#dbeafe")
  },
  {
    id: 2,
    name: "Narvon",
    description: "Balandlikda ishlash uchun yengil alyuminiy narvon, 3 metr.",
    pricePerDay: 20000,
    image: makeImage("🪜", "#e0f2fe")
  },
  {
    id: 3,
    name: "Proyektor",
    description: "Taqdimot va kino uchun Full HD proyektor, 3500 lumen.",
    pricePerDay: 120000,
    image: makeImage("📽️", "#e0e7ff")
  },
  {
    id: 4,
    name: "Mikrofon",
    description: "To'y va tadbirlar uchun simsiz professional mikrofon.",
    pricePerDay: 50000,
    image: makeImage("🎤", "#dbeafe")
  },
  {
    id: 5,
    name: "Tikuv mashinasi",
    description: "Uy sharoitida tikish uchun elektr tikuv mashinasi.",
    pricePerDay: 60000,
    image: makeImage("🧵", "#e0f2fe")
  },
  {
    id: 6,
    name: "Gilam tozalagich",
    description: "Gilam va mebelni chuqur tozalash uchun yuvuvchi apparat.",
    pricePerDay: 90000,
    image: makeImage("🧹", "#e0e7ff")
  }
];