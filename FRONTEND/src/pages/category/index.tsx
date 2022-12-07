import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../../layout/Footer";

import './category.css';

const Category = () => {
  const { slug } = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:3333/item?categoria=${slug}`)
        .then(response => response.json())
        .then(jsonResponse => setProducts(jsonResponse))
    }
    fetchData()
  }, [slug])

  return (
    <>
      <main className="limit">
        <section id="category-container">
          <h2 id="category-title">{slug}</h2>
          <article id="category-products">
            {products.map((product: productTypes, i) => {
              return (
                <Link key={i} className={`category-product-item`} to={`/produto/${product.slug}`}>
                  <img className='gallery-img' src={product.img_url} alt={product.nome} />
                </Link>
              )
            })}
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Category;