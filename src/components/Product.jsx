import { product } from '../content'
import { SectionHead } from './ui'

export default function Product() {
  return (
    <section className="section section--band" id="product">
      <div className="container">
        <SectionHead eyebrow={product.eyebrow} title={product.title} body={product.body} />

        <div className="compare">
          <div className="panel" data-reveal>
            <h3 className="panel__title">{product.not.title}</h3>
            <ul className="list list--not">
              {product.not.items.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel panel--teal" data-reveal style={{ '--i': 1 }}>
            <h3 className="panel__title">{product.get.title}</h3>
            <ul className="list list--get">
              {product.get.items.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
