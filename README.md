## Pour commencer

Installer les dépendances nécessaires du fichier package.json:
```bash
npm install
```

Démarrer le serveur de dev:

```bash
next dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

## GIT

### Ajouter les fichiers :

```bash
git add .
ou 
git add <nom du fichier>
```

### Enregistrer les modifications :

```bash
git commit -m "<message>"
```

### Pousser les modifications :

```bash
git push
```

### Récupérer une mise à jour :

#### S'assurer d'être sur sa propre branche :
```bash
git checkout <nom de notre branche>
```

#### S'assurer que la branche cible soit à jour :
```bash
git fetch origin
git pull origin <nom de la branche cible>
```

#### Fusionner la branche cible dans votre branche :
```bash
git merge <nom de la branche cible>
```

##### S'il y a des conflits :
Commencer par résoudre les conflits en éditants les fichiers

Ensuite ajouter les fichiers corrigés :
```bash
git add .
ou 
git add <nom du fichier>
```
Puis commit :
```bash
git commit -m "<message>"
```
Et push :
```bash
git push
```