import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/api`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    router.push("/register");
  }, []);

  return <div className={styles.container}></div>;
}
