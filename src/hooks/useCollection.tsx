import React, { useEffect, useState } from 'react'
import { 
    onSnapshot,
    collection,
    query,
    Query,
    DocumentData,
} from "firebase/firestore";
import { db } from '../firebase';


interface Channals {
    id: string;
    channel: DocumentData;
}

const useCollection = (data: string) => {
    const [documents, setDocuments] = useState<Channals[]>([]);
    const collectionRef: Query<DocumentData> = query(collection(db, data));
    
    useEffect(() => {
        onSnapshot(collectionRef, (querySnapshot) => {
            const channelsResults: Channals[] = [];
            querySnapshot.docs.forEach((doc) =>
                channelsResults.push({
                id: doc.id,
                channel: doc.data(),
            })
            );
            setDocuments(channelsResults);
        });
    }, []);
    return { documents };
};

export default useCollection