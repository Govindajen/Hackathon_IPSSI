import Layout from "../../components/Layout";
import "./legal.scss";

export default function Legal() {
    return (
        <Layout>
            <div className="legalPageContainer">
                <h1>Mentions Légales</h1>

                <h2>Éditeur du site</h2>
                <p>
                    Nom du site : SmartTweet <br />
                    Email : contact@smarttweet.fr <br />
                </p>

                
                <h2>Propriété intellectuelle</h2>
                <p>
                    Le contenu du site SmartTweet (textes, images, logos, etc.) est protégé par les lois sur la propriété intellectuelle. Toute reproduction, distribution ou utilisation sans autorisation est interdite.
                </p>

                <h2>Responsabilité</h2>
                <p>
                    SmartTweet ne peut être tenu responsable des erreurs ou omissions dans les informations diffusées sur le site, ni des dommages liés à l'utilisation du site.
                </p>

                <h2>Contact</h2>
                <p>
                    Pour toute question ou réclamation, vous pouvez nous contacter à : contact@smarttweet.fr.
                </p>
            </div>
        </Layout>
    );
}
