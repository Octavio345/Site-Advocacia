import { Link } from 'react-router-dom';

export default function Footer({ siteName, oab, phone, email, address, whatsapp }) {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-xl font-bold mb-4">{siteName}</h4>
            <p className="text-gray-400 mb-4">{oab}</p>
            <p className="text-gray-400 text-sm">
              Excelência e compromisso com seus direitos há mais de 15 anos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {['Início', 'Artigos', 'Sobre', 'Contato'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Início' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contato</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-accent">📍</span>
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent">📞</span>
                <a href={`tel:${phone}`} className="hover:text-accent transition">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent">✉️</span>
                <a href={`mailto:${email}`} className="hover:text-accent transition">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent">📱</span>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Receba novidades e artigos jurídicos.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white"
              />
              <button
                type="submit"
                className="bg-accent text-primary px-4 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© 2025 {siteName}. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent transition">Política de Privacidade</a>
            <a href="#" className="hover:text-accent transition">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}