# Portfolio — Caroline Camilleri

Portfolio de candidature au poste de **Chef de projet digital** chez Adoma : trois réalisations personnelles exploratoires (portail éditorial, design system, vidéo métier).

Site statique (HTML, CSS, JavaScript), sans dépendance, backend ni authentification.

## Structure

```
index.html          Page unique (en-tête, introduction, réalisations, démarche, pied de page)
css/styles.css      Styles + jetons du design system (couleurs, polices, espacements, rayons) dans :root
js/main.js          Aperçus de substitution, lecteur vidéo conditionnel, agrandissement de la planche, nav active
assets/             Favicon et aperçus à déposer (voir assets/README.md)
```

## Lancer en local

Ouvrir `index.html` dans un navigateur suffit. Pour un rendu identique à la mise en ligne :

```bash
npx serve .            # ou : python3 -m http.server 8000
```

puis ouvrir l’adresse indiquée (par ex. http://localhost:3000).

## Mettre en ligne

Le dossier peut être publié tel quel sur n’importe quel hébergeur statique :

- **GitHub Pages** : Settings → Pages → Deploy from a branch → choisir la branche et le dossier `/ (root)`.
- **Netlify** / **Vercel** : importer le dépôt, sans commande de build, dossier de publication `.`.
- Ou déposer les fichiers par FTP sur un hébergement classique.

La balise `<meta name="robots" content="noindex">` évite le référencement du portfolio par les moteurs de recherche. Retirez-la si vous souhaitez qu’il soit indexé.

## À compléter

- (Facultatif) Remplacer les vignettes illustratives par de vraies captures en les déposant dans `assets/` (captures du prototype, planche UI, éventuellement le MP4 de la vidéo) : voir `assets/README.md`.
- Vérifier que les trois liens (Lovable, Figma Sites, HeyGen) sont publics. Le lien HeyGen peut demander une connexion ; un lien de partage public ou le MP4 intégré est préférable.

## Accessibilité

Le site applique les bonnes pratiques suivantes : HTML sémantique, lien d’évitement, focus visible, cibles d’au moins 44 × 44 px, textes alternatifs, respect de `prefers-reduced-motion`, liens externes explicites (nouvel onglet signalé). Aucune conformité RGAA n’est revendiquée sans audit.
