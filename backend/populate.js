const products = [
  // MAQUIAGEM
  {
    name: "Base Líquida Boca Rosa Beauty HD",
    description: "Base de alta cobertura com acabamento matte perfeito, longa duração e resistente à água. Ideal para peles brasileiras.",
    price: 59.90,
    stock: 50,
    categoryName: "Maquiagem",
    categorySlug: "maquiagem",
    brandName: "Boca Rosa",
    brandSlug: "boca-rosa",
    images: ["https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800"]
  },
  {
    name: "Batom MAC Matte Lipstick Ruby Woo",
    description: "O batom icônico da M.A.C que tornou a marca famosa. Possui fórmula rica e cremosa com alto retorno de cor em um acabamento matte sem brilho.",
    price: 119.00,
    stock: 35,
    categoryName: "Maquiagem",
    categorySlug: "maquiagem",
    brandName: "M.A.C",
    brandSlug: "mac",
    images: ["https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800"]
  },
  {
    name: "Paleta de Sombras Mariana Saad",
    description: "Paleta com 9 tons super pigmentados e atuais. Combinação de tons cintilantes e opacos para criar diversos looks.",
    price: 98.50,
    stock: 20,
    categoryName: "Maquiagem",
    categorySlug: "maquiagem",
    brandName: "Océane",
    brandSlug: "oceane",
    images: ["https://images.unsplash.com/photo-1512496115841-3450283d438a?q=80&w=800"]
  },
  {
    name: "Corretivo NARS Radiant Creamy",
    description: "Corretivo premiado, adorado por maquiadores, com textura luxuosa e acabamento luminoso. Camufla perfeitamente.",
    price: 199.00,
    stock: 15,
    categoryName: "Maquiagem",
    categorySlug: "maquiagem",
    brandName: "NARS",
    brandSlug: "nars",
    images: ["https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=800"]
  },

  // SKINCARE
  {
    name: "Sérum Hidratante La Roche-Posay Hyalu B5",
    description: "Sérum antirrugas reparador redensificador que ativa a renovação celular, estimula a produção de colágeno e hidrata intensamente.",
    price: 219.90,
    stock: 40,
    categoryName: "Skincare",
    categorySlug: "skincare",
    brandName: "La Roche-Posay",
    brandSlug: "la-roche-posay",
    images: ["https://images.unsplash.com/photo-1601049541289-9b1b7ecece5e?q=80&w=800"]
  },
  {
    name: "Protetor Solar ISDIN Fusion Water SPF 50",
    description: "Fase aquosa, textura ultraleve, hidratação intensa e absorção imediata que garante alta proteção contra radiação UV.",
    price: 115.00,
    stock: 60,
    categoryName: "Skincare",
    categorySlug: "skincare",
    brandName: "ISDIN",
    brandSlug: "isdin",
    images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800"]
  },
  {
    name: "Gel de Limpeza Facial CeraVe",
    description: "Limpa suavemente, removendo excesso de oleosidade e sujeira sem alterar a barreira protetora natural da pele.",
    price: 69.90,
    stock: 80,
    categoryName: "Skincare",
    categorySlug: "skincare",
    brandName: "CeraVe",
    brandSlug: "cerave",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800"]
  },
  {
    name: "Água Micelar Bioderma Sensibio",
    description: "A pioneira água micelar para limpeza e remoção de maquiagem de peles sensíveis. Acalma a pele instantaneamente.",
    price: 89.90,
    stock: 45,
    categoryName: "Skincare",
    categorySlug: "skincare",
    brandName: "Bioderma",
    brandSlug: "bioderma",
    images: ["https://images.unsplash.com/photo-1615397323351-4d375323a637?q=80&w=800"]
  },

  // PERFUMARIA
  {
    name: "Perfume Carolina Herrera Good Girl",
    description: "A dualidade da mulher moderna capturada em um perfume complexo e fascinante, contido no icônico frasco em formato de salto agulha.",
    price: 649.00,
    stock: 12,
    categoryName: "Perfumaria",
    categorySlug: "perfumaria",
    brandName: "Carolina Herrera",
    brandSlug: "carolina-herrera",
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800"]
  },
  {
    name: "Perfume Lancôme La Vie Est Belle",
    description: "Uma declaração de beleza universal, construída em torno da requintada íris pallida, jasmim sambac e flor de laranjeira.",
    price: 589.00,
    stock: 18,
    categoryName: "Perfumaria",
    categorySlug: "perfumaria",
    brandName: "Lancôme",
    brandSlug: "lancome",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800"]
  },
  {
    name: "Perfume Dior J'adore Eau de Parfum",
    description: "Um buquê floral grandioso, generoso e harmonioso. Uma fragrância inesquecível de rosa damascena, ylang-ylang e jasmim.",
    price: 729.00,
    stock: 10,
    categoryName: "Perfumaria",
    categorySlug: "perfumaria",
    brandName: "Dior",
    brandSlug: "dior",
    images: ["https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800"]
  },
  {
    name: "Perfume Paco Rabanne Lady Million",
    description: "Extravagante, vibrante e ultra-feminina. A fragrância que encarna a mulher poderosa, em um frasco inspirado no diamante.",
    price: 499.00,
    stock: 25,
    categoryName: "Perfumaria",
    categorySlug: "perfumaria",
    brandName: "Paco Rabanne",
    brandSlug: "paco-rabanne",
    images: ["https://images.unsplash.com/photo-1616949392265-ff15f2122b51?q=80&w=800"]
  }
];

async function run() {
  console.log("Iniciando inserção massiva de produtos reais...");
  
  for (const product of products) {
    try {
      const response = await fetch("http://127.0.0.1:3001/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
      
      if (response.ok) {
        console.log(`✅ Sucesso: ${product.name}`);
      } else {
        const text = await response.text();
        console.error(`❌ Erro ao inserir ${product.name}: ${text}`);
      }
    } catch (e) {
      console.error(`❌ Erro de conexão ao tentar inserir ${product.name}: ${e.message}`);
    }
  }
  
  console.log("Processo de inserção finalizado!");
}

run();
