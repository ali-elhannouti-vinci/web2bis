| URI | Méthode HTTP | Auths? | Opération |
|---|---|---|---|
| **`auths/login`** | POST | Non | AUTHENTICATE : Authentifier l'utilisateur |
| **`auths/register`** | POST | Non | REGISTER : Créer un utilisateur |
| **`auths/register`** | POST | Non | READ ALL : Lire toutes les ressources de la collection |
| **`films`** | GET | Non | READ ALL : Lire toutes les ressources de la collection |
| **`films/:id`** | GET | Non | READ ALL : Lire une ressource de la collection |
| **`films`** | POST | Oui | CREATE ONE : Créer une ressource de la collection basée sur un body au format `{title: string; director: string;  duration: number;  budget?: number;  description?: string;  imageUrl?: string;  }` |
| **`films/:id`** | DELETE | Oui | DELETE ONE : Supprime une ressource de la collection |
| **`films/:id`** | PATCH | Oui | UPDATE ONE : Modifie une ressource de la collection |
| **`films/:id`** | PUT | Oui | UPDATE OR CREATE ONE : Modifie une ressource de la collection si celle-ci existe, sinon crée une nouvelle ressource de la collection |
| **`comments`** | GET | JWT | READ ALL FILTERED : Lire toutes les ressources de la collection |
| **`comments`** | POST | JWT | CREATE ONE : Créer une ressource basée sur un body au format `{id: number; userId: number; filmId: number; comment: string;}` |
| **`comments/:id`** | DELETE | Oui | DELETE ONE : Supprime une ressource de la collection |