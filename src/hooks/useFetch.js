import { useState, useEffect } from "react"

//accept url into the hook which we want to fetch data from
export const useFetch = (url) => {
  //set up state for the data, isPending and error
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    //perform fetch inside useEffect hook whenever the url changes and once initially
    const fetchData = async () => {
      setIsPending(true)

      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }

  }, [url])

  //return states
  return { data, isPending, error }
}