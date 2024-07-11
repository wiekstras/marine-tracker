import {Search} from "@/components/search";

export const Header = () => {
    return (
        <div className="flex place-content-around py-4 my-4">
            <div className="w-full">
              <Search/>
            </div>
            <div>
                <img src="/logo.png" width="100" alt="Marine Tracker"/>
            </div>
            <div>
                <div className="flex space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Sign Up
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
};