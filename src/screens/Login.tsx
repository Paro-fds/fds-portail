import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await fetch("/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!res.ok) {
        throw new Error("Identifiants incorrects");
      }

      const data = await res.json();
      login(data.access_token);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 via-surface to-primary/5 -z-10" />
      <Card className="w-full max-w-md p-8 md:p-12 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-primary/10 p-4 mb-6 rounded-full">
            <span className="material-symbols-outlined text-4xl text-primary">lock</span>
          </div>
          <h1 className="font-headline text-3xl font-extrabold uppercase tracking-tight text-on-surface">Accès Sécurisé</h1>
          <p className="font-body text-sm text-secondary mt-2 text-center">Espace réservé à l'administration FDS</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-8">
          {error && (
            <div className="flex items-center gap-3 bg-error/10 text-error p-4 rounded-md border-l-4 border-error text-sm font-body">
              <span className="material-symbols-outlined shrink-0 text-lg">error</span>
              {error}
            </div>
          )}

          <Input 
            label="Email" id="email" type="email" required placeholder="admin@fds.edu.ht" icon="mail"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />

          <Input 
            label="Mot de passe" id="password" type="password" required icon="key"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />

          <Button 
            type="submit" disabled={isLoading} fullWidth className="mt-4"
            icon={isLoading ? "hourglass_empty" : "login"}
          >
            {isLoading ? "Vérification..." : "Connexion"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
