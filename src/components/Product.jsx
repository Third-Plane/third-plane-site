import { product } from '../content'
import { Check, Cross, SectionHead } from './ui'

export default function Product() {
  return (
    <section className="section" id="product">
      <div className="container">
        <SectionHead eyebrow={product.eyebrow} titleLines={product.titleLines} body={product.body} />

        <div className="compare">
          <div className="panel" data-reveal>
            <h3 className="panel__title">{product.not.title}</h3>
            <ul className="list list--not">
              {product.not.items.map((item) => (
                <li key={item}>
                  <Cross />
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
                  <Check />
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
