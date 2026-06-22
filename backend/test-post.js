async function test() {
  const res = await fetch("http://localhost:3001/api/v1/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Batom Teste",
      description: "Teste",
      price: 10.5,
      categoryName: "Teste",
      categorySlug: "teste",
      brandName: "Teste Marca",
      brandSlug: "teste-marca"
    })
  });
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response:", text);
}
test();
