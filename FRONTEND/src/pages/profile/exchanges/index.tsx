import { Link } from "react-router-dom";
import { serviceClothes } from "../../../services/clothes";

import '../profile.css'

export const Exchanges = () => {
  const serviceClothesVar = serviceClothes();
  return (
    <section id="profile-adverts-container">
      <header id="profile-adverts-header">
        <div>
          <h3>Minhas trocas</h3>
          <p>O que você pediu para trocar ou trocou</p>
        </div>
      </header>
      <div id="profile-adverts-products">
        {serviceClothesVar.map((product, i) => {
          return (
            <Link key={i} className={`category-product-item`} to={product.link}>
              <img className='gallery-img' src={product.imageUrl} alt={product.name} />
            </Link>
          )
        })}
      </div>
    </section>
  )
}