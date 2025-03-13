import Layout from "../../components/Layout";
import "./terms.scss";

export default function Terms() {
    return (
        <Layout>
            <div className="termsPageContainer">
                <h1>Conditions Générales d'Utilisation</h1>

                <h2>1. Présentation du site</h2>
                <p>
                    <strong>SmartTweet</strong> est une plateforme sociale permettant aux utilisateurs de publier des tweets, d’interagir avec les posts des autres et d’utiliser une intelligence artificielle d’analyse des expressions faciales en temps réel.
                </p>

                <h2>2. Acceptation des conditions</h2>
                <p>
                    L'accès et l'utilisation de <strong>SmartTweet</strong> impliquent l'acceptation sans réserve des présentes Conditions Générales d'Utilisation (CGU). Si l’utilisateur n’accepte pas ces conditions, il doit cesser d’utiliser le site.
                </p>

                <h2>3. Inscription et accès</h2>
                <p>
                    L’inscription est requise pour publier des tweets et interagir avec les autres utilisateurs. L’utilisateur doit fournir des informations exactes et à jour. L’accès au site est gratuit, mais certaines fonctionnalités peuvent nécessiter des permissions spécifiques (ex. utilisation de la webcam pour l’analyse des expressions faciales).
                </p>

                <h2>4. Fonctionnalités principales</h2>
                <h3>4.1 Publication et gestion des tweets</h3>
                <p>
                    Les utilisateurs peuvent publier des tweets contenant du texte, des images et des vidéos. Chaque tweet peut inclure des hashtags, des mentions et un marquage temporel.
                </p>

                <h3>4.2 Interaction avec les tweets</h3>
                <p>
                    Les utilisateurs peuvent aimer, retweeter, répondre et enregistrer des tweets pour une consultation ultérieure.
                </p>

                <h3>4.3 Fil d’actualité personnalisé</h3>
                <p>
                    Le fil d’actualité est généré en fonction des préférences et interactions de l’utilisateur (tweets aimés, utilisateurs suivis, hashtags consultés, etc.).
                </p>

                <h3>4.4 Système de notifications</h3>
                <p>
                    Les utilisateurs reçoivent des notifications en cas d’interactions sur leurs tweets (likes, retweets, réponses, abonnements, mentions).
                </p>

                <h3>4.5 Recherche avancée</h3>
                <p>
                    Un moteur de recherche permet de retrouver tweets, utilisateurs et hashtags en fonction de mots-clés, filtres de date et popularité.
                </p>

                <h3>4.6 Gestion du profil</h3>
                <p>
                    Chaque utilisateur possède un profil contenant son nom d’utilisateur, biographie, photo de profil, historique de tweets et liste d’abonnements.
                </p>

                <h3>4.7 Analyse d’expressions faciales (Facial Expression Recognition - FER)</h3>
                <p>
                    Une IA analyse les expressions faciales des utilisateurs via leur webcam pour détecter des émotions telles que la joie, la tristesse, la colère, la surprise, le dégoût, la peur et l’état neutre. L’activation de cette fonctionnalité nécessite le consentement explicite de l’utilisateur.
                </p>

                <h2>5. Responsabilités</h2>
                <p>
                    <strong>SmartTweet</strong> ne peut être tenu responsable des contenus publiés par les utilisateurs. Chaque utilisateur est responsable des publications et interactions qu’il génère.
                </p>

                <h2>6. Propriété intellectuelle</h2>
                <p>
                    Tous les contenus du site, y compris l’interface et les algorithmes d’IA, sont protégés par les lois sur la propriété intellectuelle. Toute reproduction ou utilisation sans autorisation est interdite.
                </p>

                <h2>7. Données personnelles</h2>
                <p>
                    Les données personnelles collectées sont traitées conformément au RGPD. Les utilisateurs peuvent demander la suppression de leurs données en contactant contact@smarttweet.fr.
                </p>

                <h2>8. Modifications des CGU</h2>
                <p>
                    <strong>SmartTweet</strong> se réserve le droit de modifier ces CGU à tout moment. Les utilisateurs seront informés des modifications et devront les accepter pour continuer à utiliser la plateforme.
                </p>

                <h2>9. Contact</h2>
                <p>
                    Pour toute question, veuillez nous contacter à : contact@smarttweet.fr .
                </p>
            </div>
        </Layout>
    );
}
