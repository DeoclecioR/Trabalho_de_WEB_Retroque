import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { Footer } from "../../layout/Footer";

import './product.css';

const Product = () => {
  const { slug } = useParams()

  const [product, setProduct] = useState<productTypes[]>([])

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:3333/item?slug=${slug}`)
        .then(response => response.json())
        .then(jsonResponse => setProduct(jsonResponse))
    }
    fetchData()
  }, [slug])

  const createdAt = new Date(product[0]?.data_de_criacao)

  return (
    <>
      <main className="limit">
        <section id="product-container">
          <img id="product-image" src={product[0]?.img_url} alt="Produto moleton adidas rosa" />
          <aside id="product-content">
            <div id="product-content-container">
              <h2>{product[0]?.nome}</h2>
              <div>
                <h3>Descrição:</h3>
                <p>{product[0]?.descricao}</p>
              </div>
              <TextField label="Calcular frete (CEP)" name="cep" />
              <p>Quantidade disponível: {product[0]?.quantidade}</p>
              <p>Entrega via: {product[0]?.formas_de_entrega}</p>
              <p>Postado: {createdAt.toLocaleDateString()}</p>
            </div>
            <Button value="Oferecer troca" />
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Product;