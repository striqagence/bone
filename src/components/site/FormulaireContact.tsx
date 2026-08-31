"use client";

import { useActionState, useState } from "react";

import { SoumissionFormulaire } from "@/components/ui/SoumissionFormulaire";
import { IconeErreur, IconeSucces } from "@/components/ui/icones";
import { envoyerDemande, type Champ, type Resultat } from "@/actions/envoyerDemande";
import type { Langue } from "@/lib/i18n";

/**
 * Formulaire de contact (Figma « Contact »).
 *
 * La validation vit en double : ici pour guider la saisie — un champ montre sa
 * coche dès qu'il est correct, son message dès qu'il ne l'est plus — et dans
 * l'action serveur, qui seule fait autorité. Celle du navigateur ne protège de
 * rien.
 *
 * Les messages n'apparaissent qu'après que le visiteur a quitté le champ :
 * signaler une adresse invalide dès la première lettre tapée est une gêne, pas
 * une aide.
 */
type Profil = { valeur: string; libelle: string };

const regles: Record<Champ, (v: string) => string | null> = {
  profil: (v) => (v ? null : "Choisissez votre rôle."),
  nom: (v) => (v.trim() ? null : "Le nom est obligatoire."),
  prenom: (v) => (v.trim() ? null : "Le prénom est obligatoire."),
  email: (v) => (/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(v) ? null : "L’adresse e-mail n’est pas valide."),
  telephone: (v) =>
    /^[+()\d][\d\s.\-()]{7,}$/.test(v) ? null : "Le numéro ne doit contenir que des chiffres.",
  contexte: (v) => (v.trim().length >= 10 ? null : "Décrivez votre demande en quelques mots."),
};

export function FormulaireContact({
  langue,
  profils,
  libelles,
}: {
  langue: Langue;
  profils: Profil[];
  libelles: {
    vousEtes: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    contexte: string;
    contextePlaceholder: string;
    envoyer: string;
    mentionLegale: string;
    succes: string;
    erreur: string;
  };
}) {
  const [profil, setProfil] = useState("");
  const [valeurs, setValeurs] = useState<Record<Champ, string>>({
    profil: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    contexte: "",
  });
  const [touches, setTouches] = useState<Partial<Record<Champ, boolean>>>({});

  const [resultat, action, enCours] = useActionState<Resultat | null, FormData>(
    (_precedent, donnees) => envoyerDemande(donnees),
    null,
  );

  /** Le serveur prime sur la validation locale dès qu'il a répondu. */
  const messageDe = (champ: Champ) => {
    const duServeur = resultat?.etat === "erreur" ? resultat.champs?.[champ] : undefined;
    if (duServeur) return duServeur;
    return touches[champ] ? regles[champ](valeurs[champ]) : null;
  };

  const valide = (champ: Champ) =>
    Boolean(touches[champ]) && !regles[champ](valeurs[champ]);

  const majuscules = "titrage text-xs font-semibold uppercase leading-none tracking-wider text-primary-950";

  if (resultat?.etat === "succes") {
    return (
      <div role="status" className="flex items-center gap-[9px] text-primary-600">
        <IconeSucces />
        <p className="text-base font-medium leading-[1.5]">{libelles.succes}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex w-full flex-col items-start gap-8">
      <input type="hidden" name="langue" value={langue} />
      <input type="hidden" name="profil" value={profil} />

      <fieldset className="flex flex-col items-start gap-3">
        <legend className={majuscules}>{libelles.vousEtes}</legend>
        <div className="flex flex-wrap items-start gap-6 pt-3">
          {profils.map(({ valeur, libelle }) => {
            const choisi = profil === valeur;
            return (
              <button
                key={valeur}
                type="button"
                aria-pressed={choisi}
                onClick={() => {
                  setProfil(valeur);
                  setValeurs((v) => ({ ...v, profil: valeur }));
                  setTouches((t) => ({ ...t, profil: true }));
                }}
                className={`flex h-[60px] items-center gap-2.5 rounded px-5 text-base transition-colors ${
                  choisi
                    ? "bg-white font-semibold text-primary-950 shadow-[5px_5px_0_0_var(--color-encre)]"
                    : "bg-gray-50 text-primary-950 opacity-50 shadow-[5px_5px_0_0_rgb(0_0_34/0.1)]"
                }`}
              >
                {libelle}
                {choisi && (
                  <span className="text-primary-600">
                    <IconeSucces />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {messageDe("profil") && <Erreur message={messageDe("profil")!} />}
      </fieldset>

      <div className="flex w-full flex-col gap-8 sm:flex-row sm:gap-8">
        <Champ nom="nom" libelle={libelles.nom} />
        <Champ nom="prenom" libelle={libelles.prenom} />
      </div>

      <div className="flex w-full flex-col gap-8 sm:flex-row sm:gap-8">
        <Champ nom="email" libelle={libelles.email} type="email" />
        <Champ nom="telephone" libelle={libelles.telephone} type="tel" />
      </div>

      <div className="flex w-full flex-col items-start gap-3">
        <label htmlFor="contexte" className={majuscules}>
          {libelles.contexte}
        </label>
        <textarea
          id="contexte"
          name="contexte"
          rows={8}
          placeholder={libelles.contextePlaceholder}
          value={valeurs.contexte}
          onChange={(e) => setValeurs((v) => ({ ...v, contexte: e.target.value }))}
          onBlur={() => setTouches((t) => ({ ...t, contexte: true }))}
          aria-invalid={Boolean(messageDe("contexte"))}
          className="h-[251px] w-full rounded border border-gris-300 bg-gray-50 p-5 text-base leading-[1.5] text-primary-950 placeholder:opacity-50 focus:border-primary-600 focus:outline-none"
        />
        {messageDe("contexte") && <Erreur message={messageDe("contexte")!} />}
      </div>

      <SoumissionFormulaire
        libelle={libelles.envoyer}
        enCours={enCours}
        etat={resultat?.etat === "erreur" && !resultat.champs ? "erreur" : "repos"}
        message={
          resultat?.etat === "erreur" && !resultat.champs ? libelles.erreur : libelles.mentionLegale
        }
      />
    </form>
  );

  function Champ({
    nom,
    libelle,
    type = "text",
  }: {
    nom: Champ;
    libelle: string;
    type?: string;
  }) {
    const message = messageDe(nom);
    return (
      <div className="flex min-w-px flex-1 flex-col items-start gap-3">
        <label htmlFor={nom} className={majuscules}>
          {libelle}
        </label>
        <div
          className={`flex h-[60px] w-full items-center justify-between gap-2.5 rounded border bg-gray-50 px-5 ${
            message ? "border-red-600" : "border-gris-300"
          }`}
        >
          <input
            id={nom}
            name={nom}
            type={type}
            value={valeurs[nom]}
            onChange={(e) => setValeurs((v) => ({ ...v, [nom]: e.target.value }))}
            onBlur={() => setTouches((t) => ({ ...t, [nom]: true }))}
            aria-invalid={Boolean(message)}
            aria-describedby={message ? `${nom}-erreur` : undefined}
            className={`min-w-px flex-1 bg-transparent text-base leading-[1.5] focus:outline-none ${
              message ? "text-red-600" : "text-primary-950"
            }`}
          />
          {message ? (
            <span className="text-red-600">
              <IconeErreur />
            </span>
          ) : valide(nom) ? (
            <span className="text-primary-600">
              <IconeSucces />
            </span>
          ) : null}
        </div>
        {message && <Erreur id={`${nom}-erreur`} message={message} />}
      </div>
    );
  }
}

function Erreur({ message, id }: { message: string; id?: string }) {
  return (
    <p id={id} className="w-full text-right text-sm italic leading-[1.5] text-red-600">
      {message}
    </p>
  );
}
