import { CaretRight } from 'phosphor-react';
import { Link } from 'react-router-dom';
import './style.css';

interface CategorySectionProps {
  title: string;
  subtitle: string;
  linkPage: string;
  products: {
    categoria: string;
    data_de_criacao: string;
    descricao: string;
    formas_de_entrega: string;
    formas_de_pagamento: string;
    nome: string;
    owner_id: string;
    quantidade: number;
    valor: number;
    slug: string;
    img_url: string;
    __v: number;
    _id: string;
  }[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  subtitle,
  linkPage,
  products,
}) => {
  return (
    <div id='categorySection'>
      <header>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <Link to={linkPage}>Veja mais <CaretRight /></Link>
      </header>
      <div id='categorySection-grid'>
        {products?.map((product, i) => {
          return (
            <Link key={i} className={`img-${i}`} to={`/produto/${product.slug}`}>
              <img className='gallery-img' src={product.img_url} alt={product.nome} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}