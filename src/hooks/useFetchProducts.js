import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/slices/productsSlice";

export const useFetchProducts = () => {
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(fetchProducts())
    }, [dispatch]);
};

export default useFetchProducts;