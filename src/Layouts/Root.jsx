import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation.jsx";
import Footer from "../components/Footer.jsx";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import { Suspense } from "react";


export default function RootLayout(){


    return(
    
        <>
            <div className="flex flex-col min-h-screen overflow-x-hidden">
                <MainNavigation />
                
                <main className="flex-1 bg-neutral-50 dark:bg-secondary flex-col">
                    <Suspense fallback={< LoadingSpinner /> }> {/* ✅ هنا بس */}
                        <Outlet />
                    </Suspense>  
                    {/* ⚠️ بدون container - كل صفحة تتحكم في layout بتاعها */}
                </main>
                
                <Footer />
            </div>
        </>
    );
}