import React, { useState } from "react";
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 via-surface to-primary/5 -z-10" />
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0_16px_48px_rgba(17,28,45,0.08)] border border-outline-variant/15 relative z-10">
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

          <div className="space-y-2">
            <label className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary" htmlFor="email">Email</label>
            <div className="relative group">
              <span className="absolute left-0 bottom-3 text-secondary group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">mail</span>
              </span>
              <input
                type="email" id="email" required
                className="w-full pl-8 pb-2 bg-transparent border-0 border-b-2 border-outline-variant/30 focus:ring-0 focus:border-primary transition-colors font-body text-on-surface placeholder:text-outline-variant"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fds.edu.ht"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary" htmlFor="password">Mot de passe</label>
            <div className="relative group">
              <span className="absolute left-0 bottom-3 text-secondary group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">key</span>
              </span>
              <input
                type="password" id="password" required
                className="w-full pl-8 pb-2 bg-transparent border-0 border-b-2 border-outline-variant/30 focus:ring-0 focus:border-primary transition-colors font-body text-on-surface"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" disabled={isLoading}
            className="w-full px-6 py-4 mt-4 bg-primary text-on-primary font-headline font-bold rounded-md hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <><span className="material-symbols-outlined animate-spin text-lg">hourglass_empty</span> Vérification...</>
            ) : (
              <><span className="material-symbols-outlined text-lg">login</span> Connexion</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
