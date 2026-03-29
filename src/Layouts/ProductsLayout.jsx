import {  Outlet } from "react-router-dom";
import ProductsNav from "../components/ProductsNav";


function ProductsLayout() {
    return (
        <>
            <ProductsNav />
            <main className="flex-1 bg-neutral-50 flex-col dark:bg-secondary  ">
                <Outlet />  
            </main>
        </>

    );
}

export default ProductsLayout;