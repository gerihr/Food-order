import ResetPassword from './ResetPassword';
import  './UserProfile.css';

const UserProfile = () => {
  return (
    <div className="container">
    <section className="profile">
      <h4>My Profile</h4>
      <ResetPassword />
    </section>
    </div>
  );
};

export default UserProfile;
