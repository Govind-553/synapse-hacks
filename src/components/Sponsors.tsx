import { Card } from "@/components/ui/card";

const Sponsors = () => {
  const sponsors = [
    { name: "TechCorp", logo: "TC", color: "from-blue-500 to-blue-600" },
    { name: "InnovateLab", logo: "IL", color: "from-purple-500 to-purple-600" },
    { name: "DevStudio", logo: "DS", color: "from-green-500 to-green-600" },
    { name: "CloudTech", logo: "CT", color: "from-red-500 to-red-600" },
    { name: "AIWorks", logo: "AW", color: "from-yellow-500 to-yellow-600" },
    { name: "DataFlow", logo: "DF", color: "from-indigo-500 to-indigo-600" },
    { name: "CodeBase", logo: "CB", color: "from-pink-500 to-pink-600" },
    { name: "FutureTech", logo: "FT", color: "from-teal-500 to-teal-600" }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Trusted by</span> Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join a community backed by top tech companies and innovation leaders 
            who support the next generation of developers
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {sponsors.map((sponsor, index) => (
            <Card 
              key={sponsor.name}
              className="glass-card group hover:scale-105 transition-all duration-300 cursor-pointer p-6 flex flex-col items-center justify-center aspect-square"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${sponsor.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-white font-bold text-lg">{sponsor.logo}</span>
              </div>
              <span className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                {sponsor.name}
              </span>
            </Card>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Become a Sponsor</h3>
            <p className="text-muted-foreground mb-6">
              Partner with us to support innovation and connect with talented developers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:partnerships@synapsehacks.com" 
                className="inline-flex items-center justify-center h-12 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-primary text-primary-foreground hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Partner With Us
              </a>
              <a 
                href="/sponsor-deck.pdf" 
                className="inline-flex items-center justify-center h-12 px-6 py-3 rounded-xl text-sm font-medium bg-white/10 backdrop-blur-xl border border-white/20 text-foreground hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                Download Sponsor Deck
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;