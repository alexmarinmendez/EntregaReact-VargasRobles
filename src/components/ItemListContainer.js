import { useEffect, useState } from "react";
import ItemList from './ItemList';
import { customFetch } from '../utils/customFetch';
import { useParams } from "react-router-dom";
import {db} from '../utils/firebaseConfig';
import { collection, getDocs, QuerySnapshot, query, where } from "firebase/firestore"; 

const ItemListContainer = () => {
    const [datos, setDatos] = useState([]);
    const { idCategory } =useParams();

    useEffect(() => {
            const fetchFromFirestore = async () => {
                let q;
                if (idCategory) {
                    q = query(collection(db, 'products'), where('categoryId', '==', idCategory))

                }else {
                    const q = query(collection(db, "products"));
                }
               
                const querySnapshot = await getDocs(q);
                const dataFromFirestore = querySnapshot.docs.map(item => ({
                id: item.id,
                ...item.data()

            }))
           return dataFromFirestore;

            }  

        fetchFromFirestore()
        .then(result => setDatos(result))
        .catch(err => console.log(err))
    }, [idCategory]);

    useEffect(() => { 

    },[]);

    return (

        <ItemList items={datos} />
       
    );
}

export default ItemListContainer;