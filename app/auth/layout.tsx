import {Navbar} from "@/components/navbar";

const AuthLayout = ({
                        children
                    }: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-screen">
            <Navbar/>
            <div
                className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary to-blue-800">

                {children}
            </div>
        </div>

    );
}

export default AuthLayout;