import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {getUserById} from "@/lib/action/user";
import {redirect} from "next/navigation";
import PageTitle from "@/app/components/pageTitle";

const ProfilePage = async() => {
    const {getUser} = await getKindeServerSession();
    const user = await getUser();

    !user && redirect("/")

    const dbUser = await getUserById(user.id);


    return (
        <div>
          <PageTitle title="Profile" linkCaption="Back to Home Page" href="/" />
        </div>
    );
};

export default ProfilePage;