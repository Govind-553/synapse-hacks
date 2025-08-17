import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Scale, Zap, Code, Trophy, Lightbulb } from "lucide-react";
import teamImage from "@/assets/team-collaboration.jpg";
import judgingImage from "@/assets/transparent-judging.jpg";
import updatesImage from "@/assets/realtime-updates.jpg";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Easy Team Building",
      description: "Find teammates with complementary skills and form winning teams effortlessly",
      image: teamImage,
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: Scale,
      title: "Transparent Judging",
      description: "Fair and transparent evaluation process with detailed scoring criteria",
      image: judgingImage,
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Stay informed with instant notifications and live event updates",
      image: updatesImage,
      gradient: "from-green-500 to-teal-400"
    }
  ];

  const additionalFeatures = [
    {
      icon: Code,
      title: "Seamless Submissions",
      description: "Submit your projects with GitHub integration and multimedia support"
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Earn certificates and badges for your hackathon participation"
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Discover trending technologies and project inspiration"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Why Choose</span> SynapseHacks?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience hackathons like never before with our comprehensive platform 
            designed for participants, organizers, and judges
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title} 
                className="premium-card group cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-6">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-20 h-20 rounded-2xl object-cover mx-auto"
                    />
                    <div className={`absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${(index + 3) * 0.2}s` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;