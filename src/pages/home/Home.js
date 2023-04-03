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
    projectFirestore
      .collection("recipes")
      .get()
      .then((snapshot) => {
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
      }).catch(err => {
        setError(err.message)
        setIsPending(false)
      })
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
