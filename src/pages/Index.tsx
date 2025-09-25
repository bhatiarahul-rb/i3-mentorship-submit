import ProjectSubmissionForm from "@/components/ProjectSubmissionForm";
import { GraduationCap, Users, Trophy, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="border-b border-primary/10 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Team I3 Mentorship
                </h1>
                <p className="text-sm text-muted-foreground">IOSC Project Portal</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Student Projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>Mentorship Program</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-glow">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Submit Your Innovation
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Share your projects with Team I3 Mentorship at IOSC. Get feedback, mentorship, 
            and opportunities to showcase your work to industry experts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-primary/10 hover:border-primary/20 transition-smooth">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Expert Mentorship</h3>
              <p className="text-sm text-muted-foreground">Get guidance from industry professionals and experienced developers</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-primary/10 hover:border-primary/20 transition-smooth">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Recognition</h3>
              <p className="text-sm text-muted-foreground">Outstanding projects get featured and recognition opportunities</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-primary/10 hover:border-primary/20 transition-smooth">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Career Growth</h3>
              <p className="text-sm text-muted-foreground">Build connections and advance your technical career</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <ProjectSubmissionForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 bg-card/30 backdrop-blur-sm py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold bg-gradient-primary bg-clip-text text-transparent">
              Team I3 Mentorship
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Empowering the next generation of innovators at IOSC
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;