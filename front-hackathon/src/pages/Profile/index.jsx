import Layout from "../../components/Layout";

const Profile = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold">Profil</h2>
      <p>Nom d'utilisateur: <strong>@user123</strong></p>
      <p>Biographie: Développeur passionné !</p>
    </Layout>
  );
};

export default Profile;
