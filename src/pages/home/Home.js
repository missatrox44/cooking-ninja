import { projectFirestore } from "../../firebase/config";
import RecipeList from "../../components/RecipeList";
import { useEffect, useState } from "react";

// styles
import "./Home.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  //fetch from firestore
  useEffect(() => {
    setIsPending(true);
    //callback function takes snapshot of collection when get data
    //add listener to check for any changes, need to unsubscribe
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        // console.log(snapshot)
        if (snapshot.empty) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            // console.log(doc);
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
        //dont use catch block for error, instead pass in as second argument
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    //cleanup function when component unmounts - call unsubscribe function
    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
