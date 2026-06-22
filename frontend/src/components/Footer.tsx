import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-pink-100 mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          
          <div className="flex-1 max-w-sm">
            <Link href="/" className="flex items-center mb-6">
              <img 
                src="/logo.jpg" 
                alt="Hello Make e Acessórios" 
                className="h-14 w-auto object-contain drop-shadow-sm mix-blend-multiply" 
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
              Sua curadoria com as melhores marcas de maquiagem e skincare. Realce sua beleza todos os dias com nossos produtos exclusivos.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/hellomakeeacessorios/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-hotPink hover:bg-hotPink hover:text-white transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex-1">
            <h4 className="font-outfit font-black text-lg text-charcoal mb-6 uppercase tracking-wider">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <Phone className="w-5 h-5 text-hotPink shrink-0 mt-0.5" />
                <span className="font-medium">(62) 98288-2075</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-5 h-5 text-hotPink shrink-0 mt-0.5" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Av.+Doná+Ilda+Araújo+Manso+Figueiredo,+Quadra+41+-+Lote+03+-+Bairro+Ilda,+Aparecida+de+Goiânia+-+GO,+74935-620" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="leading-relaxed hover:text-hotPink transition-colors"
                >
                  Av. Doná Ilda Araújo Manso Figueiredo, Quadra 41 - Lote 03 - Bairro Ilda, Aparecida de Goiânia - GO, 74935-620
                </a>
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h4 className="font-outfit font-black text-lg text-charcoal mb-6 uppercase tracking-wider">Links Úteis</h4>
            <ul className="space-y-3 font-medium text-sm text-gray-500">
              <li><Link href="/" className="hover:text-hotPink transition-colors">Início</Link></li>
              <li><Link href="/catalogo" className="hover:text-hotPink transition-colors">Catálogo Completo</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-pink-100 pt-8 flex items-center justify-center gap-4 text-xs text-gray-400 font-medium">
          <p>&copy; {new Date().getFullYear()} PhDevs. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
