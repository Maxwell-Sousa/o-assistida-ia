import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Lock, 
  Palette, 
  Bell, 
  Shield, 
  Save, 
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

const Configuracoes = () => {
  const navigate = useNavigate();
  const { username, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  
  // Estados para perfil
  const [profileData, setProfileData] = useState({
    name: "Usuário Administrador",
    email: "admin@exemplo.com",
    bio: "Desenvolvedor apaixonado por acessibilidade e inclusão digital.",
    location: "São Paulo, SP"
  });
  
  // Estados para senha
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  // Estados para notificações
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
    security: true
  });
  
  // Estados para privacidade
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showLocation: true,
    allowMessages: true
  });
  
  // Estados para feedback
  const [feedback, setFeedback] = useState({
    profileSaved: false,
    passwordChanged: false,
    settingsSaved: false
  });

  const handleProfileSave = () => {
    setFeedback({ ...feedback, profileSaved: true });
    setTimeout(() => setFeedback({ ...feedback, profileSaved: false }), 3000);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("A nova senha deve ter pelo menos 6 caracteres!");
      return;
    }
    
    setFeedback({ ...feedback, passwordChanged: true });
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setFeedback({ ...feedback, passwordChanged: false }), 3000);
  };

  const handleSettingsSave = () => {
    setFeedback({ ...feedback, settingsSaved: true });
    setTimeout(() => setFeedback({ ...feedback, settingsSaved: false }), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-gentle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-background/80"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
            <p className="text-muted-foreground">Gerencie sua conta e preferências</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-card/80 backdrop-blur-md border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center anim-pulse-glow">
                    <img src="/Logo.png" alt="Avatar" className="h-8 w-8 object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{profileData.name}</p>
                    <p className="text-sm text-muted-foreground">@{username}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Membro desde</p>
                  <p className="text-sm font-medium">Janeiro 2024</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Último acesso</p>
                  <p className="text-sm font-medium">Hoje às 14:30</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Segurança
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Aparência
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notificações
                </TabsTrigger>
              </TabsList>

              {/* Perfil */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-card/80 backdrop-blur-md border-border/50">
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>
                      Atualize suas informações de perfil
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nome Completo</label>
                        <Input
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">E-mail</label>
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Biografia</label>
                      <Input
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        placeholder="Conte um pouco sobre você..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Localização</label>
                      <Input
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        placeholder="Sua cidade, estado"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button onClick={handleProfileSave} className="bg-gradient-primary hover:bg-gradient-primary/90">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Alterações
                      </Button>
                      {feedback.profileSaved && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Perfil salvo com sucesso!</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Segurança */}
              <TabsContent value="security" className="space-y-6">
                <Card className="bg-card/80 backdrop-blur-md border-border/50">
                  <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>
                      Mantenha sua conta segura com uma senha forte
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Senha Atual</label>
                      <div className="relative">
                        <Input
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          placeholder="Digite sua senha atual"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nova Senha</label>
                        <div className="relative">
                          <Input
                            type={showPasswords.new ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            placeholder="Digite a nova senha"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                          >
                            {showPasswords.new ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Confirmar Nova Senha</label>
                        <div className="relative">
                          <Input
                            type={showPasswords.confirm ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            placeholder="Confirme a nova senha"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                          >
                            {showPasswords.confirm ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button onClick={handlePasswordChange} className="bg-gradient-primary hover:bg-gradient-primary/90">
                        <Lock className="h-4 w-4 mr-2" />
                        Alterar Senha
                      </Button>
                      {feedback.passwordChanged && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Senha alterada com sucesso!</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aparência */}
              <TabsContent value="appearance" className="space-y-6">
                <Card className="bg-card/80 backdrop-blur-md border-border/50">
                  <CardHeader>
                    <CardTitle>Preferências de Tema</CardTitle>
                    <CardDescription>
                      Personalize a aparência da aplicação
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Tema</p>
                          <p className="text-sm text-muted-foreground">Escolha entre tema claro, escuro ou automático</p>
                        </div>
                        <Select value={theme} onValueChange={setTheme}>
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Claro</SelectItem>
                            <SelectItem value="dark">Escuro</SelectItem>
                            <SelectItem value="system">Automático</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button onClick={handleSettingsSave} className="bg-gradient-primary hover:bg-gradient-primary/90">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Preferências
                      </Button>
                      {feedback.settingsSaved && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Preferências salvas!</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notificações */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-card/80 backdrop-blur-md border-border/50">
                  <CardHeader>
                    <CardTitle>Preferências de Notificação</CardTitle>
                    <CardDescription>
                      Controle como e quando receber notificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificações por E-mail</p>
                          <p className="text-sm text-muted-foreground">Receber notificações importantes por e-mail</p>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificações Push</p>
                          <p className="text-sm text-muted-foreground">Notificações em tempo real no navegador</p>
                        </div>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Atualizações do Sistema</p>
                          <p className="text-sm text-muted-foreground">Notificações sobre novas funcionalidades</p>
                        </div>
                        <Switch
                          checked={notifications.updates}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Alertas de Segurança</p>
                          <p className="text-sm text-muted-foreground">Notificações sobre atividades suspeitas</p>
                        </div>
                        <Switch
                          checked={notifications.security}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, security: checked })}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button onClick={handleSettingsSave} className="bg-gradient-primary hover:bg-gradient-primary/90">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Preferências
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
