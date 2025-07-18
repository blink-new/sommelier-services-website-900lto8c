import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { Badge } from './components/ui/badge'
import { Separator } from './components/ui/separator'
import { Wine, Star, Users, Award, Mail, MapPin, Menu, X } from 'lucide-react'
import { blink } from './blink/client'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    establishment: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Préparer le contenu de l'email
      const emailContent = `
        <h2>Nouvelle demande de devis - Wine Maker</h2>
        
        <h3>Informations du client :</h3>
        <ul>
          <li><strong>Nom :</strong> ${formData.name}</li>
          <li><strong>Email :</strong> ${formData.email}</li>
          <li><strong>Téléphone :</strong> ${formData.phone || 'Non renseigné'}</li>
          <li><strong>Établissement :</strong> ${formData.establishment}</li>
        </ul>
        
        <h3>Message :</h3>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><em>Cette demande a été envoyée depuis le site Wine Maker</em></p>
      `

      const textContent = `
Nouvelle demande de devis - Wine Maker

Informations du client :
- Nom : ${formData.name}
- Email : ${formData.email}
- Téléphone : ${formData.phone || 'Non renseigné'}
- Établissement : ${formData.establishment}

Message :
${formData.message}

---
Cette demande a été envoyée depuis le site Wine Maker
      `

      // Envoyer l'email via Blink SDK
      const result = await blink.notifications.email({
        to: 'pierre.louiscontact.pro@gmail.com',
        subject: `Nouvelle demande de devis - ${formData.establishment}`,
        html: emailContent,
        text: textContent,
        replyTo: formData.email
      })

      if (result.success) {
        alert('Merci pour votre demande ! Je vous recontacterai rapidement.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          establishment: '',
          message: ''
        })
      } else {
        throw new Error('Échec de l\'envoi de l\'email')
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      alert('Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer ou me contacter directement à pierre.louiscontact.pro@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Wine className="h-8 w-8 text-primary" />
              <span className="font-serif text-xl font-semibold text-foreground">
                Wine Maker
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('accueil')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Accueil
              </button>

              <button 
                onClick={() => scrollToSection('apropos')}
                className="text-foreground hover:text-primary transition-colors"
              >
                À Propos
              </button>

              <button 
                onClick={() => scrollToSection('contact')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-primary"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-border">
                <button 
                  onClick={() => scrollToSection('accueil')}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left"
                >
                  Accueil
                </button>

                <button 
                  onClick={() => scrollToSection('apropos')}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left"
                >
                  À Propos
                </button>

                <button 
                  onClick={() => scrollToSection('contact')}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-background via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-accent/10 text-accent-foreground border-accent/20">
                  Sommelier Professionnel
                </Badge>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight">
                  Expert en
                  <span className="text-primary block">Cartes des Vins</span>
                  & Accords Mets-Vins
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Sommelier passionné, je propose mes services de rédaction de cartes des vins 
                  personnalisées et de conseil en accords mets-vins pour restaurants et bars.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Demander un Devis
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToSection('apropos')}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  En Savoir Plus
                </Button>
              </div>


            </div>

            <div className="relative animate-slide-up">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="/restaurant-background.jpg" 
                  alt="Ambiance restaurant avec verres de vin"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="space-y-4">
                    <Wine className="h-12 w-12 text-accent" />
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif font-semibold">
                        Expertise Professionnelle
                      </h3>
                      <p className="text-white/90">
                        Création de cartes des vins sur mesure et conseils d'accords pour sublimer votre établissement
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                        <Award className="h-6 w-6 text-accent mx-auto mb-1" />
                        <div className="text-sm font-medium">Certification</div>
                      </div>
                      <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                        <Users className="h-6 w-6 text-accent mx-auto mb-1" />
                        <div className="text-sm font-medium">3 ans d'expérience</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* À Propos Section */}
      <section id="apropos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-accent/10 text-accent-foreground border-accent/20">
                  Mon Parcours
                </Badge>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                  Passion & Expertise au Service de Votre Établissement
                </h2>
              </div>
              
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Sommelier passionné, ma passion pour l'œnologie et la gastronomie m'a naturellement 
                  conduit vers la création de cartes des vins exceptionnelles. Chaque projet est une 
                  opportunité de sublimer l'expérience culinaire de vos clients.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Mon approche combine expertise technique, créativité et sens commercial pour vous 
                  proposer des solutions sur mesure qui valorisent votre établissement et optimisent 
                  vos revenus.
                </p>
              </div>


            </div>

            <div className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-accent" />
                    <span>Certifications & Formation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Certification Sommelier</span>
                    <Badge variant="secondary">2021</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Formation Accords Mets-Vins</span>
                    <Badge variant="secondary">2022</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Spécialisation Vins Français</span>
                    <Badge variant="secondary">2023</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-accent" />
                    <span>Spécialisations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Spiritueux</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Zythologie</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[80%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Accords Mets-Vins</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[98%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>





      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Contact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Discutons de Votre Projet
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Contactez-moi pour une consultation gratuite et découvrons ensemble comment 
              sublimer votre carte des vins
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">pierre.louiscontact.pro@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">Zone d'intervention</h3>
                    <p className="text-muted-foreground">Bretagne • Déplacements possibles</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Pourquoi me choisir ?</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Expertise en sommellerie professionnelle</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Approche personnalisée selon votre établissement</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Optimisation des marges et rentabilité</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Suivi et accompagnement continu</span>
                  </li>
                </ul>
              </div>
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Demande de Devis Gratuit</CardTitle>
                <CardDescription>
                  Remplissez ce formulaire et je vous recontacterai dans les 24h
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Nom *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Téléphone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="establishment" className="text-sm font-medium text-foreground">
                        Établissement *
                      </label>
                      <Input
                        id="establishment"
                        name="establishment"
                        value={formData.establishment}
                        onChange={handleInputChange}
                        required
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>



                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Décrivez votre projet, vos besoins, votre type d'établissement..."
                      className="border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma Demande'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Wine className="h-6 w-6 text-accent" />
                <span className="font-serif text-lg font-semibold">Wine Maker</span>
              </div>
              <p className="text-background/80 text-sm">
                Expert en création de cartes des vins et accords mets-vins pour restaurants et bars. 
                Passion et expertise au service de votre excellence culinaire.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-accent">Services</h3>
              <ul className="space-y-2 text-sm text-background/80">
                <li>Rédaction de cartes des vins</li>
                <li>Accords mets-vins</li>
                <li>Consultation & audit</li>
                <li>Audit de cave</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-accent">Contact</h3>
              <div className="space-y-2 text-sm text-background/80">
                <p>pierre.louiscontact.pro@gmail.com</p>
                <p>Bretagne</p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-background/20" />

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-background/60">
              © 2024 Wine Maker. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm text-background/60">
              <button className="hover:text-accent transition-colors">Mentions légales</button>
              <button className="hover:text-accent transition-colors">Politique de confidentialité</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App