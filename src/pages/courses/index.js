// import firestore from "@/firebase/firebase";
import { useEffect, useState } from "react";

export default function Courses() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const collectionRef = firestore.collection("myCollection");
  //     const snapshot = await collectionRef.get();

  //     const fetchedData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     setData(fetchedData);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="todo-content">
      {data.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
        </div>
      ))}
    </div>
  );
}
