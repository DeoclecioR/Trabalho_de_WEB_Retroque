import { Plus } from "phosphor-react"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button"
import Cookie from 'js-cookie';

import '../profile.css'

export const Adverts = () => {
  const userToken = Cookie.get('userToken')
  const [adverts, setAdverts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:3333/item?owner_id=${userToken}`)
        .then(response => response.json())
        .then(jsonResponse => {
          setAdverts(jsonResponse)
        })
    }
    fetchData()
  }, [])

  return (
    <section id="profile-adverts-container">
      <header id="profile-adverts-header">
        <div>
          <h3>Meus anúncios</h3>
          <p>O que você anunciou para ser trocado</p>
        </div>
        <Button onClick={() => navigate('/registrar-produto')} icon={<Plus />} value="Novo anuncio" />
      </header>
      <div id="profile-adverts-products">
        {adverts.map((product: productTypes, i) => {
          return (
            <Link key={i} className={`category-product-item`} to={`/produto/${product.slug}`}>
              <img className='gallery-img' src={product.img_url} alt={product.nome} />
            </Link>
          )
        })}
      </div>
    </section>
  )
}