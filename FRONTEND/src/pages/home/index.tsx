import { useEffect, useState } from "react";
import { CategorySection } from "../../layout/CategorySection";
import { Footer } from "../../layout/Footer";

import './home.css';

const Home = () => {
  const [clothes, setClothes] = useState([]);
  const [books, setBooks] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [electronics, setElectronics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:3333/item?limit=6&categoria=roupas')
        .then(response => response.json())
        .then(jsonResponse => setClothes(jsonResponse))
      await fetch('http://localhost:3333/item?limit=6&categoria=livros')
        .then(response => response.json())
        .then(jsonResponse => setBooks(jsonResponse))
      await fetch('http://localhost:3333/item?limit=6&categoria=acessorios')
        .then(response => response.json())
        .then(jsonResponse => setAccessories(jsonResponse))
      await fetch('http://localhost:3333/item?limit=6&categoria=eletronicos')
        .then(response => response.json())
        .then(jsonResponse => setElectronics(jsonResponse))
    }
    fetchData()
  }, [])

  return (
    <>
      <main className="limit">
        {clothes.length > 0 && <CategorySection
          title="Roupas"
          subtitle="Tudo o que você precisa pra ficar no estilo"
          linkPage="/categoria/roupas"
          products={clothes}
        />}

        {books.length > 0 && <CategorySection
          title="Livros"
          subtitle="A essência do conhecimento consiste em compartilha-lo!"
          linkPage="/categoria/livros"
          products={books}
        />}

        {accessories.length > 0 && <CategorySection
          title="Acessórios"
          subtitle="Dinheiro não compra felicidade, mas compra acessórios, que dá no mesmo."
          linkPage="/categoria/acessorios"
          products={accessories}
        />}

        {electronics.length > 0 && <CategorySection
          title="Eletrônicos"
          subtitle="Presentei sua familia com um eletrônico novo"
          linkPage="/categoria/eletronicos"
          products={electronics}
        />}
      </main>
      <Footer />
    </>
  );
}

export default Home;