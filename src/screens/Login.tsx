import React, { useState } from "react";
import { Lock, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-surface border border-outline-variant p-8 shadow-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary-container p-3 mb-4 rounded-full">
            <Lock className="w-8 h-8 text-on-primary fill-current" />
          </div>
          <h1 className="font-display text-2xl font-black uppercase tracking-tight">Accès Sécurisé</h1>
          <p className="text-sm text-outline mt-1 text-center">Espace réservé à l'administration FDS</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {error && (
            <div className="flex items-center gap-2 bg-error/10 text-error p-3 border border-error/20 text-sm font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="fds-label-caps" htmlFor="email">Email</label>
            <input
              type="email" id="email" required
              className="h-11 border border-outline-variant px-4 focus:outline-none focus:border-primary-container"
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@fds.edu.ht"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="fds-label-caps" htmlFor="password">Mot de passe</label>
            <input
              type="password" id="password" required
              className="h-11 border border-outline-variant px-4 focus:outline-none focus:border-primary-container"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" disabled={isLoading}
            className="fds-button-primary h-11 mt-4 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Connexion"}
          </button>
        </form>
      </div>
    </div>
  );
}
