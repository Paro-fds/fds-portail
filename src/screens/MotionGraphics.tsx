/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PROGRAMS } from "../constants";

// Structure du storyboard pour les 10 scènes du script
interface Scene {
  id: number;
  title: string;
  duration: number; // durée en secondes
  subtitle: string;
  voiceText: string;
  onScreenText: string;
}

const STORYBOARD: Scene[] = [
  {
    id: 1,
    title: "Le Problème",
    duration: 15,
    subtitle: "Chaque année, des centaines de futurs étudiants souhaitent intégrer la Faculté des Sciences de l’Université d’État d’Haïti. Pourtant, trouver des informations fiables sur les admissions reste un véritable défi.",
    voiceText: "Chaque année, des centaines de futurs étudiants souhaitent intégrer la Faculté des Sciences de l’Université d’État d’Haïti. Pourtant, trouver des informations fiables sur les admissions reste un véritable défi.",
    onScreenText: "S’inscrire à la FDS ne devrait pas être compliqué."
  },
  {
    id: 2,
    title: "Difficultés Actuelles",
    duration: 13,
    subtitle: "Aujourd’hui, les candidats doivent souvent se déplacer physiquement, dépendre du bouche-à-oreille ou attendre des réponses incertaines pour déposer leur dossier.",
    voiceText: "Aujourd’hui, les candidats doivent souvent se déplacer physiquement, dépendre du bouche-à-oreille ou attendre des réponses incertaines pour déposer leur dossier.",
    onScreenText: "Un processus lent, complexe et inaccessible."
  },
  {
    id: 3,
    title: "La Solution",
    duration: 10,
    subtitle: "Pour répondre à cette problématique, nous avons conçu FDS Portail : une plateforme web moderne permettant aux futurs étudiants de s’informer, postuler et suivre leur dossier entièrement en ligne.",
    voiceText: "Pour répondre à cette problématique, nous avons conçu FDS Portail : une plateforme web moderne permettant aux futurs étudiants de s’informer, postuler et suivre leur dossier entièrement en ligne.",
    onScreenText: "FDS PORTAIL — La plateforme officielle d’admission numérique"
  },
  {
    id: 4,
    title: "Consultation des Cursus",
    duration: 12,
    subtitle: "Depuis leur smartphone, les candidats peuvent consulter les programmes académiques, les prérequis, les dates importantes ainsi que les documents nécessaires.",
    voiceText: "Depuis leur smartphone, les candidats peuvent consulter les programmes académiques, les prérequis, les dates importantes ainsi que les documents nécessaires.",
    onScreenText: "Explorez les programmes disponibles"
  },
  {
    id: 5,
    title: "Candidature en Ligne",
    duration: 15,
    subtitle: "Le candidat peut soumettre sa candidature directement en ligne, téléverser ses documents au format PDF ou image, sans devoir se déplacer au secrétariat.",
    voiceText: "Le candidat peut soumettre sa candidature directement en ligne, téléverser ses documents au format PDF ou image, sans devoir se déplacer au secrétariat.",
    onScreenText: "Postulez en quelques minutes"
  },
  {
    id: 6,
    title: "Génération Référence",
    duration: 10,
    subtitle: "Une fois la candidature envoyée, le système génère automatiquement une référence unique permettant d’identifier le dossier.",
    voiceText: "Une fois la candidature envoyée, le système génère automatiquement une référence unique permettant d’identifier le dossier.",
    onScreenText: "Référence générée automatiquement"
  },
  {
    id: 7,
    title: "Email Automatique",
    duration: 10,
    subtitle: "Le candidat reçoit immédiatement un email de confirmation avec les détails de sa candidature et un accès au suivi du dossier.",
    voiceText: "Le candidat reçoit immédiatement un email de confirmation avec les détails de sa candidature et un accès au suivi du dossier.",
    onScreenText: "Confirmation instantanée par email"
  },
  {
    id: 8,
    title: "Suivi du Dossier",
    duration: 15,
    subtitle: "Grâce au système de suivi, chaque candidat peut consulter l’état de son dossier en temps réel et remplacer rapidement un document rejeté.",
    voiceText: "Grâce au système de suivi, chaque candidat peut consulter l’état de son dossier en temps réel et remplacer rapidement un document rejeté.",
    onScreenText: "Suivez votre dossier en temps réel"
  },
  {
    id: 9,
    title: "Impact National",
    duration: 12,
    subtitle: "FDS Portail réduit les barrières géographiques et rend l’admission universitaire plus accessible aux étudiants partout à travers le pays.",
    voiceText: "FDS Portail réduit les barrières géographiques et rend l’admission universitaire plus accessible aux étudiants partout à travers le pays.",
    onScreenText: "Accessible partout en Haïti"
  },
  {
    id: 10,
    title: "Conclusion Finale",
    duration: 13,
    subtitle: "FDS Portail, c’est une nouvelle manière d’accéder à l’enseignement supérieur : plus simple, plus rapide et plus moderne.",
    voiceText: "FDS Portail, c’est une nouvelle manière d’accéder à l’enseignement supérieur : plus simple, plus rapide et plus moderne.",
    onScreenText: "FDS PORTAIL — Simple. Rapide. Moderne."
  }
];

// Villes pour la carte d'Haïti (Scène 9)
interface CityNode {
  name: string;
  x: number;
  y: number;
}

const HAITI_CITIES: CityNode[] = [
  { name: "Port-au-Prince (FDS)", x: 0.65, y: 0.60 },
  { name: "Cap-Haïtien", x: 0.60, y: 0.15 },
  { name: "Gonaïves", x: 0.50, y: 0.35 },
  { name: "Les Cayes", x: 0.20, y: 0.80 },
  { name: "Jacmel", x: 0.63, y: 0.75 },
  { name: "Jérémie", x: 0.10, y: 0.60 },
  { name: "Hinche", x: 0.72, y: 0.38 },
  { name: "Port-de-Paix", x: 0.42, y: 0.12 }
];

export default function MotionGraphics() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // États de lecture de la présentation
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [captureMode, setCaptureMode] = useState(false);
  const [useVoice, setUseVoice] = useState(true);
  const [voiceRate, setVoiceRate] = useState(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");

  // Références d'animation
  const requestRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const sceneElapsedTimeRef = useRef<number>(0);

  // Charger les voix système
  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        const frVoices = voices.filter(v => v.lang.toLowerCase().includes("fr"));
        setAvailableVoices(frVoices.length > 0 ? frVoices : voices);

        if (frVoices.length > 0) {
          const defaultVoice = frVoices.find(v => v.name.includes("Google") || v.name.includes("Hortense") || v.name.includes("Julie")) || frVoices[0];
          setSelectedVoiceName(defaultVoice.name);
        }
      }
    };

    loadVoices();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCaptureMode(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      stopPresentation();
    };
  }, []);

  // Déclencher la parole de synthèse à chaque nouvelle scène
  useEffect(() => {
    if (isPlaying) {
      triggerSceneVoice(currentSceneIdx);
    }
  }, [currentSceneIdx, isPlaying]);

  // Démarrer la présentation
  const startPresentation = () => {
    setIsPlaying(true);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      const activeScene = STORYBOARD[currentSceneIdx];
      sceneElapsedTimeRef.current += 0.1;
      const progress = (sceneElapsedTimeRef.current / activeScene.duration) * 100;

      if (progress >= 100) {
        if (currentSceneIdx < STORYBOARD.length - 1) {
          sceneElapsedTimeRef.current = 0;
          setCurrentSceneIdx(prev => prev + 1);
          setSceneProgress(0);
        } else {
          stopPresentation();
          setCurrentSceneIdx(0);
          sceneElapsedTimeRef.current = 0;
          setSceneProgress(0);
        }
      } else {
        setSceneProgress(progress);
      }
    }, 100);
  };

  // Suspendre
  const pausePresentation = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  };

  // Réinitialiser
  const stopPresentation = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    sceneElapsedTimeRef.current = 0;
    setSceneProgress(0);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // Synthèse vocale
  const triggerSceneVoice = (sceneIdx: number) => {
    if (!useVoice || typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const scene = STORYBOARD[sceneIdx];
    const utterance = new SpeechSynthesisUtterance(scene.voiceText);
    utterance.lang = "fr-FR";
    utterance.rate = voiceRate;

    const voice = availableVoices.find(v => v.name === selectedVoiceName);
    if (voice) {
      utterance.voice = voice;
    }
    window.speechSynthesis.speak(utterance);
  };

  // Sauter à une scène précise
  const jumpToScene = (idx: number) => {
    stopPresentation();
    setCurrentSceneIdx(idx);
    sceneElapsedTimeRef.current = 0;
    setSceneProgress(0);
    setTimeout(() => {
      startPresentation();
    }, 50);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pausePresentation();
    } else {
      if (useVoice && window.speechSynthesis && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        // Relancer le timer
        timerRef.current = window.setInterval(() => {
          const activeScene = STORYBOARD[currentSceneIdx];
          sceneElapsedTimeRef.current += 0.1;
          const progress = (sceneElapsedTimeRef.current / activeScene.duration) * 100;
          if (progress >= 100) {
            if (currentSceneIdx < STORYBOARD.length - 1) {
              sceneElapsedTimeRef.current = 0;
              setCurrentSceneIdx(prev => prev + 1);
              setSceneProgress(0);
            } else {
              stopPresentation();
              setCurrentSceneIdx(0);
              sceneElapsedTimeRef.current = 0;
              setSceneProgress(0);
            }
          } else {
            setSceneProgress(progress);
          }
        }, 100);
      } else {
        startPresentation();
      }
    }
  };

  const handleVoiceRateChange = (newRate: number) => {
    setVoiceRate(newRate);
    if (isPlaying) {
      setTimeout(() => triggerSceneVoice(currentSceneIdx), 50);
    }
  };

  // MOTEUR DE DESSIN CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Fonction utilitaire pour dessiner des rectangles arrondis
    const drawRoundRect = (
      cContext: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
      fillColor: string,
      strokeColor?: string,
      strokeWidth?: number
    ) => {
      cContext.beginPath();
      cContext.moveTo(x + r, y);
      cContext.arcTo(x + w, y, x + w, y + h, r);
      cContext.arcTo(x + w, y + h, x, y + h, r);
      cContext.arcTo(x, y + h, x, y, r);
      cContext.arcTo(x, y, x + w, y, r);
      cContext.closePath();
      cContext.fillStyle = fillColor;
      cContext.fill();
      if (strokeColor) {
        cContext.strokeStyle = strokeColor;
        cContext.lineWidth = strokeWidth || 1;
        cContext.stroke();
      }
    };

    // Dessiner un curseur de souris
    const drawCursor = (cContext: CanvasRenderingContext2D, x: number, y: number) => {
      cContext.save();
      cContext.fillStyle = "#ffffff";
      cContext.strokeStyle = "#000000";
      cContext.lineWidth = 1.5;
      cContext.shadowBlur = 4;
      cContext.shadowColor = "rgba(0, 0, 0, 0.4)";
      cContext.beginPath();
      cContext.moveTo(x, y);
      cContext.lineTo(x + 10, y + 15);
      cContext.lineTo(x + 5, y + 16);
      cContext.lineTo(x + 9, y + 24);
      cContext.lineTo(x + 6, y + 25);
      cContext.lineTo(x + 2, y + 17);
      cContext.lineTo(x, y + 20);
      cContext.closePath();
      cContext.fill();
      cContext.stroke();
      cContext.restore();
    };

    // Dessiner une icône de document
    const drawDocIcon = (cContext: CanvasRenderingContext2D, x: number, y: number, text: string) => {
      drawRoundRect(cContext, x, y, 40, 50, 4, "#ffdad6", "#ba1a1a", 1.5);
      // Pliure de page
      cContext.beginPath();
      cContext.moveTo(x + 30, y);
      cContext.lineTo(x + 40, y + 10);
      cContext.lineTo(x + 30, y + 10);
      cContext.closePath();
      cContext.fillStyle = "#ba1a1a";
      cContext.fill();

      // Texte PDF
      cContext.font = 'bold 9px "Inter", sans-serif';
      cContext.fillStyle = "#ba1a1a";
      cContext.textAlign = "center";
      cContext.fillText(text, x + 20, y + 38);
    };

    let frame = 0;
    const animate = () => {
      frame++;

      // Fond bleu foncé premium
      ctx.fillStyle = "#0c101c";
      ctx.fillRect(0, 0, width, height);

      // Grille technologique en tâche de fond
      ctx.strokeStyle = "rgba(81, 95, 116, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Dessiner des formes géométriques décoratives en fond
      ctx.fillStyle = "rgba(0, 86, 210, 0.02)";
      ctx.beginPath();
      ctx.arc(width * 0.1, height * 0.2, 200 + Math.sin(frame * 0.01) * 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(0, 81, 74, 0.02)";
      ctx.beginPath();
      ctx.arc(width * 0.9, height * 0.8, 250 + Math.cos(frame * 0.01) * 40, 0, Math.PI * 2);
      ctx.fill();

      // Évaluer la scène en cours
      const currentScene = STORYBOARD[currentSceneIdx];
      const elapsed = sceneElapsedTimeRef.current;

      // ==========================================
      // SCÈNES RENDU GRAPHISME
      // ==========================================
      
      if (currentScene.id === 1) {
        // --- SCÈNE 1 : LE PROBLÈME ---
        // Dessiner un cadre de smartphone au centre
        const phoneW = 280;
        const phoneH = 500;
        const phoneX = width * 0.5 - phoneW * 0.5;
        const phoneY = height * 0.4 - phoneH * 0.5;
        
        drawRoundRect(ctx, phoneX, phoneY, phoneW, phoneH, 24, "#161c2a", "rgba(255,255,255,0.15)", 3);
        // Haut-parleur du haut
        drawRoundRect(ctx, phoneX + phoneW * 0.5 - 40, phoneY + 12, 80, 6, 3, "#263143");

        // Écran interne du smartphone
        const screenX = phoneX + 10;
        const screenY = phoneY + 30;
        const screenW = phoneW - 20;
        const screenH = phoneH - 45;
        drawRoundRect(ctx, screenX, screenY, screenW, screenH, 16, "#0a0c14");

        // Barre de recherche Google simulée
        const barY = screenY + 40;
        drawRoundRect(ctx, screenX + 15, barY, screenW - 30, 36, 18, "#263143", "rgba(255,255,255,0.05)");

        // Logo Google simulé en couleur simplifiée
        ctx.font = 'bold 13px "Manrope", sans-serif';
        ctx.fillStyle = "#ccd8ff";
        ctx.textAlign = "left";
        ctx.fillText("G", screenX + 30, barY + 22);

        // Simulation de saisie
        const searchQuery = "FDS Haïti inscription";
        const charsToShow = Math.floor(Math.min(elapsed * 10, searchQuery.length));
        ctx.font = '11px "Inter", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.fillText(searchQuery.slice(0, charsToShow) + (frame % 20 < 10 ? "|" : ""), screenX + 50, barY + 22);

        // Résultats de recherche confus (apparaissent après 2 secondes)
        if (elapsed > 2.5) {
          const resY = barY + 60;
          // Résultat 1 : Liens brisés/Vieux site
          drawRoundRect(ctx, screenX + 15, resY, screenW - 30, 80, 8, "rgba(235, 87, 87, 0.1)", "rgba(235, 87, 87, 0.2)");
          ctx.font = 'bold 11px "Inter", sans-serif';
          ctx.fillStyle = "#ff8a8a";
          ctx.fillText("FDS UEH - Inscriptions 2018...", screenX + 25, resY + 20);
          ctx.font = '9px "Inter", sans-serif';
          ctx.fillStyle = "#b9c7df";
          ctx.fillText("Page introuvable ou obsolète.", screenX + 25, resY + 38);
          ctx.fillText("http://fds.ueh.edu.ht/admission-old...", screenX + 25, resY + 54);

          // Résultat 2 : Groupe WhatsApp chaotique
          if (elapsed > 4.5) {
            const resY2 = resY + 95;
            drawRoundRect(ctx, screenX + 15, resY2, screenW - 30, 80, 8, "rgba(39, 174, 96, 0.1)", "rgba(39, 174, 96, 0.2)");
            ctx.font = 'bold 11px "Inter", sans-serif';
            ctx.fillStyle = "#55efc4";
            ctx.fillText("💬 WhatsApp Admission Info", screenX + 25, resY2 + 20);
            ctx.font = '9px "Inter", sans-serif';
            ctx.fillStyle = "#b9c7df";
            ctx.fillText("Lien du groupe partagé par un ami...", screenX + 25, resY2 + 38);
            ctx.fillText("Plus de 500 messages non vérifiés.", screenX + 25, resY2 + 54);
          }

          // Point d'interrogation géant clignotant représentant le doute
          if (elapsed > 7) {
            ctx.font = 'bold 70px "Manrope", sans-serif';
            ctx.fillStyle = "rgba(186, 26, 26, 0.15)";
            ctx.textAlign = "center";
            ctx.fillText("?", screenX + screenW * 0.5, screenY + screenH * 0.75 + Math.sin(frame * 0.1) * 10);
          }
        }

      } else if (currentScene.id === 2) {
        // --- SCÈNE 2 : LES DIFFICULTÉS ACTUELLES ---
        // Liste des problèmes à gauche
        const listX = width * 0.15;
        const listY = height * 0.25;
        ctx.textAlign = "left";

        const points = [
          { text: "❌ Informations non officielles", delay: 1.0 },
          { text: "❌ Déplacements obligatoires face à l’insécurité", delay: 3.0 },
          { text: "❌ Dossiers papier facilement égarés", delay: 5.0 },
          { text: "❌ Aucun suivi de l’état des candidatures", delay: 7.0 }
        ];

        points.forEach((pt, i) => {
          if (elapsed > pt.delay) {
            ctx.font = 'bold 18px "Manrope", sans-serif';
            ctx.fillStyle = "#ffdad6";
            ctx.fillText(pt.text, listX, listY + i * 50);

            // Soulignement rouge léger sous le texte
            ctx.fillStyle = "rgba(186, 26, 26, 0.3)";
            ctx.fillRect(listX, listY + i * 50 + 8, 300, 2);
          }
        });

        // À droite : Animation d'un voyage vers la FDS
        if (elapsed > 2.0) {
          const mapX = width * 0.65;
          const mapY = height * 0.45;
          // Ville de départ (Province)
          ctx.beginPath();
          ctx.arc(mapX - 120, mapY + 60, 10, 0, Math.PI * 2);
          ctx.fillStyle = "#ff8a8a";
          ctx.fill();
          ctx.font = 'bold 11px "Inter", sans-serif';
          ctx.fillStyle = "#b9c7df";
          ctx.textAlign = "center";
          ctx.fillText("Jacmel", mapX - 120, mapY + 85);

          // FDS Port-au-Prince
          ctx.beginPath();
          ctx.arc(mapX + 120, mapY - 60, 12, 0, Math.PI * 2);
          ctx.fillStyle = "#ccd8ff";
          ctx.fill();
          ctx.fillText("FDS (Port-au-Prince)", mapX + 120, mapY - 85);

          // Route sinueuse
          ctx.beginPath();
          ctx.moveTo(mapX - 120, mapY + 60);
          ctx.bezierCurveTo(mapX - 60, mapY - 20, mapX + 20, mapY + 100, mapX + 120, mapY - 60);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.setLineDash([5, 5]);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.setLineDash([]); // reset

          // Icône de voiture/bus voyageant
          const t = Math.min((elapsed - 2) / 6, 1.0); // dure 6 secondes
          // Position sur la courbe Bézier
          const p0 = { x: mapX - 120, y: mapY + 60 };
          const p1 = { x: mapX - 60, y: mapY - 20 };
          const p2 = { x: mapX + 20, y: mapY + 100 };
          const p3 = { x: mapX + 120, y: mapY - 60 };

          const bx = Math.pow(1 - t, 3) * p0.x + 3 * Math.pow(1 - t, 2) * t * p1.x + 3 * (1 - t) * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x;
          const by = Math.pow(1 - t, 3) * p0.y + 3 * Math.pow(1 - t, 2) * t * p1.y + 3 * (1 - t) * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y;

          // Dessiner le bus/point rouge voyageur
          ctx.beginPath();
          ctx.arc(bx, by, 8, 0, Math.PI * 2);
          ctx.fillStyle = "#ba1a1a";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#ba1a1a";
          ctx.fill();
          ctx.shadowBlur = 0;

          // Message de fatigue
          if (t > 0.1 && t < 0.9) {
            ctx.font = 'italic 10px "Inter", sans-serif';
            ctx.fillStyle = "#ffdad6";
            ctx.fillText("Déplacement coûteux & risqué ⚠️", bx, by - 16);
          }
        }

      } else if (currentScene.id === 3) {
        // --- SCÈNE 3 : INTRODUCTION DE LA SOLUTION (Logo FDS Portail) ---
        const cx = width * 0.5;
        const cy = height * 0.45;

        // Effet de halo radial géant en arrière-plan
        const pulse = 120 + 20 * Math.sin(frame * 0.05);
        const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, pulse);
        grad.addColorStop(0, "rgba(0, 86, 210, 0.15)");
        grad.addColorStop(1, "rgba(12, 16, 28, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
        ctx.fill();

        // Dessiner le logo officiel (Grand Écu géométrique)
        ctx.save();
        ctx.translate(cx, cy - 30);
        ctx.scale(1.2, 1.2);

        // Bouclier hexagonal
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
          const lx = Math.cos(angle) * 70;
          const ly = Math.sin(angle) * 70;
          if (i === 0) ctx.moveTo(lx, ly);
          else ctx.lineTo(lx, ly);
        }
        ctx.closePath();
        ctx.strokeStyle = "#ccd8ff";
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#0056d2";
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Lettre grecque Sigma
        ctx.font = 'bold 36px "Manrope", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Σ", 0, 0);
        ctx.restore();

        // Texte en dessous
        ctx.font = 'bold 36px "Manrope", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("FDS PORTAIL", cx, cy + 90);

        ctx.font = '15px "Inter", sans-serif';
        ctx.fillStyle = "#55efc4"; // Engineering green
        ctx.fillText("La Plateforme Officielle d'Admission", cx, cy + 125);

      } else if (currentScene.id === 4) {
        // --- SCÈNE 4 : CONSULTATION DES CURSUS ---
        // Simuler un navigateur Web sur PC
        const navW = Math.min(width * 0.7, 850);
        const navH = 400;
        const navX = width * 0.5 - navW * 0.5;
        const navY = height * 0.45 - navH * 0.5;

        // Fenêtre navigateur
        drawRoundRect(ctx, navX, navY, navW, navH, 12, "#111c2d", "rgba(255,255,255,0.08)", 1.5);
        // Barre supérieure du navigateur
        drawRoundRect(ctx, navX, navY, navW, 30, 12, "#1d2736");
        // Boutons rouges/jaunes/verts style Mac
        ctx.fillStyle = "#ff5f56";
        ctx.beginPath(); ctx.arc(navX + 15, navY + 15, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffbd2e";
        ctx.beginPath(); ctx.arc(navX + 30, navY + 15, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#27c93f";
        ctx.beginPath(); ctx.arc(navX + 45, navY + 15, 5, 0, Math.PI * 2); ctx.fill();

        // URL barre
        drawRoundRect(ctx, navX + 70, navY + 6, navW - 100, 18, 9, "#0c101c");
        ctx.font = '9px "Inter", sans-serif';
        ctx.fillStyle = "#b9c7df";
        ctx.textAlign = "left";
        ctx.fillText("https://admission.fds.ueh.edu.ht/programmes", navX + 85, navY + 18);

        // Contenu du catalogue (Grille de programmes)
        // 4 programmes s'affichent
        const progs = [
          { name: "MPC (Tronc Commun)", dur: "2 ans", id: "mpc" },
          { name: "Génie Civil", dur: "3 ans", id: "gcv" },
          { name: "Génie Électronique", dur: "3 ans", id: "gel" },
          { name: "Génie Électromécanique", dur: "3 ans", id: "gem" }
        ];

        const cardW = (navW - 60) / 2;
        const cardH = 130;
        
        progs.forEach((p, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          const cx = navX + 20 + col * (cardW + 20);
          const cy = navY + 60 + row * (cardH + 20);

          // Animation de survol successif en fonction du temps
          const hoverIdx = Math.floor(elapsed * 0.3) % 4; // change toutes les 3.3s
          const isHovered = idx === hoverIdx;

          drawRoundRect(
            ctx,
            cx,
            cy,
            cardW,
            cardH,
            8,
            isHovered ? "rgba(0, 86, 210, 0.15)" : "#0c101c",
            isHovered ? "#0056d2" : "rgba(255,255,255,0.05)",
            isHovered ? 1.5 : 1
          );

          // Icône d'étude
          ctx.beginPath();
          ctx.arc(cx + 25, cy + 30, 12, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? "#0056d2" : "#263143";
          ctx.fill();
          ctx.font = '10px "Inter", sans-serif';
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.fillText("🎓", cx + 25, cy + 33);

          // Nom du Cursus
          ctx.font = 'bold 12px "Manrope", sans-serif';
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "left";
          ctx.fillText(p.name, cx + 50, cy + 34);

          // Infos
          ctx.font = '10px "Inter", sans-serif';
          ctx.fillStyle = "#b9c7df";
          ctx.fillText(`Durée : ${p.dur}`, cx + 20, cy + 70);
          ctx.fillText("Admission sur concours national.", cx + 20, cy + 90);

          // Lien cliquable simulé
          ctx.font = 'bold 10px "Inter", sans-serif';
          ctx.fillStyle = isHovered ? "#55efc4" : "#0056d2";
          ctx.fillText("Consulter les détails →", cx + 20, cy + 112);

          // Curseur de souris se déplaçant vers la carte survolée
          if (isHovered) {
            const cursorX = cx + cardW * 0.8 + Math.sin(frame * 0.05) * 5;
            const cursorY = cy + cardH * 0.8 + Math.cos(frame * 0.05) * 5;
            drawCursor(ctx, cursorX, cursorY);
          }
        });

      } else if (currentScene.id === 5) {
        // --- SCÈNE 5 : CANDIDATURE EN LIGNE (Formulaire) ---
        const navW = Math.min(width * 0.7, 850);
        const navH = 400;
        const navX = width * 0.5 - navW * 0.5;
        const navY = height * 0.45 - navH * 0.5;

        // Fenêtre navigateur
        drawRoundRect(ctx, navX, navY, navW, navH, 12, "#111c2d", "rgba(255,255,255,0.08)", 1.5);
        // Barre supérieure
        drawRoundRect(ctx, navX, navY, navW, 30, 12, "#1d2736");
        // Boutons
        ctx.fillStyle = "#ff5f56";
        ctx.beginPath(); ctx.arc(navX + 15, navY + 15, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffbd2e";
        ctx.beginPath(); ctx.arc(navX + 30, navY + 15, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#27c93f";
        ctx.beginPath(); ctx.arc(navX + 45, navY + 15, 5, 0, Math.PI * 2); ctx.fill();

        // Formulaire split : gauche inputs, droite upload
        const formX = navX + 30;
        const formY = navY + 60;
        const colW = (navW - 90) / 2;

        // Titre du formulaire
        ctx.font = 'bold 15px "Manrope", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";
        ctx.fillText("Dossier d'Inscription en Ligne", formX, formY + 20);

        // Champs de texte simulés
        const fields = [
          { label: "Nom de famille", value: "Louismy", startT: 1.0, endT: 3.5 },
          { label: "Prénom", value: "Jean", startT: 3.5, endT: 6.0 },
          { label: "Adresse e-mail", value: "louismy@gmail.com", startT: 6.0, endT: 9.5 }
        ];

        fields.forEach((f, i) => {
          const fY = formY + 50 + i * 70;
          ctx.font = '10px "Inter", sans-serif';
          ctx.fillStyle = "#b9c7df";
          ctx.fillText(f.label, formX, fY + 15);

          // Box input
          drawRoundRect(ctx, formX, fY + 25, colW, 32, 4, "#0c101c", "rgba(255,255,255,0.05)");

          // Saisie progressive
          if (elapsed > f.startT) {
            const queryLen = f.value.length;
            const written = Math.floor(Math.min((elapsed - f.startT) * 7, queryLen));
            ctx.font = 'bold 11px "Inter", sans-serif';
            ctx.fillStyle = "#ffffff";
            ctx.fillText(f.value.slice(0, written), formX + 10, fY + 45);
          }
        });

        // Droite : Zone d'upload
        const upX = navX + navW - colW - 30;
        const upY = formY + 40;
        
        // Zone drag and drop
        const isUploaded = elapsed > 10.0;
        drawRoundRect(
          ctx,
          upX,
          upY,
          colW,
          180,
          8,
          isUploaded ? "rgba(0, 81, 74, 0.05)" : "rgba(255,255,255,0.01)",
          isUploaded ? "#00514a" : "rgba(255,255,255,0.1)",
          isUploaded ? 1.5 : 1
        );

        if (!isUploaded) {
          ctx.font = '11px "Inter", sans-serif';
          ctx.fillStyle = "#b9c7df";
          ctx.textAlign = "center";
          ctx.fillText("Glisser-déposer le diplôme du Baccalauréat (PDF)", upX + colW * 0.5, upY + 70);
          ctx.font = '9px "Inter", sans-serif';
          ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
          ctx.fillText("(Taille max : 5 Mo)", upX + colW * 0.5, upY + 90);

          // Flèche animée
          ctx.font = '24px "Inter", sans-serif';
          ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
          ctx.fillText("📤", upX + colW * 0.5, upY + 130 + Math.sin(frame * 0.08) * 5);
        } else {
          // Document téléversé avec succès
          drawDocIcon(ctx, upX + colW * 0.5 - 20, upY + 40, "BAC");
          ctx.font = 'bold 11px "Inter", sans-serif';
          ctx.fillStyle = "#55efc4";
          ctx.textAlign = "center";
          ctx.fillText("Diplôme Bac.pdf", upX + colW * 0.5, upY + 115);
          ctx.font = '9px "Inter", sans-serif';
          ctx.fillStyle = "#b9c7df";
          ctx.fillText("Téléversé avec succès ! ✅", upX + colW * 0.5, upY + 135);
        }

        // Bouton de soumission
        const btnY = formY + 260;
        const isHoveredSubmit = elapsed > 12.0;
        const hasSubmitted = elapsed > 13.5;
        
        drawRoundRect(
          ctx,
          formX,
          btnY,
          colW,
          40,
          6,
          hasSubmitted ? "#00514a" : (isHoveredSubmit ? "#0056d2" : "#0040a1")
        );

        ctx.font = 'bold 12px "Manrope", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(
          hasSubmitted ? "Soumission réussie ! ✔️" : "Soumettre la candidature",
          formX + colW * 0.5,
          btnY + 24
        );

        // Curseur de souris qui clique sur Soumettre
        if (elapsed > 11.5 && !hasSubmitted) {
          const curT = Math.min((elapsed - 11.5) / 2, 1.0);
          const cxCursor = upX + colW * 0.5 + (formX + colW * 0.5 - (upX + colW * 0.5)) * curT;
          const cyCursor = upY + 120 + (btnY + 20 - (upY + 120)) * curT;
          drawCursor(ctx, cxCursor, cyCursor);
        }

      } else if (currentScene.id === 6) {
        // --- SCÈNE 6 : GÉNÉRATION DE LA RÉFÉRENCE ---
        const cx = width * 0.5;
        const cy = height * 0.45;

        // Cercle de chargement qui se transforme en coche de succès
        const isDone = elapsed > 3.0;

        if (!isDone) {
          // Loader tournant
          ctx.save();
          ctx.translate(cx, cy - 40);
          ctx.rotate(frame * 0.1);
          ctx.beginPath();
          ctx.arc(0, 0, 30, 0, Math.PI * 1.5);
          ctx.strokeStyle = "#0056d2";
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.restore();
          
          ctx.font = 'bold 14px "Inter", sans-serif';
          ctx.fillStyle = "#b9c7df";
          ctx.textAlign = "center";
          ctx.fillText("Génération de la référence unique...", cx, cy + 30);
        } else {
          // Succès + Carte de Référence
          const cardW = 380;
          const cardH = 220;
          const cardX = cx - cardW * 0.5;
          const cardY = cy - cardH * 0.5 - 30;

          // Carte lumineuse
          drawRoundRect(ctx, cardX, cardY, cardW, cardH, 16, "#161c2a", "#00514a", 2);
          
          // Ombre néon verte
          ctx.shadowBlur = 25;
          ctx.shadowColor = "rgba(0, 81, 74, 0.4)";
          drawRoundRect(ctx, cardX + 10, cardY + 10, cardW - 20, cardH - 20, 12, "#0c101c");
          ctx.shadowBlur = 0; // reset

          // Icône de validation
          ctx.beginPath();
          ctx.arc(cx, cardY + 50, 20, 0, Math.PI * 2);
          ctx.fillStyle = "#00514a";
          ctx.fill();
          ctx.font = 'bold 18px "Inter", sans-serif';
          ctx.fillStyle = "#55efc4";
          ctx.textAlign = "center";
          ctx.fillText("✓", cx, cardY + 56);

          ctx.font = 'bold 12px "Manrope", sans-serif';
          ctx.fillStyle = "#b9c7df";
          ctx.fillText("CANDIDATURE ENREGISTRÉE", cx, cardY + 95);

          // Numéro de référence
          ctx.font = 'bold 28px "Manrope", sans-serif';
          ctx.fillStyle = "#ffffff";
          // Faire clignoter légèrement pour donner un aspect premium
          const pulseColor = Math.abs(Math.sin(frame * 0.05));
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + 0.2 * pulseColor})`;
          ctx.fillText("CAN-2026-0089", cx, cardY + 140);

          ctx.font = '9px "Inter", sans-serif';
          ctx.fillStyle = "#55efc4";
          ctx.fillText("Conservez précieusement ce code de suivi.", cx, cardY + 175);
        }

      } else if (currentScene.id === 7) {
        // --- SCÈNE 7 : EMAIL DE CONFIRMATION ---
        // Simuler un écran de tablette ou de téléphone recevant un email
        const mailW = Math.min(width * 0.6, 600);
        const mailH = 340;
        const mailX = width * 0.5 - mailW * 0.5;
        const mailY = height * 0.45 - mailH * 0.5;

        // Notification d'application qui glisse du haut au début de la scène (de 0 à 2.5s)
        const slideIn = Math.min(elapsed / 1.5, 1.0);
        const currentMailY = mailY - (1 - slideIn) * 100;

        drawRoundRect(ctx, mailX, currentMailY, mailW, mailH, 12, "#111c2d", "rgba(255,255,255,0.08)", 1.5);
        
        // En-tête Email
        drawRoundRect(ctx, mailX, currentMailY, mailW, 50, 12, "#1d2736");
        ctx.font = 'bold 12px "Manrope", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";
        ctx.fillText("📥 Boîte de réception - louismy@gmail.com", mailX + 20, currentMailY + 30);

        // Contenu du message
        const bodyY = currentMailY + 50;
        
        ctx.font = 'bold 11px "Inter", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.fillText("De : admission@fds.ueh.edu.ht", mailX + 25, bodyY + 35);
        ctx.fillText("Objet : Confirmation de candidature FDS Portail", mailX + 25, bodyY + 55);

        // Ligne séparatrice
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.beginPath();
        ctx.moveTo(mailX + 20, bodyY + 70);
        ctx.lineTo(mailX + mailW - 20, bodyY + 70);
        ctx.stroke();

        // Corps du texte
        ctx.font = '12px "Inter", sans-serif';
        ctx.fillStyle = "#b9c7df";
        ctx.fillText("Bonjour Louismy,", mailX + 25, bodyY + 105);
        
        ctx.font = '11px "Inter", sans-serif';
        ctx.fillText("Votre dossier a bien été reçu et enregistré sous la référence :", mailX + 25, bodyY + 135);

        // Boîte pour la référence
        drawRoundRect(ctx, mailX + 25, bodyY + 155, 180, 36, 4, "#0c101c", "#00514a", 1);
        ctx.font = 'bold 14px "Manrope", sans-serif';
        ctx.fillStyle = "#55efc4";
        ctx.fillText("CAN-2026-0089", mailX + 45, bodyY + 178);

        ctx.font = '10px "Inter", sans-serif';
        ctx.fillStyle = "#b9c7df";
        ctx.fillText("Vous pouvez suivre l'état de votre dossier directement sur la plateforme.", mailX + 25, bodyY + 225);
        ctx.fillText("L'équipe d'admission de la Faculté des Sciences.", mailX + 25, bodyY + 255);

      } else if (currentScene.id === 8) {
        // --- SCÈNE 8 : SUIVI DU DOSSIER ---
        const navW = Math.min(width * 0.7, 850);
        const navH = 400;
        const navX = width * 0.5 - navW * 0.5;
        const navY = height * 0.45 - navH * 0.5;

        // Fenêtre navigateur
        drawRoundRect(ctx, navX, navY, navW, navH, 12, "#111c2d", "rgba(255,255,255,0.08)", 1.5);
        // Barre supérieure
        drawRoundRect(ctx, navX, navY, navW, 30, 12, "#1d2736");
        // Boutons Mac
        ctx.fillStyle = "#ff5f56";
        ctx.beginPath(); ctx.arc(navX + 15, navY + 15, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffbd2e";
        ctx.beginPath(); ctx.arc(navX + 30, navY + 15, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#27c93f";
        ctx.beginPath(); ctx.arc(navX + 45, navY + 15, 5, 0, Math.PI * 2); ctx.fill();

        // Barre d'adresse
        drawRoundRect(ctx, navX + 70, navY + 6, navW - 100, 18, 9, "#0c101c");
        ctx.font = '9px "Inter", sans-serif';
        ctx.fillStyle = "#b9c7df";
        ctx.textAlign = "left";
        ctx.fillText("https://admission.fds.ueh.edu.ht/suivi", navX + 85, navY + 18);

        // Formulaire de saisie de suivi
        const inputX = navX + 40;
        const inputY = navY + 60;
        
        ctx.font = 'bold 15px "Manrope", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Suivi de Candidature UEH - FDS", inputX, inputY + 25);

        // Champ de saisie
        drawRoundRect(ctx, inputX, inputY + 45, 250, 36, 4, "#0c101c", "rgba(255,255,255,0.1)");
        ctx.font = 'bold 13px "Manrope", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.fillText("CAN-2026-0089", inputX + 15, inputY + 68);

        // Bouton Rechercher
        drawRoundRect(ctx, inputX + 270, inputY + 45, 100, 36, 4, "#0040a1");
        ctx.font = 'bold 11px "Inter", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("Rechercher", inputX + 320, inputY + 67);

        // Chronologie des statuts (Timeline)
        if (elapsed > 2.5) {
          const lineY = inputY + 170;
          const startX = inputX + 50;
          const endX = navX + navW - 90;
          const segmentW = (endX - startX) / 2;

          // Dessiner la ligne de fond
          ctx.strokeStyle = "rgba(255,255,255,0.05)";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(startX, lineY);
          ctx.lineTo(endX, lineY);
          ctx.stroke();

          // Dessiner le segment validé
          ctx.strokeStyle = "#00514a";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(startX, lineY);
          // Transition dynamique du statut
          // 0-6s : Soumis et traitement en cours (Jaune)
          // >6s : Décision prise / validé (Vert)
          const isFinalState = elapsed > 7.5;
          ctx.lineTo(startX + (isFinalState ? segmentW * 2 : segmentW), lineY);
          ctx.stroke();

          // Étape 1 : Soumis (Toujours validé)
          ctx.beginPath();
          ctx.arc(startX, lineY, 10, 0, Math.PI * 2);
          ctx.fillStyle = "#00514a";
          ctx.fill();
          ctx.font = 'bold 10px "Inter", sans-serif';
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.fillText("✓", startX, lineY + 4);
          ctx.fillText("Soumis", startX, lineY + 30);

          // Étape 2 : Traitement
          const step2X = startX + segmentW;
          ctx.beginPath();
          ctx.arc(step2X, lineY, 10, 0, Math.PI * 2);
          ctx.fillStyle = isFinalState ? "#00514a" : "#0056d2";
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.fillText(isFinalState ? "✓" : "⏳", step2X, lineY + 4);
          
          ctx.font = 'bold 10px "Inter", sans-serif';
          ctx.fillStyle = isFinalState ? "#b9c7df" : "#ffffff";
          ctx.fillText("Validation Secrétariat", step2X, lineY + 30);

          // Étape 3 : Statut final (Décision)
          const step3X = startX + segmentW * 2;
          ctx.beginPath();
          ctx.arc(step3X, lineY, 10, 0, Math.PI * 2);
          ctx.fillStyle = isFinalState ? "#00514a" : "#263143";
          ctx.fill();
          
          ctx.fillStyle = "#ffffff";
          if (isFinalState) {
            ctx.fillText("✓", step3X, lineY + 4);
          } else {
            ctx.fillText("○", step3X, lineY + 4);
          }
          
          ctx.font = 'bold 10px "Inter", sans-serif';
          ctx.fillStyle = isFinalState ? "#ffffff" : "rgba(255,255,255,0.2)";
          ctx.fillText("Dossier Validé", step3X, lineY + 30);

          // Cartouche de statut texte
          const badgeX = navX + navW - 220;
          const badgeY = inputY + 10;
          
          drawRoundRect(
            ctx,
            badgeX,
            badgeY,
            180,
            50,
            8,
            isFinalState ? "rgba(39, 174, 96, 0.1)" : "rgba(241, 196, 15, 0.1)",
            isFinalState ? "#27ae60" : "#f1c40f",
            1
          );

          ctx.font = 'bold 10px "Inter", sans-serif';
          ctx.fillStyle = isFinalState ? "#27ae60" : "#f1c40f";
          ctx.textAlign = "center";
          ctx.fillText(
            isFinalState ? "🟢 DOSSIER VALIDÉ" : "🟡 EN COURS DE TRAITEMENT",
            badgeX + 90,
            badgeY + 24
          );
          ctx.font = '9px "Inter", sans-serif';
          ctx.fillStyle = "#b9c7df";
          ctx.fillText(
            isFinalState ? "Admis au concours d'entrée !" : "Documents en cours de révision.",
            badgeX + 90,
            badgeY + 40
          );
        }

      } else if (currentScene.id === 9) {
        // --- SCÈNE 9 : IMPACT NATIONAL (Carte d'Haïti) ---
        const mapScale = Math.min(width, height) * 0.75;
        const mapCenterX = width * 0.5;
        const mapCenterY = height * 0.45;

        // Position de Port-au-Prince
        const papNode = HAITI_CITIES.find(c => c.name.includes("Port-au-Prince"))!;
        const papX = mapCenterX + (papNode.x - 0.5) * mapScale;
        const papY = mapCenterY + (papNode.y - 0.5) * mapScale;

        // Phare lumineux central
        ctx.beginPath();
        ctx.arc(papX, papY, 14, 0, Math.PI * 2);
        ctx.fillStyle = "#0056d2";
        ctx.fill();

        const papPulse = 14 + 16 * Math.sin(frame * 0.06);
        ctx.strokeStyle = "rgba(178, 197, 255, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(papX, papY, papPulse, 0, Math.PI * 2);
        ctx.stroke();

        HAITI_CITIES.forEach((city) => {
          if (city.name.includes("Port-au-Prince")) return;

          const cx = mapCenterX + (city.x - 0.5) * mapScale;
          const cy = mapCenterY + (city.y - 0.5) * mapScale;

          // Ville
          ctx.beginPath();
          ctx.arc(cx, cy, 6, 0, Math.PI * 2);
          ctx.fillStyle = "#ccd8ff";
          ctx.fill();

          ctx.font = '10px "Inter", sans-serif';
          ctx.fillStyle = "#b9c7df";
          ctx.textAlign = "center";
          ctx.fillText(city.name, cx, cy - 12);

          // Connexion
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(papX, papY);
          ctx.strokeStyle = "rgba(81, 95, 116, 0.15)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Transit de données
          const slideProgress = (frame * 0.007 + city.x) % 1.0;
          const px = cx + (papX - cx) * slideProgress;
          const py = cy + (papY - cy) * slideProgress;

          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#7fecde";
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#7fecde";
          ctx.fill();
          ctx.shadowBlur = 0;
        });

      } else if (currentScene.id === 10) {
        // --- SCÈNE 10 : CONCLUSION FINALE (Mockup Double) ---
        const cx = width * 0.5;
        const cy = height * 0.4;

        // 1. Mockup Ordinateur (à gauche)
        const lapW = 380;
        const lapH = 220;
        const lapX = cx - lapW - 20;
        const lapY = cy - lapH * 0.5;

        drawRoundRect(ctx, lapX, lapY, lapW, lapH, 10, "#111c2d", "rgba(255,255,255,0.08)", 1.5);
        // Écran interne
        drawRoundRect(ctx, lapX + 8, lapY + 8, lapW - 16, lapH - 24, 6, "#0c101c");
        // Base de l'ordinateur
        drawRoundRect(ctx, lapX - 20, lapY + lapH - 12, lapW + 40, 12, 4, "#1d2736");
        // Pavé tactile
        drawRoundRect(ctx, lapX + lapW * 0.5 - 25, lapY + lapH - 8, 50, 6, 2, "#111c2d");

        // Dessin du logo FDS sur l'écran
        ctx.font = 'bold 15px "Manrope", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("Σ FDS PORTAIL", lapX + lapW * 0.5, lapY + lapH * 0.4);
        ctx.font = '8px "Inter", sans-serif';
        ctx.fillStyle = "#55efc4";
        ctx.fillText("Plateforme Académique UEH", lapX + lapW * 0.5, lapY + lapH * 0.55);

        // 2. Mockup Smartphone (à droite)
        const phW = 120;
        const phH = 230;
        const phX = cx + 40;
        const phY = cy - phH * 0.5;

        drawRoundRect(ctx, phX, phY, phW, phH, 14, "#161c2a", "rgba(255,255,255,0.15)", 2);
        // Écran interne
        drawRoundRect(ctx, phX + 5, phY + 12, phW - 10, phH - 22, 10, "#0c101c");
        // Logo FDS sur le téléphone
        ctx.font = 'bold 9px "Manrope", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Σ FDS", phX + phW * 0.5, phY + phH * 0.4);
        ctx.font = '5px "Inter", sans-serif';
        ctx.fillStyle = "#ccd8ff";
        ctx.fillText("ADMISSION EN LIGNE", phX + phW * 0.5, phY + phH * 0.5);

        // Slogan et conclusion finale sous les mockups
        ctx.font = 'bold 22px "Manrope", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("L'admission universitaire réinventée.", cx, cy + 160);

        ctx.font = 'bold 14px "Inter", sans-serif';
        ctx.fillStyle = "#55efc4";
        ctx.fillText("Simple. Rapide. Moderne.", cx, cy + 195);
      }

      // Prochaine frame
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [currentSceneIdx, isPlaying]);

  return (
    <div className="relative min-h-screen w-full bg-[#0c101c] overflow-hidden text-white flex flex-col justify-between select-none">
      {/* Canvas d'animation */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full z-0 pointer-events-none" />

      {/* En-tête (masqué en mode capture) */}
      {!captureMode && (
        <header className="relative z-10 w-full px-8 py-4 flex items-center justify-between border-b border-white/5 bg-[#0c101c]/60 backdrop-blur-md">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-headline font-extrabold text-lg tracking-wider text-[#dae2ff]">
              FDS PORTAIL
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-xs text-[#b9c7df] hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-md transition-all font-body font-semibold"
            >
              Retour au site
            </Link>
          </div>
        </header>
      )}

      {/* Message en cours d'enregistrement */}
      {captureMode && (
        <div className="absolute top-4 left-4 z-50 pointer-events-none opacity-25 hover:opacity-100 transition-opacity bg-black/50 px-3 py-1.5 rounded text-[10px] font-mono tracking-wider">
          Enregistrement en cours (Appuyez sur Échap pour quitter)
        </div>
      )}

      {/* Titres / Textes à l'écran (Scénario) */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none">
        <div className="max-w-4xl flex flex-col items-center gap-4 mt-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#7fecde] bg-[#00514a]/30 px-3 py-1 rounded-full border border-[#00514a]/40 shadow-sm animate-pulse">
            SCÈNE {STORYBOARD[currentSceneIdx].id} — {STORYBOARD[currentSceneIdx].title}
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg max-w-2xl bg-black/25 px-4 py-2 rounded-md">
            {STORYBOARD[currentSceneIdx].onScreenText}
          </h2>
        </div>
      </div>

      {/* Bandeau de Sous-titres (Prompteur) */}
      <div className="relative z-10 w-full px-6 pb-28 md:pb-8 flex flex-col items-center gap-6">
        <div className="w-full max-w-4xl bg-black/70 border border-white/5 rounded-xl p-6 backdrop-blur-md shadow-2xl text-center min-h-[90px] flex items-center justify-center">
          <p className="font-body text-sm md:text-base text-white font-medium leading-relaxed max-w-3xl select-text">
            {STORYBOARD[currentSceneIdx].subtitle}
          </p>
        </div>

        {/* Barre de progression de la scène en cours */}
        {isPlaying && (
          <div className="w-full max-w-4xl h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#0056d2] to-[#7fecde] transition-all duration-100 ease-linear"
              style={{ width: `${sceneProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Panneau de Contrôle Flottant (masqué en mode capture) */}
      {!captureMode && (
        <div className="fixed bottom-6 right-6 z-20 w-80 bg-[#0c101c]/90 border border-white/10 rounded-xl p-5 backdrop-blur-lg shadow-2xl flex flex-col gap-4 text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="font-headline font-bold text-white text-sm">Contrôle de Démo</span>
            <span className="text-[10px] text-[#b9c7df] font-mono">SCÈNE {currentSceneIdx + 1}/{STORYBOARD.length}</span>
          </div>

          {/* Boutons pour chaque Scène */}
          <div className="grid grid-cols-5 gap-1">
            {STORYBOARD.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => jumpToScene(idx)}
                className={`py-1 rounded font-headline font-bold transition-all ${
                  currentSceneIdx === idx
                    ? "bg-[#0056d2] text-white border border-[#0056d2]"
                    : "bg-white/5 text-[#b9c7df] border border-white/5 hover:bg-white/10"
                }`}
                title={scene.title}
              >
                S{scene.id}
              </button>
            ))}
          </div>

          {/* Boutons principaux */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className={`flex-grow py-2.5 rounded font-headline font-bold flex items-center justify-center gap-2 transition-all ${
                isPlaying 
                  ? "bg-amber-600 text-white hover:bg-amber-500" 
                  : "bg-[#00514a] text-[#7fecde] hover:bg-[#006b62]"
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
              {isPlaying ? "Pause" : "Lancer le Script"}
            </button>
            <button
              onClick={stopPresentation}
              className="px-3 py-2.5 bg-white/5 text-[#b9c7df] border border-white/5 rounded hover:bg-white/10 transition-colors"
              title="Réinitialiser"
            >
              <span className="material-symbols-outlined text-sm">replay</span>
            </button>
          </div>

          {/* Configuration Voix Synthétique */}
          <div className="flex flex-col gap-2 border-t border-white/5 pt-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Voix Off Synthétique</span>
              <input
                type="checkbox"
                checked={useVoice}
                onChange={(e) => {
                  setUseVoice(e.target.checked);
                  if (!e.target.checked && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                  }
                }}
                className="w-4 h-4 accent-[#00514a]"
              />
            </div>

            {useVoice && (
              <>
                {/* Choix de la voix */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-[#b9c7df]">Sélectionner la voix :</label>
                  <select
                    value={selectedVoiceName}
                    onChange={(e) => setSelectedVoiceName(e.target.value)}
                    className="bg-black/40 text-white border border-white/10 rounded px-2 py-1 focus:outline-none"
                  >
                    {availableVoices.map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Vitesse */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px] text-[#b9c7df]">
                    <span>Vitesse :</span>
                    <span>{voiceRate}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.5"
                    step="0.1"
                    value={voiceRate}
                    onChange={(e) => handleVoiceRateChange(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#7fecde]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Mode Capture */}
          <button
            onClick={() => setCaptureMode(true)}
            className="w-full py-2 bg-gradient-to-r from-red-800 to-red-950 text-red-200 border border-red-700/50 rounded font-headline font-bold flex items-center justify-center gap-1.5 hover:from-red-700 hover:to-red-900 transition-all shadow-md"
            title="Masquer l'interface pour enregistrer"
          >
            <span className="material-symbols-outlined text-sm">videocam</span>
            Mode Capture Cinématique
          </button>
        </div>
      )}
    </div>
  );
}
