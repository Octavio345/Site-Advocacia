export default function PracticeAreas() {
  const areas = [
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Direito de Família",
      description: "Divórcio, guarda de filhos, pensão alimentícia, inventários e planejamento familiar com sensibilidade e agilidade.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "💼",
      title: "Direito Trabalhista",
      description: "Defesa dos direitos trabalhistas, ações de indenização, acordos e consultoria preventiva para empresas.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: "🏢",
      title: "Direito Empresarial",
      description: "Assessoria completa para empresas, contratos, planejamento societário e recuperação judicial.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "🏠",
      title: "Direito Imobiliário",
      description: "Compra e venda de imóveis, contratos de locação, regularização de propriedades e usucapião.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: "⚖️",
      title: "Direito Civil",
      description: "Ações de indenização, contratos em geral, responsabilidade civil e obrigações.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: "📋",
      title: "Direito do Consumidor",
      description: "Defesa contra abusos de empresas, revisão de contratos, indenizações e danos morais.",
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase">Especialidades</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
            Áreas de Atuação
          </h2>
          <p className="text-gray-600 text-lg">
            Atendimento especializado nas principais áreas do direito, 
            sempre com foco na melhor solução para cada caso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Hover Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="p-8">
                <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {area.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {area.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {area.description}
                </p>
                
                <div className="flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform">
                  <span>Saiba mais</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
