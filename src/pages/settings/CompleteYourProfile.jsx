import ProfileForm from "../../components/forms/ProfileForm";
import BankForm from "../../components/forms/BankForm";
import ProfileIsCompleted from "../../components/ProfileIsCompleted";
import useAuth from "../../hooks/useAuth";

export default function CompleteYourProfile() {
  const { user } = useAuth();

  return (
    <div className="flex px-4 py-12 justify-center items-center">
      <div className="w-full max-w-lg px-3 py-2.5 border rounded-lg shadow-md">   
        {/* Render Profile form only if profile is not completed */}
        { !user.userProfileCompleteStatus.profile && <ProfileForm /> }   
          {/* Render Bank form only if profile is completed and Bank is not */}
        { user.userProfileCompleteStatus.profile && !user.userProfileCompleteStatus.bank && <BankForm /> }     
        {/* Render Profile is completed only if both profile and bank is completed */}
        { user.userProfileCompleteStatus.profile && user.userProfileCompleteStatus.bank && <ProfileIsCompleted /> }     
      </div>
    </div>
  );
}

